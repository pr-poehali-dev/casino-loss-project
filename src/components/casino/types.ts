export interface CaseItem {
  id: number;
  name: string;
  image: string;
  price: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface InventoryItem {
  id: string;
  name: string;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  value: number;
  level: number;
  type: 'car' | 'house' | 'pig' | 'money';
}

export const generateCases = () => {
  const caseTypes = [
    { name: 'Мега Джекпот', image: '💰', rarity: 'legendary' as const, basePrice: 50000 },
    { name: 'Элитный Сейф', image: '🏆', rarity: 'legendary' as const, basePrice: 45000 },
    { name: 'Золотой Куб', image: '🎁', rarity: 'legendary' as const, basePrice: 40000 },
    { name: 'Платиновый Ящик', image: '📦', rarity: 'epic' as const, basePrice: 25000 },
    { name: 'Алмазная Коробка', image: '💎', rarity: 'epic' as const, basePrice: 20000 },
    { name: 'Премиум Кейс', image: '⭐', rarity: 'epic' as const, basePrice: 15000 },
    { name: 'Серебряный Сундук', image: '🎯', rarity: 'rare' as const, basePrice: 8000 },
    { name: 'Бронзовый Контейнер', image: '📮', rarity: 'rare' as const, basePrice: 5000 },
    { name: 'Простой Кейс', image: '🎲', rarity: 'common' as const, basePrice: 2000 },
    { name: 'Стартовый Набор', image: '🎪', rarity: 'common' as const, basePrice: 1000 },
  ];

  const cases = [];
  for (let i = 0; i < 100; i++) {
    const template = caseTypes[i % caseTypes.length];
    const priceVariation = Math.random() * 0.4 - 0.2;
    cases.push({
      id: i + 1,
      name: `${template.name} #${Math.floor(i / 10) + 1}`,
      price: Math.round(template.basePrice * (1 + priceVariation)),
      image: template.image,
      rarity: template.rarity,
      description: `Кейс уровня ${template.rarity}`
    });
  }
  return cases;
};

export const itemTemplates = [
  { type: 'car' as const, name: 'Lamborghini', image: '🏎️', baseValue: 80000, rarity: 'legendary' as const },
  { type: 'car' as const, name: 'Ferrari', image: '🚗', baseValue: 70000, rarity: 'legendary' as const },
  { type: 'car' as const, name: 'Porsche', image: '🚙', baseValue: 50000, rarity: 'epic' as const },
  { type: 'car' as const, name: 'BMW', image: '🚕', baseValue: 30000, rarity: 'epic' as const },
  { type: 'car' as const, name: 'Mercedes', image: '🚘', baseValue: 25000, rarity: 'rare' as const },
  { type: 'car' as const, name: 'Toyota', image: '🚐', baseValue: 15000, rarity: 'rare' as const },
  { type: 'car' as const, name: 'Велосипед', image: '🚲', baseValue: 5000, rarity: 'common' as const },
  
  { type: 'house' as const, name: 'Мега Особняк', image: '🏰', baseValue: 100000, rarity: 'legendary' as const },
  { type: 'house' as const, name: 'Пентхаус', image: '🏢', baseValue: 75000, rarity: 'legendary' as const },
  { type: 'house' as const, name: 'Вилла', image: '🏛️', baseValue: 55000, rarity: 'epic' as const },
  { type: 'house' as const, name: 'Коттедж', image: '🏡', baseValue: 35000, rarity: 'epic' as const },
  { type: 'house' as const, name: 'Квартира', image: '🏠', baseValue: 20000, rarity: 'rare' as const },
  { type: 'house' as const, name: 'Студия', image: '🏘️', baseValue: 12000, rarity: 'rare' as const },
  { type: 'house' as const, name: 'Комната', image: '🏚️', baseValue: 6000, rarity: 'common' as const },
  
  { type: 'pig' as const, name: 'Золотая Свинка', image: '🐷', baseValue: 60000, rarity: 'legendary' as const },
  { type: 'pig' as const, name: 'Алмазная Свинка', image: '🐖', baseValue: 45000, rarity: 'epic' as const },
  { type: 'pig' as const, name: 'Серебряная Свинка', image: '🐽', baseValue: 25000, rarity: 'rare' as const },
  { type: 'pig' as const, name: 'Бронзовая Свинка', image: '🐗', baseValue: 10000, rarity: 'common' as const },
  
  { type: 'money' as const, name: 'Куча Денег', image: '💰', baseValue: 50000, rarity: 'legendary' as const },
  { type: 'money' as const, name: 'Мешок Денег', image: '💵', baseValue: 35000, rarity: 'epic' as const },
  { type: 'money' as const, name: 'Пачка Купюр', image: '💴', baseValue: 20000, rarity: 'rare' as const },
  { type: 'money' as const, name: 'Монеты', image: '🪙', baseValue: 8000, rarity: 'common' as const },
];

export const rarityColors = {
  common: 'from-gray-600 to-gray-800',
  rare: 'from-blue-600 to-blue-800',
  epic: 'from-purple-600 to-purple-800',
  legendary: 'from-yellow-500 to-orange-600'
};

export const rarityBorders = {
  common: 'border-gray-500',
  rare: 'border-blue-500',
  epic: 'border-purple-500',
  legendary: 'border-yellow-500'
};
