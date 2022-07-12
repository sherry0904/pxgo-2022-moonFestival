index = function () {
	//private menbers
	var width = $(".indexWrapper").width()
	var height = $(".indexWrapper").height()

	//private methods
	function init() {
		console.log('index is loaded.');	
		
		// GA-首頁PV
		setGA.pageView("PG_home");

		gsap.set(".svgbox",{opacity:0});

		// 首頁互動事件
		coverEvent();

		// kv進場
		setTimeout(function(){
			gsap.set(".svg",{scale:1.5});
			gsap.to(".loader",{duration: 0.3,autoAlpha: 0})
			introInto();
		},2000)


		$("g").hover(function () {
			if ($(this).data("name") != "" && $(this).data("name") != undefined) {
				$(this).css("opacity", "0.3")
			}
		}, function () {
			if ($(this).data("name") != "" && $(this).data("name") != undefined) {
				$(this).css("opacity", "1")
			}
		})
		
		// 點擊首頁食材
		$("g").click(function (e) {
			var foodIdx = $(this).data("name")
			if (foodIdx != "" && foodIdx != undefined) {
				vm.showdetail(e,foodIdx-1,foodIdx);
			}
		})

		// 關閉介紹popup
		$(".intro__btn").click(function(){
			$("body,html").css("height","auto");
			$("body,html").css("overflow-y","auto");
			$("body,html").css("overflow-x","hidden");
			var t1 = gsap.timeline();
			t1.to(".intro",{duration: 1,backgroundColor: "rbga(0,0,0,0)",ease: "power4.out"})
				.to(".intro__box",{duration: 0.5,scale: 0.3,opacity: 0,ease: "power4.out"},"0.2")
				.to(".intro",{duration: 0.3,autoAlpha: 0,ease: "power4.out"})
				.to(".svg",{duration: 2,scale:1,ease: "power4.out"},"0.3");
		});
		

	}

	function introInto(){
		$("body,html").css("height","100vh");
		$("body,html").css("overflow","hidden");
		gsap.set(".hamburger,.challenge",{opacity:0});
		gsap.to(".svgbox",{duration:0.7,opacity: 1})
		gsap.set(".intro__title",{z:10000,rotate: "30deg",blur:"100px",opacity: 0})
		gsap.set(".intro__hightlight",{y:"30px",opacity: 0})
		var introInto = gsap.timeline();
		introInto.to(".intro__box",{duration:1.5,opacity: 1})
				.to(".intro__title",{duration:1.3,z:0,rotate: 0,opacity: 1,ease: "elastic.inOut(1, 0.7)"},"0.3")
				.to(".intro__hightlight",{duration:0.4,y:"0",opacity: 1},"1")
				.to(".hamburger,.challenge",{duration:0.5,opacity: 1})		
	}

	function coverEvent(){

		const svg = d3.select(".svg")
			.attr("width",width)
			.attr("height",height)
			.attr("viewBox", [0, 0, width, height])


		const g = svg.select("#bg")
			.attr("cursor", "grab");
			

		const zoom = d3.zoom()
		// .extent([[0, 0], [width, height]])

		// ***縮放範圍設置為指定數組 [k0, k1]
		// k0 縮放最小因子，k1 縮放最大縮放因子
		.scaleExtent([0.5, 7])

		// ***平移區間設定為指定數組:[[x0, y0], [x1, y1]], 
		// [x0, y0] 為世界的左上角而 [x1, y1] 為世界的右下角
		.translateExtent([[0,0],[3840,2160]])

		.on("zoom", zoomed)

		function zoomed({
			transform
		}) {
			g.transition()
			.duration(50)
			.attr("transform", transform)
			

		}

		svg.call(zoom);

		// 在當前縮放基礎上疊加縮放
		if($(window).width()>768) {	
			zoom.scaleBy(svg, 0.7)
		}else {
			zoom.scaleBy(svg, 0.7)
		}
		
		// 相對於當前位置移動
		zoom.translateBy(svg, -1568+(width/2), -636+(height/2)); 

		
	}


	{
		$(document).ready(function () {
			init();
		});

		// $(window).load(function () {
		// 	window.addEventListener("touchmove", function (event) {
		// 		// 判斷默認行為是否可以被禁用
		// 		if (event.cancelable) {
		// 			// 判斷默認行為是否已經被禁用
		// 			if (!event.defaultPrevented) {
		// 				event.preventDefault();
		// 			}
		// 		}
		// 	}, {
		// 		passive: false
		// 	});
		// })
	}

	//public
	return {

	};
};

var index = new index();