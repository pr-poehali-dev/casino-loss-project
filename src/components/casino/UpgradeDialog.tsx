import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { InventoryItem, rarityColors, rarityBorders } from './types';

interface UpgradeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  inventory: InventoryItem[];
  selectedItem: InventoryItem | null;
  onSelectItem: (item: InventoryItem | null) => void;
  onUpgrade: (item: InventoryItem) => void;
  upgrading: boolean;
}

export const UpgradeDialog = ({
  isOpen,
  onClose,
  inventory,
  selectedItem,
  onSelectItem,
  onUpgrade,
  upgrading
}: UpgradeDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
                    onClick={() => onSelectItem(item)}
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
                onClick={() => onSelectItem(null)}
                variant="outline"
                className="flex-1 border-gray-500"
                disabled={upgrading}
              >
                Назад
              </Button>
              <Button
                onClick={() => onUpgrade(selectedItem)}
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
  );
};
