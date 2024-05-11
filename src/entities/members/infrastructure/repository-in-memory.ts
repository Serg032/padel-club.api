import { Member } from "../domain";
import { Repository } from "../domain/repository-in-memory";

export class RepositoryInMemory extends Repository {
  members: Set<Member> = new Set<Member>();
  save(member: Member): void {
    this.members.add(member);
  }
  findById(id: string): Member | undefined {
    return Array.from(this.members).find((member) => member.id === id);
  }
}
