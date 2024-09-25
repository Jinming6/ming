export interface WebCheckerOpts {
  /**
   * 提供hash的地址
   */
  hashUrl: string;
  /**
   * 间隔轮询时长
   */
  duration: number;
  /**
   * 旧hash值
   */
  oldHash: string;
}
