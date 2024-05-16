import { Match } from "../domain";
import { Repository } from "../domain/repository-interface";
import { matchModel } from "./schema";

export class RepositoryInProduction extends Repository {
  async save(match: Match): Promise<void> {
    try {
      await matchModel.create(match);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An error occurred while saving the match");
    }
  }
  async findById(id: string): Promise<Match | undefined> {
    try {
      return (await matchModel.findById(id)) || undefined;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An error occurred while finding the match");
    }
  }
}
