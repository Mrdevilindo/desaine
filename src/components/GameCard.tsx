import { useState } from 'react';
import { Play } from 'lucide-react';

interface GameCardProps {
  image: string;
  title: string;
  provider?: string;
  price?: string;
  isNew?: boolean;
  wideCard?: boolean;
}

const GameCard = ({ image, title, provider, price, isNew = false, wideCard = false }: GameCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`game-card ${wideCard ? 'aspect-[2/1]' : 'aspect-[4/5]'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={image} alt={title} className="w-full h-full object-cover" />
      
      <div className="overlay">
        {isHovered ? (
          <div className="flex flex-col items-center justify-center absolute inset-0 bg-black/60 transition-opacity duration-300">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 mb-2 transition-transform duration-300 transform hover:scale-110">
              <Play size={24} fill="white" className="ml-1" />
            </button>
            <span className="text-white font-medium text-sm">Play Now</span>
          </div>
        ) : (
          <>
            {isNew && (
              <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-md">
                NEW
              </span>
            )}
            <div className="p-2">
              <h3 className="text-sm font-medium line-clamp-2">{title}</h3>
              {provider && <p className="text-xs text-gray-300">{provider}</p>}
              {price && (
                <div className="bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-md mt-1 inline-block">
                  {price}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GameCard;
