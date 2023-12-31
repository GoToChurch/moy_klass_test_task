import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Teacher} from "./models/teachers.model";
import {LessonTeachers} from "./models/lesson_teachers.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Teacher, LessonTeachers]),
  ],
  controllers: [],
  providers: [TeachersService],
  exports: [
    TeachersService
  ]
})
export class TeachersModule {}
