import $ from 'jquery';
import { getCollegeRanking, hidePopup, showPopup } from './helper';

export default function initZhiPin() {
  const $document = $(document);

  // 推荐页面
  $document.on('mouseenter', '.edu-exp-box .exp-content', function(e) {
    const $container = $(this);
    const text = $container.text();
    const collegeName = getCollegeName(text);
    const ranking = getCollegeRanking(collegeName);
    const content = ranking ? ranking.toString() : '暂无排名';
    showPopup(content, { x: e.clientX, y: e.clientY });
  });

  $document.on('mouseleave', '.edu-exp-box .exp-content', function(e) {
    hidePopup();
  });

  // 搜索页面
  $document.on('mouseenter', '.edu-exp-box', function(e) {
    const $container = $(this).find('li span:eq(1)');
    console.log('----');
    const text = $container.text();
    const collegeName = getCollegeName(text);
    console.log(text);
    console.log(collegeName);
    const ranking = getCollegeRanking(collegeName);
    const content = ranking ? ranking.toString() : '暂无排名';
    showPopup(content, { x: e.clientX, y: e.clientY });
  });

  $document.on('mouseleave', '.edu-exp-box', function(e) {
    hidePopup();
  });

}

/**
 * 从字符串中解析出大学名称
 * @param text 字符串
 * @returns 大学名称
 */
function getCollegeName(text: string) {
  const arr = text.split('·');
  if (!arr.length) {
    return '';
  }
  return arr[0].trim();
}