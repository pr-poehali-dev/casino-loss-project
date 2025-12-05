import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface CaseItem {
  id: number;
  name: string;
  image: string;
  price: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface InventoryItem {
  id: number;
  name: string;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  value: number;
}

const cases = [
  {
    id: 1,
    name: 'Diamond Elite',
    price: 5000,
    image: '💎',
    rarity: 'legendary' as const,
    description: 'Эксклюзивные призы премиум класса'
  },
  {
    id: 2,
    name: 'Gold Rush',
    price: 2500,
    image: '👑',
    rarity: 'epic' as const,
    description: 'Золотые награды для победителей'
  },
  {
    id: 3,
    name: 'Platinum Box',
    price: 1500,
    image: '⭐',
    rarity: 'epic' as const,
    description: 'Платиновая коллекция предметов'
  },
  {
    id: 4,
    name: 'Silver Case',
    price: 800,
    image: '🎁',
    rarity: 'rare' as const,
    description: 'Серебряные сокровища'
  },
  {
    id: 5,
    name: 'Bronze Chest',
    price: 400,
    image: '📦',
    rarity: 'rare' as const,
    description: 'Бронзовый набор наград'
  },
  {
    id: 6,
    name: 'Starter Pack',
    price: 150,
    image: '🎲',
    rarity: 'common' as const,
    description: 'Стартовый набор для новичков'
  }
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
  const [balance, setBalance] = useState(10000);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [openingCase, setOpeningCase] = useState<number | null>(null);
  const [wonItem, setWonItem] = useState<InventoryItem | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const possibleItems: CaseItem[] = [
    { id: 1, name: 'Золотой Слиток', image: '🥇', price: 5000, rarity: 'legendary' },
    { id: 2, name: 'Бриллиант', image: '💎', price: 4000, rarity: 'legendary' },
    { id: 3, name: 'Платиновая Монета', image: '🪙', price: 2000, rarity: 'epic' },
    { id: 4, name: 'Изумруд', image: '💚', price: 1500, rarity: 'epic' },
    { id: 5, name: 'Рубин', image: '❤️', price: 1000, rarity: 'rare' },
    { id: 6, name: 'Сапфир', image: '💙', price: 800, rarity: 'rare' },
    { id: 7, name: 'Серебряная Монета', image: '⚪', price: 300, rarity: 'common' },
    { id: 8, name: 'Бронзовая Монета', image: '🟤', price: 150, rarity: 'common' }
  ];

  const openCase = (caseItem: typeof cases[0]) => {
    if (balance < caseItem.price) {
      alert('Недостаточно средств!');
      return;
    }

    setBalance(balance - caseItem.price);
    setOpeningCase(caseItem.id);

    setTimeout(() => {
      const filteredItems = possibleItems.filter(item => {
        if (caseItem.rarity === 'legendary') return true;
        if (caseItem.rarity === 'epic') return item.rarity !== 'legendary';
        if (caseItem.rarity === 'rare') return item.rarity === 'rare' || item.rarity === 'common';
        return item.rarity === 'common';
      });

      const randomItem = filteredItems[Math.floor(Math.random() * filteredItems.length)];
      const newItem: InventoryItem = {
        ...randomItem,
        value: randomItem.price
      };

      setInventory([...inventory, newItem]);
      setWonItem(newItem);
      setOpeningCase(null);
    }, 2000);
  };

  const filteredCases = activeTab === 'all' 
    ? cases 
    : cases.filter(c => c.rarity === activeTab);

  const totalInventoryValue = inventory.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <header className="border-b border-gold/20 bg-black/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-2xl">
                💎
              </div>
              <h1 className="text-3xl font-bold gold-text-gradient">Royal Cases</h1>
            </div>

            <div className="flex items-center gap-4">
              <Card className="bg-black/60 border-gold/30 px-6 py-2 premium-shadow">
                <div className="flex items-center gap-2">
                  <Icon name="Coins" className="text-gold" size={20} />
                  <span className="text-gold font-bold text-lg">{balance.toLocaleString()}</span>
                </div>
              </Card>

              <Button
                onClick={() => setIsInventoryOpen(true)}
                variant="outline"
                className="border-gold/50 hover:bg-gold/10 gap-2"
              >
                <Icon name="Package" size={20} />
                Инвентарь ({inventory.length})
              </Button>

              <Button
                onClick={() => setIsProfileOpen(true)}
                variant="ghost"
                className="hover:bg-gold/10"
              >
                <Avatar className="w-8 h-8 border-2 border-gold">
                  <AvatarFallback className="bg-gold text-black font-bold">P</AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold mb-4 gold-text-gradient">
            Премиум Кейсы
          </h2>
          <p className="text-gray-400 text-lg">
            Откройте кейс и выиграйте эксклюзивные призы
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl mx-auto bg-black/60 border border-gold/20">
            <TabsTrigger value="all" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Все
            </TabsTrigger>
            <TabsTrigger value="legendary" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Легендарные
            </TabsTrigger>
            <TabsTrigger value="epic" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Эпические
            </TabsTrigger>
            <TabsTrigger value="rare" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Редкие
            </TabsTrigger>
            <TabsTrigger value="common" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Обычные
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((caseItem) => (
            <Card
              key={caseItem.id}
              className={`group relative overflow-hidden bg-gradient-to-br ${rarityColors[caseItem.rarity]} border-2 ${rarityBorders[caseItem.rarity]} hover:scale-105 transition-all duration-300 premium-shadow hover:gold-glow cursor-pointer`}
            >
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="text-8xl mb-4 animate-pulse-glow">{caseItem.image}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{caseItem.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">{caseItem.description}</p>
                  <Badge variant="outline" className="text-white border-white/50 mb-4">
                    {caseItem.rarity.toUpperCase()}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg">
                    <span className="text-gray-300">Цена:</span>
                    <div className="flex items-center gap-2">
                      <Icon name="Coins" className="text-gold" size={18} />
                      <span className="text-gold font-bold text-lg">
                        {caseItem.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => openCase(caseItem)}
                    disabled={balance < caseItem.price || openingCase !== null}
                    className="w-full gold-gradient text-black font-bold text-lg py-6 hover:opacity-90 disabled:opacity-50"
                  >
                    {openingCase === caseItem.id ? (
                      <div className="flex items-center gap-2">
                        <Icon name="Loader2" className="animate-spin" size={20} />
                        Открываем...
                      </div>
                    ) : (
                      'Открыть кейс'
                    )}
                  </Button>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </Card>
          ))}
        </div>
      </main>

      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="bg-gradient-to-br from-gray-900 to-black border-gold/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold gold-text-gradient">Профиль игрока</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20 border-4 border-gold">
                <AvatarFallback className="bg-gold text-black font-bold text-2xl">P</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold">Player #12345</h3>
                <Badge className="bg-gold text-black">VIP</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-black/60 border-gold/30 p-4">
                <div className="text-center">
                  <Icon name="Coins" className="text-gold mx-auto mb-2" size={24} />
                  <p className="text-gray-400 text-sm">Баланс</p>
                  <p className="text-2xl font-bold text-gold">{balance.toLocaleString()}</p>
                </div>
              </Card>

              <Card className="bg-black/60 border-gold/30 p-4">
                <div className="text-center">
                  <Icon name="Package" className="text-gold mx-auto mb-2" size={24} />
                  <p className="text-gray-400 text-sm">Предметов</p>
                  <p className="text-2xl font-bold text-gold">{inventory.length}</p>
                </div>
              </Card>

              <Card className="bg-black/60 border-gold/30 p-4">
                <div className="text-center">
                  <Icon name="TrendingUp" className="text-gold mx-auto mb-2" size={24} />
                  <p className="text-gray-400 text-sm">Ценность</p>
                  <p className="text-2xl font-bold text-gold">{totalInventoryValue.toLocaleString()}</p>
                </div>
              </Card>

              <Card className="bg-black/60 border-gold/30 p-4">
                <div className="text-center">
                  <Icon name="Trophy" className="text-gold mx-auto mb-2" size={24} />
                  <p className="text-gray-400 text-sm">Уровень</p>
                  <p className="text-2xl font-bold text-gold">15</p>
                </div>
              </Card>
            </div>

            <Button
              onClick={() => setBalance(balance + 5000)}
              className="w-full gold-gradient text-black font-bold"
            >
              <Icon name="Plus" className="mr-2" size={20} />
              Пополнить баланс
            </Button>
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
                {inventory.map((item, index) => (
                  <Card
                    key={index}
                    className={`bg-gradient-to-br ${rarityColors[item.rarity]} border-2 ${rarityBorders[item.rarity]} p-4 hover:scale-105 transition-all`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">{item.image}</div>
                      <h4 className="text-white font-bold text-sm mb-1">{item.name}</h4>
                      <div className="flex items-center justify-center gap-1 text-gold text-xs">
                        <Icon name="Coins" size={12} />
                        <span>{item.value.toLocaleString()}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
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
                <Icon name="Coins" size={28} />
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
