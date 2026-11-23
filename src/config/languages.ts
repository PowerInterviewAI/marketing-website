/**
 * Every language an interview can run in, and which of them the mock
 * interviewer can speak out loud.
 *
 * Mirrored by hand from two places that are themselves already mirrors of each
 * other: `Language` / `DEEPGRAM_TTS_VOICES` in `backend/app/schemas/language.py`
 * and `LANGUAGES` in `client/src/renderer/types/language.ts`. There is no shared
 * package across the three repos, so a language added to the product is this
 * list plus those two - the same hand-mirroring `src/lib/plans.ts` does for the
 * plans.
 *
 * The two columns are two different guarantees and must not be collapsed into
 * one. The transcription set is total: every entry here is a language the
 * speech model streams, and the backend rejects a streaming handshake for
 * anything outside it. `hasVoice` is a strict subset: a language without a
 * voice is a fully supported state, not a gap - the mock interviewer writes its
 * questions instead of speaking them and the scoring is identical - which is
 * why this renders as a marker on the voiced languages rather than a warning
 * on the rest.
 *
 * Keep this file free of imports and of anything but plain data, the same as
 * `routes.ts`: the counts below are read by copy all over the site, including
 * the JSON-LD.
 */

export interface InterviewLanguage {
  /**
   * The value that actually travels to the backend: lowercase ISO 639-1 where
   * one exists, ISO 639-3 where it does not (`ckb`, `kok`), and `zh-hk` /
   * `zh-tw` for Cantonese and Traditional Mandarin.
   */
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
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', hasVoice: true },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', hasVoice: true },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', hasVoice: true },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', hasVoice: true },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', hasVoice: true },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', hasVoice: true },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', hasVoice: true },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', hasVoice: true },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', hasVoice: true },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', hasVoice: true },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', hasVoice: true },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', hasVoice: true },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', hasVoice: true },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', hasVoice: true },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', hasVoice: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', hasVoice: true },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', hasVoice: true },
  { code: 'ko', name: 'Korean', nativeName: '한국어', hasVoice: true },
  { code: 'zh', name: 'Chinese', nativeName: '中文', hasVoice: true },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', hasVoice: true },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', hasVoice: false },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', hasVoice: true },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', hasVoice: false },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', hasVoice: false },
  { code: 'ab', name: 'Abkhazian', nativeName: 'Аԥсуа', hasVoice: false },
  { code: 'ady', name: 'Adyghe', nativeName: 'Адыгабзэ', hasVoice: false },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', hasVoice: false },
  { code: 'ak', name: 'Akan', nativeName: 'Akan', hasVoice: false },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip', hasVoice: false },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', hasVoice: false },
  { code: 'hy', name: 'Armenian', nativeName: 'Հայերեն', hasVoice: false },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', hasVoice: false },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycanca', hasVoice: false },
  { code: 'eu', name: 'Basque', nativeName: 'Euskara', hasVoice: false },
  { code: 'be', name: 'Belarusian', nativeName: 'Беларуская', hasVoice: false },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', hasVoice: true },
  { code: 'brx', name: 'Bodo', nativeName: 'बड़ो', hasVoice: false },
  { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski', hasVoice: false },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', hasVoice: true },
  { code: 'ca', name: 'Catalan', nativeName: 'Català', hasVoice: true },
  { code: 'ckb', name: 'Central Kurdish', nativeName: 'کوردیی ناوەندی', hasVoice: false },
  { code: 'zh-hk', name: 'Cantonese', nativeName: '粵語', hasVoice: true },
  { code: 'zh-tw', name: 'Chinese (Traditional)', nativeName: '繁體中文', hasVoice: true },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', hasVoice: true },
  { code: 'dv', name: 'Divehi', nativeName: 'ދިވެހި', hasVoice: false },
  { code: 'mhr', name: 'Eastern Mari', nativeName: 'Олык марий', hasVoice: false },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti', hasVoice: true },
  { code: 'gl', name: 'Galician', nativeName: 'Galego', hasVoice: false },
  { code: 'ka', name: 'Georgian', nativeName: 'ქართული', hasVoice: false },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', hasVoice: true },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', hasVoice: false },
  { code: 'is', name: 'Icelandic', nativeName: 'Íslenska', hasVoice: false },
  { code: 'kbd', name: 'Kabardian', nativeName: 'Къэбэрдеибзэ', hasVoice: false },
  { code: 'kab', name: 'Kabyle', nativeName: 'Taqbaylit', hasVoice: false },
  { code: 'kln', name: 'Kalenjin', nativeName: 'Kalenjin', hasVoice: false },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', hasVoice: true },
  { code: 'ks', name: 'Kashmiri', nativeName: 'کٲشُر', hasVoice: false },
  { code: 'kk', name: 'Kazakh', nativeName: 'Қазақ тілі', hasVoice: false },
  { code: 'rw', name: 'Kinyarwanda', nativeName: 'Ikinyarwanda', hasVoice: false },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', hasVoice: false },
  { code: 'ky', name: 'Kyrgyz', nativeName: 'Кыргызча', hasVoice: false },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu', hasVoice: true },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', hasVoice: true },
  { code: 'lg', name: 'Luganda', nativeName: 'Luganda', hasVoice: false },
  { code: 'luo', name: 'Luo', nativeName: 'Dholuo', hasVoice: false },
  { code: 'mk', name: 'Macedonian', nativeName: 'Македонски', hasVoice: false },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', hasVoice: true },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', hasVoice: false },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', hasVoice: true },
  { code: 'mn', name: 'Mongolian', nativeName: 'Монгол', hasVoice: false },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', hasVoice: false },
  { code: 'kmr', name: 'Northern Kurdish', nativeName: 'Kurmancî', hasVoice: false },
  { code: 'ps', name: 'Pashto', nativeName: 'پښتو', hasVoice: false },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', hasVoice: false },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', hasVoice: false },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски', hasVoice: false },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي', hasVoice: false },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', hasVoice: false },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', hasVoice: true },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', hasVoice: true },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', hasVoice: false },
  { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog', hasVoice: true },
  { code: 'dav', name: 'Taita', nativeName: 'Kitaita', hasVoice: false },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', hasVoice: true },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', hasVoice: true },
  { code: 'tn', name: 'Tswana', nativeName: 'Setswana', hasVoice: false },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', hasVoice: true },
  { code: 'ug', name: 'Uyghur', nativeName: 'ئۇيغۇرچە', hasVoice: false },
  { code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbekcha', hasVoice: false },
  { code: 've', name: 'Venda', nativeName: 'Tshivenḓa', hasVoice: false },
  { code: 'cy', name: 'Welsh', nativeName: 'Cymraeg', hasVoice: false },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', hasVoice: false },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', hasVoice: false },
] as const;

/** The languages the mock interviewer speaks aloud, in the same order. */
export const VOICE_LANGUAGES: readonly InterviewLanguage[] = INTERVIEW_LANGUAGES.filter(
  (language) => language.hasVoice
);

/**
 * Derived rather than written down, because the count appears in the hero, the
 * features grid, the mock section and the JSON-LD `featureList`, and a literal
 * count in four files is four chances to add a language and ship three of them.
 */
export const LANGUAGE_COUNT = INTERVIEW_LANGUAGES.length;
export const VOICE_LANGUAGE_COUNT = VOICE_LANGUAGES.length;

const RTL_CODES: ReadonlySet<string> = new Set([
  'ar',
  'he',
  'ckb',
  'dv',
  'ks',
  'ps',
  'fa',
  'sd',
  'ur',
  'ug',
]);

/**
 * Written right to left. Used to set `dir` on the endonym, which is what keeps
 * the Arabic-script, Hebrew and Thaana names from rendering with their
 * punctuation and surrounding layout mirrored inside an otherwise
 * left-to-right page.
 */
export const isRtl = (language: InterviewLanguage): boolean => RTL_CODES.has(language.code);
