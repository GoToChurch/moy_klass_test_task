import {
    ArrayMaxSize,
    ArrayMinSize,
    ArrayNotEmpty,
    IsArray,
    IsNumber,
    IsString,
    Length,
    Max,
    Min, ValidateIf
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";



export class CreateLessonsDto {
    @ApiProperty({example: [1, 2], description: "id учителей, ведущих занятия"})
    @IsArray({message: "Поле 'teacherIds' должно быть массивом"})
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsNumber({}, {each: true})
    @Min(1, {each: true})
    teacherIds: number[];

    @ApiProperty({example: "Красивые берега Черного моря", description: "Тема занятия. Одинаковая на все создаваемые занятия"})
    @IsString({message: "Поле 'title' должно быть строкой"})
    @Length(1)
    title: string;

    @ApiProperty({example: [0,1,3,6], description: `Дни недели, по которым нужно создать занятия, где 0 - это воскресенье`})
    @IsArray({message: "Поле 'days' должно быть массивом"})
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @ArrayMaxSize(7)
    @IsNumber({}, {each: true})
    @Min(0, {each: true})
    @Max(6, {each: true})
    days: number[]

    @ApiProperty({example: "2019-05-31", description: "Первая дата, от которой нужно создавать занятия"})
    @IsString({message: "Поле 'firstDate' должно быть строкой"})
    firstDate: string

    @ApiProperty({example: 10, description: "Количество занятий для создания"})
    @IsNumber({}, {message: "Поле 'lessonsCount' должно быть числом"})
    @ValidateIf((object, value) => value != undefined)
    @Min(0)
    @Max(300)
    lessonsCount?: number | undefined

    @ApiProperty({example: "2019-12-31", description: "Последняя дата, до которой нужно создавать занятия."})
    @IsString({message: "Поле 'lastDate' должно быть строкой"})
    @ValidateIf((object, value) => value != undefined)
    readonly lastDate?: string | undefined
}