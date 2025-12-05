import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { CasinoHeader } from '@/components/casino/CasinoHeader';
import { CaseGrid } from '@/components/casino/CaseGrid';
import { InventoryDialog } from '@/components/casino/InventoryDialog';
import { UpgradeDialog } from '@/components/casino/UpgradeDialog';
import { generateCases, itemTemplates, rarityBorders, InventoryItem } from '@/components/casino/types';

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

  const totalInventoryValue = inventory.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <CasinoHeader
        balance={balance}
        inventoryCount={inventory.length}
        onUpgradeClick={() => setIsUpgradeOpen(true)}
        onInventoryClick={() => setIsInventoryOpen(true)}
        onProfileClick={() => setIsProfileOpen(true)}
      />

      <CaseGrid
        cases={cases}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenCase={openCase}
        balance={balance}
        openingCase={openingCase}
      />

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

      <InventoryDialog
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
        inventory={inventory}
        onSellItem={sellItem}
      />

      <UpgradeDialog
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
        inventory={inventory}
        selectedItem={selectedItem}
        onSelectItem={setSelectedItem}
        onUpgrade={upgradeItem}
        upgrading={upgrading}
      />

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
