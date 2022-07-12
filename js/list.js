list = function () {
	//private menbers
	var filterActiveMb = false;

	//private methods
	function init() {
		console.log('list is loaded.');

		// GA-列表頁PV
		setGA.pageView("PG_index");

		listInto();

		// GA-篩選器點擊事件
		$(".filter__option").click(function(){
			if($(this).text() == "總覽") {
				setGA.ButtonClick("btn_overview")
			}
			if($(this).text() == "圓形") {
				setGA.ButtonClick("btn_circle")
			}
			if($(this).text() == "方形") {
				setGA.ButtonClick("btn_square")
			}
			if($(this).text() == "長條") {
				setGA.ButtonClick("btn_longstrip")
			}
			if($(this).text() == "魚類") {
				setGA.ButtonClick("btn_fish")
			}
			if($(this).text() == "奇形") {
				setGA.ButtonClick("btn_odd")
			}
			if($(this).text() == "烤焦時間短>長") {
				setGA.ButtonClick("btn_timeperiod01")
			}
			if($(this).text() == "烤焦時間長>短") {
				setGA.ButtonClick("btn_timeperiod02")
			}
		});
		// 點擊篩選器-PC
		$(".filter__option").click(function () {
			if ($(window).width() > 768) {
				if (!$(this).hasClass("active")) {
					$(".filter__option").removeClass("active")
					$(this).addClass("active")
					$(".filter__title").text($(this).text())
				}
			}
		});
		// 點擊篩選器-MB
		$(".filter__current").click(function () {
			if($(window).width()<768){
				if (!filterActiveMb) {
					$("body,html").css("height","100vh");
					$("body,html").css("overflow","hidden");
					$(".filter__current span").css("transform","rotate(180deg)")
					$(".divider").addClass("active");
					gsap.to(".filter__nav", {
						duration: 0.3,
						height: "auto"
					})
					filterActiveMb = true;
					// 點擊其他區域則關閉
					$(document).click(function (e) {
						var container = $(".filter__current");
						if(filterActiveMb) {
							if (!container.is(e.target) && container.has(e.target).length === 0) {
								$("body,html").css("height","auto");
								$("body,html").css("overflow-y","auto");
								$("body,html").css("overflow-x","hidden");
								$(".filter__current span").css("transform","rotate(0)")
								$(".divider").removeClass("active");
								gsap.to(".filter__nav", {
									duration: 0.3,
									height: "0"
								})
								filterActiveMb = false;
								console.log("click body")
							}
						}
						
					});
				} else {
					$("body,html").css("height","auto");
					$("body,html").css("overflow-y","auto");
					$("body,html").css("overflow-x","hidden");
					$(".filter__current span").css("transform","rotate(0)");
					$(".divider").removeClass("active");
					gsap.to(".filter__nav", {
						duration: 0.3,
						height: "0"
					})
					filterActiveMb = false;
				}
			}
		});
		$(".filter__option").click(function () {
			if ($(window).width() < 768) {
				var nowFilter = $(this).text();
				$(".filter__current").html(nowFilter + "<span>▼</span>")
				gsap.to(".filter__nav", {
					duration: 0.3,
					height: "0"
				})
				$(".filter__title").text(nowFilter)
				$("body,html").css("height","auto");
				$("body,html").css("overflow-y","auto");
				$("body,html").css("overflow-x","hidden");
				$(".divider").removeClass("active");
				filterActiveMb = false;
			}
		});		
	}
	

	function listInto(){
		setTimeout(function(){
			gsap.set(".filter__item",{autoAlpha:0,scale: 0.8});
			gsap.to(".filter__item",{duration: 0.5,stagger: 0.2,autoAlpha:1,scale: 1})
		},300)		
		// console.log("listInto")
	}

	{
		$(document).ready(function () {
			init();
		});
	}

	//public
	return {

	};
};

var list = new list();