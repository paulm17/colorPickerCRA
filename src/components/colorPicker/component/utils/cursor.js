export function calcXY(rect, x, y) {
    // Reset to bounds
    if (x < rect.left) {
        x = rect.left;
    } else if (x > rect.left + rect.width) {
        x = rect.left + rect.width;
    }
    if (y < rect.top) {
        y = rect.top;
    } else if (y > rect.top + rect.height) {
        y = rect.top + rect.height;
    }

    // Normalize
    x -= rect.left;
    y -= rect.top;

    return { x, y };
}

export function calcXYSaturationCursorPosition(rect, color) {
    const {left, top, width, height} = rect;

    let ex = (color.s / 100);
    let ey = (1 - (color.v / 100));
    let clientX = left + width * ex;
    let clientY = top + height * ey;
    let { x, y } = calcXY(rect, clientX, clientY);

    return { x: x, y: y, width: width, height: height };
}

export function calcXYHueCursorPosition(direction, rect, color) {
    const {left, top, width, height} = rect;

    let pos = (color.h / 360);
    let clientX = left + width * pos;
    let clientY = top + height * pos;
    let { x, y } = calcXY(rect, clientX, clientY);

    return { x: x, y: y, width: width, height: height };
}

export function calcXYAlphaCursorPosition(direction, rect, color) {
    const {left, top, width, height} = rect;

    let pos = color.a;
    let clientX = left + width * pos;
    let clientY = top + height * pos;
    let { x, y } = calcXY(rect, clientX, clientY);

    return { x: x, y: y, width: width, height: height };
}