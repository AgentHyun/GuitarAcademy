import { useEffect, useState } from 'react';
import { supabase } from './superbase';
import type { Member } from './types';
import { toast } from 'react-hot-toast';
import dayjs from 'dayjs';
import Header from './Header';

interface Attendance {
  id: number;
  member_id: number;
  date: string;
}

const AttendancePage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);
  const today = dayjs().format('YYYY-MM-DD');
  const todayWeekday = dayjs().day();

  useEffect(() => {
    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('weekday', todayWeekday);
      if (error) {
        toast.error('회원 목록을 불러오지 못했습니다');
        return;
      }
      setMembers(data || []);
    };
    fetchMembers();
  }, [todayWeekday]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const { data, error } = await supabase
        .from('attendances')
        .select('*')
        .eq('date', today);
      if (error) {
        console.error(error);
        toast.error('출석 데이터를 불러오지 못했습니다');
        return;
      }
      setAttendances(data || []);
    };
    fetchAttendance();
  }, [today]);

  const handleCheckAttendance = async (memberId: number) => {
    setLoading(true);
    const alreadyAttended = attendances.find((a) => a.member_id === memberId);

    if (alreadyAttended) {
      const { error } = await supabase
        .from('attendances')
        .delete()
        .eq('id', alreadyAttended.id);

      if (!error) {
        toast.success('출석이 취소되었습니다 🎵');
        setAttendances((prev) => prev.filter((a) => a.member_id !== memberId));
      }
    } else {
      const { data, error } = await supabase
        .from('attendances')
        .insert([{ member_id: memberId, date: today }])
        .select()
        .single();

      if (!error && data) {
        toast.success('출석이 등록되었습니다 🎵');
        setAttendances((prev) => [...prev, data]);
      }
    }
    setLoading(false);
  };

  return (
    <>
     <Header scrollToSection={() => {}} />
    <div
      style={{
        padding: '40px',
        fontFamily: '"BMJUA", sans-serif',
        backgroundColor: '#fdf6f0',
        minHeight: '100vh',
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'column',
      }}
    >
      <h1
        style={{
          fontSize: '2.2rem',
          marginBottom: '30px',
          color: '#a0522d',
          borderBottom: '3px solid #a0522d',
          display: 'inline-block',
          paddingBottom: '8px',
        }}
      >
        🎵 출석부 - {today} (
        {['일', '월', '화', '수', '목', '금', '토'][todayWeekday]})
      </h1>

      {members.length === 0 && (
        <div style={{ marginBottom: '20px', color: '#555' }}>
          오늘 등록된 회원이 없습니다.
        </div>
      )}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {members.map((m) => {
          const isPresent = attendances.some((a) => a.member_id === m.id);
          return (
            <li
              key={m.id}
              style={{
                marginBottom: '16px',
                padding: '16px',
                border: '2px solid #deb887',
                borderRadius: '12px',
                backgroundColor: isPresent ? '#ffe4b5' : '#fafafa',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '450px',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.3s',
              }}
            >
              <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                🎼 {m.name} ({m.gender})
              </span>
              <button
                disabled={loading}
                onClick={() => handleCheckAttendance(m.id)}
                style={{
                  backgroundColor: isPresent ? '#cd5c5c' : '#8fbc8f',
                  color: 'white',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {isPresent ? '출석취소' : '출석'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
    </>
  );
};

export default AttendancePage;
