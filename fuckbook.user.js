// ==UserScript==
// @name      Fuckbook
// @namespace    http://userscripts.org/scripts/show/74547
// @description    Replacing facebook logos and title + removing all the ads and makes navigation menu 'Always on Top'
// @resource    jQuery    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @resource    Facebox    http://yourjavascript.com/0432123015/facebox.js
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

var ctx = {};

ctx.syslog = function( message ){
  GM_log( (new Date()).getTime() + " " + message, { x: arguments } );
};

var Queue = function(name) {
  var qname = name;
	var items = [];
	var pos   = 0;
	var stash = { };
	stash.addItem = function( name , fn ){ 
		items.push({
			name : name,
			fn : fn,
		});
	};
	stash.run_current = function(){
		if ( typeof item[pos] == 'undefined' ){ 
			return;
		}
		items[ pos ].fn();
	};
	stash.next = function() {
		pos = pos + 1;
	};
	stash.dequeue = function(){
		if ( typeof items[pos] == 'undefined' ){ 
			return;
		}
		var fn = items[ pos ].fn;
		ctx.syslog(qname + ':dequeue ' + items[pos].name );
		pos = pos + 1;
		fn();
	};
	stash.add_repeater = function( name, test, success ) {
		var cb_code = function() {
			if ( test() ){
				success();
			} else {
				setTimeout( cb_code , 10 );
			}
		};
		stash.addItem( name , cb_code );
	};
	stash.add_wait = function( name, test ){ 
		stash.add_repeater( name, test, function(){ 
			stash.dequeue();
		});
	};
  stash.add_event = function( name, code ){ 
    stash.addItem(name, function(){
      code(stash);
      stash.dequeue();
    });
  };
  stash.abort = function(){
    ctx.syslog(qname + ':manual abort');
    pos = items.length + 1;
  };
	return stash;
};

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
bootwait.add_event('domain_trace', function(){
    ctx.syslog = function( message ){
      GM_log( (new Date()).getTime() + ":" + message, { origin: unsafeWindow.document.location , x: arguments });
    };
});
bootwait.add_wait('header waiter',function(){
  return typeof unsafeWindow.document.getElementsByTagName('head') == 'object';
});

bootwait.add_event('Main Code', function(){

  var main = function() {

    try {
      var sys = {};
      sys.lib = {};
      sys.lib.jQuery = GM_getResourceText('jQuery');
      sys.lib.Facebox = GM_getResourceText('Facebox');

      var inject_script = function(source, label, trigger, callback){
        var d = unsafeWindow.document;
        var head = d.getElementsByTagName('head');
        var script = d.createElement('script');
        script.type="application/javascript";
        script.innerHTML = source;
        script.attributes['id'] = label;
        head.appendChild(script);
        var waitfn = function() {
          if( typeof unsafeWindow[trigger] == 'undefined' ){
            window.setTimeout( waitfn , 100 );
          } else {
            callback( unsafeWindow, unsafeWindow[trigger] );
          }
        };

      };

      inject_script(sys.lib.jQuery, 'jquery-src', 'jQuery', function( win, $ ){ 
        inject_script(sys.lib.Facebox, 'facebox-src', 'Facebox', function( win, fb ) { 
        GM_log([ "Loaded" , win, $, fb ]);
        });
      });
    } catch( e ){
      GM_log(e);
    }

  };

});

bootwait.dequeue();

/*
 
(function () {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  var jQuery = GM_getResourceText('jQuery');
  var Facebox = GM_getResourceText('Facebox');
  script.innerHTML = jQuery + Facebox;
  head.appendChild(script);
  unsafeWindow.jQuery.noConflict();
  $ = unsafeWindow.jQuery
})();

function GM_wait() {
  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait, 100)
  } else {
    unsafeWindow.jQuery.noConflict();
    jQuery = unsafeWindow.jQuery;
    letsJQuery()
  }
}
GM_wait();
var theme_map = { };

var github_base = "https://github.com/kentfredric/js-fuckbook.userscript/raw/";
var github_commit = "51b3053651b9288aedfd588de89e2d489b2bb81d";
var add_theme = function( name, optionName, titletext ){
	theme_map.[name] = {
		option: optionName,
		titletext: titletext,
		title: github_base + github_commit + "/png/" + name + "/logo.png",
		css_title: github_base + github_commit + "/png/" + name + "/pagelogo.png",
	};
};
var apply_css = function( css ) {
	if( typeof GM_addStyle != "undefined" ) { 
		GM_addStyle( css );
	} else {
		var heads = document.getElementsByTagName("head");
		if ( heads.length > 0 ) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node);
		}
	}
};

add_theme( 'fuckbook', 'logoFuckbook', 'Fuckbook' );
add_theme( 'f337book', 'logoF337book', 'F337book' );
add_theme( 'facebutt', 'logoFacebutt', 'Facebutt' );
add_theme( 'failbook', 'logoFailbook', 'Failbook' );
add_theme( 'fakebook', 'logoFakebook', 'Fakebook' );

var gen_css = function( theme ) {
	return 
		"#pageLogo a { background:#3b5998 url(" + theme_map[ theme ].css_title + ") no-repeat -21px 0 !important; display:block !important;  height:31px !important; width:103px !important; }" +
		"#pageLogo a:hover, #pageLogo a:focus, #pageLogo a:active {  outline:none !important;  background-color:#4b67a1 !important;  background-position:-21px -31px !important; }"  + 
		"#pageLogo span { display:none !important; }"
	
};

var set_titletext = function( text ) {
    var titleset = function () {
      document.title = document.title.replace("Facebook", text );
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
	if( GM_getValue( theme_data.option ) == 'checked' ){
		apply_css( gen_css(theme)); 
		if (GM_getValue('titleSameAsLogo') == 'checked') {
    			set_titletext(theme_data.titletext);
		}
	}
};

	


apply_css( document.FUCKBOOK.css[0] );
apply_css( document.FUCKBOOK.css[1] );
apply_theme_css('fuckbook');
apply_theme_css('fakebook');
apply_theme_css('failbook');
apply_theme_css('f337book');
apply_theme_css('facebutt');

if (GM_getValue('titleCustom') == 'checked') {
  set_titletext(GM_getValue('titleCustomValue'));
}
if (GM_getValue('removeAds') == 'checked') {
  apply_css(document.FUCKBOOK.css[7]);
  var allAds, thisAd;
  var logging = true;
  allAds = document.evaluate("//iframe[contains(@src, 'http://ads.')] | //iframe[contains(@src, 'http://ad.')] | //iframe[contains(@src, '/ad.php?')] | //iframe[contains(@src, '/banner')] | //div[contains(@id, 'sponsor')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < allAds.snapshotLength; i++) {
    thisAd = allAds.snapshotItem(i);
    thisAd.style.display = "none";
    thisAd.parentNode.removeChild(thisAd)
  }
}
if (GM_getValue('fixedHeader') == 'checked') {
  apply_css( document.FUCKBOOK.css[8] );
}
if (GM_getValue('hideChatBar') == 'checked') {
  apply_css( document.FUCKBOOK.css[9] );
}

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
