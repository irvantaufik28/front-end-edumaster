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
    permissions: data.permissions,
    user_detail : data.user_detail
  }
  const secretKey = process.env.JWT_SECRET_KEY || "defaultSecretKey";

  const accessToken = jwt.sign(user_data, secretKey, { expiresIn: '6h' });
  return accessToken;
}


const  generateStaffUsername = (birth_date : string, first_name: string) => {
  const parts = birth_date.split('-');
  const twoLastDigits = parts[0].slice(-2);
  const result = first_name + twoLastDigits + parts[1] + parts[2];

  return result;
}

const  generateDefaultPassword = (birth_date : string) => {
  const parts = birth_date.split('-');
  const twoLastDigits = parts[0].slice(-2);
  const result = twoLastDigits + parts[1] + parts[2];

  return result;
}

export {
  generateNIS,
  generateStaffUsername,
  generateDefaultPassword,
  generateAccessToken
}
