import getDatesInMonthDisplay from './utils/get-days-in-month';
import moment from 'moment';
import 'moment/locale/ru';


export default function Calendar({ date }) {
  moment.locale('ru');

  const nowDate = moment(date);
  const dayOfWeek = nowDate.format('dddd');  // текущий день недели
  const day = nowDate.date();                // текущий день месяца
  const month = nowDate.format('MMMM');      // текущий месяц
  const year = nowDate.year();               // текущий год

  const listDays = getDatesInMonthDisplay(date);
  
  // Формируем таблицу календаря
  const calendarRows = [];
  for (let i = 0; i < listDays.length; i += 7) {
    calendarRows.push(listDays.slice(i, i + 7));
  }
  
  return (
    <div className='ui-datepicker'>
      <div className='ui-datepicker-material-header'>
        <div className='ui-datepicker-material-day'>{ dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1) }</div>
        <div className='ui-datepicker-material-date'>
          <div className='ui-datepicker-material-day-num'>{ day }</div>
          <div className='ui-datepicker-material-month'>{ month }</div>
          <div className='ui-datepicker-material-year'>{ year }</div>
        </div>
      </div>
      <div className='ui-datepicker-header'>
        <div className='ui-datepicker-title'>
          <span className='ui-datepicker-month'>{ month }</span>&nbsp;
          <span className='ui-datepicker-year'>{ year }</span>
        </div>
      </div>
      <table className='ui-datepicker-calendar'>
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className='ui-datepicker-week-end'/>
          <col className='ui-datepicker-week-end'/>
        </colgroup>
        <thead>
        <tr>
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>
      
        <tbody>
          {calendarRows.map((week, weekIndex) => (
            <tr key={ weekIndex }>
              {week.map((dateObj, dayIndex) => (
                <td
                key={dayIndex}
                className={`
                  ${!dateObj.currentMonth ? 'ui-datepicker-other-month' : ''}
                  ${dateObj.currentMonth && dateObj.date.date() === day ? 'ui-datepicker-today' : ''}
                `}
              >
                {dateObj.date.date()}
              </td>
            ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
