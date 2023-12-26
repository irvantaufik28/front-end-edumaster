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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
// import { errorMiddleware } from "./middleware/error-middleware";
// import router from "./routes/api";
const cors_1 = __importDefault(require("cors"));
const logging_1 = require("./application/logging");
// import { VercelRequest, VercelResponse } from '@vercel/node';
const database_1 = require("./application/database");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({
    origin: "*",
}));
exports.app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World" });
});
exports.app.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield database_1.prismaClient.student.findMany();
        res.status(200).json({
            data: student,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// app.use("/api/v1", router);
// app.use(errorMiddleware);
const PORT = process.env.PORT || 4000;
exports.app.listen(PORT, () => {
    logging_1.logger.info(`App start at ${process.env.HOST}:${process.env.PORT}`);
});
exports.default = exports.app;
//# sourceMappingURL=index.js.map