const en = 'en';
const de = 'de';

export type Lang = typeof en | typeof de;

export const langs = [en, de] as const satisfies Lang[];
