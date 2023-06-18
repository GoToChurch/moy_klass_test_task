import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Lesson} from "./lessons.model";
import {StudentsModule} from "../students/students.module";
import {TeachersModule} from "../teachers/teachers.module";

@Module({
  imports: [
      SequelizeModule.forFeature([Lesson]),
      StudentsModule,
      TeachersModule,
  ],
  controllers: [LessonsController],
  providers: [LessonsService]
})
export class LessonsModule {}
