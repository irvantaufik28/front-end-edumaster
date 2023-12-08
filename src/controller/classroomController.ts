import { Request, Response, NextFunction } from 'express';

const get = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await req.classroomUC.get()
        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
};
const create = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await req.classroomUC.create(req.body);
        res.status(200).json(result);
    } catch (error: any) {
        next(error)
    }
};


export default {
    get,
    create
};
