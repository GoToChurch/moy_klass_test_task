import {IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateTeacherDto {
    @ApiProperty({example: "Тамара", description: "Имя учителя"})
    @IsString({message: "Должно быть строкой"})
    @Length(1)
    name: string;
}