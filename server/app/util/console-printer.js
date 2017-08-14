/**
 * @author halab.
 */
'use strict';


const RESET = "\x1b[0m";
const BRIGHT = "\x1b[1m";
const DIM = "\x1b[2m";
const UNDERSCORE = "\x1b[4m";
const BLINK = "\x1b[5m";
const REVERSE = "\x1b[7m";
const HIDDEN = "\x1b[8m";

const FOREGROUND_BLACK = "\x1b[30m";
const FOREGROUND_RED = "\x1b[31m";
const FOREGROUND_GREEN = "\x1b[32m";
const FOREGROUND_YELLOW = "\x1b[33m";
const FOREGROUND_BLUE = "\x1b[34m";
const FOREGROUND_MAGENTA = "\x1b[35m";
const FOREGROUND_CYAN = "\x1b[36m";
const FOREGROUND_WHITE = "\x1b[37m";

const BACKGROUND_BLACK = "\x1b[40m";
const BACKGROUND_RED = "\x1b[41m";
const BACKGROUND_GREEN = "\x1b[42m";
const BACKGROUND_YELLOW = "\x1b[43m";
const BACKGROUND_BLUE = "\x1b[44m";
const BACKGROUND_MAGENTA = "\x1b[45m";
const BACKGROUND_CYAN = "\x1b[46m";
const BACKGROUND_WHITE = "\x1b[47m";

const FOREGROUND_MAP = new Map([
	['black', FOREGROUND_BLACK],
	['red', FOREGROUND_RED],
	['green', FOREGROUND_GREEN],
	['yellow', FOREGROUND_YELLOW],
	['blue', FOREGROUND_BLUE],
	['magenta', FOREGROUND_MAGENTA],
	['cyan', FOREGROUND_CYAN],
	['white', FOREGROUND_WHITE],
]);

const BACKGROUND_MAP = new Map([
	['black', BACKGROUND_BLACK],
	['red', BACKGROUND_RED],
	['green', BACKGROUND_GREEN],
	['yellow', BACKGROUND_YELLOW],
	['blue', BACKGROUND_BLUE],
	['magenta', BACKGROUND_MAGENTA],
	['cyan', BACKGROUND_CYAN],
	['white', BACKGROUND_WHITE],
]);

let getForeground = function (color) {
	return FOREGROUND_MAP.get(color);
};

let getBackground = function (color) {
	return BACKGROUND_MAP.get(color);
};

module.exports = {
	red: function (text) {
		console.log(FOREGROUND_RED + text + RESET);
	},

	blue: function (text) {
		console.log(FOREGROUND_BLUE + text + RESET);
	},

	green: function (text) {
		console.log(FOREGROUND_GREEN + text + RESET);
	},

	yellow: function (text) {
		console.log(FOREGROUND_YELLOW + text + RESET);
	},

	magenta: function (text) {
		console.log(FOREGROUND_MAGENTA + text + RESET);
	},

	cyan: function (text) {
		console.log(FOREGROUND_CYAN + text + RESET);
	},

	print: function (text, foregroundColor, backgroundColor) {
		let foreground = getForeground(foregroundColor);
		let background = getBackground(backgroundColor);
		if (foreground === undefined || background === undefined) {
			console.log(text);
		} else {
			console.log(foreground + background + text + RESET);
		}
	}
};