import { Request, Response, NextFunction } from 'express';

const get = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const result = await req.classMajorUC.get()
        return res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
};
const getById = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const result = await req.classMajorUC.getById(parseInt(req.params.id))
        return res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
};
const create = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const result = await req.classMajorUC.create(req.body);
        return res.status(200).json(result);
    } catch (error: any) {
        next(error)
    }
};


export default {
    get,
    getById,
    create
};
