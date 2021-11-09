var $MH={
	limit: 10,
	width:960,
	height: 170,
	style: 'pic',
	setCookie: function(name, value) {
		var Days = 365;
		var exp = new Date;
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + ("=" + (value) + ";expires=" + exp.toGMTString() + ";path=/;");
	},
	getCookie: function(name) {
		var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if (arr != null) {
			return (arr[2]);
		}
		return null;
	},
	getDc: function(){
		var x,y=document.getElementById('HISTORY');
		return y;
	},
	piclist: function (){
		var a = $MH.getCookie("HISTORY"), c = 1,img_li = "";
		a = (a !='' && ''+a != 'null') ? $MH.tryjosn(a) : {video:[]};
		for(var i=0;i<a.video.length;i++){
			if(c>$MH.limit){break;}
			if(a.video[i].link && a.video[i].pic && a.video[i].name){
			img_li += "<div  class=\"imggg\"><a href=\"" + a.video[i].link + "\" target=\"_self\"><img src=\"" + a.video[i].pic + "\" alt=\"" + a.video[i].name + "\" border=\"0\"/></a><p class=\"imgfont\"><a href=\"" + a.video[i].link + "\" target=\"_self\">" + a.video[i].name + "</a></p></div>\
						"
				c++;
			}
		}
		img_li = img_li != "" ? img_li : '<li style="width:100%;text-align:center;line-height:'+($MH.height-25)+'px;color:red">\u6CA1\u6709\u8BB0\u5F55</li>';
		return "<div id=\"mh-box\" style=\"height:100%;overflow:hidden\"><div style=\"height:24px;line-height:24px\" id=\"mh-title\"><div style=\"float:right;margin-right:5px;display:inline\"><a href=\"javascript:void(0)\" onClick=\"$MH.showHistory(2);\" style=\"font-size:12px;color: #888;line-height:24px;height:24px;text-decoration:none\">\u6E05\u7A7A</a>&nbsp;<a href=\"javascript:void(0)\" onClick=\"$MH.showHistory(1);\" style=\"font-size:12px;color: #888;line-height:24px;height:24px;text-decoration:none\">\u9690\u85CF</a></div><strong style=\"padding-left:5px;font-size:14px\">\u6211\u7684\u89C2\u770B\u5386\u53F2</strong></div><div id=\"mh-ul\"><ul style=\"height:100%;width:100%;margin:0px;border:0px;padding:0\">" + img_li + "</ul><div style=\"clear:both\"></div></div></div>";
	},
	fontlist: function (){
		var a = $MH.getCookie("HISTORY"), c = 1,img_li = "";
		a = (a !='' && ''+a != 'null') ? $MH.tryjosn(a)  : {video:[]} ;
		for(var i=0;i<a.video.length;i++){
			if(c>$MH.limit){break;}
			if(a.video[i].link && a.video[i].pic && a.video[i].name){
			img_li += "<li style=\"list-style:none;\"><a href=\"" + a.video[i].link + "\" target=\"_self\" style=\"font-size:12px;text-decoration:none\"><small>"+c+".</small>" + a.video[i].name + "</a></li>"
				c++;
			}
		}
		img_li = img_li != "" ? img_li : '<li style="text-align:center;line-height1:'+($MH.height-25)+'px;color:red;list-style:none">\u6CA1\u6709\u8BB0\u5F55</li>';
		return "<div id=\"mh-box\" style=\"height1:"+$MH.height+"px;overflow:hidden\"><div style=\"height:24px;line-height:24px;clear:both;\" id=\"mh-title\"><span style=\"float:right;\"><a href=\"javascript:void(0)\" onClick=\"$MH.showHistory(2);\" style=\"font-size:12px;color: #333;text-decoration:none\">\u6E05\u7A7A</a><a href=\"javascript:void(0)\" onClick=\"$MH.showHistory(1);\" style=\"display:none;font-size:12px;color: #333;text-decoration:none\">\u9690\u85CF</a></span><strong style=\"font-size:12px;color:#999;font-weight:400;\">\u6211\u7684\u89C2\u770B\u5386\u53F2</strong></div><div id=\"mh-ul\" style=\"clear:both\"><ul style=\"margin:0px;border:0px;padding:0;\">" + img_li + "</ul><div style=\"clear:both\"></div></div></div>";
	},
	WriteHistoryBox: function(w,h,c){
		document.write('<div id="HISTORY" style="width:100%;"></div>');
		$MH.height=h;$MH.style= c=='font' ? 'font' : 'pic';
		this.showHistory();
	},
	showHistory: function(ac) {
		var a = $MH.getCookie("HISTORY"),dc=$MH.getDc();
		var ishistory = $MH.getCookie("ishistory");
		if(!dc) return;
		if (ac == 1) {
			if (ishistory != 1) {
				$MH.setCookie("ishistory", 1);
				ishistory = 1;
			} else {
				$MH.setCookie("ishistory", 0);
				ishistory = 0;
			}
		}
		if (ac == 2) {
			ishistory = 0;
			$MH.setCookie("ishistory", 0);
			$MH.setCookie("HISTORY", 'null');
		}
		if(ishistory == 1){
			dc.innerHTML = $MH[$MH.style+'list']();
			dc.style.display = "";
		} else {
			dc.innerHTML = $MH[$MH.style+'list']();
			dc.style.display = "";
		}
	},
	recordHistory: function(video){
		//if(video.link.indexOf('https:///')==-1 || window.max_Player_File) return;
		var a = $MH.getCookie('HISTORY'), b = new Array(), c = 1;
		if(a !='' && a != null && a != 'null'){
			a = $MH.tryjosn(a);
			for(var i=0;i<a.video.length;i++){
				if(c>$MH.limit){break;}
				if(video.link != a.video[i].link && a.video[i].pic){b.push('{"name":"'+ $MH.u8(a.video[i].name) +'","link":"'+ $MH.u8(a.video[i].link) +'","pic":"'+ $MH.u8(a.video[i].pic) +'"}');c++;}
			}
		}
		b.unshift('{"name":"'+ $MH.u8(video.name) +'","link":"'+ $MH.u8(video.link) +'","pic":"'+ $MH.u8(video.pic) +'"}');
		$MH.setCookie("HISTORY",'{video:['+ b.join(",") +']}');
		b = null;
		a=null;
	},
	u8: function (s){
		return unescape(escape(s).replace(/%u/ig,"\\u")).replace(/;/ig,"\\u003b");
	},
	tryjosn: function (json){
		try{
			return eval('('+ json +')');
		}catch(ig){
			return {video:[]};
		}
	}
}
function setTab(name, name2, cursel, n) {
  for (i = 1; i <= n; i++) {
    var menu = document.getElementById(name + i);
    var con = document.getElementById(name2 + i);
    menu.className = i == cursel ? "on" : "";
    con.style.display = i == cursel ? "block" : "none";
  }
};

function $$(id) {
  return document.getElementById(id);
}

function Order(o, id, vi) {
  var tag, leng, i, phtml, box, ubox, uhtml, isno, s1, s2
  box = $$(id);
  tag = box.getElementsByTagName('li');
  leng = tag.length;
  uhtml = "";
  if (o == 1) {
    for (i = leng - 1; i >= 0; i--) {
      if (i == leng - 1) {
        isno = '<li class="new">';
      } else {
        isno = '<li>';
      }
      uhtml += isno + tag[i].innerHTML + "</li>";
    }
    s1 = "<em class=\"over\">倒序</em>"
    s2 = "<em onclick=\"Order(0,'stab_1_71'," + vi + ")\">顺序</em>"
  } else {
    for (i = leng - 1; i >= 0; i--) {
      if (i == 0) {
        isno = '<li class="new">';
      } else {
        isno = '<li>';
      }
      uhtml += isno + tag[i].innerHTML + "</li>";
    }
    s1 = "<em onclick=\"Order(1,'stab_1_71'," + vi + ")\">倒序</em>"
    s2 = "<em class=\"over\">顺序</em>"
  }
  $$(id + "_s1").innerHTML = s1;
  $$(id + "_s2").innerHTML = s2;
  uhtml = "<ul>" + uhtml + "</ul>";
  box.innerHTML = uhtml;
}
$(document).ready(function () {
  $(".js1").hover(function () {
    $(this).addClass("v").find("div.js2").show();
  }, function () {
    $(this).removeClass("v").find("div.js2").hide();
  });

  $(".sbtn").click(function () {
    if ($(this).hasClass("cur")) {
      $(".sbtn").removeClass("cur");
      $(".sy").hide();
    } else {
      $(".sy").show();
      $(".sbtn").addClass("cur");
    }
  })
  $(".sdes").click(function () {
    if ($(this).hasClass("cur")) {
      $(".sdes").removeClass("cur");
    } else {
      $(".sdes").addClass("cur");
    }
  })
  $(".sh #keyword").focus(function () {

      $(".search-key").show();
      $(".sh").addClass("shcur");
    
  });
  $(".sh #keyword").blur(function () {

      $(".sh").removeClass("shcur");
      $(".search-key").hide();

  });
  $(".nav-sj").click(function () {
    if ($(this).hasClass("shcur")) {
      $(".nav-sj").removeClass("shcur");
      $(".nav-down-mb").hide();
    } else {
      $(".nav-down-mb").show();
      $(".nav-sj").addClass("shcur");
    }
  })
  $(".nav-sh").click(function () {
    if ($(this).hasClass("shcur")) {
      $(".nav-sh").removeClass("shcur");
      $(".search-mb").hide();
    } else {
      $(".search-mb").show();
      $(".nav-sh").addClass("shcur");
    }
  });
  $(window).scroll(function () {
    if ($(window).scrollTop() >= 300) {
      $('.gotop').fadeIn(400);
    } else {
      $('.gotop').fadeOut(400);
    }
  });
  $('.gotop').click(function () {
    $('html,body').animate({
      scrollTop: '0px'
    }, 200);
  });
});
