import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface CasinoHeaderProps {
  balance: number;
  inventoryCount: number;
  onUpgradeClick: () => void;
  onInventoryClick: () => void;
  onProfileClick: () => void;
}

export const CasinoHeader = ({
  balance,
  inventoryCount,
  onUpgradeClick,
  onInventoryClick,
  onProfileClick
}: CasinoHeaderProps) => {
  return (
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
              onClick={onUpgradeClick}
              variant="outline"
              className="border-purple-500 hover:bg-purple-500/10 gap-2"
            >
              <Icon name="Zap" size={20} />
              <span className="hidden md:inline">Прокачка</span>
            </Button>

            <Button
              onClick={onInventoryClick}
              variant="outline"
              className="border-gold/50 hover:bg-gold/10 gap-2"
            >
              <Icon name="Package" size={20} />
              <span className="hidden md:inline">Инвентарь</span> ({inventoryCount})
            </Button>

            <Button
              onClick={onProfileClick}
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
  );
};
