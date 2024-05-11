import { CreateMemberCommand } from "../../domain";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { Handler } from "./handler";

describe("When creating a member", () => {
  const repository: RepositoryInMemory = new RepositoryInMemory();
  const handler = new Handler(repository);
  const command: CreateMemberCommand = {
    id: "id",
    name: "name",
    email: "email",
    money: 0,
    type: 0,
  };
  it("should create a member", () => {
    handler.handle(command);
    expect(repository.members.size).toBe(1);
    expect(repository.members.values().next().value.id).toBe(command.id);
    expect(repository.members.values().next().value.name).toBe(command.name);
    expect(repository.members.values().next().value.email).toBe(command.email);
    expect(repository.members.values().next().value.money).toBe(command.money);
    expect(repository.members.values().next().value.type).toBe(command.type);
  });
});
