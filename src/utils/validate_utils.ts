/*
    Класс для дополнительной валидации данных
 */
import {HttpException, HttpStatus} from "@nestjs/common";

export class ValidateUtils {
    /*
        Метод, проверяющий, что переданная дата находится в формате "YYYY-MM-DD"
        На вход принимает:
            date - дата, которую необходимо проеерить
        Возвращает:
            true - если дата находится в формате "YYYY-MM-DD
            false - в обратном случае
     */
    static validateDate(date) {
        const matcher = date.match(/\d{4}-\d{2}-\d{2}/gi);

        if (!matcher) {
            throw new HttpException("Неккоректный формат даты. Правильный формат 'YYYY-MM-DD'",
                HttpStatus.BAD_REQUEST);
        }
    }

    static validateStudentsCountArray(studentsCount) {
        if (studentsCount.length != 2) {
            throw new HttpException("Должно быть два параметра количества учеников, перечисляемых через запятую ",
                HttpStatus.BAD_REQUEST);
        }

        if (!isFinite(studentsCount[0] || !isFinite(studentsCount[1]))) {
            throw new HttpException("Количество учеников должно быть числом",
                HttpStatus.BAD_REQUEST);
        }
    }

    static validateStatus(status) {
        if (status !== 1 || status !== 0) {
            throw new HttpException("Статус может быть равен либо 0, либо 1 ",
                HttpStatus.BAD_REQUEST);
        }
    }

    static validateStudentsCountNumber(studentsCount) {
        if (!isFinite(studentsCount)) {
            throw new HttpException("Количество учеников должно быть числом",
                HttpStatus.BAD_REQUEST);
        }
    }

    static validateTeachersIds(teachersIds) {
        for (const teachersId of teachersIds) {
            if (!isFinite(teachersIds)) {
                throw new HttpException("id учителя должно быть числом",
                    HttpStatus.BAD_REQUEST);
            }
        }
    }
}