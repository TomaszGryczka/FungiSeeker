class Labels:
    def __init__(self):
        self.labels_data = [
                        {"id": 1, "label": "amanita_citrina", "translation": "Muchomor cytrynowy"},
                        {"id": 2, "label": "amanita_muscaria", "translation": "Muchomor czerwony"},
                        {"id": 3, "label": "boletus_reticulatus", "translation": "Borowik siatkowany"},
                        {"id": 4, "label": "coltricia_perennis", "translation": "Stułka piaskowa"},
        ]

    def get_labels(self):
        return [label["label"] for label in self.labels_data]
    
    def get_label_id_with_translation(self, label):
        for label_data in self.labels_data:
            if label_data["label"] == label:
                return label_data["id"], label_data["translation"]
