import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface GameCarouselProps {
  items: {
    id: number;
    image: string;
    title: string;
    description?: string;
  }[];
  title?: string;
  showControls?: boolean;
}

const GameCarousel = ({ items, title, showControls = true }: GameCarouselProps) => {
  return (
    <div className="carousel-container relative mb-8">
      {title && <h2 className="section-title">{title}</h2>}
      
      <div className={`relative ${showControls ? 'px-6 md:px-10' : ''}`}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1.2}
          centeredSlides={false}
          loop={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          pagination={{ 
            clickable: true,
            el: '.swiper-pagination'
          }}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          breakpoints={{
            640: {
              slidesPerView: 2.2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3.2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 4.2,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 5.2,
              spaceBetween: 20,
            },
          }}
          className="w-full"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="game-card h-48 md:h-64 rounded-xl overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="overlay">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  {item.description && <p className="text-sm text-gray-300">{item.description}</p>}
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-1.5 rounded-md mt-2">
                    Play Now
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {showControls && (
          <>
            <button className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 text-white rounded-full p-2">
              <ChevronLeft size={24} />
            </button>
            <button className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 text-white rounded-full p-2">
              <ChevronRight size={24} />
            </button>
          </>
        )}
        
        <div className="swiper-pagination mt-4 flex justify-center"></div>
      </div>
    </div>
  );
};

export default GameCarousel;
