import { Court } from ".";

export abstract class Repository {
  abstract save(club: Court): Promise<void>;
  abstract findById(id: string): Promise<Court | undefined>;
}
