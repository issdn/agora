import { UserLoginDTO } from "./apiTypes";

export interface AuthContextType {
  nickname: string;
  token: string | null;
  onLogin: (values: UserLoginDTO) => Promise<void>;
  onLogout: () => void;
}

export type FieldsType = Array<{
  fieldName: string;
  attributes: { id: string; name?: string; type?: string };
}>;
