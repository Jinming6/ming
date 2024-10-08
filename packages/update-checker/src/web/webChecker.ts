import { isString } from 'lodash-es';
import { type WebCheckerOpts } from './models/types';
import localforage from 'localforage';
import { scriptReg, scriptSrcReg } from '../utils/regexp';

localforage.config({
  driver: localforage.LOCALSTORAGE,
});

const HASH_KEY = 'updateCheckerHash';

/**
 * Web更新检测器
 */
export default class WebChecker extends EventTarget {
  websiteUrl: WebCheckerOpts['websiteUrl'];
  duration: WebCheckerOpts['duration'];
  timer?: NodeJS.Timeout;
  currentHash?: string;

  constructor(options: WebCheckerOpts) {
    super();
    this.websiteUrl = options.websiteUrl;
    this.duration = options.duration;

    if (!isString(this.websiteUrl)) {
      console.warn('websiteUrl必须是字符串');
      return;
    }

    localforage
      .getItem(HASH_KEY)
      .then(async (value) => {
        console.log('getItem', value);
        // 首次安装该插件
        if (!isString(value) || value == null) {
          const newHash = await this.getWebsiteUrlHash(this.websiteUrl);
          await this.setCurrentHash(newHash);
          return;
        }

        await this.setCurrentHash(value);
        // 检测hash值是否更新
        await this.webPollingHash();
        this.timer = setInterval(() => {
          void this.webPollingHash();
        }, this.duration);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /**
   * 轮询检测hash值是否更新
   */
  async webPollingHash(): Promise<void> {
    try {
      const newHash = await this.getWebsiteUrlHash(this.websiteUrl);
      // console.log('scripts', scripts);
      console.log('newHash', newHash);
      console.log('currentHash', this.currentHash);
      if (newHash !== this.currentHash) {
        this.dispatchEvent(new Event('update'));
        clearInterval(this.timer);
      }
      // if (this.currentHash !== newHash) {
      // if (count === 2) {
      //   clearInterval(this.timer);
      //   this.dispatchEvent(new Event('shouldUpdate'));
      // }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * 获取网站的hash值
   */
  async getWebsiteUrlHash(websiteUrl: string): Promise<string | undefined> {
    try {
      const html = await fetch(websiteUrl, { mode: 'no-cors' }).then(
        async (res) => await res.text(),
      );
      const scripts = html.match(scriptReg) ?? [];
      const match = scripts[0]?.match(scriptSrcReg);
      if (match != null) {
        return match[1];
      }
    } catch (e) {
      console.error(e);
    }
  }

  async setCurrentHash(value: string | undefined): Promise<void> {
    this.currentHash = value;
    await localforage.setItem(HASH_KEY, value);
  }
}
