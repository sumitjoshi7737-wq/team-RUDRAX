# 🥧 Raspberry Pi 4 / 5 Deployment Guide - Gau Rakshak Voice Assistant

This guide provides step-by-step instructions to deploy **Gau Rakshak** on a **Raspberry Pi 4 (or Raspberry Pi 5)** running 100% offline with an **English Speech Recognition (STT) and Synthesis (TTS)** model pipeline.

---

## 📋 System Prerequisites

### Hardware Requirements
| Component | Specification / Details |
| :--- | :--- |
| **Edge Compute** | Raspberry Pi 4 Model B (4GB / 8GB RAM recommended) or Raspberry Pi 5 |
| **Storage** | 32GB+ MicroSD Card (Class 10 / UHS-I A2 recommended) |
| **Power Supply** | Official 5.1V 3A USB-C Power Adapter (or Solar/Battery step-down supply) |
| **Display** | Raspberry Pi 7" Touchscreen Display or standard HDMI Monitor |
| **Audio Capture** | Plug-and-Play USB Microphone / USB Headset |
| **Audio Output** | 3.5mm Audio Jack Speaker or USB Speaker |
| **Thermal Camera** | MLX90614 / AMG8833 Thermal Sensor (I2C interface) |
| **Spectral Sensor** | AS7343 14-channel Spectral Sensor (I2C interface) |
| **Ambient Sensor** | DHT11 Environmental Sensor (GPIO pin 4) |
| **RFID Reader** | EM-18 125kHz RFID Tag Reader (UART / USB Serial) |

### Operating System
- **Raspberry Pi OS (64-bit)** with Desktop (Bookworm or Bullseye release).

---

## 🛠️ Step 1: Raspberry Pi OS Setup & Bus Configuration

1. **Flash Raspberry Pi OS (64-bit)** onto your MicroSD card using **Raspberry Pi Imager**.
2. Boot up the Raspberry Pi and complete initial setup (Hostname: `gaurakshak`, Username: `pi`).
3. Open a terminal and enable **I2C**, **SPI**, and **Serial UART** hardware interfaces:
   ```bash
   sudo raspi-config
   ```
   - Navigate to `Interface Options` -> Enable `I2C`, `SPI`, and `Serial Port`.
   - Reboot the Pi:
     ```bash
     sudo reboot
     ```

---

## 🔊 Step 2: Audio Drivers & System Dependencies Installation

Open the terminal on your Raspberry Pi and install required system tools, audio libraries, and Tkinter GUI dependencies:

```bash
sudo apt-get update -y
sudo apt-get install -y \
    python3-tk \
    python3-pip \
    python3-venv \
    python3-dev \
    python3-numpy \
    espeak-ng \
    portaudio19-dev \
    alsa-utils \
    ffmpeg \
    wget \
    curl \
    git
```

### Audio Device Verification
Connect your USB Microphone and Speaker, then verify they are detected by ALSA:
```bash
# Verify microphone (Capture device)
arecord -l

# Verify speaker (Playback device)
aplay -l
```

*Tip: Adjust microphone gain and volume using ALSA mixer:*
```bash
alsamixer
```

---

## 📁 Step 3: Project Setup & Python Environment

1. Copy or clone the `gau-rakshak` codebase to your Raspberry Pi home or desktop directory:
   ```bash
   cd ~
   git clone https://github.com/Team-RUDRAX/gau-rakshak.git
   cd gau-rakshak
   ```

2. (Optional but Recommended) Create a Python Virtual Environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install Python dependencies:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

---

## 🤖 Step 4: English Speech Recognition (STT) & Voice (TTS) Models Setup

Gau Rakshak operates **100% offline**. Run the one-click installer script to create directory structures and download the **English Faster-Whisper** and **English Piper TTS** models:

```bash
chmod +x install.sh run.sh main.py
./install.sh
```

### Manual English Model Download (If Offline Pre-loading is needed)

#### 1. Faster-Whisper English Model (`tiny.en`)
Pre-cache the English Whisper model into `models/whisper`:
```bash
python3 -c "
from faster_whisper import WhisperModel
print('Downloading Faster-Whisper English model...')
model = WhisperModel('tiny.en', device='cpu', compute_type='int8', download_root='models/whisper')
print('Offline English STT model cached successfully.')
"
```

#### 2. Vosk English Fallback Model (`vosk-model-small-en-us`)
```bash
mkdir -p models/whisper
cd models/whisper
wget https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip
unzip vosk-model-small-en-us-0.15.zip
mv vosk-model-small-en-us-0.15 vosk-model-small-en-us
rm vosk-model-small-en-us-0.15.zip
cd ../..
```

#### 3. Piper English Neural Voice Model (`en_US-lessac-medium`)
```bash
mkdir -p models/piper
wget -O models/piper/en_US-lessac-medium.onnx https://github.com/rhasspy/piper/releases/download/v1.0.0/voice-en_US-lessac-medium.onnx
wget -O models/piper/en_US-lessac-medium.onnx.json https://github.com/rhasspy/piper/releases/download/v1.0.0/voice-en_US-lessac-medium.onnx.json
```

---

## ⚙️ Step 5: Configuration File Check (`config/config.json`)

Ensure `config/config.json` is set to English language mode:

```json
{
  "app_name": "Gau Rakshak Voice Assistant",
  "tagline": "AI Early Mastitis Risk Forecasting System",
  "team": "RUDRAX",
  "institution": "Geetanjali Institute of Technical Studies (GITS), Udaipur",
  "offline_mode": true,
  "stt": {
    "engine": "whisper",
    "model_size": "tiny.en",
    "language": "en",
    "recording_duration": 5,
    "sample_rate": 16000
  },
  "tts": {
    "engine": "piper",
    "voice_model": "en_US-lessac-medium",
    "speech_rate": 150
  },
  "paths": {
    "audio_input": "audio/input.wav",
    "audio_output": "audio/response.wav",
    "knowledge_dir": "knowledge",
    "logs_dir": "logs"
  },
  "ui": {
    "theme": "dark",
    "bg_color": "#0f172a",
    "card_bg": "#1e293b",
    "accent_color": "#10b981",
    "text_color": "#f8fafc"
  }
}
```

---

## 🚀 Step 6: Launching Gau Rakshak Offline

To test running 100% offline:
1. Turn **Wi-Fi OFF** in the Raspberry Pi OS top panel.
2. Disconnect any Ethernet cable.
3. Launch the application:
   ```bash
   ./run.sh
   ```

When the GUI window opens:
- Click the **`🎤 LISTEN (ENGLISH)`** button to speak your query into the USB microphone.
- Or type your question in English into the input entry bar and press `SEND`.
- Click **`🔊 REPLAY RESPONSE`** to replay the English synthesized audio response.

---

## 🔄 Step 7: Auto-Start Deployment on Raspberry Pi Boot

To launch Gau Rakshak automatically whenever the Raspberry Pi powers on:

### Method A: Desktop Autostart (Recommended for Touchscreen Display)
1. Create the autostart directory if it does not exist:
   ```bash
   mkdir -p ~/.config/autostart
   ```

2. Create a desktop entry file:
   ```bash
   nano ~/.config/autostart/gau_rakshak.desktop
   ```

3. Paste the following configuration (adjust path to match your folder):
   ```ini
   [Desktop Entry]
   Type=Application
   Name=Gau Rakshak Voice Assistant
   Comment=Offline Edge-AI Mastitis Risk Forecasting System
   Exec=/bin/bash /home/pi/gau-rakshak/run.sh
   Path=/home/pi/gau-rakshak
   Terminal=false
   X-GNOME-Autostart-enabled=true
   ```

### Method B: Systemd Service (Background Service)
1. Create a systemd service unit:
   ```bash
   sudo nano /etc/systemd/system/gaurakshak.service
   ```

2. Paste the service configuration:
   ```ini
   [Unit]
   Description=Gau Rakshak Offline Voice Assistant
   After=graphical.target sound.target

   [Service]
   Type=simple
   User=pi
   Environment=DISPLAY=:0
   Environment=XAUTHORITY=/home/pi/.Xauthority
   WorkingDirectory=/home/pi/gau-rakshak
   ExecStart=/usr/bin/python3 /home/pi/gau-rakshak/main.py
   Restart=always
   RestartSec=5

   [Install]
   WantedBy=graphical.target
   ```

3. Enable and start the service:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable gaurakshak.service
   sudo systemctl start gaurakshak.service
   ```

---

## ❓ Troubleshooting & Diagnostics

| Symptom | Cause | Solution |
| :--- | :--- | :--- |
| **`No speech detected from microphone`** | USB Mic volume low or wrong audio device index | Open `alsamixer` in terminal, select Sound Card (F6), boost Mic Capture level to 80%+. Test recording with `arecord -d 5 test.wav && aplay test.wav`. |
| **`No sound output from speaker`** | ALSA audio routing issue | Force audio output to 3.5mm or USB: `sudo raspi-config` -> `System Options` -> `Audio` -> Select USB/Headphones. |
| **`Tkinter display error / Cannot open display`** | Running over SSH without X11 forwarding | Set display variable: `export DISPLAY=:0` before executing `python3 main.py`. |
| **`Slow STT performance on RPi 4`** | High CPU precision mode | Ensure `compute_type="int8"` is set in `voice/stt.py` and model size is set to `tiny.en`. |

---

## 👨‍💻 Team & Support

- **Team:** RUDRAX (CII Lab, Department of Computer Science & Engineering)
- **Institution:** Geetanjali Institute of Technical Studies (GITS), Udaipur
- **Team Lead & Hardware:** Sumit Joshi
- **AI/ML Lead:** Mahendra Kumar
- **Web Development & UI:** Nandani Parashar
- **Software Development:** Uttam Soni
- **Mentor:** Er. Latif Khan
