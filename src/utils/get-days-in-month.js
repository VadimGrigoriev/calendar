import moment from 'moment';
import 'moment/locale/ru';

// получить список с отображаемыми датами в календаре
export default function getDatesInMonthDisplay(date) {  
  moment.locale('ru');

  const nowDate = moment(date);
  const countDaysInMonth = nowDate.daysInMonth();                   // количество дней в текущем месяце
  const firstWeekday = nowDate.startOf('month').isoWeekday();       // первый день недели текущего месяца

  const result = [];
  
  // добавляем дни предыдущего месяца
  if (firstWeekday !== 1) {
    const lastMonth = nowDate.clone().subtract(1, 'month');   // прошлый месяц
    const lastMonthDays = lastMonth.daysInMonth();            // количество дней в прошлом месяце

    for (let j = firstWeekday - 1; j > 0; j--) {  
      result.push({  
        date: moment(lastMonth).add(lastMonthDays - j, 'days'),  
        currentMonth: false  
      })  
    }
  }

  // добавляем дни текущего месяца
  for (let day = 1; day <= countDaysInMonth; day++) {
    result.push({
      date: moment(nowDate).date(day), 
      currentMonth: true
    })
  }

  // добавляем дни следующего месяца
  const nextMonth = nowDate.clone().add(1, 'month');        // следующий месяц
  const remainingDays = 7 - (result.length % 7);            // проверяем сколько дней не хватает в последней неделе
  if (remainingDays !== 7) {
    for (let day = 1; day <= remainingDays; day++) {
      result.push({
        date: moment(nextMonth).date(day), 
        currentMonth: false
      })
    }
  }
  return result;  
}