import { type ColorType } from './enums';

export interface GetRandomColorOptions {
  /**
   * 颜色类型
   */
  type: ColorType;
  /**
   * 是否包含浅色
   */
  lightColor?: boolean;
}
