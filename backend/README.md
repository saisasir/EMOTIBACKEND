
# Emotion Recognition Backend

This is the backend service for the Emotion-Driven AI project. It provides an API endpoint that processes audio recordings to detect emotions using a PyTorch model.

## Setup Instructions

1. Create a virtual environment and activate it:
```
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
```

2. Install the required dependencies:
```
pip install -r requirements.txt
```

3. Start the server:
```
python app.py
```

The server will run on port 8000 by default. You can access the API at:
- Root endpoint: http://localhost:8000/
- Prediction endpoint: http://localhost:8000/predict-emotion

## API Usage

### POST /predict-emotion

This endpoint accepts an audio file upload and returns:
- The detected emotion
- Confidence score
- Text response based on the emotion
- Base64-encoded audio of the text response

Example curl request:
```
curl -X POST -F "audio_file=@path/to/your/audio.wav" http://localhost:8000/predict-emotion
```

## Modifying for Your Model

You may need to adjust the `extract_audio_features` function in `app.py` based on how your specific model was trained and what features it expects.
