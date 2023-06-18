import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {LessonTeachers} from "./lesson_teachers.model";
import {Lesson} from "../../lessons/lessons.model";
import {ApiProperty} from "@nestjs/swagger";


interface TeacherCreationAttrs {
    name: string;
}


@Table({tableName: "teachers", createdAt: false, updatedAt: false})
export class Teacher extends Model<Teacher, TeacherCreationAttrs> {
    @ApiProperty({example: 1, description: "id учителя"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "Алексей", description: "Имя учителя"})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: [], description: "Список занятий, которые ведет учитель"})
    @BelongsToMany(() => Lesson, () => LessonTeachers)
    lessons: Lesson[];
}