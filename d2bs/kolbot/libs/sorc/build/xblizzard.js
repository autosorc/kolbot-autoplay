/**
 *    @filename   blizzard.js
 *    @desc       blizzard build for expansion
 */

const Build = {
    stats: [
        ["strength", 60 ],
		["vitality", 200],
		["strength", 95 ],
		["vitality", "all"]
    ],
    skills: [
		[37, 1,  false], // warmth
        [42, 1,  false], // static
        [43, 1,  false], // telekinesis
        [54, 1,  false], // teleport
        [40, 1,  false], // frozen armor
		[59, 20, false], // blizzard
        [45, 15, false], // ice blast
        [65, 17, false], // cold mastery
        [45, 20, true ], // ice blast
        [55, 20, true ], // glacial spike
        [39, 20, true ], // ice bolt
        [65, 20, true ]	 // cold mastery
    ]
};