export interface UserAdd {
  file: string;
  username: string;
  number: string;
}

export interface UserShow {
  userId: string;
  name: string;
  state: number;
  signInTime: string;
  signOutTime: string;
  day: number;
}

export const SignState = [
  'unsigned refund',
  'signed refund',
  'not signed yesterday'
]