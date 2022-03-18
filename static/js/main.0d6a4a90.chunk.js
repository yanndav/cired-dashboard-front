(this["webpackJsonpcired-dashboard-front"]=this["webpackJsonpcired-dashboard-front"]||[]).push([[0],{30:function(e,n,t){},31:function(e,n,t){},33:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var r,i,s,c=t(2),o=t(0),a=t.n(o),l=t(19),d=t.n(l),j=(t(30),t(31),t(14)),b=Object(o.createContext)(),u=t(1),h=function(e){var n=e.children,t=Object(o.useState)("light"),r=Object(j.a)(t,2),i=r[0],s=r[1],c=Object(o.useState)({connected:!1}),a=Object(j.a)(c,2),l=a[0],d=a[1],h=function(){var e=function(){return{width:window.innerWidth,height:window.innerHeight}},n=Object(o.useState)(e()),t=Object(j.a)(n,2),r=t[0],i=t[1];return Object(o.useEffect)((function(){var n=function(){return i(e())};return window.addEventListener("resize",n),function(){return window.removeEventListener("resize",n)}}),[]),r}(),x=h.width,p=h.height;return Object(u.jsx)(b.Provider,{value:{theme:i,toggleTheme:function(){s("light"===i?"dark":"light")},API_URL:"http://127.0.0.1:5000",user:l,setUser:d,width:x,height:p},children:n})},x=(t(33),function(){return Object(u.jsxs)("div",{className:"footer-container",children:[Object(u.jsx)("a",{className:"footer-logo",href:"https://www.centre-cired.fr/",target:"_blank",rel:"noreferrer",children:Object(u.jsx)("img",{src:"logo-cired.jpeg",alt:"CIRED",width:"55px"})}),Object(u.jsx)("a",{className:"footer-logo",href:"https://www.ecoledesponts.fr/",target:"_blank",rel:"noreferrer",children:Object(u.jsx)("img",{className:"footer-logo",src:"logo-enpc.png",alt:"ENPC",width:"40px"})}),Object(u.jsx)("p",{children:"Comparater - Version pr\xe9-sortie - CIRED-ENPC 2022"})]})}),p=t(3),f="#577590",m="#f5f5f5",O="#81b29a",g="#6E94B7",v=p.b.img(r||(r=Object(c.a)(["\n  width: ",";\n  margin-right: 7px;\n  transition: 0.1s width, 0.1s margin, 0.1s filter;\n  cursor: pointer;\n"])),(function(e){return"undefined"!==typeof e.size?e.size+"em":"1em"})),w=t(11),y=p.b.div(i||(i=Object(c.a)(["\n  position: ",";\n  top: ",";\n  padding: 20px;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  background-color: white;\n  z-index: 100;\n"])),(function(e){return e.sticky&&"sticky"}),(function(e){return e.sticky&&"0px"})),z=Object(p.b)(w.b)(s||(s=Object(c.a)(["\n  text-decoration: none;\n  display: flex;\n  flex-direction: row;\n  cursor: pointer;\n  font-size: 2.2em;\n  color: ",";\n\n  &:hover {\n    color: ",";\n    img {\n      width: 1.2em;\n      margin-top: -5px;\n      filter: drop-shadow(3px 3px 3px rgba(168, 168, 168, 0.801));\n    }\n  }\n"])),f,g),k=function(e){var n=e.sticky;return Object(u.jsx)(y,{sticky:n,children:Object(u.jsxs)(z,{to:"/",children:[Object(u.jsx)(v,{src:"logo_comparater.svg",alt:"Logo ComparaTer"}),"comparater"]})})},C=t(24);t.p;t.p;var q,E,S,L,N,T,_,P,D,F,I,R,U,B,W,M,A=p.b.div(q||(q=Object(c.a)(["\n  padding: 0px 15%;\n  min-width: 400px;\n  background-color: ",";\n"])),m),J=p.b.div(E||(E=Object(c.a)(["\n  margin: 0px auto;\n  /* max-width: ","; */\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: ",";\n  min-height: ",";\n  padding-bottom: ",";\n"])),(function(e){return!e.full&&"900px"}),(function(e){return e.big?"100px":"30px"}),(function(e){return e.full&&"95vh"}),(function(e){return e.full?"30px":"100px"})),V=p.b.h2(S||(S=Object(c.a)(["\n  font-size: 2.4em;\n  color: ",";\n  font-weight: none;\n"])),f),H=p.b.h3(L||(L=Object(c.a)(["\n  font-size: 1.4em;\n  line-height: 1.4em;\n  font-weight: none;\n"]))),G=p.b.div(N||(N=Object(c.a)(["\n  z-index: 0;\n  text-decoration: none;\n  font-weight: bold;\n  font-size: 1.3em;\n  width: 400px;\n  min-width: 300px;\n  height: 50px;\n\n  margin: 0px auto;\n  padding: 15px 12px;\n  border-radius: 8px;\n  background-color: ",";\n  color: white;\n  position: relative;\n  top: 0;\n  box-shadow: white;\n  transition: top ease 0.2s, box-shadow ease 0.1s, 0.1s background-color;\n  /* Text centering */\n  text-align: center;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  &:hover {\n    /* Box animation on hover */\n    box-shadow: 3px 3px 7px rgba(168, 168, 168, 0.801);\n    top: -2px;\n    cursor: pointer;\n    filter: brightness(110%);\n  }\n"])),O),K=p.b.div(T||(T=Object(c.a)(["\n  display: flex;\n  max-width: ",";\n\n  flex-direction: column;\n  gap: ",";\n"])),(function(e){return e.limitWidth&&"800px"}),(function(e){return e.small?"10px":"40px"})),Q=p.b.div(_||(_=Object(c.a)(["\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  gap: 50px;\n  font-size: 1.1em;\n  flex-shrink: ",";\n  flex-grow: ",";\n  flex-basis: ",";\n  margin-bottom: ",";\n"])),(function(e){return e.shrink&&20}),(function(e){return e.shrink&&20}),(function(e){return e.shrink&&"300px"}),(function(e){return e.bottomSpace&&"40px"})),X=p.b.div(P||(P=Object(c.a)(["\n  text-align: justify;\n  line-height: 2em;\n  flex-basis: 300px;\n  flex-shrink: 1;\n  flex-grow: 10;\n"]))),Y=p.b.span(D||(D=Object(c.a)(["\n  color: ",";\n  font-weight: bolder;\n"])),f),Z=p.b.div(F||(F=Object(c.a)(["\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 10px;\n"]))),$=p.b.div(I||(I=Object(c.a)(["\n  color: ",";\n  font-size: ",";\n"])),f,(function(e){return 1.2*e.size+"em"})),ee=p.b.a(R||(R=Object(c.a)(["\n  color: inherit;\n  text-decoration: none;\n  &:hover {\n    color: ",";\n  }\n"])),g),ne=p.b.div(U||(U=Object(c.a)(["\n  font-size: 1em;\n"]))),te=Object(p.b)(C.a)(B||(B=Object(c.a)(["\n  margin-left: 10px;\n  transform: scale(1.2);\n"]))),re=p.b.div(W||(W=Object(c.a)(["\n  flex-basis: 600px;\n  flex-grow: 10;\n  flex-shrink: 1;\n  margin: ",";\n"])),(function(e){return e.center&&"auto"})),ie=p.b.img(M||(M=Object(c.a)(["\n  width: 100%;\n  max-width: 800px;\n  filter: drop-shadow(5px 5px 10px rgba(168, 168, 168, 0.801));\n"]))),se=function(){var e=Object(o.useRef)(null);return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(k,{sticky:!0}),Object(u.jsxs)(A,{children:[Object(u.jsxs)(J,{full:!0,big:!0,children:[Object(u.jsxs)(K,{small:!0,children:[Object(u.jsx)(V,{children:"Analysez et comparez les transitions dans votre territoire."}),Object(u.jsx)(H,{children:"Cr\xe9ez et personnalisez des tableaux d'analyses des donn\xe9es en libre acc\xe8s sur votre territoire."})]}),Object(u.jsxs)(G,{onClick:function(){return window.scrollTo({top:e.current.getBoundingClientRect().top-90,behavior:"smooth"})},children:["En savoir plus sur le projet ",Object(u.jsx)(te,{})]}),Object(u.jsx)(ne,{children:"La premi\xe8re version en ligne arrive en avril 2022."})]}),Object(u.jsxs)(J,{big:!0,ref:e,children:[Object(u.jsxs)(K,{limitWidth:!0,children:[Object(u.jsx)(H,{children:"Comparater c'est quoi ?"}),Object(u.jsxs)(Q,{children:["Comparater vise \xe0 appuyer le pilotage de la transition \xe9cologique dans les territoires, en g\xe9n\xe9rant des analyses interactives de donn\xe9es territorialis\xe9es."," "]}),Object(u.jsx)(re,{center:!0,children:Object(u.jsx)(ie,{src:"./Screenshot_demo(1).svg",alt:"Maquette de la future application en ligne"})})]}),Object(u.jsxs)(K,{children:[Object(u.jsx)(H,{children:"Comment \xe7a marche ?"}),Object(u.jsxs)(Q,{bottomSpace:!0,children:[Object(u.jsxs)(X,{children:[Object(u.jsx)(Y,{children:"D\xe9finissez votre p\xe9rim\xe8tre territorial"}),". \xc0 partir de la barre de recherche et de l\u2019outil d\xe9di\xe9 vous pouvez d\xe9finir librement votre p\xe9rim\xe8tre territorial et l'\xe9chelle d'analyse en s\xe9lectionnant un ensemble de communes, intercommunalit\xe9s, d\xe9partements et/ou r\xe9gions de France."]}),Object(u.jsx)(re,{children:Object(u.jsx)(ie,{src:"./Screenshot_perimetre.png",alt:"Maquette de l'espace de s\xe9lection du territoire'"})})]}),Object(u.jsxs)(Q,{children:[Object(u.jsxs)(X,{children:[Object(u.jsx)(Y,{children:"S\xe9lectionnez des analyses"}),". Construisez votre tableau de bord en s\xe9lectionnant des analyses interactives qui s'adaptent \xe0 votre territoire. Vous pouvez \xe9galement comparer votre territoire \xe0 d'autres."]}),Object(u.jsx)(re,{children:Object(u.jsx)(ie,{src:"./Screenshot_analyse.png",alt:"Maquette de l'espace de s\xe9lection du territoire'"})})]})]}),Object(u.jsxs)(K,{limitWidth:!0,children:[Object(u.jsx)(H,{children:"La rigueur scientifique accessible"}),Object(u.jsx)(Q,{children:Object(u.jsxs)(X,{children:["D\xe9velopp\xe9 dans une d\xe9marche de",Object(u.jsx)(Y,{children:" recherche-action par une \xe9quipe du CIRED"}),", Comparater se construit en"," ",Object(u.jsx)(Y,{children:"partenariat avec des d\xe9cideurs territoriaux"}),"."]})}),Object(u.jsx)(Q,{children:Object(u.jsxs)(X,{children:["Nos analyses sont"," ",Object(u.jsx)(Y,{children:"pr\xe9-configur\xe9es et d\xe9velopp\xe9es par un r\xe9seau de scientifiques"})," ","d\xe9sireux de rendre accessible leurs r\xe9sultats de recherche. Toutes les donn\xe9es utilis\xe9es sont officielles, sourc\xe9es et ouvertes."]})}),Object(u.jsx)(Q,{children:Object(u.jsxs)(X,{children:["Comparater propose ainsi"," ",Object(u.jsx)(Y,{children:"une exp\xe9rience de m\xe9diation scientifique interactive"})," ","pour accompagner des d\xe9cisions bas\xe9es sur des analyses rigoureuses."]})})]}),Object(u.jsxs)(K,{limitWidth:!0,children:[Object(u.jsx)(H,{children:"Une large gamme th\xe9matique d'analyses pour soutenir les projets d'\xe9cod\xe9veloppement"}),Object(u.jsx)(Q,{children:Object(u.jsx)(X,{children:"Les analyses propos\xe9es vise \xe0 r\xe9pondre aux questionnements des d\xe9cideurs territoriaux avec lesquels nous travaillons. Pour r\xe9pondre \xe0 leurs probl\xe9matiques, une vari\xe9t\xe9 de th\xe9matiques pourront \xe0 terme \xeatre analys\xe9s via Comparater."})}),Object(u.jsxs)(Z,{children:[Object(u.jsx)($,{size:1,children:"logement"}),Object(u.jsx)($,{size:.7,children:"formation"}),Object(u.jsx)($,{size:1.7,children:"emploi"}),Object(u.jsx)($,{size:1.2,children:"agriculture"}),Object(u.jsx)($,{size:.9,children:"d\xe9mographie"}),Object(u.jsx)($,{size:1.3,children:"usage des sols"}),Object(u.jsx)($,{size:1.8,children:"d\xe9chets"}),Object(u.jsx)($,{size:.7,children:"tissu productif"}),Object(u.jsx)($,{size:1.2,children:"\xc9nergie"})]}),Object(u.jsx)(Q,{children:Object(u.jsxs)(X,{children:["Si vous souhaitez sugg\xe9rer le d\xe9veloppement d'analyses, ou \xeatre inform\xe9 de l'\xe9volution du projet :"," ",Object(u.jsxs)(Y,{children:[" ",Object(u.jsx)(ee,{href:"mailto:contact@comparater.fr",target:"_blank",children:"contactez-nous !"})]})]})})]})]})]})]})},ce=t(25),oe=t(4);var ae,le=Object(oe.f)((function(e){var n=e.history,t=e.children;return Object(o.useEffect)((function(){var e=n.listen((function(){window.scrollTo({top:0,behavior:"smooth"})}));return function(){e()}}),[]),Object(ce.a)({},t)})),de=function(){return Object(u.jsx)(w.a,{basename:"",children:Object(u.jsx)(h,{children:Object(u.jsx)(oe.c,{children:Object(u.jsxs)("div",{className:"app-container",children:[Object(u.jsx)("div",{className:"content-app",children:Object(u.jsx)(le,{children:Object(u.jsx)(oe.a,{path:"/",exact:!0,children:Object(u.jsx)(se,{})})})}),Object(u.jsx)(x,{})]})})})})},je=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,41)).then((function(n){var t=n.getCLS,r=n.getFID,i=n.getFCP,s=n.getLCP,c=n.getTTFB;t(e),r(e),i(e),s(e),c(e)}))},be=Object(p.a)(ae||(ae=Object(c.a)(['\n/* @import url("https://fonts.googleapis.com/css2?family=Urbanist&display=swap"); */\n  body {\n  margin: 0;\n  font-size: 18px;\n  font-family: "Urbanist", sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  max-width: 100%;\n}\n*{  font-family: "Urbanist", sans-serif;\n\n}\n'])));d.a.render(Object(u.jsxs)(a.a.StrictMode,{children:[Object(u.jsx)(be,{}),Object(u.jsx)(de,{})]}),document.getElementById("root")),je()}},[[40,1,2]]]);
//# sourceMappingURL=main.0d6a4a90.chunk.js.map