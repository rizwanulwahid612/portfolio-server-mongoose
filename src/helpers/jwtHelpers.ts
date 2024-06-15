/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload, Secret, verify } from 'jsonwebtoken';
import ApiError from '../errors/ApiError';
import httpStatus from 'http-status';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string,
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};
const createResetToken = (
  payload: any,
  secret: Secret,
  expireTime: string,
): string => {
  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: expireTime,
  });
};
// const verifyToken = (token: string, secret: Secret): JwtPayload => {
//   return jwt.verify(token, secret) as JwtPayload;
//};
const verifyToken = (token: string, secret: Secret): JwtPayload => {
  try {
    const isVerfied = verify(token, secret) as JwtPayload;
    return isVerfied as JwtPayload;
  } catch (error) {
    return new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
  }
};

export const jwtHelpers = {
  createToken,
  verifyToken,
  createResetToken,
};
