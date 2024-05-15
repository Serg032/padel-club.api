import { Member } from "../domain";
import { Repository } from "../domain/repository-in-memory";

export class RepositoryInProduction extends Repository {
  async save(member: Member) {
    await memberModel.create(member);
  }
  async findById(id) {
    return await member;
  }
}
