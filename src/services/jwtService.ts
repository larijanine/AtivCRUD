import jwt from 'jsonwebtoken';

export const gerarToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
};
