import { Response, NextFunction } from 'express';
import { prismaClient } from '../application/database';
import { transformAndValidate } from 'class-transformer-validator';
import { CreateOrUpdateRoleDto } from '../dto/create-or-update-role.dto';
import { ResponseError } from '../error/response-error';
import { CreateOrDeleteUserRolesDto } from '../dto/create-or-delete-userRolse.dto';

const get = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const result = await prismaClient.role.findMany()
        return res.status(200).json({ data: result });
    } catch (error) {
        next(error);
    }
};
const create = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        await transformAndValidate(CreateOrUpdateRoleDto, req.body);
    } catch (e: any) {
        return res.status(404).json({ message: e.toString() });
    }

    try {
        const result = await prismaClient.role.create({
            data: req.body,
            select: {
                id: true,
                name: true
            }
        });

        return res.status(200).json(result);
    } catch (error: any) {
        next(error)
    }
};

const createUserRole = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    const request = {
        user_id: req.body.user_id,
        role_id: req.body.role_id
    }

    try {
        await transformAndValidate(CreateOrDeleteUserRolesDto, request);
    } catch (e: any) {
        return res.status(404).json({ message: e.toString() });
    }
    try {
        const existUserRole = await prismaClient.userRoles.findUnique({
            where: {
                user_id_role_id: {
                    user_id: request.user_id, role_id: request.role_id
                }
            }
        })

        if (existUserRole) {
            throw new ResponseError(400, "user has already have this role")
        }

        const result = await prismaClient.userRoles.create({

            data: {
                user_id: req.body.user_id,
                role_id: req.body.role_id
            }
        });

        return res.status(200).json(result);
    } catch (error: any) {
        next(error)
    }
};

const deleteUserRole = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    const request = {
        user_id: req.query.user_id,
        role_id: parseInt(req.query.role_id)
    }

    try {
        await transformAndValidate(CreateOrDeleteUserRolesDto, request);
    } catch (e: any) {
        return res.status(404).json({ message: e.toString() });
    }
    try {
        
        const countUserRole = await prismaClient.userRoles.count({
            where: {
                user_id: request.user_id
            }
        })

        if (countUserRole <= 1) {
            throw new ResponseError(400, "can't delete user must have role minimun 1")
        }
 

        const UserRole = await prismaClient.userRoles.findUnique({
            where: {
                user_id_role_id: {
                    user_id: request.user_id, role_id: request.role_id
                }
            }
        })

        if (!UserRole) {
            throw new ResponseError(400, "user role not found")
        }

        await prismaClient.userRoles.delete({
            where: {
                user_id_role_id: {
                    user_id: request.user_id, role_id: request.role_id
                }
            }
        });

        return res.status(200).json(({ message: 'user role successfuly deleted' }));
    } catch (error: any) {
        next(error)
    }
};


export default {
    get,
    create,
    createUserRole,
    deleteUserRole
};
