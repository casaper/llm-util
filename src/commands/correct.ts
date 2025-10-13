import {
  createArgument,
  createCommand,
  createOption,
} from '@commander-js/extra-typings';
import ollama from 'ollama';

import { debugOption, modelOption } from '../options';
import { getDebugFrontMatter, langs, loadMdFileOrStdin } from '../utils';

const systemPrompts = {
  de: [
    `Du bist ein Korrekturleser und korrigierst Markdown-Text in Schweizer Hochdeutsch.`,
    /**
     * I don't believe how hard it is to convince the bloody model to not correct the fine 'ss' to 'ß'.
     */
    'Weil es in der Schweiz nicht existiert, darf das Szett "ß" unter keinen Umständen verwendet werden und muss zu "ss" korrigiert werden.',
    'Wenn du ein "ss" siehst, darfst du es niemals zu "ß" korrigieren.',
    // 'verbesserst die Rechtschreibung und die Grammatik nach Schweizerischer Rechtschreibung (de-CH) des Markdown-Texts.',
    'Die ursprüngliche Bedeutung des Textes darf nicht verändert werden.',

    /**
     * Try to allow profanity.
     */
    // 'Du darfst nicht bewerten wie die Worte auf andere wirken.',

    /**
     * Seems to be confusing, especially for small models.
     */
    // `Erhalte die «Sie»-Form oder die «Du»-Form des Textes, je nachdem, was im Original verwendet wird.`,

    /**
     * The success of this heavily depends on the model. Some models just ignore it, others do it over exaggerated in the start of long words for example.
     */
    // `Wenn im Original ein Wort nicht gegendert ist, dan ändere dies zur gegenderten form mit Doppelpunkt (z.B. "Politiker" zu "Politiker:innen" oder "Kunde" zu "Kund:in").`,

    /**
     * This would be nice, but perhaps it just increases confusion and complexity with no gain in the actual result.
     */
    // `Als erstes gibst du die Änderungen, die du vorgenommen hast, und die Gründe dafür in einer Liste aus, dann gibst du den vollständigen korrigierten Text im gleichen Markdown-Format wie die Eingabe an.`,

    /**
     * This strangely caused most models to correct correct 'ss' to 'ß' some times.
     */
    // `Das Deutsch muss in Schweizerischer Rechtschreibung (de-CH) sein. 'ß' darf nicht verwendet werden und muss zu 'ss' korrigiert werden.`,
  ].join(' '),
  en: [
    `You act as a helpful proof reader and correct and improve the British English (en-GB) text provided to you in Markdown format`,
    'without altering the original meaning of the text.',
    /**
     * Try to allow profanity.
     */
    'You are not allowed to judge how the words used affect others.',

    // `You correct any spelling, grammar, or punctuation mistakes, and improve the overall clarity and flow of the text while preserving the original meaning.`,
    // `The English must be British English (en-GB), and use vocabulary and phrasing common for british English speakers.`,
    // `First you list the changes you made and the reasons for them in bullet points, then you provide the full corrected text in the same markdown format as the input.`,
  ].join(' '),
};
const userPrompts = {
  en: (text: string) => [`Correct the following text:`, '', text].join('\n'),
  de: (text: string) => [`Korrigiere folgenden Text:`, '', text].join('\n'),
};

export const correctCommand = createCommand('correct')
  .description(
    'Correct spelling, grammar, and improve clarity of a markdown file or markdown stdin. The llama3.1 or llama3.3 models seem to work particularly bad for this task. gemma3 or qwen3:8b performed better.'
  )
  .usage(`llm-util correct [options] [mdFile | -]`)
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
      const text = await loadMdFileOrStdin(mdFile);
      const response = await ollama.chat({
        model,
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
      process.stderr.write(
        [`Original Text:`, text, '', '---', '', ''].join('\n')
      );
      console.log(
        `${getDebugFrontMatter(response, debug)}${response.message.content}`
      );
      process.exit(0);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`${error.name}: ${error.message}`, error);
      } else {
        console.error(`Error: ${error}`);
      }
      process.exit(1);
    }
  });
