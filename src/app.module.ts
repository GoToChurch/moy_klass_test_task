import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {LessonsModule} from "./lessons/lessons.module";
import {TeachersModule} from "./teachers/teachers.module";
import {StudentsModule} from "./students/students.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {Lesson} from "./lessons/lessons.model";
import {Teacher} from "./teachers/models/teachers.model";
import {Student} from "./students/models/students.model";
import {LessonTeachers} from "./teachers/models/lesson_teachers.model";
import {LessonStudents} from "./students/models/lesson_students.model";



@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: ".env"
      }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Lesson, Teacher, Student, LessonTeachers, LessonStudents],
      autoLoadModels: true,
      synchronize: true
    }),
    LessonsModule,
    TeachersModule,
    StudentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
