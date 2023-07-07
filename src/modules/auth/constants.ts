import { randomBytes } from 'crypto';

// 生成一个32个字符的随机字符串 作为jwt的secret
const generateJwtSecret = (length: number) => {
  return randomBytes(length).toString('hex');
};

const jwtSecret = generateJwtSecret(32);

export const jwtConstants = {
  secret: jwtSecret,
};
