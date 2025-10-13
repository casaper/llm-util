import { ChatResponse } from 'ollama';

import { msToHumanDuration } from './ms-to-human-duration';

export const createDebugMdFrontMatter = ({
  model,
  eval_count,
  prompt_eval_count,
  total_duration,
  eval_duration,
  load_duration,
  prompt_eval_duration,
  created_at,
}: ChatResponse) =>
  [
    '---',
    `model: ${model}`,
    `eval_count: ${eval_count}`,
    `prompt_eval_count: ${prompt_eval_count}`,
    `total_duration: ${msToHumanDuration(total_duration)}`,
    `eval_duration: ${msToHumanDuration(eval_duration)}`,
    `load_duration: ${msToHumanDuration(load_duration)}`,
    `prompt_eval_duration: ${msToHumanDuration(prompt_eval_duration)}`,
    `created_at: ${created_at.toISOString()}`,
    '---',
    '',
    '',
  ].join('\n');
