import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {StudentsService} from "./students.service";
import {CreateStudentDto} from "./dto/create_student.dto";
import {ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";
import {Lesson} from "../lessons/lessons.model";
import {Student} from "./models/students.model";
import {LessonStudents} from "./models/lesson_students.model";
import {AddStudentDto} from "../lessons/dto/add_student.dto";


@Controller("students")
export class StudentsController {
    constructor(private studentsService: StudentsService) {}

    @ApiOperation({summary: "Создание студента"})
    @ApiResponse({status: 201, type: Student})
    @Post()
    create(@Body() createStudentDto: CreateStudentDto) {
        return this.studentsService.createStudent(createStudentDto);
    }

    @ApiOperation({summary: "Получение списка всех студентов"})
    @ApiResponse({status: 200, type: [Student]})
    @Get()
    getAll() {
        return this.studentsService.getAllStudents();
    }

    @ApiOperation({summary: "Получение студента по id"})
    @ApiResponse({status: 200, type: Student})
    @ApiParam({name: "id", example: 1})
    @Get("/:id")
    getById(@Param("id") id: any) {
        return this.studentsService.getStudentById(id);
    }

    @ApiOperation({summary: "Редактирование студента по id"})
    @ApiResponse({status: 201, type: Student})
    @ApiParam({name: "id", example: 1})
    @Put("/:id")
    edit(@Body() createStudentDto: CreateStudentDto,
         @Param("id") id: any) {
        return this.studentsService.editStudent(createStudentDto, id);
    }

    @ApiOperation({summary: "Удаление студента по id"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Delete("/:id")
    delete(@Param("id") id: any) {
        return this.studentsService.deleteStudent(id);
    }

    @ApiOperation({summary: "Проставление отметки, что студент посетил занятие"})
    @ApiResponse({status: 201, type: LessonStudents})
    @Post("/markVisit")
    markStudentVisit(@Body() addStudentDto: AddStudentDto) {
        return this.studentsService.markStudentVisit(addStudentDto)
    }
}
