import {
  AiProvider,
  AiCompletionInput,
  AiCompletionOutput,
} from "./providers/ai-provider.interface";
import { ApiError } from "../../utils/api-error";

class AiService {
  private primaryProvider: AiProvider | null = null;
  private backupProvider: AiProvider | null = null;

  setPrimaryProvider(provider: AiProvider): void {
    this.primaryProvider = provider;
  }

  setBackupProvider(provider: AiProvider): void {
    this.backupProvider = provider;
  }

  async complete(input: AiCompletionInput): Promise<AiCompletionOutput> {
    if (this.primaryProvider) {
      try {
        return await this.primaryProvider.complete(input);
      } catch (primaryError) {
        console.warn(
          "Primary AI provider failed, trying backup...",
          primaryError
        );

        if (this.backupProvider) {
          try {
            return await this.backupProvider.complete(input);
          } catch (backupError) {
            console.error("Backup AI provider also failed:", backupError);
          }
        }
      }
    }

    throw new ApiError(503, "AI service is currently unavailable");
  }
}

export const aiService = new AiService();
