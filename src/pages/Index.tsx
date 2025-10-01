import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const prizes = [
  {
    id: 1,
    title: '2000 рублей на Озон',
    description: 'Сертификат на покупки в Озон',
    icon: 'Gift',
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 2,
    title: '2 месяца бесплатного обучения',
    description: 'Доступ ко всем курсам',
    icon: 'GraduationCap',
    color: 'from-blue-400 to-blue-600'
  }
];

const Index = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<typeof prizes[0] | null>(null);
  const [showPrize, setShowPrize] = useState(false);

  const handleSpin = () => {
    setIsSpinning(true);
    setShowPrize(false);
    setWonPrize(null);

    setTimeout(() => {
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setWonPrize(randomPrize);
      setIsSpinning(false);
      
      setTimeout(() => {
        setShowPrize(true);
      }, 100);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-300 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        <div className="text-center mb-12 animate-bounce-in">
          <img 
            src="https://cdn.poehali.dev/files/852c4581-a58a-453f-a7ee-24c45a892a49.png" 
            alt="Логотип Сотка" 
            className="h-32 mx-auto mb-8 drop-shadow-2xl"
          />
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            Беспроигрышная лотерея
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-medium">
            Каждый участник — победитель!
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <Button
            onClick={handleSpin}
            disabled={isSpinning}
            size="lg"
            className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold text-2xl py-8 px-16 rounded-full shadow-2xl transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border-4 border-white"
          >
            {isSpinning ? (
              <span className="flex items-center gap-3">
                <Icon name="Loader2" className="animate-spin" size={32} />
                Розыгрыш...
              </span>
            ) : (
              <span className="flex items-center gap-3">
                <Icon name="Sparkles" size={32} />
                Крутить барабан
              </span>
            )}
          </Button>
        </div>

        {wonPrize && showPrize && (
          <Card className={`p-8 bg-gradient-to-br ${wonPrize.color} border-4 border-white shadow-2xl animate-spin-prize`}>
            <div className="text-center text-white">
              <div className="mb-6">
                <Icon name={wonPrize.icon as any} size={80} className="mx-auto drop-shadow-lg" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                Поздравляем! 🎉
              </h2>
              <p className="text-3xl md:text-4xl font-bold mb-2">
                {wonPrize.title}
              </p>
              <p className="text-xl md:text-2xl opacity-90">
                {wonPrize.description}
              </p>
            </div>
          </Card>
        )}

        {!wonPrize && !isSpinning && (
          <div className="grid md:grid-cols-2 gap-6 animate-bounce-in">
            {prizes.map((prize) => (
              <Card 
                key={prize.id} 
                className="p-6 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="text-center text-white">
                  <Icon name={prize.icon as any} size={48} className="mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{prize.title}</h3>
                  <p className="text-blue-100">{prize.description}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
