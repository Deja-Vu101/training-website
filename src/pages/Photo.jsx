import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Photo() {
  const images = [
    {
      src: '/images/natural_environment.jpg',
      alt: 'Бурий ведмідь у лісі',
      caption: 'Ведмідь у природному середовищі'
    },
    {
      src: '/images/brown-bear-water-hunt.jpg',
      alt: 'Ведмідь біля річки',
      caption: 'Полювання біля води'
    },
    {
      src: '/images/Brown_bear.jpg',
      alt: 'Ведмідь на галявині',
      caption: 'Ведмідь на галявині'
    },
    {
      src: '/images/little_bear.jpg',
      alt: 'Маленьке ведмежа',
      caption: 'Ведмежа'
    },
    {
      src: '/images/bear-in-winter.jpg',
      alt: 'Ведмідь взимку',
      caption: 'Ведмідь взимку'
    },
    {
      src: '/images/bear-in-the-forest.jpg',
      alt: 'Ведмідь у горах',
      caption: 'Ведмідь у гірській місцевості'
    }
  ];

  return (
    <main className="container py-4">
      <article>
        <h2 className="text-center text-success mb-4">Галерея</h2>

        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : ''}
                aria-current={index === 0 ? 'true' : undefined}
                aria-label={`Слайд ${index + 1}`}
              ></button>
            ))}
          </div>

          <div className="carousel-inner">
            {images.map((image, index) => (
              <div
                key={image.src}
                className={`carousel-item ${index === 0 ? 'active' : ''}`}
              >
                <img
                  src={image.src}
                  className="d-block w-100 gallery-image"
                  alt={image.alt}
                />

                <div className="carousel-caption">
                  <p>{image.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Попередній</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Наступний</span>
          </button>
        </div>
      </article>
    </main>
  );
}

export default Photo;