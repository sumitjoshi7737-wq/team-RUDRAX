#!/bin/bash
# =====================================================================
# GAU RAKSHAK - Offline Native Voice Assistant Installation Script
# Target Platform: Raspberry Pi 4 (Raspberry Pi OS)
# Team RUDRAX | GITS Udaipur
# =====================================================================

set -e

echo "-------------------------------------------------------------------"
echo "  GAU RAKSHAK - Offline Voice Assistant Installation for RPi 4"
echo "  Team RUDRAX | Geetanjali Institute of Technical Studies, Udaipur"
echo "-------------------------------------------------------------------"

# 1. System Packages Setup
echo "[1/5] Installing Raspberry Pi OS dependencies..."
sudo apt-get update -y
sudo apt-get install -y \
    python3-tk \
    python3-pip \
    python3-dev \
    python3-numpy \
    espeak-ng \
    portaudio19-dev \
    alsa-utils \
    ffmpeg \
    wget \
    curl \
    git

# 2. Install Python Packages
echo "[2/5] Installing Python dependencies from requirements.txt..."
python3 -m pip install --upgrade pip
python3 -m pip install -r requirements.txt --break-system-packages || python3 -m pip install -r requirements.txt

# 3. Create Local Directories
echo "[3/5] Setting up local directory structure..."
mkdir -p audio logs models/whisper models/piper models/vosk

# 4. Download Piper Offline Neural Voice Model (English)
echo "[4/5] Pre-downloading offline Piper English TTS model for Raspberry Pi..."
PIPER_DIR="models/piper"
if [ ! -f "$PIPER_DIR/en_US-lessac-medium.onnx" ]; then
    echo "Downloading Piper English Voice Model (en_US-lessac-medium)..."
    wget -q -O "$PIPER_DIR/en_US-lessac-medium.onnx" "https://github.com/rhasspy/piper/releases/download/v1.0.0/voice-en_US-lessac-medium.onnx" || true
    wget -q -O "$PIPER_DIR/en_US-lessac-medium.onnx.json" "https://github.com/rhasspy/piper/releases/download/v1.0.0/voice-en_US-lessac-medium.onnx.json" || true
fi

# 5. Pre-warm English Whisper Model Cache for 100% Offline Runtime
echo "[5/5] Caching Faster-Whisper English STT model locally..."
python3 -c "
from faster_whisper import WhisperModel
print('Downloading & caching Faster-Whisper tiny.en model locally...')
try:
    model = WhisperModel('tiny.en', device='cpu', compute_type='int8', download_root='models/whisper')
    print('Whisper English tiny.en model successfully cached for offline use.')
except Exception as e:
    print('Warning pre-caching Whisper model:', e)
"

# Set executable permissions
chmod +x run.sh || true
chmod +x main.py || true

echo "-------------------------------------------------------------------"
echo "  INSTALLATION COMPLETE!"
echo "  Gau Rakshak is ready to run 100% offline."
echo "  Launch the application using: ./run.sh"
echo "-------------------------------------------------------------------"
