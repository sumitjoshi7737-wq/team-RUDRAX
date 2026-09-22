# Gau Rakshak - Native Offline Voice Assistant

**Gau Rakshak** is an AI-based early mastitis risk forecasting system for dairy cows, designed and built by **Team RUDRAX** at **Geetanjali Institute of Technical Studies (GITS), Udaipur**.

This application is a 100% offline native Python desktop application built with **Tkinter**, optimized specifically for deployment directly on a **Raspberry Pi 4**.

---

## ⚠️ Important Safety Disclaimer
- **Gau Rakshak is an early warning and risk forecasting system.**
- **It DOES NOT provide confirmed medical diagnoses.**
- **It DOES NOT prescribe medicines or dosages.**
- For high-risk alerts, a qualified veterinarian must examine the cow.

---

## 👥 Team RUDRAX & Institution

- **Sumit Joshi** — Team Lead & Hardware
- **Mahendra Kumar** — AI/ML Lead
- **Nandani Parashar** — Web Development & Designing
- **Uttam Soni** — Software Development
- **Latif Khan** — Project Mentor

- **Institution**: Geetanjali Institute of Technical Studies (GITS), Udaipur
- **Department**: Computer Science
- **Lab**: CII Lab, GITS Udaipur

---

## 🛠️ Hardware Requirements

- **Raspberry Pi 4** (4GB or 8GB recommended)
- **USB Microphone** (Plugged into RPi USB port)
- **USB / 3.5mm Audio Speaker** (Plugged into RPi audio output)
- **Raspberry Pi Display** (Touchscreen / HDMI 800x480 or 1024x600 resolution)
- **Sensors**:
  - **Thermal Camera**: Udder surface thermal imaging / heat distribution.
  - **RFID Reader**: Cow tag identification.
  - **DHT11**: Shed environmental temperature & humidity (*Not milk temperature*).
  - **AS7343**: 11-channel optical spectral sensor (*Multi-sensor data fusion, not standalone diagnostic*).
  - **ESP32 & Solar Power**: Wireless sensor nodes & green field power.
  - **OLED**: Hardware status display.

---

## 🚀 Installation on Raspberry Pi 4

1. Copy the `gau-rakshak` folder to your Raspberry Pi 4 home directory (`/home/pi/gau-rakshak`).
2. Open a Terminal inside the project folder:
   ```bash
   cd ~/gau-rakshak
   chmod +x install.sh run.sh
   ./install.sh
   ```

---

## 💻 Running the Application

To launch the native desktop GUI:
```bash
./run.sh
```
or directly via Python:
```bash
python3 main.py
```

---

## 🔌 100% Offline Testing

To verify complete offline operation:
1. Turn off Wi-Fi on the Raspberry Pi 4:
   ```bash
   sudo rfkill block wifi
   ```
2. Unplug any Ethernet cable.
3. Launch the app (`./run.sh`).
4. Click **🎤 ASK** and speak your question.
5. The assistant will transcribe your voice offline, retrieve the answer from local JSON knowledge bases, display the transcript, and speak the response through the speaker.
6. Click **🔊 REPLAY** to re-hear the response.

---

## 🌐 Dual Language & Gemini AI Hybrid Support

The assistant supports **Hindi (हिंदी Devanagari)**, **English**, and **Hinglish**:
- **Offline Mode**: Uses local pre-indexed JSON knowledge base for instant offline Devanagari Hindi, English, and Hinglish responses.
- **Online Gemini AI Mode**: Uses your Gemini API key (`<YOUR_GEMINI_API_KEY>`) to generate rich natural explanations when Wi-Fi is connected, while enforcing safety rules.

You can switch languages anytime in the Tkinter GUI using the **Language Selector** (Hindi / English / Hinglish).

---

## 🛠️ Raspberry Pi Deployment & Troubleshooting

If you encounter `could not resolve github.com` during deployment or wish to install 100% offline via USB Flash Drive without internet, read the detailed guide:
👉 **[RASPBERRY_PI_DEPLOYMENT.md](file:///C:/Users/SUMIT/.gemini/antigravity-ide/scratch/gau-rakshak/RASPBERRY_PI_DEPLOYMENT.md)**

Quick fix for Raspberry Pi DNS error:
```bash
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf
```

---

## 🤖 Auto-Start on Boot (Raspberry Pi OS)

To launch Gau Rakshak automatically when the Raspberry Pi boots up:

Create an autostart entry:
```bash
mkdir -p ~/.config/autostart
nano ~/.config/autostart/gaurakshak.desktop
```

Paste the following content:
```ini
[Desktop Entry]
Type=Application
Name=Gau Rakshak Voice Assistant
Exec=/home/pi/gau-rakshak/run.sh
WorkingDirectory=/home/pi/gau-rakshak
StandardOutput=inherit
StandardError=inherit
Restart=always
```

Save and reboot. The application will start on boot without requiring internet!

