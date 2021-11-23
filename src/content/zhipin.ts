import $ from 'jquery';
import { getCollegeRanking, hidePopup, showPopup } from './helper';

export default function initZhiPin() {
  // 显示学校排名
  showRanking();
  // 过滤低活跃的用户
  filterActivityInRecommendPage();
}

// 在推荐页面过滤掉不活跃用户
function filterActivityInRecommendPage() {
  document.addEventListener('DOMNodeInserted', function(e) {
    if (e.target && $(e.target).hasClass('recommend-card-list')) {
      $(e.target).find('li').each(function(i, elem) {
        markCardForActivity(elem);
      });
      // 推荐容器已生成
      e.target.addEventListener('DOMNodeInserted', function(evt) {
        if (!evt.target) {
          return;
        }
        markCardForActivity(evt.target as Element);
      }, false);
    }
  });
}

// 标记出不活跃的用户
function markCardForActivity(element: Element) {
  if (element.nodeName !== 'LI') {
    return;
  }
  const $elem = $(element);
  const $activity = $elem.find('.col-2 .name .label-text');
  if (!$activity.length) {
    return;
  }
  const activityText = $activity.text().trim();
  if (!activityText) {
    return;
  }
  // 给不活跃的卡片置灰
  const VALID_ACTIVITY = ['刚刚活跃', '今日活跃', '本周活跃', '3日内活跃'];
  if (VALID_ACTIVITY.indexOf(activityText) === -1) {
    $elem.css({
      opacity: 0.5,
    });
  }
}

/**
 * 移到学校上时显示全国排名
 */
function showRanking() {
  const $document = $(document);

  // 推荐页面
  $document.on('mouseenter', '.edu-exp-box .exp-content', function(e) {
    const $container = $(this);
    const text = $container.text();
    const content = getRanking(text);
    showPopup(content, { x: e.clientX, y: e.clientY });
  });

  $document.on('mouseleave', '.edu-exp-box .exp-content', function(e) {
    hidePopup();
  });

  // 搜索页面
  $document.on('mouseenter', '.edu-exp-box', function(e) {
    const $container = $(this).find('li span:eq(1)');
    const text = $container.text();
    const content = getRanking(text);
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

function getRanking(name: string) {
  const collegeName = getCollegeName(name);
  const ranking = getCollegeRanking(collegeName);
  const content = ranking ? ranking.toString() : '暂无排名';
  return content;
}