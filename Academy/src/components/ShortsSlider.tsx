import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ShortsSlider = ({ videoList }: { videoList: string[] }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className='shorts-section' style={{ maxWidth: '700px', marginBottom: '40px' }}>
      <h1 className='title'>쇼츠🏍️</h1>
      <Slider {...sliderSettings}>
        {videoList.map((video, idx) => (
          <div key={idx}>
            <video autoPlay muted loop controls style={{ marginLeft: '100px', width: '70%', borderRadius: '10px' }}>
              <source src={video} type="video/mp4" />
            </video>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ShortsSlider;
