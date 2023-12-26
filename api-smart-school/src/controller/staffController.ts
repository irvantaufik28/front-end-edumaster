import { Request, Response, NextFunction } from 'express';
import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import StaffService from '../service/staffService';

const get = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const staffService = new StaffService()
        const request = {
            first_name: req.query.first_name,
            middle_name: req.query.middle_name,
            last_name: req.query.last_name,
            gender: req.query.gender,
            status: req.query.status,
            nik: req.query.nik,
            page: req.query.page,
            size: req.query.size,
            role_id: req.query.role_id,
            orderBy: req.query.orderBy,
            sortBy: req.query.sortBy
        }
        const staffs = await staffService.get(request)
        return res.status(200).json(staffs);
    } catch (error) {
        next(error);
    }
};


const getById = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {

        const staff = await prismaClient.staff.findUnique({
            where: { id: req.params.id },
            include: {
                staff_user: {
                    include: {
                        user: {
                            include: {
                                user_permision: true,
                                user_roles: {
                                    include: {
                                        role: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        if (!staff) {
            throw new ResponseError(404, "staff not found")
        }
        return res.status(200).json({ data: staff });
    } catch (error) {
        next(error);
    }
};


const create = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const staffService = new StaffService()


        const staff = await staffService.create(req.body)

        return res.status(200).json(staff);
    } catch (error) {
        next(error);
    }
};

const update = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const staffService = new StaffService()

        const staff = await staffService.update(req.body, req.params.id)

        return res.status(200).json({ message: "Staff successfuly Updated" });
    } catch (error) {
        next(error);
    }
};


export default {
    get,
    getById,
    create,
    update
}
