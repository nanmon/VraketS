//sider height
//onresize

function Lvler(lvl, isLsr) {
    var index = lvl.index();
    lvl.data({
        slf: lvl,
        i:index,
        marked: 0,
    });
    if (arguments.length == 1) {
        lvl.data({
            residue: 1,
            msize: Math.pow(2, index),
            csize: Math.pow(2, index + 1),
            last: lvl.children(".match").first(),
            rpp: function() {
                if (this.residue == this.msize)
                    this.residue = -1;
                else
                    ++this.residue;
                return this.residue;
            },
            MatchGuider: function() {
                var r = this.rpp() - 1;
                if (r < 0)
                    return -1;
                //Appender comportament
                var v = Math.ceil(Math.log(r) / Math.log(2));
                var f = r - Math.floor(Math.pow(2, v - 1));
                var m = 2 * f - 1;
                var n = Math.pow(2, v);
                
                var indexer = m / n;
                var spaces = this.msize;
                var eqer = Math.ceil(indexer * (spaces - 1));
                var match = this.slf.children(".match").eq(eqer);
                match.data().Enable();
                this.last = match;
                return match.children(".challenge").first();
            }
        });
        
        for (var i = 0; i < lvl.data().msize; i++){
            lvl.append("<div class='match ui-corner-all'></div>");
            ++$("#container").data().matchCount;
            var match = lvl.children(".match").last();
            Matcher(match);
        }
        lvl.children(".match").first().data().Enable();
    } else {
        var onlylsr = index%2 ? true : false;
        var power = Math.floor(index / 2);
        lvl.data({
            lsrsidue: 0,
            ol: onlylsr,
            msize: Math.pow(2, power),
            csize: Math.pow(2, power + 1),
            filler: Math.floor(Math.pow(2, power - 1)),
            last: lvl.children(".match").last(),
            lsrpp: function() {
                if (this.lsrsidue == this.filler)
                    this.lsrsidue = -1;
                else
                    ++this.lsrsidue;
                return this.lsrsidue;
            },
            MatchGuider: function(mfrom) {
                var i = this.msize - mfrom.index() - 1;
                var first = this.slf.children(".match").eq(i);
                var next = first.data().ascender;
                var target = next.parent().data().ascender;
                if (target) {
                    target = target.parent().data().enabled ? next : target;
                } else
                    target = next;
                var chi = target.siblings(".challenge").index();
                target.parent().data().Enable(chi);
                return target;
            },
            Twist: function() {
                if (this.i > 0)
                    for (var i = 0; i < this.msize/2; i++) {
                        var ii = this.msize - i - 1;
                        var lvl = this.slf;
                        var first = lvl.children(".match").eq(i);
                        var last = lvl.children(".match").eq(ii);
                        //firstchild of each
                        var fChildA = first.children(".challenge").eq(0);
                        var lChildA = last.children(".challenge").eq(0);
                        //losefrom
                        var lfrom_fA = fChildA.data().who || first.data().ascender.data().who;
                        var lfrom_lA = lChildA.data().who || last.data().ascender.data().who;
                        
                        //loseFrom
                        first.data().ascender.data().Echange(last.data().ascender.data(), "who");
                        first.data().ascender.data().Echange(last.data().ascender.data(), "descender");
                        //loseTo
                        lfrom_fA.data().Echange(lfrom_lA.data(), "loseTo");
                        
                        if(!first.data().enabled){
                            var clone = first.data().ascender.children(".someone").text();
                            first.data().ascender.children(".someone").text(last.data().ascender.children(".someone").text());
                            last.data().ascender.children(".someone").text(clone);
                        }else{
                            var clone = fChildA.children(".someone").text();
                            fChildA.children(".someone").text(lChildA.children(".someone").text());
                            lChildA.children(".someone").text(clone);
                        }
                    }
            }
        })
        
        for (var i = 0; i < lvl.data().msize; i++) {
            lvl.append("<div class='match ui-corner-all'></div>");
            var match = lvl.children(".match").last()
            Matcher(match, true);
        }
    }
}

function Matcher(match, isLsr) {
    match.css("opacity", 0);
    var index = match.index(), asc;
    match.data({
        slf: match,
        i: index,
        winner:0,
        seals: 0,
        enabled: false,
        Echange: function(echanger, prop) {
            var aux = this[prop];
            this[prop] = echanger[prop];
            echanger[prop] = aux;
        },
        GetReady: function(readySon, undo){
            if(arguments.length==1){
                readySon.data().ready=true;
                if(readySon.siblings(".challenge").data().ready)
                    this.slf.find("output").spinner().spinner({disabled: false});
            }else{
                readySon.data().ready=false;
                if(readySon.find("span").index()>-1)
                    this.slf.find("output").spinner({disabled: true});
            }
        }
    });
    if (arguments.length == 1) {
        
        asc = !match.parent().index() ? $("#grandfinal").children(".challenge").first() : match.parent().prev().children(".match").eq(Math.floor(index / 2)).children(".challenge").eq(index % 2);
        asc.data().descender = match;
        match.data({
            name: String.fromCharCode($("#container").data().matchCount + 64),
            ascender: asc,
            loseTo: 0,
            Enable: function() {
                this.enabled = true;
                this.slf.animate({opacity: 1}, {queue: false});
                this.ascender.data().descender = match;
                this.slf.children(".challenge").last().data().Absorb(this.ascender);
                $("#anticontainer").data().AppendLsr(this.slf);
            }
        });
        match.append("<div class='blockname'>"+match.data().name+"</div>");
        
    } else {
        var meqer = !match.parent().data().ol ? Math.floor(index / 2) : index;
        var cheqer = !match.parent().data().ol ? index % 2 : 1;
        asc = !match.parent().index() ? $("#grandfinal").children(".challenge").last() : match.parent().prev().children(".match").eq(meqer).children(".challenge").eq(cheqer);
        asc.data().descender = match;
        match.data({
            slf: match,
            i: index,
            ascender: asc,
            Enable: function(i) {
                this.enabled = true;
                this.slf.animate({opacity:1}, {queue: false});
                this.slf.children(".challenge").eq(i).data().Absorb(this.ascender);
            }
        });
    }
    while (match.children(".challenge").length < 2) {
        match.append("<div class='challenge'></div>");
        Challengin(match.children(".challenge").last());
    }
}

function Challengin(mch, isLsr) {
    mch.data({
        slf: mch,
        descender: 0,
        wins: 0,
        who: 0,
        ready: false,
        Whoer: function(ch) {
            this.who = ch;
            ch.data().start = mch;
            ch.data().fights[0] = this.slf;
            this.slf.children(".someone").text(ch.data().name);
        },
        Absorb: function(ascender) {
            this.Echange(ascender.data(), "who");
            ascender.data().descender = this.slf.parent();
            if (this.who.attr("class").indexOf("match") == -1) {
                this.who.data().start = this.slf;
                this.who.data().fights[0] = this.slf;
            } else {
                this.who.data().loseTo = this.slf;
                this.descender = this.who;
            }
            this.slf.children(".someone").text(ascender.children(".someone").text());
            ascender.animate({opacity: 0}, {queue: false});
        },
        Echange: function(echanger, prop) {
            var aux = this[prop];
            this[prop] = echanger[prop];
            echanger[prop] = aux;
        }
    });
    mch.append("<div class='someone'></div><output value='0' max='2' min='0'></output>");
}


function Tree() {
    
    $("#trnmt").data({
        slf: $("#trnmt"),
        ready: false,
        AppendChallenger: function(ch) {
            
            var cntdata = $("#container").data();
            var where = cntdata.LvlGuider();
            where.data().Whoer(ch);
            jEffects();
        }
    });
    
    var comodin = {data: function() {
            return {MatchGuider: function() {
                    var ch = $("#grandfinal").children(".challenge").first();
                    if (ch.parent().data().enabled) {
                        Lvler($("#container").children(".lvl"));
                        $("#container").data().lastLvl = $("#container").children(".lvl");
                        return $("#container").children(".lvl").eq(0).children(".match").eq(0).children(".challenge").eq(0);
                    } else {
                        ch.parent().data().enabled = true;
                        return ch;
                    }
                }};
        }};
    
    $("#anticontainer").data({
        slf: $("#anticontainer"),
        lastLvl: {index: function() {return -1}},
        toTwist: 2,
        AppendLsr: function(appender) {
            var newLsr = this.LvlGuider(appender);
            newLsr.children(".someone").text(appender.data().name + " Loser");
            newLsr.data().who = appender;
            newLsr.data().descender= appender;
            appender.data().loseTo = newLsr;
            if(newLsr.parent().attr("id")!=="grandfinal")
            this.lastLvl = newLsr.parent().parent();
        },
        LvlGuider: function(appender) {
            return this.slf.children(".lvl").last().data().MatchGuider(appender);
        },
        AppendLvls: function() {
            this.slf.append("<div class='lvl'></div>");
            var lvl = this.slf.children(".lvl").last();
            Lvler(lvl, true);
            
            this.slf.append("<div class='lvl'></div>");
            lvl = this.slf.children(".lvl").last();
            Lvler(lvl, true);
            
            if (this.slf.children(".lvl").length > 2)
                this.doTheTwist();
        },
        doTheTwist: function() {
            for(var i = this.slf.children(".lvl").length - 3; i>=2; i-=2)
            this.slf.children(".lvl").eq(i).data().Twist();
        
        }
    });
    
    $("#container").data({
        slf: $("#container"),
        lastLvl: comodin,
        matchCount: 0,
        LvlGuider: function() {
            var guider = this.lastLvl.data().MatchGuider();
            return guider == -1 ? this.AppendLvl().children(".match").first().children(".challenge").first() : guider; //.2.1
        },
        AppendLvl: function() {
            this.slf.append("<div class='lvl regl'></div>");
            var lvl = this.slf.children(".lvl").last();
            this.lastLvl = lvl;
            
            $("#anticontainer").data().AppendLvls();
            Lvler(lvl);
            
            
            return lvl;
        }
    });
    
    
    $("#grandfinal").data({
        slf: $("#grandfinal"),
        i: 0,
        winner: 0,
        enabled: false,
        GetReady: function(readySon, undo){
            if(arguments.length==1){
                readySon.data().ready=true;
                if(readySon.siblings(".challenge").data().ready)
                    this.slf.find("output").spinner().spinner({disabled: false});
            }else{
                readySon.data().ready=false;
                if(readySon.find("span").index()>-1)
                    this.slf.find("output").spinner({disabled: true});
            }
        }
    });
    
    $("#grandfinal").append("<div class='blockname'>GF</div><div class='challenge onw'></div><div class='challenge onw'></div>");
    Challengin($("#grandfinal").children(".challenge").first());
    Challengin($("#grandfinal").children(".challenge").last());
    Lvler($("#anticontainer").children(".lvl"), true);
    $("#anticontainer").children(".lvl").eq(0).data().MatchGuider = function(appender) {
        return $("#grandfinal").children(".challenge").eq(1);
    };

}

function jEffects(){
    var AnumLvls = $("#anticontainer").children(".lvl").length;
    var CnumLvls = $("#container").children(".lvl").length;
    var phantomLvls = $("#anticontainer").data().lastLvl.index() +1;
    var cBase = CnumLvls*$(".lvl.regl").outerWidth(true);
    var aBase= AnumLvls*$(".lvl").outerWidth(true);
    var cHeight = Math.pow(2, CnumLvls-1)*$(".match").height();
    var aHeight = Math.pow(2, CnumLvls-2)*$(".match").height();
    var leftPh = (AnumLvls + phantomLvls)*$(".lvl").outerWidth(true);
    $("#trnmt").width(cBase+202).height(cHeight + aHeight+20);
    $("#container").width(cBase).height(cHeight);
    $("#anticontainer").width(aBase).height(aHeight);
    
    var winH = $(window).height();
    var winW = $(window).width();
    var trnmtTop = (winH - $("#trnmt").height())/2;
    var trnmtLeft = (winW - $("#trnmt").width())/2;
    if(trnmtTop<70) trnmtTop=70;
    if(trnmtLeft<10) trnmtLeft=10;
    $("#trnmt").finish().animate({left: trnmtLeft}, {queue: false});
    $("#trnmt").animate({top: trnmtTop}, {queue: false});
    $("#trnmt").queue(function(){
        $("#grandfinal").finish().animate({top:$("#container").height() - 20}, {queue: false});

        for(var i=0;i<$("#container").children(".lvl").length-1;i++){
            var a = (Math.pow(2, $("#container").children(".lvl").length -1)-Math.pow(2,i))/Math.pow(2, i+1)*$(".match").innerHeight();
            $("#container").children(".lvl").eq(i).children(".match").eq(0).finish().animate({marginTop:a+"px"}, {queue: false});
            $("#container").children(".lvl").eq(i).children(".match").finish().animate({marginBottom:2*a+"px"}, {queue: false});
            $("#container").children(".lvl").eq(i).children(".match").last().finish().animate({marginBottom:a+"px"}, {queue: false});
        }
        var L = $("#anticontainer").data().lastLvl.index();
        if(L>=0){
            var P = $("#anticontainer").data().lastLvl.data().msize, Z, A;
            for(var j=0;j<=L;j++){
                var ol = $("#anticontainer").children(".lvl").eq(j).data().ol;
                if(!ol){
                    Z = $("#anticontainer").children(".lvl").eq(j).data().msize;
                    A = (P-Z)/(Z*2)*$(".match").innerHeight();
                }
                $("#anticontainer").children(".lvl").eq(j).children(".match").eq(0).finish().animate({marginTop:A}, {queue: false});
                $("#anticontainer").children(".lvl").eq(j).children(".match").finish().animate({marginBottom:2*A}, {queue: false});
                $("#anticontainer").children(".lvl").eq(j).children(".match").last().finish().animate({marginBottom:A}, {queue: false});
            
            }
        }
        $(this).find(".challenge").finish();
        $(this).dequeue();
    });
        
}

function SqueakyLines(haveWeAWinner){
    var match, pos;
    var canvas = document.getCSSCanvasContext("2d", "ctx", $("#trnmt").width(), $("#trnmt").height());
    if(!arguments.length){
        $("*").stop(true, true);
        var asc, hght, wdth, mpx, mpy, apx, apy;
        var mh=$(".match").height();
        var ah=$(".challenge").height();
        
        
        
        
        for(var i=0; i<$(".lvl:not(.hid) > .match:not(.hid,#grandfinal)").length;++i){
            match = $(".lvl:not(.hid) > .match:not(.hid,#grandfinal)").eq(i);
            asc = match.data().ascender;
            mpx = match.offset().left - $("#trnmt").offset().left;
            mpy = match.offset().top - $("#trnmt").offset().top;
            apx = asc.offset().left - $("#trnmt").offset().left;
            apy = asc.offset().top - $("#trnmt").offset().top;
            pos = {
                x: mpx + $(".match").width(), y: mpy<apy ? mpy : apy,
                w: apx - mpx - $(".match").width(), h:  mpy<apy ? apy+ah - mpy : mpy+mh - apy
             };
            pos = {
                x: pos.x, y: pos.y,
                w: pos.w, h:  pos.h,
                x1: 0, y1: mpy<apy ? ah/2 : pos.h - 3*ah/2,
                x2: 5, y2: mpy<apy ? ah/2 : pos.h - 3*ah/2,
                x3: 5, y3: mpy<apy ? ah : pos.h - ah,
                x4: pos.w/2, y4: mpy<apy ? ah : pos.h - ah,
                x5: pos.w/2, y5: mpy<apy ? pos.h - ah/2 : ah/2,
                x6: pos.w, y6: mpy<apy ? pos.h - ah/2 : ah/2,
                
                x7: 0, y7: mpy<apy ? 3*ah/2 : pos.h - ah/2,
                x8: 5, y8: mpy<apy ? 3*ah/2 : pos.h - ah/2
            };
            canvas.moveTo(pos.x+pos.x1, pos.y+pos.y1);
            for(var j=2; j<=6; ++j)
                canvas.lineTo(pos.x + pos["x"+j], pos.y + pos["y"+j]);
                
            canvas.moveTo(pos.x+pos.x7, pos.y+pos.y7);
            canvas.lineTo(pos.x+pos.x8, pos.y+pos.y8);
            canvas.lineTo(pos.x+pos.x3, pos.y+pos.y3);
            
            match.data({canvas: pos});
        }
        canvas.stroke();
        $("#trnmt").css({background: "-webkit-canvas(ctx)"});
        
    }else{
        var winner=haveWeAWinner.winner;
        pos = winner.parent().data().canvas;
        canvas.clearRect(pos.x, pos.y, pos.w, pos.h);
        canvas.beginPath();
        if(haveWeAWinner.isnIt){
            canvas.setStrokeColor("orange");
            if(!winner.parent().children(".challenge").index(winner)){
                canvas.moveTo(pos.x +pos.x1, pos.y +pos.y1);
                canvas.lineTo(pos.x +pos.x4, pos.y +pos.y1);
            }else{
                canvas.moveTo(pos.x +pos.x7, pos.y +pos.y7);
                canvas.lineTo(pos.x +pos.x4, pos.y +pos.y7);
            }
            canvas.lineTo(pos.x +pos.x5,pos.y +pos.y5);
            canvas.lineTo(pos.x +pos.x6,pos.y +pos.y6);
        }else{
            canvas.setStrokeColor("black");
            canvas.moveTo(pos.x+pos.x1, pos.y+pos.y1);
            for(var j=2; j<=6; ++j)
                canvas.lineTo(pos.x + pos["x"+j], pos.y + pos["y"+j]);
                
            canvas.moveTo(pos.x+pos.x7, pos.y+pos.y7);
            canvas.lineTo(pos.x+pos.x8, pos.y+pos.y8);
            canvas.lineTo(pos.x+pos.x3, pos.y+pos.y3);
        }
        canvas.stroke();
    }
}

function Storage(load){
    var st="";
    if(!arguments.length){ 
        if(localStorage.t){
    		$("#trnmt").animate({opacity: 1}, {queue: false});
    		var names=localStorage.t.split(";");
    		for(var j=1;j<names.length;j++){
    			$("#trnmt").css("visibility","visible");
    
    			$("#challengeList").append("<li class='challenger ui-state-default'>" + names[j] + "</li>");
                var ch = $("#challengeList").children(".challenger").last();
                ch.data({
                    name: names[j],
                    start: 0,
                    fights: []
                });
                $("#trnmt").data().AppendChallenger(ch);
    
    		}
            $("*").finish().stop(true, true);
            jEffects();
            $("textarea").trigger(jQuery.Event("keydown", {keyCode:27}));
    
    		if(localStorage.c){
                var mtchs = localStorage.c.split(";"), where, much, divw;
                for(var i=1; i<mtchs.length;++i){
                    where=mtchs[i].split(":")[0];
                    much=mtchs[i].split(":")[1].split(",");
                    divw=$(".match").eq(where);
                    divw.children(".challenge").eq(much[0]<much[1]?0:1).find("output").spinner("stepUp", String(Math.min(much[0],much[1])));
                    divw.children(".challenge").eq(much[0]>=much[1]?0:1).find("output").spinner("stepUp", String(Math.max(much[0],much[1])));
                }
    		}
        }
        $("#trnmt").data().ready=true;
	}if(arguments.length && $("#trnmt").data().ready){ 
	    if(load!="t"){
    		st=";"+load.index(".match")+":"+load.children(".challenge").eq(0).data().wins+","+load.children(".challenge").eq(1).data().wins;
    		var indOf;
    		if(localStorage.c) indOf = localStorage.c.indexOf(st.split(":")[0]+":");
    		else indOf=-1;
    		if(indOf>-1){
                var lsc = localStorage.c.split(";"), toRepl;
                for(toRepl=1; lsc[toRepl].split(":")[0]!=st.split(":")[0].slice(1); ++toRepl);
                localStorage.c = localStorage.c.replace(lsc[toRepl], st.slice(1));
    		}else localStorage.c+=st;
    	}else if(load=="t"){
    		for(var i=0; i<$("#challengeList").children().length;++i){
                st+=";"+$("#challengeList").children().eq(i).text();
    		}
    		localStorage.t=st;
    	}
	}
}

function Utils(){
	//Sort
	$("#challengeList").sortable({
      placeholder: "ui-state-highlight"
    });
	//Change name
/*	$("#challengeList").on("click","li",function(){
		var i=$(this).parent().index()
		$("#changer").fadeIn()
		$("#blank").fadeIn()
		var t = false
		$("form input").on("keydown", function(e){
			if(e.keyCode==27){
				$("#changer").fadeOut()
				$("#blank").fadeOut()
			}
		})
		$("form").submit(function(ev){
			ev.preventDefault()
			if(t==false){
				var v = $(this).children().last().val()
				RefreshName(i, v)
				$("#changer").fadeOut()
				$("#blank").fadeOut()
				$(this).children().last().val("")
				t=true
			}
		})
	})*/

	//Stop adding
	$("textarea").bind("keydown",function(e){
		if(e.keyCode==27){
            
            
			$("textarea").fadeToggle();
			for(var i=0; i<$("#trnmt div").length;++i){
                if(!parseInt($("#trnmt div").eq(i).css("opacity"))) $("#trnmt div").eq(i).addClass("hid");
			}
			//$("#blank").fadeToggle();
			//$("#lvlteller").fadeToggle();
			//SqueakyLines();
			//$("#trnmt").children().first().fadeOut();
			
			//$(".name").draggable()
			
			//////////////LastInLine()/////////////
			for(var i=0; i<$("#container").children(".lvl").last().children(".match").length; ++i){

                var lastInLine = $("#container").children(".lvl").last().children(".match").eq(i);
                if(lastInLine.data().enabled)
                    lastInLine.find("output").spinner({min: 0, max: 2});
                else lastInLine.data().ascender.parent().data().GetReady(lastInLine.data().ascender);
			}
			Storage("t");
			
			//Slide list
            $("#sider").mouseenter(function(){
                $(this).animate({left: "0px"}, {queue: false});
            }).mouseleave(function(){
                $(this).animate({left: "-190px"}, {queue: false});
            }).animate({left: "-190px"}, {queue: false});
            //mousewheel
			$(".challenge").on("mousewheel",">span", function(e){
                var fiui= e.originalEvent.deltaY/-100;
				e.preventDefault();
                $(this).children("output").spinner("stepUp", fiui);
			});
			$(".match:not(#grandfinal) .challenge").on("spin", "span output", function(e, ui) {
                Binding($(this), ui.value);
			});
			$("#grandfinal .challenge").on("spin", "span output", function(e, ui) {
                GrandBinding($(this), ui.value);
			});
		}
	});

	$("#trash").on("click", function(){
		localStorage.clear();
	})

	//drag dead
	/*$("#trash").on("click",function(){
		localStorage.removeItem("c")
		localStorage.removeItem("t")
		$("#trnmt").children().first().text("que sarra si fue accidental")
		$("#trnmt").children().first().fadeIn(400, function(){
				$("#trnmt").children().first().delay(1000).fadeOut()
			})
	})*/
	
}

function Binding(oput, newvl){
    var max = oput.spinner("option", "max");
    var chall = oput.parent().parent();
    var who = chall.children(".someone");
    var match = chall.parent();
    var lvl = match.parent();
    var trnmt = lvl.parent();
    var oldvl = oput.spinner("value");
    var ascender, loser, loseTo;
    
    chall.data().wins=newvl;
    if(oldvl<max && newvl==max){
        ascender=match.data().ascender;
        loser=chall.siblings(".challenge");
        
        if(lvl.index() !== trnmt.children(".lvl").length-1){
            chall.data().descender.find(".winner").find("output").spinner("disable");
            ++chall.data().descender.data().seals;
            chall.siblings(".challenge").data().descender.find(".winner").find("output").spinner("disable");
            ++chall.siblings(".challenge").data().descender.data().seals;
        }
        loser.find("output").spinner("disable");
        
        chall.addClass("winner");
        loser.addClass("loser");
        ascender.data().who=chall.data().who;
        chall.data().who.data().fights.push(ascender);
        if(trnmt.attr("id")=="container"){
            loseTo=match.data().loseTo;
            
            loseTo.data().loseFrom=loser;
            loseTo.data().who=loser.data().who;
            loser.data().who.data().fights.push(match.data().loseTo);
            
            loseTo.children(".someone").text(loser.data().who.text());
            loseTo.parent().data().GetReady(loseTo);
        }else loser.data().who.data().state=false;
        
        ascender.children(".someone").text(chall.data().who.text());
        ascender.animate({opacity:1}, {queue: false});
        ascender.parent().data().GetReady(ascender);
        match.data().winner=chall.data().who;
        
        //SqueakyLines({winner: chall, isnIt: true});
        
    }else if(oldvl==max && newvl<max){
        ascender=match.data().ascender;
        loser=chall.siblings(".challenge");
        chall.removeClass("winner");
        loser.removeClass("loser");
        
        if(lvl.index() !== trnmt.children(".lvl").length-1){
            if(!--chall.data().descender.data().seals)
                chall.data().descender.find(".challenge:not(.loser) > span > output").spinner("enable");
            if(!--chall.siblings(".challenge").data().descender.data().seals)
                chall.siblings(".challenge").data().descender.find(".challenge:not(.loser) > span > output").spinner("enable");
        }
        loser.find("output").spinner("enable");
       
        ascender.data().who=0;
        chall.data().who.data().fights.pop();
        if(trnmt.attr("id")=="container"){
            loseTo=match.data().loseTo;
            
            loser.data().who.data().fights.pop();
            loseTo.data().who=0;
            
            loseTo.children(".someone").text("");
            loseTo.parent().data().GetReady(loseTo, false);
            loseTo.children(".someone").text(chall.parent().data().name + " Loser");
        }else loser.data().who.data().state=true;
        
        ascender.children(".someone").text("");
        ascender.animate({opacity:0});
        ascender.parent().data().GetReady(ascender, false);
        match.data().winner=0;
        
        //SqueakyLines({winner: chall, isnIt: false});
    }
    Storage(match);
}

function GrandBinding(oput, newvl){
    var max = oput.spinner("option", "max");
    var chall = oput.parent().parent();
    var who = chall.children(".someone");
    var match = chall.parent();
    var oldvl = oput.spinner("value");
    var loser;
    
    chall.data().wins=newvl;
    //Win
    if(oldvl<max && newvl==max){
        //ascender=match.data().ascender;
        loser=chall.siblings(".challenge");
        
        chall.data().descender.find(".winner").find("output").spinner("disable");
        ++chall.data().descender.data().seals;
        loser.data().descender.find(".winner").find("output").spinner("disable");
        ++loser.data().descender.data().seals;

        loser.find("output").spinner("disable");
        
        chall.addClass("winner");
        loser.addClass("loser");
        if(chall.index("#grandfinal .challenge") == 1){
        		
            $("#grandfinal").clone().appendTo("#trnmt").attr("id", "gf2");
            var gf2left = $("#trnmt").offset().left + $("#trnmt").width();
            $("#gf2").css({position: "absolute", left: gf2left});
            $("#gf2").addClass("ready");
            $("#gf2").children(".challenge").removeClass("winner loser");
            $("#gf2").find("a").remove();
            $("#gf2").find("output").unwrap().spinner().spinner("value", 0);
            $("#gf2").data({sName: "GF2"});
            $("#gf2").children(".blockname").text("GF2").on("click", function(){
				var mtch=$(this).parent();
				if(mtch.hasClass("ready")){
					if($(this).siblings().hasClass("winner")) mtch.children(".blockname").css({backgroundColor: "#d1d1d1", color: "gray"});
					else mtch.children(".blockname").css({backgroundColor: "orange", color: "white"});
				}
			});
			
			$("#gf2").children(".challenge").eq(0).data().who=$("#grandfinal").children(".challenge").eq(0).data().who;
			$("#gf2").children(".challenge").eq(1).data().who=$("#grandfinal").children(".challenge").eq(1).data().who;
        		
        		$("#gf2").find("output").on("spin", function(e, ui) {
    				var max = $(this).spinner("option", "max");
					var chall = $(this).parent().parent();
					var who = chall.children(".someone");
					var match = chall.parent();
					var oldvl = $(this).spinner("value");
					var loser=chall.siblings(".challenge"), uiv = ui.value;
					chall.data().wins=uiv;
					if(oldvl==max-1 && uiv==max){
						$("#grandfinal .winner output").spinner("disable");
						loser.find("output").spinner("disable");
						chall.addClass("winner");
        				loser.addClass("loser");
					}else if(oldvl==max && uiv==max-1){
						chall.removeClass("winner");
    					loser.removeClass("loser");
                    	$("#grandfinal .winner output").spinner("enable");
                    	loser.find("output").spinner("enable");
					}
        		}).on("spinstop", function(){
					$(this).parents(".match").children(".blockname").trigger("click");
				});
						
    		chall.data().who.data().fights.push($("#gf2 .challenge").eq(1));
            loser.data().who.data().fights.push($("#gf2 .challenge").eq(0));
        }else loser.data().who.data().state=false; //Congratulations!();
        
        match.data().winner=chall.data().who;
     //Unwin
    }else if(oldvl==max && newvl<max){
        loser=chall.siblings(".challenge");
        chall.removeClass("winner");
        loser.removeClass("loser");
        
            if(!--chall.data().descender.data().seals)

                chall.data().descender.find(".challenge:not(.loser) > span > output").spinner("enable");
            if(!--loser.data().descender.data().seals)
                loser.data().descender.find(".challenge:not(.loser) > span > output").spinner("enable");

        loser.find("output").spinner("enable");
       
        chall.data().who.data().fights.pop();
        if(chall.index("#grandfinal .challenge") == 1){
            $("#gf2").remove();
            
            loser.data().who.data().fights.pop();
        }else loser.data().who.data().state=true;
        
        match.data().winner=0;
        
    }
    Storage(match);
}


window.onload = function() {
    Tree();
    Utils();
    Storage();
    $("textarea").keydown(function(e) {
        if (e.keyCode == 13){
            e.preventDefault();
            if($("textarea").val()){
                var newC = $("textarea").val();
                $("textarea").val("");
                
                $("#challengeList").append("<li class='challenger ui-state-default'>" + newC + "</li>");
                var ch = $("#challengeList").children(".challenger").last();
                ch.data({
                    name: newC,
                    start: 0,
                    fights: []
                });
                $("#trnmt").animate({opacity: 1}, {queue: false});
                $("#trnmt").data().AppendChallenger(ch);
            }
        }
    });
};

window.onresize = function(){
    var winH = $(window).height();
    var winW = $(window).width();
    var trnmtTop = (winH - $("#trnmt").height())/2;
    var trnmtLeft = (winW - $("#trnmt").width())/2;
    if(trnmtTop<70) trnmtTop=70;
    if(trnmtLeft<10) trnmtLeft=10;
    $("#trnmt").css({left: trnmtLeft});
    $("#trnmt").css({top: trnmtTop});
};
