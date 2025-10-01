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
      }, 500);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-300 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {showPrize && (
        <>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-amber-400 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-5%',
                animationDelay: `${Math.random() * 0.5}s`
              }}
            />
          ))}
        </>
      )}

      <div className="relative z-10 max-w-4xl w-full">
        <div className="text-center mb-8 animate-bounce-in">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl scale-110"></div>
            <img 
              src="https://cdn.poehali.dev/files/852c4581-a58a-453f-a7ee-24c45a892a49.png" 
              alt="Логотип Сотка" 
              className="relative h-40 md:h-48 drop-shadow-2xl border-4 border-white rounded-3xl bg-blue-600 p-4"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            Беспроигрышная лотерея
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-medium">
            Каждый участник — победитель!
          </p>
        </div>

        {!wonPrize && (
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
                  Крутим барабан...
                </span>
              ) : (
                <span className="flex items-center gap-3">
                  <Icon name="Sparkles" size={32} />
                  Крутить барабан
                </span>
              )}
            </Button>
          </div>
        )}

        {isSpinning && (
          <div className="flex justify-center mb-12">
            <Card className="w-64 h-64 bg-white/20 backdrop-blur-sm border-4 border-white shadow-2xl rounded-full flex items-center justify-center animate-wheel-spin">
              <Icon name="CircleDot" size={120} className="text-white" />
            </Card>
          </div>
        )}

        {wonPrize && showPrize && (
          <div className="animate-prize-reveal">
            <Card className={`p-12 bg-gradient-to-br ${wonPrize.color} border-4 border-white shadow-2xl mb-8`}>
              <div className="text-center text-white">
                <div className="mb-8">
                  <Icon name={wonPrize.icon} size={100} className="mx-auto drop-shadow-2xl" />
                </div>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg animate-bounce-in">
                  🎉 ПОЗДРАВЛЯЕМ! 🎉
                </h2>
                <p className="text-2xl md:text-3xl font-medium mb-4 opacity-90">
                  Вы выиграли:
                </p>
                <p className="text-4xl md:text-5xl font-bold mb-4">
                  {wonPrize.title}
                </p>
                <p className="text-2xl md:text-3xl opacity-90">
                  {wonPrize.description}
                </p>
              </div>
            </Card>
            
            <div className="text-center">
              <Button
                onClick={() => {
                  setWonPrize(null);
                  setShowPrize(false);
                }}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold text-xl py-6 px-12 rounded-full shadow-xl"
              >
                Попробовать ещё раз
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;