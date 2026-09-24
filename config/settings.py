import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Paths
AUDIO_DIR = os.path.join(BASE_DIR, "audio")
LOGS_DIR = os.path.join(BASE_DIR, "logs")
KNOWLEDGE_DIR = os.path.join(BASE_DIR, "knowledge")

# Audio Config
SAMPLE_RATE = 16000
CHANNELS = 1
RECORD_SECONDS = 5
INPUT_WAV_PATH = os.path.join(AUDIO_DIR, "input_record.wav")
OUTPUT_WAV_PATH = os.path.join(AUDIO_DIR, "output_response.wav")

# Ensure dirs exist
os.makedirs(AUDIO_DIR, exist_ok=True)
os.makedirs(LOGS_DIR, exist_ok=True)

# UI Aesthetics (RPi 4 Display Dark Theme)
BG_COLOR = "#181825"
CARD_BG = "#1E1E2E"
ACCENT_BLUE = "#89B4FA"
TEXT_COLOR = "#CDD6F4"
GREEN_OFFLINE = "#A6E3A1"
YELLOW_STATUS = "#F9E2AF"
RED_ERROR = "#F38BA8"
USER_BUBBLE_BG = "#313244"
ASSISTANT_BUBBLE_BG = "#45475A"

# Voice Engine & Gemini AI Settings
PIPER_MODEL_NAME = "hi_IN-dii-medium" # Default offline Hindi/English Piper model
USE_PIPER_FALLBACK = True

# Gemini API Key (Supports online enhanced answers with full offline fallback)
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "<YOUR_GEMINI_API_KEY>")
DEFAULT_LANGUAGE = "hi" # "hi" for Hindi (Devanagari), "en" for English, "both" for Dual Language

