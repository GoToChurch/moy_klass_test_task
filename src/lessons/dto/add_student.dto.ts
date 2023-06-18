import {IsNumber, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class AddStudentDto {
    @ApiProperty({example: 1, description: "id занятия"})
    @IsNumber({}, {message: "Должно быть числом"})
    @Min(1)
    lessonId: number

    @ApiProperty({example: 1, description: "id студента"})
    @IsNumber({}, {message: "Должно быть числом"})
    @Min(1)
    studentId: number
}