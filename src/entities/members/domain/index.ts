export interface Member {
  id: string;
  name: string;
  email: string;
  money: number;
  type: MemberType;
}

enum MemberType {
  ADMIN,
  USER,
}

export interface CreateMemberCommand extends Member {}
