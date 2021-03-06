export interface Profile {
  name: string;
  surname: string;
  login: string;
  email: string;
  created: string;
  updated: string;
  json_count: number;
  owned_json_count: number;
  shared_json_count: number;
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
    owned_json_count: 0,
    shared_json_count: 0,
    team_count: 0,
  };
}

export interface UserDetails {
  name: string;
  surname: string;
  email: string;
}

export interface JsonDetails {
  id: number;
  title: string;
  data: string;
  created: string;
  updated: string;
}
