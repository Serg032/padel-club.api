import { MemberType } from "../../../members/domain";
import { CreateMatchCommand, Match } from "../../domain";
import { Repository } from "../../domain/repository-interface";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { PriceService } from "../services/price-service";

class Handler {
  constructor(private repository: Repository) {}
  handle(id: string): Match | undefined {
    return this.repository.findById(id);
  }
}

describe("When finding a match by id", () => {
  const repository = new RepositoryInMemory();
  const handler = new Handler(repository);
  const createMatchCommand: CreateMatchCommand = {
    id: "1",
    clubId: "1",
    courtId: "1",
    start: new Date("2024-05-12T10:00:00").getTime(),
    end: new Date("2024-05-12T11:30:00").getTime(),
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
    price: new PriceService().calculatePrice(
      new Date("2024-05-12T10:00:00").getTime(),
      new Date("2024-05-12T11:30:00").getTime()
    ),
  };
  beforeEach(() => {
    repository.save(createMatchCommand);
  });
  it("should return the match", () => {
    const match = handler.handle(createMatchCommand.id);
    expect(match).toEqual(createMatchCommand);
  });
  it("should return undefined if the match does not exist", () => {
    const match = handler.handle("2");
    expect(match).toBeUndefined();
  });
});
