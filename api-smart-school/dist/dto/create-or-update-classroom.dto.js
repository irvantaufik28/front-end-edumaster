"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrUpdateClassroomDto = void 0;
const class_validator_1 = require("class-validator");
require("reflect-metadata");
class CreateOrUpdateClassroomDto {
}
exports.CreateOrUpdateClassroomDto = CreateOrUpdateClassroomDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)()
], CreateOrUpdateClassroomDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)()
], CreateOrUpdateClassroomDto.prototype, "level", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)()
], CreateOrUpdateClassroomDto.prototype, "year_group", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)()
], CreateOrUpdateClassroomDto.prototype, "class_major_id", void 0);
//# sourceMappingURL=create-or-update-classroom.dto.js.map