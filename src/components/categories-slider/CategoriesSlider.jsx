import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css'
import { types, clothes } from '../../clothes/data';
import { Link } from 'react-router-dom';

const CategoriesSlider = () => {
  return (
    <div className='category-swiper-container'>
        <Swiper
            slidesPerView={'auto'}
            spaceBetween={10}
            grabCursor={true}
            navigation={true}
            modules={[Navigation]}
            className='categories-slider'
        >
            {types.slice(1).map((item) => (
                <SwiperSlide key={item.id} className='categories-slide'>
                    <div className='category-slide-container'>
                        <LazyLoadImage
                            src={clothes.find(element => element.type === item.name).colors[0].images[0]}
                            alt='category'
                            effect="blur"
                            placeholderSrc={clothes.find(element => element.type === item.name).colors[0].images[0]}
                            className='category-img'
                        />
                        <div>
                            <span>{item.name}</span>
                            <Link to={`/products/${item.name}`}><button className="swiper-btn">Kəşf Et</button></Link>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
      </div>
  )
}

export default CategoriesSlider