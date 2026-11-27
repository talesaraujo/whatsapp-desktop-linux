import { app } from "electron";
import en, { Messages } from "./locales/en";
import ptBR from "./locales/pt-BR";

type Key = keyof Messages;
type PluralKey = { [K in Key]: K extends `${infer Base}.other` ? Base : never }[Key];

// Keys are BCP 47 tags. A language without its own regional entry (e.g. "pt-PT")
// falls back to the entry for its base language ("pt"), then to English.
const LOCALES: Record<string, Messages> = {
    "en": en,
    "pt-BR": ptBR,
    "pt": ptBR
};

let resolved: { tag: string, messages: Messages } | null = null;

/** Must only be called after the app is ready, as Electron reports the system languages from then on. */
function locale() {
    if (resolved === null)
        resolved = resolve([...app.getPreferredSystemLanguages(), app.getLocale()]);
    return resolved;
}

function resolve(languages: Array<string>) {
    for (const language of languages) {
        const tag = language.replace("_", "-");
        const base = tag.split("-")[0];

        for (const candidate of [tag, base]) {
            if (LOCALES[candidate])
                return { tag: candidate, messages: LOCALES[candidate] };
        }
    }
    return { tag: "en", messages: en };
}

function format(text: string, params: Record<string, string | number>) {
    return text.replace(/\{(\w+)\}/g, (match, name) => name in params ? String(params[name]) : match);
}

export function t(key: Key, params: Record<string, string | number> = {}) {
    return format(locale().messages[key] ?? en[key], params);
}

/** Picks "<key>.one", "<key>.other", ... according to the locale's plural rules. The count is available as {count}. */
export function tn(key: PluralKey, count: number, params: Record<string, string | number> = {}) {
    const { tag, messages } = locale();
    const category = new Intl.PluralRules(tag).select(count);
    const pluralKey = `${key}.${category}`;
    const text = (messages as Record<string, string>)[pluralKey] ?? messages[`${key}.other` as Key];

    return format(text, { count, ...params });
}
