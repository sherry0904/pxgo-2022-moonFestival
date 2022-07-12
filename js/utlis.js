/* utlis */

// if (typeof console == "undefined") {
//     window.console = {
//         log: function () {}
//     };
// }

 // window.console = {
 //        log: function () {}
 // };

function gtag_pageView(_key) {
  //ga('send', 'pageview', key);
  gtag('config', GTAG_TRACKING_ID, {
    'page_title' : _key,
    'page_path': '/' + _key
  });

  console.log("gtag_pageView: " + _key);
}

function gtag_ButtonClick(_key) {
  //ga('send', 'event', 'Button', 'Click', key);
  gtag('event', 'Click',{'event_category':'Button','event_label':_key});

  console.log("gtag_ButtonClick: " + _key);
}

function setDefault(_textbox, _value) { // depend on jQuery
  $(_textbox).val(_value).css({opacity:.4});
  $(_textbox).focus(
    function() {
      if ($(this).val() == _value) {
        $(this).val('').css({opacity:1});
      }
    })
    .blur(function() {
      if ($(this).val() == '') {
        $(this).val(_value).css({opacity:.4});
      }
    });
}

function setParameterByName(name, value, url) {
  if (!url) url = window.location.href;
  var re = new RegExp("([?|&])" + name + "=.*?(&|$)", "i");
  separator = url.indexOf('?') !== -1 ? "&" : "?";
  if (url.match(re)) {
    return url.replace(re, '$1' + name + "=" + value + '$2');
  }
  else {
    return url + separator + name + "=" + value;
  }
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


var isMobile = false;
var isIE = false;

utlis = function (){

	//private menbers


	//private methods
	function init () {
		console.log('all is loaded.');
	}

	//constructor

	{
    if ($('html').is('.ie6, .ie7, .ie8')) {
      isIE = true;
      // alert('.ie6, .ie7, .ie8');
    }

		$(document).ready(function() {

		  if($('body').width() <= 768){
		      isMobile = true;
		  }else{
		    	isMobile = false;
		  }

			init();
		});
	}

	//public

	return {

	}
}

utlis = new utlis();