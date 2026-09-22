#!/bin/bash

echo "=========================================================="
echo " Gau Rakshak - Offline Native Voice Assistant Installation"
echo " Target: Raspberry Pi 4 (Raspberry Pi OS 64-bit/32-bit)"
echo " Team RUDRAX | GITS Udaipur"
echo "=========================================================="

set -e

echo "[1/4] Installing Raspberry Pi OS system dependencies..."
sudo apt update
sudo apt install -y python3-tk python3-pip python3-venv portaudio19-dev espeak-ng alsa-utils libatlas-base-dev

echo "[2/4] Setting up Python virtual environment..."
python3 -m venv venv
source venv/bin/activate

echo "[3/4] Installing Python packages from requirements.txt..."
pip install --upgrade pip
pip install -r requirements.txt

echo "[4/4] Setting permissions for execution scripts..."
chmod +x run.sh

echo "=========================================================="
echo " Installation Complete!"
echo " To run Gau Rakshak offline:"
echo "   ./run.sh"
echo "=========================================================="
