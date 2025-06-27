import { useState, useEffect } from 'react';
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
    <div
      style={{
        height: '60vh',
        padding: '60px',
        fontFamily: 'BMJUA',
        textAlign: 'center',
       
        backgroundColor: '#FFF2EB', // 따뜻한 톤
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft : '50px'
      }}
    >
      <h2
        style={{
          fontSize: '40pt',
          color: '#4b3832',
          marginBottom: '30px'
         
        }}
      >
        🔍 악보 검색
      </h2>

      <input
        type="text"
        placeholder="악보 제목 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '12px',
          fontSize: '16px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          width: '280px',
          boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}
      />

      {/* 자동완성 */}
      {searchTerm.trim() !== '' && results.length > 0 && (
        <ul
          style={{
            listStyle: 'none',
            padding: '10px',
            margin: '10px auto',
            width: '300px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
            maxHeight: '200px',
            overflowY: 'auto',
            textAlign: 'left'
          }}
        >
          {results.map((file) => (
            <li
              key={file.id}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee'
              }}
              onClick={() => handleSelectTitle(file.title)}
            >
              🎵 {file.title}
            </li>
          ))}
        </ul>
      )}

      {/* 다운로드 */}
      {searchTerm.trim() !== '' && (
        <ul
          style={{
            marginTop: '30px',
            listStyle: 'none',
            padding: 0,
            color: '#4b3832'
          }}
        >
          {results.length === 0 ? (
            <li>검색 결과가 없습니다.</li>
          ) : (
            results.map((file) => (
              <li key={file.id} style={{ marginBottom: '15px' }}>
                🎼 {file.title}&nbsp;
                <a
                  href={`https://vhfsymqnbjmdbjsyycdk.supabase.co/storage/v1/object/public/gp5-files/${file.path}`}
                  download
                  style={{
                    color: '#3060b3',
                    textDecoration: 'underline',
                    fontWeight: 'bold'
                  }}
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
