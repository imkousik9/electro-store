import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { searchKeywords } from '../../data';
import { SearchIcon } from '@heroicons/react/solid';

function SearchBar() {
  const [activeSearch, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchBarRef = useRef(null);

  const closeSearchBar = (e) => {
    if (!searchBarRef.current.contains(e.target)) {
      setSearchActive(false);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    document.addEventListener('click', closeSearchBar);

    return () => {
      document.removeEventListener('click', closeSearchBar);
    };
  }, []);

  const searchKeywordsOptions = searchKeywords
    .map((item) => {
      if (item.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
        return (
          <li
            className="font-light py-1 px-4 hover:bg-gray-100 cursor-pointer"
            key={item}
            onClick={(e) => {
              navigate(`/search?searchTerm=${encodeURIComponent(item)}`);
              setSearchTerm('');
              setSearchActive(false);
            }}
          >
            {item}
          </li>
        );
      }
    })
    .filter((item) => item !== undefined);

  const searchSubmit = () => {
    if (searchTerm !== '') {
      navigate(`/search?searchTerm=${encodeURIComponent(searchTerm)}`);
      setSearchActive(false);
      setSearchTerm('');
    }
  };

  return (
    <div className="relative flex-1 mx-4 md:mx-10 lg:mx-24" ref={searchBarRef}>
      <div
        className={`flex items-center bg-gray-50 border rounded-md py-2 px-4 focus:bg-white w-full ${
          activeSearch && 'bg-white outline outline-1 outline-indigo-700'
        }`}
      >
        <input
          type="text"
          className="border-0 outline-0 bg-inherit w-full px-2"
          onFocus={() => setSearchActive(true)}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              searchSubmit();
            }
          }}
        />
        <button className="" type="submit" onClick={searchSubmit}>
          <SearchIcon className="h-5 w-5" />
        </button>
      </div>
      {searchTerm !== '' && (
        <ul
          className={`absolute top-12 bg-white w-full shadow-2xl ${
            !activeSearch && 'hidden'
          }`}
        >
          {searchKeywordsOptions.length !== 0 ? (
            searchKeywordsOptions
          ) : (
            <li className="py-1 px-4">{`Oh! No search results for: "${searchTerm}"`}</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
