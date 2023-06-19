import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Lesson} from "../../lessons/lessons.model";
import {Teacher} from "./teachers.model";
import {ApiProperty} from "@nestjs/swagger";


@Table({tableName: "lesson_teachers", createdAt: false, updatedAt: false})
export class LessonTeachers extends Model<LessonTeachers> {
    @ApiProperty({example: 2, description: "id занятия"})
    @ForeignKey(() => Lesson)
    @Column({type: DataType.INTEGER})
    lesson_id: number;

    @ApiProperty({example: 1, description: "id учителя"})
    @ForeignKey(() => Teacher)
    @Column({type: DataType.INTEGER})
    teacher_id: number;
}