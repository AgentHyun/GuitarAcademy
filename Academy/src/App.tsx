import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import LocationSection from './components/LocationSection';
import AudioBar from './components/AudioBar';
import ShortsSlider from './components/ShortsSlider';
import WeekSchedule from './components/ScheduleCalender';
import MemberModal from './components/MemberModal';
import Footer from './components/Footer';
import type { Member } from './components/types';
 
import html2canvas from 'html2canvas';
import './App.css';

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWeekday, setSelectedWeekday] = useState<number | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [form, setForm] = useState({
    name: '',
    gender: '남' as '남' | '여',
    time: '09:00',
  });
  const calendarRef = useRef<HTMLDivElement>(null);

  const videoList = [
    '/동해안.mp4',
    '/바이크 라이딩.mp4',
    '/서해안 오토바이 여행.mp4',
    '/콜로라도.mp4',
    '/로키산맥.mp4',
    '/하와이.mp4',
    '/사랑의잡범.mp4'
  ];

  useEffect(() => {
    const saved = localStorage.getItem('members');
    if (saved) {
      try {
        setMembers(JSON.parse(saved));
      } catch (e) {
        console.error('로컬 저장 데이터 파싱 실패', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('members', JSON.stringify(members));
  }, [members]);

  const handleDateClick = (weekday: number) => {
    if (!isAuthorized) {
      const password = prompt('선생님만 관리 가능해요😎');
      if (password !== '9445') {
        alert('비밀번호가 틀렸습니다.');
        return;
      }
      setIsAuthorized(true);
    }
    setSelectedWeekday(weekday);
    setIsModalOpen(true);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim() === '' || selectedWeekday === null) return;

    const newMember: Member = {
      name: form.name,
      gender: form.gender,
      time: form.time,
      weekday: selectedWeekday,
    };

    setMembers((prev) => [...prev, newMember]);
    setForm({ name: '', gender: '남', time: '09:00' });
    setIsModalOpen(false);
  };

  const handleDelete = (memberIndexToDelete: number) => {
    const updatedMembers = members.filter((_, idx) => idx !== memberIndexToDelete);
    setMembers(updatedMembers);
  };

  const handleCaptureCalendar = async () => {
    if (!calendarRef.current) return;
    const originalTransform = calendarRef.current.style.transform;
    calendarRef.current.style.transform = 'none';
    const canvas = await html2canvas(calendarRef.current, {
      backgroundColor: '#ffffff',
      scale: 2,
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
    <div className="App">
      <Header />
      <div className='banner'>
      <img width = '1000px' height = '900px' src = '/배너.png'/>
      </div>
      <LocationSection />
      <AudioBar />
      <ShortsSlider videoList={videoList} />
      <WeekSchedule
        members={members}
        handleDateClick={handleDateClick}
        handleCaptureCalendar={handleCaptureCalendar}
        calendarRef={calendarRef}
      />
      {isModalOpen && selectedWeekday !== null && (
        <MemberModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          form={form}
          setForm={setForm}
          handleSubmit={handleRegister}
          members={members}
          selectedWeekday={selectedWeekday}
          handleDelete={handleDelete}
          isAuthorized={isAuthorized}
        />
        
      )}

      <Footer/>
    </div>
  );
}

export default App;