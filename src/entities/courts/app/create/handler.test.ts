import { CreateClubCommand } from "../../../clubs/domain";
import { Repository } from "../../domain/repository-interface";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { Handler } from "./handler";

describe("When creating a court", () => {
  const repository: Repository = new RepositoryInMemory();
  const handler = new Handler(repository);
  const command: CreateClubCommand = {
    id: "id",
    name: "Club Name",
    address: "Club Address",
  };
  it("should create a court", () => {
    handler.handle(command);
    expect(repository.clubs.size).toBe(1);
    expect(repository.clubs.values().next().value.id).toBe(command.id);
    expect(repository.clubs.values().next().value.name).toBe(command.name);
    expect(repository.clubs.values().next().value.address).toBe(
      command.address
    );
  });
});
