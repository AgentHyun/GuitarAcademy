// Gp5Page.tsx
import  { useEffect, useState } from 'react';
import { GP5Uploader } from '../components/GP5Uploader';
import GP5Browser from '../components/GP5Browser';
import Header from './Header';
import { supabase } from '../components/superbase';
import { Toaster } from 'react-hot-toast';

interface Gp5File {
  id: number;
  title: string;
  path: string;
}

const Gp5Page = () => {
  const [allFiles, setAllFiles] = useState<Gp5File[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<Gp5File[]>([]);
  const [selectedInitial, setSelectedInitial] = useState<string>('전체');

  const koreanInitials = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
  const englishInitials = [...'abcdefghijklmnopqrstuvwxyz'];

  useEffect(() => {
    const fetchFiles = async () => {
      const { data, error } = await supabase.from('gp5_files').select('*');
      if (error) {
        console.error('악보 목록 불러오기 실패:', error);
      } else {
        setAllFiles(data);
        setFilteredFiles(data);
      }
    };
    fetchFiles();
  }, []);

  const filterByInitial = (initial: string) => {
    setSelectedInitial(initial);

    if (initial === '전체') {
      setFilteredFiles(allFiles);
      return;
    }

    const initialRanges: Record<string, [number, number]> = {
      'ㄱ': [44032, 45207], 'ㄴ': [45208, 45795], 'ㄷ': [45796, 46971],
      'ㄹ': [46972, 47559], 'ㅁ': [47560, 48147], 'ㅂ': [48148, 49323],
      'ㅅ': [49324, 50499], 'ㅇ': [50500, 51087], 'ㅈ': [51088, 52263],
      'ㅊ': [52264, 52851], 'ㅋ': [52852, 53439], 'ㅌ': [53440, 54027],
      'ㅍ': [54028, 54615], 'ㅎ': [54616, 55203]
    };

    let filtered: Gp5File[] = [];
    if (initialRanges[initial]) {
      const [start, end] = initialRanges[initial];
      filtered = allFiles.filter(file => {
        const code = file.title.charCodeAt(0);
        return code >= start && code <= end;
      });
    } else {
      filtered = allFiles.filter(file => file.title[0]?.toLowerCase() === initial);
    }
    setFilteredFiles(filtered);
  };

  return (
    <div>
      <Header scrollToSection={() => {}} />

<Toaster position="top-center" />
      <GP5Uploader />
      <GP5Browser />

      <div style={{ minHeight: '50vh', backgroundColor: '#FFFDE7', padding: '40px', fontFamily: 'BMJUA', textAlign: 'center' }}>
        <h2 className="list-title">📚 악보 목록</h2>

        {/* 초성 필터 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
          <button
            onClick={() => filterByInitial('전체')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: selectedInitial === '전체' ? '#102B5C' : '#eeeeee',
              color: selectedInitial === '전체' ? 'white' : 'black'
            }}
          >전체</button>

          {koreanInitials.map(ch => (
            <button
              key={ch}
              onClick={() => filterByInitial(ch)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: selectedInitial === ch ? '#102B5C' : '#eeeeee',
                color: selectedInitial === ch ? 'white' : 'black'
              }}
            >{ch}</button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          {englishInitials.map(ch => (
            <button
              key={ch}
              onClick={() => filterByInitial(ch)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: selectedInitial === ch ? '#102B5C' : '#eeeeee',
                color: selectedInitial === ch ? 'white' : 'black'
              }}
            >{ch}</button>
          ))}
        </div>

        <ul style={{
          listStyle: 'none',
          padding: '0',
          maxWidth: '500px',
          margin: '0 auto',
          textAlign: 'center',
          marginTop : '50px',
          
        }}>
          {filteredFiles.length === 0 ? (
            <li>해당 초성으로 시작하는 악보가 없습니다.</li>
          ) : (
            filteredFiles.map((file) => (
              <li key={file.id} style={{ marginBottom: '10px', fontSize: '16px' }}>
                🎵 {file.title} &nbsp;
                <a
                  href={`https://vhfsymqnbjmdbjsyycdk.supabase.co/storage/v1/object/public/gp5-files/${file.path}`}
                  download
                  style={{ color: '#3060b3', textDecoration: 'underline' }}
                >
                  다운로드
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Gp5Page;