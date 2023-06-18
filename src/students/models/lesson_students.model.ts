import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Lesson} from "../../lessons/lessons.model";
import {Student} from "./students.model";
import {ApiProperty} from "@nestjs/swagger";


@Table({tableName: "lesson_students", createdAt: false, updatedAt: false})
export class LessonStudents extends Model<LessonStudents> {
    @ApiProperty({example: 1, description: "id записи"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 2, description: "id занятия"})
    @ForeignKey(() => Lesson)
    @Column({type: DataType.INTEGER})
    lesson_id: number;

    @ApiProperty({example: 1, description: "id студента"})
    @ForeignKey(() => Student)
    @Column({type: DataType.INTEGER})
    student_id: number;

    @ApiProperty({example: true, description: "Статус посещения студентом занятия, либо true, либо false"})
    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false})
    visit: boolean
}