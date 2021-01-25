enum COLORS {
	red = "Red",
	blue = "Blue",
	green = "Green",
	yellow = "Yellow"
};

interface CardValue {
	number: number,
	sign: string,
}

interface CardValues {
	Narr: CardValue,
	One: CardValue,
	Two: CardValue,
	Three: CardValue,
	Four: CardValue,
	Five: CardValue,
	Six: CardValue,
	Seven: CardValue,
	Eight: CardValue,
	Nine: CardValue,
	Ten: CardValue,
	Eleven: CardValue,
	Twelve: CardValue,
	Thirteen: CardValue,
	Wizzard: CardValue,
}

const VALUES: CardValues = {
	Narr: { number: 0, sign: "N" },
	One: { number: 1, sign: "1" },
	Two: { number: 2, sign: "2" },
	Three: { number: 3, sign: "3" },
	Four: { number: 4, sign: "4" },
	Five: { number: 5, sign: "5" },
	Six: { number: 6, sign: "6" },
	Seven: { number: 7, sign: "7" },
	Eight: { number: 8, sign: "8" },
	Nine: { number: 9, sign: "9" },
	Ten: { number: 10, sign: "10" },
	Eleven: { number: 11, sign: "11" },
	Twelve: { number: 12, sign: "12" },
	Thirteen: { number: 13, sign: "13" },
	Wizzard: { number: 14, sign: "Z" }
};

export { COLORS, VALUES, CardValue }
