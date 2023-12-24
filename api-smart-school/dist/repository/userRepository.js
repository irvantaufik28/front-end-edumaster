"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../application/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserRepository {
    constructor() { }
    create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            request.password = yield bcrypt_1.default.hash('123456', 10);
            yield database_1.prismaClient.user.create({
                data: request
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.user.findFirst({
                where: {
                    id: id
                }
            });
        });
    }
}
exports.default = UserRepository;
//# sourceMappingURL=userRepository.js.map