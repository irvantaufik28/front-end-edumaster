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
                class_major_id: true,
                is_active: true
            }
        })


    }

    async get(request: any) {

        const page = request.page ?? 1;
        const size = request.size ?? 10;
        const skip = (parseInt(page) - 1) * parseInt(size);
        const filters: any = [];

        if (request.code) {
            filters.push({
                code: {
                    contains: request.code
                }
            })
        }

        if (request.level) {
            filters.push({
                level: {
                    contains: request.level
                }
            })
        }
        if (request.year_group) {
            filters.push({
                year_group: {
                    contains: request.year_group
                }
            })
        }
        if (request.is_active) {
            request.is_active = request.is_active === "true" ? true : false;
            filters.push({
                is_active: request.is_active
            });
        }
        if (request.class_major_id) {
            filters.push({
                class_major_id: {
                    equals: parseInt(request.class_major_id)
                }
            })
        }


        const classrooms = await prismaClient.classroom.findMany({
            where: {
                AND: filters
            },
            include: {
                classMajor: true
            },
            take: parseInt(size),
            skip: skip,
        })

        const totalItems = await prismaClient.classroom.count({
            where: {
                AND: filters
            }
        })
       
        return {
            data: classrooms,
            paging: {
                page: page,
                total_item: totalItems,
                total_page: Math.ceil(totalItems / parseInt(size))
            }
        }
    }
}

export default ClassroomService