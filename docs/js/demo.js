(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('react'), require('react-dom')) :
    typeof define === 'function' && define.amd ? define(['react', 'react-dom'], factory) :
    (global = global || self, factory(global.React, global.ReactDOM));
}(this, function (React, ReactDOM) { 'use strict';

    var React__default = 'default' in React ? React['default'] : React;
    ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function computeVisiblePieces(activePage, config) {
        var numberOfPages = config.numberOfPages, maxButtons = config.maxButtons, showEllipsis = config.showEllipsis, padding = config.padding;
        var visiblePieces = [];
        if (numberOfPages <= maxButtons) {
            for (var page = 1; page <= numberOfPages; page++) {
                visiblePieces.push({ type: 'page-number', pageNumber: page });
            }
            return visiblePieces;
        }
        var lowerLimit = activePage;
        var upperLimit = activePage;
        visiblePieces.push({
            type: 'previous',
            pageNumber: Math.max(1, activePage - 1),
            isDisabled: activePage === 1,
        });
        // From https://gist.github.com/keon/5380f81393ad98ec19e6
        for (var i = 1; i < maxButtons && i < numberOfPages;) {
            if (lowerLimit > 1) {
                lowerLimit--;
                i++;
            }
            if (i < maxButtons && upperLimit < numberOfPages) {
                upperLimit++;
                i++;
            }
        }
        if (lowerLimit > 1) {
            visiblePieces.push({ type: 'page-number', pageNumber: 1 });
            visiblePieces.push({ type: 'ellipsis' });
        }
        for (var i = lowerLimit; i <= upperLimit; i++) {
            visiblePieces.push({ type: 'page-number', pageNumber: i });
        }
        if (activePage < numberOfPages - 2) {
            visiblePieces.push({ type: 'ellipsis' });
            visiblePieces.push({ type: 'page-number', pageNumber: numberOfPages });
        }
        visiblePieces.push({
            type: 'next',
            pageNumber: Math.min(numberOfPages, activePage + 1),
            isDisabled: activePage === numberOfPages,
        });
        return visiblePieces;
    }
    function usePagination(_config) {
        if (typeof _config !== 'object') {
            throw new TypeError("usePagination(config): config must be an object. Go " + typeof _config + " instead");
        }
        var config = __assign({ maxButtons: 5, padding: 2 }, _config);
        var _a = React.useState(config.initialPage), activePage = _a[0], setActivePage = _a[1];
        var numberOfPages = config.numberOfPages;
        var isFirst = activePage === 1;
        var isLast = activePage === numberOfPages;
        var hasPrevious = numberOfPages > 1 && activePage > 1;
        var hasNext = activePage < numberOfPages;
        var visiblePieces = computeVisiblePieces(activePage, config);
        var goToPage = React.useCallback(function (pageNumber) {
            setActivePage(pageNumber);
        }, []);
        React.useEffect(function () {
            if (config.initialPage !== activePage) {
                setActivePage(config.initialPage);
            }
        }, [config.initialPage]);
        return {
            activePage: activePage,
            isFirst: isFirst,
            isLast: isLast,
            hasPrevious: hasPrevious,
            hasNext: hasNext,
            visiblePieces: visiblePieces,
            goToPage: goToPage,
        };
    }

    var SOURCE_DEMO = "\nconst pagination = usePagination({\n  initialPage: %INITIAL_PAGE%,\n  numberOfPages: %NUMBER_OF_PAGES%,\n  maxButtons: %MAX_BUTTONS%,\n});\n\n// render however you like\n".trim();
    function Demo() {
        var _a = React__default.useState(1), initialPage = _a[0], setInitialPage = _a[1];
        var _b = React__default.useState(10), numberOfPages = _b[0], setNumberOfPages = _b[1];
        var _c = React__default.useState(5), maxButtons = _c[0], setMaxButtons = _c[1];
        React__default.useEffect(function () {
            if (initialPage > numberOfPages) {
                setInitialPage(numberOfPages);
            }
        }, [initialPage, numberOfPages]);
        React__default.useEffect(function () {
            if (maxButtons > numberOfPages) {
                setMaxButtons(numberOfPages);
            }
        }, [maxButtons, numberOfPages]);
        var _d = usePagination({ initialPage: initialPage, numberOfPages: numberOfPages, maxButtons: maxButtons }), activePage = _d.activePage, visiblePieces = _d.visiblePieces, goToPage = _d.goToPage;
        return (React__default.createElement("div", { className: "container" },
            React__default.createElement("h1", null, "react-pagination-hook demo"),
            React__default.createElement("div", { className: "row" },
                React__default.createElement("div", { className: "col-md-2" }, "Initial page:"),
                React__default.createElement("div", null,
                    React__default.createElement("input", { type: "range", value: initialPage, min: 1, max: numberOfPages, onChange: function (event) { return setInitialPage(Number(event.target.value)); } }),
                    initialPage)),
            React__default.createElement("div", { className: "row" },
                React__default.createElement("div", { className: "col-md-2" }, "Number of pages:"),
                React__default.createElement("div", null,
                    React__default.createElement("input", { type: "range", value: numberOfPages, min: 1, max: 100, onChange: function (event) { return setNumberOfPages(Number(event.target.value)); } }),
                    numberOfPages)),
            React__default.createElement("div", { className: "row" },
                React__default.createElement("div", { className: "col-md-2" }, "Max buttons:"),
                React__default.createElement("div", null,
                    React__default.createElement("input", { type: "range", value: maxButtons, min: 1, max: 10, onChange: function (event) { return setMaxButtons(Number(event.target.value)); } }),
                    maxButtons)),
            React__default.createElement("pre", null,
                React__default.createElement("code", null, SOURCE_DEMO
                    .replace('%INITIAL_PAGE%', String(initialPage))
                    .replace('%NUMBER_OF_PAGES%', String(numberOfPages))
                    .replace('%MAX_BUTTONS%', String(maxButtons)))),
            React__default.createElement("div", { style: { display: 'flex' } }, visiblePieces.map(function (visiblePiece, index) {
                var key = visiblePiece.type + "-" + index;
                if (visiblePiece.type === 'ellipsis') {
                    return React__default.createElement("div", { key: key, style: { lineHeight: '48px' } }, "...");
                }
                var pageNumber = visiblePiece.pageNumber;
                var onClick = function () { return goToPage(pageNumber); };
                if (visiblePiece.type === 'page-number') {
                    var isActive = pageNumber === activePage;
                    var className = isActive ? 'primary' : '';
                    return React__default.createElement("button", { key: key, onClick: onClick, className: className }, pageNumber);
                }
                return React__default.createElement("button", { key: key, disabled: visiblePiece.isDisabled, onClick: onClick }, visiblePiece.type === 'next' ? '>' : '<');
            })),
            React__default.createElement("hr", null),
            React__default.createElement("p", { style: { textAlign: 'right' } },
                React__default.createElement("a", { href: "https://github.com/eliseumds/react-pagination-hook/tree/master/src/demo.tsx", target: "_blank" }, "Click here"),
                " to see the code for this demo")));
    }
    ReactDOM.render(React__default.createElement(Demo, null), document.getElementById('demo-container'));

}));
