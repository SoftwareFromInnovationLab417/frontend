export interface AccountData {
  username: string;
  password: string;
}

export interface Manager extends AccountData {
  token: string;
}


export interface User extends AccountData { }

export function buildAccountUrl(url: string, username: string, password: string): string {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  return `${url}?${params.toString()}`;
}