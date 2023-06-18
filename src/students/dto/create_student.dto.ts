import {IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateStudentDto {
    @ApiProperty({example: "Алексей", description: "Имя студента"})
    @IsString({message: "Должно быть строкой"})
    @Length(1)
    name: string;
}