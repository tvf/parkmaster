import { vec2 } from 'gl-matrix';

interface Trailer {
  L: number;
  box_width: number;
  box_length: number;
  wheel_width: number;
  wheel_diameter: number;
  gauge: number;

  theta: number;
}

interface Car {
  // geometry
  L: number; // distance from rear axle to front axle
  box_width: number;
  box_length: number;
  wheel_width: number;
  wheel_diameter: number;
  gauge: number;

  // state
  x: number; // position of centre of rear axle
  y: number;
  theta: number; // car heading in radians from +X

  // control
  s: number; // speed
  phi: number; // steer in radians from car's heading

  trailers: Trailer[];
}

main();

function draw_car_body(ctx: CanvasRenderingContext2D, car: Car) {
  ctx.strokeRect(
    -(car.box_length - car.L) / 2,
    -car.box_width / 2,
    car.box_length,
    car.box_width,
  );
}

function draw_wheel(ctx: CanvasRenderingContext2D, car: Car) {
  ctx.strokeRect(
    -car.wheel_diameter / 2,
    -car.wheel_width / 2,
    car.wheel_diameter,
    car.wheel_width,
  );
}

function paint_car(ctx: CanvasRenderingContext2D, car: Car, zoom: number) {
  ctx.resetTransform();
  ctx.clearRect(0, 0, 720, 720);

  ctx.translate(360, 360);
  ctx.scale(zoom, -zoom);

  ctx.lineJoin = 'round';

  const draw_radius = 0.02;

  ctx.lineWidth = draw_radius;

  ctx.translate(car.x, car.y);
  //ctx.save();

  ctx.rotate(car.theta);

  ctx.beginPath();
  ctx.arc(0, 0, 0.05, 0, 2 * Math.PI);
  ctx.fill();

  draw_car_body(ctx, car);

  ctx.save();
  ctx.translate(0, car.gauge / 2);
  draw_wheel(ctx, car);
  ctx.restore();

  ctx.save();
  ctx.translate(0, -car.gauge / 2);
  draw_wheel(ctx, car);
  ctx.restore();

  let outer_wheel_angle = 0;
  let inner_wheel_angle = 0;
  let turning_radius = Infinity;

  if (car.phi != 0) {
    turning_radius = car.L / Math.tan(Math.abs(car.phi));

    outer_wheel_angle =
      Math.sign(car.phi) * Math.atan(car.L / (turning_radius + car.gauge / 2));
    inner_wheel_angle =
      Math.sign(car.phi) * Math.atan(car.L / (turning_radius - car.gauge / 2));
  }

  ctx.save();
  ctx.strokeStyle = 'red';
  ctx.beginPath();
  if (isFinite(turning_radius)) {
    ctx.arc(
      0,
      Math.sign(car.phi) * turning_radius,
      turning_radius,
      0,
      Math.PI * 2,
    );
  } else {
    ctx.moveTo(-1000, 0);
    ctx.lineTo(1000, 0);
  }

  ctx.stroke();
  ctx.closePath();
  ctx.restore();

  ctx.save();
  ctx.translate(car.L, car.gauge / 2);
  ctx.rotate(car.phi > 0 ? inner_wheel_angle : outer_wheel_angle);
  draw_wheel(ctx, car);
  ctx.restore();

  ctx.save();
  ctx.translate(car.L, -car.gauge / 2);
  ctx.rotate(car.phi > 0 ? outer_wheel_angle : inner_wheel_angle);
  draw_wheel(ctx, car);
  ctx.restore();

  // ctx.restore();

  // OK now draw the trailer!
  car.trailers.forEach((trailer) => {
    ctx.rotate(trailer.theta);
    ctx.translate(-trailer.L, 0);

    ctx.save();
    ctx.translate(0, trailer.gauge / 2);
    draw_wheel(ctx, car);
    ctx.restore();

    ctx.save();
    ctx.translate(0, -trailer.gauge / 2);
    draw_wheel(ctx, car);
    ctx.restore();

    ctx.strokeRect(
      -trailer.box_length / 2,
      -trailer.box_width / 2,
      trailer.box_length,
      trailer.box_width,
    );

    ctx.strokeRect(
      trailer.box_length / 2,
      0,
      trailer.L - trailer.box_length / 2,
      0,
    );

    ctx.beginPath();
    ctx.arc(trailer.L, 0, 0.05, 0, 2 * Math.PI);
    ctx.fill();
  });
}

function main() {
  const car: Car = {
    L: 3,
    box_length: 4,
    box_width: 2,
    wheel_width: 0.25,
    wheel_diameter: 0.75,
    gauge: 1.5,

    x: 0,
    y: 0,
    theta: Math.PI / 2,

    s: 0,
    phi: 0,

    trailers: [
      //   {
      //   L: 3,
      //   box_length: 2,
      //   box_width: 2,
      //   wheel_width: 0.25,
      //   wheel_diameter: 0.75,
      //   gauge: 1.5,
      //   theta: Math.PI / 3
      // },
      // {
      //   L: 3,
      //   box_length: 2,
      //   box_width: 2,
      //   wheel_width: 0.25,
      //   wheel_diameter: 0.75,
      //   gauge: 1.5,
      //   theta: Math.PI / 3
      // },
    ],
  };

  let zoom = 40;

  const simulation_canvas: HTMLCanvasElement = document.getElementById(
    'simulation',
  ) as HTMLCanvasElement;
  const simulation_ctx = simulation_canvas.getContext('2d');

  if (simulation_ctx) paint_car(simulation_ctx, car, zoom);

  let left = false;
  let right = false;
  let up = false;
  let down = false;

  window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') left = true;
    if (event.key === 'ArrowRight') right = true;
    if (event.key === 'ArrowUp') up = true;
    if (event.key === 'ArrowDown') down = true;

    let dirty = false;

    if (event.key === '+') {
      zoom *= 2;
      dirty = true;
    }

    if (event.key === '-') {
      zoom /= 2;
      dirty = true;
    }

    if (event.key === 't') {
      let trailer: Trailer = {
        L: 3,
        box_length: 2,
        box_width: 2,
        wheel_width: 0.25,
        wheel_diameter: 0.75,
        gauge: 1.5,

        theta: 0,
      };

      car.trailers.push(trailer);
      dirty = true;
    }

    if (dirty || left || right || up || down)
      window.requestAnimationFrame(step);
  });

  window.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') left = false;
    if (event.key === 'ArrowRight') right = false;
    if (event.key === 'ArrowUp') up = false;
    if (event.key === 'ArrowDown') down = false;
  });

  let start, prev_timestamp;
  let stale = false;

  function step(timestamp: DOMHighResTimeStamp) {
    if (start === undefined) {
      start = timestamp;
    }

    const elapsed = timestamp - prev_timestamp;

    if (isFinite(elapsed) && prev_timestamp !== timestamp) {
      if (!stale) {
        // TODO update car.xy, car.theta according to car.s, car.phi, elapsed
        car.x += (elapsed / 400) * car.s * Math.cos(car.theta);
        car.y += (elapsed / 400) * car.s * Math.sin(car.theta);

        let theta_inc = (((elapsed / 400) * car.s) / car.L) * Math.tan(car.phi);
        car.theta += theta_inc;

        let cumulative = theta_inc;

        for (var i = 0; i < car.trailers.length; ++i) {
          let product = 1;
          for (var j = 0; j < i; ++j) {
            product *= Math.cos(-car.trailers[j].theta);
          }

          theta_inc =
            (((elapsed / 400) * car.s) / car.trailers[i].L) *
              product *
              Math.sin(-car.trailers[i].theta) -
            cumulative;

          cumulative += theta_inc;

          car.trailers[i].theta += theta_inc;
        }

        // then update car.s, car.phi according to keyboard input
        if (left) car.phi += elapsed / 1000;
        if (right) car.phi -= elapsed / 1000;
        car.phi = Math.min(car.phi, Math.PI * 0.4);
        car.phi = Math.max(car.phi, -Math.PI * 0.4);

        if (up) car.s = 1;
        else if (down) car.s = -1;
        else car.s = 0;
      }

      if (simulation_ctx) paint_car(simulation_ctx, car, zoom);
    }

    prev_timestamp = timestamp;
    if (left || right || up || down) {
      window.requestAnimationFrame(step);
      stale = false;
    } else stale = true;
  }

  window.requestAnimationFrame(step);
}
