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

  // 전체 데이터 로드
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

  // 검색어 변경 시 필터링
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = allFiles.filter((file) =>
      file.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filtered);
  }, [searchTerm, allFiles]);

  const handleSelectTitle = (title: string) => {
    setSearchTerm(title);
    setResults(allFiles.filter((f) => f.title === title));
  };

  return (
    <div style={{ height : '35vh',padding: '60px', fontFamily: 'BMJUA', textAlign: 'center' }}>
      <h2 className="title">🔍 악보 검색</h2>
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

      {/* 자동완성 목록 - 입력값이 있을 때만 */}
      {searchTerm.trim() !== '' && results.length > 0 && (
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
          {results.map((file) => (
            <li
              key={file.id}
              style={{ padding: '5px 10px', cursor: 'pointer' }}
              onClick={() => handleSelectTitle(file.title)}
            >
              🎵 {file.title}
            </li>
          ))}
        </ul>
      )}

      {/* 다운로드 링크 - 검색어가 있고 결과 있을 때만 */}
      {searchTerm.trim() !== '' && (
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
      )}
    </div>
  );
};

export default GP5Browser;
