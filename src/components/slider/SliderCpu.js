import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./SliderCpu.css";

import { EffectCoverflow, Pagination } from "swiper/modules";

import imag1 from "../../assets/images/image1.png";
import imag2 from "../../assets/images/image2.png";
import imag3 from "../../assets/images/image3.png";
import imag4 from "../../assets/images/image4.png";
import imag5 from "../../assets/images/image5.png";
import imag6 from "../../assets/images/image6.png";
import imag7 from "../../assets/images/image7.png";
import imag8 from "../../assets/images/image8.png";
import imag9 from "../../assets/images/image9.png";
import imag10 from "../../assets/images/image10.png";
import imag11 from "../../assets/images/image11.png";
import imag12 from "../../assets/images/image12.png";
import imag13 from "../../assets/images/image13.png";
import imag14 from "../../assets/images/image14.png";
import imag15 from "../../assets/images/image15.png";
import imag16 from "../../assets/images/image16.png";
import imag17 from "../../assets/images/image17.png";
import imag18 from "../../assets/images/image18.png";
import imag19 from "../../assets/images/image19.png";
import imag20 from "../../assets/images/image20.png";

const SliderCpu = () => {
  return (
    <>
      <div className=" container-fluid">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 2.5,
            slideShadows: true,
            slideTransition: "0.8s ease",
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
          loop={true}
        >
          <SwiperSlide>
            <img src={imag1} alt="nmadur" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={imag2} alt="nmadur" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={imag3} alt="nmadur" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={imag4} alt="nmadur" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={imag5} alt="nmadur" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={imag6} alt="nmadur" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={imag7} alt="nmadur" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={imag8} alt="nmadur" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={imag9} alt="nmadur" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={imag10} alt="nmadur" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={imag11} alt="nmadur" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={imag12} alt="nmadur" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={imag13} alt="nmadur" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={imag14} alt="nmadur" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={imag15} alt="nmadur" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={imag16} alt="nmadur" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={imag17} alt="nmadur" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={imag18} alt="nmadur" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={imag19} alt="nmadur" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={imag20} alt="nmadur" />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default SliderCpu;
