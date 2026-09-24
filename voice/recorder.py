import os
import wave
import time
from config.settings import SAMPLE_RATE, CHANNELS, RECORD_SECONDS, INPUT_WAV_PATH

class VoiceRecorder:
    def __init__(self, output_path=INPUT_WAV_PATH):
        self.output_path = output_path
        self.sample_rate = SAMPLE_RATE
        self.channels = CHANNELS
        self.duration = RECORD_SECONDS

    def record(self, duration=None, status_callback=None):
        if duration is None:
            duration = self.duration

        if status_callback:
            status_callback("LISTENING")

        print(f"[Recorder] Recording audio for {duration} seconds...")

        # 1. Try sounddevice
        try:
            import sounddevice as sd
            audio_data = sd.rec(int(duration * self.sample_rate), samplerate=self.sample_rate, channels=self.channels, dtype='int16')
            sd.wait()
            
            with wave.open(self.output_path, 'wb') as wf:
                wf.setnchannels(self.channels)
                wf.setsampwidth(2) # 16-bit
                wf.setframerate(self.sample_rate)
                wf.writeframes(audio_data.tobytes())
            
            print(f"[Recorder] Audio saved using sounddevice to {self.output_path}")
            return self.output_path
        except Exception as e:
            print(f"[Recorder] sounddevice recording failed: {e}")

        # 2. Try PyAudio
        try:
            import pyaudio
            p = pyaudio.PyAudio()
            stream = p.open(format=pyaudio.paInt16,
                            channels=self.channels,
                            rate=self.sample_rate,
                            input=True,
                            frames_per_buffer=1024)
            frames = []
            for _ in range(0, int(self.sample_rate / 1024 * duration)):
                data = stream.read(1024, exception_on_overflow=False)
                frames.append(data)
            stream.stop_stream()
            stream.close()
            p.terminate()

            with wave.open(self.output_path, 'wb') as wf:
                wf.setnchannels(self.channels)
                wf.setsampwidth(2)
                wf.setframerate(self.sample_rate)
                wf.writeframes(b''.join(frames))

            print(f"[Recorder] Audio saved using PyAudio to {self.output_path}")
            return self.output_path
        except Exception as e:
            print(f"[Recorder] PyAudio recording failed: {e}")

        # 3. Try Linux native 'arecord' (RPi 4 USB mic fallback)
        try:
            import subprocess
            cmd = ["arecord", "-D", "default", "-f", "S16_LE", "-r", str(self.sample_rate), "-c", str(self.channels), "-d", str(duration), self.output_path]
            subprocess.run(cmd, check=True)
            print(f"[Recorder] Audio saved using arecord to {self.output_path}")
            return self.output_path
        except Exception as e:
            print(f"[Recorder] arecord failed: {e}")

        # Dummy fallback file if no mic hardware detected in test mode
        self._create_dummy_wav()
        print(f"[Recorder] Created dummy recording placeholder at {self.output_path}")
        return self.output_path

    def _create_dummy_wav(self):
        with wave.open(self.output_path, 'wb') as wf:
            wf.setnchannels(self.channels)
            wf.setsampwidth(2)
            wf.setframerate(self.sample_rate)
            # 1 sec silence
            wf.writeframes(b'\x00' * (self.sample_rate * 2))
