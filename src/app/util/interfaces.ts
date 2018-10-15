export interface Profile {
  name: string;
  surname: string;
  login: string;
  email: string;
  created: string;
  updated: string;
  json_count: number;
  team_count: number;
}

export function ProfileInit() {
  return <Profile> {
    name: '',
    surname: '',
    login: '',
    email: '',
    created: '',
    updated: '',
    json_count: 0,
    team_count: 0,
  };
}

export interface UserDetails {
  name: string;
  surname: string;
  email: string;
}
