import { ChatResponse } from 'ollama';
import { stringify } from 'yaml';

export const getDebugFrontMatter = (
  debug: boolean,
  {
    model,
    eval_count,
    prompt_eval_count,
    total_duration,
    eval_duration,
    load_duration,
    prompt_eval_duration,
    created_at,
  }: ChatResponse
) =>
  debug
    ? `---\n${stringify({
        model,
        eval_count,
        prompt_eval_count,
        eval_duration,
        load_duration,
        prompt_eval_duration,
        total_duration,
        created_at,
      })}---\n\n`
    : '';
