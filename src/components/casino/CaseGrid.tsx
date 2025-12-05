import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { rarityColors, rarityBorders } from './types';

interface CaseGridProps {
  cases: Array<{
    id: number;
    name: string;
    image: string;
    price: number;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    description: string;
  }>;
  activeTab: string;
  onTabChange: (value: string) => void;
  onOpenCase: (caseItem: any) => void;
  balance: number;
  openingCase: number | null;
}

export const CaseGrid = ({
  cases,
  activeTab,
  onTabChange,
  onOpenCase,
  balance,
  openingCase
}: CaseGridProps) => {
  const filteredCases = activeTab === 'all' 
    ? cases 
    : cases.filter(c => c.rarity === activeTab);

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 md:mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 gold-text-gradient">
          100 Премиум Кейсов
        </h2>
        <p className="text-gray-400 text-sm md:text-lg">
          Открывай кейсы, получай предметы и прокачивай их!
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={onTabChange} className="mb-8">
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
                  onClick={() => onOpenCase(caseItem)}
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
  );
};
