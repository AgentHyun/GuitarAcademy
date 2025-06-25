

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import '../App.css';

// Cloudinary 설정
const CLOUD_NAME = 'dn1uol28c';
const UPLOAD_PRESET = 'unsigned_upload';

// Supabase 설정
const SUPABASE_URL = 'https://vhfsymqnbjmdbjsyycdk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoZnN5bXFuYmptZGJqc3l5Y2RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NTQyMTksImV4cCI6MjA2NjMzMDIxOX0.RhoakjOAU_TDV3ReoZOxOpxhF1H0bh-ytUC2-iPvNQ8';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface UploadedImage {
  id: number;
  url: string;
  title: string;
}

const ImageBoardUploader = () => {
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.from('images').select('*').order('id', { ascending: false });
      if (data) setImages(data as UploadedImage[]);
    };
    fetchImages();
  }, []);

  const handleUpload = async () => {
    if (!imageFile || !title) return;

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', UPLOAD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    const newImage = {
      title,
      url: data.secure_url,
    };

    const { data: inserted, error } = await supabase.from('images').insert([newImage]).select();

    if (inserted) {
      setImages((prev) => [inserted[0], ...prev]);
    }

    setTitle('');
    setImageFile(null);
    setIsModalOpen(false);
  };

  return (
    <div className="location-section-banner">
      <div style={{ marginLeft : '650px',width: '90%', maxWidth: '1000px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2 className="title">사진 게시판</h2>
       <button
  onClick={() => setIsModalOpen(true)}
  style={{
    fontFamily: 'BMJUA',
    fontSize: '18px',
    padding: '10px 20px',
    border: '2px solid #102B5C',
    backgroundColor: 'white',
    color: '#102B5C',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginLeft: '500px',
    marginRight: '0',
    
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.backgroundColor = '#102B5C';
    e.currentTarget.style.color = 'white';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.backgroundColor = 'white';
    e.currentTarget.style.color = '#102B5C';
  }}
>
  📷 사진 업로드
</button>

      </div>

      {isModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div className="modal">
            <h3 style={{ fontFamily: 'BMJUA', fontSize: '20px', color: '#102B5C', textAlign: 'center' }}>이미지 업로드</h3>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
            <button className="submit-btn" onClick={handleUpload}>업로드</button>
            <button className="submit-btn" style={{ backgroundColor: '#ccc', color: '#000' }} onClick={() => setIsModalOpen(false)}>닫기</button>
          </div>
        </div>
      )}

      {selectedImage && (
        <div
          className="modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001,
          }}
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage.url}
            alt={selectedImage.title}
            style={{ maxHeight: '90%', maxWidth: '90%', borderRadius: '10px' }}
          />
        </div>
      )}

      <div style={{
        marginTop: '40px',
        width: '90%',
        maxWidth: '1000px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        {images.map((img) => (
          <div
            key={img.id}
            onClick={() => setSelectedImage(img)}
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '10px',
              cursor: 'pointer',
              marginBottom : '200px'
            }}
          >
            <h3 style={{ fontFamily: 'BMJUA', fontSize: '16px', color: '#102B5C', marginBottom: '10px' }}>{img.title}</h3>
            <img src={img.url} alt={img.title} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px'  }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageBoardUploader;
