import styled from "styled-components";
import theme from "@/theme/theme";

interface DayInfo {
  day: string;
  date: number;
  isToday: boolean;
}

const dayMapping: { [key: number]: string } = {
  0: "SUN",
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
  6: "SAT",
};

const ShareWeek = () => {
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
                item.day === "SUN"
                  ? "#DA4A4A"
                  : item.day === "SAT"
                  ? "#4A8CDA"
                  : "black"
              }
            >
              {item.day}
            </DayTxt>

            <DateTxt isToday={item.isToday} isSunday={item.day === "SUN"}>
              {item.date}
            </DateTxt>
          </DayItem>
        ))}
      </DayList>
    </WeekContainer>
  );
};

export default ShareWeek;

const WeekContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  p {
    font-size: 18px;
    font-weight: ${theme.fontWeight.Regular};
  }
`;

const DayList = styled.ul`
  /* display: grid;
  grid-template-columns: repeat(7, 1fr); */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 13px;
  padding: 0;
  margin-left: 32px;
  width: 100%;
  height: 100%;
`;

const DayItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  list-style: none;
`;

const DayTxt = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 18px;
  font-weight: ${theme.fontWeight.Regular};
  margin-bottom: 5px;
`;

const DateTxt = styled.div<{ isToday: boolean; isSunday: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: ${({ isToday, isSunday }) => isToday ? "white" : isSunday ? "#DA4A4A" : "black"};
  background-color: ${({ isToday }) => (isToday ? "#9AC5F4" : "none")};
  font-size: 16px;
  font-weight: ${theme.fontWeight.Regular};
`;
