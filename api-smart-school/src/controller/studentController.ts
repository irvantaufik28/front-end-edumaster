import { Request, Response, NextFunction } from 'express';
import { prismaClient } from '../application/database';
import { transformAndValidate } from 'class-transformer-validator';
import { CreateOrUpdateRoleDto } from '../dto/create-or-update-role.dto';
import { ResponseError } from '../error/response-error';

const get = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const request = {
            first_name: req.query.first_name,
            middle_name: req.query.middle_name,
            last_name: req.query.last_name,
            gender: req.query.gender,
            status: req.query.status,
            current_classroom_id :req.query.current_classroom_id,
            register_year: req.query.register_year,
            not_in_classroom_id: req.query.not_in_classroom_id,
            nis: req.query.nis,
            page: req.query.page,
            size: req.query.size,
            orderBy: req.query.orderBy,
            sortBy: req.query.sortBy
        }
        const result = await req.studentUC.get(request)
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};


const getById = async (req: any, res: Response, next: NextFunction): Promise<any> => {

    try {
        const result = await prismaClient.student.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                student_parents: true,
                student_user: {
                    include: {
                        user: true
                    }
                },
                student_classrooms: {
                    include: {
                        classroom: {
                            include: {
                                classMajor: true
                            }
                        }
                    }
                }
            }
        })

        res.status(200).json(result);
    } catch (error: any) {
        next(error)
    }
};

const create = async (req: any, res: Response, next: NextFunction): Promise<any> => {

    try {
        const result = await req.studentUC.create(req.body);

        res.status(200).json(result);
    } catch (error: any) {
        next(error)
    }
};

const update = async (req: any, res: Response, next: NextFunction): Promise<any> => {

    try {
        const result = await req.studentUC.update(req.body, req.params.id);

        res.status(200).json(result);
    } catch (error: any) {
        next(error)
    }
};


export default {
    get,
    create,
    update,
    getById
};
