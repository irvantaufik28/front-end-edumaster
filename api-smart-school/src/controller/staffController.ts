import { Request, Response, NextFunction } from 'express';

const get = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const request = {
            first_name: req.query.first_name,
            middle_name: req.query.middle_name,
            last_name: req.query.last_name,
            gender: req.query.gender,
            status: req.query.status,
            nik: req.query.nik,
            page: req.query.page,
            size: req.query.size,
            role_id : req.query.role_id,
            orderBy: req.query.orderBy,
            sortBy: req.query.sortBy
        }
        const staffs = await req.staffUC.get(request)
        return res.status(200).json(staffs);
    } catch (error) {
        next(error);
    }
};


const create = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
      
        const staff = await req.staffUC.create(req.body)

        return res.status(200).json(staff);
    } catch (error) {
        next(error);
    }
};


export default {
    get,
    create
}
