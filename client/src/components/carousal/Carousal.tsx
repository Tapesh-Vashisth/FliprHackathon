import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const CarosulComp = () => (
    <div className="carousal-page">
        <h1 className="carousal--heading">
            Escape to Bliss: Find Your Perfect Getaway
        </h1>
        <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className="carousal"
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
            <div className="carousal-item__imageContainer">
                <img src={require("./image-1.jpg")} alt="training2" />
                <div className="carousal-item__imageContainer--content">
                    <h3>Plan</h3>
                </div>
            </div>
            <div className="carousal-item__imageContainer">
                <img src={require("./image-2.jpg")} alt="training2" />
                <div className="carousal-item__imageContainer--content">
                    <h3>Travel</h3>
                </div>
            </div>
            <div className="carousal-item__imageContainer">
                <img src={require("./image-4.jpg")} alt="training2" />
                <div className="carousal-item__imageContainer--content">
                    <h3>Explore</h3>
                </div>
            </div>
            <div className="carousal-item__imageContainer">
                <img src={require("./image-3.jpg")} alt="training2" />
                <div className="carousal-item__imageContainer--content">
                    <h3>Repeat</h3>
                </div>
            </div>
        </Carousel>
    </div>
);
export default CarosulComp;
