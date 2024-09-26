$(function(){
    $('#dowebok').fullpage({
        'navigation': true,
        'navigationPosition': 'left',
        'navigationColor': ['#fff'],
        'afterLoad': function(anchorLink, index){
            if (index == $('#dowebok').find('.section').length) {
                // 在最后一个页面滑动结束后执行的操作
var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

// 检查条件
if (screenHeight > screenWidth) {
    alert("故事看完了，后面更多的故事，让我们未来一起慢慢地补充完整");
    alert("现在给你发个小红包");
    location.href = "redpage_phone.html";
} else {
    alert("故事看完了，后面更多的故事，让我们未来一起慢慢地补充完整");
    alert("现在给你发个小红包");
    location.href = "redpage_pc.html";
}
            }
        },
    });
});
