import os
import wave
import time
import subprocess
import logging

logger = logging.getLogger("GauRakshak.Audio")

# Try optional python audio modules
HAS_SOUNDDEVICE = False
try:
    import sounddevice as sd
    import numpy as np
    HAS_SOUNDDEVICE = True
except ImportError:
    HAS_SOUNDDEVICE = False

HAS_PYGAME = False
try:
    import pygame
    pygame.mixer.init()
    HAS_PYGAME = True
except Exception:
    HAS_PYGAME = False


class AudioRecorder:
    def __init__(self, sample_rate=16000, duration=4, output_path="audio/input.wav"):
        self.sample_rate = sample_rate
        self.duration = duration
        self.output_path = output_path
        os.makedirs(os.path.dirname(self.output_path), exist_ok=True)

    def record(self, duration=None, progress_callback=None):
        duration = duration or self.duration
        logger.info(f"Recording audio for {duration} seconds...")

        if HAS_SOUNDDEVICE:
            try:
                recording = sd.rec(
                    int(duration * self.sample_rate),
                    samplerate=self.sample_rate,
                    channels=1,
                    dtype='int16'
                )
                start_t = time.time()
                while time.time() - start_t < duration:
                    if progress_callback:
                        progress_callback(time.time() - start_t, duration)
                    time.sleep(0.1)
                sd.wait()

                # Save WAV file
                with wave.open(self.output_path, 'wb') as wf:
                    wf.setnchannels(1)
                    wf.setsampwidth(2) # 16-bit
                    wf.setframerate(self.sample_rate)
                    wf.writeframes(recording.tobytes())

                logger.info(f"Audio recorded successfully to {self.output_path}")
                return self.output_path
            except Exception as e:
                logger.error(f"sounddevice recording failed: {e}. Trying CLI fallback...")

        # Fallback to system command 'arecord' (Linux / Raspberry Pi OS)
        try:
            cmd = [
                "arecord",
                "-D", "default",
                "-f", "S16_LE",
                "-r", str(self.sample_rate),
                "-c", "1",
                "-d", str(duration),
                self.output_path
            ]
            subprocess.run(cmd, check=True)
            logger.info(f"arecord captured audio to {self.output_path}")
            return self.output_path
        except Exception as e:
            logger.error(f"arecord failed: {e}")

        # Final safety fallback: Write 1 second silent WAV file
        self._write_dummy_wav(duration)
        return self.output_path

    def _write_dummy_wav(self, duration):
        with wave.open(self.output_path, 'wb') as wf:
            wf.setnchannels(1)
            wf.setsampwidth(2)
            wf.setframerate(self.sample_rate)
            dummy_data = b'\x00' * (self.sample_rate * 2 * int(duration))
            wf.writeframes(dummy_data)


class AudioPlayer:
    def __init__(self, audio_path="audio/response.wav"):
        self.audio_path = audio_path

    def play(self, file_path=None):
        target_path = file_path or self.audio_path
        if not os.path.exists(target_path):
            logger.warning(f"Audio file to play does not exist: {target_path}")
            return False

        logger.info(f"Playing audio: {target_path}")

        # Pygame mixer playback
        if HAS_PYGAME:
            try:
                pygame.mixer.music.load(target_path)
                pygame.mixer.music.play()
                while pygame.mixer.music.get_busy():
                    time.sleep(0.05)
                return True
            except Exception as e:
                logger.error(f"pygame playback error: {e}")

        # Linux / Raspberry Pi OS `aplay` command
        try:
            subprocess.run(["aplay", target_path], check=True)
            return True
        except Exception:
            pass

        # Windows `winsound` fallback (for local development testing)
        try:
            import winsound
            winsound.PlaySound(target_path, winsound.SND_FILENAME)
            return True
        except Exception:
            pass

        logger.warning("No audio player engine available.")
        return False
