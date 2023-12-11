import { Request, Response, NextFunction } from 'express';
import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import bcrypt from "bcrypt"
import { generateAccessToken } from '../application/common/common';

const login = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const user = await prismaClient.user.findFirst({
            where: {
                username: req.body.username
            },
            include: {
                userRoles: {
                    include: {
                        role: true
                    }
                },
                userPermision: {
                    include: {
                        permission: true
                    }
                }
            }
        })

        if (!user) {
            throw new ResponseError(404, "username or passwod wrong!")
        }

        const verifyPassword = await bcrypt.compare(req.body.password, user.password)
        if (!verifyPassword) {
            throw new ResponseError(404, "username or passwod wrong!")

        }

        let roles: any = []
        user?.userRoles.forEach(item => {
            roles.push(item.role.name)
        });

        let permissions: any = []
        user?.userPermision.forEach(item => {
            permissions.push(item.permission)
        })

        const user_data_token = {
            id: user.id,
            username: user.username,
            roles : roles,
            permissions: permissions.length > 0 ? permissions : null ,
        }

        const token = generateAccessToken(user_data_token)

        const user_data = {
            id: user.id,
            username : user.username,
            roles: roles,
            permissions: permissions.length > 0 ? permissions : null ,
            token: token
        }

        return res.status(200).json({
            data: user_data
        });
    } catch (error) {
        next(error);
    }
};

export default {
    login
}