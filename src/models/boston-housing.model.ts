import {BostonHousingData} from '../data/BostonHousing.data';
import * as tf from '@tensorflow/tfjs';
import {Normalization} from '../core/unit/normalization';

/**
 * 波士顿房价模型
 */
export class BostonHousingModel {
  private NUM_EPOCHS = 200;
  private BATCH_SIZE = 40;
  private LEARNING_RATE = 0.01;
  private tensors: any = {};
  private bostonData: any;

  /**
   * constructor
   */
  constructor() {
    this.init().then();
  }

  /**
   * init
   * @private
   */
  private async init() {
    this.bostonData = new BostonHousingData();
    await this.bostonData.loadData();
    this.arraysToTensors();
    this.computeBaseline();
  }

  /**
   * 将加载的数据转换为张量并创建特征的规范化版本。
   * @private
   */
  private arraysToTensors() {
    console.log(this.bostonData.trainFeatures);
    this.tensors.rawTrainFeatures = tf.tensor2d(this.bostonData.trainFeatures);
    this.tensors.trainTarget = tf.tensor2d(this.bostonData.trainTarget);
    this.tensors.rawTestFeatures = tf.tensor2d(this.bostonData.testFeatures);
    this.tensors.testTarget = tf.tensor2d(this.bostonData.testTarget);
    // Normalize mean and standard deviation of data.
    const {dataMean, dataStd} = Normalization.determineMeanAndStddev(
        this.tensors.rawTrainFeatures,
    );
    this.tensors.trainFeatures = Normalization.normalizeTensor(
        this.tensors.rawTrainFeatures, dataMean, dataStd,
    );
    this.tensors.testFeatures = Normalization.normalizeTensor(
        this.tensors.rawTestFeatures, dataMean, dataStd,
    );
  }

  /**
   * 计算基线
   * @private
   */
  private computeBaseline() {
    const avgPrice = this.tensors.trainTarget.mean();
    console.log(`平均价格: ${avgPrice.dataSync()}`);
    const baseline = this.tensors.testTarget.sub(avgPrice).square().mean();
    console.log(`基线损失: ${baseline.dataSync()}`);
    const baselineMsg = `基线损失（均方误差）是 ${baseline.dataSync()[0].toFixed(2)}`;
    console.log(baselineMsg);
  };
}
