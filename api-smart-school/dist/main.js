"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web_1 = require("./application/web");
const logging_1 = require("./application/logging");
web_1.web.listen(process.env.PORT, () => {
    logging_1.logger.info(`App start at ${process.env.HOST}:${process.env.PORT}`);
});
//# sourceMappingURL=main.js.map