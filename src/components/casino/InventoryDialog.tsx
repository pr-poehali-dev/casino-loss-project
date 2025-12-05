import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { InventoryItem, rarityColors, rarityBorders } from './types';

interface InventoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  inventory: InventoryItem[];
  onSellItem: (item: InventoryItem) => void;
}

export const InventoryDialog = ({
  isOpen,
  onClose,
  inventory,
  onSellItem
}: InventoryDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
                      onClick={() => onSellItem(item)}
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
  );
};
