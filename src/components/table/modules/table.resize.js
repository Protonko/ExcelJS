import {$} from '@DOM/DOM';

const ELEMENT_SELECTORS = {
  resizable: '[data-type="resizable"]',
};

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const HEIGHT_SCREEN = document.body.offsetHeight;
    const WIDTH_SCREEN = document.body.offsetWidth;

    const $resizer = $(event.target);
    const $parentCell = $resizer.closest(ELEMENT_SELECTORS.resizable);

    const coords = $parentCell.getCoords();
    const columnId = $parentCell.data.columnId;
    const type = $resizer.data.resize;
    const isColumn = type === 'column';

    let cellSize;

    $resizer.css({
      bottom: isColumn && -HEIGHT_SCREEN + 'px',
      right: !isColumn && -WIDTH_SCREEN + 'px',
      opacity: 1,
    });

    document.onmousemove = eventMove => {
      const resizeColumn = () => {
        const delta = eventMove.pageX - coords.right;
        cellSize = coords.width + delta + 'px';

        $resizer.css({right: -delta + 'px'});
      };

      const resizeRow = () => {
        const delta = eventMove.pageY - coords.bottom;
        cellSize = coords.height + delta + 'px';

        $resizer.css({bottom: -delta + 'px'});
      };

      isColumn ? resizeColumn() : resizeRow();
    };

    $(document).on('mouseup', () => {
      const columnElements = $root.find(`[data-column-id="${columnId}"]`);

      document.onmousemove = null;
      document.onmouseup = null;

      if (isColumn) {
        columnElements.forEach(elem => $(elem).css({width: cellSize}));
      } else {
        $parentCell.css({height: cellSize});
      }

      resolve({
        cellSize,
        type,
        id: $parentCell.data[`${type}Id`],
      });

      $resizer.css({
        right: 0,
        bottom: 0,
        opacity: 0,
      });
    });
  });
}
