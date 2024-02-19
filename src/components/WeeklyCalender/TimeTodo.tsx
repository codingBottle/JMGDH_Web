import styled from 'styled-components';

interface Todo {
  id: number;
  title: string;
  colorCode: string;
  startDate: string;
  endDate: string;
  timeOfStartDate: string;
  timeOfEndDateTime: string;
  allDay: boolean;
  repeat: boolean;
}

interface TimeTodoProps {
  todos: Todo[];
  date: Date; // date props 추가
  showHours: boolean;
}

const TimeTodo = ({ todos, date, showHours }: TimeTodoProps) => {
  // 9시부터 24시까지의 시간 배열을 생성합니다.
  const hours = Array.from({ length: 16 }, (_, i) => i + 9);

  // 현재 시간 정보를 가져옵니다.
  const currentHour = new Date(date).getHours();

  // TimeTodo 컴포넌트가 최종적으로 렌더링할 JSX를 반환합니다.
  return (
    <Main>
      {/* 각 시간대에 대해 반복합니다. */}
      {hours.map((hour) => {

        // 해당 시간대에 속하는 일정들을 필터링합니다.
        const todosInThisHour = todos.filter(
          (todo) =>
            new Date(todo.startDate).toDateString() === date.toDateString() && // 년도, 월, 일이 일치하는 일정만 선택
            // 시작시간이 현재 시간에 해당하고, 종료시간이 해당시간보다 큰 일정만 선택
            parseInt(todo.timeOfStartDate, 10) <= hour &&
            parseInt(todo.timeOfEndDateTime, 10) > hour
        );

        // 각 시간대별로 렌더링할 JSX를 반환합니다. 이 반환된 JSX들은 새 배열에 담기게 됩니다.
        return (
          <HourBlock key={hour}>
            {/* showHours prop이 true일 때만 시간을 표시 */}
            <Hour
              showHours={showHours}
              data-text={hour < 10 ? `0${hour}` : hour}
            >
              {hour === currentHour && <CurrentHour></CurrentHour>}
            </Hour>
            <Todos>
              {/* 각 일정을 렌더링합니다. */}
              {todosInThisHour.slice(0, 2).map((todo) => (
                <TodoItem
                  key={todo.id}
                  style={{ backgroundColor: `#${todo.colorCode}` }}
                >
                  {todo.title}
                </TodoItem>
              ))}
              {/* 일정이 3개 이상인 경우, "n개 더 보기"를 표시합니다. */}
              {todosInThisHour.length > 2 && (
                <MoreTodos>{todosInThisHour.length - 2}개 더 보기</MoreTodos>
              )}
            </Todos>
          </HourBlock>
        );
      })}
    </Main>
  );
};

export default TimeTodo;
const Main = styled.main`
  width: 100%;
`;

const HourBlock = styled.div`
  border: 1px solid #EDEDED;
  border-style: none solid;
  margin: -1px 0 0 -1px;
`;

const Hour = styled.section<{ showHours: boolean }>`
  height: 3.125rem;
  position: relative;
  color: ${({ showHours }) => (showHours ? 'black' : 'transparent')};
  &::before {
    content: attr(
      data-text
    ); // 가상 요소의 내용을 data-text 속성의 값으로 설정합니다.
    position: absolute;
    top: 50%;
    left: -2rem;
    transform: translateY(-50%);
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    border-top: 1px solid #A3A3A3;
  }
`;

const CurrentHour = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 50%;
  background-color: #d68b8b;
  height: 2px;
`;

const Todos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding: 0.625rem 0;
  width: 100%;
  height: 10rem;
  gap: 0.625rem;
`;

const TodoItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 80%;
  height: 2.5rem;

  padding-left: 1.25rem;

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  color: #191919;
  list-style: none;

  border-radius: 0.25rem;
`;

const MoreTodos = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 80%;
  height: 2.5rem;

  padding-left: 1.25rem;

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  color: #191919;
  background-color: #fafafa;
  list-style: none;

  border-radius: 0.25rem;
`;
