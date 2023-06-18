/*
    Утилитный класс для работы с датой
 */
export class DateUtils {
    static ONEYEARINMILLISECONDS = 3.15576e10;
    static ONEDAYINMILLISECONDS = 86400000;

    /*
        Метод для перевода даты в формат timestamp
        На вход принимает:
            date - дата, которую необходимо перевести в timestamp
        Возвращает: дату в формате timestamp
     */
    static convertDateInTimestamp(date) {
        return new Date(date).getTime();
    }

    /*
        Метод, проверяющий, что разница между переданными датами составляет больше года
        На вход принимает:
            firstDate - первая дата
            secondDate - вторая дата,
        Возвращает:
            true - если разница между переданными датами составляет больше года
            false - в обратном случае
     */
    static checkIfMoreThanYearDifference(firstDate, secondDate) {
        const firstDateTimestamp = +this.convertDateInTimestamp(firstDate);
        const secondDateTimestamp = +this.convertDateInTimestamp(secondDate);

        if (secondDateTimestamp < firstDateTimestamp) {
            return "Вторая дата должна быть больше первой"
        }

        return secondDateTimestamp - firstDateTimestamp >= this.ONEYEARINMILLISECONDS
    }

    /*
        Метод, добавляющий к переданной дате один день
        На вход принимает:
            date - дата в формате "YYYY-MM-DD"
        Возвращает:
            Переданная дата + один день
     */
    static addOneDayToDate(date) {
        return new Date(+this.convertDateInTimestamp(date) + this.ONEDAYINMILLISECONDS);
    }

    /*
        Метод для получения дня из даты
        На вход принимает:
            date - дата в формате "YYYY-MM-DD"
        Возвращает:
            День недели переданной даты
     */
    static getDayFromDate(date): number {
        return Number(new Date(this.convertDateInTimestamp(date)).getDay());
    }

    /*
        Метод, проверяющий, что даты равны
        На вход принимает:
            firstDate - первая дата в формате "YYYY-MM-DD"
            secondDate - вторая дата в формате "YYYY-MM-DD",
        Возвращает:
            true - если даты равны
            false - в обратном случае
     */
    static checkIfDatesAreEqual(firstDate, secondDate) {
        const firstDateTimestamp = +this.convertDateInTimestamp(firstDate);
        const secondDateTimestamp = +this.convertDateInTimestamp(secondDate);

        return secondDateTimestamp == firstDateTimestamp;
    }
}