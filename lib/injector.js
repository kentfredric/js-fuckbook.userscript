/* vim: set ts=2 sw=2 et : */
Injector = {};
Injector.inject_script = function( win , script ){ 
	var head = win.document.getElementsByTagName('head')[0];
	var so = win.document.createElement('script');
	so.type="application/javascript";
	so.innerHTML=script;
	head.appendChild(so);
};
Injector.inject_css = function( win, css ){
	if( typeof GM_addStyle != "undefined" ) { 
		GM_addStyle( css );
	} else {
  	var head = win.document.getElementsByTagName('head')[0];
	  var so = win.document.createElement('style');
  	so.type="text/css";
    so.appendChild(win.document.createTextNode(css));
  	head.appendChild(so);
  }
};
