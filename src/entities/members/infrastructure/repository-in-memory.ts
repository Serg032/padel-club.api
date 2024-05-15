import { Member } from "../domain";
import { Repository } from "../domain/repository-in-memory";

export class RepositoryInMemory extends Repository {
  members: Set<Member> = new Set<Member>();
  async save(member: Member): Promise<void> {
    this.members.add(member);
  }
  async findById(id: string): Promise<Member | undefined> {
    return Array.from(this.members).find((member) => member.id === id);
  }
}
