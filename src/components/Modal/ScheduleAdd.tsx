import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const ScheduleAdd = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const saveSchedule = async () => {
        if (!title || !startDate || !endDate) {
            alert('모든 정보를 입력해주세요.');
            return;
        }

        const scheduleData = {
            title,
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            // 추가 정보 입력
        };

        try {
            const response = await axios.post('https://calendars2.duckdns.org/schedules', scheduleData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            console.log(response.data);
            alert('일정이 추가되었습니다.');
            onClose(); // 일정 추가 후 창 닫기
        } catch (error) {
            console.error('일정 추가 실패:', error);
            alert('일정 추가에 실패하였습니다.');
        }
    };

    return (
        <Container>
            <Input
                type="text"
                placeholder="일정명을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <DatePickerContainer>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="yyyy-MM-dd"
                />
            </DatePickerContainer>
            <Button onClick={saveSchedule}>저장</Button>
            <Button onClick={onClose}>닫기</Button>
        </Container>
    );
};

export default ScheduleAdd;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 10px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const DatePickerContainer = styled.div`
    display: flex;
    gap: 10px;
    .react-datepicker-wrapper {
        flex-grow: 1;
    }
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;
