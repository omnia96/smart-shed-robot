/**
 * normalization
 */
export class Normalization {
/**
 * 计算数据数组每一列的均值和标准差。
 * @param {any} data 从中计算平均值和的数据集每列的标准独立
 * @return {any} 包含每个向量列的均值和标准差作为一维张量
 */
  public static determineMeanAndStddev(
      data: any,
  ): { dataMean: any; dataStd: any } {
    const dataMean = data.mean(0);
    // TODO(bileschi): Simplify when and if tf.var / tf.std added to the API.
    const diffFromMean = data.sub(dataMean);
    const squaredDiffFromMean = diffFromMean.square();
    const variance = squaredDiffFromMean.mean(0);
    const dataStd = variance.sqrt();
    return {dataMean, dataStd};
  }
  /**
   * 给定预期均值和标准差，将数据集归一化为减去平均值并除以标准差。
   * @param {any} data
   * @param {any} dataMean
   * @param {any} dataStd
   * @return {any}
   */
  public static normalizeTensor(data: any, dataMean: any, dataStd: any): any {
    return data.sub(dataMean).div(dataStd);
  }
}
