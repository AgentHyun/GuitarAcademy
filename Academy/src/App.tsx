import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import LocationSection from './components/LocationSection';
import AudioBar from './components/AudioBar';
import ShortsSlider from './components/ShortsSlider';
import ScheduleCalendar from './components/ScheduleCalender';
import MemberModal from './components/MemberModal';
import type { Member } from './components/types';
import html2canvas from 'html2canvas';
import './App.css'

function App() {
  // 📦 상태 정의
  const [members, setMembers] = useState<Member[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    gender: '남' as '남' | '여',
    time: '09:00',
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const videoList = [
    '/바이크 라이딩.mp4',
    '/서해안 오토바이 여행.mp4',
    '/콜로라도.mp4',
    '/로키산맥.mp4',
  ];

  // 📂 로컬스토리지 저장/불러오기
  useEffect(() => {
    const saved = localStorage.getItem('members');
    if (saved) {
      setMembers(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('members', JSON.stringify(members));
  }, [members]);

  // 📅 날짜 클릭 시 모달 열기
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  // 📤 캘린더 저장 버튼
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

  // ✅ 회원 등록
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;

    const newMember: Member = {
      name: form.name,
      gender: form.gender,
      time: form.time,
      weekday: selectedDate.getDay(),
    };

    setMembers([...members, newMember]);
    setForm({ name: '', gender: '남', time: '09:00' });
  };

  // ❌ 회원 삭제
  const handleDelete = (indexToDelete: number, weekday: number) => {
    const filtered = members.filter((m, i) => !(i === indexToDelete && m.weekday === weekday));
    setMembers(filtered);
  };

  return (
    <div className="App">
      <Header />
      <LocationSection />
      <AudioBar />
      <ShortsSlider videoList={videoList} />
      <ScheduleCalendar
        members={members}
        handleDateClick={handleDateClick}
        handleCaptureCalendar={handleCaptureCalendar}
        calendarRef={calendarRef}
      />
      <MemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        members={members}
        selectedDate={selectedDate}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
