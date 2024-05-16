import { MemberType } from "../../../members/domain";
import { CreateMatchCommand, Match } from "../../domain";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { PriceService } from "../services/price-service";
import { Handler } from "./handler";

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
          username: "username",
          password: "password",
          money: 0,
          type: MemberType.USER,
        },
        backhand: {
          id: "2",
          name: "Jane",
          email: "",
          username: "username2",
          password: "password",
          money: 0,
          type: MemberType.USER,
        },
      },
      {
        drive: {
          id: "3",
          name: "Jack",
          email: "",
          username: "username3",
          password: "password",
          money: 0,
          type: MemberType.USER,
        },
        backhand: {
          id: "4",
          name: "Jill",
          email: "",
          username: "username4",
          password: "password",
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
  beforeEach(async () => {
    await repository.save(createMatchCommand);
  });
  it("should return the match", async () => {
    const match = await handler.handle(createMatchCommand.id ?? "");
    expect(match).toEqual(createMatchCommand);
  });
  it("should return undefined if the match does not exist", async () => {
    const match = await handler.handle("2");
    expect(match).toBeUndefined();
  });
});
