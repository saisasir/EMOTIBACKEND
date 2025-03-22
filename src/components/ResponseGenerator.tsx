import React, { useState, useEffect, useRef } from 'react';
import { EmotionResult, getEmotionResponse, getEmotionIcon } from '@/utils/emotionUtils';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';

interface ResponseGeneratorProps {
  emotionResult: EmotionResult | null;
  audioData?: string | null;
  text?: string | null; // ✅ NEW PROP
}

const ResponseGenerator: React.FC<ResponseGeneratorProps> = ({ emotionResult, audioData, text }) => {
  const [response, setResponse] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    if (emotionResult) {
      if (text) {
        setResponse(text); // ✅ Use text from props if provided
      } else {
        const responseData = getEmotionResponse(emotionResult.emotion);
        setResponse(responseData.text);
      }
    }
  }, [emotionResult, text]);

  useEffect(() => {
    if (audioData) {
      try {
        const blob = base64ToBlob(audioData, 'audio/mp3');
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        return () => {
          if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
          }
        };
      } catch (error) {
        console.error("Error processing audio data:", error);
        toast.error("Failed to process audio response");
      }
    }
  }, [audioData]);

  const base64ToBlob = (base64: string, mimeType: string) => {
    const byteString = atob(base64);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeType });
  };

  const handlePlayAudio = () => {
    if (!audioUrl) {
      toast.error("No audio response available");
      return;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => {
            console.error('Error playing audio:', err);
            toast.error("Failed to play audio");
          });
      }
    }
  };

  if (!emotionResult) return null;

  const emotionIcon = getEmotionIcon(emotionResult.emotion);

  return (
    <div className="w-full glassmorphism-card animate-fade-up">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-2xl">{emotionIcon}</span>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-medium mb-2">AI Response</h3>
          <p className="text-gray-700 mb-4">{response}</p>

          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
              onClick={handlePlayAudio}
              disabled={!audioUrl}
            >
              {isPlaying ? (
                <>
                  <VolumeX className="h-4 w-4" />
                  <span>Stop</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4" />
                  <span>Play{audioUrl ? "" : " (No audio)"}</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={audioUrl || undefined}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
    </div>
  );
};

export default ResponseGenerator;
