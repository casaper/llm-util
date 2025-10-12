import { program } from '@commander-js/extra-typings';

import { correctCommand, factsCommand } from './commands';

program
  .name('llm-tool')
  .description('Markdown LLM Tools')
  .addCommand(factsCommand)
  .addCommand(correctCommand)
  .parse();
