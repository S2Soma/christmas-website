//Đổi màu background
$(document).ready(function () {
  new AnimateBG("canvasBG", "http://sd.uploads.im/t/z7xY4.png").start();
});
//Nhấn nút 
document.querySelector('.button-submit').addEventListener('click', function() {
  this.classList.add('clicked');
});

document.querySelector('.button-submit').addEventListener('transitionend', function() {
  this.classList.remove('clicked');
});
//Kiểm tra tên
var Active = false;
var wishList = [
  " 10đ<br/>không có nhưng",
  "Người đọc cái này sẽ bị ...<br/> siêu cấp may mắn 🍀🍀🍀",
  " cái nịt nè <br/>(^o^)--O",
  "Của bạn hết 20k tiền dịch vụ <br/>",
  " may mắn lần sau <br/> :)))",
  ` 1 bé bug cute nè <br/> ('3')~<i class="fa-solid fa-bug" style="color: #ff0000;"></i>`,
  "Người đọc cái này sẽ bị ... <br/> siêu cấp dui dẻ",
  "Giáng sinh dui dẻ hú hú \\(^o^)/"
]
var iconList = [
  " :)))",
  " :D",
  " :3",
  " (^o^)",
  " '3'",
  " :>",
  " o_o",
  " (♥_♥)",
]
var currentWish = 0;
function checkEnter(event) {
  if (event.key === "Enter") {
    checkName();
  }
}
//check name
function checkName()
{
  var inputName = document.getElementById("nameInput").value;
    var err = document.getElementById("err-Name");
    const regex = new RegExp(/[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/);
    if (inputName.trim() === "") {
      err.innerHTML = "Vui lòng nhập họ tên!";
      return;
    }
    if (inputName.trim().length > 8)
    {
      err.innerHTML = "Tên dài quá bạn ơi!";
      return;
    }
    if (regex.test(inputName)) {
      err.innerHTML = "Tên không chứa các ký tự đặc biệt hoặc số!";
      return;
    }
    err.innerHTML = "";
    var form = document.querySelector('.sign-form');
    var overlay = document.querySelector('.overlay');
    form.classList.toggle('slideUp');
    setTimeout(function () {
      form.classList.add('hidden');
    }, 200);
    overlay.classList.add('hidden');
    if (!compareName(inputName)) randomWish(inputName);
    submit();
}
//Xử lý random câu chúc
function randomWish(name) {
  var wishElement = document.getElementById("wish-text");
  var rate = Math.floor(Math.random() * 101);
  if (rate > 88) wishElement.innerHTML = name + wishList[0] + iconList[rate % 7];
  else if (rate > 75) wishElement.innerHTML = wishList[1];
  else if (rate > 63) wishElement.innerHTML = "Tặng " + name + wishList[2];
  else if (rate > 51) wishElement.innerHTML = wishList[3] + iconList[rate % 7];
  else if (rate > 39) wishElement.innerHTML =  "Chúc " + name + wishList[4];
  else if (rate > 25) wishElement.innerHTML =  "Cho " + name + wishList[5];
  else if (rate > 12) wishElement.innerHTML =  wishList[6] + iconList[rate % 7];
  else wishElement.innerHTML = wishList[7];
}
//xử lý với tên nhập vào
function compareName(name) {
  var isEqual = false;
  var wishElement = document.getElementById("wish-text");
  var newName = name.trim().toLowerCase();
  if (newName.includes("mến") || newName.includes("men")) {
    wishElement.innerHTML = "Kiếm ny để ôm đê <br/> \\(^o^)/";
    isEqual = true;
  }
  else if (newName.includes("minh")) {
    wishElement.innerHTML = "Ghét mấy thằng tên Minh :)))";
    isEqual = true;
  }
  else if (newName.includes("nam")) {
    wishElement.innerHTML = "Phí dịch vụ 1 chai sờ ting :3";
    isEqual = true;
  }
  else if (newName.includes("yummy")) {
    wishElement.innerHTML = "Ghét Yummy nhất dũ trụ <br/> ('3')";
    isEqual = true;
  }
  else if (newName.includes("cá dàng xinh đẹp")) {
    wishElement.innerHTML = "Có 1 ngừ siêu cấp xinh đẹp <br/> mới unbox quà nè ('3')~♥";
    isEqual = true;
  }
  return isEqual;
}
//Xử lý scroll
function submit() {
  var Main;

  Main = (function () {
    function Main() {
      this.vars();
      this.fixIETag();
      this.initScroll();
      this.describeSequence();
      this.suggestScroll();
    }

    Main.prototype.vars = function () {
      this.frameDur = 1500;
      this.$cover = $('#js-cover');
      this.$coverPlace = $('#js-cover-place');
      this.$icon1 = $('#js-icon1 .box-icon__content');
      this.$icon2 = $('#js-icon2 .box-icon__content');
      this.$icon3 = $('#js-icon3 .box-icon__content');
      this.$baseShadow = $('#js-base-shadow');
      this.$bottomShadow = $('#js-bottom-shadow');
      this.$leftPeel = $('#js-left-peel');
      this.$leftPeelInner = $('#js-left-inner');
      this.$leftPeelChildren = this.$leftPeel.children();
      this.$rightPeel = $('#js-right-peel');
      this.$rightPeelInner = $('#js-right-inner');
      this.$rightPeelChildren = this.$rightPeel.children();
      this.$line1 = $('#js-line1');
      this.$line2 = $('#js-line2');
      this.$tag = $('#js-tag');
      this.$scrollSuggest = $('#js-scroll-suggest');
      this.$scrollSuggestMask = $('#js-scroll-suggest-mask');
      this.$curtain = $('#js-curtain');
      return this.$w = $(window);
    };

    Main.prototype.hideCurtain = function () {
      return this.$curtain.fadeOut(1000);
    };

    Main.prototype.suggestScroll = function () {
      return this.scrollSuggestTween = TweenMax.to(this.$scrollSuggest, .5, {
        y: 10,
        repeat: -1,
        opacity: 1,
        yoyo: true,
        ease: Power2.easeIn
      });
    };

    Main.prototype.stopScollSuggest = function () {
      this.scrollSuggestTween.pause();
      this.$scrollSuggest.hide();
      return this.$scrollSuggestMask.hide();
    };

    Main.prototype.playScollSuggest = function () {
      this.$scrollSuggest.show();
      this.$scrollSuggestMask.show();
      return this.scrollSuggestTween.play();
    };

    Main.prototype.describeSequence = function () {
      var dur, start;
      start = 1;
      dur = this.frameDur;
      this.line2Tween = TweenMax.to(this.$line2, 1, {
        left: -300,
        rotation: 15,
        onStart: (function (_this) {
          return function () {
            return _this.stopScollSuggest();
          };
        })(this),
        onReverseComplete: (function (_this) {
          return function () {
            return _this.playScollSuggest();
          };
        })(this)
      });
      this.controller.addTween(start, this.line2Tween, dur);
      this.tagTween = TweenMax.to(this.$tag, 1, {
        rotation: 35
      });
      this.controller.addTween(start, this.tagTween, dur);
      start += dur / 2.5;
      dur = this.frameDur;
      this.line1Tween = TweenMax.to(this.$line1, 1, {
        top: -300,
        rotation: 15
      });
      this.controller.addTween(start, this.line1Tween, dur);
      start += dur - dur / 3;
      dur = this.frameDur - this.frameDur / 4;
      this.leftPeelTween = TweenMax.to(this.$leftPeel, 1, {
        left: '-50%'
      });
      this.controller.addTween(start, this.leftPeelTween, dur);
      this.leftPeelChildrenTween = TweenMax.to(this.$leftPeelChildren, 1, {
        width: '100%'
      });
      this.controller.addTween(start, this.leftPeelChildrenTween, dur);
      this.leftPeelTweenInner = TweenMax.to(this.$leftPeelInner, 1, {
        left: '100%',
        onStart: (function (_this) {
          return function () {
            if (!_this.isChromeFix()) {
              return;
            }
            return _this.$leftPeelInner.css({
              '-webkit-transform': 'translateX(1px)'
            });
          };
        })(this),
        onReverseComplete: (function (_this) {
          return function () {
            if (!_this.isChromeFix()) {
              return;
            }
            return _this.$leftPeelInner.css({
              '-webkit-transform': 'translateX(0px)'
            });
          };
        })(this)
      });
      this.controller.addTween(start, this.leftPeelTweenInner, dur);
      this.rightPeelTween = TweenMax.to(this.$rightPeel, 1, {
        left: '100%'
      });
      this.controller.addTween(start, this.rightPeelTween, dur);
      this.rightPeelChildrenTween = TweenMax.to(this.$rightPeelChildren, 1, {
        width: '100%'
      });
      this.controller.addTween(start, this.rightPeelChildrenTween, dur);
      this.rightPeelTweenInner = TweenMax.to(this.$rightPeelInner, 1, {
        left: '-100%'
      });
      this.controller.addTween(start, this.rightPeelTweenInner, dur);
      start += dur;
      dur = this.frameDur;
      this.coverBaseShadowTween = TweenMax.to(this.$baseShadow, 1, {
        opacity: 1
      });
      this.coverBottomShadowTween = TweenMax.to(this.$bottomShadow, 1, {
        opacity: .5
      });
      this.coverTween = TweenMax.to(this.$cover, 1, {
        rotationY: 120,
        rotationX: 65,
        x: this.$w.width() / 6.4,
        y: -400,
        onUpdate: (function (_this) {
          return function () {
            var progress;
            progress = _this.coverTween.progress();
            if (progress > .225) {
              _this.$icon1.css({
                'z-index': 11
              });
            } else {
              _this.$icon1.css({
                'z-index': 1
              });
            }
            if (progress > .265) {
              _this.$icon2.css({
                'z-index': 11
              });
            } else {
              _this.$icon2.css({
                'z-index': 1
              });
            }
            if (progress > .307) {
              return _this.$icon3.css({
                'z-index': 11
              });
            } else {
              return _this.$icon3.css({
                'z-index': 1
              });
            }
          };
        })(this)
      });
      this.controller.addTween(start, this.coverTween, dur);
      this.controller.addTween(start, this.coverBaseShadowTween, dur / 2);
      this.controller.addTween(start, this.coverBottomShadowTween, dur / 2);
      return this.maxScroll = -(start + dur / 2);
    };

    Main.prototype.fixIETag = function () {
      if (!this.isIE()) {
        return;
      }
      return $(document.body).addClass('ie');
    };

    Main.prototype.initScroll = function () {
      var it;
      this.scroller = new IScroll('#js-main', {
        probeType: 3,
        mouseWheel: true,
        deceleration: 0.001
      });
      document.addEventListener('touchmove', (function (e) {
        return e.preventDefault();
      }), false);
      this.controller = $.superscrollorama({
        triggerAtCenter: false,
        playoutAnimations: true
      });
      it = this;
      this.scroller.on('scroll', function () {
        return it.updateScrollPos(this, it);
      });
      return this.scroller.on('scrollEnd', function () {
        return it.updateScrollPos(this, it);
      });
    };

    Main.prototype.updateScrollPos = function (that, it) {
      (that.y < it.maxScroll) && (that.y = it.maxScroll);
      return it.controller.setScrollContainerOffset(0, -(that.y >> 0)).triggerCheckAnim(true);
    };

    Main.prototype.bind = function (func, context) {
      var bindArgs, wrapper;
      wrapper = function () {
        var args, unshiftArgs;
        args = Array.prototype.slice.call(arguments);
        unshiftArgs = bindArgs.concat(args);
        return func.apply(context, unshiftArgs);
      };
      bindArgs = Array.prototype.slice.call(arguments, 2);
      return wrapper;
    };

    Main.prototype.isChromeFix = function () {
      var ver, _ref;
      ver = parseInt((_ref = window.navigator.appVersion.match(/Chrome\/(\d+)\./)) != null ? _ref[1] : void 0, 10);
      return (ver > 33) && (navigator.userAgent.toLowerCase().indexOf('chrome') > -1);
    };

    Main.prototype.isFF = function () {
      return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    };

    Main.prototype.isIE = function () {
      var msie, rv, rvNum, trident, ua, undef;
      if (this.isIECache) {
        return this.isIECache;
      }
      undef = void 0;
      rv = -1;
      ua = window.navigator.userAgent;
      msie = ua.indexOf("MSIE ");
      trident = ua.indexOf("Trident/");
      if (msie > 0) {
        rv = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
      } else if (trident > 0) {
        rvNum = ua.indexOf("rv:");
        rv = parseInt(ua.substring(rvNum + 3, ua.indexOf(".", rvNum)), 10);
      }
      this.isIECache = (rv > -1 ? rv : undef);
      return this.isIECache;
    };

    return Main;

  })();

  new Main;

}