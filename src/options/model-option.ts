import { createOption } from '@commander-js/extra-typings';

export const modelOption = createOption(
  '-m, --model <model>',
  'Model to use. For available models run `ollama list`.'
).default('gemma3');
