import os
import json
import logging

logger = logging.getLogger("GauRakshak.KnowledgeLoader")

class KnowledgeLoader:
    def __init__(self, base_dir=None):
        if base_dir is None:
            base_dir = os.path.dirname(os.path.abspath(__file__))
        self.base_dir = base_dir
        self.mastitis_data = {}
        self.project_data = {}
        self.team_data = {}
        self.questions_data = []
        self.load_all()

    def _read_json(self, filename):
        file_path = os.path.join(self.base_dir, filename)
        if not os.path.exists(file_path):
            logger.warning(f"File not found: {file_path}")
            return {}
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Error loading {file_path}: {e}")
            return {}

    def load_all(self):
        self.mastitis_data = self._read_json("mastitis.json")
        self.project_data = self._read_json("project.json")
        self.team_data = self._read_json("team.json")
        self.questions_data = self._read_json("questions.json")
        logger.info(f"Loaded {len(self.questions_data)} QA rules into local knowledge engine.")

    def get_disclaimer(self):
        return self.mastitis_data.get("disclaimer", "Gau Rakshak provides early risk forecasting only, not medical diagnosis.")

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    loader = KnowledgeLoader()
    print("Mastitis title:", loader.mastitis_data.get("title"))
    print("Project name:", loader.project_data.get("project_name"))
    print("Team name:", loader.team_data.get("team_name"))
    print("Total QAs:", len(loader.questions_data))
