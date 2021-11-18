import initMoka from './content/moka';
import initZhiPin from './content/zhipin';

const host = window.location.host;

if (/zhipin/.test(host)) {
  // boss直聘
  initZhiPin();
} else if (/mokahr/.test(host)) {
  // moka
  initMoka();
}