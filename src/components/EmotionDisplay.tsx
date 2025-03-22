
import React from 'react';
import { EmotionResult, getEmotionColor, getEmotionIcon } from '@/utils/emotionUtils';

interface EmotionDisplayProps {
  result: EmotionResult | null;
  isLoading: boolean;
}

const EmotionDisplay: React.FC<EmotionDisplayProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full p-8 glassmorphism-card animate-pulse-soft">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
            <div className="animate-spinner w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
          <div className="h-6 w-32 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-48 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="w-full p-8 glassmorphism-card text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-4xl">🎤</span>
          </div>
          <h3 className="text-xl font-medium">Awaiting Audio</h3>
          <p className="text-sm text-gray-500">Record or upload audio to detect emotion</p>
        </div>
      </div>
    );
  }

  const { emotion, confidence } = result;
  const colorClasses = getEmotionColor(emotion);
  const emotionIcon = getEmotionIcon(emotion);

  return (
    <div className="w-full glassmorphism-card animate-fade-in">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center ${colorClasses}`}>
          <span className="text-5xl">{emotionIcon}</span>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 capitalize">{emotion}</h2>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div 
              className={`h-2.5 rounded-full progress-animation`}
              style={{ 
                width: `${confidence}%`,
                backgroundColor: emotion === 'happy' ? '#FFD166' :
                               emotion === 'sad' ? '#457B9D' :
                               emotion === 'angry' ? '#E63946' :
                               emotion === 'neutral' ? '#A8DADC' :
                               emotion === 'fear' ? '#8338EC' :
                               emotion === 'surprised' ? '#3A86FF' : '#6A994E'
              }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">Confidence: {confidence.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
};

export default EmotionDisplay;
