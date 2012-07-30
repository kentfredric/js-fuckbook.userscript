// ==UserScript==
// @name      Fuckbook
// @namespace    http://userscripts.org/scripts/show/74547
// @description    Replacing facebook logos and title + removing all the ads and makes navigation menu 'Always on Top'
// @require     https://raw.github.com/kentfredric/js-fuckbook.userscript/master/lib/queue.js
// @require     https://raw.github.com/kentfredric/js-fuckbook.userscript/master/lib/injector.js
// @require     https://raw.github.com/kentfredric/js-fuckbook.userscript/master/lib/gm_settings.js
// @resource    jQuery     http://code.jquery.com/jquery-1.7.2.js
// @resource    Facebox    http://yourjavascript.com/0432123015/facebox.js
// @resource    css_0     https://raw.github.com/kentfredric/js-fuckbook.userscript/master/css/main_0.css
// @resource    css_1     https://raw.github.com/kentfredric/js-fuckbook.userscript/master/css/main_1.css
// @resource    css_7     https://raw.github.com/kentfredric/js-fuckbook.userscript/master/css/main_7.css
// @resource    css_8     https://raw.github.com/kentfredric/js-fuckbook.userscript/master/css/main_8.css
// @resource    css_9     https://raw.github.com/kentfredric/js-fuckbook.userscript/master/css/main_9.css
// @resource    pagelogo     https://raw.github.com/kentfredric/js-fuckbook.userscript/master/csst/pagelogo.css

// @include      http://facebook.com/*
// @include      http://*.facebook.com/*
// @include      https://facebook.com/*
// @include      https://*.facebook.com/*
// @exclude      http://facebook.com/ai.php*
// @exclude      http://*facebook.com/ai.php*
// @exclude      https://facebook.com/ai.php*
// @exclude      https://*facebook.com/ai.php*
// @version      2.7
// ==/UserScript==

//saveDefaultSettings();

Queue.log = function(message){
  GM_log(message);
};
var settings = GMSettings();
settings.addDefault('theme', 'fuckbook');
settings.addDefault('titleSameAsLogo', true );
settings.addDefault('titleCustomValue', 'Custom');
settings.addDefault('removeAds', true );
settings.addDefault('fixedHeader', true );
settings.addDefault('hideChatBar', false );

var bootwait = Queue();

bootwait.add_wait( 'unsafeWindow', function(){ 
	return typeof unsafeWindow != 'undefined';
});
bootwait.add_wait('document', function(){ 
	return typeof unsafeWindow.document != 'undefined';
});
bootwait.add_wait('location', function(){
	return typeof unsafeWindow.document.location != 'undefined' ;
});
bootwait.add_event('abort_weird', function(stash){
  if ( unsafeWindow.document.location['pathname'] == '/ai.php' ) {
    stash.abort();
  };
  return false;
});
bootwait.add_wait('header waiter',function(){
  return typeof unsafeWindow.document.getElementsByTagName('body') == 'object';
});
bootwait.add_event('inject-jquery', function(){
    Injector.inject_script( unsafeWindow, GM_getResourceText('jQuery'));
});
bootwait.add_wait('jQuery loaded', function(){ 
  return typeof unsafeWindow.jQuery != 'undefined';
});
bootwait.add_event('inject-facebox', function(){ 
  Injector.inject_script( unsafeWindow, GM_getResourceText('Facebox'));
});
bootwait.add_wait('Facebox loaded', function(){ 
  return typeof unsafeWindow.jQuery.facebox != 'undefined';
});
bootwait.add_event('Main Code', function(){
  GM_log( unsafeWindow.jQuery, unsafeWindow.jQuery.facebox );





var theme_map = { };

var github_base = "https://github.com/kentfredric/js-fuckbook.userscript/raw/";
var github_commit = "51b3053651b9288aedfd588de89e2d489b2bb81d";
var add_theme = function( name, optionName, titletext , isDefault ){
	theme_map[name] = {
		option: optionName,
		titletext: titletext,
		title: github_base + github_commit + "/png/" + name + "/logo.png",
		css_title: github_base + github_commit + "/png/" + name + "/pagelogo.png",
	};
};
add_theme( 'fuckbook', 'logoFuckbook', 'Fuckbook', true );
add_theme( 'f337book', 'logoF337book', 'F337book', false );
add_theme( 'facebutt', 'logoFacebutt', 'Facebutt', false );
add_theme( 'failbook', 'logoFailbook', 'Failbook', false );
add_theme( 'fakebook', 'logoFakebook', 'Fakebook', false );

var gen_css = function( theme ) {
	return GM_getResourceText('pagelogo').replace('%IMAGE%',theme_map[theme].css_title );	
};

var set_titletext = function( text ) {
    var titleset = function () {
      unsafeWindow.document.title = unsafeWindow.document.title.replace("Facebook", text );
    };
    for ( var i = 25; i < 1000 ; i+= 25 ){ 
    	setTimeout(titleset, i);
    }
    for ( var i = 1250; i < 3000 ; i+= 250 ){ 
    	setTimeout(titleset, i);
    }
};



var apply_theme_css = function( theme ) { 
	var theme_data = theme_map[ theme ];
	if( settings.getValue('theme') == theme ){
		Injector.inject_css( unsafeWindow, gen_css(theme)); 
		if ( settings.getValue('titleSameAsLogo')) {
    			set_titletext(theme_data.titletext);
		}
	}
};

	


Injector.inject_css( unsafeWindow,  GM_getResourceText('css_0') );
Injector.inject_css( unsafeWindow, GM_getResourceText('css_1') );
apply_theme_css('fuckbook');
apply_theme_css('fakebook');
apply_theme_css('failbook');
apply_theme_css('f337book');
apply_theme_css('facebutt');

if (settings.getValue('theme') == 'custom') {
  set_titletext(settings.getValue('titleCustomValue'));
}
if (settings.getValue('removeAds')) {
  Injector.inject_css( unsafeWindow,  GM_getResourceText('css_7'));
  var allAds, thisAd;
  var logging = true;
  allAds = document.evaluate("//iframe[contains(@src, 'http://ads.')] | //iframe[contains(@src, 'http://ad.')] | //iframe[contains(@src, '/ad.php?')] | //iframe[contains(@src, '/banner')] | //div[contains(@id, 'sponsor')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < allAds.snapshotLength; i++) {
    thisAd = allAds.snapshotItem(i);
    thisAd.style.display = "none";
    thisAd.parentNode.removeChild(thisAd)
  }
}
if (settings.getValue('fixedHeader')) {
  Injector.inject_css( unsafeWindow,  GM_getResourceText('css_8'));
}
if (settings.getValue('hideChatBar')) {
  Injector.inject_css( unsafeWindow,  GM_getResourceText('css_9'));
}

});
bootwait.dequeue();

/*


function letsJQuery() {
  if (GM_getValue('logoFuckbook') == 'checked') {
    $("div.loggedout_menubar_container div.clearfix.loggedout_menubar a.lfloat").html(document.FUCKBOOK.html[0]);
  }
  if (GM_getValue('logoFakebook') == 'checked') {
    $("div.loggedout_menubar_container div.clearfix.loggedout_menubar a.lfloat").html(document.FUCKBOOK.html[1]);
  }
  if (GM_getValue('logoFailbook') == 'checked') {
    $("div.loggedout_menubar_container div.clearfix.loggedout_menubar a.lfloat").html(document.FUCKBOOK.html[2]);
  }
  if (GM_getValue('logoF337book') == 'checked') {
    $("div.loggedout_menubar_container div.clearfix.loggedout_menubar a.lfloat").html(document.FUCKBOOK.html[3]);
  }
  if (GM_getValue('logoFacebutt') == 'checked') {
    $("div.loggedout_menubar_container div.clearfix.loggedout_menubar a.lfloat").html(document.FUCKBOOK.html[4]);
  }
  $(document).ready(function () {
    $('a[rel*=facebox]').facebox()
  });

  function saveSettings() {
    if ($("#facebox #logoFuckbook").is(':checked')) {
      GM_setValue('logoFuckbook', 'checked');
      GM_setValue('logoFakebook', 0);
      GM_setValue('logoFailbook', 0);
      GM_setValue('logoF337book', 0);
      GM_setValue('logoFacebutt', 0);
      GM_setValue('logoFacebook', 0)
    }
    if ($("#facebox #logoFakebook").is(':checked')) {
      GM_setValue('logoFuckbook', 0);
      GM_setValue('logoFakebook', 'checked');
      GM_setValue('logoFailbook', 0);
      GM_setValue('logoF337book', 0);
      GM_setValue('logoFacebutt', 0);
      GM_setValue('logoFacebook', 0)
    }
    if ($("#facebox #logoFailbook").is(':checked')) {
      GM_setValue('logoFuckbook', 0);
      GM_setValue('logoFakebook', 0);
      GM_setValue('logoFailbook', 'checked');
      GM_setValue('logoF337book', 0);
      GM_setValue('logoFacebutt', 0);
      GM_setValue('logoFacebook', 0)
    }
    if ($("#facebox #logoF337book").is(':checked')) {
      GM_setValue('logoFuckbook', 0);
      GM_setValue('logoFakebook', 0);
      GM_setValue('logoFailbook', 0);
      GM_setValue('logoF337book', 'checked');
      GM_setValue('logoFacebutt', 0);
      GM_setValue('logoFacebook', 0)
    }
    if ($("#facebox #logoFacebutt").is(':checked')) {
      GM_setValue('logoFuckbook', 0);
      GM_setValue('logoFakebook', 0);
      GM_setValue('logoFailbook', 0);
      GM_setValue('logoF337book', 0);
      GM_setValue('logoFacebutt', 'checked');
      GM_setValue('logoFacebook', 0)
    }
    if ($("#facebox #logoFacebook").is(':checked')) {
      GM_setValue('logoFuckbook', 0);
      GM_setValue('logoFakebook', 0);
      GM_setValue('logoFailbook', 0);
      GM_setValue('logoF337book', 0);
      GM_setValue('logoFacebutt', 0);
      GM_setValue('logoFacebook', 'checked')
    }
    if ($("#facebox #titleSameAsLogo").is(':checked')) {
      GM_setValue('titleSameAsLogo', 'checked');
      GM_setValue('titleCustom', 0)
    }
    if ($("#facebox #titleCustom").is(':checked')) {
      GM_setValue('titleSameAsLogo', 0);
      GM_setValue('titleCustom', 'checked')
    }
    if ($("#facebox #removeAds").is(':checked')) {
      GM_setValue('removeAds', 'checked')
    } else {
      GM_setValue('removeAds', 0)
    }
    if ($("#facebox #fixedHeader").is(':checked')) {
      GM_setValue('fixedHeader', 'checked')
    } else {
      GM_setValue('fixedHeader', 0)
    }
    if ($("#facebox #hideChatBar").is(':checked')) {
      GM_setValue('hideChatBar', 'checked')
    } else {
      GM_setValue('hideChatBar', 0)
    }
  }
  $("#options_button").live('hover', function () {
    if ($("#facebox #titleCustom").is(':checked')) {
      $("#facebox #titleCustomValue").removeAttr('disabled')
    }
  });
  $("#facebox #titleCustom").live('click', function () {
    $("#facebox #titleCustomValue").removeAttr('disabled')
  });
  $("#facebox #titleSameAsLogo").live('click', function () {
    $("#facebox #titleCustomValue").attr('disabled', true)
  });
  $("#options_button").live('hover', function () {
    setTimeout(function () {
      $("#facebox #titleCustomValue").val(GM_getValue('titleCustomValue'))
    }, 0)
  });
  $('#facebox #titleCustomValue').live('change', function () {
    setTimeout(function () {
      GM_setValue('titleCustomValue', $('#facebox #titleCustomValue').val())
    }, 0)
  });
  $("#facebox #fuckbookCancel").live('click', function () {
    $('#options_button').fadeIn(1000);
    $.facebox.close()
  });
  $("#facebox #fuckbookSaveSettings").live('click', function () {
    setTimeout(function () {
      saveSettings()
    }, 0);
    location.reload()
  });
  $("#headNav").append(document.FUCKBOOK.html[5]);

  function hideOptionsButton() {
    $('#options_button').hide(0)
  }
  document.getElementById('options_button').addEventListener('click', hideOptionsButton, false);
  $("body").append(document.FUCKBOOK.html[6]);
  $("#fuckbook_options_wrap").append(document.FUCKBOOK.html[7]);
  $("#fuckbook_options_wrap").append(document.FUCKBOOK.html[8]);
  $("#fuckbook_options_wrap").append(document.FUCKBOOK.html[9]);
  $("#footer").append(document.FUCKBOOK.html[10]);
  $("#fuckbook_options_container").append(document.FUCKBOOK.html[11]);
  if (GM_getValue('logoFuckbook') == 'checked') {
    $("#fuckbook_options_container").append(document.FUCKBOOK.html[12]);
  } else {
    $("#fuckbook_options_container").append(document.FUCKBOOK.html[13]);
  }
  if (GM_getValue('logoFakebook') == 'checked') {
    $("#fuckbook_options_container").append(document.FUCKBOOK.html[14]);
  } else {
    $("#fuckbook_options_container").append(document.FUCKBOOK.html[15]);
  }
  if (GM_getValue('logoFailbook') == 'checked') {
    $("#fuckbook_options_container").append(document.FUCKBOOK.html[16]);
  } else {
    $("#fuckbook_options_container").append(document.FUCKBOOK.html[17]);
  }
  if (GM_getValue('logoF337book') == 'checked') {
    $("#fuckbook_options_container").append(document.FUCKBOOK.html[18]);
  } else {
    $("#fuckbook_options_container").append(document.FUCKBOOK.html[19]);
  }
  if (GM_getValue('logoFacebutt') == 'checked') {
    $("#fuckbook_options_container").append(document.FUCKBOOK.html[20]);
  } else {
    $("#fuckbook_options_container").append(document.FUCKBOOK.html[21]);
  }
  if (GM_getValue('logoFacebook') == 'checked') {
    $("#fuckbook_options_container").append(document.FUCKBOOK.html[22]);
  } else {
    $("#fuckbook_options_container").append(document.FUCKBOOK.html[23]);
  }
  $("#fuckbook_options_container").append(document.FUCKBOOK.html[24]);

  if (GM_getValue('titleSameAsLogo') == 'checked') {
    $("#fuckbook_options_container").append(document.FUCKBOOK.html[25]);
  } else {
    $("#fuckbook_options_container").append(document.FUCKBOOK.html[26]);
  }
  if (GM_getValue('titleCustom') == 'checked') {
    $("#fuckbook_options_container").append(document.FUCKBOOK.html[27]);
  } else {
    $("#fuckbook_options_container").append(document.FUCKBOOK.html[28]);
  }
  $("#fuckbook_options_container").append(document.FUCKBOOK.html[29]);
  $("#fuckbook_options_container").append(document.FUCKBOOK.html[30]);

  if (GM_getValue('removeAds') == 'checked') {
    $("#fuckbook_options_container").append(document.FUCKBOOK.html[31]);
  } else {
    $("#fuckbook_options_container").append(document.FUCKBOOK.html[32]);
  }
  if (GM_getValue('fixedHeader') == 'checked') {
    $("#fuckbook_options_container").append(document.FUCKBOOK.html[33]);
  } else {
    $("#fuckbook_options_container").append(document.FUCKBOOK.html[34]);
  }
  if (GM_getValue('hideChatBar') == 'checked') {
    $("#fuckbook_options_container").append(document.FUCKBOOK.html[35]);
  } else {
    $("#fuckbook_options_container").append(document.FUCKBOOK.html[36]);
  }
}
function saveDefaultSettings() {
  if (GM_getValue('logoFuckbook') == undefined) {
    GM_setValue('logoFuckbook', 'checked');
    GM_setValue('logoFakebook', 0);
    GM_setValue('logoFailbook', 0);
    GM_setValue('logoF337book', 0);
    GM_setValue('logoFacebutt', 0);
    GM_setValue('logoFacebook', 0);
    GM_setValue('titleSameAsLogo', 'checked');
    GM_setValue('titleCustom', 0);
    GM_setValue('titleCustomValue', 'Custom');
    GM_setValue('removeAds', 'checked');
    GM_setValue('fixedHeader', 'checked');
    GM_setValue('hideChatBar', 0)
  }
}
*/
