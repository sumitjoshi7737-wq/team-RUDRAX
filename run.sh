#!/bin/bash

# Navigate to project directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

echo "Starting Gau Rakshak Voice Assistant..."

if [ -d "venv" ]; then
    source venv/bin/activate
fi

python3 main.py
