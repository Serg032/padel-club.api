import { Club } from ".";

export abstract class Repository {
  abstract save(club: Club): void;
  abstract findById(id: string): Club | undefined;
}
