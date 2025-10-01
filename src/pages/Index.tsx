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
    image: 'https://cdn.poehali.dev/files/e25cb8a5-73a4-4e06-a9cd-34bd57eebc64.jpg',
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 2,
    title: '2 месяца бесплатного обучения',
    description: 'Доступ ко всем курсам',
    icon: 'GraduationCap',
    image: null,
    color: 'from-[#2563EB] to-[#1D4ED8]',
    logo: 'https://cdn.poehali.dev/files/787cee36-2846-406d-b45e-97b75e9ffc6a.png'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden relative">
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
        {!showPrize && (
          <div className="text-center mb-8 animate-bounce-in">
            <div className="relative inline-block mb-4 sm:mb-6">
              <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl scale-110"></div>
              <img 
                src="https://cdn.poehali.dev/files/852c4581-a58a-453f-a7ee-24c45a892a49.png" 
                alt="Логотип Сотка" 
                className="relative h-24 sm:h-32 md:h-40 lg:h-48 drop-shadow-2xl border-2 sm:border-4 border-white rounded-2xl sm:rounded-3xl bg-blue-600 p-2 sm:p-3 md:p-4"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-4 drop-shadow-lg px-2">
              Беспроигрышная лотерея
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 font-medium px-2">
              Каждый участник — победитель!
            </p>
          </div>
        )}

        {!wonPrize && (
          <div className="flex justify-center mb-8 sm:mb-12">
            <Button
              onClick={handleSpin}
              disabled={isSpinning}
              size="lg"
              className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold text-lg sm:text-xl md:text-2xl py-4 px-8 sm:py-6 sm:px-12 md:py-8 md:px-16 rounded-full shadow-2xl transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border-2 sm:border-4 border-white"
            >
              {isSpinning ? (
                <span className="flex items-center gap-2 sm:gap-3">
                  <Icon name="Loader2" className="animate-spin" size={24} />
                  <span className="hidden sm:inline">Крутим барабан...</span>
                  <span className="sm:hidden">Крутим...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2 sm:gap-3">
                  <Icon name="Sparkles" size={24} />
                  <span className="hidden sm:inline">Крутить барабан</span>
                  <span className="sm:hidden">Крутить</span>
                </span>
              )}
            </Button>
          </div>
        )}

        {isSpinning && (
          <div className="flex flex-col items-center mb-8 sm:mb-12">
            <div className="relative w-64 h-32 sm:w-80 sm:h-40 bg-white/20 backdrop-blur-sm border-2 sm:border-4 border-white shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px bg-white/50"></div>
              </div>
              <div className="animate-slot-roll">
                {[...prizes, ...prizes, ...prizes, ...prizes, ...prizes].map((prize, idx) => (
                  <div key={idx} className="h-32 sm:h-40 flex items-center justify-center">
                    <Icon name={prize.icon} size={60} className="text-white sm:w-20 sm:h-20" />
                  </div>
                ))}
              </div>
            </div>
            <p className="text-white text-lg sm:text-xl md:text-2xl font-bold mt-4 sm:mt-6 animate-pulse px-4 text-center">
              Определяем победителя...
            </p>
          </div>
        )}

        {wonPrize && showPrize && (
          <div className="animate-prize-reveal">
            {wonPrize.image ? (
              <div className="relative text-center flex flex-col items-center justify-center min-h-[70vh]">
                <div className="space-y-6 max-w-2xl px-4">
                  <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white animate-bounce-in tracking-tight mb-8">
                    Поздравляем!
                  </h2>
                  <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: 'url(https://cdn.poehali.dev/files/8a457c01-ea8c-4ba5-9b25-f43cc695b054.png)' }}
                    ></div>
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] animate-shine"></div>
                    </div>
                    <div className="relative z-10">
                      <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg">
                        {wonPrize.title}
                      </p>
                      <p className="text-xl sm:text-2xl text-white drop-shadow-md">
                        {wonPrize.description}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setWonPrize(null);
                    setShowPrize(false);
                  }}
                  size="lg"
                  className="mt-12 bg-white text-[#005BFF] hover:bg-white/90 font-bold text-lg sm:text-xl py-6 px-12 rounded-full shadow-xl transition-all"
                >
                  Новый участник
                </Button>
              </div>
            ) : (
              <div className="relative text-center flex flex-col items-center justify-center min-h-[70vh]">
                <div className="space-y-6 max-w-2xl px-4">
                  <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white animate-bounce-in tracking-tight mb-8">
                    Поздравляем!
                  </h2>
                  <div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl bg-[#2563EB]`}>
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] animate-shine"></div>
                    </div>
                    <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                      <img 
                        src="https://cdn.poehali.dev/files/787cee36-2846-406d-b45e-97b75e9ffc6a.png"
                        alt="Сотка"
                        className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain opacity-40"
                      />
                    </div>
                    <div className="relative z-10">
                      <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg">
                        {wonPrize.title}
                      </p>
                      <p className="text-xl sm:text-2xl text-white drop-shadow-md">
                        {wonPrize.description}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setWonPrize(null);
                    setShowPrize(false);
                  }}
                  size="lg"
                  className="mt-12 bg-white text-[#2563EB] hover:bg-white/90 font-bold text-lg sm:text-xl py-6 px-12 rounded-full shadow-xl transition-all"
                >
                  Новый участник
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;