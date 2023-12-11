import { Request, Response, NextFunction } from 'express';
import { prismaClient } from '../application/database';
import { transformAndValidate } from 'class-transformer-validator';
import { CreateOrUpdateRoleDto } from '../dto/create-or-update-role.dto';
import { ResponseError } from '../error/response-error';

const get = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const request = {
            page: req.query.page,
            size: req.query.size
        }
        const result = await req.studentUC.get(request)
        return res.status(200).json(result );
    } catch (error) {
        next(error);
    }
};
const create = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    
    try {
        const result = await  req.studentUC.create(req.body);

        res.status(200).json(result);
    } catch (error: any) {
        next(error)
    }
};


export default {
    get,
    create
};
