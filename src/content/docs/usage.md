# Usage

This page describes how to use Power Interview during a live interview session, including transcription, AI suggestions, code assistance, face swap, stealth mode, and window management.

---

## Starting a Session

1. Launch Power Interview.
2. Review configuration and settings to ensure your profile is complete and devices are set up correctly.
3. Click the **Start** button to activate transcription and AI assistance.

Once started, the app begins capturing audio from your configured microphone (your voice) and the system audio loopback (the interviewer's voice). Both channels are streamed to the ASR backend in real time and displayed in the transcript panel.

To stop the session at any time, click **Stop** in the UI or press `Ctrl+Shift+Q` from any window (this also exits stealth mode if active).

---

## Transcription

### How It Works

- Your voice is captured through your selected physical microphone.
- The interviewer's voice is captured automatically via Windows system audio loopback (whatever is playing through your speakers from the video call). No additional device configuration is needed.
- Both streams are sent to the ASR backend over WebSocket and returned as live transcription.
- Each line is labeled by speaker name: your configured name or "Interviewer", with a timestamp.

---

## AI Reply Suggestions

Reply suggestions are generated based on the current transcript, your profile (name, CV), and the job context you configured.

### Getting a Suggestion

Suggestions are triggered automatically as the AI determines a response is useful, or you can request one manually through the UI. The suggestion streams into the reply panel word by word in real time.

### Scrolling Suggestions

You can use the keyboard to scroll through reply suggestion content without leaving your video call window:

| Action      | Shortcut       |
| ----------- | -------------- |
| Scroll up   | `Ctrl+Shift+K` |
| Scroll down | `Ctrl+Shift+J` |

---

## AI Code Suggestions

For technical interviews with coding problems, Power Interview can analyze your screen and suggest solutions.

### Workflow

1. When a coding problem appears on screen (in your browser, IDE, or shared screen), press `Ctrl+Alt+Shift+P` to take a screenshot.
2. You can capture up to **4 screenshots** to provide more context (e.g., multiple parts of the problem due overflowed content or different tabs).
3. Press `Ctrl+Alt+Shift+Enter` to submit the screenshots for analysis.
4. The AI processes the images and streams a suggested solution with syntax-highlighted code into the code suggestion panel.
5. To clear the captured screenshots (e.g., mistakes), press `Ctrl+Alt+Shift+X` to clear all captured screenshots.

### Scrolling Code Suggestions

| Action      | Shortcut       |
| ----------- | -------------- |
| Scroll up   | `Ctrl+Shift+I` |
| Scroll down | `Ctrl+Shift+U` |

---

## Face Swap

The face swap feature replaces your webcam output with a face-swapped stream - your physical appearance is replaced with the face from the photo you configured in settings.

### Setting It Up

1. Ensure **OBS Studio** is installed before opening your video call.
2. In your video call app (Zoom, Google Meet, Teams, etc.), select:
   - **OBS Virtual Camera** as your camera source
   - **CABLE Output (VB-Audio Virtual Cable)** as your microphone
3. In Power Interview, open **Face Swap Options** from the control panel (face scan icon), select your webcam and resolution, then close the dialog.
4. Toggle **Face Swap on** using the face icon button in the control panel.

The VCam Agent captures frames from your webcam, streams them to the face swap backend, and pushes the processed output to OBS Virtual Camera.

### Face Swap Settings

| Setting          | Description                                        |
| ---------------- | -------------------------------------------------- |
| Camera Device    | Physical webcam used as the video input            |
| Resolution       | Output resolution: 640×360, 640×480, or 1280×720   |
| Face Enhancement | Toggle AI post-processing for more natural results |

---

## Stealth Mode

The Power Interview window is **always hidden from screen capture and screen share** — interviewers cannot see it at any time, regardless of whether stealth mode is on or off.

Stealth mode is about **focus control**. When active, the window will not steal focus from your coding challenge, IDE, or video call. You stay in full control of your keyboard and mouse at all times.

### Activating Stealth Mode

Press `Ctrl+Shift+M` to toggle stealth mode on or off.

### Opacity Toggle

Press `Ctrl+Shift+N` to toggle a low-opacity overlay, letting you glance at suggestions through a semi-transparent window without switching focus away from your active window.

---

## Window Management

Because you cannot use the mouse to interact with Power Interview while focused on your interview, all window controls are available via keyboard shortcuts.

### Positioning the Window

Use a numpad-style layout to snap the window to any screen position:

```
Ctrl+Shift+7   Ctrl+Shift+8   Ctrl+Shift+9
Ctrl+Shift+4   Ctrl+Shift+5   Ctrl+Shift+6
Ctrl+Shift+1   Ctrl+Shift+2   Ctrl+Shift+3
```

| Key            | Position      |
| -------------- | ------------- |
| `Ctrl+Shift+7` | Top-left      |
| `Ctrl+Shift+8` | Top-center    |
| `Ctrl+Shift+9` | Top-right     |
| `Ctrl+Shift+4` | Middle-left   |
| `Ctrl+Shift+5` | Center        |
| `Ctrl+Shift+6` | Middle-right  |
| `Ctrl+Shift+1` | Bottom-left   |
| `Ctrl+Shift+2` | Bottom-center |
| `Ctrl+Shift+3` | Bottom-right  |

### Fine-Tuning Position and Size

| Action        | Shortcut               |
| ------------- | ---------------------- |
| Move window   | `Ctrl+Alt+Shift+Arrow` |
| Resize window | `Ctrl+Win+Shift+Arrow` |

---

## Profile & Settings

Access your settings by clicking the **profile icon** in the app's control panel.

### Profile Settings

| Field        | Description                                                          |
| ------------ | -------------------------------------------------------------------- |
| Name         | Your name (required) - used as the speaker label and in AI responses |
| Profile / CV | Your resume, bio, or portfolio content (required)                    |
| Context      | Job description or role requirements for the interview (recommended) |
| Face Photo   | Reference photo used for face swap                                   |

### Device Settings

| Setting    | Where to configure            | Description                              |
| ---------- | ----------------------------- | ---------------------------------------- |
| Microphone | Audio Options (mic icon)      | Physical microphone for your voice       |
| Camera     | Face Swap Options (face icon) | Webcam used as video input for face swap |

### Account Menu

Click your name/avatar in the bottom-left of the control panel to access:

- **Configuration** - open the profile/settings dialog
- **Change Password** - update your account password
- **Buy Credits** - go to the payments page
- **Sign Out** - log out of your account

---

## Session Tools

The control panel toolbar includes two utility buttons (at the right edge):

### Export Interview

The **Export** button generates a Word document (`.docx`) containing:

- An AI-generated summary of the interview
- Full timestamped transcript with speaker labels
- All reply suggestions with the questions that triggered them

A save dialog appears so you can choose where to save the file.

### Clear Session

The **Clear** button removes all transcripts, reply suggestions, and code suggestions from the current session. This does not affect your saved profile, credentials, or settings.

---

## Credits & Payments

Credits are consumed while the assistant is running — covering AI reply suggestions, transcription, and face swap processing. Your remaining credit balance is shown live in the video panel and in the status bar (stealth mode).

To buy credits:

1. Click your name/avatar in the control panel.
2. Select **Buy Credits**.
3. Choose a credit package, complete payment, and your balance updates automatically.

You can also view your payment history and check pending payment status from the same page.

---

## Complete Hotkey Reference

| Action                        | Shortcut                        |
| ----------------------------- | ------------------------------- |
| Stop all & exit stealth       | `Ctrl+Shift+Q`                  |
| Toggle stealth mode           | `Ctrl+Shift+M`                  |
| Toggle window opacity         | `Ctrl+Shift+N`                  |
| Position window (numpad)      | `Ctrl+Shift+1` – `Ctrl+Shift+9` |
| Move window                   | `Ctrl+Alt+Shift+Arrow`          |
| Resize window                 | `Ctrl+Win+Shift+Arrow`          |
| Scroll reply suggestions down | `Ctrl+Shift+J`                  |
| Scroll reply suggestions up   | `Ctrl+Shift+K`                  |
| Scroll code suggestions down  | `Ctrl+Shift+U`                  |
| Scroll code suggestions up    | `Ctrl+Shift+I`                  |
| Capture screenshot            | `Ctrl+Alt+Shift+P`              |
| Submit screenshots            | `Ctrl+Alt+Shift+Enter`          |
| Clear screenshots             | `Ctrl+Alt+Shift+X`              |
