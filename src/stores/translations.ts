import {
  browser,
  type ComponentsJSON,
  createI18n,
  formatter,
  localeFrom,
} from "@nanostores/i18n";
import ky from "ky";

export const locale = localeFrom(
  browser({ available: ["en"], fallback: "en" }),
);

export const i18n = createI18n(locale, {
  async get(code) {
    return await ky.get(`/translations/${code}.json`).json() as ComponentsJSON;
  },
});

export const format = formatter(locale);
