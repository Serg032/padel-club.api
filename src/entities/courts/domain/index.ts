export interface Court {
  id: string;
  name: string;
  clubId: string;
}

export interface CreateCourtCommand extends Court {}
