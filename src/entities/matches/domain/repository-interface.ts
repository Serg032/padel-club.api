import { Match } from ".";

export abstract class Repository {
  abstract save(match: Match): void;
  abstract findById(id: string): Match | undefined;
}
