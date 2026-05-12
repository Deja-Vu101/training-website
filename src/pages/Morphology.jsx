function Morphology() {
  return (
    <main className="container py-4">
      <article>
        <section>
          <h3 className="h3 text-success">Зовнішній вигляд</h3>

          <p>
            Ведмідь бурий — великий ссавець із масивним тілом, густим хутром та
            потужними лапами. Колір шерсті може варіюватися від світло-коричневого
            до темно-бурого. Він має велику голову, маленькі очі та короткий хвіст.
          </p>
        </section>

        <section>
          <h3 className="h3 text-success">Особливості будови</h3>

          <ul>
            <li>
              Довжина тіла може досягати 2–3 м, маса — від 100 до 600 кг залежно
              від середовища проживання.
            </li>
            <li>
              Передні лапи дуже сильні, з довгими вигнутими кігтями, які
              використовуються для копання та полювання.
            </li>
            <li>
              Тіло вкрите густим хутром, що захищає від холоду, особливо під час
              зимової сплячки.
            </li>
            <li>
              Має добре розвинений нюх, який допомагає знаходити їжу на великій
              відстані.
            </li>
          </ul>
        </section>

        <figure className="text-center">
          <img
            src="/images/Brown_Bear_In_Fog.jpg"
            alt="Бурий ведмідь в тумані"
            className="img-fluid rounded my-4"
          />

          <figcaption className="text-muted">
            Бурий ведмідь в тумані
          </figcaption>
        </figure>
      </article>
    </main>
  );
}

export default Morphology;