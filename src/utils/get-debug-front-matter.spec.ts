import { ChatResponse } from 'ollama';
import { describe, expect, it } from 'vitest';

import { getDebugFrontMatter } from './get-debug-front-matter';

describe('getDebugFrontMatter', () => {
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

  it('should return an empty string when debug is false', () => {
    expect(getDebugFrontMatter(mockChatResponse, false)).toBe('');
  });

  it('should return an empty string when debug is undefined', () => {
    expect(getDebugFrontMatter(mockChatResponse, undefined)).toBe('');
  });

  it('should return debug front matter when debug is true', () => {
    const result = getDebugFrontMatter(mockChatResponse, true);
    expect(result).toMatchSnapshot();
  });
});
