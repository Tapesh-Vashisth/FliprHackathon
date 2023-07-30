import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CarosulComp = () => (
    <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass="carousal-item"
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
            desktop: {
                breakpoint: {
                    max: 3000,
                    min: 1024,
                },
                items: 3,
                partialVisibilityGutter: 40,
            },
            mobile: {
                breakpoint: {
                    max: 464,
                    min: 0,
                },
                items: 1,
                partialVisibilityGutter: 30,
            },
            tablet: {
                breakpoint: {
                    max: 1024,
                    min: 464,
                },
                items: 2,
                partialVisibilityGutter: 30,
            },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
    
    >
        <img
            src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg"
            alt=""
            width={"100%"}
        />
        <img
            src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg"
            alt=""
            width={"100%"}
        />
        <img
            src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg"
            alt=""
            width={"100%"}
        />
    </Carousel>
);
export default CarosulComp;
