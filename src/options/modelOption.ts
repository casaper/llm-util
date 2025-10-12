import { createOption } from '@commander-js/extra-typings';

import { models } from '../utils/ollamaModels';

export const modelOption = createOption('-m, --model <model>', 'Model to use')
  .choices(models)
  .default('mistralNemo');
