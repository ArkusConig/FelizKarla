const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Heart {
    constructor() {
        this.x = random(0, canvas.width);
        this.y = canvas.height + random(20, 100);
        this.size = random(12, 26);
        this.speed = random(0.8, 2.4);
        this.opacity = random(0.4, 1);
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = "#ff6b81";
        ctx.beginPath();

        let x = this.x;
        let y = this.y;
        let s = this.size;

        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x - s, y - s, x - s * 1.2, y + s / 3, x, y + s);
        ctx.bezierCurveTo(x + s * 1.2, y + s / 3, x + s, y - s, x, y);

        ctx.fill();
        ctx.restore();
    }

    update() {
        this.y -= this.speed;
        this.x += Math.sin(this.y * 0.02) * 0.6;

        if (this.y < -50) {
            this.y = canvas.height + 100;
            this.x = random(0, canvas.width);
        }
        this.draw();
    }
}

function init() {
    for (let i = 0; i < 55; i++) {
        hearts.push(new Heart());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => h.update());
    requestAnimationFrame(animate);
}

init();
animate();