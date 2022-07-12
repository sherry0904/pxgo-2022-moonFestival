function pageEnter(_index) {
    $(".step" + _index).css({
        "visibility": "visible"
    }).animate({
        opacity: 1,
        top: 80
    }, 300, () => {
        if (_index === 2) {
            gameDate.start = true;
        }
    });
}

function pageLeave(_index, _target) {
    $(".step" + _index).animate({
        opacity: 0,
        top: 90
    }, 300, () => {
        $(".step" + _index).css({
            "visibility": "hidden"
        });
        pageEnter(_target);
    });
}

function getMousePos(event) {
    var e = event || window.event;
    // return {'x':e.clientX,'y':e.clientY}
    $(".plus").css({
        "top": e.clientY + "px",
        "left": e.clientX + "px"
    });
    TweenMax.fromTo($(".plus"), 1.5, {
        y: 0,
        opacity: 1
    }, {
        y: -10,
        opacity: 0
    })
}

function scoreRange(_score) {
    switch (true) {
        case (_score < 3):
            return 0;
            break;
        case (_score < 6):
            return 1;
            break;
        case (_score < 8):
            return 2;
            break;
        case (_score < 11):
            return 3;
            break;
        case (_score < 13):
            return 4;
            break;
        case (_score < 16):
            return 5;
            break;
        case (_score < 18):
            return 6;
            break;
        default:
            return 7;
            break;
    }
}

var dd = new Date();
var re = /^[0]{1}[9]{1}[0-9]{8}$/;
var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
var shareTxt = [
    ["失意烤者（等級0）", "或許你沒有天份，但後天的努力可以改變命運。請去重讀烤焦圖鑑。"],
    ["菜鳥烤者（等級1）", "分數如果低到讓你產生恐懼，那就將恐懼化作動力。請去重讀烤焦圖鑑。"],
    ["普級烤者（等級2）", "「烤得很普通」那種可有可無的感覺，對烤者更是沈重打擊。對於細節的掌握，是你現階段的功課。"],
    ["中級烤者（等級3）", "你已是一名成熟的烤者，別安於現狀，企圖心是你邁向更高級烤者的鑰匙。"],
    ["高級烤者（等級4）", "紙上談兵，已容納不下你的好奇心。能掌握60%食材知識得你來說，實際去烤，回到初心，就是你的原動力。"],
    ["達人級烤者（等級5）", "高於一般人類的烤技，一回頭，發現大家都在你後面。你能輕易地在中秋大會烤上，鶴立雞群，令人驚艷。"],
    ["神級烤者（等級666）", "您用烤物，讓人好吃到升天。鷹眼、神之手、火的掌控者、奇異博士，這些都只是您海量的稱號之一。"],
    ["傳說級烤者（等級GOD）", "除了仰望，無話可說。"],
];
var mute;

$(function () {
    $(".step1__btn").click(function () {
        pageLeave(1, 2)
        document.getElementById('video').play();
        setGA.ButtonClick("btn_start")
        $(".header__mute").addClass("soundTrigger--on")
        $(".header__mute").removeClass("soundTrigger--off")
        muteStart()
        // $(".header__mute img").attr("src", "images/1/soundOn@1,5x.png");
        document.getElementById('audio').play();
    });
    $(".popup").hide().css({
        "visibility": "visible"
    });
    $("#ToForm, .popup__close").click(function () {
        $(".popup").fadeToggle();
        setGA.ButtonClick("btn_luckydraw")
    });
    // $(document).on("click", ".step2__main .column", function(event) {
    //     console.log(getMousePos(event));
    // })
    // $(".topic__text, .ready").click(function () {
    //     pageLeave(2, 3)
    // });
    $(".btn__again a").click(function () {
        pageLeave(3, 2)
        setGA.ButtonClick("btn_playagain")
        gameDate.quizNum = getRandomArray(0, 24, 25);

        document.getElementById('video').play();
        $(".header__mute").addClass("soundTrigger--on")
        $(".header__mute").removeClass("soundTrigger--off")
        muteStart()
        // $(".header__mute img").attr("src", "images/1/soundOn@1,5x.png");
        document.getElementById('audio').play();
    });
    $("#ToSend").click(function () {
        var ALL_LINK = encodeURIComponent("http://www.our-work.com.tw/demosite/2020/2020-pxmart/game.html?score=" + gameDate.score);
        var SHAREURL = "http://www.our-work.com.tw/demosite/2020/2020-pxmart/app/ShareGame.php";
        window.location.href = 'https://www.facebook.com/dialog/share?app_id=917155502026405&href=' + encodeURIComponent(SHAREURL + "?pic=" + scoreRange(gameDate.score)) + "&redirect_uri=" + ALL_LINK + "&t=" + dd.getTime();
        setGA.ButtonClick("btn_result")
    })
    $(document).on("click", ".soundTrigger--on, step1__btn", function () {
        $(".header__mute").removeClass("soundTrigger--on")
        $(".header__mute").addClass("soundTrigger--off")
        clearInterval(mute);
        TweenMax.to(".header__mute span", 0.4, {
            height: 4, ease: Power0.easeNone,
          }, 0.4);
        // $(".header__mute img").attr("src", "images/1/soundOff@1,5x.png");
        document.getElementById('audio').pause();
        document.getElementById('audio').currentTime = 0;
    });
    $(document).on("click", ".soundTrigger--off", function () {
        $(".header__mute").addClass("soundTrigger--on")
        $(".header__mute").removeClass("soundTrigger--off")
        muteStart()
        // $(".header__mute img").attr("src", "images/1/soundOn@1,5x.png");
        document.getElementById('audio').play();
    })
})

///////////////////////////
var foodData;

function getData() {
    $.ajax({
        url: "json/data.json",
        type: "GET",
        // beforeSend: function () {
        // },
        success: function (result) {
            // console.log(result);
            gameDate.food = result;
        },
        // complete: function () {
        // },
        // error: function () {
        // }
    });
}
getData()

/////////////////////////////////

// 指定題目

var gameDate = {
    start: false,
    gameStart: false,
    timeCount: '',
    score: 0,
    progress: 30,
    main: '',
    array: '',
    target: '',
    status: [false, false, false, false, false, false, false, false, false],
    quizIdx: 0,
    quizNum: getRandomArray(0, 24, 25),
    quizArray: [6, 95, 81, 11, 30, 59, 72, 31, 24, 51, 53, 78, 93, 89, 39, 9, 14, 75, 60, 84, 35, 66, 74, 68, 5],
    genders: [
        ["先生", "Male"],
        ["小姐", "Female"],
    ],
    signs: [
        ["水瓶座", "Aquarius"],
        ["雙魚座", "Pisces"],
        ["牡羊座", "Aries"],
        ["金牛座", "Taurus"],
        ["雙子座", "Gemini"],
        ["巨蟹座", "Cancer"],
        ["獅子座", "Leo"],
        ["處女座", "Virgo"],
        ["天秤座", "Libra"],
        ["天蠍座", "Scorpio"],
        ["射手座", "Sagittarius"],
        ["摩羯座", "Capricorn"],
    ],
    ages: [
        ["10歲以下", "Under_10"],
        ["10-20歲", "10_20"],
        ["20-30歲", "20_30"],
        ["30-40歲", "30_40"],
        ["40-50歲", "40_50"],
        ["50-60歲", "50_60"],
        ["60歲以上", "Over_60"],
    ],
    q1s: [
        ["先吃肉", "Meat"],
        ["先吃菜", "Vegetables"],
    ],
    q2s: [
        ["備料", "Prepare"],
        ["生火", "Fire"],
        ["主烤", "Grill"],
        ["聊天", "Chat"],
        ["猛吃", "Eat"],
    ],
    q3s: [
        ["茶", "Tea"],
        ["汽水", "Soda"],
        ["啤酒", "Beer"],
    ],
    q4s: [
        ["三人以內", "3"],
        ["五人左右", "5"],
        ["十人以上", "10"],
        ["邊緣人", "0"],
    ],
    formData: {
        name: '',
        gender: '',
        signs: '',
        age: '',
        email: '',
        q1: '',
        q2: '',
        q3: '',
        q4: '',
    },
    verify: [false, false, false, false, false, false, false, false, false, ],
    nextStep: true,
    sendData: '',
    food: '',
}

function readyGo() {
    TweenMax.fromTo($(".ready"), 0.5, {
        yPercent: 30,
        opacity: 0,
    }, {
        yPercent: 0,
        opacity: 1,
    })
    TweenMax.fromTo($(".sub1"), 0.4, {
        yPercent: 0,
        opacity: 1,
    }, {
        yPercent: 15,
        opacity: 0,
        delay: 0.1
    })
    TweenMax.fromTo($(".sub2"), 0.4, {
        yPercent: 0,
        opacity: 1,
    }, {
        yPercent: 15,
        opacity: 0,
        delay: 0.2
    })
    TweenMax.fromTo($(".sub3"), 0.4, {
        yPercent: 0,
        opacity: 1,
    }, {
        yPercent: 15,
        opacity: 0,
        delay: 0.3
    })
    TweenMax.fromTo($(".sub4"), 0.4, {
        yPercent: 0,
        opacity: 1,
    }, {
        yPercent: 20,
        opacity: 0,
        delay: 0.4
    })
}

function grid() {
    TweenMax.fromTo($(".sub11"), 0.4, {
        yPercent: 0,
        opacity: 1,
    }, {
        yPercent: 15,
        opacity: 0,
        delay: 0.1
    })
    TweenMax.fromTo($(".sub21"), 0.4, {
        yPercent: 0,
        opacity: 1,
    }, {
        yPercent: 15,
        opacity: 0,
        delay: 0.2
    })
    TweenMax.fromTo($(".sub31"), 0.4, {
        yPercent: 0,
        opacity: 1,
    }, {
        yPercent: 15,
        opacity: 0,
        delay: 0.3
    })
    TweenMax.fromTo($(".sub41"), 0.4, {
        yPercent: 0,
        opacity: 1,
    }, {
        yPercent: 20,
        opacity: 0,
        delay: 0.4
    })
}

const app = new Vue({
    el: '#app',
    data: gameDate,
    methods: {
        answer(_idx) {
            // console.log(this.products.array)
            // console.log("T: " + this.products.array[this.products.target])
            // console.log("N: " + this.products.array[_idx])
            if (parseInt(_idx) !== parseInt(this.target)) {
                // console.log("FALSE");
                this.status.splice(parseInt(_idx), 1, true);
            } else {
                this.score++;
                this.create();
                getMousePos();
            }
        },
        reset() {
            this.progress = 30;
            this.start = true;
            setTimeout(() => {
                this.score = 0;
                this.create();
            }, 600);
        },
        create() {
            this.main = this.quizArray[this.quizNum[this.quizIdx]];
            // this.main = this.quizArray[this.quizIdx];
            if (this.main < 30) {
                this.array = getRandomArray(1, 29, 9);
            } else if (this.main < 45 && this.main > 29) {
                this.array = getRandomArray(30, 44, 9);
            } else if (this.main < 72 && this.main > 44) {
                this.array = getRandomArray(45, 71, 9);
            } else if (this.main < 82 && this.main > 71) {
                this.array = getRandomArray(72, 81, 9);
            } else if (this.main > 81) {
                this.array = getRandomArray(82, 100, 9);
            }
            this.target = getRandomInt(0, 8);
            if (this.array.indexOf(this.main) == -1) {
                this.array.splice(this.target, 1, this.main);
                console.log(this.array);
            } else {
                this.target = this.array.indexOf(this.main);
            }
            this.status = [false, false, false, false, false, false, false, false, false];
            if (this.quizIdx == 24) {
                this.quizIdx = 0;
            } else {
                this.quizIdx++;
            }
        },
        verifyData() {
            this.nextStep = true;
            this.verify = [false, false, false, false, false, false, false, false, false,];

            this.verify.splice(0, 1, this.formData.name === '' ? true : false);
            this.verify.splice(1, 1, this.formData.gender === '' ? true : false);
            this.verify.splice(2, 1, this.formData.signs === '' ? true : false);
            this.verify.splice(3, 1, this.formData.age === '' ? true : false);
            if (this.formData.email !== '') {
                if (!emailRule.test(this.formData.email)) {
                    this.verify.splice(4, 1, 2)
                }
            } else {
                this.verify.splice(4, 1, 1)
            }
            this.verify.splice(5, 1, this.formData.q1 === '' ? true : false);
            this.verify.splice(6, 1, this.formData.q2 === '' ? true : false);
            this.verify.splice(7, 1, this.formData.q3 === '' ? true : false);
            this.verify.splice(8, 1, this.formData.q4 === '' ? true : false);
            for(i = 0; i < this.verify.length; i++) {
                if(this.verify[i] !== false) {
                    this.nextStep = false;
                }
            }
            if(this.nextStep) {
                this.buildData();
            }
        },
        buildData() {
            this.sendData = {
                name: this.formData.name,
                sex: this.genders[this.formData.gender][0],
                constellation: this.signs[this.formData.signs][0],
                age: this.formData.age,
                email: this.formData.email,
                q1: this.q1s[this.formData.q1][0],
                q2: this.q2s[this.formData.q2][0],
                q3: this.q3s[this.formData.q3][0],
                q4: this.q4s[this.formData.q4][0],
                source: myParams.getUrlParams("utm_source"),
                medium: myParams.getUrlParams("utm_medium"),
                campaign: myParams.getUrlParams("utm_campaign"),
            }
            this.ajaxData();
            // this.verifyData();
        },

        ajaxData() {
            alert("表單已送出！");
            window.location.href = "game.html?score=" + gameDate.score;
            // setGA.ButtonClick("btn_enter")
            // setGA.Event("Q1", this.sendData.q1)
            // setGA.Event("Q2", this.sendData.q2)
            // setGA.Event("Q3", this.sendData.q3)
            // setGA.Event("Q4", this.sendData.q4)
            // $.ajax({
            //     url: "backend/api/save_data",
            //     dataType: "json",
            //     data: {
            //         "name": this.sendData.name,
            //         "sex": this.sendData.sex,
            //         "constellation": this.sendData.constellation,
            //         "age": this.sendData.age,
            //         "email": this.sendData.email,
            //         "Q1": this.sendData.q1,
            //         "Q2": this.sendData.q2,
            //         "Q3": this.sendData.q3,
            //         "Q4": this.sendData.q4,
            //         "source": '',
            //         "medium": '',
            //         "campaign": '',
            //     },
            //     type: "POST",
            //     // beforeSend: function () {
            //     // },
            //     success: function (result) {
            //         console.log(result);
            //         if(result.message == "success") {
            //             alert("資料送出成功！")
            //             // window.location.href = "index.html"
            //             window.location.href = "game.html?score=" + gameDate.score;
            //         } else {
            //             alert("資料錯誤")
            //         }
            //         // window.location.href = "index.html?" + window.location.href.splice("?")[1]
            //     },
            //     // complete: function () {
            //     // },
            //     // error: function () {
            //     // }
            // });
        }
    },
    computed: {
        backImg() {
            return function (_idx) {
                return "background-image: url(images/game/" + this.array[_idx] + ".svg)"
            }
        },
        columnClass() {
            return function (_idx) {
                return {
                    column: true,
                    column__false: this.status[_idx]
                }
            }
        },
        final() {
            return "images/1/score/score" + scoreRange(this.score) + ".png";
        },
        finalTxt() {
            return "images/1/score/score" + scoreRange(this.score) + "-txt.png";
        },
        tip() {
            return this.food[this.array[this.target] - 1].cnname;
        },
    },
    watch: {
        start(val) {
            if (val === true) {
                console.log("GO")
                this.quizIdx = 0;
                this.create()
                TweenMax.fromTo($(".step2__main"), 0.5, {
                    yPercent: 20,
                    opacity: 0,
                }, {
                    yPercent: 0,
                    opacity: 1,
                    onComplete: function () {
                        $(".column--temp").removeClass("column--temp-1")
                    }
                })
                readyGo()
                grid()
                setTimeout(() => {
                    this.gameStart = 1;
                    readyGo()
                    setTimeout(() => {
                        this.gameStart = 2;
                    }, 800);
                }, 1000);
            }
        },
        gameStart(val) {
            if (val === 2) {
                TweenMax.fromTo($(".progress img"), 30, {
                    xPercent: 0
                }, {
                    xPercent: -100,
                    ease: Power0.easeNone
                })
                this.timeCount = setInterval(() => {
                    this.progress--;
                }, 1000);
                setTimeout(() => {
                    TweenMax.set($(".step3__result .txt"), {
                        scale: 2,
                        opacity: 0,
                    })
                    pageLeave(2, 3)
                    this.start = false;
                    clearInterval(this.timeCount);
                    setTimeout(() => {
                        this.gameStart = 0;
                        TweenMax.fromTo($(".step3__result .txt"), 0.5, {
                            scale: 2,
                            opacity: 0,
                        }, {
                            scale: 1,
                            opacity: 1,
                            ease: Expo.easeIn,
                            delay: 0.2
                        })
                    }, 600)
                }, 30000)
            }
        }
    }
});
if(myParams.getUrlParams("score")) {
    gameDate.score = myParams.getUrlParams("score");
    setTimeout(function() {
        TweenMax.fromTo($(".step3__result .txt"), 0.5, {
            scale: 2,
            opacity: 0,
        }, {
            scale: 1,
            opacity: 1,
            ease: Expo.easeIn,
            delay: 0.2
        })
        pageLeave(1, 3)
        setTimeout(function(){
            $(".loader").fadeOut();
        }, 400)
        history.pushState("", "", "/demosite/2020/2020-pxmart/game.html");
    }, 300);
} else {
    setTimeout(function(){
        $(".loader").fadeOut(function() {
            // pageLeave(1, 2)
        });
    },1000)
}