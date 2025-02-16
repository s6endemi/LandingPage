<!-- CircuitGridBackground.svelte -->
<script lang="ts">
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let width: number;
  let height: number;
  let pulses: Pulse[] = [];

  interface Pulse {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    progress: number;
    speed: number;
    alpha: number;
    color: string;
    size: number;
  }

  // Mikrochip-Stil Konstanten
  const MAJOR_GRID_SIZE = 160;
  const MINOR_GRID_SIZE = 20;
  const CONNECTION_POINTS: { x: number; y: number }[] = [];

  function createPulse(startX: number, startY: number, targetX: number, targetY: number): Pulse {
    return {
      x: startX,
      y: startY,
      targetX,
      targetY,
      progress: 0,
      speed: 0.003, // Sehr langsame, präzise Bewegung
      alpha: 1,
      color: "rgb(0, 255, 255)", // Helles Cyan
      size: 3,
    };
  }

  function drawChipGrid() {
    if (!ctx) return;

    // Hauptraster (schwächer)
    ctx.strokeStyle = "rgba(0, 82, 255, 0.1)";
    ctx.lineWidth = 0.5;

    for (let x = 0; x <= width; x += MAJOR_GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += MAJOR_GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Feines Raster (noch schwächer)
    ctx.strokeStyle = "rgba(0, 82, 255, 0.05)";
    ctx.lineWidth = 0.2;

    for (let x = 0; x <= width; x += MINOR_GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += MINOR_GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Verbindungspunkte an Hauptrasterkreuzungen
    ctx.fillStyle = "rgba(0, 199, 255, 0.15)";
    for (let x = MAJOR_GRID_SIZE; x < width; x += MAJOR_GRID_SIZE) {
      for (let y = MAJOR_GRID_SIZE; y < height; y += MAJOR_GRID_SIZE) {
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Speichere Verbindungspunkte für Impulse
        CONNECTION_POINTS.push({ x, y });
      }
    }
  }

  function drawCircuitPatterns() {
    if (!ctx) return;

    ctx.strokeStyle = "rgba(0, 199, 255, 0.1)";
    ctx.lineWidth = 1;

    // Zeichne L-förmige Verbindungen zwischen einigen Punkten
    CONNECTION_POINTS.forEach((point, index) => {
      if (index % 3 === 0 && index + 1 < CONNECTION_POINTS.length) {
        const nextPoint = CONNECTION_POINTS[index + 1];

        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(point.x, (point.y + nextPoint.y) / 2);
        ctx.lineTo(nextPoint.x, (point.y + nextPoint.y) / 2);
        ctx.lineTo(nextPoint.x, nextPoint.y);
        ctx.stroke();
      }
    });
  }

  function draw(timestamp: number) {
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    // Zeichne Basis-Grid und Schaltkreismuster
    drawChipGrid();
    drawCircuitPatterns();

    // Update und zeichne Impulse
    pulses = pulses.filter((pulse) => {
      pulse.progress += pulse.speed;

      // Lineare Interpolation für Position
      pulse.x = pulse.x + (pulse.targetX - pulse.x) * pulse.progress;
      pulse.y = pulse.y + (pulse.targetY - pulse.y) * pulse.progress;

      // Zeichne Impuls mit Glow-Effekt
      const gradient = ctx.createRadialGradient(pulse.x, pulse.y, 0, pulse.x, pulse.y, pulse.size * 4);

      gradient.addColorStop(0, `${pulse.color.slice(0, -1)}, ${pulse.alpha})`);
      gradient.addColorStop(1, `${pulse.color.slice(0, -1)}, 0)`);

      // Hauptimpuls
      ctx.fillStyle = pulse.color;
      ctx.beginPath();
      ctx.arc(pulse.x, pulse.y, pulse.size, 0, Math.PI * 2);
      ctx.fill();

      // Glow
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(pulse.x, pulse.y, pulse.size * 4, 0, Math.PI * 2);
      ctx.fill();

      return pulse.progress < 1;
    });

    // Neue Impulse mit geringer Wahrscheinlichkeit
    if (Math.random() < 0.02 && CONNECTION_POINTS.length >= 2) {
      const startPoint = CONNECTION_POINTS[Math.floor(Math.random() * CONNECTION_POINTS.length)];
      const endPoint = CONNECTION_POINTS[Math.floor(Math.random() * CONNECTION_POINTS.length)];

      if (startPoint !== endPoint) {
        pulses.push(createPulse(startPoint.x, startPoint.y, endPoint.x, endPoint.y));
      }
    }

    requestAnimationFrame(draw);
  }

  onMount(() => {
    ctx = canvas.getContext("2d")!;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Reset connection points bei Größenänderung
      CONNECTION_POINTS.length = 0;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  });
</script>

<canvas bind:this={canvas} class="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-40 mix-blend-screen" />

<style>
  canvas {
    image-rendering: pixelated;
  }
</style>
