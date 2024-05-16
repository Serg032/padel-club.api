import { Member } from ".";

export abstract class Repository {
  abstract save(member: Member): Promise<void>;
  abstract findById(id: string): Promise<Member | undefined>;
}
