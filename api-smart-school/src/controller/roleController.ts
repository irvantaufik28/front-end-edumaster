import { Request, Response, NextFunction } from 'express';
import { prismaClient } from '../application/database';
import { transformAndValidate } from 'class-transformer-validator';
import { CreateOrUpdateRoleDto } from '../dto/create-or-update-role.dto';
import { ResponseError } from '../error/response-error';

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
        throw new ResponseError(400, e.toString())
    }

    try {
        const result = await prismaClient.role.create({
            data: req.body,
            select: {
                id: true,
                name: true
            }
        });

        res.status(200).json(result);
    } catch (error: any) {
        next(error)
    }
};


export default {
    get,
    create
};
