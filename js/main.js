// swiper的Idx
var nowIdx = 1;
// 食材的Idx
var foodnum = 1;
var foodname = "";

main = function () {
	//private menbers
	var scrollTop;

	//private methods
	function init() {
		console.log('main is loaded.');

		// 彈跳視窗關閉
		$(".popup-food .popup__close").click(function(){
			popupLeavePage();
		});

		$(".popup-magnify .popup__close").click(function(){
			magnifyLeavePage();
		});

		// popupIntoPage();

	}   
	

	function popupIntoPage(){
		TweenMax.set(".popup-food", { autoAlpha: 0, display: "none" });
		TweenMax.to(".popup-food", 0, {
			display: "flex",
			onComplete: function () {
			$(".popup-food").addClass("active");
			TweenMax.to(".popup-food", 0.5, { autoAlpha: 1 ,
				onComplete:function(){
					$("body,html").css("height","100%");
					$("body,html").css("overflow","hidden");
				}});
				
			}
		});
		console.log("popupIntoPage")
	}

	function popupLeavePage(){
		TweenMax.to(".popup-food", 0.5, { autoAlpha: 0, 
			onComplete: function () {
				$(".popup-food").removeClass("active");
				TweenMax.to(".popup-food", 0, {display: "none"});	
				$("body,html").css("height","auto");
				$("body,html").css("overflow-y","auto");
				$("body,html").css("overflow-x","hidden");
				$("html,body").scrollTop(scrollTop)
			}
		});
		console.log("popupLeavePage")
	}

	function magnifyIntoPage(){
		$(".magnify__g").html('<image xlink:href="images/game/'+foodnum+'.svg" src="images/game/'+foodnum+'.svg" width="100%" height="100%"/>')
		console.log(foodnum)
		TweenMax.to(".popup-food", 1, { autoAlpha: 0});
		TweenMax.set(".popup-magnify", { autoAlpha: 0, display: "none" });
		TweenMax.to(".popup-magnify", 0, {
			display: "flex",
			onComplete: function () {
				$(".popup-magnify").addClass("active");
				setTimeout(function(){
					foodMagnify();
				},300)
				TweenMax.to(".popup-magnify", 0.5, { autoAlpha: 1,delay:0.3 });				
			}
		});
		$("body").css("background","url(./images/bg.jpg) repeat center bottom")
		TweenMax.to(".popup__bg", 0, { autoAlpha: 1});
		console.log("magnifyIntoPage")
	}

	function magnifyLeavePage(){
		$("body").css("background","none")
		TweenMax.to(".popup-food", 0.5, { autoAlpha: 1, 
		});
		TweenMax.to(".popup-magnify", 0.5, { autoAlpha: 0, 
			onComplete: function () {
				$(".popup-magnify").removeClass("active");
				TweenMax.to(".popup-magnify", 0, {display: "none"});	
			}
		});
		TweenMax.to(".popup__bg", 0, { autoAlpha: 0});
		console.log("magnifyLeavePage")
	}

	function setScrollTop(){
		scrollTop = $(window).scrollTop();
		// console.log(scrollTop)
	}

	function foodMagnify(){
		if($(window).width()>768) {
			var width = $(".popup-food .popup__box").width()
			var height = $(window).height()*0.87
		}else {
			var width = $(window).width()
			var height = $(window).height()
		}
		
			
	
			const svg = d3.select(".magnify__svg")
				.attr("width",width)
				.attr("height",height)
				.attr("viewBox", [0, 0, width, height])			
	
				const g = svg.select(".magnify__g")
				.attr("cursor", "grab");
	
				const zoom = d3.zoom()
				// .extent([[0, 0], [width, height]])
		
				// ***縮放範圍設置為指定數組 [k0, k1]
				// k0 縮放最小因子，k1 縮放最大縮放因子
				.scaleExtent([0.3, 10])
		
				// ***平移區間設定為指定數組:[[x0, y0], [x1, y1]], 
				// [x0, y0] 為世界的左上角而 [x1, y1] 為世界的右下角
				.translateExtent([[0,0],[width,height]])
		
				.on("zoom", zoomed)
		
				function zoomed({
					transform
				}) {
					g.attr("transform", transform);
				}
		
				svg.call(zoom);
		
				// 在當前縮放基礎上疊加縮放
				zoom.scaleBy(svg, 0.3)
				// 相對於當前位置移動
				// zoom.translateBy(svg, -500+(width/2), -500+(height/2)); 		
	}

	function shareFood(){
		var dd= new Date();
		var ALL_LINK = "https://eventpxmart.com.tw/";
        var SHAREURL = "https://eventpxmart.com.tw/app/Share.php";

        window.location.href = 'https://www.facebook.com/dialog/share?app_id=917155502026405&href=' + encodeURIComponent(SHAREURL + "?id=" + foodnum) + "&redirect_uri=" + ALL_LINK + "&t=" + dd.getTime();
	}

	{
		$(document).ready(function () {
			init();
		});
	}

	//public
	return {
		popupIntoPage: function (){
			popupIntoPage();
		},
		setScrollTop: function(){
			setScrollTop();
		},
		magnifyIntoPage: function(){
			magnifyIntoPage();
		},
		shareFood: function(){
			shareFood();
		}
	};
};

var main = new main();
var vm = new Vue({
	el:"#app",
	data: {
		foods: [],
		type: "all"
	},
	mounted(){
		fetch('./json/data1.json?v=930')
		.then(res=>res.json())
		.then(foods=>this.foods = foods)
		setTimeout(() => {
			popupSwiper.update();
		}, 500);
		
	},
	computed:{
		filterfoods: function(){
			this.foods.sort(function (a,b) {
				return a.id - b.id
			});
			if (this.type == "all") {
				return this.foods
			}
			else if(this.type == "cirlcle"){
				this.foods = this.foods.sort(function (a,b) {
					return a.id - b.id
				});
				return this.foods.filter(function (item) {
					return item.category == "圓形類"
				});
			}
			else if(this.type == "square"){
				return this.foods.filter(function (item) {
					return item.category == "方形類"
				});
			}
			else if(this.type == "rect"){
				return this.foods.filter(function (item) {
					return item.category == "長條類"
				});
			}
			else if(this.type == "fish"){
				return this.foods.filter(function (item) {
					return item.category == "魚類"
				});
			}
			else if(this.type == "compre"){
				return this.foods.filter(function (item) {
					return item.category == "奇形類"
				});
			}
			else if(this.type == "burntshort"){
				return this.foods.sort(function (a,b) {
					return a.burnt - b.burnt
				});
			}
			else if(this.type == "burntlong"){
				return this.foods.sort(function (a,b) {
					return b.burnt - a.burnt
				});
			}
		},
		filteramount: function(){
			return this.foods.filter(function (item) {
				
				return 75 < item.id && item.id < 101
			});
		}
	},methods: {
		settype: function(e,type){
			gsap.set(".filter__item",{autoAlpha:0,scale: 0.8});
			this.type = type;
			setTimeout(function(){
				gsap.to(".filter__item",{duration: 0.5,stagger: 0.2,autoAlpha:1,scale: 1})
			},200)
			// console.log(this.type)
		},
		showdetail: function(e,num,foodidx){
			main.setScrollTop()
			main.popupIntoPage();		
			popupSwiper.update();
			popupSwiper.slideTo(num, 0);
			$(window).scrollTop(0);
			foodnum = foodidx;
			foodname = this.foods[num].cnname
			// console.log("foodnum: "+foodnum)
			// console.log("foodname: "+foodname)
			popupSwiper.on('slideChangeTransitionEnd', ()=>{
				nowIdx = $(".swiper-slide-active").data("foodidx");
				foodnum = nowIdx;
				// console.log("foodnum: "+foodnum)
				// console.log(this.foods)
				// console.log(foodname)
			})
			popupSwiper.on('slideNextTransitionEnd', ()=>{
				num++
				if(this.type == "burntshort" || this.type == "burntlong") {
					foodname = this.foods[num].cnname
				}else {
					foodname = this.foods[foodnum-1].cnname
				}
				// console.log("foodnum: "+foodnum)
				// console.log(foodname)
			})
			popupSwiper.on('slidePrevTransitionEnd', ()=>{
				num--
				if(this.type == "burntshort" || this.type == "burntlong") {
					foodname = this.foods[num].cnname
				}else {
					foodname = this.foods[foodnum-1].cnname
				}
				// console.log("foodnum: "+foodnum)
				// console.log(foodname)
			})
		},
		sharefood: function(e){
			main.shareFood();
		},
	}
});

var popupSwiper = new Swiper('.food-container', {
	allowTouchMove: true,
	lazy: {
		loadPrevNext: true,
	},
	// 如果需要分页器
	pagination: {
		el: '.swiper-pagination',
	},
	// 如果需要前进后退按钮
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	// on: {
	// 	slideChangeTransitionEnd: function(){
	// 		nowIdx = $(".swiper-slide-active").data("foodidx");
	// 		foodnum = nowIdx;
	// 		// console.log("nowIdx: "+nowIdx);
	// 	},
	// }
}) 
