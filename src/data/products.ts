import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 'strawberry-jam',
    name: 'Strawberry Preserve',
    price: 8.99,
    description:
      'Our signature strawberry preserve is made with hand-picked organic strawberries at the peak of ripeness. Gently cooked with a touch of organic cane sugar to enhance the natural sweetness of the berries. Perfect for spreading on toast, scones, or using in your favorite recipes.',
    shortDescription:
      'Organic strawberries gently preserved with a touch of sweetness',
    image: '/images/jar1.jpg',
    category: 'jam',
    featured: true,
    bestSeller: true,
  },
  {
    id: 'wildflower-honey',
    name: 'Wildflower Honey',
    price: 12.99,
    description:
      'This exquisite wildflower honey is collected from bees that forage on a diverse range of wildflowers, resulting in a complex flavor profile that changes subtly with each season. Raw and unfiltered to preserve all natural enzymes and beneficial properties.',
    shortDescription: 'Raw, unfiltered honey with complex wildflower notes',
    image: '/images/honey0.jpg',
    category: 'honey',
    featured: true,
  },
  {
    id: 'blueberry-jam',
    name: 'Blueberry Preserve',
    price: 9.49,
    description:
      'Made with plump, organic blueberries harvested at their peak sweetness. Our slow cooking process preserves the intense flavor and natural antioxidants of these superfood berries. A perfect balance of sweet and tart that elevates your breakfast or dessert.',
    shortDescription: 'Plump organic blueberries preserved at peak sweetness',
    image: '/images/jar3.jpg',
    category: 'jam',
    bestSeller: true,
  },
  {
    id: 'lavender-honey',
    name: 'Lavender Infused Honey',
    price: 14.99,
    description:
      'Our lavender honey combines pure raw honey with organic lavender flowers, creating a delicate floral honey with calming properties. The subtle lavender essence complements the natural sweetness of the honey, making it perfect for tea, desserts, or enjoying straight from the spoon.',
    shortDescription: 'Pure raw honey delicately infused with organic lavender',
    image: '/images/jar2.jpg',
    category: 'honey',
    new: true,
  },
  {
    id: 'raspberry-jam',
    name: 'Raspberry Preserve',
    price: 9.99,
    description:
      'Our raspberry preserve captures the bright, tangy flavor of freshly picked organic raspberries. Made in small batches to ensure quality, this preserve contains whole fruit pieces and just enough organic cane sugar to enhance the natural sweetness while maintaining the perfect balance of sweet and tart.',
    shortDescription:
      'Tangy organic raspberries with perfect sweet-tart balance',
    image: '/images/cherry-jam.jpg',
    category: 'jam',
  },
  {
    id: 'acacia-honey',
    name: 'Acacia Honey',
    price: 13.49,
    description:
      'Our premium acacia honey is prized for its exceptionally clear, light color and delicate, mildly sweet flavor. Collected from the nectar of acacia blossoms, this honey resists crystallization longer than most varieties and is perfect for those who prefer a subtler honey taste.',
    shortDescription:
      'Light, delicate honey with exceptional clarity and subtle sweetness',
    image: '/images/honey1.jpg',
    category: 'honey',
    featured: true,
  },
  {
    id: 'mixed-berry-jam',
    name: 'Mixed Berry Preserve',
    price: 10.49,
    description:
      'A delightful blend of organic strawberries, blueberries, and blackberries creates this vibrant mixed berry preserve. Each spoonful delivers a complex interplay of sweet and tart notes from the different berries, making it an exciting addition to your breakfast table or dessert recipes.',
    shortDescription:
      'Vibrant blend of organic strawberries, blueberries, and blackberries',
    image: '/images/orange-jam.jpg',
    category: 'jam',
    new: true,
  },
  {
    id: 'orange-blossom-honey',
    name: 'Orange Blossom Honey',
    price: 11.99,
    description:
      'Harvested from bees that pollinate orange groves, our orange blossom honey carries distinct citrus notes and a light, refreshing sweetness. This aromatic honey adds a wonderful dimension to teas, yogurt, and baked goods while retaining all the natural enzymes and benefits of raw honey.',
    shortDescription:
      'Aromatic honey with distinct citrus notes and light sweetness',
    image: '/images/orangeJam.jpg',
    category: 'honey',
  },
];

export const getFeaturedProducts = () => {
  return products.filter((product) => product.featured);
};

export const getProductById = (id: string) => {
  return products.find((product) => product.id === id);
};

export const getProductsByCategory = (category: 'jam' | 'honey') => {
  return products.filter((product) => product.category === category);
};
