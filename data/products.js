export const allProducts = [
  { 
    id: '1',
    title: 'Acme Circles T-Shirt',
    handle: 'acme-geometric-circles-t-shirt',
    price: '$20.00',
    priceRange: { min: 15, max: 20 },
    image: 'https://cdn.shopify.com/s/files/1/0754/3727/7491/files/t-shirt-1.png?v=1689798965',
    images: [
      'https://cdn.shopify.com/s/files/1/0754/3727/7491/files/t-shirt-1.png?v=1689798965',
      'https://cdn.shopify.com/s/files/1/0754/3727/7491/files/t-shirt-2.png?v=1689798965',
      'https://cdn.shopify.com/s/files/1/0754/3727/7491/files/t-shirt-circles-blue.png?v=1690003396'
    ],
    alt: 'Acme Circles T-Shirt',
    category: 'shirts',
    description: '60% combed ringspun cotton/40% polyester jersey tee.',
    descriptionHtml: '<p>60% combed ringspun cotton/40% polyester jersey tee.</p>',
    href: '/product/acme-geometric-circles-t-shirt',
    variants: {
      colors: [
        { name: 'Black', available: true },
        { name: 'White', available: true },
        { name: 'Blue', available: false }
      ],
      sizes: [
        { name: 'XS', available: true },
        { name: 'S', available: true },
        { name: 'M', available: true },
        { name: 'L', available: true },
        { name: 'XL', available: true },
        { name: 'XXL', available: true },
        { name: 'XXXL', available: true }
      ]
    }
  },
  { 
    id: '2', 
    title: 'Acme T-Shirt', 
    handle: 'acme-t-shirt', 
    price: '$20.00', 
    image: 'https://cdn.shopify.com/s/files/1/0754/3727/7491/files/t-shirt-color-black.png?v=1690003675', 
    alt: 'Acme T-Shirt',
    category: 'shirts',
    description: 'Comfortable cotton t-shirt in classic black. Made from 100% organic cotton.',
    href: '/product/acme-t-shirt'
  },
  { 
    id: '3', 
    title: 'Acme Hoodie', 
    handle: 'acme-hoodie', 
    price: '$50.00', 
    image: 'https://cdn.shopify.com/s/files/1/0754/3727/7491/files/hoodie-1.png?v=1690003482', 
    alt: 'Acme Hoodie',
    category: 'hoodies',
    description: 'Cozy hoodie perfect for any weather. Features a kangaroo pocket and adjustable drawstring hood.',
    href: '/product/acme-hoodie'
  },
  { 
    id: '5', 
    title: 'Acme Prism T-Shirt', 
    handle: 'acme-rainbow-prism-t-shirt', 
    price: '$25.00', 
    image: 'https://cdn.shopify.com/s/files/1/0754/3727/7491/files/t-shirt-spiral-1.png?v=1690003571', 
    alt: 'Acme Prism T-Shirt',
    category: 'shirts',
    description: 'Vibrant rainbow prism design that catches the eye.',
    href: '/product/acme-rainbow-prism-t-shirt'
  },
  { 
    id: '6', 
    title: 'Acme Cowboy Hat', 
    handle: 'acme-cowboy-hat', 
    price: '$160.00', 
    image: 'https://cdn.shopify.com/s/files/1/0754/3727/7491/files/cowboy-hat-black-1.png?v=1690208765', 
    alt: 'Acme Cowboy Hat',
    category: 'headwear',
    description: 'Classic cowboy hat in premium black leather. Authentic western style.',
    href: '/product/acme-cowboy-hat'
  },
  { 
    id: '7', 
    title: 'Acme Slip-On Shoes', 
    handle: 'acme-slip-on-shoes', 
    price: '$45.00', 
    image: 'https://cdn.shopify.com/s/files/1/0754/3727/7491/files/shoes-1.png?v=1690004109', 
    alt: 'Acme Slip-On Shoes',
    category: 'footwear',
    description: 'Comfortable slip-on shoes for everyday wear. Easy to put on and extremely comfortable.',
    href: '/product/acme-slip-on-shoes'
  },
  { 
    id: '8', 
    title: 'Acme Rainbow Sticker', 
    handle: 'acme-rainbow-sticker', 
    price: '$4.00', 
    image: 'https://cdn.shopify.com/s/files/1/0754/3727/7491/files/sticker-rainbow.png?v=1690003602', 
    alt: 'Acme Rainbow Sticker',
    category: 'stickers',
    description: 'Colorful rainbow sticker. Waterproof and fade-resistant.',
    href: '/product/acme-rainbow-sticker'
  },
  { 
    id: '9', 
    title: 'Acme Cap', 
    handle: 'acme-cap', 
    price: '$20.00', 
    image: 'https://cdn.shopify.com/s/files/1/0754/3727/7491/files/hat-1.png?v=1690002833', 
    alt: 'Acme Cap',
    category: 'headwear',
    description: 'Stylish cap with Acme branding. Adjustable strap for perfect fit.',
    href: '/product/acme-cap'
  },
  { 
    id: '10', 
    title: 'Acme Dog Sweater', 
    handle: 'acme-dog-sweater', 
    price: '$20.00', 
    image: 'https://cdn.shopify.com/s/files/1/0754/3727/7491/files/dog-sweater-1.png?v=1690003132', 
    alt: 'Acme Dog Sweater',
    category: 'pets',
    description: 'Cozy sweater for your furry friend. Available in multiple sizes.',
    href: '/product/acme-dog-sweater'
  },
  { 
    id: '11', 
    title: 'Acme Cup', 
    handle: 'acme-cup', 
    price: '$15.00', 
    image: 'https://cdn.shopify.com/s/files/1/0754/3727/7491/files/cup-black.png?v=1690003088', 
    alt: 'Acme Cup',
    category: 'drinkware',
    description: 'Sleek black cup for hot or cold beverages. Dishwasher safe.',
    href: '/product/acme-cup'
  },
  { 
    id: '12', 
    title: 'Acme Bomber Jacket', 
    handle: 'acme-bomber-jacket', 
    price: '$50.00', 
    image: 'https://cdn.shopify.com/s/files/1/0754/3727/7491/files/bomber-jacket-army.png?v=1690002722', 
    alt: 'Acme Bomber Jacket',
    category: 'jackets',
    description: 'Classic army style bomber jacket. Durable and stylish.',
    href: '/product/acme-bomber-jacket'
  },
  { 
    id: '13', 
    title: 'Acme Baby Cap', 
    handle: 'acme-baby-cap', 
    price: '$10.00', 
    image: 'https://cdn.shopify.com/s/files/1/0754/3727/7491/files/baby-cap-black.png?v=1690002570', 
    alt: 'Acme Baby Cap',
    category: 'kids',
    description: 'Adorable cap for babies. Soft and comfortable.',
    href: '/product/acme-baby-cap'
  },
  { 
    id: '14', 
    title: 'Acme Baby Onesie', 
    handle: 'acme-baby-onesie', 
    price: '$10.00', 
    image: 'https://cdn.shopify.com/s/files/1/0754/3727/7491/files/baby-onesie-beige-1.png?v=1690002632', 
    alt: 'Acme Baby Onesie',
    category: 'kids',
    description: 'Soft and comfortable baby onesie. Made from gentle cotton.',
    href: '/product/acme-baby-onesie'
  },
  { 
    id: '15', 
    title: 'Acme Sticker', 
    handle: 'acme-sticker', 
    price: '$4.00', 
    image: 'https://cdn.shopify.com/s/files/1/0754/3727/7491/files/sticker.png?v=1690003619', 
    alt: 'Acme Sticker',
    category: 'stickers',
    description: 'Classic Acme logo sticker. Perfect for laptops and water bottles.',
    href: '/product/acme-sticker'
  },
  { 
    id: '16', 
    title: 'Acme Mug', 
    handle: 'acme-mug', 
    price: '$15.00', 
    image: 'https://cdn.shopify.com/s/files/1/0754/3727/7491/files/mug-1.png?v=1690003527', 
    alt: 'Acme Mug',
    category: 'drinkware',
    description: 'Ceramic mug for your morning coffee. Microwave safe.',
    href: '/product/acme-mug'
  },
  { 
    id: '17', 
    title: 'Acme Drawstring Bag', 
    handle: 'acme-drawstring-bag', 
    price: '$12.00', 
    image: 'https://cdn.shopify.com/s/files/1/0754/3727/7491/files/bag-1-dark.png?v=1689796304', 
    alt: 'Acme Drawstring Bag',
    category: 'bags',
    description: 'Practical drawstring bag for everyday use. Lightweight and durable.',
    href: '/product/acme-drawstring-bag'
  },
  { 
    id: '18', 
    title: 'Acme Pacifier', 
    handle: 'acme-pacifier', 
    price: '$10.00', 
    image: 'https://cdn.shopify.com/s/files/1/0754/3727/7491/files/pacifier-1.png?v=1690003544', 
    alt: 'Acme Pacifier',
    category: 'kids',
    description: 'Safe and comfortable baby pacifier. BPA-free.',
    href: '/product/acme-pacifier'
  }
];

export const getProductByHandle = (handle) => {
  return allProducts.find(product => product.handle === handle);
};

export const getProductsByCategory = (category) => {
  if (category === 'all') return allProducts;
  return allProducts.filter(product => product.category === category);
};