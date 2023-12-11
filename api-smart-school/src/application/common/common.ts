import jwt from "jsonwebtoken"

import dotenv from 'dotenv';

dotenv.config();
const generateNIS = (currentYear: any) => {
  currentYear.toString().slice(-4);

  const randomFourDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

  const randomNumber = currentYear + randomFourDigits;

  return randomNumber;
}


const generateAccessToken = (data: any) => {
  const user_data = {
    id: data.id,
    username: data.username,
    roles: data.roles,
    permissions: data.permissions
  }
  const secretKey = process.env.JWT_SECRET_KEY || "defaultSecretKey";

  const accessToken = jwt.sign(user_data, secretKey, { expiresIn: '6h' });
  return accessToken;
}

export {
  generateNIS,
  generateAccessToken
}
