import { Member } from "../domain";
import { Repository } from "../domain/repository-in-memory";
import { memberModel } from "./schema";

export class RepositoryInProduction extends Repository {
  async save(member: Member): Promise<void> {
    try {
      await memberModel.create(member);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An error occurred while saving the member");
    }
  }
  async findById(id: string): Promise<Member | undefined> {
    try {
      return (await memberModel.findById(id)) || undefined;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An error occurred while finding the member");
    }
  }
}
