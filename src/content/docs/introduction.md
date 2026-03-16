# Introduction

Power Interview is a privacy-first AI assistant that helps you perform confidently during live technical and behavioral interviews. It runs as a desktop application on your machine and combines real-time transcription, intelligent AI suggestions, and optional face swap technology - all designed to keep your data under your control.

| Normal Mode                                                                   | Stealth Mode                                                                          |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| ![Power Interview - Main Application Interface](/media/docs/app-overview.jpg) | ![Power Interview - Main Application Interface](/media/docs/app-overview-stealth.jpg) |

---

## What It Does

Power Interview listens to your interview conversation, transcribes it in real time, and surfaces contextual suggestions so you can respond with clarity. For technical roles, it can analyze coding problems on your screen and generate solution. For behavioral rounds, it draws on your profile - your name, CV, and the job description - to generate personalized, natural-sounding responses.

The face swap feature lets you replace your camera feed with a chosen photo of your preferred appearance, routed through a virtual camera that any video-conferencing app can use.

---

## Core Features

### Real-Time Transcription

- **Dual-Channel**: Your microphone captures your voice; system audio loopback captures the interviewer automatically
- Streams transcription live via WebSocket with low latency
- Each line is labeled by speaker (your name or "Interviewer") with a timestamp
- Auto-scroll keeps up with new lines; a toggle lets you pause and scroll back

### AI Reply Suggestions

- Generates interview answers personalized to your CV and job description
- Streams suggestions in real time as the conversation progresses
- Considers the full conversation context, not just the last question
- Produces human-like responses based on your profile

### AI Code Suggestions

- Captures one or multiple screenshots of your screen (up to 4) to read the problem
- Sends the screenshots to an AI model that generates a suggested solution
- Displays the result with syntax highlighting inside the app
- All triggered without ever switching focus away from your interview window

### Face Swap (Virtual Camera)

- Replaces your webcam feed with a face-swapped version using a chosen reference photo
- Output is delivered through OBS Virtual Camera - works with Zoom, Google Meet, Teams, and others
- Optional AI-powered face enhancement for more natural results
- Configurable video resolution (640×360, 640×480, 1280×720)
- Requires an active credits balance; balance is shown live in the app

![Face Swap Options dialog](/media/docs/face-swap-options.png)

### Stealth Mode

- The Power Interview window is **always hidden from screen capture and screen share** - interviewers can never see it regardless of mode
- Stealth mode keeps the window from receiving focus, so your keyboard and mouse stay locked on your coding challenge or video call
- A minimal status bar shows running state, credit balance, and active hotkeys
- A toggleable low-opacity overlay lets you glance at suggestions without switching focus
- Entire workflow controllable by keyboard shortcuts - no mouse required, no lost focus

![Stealth mode status bar](/media/docs/stealth-mode.png)

### Interview Export

- After a session, export a complete interview report as a Word document (`.docx`)
- Report includes an AI-generated summary, full timestamped transcript with speaker labels, and all reply suggestions

### Credits & Payments

- Credits are consumed while the assistant is running (AI suggestions, transcription, and face swap)
- Credit balance is displayed live inside the app
- Buy credits directly from the **Buy Credits** page within the app, with payment history and status tracking

### Global Hotkeys

Every function in Power Interview is accessible from any window via keyboard shortcuts:

| Action                                      | Shortcut                        |
| ------------------------------------------- | ------------------------------- |
| Stop all & exit stealth                     | `Ctrl+Shift+Q`                  |
| Toggle stealth mode                         | `Ctrl+Shift+M`                  |
| Toggle window opacity                       | `Ctrl+Shift+N`                  |
| Place window (numpad layout)                | `Ctrl+Shift+1` – `Ctrl+Shift+9` |
| Move window                                 | `Ctrl+Alt+Shift+Arrow`          |
| Resize window                               | `Ctrl+Win+Shift+Arrow`          |
| Zoom in/out or reset zoom                   | `Ctrl+Shift+[=, -, 0]`          |
| Scroll live suggestions panel (down/up/end) | `Ctrl+Shift+[J, K, L]`          |
| Scroll triggered suggestions panel          | `Ctrl+Shift+[U, I, O]`          |
| Capture screen                              | `Ctrl+Shift+F9`                 |
| Clear captures                              | `Ctrl+Shift+F10`                |
| Trigger without captures                    | `Ctrl+Shift+F11`                |
| Trigger with captures                       | `Ctrl+Shift+F12`                |

> Hotkey definitions live in `src/config/hotkeys.ts` (keep docs and code in sync).

---

## How It Is Built

Power Interview consists of three layers running together on your machine:

| Layer            | Technology                    | Purpose                                      |
| ---------------- | ----------------------------- | -------------------------------------------- |
| Desktop UI       | Electron + React + TypeScript | User interface and configuration             |
| Local Agents     | Python 3.12                   | Audio capture, virtual camera, audio routing |
| Backend Services | Cloud (separate)              | AI/LLM inference, face swap, ASR processing  |

The desktop client communicates with the local Python agents over ZeroMQ and with cloud services over WebSocket and HTTPS. Transcripts, screenshots, and profile data are sent to the backend only when you actively request a suggestion. Nothing is stored remotely in a persistent way.

---

## Privacy at a Glance

- All credentials, session tokens, and profile data are stored locally using Electron Store
- Your CV, job descriptions, and configurations never leave your device unless you explicitly trigger a suggestion
- Transcripts are not stored on external servers after a session ends

---

## What You Need

Before getting started, ensure you have the following:

- A Power Interview account (sign up at using the application)
- A Windows machine
- A working microphone and (optionally) webcam
- **For face swap only**: [OBS Studio](https://obsproject.com/) installed **and the VB-Audio Virtual Cable driver installed** (download from https://vb-audio.com/Cable/). After installing the driver you may need to reboot or restart audio services so that the **CABLE Output** device appears in Windows sound settings.
