const pad = (num: number): string => ('' + num).padStart(2, '0');

export function secondsToTime(seconds: number | undefined): string {
	if (seconds === undefined) return '00:00';
	seconds = Math.trunc(Number(seconds));
	const hours = Math.floor(seconds / 3600);
	seconds %= 3600;
	const minutes = Math.floor(seconds / 60);
	seconds %= 60;
	return (hours ? `${hours}:${pad(minutes)}` : minutes) + `:${pad(seconds)}`;
}

export function timeToSeconds(time: string): number {
	const [hours = '0', minutes = '0', seconds = '0'] = time
		.split(':')
		.map((str) => parseInt(str, 10));
	return parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
}
