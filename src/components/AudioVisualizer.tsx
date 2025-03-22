
import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  isRecording: boolean;
  audioStream?: MediaStream | null;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isRecording, audioStream }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  
  useEffect(() => {
    let audioContext: AudioContext | null = null;
    
    if (isRecording && audioStream && canvasRef.current) {
      audioContext = new AudioContext();
      analyserRef.current = audioContext.createAnalyser();
      analyserRef.current.fftSize = 256;
      
      const source = audioContext.createMediaStreamSource(audioStream);
      source.connect(analyserRef.current);
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const draw = () => {
          if (!analyserRef.current) return;
          
          analyserRef.current.getByteFrequencyData(dataArray);
          
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
          
          const barWidth = (canvas.width / bufferLength) * 2.5;
          let x = 0;
          
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          for (let i = 0; i < bufferLength; i++) {
            const barHeight = (dataArray[i] / 255) * canvas.height;
            
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
            gradient.addColorStop(1, 'rgba(37, 99, 235, 0.4)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            
            x += barWidth + 1;
          }
          
          animationFrameId.current = requestAnimationFrame(draw);
        };
        
        draw();
      }
    }
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [isRecording, audioStream]);
  
  // Create simulated wave bars when not recording
  const renderStaticWave = () => {
    if (!isRecording) {
      return Array.from({ length: 30 }, (_, i) => (
        <div 
          key={i}
          className="wave-bar"
          style={{
            height: '20%',
            animationDelay: `${i * 0.05}s`,
            opacity: 0.3
          }}
        />
      ));
    }
    return null;
  };
  
  return (
    <div className="w-full h-16 glassmorphism rounded-xl overflow-hidden flex items-center justify-center">
      {isRecording ? (
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
        />
      ) : (
        <div className="wave-container">
          {renderStaticWave()}
        </div>
      )}
    </div>
  );
};

export default AudioVisualizer;
