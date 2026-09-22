# Raspberry Pi 4 Deployment & Fix for "could not resolve github.com"

This guide resolves network/DNS issues on Raspberry Pi OS and provides instructions for both **Online** and **100% Offline (USB Drive)** installation.

---

## 🚨 Problem: `could not resolve github.com`

When you see `could not resolve github.com` on Raspberry Pi OS, it means:
1. The Raspberry Pi is not connected to Wi-Fi or Ethernet.
2. OR the Domain Name System (DNS) on the Pi cannot resolve domain names.

---

## 🛠️ Solution 1: Fix Raspberry Pi Network & DNS (Online Mode)

### Step 1: Fix DNS Servers
Run the following command in the Raspberry Pi terminal to force Google Public DNS:
```bash
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf
echo "nameserver 8.8.4.4" | sudo tee -a /etc/resolv.conf
```

### Step 2: Connect to Wi-Fi via Terminal
If Wi-Fi is disconnected, use `nmcli` or `nmtui`:
```bash
sudo nmtui
```
*(Select 'Activate a connection', choose your Wi-Fi, enter the password, and select Quit).*

Or connect via `raspi-config`:
```bash
sudo raspi-config
```
*(Go to System Options -> Wireless LAN -> Enter SSID & Password).*

### Step 3: Test Internet Connection
```bash
ping -c 3 github.com
```
If `ping` succeeds, retry your `git clone` or `./install.sh`!

---

## 📦 Solution 2: 100% Offline Deployment via USB Flash Drive (No Internet / No GitHub Needed)

If your Raspberry Pi is kept completely offline in the field (no Wi-Fi/Ethernet), you **do not** need GitHub or internet on the Pi!

### Step A: Prepare Zip Bundle on your Laptop / PC
1. Download or copy the `gau-rakshak` folder.
2. (Optional) Download required `.whl` packages on your connected laptop:
   ```bash
   pip download -r requirements.txt -d ./wheels
   ```
3. Copy the `gau-rakshak` folder (and `./wheels` folder) to a USB Flash Drive.

### Step B: Install on Raspberry Pi from USB Drive
1. Insert the USB Flash Drive into your Raspberry Pi 4.
2. Copy the `gau-rakshak` folder to `/home/pi/`:
   ```bash
   cp -r /media/pi/*/gau-rakshak /home/pi/gau-rakshak
   cd /home/pi/gau-rakshak
   ```
3. Install dependencies from local wheels (100% offline, zero internet):
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install --no-index --find-links=./wheels -r requirements.txt
   ```
4. Run the application:
   ```bash
   ./run.sh
   ```

---

## 🔑 Gemini API & Dual Language Configuration

The system now supports:
- **Hindi (हिंदी - Devanagari Script)**
- **English**
- **Hinglish**

### Setting Gemini API Key (Optional Online Mode)
Your Gemini API Key is automatically configured in `config/settings.py`.

You can also pass your API key as an environment variable before launching:
```bash
export GEMINI_API_KEY="<YOUR_GEMINI_API_KEY>"
./run.sh
```

- When **Online** (Wi-Fi connected), it uses Gemini API to generate enhanced responses.
- When **Offline** (Wi-Fi disconnected), it seamlessly switches to the local Knowledge Base in Devanagari Hindi, English, or Hinglish!
