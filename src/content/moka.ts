import $ from 'jquery';
import { getCollegeRanking, hidePopup, showPopup } from './helper';

export default function initMoka() {
  const $document = $(document);

  $document.on('mouseenter', 'span[class^="split-"]', function(e) {
    const $container = $(this);
    const text = $container.text();
    if (!/(:?大学|学院)$/.test(text)) {
      return;
    }
    const collegeName = text;
    console.log(collegeName);
    const ranking = getCollegeRanking(collegeName);
    const content = ranking ? ranking.toString() : '暂无排名';
    console.log(111, content);
    showPopup(content, { x: e.clientX, y: e.clientY });
  });

  $document.on('mouseleave', 'span[class^="split-"]', function(e) {
    hidePopup();
  });
}