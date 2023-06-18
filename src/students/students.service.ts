import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreateStudentDto} from "./dto/create_student.dto";
import {Student} from "./models/students.model";
import {LessonStudents} from "./models/lesson_students.model";
import {AddStudentDto} from "../lessons/dto/add_student.dto";


@Injectable()
export class StudentsService {
    constructor(@InjectModel(Student) private studentRepository: typeof Student,
                @InjectModel(LessonStudents) private lessonStudentsRepository: typeof LessonStudents) {}

    async createStudent(createStudentDto: CreateStudentDto) {
        return await this.studentRepository.create(createStudentDto);
    }

    async getAllStudents() {
        return await this.studentRepository.findAll();
    }

    async getStudentById(id: number) {
        return await this.studentRepository.findByPk(id);
    }

    async editStudent(createStudentDto: CreateStudentDto, id: number) {
        await this.studentRepository.update({...createStudentDto}, {
            where: {
                id
            }
        });

        return this.getStudentById(id);
    }

    async deleteStudent(id: number) {
        return await this.studentRepository.destroy({
            where: {
                id
            }
        });
    }

    async isStudentVisitedLesson(studentId, lessonId) {
        let studentLesson = await this.lessonStudentsRepository.findOne({
            where: {
                student_id: studentId,
                lesson_id: lessonId
            }
        })

        return studentLesson.visit;
    }

    async markStudentVisit(addStudentDto: AddStudentDto) {
        let studentLesson = await this.lessonStudentsRepository.findOne({
            where: {
                student_id: addStudentDto.studentId,
                lesson_id: addStudentDto.lessonId
            }
        })

        studentLesson.visit = true;
        studentLesson.save();

        return studentLesson;
    }
}
