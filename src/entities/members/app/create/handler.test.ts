import { CreateMemberCommand, MemberType } from "../../domain";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { Handler } from "./handler";

describe("When creating a member", () => {
  const repository: RepositoryInMemory = new RepositoryInMemory();
  const handler = new Handler(repository);
  const command: CreateMemberCommand = {
    name: "name",
    email: "email",
    username: "username",
    password: "password",
    money: 0,
    type: MemberType.USER,
  };
  it("should create a member", async () => {
    await handler.handle(command);
    expect(repository.members.size).toBe(1);
    expect(repository.members.values().next().value.name).toBe(command.name);
    expect(repository.members.values().next().value.email).toBe(command.email);
    expect(repository.members.values().next().value.money).toBe(command.money);
    expect(repository.members.values().next().value.type).toBe(command.type);
  });
});
