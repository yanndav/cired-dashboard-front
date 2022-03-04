webpackHotUpdate("main",{

/***/ "./src/accueil/Accueil.jsx":
/*!*********************************!*\
  !*** ./src/accueil/Accueil.jsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _app_colorComponents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app/colorComponents */ "./src/app/colorComponents.js");
/* harmony import */ var _app_components_header_Header_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app/components/header/Header.jsx */ "./src/app/components/header/Header.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/home/yann/Documents/cired-dashboard-front/src/accueil/Accueil.jsx";
// -----------------------------------------------------------------------
// -- PAGE D'ACCUEIL DE TV
// -- Décembre 2021
// -----------------------------------------------------------------------
// IMPORTATIONS -----------------------------
// import "./Accueil.css";






const ContainerAccueil = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
  padding: 80px 15%;
  min-width: 400px;
  background-color: ${_app_colorComponents__WEBPACK_IMPORTED_MODULE_1__["colorsLight"].background};
`;
_c = ContainerAccueil;
const ColumnFlexContainer = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.big ? "70px" : "30px"};
  margin: 70px 0px;
`;
_c2 = ColumnFlexContainer;
const RowFlexContainer = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 80px;
  flex-wrap: wrap;
`;
_c3 = RowFlexContainer;
const TitrePage = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].h2`
  font-size: 2.4em;
  color: ${_app_colorComponents__WEBPACK_IMPORTED_MODULE_1__["colorsLight"].title2};
`;
_c4 = TitrePage;
const SousTitrePage = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].h3`
  font-size: 1.4em;
  line-height: 1.4em;
`;
_c5 = SousTitrePage;
const BoutonTableau = Object(styled_components__WEBPACK_IMPORTED_MODULE_0__["default"])(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"])`
  text-decoration: none;
  font-weight: bold;
  font-size: 1.3em;
  width: 300px;
  min-width: 300px;
  height: 50px;

  margin: auto 10px;
  padding: 15px 12px;
  border-radius: 8px;
  background-color: ${_app_colorComponents__WEBPACK_IMPORTED_MODULE_1__["colorsLight"].title2};
  color: white;
  position: relative;
  top: 0;
  box-shadow: white;
  transition: top ease 0.2s, box-shadow ease 0.1s, 0.1s background-color;
  /* Text centering */
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    /* Box animation on hover */
    box-shadow: 3px 3px 7px rgba(168, 168, 168, 0.801);
    top: -2px;
    cursor: pointer;
    filter: brightness(110%);
  }
`;
_c6 = BoutonTableau;
const Section = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.small ? "20px" : "40px"};
`;
_c7 = Section;
const Argument = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`;
_c8 = Argument;
const ZoneTexte = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
  text-align: justify;
  line-height: 2em;
`;
_c9 = ZoneTexte;
const Emphase = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].span`
  color: ${_app_colorComponents__WEBPACK_IMPORTED_MODULE_1__["colorsLight"].title};
  font-weight: bolder;
`;
_c10 = Emphase;
const Icone = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
  font-size: 3em;
  margin: 10px 30px;
  text-align: center;
`;
_c11 = Icone;
const WordCloud = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;
_c12 = WordCloud;
const Mot = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
  color: ${_app_colorComponents__WEBPACK_IMPORTED_MODULE_1__["colorsLight"].title};
  font-size: ${props => props.size * 1.2 + "em"};
`;
_c13 = Mot;
const Lien = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].a`
  color: inherit;
  text-decoration: none;
  &:hover {
    color: ${_app_colorComponents__WEBPACK_IMPORTED_MODULE_1__["colorsLight"].interaction};
  }
`; // COMPOSANT --------------------------------

_c14 = Lien;

const Accueil = () => {
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["Fragment"], {
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(_app_components_header_Header_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 128,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(ContainerAccueil, {
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(RowFlexContainer, {
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Section, {
          small: true,
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(TitrePage, {
            children: "Analysez et comparez les transitions dans votre territoire."
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 132,
            columnNumber: 13
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(SousTitrePage, {
            children: "Cr\xE9ez et personnalisez vos tableaux de bord \xE0 partir de modules d'analyse de donn\xE9es locales et de mod\xE9lisations."
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 135,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 131,
          columnNumber: 11
        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(BoutonTableau, {
          to: "/tableau",
          exact: true,
          children: "Cr\xE9er un tableau"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 140,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 130,
        columnNumber: 9
      }, undefined), " ", /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(ColumnFlexContainer, {
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Section, {
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(SousTitrePage, {
            children: "Comment \xE7a marche ?"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 146,
            columnNumber: 13
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Argument, {
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Icone, {
              children: "\uD83D\uDD0D\uFE0F"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 148,
              columnNumber: 15
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(ZoneTexte, {
              children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Emphase, {
                children: "D\xE9finissez votre p\xE9rim\xE8tre territorial"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 150,
                columnNumber: 17
              }, undefined), ". \xC0 partir de la barre de recherche et de l\u2019outil d\xE9di\xE9 vous pouvez d\xE9finir librement votre p\xE9rim\xE8tre territorial en s\xE9lectionnant un ensemble de communes, intercommunalit\xE9s, d\xE9partements et/ou r\xE9gions de France."]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 149,
              columnNumber: 15
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 147,
            columnNumber: 13
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Argument, {
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Icone, {
              children: "\uD83C\uDF9B\uFE0F"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 158,
              columnNumber: 15
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(ZoneTexte, {
              children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Emphase, {
                children: "S\xE9lectionnez des modules d\u2019analyse"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 160,
                columnNumber: 17
              }, undefined), ". Construisez votre tableau de bord en s\xE9lectionnant des modules d'analyse et de mod\xE9lisation qui s'adaptent \xE0 votre territoire. Vous pouvez \xE9galement d\xE9finir des territoires de comparaison."]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 159,
              columnNumber: 15
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 157,
            columnNumber: 13
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Argument, {
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Icone, {
              children: "\uD83D\uDCBE"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 167,
              columnNumber: 15
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(ZoneTexte, {
              children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Emphase, {
                children: "Personnalisez, enregistrez et partagez"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 169,
                columnNumber: 17
              }, undefined), ". Ajustez le tableau de bord \xE0 vos besoins et diffusez les analyses de votre territoire."]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 168,
              columnNumber: 15
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 166,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 145,
          columnNumber: 11
        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Section, {
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(SousTitrePage, {
            children: "La rigueur scientifique accessible"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 176,
            columnNumber: 13
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Argument, {
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(ZoneTexte, {
              children: ["D\xE9velopp\xE9 dans une d\xE9marche de", /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Emphase, {
                children: " recherche-action par une \xE9quipe du CIRED"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 180,
                columnNumber: 17
              }, undefined), ", ComparaTer se construit en", " ", /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Emphase, {
                children: "partenariat avec des d\xE9cideurs territoriaux "
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 182,
                columnNumber: 17
              }, undefined), "issus de plusieurs r\xE9gions de France."]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 178,
              columnNumber: 15
            }, undefined)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 177,
            columnNumber: 13
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Argument, {
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(ZoneTexte, {
              children: ["Nos modules th\xE9matiques sont", " ", /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Emphase, {
                children: "pr\xE9-configur\xE9s par un r\xE9seau de scientifiques"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 189,
                columnNumber: 17
              }, undefined), " ", "d\xE9sireux de rendre accessible leurs r\xE9sultats de recherche. Toutes les analyses sont issues de donn\xE9es officielles et ouvertes."]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 187,
              columnNumber: 15
            }, undefined)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 186,
            columnNumber: 13
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Argument, {
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(ZoneTexte, {
              children: ["ComparaTer propose ainsi", " ", /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Emphase, {
                children: "une exp\xE9rience de m\xE9diation scientifique interactive"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 198,
                columnNumber: 17
              }, undefined), " ", "pour accompagner des d\xE9cisions bas\xE9es sur des analyses rigoureuses."]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 196,
              columnNumber: 15
            }, undefined)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 195,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 175,
          columnNumber: 11
        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Section, {
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(SousTitrePage, {
            children: "Une large gamme de modules th\xE9matiques pour soutenir les projets d'\xE9cod\xE9veloppement"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 207,
            columnNumber: 13
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Argument, {
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(ZoneTexte, {
              children: "Le d\xE9veloppement de modules s'appui sur les demandes des d\xE9cideurs territoriaux avec lesquels nous travaillons. Pour r\xE9pondre \xE0 leurs questionnements, une vari\xE9t\xE9 de th\xE9matiques pourront \xE0 terme \xEAtre analys\xE9s via ComparaTer."
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 212,
              columnNumber: 15
            }, undefined)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 211,
            columnNumber: 13
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(WordCloud, {
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Mot, {
              size: 1,
              children: "logement"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 220,
              columnNumber: 15
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Mot, {
              size: 0.7,
              children: "formation"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 221,
              columnNumber: 15
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Mot, {
              size: 1.7,
              children: "emploi"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 222,
              columnNumber: 15
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Mot, {
              size: 1.2,
              children: "agriculture"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 223,
              columnNumber: 15
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Mot, {
              size: 0.9,
              children: "d\xE9mographie"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 224,
              columnNumber: 15
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Mot, {
              size: 1.3,
              children: "usage des sols"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 225,
              columnNumber: 15
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Mot, {
              size: 1.8,
              children: "d\xE9chets"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 226,
              columnNumber: 15
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Mot, {
              size: 0.7,
              children: "tissu productif"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 227,
              columnNumber: 15
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Mot, {
              size: 1.2,
              children: "\xC9nergie"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 228,
              columnNumber: 15
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 219,
            columnNumber: 13
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Argument, {
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(ZoneTexte, {
              children: ["Si vous souhaitez sugg\xE9rer le d\xE9veloppement de modules, ou \xEAtre inform\xE9 de l'\xE9volution du projet :", " ", /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Emphase, {
                children: [" ", /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(Lien, {
                  href: "mailto:yann.david@enpc.fr",
                  target: "_blank",
                  children: "contactez-nous !"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 236,
                  columnNumber: 19
                }, undefined)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 234,
                columnNumber: 17
              }, undefined)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 231,
              columnNumber: 15
            }, undefined)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 230,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 206,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 144,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 129,
      columnNumber: 7
    }, undefined)]
  }, void 0, true);
};

_c15 = Accueil;
/* harmony default export */ __webpack_exports__["default"] = (Accueil);

var _c, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15;

__webpack_require__.$Refresh$.register(_c, "ContainerAccueil");
__webpack_require__.$Refresh$.register(_c2, "ColumnFlexContainer");
__webpack_require__.$Refresh$.register(_c3, "RowFlexContainer");
__webpack_require__.$Refresh$.register(_c4, "TitrePage");
__webpack_require__.$Refresh$.register(_c5, "SousTitrePage");
__webpack_require__.$Refresh$.register(_c6, "BoutonTableau");
__webpack_require__.$Refresh$.register(_c7, "Section");
__webpack_require__.$Refresh$.register(_c8, "Argument");
__webpack_require__.$Refresh$.register(_c9, "ZoneTexte");
__webpack_require__.$Refresh$.register(_c10, "Emphase");
__webpack_require__.$Refresh$.register(_c11, "Icone");
__webpack_require__.$Refresh$.register(_c12, "WordCloud");
__webpack_require__.$Refresh$.register(_c13, "Mot");
__webpack_require__.$Refresh$.register(_c14, "Lien");
__webpack_require__.$Refresh$.register(_c15, "Accueil");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ })

})
//# sourceMappingURL=main.e722f1eaea641808a2b8.hot-update.js.map