import { Test } from '@nestjs/testing';
import {INestApplication, ValidationPipe} from "@nestjs/common";
import * as request from 'supertest';
import {AppModule} from "../../app.module";
import {CreateTeacherDto} from "../../teachers/dto/create_teacher.dto";
import {CreateLessonsDto} from "../dto/create_lessons.dto";


describe('Тесты для методов из ТЗ', () => {
  let app: INestApplication;
  let mockTeacher: CreateTeacherDto;
  let mockLessonsLessonCounts: CreateLessonsDto;
  let mockLessonsLastDate: CreateLessonsDto;
  let ids = [];

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule
      ],
    }).compile()

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    await app.init();

    mockLessonsLessonCounts = {
      teacherIds: [1, 2],
      title: "Theme",
      days: [1, 5, 0],
      firstDate: "2022-05-31",
      lessonsCount: 15
    }

    mockLessonsLastDate = {
      teacherIds: [1, 2],
      title: "Theme",
      days: [1, 5, 0],
      firstDate: "2022-05-31",
      lastDate: "2022-08-22"
    }
  })

  it('Создание нескольких уроков с корректными данными и через lessonsCount', async () => {
    let lessons = await request(app.getHttpServer())
        .post(`/lessons/`)
        .send(mockLessonsLessonCounts)
        .expect(201)
  })

  it('Создание нескольких уроков с корректными данными и через lastDate', async () => {
    let lessons = await request(app.getHttpServer())
        .post(`/lessons/`)
        .send(mockLessonsLastDate)
        .expect(201)
  })

  it('Создание нескольких уроков с пустым телом', async () => {
    let lessons = await request(app.getHttpServer())
        .post(`/lessons/`)
        .send({})
        .expect(400)
  })

  it('Создание нескольких уроков с некорректными данными и через lastDate', async () => {
    let lessons = await request(app.getHttpServer())
        .post(`/lessons/`)
        .send({...mockLessonsLastDate, lastDate: "18-07-2022"})
        .expect(400)
  })

  it('Получение нескольких уроков без параметров', async () => {
    let lessons = await request(app.getHttpServer())
        .get(`/`)
        .expect(200)
    expect(lessons.body)
        .toEqual(expect.arrayContaining([
          {
            id: expect.any(Number),
            date: expect.any(String),
            title: expect.any(String),
            status: expect.any(Number),
            visitCount: expect.any(Number),
            teachers: expect.arrayContaining([{ id: expect.any(Number), name: expect.any(String) }]),
            students: expect.arrayContaining([
              { id: expect.any(Number), name: expect.any(String), visit: expect.any(Boolean) },
            ]),
          },
        ]),
    )
    expect(lessons.body.length).toEqual(5)
  })

  it('Получение нескольких уроков с корректным параметром studentsCount', async () => {
    let lessons = await request(app.getHttpServer())
        .get(`/?studentsCount=2`)
        .expect(200)
    expect(lessons.body).toEqual(
        expect.arrayContaining([
          {
            id: expect.any(Number),
            date: expect.any(String),
            title: expect.any(String),
            status: expect.any(Number),
            visitCount: expect.any(Number),
            teachers: expect.arrayContaining([{ id: expect.any(Number), name: expect.any(String) }]),
            students: expect.arrayContaining([
              { id: expect.any(Number), name: expect.any(String), visit: expect.any(Boolean) },
            ]),
          },
        ]),
    )
  })

  it('Получение нескольких уроков с некорректным параметром teachersIds', async () => {
    let lessons = await request(app.getHttpServer())
        .get(`/?teachersIds=aaa`)
        .expect(400)
  })
})
