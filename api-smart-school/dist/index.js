"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("./middleware/error-middleware");
const api_1 = __importDefault(require("./routes/api"));
const cors_1 = __importDefault(require("cors"));
const logging_1 = require("./application/logging");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({
    origin: "*",
}));
exports.app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World" });
});
exports.app.use("/api/v1", api_1.default);
exports.app.use(error_middleware_1.errorMiddleware);
const PORT = process.env.PORT || 4000;
exports.app.listen(PORT, () => {
    logging_1.logger.info(`App start at ${process.env.HOST}:${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map