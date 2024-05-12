export interface Member {
  id: string;
  name: string;
  email: string;
  money: number;
  type: MemberType;
}

export enum MemberType {
  ADMIN,
  USER,
}

export interface CreateMemberCommand extends Member {}
