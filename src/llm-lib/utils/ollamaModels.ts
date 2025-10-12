export const deepseekR1 = 'deepseek-r1:8b';
export const gemma3 = 'gemma3:latest';
export const gpt = 'gpt-oss:20b';
export const granite33 = 'granite3.3:8b';
export const llama31 = 'llama3.1:8b';
export const llama33 = 'llama3.3:70b';
export const mistral = 'mistral:7b';
export const mistralNemo = 'mistral-nemo:12b';
export const qwen3 = 'qwen3:8b';
export const phi4 = 'phi4:14b';

export const modelDict = {
  deepseekR1,
  gemma3,
  gpt,
  granite33,
  llama31,
  llama33,
  mistral,
  mistralNemo,
  qwen3,
  phi4,
};

export type OllamaModel = keyof typeof modelDict;

export const models = Object.keys(modelDict) as OllamaModel[];
