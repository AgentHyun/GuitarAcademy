import type { Member } from './types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  form: { name: string; gender: '남' | '여'; time: string };
  setForm: (val: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
  members: Member[];
  selectedWeekday: number | null;
  handleDelete: (indexInFiltered: number) => void;
}

const MemberModal = ({
  isOpen,
  onClose,
  form,
  setForm,
  handleSubmit,
  members,
  selectedWeekday,
  handleDelete
}: Props) => {
  if (!isOpen || selectedWeekday === null) return null;

  const dayMembers = members
    .map((m, idx) => ({ ...m, originalIdx: idx }))
    .filter((m) => m.weekday === selectedWeekday);

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div className="modal" style={{
        background: '#fff', padding: '30px', borderRadius: '12px',
        width: '400px', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)'
      }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', textAlign: 'center',flexDirection: 'column', gap: '20px' }}>
          <h2>{['일', '월', '화', '수', '목', '금', '토'][selectedWeekday]}요일</h2>

          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            placeholder="이름"
          />

          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <label>
              <input
                type="radio"
                checked={form.gender === '남'}
                onChange={() => setForm({ ...form, gender: '남' })}
              /> 남
            </label>
            <label>
              <input
                type="radio"
                checked={form.gender === '여'}
                onChange={() => setForm({ ...form, gender: '여' })}
              /> 여
            </label>
          </div>

          <select
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          >
            {[...Array(12)].map((_, i) => {
              const hour = i + 9;
              return (
                <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                  {hour.toString().padStart(2, '0')}:00
                </option>
              );
            })}
          </select>

          <button type="submit" className='submit-btn'>등록</button>
          <button type="button" className='submit-btn' onClick={onClose} style={{ backgroundColor: '#ccc' }}>
            닫기
          </button>

          <div style={{ marginTop: '12px' }}>
            {dayMembers.map((m) => (
              <div key={m.originalIdx} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                <span>{m.name} ({m.gender}) {m.time}</span>
                <button onClick={() => handleDelete(m.originalIdx)}>삭제</button>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberModal;
