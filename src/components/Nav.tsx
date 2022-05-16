import React, { useState } from 'react';
import { useNavContext } from '../Context';

var search_terms = [
  'apple',
  'apple watch',
  'apple macbook',
  'apple macbook pro',
  'iphone',
  'iphone 12',
];

const autocompleteMatch = (e: React.FormEvent<HTMLInputElement>) => {
  if (e.currentTarget.value === '') {
    return [];
  }
  var reg = new RegExp(e.currentTarget.value);
  return search_terms.filter((term) => {
    if (term.match(reg)) {
      return term;
    }
    return false;
  });
};

const Nav: React.FC = () => {
  const { themeMode, setThemeMode } = useNavContext();

  const [searchFocus, setSearchFocus] = useState(false);
  const [searchResult, setSearchResult] = React.useState<string[]>([]);

  console.log(searchResult);

  const showResults = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchResult(autocompleteMatch(e));
  };

  return (
    <nav className='bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800'>
      <div className='flex flex-wrap justify-between items-center'>
        <a
          href='https://flowbite.com'
          className='flex items-center mr-4 grow-0'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-8 w-8 mr-3 dark:text-white'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 8l3 5m0 0l3-5m-3 5v4m-3-5h6m-6 3h6m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span className='hidden text-xl font-semibold sm:block dark:text-white'>
            Cryptocurrency
          </span>
        </a>
        <div className='flex items-center grow sm:grow-0 sm:w-64'>
          <div className='grow'>
            <div className='relative'>
              <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-gray-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>
              <input
                type='text'
                className='focus:outline-none p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg ring sm:text-sm focus:ring-blue-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white'
                placeholder='Search...'
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
                onChange={showResults}
              />
            </div>
            {searchResult.length !== 0 && searchFocus && (
              <div className='absolute bg-white mt-0.5 rounded shadow dark:bg-gray-700'>
                <ul className='py-1 text-sm text-gray-700 dark:text-gray-200'>
                  {searchResult.map((term) => (
                    <li
                      className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                      key={term}
                    >
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {!themeMode && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 grow-0 dark:text-white ml-4 cursor-pointer'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
              onClick={() => setThemeMode(true)}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
              />
            </svg>
          )}
          {themeMode && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 grow-0 dark:text-white ml-4 cursor-pointer'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
              onClick={() => setThemeMode(false)}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
              />
            </svg>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;