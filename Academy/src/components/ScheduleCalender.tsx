import Calendar from 'react-calendar';
import type { Member } from './types'; 
import 'react-calendar/dist/Calendar.css';

interface Props {
  members: Member[];
  handleDateClick: (date: Date) => void;
  handleCaptureCalendar: () => void;
  calendarRef: React.RefObject<HTMLDivElement>;
}

const ScheduleCalendar = ({ members, handleDateClick, handleCaptureCalendar, calendarRef }: Props) => (
  <div className="calender" style={{ transform: 'scale(2)', background: '#f9f9f9' }}>
    <h1 style={{ fontFamily: 'BMJUA', color: '#102B5C' }}>시간표</h1>
    <div ref={calendarRef} style={{
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '16px',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
      border: '1px solid #ddd',
      width: 'fit-content',
      margin: '0 auto'
    }}>
      <Calendar
        calendarType="gregory"
        locale="ko-KR"
        onClickDay={handleDateClick}
        tileContent={({ date }) => {
          const weekday = date.getDay();
          const dayMembers = members.filter((m) => m.weekday === weekday);
          return (
            <div className="tile-members" style={{
              fontSize: '0.75rem',
              marginTop: '4px',
              textAlign: 'center',
              wordBreak: 'break-word'
            }}>
              {dayMembers.map((m, idx) => (
                <div key={idx} className={m.gender === '남' ? 'male' : 'female'}>
                  {m.name}<br />{m.time}
                </div>
              ))}
            </div>
          );
        }}
      />
    </div>
    <button onClick={handleCaptureCalendar} style={{
      marginTop: '20px',
      padding: '10px 20px',
      fontSize: '1rem',
      backgroundColor: '#102B5C',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer'
    }}>
      Download
    </button>
  </div>
);

export default ScheduleCalendar;
