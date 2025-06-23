import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [initialCoords, setInitialCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedAddress, setSelectedAddress] = useState('경기 평택시 서정로 288-1');

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src =
        'https://dapi.kakao.com/v2/maps/sdk.js?appkey=cd47bdb9b2de67b3978333f7f6b84fb5&autoload=false&libraries=services';
      script.async = true;
      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(loadMap);
        } else {
          console.error('kakao.maps 객체가 로드되지 않았습니다.');
        }
      };
      script.onerror = () => {
        console.error('카카오 SDK 로드 실패');
      };
      document.head.appendChild(script);
    };

    const existingScript = document.querySelector('script[src*="kakao.com/v2/maps/sdk.js"]');
    if (existingScript) {
      const checkKakaoLoaded = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          clearInterval(checkKakaoLoaded);
          window.kakao.maps.load(loadMap);
        }
      }, 100);
      return;
    }

    loadScript();
  }, []);

  const loadMap = () => {
    if (!window.kakao || !mapRef.current) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    const defaultAddress = '경기 평택시 서정로 288-1';
    const placeName = '이충 실용음악학원';

    geocoder.addressSearch(defaultAddress, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        const createdMap = new window.kakao.maps.Map(mapRef.current, {
          center: coords,
          level: 3,
        });

        setMap(createdMap);
        setCurrentCoords({ lat: result[0].y, lng: result[0].x });
        setInitialCoords({ lat: result[0].y, lng: result[0].x });
        setSelectedAddress(result[0].address_name);

        const createdMarker = new window.kakao.maps.Marker({
          map: createdMap,
          position: coords,
        });
        setMarker(createdMarker);

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px 10px;font-size:13px;">${placeName}</div>`,
        });
        infowindow.open(createdMap, createdMarker);
      }
    });
  };

  const handleSearch = () => {
    if (!searchQuery.trim() || !window.kakao || !mapRef.current) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(searchQuery, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        setCurrentCoords({ lat: result[0].y, lng: result[0].x });
        setSelectedAddress(result[0].address_name);

        map.setCenter(coords);

        if (marker) {
          marker.setMap(null);
        }

        const newMarker = new window.kakao.maps.Marker({
          map,
          position: coords,
        });
        setMarker(newMarker);

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px 10px;font-size:13px;">검색 위치</div>`,
        });
        infowindow.open(map, newMarker);
      } else {
        alert('주소를 찾을 수 없습니다.');
      }
    });
  };

  const resetToInitialLocation = () => {
    if (!initialCoords || !map) return;

    const coords = new window.kakao.maps.LatLng(initialCoords.lat, initialCoords.lng);
    map.setCenter(coords);

    if (marker) {
      marker.setMap(null);
    }

    const resetMarker = new window.kakao.maps.Marker({
      map,
      position: coords,
    });
    setMarker(resetMarker);

    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div style="padding:5px 10px;font-size:13px;">이충 실용음악학원</div>`,
    });
    infowindow.open(map, resetMarker);

    setCurrentCoords(initialCoords);
    setSelectedAddress('경기 평택시 서정로 288-1');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="주소를 입력하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '60%',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginRight: '10px',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#102B5C',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          검색
        </button>
      </div>

      <div
        ref={mapRef}
        style={{
          width: '90vw',
          maxWidth: '800px',
          height: '400px',
          margin: '0 auto',
          backgroundColor: '#eee',
          borderRadius: '12px',
        }}
      ></div>

      {/* 주소 출력 */}
      {selectedAddress && (
        <div style={{
          marginTop: '12px',
          fontSize: '15px',
          color: '#333',
          fontWeight: '500'
        }}>
          {selectedAddress}
        </div>
      )}

      {/* 버튼들 */}
      {currentCoords && (
        <div style={{ marginTop: '15px' }}>
          <a
            href={`https://map.kakao.com/link/to/도착지,${currentCoords.lat},${currentCoords.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 20px',
              backgroundColor: '#102B5C',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              marginRight: '10px',
            }}
          >
            📍 길찾기
          </a>

          {initialCoords && (initialCoords.lat !== currentCoords.lat || initialCoords.lng !== currentCoords.lng) && (
            <button
              onClick={resetToInitialLocation}
              style={{
                padding: '13px 20px',
                backgroundColor: '#ccc',
                borderRadius: '8px',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                marginTop: '-1px',
              }}
            >
              ⬅ 돌아가기
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default KakaoMap;
