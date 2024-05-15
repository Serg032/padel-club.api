import { Club } from ".";

export abstract class Repository {
  abstract save(club: Club): Promise<void>;
  abstract findById(id: string): Promise<Club | undefined>;
}
