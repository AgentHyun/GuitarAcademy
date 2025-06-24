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
      background: '#f9f9f9',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width : '100%',
      padding : '200px'
    }}>
      <h1 style={{ fontFamily: 'BMJUA', color: '#102B5C', fontSize: '2rem' }}>시간표</h1>

      <div
        ref={calendarRef}
        style={{
          display: 'flex',
          gap: '16px',
          padding: '40px',
          backgroundColor: '#fff',
          borderRadius: '20px',
          boxShadow: '0 0 20px rgba(0,0,0,0.15)',
          border: '1px solid #ddd',
          width: 'fit-content'
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
                width: '160px',
                minHeight: '220px',
                padding: '12px',
                backgroundColor: '#e0ecff',
                borderRadius: '10px',
                boxSizing: 'border-box',
                cursor: 'pointer'
              }}
            >
              <h3 style={{
                textAlign: 'center',
                fontSize: '1.1rem',
                marginBottom: '12px',
                fontWeight: 'bold'
              }}>{label}</h3>

              <div style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                {Object.entries(groupedByTime).map(([time, membersAtTime], idx) => (
                  <div key={idx} style={{ marginBottom: '8px' }}>
                    <div style={{
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      marginBottom: '4px',
                      borderTop: idx > 0 ? '1px solid #ccc' : undefined,
                      paddingTop: idx > 0 ? '6px' : '0',
                    }}>
                      🕘 {time}
                    </div>
                    {membersAtTime.map((m, i) => (
                      <div
                        key={i}
                        style={{
                          color: m.gender === '남' ? 'blue' : 'deeppink',
                          fontWeight: 500,
                          paddingLeft: '10px',
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
          marginTop: '24px',
          padding: '12px 24px',
          fontSize: '1rem',
          backgroundColor: '#102B5C',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Download
      </button>
    </div>
  );
};

export default WeekSchedule;
