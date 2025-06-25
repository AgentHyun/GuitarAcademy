import React, { useState, useEffect } from 'react';
import { supabase } from './superbase';

interface Gp5File {
  id: number;
  title: string;
  path: string;
}

const GP5Browser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Gp5File[]>([]);
  const [allFiles, setAllFiles] = useState<Gp5File[]>([]);

  // 전체 데이터를 한번 받아와서 메모리에 저장
  useEffect(() => {
    const fetchFiles = async () => {
      const { data, error } = await supabase.from('gp5_files').select('*');
      if (error) {
        alert('파일 목록을 불러오지 못했습니다.');
        console.error(error);
      } else {
        setAllFiles(data);
      }
    };
    fetchFiles();
  }, []);

  // 입력값에 따라 필터링
  useEffect(() => {
    const filtered = allFiles.filter((file) =>
      file.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filtered);
  }, [searchTerm, allFiles]);

  const handleSelectTitle = (title: string) => {
    setSearchTerm(title);
    // 선택 후 검색 결과 1개만 남도록
    setResults(allFiles.filter((f) => f.title === title));
  };

  return (
    <div style={{ padding: '60px', fontFamily: 'BMJUA', textAlign: 'center' }}>
      <h2 className="title">🔍 악보 다운로드</h2>
      <input
        type="text"
        placeholder="악보 제목 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '16px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          width: '250px',
          marginRight: '10px'
        }}
      />
      <ul style={{ 
        listStyle: 'none', 
        padding: '10px', 
        margin: '10px auto', 
        width: '280px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '8px', 
        maxHeight: '150px', 
        overflowY: 'auto',
        textAlign: 'left'
      }}>
        {searchTerm &&
          results.map((file) => (
            <li
              key={file.id}
              style={{ padding: '5px 10px', cursor: 'pointer' }}
              onClick={() => handleSelectTitle(file.title)}
            >
              🎵 {file.title}
            </li>
          ))}
      </ul>

      <ul style={{ marginTop: '30px', listStyle: 'none', padding: 0 }}>
        {results.length === 0 ? (
          <li>검색 결과가 없습니다.</li>
        ) : (
          results.map((file) => (
            <li key={file.id} style={{ marginBottom: '15px' }}>
              🎼 {file.title} &nbsp;
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
  );
};

export default GP5Browser;
