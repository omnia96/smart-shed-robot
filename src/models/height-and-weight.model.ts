import * as tf from '@tensorflow/tfjs';
/**
 * 身高体重模型
 */
export class HeightAndWeightModel {
  /**
   * 构造器
   * @param {number} height
   */
  constructor(height: number = 180) {
    const heights = [150, 160, 170, 180, 185];
    const weights = [40, 50, 60, 70, 80];
    // 数据归一化
    const inputs = tf.tensor(heights).sub(150).div(20);
    const labels = tf.tensor(weights).sub(40).div(20);
    // 建立连续性模型
    const model = tf.sequential();
    model.add(tf.layers.dense({
      // 神经元个数
      units: 1,
      inputShape: [1],
    }));
    // 设置损失函数和优化器
    model.compile({
      loss: tf.losses.meanSquaredError,
      // 随机梯度下降法
      optimizer: tf.train.sgd(0.1),
    });
    model.fit(inputs, labels, {
      // 批量数据
      batchSize: 5,
      epochs: 200,
    }).then(() => {
      const output: any = model.predict(tf.tensor([height]).sub(150).div(20));
      console.log(output.mul(20).add(40).dataSync()[0].toFixed(2) + 'kg');
    });
  }
}
