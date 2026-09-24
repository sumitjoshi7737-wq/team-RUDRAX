import os
import subprocess
import sys
import wave
from config.settings import OUTPUT_WAV_PATH

class TTSEngine:
    def __init__(self, output_path=OUTPUT_WAV_PATH):
        self.output_path = output_path
        self.pyttsx_engine = None
        self._init_engine()

    def _init_engine(self):
        try:
            import pyttsx3
            self.pyttsx_engine = pyttsx3.init()
            # Set speech rate and volume suitable for speaker output
            self.pyttsx_engine.setProperty('rate', 150)
            self.pyttsx_engine.setProperty('volume', 1.0)
            print("[TTSEngine] pyttsx3 offline engine initialized.")
        except Exception as e:
            print(f"[TTSEngine] pyttsx3 initialization failed: {e}")

    def speak(self, text, status_callback=None):
        if not text:
            return

        if status_callback:
            status_callback("SPEAKING")

        print(f"[TTSEngine] Synthesizing speech: '{text}'...")

        # A. Try Piper TTS if piper binary is installed on Raspberry Pi
        piper_success = self._speak_piper(text)
        if piper_success:
            self.play_last_audio()
            if status_callback:
                status_callback("READY")
            return

        # B. Try pyttsx3 offline engine
        if self.pyttsx_engine:
            try:
                # Save to file or speak directly
                self.pyttsx_engine.save_to_file(text, self.output_path)
                self.pyttsx_engine.runAndWait()
                self.play_last_audio()
                if status_callback:
                    status_callback("READY")
                return
            except Exception as e:
                print(f"[TTSEngine] pyttsx3 speak failed: {e}")

        # C. Try espeak / espeak-ng via CLI fallback on Raspberry Pi Linux
        try:
            cmd = ["espeak-ng", "-w", self.output_path, text]
            subprocess.run(cmd, check=True)
            self.play_last_audio()
            if status_callback:
                status_callback("READY")
            return
        except Exception as e:
            print(f"[TTSEngine] espeak-ng CLI fallback failed: {e}")

        print("[TTSEngine] Speech synthesis completed.")
        if status_callback:
            status_callback("READY")

    def _speak_piper(self, text):
        piper_model_path = os.path.join(os.path.dirname(__file__), "hi_IN-dii-medium.onnx")
        if not os.path.exists(piper_model_path):
            return False

        try:
            cmd = f'echo "{text}" | piper --model {piper_model_path} --output_file {self.output_path}'
            subprocess.run(cmd, shell=True, check=True)
            print(f"[TTSEngine] Generated speech via Piper TTS to {self.output_path}")
            return True
        except Exception as e:
            print(f"[TTSEngine] Piper execution error: {e}")
            return False

    def play_last_audio(self):
        if not os.path.exists(self.output_path):
            print("[TTSEngine] No audio file available to play.")
            return

        print(f"[TTSEngine] Playing audio output file: {self.output_path}...")

        # 1. Try sounddevice
        try:
            import sounddevice as sd
            import soundfile as sf
            data, fs = sf.read(self.output_path, dtype='float32')
            sd.play(data, fs)
            sd.wait()
            return
        except Exception as e:
            print(f"[TTSEngine] sounddevice playback failed: {e}")

        # 2. Try Linux native 'aplay' (Raspberry Pi 3.5mm/USB speaker output)
        try:
            subprocess.run(["aplay", self.output_path], check=True)
            return
        except Exception as e:
            print(f"[TTSEngine] aplay failed: {e}")

        # 3. Try Windows winsound
        if sys.platform == "win32":
            try:
                import winsound
                winsound.PlaySound(self.output_path, winsound.SND_FILENAME)
                return
            except Exception as e:
                print(f"[TTSEngine] winsound playback failed: {e}")
