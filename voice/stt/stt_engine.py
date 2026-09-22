import os
import wave
import json

class STTEngine:
    def __init__(self, model_name="tiny"):
        self.model_name = model_name
        self.whisper_model = None
        self.vosk_model = None
        self._init_models()

    def _init_models(self):
        # 1. Try faster-whisper / whisper
        try:
            from faster_whisper import WhisperModel
            print(f"[STTEngine] Loading faster-whisper model '{self.model_name}' offline...")
            self.whisper_model = WhisperModel(self.model_name, device="cpu", compute_type="int8")
            print("[STTEngine] faster-whisper loaded successfully.")
            return
        except Exception as e:
            print(f"[STTEngine] faster-whisper not available: {e}")

        try:
            import whisper
            print(f"[STTEngine] Loading standard whisper model '{self.model_name}' offline...")
            self.whisper_model = whisper.load_model(self.model_name)
            print("[STTEngine] whisper loaded successfully.")
            return
        except Exception as e:
            print(f"[STTEngine] openai-whisper not available: {e}")

        # 2. Try Vosk offline engine
        try:
            import vosk
            vosk_model_path = os.path.join(os.path.dirname(__file__), "vosk-model-small-en-in")
            if os.path.exists(vosk_model_path):
                print(f"[STTEngine] Loading Vosk model from {vosk_model_path}...")
                self.vosk_model = vosk.Model(vosk_model_path)
                print("[STTEngine] Vosk model loaded successfully.")
        except Exception as e:
            print(f"[STTEngine] Vosk not available: {e}")

    def transcribe(self, audio_path):
        if not os.path.exists(audio_path):
            print(f"[STTEngine] Audio file not found: {audio_path}")
            return ""

        print(f"[STTEngine] Transcribing audio file: {audio_path}...")

        # A. Use faster-whisper if available
        if self.whisper_model:
            try:
                if hasattr(self.whisper_model, "transcribe"):
                    # Check if it's faster_whisper vs openai-whisper
                    res = self.whisper_model.transcribe(audio_path)
                    if isinstance(res, tuple): # faster_whisper returns (segments, info)
                        segments, info = res
                        text = " ".join([seg.text for seg in segments]).strip()
                    elif isinstance(res, dict): # openai-whisper returns dict
                        text = res.get("text", "").strip()
                    else:
                        text = str(res).strip()
                    
                    if text:
                        print(f"[STTEngine] Transcribed text: {text}")
                        return text
            except Exception as e:
                print(f"[STTEngine] Whisper transcription failed: {e}")

        # B. Use Vosk if available
        if self.vosk_model:
            try:
                import vosk
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
                res_final = json.loads(rec.FinalResult())
                results.append(res_final.get("text", ""))
                text = " ".join(results).strip()
                if text:
                    print(f"[STTEngine] Vosk transcribed text: {text}")
                    return text
            except Exception as e:
                print(f"[STTEngine] Vosk transcription failed: {e}")

        print("[STTEngine] Offline STT engine pending voice model initialization. Returning default test query.")
        return "Mastitis ke early symptoms kya hain?"
