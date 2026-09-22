# 🐄 Gau Rakshak - Offline Native Voice Assistant (Raspberry Pi 4)

**Gau Rakshak** is an edge-AI system designed for early risk forecasting of **subclinical mastitis in dairy cattle**. This repository contains the **100% Offline Native Raspberry Pi Voice Assistant** powered by **Python + Tkinter**, local offline Speech-to-Text (STT), a structured local JSON knowledge base, and offline Text-to-Speech (TTS).

---

## 📌 Project Overview

- **Project:** Gau Rakshak
- **Team Name:** RUDRAX
- **Institution:** Geetanjali Institute of Technical Studies (GITS), Udaipur
- **Department:** Department of Computer Science & Engineering
- **Development Location:** CII Lab, GITS Udaipur

### 👥 Team RUDRAX
- **Sumit Joshi** — Team Lead & Hardware Integration
- **Mahendra Kumar** — AI/ML Lead
- **Nandani Parashar** — Web Development & Designing
- **Uttam Soni** — Software Development
- **Er. Latif Khan** — Mentor & Advisor

---

## 🎯 Important Safety Rule & Medical Disclaimer

> **CRITICAL:** Gau Rakshak is an early warning and risk forecasting system only. It does **NOT** provide confirmed medical diagnoses, nor does it prescribe medication or dosages. For high-risk situations, the system automatically advises immediate examination by a qualified veterinarian.

---

## 🔌 Hardware Architecture

Target deployment platform: **Raspberry Pi 4** (Raspberry Pi OS)
- **Raspberry Pi 4**: Central offline edge compute engine, AI inference hub, & voice assistant runtime.
- **USB Microphone & Speaker**: Audio input capture and offline voice response playback.
- **Raspberry Pi Touch Display**: Displays the native Tkinter desktop interface.
- **Thermal Camera**: Captures udder surface thermal distribution to detect localized temperature spikes.
- **AS7343 Spectral Sensor**: 14-channel spectral sensor for milk sample reflection profile analysis. *(Note: Multi-sensor pipeline component, not a standalone diagnostic device).*
- **DHT11 Sensor**: Measures ambient environmental temperature and humidity in the cattle shed. *(Note: Shed ambient sensor, NOT milk temperature).*
- **RFID Tag Reader**: Scans cattle ear tags for individual cow identification.
- **ESP32 & Solar Power**: Wireless microcontroller nodes and off-grid solar power supply.

---

## 💻 Software & Offline Technologies

- **GUI Framework**: Native **Python 3 + Tkinter** (no browser, no web server, no localhost).
- **Offline Speech-to-Text (STT)**: `Faster-Whisper` (tiny/base model) / `Vosk` (local model cache).
- **Offline Text-to-Speech (TTS)**: `Piper-TTS` (neural TTS for RPi 4) with `pyttsx3` / `espeak-ng` fallbacks.
- **Local Knowledge Engine**: Multi-lingual QA intent matcher in `knowledge/qa_engine.py` reading `mastitis.json`, `project.json`, `team.json`, and `questions.json`.
- **Supported Languages**: Natural Hindi, Hinglish, and English.

---

## 📁 Directory Structure

```
gau-rakshak/
├── main.py                    # Main Tkinter desktop application entry point
├── requirements.txt           # Python dependencies for RPi 4
├── install.sh                 # One-click installation script for Raspberry Pi OS
├── run.sh                     # Offline launcher script
├── README.md                  # Complete documentation
├── voice/                     # Voice I/O subsystem
│   ├── __init__.py
│   ├── stt.py                 # Offline STT engine (Faster-Whisper / Vosk)
│   ├── tts.py                 # Offline TTS engine (Piper / Pyttsx3 / Espeak-ng)
│   └── audio.py               # Microphone recorder & audio player
├── knowledge/                 # Local knowledge base & QA engine
│   ├── __init__.py
│   ├── loader.py              # Knowledge base JSON loader
│   ├── qa_engine.py           # NLP matching engine with safety guardrails
│   ├── mastitis.json          # Domain knowledge & safety rules
│   ├── project.json           # Hardware & architecture details
│   ├── team.json             # Team RUDRAX & GITS Udaipur metadata
│   └── questions.json         # Direct FAQ mappings (Hindi / Hinglish / English)
├── audio/                     # Local WAV audio directory (replay cache)
├── config/                    # Configuration settings
│   └── config.json            # Audio & UI parameters
└── logs/                      # Application logging
```

---

## 🚀 Installation & Deployment on Raspberry Pi

For full detailed deployment instructions, hardware pinouts, ALSA sound driver setup, and boot autostart configuration, refer to **[RASPBERRY_PI_DEPLOYMENT.md](file:///c:/gau-rakshak/RASPBERRY_PI_DEPLOYMENT.md)**.

1. Copy the `gau-rakshak` folder to your Raspberry Pi Desktop.
2. Open terminal in `gau-rakshak` and run the installation script:

```bash
chmod +x install.sh run.sh
./install.sh
```

---

## ⚡ Running 100% Offline

Test complete offline execution by disconnecting network:
1. Turn **Wi-Fi OFF** in Raspberry Pi OS panel.
2. Unplug **Ethernet cable**.
3. Launch Gau Rakshak:

```bash
./run.sh
```

---

## 🎤 Sample Questions Supported

You can ask questions via microphone or type them directly into the GUI:

### Hinglish & Hindi:
- *"Gau Rakshak kya hai?"*
- *"Gau Rakshak kaise kaam karta hai?"*
- *"Mastitis kya hota hai?"*
- *"Mastitis ke early symptoms kya hain?"*
- *"Subclinical mastitis kya hai?"*
- *"Thermal camera ka kya role hai?"*
- *"Raspberry Pi 4 ka kya role hai?"*
- *"RFID ka kya role hai?"*
- *"DHT11 kya measure karta hai?"*
- *"AS7343 kya karta hai?"*
- *"Team lead kaun hai?"*
- *"Hardware kisne handle kiya?"*
- *"AI/ML kaun dekh raha hai?"*
- *"Software kaun dekh raha hai?"*
- *"Mentor kaun hai?"*
- *"Team ka naam kya hai?"*
- *"Kis college ne Gau Rakshak banaya hai?"*

### English:
- *"What is Gau Rakshak?"*
- *"How does Gau Rakshak work?"*
- *"What is subclinical mastitis?"*
- *"Which college developed Gau Rakshak?"*
- *"Is Gau Rakshak a diagnosis system?"*
- *"Does it work offline?"*

---

## 🖥️ GUI Features & Controls

- **Status Bar**: Live indicator displaying `READY`, `LISTENING`, `PROCESSING`, `SPEAKING`, or `ERROR`.
- **🎤 ASK QUESTION Button**: Initiates microphone recording and triggers full offline STT -> QA -> TTS flow.
- **🔊 REPLAY RESPONSE Button**: Replays the last spoken answer audio.
- **Manual Input Bar**: Enter questions by typing if microphone is silent.
- **❌ CLEAR Button**: Resets the chat display log.
