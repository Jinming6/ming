import { type WebCheckerOpts } from './models/types';

/**
 * Web更新检测器
 */
export default class WebChecker extends EventTarget {
  hashUrl: WebCheckerOpts['hashUrl'];
  duration: WebCheckerOpts['duration'];
  timer;
  oldHash: WebCheckerOpts['oldHash'];

  constructor(options: WebCheckerOpts) {
    super();
    this.hashUrl = options.hashUrl;
    this.duration = options.duration;
    this.oldHash = options.oldHash;

    this.webPollingHash();
    this.timer = setInterval(() => {
      this.webPollingHash();
    }, this.duration);
  }

  /**
   * 轮询检测hash值是否更新
   */
  webPollingHash(): void {
    if (typeof this.hashUrl !== 'string') {
      console.warn('hashUrl必须是字符串');
      clearInterval(this.timer);
      return;
    }
    fetch(this.hashUrl, { mode: 'no-cors' })
      .then(async (res) => await res.text())
      .then((html) => {
        // TODO 版本比较逻辑待开发
        const scriptRegex = /<script(?:\s+[^>]*)?>(.*?)<\/script\s*>/gi;
        const scripts = html.match(scriptRegex) ?? [];
        console.log('scripts', scripts);
        // console.log(html);
        // const newHash = scripts[0];
        // if (this.oldHash !== newHash) {
        // if (count === 2) {
        //   clearInterval(this.timer);
        //   this.dispatchEvent(new Event('shouldUpdate'));
        // }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
