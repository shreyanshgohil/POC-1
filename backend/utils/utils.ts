import jwt from 'jsonwebtoken';
import { AuthenticateRefreshToken, AuthenticateAccessToken } from './utilTypes';

// For authenticate the refresh token
const authenticateRefreshToken = (
  refreshToken: string
): AuthenticateRefreshToken => {
  if (!refreshToken)
    return {
      email: null,
      newAccessToken: null,
    };
  return jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN!,
    (err: any, user: any) => {
      if (err) {
        return {
          email: null,
          newAccessToken: null,
        };
      } else {
        return {
          email: user.email,
          newAccessToken: generateAccessToken(user),
        };
      }
    }
  );
};

// For authenticate the access token
const authenticateAccessToken = (
  accessToken: string
): AuthenticateAccessToken => {
  if (!accessToken) return { isAuthenticated: false, email: null };
  return jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN!,
    (err: any, user: any) => {
      console.log(err);
      if (err) {
        return {
          isAuthenticated: false,
          email: null,
        };
      } else {
        return {
          isAuthenticated: true,
          email: user.email,
        };
      }
    }
  );
};

// For generate the access token
const generateAccessToken = (user: any) => {
  const { iat, ...others } = user;
  const token = jwt.sign(others, process.env.ACCESS_TOKEN!, {
    expiresIn: '1h',
  });
  return token;
};

export {
  generateAccessToken,
  authenticateRefreshToken,
  authenticateAccessToken,
};
