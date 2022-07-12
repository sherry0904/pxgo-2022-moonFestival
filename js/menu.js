
menu = function () {

	//private methods
	function init() {
		console.log('menu is loaded.');
		
		menuLeavePage();

		$(".hamburger").click(function(){
			// GA-menuPV
			setGA.pageView("PG_menubar");

			menuIntoPage();
		});

		// menu返回
		$(".menu__back").click(function(){
			menuLeavePage();
		});

		// 點擊全站分享
		$(".menu-share").click(function(){
			shareAll();
		});

		// GA-menu點擊事件
		$(".menu__item ").click(function(){
			if($(this).hasClass("menu-explore")) {
				setGA.ButtonClick("btn_explore")
			}
			if($(this).hasClass("menu-index")) {
				setGA.ButtonClick("btn_index")
			}
			if($(this).hasClass("menu-challenge")) {
				setGA.ButtonClick("btn_bbqmtc")
			}
			if($(this).hasClass("menu-regulation")) {
				setGA.ButtonClick("btn_regulation")
			}
			if($(this).hasClass("menu-share")) {
				setGA.ButtonClick("btn_share")
			}
		});

	}   
	

	function menuLeavePage(){
		var t1 = gsap.timeline();
			t1.to(".menu__item",{duration:0.3,x: "-200%",stagger: 0.1},)
			.to(".menu__list",{x: "-200%"},"0.2")
			.to(".menu",{autoAlpha: 0})
			.to(".hamburger",{duration:0.1,autoAlpha: 1})
	}

	function menuIntoPage(){
		gsap.to(".hamburger",{duration:0.1,autoAlpha: 0})
		var t1 = gsap.timeline();
		t1.to(".menu",{duration:0.3,autoAlpha: 1})
		.to(".menu__list",{duration:0.3,x: "0"},"0.4")
		.to(".menu__item",{duration:0.5,x: "0",stagger: 0.1},"0.2")
	}

	function shareAll(){
		var dd= new Date();
		var ALL_LINK = "https://eventpxmart.com.tw/";
        var SHAREURL = "https://eventpxmart.com.tw/app/Share.php";

        window.location.href = 'https://www.facebook.com/dialog/share?app_id=917155502026405&href=' + encodeURIComponent(ALL_LINK) + "&redirect_uri=" + ALL_LINK + "&t=" + dd.getTime();
	}


	{
		$(document).ready(function () {
			init();
		});
	}

	//public
	return {
		shareFood: function(){
			shareFood();
		}
		,shareAll: function(){
			shareAll();
		}
	};
};

var menu = new menu();
