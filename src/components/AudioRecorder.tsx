
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Mic, Square, Upload } from 'lucide-react';
import AudioVisualizer from './AudioVisualizer';

interface AudioRecorderProps {
  onAudioReady: (audio: Blob) => void;
  isProcessing: boolean;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onAudioReady, isProcessing }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        onAudioReady(audioBlob);
        
        // Stop all tracks on the stream
        stream.getTracks().forEach(track => track.stop());
        setAudioStream(null);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Could not access your microphone. Please check permissions.');
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (file.type.startsWith('audio/')) {
        const reader = new FileReader();
        reader.onload = () => {
          const blob = new Blob([reader.result as ArrayBuffer], { type: file.type });
          onAudioReady(blob);
        };
        reader.readAsArrayBuffer(file);
      } else {
        toast.error('Please upload an audio file.');
      }
    }
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [audioStream]);
  
  return (
    <div className="w-full space-y-4">
      <AudioVisualizer isRecording={isRecording} audioStream={audioStream} />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {isRecording ? (
            <Button
              onClick={stopRecording}
              size="lg"
              variant="destructive"
              className="rounded-full w-14 h-14 p-0 flex items-center justify-center"
              disabled={isProcessing}
            >
              <Square className="h-6 w-6" />
            </Button>
          ) : (
            <Button
              onClick={startRecording}
              size="lg"
              className="rounded-full w-14 h-14 p-0 flex items-center justify-center bg-blue-500 hover:bg-blue-600"
              disabled={isProcessing}
            >
              <Mic className="h-6 w-6" />
            </Button>
          )}
          
          <div className="text-sm font-medium">
            {isRecording ? (
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2"></span>
                <span>Recording: {formatTime(recordingTime)}</span>
              </div>
            ) : (
              <span>Click to start recording</span>
            )}
          </div>
        </div>
        
        <div>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="audio/*"
            className="hidden" 
            disabled={isProcessing || isRecording}
          />
          
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing || isRecording}
            className="flex items-center"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Audio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;
