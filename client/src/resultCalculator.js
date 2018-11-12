export function calculateError(expected, actual) {
	// TODO: this is a placeholder
	return Math.abs(actual - expected) / expected;
}

export function calculateAdjustedTime(actualTime, error) {
	// TODO: this is also a placeholder
	return actualTime * (1.0 + error);
}