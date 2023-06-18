import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Teacher} from "../teachers/models/teachers.model";
import {LessonTeachers} from "../teachers/models/lesson_teachers.model";
import {LessonStudents} from "../students/models/lesson_students.model";
import {Student} from "../students/models/students.model";
import {ApiProperty} from "@nestjs/swagger";


interface LessonCreationAttrs {
    date: string;
    title: string;
    status: number;
}


@Table({tableName: "lessons", createdAt: false, updatedAt: false})
export class Lesson extends Model<Lesson, LessonCreationAttrs> {
    @ApiProperty({example: 1, description: "id занятия"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "2023-17-05", description: "Дата проведения занятия"})
    @Column({type: DataType.STRING, allowNull: false})
    date: string;

    @ApiProperty({example: "Красивые берега Черного моря", description: "Тема занятия"})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({example: 1, description: "Статус занятия, либо 0 (не проведено), либо 1 (проведено)"})
    @Column({type: DataType.INTEGER, allowNull: false})
    status: number;

    @ApiProperty({example: [], description: "Список учителей, ведущих занятие"})
    @BelongsToMany(() => Teacher, () => LessonTeachers)
    teachers: Teacher[];

    @ApiProperty({example: [], description: "Список студентов, посещяющих занятие"})
    @BelongsToMany(() => Student, () => LessonStudents)
    students: Student[];
}