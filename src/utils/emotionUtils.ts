export interface EmotionResult {
  emotion: string;
  confidence: number;
  audioResponse?: string;
  text_response?: string;
}

export interface EmotionResponse {
  text: string;
  audioUrl?: string;
}

export const EMOTIONS = [
  'happy',
  'sad',
  'angry',
  'neutral',
  'fear',
  'surprised',
  'disgusted'
];

export const getEmotionColor = (emotion: string): string => {
  switch (emotion.toLowerCase()) {
    case 'happy':
      return 'bg-emotion-happy text-black';
    case 'sad':
      return 'bg-emotion-sad text-white';
    case 'angry':
      return 'bg-emotion-angry text-white';
    case 'neutral':
      return 'bg-emotion-neutral text-black';
    case 'fear':
      return 'bg-emotion-fear text-white';
    case 'surprised':
      return 'bg-emotion-surprised text-white';
    case 'disgusted':
      return 'bg-emotion-disgusted text-white';
    default:
      return 'bg-gray-200 text-black';
  }
};

export const getEmotionIcon = (emotion: string): string => {
  switch (emotion.toLowerCase()) {
    case 'happy':
      return '😊';
    case 'sad':
      return '😢';
    case 'angry':
      return '😠';
    case 'neutral':
      return '😐';
    case 'fear':
      return '😨';
    case 'surprised':
      return '😲';
    case 'disgusted':
      return '🤢';
    default:
      return '🤔';
  }
};

export const getEmotionResponse = (emotion: string): EmotionResponse => {
  const responses: Record<string, EmotionResponse> = {
    happy: { text: "That's wonderful! I'm here to make your day even brighter." },
    sad: { text: "It's okay to feel down. Let's find something uplifting together." },
    angry: { text: "I hear your frustration. Let's work through it calmly." },
    neutral: { text: "Ready to assist. How can I help you today?" },
    fear: { text: "You're safe. I'm right here with you. Let's figure it out." },
    surprised: { text: "Wow! That caught you off guard, huh? Let's explore it." },
    disgusted: { text: "Hmm, that didn't sit well with you. I understand. Let me help." }
  };

  return responses[emotion.toLowerCase()] || {
    text: "I'm here to assist, whatever you feel. Let's begin."
  };
};

export const API_URL = "https://emotiva.onrender.com";

// Original backend call
export const predictEmotion = async (audio: Blob): Promise<EmotionResult> => {
  try {
    console.log("Sending audio to API:", API_URL);
    const formData = new FormData();
    formData.append('audio_file', audio, 'audio.wav');
    
    const response = await fetch(`${API_URL}/predict-emotion`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("API response:", data);

    return {
      emotion: data.emotion,
      confidence: data.confidence,
      audioResponse: data.audio_base64
    };
  } catch (error) {
    console.error('Error calling emotion recognition API:', error);
    return mockPredictEmotion(audio);
  }
};

// New helper: use this in your component to handle everything
export const handleAudioPredictionAndPlay = async (
  audioBlob: Blob,
  setEmotion: (emotion: string) => void,
  setConfidence: (conf: number) => void,
  setTextResponse: (text: string) => void
) => {
  const result = await predictEmotion(audioBlob);

  // Update UI
  setEmotion(result.emotion);
  setConfidence(result.confidence);
  setTextResponse(getEmotionResponse(result.emotion).text);

  // Play response audio
  if (result.audioResponse) {
    const audio = new Audio(`data:audio/mp3;base64,${result.audioResponse}`);
    audio.play();
  }
};

// Mock fallback if backend fails
export const mockPredictEmotion = async (audio: Blob): Promise<EmotionResult> => {
  console.log("Using mock prediction");
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * EMOTIONS.length);
      const emotion = EMOTIONS[randomIndex];
      const confidence = 70 + Math.random() * 30;
      const mockAudioBase64 = "SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAA..."; // shortened for readability

      resolve({
        emotion,
        confidence,
        audioResponse: mockAudioBase64
      });
    }, 2000);
  });
};
