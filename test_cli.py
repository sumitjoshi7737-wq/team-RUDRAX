import os
import sys

# Ensure base directory is in sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from knowledge.matcher import KnowledgeMatcher
from voice.tts.tts_engine import TTSEngine

def main():
    print("=" * 60)
    print(" GAU RAKSHAK - CLI TEST MODE (Terminal Voice & QA Check)")
    print("=" * 60)

    matcher = KnowledgeMatcher()
    tts = TTSEngine()

    print("\n[System Ready] Type your question below (or type 'exit' to quit):")
    
    while True:
        try:
            query = input("\nUSER > ").strip()
            if not query or query.lower() in ['exit', 'quit']:
                print("Exiting test mode.")
                break

            answer = matcher.get_answer(query, lang="hi")
            print(f"\nGAU RAKSHAK (Text) > {answer}")

            print("[TTS Engine] Speaking answer aloud...")
            tts.speak(answer)

        except (KeyboardInterrupt, EOFError):
            print("\nExiting.")
            break

if __name__ == "__main__":
    main()
