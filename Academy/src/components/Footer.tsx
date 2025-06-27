

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: 'transparent', // 밝은 회색 계열 배경
        color: '#333',              // 기본 텍스트 어두운 회색
        padding: '30px 60px',
        fontFamily: 'sans-serif',
        width: '100%',
        boxSizing: 'border-box',
        borderTop: '1px solid #ddd', // 상단 구분선
        
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          fontFamily : 'BMJUA'
        }}
      >
        {/* 학원 정보 */}
        <div style={{ minWidth: '250px', marginBottom: '16px' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>
            이충 실용음악학원
          </div>
         <div>🏠 경기도 평택시 서정로 288-1</div>
<div>☎️ 전화: 031-662-9442</div>

        </div>

        {/* 유튜브 링크 */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <img
            src="/유튜브.png"
            alt="YouTube"
            style={{ height: '40px', marginRight: '10px' }}
          />
          <a
            href="https://www.youtube.com/@사랑의잡범공식채널"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#DAA520',
              fontWeight: 'bold',
              textDecoration: 'none',
              fontSize: '1rem',
            }}
          >
            사랑의잡범 공식채널
          </a>
        </div>
      </div>

      {/* 하단 카피라이트 */}
      <div
        style={{
          marginTop: '24px',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: '#888',
        }}
      >
        ⓒ 2025 이충 실용음악학원. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
