import tkinter as tk
from tkinter import ttk, scrolledtext
import threading
import os
import sys

from config.settings import (
    BG_COLOR, CARD_BG, ACCENT_BLUE, TEXT_COLOR, 
    GREEN_OFFLINE, YELLOW_STATUS, RED_ERROR,
    DEFAULT_LANGUAGE
)
from knowledge.matcher import KnowledgeMatcher
from voice.recorder import VoiceRecorder
from voice.stt.stt_engine import STTEngine
from voice.tts.tts_engine import TTSEngine

class GauRakshakGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("GAU RAKSHAK - RUDRAX (Offline / Gemini Voice Assistant)")
        self.root.geometry("820x560")
        self.root.configure(bg=BG_COLOR)

        # Selected Language ("hi" for Hindi Devanagari, "en" for English, "hinglish" for Hinglish)
        self.selected_lang = DEFAULT_LANGUAGE

        # Initialize engines
        self.matcher = KnowledgeMatcher()
        self.recorder = VoiceRecorder()
        self.stt_engine = STTEngine()
        self.tts_engine = TTSEngine()

        self.last_response_text = ""
        self.is_busy = False

        self._build_ui()

    def _build_ui(self):
        # 1. Header Frame
        header_frame = tk.Frame(self.root, bg=CARD_BG, pady=10, px=16)
        header_frame.pack(fill="x", side="top")

        title_label = tk.Label(
            header_frame, 
            text="GAU RAKSHAK", 
            font=("Helvetica", 18, "bold"), 
            fg=ACCENT_BLUE, 
            bg=CARD_BG
        )
        title_label.pack(side="left")

        subtitle_label = tk.Label(
            header_frame, 
            text="  |  RUDRAX", 
            font=("Helvetica", 13, "bold"), 
            fg=TEXT_COLOR, 
            bg=CARD_BG
        )
        subtitle_label.pack(side="left")

        offline_badge = tk.Label(
            header_frame, 
            text="● HYBRID / OFFLINE MODE", 
            font=("Helvetica", 11, "bold"), 
            fg=GREEN_OFFLINE, 
            bg=CARD_BG,
            padx=8
        )
        offline_badge.pack(side="right")

        # 2. Controls & Language Selection Frame
        ctrl_frame = tk.Frame(self.root, bg=BG_COLOR, pady=6)
        ctrl_frame.pack(fill="x")

        status_title = tk.Label(
            ctrl_frame, 
            text="Status: ", 
            font=("Helvetica", 11, "bold"), 
            fg=TEXT_COLOR, 
            bg=BG_COLOR
        )
        status_title.pack(side="left", padx=(20, 0))

        self.status_label = tk.Label(
            ctrl_frame, 
            text="READY", 
            font=("Helvetica", 11, "bold"), 
            fg=GREEN_OFFLINE, 
            bg=CARD_BG,
            padx=10,
            pady=3,
            relief="flat"
        )
        self.status_label.pack(side="left", padx=5)

        # Language Radio Buttons / Selector
        lang_title = tk.Label(
            ctrl_frame, 
            text="Language: ", 
            font=("Helvetica", 11, "bold"), 
            fg=TEXT_COLOR, 
            bg=BG_COLOR
        )
        lang_title.pack(side="left", padx=(30, 5))

        self.lang_var = tk.StringVar(value=self.selected_lang)

        btn_hi = tk.Radiobutton(
            ctrl_frame, text="हिंदी (Hindi)", variable=self.lang_var, value="hi",
            font=("Helvetica", 10, "bold"), fg=ACCENT_BLUE, bg=BG_COLOR,
            selectcolor=CARD_BG, activebackground=BG_COLOR, command=self._on_lang_change
        )
        btn_hi.pack(side="left", padx=3)

        btn_en = tk.Radiobutton(
            ctrl_frame, text="English", variable=self.lang_var, value="en",
            font=("Helvetica", 10, "bold"), fg=TEXT_COLOR, bg=BG_COLOR,
            selectcolor=CARD_BG, activebackground=BG_COLOR, command=self._on_lang_change
        )
        btn_en.pack(side="left", padx=3)

        btn_hing = tk.Radiobutton(
            ctrl_frame, text="Hinglish", variable=self.lang_var, value="hinglish",
            font=("Helvetica", 10, "bold"), fg=GREEN_OFFLINE, bg=BG_COLOR,
            selectcolor=CARD_BG, activebackground=BG_COLOR, command=self._on_lang_change
        )
        btn_hing.pack(side="left", padx=3)

        # 3. Conversation Area
        conv_frame = tk.Frame(self.root, bg=BG_COLOR, padx=20, pady=5)
        conv_frame.pack(fill="both", expand=True)

        self.chat_display = scrolledtext.ScrolledText(
            conv_frame,
            wrap=tk.WORD,
            font=("Segoe UI", 12),
            bg=CARD_BG,
            fg=TEXT_COLOR,
            insertbackground=TEXT_COLOR,
            relief="flat",
            bd=0,
            padx=12,
            pady=12
        )
        self.chat_display.pack(fill="both", expand=True)
        self.chat_display.config(state=tk.DISABLED)

        # Configure tags for styling User vs Gau Rakshak messages
        self.chat_display.tag_config("user_header", font=("Helvetica", 11, "bold"), foreground=ACCENT_BLUE)
        self.chat_display.tag_config("user_body", font=("Segoe UI", 11), foreground=TEXT_COLOR)
        self.chat_display.tag_config("assistant_header", font=("Helvetica", 11, "bold"), foreground=GREEN_OFFLINE)
        self.chat_display.tag_config("assistant_body", font=("Segoe UI", 11), foreground=TEXT_COLOR)
        self.chat_display.tag_config("sys_msg", font=("Helvetica", 10, "italic"), foreground="#A6ADC8")

        # Welcome message in chat
        self._append_system_msg("System ready. Native Voice Assistant active (Offline & Gemini Hybrid support).")
        self._append_system_msg("Safety Rule: Early risk forecasting only, NOT confirmed medical diagnosis.")

        # 4. Action Buttons Frame
        btn_frame = tk.Frame(self.root, bg=BG_COLOR, pady=12)
        btn_frame.pack(fill="x", side="bottom")

        self.ask_btn = tk.Button(
            btn_frame,
            text="🎤 ASK",
            font=("Helvetica", 13, "bold"),
            bg=ACCENT_BLUE,
            fg="#11111B",
            activebackground="#74C7EC",
            activeforeground="#11111B",
            bd=0,
            padx=25,
            pady=8,
            cursor="hand2",
            command=self.start_voice_session
        )
        self.ask_btn.pack(side="left", padx=(100, 20), expand=True)

        self.replay_btn = tk.Button(
            btn_frame,
            text="🔊 REPLAY",
            font=("Helvetica", 13, "bold"),
            bg="#A6E3A1",
            fg="#11111B",
            activebackground="#94E2D5",
            activeforeground="#11111B",
            bd=0,
            padx=25,
            pady=8,
            cursor="hand2",
            command=self.replay_last_response
        )
        self.replay_btn.pack(side="right", padx=(20, 100), expand=True)

    def _on_lang_change(self):
        self.selected_lang = self.lang_var.get()
        self._append_system_msg(f"Language changed to: {self.selected_lang.upper()}")

    def set_status(self, status_text):
        def _update():
            self.status_label.config(text=status_text)
            if status_text == "READY":
                self.status_label.config(fg=GREEN_OFFLINE)
            elif status_text in ["LISTENING", "PROCESSING", "SPEAKING"]:
                self.status_label.config(fg=YELLOW_STATUS)
            elif status_text == "ERROR":
                self.status_label.config(fg=RED_ERROR)
        self.root.after(0, _update)

    def _append_system_msg(self, msg):
        self.chat_display.config(state=tk.NORMAL)
        self.chat_display.insert(tk.END, f"[INFO] {msg}\n\n", "sys_msg")
        self.chat_display.see(tk.END)
        self.chat_display.config(state=tk.DISABLED)

    def append_user_msg(self, text):
        def _update():
            self.chat_display.config(state=tk.NORMAL)
            self.chat_display.insert(tk.END, "USER:\n", "user_header")
            self.chat_display.insert(tk.END, f"{text}\n\n", "user_body")
            self.chat_display.see(tk.END)
            self.chat_display.config(state=tk.DISABLED)
        self.root.after(0, _update)

    def append_assistant_msg(self, text):
        def _update():
            self.chat_display.config(state=tk.NORMAL)
            self.chat_display.insert(tk.END, "GAU RAKSHAK:\n", "assistant_header")
            self.chat_display.insert(tk.END, f"{text}\n\n", "assistant_body")
            self.chat_display.see(tk.END)
            self.chat_display.config(state=tk.DISABLED)
        self.root.after(0, _update)

    def start_voice_session(self):
        if self.is_busy:
            return
        self.is_busy = True
        self.ask_btn.config(state=tk.DISABLED)
        self.replay_btn.config(state=tk.DISABLED)

        threading.Thread(target=self._voice_session_worker, daemon=True).start()

    def _voice_session_worker(self):
        try:
            # 1. Listen
            self.set_status("LISTENING")
            audio_path = self.recorder.record(duration=5, status_callback=self.set_status)

            # 2. Transcribe (STT)
            self.set_status("PROCESSING")
            query_text = self.stt_engine.transcribe(audio_path)

            if not query_text:
                if self.selected_lang == "hi":
                    query_text = "मैस्टाइटिस के शुरुआती लक्षण क्या हैं?"
                elif self.selected_lang == "en":
                    query_text = "What are the early symptoms of mastitis?"
                else:
                    query_text = "Mastitis ke early symptoms kya hain?"

            self.append_user_msg(query_text)

            # 3. Knowledge Retrieval (Gemini API online or local offline matching)
            answer_text = self.matcher.get_answer(query_text, lang=self.selected_lang)
            self.last_response_text = answer_text
            self.append_assistant_msg(answer_text)

            # 4. Text-to-Speech Output (TTS)
            self.set_status("SPEAKING")
            self.tts_engine.speak(answer_text, status_callback=self.set_status)

        except Exception as e:
            print(f"[GUI Worker Error]: {e}")
            self.set_status("ERROR")
            self._append_system_msg(f"Error during execution: {e}")
        finally:
            self.set_status("READY")
            self.is_busy = False
            self.root.after(0, lambda: self.ask_btn.config(state=tk.NORMAL))
            self.root.after(0, lambda: self.replay_btn.config(state=tk.NORMAL))

    def replay_last_response(self):
        if self.is_busy or not self.last_response_text:
            return
        self.is_busy = True
        self.ask_btn.config(state=tk.DISABLED)
        self.replay_btn.config(state=tk.DISABLED)

        def _replay_worker():
            try:
                self.set_status("SPEAKING")
                self.tts_engine.speak(self.last_response_text, status_callback=self.set_status)
            except Exception as e:
                print(f"[Replay Error]: {e}")
                self.set_status("ERROR")
            finally:
                self.set_status("READY")
                self.is_busy = False
                self.root.after(0, lambda: self.ask_btn.config(state=tk.NORMAL))
                self.root.after(0, lambda: self.replay_btn.config(state=tk.NORMAL))

        threading.Thread(target=_replay_worker, daemon=True).start()
