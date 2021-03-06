import React from 'react';
import MainInfo from './MainInfo';
import MainTable from './MainTable';

const Main: React.FC = () => {
  return (
    <main className='container mx-auto w-11/12 my-4 sm:px-4'>
      <MainInfo />
      <MainTable />
    </main>
  );
};

export default Main;
