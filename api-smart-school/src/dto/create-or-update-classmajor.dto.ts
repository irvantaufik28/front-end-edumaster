import { IsNotEmpty } from "class-validator";

export class CreateOrUpdateClassMajorDto {
    @IsNotEmpty()
    name: String
}