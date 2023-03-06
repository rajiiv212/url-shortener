function random(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

function randomNum() {
    return `${random(0, 9)}`;
}

function randomSmall() {
    return `${String.fromCharCode(random(97, 122))}`;
}

function randomCap() {
    return `${String.fromCharCode(random(65, 90))}`;
}

function create() {
    return randomSmall() + randomCap() + randomNum() + randomCap() + randomNum() + randomSmall();
}

module.exports = create;