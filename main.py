#!/usr/bin/env python3
"""
GAU RAKSHAK - Offline Native Voice Assistant for Raspberry Pi 4
Team RUDRAX | Geetanjali Institute of Technical Studies (GITS), Udaipur
CII Lab, Department of Computer Science & Engineering
"""

import os
import sys
import time
import json
import logging
import threading
import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox

# Import Gau Rakshak custom modules
from knowledge.loader import KnowledgeLoader
from knowledge.qa_engine import QAEngine
from voice.audio import AudioRecorder, AudioPlayer
from voice.stt import OfflineSTT
from voice.tts import OfflineTTS

# Configure logging
os.makedirs("logs", exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[
        logging.FileHandler("logs/gau_rakshak.log", encoding="utf-8"),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger("GauRakshak.Main")


class GauRakshakApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Gau Rakshak - Native Offline Voice Assistant")
        self.root.geometry("850x650")
        self.root.minsize(750, 550)
        self.root.configure(bg="#0f172a") # Deep Slate Dark Palette

        # Load configuration
        self.config = self._load_config()

        # Initialize Knowledge Base & QA Engine
        self.loader = KnowledgeLoader()
        self.qa_engine = QAEngine(self.loader)

        # Initialize Voice Subsystem
        stt_cfg = self.config.get("stt", {})
        self.recorder = AudioRecorder(
            sample_rate=stt_cfg.get("sample_rate", 16000),
            duration=stt_cfg.get("recording_duration", 5),
            output_path=self.config.get("paths", {}).get("audio_input", "audio/input.wav")
        )
        self.player = AudioPlayer(
            audio_path=self.config.get("paths", {}).get("audio_output", "audio/response.wav")
        )
        self.stt = OfflineSTT(
            model_size=stt_cfg.get("model_size", "tiny.en"),
            language="en"
        )
        self.tts = OfflineTTS(
            output_path=self.config.get("paths", {}).get("audio_output", "audio/response.wav")
        )

        # Application state
        self.is_processing = False
        self.last_response_text = ""
        self.status_state = "READY"

        # Build Tkinter GUI Layout
        self._build_ui()

        # Initial welcome message (English)
        self.add_message("GAU RAKSHAK", "Welcome! I am Gau Rakshak offline English voice assistant. You can ask about Mastitis risk forecasting, sensor setup (AS7343, DHT11, Thermal camera, RFID), or Team RUDRAX.")

    def _load_config(self):
        cfg_path = "config/config.json"
        if os.path.exists(cfg_path):
            try:
                with open(cfg_path, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception as e:
                logger.error(f"Config load error: {e}")
        return {}

    def _build_ui(self):
        # Master Container
        main_container = tk.Frame(self.root, bg="#0f172a", padx=15, pady=15)
        main_container.pack(fill=tk.BOTH, expand=True)

        # -------------------------------------------------------------------
        # HEADER BAR
        # -------------------------------------------------------------------
        header_frame = tk.Frame(main_container, bg="#1e293b", bd=1, relief=tk.FLAT, padx=15, pady=12)
        header_frame.pack(fill=tk.X, pady=(0, 10))

        title_label = tk.Label(
            header_frame,
            text="GAU RAKSHAK",
            font=("Helvetica", 20, "bold"),
            fg="#10b981", # Emerald Accent
            bg="#1e293b"
        )
        title_label.pack(side=tk.LEFT)

        subtitle_label = tk.Label(
            header_frame,
            text="  |  RUDRAX • GITS Udaipur",
            font=("Helvetica", 12, "bold"),
            fg="#94a3b8",
            bg="#1e293b"
        )
        subtitle_label.pack(side=tk.LEFT, pady=(4, 0))

        # OFFLINE MODE BADGE
        offline_badge = tk.Label(
            header_frame,
            text="● OFFLINE MODE",
            font=("Helvetica", 11, "bold"),
            fg="#34d399", # Bright Green
            bg="#064e3b", # Dark Green Pill
            padx=10,
            pady=4
        )
        offline_badge.pack(side=tk.RIGHT)

        # -------------------------------------------------------------------
        # STATUS INDICATOR BAR
        # -------------------------------------------------------------------
        status_card = tk.Frame(main_container, bg="#1e293b", padx=15, pady=8)
        status_card.pack(fill=tk.X, pady=(0, 10))

        tk.Label(
            status_card,
            text="Status:",
            font=("Helvetica", 11, "bold"),
            fg="#94a3b8",
            bg="#1e293b"
        ).pack(side=tk.LEFT)

        self.status_label = tk.Label(
            status_card,
            text="● READY",
            font=("Helvetica", 12, "bold"),
            fg="#10b981", # Green
            bg="#1e293b",
            padx=8
        )
        self.status_label.pack(side=tk.LEFT)

        # Sub-info ticker / info notice
        self.ticker_label = tk.Label(
            status_card,
            text="Press 🎤 LISTEN (ENGLISH) to speak or type a question below",
            font=("Helvetica", 10, "italic"),
            fg="#64748b",
            bg="#1e293b"
        )
        self.ticker_label.pack(side=tk.RIGHT)

        # -------------------------------------------------------------------
        # CONTROL & BUTTONS PANEL (Pinned to Bottom)
        # -------------------------------------------------------------------
        control_panel = tk.Frame(main_container, bg="#1e293b", padx=12, pady=10)
        control_panel.pack(side=tk.BOTTOM, fill=tk.X)

        # -------------------------------------------------------------------
        # CONVERSATION DISPLAY AREA (Expands above controls)
        # -------------------------------------------------------------------
        chat_frame = tk.Frame(main_container, bg="#1e293b", bd=1, relief=tk.FLAT)
        chat_frame.pack(side=tk.TOP, fill=tk.BOTH, expand=True, pady=(0, 10))

        self.chat_display = scrolledtext.ScrolledText(
            chat_frame,
            wrap=tk.WORD,
            font=("Consolas", 11),
            bg="#0f172a",
            fg="#f8fafc",
            insertbackground="white",
            bd=0,
            padx=12,
            pady=12
        )
        self.chat_display.pack(fill=tk.BOTH, expand=True)
        self.chat_display.config(state=tk.DISABLED)

        # Define text color tags for rich log styling
        self.chat_display.tag_config("user_header", foreground="#38bdf8", font=("Helvetica", 11, "bold"))
        self.chat_display.tag_config("gau_header", foreground="#34d399", font=("Helvetica", 11, "bold"))
        self.chat_display.tag_config("user_msg", foreground="#e2e8f0", font=("Helvetica", 11))
        self.chat_display.tag_config("gau_msg", foreground="#f8fafc", font=("Helvetica", 11))
        self.chat_display.tag_config("system_msg", foreground="#94a3b8", font=("Helvetica", 10, "italic"))

        # Action Buttons Row
        btn_row = tk.Frame(control_panel, bg="#1e293b")
        btn_row.pack(fill=tk.X, pady=(0, 8))

        # 🎤 LISTEN (ENGLISH) Button - Offline STT Model
        self.btn_ask = tk.Button(
            btn_row,
            text="🎤 LISTEN (ENGLISH)",
            font=("Helvetica", 12, "bold"),
            bg="#10b981",
            fg="white",
            activebackground="#059669",
            activeforeground="white",
            bd=0,
            padx=20,
            pady=8,
            cursor="hand2",
            command=self.on_ask_click
        )
        self.btn_ask.pack(side=tk.LEFT, padx=(0, 10))

        # 🔊 REPLAY Button
        self.btn_replay = tk.Button(
            btn_row,
            text="🔊 REPLAY RESPONSE",
            font=("Helvetica", 11, "bold"),
            bg="#3b82f6",
            fg="white",
            activebackground="#2563eb",
            activeforeground="white",
            bd=0,
            padx=16,
            pady=8,
            cursor="hand2",
            command=self.on_replay_click
        )
        self.btn_replay.pack(side=tk.LEFT, padx=(0, 10))

        # ❌ CLEAR Button
        self.btn_clear = tk.Button(
            btn_row,
            text="❌ CLEAR",
            font=("Helvetica", 10),
            bg="#475569",
            fg="white",
            activebackground="#334155",
            bd=0,
            padx=12,
            pady=8,
            cursor="hand2",
            command=self.on_clear_click
        )
        self.btn_clear.pack(side=tk.RIGHT)

        # Text Input Entry Row (Fallback / Direct Type mode)
        entry_row = tk.Frame(control_panel, bg="#1e293b")
        entry_row.pack(fill=tk.X)

        self.text_entry = tk.Entry(
            entry_row,
            font=("Helvetica", 11),
            bg="#0f172a",
            fg="#f8fafc",
            insertbackground="white",
            bd=1,
            relief=tk.SOLID
        )
        self.text_entry.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=(0, 8), ipady=5)
        self.text_entry.bind("<Return>", lambda event: self.on_text_submit())

        self.btn_send = tk.Button(
            entry_row,
            text="SEND",
            font=("Helvetica", 10, "bold"),
            bg="#0284c7",
            fg="white",
            bd=0,
            padx=14,
            pady=5,
            cursor="hand2",
            command=self.on_text_submit
        )
        self.btn_send.pack(side=tk.RIGHT)

    def set_status(self, status, detail=""):
        """Update GUI Status Indicator safely from main or worker thread."""
        self.status_state = status
        color_map = {
            "READY": "#10b981",      # Emerald Green
            "LISTENING": "#f59e0b",  # Amber Yellow
            "PROCESSING": "#3b82f6", # Blue
            "SPEAKING": "#8b5cf6",   # Purple
            "ERROR": "#ef4444"       # Red
        }
        color = color_map.get(status, "#94a3b8")

        def _update():
            self.status_label.config(text=f"● {status}", fg=color)
            if detail:
                self.ticker_label.config(text=detail)

        self.root.after(0, _update)

    def add_message(self, sender, text):
        """Append a formatted message to the scrolled chat display."""
        def _update():
            self.chat_display.config(state=tk.NORMAL)
            timestamp = time.strftime("%H:%M:%S")

            if sender == "USER":
                self.chat_display.insert(tk.END, f"\nUSER ({timestamp}):\n", "user_header")
                self.chat_display.insert(tk.END, f"{text}\n", "user_msg")
            elif sender in ["GAU RAKSHAK", "GAU RAKSHAK VOICE"]:
                self.chat_display.insert(tk.END, f"\nGAU RAKSHAK ({timestamp}):\n", "gau_header")
                self.chat_display.insert(tk.END, f"{text}\n", "gau_msg")
            else:
                self.chat_display.insert(tk.END, f"\n[{sender}]: {text}\n", "system_msg")

            self.chat_display.see(tk.END)
            self.chat_display.config(state=tk.DISABLED)

        self.root.after(0, _update)

    def on_ask_click(self):
        """Trigger voice interaction workflow in a background thread."""
        if self.is_processing:
            return
        self.is_processing = True
        self.btn_ask.config(state=tk.DISABLED, bg="#64748b")
        threading.Thread(target=self._voice_workflow, daemon=True).start()

    def _voice_workflow(self):
        try:
            # 1. LISTENING Phase
            self.set_status("LISTENING", "Microphone active... Speak your question in English now.")
            audio_file = self.recorder.record(duration=5)

            # 2. PROCESSING Phase (STT)
            self.set_status("PROCESSING", "Transcribing English speech offline...")
            user_text = self.stt.transcribe(audio_file)

            if not user_text:
                self.set_status("ERROR", "No English speech detected from microphone.")
                self.add_message("SYSTEM", "No speech detected. Please click 🎤 LISTEN (ENGLISH) to try again.")
                self._reset_buttons()
                return

            self.add_message("USER", user_text)

            # 3. QA Match & Answer Generation
            self.set_status("PROCESSING", "Searching local Gau Rakshak knowledge base...")
            answer_text = self.qa_engine.answer_question(user_text)
            self.last_response_text = answer_text
            self.add_message("GAU RAKSHAK", answer_text)

            # 4. SPEAKING Phase (TTS & Playback)
            self.set_status("SPEAKING", "Synthesizing & playing offline English voice response...")
            wav_file = self.tts.synthesize(answer_text)
            if wav_file:
                self.player.play(wav_file)

            self.set_status("READY", "System ready. Click 🎤 LISTEN (ENGLISH) for next question.")
        except Exception as e:
            logger.error(f"Error in voice workflow: {e}", exc_info=True)
            self.set_status("ERROR", f"System error: {e}")
            self.add_message("SYSTEM", f"Error occurred: {e}")
        finally:
            self._reset_buttons()

    def on_text_submit(self):
        """Submit text from manual entry box."""
        query = self.text_entry.get().strip()
        if not query or self.is_processing:
            return
        self.text_entry.delete(0, tk.END)
        self.is_processing = True
        self.btn_ask.config(state=tk.DISABLED, bg="#64748b")

        threading.Thread(target=self._text_workflow, args=(query,), daemon=True).start()

    def _text_workflow(self, query):
        try:
            self.add_message("USER", query)

            self.set_status("PROCESSING", "Analyzing query in offline knowledge base...")
            answer_text = self.qa_engine.answer_question(query)
            self.last_response_text = answer_text
            self.add_message("GAU RAKSHAK", answer_text)

            self.set_status("SPEAKING", "Synthesizing offline audio...")
            wav_file = self.tts.synthesize(answer_text)
            if wav_file:
                self.player.play(wav_file)

            self.set_status("READY", "System ready.")
        except Exception as e:
            logger.error(f"Error in text workflow: {e}", exc_info=True)
            self.set_status("ERROR", f"Error processing query: {e}")
        finally:
            self._reset_buttons()

    def on_replay_click(self):
        """Replay the last spoken audio response."""
        if not self.last_response_text:
            messagebox.showinfo("Replay", "No response available to replay yet.")
            return

        def _replay_job():
            self.set_status("SPEAKING", "Replaying last response...")
            wav_file = self.config.get("paths", {}).get("audio_output", "audio/response.wav")
            if not os.path.exists(wav_file):
                wav_file = self.tts.synthesize(self.last_response_text)
            self.player.play(wav_file)
            self.set_status("READY", "Replay finished.")

        threading.Thread(target=_replay_job, daemon=True).start()

    def on_clear_click(self):
        """Clear conversation log."""
        self.chat_display.config(state=tk.NORMAL)
        self.chat_display.delete(1.0, tk.END)
        self.chat_display.config(state=tk.DISABLED)
        self.add_message("SYSTEM", "Conversation log cleared.")
        self.set_status("READY", "Log cleared.")

    def _reset_buttons(self):
        def _update():
            self.is_processing = False
            self.btn_ask.config(state=tk.NORMAL, bg="#10b981")
        self.root.after(0, _update)


def main():
    root = tk.Tk()
    app = GauRakshakApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()
