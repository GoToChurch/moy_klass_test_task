import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {LessonStudents} from "./models/lesson_students.model";
import {Student} from "./models/students.model";


@Module({
  imports: [
      SequelizeModule.forFeature([Student, LessonStudents]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [
    StudentsService
  ]
})
export class StudentsModule {}
