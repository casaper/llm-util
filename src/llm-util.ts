import { program } from '@commander-js/extra-typings';

import { description, version } from '../package.json';
import { commitCommand, correctCommand, factsCommand } from './commands';

program
  .name('llm-util')
  .description(description)
  .version(version)
  .addCommand(factsCommand)
  .addCommand(correctCommand)
  .addCommand(commitCommand)
  .parse();
