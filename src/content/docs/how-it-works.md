# How It Works

This page explains the internal architecture of Power Interview: the components that run on your machine, how they communicate with each other and with backend services, and how each feature is delivered.

---

## Overview

Power Interview is composed of three layers:

1. **Electron Desktop App** - the user interface, window control, and configuration
2. **Python Agents** - lightweight local processes for audio capture and virtual camera streaming
3. **Cloud Backend** - AI inference, ASR transcription, and face swap GPU processing

These layers communicate in real time using ZeroMQ (local inter-process), WebSocket (streaming), and HTTPS REST (configuration and auth).

---

## Component Diagram

![Architecture overview — components and connections](/media/docs/architecture-diagram.svg)

---

## Desktop App (Electron)

The desktop app runs as an Electron process with two main parts:

### Main Process

The main process (Node.js) is responsible for:

- **Authentication** - login, signup, token refresh, change password
- **Configuration store** - reads and writes user settings (profile, device names, face swap toggle, resolution) using Electron Store (local encrypted storage)
- **Session management** - starts and stops the Python agents as child processes
- **IPC handlers** - receives calls from the renderer (UI) and relays them to backend services or local agents
- **App state** - tracks `runningState` (Idle / Starting / Running / Stopping), transcript list, reply suggestions, code suggestions, and credits
- **Health checks** - polls backend API and GPU server every 5 seconds; also refreshes credit balance on each client ping
- **Auto-updater** - checks for new releases using `electron-updater` and notifies the UI

### Renderer Process

The renderer (React + TypeScript) renders the UI and communicates with the main process over Electron IPC:

- **Main page** - shows the transcript panel, reply suggestions panel, code suggestions panel, and video panel side by side; layout adapts based on which panels have content
- **Control panel** - audio device selector, face swap toggle + options, start/stop button, export and clear tools, profile dropdown
- **Configuration dialog** - profile name, CV text, job context, reference photo upload
- **Payment page** - buy credits, payment history, payment status tabs
- **Stealth mode** - when active, the window stops stealing focus so your keyboard and mouse stay on your coding challenge or video call; the main panel collapses to a minimal status bar showing running state, credit balance, and hotkey reference

---

## ASR Agent (Python)

The ASR (Automatic Speech Recognition) agent is a compiled Python process that runs locally and coordinates all audio capture and transcription.

### Audio Capture - Two Channels

The agent opens two simultaneous audio streams:

| Channel    | Source                                   | Purpose                                                                                                      |
| ---------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Loopback   | Windows WASAPI default loopback device   | Captures whatever audio is playing through the system speakers - the interviewer's voice from the video call |
| Microphone | Physical microphone selected by the user | Captures the user's own voice                                                                                |

Both streams are sampled at 16 kHz mono (resampled from the native device rate using `scipy`).

### ASR Streaming

Both audio channels are forwarded to the backend ASR service over a single WebSocket connection. The backend processes each channel independently and returns:

- **Partial transcripts** - low-latency intermediate results shown immediately in the UI
- **Final transcripts** - confirmed results replacing the partial ones

### ZeroMQ Publishing

Finalized transcripts are published to the Electron main process over a ZeroMQ PUB socket. The main process subscribes to this socket, aggregates transcript messages into the app state, and pushes updates to the renderer via IPC.

---

## VCam Agent (Python)

The VCam (Virtual Camera) agent handles face swap video streaming. It is only active when face swap is toggled on.

### Frame Capture

The agent reads frames from the user's selected physical webcam using OpenCV at the configured resolution (640×360, 640×480, or 1280×720).

### WebRTC Streaming

Captured frames are sent to the backend face swap GPU server over WebRTC (low-latency peer-to-peer video streaming). The GPU server:

1. Receives the raw webcam frames
2. Detects and replaces the user's face with the reference photo face using deep learning
3. Optionally applies face enhancement post-processing
4. Streams the processed frames back to the VCam agent

### OBS Virtual Camera Output

The processed frames received from the backend are pushed to OBS Virtual Camera using `pyvirtualcam`. OBS Virtual Camera makes the output available as a camera device that any application (Zoom, Teams, Google Meet, etc.) can select.

---

## Audio Control Agent (Python)

The audio control agent is responsible for two things: enumerating audio devices so the user can select the correct microphone, and — critically — keeping the user's real voice synchronized with the face-swapped video stream.

### The Synchronization Problem

When face swap is active, the VCam agent sends raw webcam frames to the cloud GPU server and receives processed frames back. This round-trip introduces a variable network delay (typically 80–250 ms) before the face-swapped video is available for output.

If the user's microphone audio is routed directly and without compensation, the interviewer will see the processed face move out of sync with the voice — the lips on screen will appear to lag behind the words being spoken.

### How Synchronization Works

The Audio Control Agent solves this with a **timestamped delay buffer**:

1. **Frame timestamp tagging** — the VCam agent stamps each outgoing frame with a monotonic clock timestamp before sending it to the GPU server
2. **Round-trip measurement** — when the processed frame arrives back, the agent computes the actual frame latency: `latency = receive_time − send_timestamp`
3. **Audio delay buffer** — the Audio Control Agent receives the current measured latency over ZeroMQ from the VCam agent and holds incoming microphone audio in a rolling ring buffer for exactly that duration before releasing it to the virtual audio output
4. **Dynamic adjustment** — latency is re-measured on every frame and the buffer depth is smoothed with an exponential moving average to avoid abrupt audio jumps from transient network spikes

![Audio / video synchronization diagram](/media/docs/audio-sync-diagram.svg)

### VB-Cable Virtual Audio Output

The agent writes the delay-compensated audio stream to **VB-Cable Input**, a virtual audio cable driver ([VB-Audio VB-Cable](https://vb-audio.com/Cable/)). VB-Cable works as a loopback: anything written to the **VB-Cable Input** device is instantly readable from the **VB-Cable Output** device.

Meeting apps (Zoom, Teams, Google Meet) expose VB-Cable Output in their microphone selector. The user selects it once in the meeting app settings; from that point on, the app always receives the synchronized, delay-compensated voice stream.

> **When face swap is active, select both of the following in your meeting app:**
>
> - **Camera / Video** → `OBS Virtual Camera` (the face-swapped video)
> - **Microphone / Audio input** → `CABLE Output (VB-Audio Virtual Cable)` (the synced voice)
>
> Selecting either device alone will result in mismatched audio or video.

---

## AI Suggestion Flow

### Reply Suggestions

When the ASR backend delivers a final transcript segment, the Electron main process forwards the latest transcript context, combined with the user's profile (name, CV) and job context, to the LLM suggestion API. The API streams back a text response which is displayed word-by-word in the reply suggestions panel.

### Code Suggestions

When the user presses `Ctrl+Shift+F9`, the main process takes a screenshot of the entire screen using `screenshot-desktop` and stores it temporarily. Up to 4 screenshots can be queued. When the user presses `Ctrl+Shift+F10`, all queued screenshots are sent as image attachments to the LLM code suggestion API. The API analyzes the images and streams back a code solution which is rendered with syntax highlighting.

---

## Inter-Process Communication (IPC)

All communication between the renderer and main process goes through Electron's IPC bridge exposed via the `preload.cjs` script. The main categories of IPC channels are:

| Category         | Examples                                                |
| ---------------- | ------------------------------------------------------- |
| Auth             | login, logout, signup, change-password                  |
| Config           | get-config, update-config                               |
| App State        | get-app-state, state-update events                      |
| Tools            | export-transcript, clear-all                            |
| Code Suggestions | capture-screenshot, clear-images, start-generate        |
| Health Check     | triggered automatically on startup                      |
| Auto-Updater     | get-version, check-for-updates                          |
| Payment          | get-currencies, create-payment, get-payment-history     |
| Window           | toggle-stealth, set-opacity, move-window, resize-window |

---

## Data Storage

All persistent data is stored locally on your machine:

| Data                                                | Storage        | Location                    |
| --------------------------------------------------- | -------------- | --------------------------- |
| Login token, session                                | Electron Store | `%AppData%\power-interview` |
| Profile name, CV, job context, reference photo      | Electron Store | `%AppData%\power-interview` |
| Device preferences (microphone, camera, resolution) | Electron Store | `%AppData%\power-interview` |
| Feature toggles (face swap, face enhance)           | Electron Store | `%AppData%\power-interview` |

No transcripts or suggestions are persisted to disk unless you explicitly export them. Nothing is stored on external servers after a session ends.

---

## Session Lifecycle

```
User clicks Start
       │
       ▼
Main process validates config (profile, microphone, face swap photo if needed)
       │
       ▼
Spawns ASR Agent → ASR Agent opens microphone + loopback streams → WebSocket to backend
       │
       ▼ (if face swap enabled)
Spawns VCam Agent → VCam Agent opens webcam → WebRTC to GPU backend → pushes to OBS VCam
       │
       ▼
Spawns Audio Control Agent → measures VCam round-trip latency → buffers microphone audio → writes to VB-Cable Input → readable as VB-Cable Output in meeting app
       │
       ▼
Running state set to Running; Renderer shows active panels
       │
       │  (during session)
       │  ┌─ Audio loopback → ASR → ZeroMQ → Transcript panel
       │  ├─ Microphone → ASR → ZeroMQ → Transcript panel
       │  ├─ Transcript final → LLM API → Reply suggestion panel (streaming)
       │  ├─ Screenshots → LLM API → Code suggestion panel (streaming)
       │  ├─ VCam frame latency → ZeroMQ → Audio Control Agent buffer depth
       │  └─ Microphone → Audio Control Agent delay buffer → VB-Cable Input → VB-Cable Output
       │
User clicks Stop (or presses Ctrl+Shift+Q)
       │
       ▼
Main process sends stop signal to agents → agents shut down audio/video streams
       │
       ▼
Running state set to Idle; Panels retain last session data until cleared
```

---

## Credits System

Credits are consumed while the assistant is running, covering AI inference (reply and code suggestions), transcription, and face swap GPU processing. The credit balance is fetched from the backend on every health-check client ping (every 5 seconds while running). If the balance reaches zero during a session, the assistant stops and a notification is shown in the UI.

Credits are purchased from the **Buy Credits** page inside the app, which calls the backend payment API. Payments are processed externally; the credit balance updates automatically once a payment is confirmed.
