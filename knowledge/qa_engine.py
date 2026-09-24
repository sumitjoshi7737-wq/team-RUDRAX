import re
import logging
from .loader import KnowledgeLoader

logger = logging.getLogger("GauRakshak.QAEngine")

class QAEngine:
    def __init__(self, loader=None):
        self.loader = loader or KnowledgeLoader()

    def normalize_text(self, text):
        if not text:
            return ""
        text = text.lower().strip()
        # Remove punctuation except spaces
        text = re.sub(r'[^\w\s]', ' ', text)
        # Standardize common Hinglish variations
        text = re.sub(r'\bkya h\b', 'kya hai', text)
        text = re.sub(r'\bkaun h\b', 'kaun hai', text)
        text = re.sub(r'\bkaise h\b', 'kaise hai', text)
        text = re.sub(r'\brpi\b', 'raspberry pi', text)
        text = re.sub(r'\brpi4\b', 'raspberry pi 4', text)
        text = re.sub(r'\bml\b', 'ai ml', text)
        text = re.sub(r'\s+', ' ', text).strip()
        return text

    def answer_question(self, user_query):
        norm_query = self.normalize_text(user_query)
        if not norm_query:
            return "Kripya apna prashna boliye ya type karein. Main Gau Rakshak assistant hoon."

        best_match = None
        highest_score = 0

        # Score against all QA items in questions.json
        for qa_item in self.loader.questions_data:
            keywords = qa_item.get("keywords", [])
            score = 0
            for kw in keywords:
                norm_kw = self.normalize_text(kw)
                if norm_kw == norm_query:
                    score += 100  # Exact match
                elif norm_kw in norm_query or norm_query in norm_kw:
                    score += 40   # Substring match
                else:
                    # Token overlap match
                    kw_tokens = set(norm_kw.split())
                    query_tokens = set(norm_query.split())
                    overlap = kw_tokens.intersection(query_tokens)
                    if overlap:
                        score += len(overlap) * 15

            if score > highest_score:
                highest_score = score
                best_match = qa_item

        # Threshold for accepting match
        if best_match and highest_score >= 15:
            # Prefer English answer, fallback to Hinglish
            answer = best_match.get("answer_english") or best_match.get("answer_hinglish")
            return self._apply_safety_guardrails(norm_query, answer)

        # Dynamic fallback matching from JSON data directly
        fallback_answer = self._search_raw_knowledge(norm_query)
        if fallback_answer:
            return self._apply_safety_guardrails(norm_query, fallback_answer)

        # Default polite English response
        default_resp = "Gau Rakshak is an offline AI early mastitis risk forecasting system. You can ask about mastitis symptoms, hardware sensors (AS7343, DHT11, Thermal camera, RFID), or Team RUDRAX."
        return default_resp

    def _search_raw_knowledge(self, norm_query):
        # Team fallbacks in English
        if any(w in norm_query for w in ["gits", "college", "geetanjali"]):
            return f"Gau Rakshak was developed at {self.loader.team_data.get('institution')}, {self.loader.team_data.get('development_location')}."
        if any(w in norm_query for w in ["sumit", "lead", "hardware"]):
            return "Sumit Joshi is the Team Lead who handled Hardware Integration and system architecture."
        if any(w in norm_query for w in ["mahendra", "ai"]):
            return "Mahendra Kumar is the AI/ML Lead responsible for risk prediction algorithms."
        if any(w in norm_query for w in ["nandani", "web"]):
            return "Nandani Parashar handled Web Development & System Designing."
        if any(w in norm_query for w in ["uttam", "software"]):
            return "Uttam Soni handled Software Development."
        if any(w in norm_query for w in ["latif", "mentor"]):
            return "Er. Latif Khan is the Project Mentor & Advisor for Team RUDRAX."

        # Sensor fallbacks
        if "dht11" in norm_query:
            return self.loader.project_data.get("hardware_components", {}).get("dht11")
        if "as7343" in norm_query:
            return self.loader.project_data.get("hardware_components", {}).get("as7343")
        if "thermal" in norm_query:
            return self.loader.project_data.get("hardware_components", {}).get("thermal_camera")
        if "rfid" in norm_query:
            return self.loader.project_data.get("hardware_components", {}).get("rfid")
        if "raspberry" in norm_query or "pi" in norm_query:
            return self.loader.project_data.get("hardware_components", {}).get("raspberry_pi_4")

        return None

    def _apply_safety_guardrails(self, norm_query, answer):
        """
        Enforce safety: Ensure medical diagnosis disclaimer is active if query asks about diagnosis or medicine.
        """
        is_medical_inquiry = any(w in norm_query for w in ["dawa", "medicine", "cure", "dosage", "diagnosis", "treatment", "doctor", "vet"])
        if is_medical_inquiry and "diagnosis" not in answer.lower():
            answer += " Note: Gau Rakshak is an early warning system only. Please consult a qualified veterinarian for medical diagnosis and treatment."
        return answer

if __name__ == "__main__":
    qa = QAEngine()
    test_questions = [
        "Gau Rakshak kya hai?",
        "Mastitis ke early symptoms kya hain?",
        "DHT11 kya measure karta hai?",
        "Team lead kaun hai?",
        "Is Gau Rakshak a diagnosis system?",
        "Does it work offline?"
    ]
    for q in test_questions:
        print(f"\nQ: {q}\nA: {qa.answer_question(q)}")
