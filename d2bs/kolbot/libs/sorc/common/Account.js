/**
 *    @filename   Account.js
 *    @desc       generate data for accounts
 */

const Account = (function() {
    const PATH = "libs/sorc/data/" + me.profile + ".json";

    return {
        set: function() {
            let accountData;

            if (SETTINGS.hasOwnProperty(me.profile)) {
                accountData = SETTINGS[me.profile];
            } else {
                accountData = SETTINGS["all"];
            }
			
            accountData.charClass 			= "sorceress";
            accountData.difficulty 			= "Normal";
			//accountData.startTime 		= "";
			
			//if (!accountData.account) accountData.account  = Misc.randomString(10, true);
			//if (!accountData.charName)accountData.charName = Misc.randomString(10, false);
			
			if (!accountData.account) 	accountData.account  =  NameGenerator.generateName(true);
			if (!accountData.charName)	accountData.charName =  NameGenerator.generateName();
			if (!accountData.password)	accountData.password =  Misc.randomString(5,  false);
			if (!accountData.build1 && !accountData.expansion)  accountData.build1 = "start";
			if (!accountData.build2 && !accountData.expansion)	accountData.build2 = "blizzard";
			if (!accountData.build3 && !accountData.expansion)	accountData.build3 = "endgame";
			if (!accountData.build1 && accountData.expansion)	accountData.build1 = "start";
			if (!accountData.build2 && accountData.expansion)	accountData.build2 = "xblizzard";
			if (!accountData.build3 && accountData.expansion)	accountData.build3 = "xendgame";
			if (!accountData.respec1) accountData.respec1 = 24;
			if (!accountData.respec2) accountData.respec2 = 100;
			
            return Misc.dataAction.create(PATH, accountData);
        },
        get: function() {
            return Misc.dataAction.read(PATH);
        },
        update: function(prop, value) {
            return Misc.dataAction.update(PATH, prop, value);
        }
    }
}());
