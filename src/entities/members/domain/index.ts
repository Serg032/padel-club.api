export interface Member {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  money: number;
  type: MemberType;
}

export enum MemberType {
  ADMIN,
  USER,
}

export interface CreateMemberCommand extends Member {}
