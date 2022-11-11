// Based on https://www.redblobgames.com/grids/line-drawing.html

export default function getLineBetween(point1, point2) {
    const D = diagonalDistance(point1, point2);
    if (D === 0) return [point1];

    const points = [];

    for (let step = 0; step <= D; step++) {
        const t = step / D;

        const newPoint = {
            x: ~~lerp(point1.x, point2.x, t),
            y: ~~lerp(point1.y, point2.y, t)
            //     x: Math.round(lerp(point1.x, point2.x, t)),
            //     y: Math.round(lerp(point1.y, point2.y, t))
        };

        points.push(newPoint);
    }

    return points;
}

function diagonalDistance(p1, p2) {
    const dx = p2.x - p1.x,
        dy = p2.y - p1.y;
    return Math.max(Math.abs(dx), Math.abs(dy));
}

function lerp(a, b, t) {
    // return a * (1 - t) + b * t;    // Variation
    return a + (b - a) * t;
}


