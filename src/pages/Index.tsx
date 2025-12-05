import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface CaseItem {
  id: number;
  name: string;
  image: string;
  price: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface InventoryItem {
  id: string;
  name: string;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  value: number;
  level: number;
  type: 'car' | 'house' | 'pig' | 'money';
}

const generateCases = () => {
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

const itemTemplates = [
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

const rarityColors = {
  common: 'from-gray-600 to-gray-800',
  rare: 'from-blue-600 to-blue-800',
  epic: 'from-purple-600 to-purple-800',
  legendary: 'from-yellow-500 to-orange-600'
};

const rarityBorders = {
  common: 'border-gray-500',
  rare: 'border-blue-500',
  epic: 'border-purple-500',
  legendary: 'border-yellow-500'
};

const Index = () => {
  const [balance, setBalance] = useState(1000000);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [openingCase, setOpeningCase] = useState<number | null>(null);
  const [wonItem, setWonItem] = useState<InventoryItem | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [upgrading, setUpgrading] = useState(false);

  const cases = generateCases();

  const openCase = (caseItem: typeof cases[0]) => {
    if (balance < caseItem.price) {
      alert('Недостаточно кристаллов!');
      return;
    }

    setBalance(balance - caseItem.price);
    setOpeningCase(caseItem.id);

    setTimeout(() => {
      const filteredItems = itemTemplates.filter(item => {
        if (caseItem.rarity === 'legendary') return true;
        if (caseItem.rarity === 'epic') return item.rarity !== 'legendary';
        if (caseItem.rarity === 'rare') return item.rarity === 'rare' || item.rarity === 'common';
        return item.rarity === 'common';
      });

      const randomTemplate = filteredItems[Math.floor(Math.random() * filteredItems.length)];
      const valueVariation = Math.random() * 0.3 - 0.15;
      
      const newItem: InventoryItem = {
        id: `${Date.now()}-${Math.random()}`,
        name: randomTemplate.name,
        image: randomTemplate.image,
        rarity: randomTemplate.rarity,
        value: Math.round(randomTemplate.baseValue * (1 + valueVariation)),
        level: 1,
        type: randomTemplate.type
      };

      setInventory([...inventory, newItem]);
      setWonItem(newItem);
      setOpeningCase(null);
    }, 2000);
  };

  const sellItem = (item: InventoryItem) => {
    setBalance(balance + item.value);
    setInventory(inventory.filter(i => i.id !== item.id));
  };

  const upgradeItem = (item: InventoryItem) => {
    setUpgrading(true);
    
    setTimeout(() => {
      const success = Math.random() > 0.3;
      
      if (success) {
        const newLevel = item.level + 1;
        const newValue = Math.round(item.value * 1.5);
        
        setInventory(inventory.map(i => 
          i.id === item.id 
            ? { ...i, level: newLevel, value: newValue }
            : i
        ));
        setSelectedItem({ ...item, level: newLevel, value: newValue });
      } else {
        setInventory(inventory.filter(i => i.id !== item.id));
        setSelectedItem(null);
        setIsUpgradeOpen(false);
      }
      
      setUpgrading(false);
    }, 1500);
  };

  const filteredCases = activeTab === 'all' 
    ? cases 
    : cases.filter(c => c.rarity === activeTab);

  const totalInventoryValue = inventory.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <header className="border-b border-gold/20 bg-black/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-2xl">
                🎰
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold gold-text-gradient">Казино Кимпинтяу</h1>
                <p className="text-xs text-gray-400">by Витали & Серега</p>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4 flex-wrap">
              <Card className="bg-black/60 border-gold/30 px-4 py-2 premium-shadow">
                <div className="flex items-center gap-2">
                  <Icon name="Gem" className="text-gold" size={20} />
                  <span className="text-gold font-bold text-sm md:text-lg">{balance.toLocaleString()}</span>
                </div>
              </Card>

              <Button
                onClick={() => setIsUpgradeOpen(true)}
                variant="outline"
                className="border-purple-500 hover:bg-purple-500/10 gap-2"
              >
                <Icon name="Zap" size={20} />
                <span className="hidden md:inline">Прокачка</span>
              </Button>

              <Button
                onClick={() => setIsInventoryOpen(true)}
                variant="outline"
                className="border-gold/50 hover:bg-gold/10 gap-2"
              >
                <Icon name="Package" size={20} />
                <span className="hidden md:inline">Инвентарь</span> ({inventory.length})
              </Button>

              <Button
                onClick={() => setIsProfileOpen(true)}
                variant="ghost"
                className="hover:bg-gold/10"
              >
                <Avatar className="w-8 h-8 border-2 border-gold">
                  <AvatarFallback className="bg-gold text-black font-bold">VIP</AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 gold-text-gradient">
            100 Премиум Кейсов
          </h2>
          <p className="text-gray-400 text-sm md:text-lg">
            Открывай кейсы, получай предметы и прокачивай их!
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl mx-auto bg-black/60 border border-gold/20">
            <TabsTrigger value="all" className="data-[state=active]:bg-gold data-[state=active]:text-black text-xs md:text-sm">
              Все
            </TabsTrigger>
            <TabsTrigger value="legendary" className="data-[state=active]:bg-gold data-[state=active]:text-black text-xs md:text-sm">
              VIP
            </TabsTrigger>
            <TabsTrigger value="epic" className="data-[state=active]:bg-gold data-[state=active]:text-black text-xs md:text-sm">
              Эпик
            </TabsTrigger>
            <TabsTrigger value="rare" className="data-[state=active]:bg-gold data-[state=active]:text-black text-xs md:text-sm">
              Редкие
            </TabsTrigger>
            <TabsTrigger value="common" className="data-[state=active]:bg-gold data-[state=active]:text-black text-xs md:text-sm">
              Базовые
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredCases.map((caseItem) => (
            <Card
              key={caseItem.id}
              className={`group relative overflow-hidden bg-gradient-to-br ${rarityColors[caseItem.rarity]} border-2 ${rarityBorders[caseItem.rarity]} hover:scale-105 transition-all duration-300 premium-shadow hover:gold-glow cursor-pointer`}
            >
              <div className="p-3 md:p-4">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl mb-2">{caseItem.image}</div>
                  <h3 className="text-sm md:text-base font-bold text-white mb-1 line-clamp-1">{caseItem.name}</h3>
                  <Badge variant="outline" className="text-white border-white/50 text-xs mb-2">
                    {caseItem.rarity.toUpperCase()}
                  </Badge>
                  
                  <div className="flex items-center justify-center gap-1 mb-2 text-gold text-xs md:text-sm">
                    <Icon name="Gem" size={14} />
                    <span className="font-bold">{caseItem.price.toLocaleString()}</span>
                  </div>

                  <Button
                    onClick={() => openCase(caseItem)}
                    disabled={balance < caseItem.price || openingCase !== null}
                    className="w-full gold-gradient text-black font-bold text-xs md:text-sm py-2 hover:opacity-90 disabled:opacity-50"
                  >
                    {openingCase === caseItem.id ? (
                      <Icon name="Loader2" className="animate-spin" size={16} />
                    ) : (
                      'Открыть'
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="bg-gradient-to-br from-gray-900 to-black border-gold/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold gold-text-gradient">Профиль VIP игрока</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20 border-4 border-gold">
                <AvatarFallback className="bg-gold text-black font-bold text-2xl">VIP</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold">Витали & Серега</h3>
                <Badge className="bg-gold text-black">Основатели</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-black/60 border-gold/30 p-4">
                <div className="text-center">
                  <Icon name="Gem" className="text-gold mx-auto mb-2" size={24} />
                  <p className="text-gray-400 text-sm">Кристаллы</p>
                  <p className="text-xl font-bold text-gold">{balance.toLocaleString()}</p>
                </div>
              </Card>

              <Card className="bg-black/60 border-gold/30 p-4">
                <div className="text-center">
                  <Icon name="Package" className="text-gold mx-auto mb-2" size={24} />
                  <p className="text-gray-400 text-sm">Предметов</p>
                  <p className="text-xl font-bold text-gold">{inventory.length}</p>
                </div>
              </Card>

              <Card className="bg-black/60 border-gold/30 p-4">
                <div className="text-center">
                  <Icon name="TrendingUp" className="text-gold mx-auto mb-2" size={24} />
                  <p className="text-gray-400 text-sm">Ценность</p>
                  <p className="text-xl font-bold text-gold">{totalInventoryValue.toLocaleString()}</p>
                </div>
              </Card>

              <Card className="bg-black/60 border-gold/30 p-4">
                <div className="text-center">
                  <Icon name="Trophy" className="text-gold mx-auto mb-2" size={24} />
                  <p className="text-gray-400 text-sm">Уровень</p>
                  <p className="text-xl font-bold text-gold">100</p>
                </div>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isInventoryOpen} onOpenChange={setIsInventoryOpen}>
        <DialogContent className="bg-gradient-to-br from-gray-900 to-black border-gold/30 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold gold-text-gradient">Инвентарь</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            {inventory.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Package" className="text-gray-600 mx-auto mb-4" size={64} />
                <p className="text-gray-400 text-lg">Ваш инвентарь пуст</p>
                <p className="text-gray-500 text-sm">Откройте кейс, чтобы получить предметы</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {inventory.map((item) => (
                  <Card
                    key={item.id}
                    className={`bg-gradient-to-br ${rarityColors[item.rarity]} border-2 ${rarityBorders[item.rarity]} p-4 hover:scale-105 transition-all`}
                  >
                    <div className="text-center space-y-2">
                      <div className="relative">
                        <div className="text-4xl">{item.image}</div>
                        {item.level > 1 && (
                          <Badge className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs">
                            Lvl {item.level}
                          </Badge>
                        )}
                      </div>
                      <h4 className="text-white font-bold text-sm">{item.name}</h4>
                      <div className="flex items-center justify-center gap-1 text-gold text-xs">
                        <Icon name="Gem" size={12} />
                        <span>{item.value.toLocaleString()}</span>
                      </div>
                      <Button
                        onClick={() => sellItem(item)}
                        size="sm"
                        className="w-full bg-green-600 hover:bg-green-700 text-white text-xs"
                      >
                        Продать
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={isUpgradeOpen} onOpenChange={setIsUpgradeOpen}>
        <DialogContent className="bg-gradient-to-br from-gray-900 to-black border-purple-500 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Прокачка Предметов
            </DialogTitle>
          </DialogHeader>
          
          {!selectedItem ? (
            <ScrollArea className="h-[500px] pr-4">
              {inventory.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Zap" className="text-gray-600 mx-auto mb-4" size={64} />
                  <p className="text-gray-400 text-lg">Нет предметов для прокачки</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {inventory.map((item) => (
                    <Card
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`bg-gradient-to-br ${rarityColors[item.rarity]} border-2 ${rarityBorders[item.rarity]} p-4 hover:scale-105 transition-all cursor-pointer`}
                    >
                      <div className="text-center space-y-2">
                        <div className="relative">
                          <div className="text-4xl">{item.image}</div>
                          {item.level > 1 && (
                            <Badge className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs">
                              Lvl {item.level}
                            </Badge>
                          )}
                        </div>
                        <h4 className="text-white font-bold text-sm">{item.name}</h4>
                        <div className="flex items-center justify-center gap-1 text-gold text-xs">
                          <Icon name="Gem" size={12} />
                          <span>{item.value.toLocaleString()}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          ) : (
            <div className="py-6 space-y-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="text-8xl mb-4">{selectedItem.image}</div>
                  <Badge className="absolute -top-2 -right-2 bg-purple-600 text-white">
                    Lvl {selectedItem.level}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-2">{selectedItem.name}</h3>
                <div className="flex items-center justify-center gap-2 text-gold text-xl mb-4">
                  <Icon name="Gem" size={24} />
                  <span>{selectedItem.value.toLocaleString()}</span>
                </div>
              </div>

              <Card className="bg-black/60 border-purple-500/50 p-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Текущий уровень:</span>
                    <span className="text-purple-400 font-bold">Lvl {selectedItem.level}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">После прокачки:</span>
                    <span className="text-green-400 font-bold">Lvl {selectedItem.level + 1}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Новая стоимость:</span>
                    <div className="flex items-center gap-1 text-gold font-bold">
                      <Icon name="Gem" size={14} />
                      <span>{Math.round(selectedItem.value * 1.5).toLocaleString()}</span>
                    </div>
                  </div>
                  <Progress value={70} className="h-2" />
                  <p className="text-xs text-center text-yellow-500">
                    ⚠️ Шанс успеха: 70% | При провале предмет будет утерян!
                  </p>
                </div>
              </Card>

              <div className="flex gap-3">
                <Button
                  onClick={() => setSelectedItem(null)}
                  variant="outline"
                  className="flex-1 border-gray-500"
                  disabled={upgrading}
                >
                  Назад
                </Button>
                <Button
                  onClick={() => upgradeItem(selectedItem)}
                  disabled={upgrading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
                >
                  {upgrading ? (
                    <div className="flex items-center gap-2">
                      <Icon name="Loader2" className="animate-spin" size={20} />
                      Прокачиваем...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Icon name="Zap" size={20} />
                      Прокачать
                    </div>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={wonItem !== null} onOpenChange={() => setWonItem(null)}>
        <DialogContent className="bg-gradient-to-br from-gray-900 to-black border-gold/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold gold-text-gradient text-center">
              🎉 Поздравляем! 🎉
            </DialogTitle>
          </DialogHeader>
          {wonItem && (
            <div className="py-8 text-center animate-slide-up">
              <div className="text-9xl mb-6 animate-pulse-glow">{wonItem.image}</div>
              <h3 className="text-3xl font-bold text-white mb-4">{wonItem.name}</h3>
              <Badge
                variant="outline"
                className={`text-lg px-4 py-2 mb-6 ${rarityBorders[wonItem.rarity]} border-2`}
              >
                {wonItem.rarity.toUpperCase()}
              </Badge>
              <div className="flex items-center justify-center gap-2 text-gold text-2xl font-bold mb-6">
                <Icon name="Gem" size={28} />
                <span>{wonItem.value.toLocaleString()}</span>
              </div>
              <Button
                onClick={() => setWonItem(null)}
                className="w-full gold-gradient text-black font-bold text-lg py-6"
              >
                Забрать приз
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
