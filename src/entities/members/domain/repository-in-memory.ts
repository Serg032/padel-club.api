import { Member } from ".";

export abstract class Repository {
  abstract save(member: Member): void;
}
