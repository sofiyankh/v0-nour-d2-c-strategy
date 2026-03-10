export interface Product {
  id: string
  name: string
  nameAr: string
  category: 'skincare' | 'makeup'
  price: number
  image: string
  description: string
  descriptionAr: string
  ingredients: string[]
  rating: number
  reviews: number
  inStock: boolean
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Argan Oil Face Serum',
    nameAr: 'سيروم زيت الأرغان للوجه',
    category: 'skincare',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop',
    description: 'Luxurious argan oil serum enriched with Tunisian argan from the south. Perfect for all skin types, provides deep hydration and natural glow.',
    descriptionAr: 'سيروم زيت الأرغان الفاخر المستخرج من المناطق الجنوبية في تونس. مناسب لجميع أنواع البشرة ويوفر ترطيبًا عميقًا وإشراقة طبيعية.',
    ingredients: ['Argan Oil', 'Vitamin E', 'Rose Hip'],
    rating: 4.8,
    reviews: 124,
    inStock: true,
  },
  {
    id: '2',
    name: 'Pomegranate Moisturizer',
    nameAr: 'مرطب الرمان',
    category: 'skincare',
    price: 52.99,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop',
    description: 'Rich moisturizer with pomegranate extract from Tunisia. Antioxidant-rich formula that protects and rejuvenates Mediterranean skin.',
    descriptionAr: 'مرطب غني بمستخلص الرمان التونسي. صيغة غنية بمضادات الأكسدة تحمي وتجدد بشرة البحر المتوسط.',
    ingredients: ['Pomegranate Extract', 'Shea Butter', 'Aloe Vera'],
    rating: 4.7,
    reviews: 89,
    inStock: true,
  },
  {
    id: '3',
    name: 'Rose Water Toner',
    nameAr: 'تونر ماء الورد',
    category: 'skincare',
    price: 38.99,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop',
    description: 'Refreshing toner made with Tunisian rose water. Balances skin pH and prepares skin for serum application.',
    descriptionAr: 'تونر منعش مصنوع من ماء الورد التونسي. يوازن درجة حموضة البشرة ويجهزها لامتصاص السيروم.',
    ingredients: ['Rose Water', 'Glycerin', 'Witch Hazel'],
    rating: 4.6,
    reviews: 76,
    inStock: true,
  },
  {
    id: '4',
    name: 'Olive Oil Lip Balm',
    nameAr: 'بلسم الشفاه بزيت الزيتون',
    category: 'skincare',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop',
    description: 'Nourishing lip balm with premium Tunisian olive oil. Keeps lips soft and hydrated throughout the day.',
    descriptionAr: 'بلسم الشفاه الغني بزيت الزيتون التونسي الفاخر. يحافظ على نعومة ورطوبة الشفاه طوال اليوم.',
    ingredients: ['Olive Oil', 'Beeswax', 'Vitamin E'],
    rating: 4.9,
    reviews: 203,
    inStock: true,
  },
  {
    id: '5',
    name: 'Liquid Foundation - Warm Honey',
    nameAr: 'أساس سائل - عسل دافئ',
    category: 'makeup',
    price: 42.99,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: 'Long-lasting liquid foundation with natural finish. Engineered for warm Mediterranean skin tones. Covers 12 hours.',
    descriptionAr: 'أساس سائل طويل الأمد مع إنهاء طبيعي. مصمم لدرجات البشرة الدافئة في منطقة البحر المتوسط. يستمر 12 ساعة.',
    ingredients: ['Argan Oil', 'Hyaluronic Acid', 'SPF 20'],
    rating: 4.7,
    reviews: 145,
    inStock: true,
  },
  {
    id: '6',
    name: 'Matte Lipstick - Terracotta Rose',
    nameAr: 'أحمر شفاه مات - ورد تيراكوتا',
    category: 'makeup',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1615636820615-7f45925cb483?w=500&h=500&fit=crop',
    description: 'Stunning matte lipstick in terracotta rose. Velvety texture that lasts all day without drying lips.',
    descriptionAr: 'أحمر شفاه مات مذهل بلون ورد تيراكوتا. نسيج ناعم يدوم طوال اليوم دون تجفيف الشفاه.',
    ingredients: ['Plant Waxes', 'Shea Butter', 'Color from Natural Sources'],
    rating: 4.8,
    reviews: 92,
    inStock: true,
  },
  {
    id: '7',
    name: 'Cream Blush - Coral Sunset',
    nameAr: 'أحمر خدود كريمي - غروب المرجان',
    category: 'makeup',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: 'Gorgeous cream blush in coral sunset. Blends seamlessly for a natural flush on cheeks.',
    descriptionAr: 'أحمر خدود كريمي جميل بلون غروب المرجان. يندمج بسلاسة لإعطاء وردية طبيعية على الخدين.',
    ingredients: ['Argan Oil', 'Pomegranate Extract', 'Mica'],
    rating: 4.6,
    reviews: 78,
    inStock: true,
  },
  {
    id: '8',
    name: 'Eye Shadow Palette - Sahara',
    nameAr: 'لوحة ظلال العيون - الصحراء',
    category: 'makeup',
    price: 55.99,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: '12-color eyeshadow palette inspired by Saharan sunsets. Highly pigmented and blendable.',
    descriptionAr: 'لوحة ظلال عيون بـ 12 لونًا مستوحاة من غروب الشمس الصحراوي. ألوان عالية التركيز وسهلة الدمج.',
    ingredients: ['Talc-free', 'Argan Oil', 'Natural Mineral Colors'],
    rating: 4.9,
    reviews: 167,
    inStock: true,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getProductsByCategory(category: 'skincare' | 'makeup'): Product[] {
  return products.filter(product => product.category === category)
}
