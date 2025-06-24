import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import LocationSection from './components/LocationSection';
import AudioBar from './components/AudioBar';
import ShortsSlider from './components/ShortsSlider';
import WeekSchedule from './components/ScheduleCalender';
import MemberModal from './components/MemberModal';
import type { Member } from './components/types';
import html2canvas from 'html2canvas';
import './App.css';

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWeekday, setSelectedWeekday] = useState<number | null>(null); // 요일 인덱스
  const [form, setForm] = useState({
    name: '',
    gender: '남' as '남' | '여',
    time: '09:00',
  });
  const calendarRef = useRef<HTMLDivElement>(null);

  const videoList = [
    '/바이크 라이딩.mp4',
    '/서해안 오토바이 여행.mp4',
    '/콜로라도.mp4',
    '/로키산맥.mp4',
  ];

  // 로컬스토리지 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('members');
    if (saved) {
      setMembers(JSON.parse(saved));
    }
  }, []);

  // 로컬스토리지 저장
  useEffect(() => {
    localStorage.setItem('members', JSON.stringify(members));
  }, [members]);

  // 요일 클릭 시 모달 열기
  const handleDateClick = (weekday: number) => {
    setSelectedWeekday(weekday);
    setIsModalOpen(true);
  };

  // 등록
 const handleRegister = (e: React.FormEvent) => {
  e.preventDefault(); // ✅ 새로고침 방지
  if (form.name.trim() === '' || selectedWeekday === null) return;

  const newMember: Member = {
    name: form.name,
    gender: form.gender,
    time: form.time,
    weekday: selectedWeekday,
  };

  setMembers([...members, newMember]);
  setForm({ name: '', gender: '남', time: '09:00' });
};


  // 삭제
  const handleDelete = (indexInFiltered: number) => {
    if (selectedWeekday === null) return;

    const filteredMembers = members.filter((m) => m.weekday === selectedWeekday);
    const target = filteredMembers[indexInFiltered];

    const updated = members.filter((m) => m !== target);
    setMembers(updated);
  };

  // 캘린더 저장
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
/>

      )}
    </div>
  );
}

export default App;
