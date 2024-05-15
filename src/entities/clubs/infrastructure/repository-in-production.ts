import { Club, CreateClubCommand } from "../domain";
import { Repository } from "../domain/repository-interface";
import { clubModel } from "./schema";

export class RepositoryInProduction extends Repository {
  async save(club: CreateClubCommand): Promise<void> {
    try {
      await clubModel.create(club);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An error occurred while saving the club");
      }
    }
  }
  async findById(id: string): Promise<Club | undefined> {
    try {
      return (await clubModel.findById(id)) || undefined;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An error occurred while finding the club");
      }
    }
  }
}
