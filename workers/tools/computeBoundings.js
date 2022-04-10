import { Box3, Vector3, Sphere } from "three";

export default function computeBoundings( target, camera = null ){

	const box = new Box3().setFromObject(target);

	const center = box.getCenter(new Vector3());

	const sphere = box.getBoundingSphere(new Sphere(center));

	const { x: width, y: height, z: depth } = box.getSize(new Vector3());

	const min = Math.min(width, height, depth);
	const max = Math.max(width, height, depth);

	const closest = sphere.radius;
	const furthest = camera ? Math.abs(max / Math.tan(camera.fov * Math.PI / 360)) : closest;

	return { center, width, height, depth, min, max, closest, furthest };

};
