import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CreateTeacherDto} from "./dto/create_teacher.dto";
import {TeachersService} from "./teachers.service";
import {ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";
import {Student} from "../students/models/students.model";
import {Teacher} from "./models/teachers.model";


@Controller('teachers')
export class TeachersController {
    constructor(private teachersService: TeachersService) {}

    @ApiOperation({summary: "Создание учителя"})
    @ApiResponse({status: 201, type: Teacher})
    @Post()
    create(@Body() createTeacherDto: CreateTeacherDto) {
        return this.teachersService.createTeacher(createTeacherDto);
    }

    @ApiOperation({summary: "Получение списка всех учителей"})
    @ApiResponse({status: 200, type: [Teacher]})
    @Get()
    getAll() {
        return this.teachersService.getAllTeachers();
    }

    @ApiOperation({summary: "Получение учителя по id"})
    @ApiResponse({status: 200, type: Teacher})
    @ApiParam({name: "id", example: 1})
    @Get("/:id")
    getById(@Param("id") id: any) {
        return this.teachersService.getTeacherById(id);
    }

    @ApiOperation({summary: "Редактирование учителя по id"})
    @ApiResponse({status: 201, type: Teacher})
    @ApiParam({name: "id", example: 1})
    @Put("/:id")
    edit(@Body() createTeacherDto: CreateTeacherDto,
         @Param("id") id: any) {
        return this.teachersService.editTeacher(createTeacherDto, id);
    }

    @ApiOperation({summary: "Удаление учителя по id"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Delete("/:id")
    delete(@Param("id") id: any) {
        return this.teachersService.deleteTeacher(id);
    }
}
