GMSettings = function(){ 
	var stash = {};
	var defaults = {};

	stash.setDefault = function( key, value ){ 
		if ( typeof GM_getValue(key) == 'undefined' ) {
			stash[key] = value;
		} else {
			stash[key] = GM_getValue(key);
		}
		defaults[key] = value;
		GM_setValue( key, stash[key] );
	};
	stash.setValue = function( key, value ){ 
		stash[key] = value;
		GM_setValue( key, value );
	}
	stash.getValue = function( key ){
		if ( typeof GM_getValue(key) != 'undefined' ) {
			stash[key] = GM_getValue(key);
		}
		return stash[key];
	}
	return stash;
};
