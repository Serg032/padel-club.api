import { Match } from ".";

export abstract class Repository {
  abstract save(match: Match): Promise<void>;
  abstract findById(id: string): Promise<Match | undefined>;
}
