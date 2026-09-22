#!/bin/bash
# =====================================================================
# GAU RAKSHAK - Offline Execution Launcher
# Target Platform: Raspberry Pi 4
# Team RUDRAX | GITS Udaipur
# =====================================================================

# Enforce 100% Offline Environment Variables
export HF_HUB_OFFLINE=1
export TRANSFORMERS_OFFLINE=1
export NO_PROXY="*"
export PYTHONUNBUFFERED=1

echo "==================================================================="
echo "  LAUNCHING GAU RAKSHAK NATIVE VOICE ASSISTANT (OFFLINE MODE)"
echo "==================================================================="
echo "  Wi-Fi / Ethernet status: NOT REQUIRED"
echo "  GUI Framework: Native Tkinter"
echo "  Target Hardware: Raspberry Pi 4"
echo "==================================================================="

# Execute main application directly
python3 main.py "$@"
