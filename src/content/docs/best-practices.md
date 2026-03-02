# Best Practices

> **Be Careful:**
>
> Always start the Power Interview Assistant **before** joining the call. If you launch the assistant after connecting, you may need to leave and re‑join for the virtual camera and microphone to be detected.
>
> The face‑enhancement feature can introduce latency and may decrease the realism of the resulting face; test it beforehand to ensure it suits your requirements.
>
> Getting the most from Power Interview requires more than just turning it on. The following practices will help you achieve accurate transcription, relevant AI suggestions, and a seamless interview experience.

---

## Profile & Context Setup

### Write a Detailed CV / Profile

The quality of AI reply suggestions depends directly on the detail in your profile. A one-line summary produces generic answers. A thorough profile produces relevant, personalized ones.

**Do:**

- Include your job titles, years of experience, and key responsibilities
- List specific technologies, frameworks, and languages you know
- Mention notable projects with measurable outcomes
- Include soft skills and working preferences when relevant

**Avoid:**

- Pasting a raw PDF-extracted text with garbled formatting
- Leaving the profile field empty or with placeholder text

### Tailor the Context to Each Interview

The **Context** field (job description / role requirements) directly shapes the tone and subject matter of reply suggestions. Before each interview:

1. Click your profile name in the control panel and select **Configuration**.
2. Replace the previous job description with the one from the current role.
3. Highlight the key skills the role requires - the AI will weight those more heavily.

The more aligned your context is to the actual interview, the more targeted and useful the suggestions will be.

---

## Audio Setup

### Use a Dedicated Microphone

The built-in laptop microphone often picks up keyboard sounds, fan noise, and room echo, all of which reduce transcription accuracy. A USB headset or desktop microphone with noise cancellation produces significantly better results.

### How Interviewer Audio is Captured

Power Interview captures the interviewer's voice via Windows WASAPI audio loopback - it reads whatever audio is playing through your system speakers automatically. No extra routing software is needed for transcription to work for both channels.

### Test Audio Before the Interview

Run a short test session a few minutes before the interview starts:

- Speak a few sentences and verify your voice appears in the transcript.
- Play a short audio clip through your speakers and verify the loopback channel picks it up.
- If the microphone channel is missing, re-check that your physical microphone is selected in **Audio Options**.

---

## Face Swap Setup

> **Critical: Start Power Interview assistant before you join the meeting.**
> Video call platforms (Zoom, Teams, Google Meet) detect available camera and audio devices only at launch time. If Power Interview, OBS Virtual Camera, or VB-Cable are not running when you join, the meeting app will not see those virtual devices and face swap cannot be activated. Always start the assistant and confirm the virtual devices are visible in your meeting app settings **before** clicking Join.

### Use OBS Virtual Camera Correctly

Make sure **OBSStudio** is is installed **before** your video call app opens. Many video call platforms (Zoom, Teams) only detect camera devices at launch time. If you start OBS after joining the call, you may need to leave and rejoin.

### Select the Correct Devices in Your Meeting App

When face swap is enabled, your meeting platform must use the virtual devices, not your physical ones:

- **Camera**: select **OBS Virtual Camera**
- **Microphone**: select **CABLE Output (VB-Audio Virtual Cable)**

|                                          Camera Device                                           |                                       Microphone Device                                        |
| :----------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------: |
| ![Select OBS Virtual Camera as camera in your meeting app](/media/docs/meeting-video-device.png) | ![Select CABLE Output as microphone in your meeting app](/media/docs/meeting-audio-device.png) |

Do not select your physical camera or physical microphone in the meeting platform when using the face swap feature.

### Use a Good Reference Photo

The quality of the face swap result is highly sensitive to the reference photo you upload.

**Ideal photo characteristics:**

- Clear, well-lit, front-facing shot
- Neutral or calm expression
- No sunglasses, heavy makeup, hats, or occlusions
- Resolution of at least 512×512 pixels
- Single subject (no other people in the frame)

Avoid blurry photos, side profiles, or images where the face is partially obscured.

![Reference photo guidelines — good vs bad examples](/media/docs/reference-photo-guide.svg)

### Keep Credits Topped Up

Credits are consumed while the assistant is running. Check your balance in the app (shown in the video panel and the stealth status bar) before your interview. Topping up in advance avoids the session being automatically stopped mid-interview due to depleted credits.

---

## Code Suggestion Workflow

### Capture Multiple Angles of the Problem

A single screenshot of a long problem statement often misses important details. Use up to four screenshots to cover:

- The full problem description
- Sample inputs and expected outputs
- Any relevant constraints or examples below the fold

Press `Ctrl+Alt+Shift+P` for each capture, then `Ctrl+Alt+Shift+Enter` to submit.

---

## Stealth Mode & Window Placement

The Power Interview window is always excluded from screen capture and screen share — interviewers cannot see it regardless of where it is placed or whether stealth mode is on.

### Set Up Your Window Position Before the Interview

Decide where the Power Interview window will sit on your screen before the interview begins. Use `Ctrl+Shift+1–9` to snap it to your preferred screen zone. The bottom-right or top-right corners are often least intrusive.

Position it so it is:

- Visible to you at a glance
- Not overlapping the content you need to look at (your IDE, the interviewer's video)

### Enable Stealth Mode During Coding Challenges

Turn on stealth mode (`Ctrl+Shift+M`) whenever you need to type or interact with your IDE without the Power Interview window accidentally capturing focus. This keeps your keystrokes going to the right place.

### Use a Dual-Monitor Setup

If you have two monitors, run your video call on one screen and Power Interview on the other for maximum comfort — the assistant is always on a separate display.

### Practice Hotkeys Beforehand

The hotkey shortcuts are the core interface during an interview. Practice them before your interview so they feel natural:

- Scroll through suggestions without looking at the keyboard
- Capture and submit a screenshot from memory
- Toggle stealth mode and opacity without hesitation

Any fumbling with shortcuts during an interview will be distracting and costly.

---

## Pre-Interview Checklist

Before every interview, run through this checklist:

- [ ] Profile (name, CV) is up to date
- [ ] Context field has the correct job description for this role
- [ ] **Power Interview is started before joining the meeting**
- [ ] Microphone is selected and producing transcript output (test session run)
- [ ] Camera and face swap photo are configured (if using face swap)
- [ ] **Power Interview assistant is running before joining the meeting** (if using face swap — critical)
- [ ] OBS Virtual Camera is started and selected in the video call app (if using face swap)
- [ ] CABLE Output is selected as microphone in the video call app (if using face swap)
- [ ] Credits balance is sufficient for the session (if using face swap)
- [ ] Power Interview window is positioned and hotkeys tested

---

## Ethical Use

Use it responsibly:

- The face swap feature is intended for privacy and personal presentation. Do not use it to impersonate another person.
- AI suggestions are a starting point - adapt them in your own words. Parroting a suggestion verbatim can appear unnatural.
- Ensure your use complies with the terms of service of the platform hosting the interview and with any applicable laws in your jurisdiction.
