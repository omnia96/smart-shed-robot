import {loadCsv, shuffle} from '../core/unit';
import {
  TEST_FEATURES_FN,
  TEST_TARGET_FN,
  TRAIN_FEATURES_FN,
  TRAIN_TARGET_FN,
} from '../core/config/app.config';

/**
 * 处理加载训练和测试数据的助手类
 */
export class BostonHousingData {
  trainFeatures: any = null
  trainTarget: any = null
  testFeatures: any = null
  testTarget: any = null
  /**
   * 加载测试训练数据
   */
  public async loadData() {
    [
      this.trainFeatures,
      this.trainTarget,
      this.testFeatures,
      this.testTarget,
    ] =
        await Promise.all([
          loadCsv(TRAIN_FEATURES_FN),
          loadCsv(TRAIN_TARGET_FN),
          loadCsv(TEST_FEATURES_FN),
          loadCsv(TEST_TARGET_FN),
        ]);
    shuffle(this.trainFeatures, this.trainTarget);
    shuffle(this.testFeatures, this.testTarget);
  }
}
