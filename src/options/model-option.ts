import { createOption } from '@commander-js/extra-typings';

import { models } from '../utils/ollama-models';

export const modelOption = createOption('-m, --model <model>', 'Model to use')
  .choices(models)
  .default('mistralNemo');
