(this["webpackJsonpcired-dashboard-front"]=this["webpackJsonpcired-dashboard-front"]||[]).push([[0],{30:function(e,n,t){},31:function(e,n,t){},38:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var r=t(2),i=t(0),c=t.n(i),s=t(20),o=t.n(s),a=(t(30),t(31),t(9)),l=Object(i.createContext)(),d=t(1),u=function(e){var n=e.children,t=Object(i.useState)("light"),r=Object(a.a)(t,2),c=r[0],s=r[1],o=Object(i.useState)({connected:!1}),u=Object(a.a)(o,2),f=u[0],p=u[1],h=window.REACT_API_URL,b=function(){var e=function(){return{width:window.innerWidth,height:window.innerHeight}},n=Object(i.useState)(e()),t=Object(a.a)(n,2),r=t[0],c=t[1];return Object(i.useEffect)((function(){var n=function(){return c(e())};return window.addEventListener("resize",n),function(){return window.removeEventListener("resize",n)}}),[]),r}(),j=b.width,x=b.height;return Object(d.jsx)(l.Provider,{value:{theme:c,toggleTheme:function(){s("light"===c?"dark":"light")},API_URL:h,user:f,setUser:p,width:j,height:x},children:n})},f=t(4);var p,h,b,j,x,m,O,g,w,y=Object(f.f)((function(e){var n=e.history;return Object(i.useEffect)((function(){var e=n.listen((function(){window.scrollTo({top:0,left:0,behavior:"smooth"})}));return function(){e()}}),[]),null})),v=(t(38),function(){return Object(d.jsxs)("div",{className:"footer-container",children:[Object(d.jsx)("a",{className:"footer-logo",href:"https://www.centre-cired.fr/",target:"_blank",rel:"noreferrer",children:Object(d.jsx)("img",{src:"logo-cired.jpeg",alt:"CIRED",width:"55px"})}),Object(d.jsx)("a",{className:"footer-logo",href:"https://www.ecoledesponts.fr/",target:"_blank",rel:"noreferrer",children:Object(d.jsx)("img",{className:"footer-logo",src:"logo-enpc.png",alt:"ENPC",width:"40px"})}),Object(d.jsx)("p",{children:"Comparater - Version pre-release- CIRED-ENPC 2022"})]})}),E=t(3),k="black",C="#4D908E",_="#f5f5f5",z="#81b29a",L="#07093D",D="#ffffff",B="#6E94B7",S="#D7D7D7",I=t(11),P=t(10),U=E.b.img(p||(p=Object(r.a)(["\n  width: ",";\n  margin-right: 2px;\n  transition: 0.1s width, 0.1s margin, 0.1s filter;\n  cursor: pointer;\n"])),(function(e){return"undefined"!==typeof e.size?e.size+"em":"1.6em"})),R=E.b.span(h||(h=Object(r.a)(["\n  background-image: linear-gradient(\n    transparent 60%,\n    ","\n      60%\n  );\n  background-size: ","\n    100%;\n  background-repeat: no-repeat;\n  background-position: 0 110%;\n  transition: background-size cubic-bezier(1, -0.11, 0.71, 1.07) 0.5s;\n"])),(function(e){return e.secondary?D:e.tertiary?S:z}),(function(e){return e.animate?e.show?"100%":"0%":"100%"})),F=function(e){var n=Object(i.useRef)(null),t=Object(i.useState)(!1),r=Object(a.a)(t,2),c=r[0],s=r[1],o=function(e,n){if(e.current){var t=e.current.getBoundingClientRect().top,r=window.innerHeight;t>=.65*r&&n(!1),t<.65*r&&n(!0)}};return Object(i.useEffect)((function(){return window.addEventListener("scroll",(function(){return o(n,s)})),function(){window.removeEventListener("scroll",(function(){return o(n,s)}))}}),[]),Object(d.jsx)(R,Object(P.a)(Object(P.a)({animate:!0,show:c,ref:n},e),{},{children:e.children}))},q=E.b.div(b||(b=Object(r.a)(["\n  position: ",";\n  top: ",";\n  padding: 20px;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  background-color: white;\n  z-index: 100;\n  height: 60px;\n"])),(function(e){return e.sticky&&"sticky"}),(function(e){return e.sticky&&"0px"})),M=Object(E.b)(I.b)(j||(j=Object(r.a)(["\n  text-decoration: none;\n  display: flex;\n  flex-direction: row;\n  cursor: pointer;\n  font-size: 2em;\n  color: black;\n  align-items: center;\n\n  &:hover {\n    color: ",";\n    img {\n      width: 1.8em;\n      filter: drop-shadow(3px 3px 3px rgba(168, 168, 168, 0.801));\n      margin-top: -5px;\n    }\n  }\n  &:active {\n    color: black;\n  }\n"])),C),W=E.b.div(x||(x=Object(r.a)(["\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  gap: 30px;\n"]))),A=E.b.div(m||(m=Object(r.a)(["\n  color: black;\n  font-size: 1.2em;\n  font-weight: bold;\n  cursor: pointer;\n  &:hover {\n    color: ",";\n  }\n"])),C),N=(E.b.div(O||(O=Object(r.a)(["\n  & svg {\n    fill: ",";\n  }\n"])),(function(e){return e.active?k:"#000000"})),function(e){var n=e.sticky,t=e.showMenu,r=e.refInfo,c=e.refCaMarche,s=Object(i.useContext)(l).width;return Object(d.jsxs)(q,{sticky:n,children:[Object(d.jsxs)(M,{to:"/",children:[Object(d.jsx)(U,{src:"logo_comparater.svg",alt:"Logo ComparaTer"}),"comparater"]}),t&&s>800&&Object(d.jsxs)(W,{children:[Object(d.jsx)(A,{onClick:function(){r.current.scrollIntoView({behavior:"smooth"})},children:"Le projet"}),Object(d.jsx)(A,{onClick:function(){c.current.scrollIntoView({behavior:"smooth"})},children:"Comment \xe7a marche ?"})]})]})}),G=t(25),T=["title","titleId"];function H(){return H=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},H.apply(this,arguments)}function Z(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},c=Object.keys(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}function V(e,n){var t=e.title,r=e.titleId,c=Z(e,T);return i.createElement("svg",H({width:673,height:476,viewBox:"0 0 673 476",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:n,"aria-labelledby":r},c),t?i.createElement("title",{id:r},t):null,g||(g=i.createElement("g",{clipPath:"url(#clip0_101_412)"},i.createElement("g",{id:"right"},i.createElement("path",{d:"M479.5 127.5L509.5 97L641.5 230.5L509.5 365.5L479.5 336.5L563.5 252H284L320.5 209.5L563.5 210L479.5 127.5Z",fill:"url(#paint0_linear_101_412)"}),i.createElement("path",{d:"M285.125 252.5L321 209.5H178V252.5H285.125Z",fill:"url(#paint1_linear_101_412)"})),i.createElement("g",{id:"left"},i.createElement("path",{d:"M162 385.5L132 416L-1.16709e-05 282.5L132 147.5L162 176.5L78 261L357.5 261L321 303.5L78 303L162 385.5Z",fill:"url(#paint2_linear_101_412)"}),i.createElement("path",{d:"M356.375 260.5L320.5 303.5L463.5 303.5L463.5 260.5L356.375 260.5Z",fill:"url(#paint3_linear_101_412)"})))),w||(w=i.createElement("defs",null,i.createElement("linearGradient",{id:"paint0_linear_101_412",x1:462.75,y1:97,x2:462.75,y2:365.5,gradientUnits:"userSpaceOnUse"},i.createElement("stop",{offset:.183161,stopColor:"#73BC98"}),i.createElement("stop",{offset:.579163,stopColor:"#4D908E"})),i.createElement("linearGradient",{id:"paint1_linear_101_412",x1:249.5,y1:209.5,x2:249.5,y2:252.5,gradientUnits:"userSpaceOnUse"},i.createElement("stop",{offset:.229167,stopColor:"#F7F9FA"}),i.createElement("stop",{offset:.71875,stopColor:"#DBE1E8"})),i.createElement("linearGradient",{id:"paint2_linear_101_412",x1:178.75,y1:416,x2:178.75,y2:147.5,gradientUnits:"userSpaceOnUse"},i.createElement("stop",{offset:.11384,stopColor:"#99D98C"}),i.createElement("stop",{offset:.75266,stopColor:"#73BC98"})),i.createElement("linearGradient",{id:"paint3_linear_101_412",x1:392,y1:303.5,x2:392,y2:260.5,gradientUnits:"userSpaceOnUse"},i.createElement("stop",{offset:.229167,stopColor:"#F7F9FA"}),i.createElement("stop",{offset:.71875,stopColor:"#DBE1E8"})),i.createElement("clipPath",{id:"clip0_101_412"},i.createElement("rect",{width:673,height:476,fill:"white"})))))}var J,Q,K,X,Y,$,ee,ne=i.forwardRef(V),te=(t.p,["title","titleId"]);function re(){return re=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},re.apply(this,arguments)}function ie(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},c=Object.keys(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}function ce(e,n){var t=e.title,r=e.titleId,c=ie(e,te);return i.createElement("svg",re({width:465,height:464,viewBox:"0 0 465 464",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:n,"aria-labelledby":r},c),t?i.createElement("title",{id:r},t):null,J||(J=i.createElement("g",{id:"lines"},i.createElement("line",{x1:53.4369,y1:112.952,x2:229.437,y2:48.9515,stroke:"#D7D7D7",strokeWidth:15}),i.createElement("line",{x1:59.3235,y1:113.277,x2:235.324,y2:200.277,stroke:"#D7D7D7",strokeWidth:15}),i.createElement("line",{x1:238.29,y1:60.085,x2:62.2899,y2:331.085,stroke:"#D7D7D7",strokeWidth:15}),i.createElement("line",{x1:403.712,y1:237.318,x2:226.712,y2:61.3183,stroke:"#D7D7D7",strokeWidth:15}),i.createElement("line",{x1:407.951,y1:239.426,x2:230.951,y2:214.426,stroke:"#D7D7D7",strokeWidth:15}),i.createElement("line",{x1:414.273,y1:240.333,x2:237.273,y2:415.333,stroke:"#D7D7D7",strokeWidth:15}),i.createElement("line",{x1:59.2402,y1:323.236,x2:226.24,y2:403.236,stroke:"#D7D7D7",strokeWidth:15}),i.createElement("line",{x1:62.3935,y1:116.079,x2:238.394,y2:403.079,stroke:"#D7D7D7",strokeWidth:15}),i.createElement("line",{x1:224.5,y1:417,x2:224.5,y2:207,stroke:"#D7D7D7",strokeWidth:15}))),Q||(Q=i.createElement("circle",{id:"c1",cx:231.5,cy:56.5,r:56.5,fill:"#73BC98"})),K||(K=i.createElement("circle",{id:"c2",cx:56.5,cy:120.5,r:56.5,fill:"#4D908E"})),X||(X=i.createElement("circle",{id:"c3",cx:56.5,cy:327.5,r:56.5,fill:"#A9E19E"})),Y||(Y=i.createElement("circle",{id:"c4",cx:231.5,cy:407.5,r:56.5,fill:"#73BC98"})),$||($=i.createElement("circle",{id:"c5",cx:408.5,cy:232.5,r:56.5,fill:"#A9E19E"})),ee||(ee=i.createElement("circle",{id:"c6",cx:231.5,cy:207.5,r:56.5,fill:"#577590"})))}var se,oe,ae,le,de=i.forwardRef(ce),ue=(t.p,["title","titleId"]);function fe(){return fe=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},fe.apply(this,arguments)}function pe(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},c=Object.keys(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}function he(e,n){var t=e.title,r=e.titleId,c=pe(e,ue);return i.createElement("svg",fe({width:540,height:457,viewBox:"0 0 540 457",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:n,"aria-labelledby":r},c),t?i.createElement("title",{id:r},t):null,se||(se=i.createElement("g",{id:"rect1",clipPath:"url(#clip0_310_2)"},i.createElement("path",{d:"M50.4901 325.23L264.996 236.318C270.122 234.193 275.881 234.183 281.015 236.292L497.515 325.204C514.833 332.317 514.891 356.823 497.606 364.017L281.107 454.126C275.92 456.285 270.084 456.275 264.904 454.099L50.398 363.991C33.1979 356.765 33.2559 332.373 50.4901 325.23Z",fill:"#4D908E"}))),oe||(oe=i.createElement("g",{id:"rect2",filter:"url(#filter0_d_310_2)"},i.createElement("path",{d:"M48.4901 208.73L262.996 119.818C268.122 117.693 273.881 117.683 279.015 119.792L495.515 208.704C512.833 215.817 512.891 240.323 495.606 247.517L279.107 337.626C273.92 339.785 268.084 339.775 262.904 337.599L48.398 247.491C31.1979 240.265 31.2559 215.873 48.4901 208.73Z",fill:"#99D98C"}))),ae||(ae=i.createElement("g",{id:"rect3",filter:"url(#filter1_d_310_2)"},i.createElement("path",{d:"M46.4901 92.23L260.996 3.31765C266.122 1.19276 271.881 1.18337 277.015 3.29153L493.515 92.204C510.833 99.3165 510.891 123.823 493.606 131.017L277.107 221.126C271.92 223.285 266.084 223.275 260.904 221.099L46.398 130.991C29.1979 123.765 29.2559 99.3735 46.4901 92.23Z",fill:"#73BC98"}))),le||(le=i.createElement("defs",null,i.createElement("filter",{id:"filter0_d_310_2",x:27.5311,y:118.217,width:493.006,height:257.021,filterUnits:"userSpaceOnUse",colorInterpolationFilters:"sRGB"},i.createElement("feFlood",{floodOpacity:0,result:"BackgroundImageFix"}),i.createElement("feColorMatrix",{in:"SourceAlpha",type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",result:"hardAlpha"}),i.createElement("feOffset",{dx:2,dy:26}),i.createElement("feGaussianBlur",{stdDeviation:5}),i.createElement("feComposite",{in2:"hardAlpha",operator:"out"}),i.createElement("feColorMatrix",{type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"}),i.createElement("feBlend",{mode:"normal",in2:"BackgroundImageFix",result:"effect1_dropShadow_310_2"}),i.createElement("feBlend",{mode:"normal",in:"SourceGraphic",in2:"effect1_dropShadow_310_2",result:"shape"})),i.createElement("filter",{id:"filter1_d_310_2",x:25.5311,y:1.71729,width:493.006,height:257.021,filterUnits:"userSpaceOnUse",colorInterpolationFilters:"sRGB"},i.createElement("feFlood",{floodOpacity:0,result:"BackgroundImageFix"}),i.createElement("feColorMatrix",{in:"SourceAlpha",type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",result:"hardAlpha"}),i.createElement("feOffset",{dx:2,dy:26}),i.createElement("feGaussianBlur",{stdDeviation:5}),i.createElement("feComposite",{in2:"hardAlpha",operator:"out"}),i.createElement("feColorMatrix",{type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"}),i.createElement("feBlend",{mode:"normal",in2:"BackgroundImageFix",result:"effect1_dropShadow_310_2"}),i.createElement("feBlend",{mode:"normal",in:"SourceGraphic",in2:"effect1_dropShadow_310_2",result:"shape"})),i.createElement("clipPath",{id:"clip0_310_2"},i.createElement("rect",{width:540,height:457,fill:"white"})))))}var be,je,xe,me,Oe,ge,we,ye,ve,Ee,ke,Ce,_e,ze,Le,De,Be,Se,Ie,Pe,Ue,Re,Fe,qe,Me=i.forwardRef(he),We=(t.p,E.b.div(be||(be=Object(r.a)(["\n  width: 60px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  flex-direction: row;\n  padding-right: 20px;\n  margin-top: -5px;\n  svg {\n    /* transform: scale(0.1); */\n\n    #left path {\n      transition: 0.7s cubic-bezier(0.45, 0.05, 0.655, 0.95) transform;\n\n      transform: translate(",", 0);\n    }\n    #right path {\n      transition: 0.7s cubic-bezier(0.45, 0.05, 0.655, 0.95) transform;\n\n      transform: translate(",", 0);\n    }\n  }\n"])),(function(e){return e.show?"-15px":"400px"}),(function(e){return e.show?"15px":"-450px"}))),Ae=function(e){var n=Object(i.useRef)(null),t=Object(i.useState)(!1),r=Object(a.a)(t,2),c=r[0],s=r[1],o=function(e,n){if(e.current){var t=e.current.getBoundingClientRect().top,r=window.innerHeight;t>=.65*r&&n(!1),t<.65*r&&n(!0)}};return Object(i.useEffect)((function(){return window.addEventListener("scroll",(function(){return o(n,s)})),function(){window.removeEventListener("scroll",(function(){return o(n,s)}))}}),[]),Object(d.jsx)(We,Object(P.a)(Object(P.a)({show:c,ref:n},e),{},{children:Object(d.jsx)(ne,{})}))},Ne=E.b.div(je||(je=Object(r.a)(["\n  width: 60px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  flex-direction: row;\n  padding-right: 20px;\n  margin-top: -5px;\n  svg {\n    #c1 {\n      transition: 0.2s cubic-bezier(1, -0.01, 1, 1.01) fill-opacity;\n      fill-opacity: ",";\n    }\n    #c2 {\n      transition: 0.8s cubic-bezier(1, -0.01, 1, 1.01) fill-opacity;\n      fill-opacity: ",";\n    }\n    #c3 {\n      transition: 1s cubic-bezier(1, -0.01, 1, 1.01) fill-opacity;\n      fill-opacity: ",";\n    }\n    #c4 {\n      transition: 0.4s cubic-bezier(1, -0.01, 1, 1.01) fill-opacity;\n      fill-opacity: ",";\n    }\n    #c5 {\n      transition: 0.7s cubic-bezier(1, -0.01, 1, 1.01) fill-opacity;\n      fill-opacity: ",";\n    }\n    #lines line {\n      transition: 2s cubic-bezier(1, -0.01, 1, 1.01) stroke-opacity;\n      stroke-opacity: ",";\n    }\n  }\n"])),(function(e){return e.show?"1":"0"}),(function(e){return e.show?"1":"0"}),(function(e){return e.show?"1":"0"}),(function(e){return e.show?"1":"0"}),(function(e){return e.show?"1":"0"}),(function(e){return e.show?"1":"0"})),Ge=function(e){var n=Object(i.useRef)(null),t=Object(i.useState)(!1),r=Object(a.a)(t,2),c=r[0],s=r[1],o=function(e,n){if(e.current){var t=e.current.getBoundingClientRect().top,r=window.innerHeight;t>=.65*r&&n(!1),t<.65*r&&n(!0)}};return Object(i.useEffect)((function(){return window.addEventListener("scroll",(function(){return o(n,s)})),function(){window.removeEventListener("scroll",(function(){return o(n,s)}))}}),[]),Object(d.jsx)(Ne,Object(P.a)(Object(P.a)({show:c,ref:n},e),{},{children:Object(d.jsx)(de,{})}))},Te=E.b.div(xe||(xe=Object(r.a)(["\n  width: 60px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  flex-direction: row;\n  padding-right: 20px;\n  margin-top: -5px;\n  svg {\n    #rect3 path {\n      transition: 1s ease transform;\n      transform: translate(0, ",");\n    }\n\n    #rect1 path {\n      transition: 1s ease transform;\n      transform: translate(0, ",");\n    }\n  }\n"])),(function(e){return e.show?"0":"-220px"}),(function(e){return e.show?"0":"220px"})),He=function(e){var n=Object(i.useRef)(null),t=Object(i.useState)(!1),r=Object(a.a)(t,2),c=r[0],s=r[1],o=function(e,n){if(e.current){var t=e.current.getBoundingClientRect().top,r=window.innerHeight;t>=.65*r&&n(!1),t<.65*r&&n(!0)}};return Object(i.useEffect)((function(){return window.addEventListener("scroll",(function(){return o(n,s)})),function(){window.removeEventListener("scroll",(function(){return o(n,s)}))}}),[]),Object(d.jsx)(Te,Object(P.a)(Object(P.a)({show:c,ref:n},e),{},{children:Object(d.jsx)(Me,{})}))},Ze=E.b.div(me||(me=Object(r.a)(["\n  padding: 0px 15%;\n  /* min-width: 400px; */\n  background-color: ",";\n"])),_),Ve=E.b.div(Oe||(Oe=Object(r.a)(["\n  margin: 0px auto;\n  /* max-width: ","; */\n  display: flex;\n  flex-direction: ",";\n  align-items: ",";\n  justify-content: center;\n  gap: ",";\n  min-height: ",";\n  padding-bottom: ",";\n  flex-wrap: wrap;\n"])),(function(e){return!e.full&&"900px"}),(function(e){return e.row?"row":"column"}),(function(e){return e.row?"start":"center"}),(function(e){return e.big?"150px":"30px"}),(function(e){return e.full&&"95vh"}),(function(e){return e.full?"30px":"100px"})),Je=E.b.h2(ge||(ge=Object(r.a)(['\n  font-family: "Ubuntu";\n  font-size: 2.4em;\n  color: black;\n  font-weight: 800;\n  /* text-transform: uppercase; */\n']))),Qe=E.b.span(we||(we=Object(r.a)(["\n  background-image: linear-gradient(\n    transparent 60%,\n    "," 60%\n  );\n  background-size: 100% 102%;\n  background-repeat: no-repeat;\n  background-position: 0 100%;\n"])),z),Ke=E.b.h3(ye||(ye=Object(r.a)(["\n  font-size: 1.4em;\n  line-height: 1.4em;\n  font-weight: none;\n"]))),Xe=(Object(E.b)(I.b)(ve||(ve=Object(r.a)(["\n  z-index: 0;\n  text-decoration: none;\n  font-weight: bold;\n  font-size: 1.3em;\n  width: 300px;\n  min-width: 300px;\n  height: 50px;\n\n  margin: 0px auto;\n  padding: 15px 12px;\n  border-radius: 8px;\n  background-color: ",";\n  color: white;\n  position: relative;\n  top: 0;\n  box-shadow: white;\n  transition: top ease 0.2s, box-shadow ease 0.1s, 0.1s background-color;\n  /* Text centering */\n  text-align: center;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  &:hover {\n    /* Box animation on hover */\n    box-shadow: 3px 3px 7px rgba(168, 168, 168, 0.801);\n    top: -2px;\n    cursor: pointer;\n    filter: brightness(110%);\n  }\n"])),L),E.b.span(Ee||(Ee=Object(r.a)(["\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  margin: 30px auto;\n  color: black;\n  width: fit-content;\n\n  z-index: 0;\n  font-weight: bold;\n  font-size: 1.3em;\n\n  border-radius: 8px;\n  position: relative;\n  top: 0;\n  transition: top ease 0.2s, fill ease 1s, background-size ease 0.2s;\n  /* Text centering */\n  fill: black;\n\n  background-image: linear-gradient(\n    transparent 60%,\n    "," 60%\n  );\n  background-size: 0% 102%;\n  background-repeat: no-repeat;\n  background-position: bottom left;\n\n  &:hover {\n    /* Box animation on hover */\n    & svg {\n      transform: translate(-20);\n      fill: ",";\n    }\n    cursor: pointer;\n    filter: brightness(110%);\n    background-size: 90% 102%;\n  }\n"])),z,z)),Ye=E.b.div(ke||(ke=Object(r.a)(["\n  scroll-margin: 100px;\n  display: flex;\n  max-width: ",";\n\n  flex-direction: column;\n  gap: ",";\n"])),(function(e){return e.limitWidth&&"800px"}),(function(e){return e.small?"10px":"40px"})),$e=E.b.div(Ce||(Ce=Object(r.a)(["\n  display: flex;\n  flex-direction: ",";\n  flex-wrap: wrap;\n  align-items: ",";\n  justify-content: center;\n  gap: ",";\n  font-size: 1.1em;\n  flex-shrink: ",";\n  flex-grow: ",";\n  flex-basis: ",";\n  margin-bottom: ",";\n"])),(function(e){return e.column?"column":"row"}),(function(e){return e.column?"start":"center"}),(function(e){return e.column?"30px":"50px"}),(function(e){return e.shrink&&20}),(function(e){return e.shrink&&20}),(function(e){return e.shrink&&"300px"}),(function(e){return e.bottomSpace&&"40px"})),en=E.b.div(_e||(_e=Object(r.a)(["\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: center;\n  justify-content: center;\n"]))),nn=E.b.h3(ze||(ze=Object(r.a)(["\n  font-size: 1.2em;\n"]))),tn=E.b.div(Le||(Le=Object(r.a)(["\n  text-align: justify;\n  line-height: 2em;\n  flex-basis: ",";\n  flex-shrink: 1;\n  flex-grow: 10;\n"])),(function(e){return e.noBasis?"0px":"300px"})),rn=E.b.span(De||(De=Object(r.a)(["\n  color: ",";\n  font-weight: bolder;\n"])),k),cn=E.b.div(Be||(Be=Object(r.a)(["\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 10px;\n"]))),sn=E.b.div(Se||(Se=Object(r.a)(["\n  color: ",";\n  font-size: ",";\n"])),k,(function(e){return 1.2*e.size+"em"})),on=E.b.a(Ie||(Ie=Object(r.a)(["\n  color: inherit;\n  text-decoration: none;\n  &:hover {\n    color: ",";\n  }\n"])),B),an=E.b.div(Pe||(Pe=Object(r.a)(["\n  font-size: 1em;\n"]))),ln=Object(E.b)(G.a)(Ue||(Ue=Object(r.a)(["\n  margin-left: 10px;\n  transform: scale(1.2);\n"]))),dn=(E.b.div(Re||(Re=Object(r.a)(["\n  /* flex-basis: 600px; */\n  flex-grow: 10;\n  flex-shrink: 1;\n  height: fit-content;\n  margin: ",";\n"])),(function(e){return e.center&&"auto"})),E.b.img(Fe||(Fe=Object(r.a)(["\n  width: 100%;\n  height: fit-content;\n  max-width: 800px;\n  filter: drop-shadow(5px 5px 10px rgba(168, 168, 168, 0.801));\n"]))),function(){var e=Object(i.useRef)(null),n=Object(i.useRef)(null),t=Object(i.useState)(!1),r=Object(a.a)(t,2),c=r[0],s=r[1];return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(N,{sticky:!0,showMenu:c,refInfo:e,refCaMarche:n}),Object(d.jsxs)(Ze,{children:[Object(d.jsxs)(Ve,{full:!0,children:[Object(d.jsxs)(Ve,{row:!0,big:!0,children:[Object(d.jsxs)(Ye,{small:!0,children:[Object(d.jsx)(Je,{className:"title",children:Object(d.jsx)(Qe,{children:"Une plateforme d'appui au pilotage de la transition \xe9cologique des territoires"})}),Object(d.jsx)(Ke,{children:"Trouvez des analyses interactives et localis\xe9es des enjeux de la transition"})]}),Object(d.jsx)(Ye,{children:Object(d.jsx)(an,{children:"La version beta arrive en ligne en juillet 2022."})})]}),Object(d.jsxs)(Xe,{onClick:function(){e.current.scrollIntoView({behavior:"smooth"}),s(!0)},children:["En savoir plus sur le projet ",Object(d.jsx)(ln,{})]})]}),Object(d.jsx)(Ve,{full:!0,big:!0,ref:e,children:Object(d.jsxs)(Ye,{limitWidth:!0,children:[Object(d.jsx)(Ke,{children:Object(d.jsx)(F,{children:"Comparater c'est quoi ?"})}),Object(d.jsxs)($e,{column:!0,children:[Object(d.jsxs)(tn,{noBasis:!0,children:["Comparater est une plateforme en ligne destin\xe9e aux"," ",Object(d.jsx)(F,{tertiary:!0,children:"acteurs de la transition \xe9cologique dans les territoires"}),". Pour"," ",Object(d.jsx)(F,{tertiary:!0,children:"appuyer le pilotage de ces transformations"}),", comparater propose des"," ",Object(d.jsxs)(F,{tertiary:!0,children:[" ","analyses interactives et localis\xe9es des enjeux de la transition."," "]})," "]}),Object(d.jsxs)(tn,{noBasis:!0,children:["D\xe9velopp\xe9 dans une d\xe9marche de"," ",Object(d.jsx)(F,{tertiary:!0,children:"recherche-action"})," ","par une \xe9quipe de l'\xc9cole des Ponts ParisTech et du Centre international de recherche sur l'environnement et le d\xe9veloppement, comparater se"," ",Object(d.jsxs)(F,{tertiary:!0,children:["co-construit avec des d\xe9cideurs territoriaux."," "]})," "]})]})]})}),Object(d.jsxs)(Ve,{full:!0,ref:n,children:[Object(d.jsxs)(Ye,{limitWidth:!0,children:[Object(d.jsx)(Ke,{children:Object(d.jsx)(F,{children:"Comment \xe7a marche ?"})}),Object(d.jsx)($e,{bottomSpace:!0,children:Object(d.jsxs)(tn,{children:["Pour accompagner ces acteurs dans la r\xe9alisation de"," ",Object(d.jsx)(F,{tertiary:!0,children:"diagnostics"})," ","et dans le"," ",Object(d.jsx)(F,{tertiary:!0,children:"suivi des trajectoires de leur territoire"}),", nous proposons des analyses qui s'articulent autour de trois principes fondamentaux : l'approche plateforme, la perspective multiniveaux et la logique comparative."]})})]}),Object(d.jsxs)(Ve,{row:!0,big:!0,children:[Object(d.jsxs)($e,{column:!0,shrink:!0,children:[Object(d.jsxs)(en,{children:[Object(d.jsx)(Ge,{}),Object(d.jsx)(nn,{children:Object(d.jsxs)(rn,{children:[Object(d.jsx)(F,{tertiary:!0,children:"Une plateforme"}),", pour regrouper les savoirs."]})})]}),Object(d.jsxs)(tn,{noBasis:!0,children:["Comparater connecte des sources de connaissance multiples sur les transitions \xe9cologiques territoriales. Nos analyses se fondent sur des"," ",Object(d.jsxs)(F,{tertiary:!0,children:[" ","donn\xe9es officielles"]}),", les"," ",Object(d.jsxs)(F,{tertiary:!0,children:[" ","cadres r\xe8glementaires"]}),", ainsi que sur des"," ",Object(d.jsx)(F,{tertiary:!0,children:"expertises scientifiques"})," ","mais \xe9galement celles des",Object(d.jsxs)(F,{tertiary:!0,children:[" ","acteurs de la transition"]}),"."]})]}),Object(d.jsxs)($e,{column:!0,shrink:!0,children:[Object(d.jsxs)(en,{children:[Object(d.jsx)(He,{}),Object(d.jsx)(nn,{children:Object(d.jsxs)(rn,{children:[Object(d.jsx)(F,{tertiary:!0,children:"La perspective multiniveaux"}),", pour mettre les savoirs en r\xe9sonance."]})})]}),Object(d.jsxs)(tn,{noBasis:!0,children:["Pour mettre en r\xe9sonance ces diff\xe9rents savoirs, comparater s'appuie sur la perspective multiniveaux. Cette m\xe9thode d'analyse"," ",Object(d.jsx)(F,{tertiary:!0,children:"ancr\xe9e dans les sciences sociales"})," ","envisage la transition \xe9cologique comme un"," ",Object(d.jsx)(F,{tertiary:!0,children:"ph\xe9nom\xe8ne multi-\xe9chelles"}),". Elle invite ainsi \xe0 analyser l'\xe9volution des territoires comme la r\xe9sultante de"," ",Object(d.jsx)(F,{tertiary:!0,children:"forces op\xe9rant en leur sein mais aussi en-dehors"}),"."]})]}),Object(d.jsxs)($e,{column:!0,shrink:!0,children:[Object(d.jsxs)(en,{children:[Object(d.jsx)(Ae,{}),Object(d.jsx)(nn,{children:Object(d.jsxs)(rn,{children:[Object(d.jsx)(F,{tertiary:!0,children:"La logique comparative"}),", pour faire circuler les savoirs."]})})]}),Object(d.jsxs)(tn,{noBasis:!0,children:["Afin d'acc\xe9lerer la transition \xe9cologique, il est essentiel de"," ",Object(d.jsx)(F,{tertiary:!0,children:"capitaliser sur les apprentissages \xe9manants d'autres territoires"}),". Comparater permet de comparer librement les trajectoires territoriales et ainsi"," ",Object(d.jsxs)(F,{tertiary:!0,children:["mettre en relation les acteurs soumis aux m\xeames enjeux"," "]}),"."]})]})]})]}),Object(d.jsx)(Ve,{big:!0,children:Object(d.jsxs)(Ye,{limitWidth:!0,children:[Object(d.jsx)(Ke,{children:Object(d.jsx)(F,{children:"Quels enjeux de la transition?"})}),Object(d.jsx)($e,{column:!0,children:Object(d.jsx)(tn,{noBasis:!0,children:"La d\xe9marche de recherche-action nous permet tout \xe0 la fois de construire les fonctionnalit\xe9s autour des besoins de nos utilisateurs, mais \xe9galement de prioriser les th\xe8mes des analyses que nous mettons progressivement en ligne. Nous allons ainsi \xe9toffer progressivement la gamme de questionnements auxquels comparater sera capable de r\xe9pondre. Nous pr\xe9voyons de traiter un vaste panel de th\xe9matiques :"})}),Object(d.jsxs)(cn,{children:[Object(d.jsx)(sn,{size:1,children:"logement"}),Object(d.jsx)(sn,{size:.7,children:"formation"}),Object(d.jsx)(sn,{size:1.7,children:"emploi"}),Object(d.jsx)(sn,{size:1.2,children:"agriculture"}),Object(d.jsx)(sn,{size:.9,children:"d\xe9mographie"}),Object(d.jsx)(sn,{size:1.2,children:"littoral"}),Object(d.jsx)(sn,{size:.6,children:"\xe9conomie circulaire"}),Object(d.jsx)(sn,{size:1.3,children:"biodiversit\xe9"}),Object(d.jsx)(sn,{size:.8,children:"\xe9missions de C02"}),Object(d.jsx)(sn,{size:.6,children:"eau"}),Object(d.jsx)(sn,{size:1,children:"in\xe9galit\xe9s \xe9conomiques"}),Object(d.jsx)(sn,{size:1.8,children:"d\xe9chets"}),Object(d.jsx)(sn,{size:1,children:"\xe9galite femmes/hommes"}),Object(d.jsx)(sn,{size:1.3,children:"usage des sols"}),Object(d.jsx)(sn,{size:.7,children:"tissu productif"}),Object(d.jsx)(sn,{size:1.2,children:"\xc9nergie"})]})]})}),Object(d.jsx)(Ve,{children:Object(d.jsx)(Ye,{limitWidth:!0,children:Object(d.jsx)($e,{children:Object(d.jsxs)(tn,{children:["Si vous souhaitez sugg\xe9rer le d\xe9veloppement d'analyses, ou \xeatre inform\xe9 de l'\xe9volution du projet :"," ",Object(d.jsxs)(rn,{children:[" ",Object(d.jsx)(on,{href:"mailto:yann.david@enpc.fr",target:"_blank",children:"contactez-nous !"})]})]})})})})]})]})}),un=function(){return Object(d.jsx)(I.a,{basename:"",children:Object(d.jsxs)(u,{children:[Object(d.jsx)(y,{}),Object(d.jsx)(f.c,{children:Object(d.jsxs)("div",{className:"app-container",children:[Object(d.jsx)("div",{className:"content-app",children:Object(d.jsx)(f.a,{path:"/",exact:!0,children:Object(d.jsx)(dn,{})})}),Object(d.jsx)(v,{})]})})]})})},fn=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,41)).then((function(n){var t=n.getCLS,r=n.getFID,i=n.getFCP,c=n.getLCP,s=n.getTTFB;t(e),r(e),i(e),c(e),s(e)}))},pn=Object(E.a)(qe||(qe=Object(r.a)(['\n/* @import url("https://fonts.googleapis.com/css2?family=Urbanist&display=swap"); */\n  body {\n  margin: 0;\n  font-size: 18px;\n  font-family: "Urbanist", sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  max-width: 100%;\n}\n*{  font-family: "Urbanist", sans-serif;\n\n}\n'])));o.a.render(Object(d.jsxs)(c.a.StrictMode,{children:[Object(d.jsx)(pn,{}),Object(d.jsx)(un,{})]}),document.getElementById("root")),fn()}},[[40,1,2]]]);
//# sourceMappingURL=main.91622332.chunk.js.map