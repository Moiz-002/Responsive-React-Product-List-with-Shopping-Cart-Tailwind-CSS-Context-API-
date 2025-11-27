import React from 'react';
import './index.css';
import data from '../data.json';
import Product from './components/Product';
import Cart from './components/Cart';

const App = () => {
  return (
    <>
      <main role="main" className='flex flex-col sm:flex-row justify-center flex-wrap px-4 py-6 bg-rose-50 gap-10'>
        <section className='max-w-[1550px] flex flex-col align-center justify-center gap-8'>
          <h1 id="products-heading" className='text-rose-950 text-3xl sm:text-4xl lg:text-5xl font-bold'>Desserts</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {data.map((item, index) => (
              <Product
                key={item.category ?? index}
                image={item.image}
                name={item.name}
                category={item.category}
                price={item.price}
              />
            ))}
          </div>
        </section>
        <section aria-labelledby="cart-heading">
          <Cart />
        </section>
      </main>
    </>
  );
};

export default App;
