import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const XPCard = ({ currentXP, nextLevelXP, level, badges }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const progressPercentage = currentXP / nextLevelXP * 100;
  const xpToNext = nextLevelXP - currentXP;

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative w-full h-48 perspective-1000 cursor-pointer" onClick={handleCardClick}>
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-primary to-primary-600 rounded-xl shadow-soft-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-heading font-heading-semibold">Level {level}</h3>
              <p className="text-primary-100 text-sm font-body">Theology Student</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <Icon name="Zap" size={24} className="text-white" />
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-body text-primary-100">XP Progress</span>
              <span className="text-sm font-data text-white">{currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()}</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-0 mb-[5px]">
            <div>
              <p className="text-xs font-caption text-primary-100">To Next Level</p>
              <p className="text-lg font-data font-bold text-white">{xpToNext.toLocaleString()} XP</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-caption text-primary-100">Click to flip</p>
              <Icon name="RotateCcw" size={16} className="text-primary-100 ml-auto" />
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-accent to-accent-600 rounded-xl shadow-soft-lg p-6 text-white hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-heading-semibold">Recent Badges</h3>
            <Icon name="Award" size={24} className="text-white" />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {badges.slice(0, 4).map((badge, index) =>
            <div key={index} className="bg-opacity-20 rounded-lg p-3 text-center m-3">
                <Icon name={badge.icon} size={20} className="text-white mx-auto mb-1" />
                <p className="text-xs font-caption text-white truncate">{badge.name}</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs font-caption text-accent-100">Click to flip back</p>
          </div>
        </div>
      </div>
    </div>);

};

export default XPCard;