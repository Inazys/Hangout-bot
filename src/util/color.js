function componentToHex(c) {
	let hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r,g,b) {
	return parseInt(`0x${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`);
}

module.exports = rgbToHex;