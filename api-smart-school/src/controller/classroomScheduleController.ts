import { Response, NextFunction } from 'express';
import { prismaClient } from '../application/database';
import { transformAndValidate } from 'class-transformer-validator';
import { CreateOrUpdateRoleDto } from '../dto/create-or-update-role.dto';
import { ResponseError } from '../error/response-error';

const get = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {

        const request = {
            page: req.query.page,
            size: req.query.size,
            classroom_id: req.query.classroom_id,
            day_name : req.query.day_name,
            orderBy: req.query.orderBy,
            sortBy: req.query.sortBy
        }

        const page = request.page ?? 1;
        const size = request.size ?? 10;
        const skip = (parseInt(page) - 1) * parseInt(size);
        const filters: any = [];

        if (request.classroom_id) {
            filters.push({
                classroom_id: {
                    equals: parseInt(request.classroom_id),
                }
            })
        }    
        if (request.day_name) {
            filters.push({
                day_name: {
                    contains: request.day_name,
                }
            })
        }


        const classroomSchedule = await prismaClient.classroomSchedule.findMany({
            where: {
                AND: filters
            },
            take: parseInt(size),
            skip: skip,
        })

        const totalItems = await prismaClient.classroomSchedule.count({
            where: {
                AND: filters
            }
        })

        const result = {
            data: classroomSchedule,
            paging: {
                page: page,
                total_item: totalItems,
                total_page: Math.ceil(totalItems / parseInt(size))
            }
        }

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};


const getById = async (req: any, res: Response, next: NextFunction): Promise<any> => {

    try {
        const classroomSchedule = await prismaClient.classroomSchedule.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });


        if (!classroomSchedule) {
            throw new ResponseError(404, "classroom schedule  not found")
        }

        return res.status(200).json({ data: classroomSchedule });
    } catch (error: any) {
        next(error)
    }
};


const create = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    // try {
    //     await transformAndValidate("", req.body);
    // } catch (e: any) {
    //     return res.status(404).json({ message: e.toString() });
    // }

    try {
        const classroomSchedule = await prismaClient.classroomSchedule.create({
            data: req.body,
        });

        return res.status(200).json({ data: classroomSchedule });
    } catch (error: any) {
        next(error)
    }
};

const update = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    // try {
    //     await transformAndValidate("", req.body);
    // } catch (e: any) {
    //     return res.status(404).json({ message: e.toString() });
    // }

    try {

        const classroomSchedule = await prismaClient.classroomSchedule.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });


        if (!classroomSchedule) {
            throw new ResponseError(404, "course not found")
        }

        await prismaClient.classroomSchedule.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: req.body,
        });

        return res.status(200).json({ message: "classroom Schedule course successfuly updated" });
    } catch (error: any) {
        next(error)
    }
};



const deleted = async (req: any, res: Response, next: NextFunction): Promise<any> => {

    try {
        const classroomSchedule = await prismaClient.classroomSchedule.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });

        if (!classroomSchedule) {
            throw new ResponseError(404, "course not found")
        }

        await prismaClient.classroomSchedule.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })

        return res.status(200).json({ message: "classroom Schedulesuccessfully deleted" });
    } catch (error: any) {
        next(error)
    }
};



export default {
    get,
    getById,
    create,
    update,
    deleted
};