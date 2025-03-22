import React from 'react';
import Header from '@/components/Header';
import EmotionRecognition from '@/components/EmotionRecognition';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <Header />

      <main className="container px-4 py-8 flex-grow">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Welcome to Emotiva
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Our system analyzes your voice to detect emotions and generates tailored responses
            that acknowledge and adapt to your emotional state.
          </p>
        </section>

        {/* Main Feature Box */}
        <div className="glassmorphism rounded-2xl p-8 shadow-xl max-w-4xl mx-auto">
          <EmotionRecognition />
        </div>

        {/* How It Works Section */}
        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((step, idx) => {
              const titles = ["Record Your Voice", "AI Analysis", "Adaptive Response"];
              const descriptions = [
                "Speak into the microphone or upload an audio file.",
                "Our model detects emotions from voice patterns.",
                "Receive a personalized response that matches your emotional state."
              ];

              return (
                <div key={step} className="glassmorphism-card">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-xl">{step}</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">{titles[idx]}</h3>
                  <p className="text-gray-600">{descriptions[idx]}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500">
        <div className="flex justify-center space-x-4 mb-2">
          <a
            href="https://github.com/saisasir"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:text-orange-600"
          >
            <i className="fab fa-github fa-lg"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/saisasirkosuri/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:text-orange-600"
          >
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
          <a
            href="mailto:saisasir18@example.com"
            className="text-orange-500 hover:text-orange-600"
          >
            <i className="fas fa-envelope fa-lg"></i>
          </a>
        </div>
        <p>
  Licensed under <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">MIT License</a>. © 2025
</p>

      </footer>
    </div>
  );
};

export default Index;
