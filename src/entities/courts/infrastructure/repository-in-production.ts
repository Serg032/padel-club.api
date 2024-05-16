import { CreateCourtCommand } from "../domain";
import { Repository } from "../domain/repository-interface";
import { courtModel } from "./schema";

export class RepositoryInProduction extends Repository {
  async save(court: CreateCourtCommand) {
    try {
      await courtModel.create(court);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An error occurred while saving the court");
      }
    }
  }
  async findById(id: string) {
    try {
      return (await courtModel.findById(id).populate("clubId")) || undefined;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An error occurred while finding the court");
      }
    }
  }
}
