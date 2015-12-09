/*
 jCanvas v14.03.19
 Copyright 2014 Caleb Evans
 Released under the MIT license
*/
(function(g,xa,ya,Va,ea,ga,oa,p,x,k,l){function L(d){var c;if(M.future.inheritance)for(c in d)d.hasOwnProperty(c)&&(this[c]=d[c]);else Y(this,d)}function M(d){var c;if(d)Y(ba,d);else for(c in ba)ba.hasOwnProperty(c)&&delete ba[c];oa&&oa.warn&&!za.jCanvas&&(za.jCanvas=p,oa.warn("The jCanvas() method has been deprecated and will be removed in a future release."));return this}function Aa(){}function la(d){return"string"===ca(d)}function I(d){return d&&d.getContext?d.getContext("2d"):k}function ma(d){d=
Y({},d);d.masks=d.masks.slice(0);return d}function ha(d,c){var a;d.save();a=ma(c.transforms);c.savedTransforms.push(a)}function Ba(d,c,a,b){a[b]&&(fa(a[b])?c[b]=a[b].call(d,a):c[b]=a[b])}function T(d,c,a){Ba(d,c,a,"fillStyle");Ba(d,c,a,"strokeStyle");c.lineWidth=a.strokeWidth;a.rounded?c.lineCap=c.lineJoin="round":(c.lineCap=a.strokeCap,c.lineJoin=a.strokeJoin,c.miterLimit=a.miterLimit);c.shadowOffsetX=a.shadowX;c.shadowOffsetY=a.shadowY;c.shadowBlur=a.shadowBlur;c.shadowColor=a.shadowColor;c.globalAlpha=
a.opacity;c.globalCompositeOperation=a.compositing;a.imageSmoothing&&(c.webkitImageSmoothingEnabled=c.mozImageSmoothingEnabled=a.imageSmoothing)}function Ca(d,c,a){a.mask&&(a.autosave&&ha(d,c),d.clip(),c.transforms.masks.push(a._args))}function Z(d,c,a){a.closed&&c.closePath();a.shadowStroke&&0!==a.strokeWidth?(c.stroke(),c.fill(),c.shadowColor="transparent",c.shadowBlur=0,c.stroke()):(c.fill(),"transparent"!==a.fillStyle&&(c.shadowColor="transparent"),0!==a.strokeWidth&&c.stroke());a.closed||c.closePath();
a._transformed&&c.restore();a.mask&&(d=F(d),Ca(c,d,a))}function Da(d,c,a){c._toRad=c.inDegrees?D/180:1;d.translate(c.x,c.y);d.rotate(c.rotate*c._toRad);d.translate(-c.x,-c.y);a&&(a.rotate+=c.rotate*c._toRad)}function Ea(d,c,a){1!==c.scale&&(c.scaleX=c.scaleY=c.scale);d.translate(c.x,c.y);d.scale(c.scaleX,c.scaleY);d.translate(-c.x,-c.y);a&&(a.scaleX*=c.scaleX,a.scaleY*=c.scaleY)}function Fa(d,c,a){c.translate&&(c.translateX=c.translateY=c.translate);d.translate(c.translateX,c.translateY);a&&(a.translateX+=
c.translateX,a.translateY+=c.translateY)}function S(d,c,a,b,h){a._toRad=a.inDegrees?D/180:1;a._transformed=p;c.save();a.fromCenter||a._centered||b===l||(h===l&&(h=b),a.x+=b/2,a.y+=h/2,a._centered=p);a.rotate&&Da(c,a,k);1===a.scale&&1===a.scaleX&&1===a.scaleY||Ea(c,a,k);(a.translate||a.translateX||a.translateY)&&Fa(c,a,k)}function F(d){var c=da.dataCache,a;c._canvas===d&&c._data?a=c._data:(a=g.data(d,"jCanvas"),a||(a={canvas:d,layers:[],layer:{names:{},groups:{}},eventHooks:{},intersecting:[],lastIntersected:k,
cursor:g(d).css("cursor"),drag:{layer:k,dragging:x},event:{type:k,x:k,y:k},events:{},transforms:ma(pa),savedTransforms:[],animating:x,animated:k,pixelRatio:1,scaled:x},g.data(d,"jCanvas",a)),c._canvas=d,c._data=a);return a}function Ga(d,c,a){for(var b in M.events)M.events.hasOwnProperty(b)&&(a[b]||a.cursors&&a.cursors[b])&&Ha(d,c,a,b)}function Ha(d,c,a,b){window.ontouchstart!==l&&$.touchEvents[b]&&(b=$.touchEvents[b]);M.events[b](d,c);a._event=p}function Ia(d,c,a){var b,h,f;if(a.draggable||a.cursors){b=
["mousedown","mousemove","mouseup"];for(f=0;f<b.length;f+=1)h=b[f],Ha(d,c,a,h);c.events.mouseoutdrag||(d.bind("mouseout.jCanvas",function(){var a=c.drag.layer;a&&(c.drag={},P(d,c,a,"dragcancel"),d.drawLayers())}),c.events.mouseoutdrag=p);a._event=p}}function qa(d,c,a,b){d=c.layer.names;b?b.name!==l&&la(a.name)&&a.name!==b.name&&delete d[a.name]:b=a;la(b.name)&&(d[b.name]=a)}function ra(d,c,a,b){d=c.layer.groups;var h,f,m,g;if(!b)b=a;else if(b.groups!==l&&a.groups!==k)for(f=0;f<a.groups.length;f+=
1)if(h=a.groups[f],c=d[h]){for(g=0;g<c.length;g+=1)if(c[g]===a){m=g;c.splice(g,1);break}0===c.length&&delete d[h]}if(b.groups!==l&&b.groups!==k)for(f=0;f<b.groups.length;f+=1)h=b.groups[f],c=d[h],c||(c=d[h]=[],c.name=h),m===l&&(m=c.length),c.splice(m,0,a)}function sa(d,c,a,b,h){b[a]&&c._running&&!c._running[a]&&(c._running[a]=p,b[a].call(d[0],c,h),c._running[a]=x)}function P(d,c,a,b,h){if(!a.disableEvents){if("mouseout"!==b){var f;a.cursors&&(f=a.cursors[b]);-1!==g.inArray(f,X.cursors)&&(f=X.prefix+
f);f&&d.css({cursor:f})}sa(d,a,b,a,h);sa(d,a,b,c.eventHooks,h);sa(d,a,b,M.eventHooks,h)}}function O(d,c,a,b){var h,f=c._layer?a:c;c._args=a;if(c.draggable||c.dragGroups)c.layer=p,c.draggable=p;c._method=b?b:c.method?g.fn[c.method]:c.type?g.fn[$.drawings[c.type]]:function(){};c.layer&&!c._layer&&(a=g(d),b=F(d),h=b.layers,f.name===k||la(f.name)&&b.layer.names[f.name]===l)&&(f=new L(c),f.canvas=d,f.$canvas=g(d),f.layer=p,f._layer=p,f._running={},f.data=f.data!==k?Y({},f.data):{},f.groups=f.groups!==
k?f.groups.slice(0):[],qa(a,b,f),ra(a,b,f),Ga(a,b,f),Ia(a,b,f),c._event=f._event,f._method===g.fn.drawText&&a.measureText(f),f.index===k&&(f.index=h.length),h.splice(f.index,0,f),c._args=f,P(a,b,f,"add"));return f}function Ja(d,c){var a,b;for(b=0;b<X.props.length;b+=1)a=X.props[b],d[a]!==l&&(d["_"+a]=d[a],X.propsObj[a]=p,c&&delete d[a])}function Wa(d,c,a){var b,h,f,m;for(b in a)if(a.hasOwnProperty(b)&&(h=a[b],fa(h)&&(a[b]=h.call(d,c,b)),"object"===ca(h))){for(f in h)h.hasOwnProperty(f)&&(m=h[f],c[b]!==
l&&(c[b+"."+f]=c[b][f],a[b+"."+f]=m));delete a[b]}return a}function Ka(d){var c,a,b=[],h=1;d.match(/^([a-z]+|#[0-9a-f]+)$/gi)&&("transparent"===d&&(d="rgba(0,0,0,0)"),a=xa.head,c=a.style.color,a.style.color=d,d=g.css(a,"color"),a.style.color=c);d.match(/^rgb/gi)&&(b=d.match(/(\d+(\.\d+)?)/gi),d.match(/%/gi)&&(h=2.55),b[0]*=h,b[1]*=h,b[2]*=h,b[3]=b[3]!==l?ga(b[3]):1);return b}function Xa(d){var c=3,a;"array"!==ca(d.start)&&(d.start=Ka(d.start),d.end=Ka(d.end));d.now=[];if(1!==d.start[3]||1!==d.end[3])c=
4;for(a=0;a<c;a+=1)d.now[a]=d.start[a]+(d.end[a]-d.start[a])*d.pos,3>a&&(d.now[a]=Ya(d.now[a]));1!==d.start[3]||1!==d.end[3]?d.now="rgba("+d.now.join(",")+")":(d.now.slice(0,3),d.now="rgb("+d.now.join(",")+")");d.elem.nodeName?d.elem.style[d.prop]=d.now:d.elem[d.prop]=d.now}function Za(d){M.events[d]=function(c,a){var b,h;h=a.event;b="mouseover"===d||"mouseout"===d?"mousemove":d;a.events[b]||(c.bind(b+".jCanvas",function(a){h.x=a.offsetX;h.y=a.offsetY;h.type=b;h.event=a;c.drawLayers({resetFire:p});
a.preventDefault()}),a.events[b]=p)}}function U(d,c,a){var b,h,f,m;if(a=a._args)d=F(d),b=d.event,b.x!==k&&b.y!==k&&(f=b.x*d.pixelRatio,m=b.y*d.pixelRatio,h=c.isPointInPath(f,m)||c.isPointInStroke&&c.isPointInStroke(f,m)),c=d.transforms,a.eventX=a.mouseX=b.x,a.eventY=a.mouseY=b.y,a.event=b.event,b=d.transforms.rotate,f=a.eventX,m=a.eventY,0!==b?(a._eventX=f*Q(-b)-m*V(-b),a._eventY=m*Q(-b)+f*V(-b)):(a._eventX=f,a._eventY=m),a._eventX/=c.scaleX,a._eventY/=c.scaleY,h&&d.intersecting.push(a),a.intersects=
h}function La(d){for(;0>d;)d+=2*D;return d}function Ma(d,c,a,b){var h,f,m,g,B,u,k;a===b?k=u=0:(u=a.x,k=a.y);b.inDegrees||360!==b.end||(b.end=2*D);b.start*=a._toRad;b.end*=a._toRad;b.start-=D/2;b.end-=D/2;B=D/180*1;b.ccw&&(B*=-1);h=b.x+b.radius*Q(b.start+B);f=b.y+b.radius*V(b.start+B);m=b.x+b.radius*Q(b.start);g=b.y+b.radius*V(b.start);ia(d,c,a,b,h,f,m,g);c.arc(b.x+u,b.y+k,b.radius,b.start,b.end,b.ccw);h=b.x+b.radius*Q(b.end+B);B=b.y+b.radius*V(b.end+B);f=b.x+b.radius*Q(b.end);m=b.y+b.radius*V(b.end);
ja(d,c,a,b,f,m,h,B)}function Na(d,c,a,b,h,f,m,g){var B,u;b.arrowRadius&&!a.closed&&(u=$a(g-f,m-h),u-=D,d=a.strokeWidth*Q(u),B=a.strokeWidth*V(u),a=m+b.arrowRadius*Q(u+b.arrowAngle/2),h=g+b.arrowRadius*V(u+b.arrowAngle/2),f=m+b.arrowRadius*Q(u-b.arrowAngle/2),b=g+b.arrowRadius*V(u-b.arrowAngle/2),c.moveTo(a-d,h-B),c.lineTo(m-d,g-B),c.lineTo(f-d,b-B),c.moveTo(m-d,g-B),c.lineTo(m+d,g+B),c.moveTo(m,g))}function ia(d,c,a,b,h,f,m,g){b._arrowAngleConverted||(b.arrowAngle*=a._toRad,b._arrowAngleConverted=
p);b.startArrow&&Na(d,c,a,b,h,f,m,g)}function ja(d,c,a,b,h,f,m,g){b._arrowAngleConverted||(b.arrowAngle*=a._toRad,b._arrowAngleConverted=p);b.endArrow&&Na(d,c,a,b,h,f,m,g)}function Oa(d,c,a,b){var h,f,m;h=2;ia(d,c,a,b,b.x2+a.x,b.y2+a.y,b.x1+a.x,b.y1+a.y);for(b.x1!==l&&b.y1!==l&&c.moveTo(b.x1+a.x,b.y1+a.y);p;)if(f=b["x"+h],m=b["y"+h],f!==l&&m!==l)c.lineTo(f+a.x,m+a.y),h+=1;else break;h-=1;ja(d,c,a,b,b["x"+(h-1)]+a.x,b["y"+(h-1)]+a.y,b["x"+h]+a.x,b["y"+h]+a.y)}function Pa(d,c,a,b){var h,f,m,g,B;h=2;
ia(d,c,a,b,b.cx1+a.x,b.cy1+a.y,b.x1+a.x,b.y1+a.y);for(b.x1!==l&&b.y1!==l&&c.moveTo(b.x1+a.x,b.y1+a.y);p;)if(f=b["x"+h],m=b["y"+h],g=b["cx"+(h-1)],B=b["cy"+(h-1)],f!==l&&m!==l&&g!==l&&B!==l)c.quadraticCurveTo(g+a.x,B+a.y,f+a.x,m+a.y),h+=1;else break;h-=1;ja(d,c,a,b,b["cx"+(h-1)]+a.x,b["cy"+(h-1)]+a.y,b["x"+h]+a.x,b["y"+h]+a.y)}function Qa(d,c,a,b){var h,f,m,g,B,u,k,K;h=2;f=1;ia(d,c,a,b,b.cx1+a.x,b.cy1+a.y,b.x1+a.x,b.y1+a.y);for(b.x1!==l&&b.y1!==l&&c.moveTo(b.x1+a.x,b.y1+a.y);p;)if(m=b["x"+h],g=b["y"+
h],B=b["cx"+f],u=b["cy"+f],k=b["cx"+(f+1)],K=b["cy"+(f+1)],m!==l&&g!==l&&B!==l&&u!==l&&k!==l&&K!==l)c.bezierCurveTo(B+a.x,u+a.y,k+a.x,K+a.y,m+a.x,g+a.y),h+=1,f+=2;else break;h-=1;f-=2;ja(d,c,a,b,b["cx"+(f+1)]+a.x,b["cy"+(f+1)]+a.y,b["x"+h]+a.x,b["y"+h]+a.y)}function Ra(d,c,a){c*=d._toRad;c-=D/2;return a*Q(c)}function Sa(d,c,a){c*=d._toRad;c-=D/2;return a*V(c)}function Ta(d,c,a,b){var h,f,m,g,k,u,aa;a===b?k=g=0:(g=a.x,k=a.y);h=1;f=g=u=b.x+g;m=k=aa=b.y+k;ia(d,c,a,b,f+Ra(a,b.a1,b.l1),m+Sa(a,b.a1,b.l1),
f,m);for(b.x!==l&&b.y!==l&&c.moveTo(f,m);p;)if(f=b["a"+h],m=b["l"+h],f!==l&&m!==l)g=u,k=aa,u+=Ra(a,f,m),aa+=Sa(a,f,m),c.lineTo(u,aa),h+=1;else break;ja(d,c,a,b,g,k,u,aa)}function ta(d,c,a){isNaN(Number(a.fontSize))||(a.fontSize+="px");c.font=a.fontStyle+" "+a.fontSize+" "+a.fontFamily}function ua(d,c,a,b){var h,f;h=da.propCache;if(h.text===a.text&&h.fontStyle===a.fontStyle&&h.fontSize===a.fontSize&&h.fontFamily===a.fontFamily&&h.maxWidth===a.maxWidth&&h.lineHeight===a.lineHeight)a.width=h.width,a.height=
h.height;else{a.width=c.measureText(b[0]).width;for(f=1;f<b.length;f+=1)h=c.measureText(b[f]).width,h>a.width&&(a.width=h);c=d.style.fontSize;d.style.fontSize=a.fontSize;a.height=ga(g.css(d,"fontSize"))*b.length*a.lineHeight;d.style.fontSize=c}}function Ua(d,c){var a=c.maxWidth,b=c.text.split("\n"),h=[],f,m,g,k,u;for(g=0;g<b.length;g+=1){k=b[g];u=k.split(" ");f=[];m="";if(1===u.length||d.measureText(k).width<a)f=[k];else{for(k=0;k<u.length;k+=1)d.measureText(m+u[k]).width>a&&(""!==m&&f.push(m),m=
""),m+=u[k],k!==u.length-1&&(m+=" ");f.push(m)}h=h.concat(f.join("\n").replace(/( (\n))|( $)/gi,"$2").split("\n"))}return h}var na,ba,Y=g.extend,ka=g.inArray,ca=g.type,fa=g.isFunction,D=ea.PI,Ya=ea.round,ab=ea.abs,V=ea.sin,Q=ea.cos,$a=ea.atan2,va=Va.prototype.slice,bb=g.event.fix,$={},da={dataCache:{},propCache:{},imageCache:{}},pa={rotate:0,scaleX:1,scaleY:1,translateX:0,translateY:0,masks:[]},za={jCanvas:x},X={};g.fn.jCanvas=M;M.events={};M.eventHooks={};M.future={inheritance:!1};na=new function(){Y(this,
{align:"center",arrowAngle:90,arrowRadius:0,autosave:p,baseline:"middle",bringToFront:x,ccw:x,closed:x,compositing:"source-over",concavity:0,cornerRadius:0,count:1,cropFromCenter:p,crossOrigin:"",cursors:k,disableEvents:x,draggable:x,dragGroups:k,groups:k,data:k,dx:k,dy:k,end:360,eventX:k,eventY:k,fillStyle:"transparent",fontStyle:"normal",fontSize:"12pt",fontFamily:"sans-serif",fromCenter:p,height:k,imageSmoothing:p,inDegrees:p,index:k,lineHeight:1,layer:x,mask:x,maxWidth:k,miterLimit:10,name:k,
opacity:1,r1:k,r2:k,radius:0,repeat:"repeat",respectAlign:x,rotate:0,rounded:x,scale:1,scaleX:1,scaleY:1,shadowBlur:0,shadowColor:"transparent",shadowStroke:x,shadowX:0,shadowY:0,sHeight:k,sides:0,source:"",letterSpacing:k,spread:0,start:0,strokeCap:"butt",strokeJoin:"miter",strokeStyle:"transparent",strokeWidth:1,sWidth:k,sx:k,sy:k,text:"",translate:0,translateX:0,translateY:0,type:k,visible:p,width:k,x:0,y:0})};Aa.prototype=na;ba=new Aa;L.prototype=ba;M.extend=function(d){d.name&&(d.props&&Y(na,
d.props),g.fn[d.name]=function a(b){var h,f,m,g;for(f=0;f<this.length;f+=1)if(h=this[f],m=I(h))g=new L(b),O(h,g,b,a),T(h,m,g),d.fn.call(h,m,g);return this},d.type&&($.drawings[d.type]=d.name));return g.fn[d.name]};g.fn.getEventHooks=function(){var d;d={};0!==this.length&&(d=this[0],d=F(d),d=d.eventHooks);return d};g.fn.setEventHooks=function(d){var c,a;for(c=0;c<this.length;c+=1)g(this[c]),a=F(this[c]),Y(a.eventHooks,d);return this};g.fn.getLayers=function(d){var c,a,b,h,f=[];if(0!==this.length)if(c=
this[0],a=F(c),a=a.layers,fa(d))for(h=0;h<a.length;h+=1)b=a[h],d.call(c,b)&&f.push(b);else f=a;return f};g.fn.getLayer=function(d){var c,a,b,h;if(0!==this.length)if(c=this[0],a=F(c),c=a.layers,h=ca(d),d&&d.layer)b=d;else if("number"===h)0>d&&(d=c.length+d),b=c[d];else if("regexp"===h)for(a=0;a<c.length;a+=1){if(la(c[a].name)&&c[a].name.match(d)){b=c[a];break}}else b=a.layer.names[d];return b};g.fn.getLayerGroup=function(d){var c,a,b,h=ca(d);if(0!==this.length)if(c=this[0],"array"===h)b=d;else if("regexp"===
h)for(a in c=F(c),c=c.layer.groups,c){if(a.match(d)){b=c[a];break}}else c=F(c),b=c.layer.groups[d];return b};g.fn.getLayerIndex=function(d){var c=this.getLayers();d=this.getLayer(d);return ka(d,c)};g.fn.setLayer=function(d,c){var a,b,h,f,m,k,B;for(b=0;b<this.length;b+=1)if(a=g(this[b]),h=F(this[b]),f=g(this[b]).getLayer(d)){qa(a,h,f,c);ra(a,h,f,c);for(m in c)c.hasOwnProperty(m)&&(k=c[m],B=ca(k),"object"===B?f[m]=Y({},k):"array"===B?f[m]=k.slice(0):"string"===B?0===k.indexOf("+=")?f[m]+=ga(k.substr(2)):
0===k.indexOf("-=")?f[m]-=ga(k.substr(2)):f[m]=k:f[m]=k);Ga(a,h,f);Ia(a,h,f);g.isEmptyObject(c)===x&&P(a,h,f,"change",c)}return this};g.fn.setLayers=function(d,c){var a,b,h,f;for(b=0;b<this.length;b+=1)for(a=g(this[b]),h=a.getLayers(c),f=0;f<h.length;f+=1)a.setLayer(h[f],d);return this};g.fn.setLayerGroup=function(d,c){var a,b,h,f;for(b=0;b<this.length;b+=1)if(a=g(this[b]),h=a.getLayerGroup(d))for(f=0;f<h.length;f+=1)a.setLayer(h[f],c);return this};g.fn.moveLayer=function(d,c){var a,b,h,f,m;for(b=
0;b<this.length;b+=1)if(a=g(this[b]),h=F(this[b]),f=h.layers,m=a.getLayer(d))m.index=ka(m,f),f.splice(m.index,1),f.splice(c,0,m),0>c&&(c=f.length+c),m.index=c,P(a,h,m,"move");return this};g.fn.removeLayer=function(d){var c,a,b,h,f;for(a=0;a<this.length;a+=1)if(c=g(this[a]),b=F(this[a]),h=c.getLayers(),f=c.getLayer(d))f.index=ka(f,h),h.splice(f.index,1),qa(c,b,f,{name:k}),ra(c,b,f,{groups:k}),P(c,b,f,"remove");return this};g.fn.removeLayers=function(d){var c,a,b,h,f,m;for(a=0;a<this.length;a+=1){c=
g(this[a]);b=F(this[a]);h=c.getLayers(d);for(m=0;m<h.length;m+=1)f=h[m],c.removeLayer(f),m-=1;b.layer.names={};b.layer.groups={}}return this};g.fn.removeLayerGroup=function(d){var c,a,b,h;if(d!==l)for(a=0;a<this.length;a+=1)if(c=g(this[a]),F(this[a]),c.getLayers(),b=c.getLayerGroup(d))for(b=b.slice(0),h=0;h<b.length;h+=1)c.removeLayer(b[h]);return this};g.fn.addLayerToGroup=function(d,c){var a,b,h,f=[c];for(b=0;b<this.length;b+=1)a=g(this[b]),h=a.getLayer(d),h.groups&&(f=h.groups.slice(0),-1===ka(c,
h.groups)&&f.push(c)),a.setLayer(h,{groups:f});return this};g.fn.removeLayerFromGroup=function(d,c){var a,b,h,f=[],m;for(b=0;b<this.length;b+=1)a=g(this[b]),h=a.getLayer(d),h.groups&&(m=ka(c,h.groups),-1!==m&&(f=h.groups.slice(0),f.splice(m,1),a.setLayer(h,{groups:f})));return this};X.cursors=["grab","grabbing","zoom-in","zoom-out"];X.prefix=function(){var d=getComputedStyle(xa.documentElement,"");return"-"+(va.call(d).join("").match(/-(moz|webkit|ms)-/)||""===d.OLink&&["","o"])[1]+"-"}();g.fn.triggerLayerEvent=
function(d,c){var a,b,h;for(b=0;b<this.length;b+=1)a=g(this[b]),h=F(this[b]),(d=a.getLayer(d))&&P(a,h,d,c);return this};g.fn.drawLayer=function(d){var c,a,b;for(c=0;c<this.length;c+=1)a=g(this[c]),I(this[c]),(b=a.getLayer(d))&&b.visible&&b._method&&(b._next=k,b._method.call(a,b));return this};g.fn.drawLayers=function(d){var c,a,b=Y({},d),h,f,m,J,B,u,aa;b.index||(b.index=0);for(c=0;c<this.length;c+=1)if(d=g(this[c]),a=I(this[c])){J=F(this[c]);b.clear!==x&&d.clearCanvas();a=J.layers;for(m=b.index;m<
a.length;m+=1)if(h=a[m],h.index=m,b.resetFire&&(h._fired=x),B=d,u=h,f=m+1,u&&u.visible&&u._method&&(u._next=f?f:k,u._method.call(B,u)),h._masks=J.transforms.masks.slice(0),h._method===g.fn.drawImage&&h.visible){aa=!0;break}if(aa)break;h=J;var K=f=u=B=void 0;B=k;for(u=h.intersecting.length-1;0<=u;u-=1)if(B=h.intersecting[u],B._masks){for(K=B._masks.length-1;0<=K;K-=1)if(f=B._masks[K],!f.intersects){B.intersects=x;break}if(B.intersects)break}h=B;B=J.event;u=B.type;if(J.drag.layer){f=d;var K=J,E=u,G=
void 0,q=void 0,z=void 0,t=z=void 0,y=void 0,z=G=G=z=void 0,z=K.drag,t=(q=z.layer)&&q.dragGroups||[],G=K.layers;if("mousemove"===E||"touchmove"===E){if(z.dragging||(z.dragging=p,q.dragging=p,q.bringToFront&&(G.splice(q.index,1),q.index=G.push(q)),q._startX=q.x,q._startY=q.y,q._endX=q._eventX,q._endY=q._eventY,P(f,K,q,"dragstart")),z.dragging)for(G=q._eventX-(q._endX-q._startX),z=q._eventY-(q._endY-q._startY),q.dx=G-q.x,q.dy=z-q.y,q.x=G,q.y=z,P(f,K,q,"drag"),G=0;G<t.length;G+=1)if(z=t[G],y=K.layer.groups[z],
q.groups&&y)for(z=0;z<y.length;z+=1)y[z]!==q&&(y[z].x+=q.dx,y[z].y+=q.dy)}else if("mouseup"===E||"touchend"===E)z.dragging&&(q.dragging=x,z.dragging=x,P(f,K,q,"dragstop")),K.drag={}}f=J.lastIntersected;f===k||h===f||!f._hovered||f._fired||J.drag.dragging||(J.lastIntersected=k,f._fired=p,f._hovered=x,P(d,J,f,"mouseout"),d.css({cursor:J.cursor}));h&&(h[u]||$.mouseEvents[u]&&(u=$.mouseEvents[u]),h._event&&h.intersects&&(J.lastIntersected=h,!(h.mouseover||h.mouseout||h.cursors)||J.drag.dragging||h._hovered||
h._fired||(h._fired=p,h._hovered=p,P(d,J,h,"mouseover")),h._fired||(h._fired=p,B.type=k,P(d,J,h,u)),!h.draggable||h.disableEvents||"mousedown"!==u&&"touchstart"!==u||(J.drag.layer=h)));h!==k||J.drag.dragging||d.css({cursor:J.cursor});m===a.length&&(J.intersecting.length=0,J.transforms=ma(pa),J.savedTransforms.length=0)}return this};g.fn.addLayer=function(d){var c,a;for(c=0;c<this.length;c+=1)if(a=I(this[c]))a=new L(d),a.layer=p,O(this[c],a,d);return this};X.props=["width","height","opacity","lineHeight"];
X.propsObj={};g.fn.animateLayer=function(){function d(a,b,c){return function(){var d,h;for(h=0;h<X.props.length;h+=1)d=X.props[h],c[d]=c["_"+d];for(var m in c)c.hasOwnProperty(m)&&-1!==m.indexOf(".")&&delete c[m];b.animating&&b.animated!==c||a.drawLayers();c._animating=x;b.animating=x;b.animated=k;f[4]&&f[4].call(a[0],c);P(a,b,c,"animateend")}}function c(a,b,c){return function(d,h){var m,g,k=!1;"_"===h.prop[0]&&(k=!0,h.prop=h.prop.replace("_",""),c[h.prop]=c["_"+h.prop]);-1!==h.prop.indexOf(".")&&
(m=h.prop.split("."),g=m[0],m=m[1],c[g]&&(c[g][m]=h.now));c._pos!==h.pos&&(c._pos=h.pos,c._animating||b.animating||(c._animating=p,b.animating=p,b.animated=c),b.animating&&b.animated!==c||a.drawLayers());f[5]&&f[5].call(a[0],d,h,c);P(a,b,c,"animate",h);k&&(h.prop="_"+h.prop)}}var a,b,h,f=va.call(arguments,0),m,J;"object"===ca(f[2])?(f.splice(2,0,f[2].duration||k),f.splice(3,0,f[3].easing||k),f.splice(4,0,f[4].complete||k),f.splice(5,0,f[5].step||k)):(f[2]===l?(f.splice(2,0,k),f.splice(3,0,k),f.splice(4,
0,k)):fa(f[2])&&(f.splice(2,0,k),f.splice(3,0,k)),f[3]===l?(f[3]=k,f.splice(4,0,k)):fa(f[3])&&f.splice(3,0,k));for(b=0;b<this.length;b+=1)if(a=g(this[b]),h=I(this[b]))h=F(this[b]),(m=a.getLayer(f[0]))&&m._method!==g.fn.draw&&(J=Y({},f[1]),J=Wa(this[b],m,J),Ja(J,p),Ja(m),m.style=X.propsObj,g(m).animate(J,{duration:f[2],easing:g.easing[f[3]]?f[3]:k,complete:d(a,h,m),step:c(a,h,m)}),P(a,h,m,"animatestart"));return this};g.fn.animateLayerGroup=function(d){var c,a,b=va.call(arguments,0),h,f;for(a=0;a<
this.length;a+=1)if(c=g(this[a]),h=c.getLayerGroup(d))for(f=0;f<h.length;f+=1)b[0]=h[f],c.animateLayer.apply(c,b);return this};g.fn.delayLayer=function(d,c){var a,b,h,f;c=c||0;for(b=0;b<this.length;b+=1)if(a=g(this[b]),h=F(this[b]),f=a.getLayer(d))g(f).delay(c),P(a,h,f,"delay");return this};g.fn.delayLayerGroup=function(d,c){var a,b,h,f,m;c=c||0;for(b=0;b<this.length;b+=1)if(a=g(this[b]),h=a.getLayerGroup(d))for(m=0;m<h.length;m+=1)f=h[m],a.delayLayer(f,c);return this};g.fn.stopLayer=function(d,c){var a,
b,h,f;for(b=0;b<this.length;b+=1)if(a=g(this[b]),h=F(this[b]),f=a.getLayer(d))g(f).stop(c),P(a,h,f,"stop");return this};g.fn.stopLayerGroup=function(d,c){var a,b,h,f,m;for(b=0;b<this.length;b+=1)if(a=g(this[b]),h=a.getLayerGroup(d))for(m=0;m<h.length;m+=1)f=h[m],a.stopLayer(f,c);return this};(function(d){var c;for(c=0;c<d.length;c+=1)g.fx.step[d[c]]=Xa})("color backgroundColor borderColor borderTopColor borderRightColor borderBottomColor borderLeftColor fillStyle outlineColor strokeStyle shadowColor".split(" "));
$.touchEvents={mousedown:"touchstart",mouseup:"touchend",mousemove:"touchmove"};$.mouseEvents={touchstart:"mousedown",touchend:"mouseup",touchmove:"mousemove"};(function(d){var c;for(c=0;c<d.length;c+=1)Za(d[c])})("click dblclick mousedown mouseup mousemove mouseover mouseout touchstart touchmove touchend".split(" "));g.event.fix=function(d){var c,a;d=bb.call(g.event,d);if(c=d.originalEvent)if(a=c.changedTouches,d.pageX!==l&&d.offsetX===l){if(c=g(d.currentTarget).offset())d.offsetX=d.pageX-c.left,
d.offsetY=d.pageY-c.top}else a&&(c=g(d.currentTarget).offset())&&(d.offsetX=a[0].pageX-c.left,d.offsetY=a[0].pageY-c.top);return d};$.drawings={arc:"drawArc",bezier:"drawBezier",ellipse:"drawEllipse","function":"draw",image:"drawImage",line:"drawLine",path:"drawPath",polygon:"drawPolygon",slice:"drawSlice",quadratic:"drawQuadratic",rectangle:"drawRect",text:"drawText",vector:"drawVector",save:"saveCanvas",restore:"restoreCanvas",rotate:"rotateCanvas",scale:"scaleCanvas",translate:"translateCanvas"};
g.fn.draw=function c(a){var b,h,f=new L(a);if($.drawings[f.type])this[$.drawings[f.type]](a);else for(b=0;b<this.length;b+=1)if(g(this[b]),h=I(this[b]))f=new L(a),O(this[b],f,a,c),f.visible&&f.fn&&f.fn.call(this[b],h,f);return this};g.fn.clearCanvas=function a(b){var h,f,m=new L(b);for(h=0;h<this.length;h+=1)if(f=I(this[h]))m.width===k||m.height===k?(f.save(),f.setTransform(1,0,0,1,0,0),f.clearRect(0,0,this[h].width,this[h].height),f.restore()):(O(this[h],m,b,a),S(this[h],f,m,m.width,m.height),f.clearRect(m.x-
m.width/2,m.y-m.height/2,m.width,m.height),m._transformed&&f.restore());return this};g.fn.saveCanvas=function b(h){var f,m,g,k,u;for(f=0;f<this.length;f+=1)if(m=I(this[f]))for(k=F(this[f]),g=new L(h),O(this[f],g,h,b),u=0;u<g.count;u+=1)ha(m,k);return this};g.fn.restoreCanvas=function h(f){var m,g,k,u,l;for(m=0;m<this.length;m+=1)if(g=I(this[m]))for(u=F(this[m]),k=new L(f),O(this[m],k,f,h),l=0;l<k.count;l+=1){var K=g,E=u;0===E.savedTransforms.length?E.transforms=ma(pa):(K.restore(),E.transforms=E.savedTransforms.pop())}return this};
g.fn.rotateCanvas=function f(m){var g,k,u,l;for(g=0;g<this.length;g+=1)if(k=I(this[g]))l=F(this[g]),u=new L(m),O(this[g],u,m,f),u.autosave&&ha(k,l),Da(k,u,l.transforms);return this};g.fn.scaleCanvas=function m(g){var k,u,l,K;for(k=0;k<this.length;k+=1)if(u=I(this[k]))K=F(this[k]),l=new L(g),O(this[k],l,g,m),l.autosave&&ha(u,K),Ea(u,l,K.transforms);return this};g.fn.translateCanvas=function J(g){var k,l,K,E;for(k=0;k<this.length;k+=1)if(l=I(this[k]))E=F(this[k]),K=new L(g),O(this[k],K,g,J),K.autosave&&
ha(l,E),Fa(l,K,E.transforms);return this};g.fn.drawRect=function B(g){var k,l,E,G,q,z,t,y,N;for(k=0;k<this.length;k+=1)if(l=I(this[k]))E=new L(g),O(this[k],E,g,B),E.visible&&(T(this[k],l,E),S(this[k],l,E,E.width,E.height),l.beginPath(),G=E.x-E.width/2,q=E.y-E.height/2,y=ab(E.cornerRadius),E.width&&E.height&&(y?(z=E.x+E.width/2,t=E.y+E.height/2,0>E.width&&(N=G,G=z,z=N),0>E.height&&(N=q,q=t,t=N),0>z-G-2*y&&(y=(z-G)/2),0>t-q-2*y&&(y=(t-q)/2),l.moveTo(G+y,q),l.lineTo(z-y,q),l.arc(z-y,q+y,y,3*D/2,2*D,
x),l.lineTo(z,t-y),l.arc(z-y,t-y,y,0,D/2,x),l.lineTo(G+y,t),l.arc(G+y,t-y,y,D/2,D,x),l.lineTo(G,q+y),l.arc(G+y,q+y,y,D,3*D/2,x),E.closed=p):l.rect(G,q,E.width,E.height)),U(this[k],l,E),Z(this[k],l,E));return this};g.fn.drawArc=function u(g){var k,l,G;for(k=0;k<this.length;k+=1)if(l=I(this[k]))G=new L(g),O(this[k],G,g,u),G.visible&&(T(this[k],l,G),S(this[k],l,G,2*G.radius),l.beginPath(),Ma(this[k],l,G,G),U(this[k],l,G),Z(this[k],l,G));return this};g.fn.drawEllipse=function aa(g){var k,l,q,z,t;for(k=
0;k<this.length;k+=1)if(l=I(this[k]))q=new L(g),O(this[k],q,g,aa),q.visible&&(T(this[k],l,q),S(this[k],l,q,q.width,q.height),z=4/3*q.width,t=q.height,l.beginPath(),l.moveTo(q.x,q.y-t/2),l.bezierCurveTo(q.x-z/2,q.y-t/2,q.x-z/2,q.y+t/2,q.x,q.y+t/2),l.bezierCurveTo(q.x+z/2,q.y+t/2,q.x+z/2,q.y-t/2,q.x,q.y-t/2),U(this[k],l,q),q.closed=p,Z(this[k],l,q));return this};g.fn.drawPolygon=function K(g){var k,q,l,t,y,N,R,A,v,n;for(k=0;k<this.length;k+=1)if(q=I(this[k]))if(l=new L(g),O(this[k],l,g,K),l.visible){T(this[k],
q,l);S(this[k],q,l,2*l.radius);y=2*D/l.sides;N=y/2;t=N+D/2;R=l.radius*Q(N);q.beginPath();for(n=0;n<l.sides;n+=1)A=l.x+l.radius*Q(t),v=l.y+l.radius*V(t),q.lineTo(A,v),l.concavity&&(A=l.x+(R+-R*l.concavity)*Q(t+N),v=l.y+(R+-R*l.concavity)*V(t+N),q.lineTo(A,v)),t+=y;U(this[k],q,l);l.closed=p;Z(this[k],q,l)}return this};g.fn.drawSlice=function E(k){var l,z,t,y,N;for(l=0;l<this.length;l+=1)if(g(this[l]),z=I(this[l]))t=new L(k),O(this[l],t,k,E),t.visible&&(T(this[l],z,t),S(this[l],z,t,2*t.radius),t.start*=
t._toRad,t.end*=t._toRad,t.start-=D/2,t.end-=D/2,t.start=La(t.start),t.end=La(t.end),t.end<t.start&&(t.end+=2*D),y=(t.start+t.end)/2,N=t.radius*t.spread*Q(y),y=t.radius*t.spread*V(y),t.x+=N,t.y+=y,z.beginPath(),z.arc(t.x,t.y,t.radius,t.start,t.end,t.ccw),z.lineTo(t.x,t.y),U(this[l],z,t),t.closed=p,Z(this[l],z,t));return this};g.fn.drawLine=function G(k){var g,l,y;for(g=0;g<this.length;g+=1)if(l=I(this[g]))y=new L(k),O(this[g],y,k,G),y.visible&&(T(this[g],l,y),S(this[g],l,y),l.beginPath(),Oa(this[g],
l,y,y),U(this[g],l,y),Z(this[g],l,y));return this};g.fn.drawQuadratic=function q(g){var k,l,N;for(k=0;k<this.length;k+=1)if(l=I(this[k]))N=new L(g),O(this[k],N,g,q),N.visible&&(T(this[k],l,N),S(this[k],l,N),l.beginPath(),Pa(this[k],l,N,N),U(this[k],l,N),Z(this[k],l,N));return this};g.fn.drawBezier=function z(k){var g,l,R;for(g=0;g<this.length;g+=1)if(l=I(this[g]))R=new L(k),O(this[g],R,k,z),R.visible&&(T(this[g],l,R),S(this[g],l,R),l.beginPath(),Qa(this[g],l,R,R),U(this[g],l,R),Z(this[g],l,R));return this};
g.fn.drawVector=function t(g){var k,l,A;for(k=0;k<this.length;k+=1)if(l=I(this[k]))A=new L(g),O(this[k],A,g,t),A.visible&&(T(this[k],l,A),S(this[k],l,A),l.beginPath(),Ta(this[k],l,A,A),U(this[k],l,A),Z(this[k],l,A));return this};g.fn.drawPath=function y(k){var g,A,v,n,w;for(g=0;g<this.length;g+=1)if(A=I(this[g]))if(v=new L(k),O(this[g],v,k,y),v.visible){T(this[g],A,v);S(this[g],A,v);A.beginPath();for(n=1;p;)if(w=v["p"+n],w!==l)w=new L(w),"line"===w.type?Oa(this[g],A,v,w):"quadratic"===w.type?Pa(this[g],
A,v,w):"bezier"===w.type?Qa(this[g],A,v,w):"vector"===w.type?Ta(this[g],A,v,w):"arc"===w.type&&Ma(this[g],A,v,w),n+=1;else break;U(this[g],A,v);Z(this[g],A,v)}return this};g.fn.drawText=function N(l){var A,v,n,w,W,s,C,p,H,x;for(A=0;A<this.length;A+=1)if(g(this[A]),v=I(this[A]))if(n=new L(l),w=O(this[A],n,l,N),n.visible){T(this[A],v,n);v.textBaseline=n.baseline;v.textAlign=n.align;ta(this[A],v,n);W=n.maxWidth!==k?Ua(v,n):n.text.toString().split("\n");ua(this[A],v,n,W);w&&(w.width=n.width,w.height=
n.height);S(this[A],v,n,n.width,n.height);C=n.x;"left"===n.align?n.respectAlign?n.x+=n.width/2:C-=n.width/2:"right"===n.align&&(n.respectAlign?n.x-=n.width/2:C+=n.width/2);if(n.radius)for(C=ga(n.fontSize),n.letterSpacing===k&&(n.letterSpacing=C/500),s=0;s<W.length;s+=1){v.save();v.translate(n.x,n.y);w=W[s];p=w.length;v.rotate(-(D*n.letterSpacing*(p-1))/2);for(x=0;x<p;x+=1)H=w[x],0!==x&&v.rotate(D*n.letterSpacing),v.save(),v.translate(0,-n.radius),v.fillText(H,0,0),v.restore();n.radius-=C;n.letterSpacing+=
C/(1E3*D);v.restore()}else for(s=0;s<W.length;s+=1)w=W[s],p=n.y+s*n.height/W.length-(W.length-1)*n.height/W.length/2,v.shadowColor=n.shadowColor,v.fillText(w,C,p),"transparent"!==n.fillStyle&&(v.shadowColor="transparent"),v.strokeText(w,C,p);p=0;"top"===n.baseline?p+=n.height/2:"bottom"===n.baseline&&(p-=n.height/2);n._event&&(v.beginPath(),v.rect(n.x-n.width/2,n.y-n.height/2+p,n.width,n.height),U(this[A],v,n),v.closePath());n._transformed&&v.restore()}da.propCache=n;return this};g.fn.measureText=
function(g){var k,l;k=this.getLayer(g);if(!k||k&&!k._layer)k=new L(g);if(g=I(this[0]))ta(this[e],g,k),l=Ua(g,k),ua(this[0],g,k,l);return k};g.fn.drawImage=function R(A){function v(l,n,v,r,s){return function(){var w=g(l);T(l,n,r);r.width===k&&r.sWidth===k&&(r.width=r.sWidth=H.width);r.height===k&&r.sHeight===k&&(r.height=r.sHeight=H.height);s&&(s.width=r.width,s.height=r.height);r.sWidth!==k&&r.sHeight!==k&&r.sx!==k&&r.sy!==k?(r.width===k&&(r.width=r.sWidth),r.height===k&&(r.height=r.sHeight),r.cropFromCenter||
(r.sx+=r.sWidth/2,r.sy+=r.sHeight/2),0>r.sy-r.sHeight/2&&(r.sy=r.sHeight/2),r.sy+r.sHeight/2>H.height&&(r.sy=H.height-r.sHeight/2),0>r.sx-r.sWidth/2&&(r.sx=r.sWidth/2),r.sx+r.sWidth/2>H.width&&(r.sx=H.width-r.sWidth/2),S(l,n,r,r.width,r.height),n.drawImage(H,r.sx-r.sWidth/2,r.sy-r.sHeight/2,r.sWidth,r.sHeight,r.x-r.width/2,r.y-r.height/2,r.width,r.height)):(S(l,n,r,r.width,r.height),n.drawImage(H,r.x-r.width/2,r.y-r.height/2,r.width,r.height));n.beginPath();n.rect(r.x-r.width/2,r.y-r.height/2,r.width,
r.height);U(l,n,r);n.closePath();r._transformed&&n.restore();Ca(n,v,r);r.layer?P(w,v,s,"load"):r.load&&r.load.call(w[0],s);r.layer&&(s._masks=v.transforms.masks.slice(0),r._next&&w.drawLayers({clear:x,resetFire:p,index:r._next}))}}var n,w,W,s,C,D,H,wa,M,Q=da.imageCache;for(w=0;w<this.length;w+=1)if(n=this[w],W=I(this[w]))s=F(this[w]),C=new L(A),D=O(this[w],C,A,R),C.visible&&(M=C.source,wa=M.getContext,M.src||wa?H=M:M&&(Q[M]!==l?H=Q[M]:(H=new ya,H.crossOrigin=C.crossOrigin,H.src=M,Q[M]=H)),H&&(H.complete||
wa?v(n,W,s,C,D)():(H.onload=v(n,W,s,C,D),H.src=H.src)));return this};g.fn.createPattern=function(l){function A(){s=n.createPattern(p,w.repeat);w.load&&w.load.call(v[0],s)}var v=this,n,w,p,s,C;(n=I(v[0]))?(w=new L(l),C=w.source,fa(C)?(p=g("<canvas />")[0],p.width=w.width,p.height=w.height,l=I(p),C.call(p,l),A()):(l=C.getContext,C.src||l?p=C:(p=new ya,p.crossOrigin=w.crossOrigin,p.src=C),p.complete||l?A():(p.onload=A(),p.src=p.src))):s=k;return s};g.fn.createGradient=function(g){var p,v=[],n,w,x,s,
C,D,H;g=new L(g);if(p=I(this[0])){g.x1=g.x1||0;g.y1=g.y1||0;g.x2=g.x2||0;g.y2=g.y2||0;p=g.r1!==k&&g.r2!==k?p.createRadialGradient(g.x1,g.y1,g.r1,g.x2,g.y2,g.r2):p.createLinearGradient(g.x1,g.y1,g.x2,g.y2);for(s=1;g["c"+s]!==l;s+=1)g["s"+s]!==l?v.push(g["s"+s]):v.push(k);n=v.length;v[0]===k&&(v[0]=0);v[n-1]===k&&(v[n-1]=1);for(s=0;s<n;s+=1){if(v[s]!==k){D=1;H=0;w=v[s];for(C=s+1;C<n;C+=1)if(v[C]!==k){x=v[C];break}else D+=1;w>x&&(v[C]=v[s])}else v[s]===k&&(H+=1,v[s]=w+(x-w)/D*H);p.addColorStop(v[s],
g["c"+(s+1)])}}else p=k;return p};g.fn.setPixels=function A(g){var l,p,x,s,C,D,H,F,M;for(p=0;p<this.length;p+=1)if(l=this[p],x=I(l)){s=new L(g);O(l,s,g,A);S(this[p],x,s,s.width,s.height);if(s.width===k||s.height===k)s.width=l.width,s.height=l.height,s.x=s.width/2,s.y=s.height/2;if(0!==s.width&&0!==s.height){D=x.getImageData(s.x-s.width/2,s.y-s.height/2,s.width,s.height);H=D.data;M=H.length;if(s.each)for(F=0;F<M;F+=4)C={r:H[F],g:H[F+1],b:H[F+2],a:H[F+3]},s.each.call(l,C,s),H[F]=C.r,H[F+1]=C.g,H[F+
2]=C.b,H[F+3]=C.a;x.putImageData(D,s.x-s.width/2,s.y-s.height/2);x.restore()}}return this};g.fn.getCanvasImage=function(g,p){var n,w=k;0!==this.length&&(n=this[0],n.toDataURL&&(p===l&&(p=1),w=n.toDataURL("image/"+g,p)));return w};g.fn.detectPixelRatio=function(k){var l,n,w,x,s,C,D;for(n=0;n<this.length;n+=1)l=this[n],g(this[n]),w=I(l),D=F(this[n]),D.scaled||(x=window.devicePixelRatio||1,s=w.webkitBackingStorePixelRatio||w.mozBackingStorePixelRatio||w.msBackingStorePixelRatio||w.oBackingStorePixelRatio||
w.backingStorePixelRatio||1,x/=s,1!==x&&(s=l.width,C=l.height,l.width=s*x,l.height=C*x,l.style.width=s+"px",l.style.height=C+"px",w.scale(x,x)),D.pixelRatio=x,D.scaled=p,k&&k.call(l,x));return this};M.clearCache=function(){for(var g in da)da.hasOwnProperty(g)&&(da[g]={})};g.support.canvas=g("<canvas />")[0].getContext!==l;Y(M,{defaults:na,prefs:ba,setGlobalProps:T,transformShape:S,detectEvents:U,closePath:Z,setCanvasFont:ta,measureText:ua});g.jCanvas=M})(jQuery,document,Image,Array,Math,parseFloat,
console,!0,!1,null);