import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ShoppingCart, Search, Menu, Plus, Minus } from 'lucide-react';
import { useCart } from '../_app';
import { getProductByHandle, allProducts } from '../../data/products';

export default function ProductPage() {
  const router = useRouter();
  const { handle } = router.query;
  const { getTotalItems, setIsCartOpen, cart, isCartOpen, removeFromCart, updateQuantity, getTotalPrice, addToCart } = useCart();

  const product = getProductByHandle(handle);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  if (!product) {
    return <div>Product not found</div>;
  }

  const images = product.images || [product.image];
  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 10);

  const canAddToCart = product.variants ? (selectedSize && selectedColor) : true;

  const handleAddToCart = () => {
    if (canAddToCart) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        handle: product.handle
      });
    }
  };

  return (
    <div className="bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white min-h-screen">
      <Head>
        <title>{product.title} - Acme Store</title>
        <meta name="description" content={product.description} />
      </Head>

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
                      <img src={item.image} alt={item.title} className="h-24 w-24 object-contain rounded border" />
                      <div className="flex flex-1 flex-col justify-between">
                        <div><p className="font-semibold">{item.title}</p><p className="text-sm text-neutral-500">{item.price}</p></div>
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

      {/* Product Content */}
      <main>
        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
            
            {/* Left: Images */}
            <div className="h-full w-full basis-full lg:basis-4/6">
              {/* Main Image */}
              <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
                <img
                  src={images[selectedImageIndex]}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
                
                {/* Image Navigation */}
                {images.length > 1 && (
                  <div className="absolute bottom-[15%] flex w-full justify-center">
                    <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
                      <button 
                        onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                        disabled={selectedImageIndex === 0}
                        className="h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white disabled:opacity-30"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                      </button>
                      <div className="mx-1 h-6 w-px bg-neutral-500"></div>
                      <button 
                        onClick={() => setSelectedImageIndex(Math.min(images.length - 1, selectedImageIndex + 1))}
                        disabled={selectedImageIndex === images.length - 1}
                        className="h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white disabled:opacity-30"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <ul className="my-12 flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0">
                  {images.map((img, idx) => (
                    <li key={idx} className="h-20 w-20">
                      <button
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`h-full w-full border-2 rounded-lg overflow-hidden ${
                          idx === selectedImageIndex ? 'border-blue-600' : 'border-neutral-200 dark:border-neutral-800'
                        }`}
                      >
                        <img src={img} alt={`${product.title} - ${idx + 1}`} className="h-full w-full object-contain" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Right: Product Info */}
            <div className="basis-full lg:basis-2/6">
              <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
                <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
                <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
                  <p>{product.price}<span className="ml-1 inline">USD</span></p>
                </div>
              </div>

              {/* Variants */}
              {product.variants && (
                <>
                  {/* Colors */}
                  {product.variants.colors && (
                    <dl className="mb-8">
                      <dt className="mb-4 text-sm uppercase tracking-wide">Color</dt>
                      <dd className="flex flex-wrap gap-3">
                        {product.variants.colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => color.available && setSelectedColor(color.name)}
                            disabled={!color.available}
                            className={`flex min-w-[48px] items-center justify-center rounded-full border px-2 py-1 text-sm transition duration-300 ease-in-out
                              ${color.available 
                                ? selectedColor === color.name 
                                  ? 'ring-2 ring-blue-600' 
                                  : 'hover:ring-2 hover:ring-blue-600'
                                : 'relative cursor-not-allowed opacity-60'
                              } bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900`}
                          >
                            {color.name}
                            {!color.available && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-px w-full bg-neutral-400 rotate-45"></div>
                              </div>
                            )}
                          </button>
                        ))}
                      </dd>
                    </dl>
                  )}

                  {/* Sizes */}
                  {product.variants.sizes && (
                    <dl className="mb-8">
                      <dt className="mb-4 text-sm uppercase tracking-wide">Size</dt>
                      <dd className="flex flex-wrap gap-3">
                        {product.variants.sizes.map((size) => (
                          <button
                            key={size.name}
                            onClick={() => size.available && setSelectedSize(size.name)}
                            disabled={!size.available}
                            className={`flex min-w-[48px] items-center justify-center rounded-full border px-2 py-1 text-sm transition duration-300 ease-in-out
                              ${size.available 
                                ? selectedSize === size.name 
                                  ? 'ring-2 ring-blue-600' 
                                  : 'hover:ring-2 hover:ring-blue-600'
                                : 'cursor-not-allowed opacity-60'
                              } bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900`}
                          >
                            {size.name}
                          </button>
                        ))}
                      </dd>
                    </dl>
                  )}
                </>
              )}

              {/* Description */}
              <div className="mb-6 text-sm leading-tight dark:text-white/60">
                {product.description}
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!canAddToCart}
                className={`relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white
                  ${!canAddToCart ? 'cursor-not-allowed opacity-60' : 'hover:opacity-90'}`}
              >
                <div className="absolute left-0 ml-4">
                  <Plus className="h-5" />
                </div>
                {!canAddToCart && product.variants ? 'Please select options' : 'Add To Cart'}
              </button>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="py-8">
              <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
              <ul className="flex w-full gap-4 overflow-x-auto pt-1">
                {relatedProducts.map((relatedProduct) => (
                  <li key={relatedProduct.id} className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Link href={`/product/${relatedProduct.handle}`} className="relative h-full w-full">
                      <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black border-neutral-200 dark:border-neutral-800">
                        <img
                          alt={relatedProduct.title}
                          src={relatedProduct.image}
                          className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4">
                          <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
                            <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">{relatedProduct.title}</h3>
                            <p className="flex-none rounded-full bg-blue-600 p-2 text-white">{relatedProduct.price}<span className="ml-1 inline hidden">USD</span></p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
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