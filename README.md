# Emotiva

Emotiva is a voice emotion recognition app that provides AI-driven responses based on detected feelings.

## Frontend Overview

The frontend provides:
- Audio recording and visualization
- Emotion display with confidence percentages
- Automated response generation based on detected emotions
- Text-to-speech functionality


## Backend Integration

To fully implement the emotion recognition system, you'll need to create a backend service using Python with the following dependencies:


Your backend should expose an API endpoint that:
- Accepts audio recordings from the frontend
- Processes them using the PyTorch model
- Returns the detected emotion and confidence score
- Generates appropriate responses

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- React Query (for API calls)

