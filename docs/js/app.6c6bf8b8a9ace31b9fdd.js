(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{334:function(e,r,n){"use strict";n.r(r);var t=n(131),a=n.n(t);function o(e,r,n,t,a,o,i){try{var u=e[o](i),c=u.value}catch(e){return void n(e)}u.done?r(c):Promise.resolve(c).then(t,a)}function i(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}n(89);var u=function(){function e(r){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,e),this.query=r}var r,n,t,u,c;return r=e,(n=[{key:"doSearch",value:(u=regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a()("https://forkify-api.herokuapp.com/api/search?q="+this.query);case 3:return r=e.sent,this.result=r.data.recipes,e.abrupt("return",this.result);case 8:e.prev=8,e.t0=e.catch(0),alert("Асуудал гарлаа : "+e.t0);case 11:case"end":return e.stop()}}),e,this,[[0,8]])})),c=function(){var e=this,r=arguments;return new Promise((function(n,t){var a=u.apply(e,r);function i(e){o(a,n,t,i,c,"next",e)}function c(e){o(a,n,t,i,c,"throw",e)}i(void 0)}))},function(){return c.apply(this,arguments)})}])&&i(r.prototype,n),t&&i(r,t),e}();n(89),new u("pizza").doSearch().then((function(e){return console.log(e)}))}},[[334,1,2]]]);