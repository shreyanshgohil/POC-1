export interface AuthenticateRefreshToken {
  email: string | null;
  newAccessToken: string | null;
}

export interface AuthenticateAccessToken {
  email: string | null;
  isAuthenticated: boolean;
}
