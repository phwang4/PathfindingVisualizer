(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{10:function(e,t,n){e.exports=n(23)},15:function(e,t,n){},16:function(e,t,n){},17:function(e,t,n){},22:function(e,t,n){},23:function(e,t,n){"use strict";n.r(t);var i=n(0),s=n.n(i),o=n(9),a=n.n(o),r=(n(15),n(16),n(1)),c=n(3),u=n(4),d=n(6),l=n(5),h=(n(17),function(e){Object(d.a)(n,e);var t=Object(l.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){var e=this.props,t=e.col,n=e.isFinish,i=e.isStart,o=e.isWall,a=e.onMouseDown,r=e.onMouseEnter,c=e.onMouseUp,u=e.onMouseOut,d=e.isVisited,l=e.row,h=n?"node-finish":i?"node-start":o?"node-wall":d?"node-visited":"";return s.a.createElement("div",{id:"node-".concat(l,"-").concat(t),className:"node ".concat(h),onMouseEnter:function(){return r(l,t)},onMouseDown:function(){return a(l,t)},onMouseUp:function(){return c(l,t)},onMouseOut:function(){return u(l,t)}})}}]),n}(i.Component)),f=(n(8),n(21),n(22),n(2));function v(e){e.sort((function(e,t){return e.distance-t.distance}))}function m(e,t){var n,i=g(e,t),s=Object(f.a)(i);try{for(s.s();!(n=s.n()).done;){var o=n.value;o.distance=e.distance+1,o.previousNode=e}}catch(a){s.e(a)}finally{s.f()}}function g(e,t){var n=e.row,i=e.col,s=[];return n>0&&s.push(t[n-1][i]),n<t.length-1&&s.push(t[n+1][i]),i>0&&s.push(t[n][i-1]),i<t[0].length-1&&s.push(t[n][i+1]),s.filter((function(e){return!e.isVisited}))}function N(e){var t,n=[],i=Object(f.a)(e);try{for(i.s();!(t=i.n()).done;){var s,o=t.value,a=Object(f.a)(o);try{for(a.s();!(s=a.n()).done;){var r=s.value;n.push(r)}}catch(c){a.e(c)}finally{a.f()}}}catch(c){i.e(c)}finally{i.f()}return n}function p(e){for(var t=[],n=e;null!==n;)t.unshift(n),n=n.previousNode;return t}function k(e,t){return Math.abs(e.row-t.row)+Math.abs(e.col-t.col)}function y(e,t,n){var i,s=g(e,t),o=Object(f.a)(s);try{for(o.s();!(i=o.n()).done;){var a=i.value;if(n){var r=k(a,n);a.distance=r,a.previousNode=e}else console.log("else"),a.distance=e.distance+1,a.previousNode=e}}catch(c){o.e(c)}finally{o.f()}}var M=15,b=10,w=35,j=10,E=function(e){Object(d.a)(n,e);var t=Object(l.a)(n);function n(){var e;return Object(c.a)(this,n),(e=t.call(this)).state={grid:[],mouseIsPressed:!1,startNodeMoving:!1,finishNodeMoving:!1},e}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=O();this.setState({grid:e})}},{key:"clear",value:function(){M=15,b=10,w=35,j=10;var e=O();console.log(e);for(var t=0;t<20;t++)for(var n=0;n<50;n++)10===t&&15===n?this.setNode(t,n,"node-start"):10===t&&35===n?this.setNode(t,n,"node-finish"):this.setNode(t,n,"");this.setState({grid:e,mouseIsPressed:!1,startNodeMoving:!1,finishNodeMoving:!1})}},{key:"handleMouseDown",value:function(e,t){if(this.checkNode(e,t,"node-start")){this.setNode(e,t,"node-start-moving");var n=P(this.state.grid,e,t);this.setState({grid:n,startNodeMoving:!0,mouseIsPressed:!0})}else if(this.checkNode(e,t,"node-finish")){this.setNode(e,t,"node-finish-moving");var i=W(this.state.grid,e,t);this.setState({grid:i,finishNodeMoving:!0,mouseIsPressed:!0})}else{var s=I(this.state.grid,e,t);this.setState({grid:s,mouseIsPressed:!0})}}},{key:"handleMouseEnter",value:function(e,t){if(this.state.mouseIsPressed)if(this.state.startNodeMoving){if(!this.checkNode(e,t,"node-finish")){this.setNode(e,t,"node-start-moving");var n=D(this.state.grid,e,t);this.setState({grid:n})}}else if(this.state.finishNodeMoving){if(!this.checkNode(e,t,"node-start")){this.setNode(e,t,"node-finish-moving");var i=D(this.state.grid,e,t);this.setState({grid:i})}}else{var s=I(this.state.grid,e,t);this.setState({grid:s})}}},{key:"handleMouseOut",value:function(e,t){this.state.mouseIsPressed&&(this.state.startNodeMoving&&!this.checkNode(e,t,"node-finish")||this.state.finishNodeMoving&&!this.checkNode(e,t,"node-start"))&&this.setNode(e,t,"")}},{key:"handleMouseUp",value:function(e,t){if(this.state.startNodeMoving){if(this.checkNode(e,t,"node-finish"))return;this.setNode(e,t,"node-start");var n=P(this.state.grid,e,t);this.setState({grid:n,startNodeMoving:!1}),b=e,M=t}else if(this.state.finishNodeMoving){if(this.checkNode(e,t,"node-start"))return;this.setNode(e,t,"node-finish");var i=W(this.state.grid,e,t);this.setState({grid:i,finishNodeMoving:!1}),j=e,w=t}this.setState({mouseIsPressed:!1})}},{key:"checkNode",value:function(e,t,n){return document.getElementById("node-".concat(e,"-").concat(t)).className==="node ".concat(n)}},{key:"setNode",value:function(e,t,n){document.getElementById("node-".concat(e,"-").concat(t)).className="node ".concat(n)}},{key:"animateDijkstra",value:function(e,t){for(var n=this,i=function(t){setTimeout((function(){var i=e[t];n.checkNode(i.row,i.col,"node-start")||n.checkNode(i.row,i.col,"node-finish")||n.setNode(i.row,i.col,"node-visited")}),10*t)},s=0;s<e.length;s++)i(s);for(var o=function(i){setTimeout((function(){var e=t[i];n.checkNode(e.row,e.col,"node-start")||n.checkNode(e.row,e.col,"node-finish")||n.setNode(e.row,e.col,"node-shortest-path")}),10*e.length+50*i)},a=0;a<t.length;a++)o(a)}},{key:"visualizeDijkstra",value:function(){var e=this.state.grid,t=e[b][M],n=e[j][w],i=function(e,t,n){var i=[];t.distance=0;var s=N(e);for(v(s);s.length;){v(s);var o=s.shift();if(!o.isWall){if(o.distance===1/0)return i;if(o.isVisited=!0,i.push(o),o===n)return i;m(o,e)}}}(e,t,n),s=p(n);this.animateDijkstra(i,s)}},{key:"visualizeGreedy",value:function(){var e=this.state.grid,t=e[b][M],n=e[j][w],i=function(e,t,n){var i=[];t.distance=0;var s=N(e);for(v(s);s.length;){v(s);var o=s.shift();if(!o.isWall){if(o.distance===1/0)return i;if(o.isVisited=!0,i.push(o),o===n)return i;y(o,e,n)}}}(e,t,n),s=p(n);console.log(i),console.log(s),this.animateDijkstra(i,s)}},{key:"render",value:function(){var e=this,t=this.state,n=t.grid,i=t.mouseIsPressed;return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"dropdown"},s.a.createElement("button",{className:"btn btn-primary dropdown-toggle",type:"button","data-toggle":"dropdown"},"Algorithms",s.a.createElement("span",{className:"caret"})),s.a.createElement("ul",{className:"dropdown-menu"},s.a.createElement("li",null,s.a.createElement("button",{type:"button",onClick:function(){return e.visualizeDijkstra()}},"Dijkstra's")),s.a.createElement("li",null,s.a.createElement("button",{type:"button",onClick:function(){return e.visualizeGreedy()}},"Greedy BFS"))),s.a.createElement("button",{type:"button",onClick:function(){return e.clear()}},"Clear")),s.a.createElement("div",{className:"grid"},n.map((function(t,n){return s.a.createElement("div",{key:n},t.map((function(t,n){var o=t.isStart,a=t.isFinish,r=t.isWall,c=t.row,u=t.col,d=t.isVisited;return s.a.createElement(h,{key:n,isStart:o,isFinish:a,row:c,col:u,isWall:r,isVisited:d,mouseIsPressed:i,onMouseEnter:function(t,n){return e.handleMouseEnter(t,n)},onMouseOut:function(t,n){return e.handleMouseOut(t,n)},onMouseDown:function(t,n){return e.handleMouseDown(t,n)},onMouseUp:function(t,n){return e.handleMouseUp(t,n)}})})))}))))}}]),n}(i.Component),O=function(){for(var e=[],t=0;t<20;t++){for(var n=[],i=0;i<50;i++)n.push(S(i,t));e.push(n)}return e},S=function(e,t){return{col:e,row:t,isStart:t===b&&e===M,isFinish:t===j&&e===w,distance:1/0,isVisited:!1,isPath:!1,isWall:!1,previousNode:null}},I=function(e,t,n){if(e[t][n].isStart||e[t][n].isFinish)return e;var i=e.slice(),s=i[t][n],o=Object(r.a)(Object(r.a)({},s),{},{isWall:!0});return i[t][n]=o,i},D=function(e,t,n){var i=e.slice(),s=i[t][n],o=Object(r.a)(Object(r.a)({},s),{},{isWall:!1});return i[t][n]=o,i},P=function(e,t,n){var i=e.slice(),s=i[t][n],o=Object(r.a)(Object(r.a)({},s),{},{isStart:!s.isStart});return i[t][n]=o,i},W=function(e,t,n){var i=e.slice(),s=i[t][n],o=Object(r.a)(Object(r.a)({},s),{},{isFinish:!s.isFinish});return i[t][n]=o,i};var F=function(){return s.a.createElement("div",{className:"App"},s.a.createElement(E,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[10,1,2]]]);
//# sourceMappingURL=main.0c3d5e0b.chunk.js.map