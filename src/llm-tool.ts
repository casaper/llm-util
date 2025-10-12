#!/usr/bin/env -S npx tsx

import { program } from '@commander-js/extra-typings';

import { correctCommand, factsCommand } from './llm-lib';

program
  .name('llm-tool')
  .description('Markdown LLM Tools')
  .addCommand(factsCommand)
  .addCommand(correctCommand)
  .parse();
