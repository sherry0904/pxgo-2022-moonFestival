//share

var ADD_ARRAY = ADD_URL.split('?');
var SHAREURL = "http://www.our-work.com.tw/demosite/2019/2019-meiji-amicolla-2019Q2/view.html";
console.log(ADD_ARRAY[0]);
$(function () {
    $("a[data-ga='fb']").click(function () {
        ADD_URL = window.location.href;
        ADD_ARRAY = ADD_URL.split('?');
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(SHAREURL + "?" + ADD_ARRAY[1]),
            'facebook-share-dialog',
            'width=600,height=600'
        );
    });
    $("a[data-ga='line']").click(function () {
        ADD_URL = window.location.href;
        ADD_ARRAY = ADD_URL.split('?');
        // $("a[data-ga='line']").attr("href", "http://line.naver.jp/R/msg/text/?");
        window.open('https://social-plugins.line.me/lineit/share?url=' + encodeURIComponent(SHAREURL + "?" + ADD_ARRAY[1]),
            'width=600,height=600'
        );
        console.log(window.location.href);
    });
    // $("a[data-ga='in']").click(function () {
    //     window.open('http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(url),
    //         'sharer',
    //         'toolbar=0, status=0, width=600, height=600');
    //     return false;
    // });
})