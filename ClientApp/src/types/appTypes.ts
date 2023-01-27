import { UserLoginDTO } from "./apiTypes";

export interface AuthContextType {
  token: string | null;
  onLogin: (values: UserLoginDTO) => Promise<void>;
  onLogout: () => void;
}
