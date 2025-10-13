import { ChatResponse } from 'ollama';
import { describe, expect, it } from 'vitest';

import { createDebugMdFrontMatter } from './create-debug-md-front-matter';

describe('createDebugMdFrontMatter', () => {
  const mockChatResponse = {
    model: 'llama3.1:8b',
    created_at: new Date('2024-01-01T00:00:00Z'),
    eval_count: 100,
    prompt_eval_count: 200,
    total_duration: 123400,
    eval_duration: 56700,
    load_duration: 89000,
    prompt_eval_duration: 12300,
    message: {
      role: 'assistant',
      content: 'This is a test response.',
    },
    done: true,
    done_reason: 'done',
  } satisfies ChatResponse;

  it('should generate correct front matter', () => {
    const result = createDebugMdFrontMatter(mockChatResponse);
    expect(result).toMatchSnapshot();
  });

  it('should handle zero durations correctly', () => {
    const responseWithZeroDurations = {
      ...mockChatResponse,
      total_duration: 0,
      eval_duration: 0,
      load_duration: 0,
      prompt_eval_duration: 0,
    };
    const result = createDebugMdFrontMatter(responseWithZeroDurations);
    expect(result).toMatchSnapshot();
  });
});
