import { transformAndValidate } from "class-transformer-validator";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateOrUpdateClassroomDto } from "../dto/create-or-update-classroom.dto";
import bcrypt from "bcrypt";
import { generateNIS } from "../application/common/common";
class StudentService {
    constructor() { }

    async get(request: any) {

        const page = request.page ?? 1;
        const size = request.size ?? 10;
        const skip = (parseInt(page) - 1) * parseInt(size);
        const filters: any = [];

        if (request.nis) {
            filters.push({
                code: {
                    contains: request.nis
                }
            })
        }

        if (request.classroom_id) {
            filters.push({
                classroom_id: {
                    equals: parseInt(request.classroom_id)
                }
            })
        }


        const students = await prismaClient.student.findMany({
            where: {
                AND: filters
            },
            include: {
                student_parent: true,
                StudentClassroom: {
                    include: {
                        classroom: true
                    }
                }

            },
            take: parseInt(size),
            skip: skip,
        })

        const totalItems = await prismaClient.student.count({
            where: {
                AND: filters
            }
        })

        return {
            data: students,
            paging: {
                page: page,
                total_item: totalItems,
                total_page: Math.ceil(totalItems / parseInt(size))
            }
        }
    }


    async create(request: any) {
        // try {
        //     await transformAndValidate(CreateOrUpdateClassroomDto, request);
        // } catch (e: any) {
        //     throw new ResponseError(400, e.toString())
        // }


        const studentParent = await prismaClient.studentParent.create({
            data: {
                first_name: request.student_parent.first_name,
                last_name: request.student_parent.last_name,
                relationship: request.student_parent.relationship,
                phone: request.student_parent.phone,
                email: request.student_parent.email,
                address: request.student_parent.address
            },
            select: {
                id: true,
            }
        })

        const student = await prismaClient.student.create({
            data: {
                nis :generateNIS(new Date().getFullYear()),
                student_parent_id : studentParent.id,
                first_name : request.first_name,
                middle_name : request.middle_name,
                last_name : request.last_name,
                birth_day : request.birth_day,
                gender: request.gender,
                foto_url: request.foto_url
            },
            select: {
                id: true,
                nis: true
            }
        })

        const user_data = {
            username: student.nis,
            password: await bcrypt.hash('password', 10)
        }

        const user = await prismaClient.user.create({
            data: user_data,
            select: {
                id: true
            }
        })

        const student_role = await prismaClient.role.findFirst({
            where: {
                name: "student"
            },
            select: {
                id: true
            }
        })

        await prismaClient.userRoles.create({
            data: {
                user_id: user.id,
                role_id: student_role?.id ? student_role?.id : 1
            }
        })

        await prismaClient.studentUser.create({
            data: {
                user_id: user.id,
                student_id: student.id
            }
        })

        return await prismaClient.student.findFirst({
            where: {
                id: student.id,
            },
            include: {
                student_parent: true,
                StudentUser: {
                    include : {
                        user: true
                    }
                }
            }
        })
    }



}

export default StudentService