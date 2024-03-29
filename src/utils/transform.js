import {multiply} from 'mathjs';

// Linear sphere conversion 
// https://github.com/castacks/mvs_utils/blob/main/camera_models.py

//Input: px, py are true pixel locations of the active image (f1)
//Output: pixel locations of f0
function transform(crosshair, camera, transformation, distance, bf, size) {
  if (!distance || !transformation) return crosshair;
  // lots of logging
  console.groupCollapsed('camera information');
  console.log(camera);
  console.groupEnd();

  console.groupCollapsed('transformation matrix');
  console.log(transformation);
  console.groupEnd();

  // Convert pixel to angle on the unit sphere.
  const mx = crosshair.px - (camera.fx / 2);
  const my = crosshair.py - (camera.fy / 2);
  const r = Math.sqrt(mx ** 2 + my ** 2);

  // Compute theta and phi. Theta is the angle of 3D points from the z-axis. 
  // Phi is the angle of 3D points from the x-axis on the x-y plane.
  const th = Math.atan2(my, mx);
  const ph = r * camera.fov_rad / camera.fx;

  console.groupCollapsed('initial unit sphere');
  console.log(`mx: ${mx}, my: ${my}, r: ${r}, th: ${th}, ph: ${ph}`);
  console.groupEnd();

  // Valid rays are only those within the field of view
  if (!(Math.abs(ph) <= camera.fov_rad / 2.0)) return crosshair;

  // Compute the 3D points, which are of unit length then scale by d
  const d = bf / distance[0][crosshair.py][crosshair.px];

  console.groupCollapsed('distance information');
  console.log(`distance: ${d}, bf: ${bf}`);
  console.groupCollapsed('distance matrix');
  console.log(distance);
  console.groupEnd();
  console.groupEnd();

  const x = d * Math.sin(ph) * Math.cos(th);
  const y = d * Math.sin(ph) * Math.sin(th);
  const z = d * Math.cos(ph);
  
  // Perform matrix multiplication with transformation matrix
  const vector = [x, y, z, 1];
  const newVector = multiply(transformation, vector);

  console.groupCollapsed('vectors');
  console.log(`old vector: ${vector}`);
  console.log(`new vector: ${newVector}`);
  console.groupEnd();

  // New spherical coordinate values
  const R = Math.sqrt(newVector[0] ** 2 + newVector[1] ** 2 + newVector[2] ** 2);
  const phi = Math.acos(newVector[2] / R);
  const theta = Math.atan2(newVector[1], newVector[0]);

  console.groupCollapsed('new spherical coordinates');
  console.log(`R: ${R}, phi: ${phi}, theta: ${theta}`);
  console.groupEnd();

  const radius = phi * camera.fx / camera.fov_rad;

  //New pixel location
  const u = radius * Math.cos(theta) + camera.fx / 2;
  const v = radius * Math.sin(theta) + camera.fy / 2;

  console.groupCollapsed('final coords');
  console.log(`x: ${u}, y: ${v}`)
  console.groupEnd();

  // if (crosshair.x - (u / (2 * camera.cx)) * size.width < 0.1) console.log(crosshair.px, crosshair.py, u, v)

  //Scale from true pixel values (px, py) to canvas locations (x, y)
  return {x: (u / (2 * camera.cx)) * size.width, y: (v / (2 * camera.cy)) * size.height, px: u, py: v};
}

export default transform;