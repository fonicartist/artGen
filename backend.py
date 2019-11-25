import numpy as np
import os 
import random

from keras.models import load_model
from PIL import Image


# Image size
GENERATE_SQUARE = 128

# Preview image 
PREVIEW_ROWS = 1
PREVIEW_COLS = 1
PREVIEW_MARGIN = 0

# Size vector to generate images from
SEED_SIZE = 100
BATCH_SIZE = 32

# Model path
MODEL_PATH = 'src/models'
OUTPUT_PATH = 'src'

# Load generators
grassland_generator_file = os.path.join(MODEL_PATH,"grasslandModel.h5")
#mountains_generator_file = os.path.join(MODEL_PATH,"grasslandModel.h5")
#beach_generator_file = os.path.join(MODEL_PATH,"grasslandModel.h5")
#forest_generator_file = os.path.join(MODEL_PATH,"grasslandModel.h5")
grasslandGenerator = load_model(grassland_generator_file)
#mountainsGenerator = load_model(mountains_generator_file)
#beachGenerator = load_model(beach_generator_file)
#forestGenerator = load_model(forest_generator_file)

# To-Do:
#   - Add functionality to get_image function to get different kinds of images
#     based on request from a web server
#   - 
def get_image(mode):
    # Random noise
    seed = np.random.normal(0,1,(BATCH_SIZE,SEED_SIZE))

    # Image array
    image_array = np.full(( 
    PREVIEW_MARGIN + (PREVIEW_ROWS * (GENERATE_SQUARE+PREVIEW_MARGIN)), 
    PREVIEW_MARGIN + (PREVIEW_COLS * (GENERATE_SQUARE+PREVIEW_MARGIN)), 3), 
    255, dtype=np.uint8)

    if mode == 1:
        generated_image = grasslandGenerator.predict(seed)
    elif mode == 2:
        generated_image = grasslandGenerator.predict(seed)  # mountains
    elif mode == 3:
        generated_image = grasslandGenerator.predict(seed)  # beach
    elif mode == 4:
        generated_image = grasslandGenerator.predict(seed)  # forest

    generated_image = 0.5 * generated_image + 0.5

    for row in range(PREVIEW_ROWS):
        for col in range(PREVIEW_COLS):
            r = row * (GENERATE_SQUARE) + PREVIEW_MARGIN
            c = col * (GENERATE_SQUARE) + PREVIEW_MARGIN
            image_array[r:r+GENERATE_SQUARE,c:c+GENERATE_SQUARE] = generated_image[random.randint(0, 31)] * 255

    filename = os.path.join(MODEL_PATH,"output.png")
    image = Image.fromarray(image_array)
    size = (256, 256)
    image = image.resize(size)
    image.save(filename)
    # return image

get_image(1)