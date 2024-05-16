import { Member } from "../../members/domain";

type timestamp = number;

export interface Match {
  id?: string;
  clubId: string;
  courtId: string;
  start: timestamp;
  end: timestamp;
  teams: [Team, Team];
  price: number;
}

interface Team {
  drive: Member;
  backhand: Member;
}

export interface CreateMatchCommand extends Match {}
