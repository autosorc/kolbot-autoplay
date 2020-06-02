/**
 *    @filename   Account.js
 *    @desc       generate data for accounts
 */

const Account = (function() {
    const PATH = "libs/sorc/data/" + me.profile + ".json";

    return {
        //Generate account datafile
        set: function() {
            let accountData;

            if (SETTINGS.hasOwnProperty(me.profile)) {
                accountData = SETTINGS[me.profile];
            } else {
                accountData = SETTINGS["all"];
            }
			
			if (accountData.account  == "") accountData.account  = Misc.randomString(10, true);
			if (accountData.charName == "") accountData.charName = Misc.randomString(10, false);
			if (accountData.password == "") accountData.password = Misc.randomString(5,  false);
			
            accountData.charClass 			= "sorceress";
            accountData.difficulty 			= "Normal";
            accountData.respecLevel 		= 24;
			accountData.beforeRespecBuild 	= "start";
			accountData.afterRespecbuild 	= "xblizzard";
			//accountData.startTime = "";

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
