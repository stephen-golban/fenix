import { create } from "zustand";
import {
  persist,
  type PersistOptions,
  createJSONStorage,
} from "zustand/middleware";

import type { User } from "../../typings/app";

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};

const persist_config: PersistOptions<AuthState> = {
  name: "FENIX-AUTH-STORE",
  partialize: (state: AuthState) => state,
  storage: createJSONStorage(() => localStorage),
};

const persisted = persist(() => {
  return {
    user: null,
    isAuthenticated: false,
  };
}, persist_config);

const useAuthStore = create<AuthState>()(persisted);

function signin(user: User, cb: VoidFunction) {
  useAuthStore.setState({ user, isAuthenticated: true });
  cb();
}

function signout() {
  useAuthStore.setState({ user: null, isAuthenticated: false });
}

export { signin, signout, useAuthStore };
