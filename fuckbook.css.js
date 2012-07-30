document.FUCKBOOK = {};
document.FUCKBOOK.css = [];
document.FUCKBOOK.html = [];
document.FUCKBOOK.png = [];


(function(){
var css = document.FUCKBOOK.css;
var html = document.FUCKBOOK.html;
var png = document.FUCKBOOK.png;

css[0] = "#facebox .b     { background:url(" + png.facebook_b + "); } " +
         "#facebox .tl    { background:url(" + png.facebook_tl + "); } " +
	 "#facebox .tr    { background:url(" + png.facebook_tr + "); } " +
	 "#facebox .bl    { background:url(" + png.facebook_bl + "); } " +
	 "#facebox .br    { background:url(" + png.facebook_br + "); } " +
	 "#facebox        { position: absolute; top: 0; left: 0; z-index: 100; text-align: left; } " +
	 "#facebox .popup { position: relative; } " +
	 "#facebox table  { border-collapse: collapse; } " +
	 "#facebox td     { border-bottom: 0; padding: 0; } " +
	 "#facebox .body     {  background: #fff;  width: 392px; } " +
 	 "#facebox .loading  {  text-align: center; } " + 
	 "#facebox .image    { text-align: center; } " + 
  	 "#facebox img       { border: 0; margin: 0; } " +
   	 "#facebox .footer   {  padding-top: 5px;  text-align: right; } " +
         "#facebox .tl, #facebox .tr, #facebox .bl, #facebox .br {  height: 10px;  width: 10px;  overflow: hidden;  padding: 0; } " +
	 "#facebox_overlay   {  position: fixed;  top: 0px;  left: 0px;  height:100%;  width:100%;} " +
	 ".facebox_hide      {  z-index:-100;}" +
	 ".facebox_overlayBG {  background-color: #000;  z-index: 99;}";

css[1] = "h2.dialog_title {  background:#6d84b4;  border:1px solid #3b5998;  border-bottom:none; } " +
	 "h2 span { display:block; padding:5px 10px; color:#fff; font-size:14px; font-weight:bold; } " +
 	 "div.footer { border:1px solid #000; border-top:none; }" +
	 "#fuckbook_options_container { border-left:1px solid #000; border-right:1px solid #000; border-bottom:1px solid #ccc; height:204px; width:446px; padding:10px; }" +
	 "#options_button { background:#3b5998 url(" + png.options_button + ") no-repeat;  background-position:3px -25px;  position:absolute;    left:111px;     top:10px;  width:24px;  height:31px; }" +
	 "a.jewelToggler {  height:31px !important;    position:relative !important;    top:-1px !important; } " +
	 "#options_button:hover, #options_button:active {  background-color:#4b67a1;  background-position:3px 7px; } " +
	 "#footer {  background-color:#f2f2f2;  padding-top:7px;  height:32px;  border-left:1px solid #000;  border-right:1px solid #000;  border-bottom:1px solid #000; } " +
	 "#footer input {  float:right;  font-size:14px !important;  padding:3px !important;  font-family:\"lucida grande\",tahoma,verdana,arial,sans-serif; } " +
	 "#footer #fuckbookCancel { margin-right:7px; margin-left:4px; }"
	 "#facebox input::-moz-focus-inner { border:0px; }";

css[2] = "#pageLogo a {
  background:#3b5998 url() no-repeat -21px 0 !important;
  display:block !important;
  height:31px !important;
  width:103px !important;  
}

#pageLogo a:hover, #pageLogo a:focus, #pageLogo a:active {
  outline:none !important;
  background-color:#4b67a1 !important;
  background-position:-21px -31px !important;
}

#pageLogo span {
  display:none !important;
}";
css[3] = "#pageLogo a {
  background:#3b5998 url() no-repeat -21px 0 !important;
  display:block !important;
  height:31px !important;
  width:103px !important;  
}

#pageLogo a:hover, #pageLogo a:focus, #pageLogo a:active {
  outline:none !important;
  background-color:#4b67a1 !important;
  background-position:-21px -31px !important;
}

#pageLogo span {
  display:none !important;
}";
css[4] = "#pageLogo a {
  background:#3b5998 url() no-repeat -21px 0 !important;
  display:block !important;
  height:31px !important;
  width:103px !important;  
}

#pageLogo a:hover, #pageLogo a:focus, #pageLogo a:active {
  outline:none !important;
  background-color:#4b67a1 !important;
  background-position:-21px -31px !important;
}

#pageLogo span {
  display:none !important;
}";
css[5] = "#pageLogo a {
  background:#3b5998 url() no-repeat -21px 0 !important;
  display:block !important;
  height:31px !important;
  width:103px !important;  
}

#pageLogo a:hover, #pageLogo a:focus, #pageLogo a:active {
  outline:none !important;
  background-color:#4b67a1 !important;
  background-position:-21px -31px !important;
}

#pageLogo span {
  display:none !important;
}";
css[6] = "#pageLogo a {
  background:#3b5998 url() no-repeat -21px 0 !important;
  display:block !important;
  height:31px !important;
  width:103px !important;  
}

#pageLogo a:hover, #pageLogo a:focus, #pageLogo a:active {
  outline:none !important;
  background-color:#4b67a1 !important;
  background-position:-21px -31px !important;
}

#pageLogo span {
  display:none !important;
}";
css[7] = "#home_sponsor_nile div, div.adcolumn_wrapper, .ego_spo, div.UIStandardFrame_SidebarAds, div.UIWashFrame_SidebarAds {
  display:none !important;
}";
css[8] = "#globalContainer {
  position:relative !important;
  margin:0 auto !important;
}

#blueBar {
  position:fixed !important;
    top:0px !important;
  margin:0 auto !important;
  z-index:13 !important;
}

#blueBar.loggedOut {
  position:absolute !important;    
}

#pageHead {
  position:relative !important;
    left:auto !important;
  width:980px !important;
  margin:0 auto 31px auto !important;
        z-index:13 !important;
}

#pageLogo, #jewelCase {
  position:fixed !important;
    top:10px !important;
}

#jewelCase {
  margin-left:97px !important;
  position:fixed !important;
    top:10px !important;
  height:40px !important;
}

#headNav {
  position:fixed !important;
    top:10px !important;
  width:799px !important;
}

div#options_button { position:absolute !important; left:-212px !important; top:-1px !important; }";
css[9] = ".fbDockWrapper { display:none !important; }";
html[0] = "<img class='fb_logo img' src='' alt='Facebook-logotyp' width='170' height='36' />";
html[2] = "<img class='fb_logo img' src='' alt='Facebook-logotyp' width='170' height='36' />";
html[3] = "<img class='fb_logo img' src='' alt='Facebook-logotyp' width='170' height='36' />";
html[4] = "<img class='fb_logo img' src='' alt='Facebook-logotyp' width='170' height='36' />";
html[5] = "<a href='#fuckbook_options_wrap' class='open_close_facebox' rel='facebox'><div id='options_button'></div></a>";
html[6] = "<div id='fuckbook_options_wrap' style='display:none;'></div>";
html[7] = "<h2 class='dialog_title'><span>Fuckbook Options</span></h2>";
html[8] = "<div id='fuckbook_options_container'></div>";
html[9] = "<div id='footer'></div>";
html[10] = "<input id='fuckbookCancel' type='button' value='Cancel' class='UIShareComposer_CancelButton uiButton uiButtonDefault uiButtonLarge'>" 
	+ "<input id='fuckbookSaveSettings' type='button' value='Save and Close' class='UIComposer_SubmitButton uiButton uiButtonConfirm uiButtonLarge'>";

html[11] = "<h3 title='Choose which Logotype to display'>Logotype:</h3>";
html[12] = "<input type='radio' id='logoFuckbook' name='logotype' checked='checked'>Fuckbook | ";
html[13] = "<input type='radio' id='logoFuckbook' name='logotype'>Fuckbook | ";
html[14] = "<input type='radio' id='logoFakebook' name='logotype' checked='checked'>Fakebook | ";
html[15] = "<input type='radio' id='logoFakebook' name='logotype'>Fakebook | ";
html[16] = "<input type='radio' id='logoFailbook' name='logotype' checked='checked'>Failbook | ";
html[17] = "<input type='radio' id='logoFailbook' name='logotype'>Failbook | ";
html[18] = "<input type='radio' id='logoF337book' name='logotype' checked='checked'>F337book | ";
html[19] = "<input type='radio' id='logoF337book' name='logotype'>F337book | ";
html[20] = "<input type='radio' id='logoFacebutt' name='logotype' checked='checked'>Facebutt | ";
html[21] = "<input type='radio' id='logoFacebutt' name='logotype'>Facebutt | ";
html[22] = "<input type='radio' id='logoFacebook' name='logotype' checked='checked'>Facebook<br><br><br>";
html[23] = "<input type='radio' id='logoFacebook' name='logotype'>Facebook<br><br><br>";
html[24] = "<h3 title='Choose which Title to display'>Page Title:</h3>";
html[25] = "<input type='radio' id='titleSameAsLogo' name='pagetitle' checked='checked'>Same as Logo | ";
html[26] = "<input type='radio' id='titleSameAsLogo' name='pagetitle'>Same as Logo | ";
html[27] = "<input type='radio' id='titleCustom' name='pagetitle' checked='checked'>Custom: ";
html[28] = "<input type='radio' id='titleCustom' name='pagetitle'>Custom: ";
html[29] = "<input type='text' id='titleCustomValue' disabled='true'><br><br><br>";
html[30] = "<h3 title='Choose which Extras you want to use'>Extras:</h3>";
html[31] = "<input type='checkbox' id='removeAds' checked='checked'>Remove Ads<br>";
html[32] = "<input type='checkbox' id='removeAds'>Remove Ads<br>";
html[33] = "<input type='checkbox' id='fixedHeader' checked='checked'>Facebook navigation menu 'Always on Top'<br>";
html[34] = "<input type='checkbox' id='fixedHeader'>Facebook navigation menu 'Always on Top'<br>";
html[35] = "<input type='checkbox' id='hideChatBar' checked='checked'>Hide Chat Bar";
html[36] = "<input type='checkbox' id='hideChatBar'>Hide Chat Bar";

