# Тестовое задание на разработку отчета по занятиям для moyklass.com.
С полным текстом задания можно ознакомиться в файле Тестовое задание бекенд.pdf

Проект выполнен на NestJs, СУБД - PostgreSQl, связь с СУБД выполнена с помощью Sequelize.
В дополнение к ТЗ были выполнены CRUD методы для иоделей Lesson, Teacher и Student. Методы сделаны для тестирования проекта как вручную через Postman, так и автоматически через Jest.
Также была выполнена Swagger документация, доступ к которой можно получить по эндпоинту localhost:3000/docs.
Тесты для методов из ТЗ находятся в директории src/lessons/test.

Порядок запуска проекта:
1. Склонировать проект к себе выполнив команду git clone https://github.com/GoToChurch/moy_klass_test_task.git
2. Находясь в директории с проектом выполнить команду npm install
3. Создать в PostgreSQL базу данных lesson_task или поменять в файле .env значение поля POSTGRES_DB на необходимое
4. В файле .env поменять значения полей POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD на свои значения
5. Запустить проект выполнив команду npm run start:dev
