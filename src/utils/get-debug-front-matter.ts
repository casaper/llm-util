import { ChatResponse } from 'ollama';

const createFrontMatter = ({
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
    `total_duration: ${total_duration}`,
    `eval_duration: ${eval_duration}`,
    `load_duration: ${load_duration}`,
    `prompt_eval_duration: ${prompt_eval_duration}`,
    `created_at: ${created_at}`,
    '---',
    '',
    '',
  ].join('\n');

/**
 * If debug is true a Markdown YAML front matter block is returned with some ChatResponse metadata.
 */
export const getDebugFrontMatter = (debug: boolean, response: ChatResponse) =>
  debug ? createFrontMatter(response) : '';
