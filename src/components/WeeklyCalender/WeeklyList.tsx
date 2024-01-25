import styled from 'styled-components';
import theme from '@/styles/theme/theme';
import DailyTodo from './DailyTodo';

interface DayInfo {
  day: string;
  date: number;
  isToday: boolean;
}

const dayMapping: { [key: number]: string } = {
  0: 'SUN',
  1: 'MON',
  2: 'TUE',
  3: 'WED',
  4: 'THU',
  5: 'FRI',
  6: 'SAT',
};

const WeeklyList = () => {
  const now = new Date();
  const today = new Date(now.getTime()); // now를 복사하여 today를 생성
  const dayOfWeek = now.getDay();
  const sunday = new Date(now.setDate(now.getDate() - dayOfWeek));
  const weekDays: DayInfo[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(sunday.getTime() + i * 24 * 60 * 60 * 1000);
    weekDays.push({
      day: dayMapping[currentDay.getDay()],
      date: currentDay.getDate(),
      isToday:
        currentDay.getDate() === today.getDate() &&
        currentDay.getMonth() === today.getMonth() &&
        currentDay.getFullYear() === today.getFullYear(),
    });
  }

  return (
    <WeekContainer>
      <DayList>
        {weekDays.map((item, i) => (
          <DayItem key={i}>
            <DayTxt
              color={
                item.day === 'SUN'
                  ? '#DA4A4A'
                  : item.day === 'SAT'
                  ? '#4A8CDA'
                  : 'black'
              }
            >
              {item.day}
            </DayTxt>

            <DateTxt isToday={item.isToday} isSunday={item.day === 'SUN'}>
              {item.date}
            </DateTxt>
            <DailyTodo date={`${sunday.getFullYear()}-${sunday.getMonth()+1}-${item.date}`} />
          </DayItem>
        ))}
      </DayList>
    </WeekContainer>
  );
};

export default WeeklyList;

const WeekContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  p {
    font-size: 18px;
    font-weight: ${theme.fontWeight.Regular};
  }
`;

const DayList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0;
  width: 100%;
  height: 100%;
  flex: 1 1 auto;
`;

const DayItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border : 1px solid black;
  border-style: none solid;
  padding-top: .625rem;

  margin: -1px 0 0 -1px;
  list-style: none;
  flex: 1 1 auto;
`;

const DayTxt = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 14px;
  font-weight: ${theme.fontWeight.Regular};
  margin-bottom: 5px;
`;

const DateTxt = styled.div<{ isToday: boolean; isSunday: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  max-width: 3.125rem;
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;

  margin-bottom: .625rem;

  color: ${({ isToday, isSunday }) =>
    isToday ? 'white' : isSunday ? '#DA4A4A' : 'black'};
  background-color: ${({ isToday }) => (isToday ? '#9AC5F4' : 'none')};

  font-size: 30px;
  font-weight: ${theme.fontWeight.Regular};
`;
