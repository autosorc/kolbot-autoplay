/**
 *    @filename   Sequences.js
 *    @desc       config the sequences to be ran
 */

const Sequences = (function() {
    return {
        nextDifficulty: [
            [																				// Classic
                [																			// Normal
                    "me.charlvl >= 26",														// Level 26
                    "Packet.checkQuest(26, 0)"												// Diablo
                ],
                [																			// Nightmare
                    "me.charlvl >= 62",														// Level 62
                    "me.fireResist >= 70",													// 70 Fire resist
                    "me.lightningResist >= 70",												// 70 Light resist
                    "Packet.checkQuest(26, 0)"												// Diablo
                ]
            ],
            [																				// Expansion
                [																			// Normal
                    "me.charlvl >= 43",														// Level 43
                    "Packet.checkQuest(40, 0)"												// Baal
                ],
                [																			// Nightmare
                    "me.charlvl >= 70",														// Level 70
                    "me.fireResist >= 75",													// 75 Fire resist
                    "me.lightningResist >= 50",												// 50 Light resist
                    "Packet.checkQuest(40, 0)"												// Baal
                ]
            ]
        ],
        quest: [
            [ 																				// Classic
                [																			// Normal
                    "den", "cave", "tree", "cain", "trist", "countess", "andariel",			// Act 1
                    "radament", "cube", "shaft", "amulet", "summoner", "duriel", "tomb",	// Act 2
                    "lamessen", "eye", "brain", "heart", "travincal", "mephisto",			// Act 3
                    "izual", "diablo"														// Act 4
                ],
                [																			// Nightmare
                    "den", "tree", "cain", "trist", "countess", "andariel",					// Act 1
                    "radament", "shaft", "amulet", "summoner", "duriel",					// Act 2
                    "lamessen", "eye", "brain", "heart", "travincal", "mephisto",			// Act 3
                    "izual", "diablo"														// Act 4
                ],
                [																			// Hell
                    "andariel",																// Act 1
                    "radament", "shaft", "amulet", "summoner", "duriel",					// Act 2
                    "lamessen", "eye", "brain", "heart", "travincal", "mephisto",			// Act 3
                    "izual"																	// Act 4
                ]
            ],
            [																				// Expansion
                [																			// Normal
                    "den", "raven", "cave", "tree", "cain", "trist", "countess", "andariel",// Act 1
                    "radament", "cube", "amulet", "summoner", "tomb", "shaft", "duriel",	// Act 2
                    "lamessen", "eye", "brain", "heart", "travincal", "mephisto",			// Act 3
                    "izual", "diablo",														// Act 4
                    "shenk", "rescue", "anya", "ancients", "baal"							// Act 5
                ],
                [																			// Nightmare
                    "den", "countess", "andariel",											// Act 1
                    "radament", "cube" , "shaft", "amulet", "summoner", "duriel",			// Act 2
                    "lamessen", "eye", "brain", "heart", "travincal", "mephisto",			// Act 3
                    "izual", "diablo",														// Act 4
                    "shenk", "anya", "ancients", "baal"										// Act 5
                ],
                [																			// Hell
                    "andariel",																// Act 1
                    "radament", "cube", "shaft", "amulet", "summoner", "duriel",			// Act 2
                    "lamessen", "eye", "brain", "heart", "travincal", "mephisto",			// Act 3
                    "izual", 																// Act 4
					"diablo", "den", "anya", "ancients"										// Act 5
                ]
            ]
        ],
        magicfind: [
            [ 																				// Classic
                [																			// Normal
                    "diablo"
                ],
                [																			// Nightmare
                    "andariel", "duriel", "mephisto", "izual", "diablo"
                ],
                [																			// Hell
                    "duriel", "mephisto", "andariel", "izual", "vizier"
                ]
            ],
            [ 																				// Expansion
                [																			// Normal
                    "shenk", "pindle", "baal"
                ],
                [																			// Nightmare
                    "andariel", "mephisto", "shenk", "pindle", "baal"
                ],
                [																			// Hell
					"pindle", "mausoleum", "duriel", "tunnels", "andariel", "chests", "mephisto"
                ]
            ]
        ]
    }
}());
