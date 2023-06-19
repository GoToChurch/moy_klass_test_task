import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Lesson} from "./lessons.model";
import {CreateLessonDto} from "./dto/create_lesson.dto";
import {CreateLessonsDto} from "./dto/create_lessons.dto";
import {DateUtils} from "../utils/date_utils";
import {Teacher} from "../teachers/models/teachers.model";
import {Student} from "../students/models/students.model";
import {AddTeacherDto} from "./dto/add_teacher.dto";
import {AddStudentDto} from "./dto/add_student.dto";
import {StudentsService} from "../students/students.service";
import {Op} from "sequelize";
import {TeachersService} from "../teachers/teachers.service";
import {Sequelize} from "sequelize-typescript";
import {ValidateUtils} from "../utils/validate_utils";


@Injectable()
export class LessonsService {
    constructor(@InjectModel(Lesson) private lessonRepository: typeof Lesson,
                private studentService: StudentsService,
                private teacherService: TeachersService) {
    }

    async createLessons(createLessonsDto: CreateLessonsDto) {
        ValidateUtils.validateDate(createLessonsDto.firstDate);

        let currentDate = new Date(createLessonsDto.firstDate).toJSON().substring(0,10);
        let idsForReturn = [];

        if (createLessonsDto.lessonsCount) {
            for (let i = 0; i < createLessonsDto.lessonsCount;) {
                if (DateUtils.checkIfMoreThanYearDifference(createLessonsDto.firstDate, currentDate)) {
                    break;
                }

                if (createLessonsDto.days.includes(DateUtils.getDayFromDate(currentDate))) {
                    const lesson = await this.createLessonAndAddTeacher(createLessonsDto, currentDate);
                    idsForReturn.push(lesson.id);
                    i++;
                }

                currentDate = DateUtils.addOneDayToDate(currentDate).toJSON().substring(0,10);
            }
        } else if (createLessonsDto.lastDate) {
            ValidateUtils.validateDate(createLessonsDto.lastDate);
            let createdLessonsCount = 0;

            outerloop:
            while (!DateUtils.checkIfDatesAreEqual(currentDate, createLessonsDto.lastDate)) {
                if (DateUtils.checkIfMoreThanYearDifference(createLessonsDto.firstDate, currentDate)) {
                    break;
                }

                if (createLessonsDto.days.includes(DateUtils.getDayFromDate(currentDate))) {
                    const lesson = await this.createLessonAndAddTeacher(createLessonsDto, currentDate);
                    idsForReturn.push(lesson.id);

                    createdLessonsCount++;
                    if (createdLessonsCount == 300) {
                        break outerloop;
                    }
                }

                currentDate = DateUtils.addOneDayToDate(currentDate).toJSON().substring(0,10);
            }
        }

        return idsForReturn;
    }

    async createLesson(createLessonDto: CreateLessonDto) {
            ValidateUtils.validateDate(createLessonDto.date);

            const lesson = await this.lessonRepository.create({...createLessonDto, date: new Date(createLessonDto.date)});
            await lesson.$set("teachers", []);
            await lesson.$set("students", []);

            return lesson;
    }

    async createLessonAndAddTeacher(createLessonsDto: CreateLessonsDto, currentDate) {
        const status = DateUtils.convertDateInTimestamp(currentDate) >
        DateUtils.convertDateInTimestamp(new Date()) ? 0 : 1;

        const createLessonDto: CreateLessonDto = {
            date: new Date(currentDate).toJSON().substring(0,10),
            status,
            title: createLessonsDto.title
        }

        const lesson = await this.createLesson(createLessonDto);

        for (const teacherId of createLessonsDto.teacherIds) {
            await this.addTeacherToLesson({
                lessonId: lesson.id,
                teacherId
            });
        }

        return lesson;
    }

    async getLessons(date?, status?, teachersIds?, studentsCount?, page?, lessonsPerPage= 5) {
        const firstElement = page ? page * lessonsPerPage - lessonsPerPage : 0;
        let firstDate = new Date("1400-01-01");
        let secondDate = new Date("3000-01-01");
        let firstStatus = 0;
        let secondStatus = 1;
        let firstStudentCount = 0;
        let secondStudentCount = Number.MAX_VALUE;

        if (teachersIds) {
            ValidateUtils.validateTeachersIds(teachersIds)
        }
        teachersIds = teachersIds ? teachersIds.split(",") : await this.teacherService.getAllTeachersIds();

        if (date) {
            ValidateUtils.validateDate(date)

            if (date.includes(",")) {
                date = date.split(",");
                firstDate = new Date(date[0]);
                secondDate = new Date(date[1]);
            } else {
                firstDate = secondDate = date;
            }
        }

        if (status) {
            firstStatus = secondStatus = status;
        }

        if (studentsCount) {
            if (studentsCount.includes(",")) {
                studentsCount = studentsCount.split(",");

                ValidateUtils.validateStudentsCountArray(studentsCount);

                firstStudentCount = Math.min(studentsCount[0], studentsCount[1]);
                secondStudentCount = Math.max(studentsCount[0], studentsCount[1])

            } else {
                ValidateUtils.validateStudentsCountNumber(studentsCount);

                firstStudentCount = secondStudentCount = studentsCount
            }
        }

        let lessons = await this.lessonRepository.findAll({
            include: [
                {
                    model: Teacher,
                    through: { attributes: [] },
                    where: {
                        id: {
                            [Op.in]: teachersIds
                        }
                    },
                },
                {
                    model: Student,
                    attributes: {
                        include: [
                            [
                                Sequelize.literal(
                                    '(SELECT lesson_students.visit FROM lesson_students WHERE lesson_students.student_id = students.id and lesson_students.lesson_id = "Lesson"."id")'
                            ),
                                "visit",
                            ],
                        ],
                    },
                    through: { attributes: [] },
                }
            ],
            offset: firstElement,
            limit: lessonsPerPage,
            where: Sequelize.and({
                date: {
                    [Op.between]: [firstDate, secondDate]
                }}, {
                    status: {
                        [Op.or]: [firstStatus, secondStatus]
                    },
                }, Sequelize.where(Sequelize.literal('(SELECT COUNT("student_id") FROM "lesson_students" WHERE "lesson_id" = "Lesson"."id")'),
                Op.between, [firstStudentCount, secondStudentCount]
            )),
            order: ["id"],
        })
        let resultArray = [];

        for (let lesson of lessons) {
            let visitCount = 0;

            for (const student of lesson.students) {
                if (await this.studentService.isStudentVisitedLesson(student.id, lesson.id)) {
                    visitCount++
                }
            }

            resultArray.push({
                id: lesson.id,
                date: lesson.date,
                title: lesson.title,
                status: lesson.status,
                visitCount,
                students: lesson.students,
                teachers: lesson.teachers
            })
        }

        return resultArray;
    }

    async getLessonById(id: number) {
        return await this.lessonRepository.findByPk(id, {
            include: {
                all: true
            }
        });
    }

    async editLesson(createLessonDto: CreateLessonDto, id: number) {
        await this.lessonRepository.update({...createLessonDto, date: new Date(createLessonDto.date)}, {
            where: {
                id
            }
        });

        return this.getLessonById(id);
    }

    async deleteLesson(id: number) {
        return await this.lessonRepository.destroy({
            where: {
                id
            }
        });
    }

    async addTeacherToLesson(addTeacherDto: AddTeacherDto) {
        const lesson = await this.getLessonById(addTeacherDto.lessonId);
        await lesson.$add("teachers", [addTeacherDto.teacherId]);

        return lesson;
    }

    async addStudentToLesson(addStudentDto: AddStudentDto) {
        const lesson = await this.getLessonById(addStudentDto.lessonId);
        await lesson.$add("students", [addStudentDto.studentId]);

        return lesson;
    }
}
