export interface Club {
  id: string;
  name: string;
  address: string;
}

export interface CreateClubCommand extends Club {}
