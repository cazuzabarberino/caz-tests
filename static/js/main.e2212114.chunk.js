(this["webpackJsonpcaz-tests"]=this["webpackJsonpcaz-tests"]||[]).push([[0],{10:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),i=n(3),l=n.n(i),a=n(4),s=n(0);var u=function(){var e=Object(c.useState)(""),t=Object(a.a)(e,2),n=t[0],r=t[1],i=Object(c.useRef)(null),l=Object(c.useRef)(null),u=Object(c.useCallback)((function(e){var t,n=null===(t=e.target.files)||void 0===t?void 0:t[0];n&&function(e){for(var t=["jpg","jpeg","png"],n=0;n<t.length;n++)if(e.type.includes(t[n]))return!0;return!1}(n)?(l.current&&(l.current.src=URL.createObjectURL(n)),r("")):r("Invalid Format")}),[]),d=Object(c.useCallback)((function(){var e;null===(e=i.current)||void 0===e||e.click()}),[]);return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("div",{children:"0.03"}),Object(s.jsx)("input",{onChange:u,type:"file",name:"image",accept:"image/*",ref:i,hidden:!0}),Object(s.jsx)("button",{onClick:d,style:{width:"100%"},children:"Upload File"}),n&&Object(s.jsx)("p",{style:{color:"red"},children:n}),Object(s.jsx)("img",{hidden:!0,alt:"uploaded file",ref:l,style:{width:"100%"},onLoad:function(e){return e.currentTarget.hidden=!1}})]})};l.a.render(Object(s.jsx)(r.a.StrictMode,{children:Object(s.jsx)(u,{})}),document.getElementById("root"))}},[[10,1,2]]]);
//# sourceMappingURL=main.e2212114.chunk.js.map