from fastai.vision.all import *
from io import BytesIO
import requests

import sys
sys.path.append("../labels")

from labels import Labels

class Predictor:
    def __init__(self, model_url):
        self.model_url = model_url
        self.model_path = Path("./")
        print("Starting download model...")
        self.download_model()
        print("Finished downloading model...")
        self.labels = Labels()
    
    def download_file(self, url, dest):
            r = requests.get(url)
            open(dest, 'wb').write(r.content)

    def download_model(self):
        model_file_path = self.model_path / "model.pkl"

        if not os.path.exists(model_file_path):
            self.download_file(self.model_url, model_file_path)

        self.learn = load_learner(model_file_path)

    def predict(self, image_url):
        img_content = requests.get(image_url, stream=True).content

        pred_class, pred_idx, outputs = self.learn.predict(img_content)

        return self.labels.get_label_id_with_translation(pred_class, outputs[pred_idx].item())

        