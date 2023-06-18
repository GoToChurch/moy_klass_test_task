import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Lesson} from "../../lessons/lessons.model";
import {LessonStudents} from "./lesson_students.model";
import {ApiProperty} from "@nestjs/swagger";


interface StudentCreationAttrs {
    name: string;
}


@Table({tableName: "students", createdAt: false, updatedAt: false})
export class Student extends Model<Student, StudentCreationAttrs> {
    @ApiProperty({example: 1, description: "id студента"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "Алексей", description: "Имя студента"})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: [], description: "Список занятий, которые посещяет студент"})
    @BelongsToMany(() => Lesson, () => LessonStudents)
    lessons: Lesson[];
}