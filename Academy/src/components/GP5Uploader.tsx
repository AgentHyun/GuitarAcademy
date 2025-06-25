import React, { useState } from 'react';
import { supabase } from '../components/superbase';

export const GP5Uploader = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file || !title) return;

    const asciiFileName = file.name.replace(/[^\w.\-]/g, '_');
    const fileName = `${Date.now()}_${asciiFileName}`;

    const { error: uploadError } = await supabase.storage
      .from('gp5-files')
      .upload(fileName, file, {
        contentType: 'application/octet-stream',
      });

    if (uploadError) {
      alert('파일 업로드 실패');
      return;
    }

    const { error: insertError } = await supabase.from('gp5_files').insert([
      { title, path: fileName },
    ]);

    if (insertError) {
      alert('DB 저장 실패');
      return;
    }

    alert('업로드가 완료되었습니다!');
    setTitle('');
    setFile(null);
  };

  return (
    <div style={{ marginLeft : '-30px', width : '100%', backgroundColor : '#eff3ee', marginTop: '-348px',padding: '60px', fontFamily: 'BMJUA', textAlign: 'center' }}>
      <h2 className="title">🎸 악보 업로드</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="악보 제목"
        style={{
          padding: '10px',
          fontSize: '16px',
          margin: '10px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          width: '250px'
        }}
      />
      <br />
      <input
        type="file"
        accept=".gp5"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        style={{ margin: '10px' }}
      />
      <br />
      <button
        onClick={handleUpload}
        className="submit-btn"
        style={{ marginTop: '20px' }}
      >
        업로드
      </button>
    </div>
  );
};
