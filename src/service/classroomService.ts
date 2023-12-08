import { transformAndValidate } from "class-transformer-validator";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import UserRepository from "../repository/userRepository";
import { CreateOrUpdateClassroomDto } from "../dto/create-or-update-classroom.dto";

class ClassroomService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
    async create(request: any) {
        try {
            await transformAndValidate(CreateOrUpdateClassroomDto, request);
        } catch (e: any) {
            throw new ResponseError(400, e.toString())
        }

        
        const classMajor = await prismaClient.classMajor.findFirst({
            where: { id: request.class_major_id }
        })

        if (!classMajor) {
            throw new ResponseError(404, "class major not found!")
        }
        return await prismaClient.classroom.create({
            data: request,
            select: {
                id: true,
                code: true,
                year_group: true,
                level: true,
                class_major_id: true
            }
        })


    }

    async get() {
        return prismaClient.classroom.findMany({
            include: {
                classMajor: true
            }
        })
    }
}

export default ClassroomService