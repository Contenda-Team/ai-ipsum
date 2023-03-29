const boringLatin = require("../../ipsums/loremipsum.json");
const dashOfAI = require("../../ipsums/ai.json");

const grabRandomItem = (options) => {
	return Math.floor(Math.random() * Math.floor(options.length));
};

const itemFromList = (arr) => {
	let item = grabRandomItem(arr);
	return arr[item];
};

exports.handler = async (event, context) => {
	// support params in querystring or path
	let quantity;
	if (event.queryStringParameters.quantity) {
		quantity = event.queryStringParameters.quantity;
	} else {
		quantity = event.path.split("ipsum/")[1];
	}

	// always return something
	if (!quantity) {
		quantity = 1;
	}

	let aiIpsum = [];

	for (let i = 0; i < quantity; i++) {
		let blub = itemFromList(boringLatin).split(" ");

		for (let item = 0; item < 40; item++) {
			// choose a word at random from the Latin
			// and replace it with some random dashOfAI
			let season = itemFromList(dashOfAI);
			blub.splice(grabRandomItem(blub), 1, season);
		}
		aiIpsum.push(blub.join(" "));
	}

	const words = aiIpsum.join("\n\n");

	return {
		statusCode: 200,
		body: JSON.stringify({
			words: words.split(" ").length,
			ipsum: words,
		}),
	};
};
