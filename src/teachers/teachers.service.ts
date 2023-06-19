import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Teacher} from "./models/teachers.model";
import {LessonTeachers} from "./models/lesson_teachers.model";


@Injectable()
export class TeachersService {
    constructor(@InjectModel(Teacher) private teacherRepository: typeof Teacher) {}

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
}
