import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { ShoppingCart, Search, Menu, ChevronDown } from 'lucide-react';
import { useCart } from './_app';
import { getProductsByCategory } from '../data/products';

export default function StickersPage() {
  const { getTotalItems, setIsCartOpen, cart, isCartOpen, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const [selectedCollection, setSelectedCollection] = useState('Stickers');
  const [selectedSort, setSelectedSort] = useState('Relevance');

  const collections = [
    'All',
    'Bags',
    'Drinkware',
    'Electronics',
    'Footwear',
    'Headwear',
    'Hoodies',
    'Jackets',
    'Kids',
    'Pets',
    'Shirts',
    'Stickers'
  ];

  const sortOptions = [
    { name: 'Relevance', href: '/stickers' },
    { name: 'Trending', href: '/stickers?sort=trending-desc' },
    { name: 'Latest arrivals', href: '/stickers?sort=latest-desc' },
    { name: 'Price: Low to high', href: '/stickers?sort=price-asc' },
    { name: 'Price: High to low', href: '/stickers?sort=price-desc' }
  ];

  const products = getProductsByCategory('stickers');

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Acme Store - Stickers</title>
        <meta name="description" content="Browse our collection of stickers" />
      </Head>

      {/* Navbar */}
      <nav className="relative flex items-center justify-between p-4 lg:px-6">
        <div className="block flex-none md:hidden">
          <button aria-label="Open mobile menu" className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden dark:border-neutral-700 dark:text-white">
            <Menu className="h-4" />
          </button>
        </div>
        
        <div className="flex w-full items-center">
          <div className="flex w-full md:w-1/3">
            <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
              <div className="flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black h-[40px] w-[40px] rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" aria-label="Acme Store logo" viewBox="0 0 32 28" className="h-4 w-4 fill-black dark:fill-white h-[16px] w-[16px]">
                  <path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z"></path>
                  <path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z"></path>
                </svg>
              </div>
              <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">Acme Store</div>
            </Link>
            
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              <li><Link href="/all" className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300">All</Link></li>
              <li><Link href="/shirts" className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300">Shirts</Link></li>
              <li><Link href="/stickers" className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300">Stickers</Link></li>
            </ul>
          </div>
          
          <div className="hidden justify-center md:flex md:w-1/3">
            <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
              <input type="text" placeholder="Search for products..." autoComplete="off" className="text-md w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400" />
              <div className="absolute right-0 top-0 mr-3 flex h-full items-center"><Search className="h-4" /></div>
            </form>
          </div>
          
          <div className="flex justify-end md:w-1/3">
            <button aria-label="Open cart" onClick={() => setIsCartOpen(true)}>
              <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
                <ShoppingCart className="h-4 transition-all ease-in-out hover:scale-110" />
                {getTotalItems() > 0 && <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">{getTotalItems()}</div>}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Panel */}
      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsCartOpen(false)}></div>
          <div className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white p-6 text-black md:w-[390px] dark:border-neutral-700 dark:bg-black dark:text-white z-50 overflow-y-auto">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">My Cart</p>
              <button onClick={() => setIsCartOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            {cart.length === 0 ? (
              <div className="mt-20 flex w-full flex-col items-center justify-center">
                <ShoppingCart className="h-16" />
                <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
              </div>
            ) : (
              <>
                <div className="mt-8 flex flex-col gap-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-neutral-200 dark:border-neutral-700 pb-4">
                      <img src={item.image} alt={item.name || item.title} className="h-24 w-24 object-contain rounded border" />
                      <div className="flex flex-1 flex-col justify-between">
                        <div><p className="font-semibold">{item.name || item.title}</p><p className="text-sm text-neutral-500">{item.price}</p></div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 border rounded">-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 border rounded">+</button>
                          <button onClick={() => removeFromCart(item.id)} className="ml-auto text-sm text-red-500">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-6 border-t">
                  <div className="flex justify-between text-lg font-semibold mb-4"><span>Total</span><span>${getTotalPrice()}</span></div>
                  <button className="w-full rounded-full bg-blue-600 p-3 text-white">Checkout</button>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
        {/* Left Sidebar - Collections */}
        <div className="order-first w-full flex-none md:max-w-[125px]">
          <nav>
            <h3 className="hidden text-xs text-neutral-500 md:block dark:text-neutral-400">Collections</h3>
            
            {/* Desktop Collection List */}
            <ul className="hidden md:block">
              {collections.map((collection) => (
                <li key={collection} className="mt-2 flex text-black dark:text-white">
                  {collection === selectedCollection ? (
                    <p className="w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100 underline underline-offset-4">
                      {collection}
                    </p>
                  ) : (
                    <Link 
                      href={collection === 'All' ? '/all' : `/${collection.toLowerCase()}`}
                      className="w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100"
                    >
                      {collection}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile Collection Dropdown */}
            <ul className="md:hidden">
              <div className="relative">
                <div className="flex w-full items-center justify-between rounded border border-black/30 px-4 py-2 text-sm dark:border-white/30">
                  <div>{selectedCollection}</div>
                  <ChevronDown className="h-4" />
                </div>
              </div>
            </ul>
          </nav>
        </div>

        {/* Center - Product Grid */}
        <div className="order-last min-h-screen w-full md:order-none">
          <section>
            <ul className="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <li key={index} className="aspect-square transition-opacity animate-fadeIn">
                  <Link href={`/product/${product.handle}`} className="relative inline-block h-full w-full">
                    <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
                      <img 
                        alt={product.alt}
                        loading="lazy"
                        src={product.image}
                        className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
                        style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', color: 'transparent' }}
                      />
                      <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label">
                        <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
                          <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
                            {product.title}
                          </h3>
                          <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
                            {product.price}<span className="ml-1 inline hidden @[275px]/label:inline">USD</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Sidebar - Sort */}
        <div className="order-none flex-none md:order-last md:w-[125px]">
          <nav>
            <h3 className="hidden text-xs text-neutral-500 md:block dark:text-neutral-400">Sort by</h3>
            
            {/* Desktop Sort List */}
            <ul className="hidden md:block">
              {sortOptions.map((option) => (
                <li key={option.name} className="mt-2 flex text-sm text-black dark:text-white">
                  {option.name === selectedSort ? (
                    <p className="w-full hover:underline hover:underline-offset-4 underline underline-offset-4">
                      {option.name}
                    </p>
                  ) : (
                    <Link 
                      href={option.href}
                      className="w-full hover:underline hover:underline-offset-4"
                    >
                      {option.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile Sort Dropdown */}
            <ul className="md:hidden">
              <div className="relative">
                <div className="flex w-full items-center justify-between rounded border border-black/30 px-4 py-2 text-sm dark:border-white/30">
                  <div>{selectedSort}</div>
                  <ChevronDown className="h-4" />
                </div>
              </div>
            </ul>
          </nav>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-sm text-neutral-500 dark:text-neutral-400 mt-12">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 md:flex-row md:gap-12 dark:border-neutral-700">
          <div><Link href="/" className="flex items-center gap-2 text-black dark:text-white"><span className="uppercase">Acme Store</span></Link></div>
          <nav><ul>
            <li><Link href="/" className="block p-2 hover:underline">Home</Link></li>
            <li><Link href="/about" className="block p-2 hover:underline">About</Link></li>
          </ul></nav>
        </div>
        <div className="border-t border-neutral-200 py-6 dark:border-neutral-700">
          <div className="mx-auto max-w-7xl px-4"><p>© 2023-2025 ACME, Inc. All rights reserved.</p></div>
        </div>
      </footer>
    </div>
  );
}