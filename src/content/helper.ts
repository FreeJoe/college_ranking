import $ from 'jquery';
import collegesData from './data/collegeList';

/**
 * 获取大学排名
 * @param collegeName 大学名称
 * @returns 返回大学排名，从1开始，找不到则返回0
 */
export function getCollegeRanking(collegeName: string) {
  return collegesData.findIndex((name) => name === collegeName) + 1;
}

const POPUP_CONTAINER_CLASS = 'chrome-plugin-college-ranking-container';

export function showPopup(text: string, pos: { x: number, y: number}) {
  hidePopup();
  const $div = $(`<div class="${POPUP_CONTAINER_CLASS}">`)
  $div.text(text);
  const OFFSET = 20;
  $div.css({
    left: pos.x + OFFSET,
    top: pos.y + OFFSET,
    position: 'fixed',
    'z-index': 9999,
    border: '1px solid #ccc',
    padding: '4px 8px',
    background: '#fff',
  });
  $div.appendTo('body');
}

export function hidePopup() {
  $(`.${POPUP_CONTAINER_CLASS}`).remove();
}