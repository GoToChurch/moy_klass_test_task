import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Student} from "./models/students.model";
import {LessonStudents} from "./models/lesson_students.model";


@Injectable()
export class StudentsService {
    constructor(@InjectModel(Student) private studentRepository: typeof Student,
                @InjectModel(LessonStudents) private lessonStudentsRepository: typeof LessonStudents) {}

    async isStudentVisitedLesson(studentId, lessonId) {
        let studentLesson = await this.lessonStudentsRepository.findOne({
            where: {
                student_id: studentId,
                lesson_id: lessonId
            }
        })

        return studentLesson.visit;
    }
}
