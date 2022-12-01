import { Point } from '@projectstorm/geometry';
import { snap } from './common';

const getRelativePoint = (point, model) => {
  const zoomLevelPercentage = model.getZoomLevel() / 100;
  const engineOffsetX = model.getOffsetX() / zoomLevelPercentage;
  const engineOffsetY = model.getOffsetY() / zoomLevelPercentage;
  return new Point(point.x - engineOffsetX, point.y - engineOffsetY);
};

const nextLinkPosition = (event,  model,  initialRelative,  sourcePosition,) => {
  const point = getRelativePoint(sourcePosition, model);
  const zoomLevelPercentage = model.getZoomLevel() / 100;
  const initialXRelative = initialRelative.x / zoomLevelPercentage;
  const initialYRelative = initialRelative.y / zoomLevelPercentage;

  const linkNextX =
    point.x +
    (initialXRelative - sourcePosition.x) +
    event.virtualDisplacementX;

  const linkNextY =
    point.y +
    (initialYRelative - sourcePosition.y) +
    event.virtualDisplacementY;

  return snap(
    new Point(linkNextX, linkNextY),
    model.options.gridSize,
  );
};


export default function handleLinkDrag(event, link, socket) {
  const first = link.getFirstPosition();
  const next = nextLinkPosition(
    event,
    this.engine.getModel(),
    { x: this.initialXRelative, y: this.initialYRelative },
    first,
  );
  link.getLastPoint().setPosition(next.x, next.y);
  //FIRE LINK MOVE >>>>
  this.engine.repaintCanvas();
}
