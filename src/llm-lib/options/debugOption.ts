import { createOption } from '@commander-js/extra-typings';

export const debugOption = createOption(
  '-d, --debug',
  'Add debug information as YAML front matter to markdown output.'
).default(false);
