# Mock Interview

A mock interview is a full practice session inside the app: an AI interviewer speaks its questions, listens to your spoken answers, and scores them.

It uses the same profile and job context your live sessions do, so the questions are about the role you are actually interviewing for and the scoring is about the experience you actually have.

This is the half of the app to reach for first: you can run a session tonight, whereas the [live assistant](/docs/live-interview) only earns its keep once a real interview is booked.

---

## Before You Start

| Requirement    | Where it lives                          | Why                                                                              |
| -------------- | --------------------------------------- | -------------------------------------------------------------------------------- |
| Full name      | **Account**                             | The interviewer addresses you by name.                                            |
| Profile / CV   | **Account**                             | Questions and scoring are both grounded in it.                                    |
| Job context    | **Account**                             | Stands in for the role, which the setup dialog no longer asks for.                |
| Microphone     | **Configuration**                       | Your answers are transcribed from it.                                             |
| Credits        | Bought in the app                       | A session is priced per question - see [What a Session Costs](#what-a-session-costs). |

If your name or profile is missing, the app says so and sends you to **Account** rather than starting a session you would have to abandon.

**Wear headphones.** A mock interview never captures system audio, so the risk on speakers is not the echo a live session has to deal with - it is the tail of the spoken question arriving at the start of the answer your microphone is transcribing. The app shows a headphone notice before every session for exactly this.

---

## Starting a Session

Choose **Mock interview** on the home screen. The setup dialog asks for three things:

| Setting        | Options                          | Notes                                                                                  |
| -------------- | -------------------------------- | -------------------------------------------------------------------------------------- |
| **Seniority**  | Junior, Mid, Senior, Staff       | Sets how deep the questions go and how much the answers are expected to carry.          |
| **Difficulty** | Easy, Standard, Hard             | Independent of seniority - a hard junior interview is a real thing.                     |
| **Questions**  | 3, 5, 8 or 12                    | The price of each length is shown beside it; a length your balance cannot cover is disabled. |

The interview language is the same setting the live assistant uses, edited in the same place - change it here and the live assistant follows, and the other way round.

The role is deliberately not asked for. Your account's job context already names it, and a second copy collected here would be one more thing to keep in sync.

---

## How a Session Runs

Every question follows the same loop:

1. **The interviewer thinks.** The next question is written from your profile, the job context, the difficulty you chose and everything asked so far, so no two runs are the same.
2. **It speaks.** The question is read aloud and appears in the transcript at the same moment. Your microphone is muted while it plays, plus a short tail for room reverb.
3. **You answer out loud.** The level ring tracks your voice and the transcript fills in as you speak. Press **Done answering** when you have finished, or simply stop talking - a long enough pause submits the answer for you.
4. **It scores the turn and decides.** Either the next question, or a follow-up on this one.

Questions come in four kinds - **behavioural**, **technical**, **situational** and a **closing** question that ends the interview - and a question whose answer left something open can draw up to **two follow-ups**. That is the part worth practising: a follow-up is the interviewer telling you the first answer was not finished.

### Controls during a session

| Control                | What it does                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| **Done answering**     | Submits the answer and moves the interview on. Available while it is listening.                 |
| **Live suggestions** (bulb) | Shows what the live assistant would have answered, beside the question. **Off by default** - the point of a mock session is that you do the thinking. Turn it on for a run where comparing the two is the exercise. |
| **End interview**      | Stops the session. Whatever was answered is still scored; the rest is dropped.                  |
| **I'm ready**          | Appears only for a question the interviewer wrote instead of speaking (see [Languages](#languages)). Your answer is recorded from when you press it, so you can read the question first. |

A question met with silence is recorded as skipped and scored as one, the way it would be in a real interview. There is no skip button and no repeat button, for the same reason.

Stealth mode is not available during a mock interview - it exists to hide the assistant from a screen share on a live call, and there is no call here. Navigating away from the session ends it, so the app asks first.

---

## The Report

When the closing question is answered, the session is scored as a whole and the report replaces the interview screen.

- **Overall score**, with a plain verdict against it: excellent, strong, developing, or needs work.
- **Strengths** and **gaps**, drawn from the session rather than from your CV.
- **Every question, scored on its own** - your answer as transcribed, the score, why it landed where it did, and a stronger version of the answer you gave.

Export it as **DOCX** or **Markdown**. The report is written in the language you interviewed in, headings included, so it sits alongside the exports from your real calls.

From the report you can **practice again** with the same setup, or finish and return to the home screen.

---

## What a Session Costs

A live interview is metered by the minute. A mock interview is priced by the work delivered instead, because a large part of its wall clock is the interviewer generating a question, speaking it, scoring the turn and writing the report - none of which you can act during - and most of the rest is your think-time, which is the behaviour the feature exists to train.

| Unit                        | Credits |
| --------------------------- | ------- |
| Question                    | 20      |
| Follow-up                   | 10      |
| Report                      | 40      |
| Transcription, for the whole session | 0 |

So a 5-question session costs **140 credits** before follow-ups and at most 240 if every question draws both of them; an 8-question session is **200** and at most 360.

The app quotes the guaranteed price in the setup dialog and checks your balance against it before the first question, so a session that starts is a session that reaches its report. Follow-ups are charged as they are delivered, and are quietly declined rather than allowed to eat into what the report needs.

Your 1-hour free trial is 600 credits, which covers a couple of full sessions.

---

## Languages

A mock interview runs in any of the 28 interview languages, chosen with the same setting as a live session.

A language marked **text only** in the setup dialog has no voice available. The interviewer writes its questions instead of speaking them, the **I'm ready** control stands in for the end of the audio, and everything else - transcription, follow-ups, scoring, the report - is unchanged.

---

## Getting the Most Out of It

- **Answer out loud, in full.** A mock session is scored on what you said, not what you meant. Rehearsing in your head trains nothing the interview will ask for.
- **Treat a follow-up as the signal it is.** It means the answer left something open. Notice what you keep being asked twice.
- **Run the same setup twice.** The questions are generated fresh each time, so a second run at the same seniority and difficulty is new material, not a re-read.
- **Read the stronger answer, then say it back.** The gap between yours and it is the practice.
- **Keep live suggestions off for the first run.** Turn them on for a later one, when the exercise is comparing your answer with the assistant's rather than producing your own.

---

## Practising Without a Session

If you would rather rehearse without spending credits, a general-purpose voice assistant will hold a passable interview. It has no access to your CV, no scoring and no report, but it is free and it makes you talk.

1. **Enter ChatGPT voice mode**

| Enter Voice Mode                                                | Voice Mode is Ready                                                    |
| --------------------------------------------------------------- | ---------------------------------------------------------------------- |
| ![Opening ChatGPT voice mode](/media/docs/mock-interview-1.png) | ![ChatGPT voice mode ready to start](/media/docs/mock-interview-2.png) |

2. **Submit the following prompt**:

```
You are a senior technical interviewer hiring for a Senior FastAPI Backend Developer role.

Evaluate the candidate thoroughly on:
- Advanced FastAPI development
- Asynchronous programming (async/await, concurrency patterns)
- Agentic AI and AI agent architectures
- LLM integration and best practices

Be professional, conversational, and ask insightful follow-up questions.

Begin the interview by asking your first question.
```

![Submitting the interviewer prompt in ChatGPT voice mode](/media/docs/mock-interview-3.png)

3. It begins the interview simulation in voice mode.

![The voice-mode interview simulation under way](/media/docs/mock-interview-4.png)

Customise the prompt for the role or the skills you want to drill.
