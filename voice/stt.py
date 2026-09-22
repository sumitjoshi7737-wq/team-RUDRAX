import os
import logging

logger = logging.getLogger("GauRakshak.OfflineSTT")

# Engine availability flags
HAS_FASTER_WHISPER = False
try:
    from faster_whisper import WhisperModel
    HAS_FASTER_WHISPER = True
except ImportError:
    HAS_FASTER_WHISPER = False

HAS_VOSK = False
try:
    import vosk
    HAS_VOSK = True
except ImportError:
    HAS_VOSK = False


class OfflineSTT:
    def __init__(self, model_size="tiny.en", language="en", model_dir="models/whisper"):
        self.model_size = model_size
        self.language = language or "en"
        self.model_dir = model_dir
        self.whisper_model = None
        self.vosk_model = None

        self._init_engine()

    def _init_engine(self):
        if HAS_FASTER_WHISPER:
            try:
                logger.info(f"Initializing offline Faster-Whisper English model ({self.model_size})...")
                # compute_type='int8' is ideal for ARM CPU / Raspberry Pi 4
                self.whisper_model = WhisperModel(
                    self.model_size,
                    device="cpu",
                    compute_type="int8",
                    download_root=self.model_dir,
                    local_files_only=False # Allows initial download, then runs 100% offline
                )
                logger.info("Faster-Whisper English STT model initialized successfully.")
                return
            except Exception as e:
                logger.warning(f"Could not load Faster-Whisper model: {e}")

        if HAS_VOSK:
            try:
                vosk_path = os.path.join(self.model_dir, "vosk-model-small-en-us")
                if not os.path.exists(vosk_path):
                    vosk_path = os.path.join(self.model_dir, "vosk-model-en-us")
                if os.path.exists(vosk_path):
                    self.vosk_model = vosk.Model(vosk_path)
                    logger.info("Vosk offline English model loaded.")
            except Exception as e:
                logger.warning(f"Could not load Vosk model: {e}")

        logger.info("Offline STT initialized for English language (Whisper/Vosk).")

    def transcribe(self, audio_path):
        if not os.path.exists(audio_path):
            logger.error(f"Audio file does not exist: {audio_path}")
            return ""

        # 1. Faster-Whisper offline transcription (enforced English)
        if self.whisper_model:
            try:
                segments, info = self.whisper_model.transcribe(
                    audio_path,
                    beam_size=1,
                    language="en", # Strictly English
                    vad_filter=True
                )
                text = " ".join([segment.text for segment in segments]).strip()
                logger.info(f"Whisper English STT Transcribed: '{text}' (Language: {info.language})")
                return text
            except Exception as e:
                logger.error(f"Faster-Whisper transcription error: {e}")

        # 2. Vosk offline transcription fallback
        if self.vosk_model:
            try:
                import wave
                import json
                wf = wave.open(audio_path, "rb")
                rec = vosk.KaldiRecognizer(self.vosk_model, wf.getframerate())
                results = []
                while True:
                    data = wf.readframes(4000)
                    if len(data) == 0:
                        break
                    if rec.AcceptWaveform(data):
                        res = json.loads(rec.Result())
                        results.append(res.get("text", ""))
                final_res = json.loads(rec.FinalResult())
                results.append(final_res.get("text", ""))
                text = " ".join([r for r in results if r]).strip()
                logger.info(f"Vosk STT Transcribed: '{text}'")
                return text
            except Exception as e:
                logger.error(f"Vosk transcription error: {e}")

        logger.warning("No speech engine transcription produced. Returning default voice cue.")
        return ""

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    stt = OfflineSTT()
    print("STT initialized ready.")
