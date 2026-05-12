import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Population() {
  return (
    <main className="container py-4">
      <div className="row">
        <div className="col-md-3">
          <aside className="sticky-top pt-3">
            <nav className="nav flex-column">
              <h4>Зміст</h4>

              <a href="#continentsList" className="nav-link" data-bs-toggle="collapse">
                Континенти
              </a>

              <a href="#regionsList" className="nav-link" data-bs-toggle="collapse">
                Регіони
              </a>

              <a href="#countriesList" className="nav-link" data-bs-toggle="collapse">
                Країни
              </a>

              <a href="#habitatsList" className="nav-link" data-bs-toggle="collapse">
                Середовище проживання
              </a>

              <a href="#biogeographicList" className="nav-link" data-bs-toggle="collapse">
                Біогеографічні зони
              </a>

              <a href="#biomesList" className="nav-link" data-bs-toggle="collapse">
                WWF Біоми
              </a>
            </nav>
          </aside>
        </div>

        <div className="col-md-9">
          <h2 className="h2 text-success">Ареал</h2>

          <article className="mt-4">
            <section id="continents">
              <h3>
                <button
                  className="btn btn-success w-100 text-start"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#continentsList"
                  aria-expanded="false"
                  aria-controls="continentsList"
                >
                  Континенти
                </button>
              </h3>

              <div className="collapse" id="continentsList">
                <ul className="list-group mb-3">
                  <li className="list-group-item">Європа</li>
                  <li className="list-group-item">Азія</li>
                  <li className="list-group-item">Північна Америка</li>
                </ul>
              </div>
            </section>

            <section id="regions">
              <h3>
                <button
                  className="btn btn-success w-100 text-start"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#regionsList"
                  aria-expanded="false"
                  aria-controls="regionsList"
                >
                  Регіони
                </button>
              </h3>

              <div className="collapse" id="regionsList">
                <ul className="list-group mb-3">
                  <li className="list-group-item">Скандинавія</li>
                  <li className="list-group-item">Карпати</li>
                  <li className="list-group-item">Балкани</li>
                  <li className="list-group-item">Кавказ</li>
                  <li className="list-group-item">Сибір</li>
                  <li className="list-group-item">Аляска</li>
                  <li className="list-group-item">Західна Канада</li>
                </ul>
              </div>
            </section>

            <section id="countries">
              <h3>
                <button
                  className="btn btn-success w-100 text-start"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#countriesList"
                  aria-expanded="false"
                  aria-controls="countriesList"
                >
                  Країни
                </button>
              </h3>

              <div className="collapse" id="countriesList">
                <ul className="list-group mb-3">
                  <li className="list-group-item">Україна</li>
                  <li className="list-group-item">Польща</li>
                  <li className="list-group-item">Румунія</li>
                  <li className="list-group-item">Словаччина</li>
                  <li className="list-group-item">Фінляндія</li>
                  <li className="list-group-item">Швеція</li>
                  <li className="list-group-item">Норвегія</li>
                  <li className="list-group-item">Росія</li>
                  <li className="list-group-item">Грузія</li>
                  <li className="list-group-item">Туреччина</li>
                  <li className="list-group-item">Іран</li>
                  <li className="list-group-item">Монголія</li>
                  <li className="list-group-item">Китай</li>
                  <li className="list-group-item">Японія</li>
                  <li className="list-group-item">Канада</li>
                  <li className="list-group-item">США</li>
                </ul>
              </div>
            </section>

            <section id="habitats">
              <h3>
                <button
                  className="btn btn-success w-100 text-start"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#habitatsList"
                  aria-expanded="false"
                  aria-controls="habitatsList"
                >
                  Середовище проживання
                </button>
              </h3>

              <div className="collapse" id="habitatsList">
                <ul className="list-group mb-3">
                  <li className="list-group-item">Хвойні та мішані ліси</li>
                  <li className="list-group-item">Гірські райони</li>
                  <li className="list-group-item">Тайга</li>
                  <li className="list-group-item">Лісотундра</li>
                  <li className="list-group-item">Долини річок</li>
                </ul>
              </div>
            </section>

            <section id="biogeographic">
              <h3>
                <button
                  className="btn btn-success w-100 text-start"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#biogeographicList"
                  aria-expanded="false"
                  aria-controls="biogeographicList"
                >
                  Біогеографічні зони
                </button>
              </h3>

              <div className="collapse" id="biogeographicList">
                <ul className="list-group mb-3">
                  <li className="list-group-item">Палеарктика</li>
                  <li className="list-group-item">Неарктика</li>
                </ul>
              </div>
            </section>

            <section id="biomes">
              <h3>
                <button
                  className="btn btn-success w-100 text-start"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#biomesList"
                  aria-expanded="false"
                  aria-controls="biomesList"
                >
                  WWF Біоми
                </button>
              </h3>

              <div className="collapse" id="biomesList">
                <ul className="list-group">
                  <li className="list-group-item">Бореальні ліси / тайга</li>
                  <li className="list-group-item">
                    Помірні широколисті та мішані ліси
                  </li>
                  <li className="list-group-item">Гірські ліси</li>
                  <li className="list-group-item">Тундра</li>
                </ul>
              </div>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}

export default Population;