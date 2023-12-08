import { Request, Response, NextFunction } from 'express';
import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';

const get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // const result: string = "hello";
        // console.log(result)
        const result = await prismaClient.student.findMany()
        if (result.length <= 0) {
            throw new ResponseError(400, "Username already exists");
        }
        res.status(200).json({
            data: result
        });
    } catch (error) {
        // Use the 'next' function to pass the error to the Express error handler
        next(error);
    }
};

export default {
    get
};
