# imports
from fastai.vision.all import *
import matplotlib.pyplot as plt

import sys
sys.path.append("./labels")

from labels import Labels

# setup path
path = Path("./neural_network/data")

# labels for all species
label_names = Labels().get_labels()

# remove images that are corrupted
for label in label_names:
    images_to_remove = verify_images(get_image_files(path/label))
    for image in images_to_remove:
        os.remove(image)


# normalize images
data = DataBlock(
    blocks=(ImageBlock, CategoryBlock),
    get_items=get_image_files,
    get_y=parent_label,
    splitter=RandomSplitter(valid_pct=0.2, seed=42),
    item_tfms=RandomResizedCrop(224, min_scale=0.75),
    batch_tfms=[*aug_transforms(size=224, max_warp=0), Normalize.from_stats(*imagenet_stats)]
)

dls = data.dataloaders(path, bs=64)

dls.show_batch()

# print some basic info
print(f"Number of classes: {len(dls.vocab)}")
print(f"Name of classes: {dls.vocab}")

learner = Learner(dls, model=models.resnet34(), metrics=error_rate)

learner.fit(16, lr=1e-3)

learner.export("export.pkl")

plt.show()

