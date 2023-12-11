import { transformAndValidate } from "class-transformer-validator";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateOrUpdateClassMajorDto } from "../dto/create-or-update-classmajor.dto";

class ClassMajorService {

    async create(request: any) {
        try {
            await transformAndValidate(CreateOrUpdateClassMajorDto, request);
        } catch (e: any) {
            throw new ResponseError(400, e.toString())
        }
        return await prismaClient.classMajor.create({
            data: request,
            select: {
                id: true,
                name: true
            }
        })
    }

    async get() {
        return prismaClient.classMajor.findMany({
            include: {
                classrooms: true
            }
        })
    }

    async getById(id: any) {
        const result = await prismaClient.classMajor.findFirst({
            where: { id: id }
        })
        if (!result) {
            throw new ResponseError(404, 'class major not found')
        }
        return result
    }
}

export default ClassMajorService