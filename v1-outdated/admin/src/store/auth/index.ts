import { create } from "zustand";
import {
  persist,
  type PersistOptions,
  createJSONStorage,
} from "zustand/middleware";

import type { User } from "../../typings/app";

export type AuthState = {
  user: User | null;
  token: string | null;
};

const persist_config: PersistOptions<AuthState> = {
  name: "FENIX-AUTH-STORE",
  partialize: (state: AuthState) => state,
  storage: createJSONStorage(() => localStorage),
};

const persisted = persist(() => {
  return {
    user: null,
    token: null,
  };
}, persist_config);

const useAuthStore = create<AuthState>()(persisted);

function signin(token: string, cb: VoidFunction) {
  useAuthStore.setState({ token });
  cb();
}

function signout() {
  useAuthStore.setState({ user: null, token: null });
}

export { signin, signout, useAuthStore };
