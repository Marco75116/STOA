export interface User {
  externalUserId: string;
}

export interface AccessToken {
  token: string;
  userId: string;
}

export interface AuthState {
  user: User;
  errors?: string;
  loading: boolean;
}

export interface AuthResult {
  user: User;
  token: string;
  message: string;
}
