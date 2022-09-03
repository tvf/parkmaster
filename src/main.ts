import { vec2 } from 'gl-matrix';

interface Car {
  // geometry
  L: number; // distance from rear axle to front axle
  box_width: number;
  box_length: number;
  wheel_width: number;
  wheel_diameter: number;
  gauge: number;

  // state
  xy: vec2; // position of centre of rear axle
  theta: number; // car heading in radians from +X

  // control
  s: number; // speed
  phi: number; // steer in radians from car's heading
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

function paint_car(ctx: CanvasRenderingContext2D, car: Car) {
  ctx.resetTransform();
  ctx.clearRect(0, 0, 480, 480);

  ctx.translate(240, 240);
  ctx.scale(40, -40);

  ctx.lineJoin = 'round';

  const draw_radius = 0.02;

  ctx.lineWidth = draw_radius;

  ctx.translate(car.xy[0], car.xy[1]);
  ctx.rotate(car.theta);

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
}

function main() {
  const car: Car = {
    L: 3,
    box_length: 4,
    box_width: 2,
    wheel_width: 0.25,
    wheel_diameter: 0.75,
    gauge: 1.5,

    xy: vec2.fromValues(1, 2),
    theta: 0.2,

    s: 0,
    phi: -0.0,
  };

  const simulation_canvas: HTMLCanvasElement = document.getElementById(
    'simulation',
  ) as HTMLCanvasElement;
  const simulation_ctx = simulation_canvas.getContext('2d');

  if (simulation_ctx) paint_car(simulation_ctx, car);
}
