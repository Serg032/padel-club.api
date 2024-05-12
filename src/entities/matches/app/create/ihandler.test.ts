import { MemberType } from "../../../members/domain";
import { CreateMatchCommand, Match } from "../../domain";
import { PriceService } from "../services/price-service";

export abstract class Repository {
  abstract save(match: Match): void;
  abstract findById(id: string): Match | undefined;
}

export class RepositoryInMemory extends Repository {
  matches: Set<Match> = new Set<Match>();
  save(match: Match): void {
    this.matches.add(match);
  }

  findById(id: string): Match | undefined {
    return Array.from(this.matches).find((match) => match.id === id);
  }
}

export class Handler {
  constructor(private repository: Repository) {}

  create(match: Match): void {
    this.repository.save(match);
  }
}

describe("When creating a match", () => {
  const repository = new RepositoryInMemory();
  const handler = new Handler(repository);
  const matchStartDate = new Date("2024-05-12T10:00:00").getTime();
  const matchEndDate = new Date("2024-05-12T11:30:00").getTime();
  const priceService = new PriceService();
  const command: CreateMatchCommand = {
    id: "1",
    clubId: "1",
    courtId: "1",
    start: matchStartDate,
    end: matchEndDate,
    teams: [
      {
        drive: {
          id: "1",
          name: "John",
          email: "",
          money: 0,
          type: MemberType.USER,
        },
        backhand: {
          id: "2",
          name: "Jane",
          email: "",
          money: 0,
          type: MemberType.USER,
        },
      },
      {
        drive: {
          id: "3",
          name: "Jack",
          email: "",
          money: 0,
          type: MemberType.USER,
        },
        backhand: {
          id: "4",
          name: "Jill",
          email: "",
          money: 0,
          type: MemberType.USER,
        },
      },
    ],
    price: priceService.calculatePrice(matchStartDate, matchEndDate),
  };

  it("should save the match", () => {
    handler.create(command);
    expect(repository.matches.size).toBe(1);
    expect(repository.matches.values().next().value.id).toBe(command.id);
    expect(repository.matches.values().next().value.clubId).toBe(
      command.clubId
    );
    expect(repository.matches.values().next().value.courtId).toBe(
      command.courtId
    );
    expect(repository.matches.values().next().value.start).toBe(command.start);
    expect(repository.matches.values().next().value.end).toBe(command.end);
    expect(repository.matches.values().next().value.teams).toStrictEqual(
      command.teams
    );
    expect(repository.matches.values().next().value.price).toBe(command.price);
  });
});
