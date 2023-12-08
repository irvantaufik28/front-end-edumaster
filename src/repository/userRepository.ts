import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import bcrypt from "bcrypt";
class UserRepository {
    constructor() { }

    async create(request: any) {
        request.password = await bcrypt.hash('123456', 10)
        
        

        await prismaClient.user.create({
            data: request
        })
    }


    async getById(id: number) {
        return prismaClient.user.findFirst({
            where: {
                id: id
            }
        })
    }
}

export default UserRepository