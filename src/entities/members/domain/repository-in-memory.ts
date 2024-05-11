import { Member } from ".";

export abstract class Repository {
  abstract save(member: Member): void;
  abstract findById(id: string): Member | undefined;
}
