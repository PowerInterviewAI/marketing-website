# How It Works

This page explains the high-level architecture of Power Interview AI: what runs on your machine, what runs in the cloud, and how core features are delivered in real time.

---

## Overview

Power Interview AI has three layers:

1. **Desktop App** - interface, session controls, settings, and local state
2. **Local Runtime** - audio capture and OS-level integrations
3. **Cloud Services** - transcription, LLM inference, and account/payment APIs

Together these layers provide low-latency transcription, suggestion streaming, and export workflows. Device settings stay on your machine; your interview configuration is saved to your account so it follows you across devices.

---

## Component Diagram

![Architecture overview - components and connections](/media/docs/architecture-diagram.svg)

---

## Desktop App

The desktop app is built with Electron + React and includes:

- Authentication and account management
- Configuration storage (profile, CV, context, preferences)
- Live session state (running status, transcript, suggestions, captures)
- UI panels for transcription, reply suggestions, and code suggestions
- Stealth mode and hotkey-driven controls

---

## Audio and Transcription Flow

During a session, the app captures:

- Your microphone input
- System audio loopback (interviewer audio)

Both streams are sent for real-time transcription. Partial and final transcript updates are reflected in the UI as they arrive.

The interview language is a property of these two connections, not of the audio device, which is why the two settings behave differently while a session is running. Changing the **microphone** replaces the audio source feeding an existing connection, so nothing reconnects and the transcript is unbroken. Changing the **language** requires both channels to be re-opened against the speech model for that language, which costs a second or two.

Your microphone is only ever the source for your own channel. The interviewer's channel is loopback audio captured from the call and has no device to change.

---

## Suggestion Flow

### Reply Suggestions

When new transcript context is available, the app sends relevant context (transcript + profile + job context + interview language) to the LLM service and streams suggestions back to the UI.

Not every interviewer turn needs an answer. Before a request is made, the app classifies the turn locally: a plain acknowledgement ("mm-hm", "right, okay") is dropped without a request and without a card ever appearing, a complete question is answered immediately, and anything ambiguous waits briefly in case the speech recognizer split one question across two lines. This is why short filler from the interviewer does not produce a suggestion card that flashes up and disappears.

### Code Suggestions

When you capture screenshots, the app sends them to the code suggestion service, then streams generated responses into the code panel with formatting.

---

## Mock Interview Flow

A [mock interview](/docs/mock-interview) reuses the transcription and LLM layers above, wired into a different loop and a different audio path.

- **One channel, not two.** There is no call to capture, so the app never opens the loopback channel. Only your microphone is transcribed.
- **The interviewer's turn is generated, then spoken.** The next question is written from your profile, the job context, the setup you chose and the questions asked so far, then synthesized to speech and streamed back in chunks. Your microphone is gated for as long as it plays, plus a short tail for room reverb, so the question cannot be transcribed as part of your answer.
- **Your turn is transcribed and scored.** When you submit an answer - or a long enough pause submits it for you - the turn is evaluated, and the interviewer either follows up on the same question or moves to the next one.
- **The report is a final pass over the whole session.** Every question and answer is scored together at the end, which is why it takes a moment and why leaving early scores only what was answered.

Where the interview language has no voice available, synthesis is skipped entirely: the question is written instead of spoken and the session goes straight to listening.

---

## Data Storage

Persistent local data includes:

- Login/session tokens
- Profile information (name, CV, context)
- User preferences (theme, selected devices, UI behavior)

Session transcript/suggestion content is retained in memory for the active app session and exported only when requested.

---

## Session Lifecycle

1. User clicks **Start**
2. App validates required configuration
3. Audio capture and transcription begin
4. Transcript and suggestions stream live into the UI
5. User clicks **Stop** (or uses hotkey)
6. Session stops and UI returns to idle state

---

## Credits System

Credits are consumed while AI-assisted features are active (including transcription and suggestion generation). Credit balance is refreshed periodically during a running session and updates after successful payments.

A mock interview is metered differently, because its wall clock is a poor measure of the work delivered: it is charged per question, per follow-up and once for the report, and its transcription is not metered at all. The client quotes the price before the session begins and the balance is checked against it up front, so a session that starts can reach its report.
