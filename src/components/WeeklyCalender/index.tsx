import styled from 'styled-components';
import WeeklyList from './WeeklyList';

const WeeklyCalender = () => {
  return (
    <Main>
      <WeeklyList />
      <h1>WeeklyCalender</h1>
    </Main>
  );
};

export default WeeklyCalender;

const Main = styled.main`
  width: 100%;
  height: 100%;
  background-color: beige;
`;
