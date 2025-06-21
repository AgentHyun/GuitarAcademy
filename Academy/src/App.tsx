import React, { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import html2canvas from 'html2canvas';

interface Member {
  name: string;
  gender: '남' | '여';
  time: string;
  weekday: number; // 0 (Sunday) to 6 (Saturday)
}

const videoList = [
  '/바이크 라이딩.mp4',
  '/서해안 오토바이 여행.mp4',
  '/콜로라도.mp4',
  '/로키산맥.mp4',
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', gender: '남', time: '09:00' });

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('members');
    if (saved) {
      setMembers(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('members', JSON.stringify(members));
  }, [members]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;

    const newMember: Member = {
      name: form.name,
      gender: form.gender as '남' | '여',
      time: form.time,
      weekday: selectedDate.getDay(),
    };

    setMembers([...members, newMember]);
    setForm({ name: '', gender: '남', time: '09:00' });
  };

  const handleDelete = (indexToDelete: number, weekday: number) => {
    const filtered = members.filter((m, i) => !(i === indexToDelete && m.weekday === weekday));
    setMembers(filtered);
  };

  const handleCaptureCalendar = async () => {
  if (!calendarRef.current) return;

  const originalTransform = calendarRef.current.style.transform;
  calendarRef.current.style.transform = 'none';

  const canvas = await html2canvas(calendarRef.current, {
    backgroundColor: '#ffffff', // 흰 배경
    scale: 2 // 고해상도 이미지
  });

  calendarRef.current.style.transform = originalTransform;

  canvas.toBlob((blob) => {
    if (!blob) return;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'calendar.png';
    link.click();
  });
};


  return (
    <div className="App" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      maxWidth: '100%',
    }}>

      <div className="header">
        <img src="./이충실용음악학원.png" alt="로고" style={{ width: '20%', marginLeft: '-30px' }} />
        <nav className="nav" style={{ marginBottom: '20px' }}>
          <button className='header-menu'>HOME</button>
          <button className='header-menu'>SHORTS</button>
          <button className='header-menu'>SCHEDULE</button>
        </nav>
      </div>

      <div style={{
        position: 'fixed', bottom: '20px', right: '20px',
        display: 'flex', alignItems: 'center', gap: '15px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '10px',
        borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 999
      }}>
        <img src="/사랑의 잡범.jpg" alt="사랑의 잡범" style={{ height: '80px', borderRadius: '8px' }} />
        <audio controls>
          <source src="/사랑의-잡범.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      <div className='shorts-section' style={{ maxWidth: '700px', marginBottom: '40px' }}>
        <h1 className='title'>잡범 Shorts<span role="img" aria-label="motorcycle">🏍️</span></h1>
        <Slider {...sliderSettings}>
          {videoList.map((video, idx) => (
            <div key={idx}>
              <video
                autoPlay
                muted
                loop
                controls
                style={{ marginLeft : '100px',width: '70%',  borderRadius: '10px' }}>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </Slider>
      </div>

    <div className="calender" style={{ transform : 'scale(2)',background: '#f9f9f9' }}>
  <h1 style={{ fontFamily: 'BMJUA', color: '#102B5C' }}>스케줄</h1>

  {/* 여기만 캡처하고 싶음 */}
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
            <div
              key={idx}
              className={m.gender === '남' ? 'male' : 'female'}>
              {m.name}<br />{m.time}
            </div>
          ))}
        </div>
      );
    }}
  />
</div>


  {/* 버튼은 캡처 범위 밖에 위치 */}
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
    스케줄 Download
  </button>
</div>


      {isModalOpen && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="modal" style={{
            background: '#fff', padding: '30px', borderRadius: '12px',
            width: '400px', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)'
          }}>
            <form onSubmit={handleSubmit} className="modal-form" style={{
              display: 'flex', flexDirection: 'column', gap: '20px'
            }}>
              <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>회원 등록</h2>
              <input
                type="text"
                placeholder="이름"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                style={{ padding: '15px', fontSize: '16px' }}
              />
              <div className="gender-select" style={{ display: 'flex', justifyContent: 'space-around' }}>
                <label style={{ fontSize: '16px' }}>
                  <input type="radio" value="남" checked={form.gender === '남'} onChange={() => setForm({ ...form, gender: '남' })} /> 남
                </label>
                <label style={{ fontSize: '16px' }}>
                  <input type="radio" value="여" checked={form.gender === '여'} onChange={() => setForm({ ...form, gender: '여' })} /> 여
                </label>
              </div>
              <select
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
                style={{ padding: '10px', fontSize: '16px' }}
              >
                {[...Array(12)].map((_, i) => {
                  const hour = i + 9;
                  return <option key={hour}>{hour.toString().padStart(2, '0')}:00</option>;
                })}
              </select>
              <button type="submit" className="submit-btn">등록</button>
              <button type="button" onClick={() => setIsModalOpen(false)} className="submit-btn" style={{ backgroundColor: '#ccc', color: '#000' }}>닫기</button>
              <div className="modal-members">
                <h3 style={{ fontSize: '18px', marginTop: '10px' }}>등록된 회원</h3>
                {selectedDate &&
                  members
                    .map((m, idx) => ({ ...m, idx }))
                    .filter((m) => m.weekday === selectedDate.getDay())
                    .map((m) => (
                      <div key={m.idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
                        <span style={{ fontSize: '15px' }}>{m.name} ({m.gender}) {m.time}</span>
                        <button onClick={() => handleDelete(m.idx, m.weekday)} style={{ fontSize: '0.75rem' }}>삭제</button>
                      </div>
                    ))}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
