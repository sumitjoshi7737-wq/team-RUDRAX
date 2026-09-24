import json
import os
import re
import urllib.request
import urllib.parse
from difflib import SequenceMatcher
from config.settings import GEMINI_API_KEY, DEFAULT_LANGUAGE

class KnowledgeMatcher:
    def __init__(self, knowledge_dir=None):
        if knowledge_dir is None:
            knowledge_dir = os.path.dirname(os.path.abspath(__file__))
        
        self.knowledge_dir = knowledge_dir
        self.questions_file = os.path.join(knowledge_dir, "questions.json")
        self.mastitis_file = os.path.join(knowledge_dir, "mastitis.json")
        self.project_file = os.path.join(knowledge_dir, "project.json")
        self.team_file = os.path.join(knowledge_dir, "team.json")
        
        self.questions_data = self._load_json(self.questions_file, default=[])
        self.mastitis_data = self._load_json(self.mastitis_file, default={})
        self.project_data = self._load_json(self.project_file, default={})
        self.team_data = self._load_json(self.team_file, default={})
        self.api_key = GEMINI_API_KEY

    def _load_json(self, filepath, default):
        if os.path.exists(filepath):
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception as e:
                print(f"[KnowledgeMatcher] Error loading {filepath}: {e}")
        return default

    def _normalize(self, text):
        if not text:
            return ""
        text = text.lower()
        text = re.sub(r'[^\w\s]', ' ', text)
        text = re.sub(r'\s+', ' ', text).strip()
        return text

    def _similarity_ratio(self, str1, str2):
        return SequenceMatcher(None, str1, str2).ratio()

    def get_answer(self, query, lang=DEFAULT_LANGUAGE, use_gemini=True):
        """
        Retrieves answer using Gemini API when available (online), with instant fallback
        to local knowledge base (Devanagari Hindi, English, Hinglish) when offline.
        """
        # 1. Try Gemini API if internet is connected and key is present
        if use_gemini and self.api_key and len(self.api_key) > 10:
            gemini_ans = self._query_gemini_api(query, lang)
            if gemini_ans:
                return gemini_ans

        # 2. Local Knowledge Base Match (100% Offline Mode)
        return self._get_local_answer(query, lang)

    def _query_gemini_api(self, query, lang):
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={self.api_key}"
            
            system_instruction = (
                "You are the official voice assistant for 'Gau Rakshak' developed by Team RUDRAX (Sumit Joshi, Mahendra Kumar, Nandani Parashar, Uttam Soni, Mentor Latif Khan) at GITS Udaipur. "
                "CRITICAL SAFETY RULE: Gau Rakshak provides early risk forecasting for cow mastitis, NOT confirmed medical diagnosis. Never prescribe medicine or dosage. For high risk, recommend veterinary checkup. "
                "DHT11 measures shed temperature/humidity (NOT milk temp). AS7343 is spectral sensor (not standalone diagnostic). "
            )
            
            if lang == "hi":
                system_instruction += "Respond in proper, clean Devanagari Hindi (हिंदी) in 2-3 concise sentences."
            elif lang == "en":
                system_instruction += "Respond in clear English in 2-3 concise sentences."
            else:
                system_instruction += "Respond in natural Hinglish in 2-3 concise sentences."

            payload = {
                "contents": [
                    {
                        "role": "user",
                        "parts": [{"text": f"{system_instruction}\nUser Question: {query}"}]
                    }
                ],
                "generationConfig": {
                    "temperature": 0.3,
                    "maxOutputTokens": 200
                }
            }

            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode('utf-8'),
                headers={'Content-Type': 'application/json'},
                method='POST'
            )

            with urllib.request.urlopen(req, timeout=3.5) as response:
                if response.status == 200:
                    res_body = json.loads(response.read().decode('utf-8'))
                    candidates = res_body.get("candidates", [])
                    if candidates:
                        parts = candidates[0].get("content", {}).get("parts", [])
                        if parts:
                            text_resp = parts[0].get("text", "").strip()
                            if text_resp:
                                print("[KnowledgeMatcher] Online answer generated via Gemini API.")
                                return text_resp
        except Exception as e:
            print(f"[KnowledgeMatcher] Gemini API query skipped/offline fallback: {e}")
        return None

    def _get_local_answer(self, query, lang):
        normalized_query = self._normalize(query)
        if not normalized_query:
            if lang == "hi":
                return "कृपया अपना सवाल पूछें। मैं गौ रक्षक प्रोजेक्ट, मैस्टाइटिस के लक्षण और टीम के बारे में बता सकता हूँ।"
            elif lang == "en":
                return "Please ask your question. I can tell you about Gau Rakshak, mastitis symptoms, or the team."
            return "Kripya apna sawal puchein. Main Gau Rakshak project, mastitis symptoms, ya team ke baare mein bata sakta hoon."

        best_entry = None
        best_score = 0.0

        for entry in self.questions_data:
            # Check pattern matches
            for pattern in entry.get("patterns", []):
                norm_pattern = self._normalize(pattern)
                if norm_pattern == normalized_query:
                    return self._format_entry_response(entry, lang)
                
                sim = self._similarity_ratio(norm_pattern, normalized_query)
                if sim > best_score:
                    best_score = sim
                    best_entry = entry

            # Check keyword matches
            keywords = entry.get("keywords", [])
            query_words = set(normalized_query.split())
            keyword_matches = sum(1 for kw in keywords if kw.lower() in query_words)
            if keywords:
                overlap_score = (keyword_matches / len(keywords)) * 0.85
                if overlap_score > best_score:
                    best_score = overlap_score
                    best_entry = entry

        if best_score >= 0.40 and best_entry:
            return self._format_entry_response(best_entry, lang)

        # Keyword fallbacks
        if "lead" in normalized_query or "sumit" in normalized_query or "सुमित" in normalized_query:
            if lang == "hi":
                return "टीम रुद्रैक्स (RUDRAX) के टीम लीड और हार्डवेयर प्रमुख सुमित जोशी (Sumit Joshi) हैं।"
            elif lang == "en":
                return "The Team Lead and Hardware Lead of Team RUDRAX is Sumit Joshi."
            return "Team RUDRAX ke Team Lead aur Hardware Lead Sumit Joshi hain."

        if "mentor" in normalized_query or "latif" in normalized_query or "लतीफ" in normalized_query:
            if lang == "hi":
                return "गौ रक्षक प्रोजेक्ट के मेंटॉर लतीफ खान (Latif Khan) हैं।"
            elif lang == "en":
                return "The Project Mentor of Team RUDRAX is Latif Khan."
            return "Team RUDRAX ke Project Mentor Latif Khan hain."

        if "dht11" in normalized_query or "dht" in normalized_query:
            if lang == "hi":
                return "DHT11 सेंसर शेड का पर्यावरणीय तापमान और आर्द्रता मापता है। यह दूध का तापमान नहीं मापता।"
            elif lang == "en":
                return "DHT11 measures shed ambient temperature and humidity. It is not a milk temperature sensor."
            return "DHT11 sensor shed ka environmental temperature aur humidity measure karta hai."

        if "as7343" in normalized_query or "spectral" in normalized_query:
            if lang == "hi":
                return "AS7343 एक 11-चैनल स्पेक्ट्रल सेंसर है जो ऑप्टिकल स्पेक्ट्रल डेटा मापता है। यह अकेला डायग्नोस्टिक डिवाइस नहीं है।"
            elif lang == "en":
                return "AS7343 is an 11-channel optical spectral sensor used in data fusion, not a standalone diagnostic tool."
            return "AS7343 ek 11-channel spectral sensor hai."

        if "college" in normalized_query or "gits" in normalized_query or "udaipur" in normalized_query:
            if lang == "hi":
                return "गौ रक्षक गीतांजलि इंस्टीट्यूट ऑफ टेक्निकल स्टडीज (GITS), उदयपुर के कंप्यूटर साइंस विभाग में बनाया गया है।"
            elif lang == "en":
                return "Gau Rakshak was developed at Geetanjali Institute of Technical Studies (GITS), Udaipur."
            return "Gau Rakshak Geetanjali Institute of Technical Studies (GITS), Udaipur mein develop hua hai."

        if lang == "hi":
            return "मैं गौ रक्षक, मैस्टाइटिस जोखिम पूर्वानुमान, रास्पबेरी पाई, और टीम रुद्रैक्स के बारे में बता सकता हूँ। कृपया अपना सवाल पुनः पूछें।"
        elif lang == "en":
            return "I can answer questions about Gau Rakshak, mastitis risk forecasting, Raspberry Pi 4, and Team RUDRAX. Please ask again."
        return "Main Gau Rakshak, Mastitis risk forecasting, Raspberry Pi, team RUDRAX aur sensors ke baare mein bata sakta hoon. Kripya apna sawal doobara puchein."

    def _format_entry_response(self, entry, lang):
        if lang == "hi" and "response_hi" in entry:
            return entry["response_hi"]
        elif lang == "en" and "response_en" in entry:
            return entry["response_en"]
        return entry.get("response", "")
