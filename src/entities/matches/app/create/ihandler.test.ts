import { MemberType } from "../../../members/domain";
import { CreateMatchCommand, Match } from "../../domain";
import { Repository } from "../../domain/repository-interface";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { PriceService } from "../services/price-service";
import { Handler } from "./handler";

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
    price: priceService.calculatePrice(matchStartDate, matchEndDate),
  };

  it("should save the match", async () => {
    await handler.create(command);
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
