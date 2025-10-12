import {
  createArgument,
  createCommand,
  createOption,
} from '@commander-js/extra-typings';
import ollama from 'ollama';

import { debugOption, modelOption } from './options';
import {
  getDebugFrontMatter,
  langs,
  modelDict,
  readMdFileIfExists,
} from './utils';

const systemPrompts = {
  en: [
    `You act as a helpful proof reader and correct and improve the text provided to you in Markdown format.`,
    `You correct any spelling, grammar, or punctuation mistakes, and improve the overall clarity and flow of the text while preserving the original meaning.`,
    `The English must be British English (en-GB), and use vocabulary and phrasing common for british English speakers.`,
    `First you list the changes you made and the reasons for them in bullet points, then you provide the full corrected text in the same markdown format as the input.`,
  ].join(' '),
  de: [
    `Du bist ein Korrekturleser der Schweizerischen Rechtschreibung (de-CH) und verbesserst den dir im Markdown-Format bereitgestellten Text.`,
    // `Das Deutsch muss in Schweizerischer Rechtschreibung (de-CH) sein. 'ß' darf nicht verwendet werden und muss zu 'ss' korrigiert werden.`,
    // `Du korrigierst alle Rechtschreib-, Grammatik- oder Zeichensetzungsfehler und verbesserst die allgemeine Klarheit und den Fluss des Textes, während die ursprüngliche Bedeutung erhalten bleibt.`,
    // `Erhalte die «Sie»-Form oder die «Du»-Form des Textes, je nachdem, was im Original verwendet wird.`,
    `Wenn im Original ein Wort nicht gegendert ist, dan ändere dies zur gegenderten form mit Doppelpunkt (z.B. "Politiker" zu "Politiker:innen" oder "Kunde" zu "Kund:in").`,
    // `Worte für die es eine passende genderneutrale Form gibt wandelst du in diese um (z.B. "Mitarbeiter" zu "Mitarbeitende"), wenn dies der Text zulässt.`,
    `Als erstes gibst du die Änderungen, die du vorgenommen hast, und die Gründe dafür in einer Liste aus, dann gibst du den vollständigen korrigierten Text im gleichen Markdown-Format wie die Eingabe an.`,
  ].join(' '),
};
const userPrompts = {
  en: (text: string) => [`Correct the following text:`, '', text].join('\n'),
  de: (text: string) => [`Korrigiere folgenden Text:`, '', text].join('\n'),
};

export const correctCommand = createCommand('correct')
  .description('Extract bullet point facts from job description markdown file')
  .addArgument(createArgument('[mdFile]', 'Markdown file path'))
  .addOption(
    createOption('-l, --lang <lang>', 'Language to proofread.')
      .choices(langs)
      .default('de')
  )
  .addOption(modelOption)
  .addOption(debugOption)
  .action(async (mdFile, { model, debug, lang }) => {
    try {
      const text =
        mdFile === '-' || !mdFile?.length
          ? await new Promise<string>((resolve, reject) => {
              let data = '';
              process.stdin.on('data', chunk => (data += chunk));
              process.stdin.on('end', () => resolve(data));
              process.stdin.on('error', reject);
            })
          : await readMdFileIfExists(mdFile);
      const response = await ollama.chat({
        model: modelDict[model],
        messages: [
          {
            role: 'system',
            content: systemPrompts[lang],
          },
          {
            role: 'user',
            content: userPrompts[lang](text),
          },
        ],
      });
      console.log(
        `${getDebugFrontMatter(debug, response)}${response.message.content}`
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(`${error.name}: ${error.message}`, error);
      } else {
        console.error(`Error: ${error}`);
      }
      process.exit(1);
    }
  });
