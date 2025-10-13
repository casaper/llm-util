import { ChatResponse } from 'ollama';

import { createFrontMatter } from './create-front-matter';

/**
 * If debug is true a Markdown YAML front matter block is returned with some ChatResponse metadata.
 */
export const getDebugFrontMatter = (debug: boolean, response: ChatResponse) =>
  debug ? createFrontMatter(response) : '';
