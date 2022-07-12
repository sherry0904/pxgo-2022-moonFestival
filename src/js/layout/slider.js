var swiper = new Swiper('.swiper-container', {
  slidesPerView: 'auto',
  spaceBetween: 30,
  // freeMode: true,
  pagination: {
    el: '.swiper-pagination',
  },
  breakpoints: {
    992: {
      slidesPerView: 2,
      centeredSlides: true,
      spaceBetween: 0,
    },
  }
});

function isMobile() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}

function resizeWdth() {
  if (($(window).width() / $(window).height()) >= 1.4) {
    swiper.slideTo(1, 0);
    $(".swiper-pagination").addClass("swiper-hidden");
  } else {
    swiper.slideTo(0, 0);
    $(".swiper-pagination").removeClass("swiper-hidden");
  }
  swiper.update()
}

resizeWdth()

$(window).resize(function () {
  resizeWdth()
});

function animate0() {
  TweenMax.fromTo(".animate__0 .cut1", 0.4, {
    opacity: 1
  }, {
    opacity: 0,
    onComplete: function () {
      TweenMax.fromTo(".animate__0 .cut2", 0.4, {
        opacity: 1
      }, {
        opacity: 0,
        onComplete: function () {
          TweenMax.fromTo(".animate__0 .cut3", 0.4, {
            opacity: 1
          }, {
            opacity: 0,
            onComplete: function () {
              TweenMax.fromTo(".animate__0 .cut4", 0.4, {
                opacity: 1
              }, {
                opacity: 0,
                onComplete: function () {
                  TweenMax.fromTo(".animate__0 .cut5", 0.4, {
                    opacity: 1
                  }, {
                    opacity: 0,
                    onComplete: function () {
                      TweenMax.fromTo(".animate__0 .cut6", 0.4, {
                        opacity: 1
                      }, {
                        opacity: 0,
                        onComplete: function () {
                          $(".animate__0 .cut7").addClass("cut7--active")
                          setTimeout(function () {
                            TweenMax.set(".animate__0 .cut1", {
                              opacity: 1
                            });
                            TweenMax.set(".animate__0 .cut2", {
                              opacity: 1
                            });
                            TweenMax.set(".animate__0 .cut3", {
                              opacity: 1
                            });
                            TweenMax.set(".animate__0 .cut4", {
                              opacity: 1
                            });
                            TweenMax.set(".animate__0 .cut5", {
                              opacity: 1
                            });
                            TweenMax.set(".animate__0 .cut6", {
                              opacity: 1
                            });
                            $(".animate__0 .cut7").removeClass("cut7--active")
                          }, 3000)
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  });
}

function animate1() {
  TweenMax.set(".animate__1 .cut1", {
    scale: 2,
    opacity: 0
  });
  TweenMax.set(".animate__1 .cut2", {
    scale: 2,
    opacity: 0
  });
  TweenMax.set(".animate__1 .cut3", {
    scale: 2,
    opacity: 0
  });
  TweenMax.fromTo(".animate__1 .cut1", 0.3, {
    scale: 2,
    opacity: 0
  }, {
    scale: 1,
    opacity: 1,
    onComplete: function () {
      TweenMax.fromTo(".animate__1 .cut2", 0.3, {
        scale: 2,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        onComplete: function () {
          TweenMax.fromTo(".animate__1 .cut3", 0.3, {
            scale: 2,
            opacity: 0
          }, {
            scale: 1,
            opacity: 1,
            onComplete: function() {
              animate2();
            }
          },)
        }
      })
    }
  });
}

function animate2() {
  // TweenMax.fromTo(".animate__2 .cut3", 0.6, {scale: 2, opacity: 0}, {scale: 1, opacity: 1})
  TweenMax.set(".animate__2 .cut1", {
    scale: 2,
    opacity: 0
  });
  TweenMax.set(".animate__2 .cut2", {
    scale: 2,
    opacity: 0
  });
  TweenMax.set(".animate__2 .cut3", {
    scale: 2,
    opacity: 0
  });
  TweenMax.set(".animate__2 .cut4", {
    scale: 2,
    opacity: 0
  });
  TweenMax.set(".animate__2 .cut5", {
    scale: 2,
    opacity: 0
  });
  TweenMax.set(".animate__2 .cut6", {
    scale: 2,
    opacity: 0
  });
  TweenMax.set(".animate__2 .cut7", {
    scale: 2,
    opacity: 0
  });
  TweenMax.fromTo(".animate__2 .cut2", 0.3, {
    scale: 2,
    opacity: 1
  }, {
    scale: 1,
    opacity: 1,
    onComplete: function () {
      TweenMax.fromTo(".animate__2 .cut3", 0.3, {
        scale: 2,
        opacity: 1
      }, {
        scale: 1,
        opacity: 1,
        onComplete: function () {
          TweenMax.fromTo(".animate__2 .cut4", 0.3, {
            scale: 2,
            opacity: 1
          }, {
            scale: 1,
            opacity: 1,
            onComplete: function () {
              TweenMax.fromTo(".animate__2 .cut5", 0.3, {
                scale: 2,
                opacity: 1
              }, {
                scale: 1,
                opacity: 1,
                onComplete: function () {
                  TweenMax.fromTo(".animate__2 .cut1", 0.3, {
                    scale: 2,
                    opacity: 1
                  }, {
                    scale: 1,
                    opacity: 1,
                    onComplete: function() {
                      TweenMax.fromTo(".animate__2 .cut6", 0.3, {
                        scale: 2,
                        opacity: 1
                      }, {
                        scale: 1,
                        opacity: 1,
                        onComplete: function() {
                          TweenMax.fromTo(".animate__2 .cut7", 0.3, {
                            scale: 2,
                            opacity: 1
                          }, {
                            scale: 1,
                            opacity: 1
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  });
}

function startAnim() {
  // setTimeout(function () {
  //   animate0();
  // }, 600)
  animate1();
}

$(function () {
  setInterval(function() {
    startAnim()
  }, 5200)
})

function muteStart() {
  muteAnim()
  mute = setInterval(function() {
    muteAnim()
  }, 200)
}

function muteAnim() {
  TweenMax.to(".header__mute .cut1", 0.2, {
    height: getRandomInt(4, 30), ease: Power0.easeNone,
  }, 0.4);
  TweenMax.to(".header__mute .cut2", 0.2, {
    height: getRandomInt(4, 30), ease: Power0.easeNone,
  }, 0.4);
  TweenMax.to(".header__mute .cut3", 0.2, {
    height: getRandomInt(4, 30), ease: Power0.easeNone,
  }, 0.4);
  TweenMax.to(".header__mute .cut4", 0.2, {
    height: getRandomInt(4, 30), ease: Power0.easeNone,
  }, 0.4);
  TweenMax.to(".header__mute .cut5", 0.2, {
    height: getRandomInt(4, 30), ease: Power0.easeNone,
  }, 0.4);
  TweenMax.to(".header__mute .cut6", 0.2, {
    height: getRandomInt(4, 30), ease: Power0.easeNone,
  }, 0.4);
  TweenMax.to(".header__mute .cut7", 0.2, {
    height: getRandomInt(4, 30), ease: Power0.easeNone,
  }, 0.4);
  TweenMax.to(".header__mute .cut8", 0.2, {
    height: getRandomInt(4, 30), ease: Power0.easeNone,
  }, 0.4);
  TweenMax.to(".header__mute .cut9", 0.2, {
    height: getRandomInt(4, 30), ease: Power0.easeNone,
  }, 0.4);
  TweenMax.to(".header__mute .cut10", 0.2, {
    height: getRandomInt(4, 30), ease: Power0.easeNone,
  }, 0.4);
}

// var ua = window.navigator.userAgent;

// function getPhone() {
// 	var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
// 	var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

// 	if (isAndroid) {
// 		return 0; // Android
// 	} else if (isiOS) {
// 		return 1; // iOS
// 	} else {
// 		return 3;
// 	}
// }

// function getBrowser() {
// 	var ua = window.navigator.userAgent;
// 	// var isChrome = ua.indexOf("Chrome") && window.chrome;
//   // var isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1;
//   var isChrome = ua.indexOf("Chrome");
// 	var isSafari = ua.indexOf("Safari");

// 	if (isChrome != -1) {
// 		return 0; // Chrome
// 	} else if (isSafari != -1) {
// 		return 1; // Safari
// 	} else {
// 		return 2; // Line or FB
// 	}
// }

// console.log(navigator.userAgent)
// alert("手機系統：" + getPhone() + " _ " + "瀏覽器：" + getBrowser());
// indexOf(this.main)
// if(isMobile() && getBrowser() == 2) {
//   if(getPhone() == 1) {
//     window.location.href = "googlechrome://eventpxmart.com.tw/game.html"
//   } else {
//     window.location.href = "googlechrome://navigate?url=eventpxmart.com.tw/game.html"
//   }
// }