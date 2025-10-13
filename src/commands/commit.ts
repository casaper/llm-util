import { createCommand } from '@commander-js/extra-typings';
import { exec } from 'child_process';
import ollama from 'ollama';
import { promisify } from 'util';

import { debugOption, modelOption } from '../options';
import { getDebugFrontMatter } from '../utils';
import { conventionalCommitRules } from './conventional_commit_rules';

const execAsync = promisify(exec);

async function getStagedGitDiff(): Promise<string> {
  try {
    const { stdout } = await execAsync('git diff --staged');
    return stdout;
  } catch (error) {
    throw new Error(
      `Failed to get staged git diff: ${error instanceof Error ? error.message : error}`
    );
  }
}

export const commitCommand = createCommand('commit')
  .description(
    'Generate conventional commit message from currently staged git diff. The generated commit message is printed to stdout. gpt-oss or llama3.3 delivered good results in my tests.'
  )
  .usage(`llm-util commit [options]`)
  .addOption(modelOption)
  .addOption(debugOption)
  .action(async ({ model, debug }) => {
    try {
      const diff = await getStagedGitDiff();
      const response = await ollama.chat({
        model,
        messages: [
          {
            role: 'system',
            content: conventionalCommitRules,
          },
          {
            role: 'user',
            content: [
              `Generate a commit message for the following git diff:`,
              '',
              diff,
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
