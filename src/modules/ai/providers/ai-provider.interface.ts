export interface AiCompletionInput {
  prompt: string;
  context?: string;
}

export interface AiCompletionOutput {
  result: string;
}

export interface AiProvider {
  complete(input: AiCompletionInput): Promise<AiCompletionOutput>;
}
