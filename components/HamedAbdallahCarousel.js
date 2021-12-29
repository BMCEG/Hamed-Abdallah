import Styles from '../styles/components/carousel.module.css';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';
import Slider from 'react-touch-drag-slider';
// import {Carousel} from 'react-responsive-carousel';
const HamedAbdallahCarousel = () => {
  return (
    <div>
      <Carousel
        style={{
          backgroundImage: `url('/top-Slide-Background.png')`,
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat',
        }}
        className={Styles.container}
        touch={true}
        indicators={false}
      >
        <Carousel.Item>
          <Image
            alt="Hamed Abdallah Optics"
            src="/Stone1.png"
            priority={true}
            width={1920}
            height={800}
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            alt="Hamed Abdallah Optics"
            src="/Stone2.png"
            priority={true}
            width={1920}
            height={800}
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            alt="Hamed Abdallah Optics"
            src="/Stone3.png"
            priority={true}
            width={1920}
            height={800}
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HamedAbdallahCarousel;
