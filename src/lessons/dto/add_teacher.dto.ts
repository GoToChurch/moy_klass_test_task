import {IsNumber, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class AddTeacherDto {
    @ApiProperty({example: 1, description: "id занятия"})
    @IsNumber({}, {message: "Должно быть числом"})
    @Min(1)
    lessonId: number

    @ApiProperty({example: 1, description: "id учителя"})
    @IsNumber({}, {message: "Должно быть числом"})
    @Min(1)
    teacherId: number
}