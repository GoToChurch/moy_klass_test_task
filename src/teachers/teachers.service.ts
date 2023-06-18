import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Teacher} from "./models/teachers.model";
import {LessonTeachers} from "./models/lesson_teachers.model";
import {CreateTeacherDto} from "./dto/create_teacher.dto";


@Injectable()
export class TeachersService {
    constructor(@InjectModel(Teacher) private teacherRepository: typeof Teacher,
                @InjectModel(LessonTeachers) private lessonTeachersRepository: typeof LessonTeachers) {}

    async createTeacher(createTeacherDto: CreateTeacherDto) {
        return await this.teacherRepository.create(createTeacherDto);
    }

    async getAllTeachers() {
        return await this.teacherRepository.findAll();
    }

    async getAllTeachersIds() {
        const teachers = await this.getAllTeachers();
        let ids = [];

        for (const teacher of teachers) {
            ids.push(teacher.id);
        }

        return ids;
    }

    async getTeacherById(id: number) {
        return await this.teacherRepository.findByPk(id);
    }

    async editTeacher(createTeacherDto: CreateTeacherDto, id: number) {
        await this.teacherRepository.update({...createTeacherDto}, {
            where: {
                id
            }
        });

        return this.getTeacherById(id);
    }

    async deleteTeacher(id: number) {
        return await this.teacherRepository.destroy({
            where: {
                id
            }
        });
    }
}
