import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

const PAGES = [
  {
    path: '/',
    title: 'Головна',
    content:
      'Бурий ведмідь бурих ведмедів головна сторінка сайт про бурого ведмедя морфологія харчування популяція ареал фотогалерея'
  },
  {
    path: '/morphology',
    title: 'Зовнішній вигляд бурого ведмедя',
    content:
      'Зовнішній вигляд бурий ведмідь великий ссавець масивне тіло густе хутро потужні лапи шерсть світло-коричнева темно-бура велика голова маленькі очі короткий хвіст довжина тіла 2–3 м маса 100–600 кг кігті нюх зимова сплячка'
  },
  {
    path: '/nutrition',
    title: 'Харчування бурого ведмедя',
    content:
      'Харчування бурий ведмідь раціон всеїдний ягоди риба мясо мʼясо мед їжа'
  },
  {
    path: '/population',
    title: 'Ареал бурого ведмедя',
    content:
      'Ареал бурий ведмідь континенти Європа Азія Північна Америка регіони Скандинавія Карпати Балкани Кавказ Сибір Аляска Західна Канада країни Україна Польща Румунія Словаччина Фінляндія Швеція Норвегія Росія Грузія Туреччина Іран Монголія Китай Японія Канада США середовище проживання хвойні мішані ліси гірські райони тайга лісотундра долини річок біогеографічні зони Палеарктика Неарктика WWF біоми'
  },
  {
    path: '/photo',
    title: 'Фотографії бурого ведмедя',
    content:
      'Фотографії фотогалерея галерея бурий ведмідь у лісі природне середовище полювання біля води річка галявина ведмежа ведмідь взимку гірська місцевість'
  }
];

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (term) => {
    const normalizedTerm = term.trim().toLowerCase();

    if (!normalizedTerm) {
      setSearchResults([]);
      setSearchTerm('');
      return;
    }

    setSearchTerm(term);

    const results = PAGES.filter((page) => {
      const title = page.title.toLowerCase();
      const content = page.content.toLowerCase();

      return title.includes(normalizedTerm) || content.includes(normalizedTerm);
    }).map((page) => ({
      title: page.title,
      path: page.path,
      excerpt: page.content.substring(0, 180) + '...'
    }));

    setSearchResults(results);
  };

  const value = {
    searchTerm,
    setSearchTerm,
    searchResults,
    setSearchResults,
    handleSearch
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);

  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }

  return context;
}