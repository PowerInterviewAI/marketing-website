# Installation

This page covers everything you need to install and run Power Interview, whether you are using the prebuilt release or building from source.

---

## Option A - Prebuilt Release (Recommended)

Download the latest installer from the [Releases page](https://github.com/PowerInterviewAI/power-interview-assistant/releases/latest) and run it. The installer packages the Electron app and all compiled Python agents together - no additional setup is required.

After installation, launch **Power Interview** from your Start Menu or desktop shortcut, sign in with your account, and proceed to [configure your profile](#first-run-setup).

---

## Option B - Build from Source

Use this path if you want to run or modify the development version.

### System Requirements

| Requirement      | Minimum Version |
| ---------------- | --------------- |
| Operating System | Windows 10 / 11 |
| Node.js          | 18 or higher    |
| Python           | 3.12            |
| npm              | 8 or higher     |

### External Software (Optional, for specific features)

| Software                                                  | Purpose                                                                                                                            |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [OBS Studio with Virtual Camera](https://obsproject.com/) | Required for the face swap / virtual camera feature                                                                                |
| [VB-Audio Virtual Cable](https://vb-audio.com/Cable/)     | Required for face swap: routes your microphone audio through the virtual camera output so the meeting platform receives your voice |

These are only needed if you intend to use the face swap feature. Transcription of both your voice and the interviewer's voice works without them.

---

### Step 1 - Clone the Repository

```bash
git clone https://github.com/PowerInterviewAI/power-interview-assistant
cd power-interview-assistant
```

---

### Step 2 - Install Node.js Dependencies

```bash
cd app
npm install
cd ..
```

---

### Step 3 - Install Python Dependencies

It is recommended to use a virtual environment:

```bash
python -m venv venv
venv\Scripts\activate       # Windows
pip install -r requirements.txt
```

The key Python packages installed are:

| Package           | Purpose                                         |
| ----------------- | ----------------------------------------------- |
| `pyaudiowpatch`   | Audio capture including system (loopback) audio |
| `pyvirtualcam`    | Virtual camera output                           |
| `opencv-python`   | Video frame processing                          |
| `pyzmq`           | Inter-process communication between agents      |
| `websockets`      | Real-time streaming to backend services         |
| `sounddevice`     | Audio device enumeration and routing            |
| `scipy` / `numpy` | Signal processing                               |
| `loguru`          | Logging                                         |

---

### Step 4 - Build the Python Agents

The Python agents are compiled into standalone executables using Nuitka. Build each agent separately or all at once:

**Build a specific agent:**

```bash
# ASR (transcription) agent
python -m scripts.build_asr_agent

# Audio control agent
python -m scripts.build_audio_control_agent

# Virtual camera agent
python -m scripts.build_vcam_agent
```

**Build all agents at once:**

```bash
python -m scripts.build_all
```

Compiled agent executables will be placed in the `build/agents/` directory.

---

### Step 5 - Run the Application (Development Mode)

```bash
cd app
npm run start
```

This starts both the Vite dev server and the Electron window. The app opens in development mode with hot reload enabled.

Alternatively, to run with the browser content visible in a separate Chrome window (useful for debugging the renderer):

```bash
npm run electron:dev-show
```

---

### Step 6 - Build a Production Installer (Optional)

To produce a self-contained Windows installer:

```bash
# From the repo root
python -m scripts.build_electron_app
```

Or build everything (agents + app) in one command:

```bash
python -m scripts.build_all
```

The packaged installer will be output to the `build/` directory.

---

## First-Run Setup

After launching the app for the first time (whether from the installer or source):

1. **Sign in** with your Power Interview account credentials. If you don't have an account, sign up at [powerinterviewai.com](https://www.powerinterviewai.com/).

2. **Open Configuration** from the profile dropdown (bottom-left of the control panel).

3. **Set up your profile:**
   - Enter your **name** (required)
   - Paste your **CV / resume** or bio summary (required)
   - Paste the **job description** or role context for your upcoming interview (recommended)

4. **Select your microphone:**
   - Click the microphone icon in the control panel to open **Audio Options**
   - Choose your physical microphone from the dropdown
   - The interviewer's voice is captured automatically via Windows system audio loopback - no extra device configuration needed

5. **Face swap setup** (optional - requires OBS Virtual Camera and VB-Audio Virtual Cable):
   - Upload a face swap reference photo in the **Configuration** dialog
   - Click the face icon in the control panel to open **Face Swap Options**
   - Select your physical webcam and preferred resolution
   - Toggle **Face Swap** on from the control panel
   - In your video call app, select **OBS Virtual Camera** as the camera and **CABLE Output (VB-Audio Virtual Cable)** as the microphone

After completing setup, click **Start** to begin a session.

---

## Verifying the Installation

Once the app is running, the health indicator in the UI will show the status of:

- **Backend API** - connection to cloud AI and ASR services
- **GPU Server** - availability of the face swap processing server

If both indicators are green, the app is fully connected and ready to use.
