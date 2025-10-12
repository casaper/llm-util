const en = 'en';
const de = 'de';

export type Lang = typeof en | typeof de;

export const langs: [typeof en, typeof de] = [en, de];
