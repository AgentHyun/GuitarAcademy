import type { Member } from './types';

interface Props {
  members: Member[];
  handleDateClick: (weekday: number) => void;
  handleCaptureCalendar: () => void;
  calendarRef: React.RefObject<HTMLDivElement>;
}

const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

const WeekSchedule = ({ members, handleDateClick, handleCaptureCalendar, calendarRef }: Props) => {
  return (
    <div className="week-calendar" style={{
      background: '#e6f4f1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      padding: '120px',
      fontFamily: 'BMJUA',
    }}>
      <h1 style={{ fontFamily: 'BMJUA', color: '#102B5C', fontSize: '40pt' }}>시간표</h1>

      <div
        ref={calendarRef}
        style={{
          display: 'flex',
          gap: '24px',
          padding: '48px',
          backgroundColor: '#fff',
          borderRadius: '20px',
          boxShadow: '0 0 20px rgba(0,0,0,0.15)',
          border: '1px solid #ddd',
          width: 'fit-content',
        }}
      >
        {weekdays.map((label, weekdayIndex) => {
          const dayMembers = members
            .filter((m) => m.weekday === weekdayIndex)
            .sort((a, b) => a.time.localeCompare(b.time));

          const groupedByTime = dayMembers.reduce((acc: Record<string, Member[]>, cur) => {
            acc[cur.time] = acc[cur.time] ? [...acc[cur.time], cur] : [cur];
            return acc;
          }, {});

          return (
            <div
              key={label}
              onClick={() => handleDateClick(weekdayIndex)}
              style={{
                width: '200px',
                minHeight: '280px',
                padding: '16px',
                backgroundColor: '#c9e4de',
                borderRadius: '10px',
                boxSizing: 'border-box',
                cursor: 'pointer',
              }}
            >
              <h3 style={{
                textAlign: 'center',
                fontSize: '1.5rem',
                marginBottom: '16px',
                fontWeight: 'bold',
                color: '#102B5C',
              }}>{label}</h3>

              <div style={{ fontSize: '1rem', lineHeight: '1.8' }}>
                {Object.entries(groupedByTime).map(([time, membersAtTime], idx) => (
                  <div key={idx} style={{ marginBottom: '12px' }}>
                    <div style={{
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      marginBottom: '6px',
                      borderTop: idx > 0 ? '1px solid #bbb' : undefined,
                      paddingTop: idx > 0 ? '8px' : '0',
                      color: '#102B5C',
                    }}>
                      🕘 {time}
                    </div>
                    {membersAtTime.map((m, i) => (
                      <div
                        key={i}
                        style={{
                          color: m.gender === '남' ? '#3a6ea5' : '#c85a7c',
                          fontWeight: 700,
                          paddingLeft: '12px',
                          fontSize: '1rem',
                        }}
                      >
                        - {m.name}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleCaptureCalendar}
        style={{
          marginTop: '36px',
          padding: '14px 28px',
          fontSize: '1.1rem',
          backgroundColor: '#102B5C',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Download
      </button>
    </div>
  );
};

export default WeekSchedule;
