import { Request, Response, NextFunction } from 'express';
import { uploadCloudinary } from '../middleware/handle-upload';

const upload = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const result = await uploadCloudinary(req.file.path, "student_foto");
        return res.status(200).json(result);
    } catch (error: any) {
        next(error)
    }
};


export default {
    upload
}