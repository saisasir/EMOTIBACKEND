import React, { useState } from 'react';
import { EmotionResult, predictEmotion } from '@/utils/emotionUtils';
import AudioRecorder from './AudioRecorder';
import EmotionDisplay from './EmotionDisplay';
import ResponseGenerator from './ResponseGenerator';
import { toast } from 'sonner';

const EmotionRecognition: React.FC = () => {
  const [emotionResult, setEmotionResult] = useState<EmotionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedAudio, setUploadedAudio] = useState<Blob | null>(null);
  const [responseAudio, setResponseAudio] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string | null>(null);

  const handleAudioReady = async (audioBlob: Blob) => {
    try {
      setIsProcessing(true);
      setUploadedAudio(audioBlob);
      toast.info('Processing audio...', { duration: 2000 });

      console.log("🎙️ Processing audio blob:", audioBlob.size, "bytes");

      // Call API
      const result = await predictEmotion(audioBlob);
      console.log("📊 API result received:", result);

      setEmotionResult(result);

      if (result.audioResponse) {
        console.log("🔊 Audio response received, length:", result.audioResponse.length);
        setResponseAudio(result.audioResponse);

        const audio = new Audio(`data:audio/mp3;base64,${result.audioResponse}`);
        audio.play();
      } else {
        console.log("❌ No audio response in the result");
        setResponseAudio(null);
      }

      if ('text_response' in result) {
        setResponseText(result.text_response);
      }

      toast.success(`Detected emotion: ${result.emotion}`, { duration: 3000 });
    } catch (error) {
      console.error('❌ Error processing audio:', error);
      toast.error('Failed to process audio. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="space-y-8 w-full">
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Record or Upload Audio</h2>
          <AudioRecorder onAudioReady={handleAudioReady} isProcessing={isProcessing} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Emotion Analysis</h2>
            <EmotionDisplay result={emotionResult} isLoading={isProcessing} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">AI Response</h2>
            <ResponseGenerator 
              emotionResult={emotionResult} 
              audioData={responseAudio}
              text={responseText}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionRecognition;
