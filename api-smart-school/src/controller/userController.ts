import { Request, Response, NextFunction } from 'express';
import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';

const get = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {

        const result = await prismaClient.user.findMany({
            include: {
                user_roles: {
                    include: { role: true }
                },
            },
        }) 

        return res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
};
const getById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {

        const user = await prismaClient.user.findFirst({
            include: {
                user_roles: {
                    include: { role: true }
                }
            },
            where: { id: req.params.id }
        })
        let roles : any = []
        const userRole = user?.user_roles.forEach(item => {
           roles.push( item.role.name)
        });

        console.log(roles)

        return res.status(200).json({
            data: user
        });
    } catch (error) {
        next(error);
    }
};

export default {
    get,
    getById
};
