(() => {
  const canvas = document.getElementById("butterflyFx");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const butterflies = [];

  class Butterfly {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 80;
      this.vy = Math.random() * 0.6 + 0.4;
      this.phase = Math.random() * Math.PI * 2;
      this.size = Math.random() * 6 + 6;
      this.color = Math.random() > 0.5 ? "#8b5cf6" : "#38bdf8";
    }

    update() {
      this.phase += 0.12;
      this.x += Math.sin(this.phase) * 1.2;
      this.y -= this.vy;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);

      const flap = Math.sin(this.phase) * this.size;

      ctx.fillStyle = this.color;
      ctx.globalAlpha = 0.85;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;

      ctx.beginPath();
      ctx.ellipse(-this.size, 0, flap, this.size, 0, 0, Math.PI * 2);
      ctx.ellipse(this.size, 0, flap, this.size, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (butterflies.length < 12 && Math.random() < 0.05) {
      butterflies.push(new Butterfly());
    }

    for (let i = butterflies.length - 1; i >= 0; i--) {
      butterflies[i].update();
      butterflies[i].draw();
      if (butterflies[i].y < -50) butterflies.splice(i, 1);
    }

    requestAnimationFrame(loop);
  }

  loop();
})();
