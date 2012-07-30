/* vim: set ts=2 sw=2 et : */
Injector = {};
Injector.inject_script = function( win , script ){ 
	var head = win.document.getElementsByTagName('head')[0];
	var so = win.document.createElement('script');
	so.type="application/javascript";
	so.innerHTML=script;
	head.appendChild(so);
};
