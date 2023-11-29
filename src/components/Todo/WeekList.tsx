import styled from 'styled-components';
import theme from '@/styles/theme/theme';

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

const WeekList = () => {
  // 주간 날자 계산
  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today.setDate(today.getDate() - dayOfWeek));

  const weekDays: DayInfo[] = Array.from({ length: 7 }).map((_, i) => {
    const currentDay = new Date(sunday.getTime() + i * 24 * 60 * 60 * 1000);
    return {
      day: dayMapping[currentDay.getDay()],
      date: currentDay.getDate(),
      isToday: currentDay.getDate() === today.getDate(),
    };
  });
  
  console.log(dayOfWeek);
  console.log('일요일',sunday);
  console.log('오늘', new Date());
  console.log('함수',today);
  
  

  return (
    <WeekContainer>
      <DayList>
        {weekDays.map((item, i) => (
          <DayItem key={i}>
            <DayTxt
              color={
                item.day === 'SUN'
                  ? 'red'
                  : item.day === 'SAT'
                  ? 'blue'
                  : 'black'
              }
            >
              {item.day}
            </DayTxt>
            <DateTxt isToday={item.isToday}>{item.date}</DateTxt>
          </DayItem>
        ))}
      </DayList>
    </WeekContainer>
  );
};

export default WeekList;

const WeekContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 5px;
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
  width: 34px;
  height: 100%;

  gap: 13px;
`;

const DayItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  list-style: none;
`;

const DayTxt = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 10px;
  font-weight: ${theme.fontWeight.Regular};
`;

const DateTxt = styled.div<{ isToday: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: ${({ isToday }) => (isToday ? 'white' : 'black')};
  background-color: ${({ isToday }) => (isToday ? '#9AC5F4' : 'none')};

  font-size: 10px;
  font-weight: ${theme.fontWeight.Regular};
`;
