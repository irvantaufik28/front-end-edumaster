import { Request, Response, NextFunction } from 'express';
import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';

const get = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const request = {
            code: req.query.code,
            level: req.query.level,
            year_group: req.query.year_group,
            is_active: req.query.is_active,
            class_major_id: req.query.class_major_id,
            page: req.query.page,
            size: req.query.size
        }
        const result = await req.classroomUC.get(request)
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
const create = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const result = await req.classroomUC.create(req.body);
        return res.status(200).json(result);
    } catch (error: any) {
        next(error)
    }
};

const getById = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const result = await prismaClient.classroom.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })

        if (!result) {
            throw new ResponseError(404, "classroom not found!")
        }

        return res.status(200).json({data: result});
    } catch (error) {
        next(error)
    }
}
const update = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const result = await prismaClient.classroom.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })

        if (!result) {
            throw new ResponseError(404, "classroom not found!")
        }

         await prismaClient.classroom.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: req.body,
        });

        return res.status(200).json({message: "data successfully updated"});
    } catch (error) {
        next(error)
    }
}

const deleted = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const result = await prismaClient.classroom.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })

        if (!result) {
            throw new ResponseError(404, "classroom not found!")
        }

         await prismaClient.classroom.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });

        return res.status(200).json({message: "data successfully deleted"});
    } catch (error) {
        next(error)
    }
}


export default {
    get,
    create,
    getById,
    update,
    deleted
};
