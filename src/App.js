import Calendar from './Calendar';
import moment from 'moment';
import 'moment/locale/ru';

function App() {
  moment.locale('ru');
  const now = moment();

  // внутри компонента App:
  return (
    <Calendar date={now} />
  );
}

export default App;
