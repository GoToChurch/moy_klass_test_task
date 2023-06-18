import {IsDate, IsNumber, IsString, Length, Max, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateLessonDto {
    @ApiProperty({example: "Красивые берега Черного моря", description: "Тема занятия"})
    @IsString({message: "Поле 'title' должно быть строкой"})
    @Length(1)
    title: string;

    @ApiProperty({example: "2023-17-05", description: "Дата проведения занятия"})
    @IsString({message: "Поле 'date' должно быть строкой"})
    date: string;

    @ApiProperty({example: 1, description: "Статус занятия, либо 0 (не проведено), либо 1 (проведено)"})
    @IsNumber({}, {message: "Поле 'status' должно быть строкой"})
    @Min(0)
    @Max(1)
    status: number
}