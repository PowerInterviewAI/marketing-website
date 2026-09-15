/**
 * Every language an interview can run in, and which of them the mock
 * interviewer can speak out loud.
 *
 * Mirrored by hand from two places that are themselves already mirrors of each
 * other: `Language` / `DEEPGRAM_TTS_VOICES` in `backend/app/schemas/language.py`
 * and `LANGUAGES` in `client/src/renderer/types/language.ts`. There is no shared
 * package across the three repos, so a language added to the product is this
 * list plus those two - the same hand-mirroring `src/lib/plans.ts` does for the
 * credit rates.
 *
 * The two columns are two different guarantees and must not be collapsed into
 * one. The transcription set is total: every entry here is a language the
 * speech model streams, and the backend rejects a streaming handshake for
 * anything outside it. `hasVoice` is a strict subset: a language without a
 * voice is a fully supported state, not a gap - the mock interviewer writes its
 * questions instead of speaking them and the scoring is identical - which is
 * why this renders as a marker on the seven rather than a warning on the
 * twenty-one.
 *
 * Keep this file free of imports and of anything but plain data, the same as
 * `routes.ts`: the counts below are read by copy all over the site, including
 * the JSON-LD.
 */

export interface InterviewLanguage {
  /** ISO 639-1, the value that actually travels to the backend. */
  code: string;
  /** English name, for a reader scanning for their language in a script they read. */
  name: string;
  /** Endonym. Someone who does not read English recognises this one first. */
  nativeName: string;
  /** Whether the mock interviewer can speak this language aloud. */
  hasVoice: boolean;
}

/**
 * Enum order, not alphabetical. Alphabetical by English name and alphabetical
 * by endonym are two different orders, so one of the two columns would always
 * read as scrambled; this matches the picker the reader will actually see in
 * the app.
 */
export const INTERVIEW_LANGUAGES: readonly InterviewLanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English', hasVoice: true },
  { code: 'es', name: 'Spanish', nativeName: 'Español', hasVoice: true },
  { code: 'de', name: 'German', nativeName: 'Deutsch', hasVoice: true },
  { code: 'fr', name: 'French', nativeName: 'Français', hasVoice: true },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', hasVoice: false },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', hasVoice: true },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', hasVoice: true },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', hasVoice: false },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', hasVoice: false },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', hasVoice: false },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', hasVoice: false },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', hasVoice: false },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', hasVoice: false },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', hasVoice: false },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', hasVoice: false },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', hasVoice: false },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', hasVoice: false },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', hasVoice: false },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', hasVoice: false },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', hasVoice: false },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', hasVoice: true },
  { code: 'ko', name: 'Korean', nativeName: '한국어', hasVoice: false },
  { code: 'zh', name: 'Chinese', nativeName: '中文', hasVoice: false },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', hasVoice: false },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', hasVoice: false },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', hasVoice: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', hasVoice: false },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', hasVoice: false },
] as const;

/** The languages the mock interviewer speaks aloud, in the same order. */
export const VOICE_LANGUAGES: readonly InterviewLanguage[] = INTERVIEW_LANGUAGES.filter(
  (language) => language.hasVoice
);

/**
 * Derived rather than written down, because the count appears in the hero, the
 * features grid, the mock section and the JSON-LD `featureList`, and a literal
 * `28` in four files is four chances to add a language and ship three of them.
 */
export const LANGUAGE_COUNT = INTERVIEW_LANGUAGES.length;
export const VOICE_LANGUAGE_COUNT = VOICE_LANGUAGES.length;

/**
 * Written right to left. Used to set `dir` on the endonym, which is what keeps
 * the Arabic and Hebrew names from rendering with their punctuation and
 * surrounding layout mirrored inside an otherwise left-to-right page.
 */
export const isRtl = (language: InterviewLanguage): boolean =>
  language.code === 'ar' || language.code === 'he';
