import { Court } from ".";

export abstract class Repository {
  abstract save(club: Court): void;
  abstract findById(id: string): Court | undefined;
}
