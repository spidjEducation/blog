export const debounce = (fn, delay) => {
	let timeoutId;
	return (...arg) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(fn, delay, ...arg);
	};
};
