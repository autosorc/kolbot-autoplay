/**
*	@filename	NameGenerator.js
*	@author		laz
*	@desc		Random name generator
*/

var NameGenerator = {
	
	// Settings
	
	switchChars		: true,		// Replace similar looking letters or numbers with other ones at random to increase randomness
	addGlue			: false,	// Add a character between the adjective and noun
	addEnd			: false,	// Add a character to the end of the name
	capitalize		: true,		// Capitalize the first letter of the adjective and noun
	maxRolls		: 1000,		// Maximum randomized rolls to try and hit a valid name from the given parameters
	
	// -------- No touchy --------
	
	charSet		: "",
	switchMap	: false,
	
	letterSet	: "abcdefghijklmnopqrstuvwxyz-",
	numberSet	: "0123456789",
	
	switchLetterMap: {
		"i": "l",
		"l": "i",
	},
	
	switchNumberMap: {
		"1": "l", // one -> L
		"3": "e", 
		"e": "3",
		"2": "z",
		"z": "2",
		"5": "s",
		"s": "5",
		"0": "o",
		"o": "0",
	},
	
	rand: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	
	capitalizeWord: function (word) {
		word = word.toLowerCase();
		if (!this.capitalize) return word;
		return word.charAt(0).toUpperCase() + word.slice(1);
	},
	
	generateName: function (num, len) {
		if (!isIncluded("Polyfill.js")) include("Polyfill.js");
		this.num = num || false;
		this.len = len || 15;
		
		if (!this.adj)  this.adj  = this.loadDict("adj.txt");
		if (!this.noun) this.noun = this.loadDict("noun.txt");
		
		this.charSet = this.letterSet + (this.num ? this.numberSet : "");
		this.switchMap = Object.assign({}, this.switchLetterMap, (this.num ? this.switchNumberMap : {}));
		
		var combo, 
			rolls = 0;
		
		while (true) {
			let adj  = this.capitalizeWord(this.adj[this.rand(0, this.adj.length - 1)]);
			let noun = this.capitalizeWord(this.noun[this.rand(0, this.noun.length - 1)]);
			let glue = this.addGlue ? this.charSet[this.rand(0, this.charSet.length - 1)] : "";
			let end  = this.addEnd ? this.charSet[this.rand(0, this.charSet.length - 1)] : "";;
			
			combo = adj + glue + noun + end;
			rolls++;
			
			if (rolls > this.maxRolls) throw new Error("Presets given didn't allow for a valid name in " + this.maxRolls + " rolls.");
			if (!num && combo.match(/\d+/g)) continue;
			if (combo.length <= this.len) break;
		}
		
		this.name = "";
		
		if (this.switchChars) {
			for (let i = 0; i < combo.length; i++) {
				if (this.rand(0,9) >= 2 || !this.switchMap.hasOwnProperty(combo[i])) { // Decide if we switch this letter and check if it can
					this.name += combo[i];
					continue;
				}
				
				let letter = this.switchMap[combo[i]];
				if (combo[i].toUpperCase() == combo[i]) // original letter was uppercase
					letter = letter.toUpperCase();
				this.name += letter;
			}
		} else {
			this.name = combo;
		}
		
		return this.name;
	},
	
	loadDict: function(name) {
		for (let i = 0; i < 5; i++) {
			try {
				return FileTools.readText("libs/dict/" + name).split("\n");
			} catch (e) {
				delay(100);
			}
		}
		throw new Error("Failed to load dictionary : " + name);
		return false;
	},
	
	getName: function () {
		return this.name || false;
	}
};