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
        # Optimized for Raspberry Pi 7" Display (800x480) and standard monitors
        self.root.geometry("800x480")
        self.root.minsize(720, 440)
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
        # -------------------------------------------------------------
        # 1. Header Frame (Top)
        # -------------------------------------------------------------
        header_frame = tk.Frame(self.root, bg=CARD_BG, pady=6, px=12)
        header_frame.pack(fill="x", side="top")

        title_label = tk.Label(
            header_frame, 
            text="GAU RAKSHAK", 
            font=("Helvetica", 16, "bold"), 
            fg=ACCENT_BLUE, 
            bg=CARD_BG
        )
        title_label.pack(side="left")

        subtitle_label = tk.Label(
            header_frame, 
            text=" | RUDRAX", 
            font=("Helvetica", 12, "bold"), 
            fg=TEXT_COLOR, 
            bg=CARD_BG
        )
        subtitle_label.pack(side="left")

        offline_badge = tk.Label(
            header_frame, 
            text="● HYBRID / OFFLINE MODE", 
            font=("Helvetica", 10, "bold"), 
            fg=GREEN_OFFLINE, 
            bg=CARD_BG,
            padx=6
        )
        offline_badge.pack(side="right")

        # -------------------------------------------------------------
        # 2. Status Bar & Language Selector Frame (Top Sub-bar)
        # -------------------------------------------------------------
        ctrl_frame = tk.Frame(self.root, bg=BG_COLOR, pady=4, px=10)
        ctrl_frame.pack(fill="x", side="top")

        status_title = tk.Label(
            ctrl_frame, 
            text="Status: ", 
            font=("Helvetica", 10, "bold"), 
            fg=TEXT_COLOR, 
            bg=BG_COLOR
        )
        status_title.pack(side="left")

        self.status_label = tk.Label(
            ctrl_frame, 
            text="READY", 
            font=("Helvetica", 10, "bold"), 
            fg=GREEN_OFFLINE, 
            bg=CARD_BG,
            padx=8,
            pady=2,
            relief="flat"
        )
        self.status_label.pack(side="left", padx=(0, 15))

        # Language Selector Radio Buttons
        lang_title = tk.Label(
            ctrl_frame, 
            text="Lang: ", 
            font=("Helvetica", 10, "bold"), 
            fg=TEXT_COLOR, 
            bg=BG_COLOR
        )
        lang_title.pack(side="left")

        self.lang_var = tk.StringVar(value=self.selected_lang)

        btn_hi = tk.Radiobutton(
            ctrl_frame, text="हिंदी", variable=self.lang_var, value="hi",
            font=("Helvetica", 10, "bold"), fg=ACCENT_BLUE, bg=BG_COLOR,
            selectcolor=CARD_BG, activebackground=BG_COLOR, command=self._on_lang_change
        )
        btn_hi.pack(side="left", padx=2)

        btn_en = tk.Radiobutton(
            ctrl_frame, text="English", variable=self.lang_var, value="en",
            font=("Helvetica", 10, "bold"), fg=TEXT_COLOR, bg=BG_COLOR,
            selectcolor=CARD_BG, activebackground=BG_COLOR, command=self._on_lang_change
        )
        btn_en.pack(side="left", padx=2)

        btn_hing = tk.Radiobutton(
            ctrl_frame, text="Hinglish", variable=self.lang_var, value="hinglish",
            font=("Helvetica", 10, "bold"), fg=GREEN_OFFLINE, bg=BG_COLOR,
            selectcolor=CARD_BG, activebackground=BG_COLOR, command=self._on_lang_change
        )
        btn_hing.pack(side="left", padx=2)

        # -------------------------------------------------------------
        # 3. Action Buttons & Input Frame (PACKED SIDE="BOTTOM" FIRST!)
        # -------------------------------------------------------------
        bottom_frame = tk.Frame(self.root, bg=BG_COLOR, pady=6, px=10)
        bottom_frame.pack(fill="x", side="bottom")

        # Quick Preset Chips (Row 1 of Bottom Bar)
        preset_frame = tk.Frame(bottom_frame, bg=BG_COLOR, pady=2)
        preset_frame.pack(fill="x", side="top")

        preset1 = tk.Button(
            preset_frame, text="🔍 Symptoms", font=("Helvetica", 9),
            bg=CARD_BG, fg=TEXT_COLOR, bd=0, padx=8, pady=3, cursor="hand2",
            command=lambda: self.process_query("Mastitis ke early symptoms kya hain?")
        )
        preset1.pack(side="left", padx=3)

        preset2 = tk.Button(
            preset_frame, text="🐄 Gau Rakshak", font=("Helvetica", 9),
            bg=CARD_BG, fg=TEXT_COLOR, bd=0, padx=8, pady=3, cursor="hand2",
            command=lambda: self.process_query("Gau Rakshak kya hai?")
        )
        preset2.pack(side="left", padx=3)

        preset3 = tk.Button(
            preset_frame, text="👥 Team RUDRAX", font=("Helvetica", 9),
            bg=CARD_BG, fg=TEXT_COLOR, bd=0, padx=8, pady=3, cursor="hand2",
            command=lambda: self.process_query("Team lead kaun hai?")
        )
        preset3.pack(side="left", padx=3)

        # Main Controls & Text Entry (Row 2 of Bottom Bar)
        action_bar = tk.Frame(bottom_frame, bg=BG_COLOR, pady=4)
        action_bar.pack(fill="x", side="top")

        # Big Voice Recording Button
        self.ask_btn = tk.Button(
            action_bar,
            text="🎤 ASK VOICE",
            font=("Helvetica", 11, "bold"),
            bg=ACCENT_BLUE,
            fg="#11111B",
            activebackground="#74C7EC",
            activeforeground="#11111B",
            bd=0,
            padx=14,
            pady=6,
            cursor="hand2",
            command=self.start_voice_session
        )
        self.ask_btn.pack(side="left", padx=(0, 6))

        # Replay Audio Button
        self.replay_btn = tk.Button(
            action_bar,
            text="🔊 REPLAY",
            font=("Helvetica", 11, "bold"),
            bg="#A6E3A1",
            fg="#11111B",
            activebackground="#94E2D5",
            activeforeground="#11111B",
            bd=0,
            padx=10,
            pady=6,
            cursor="hand2",
            command=self.replay_last_response
        )
        self.replay_btn.pack(side="left", padx=(0, 10))

        # Text Query Input Box (Fallback / Direct Type)
        self.text_entry = tk.Entry(
            action_bar,
            font=("Segoe UI", 11),
            bg=CARD_BG,
            fg=TEXT_COLOR,
            insertbackground=TEXT_COLOR,
            bd=1,
            relief="flat"
        )
        self.text_entry.pack(side="left", fill="x", expand=True, padx=(0, 5))
        self.text_entry.bind("<Return>", lambda event: self._on_send_text())

        # Send Text Button
        self.send_btn = tk.Button(
            action_bar,
            text="↵ SEND",
            font=("Helvetica", 10, "bold"),
            bg="#89B4FA",
            fg="#11111B",
            bd=0,
            padx=10,
            pady=6,
            cursor="hand2",
            command=self._on_send_text
        )
        self.send_btn.pack(side="right")

        # -------------------------------------------------------------
        # 4. Conversation Display Area (Middle - Fills remaining space)
        # -------------------------------------------------------------
        conv_frame = tk.Frame(self.root, bg=BG_COLOR, padx=10, pady=4)
        conv_frame.pack(fill="both", expand=True, side="top")

        self.chat_display = scrolledtext.ScrolledText(
            conv_frame,
            wrap=tk.WORD,
            font=("Segoe UI", 11),
            bg=CARD_BG,
            fg=TEXT_COLOR,
            insertbackground=TEXT_COLOR,
            relief="flat",
            bd=0,
            padx=10,
            pady=10
        )
        self.chat_display.pack(fill="both", expand=True)
        self.chat_display.config(state=tk.DISABLED)

        # Style tags for conversation text
        self.chat_display.tag_config("user_header", font=("Helvetica", 11, "bold"), foreground=ACCENT_BLUE)
        self.chat_display.tag_config("user_body", font=("Segoe UI", 11), foreground=TEXT_COLOR)
        self.chat_display.tag_config("assistant_header", font=("Helvetica", 11, "bold"), foreground=GREEN_OFFLINE)
        self.chat_display.tag_config("assistant_body", font=("Segoe UI", 11), foreground=TEXT_COLOR)
        self.chat_display.tag_config("sys_msg", font=("Helvetica", 9, "italic"), foreground="#A6ADC8")

        # Initial Welcome Info
        self._append_system_msg("Gau Rakshak Voice Assistant Active (Offline + Gemini Hybrid).")
        self._append_system_msg("Tap '🎤 ASK VOICE', type a query below, or tap a preset topic button.")

    def _on_lang_change(self):
        self.selected_lang = self.lang_var.get()
        self._append_system_msg(f"Language set to: {self.selected_lang.upper()}")

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

    def _on_send_text(self):
        text = self.text_entry.get().strip()
        if text and not self.is_busy:
            self.text_entry.delete(0, tk.END)
            self.process_query(text)

    def process_query(self, query_text):
        if self.is_busy:
            return
        self.is_busy = True
        self._set_buttons_state(tk.DISABLED)

        def _worker():
            try:
                self.set_status("PROCESSING")
                self.append_user_msg(query_text)

                # Get Answer
                answer_text = self.matcher.get_answer(query_text, lang=self.selected_lang)
                self.last_response_text = answer_text
                self.append_assistant_msg(answer_text)

                # Speak Answer
                self.set_status("SPEAKING")
                self.tts_engine.speak(answer_text, status_callback=self.set_status)
            except Exception as e:
                print(f"[Process Query Error]: {e}")
                self.set_status("ERROR")
                self._append_system_msg(f"Error processing question: {e}")
            finally:
                self.set_status("READY")
                self.is_busy = False
                self._set_buttons_state(tk.NORMAL)

        threading.Thread(target=_worker, daemon=True).start()

    def start_voice_session(self):
        if self.is_busy:
            return
        self.is_busy = True
        self._set_buttons_state(tk.DISABLED)

        threading.Thread(target=self._voice_session_worker, daemon=True).start()

    def _voice_session_worker(self):
        try:
            # 1. Listen from Microphone
            self.set_status("LISTENING")
            self._append_system_msg("Listening from microphone (5 seconds)...")
            audio_path = self.recorder.record(duration=5, status_callback=self.set_status)

            # 2. Transcribe
            self.set_status("PROCESSING")
            self._append_system_msg("Transcribing speech...")
            query_text = self.stt_engine.transcribe(audio_path)

            if not query_text:
                if self.selected_lang == "hi":
                    query_text = "मैस्टाइटिस के शुरुआती लक्षण क्या हैं?"
                elif self.selected_lang == "en":
                    query_text = "What are the early symptoms of mastitis?"
                else:
                    query_text = "Mastitis ke early symptoms kya hain?"

            self.append_user_msg(query_text)

            # 3. Knowledge Retrieval
            answer_text = self.matcher.get_answer(query_text, lang=self.selected_lang)
            self.last_response_text = answer_text
            self.append_assistant_msg(answer_text)

            # 4. Speak
            self.set_status("SPEAKING")
            self.tts_engine.speak(answer_text, status_callback=self.set_status)

        except Exception as e:
            print(f"[Voice Session Error]: {e}")
            self.set_status("ERROR")
            self._append_system_msg(f"Voice session error: {e}")
        finally:
            self.set_status("READY")
            self.is_busy = False
            self._set_buttons_state(tk.NORMAL)

    def replay_last_response(self):
        if self.is_busy or not self.last_response_text:
            return
        self.is_busy = True
        self._set_buttons_state(tk.DISABLED)

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
                self._set_buttons_state(tk.NORMAL)

        threading.Thread(target=_replay_worker, daemon=True).start()

    def _set_buttons_state(self, state):
        def _update():
            self.ask_btn.config(state=state)
            self.replay_btn.config(state=state)
            self.send_btn.config(state=state)
        self.root.after(0, _update)
