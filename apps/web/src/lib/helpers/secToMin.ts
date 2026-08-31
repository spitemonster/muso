export function secToMin(totalSeconds: number) {
	const minutes: number = Math.floor(totalSeconds / 60);
	const seconds: number = Math.floor(totalSeconds % 60);

	const paddedSeconds: string = seconds.toString().padStart(2, '0');

	return `${minutes}:${paddedSeconds}`;
}