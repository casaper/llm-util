import { createArgument, createCommand } from '@commander-js/extra-typings';
import ollama from 'ollama';

import { debugOption, modelOption } from '../options';
import { getDebugFrontMatter, loadMdFileOrStdin } from '../utils';

export const factsCommand = createCommand('facts')
  .description(
    'Extract bullet point facts from job description markdown file or markdown stdin'
  )
  .usage(`llm-util facts [options] [mdFile | -]`)
  .addArgument(createArgument('[mdFile]', 'Markdown file path'))
  .addOption(modelOption)
  .addOption(debugOption)
  .action(async (mdFile, { model, debug }) => {
    try {
      const text = await loadMdFileOrStdin(mdFile);
      const response = await ollama.chat({
        model,
        messages: [
          {
            role: 'system',
            content: [
              `You act as a helpful assistant that creates bullet point fact breakdowns of job opening descriptions given to you in markdown.`,
              `You extract the most important technologies, skills, and responsibilities from the job description, and present them in a bullet point list as concise facts.`,
              `You must not announce your result with any preamble like "Here are the extracted facts" or similar.`,
            ].join(' '),
          },
          {
            role: 'user',
            content: [
              `Extract the facts from the following position:`,
              '',
              text,
            ].join('\n'),
          },
        ],
      });
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
