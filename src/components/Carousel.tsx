import { useEffect, useState } from 'react';
import { fetchData } from '../Data/ImageUri';

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
 

  useEffect(() => {
    const controller = new AbortController();

    const fetchDataAndStartAutoPlay = async () => {
      try {
        const respData = await fetchData();
        setImages(respData);
        setLoading(false);
        setAutoPlay(true)

      } catch (error) {
        console.error('Error fetching images', error);
        setLoading(false);
      }
    };

    fetchDataAndStartAutoPlay();

    // Cleanup function to clear the interval when the component is unmounted
    return () => {
      controller.abort();
      clearAutoPlay();
    };
  }, []);

  useEffect(() => {
    let autoPlayTimeout;

    const startAutoPlay = () => {
      autoPlayTimeout = setTimeout(() => {
        if (autoPlay) {
          goToNextSlide();
        }
      }, 10000);
    };

    startAutoPlay();

    // Cleanup function to clear the timeout when the component is unmounted
    return () => {
      clearTimeout(autoPlayTimeout);
    };
  }, [autoPlay, currentIndex]);

  const clearAutoPlay = () => {
    setAutoPlay(false);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextButtonClick = () => {
    clearAutoPlay();
    goToNextSlide();
  };

  const handlePrevButtonClick = () => {
    clearAutoPlay();
    goToPrevSlide();
  };

  const handleMouseEnter = () => {
    clearAutoPlay();
  };

  const handleMouseLeave = () => {
    setAutoPlay(true);
  };

  return (
    <div className="carousel" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {loading ? (
        <p style={{ margin: '0 auto' }}>Loading...</p>
      ) : (
        <>
          {images.map((image, index) => (
            <img
              key={index}
              src={image.download_url}
              alt={`Image ${index}`}
              className={index === currentIndex ? 'visible' : 'hidden'}
            />
          ))}
          <button className="prevButton" onClick={handlePrevButtonClick}>
            Prev
          </button>
          <button className="nextButton" onClick={handleNextButtonClick}>
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
