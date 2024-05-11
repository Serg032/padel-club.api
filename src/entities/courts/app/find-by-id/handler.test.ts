import { Club, CreateClubCommand } from "../../../clubs/domain";
import { Court, CreateCourtCommand } from "../../domain";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { Handler as CreateCourtHandler } from "../create/handler";

export class Handler {
  constructor(private repository: RepositoryInMemory) {}

  handle(id: string): Court | undefined {
    return this.repository.findById(id);
  }
}

describe("When finding a court by id", () => {
  const repository = new RepositoryInMemory();
  const handler = new Handler(repository);
  const createCourtHandler = new CreateCourtHandler(repository);
  const createCourtCommand: CreateCourtCommand = {
    id: "id",
    name: "Court Name",
    clubId: "Court Address",
  };
  beforeEach(() => {
    createCourtHandler.handle(createCourtCommand);
  });
  it("should find a court by id", () => {
    const court = handler.handle(createCourtCommand.id);
    expect(court).toBeDefined();
    expect(court?.id).toBe(createCourtCommand.id);
    expect(court?.name).toBe(createCourtCommand.name);
    expect(court?.clubId).toBe(createCourtCommand.clubId);
  });
  describe("When the court does not exist", () => {
    it("should return undefined", () => {
      const court = handler.handle("non-existing-id");
      expect(court).toBeUndefined();
    });
  });
});
