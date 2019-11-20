import * as tf from '@tensorflow/tfjs';

const grasslandModel = await tf.loadlayersModel('models/grasslandModel.json');
const mountainModel;
const beachModel;
const forestModel;