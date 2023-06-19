import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {LessonsService} from "./lessons.service";
import {CreateLessonDto} from "./dto/create_lesson.dto";
import {CreateLessonsDto} from "./dto/create_lessons.dto";
import {AddTeacherDto} from "./dto/add_teacher.dto";
import {AddStudentDto} from "./dto/add_student.dto";
import {ApiOperation, ApiParam, ApiQuery, ApiResponse} from "@nestjs/swagger";
import {Lesson} from "./lessons.model";

@Controller()
export class LessonsController {
    constructor(private lessonsService: LessonsService) {}

    @ApiOperation({summary: "Создание занятия"})
    @ApiResponse({status: 201, type: Lesson})
    @Post("lesson/")
    createLesson(@Body() createLessonDto: CreateLessonDto) {
        return this.lessonsService.createLesson(createLessonDto);
    }

    @ApiOperation({summary: "Создание сразу нескольких занятий. Возвращает список с id созданных занятий"})
    @ApiResponse({status: 201, type: [Number]})
    @Post("lessons/")
    createLessons(@Body() createLessonsDto: CreateLessonsDto) {
        return this.lessonsService.createLessons(createLessonsDto);
    }

    @ApiOperation({summary: "Получение списка всех занятий"})
    @ApiQuery({ name: "date", required: false, example: "2023-06-17", description: `Либо одна дата в формате 
    YYYY-MM-DD, либо две в таком же формате через запятую (например, «2019-01-01,2019-09-01». Если указана одна дата, 
    выбираются занятия на эту дату. Если указаны 2 даты, то выбираются занятия за период, включая указанные даты.
    Если параметр не указан, выбираются все занятия с 1400-01-01 по 3000-01-01`})
    @ApiQuery({ name: "status", required: false, example: 0,  description: `id учителей через запятую. 
    Выбираются все занятия, которые ведет хотя бы один из указанных учителей. Если параметр не указан, то выбираются 
    занятия с обоими статусами`})
    @ApiQuery({ name: "teachersIds", required: false, example: 1, description: `id учителей через запятую.
     Выбираются все занятия, которые ведет хотя бы один из указанных учителей. Если параметр не указан, выбираются
     занятия хотя бы с одним любым учителем`})
    @ApiQuery({ name: "studentsCount", required: false, example: 5, description: `Количество записанных на занятия 
    учеников. либо одно число (тогда выбирается занятие с точным числом записанных), либо 2 числа через запятую, тогда 
    они рассматриваются как диапазон и выбираются занятия с количеством записанных, попадающих в диапазон включительно.`})
    @ApiQuery({ name: "page", required: false, example: 10000, description: `Номер возвращаемой страницы. 
    первая страница - 1. Если параметр не указан, выдается результат с первой страницы`})
    @ApiQuery({ name: "lessonsPerPage", required: false, example: 200, description: `Количество занятий на странице.
    По-умолчанию - 5 занятий`})
    @ApiResponse({status: 200, type: [Lesson]})
    @Get()
    getAll(@Query() query) {
        return this.lessonsService.getLessons(query.date, query.status, query.teachersIds, query.studentsCount,
            query.page, query.lessonsPerPage);
    }

    @ApiOperation({summary: "Получение одного занятия по id"})
    @ApiResponse({status: 200, type: Lesson})
    @ApiParam({name: "id", example: 1})
    @Get("lesson/:id")
    getById(@Param("id") id: any) {
        return this.lessonsService.getLessonById(id);
    }

    @ApiOperation({summary: "Редактирование занятия по id"})
    @ApiResponse({status: 201, type: Lesson})
    @ApiParam({name: "id", example: 1})
    @Put("lesson/:id")
    edit(@Body() createLessonDto: CreateLessonDto,
         @Param("id") id: any) {

        return this.lessonsService.editLesson(createLessonDto, id);
    }

    @ApiOperation({summary: "Удаление занятия по id"})
    @ApiResponse({status: 200})
    @ApiParam({name: "id", example: 1})
    @Delete("lesson/:id")
    deleteById(@Param("id") id: any) {
        return this.lessonsService.deleteLesson(id);
    }

    @ApiOperation({summary: "Добавление учителя занятию"})
    @ApiResponse({status: 201, type: Lesson})
    @Post("lesson/addTeacher")
    addTeacher(@Body() addTeacherDto: AddTeacherDto) {
        return this.lessonsService.addTeacherToLesson(addTeacherDto)
    }

    @ApiOperation({summary: "Добавление студента занятию"})
    @ApiResponse({status: 201, type: Lesson})
    @Post("lesson/addStudent")
    addStudent(@Body() addStudentDto: AddStudentDto) {
        return this.lessonsService.addStudentToLesson(addStudentDto)
    }
}
