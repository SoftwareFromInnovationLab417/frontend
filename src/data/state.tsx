import { createContext } from 'react';
import { AccountData } from './account';

export interface AppState {
  data: AccountData;
}

export const defaultState: AccountData = {
  username: "unknown",
  password: "unknown",
}

export const AppContext = createContext<{
  state: AppState, setState: (state: AppState) => void
}>({
  state: {
    data: defaultState
  },
  setState: () => { }
})