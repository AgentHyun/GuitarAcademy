import  { useState } from 'react';
import { supabase } from '../components/superbase';
import { toast } from 'react-hot-toast';

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
      toast.error('파일 업로드에 실패했습니다 😢');
      return;
    }

    const { error: insertError } = await supabase.from('gp5_files').insert([
      { title, path: fileName },
    ]);

    if (insertError) {
      toast.error('DB 저장에 실패했습니다 😢');
      return;
    }

    toast.success('업로드가 완료되었습니다! 🎉');
    setTitle('');
    setFile(null);
  };

  return (
    <div
      style={{
      
        width: "100%",
        backgroundColor: "#fefaf4", // 밝은 베이지
        padding: "60px",
        fontFamily: "BMJUA",
        textAlign: "center",
        height: "60vh", // 꽉차게
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        
      }}
    >
      <h2
        style={{
          fontSize: "40pt",
          color: "#4b3832", // 기타톤과 어울리는 짙은 갈색
          marginBottom: "30px"
        }}
      >
        🎸 악보 업로드
      </h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="악보 제목"
        style={{
          padding: '12px',
          fontSize: '16px',
          margin: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          width: '250px',
          boxShadow: '2px 2px 6px rgba(0,0,0,0.1)'
        }}
      />
      <input
        type="file"
        accept=".gp5"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        style={{
          margin: '10px',
          fontSize: '16px'
        }}
      />
      <button
        onClick={handleUpload}
        style={{
          marginTop: '20px',
          backgroundColor: '#4b3832',
          color: '#fff',
          padding: '12px 24px',
          fontSize: '16px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
        }}
      >
        업로드
      </button>
    </div>
  );
};
