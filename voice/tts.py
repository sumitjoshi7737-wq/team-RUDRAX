import os
import wave
import subprocess
import logging

logger = logging.getLogger("GauRakshak.OfflineTTS")

HAS_PYTTSX3 = False
try:
    import pyttsx3
    HAS_PYTTSX3 = True
except ImportError:
    HAS_PYTTSX3 = False


class OfflineTTS:
    def __init__(self, piper_model_path=None, output_path="audio/response.wav"):
        self.output_path = output_path
        self.piper_model_path = piper_model_path
        os.makedirs(os.path.dirname(self.output_path), exist_ok=True)
        self.pyttsx3_engine = None
        self._init_engine()

    def _init_engine(self):
        if HAS_PYTTSX3:
            try:
                self.pyttsx3_engine = pyttsx3.init()
                self.pyttsx3_engine.setProperty('rate', 150)
                self.pyttsx3_engine.setProperty('volume', 0.9)
                logger.info("pyttsx3 TTS engine initialized.")
            except Exception as e:
                logger.warning(f"pyttsx3 initialization failed: {e}")

    def synthesize(self, text, output_file=None):
        out_path = output_file or self.output_path
        if not text:
            return None

        logger.info(f"Synthesizing speech for: '{text[:60]}...'")

        # 1. Piper TTS CLI / python (Primary neural TTS for RPi 4)
        if self.piper_model_path and os.path.exists(self.piper_model_path):
            try:
                cmd = f'echo "{text}" | piper --model {self.piper_model_path} --output_file {out_path}'
                subprocess.run(cmd, shell=True, check=True)
                logger.info(f"Piper TTS successfully synthesized WAV to {out_path}")
                return out_path
            except Exception as e:
                logger.error(f"Piper TTS synthesis failed: {e}")

        # 2. pyttsx3 fallback synthesis to WAV file
        if self.pyttsx3_engine:
            try:
                self.pyttsx3_engine.save_to_file(text, out_path)
                self.pyttsx3_engine.runAndWait()
                if os.path.exists(out_path) and os.path.getsize(out_path) > 0:
                    logger.info(f"pyttsx3 synthesized speech to {out_path}")
                    return out_path
            except Exception as e:
                logger.error(f"pyttsx3 synthesis error: {e}")

        # 3. espeak-ng system CLI fallback (Standard on Raspberry Pi OS)
        try:
            cmd = ["espeak-ng", "-v", "en-us", "-s", "150", "-w", out_path, text]
            subprocess.run(cmd, check=True)
            logger.info(f"espeak-ng synthesized speech to {out_path}")
            return out_path
        except Exception as e:
            logger.error(f"espeak-ng CLI synthesis error: {e}")

        # Safety dummy audio generator
        self._write_silent_wav(out_path)
        return out_path

    def _write_silent_wav(self, file_path):
        with wave.open(file_path, 'wb') as wf:
            wf.setnchannels(1)
            wf.setsampwidth(2)
            wf.setframerate(22050)
            wf.writeframes(b'\x00' * 44100) # 1 sec silence

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    tts = OfflineTTS()
    tts.synthesize("Gau Rakshak offline voice assistant ready.")
