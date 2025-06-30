# Music Academy Web App 🎸

음악 학원 운영을 위한 통합 웹 애플리케이션입니다.  
주요 기능으로는 회원 스케줄 관리, 위치 안내, 사진 업로드, 숏폼 영상 재생, 달력 캡처를 제공합니다.

---

## 🚀 주요 기술 스택

- **React (TypeScript)**
- **Supabase** (데이터베이스)
- **SweetAlert2 + react-hot-toast** (알림 및 권한 인증)
- **html2canvas** (달력 이미지 캡처)
- **Kakao Maps API** (학원 위치 지도)
- **Vercel** (배포)

---











---

## 💡 기능 소개

✅ **회원 관리 (스케줄 등록/삭제)**  
- 요일별 회원 관리 가능  
- 관리자 전용으로 접근 권한 부여

✅ **달력 이미지 캡처**  
- 현재 등록된 회원 스케줄을 png 이미지로 다운로드

  ![image](https://github.com/user-attachments/assets/8cc1c286-c4b8-4ada-a0d8-1c5ccfad2796)


✅ **사진 게시판**  
- `ImageBoardUploader`로 자유롭게 사진 업로드

![image](https://github.com/user-attachments/assets/2bbaee03-5517-4776-b7b0-ae504c49e4a1)


✅ **쇼츠(Shorts) 영상 재생**  
- mp4 영상 목록을 슬라이더로 탐색 가능

![image](https://github.com/user-attachments/assets/7a6d1e16-08b0-4764-8e64-063835e76f37)


✅ **위치 안내**  
- Kakao 지도 API를 활용한 학원 위치 표시  
- 학원 위치에 대한 오디오 안내 포함

 ![image](https://github.com/user-attachments/assets/6cab5662-e8ab-4286-a059-4b9af9aa72fe)

✅ **섹션 스크롤 이동**  
- Header 메뉴 클릭 시 해당 섹션으로 부드럽게 이동

![image](https://github.com/user-attachments/assets/d35e4e4b-ce24-40ad-843d-0ae5e62610bf)
---

✅ **코드 운지법 갤러리**
- Hover시 운지법 표기
![image](https://github.com/user-attachments/assets/1394770e-5941-40ac-868f-0f3065539e5a)


✅ **악보 공유 페이지**
- 악보(gp5) 업로드 후 검색, 다운로드 기능

- 
![image](https://github.com/user-attachments/assets/86f3a868-fa0d-47aa-bec8-163af38385a1)

![image](https://github.com/user-attachments/assets/edcb5f15-309c-4f68-9983-2f8c975e1931)


## ⚙️ 설치 방법

```bash
git clone <레포지토리 주소>
cd <프로젝트 디렉토리>
npm install
npm run dev


