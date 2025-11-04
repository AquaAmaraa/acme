import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { allProducts } from '../data/products';
import { useCart } from './_app';

const collections = ['All', 'Bags', 'Drinkware', 'Electronics', 'Footwear', 'Headwear', 'Hoodies', 'Jackets', 'Kids', 'Pets', 'Shirts', 'Stickers'];
const sortOptions = ['Relevance', 'Trending', 'Latest arrivals', 'Price: Low to high', 'Price: High to low'];

export default function AllProducts() {
    const { getTotalItems, setIsCartOpen, cart, isCartOpen, removeFromCart, updateQuantity, getTotalPrice } = useCart();
    const [filteredProducts, setFilteredProducts] = useState(allProducts);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCollection, setSelectedCollection] = useState('All');
    const [selectedSort, setSelectedSort] = useState('Relevance');

    useEffect(() => {
        let filtered = [...allProducts];
        
        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.handle.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        if (selectedCollection !== 'All') {
            filtered = filtered.filter(product =>
                product.category.toLowerCase() === selectedCollection.toLowerCase()
            );
        }
        
        switch (selectedSort) {
            case 'Price: Low to high':
                filtered.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
                break;
            case 'Price: High to low':
                filtered.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
                break;
            case 'Trending':
            case 'Latest arrivals':
                filtered.reverse();
                break;
        }
        
        setFilteredProducts(filtered);
    }, [searchQuery, selectedCollection, selectedSort]);

    return (
        <>
            <Head>
                <title>Acme Store - All Products</title>
                <meta name="description" content="Browse all products at Acme Store" />
            </Head>
            <div className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white min-h-screen">
                {/* Navbar */}
                <nav className="relative flex items-center justify-between p-4 lg:px-6">
                    <div className="flex w-full items-center">
                        <div className="flex w-full md:w-1/3">
                            <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
                                <div className="flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black h-[40px] w-[40px] rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-label="Acme Store logo" viewBox="0 0 32 28" className="h-4 w-4 fill-black dark:fill-white">
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
                
                <main>
                    <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
                        <div className="order-first w-full flex-none md:max-w-[125px]">
                            <nav>
                                <h3 className="hidden text-xs text-neutral-500 md:block dark:text-neutral-400">Collections</h3>
                                <ul className="hidden md:block">
                                    {collections.map((collection) => (
                                        <li key={collection} className="mt-2 flex text-black dark:text-white">
                                            <button 
                                                onClick={() => setSelectedCollection(collection)} 
                                                className={`w-full text-left text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100 ${selectedCollection === collection ? 'underline' : ''}`}
                                            >
                                                {collection}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                        
                        <div className="order-last min-h-screen w-full md:order-none">
                            <ul className="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredProducts.map((product) => (
                                    <li key={product.id} className="aspect-square transition-opacity animate-fadeIn">
                                        <Link href={`/product/${product.handle}`} className="relative inline-block h-full w-full">
                                            <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
                                                <img 
                                                    alt={product.alt} 
                                                    loading="lazy" 
                                                    className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105" 
                                                    src={product.image} 
                                                />
                                                <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4">
                                                    <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
                                                        <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">{product.title}</h3>
                                                        <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
                                                            {product.price}<span className="ml-1 inline hidden">USD</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="order-none flex-none md:order-last md:w-[125px]">
                            <nav>
                                <h3 className="hidden text-xs text-neutral-500 md:block dark:text-neutral-400">Sort by</h3>
                                <ul className="hidden md:block">
                                    {sortOptions.map((option) => (
                                        <li key={option} className="mt-2 flex text-sm text-black dark:text-white">
                                            <button 
                                                onClick={() => setSelectedSort(option)} 
                                                className={`w-full text-left hover:underline hover:underline-offset-4 ${selectedSort === option ? 'underline underline-offset-4' : ''}`}
                                            >
                                                {option}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </main>
                
                {/* Footer */}
                <footer className="text-sm text-neutral-500 dark:text-neutral-400">
  <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
    <div>
      <a className="flex items-center gap-2 text-black md:pt-1 dark:text-white" href="/">
        <div className="flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black h-[30px] w-[30px] rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" aria-label="Acme Store logo" viewBox="0 0 32 28" className="h-4 w-4 fill-black dark:fill-white h-[10px] w-[10px]">
            <path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z"></path>
            <path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z"></path>
          </svg>
        </div>
        <span className="uppercase">Acme Store</span>
      </a>
    </div>
    <nav>
      <ul>
        <li>
          <a className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300 text-black dark:text-neutral-300" href="/">
            Home
          </a>
        </li>
        <li>
          <a className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300" href="/about">
            About
          </a>
        </li>
        <li>
          <a className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300" href="/terms-conditions">
            Terms &amp; Conditions
          </a>
        </li>
        <li>
          <a className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300" href="/shipping-return-policy">
            Shipping &amp; Return Policy
          </a>
        </li>
        <li>
          <a className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300" href="/privacy-policy">
            Privacy Policy
          </a>
        </li>
        <li>
          <a className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300" href="/frequently-asked-questions">
            FAQ
          </a>
        </li>
      </ul>
    </nav>
    <div className="md:ml-auto">
      <a className="flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-black dark:border-neutral-700 dark:bg-black dark:text-white" aria-label="Deploy on Vercel" href="https://vercel.com/templates/next.js/nextjs-commerce">
        <span className="px-3">▲</span>
        <hr className="h-full border-r border-neutral-200 dark:border-neutral-700" />
        <span className="px-3">Deploy</span>
      </a>
    </div>
  </div>
  <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
      <p>© 2023-2025 ACME, Inc. All rights reserved.</p>
      <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
      <p>
        <a href="https://github.com/vercel/commerce">View the source</a>
      </p>
      <p className="md:ml-auto">
        <a href="https://vercel.com" className="text-black dark:text-white">
          Created by ▲ Vercel
        </a>
      </p>
    </div>
  </div>
</footer>
            </div>
        </>
    );
}
