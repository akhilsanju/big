"use strict";
(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_search_js"],{

/***/ "./assets/js/theme/search.js":
/*!***********************************!*\
  !*** ./assets/js/theme/search.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Search)
/* harmony export */ });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var jstree__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! jstree */ "./node_modules/jstree/dist/jstree.min.js");
/* harmony import */ var jstree__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(jstree__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var leftArrowKey = 37;
var rightArrowKey = 39;
var Search = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Search, _CatalogPage);
  function Search() {
    return _CatalogPage.apply(this, arguments) || this;
  }
  var _proto = Search.prototype;
  _proto.formatCategoryTreeForJSTree = function formatCategoryTreeForJSTree(node) {
    var _this = this;
    var nodeData = {
      text: node.data,
      id: node.metadata.id,
      state: {
        selected: node.selected
      }
    };
    if (node.state) {
      nodeData.state.opened = node.state === 'open';
      nodeData.children = true;
    }
    if (node.children) {
      nodeData.children = [];
      node.children.forEach(function (childNode) {
        nodeData.children.push(_this.formatCategoryTreeForJSTree(childNode));
      });
    }
    return nodeData;
  };
  _proto.showProducts = function showProducts(navigate) {
    if (navigate === void 0) {
      navigate = true;
    }
    this.$productListingContainer.removeClass('u-hidden');
    this.$facetedSearchContainer.removeClass('u-hidden');
    this.$contentResultsContainer.addClass('u-hidden');
    $('[data-content-results-toggle]').removeClass('navBar-action-color--active');
    $('[data-content-results-toggle]').addClass('navBar-action');
    $('[data-product-results-toggle]').removeClass('navBar-action');
    $('[data-product-results-toggle]').addClass('navBar-action-color--active');
    this.activateTab($('[data-product-results-toggle]'));
    if (!navigate) {
      return;
    }
    var searchData = $('#search-results-product-count span').data();
    var url = searchData.count > 0 ? searchData.url : _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].replaceParams(searchData.url, {
      page: 1
    });
    _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url);
  };
  _proto.showContent = function showContent(navigate) {
    if (navigate === void 0) {
      navigate = true;
    }
    this.$contentResultsContainer.removeClass('u-hidden');
    this.$productListingContainer.addClass('u-hidden');
    this.$facetedSearchContainer.addClass('u-hidden');
    $('[data-product-results-toggle]').removeClass('navBar-action-color--active');
    $('[data-product-results-toggle]').addClass('navBar-action');
    $('[data-content-results-toggle]').removeClass('navBar-action');
    $('[data-content-results-toggle]').addClass('navBar-action-color--active');
    this.activateTab($('[data-content-results-toggle]'));
    if (!navigate) {
      return;
    }
    var searchData = $('#search-results-content-count span').data();
    var url = searchData.count > 0 ? searchData.url : _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].replaceParams(searchData.url, {
      page: 1
    });
    _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url);
  };
  _proto.activateTab = function activateTab($tabToActivate) {
    var $tabsCollection = $('[data-search-page-tabs]').find('[role="tab"]');
    $tabsCollection.each(function (idx, tab) {
      var $tab = $(tab);
      if ($tab.is($tabToActivate)) {
        $tab.removeAttr('tabindex');
        $tab.attr('aria-selected', true);
        return;
      }
      $tab.attr('tabindex', '-1');
      $tab.attr('aria-selected', false);
    });
  };
  _proto.onTabChangeWithArrows = function onTabChangeWithArrows(event) {
    var eventKey = event.which;
    var isLeftOrRightArrowKeydown = eventKey === leftArrowKey || eventKey === rightArrowKey;
    if (!isLeftOrRightArrowKeydown) return;
    var $tabsCollection = $('[data-search-page-tabs]').find('[role="tab"]');
    var isActiveElementNotTab = $tabsCollection.index($(document.activeElement)) === -1;
    if (isActiveElementNotTab) return;
    var $activeTab = $("#" + document.activeElement.id);
    var activeTabIdx = $tabsCollection.index($activeTab);
    var lastTabIdx = $tabsCollection.length - 1;
    var nextTabIdx;
    switch (eventKey) {
      case leftArrowKey:
        nextTabIdx = activeTabIdx === 0 ? lastTabIdx : activeTabIdx - 1;
        break;
      case rightArrowKey:
        nextTabIdx = activeTabIdx === lastTabIdx ? 0 : activeTabIdx + 1;
        break;
      default:
        break;
    }
    $($tabsCollection.get(nextTabIdx)).focus().trigger('click');
  };
  _proto.onReady = function onReady() {
    var _this2 = this;
    (0,_global_compare_products__WEBPACK_IMPORTED_MODULE_4__["default"])(this.context);
    this.arrangeFocusOnSortBy();
    var $searchForm = $('[data-advanced-search-form]');
    var $categoryTreeContainer = $searchForm.find('[data-search-category-tree]');
    var url = url__WEBPACK_IMPORTED_MODULE_6__.parse(window.location.href, true);
    var treeData = [];
    this.$productListingContainer = $('#product-listing-container');
    this.$facetedSearchContainer = $('#faceted-search-container');
    this.$contentResultsContainer = $('#search-results-content');

    // Init faceted search
    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__.hooks.on('sortBy-submitted', this.onSortBySubmit);
    }

    // Init collapsibles
    (0,_common_collapsible__WEBPACK_IMPORTED_MODULE_7__["default"])();
    $('[data-product-results-toggle]').on('click', function (event) {
      event.preventDefault();
      _this2.showProducts();
    });
    $('[data-content-results-toggle]').on('click', function (event) {
      event.preventDefault();
      _this2.showContent();
    });
    $('[data-search-page-tabs]').on('keyup', this.onTabChangeWithArrows);
    if (this.$productListingContainer.find('li.product').length === 0 || url.query.section === 'content') {
      this.showContent(false);
    } else {
      this.showProducts(false);
    }
    var validator = this.initValidation($searchForm).bindValidation($searchForm.find('#search_query_adv'));
    this.context.categoryTree.forEach(function (node) {
      treeData.push(_this2.formatCategoryTreeForJSTree(node));
    });
    this.categoryTreeData = treeData;
    this.createCategoryTree($categoryTreeContainer);
    $searchForm.on('submit', function (event) {
      var selectedCategoryIds = $categoryTreeContainer.jstree().get_selected();
      if (!validator.check()) {
        return event.preventDefault();
      }
      $searchForm.find('input[name="category\[\]"]').remove();
      for (var _iterator = _createForOfIteratorHelperLoose(selectedCategoryIds), _step; !(_step = _iterator()).done;) {
        var categoryId = _step.value;
        var input = $('<input>', {
          type: 'hidden',
          name: 'category[]',
          value: categoryId
        });
        $searchForm.append(input);
      }
    });
    var $searchResultsMessage = $("<p\n            class=\"aria-description--hidden\"\n            tabindex=\"-1\"\n            role=\"status\"\n            aria-live=\"polite\"\n            >" + this.context.searchResultsCount + "</p>").prependTo('body');
    setTimeout(function () {
      return $searchResultsMessage.focus();
    }, 100);
  };
  _proto.loadTreeNodes = function loadTreeNodes(node, cb) {
    var _this3 = this;
    $.ajax({
      url: '/remote/v1/category-tree',
      data: {
        selectedCategoryId: node.id,
        prefix: 'category'
      },
      headers: {
        'x-xsrf-token': window.BCData && window.BCData.csrf_token ? window.BCData.csrf_token : ''
      }
    }).done(function (data) {
      var formattedResults = [];
      data.forEach(function (dataNode) {
        formattedResults.push(_this3.formatCategoryTreeForJSTree(dataNode));
      });
      cb(formattedResults);
    });
  };
  _proto.createCategoryTree = function createCategoryTree($container) {
    var _this4 = this;
    var treeOptions = {
      core: {
        data: function data(node, cb) {
          // Root node
          if (node.id === '#') {
            cb(_this4.categoryTreeData);
          } else {
            // Lazy loaded children
            _this4.loadTreeNodes(node, cb);
          }
        },
        themes: {
          icons: true
        }
      },
      checkbox: {
        three_state: false
      },
      plugins: ['checkbox']
    };
    $container.jstree(treeOptions);
  };
  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this5 = this;
    // eslint-disable-next-line object-curly-newline
    var _this$context = this.context,
      onMinPriceError = _this$context.onMinPriceError,
      onMaxPriceError = _this$context.onMaxPriceError,
      minPriceNotEntered = _this$context.minPriceNotEntered,
      maxPriceNotEntered = _this$context.maxPriceNotEntered,
      onInvalidPrice = _this$context.onInvalidPrice;
    var $productListingContainer = $('#product-listing-container');
    var $contentListingContainer = $('#search-results-content');
    var $facetedSearchContainer = $('#faceted-search-container');
    var $searchHeading = $('#search-results-heading');
    var $searchCount = $('#search-results-product-count');
    var $contentCount = $('#search-results-content-count');
    var productsPerPage = this.context.searchProductsPerPage;
    var requestOptions = {
      template: {
        productListing: 'search/product-listing',
        contentListing: 'search/content-listing',
        sidebar: 'search/sidebar',
        heading: 'search/heading',
        productCount: 'search/product-count',
        contentCount: 'search/content-count'
      },
      config: {
        product_results: {
          limit: productsPerPage
        }
      },
      showMore: 'search/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_2__["default"](requestOptions, function (content) {
      $searchHeading.html(content.heading);
      var url = url__WEBPACK_IMPORTED_MODULE_6__.parse(window.location.href, true);
      if (url.query.section === 'content') {
        $contentListingContainer.html(content.contentListing);
        $contentCount.html(content.contentCount);
        _this5.showContent(false);
      } else {
        $productListingContainer.html(content.productListing);
        $facetedSearchContainer.html(content.sidebar);
        $searchCount.html(content.productCount);
        _this5.showProducts(false);
      }
      $('body').triggerHandler('compareReset');
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
  };
  _proto.initValidation = function initValidation($form) {
    this.$form = $form;
    this.validator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_9__["default"])({
      submit: $form,
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.announceInputErrorMessage
    });
    return this;
  };
  _proto.bindValidation = function bindValidation($element) {
    if (this.validator) {
      this.validator.add({
        selector: $element,
        validate: 'presence',
        errorMessage: $element.data('errorMessage')
      });
    }
    return this;
  };
  _proto.check = function check() {
    if (this.validator) {
      this.validator.performCheck();
      return this.validator.areAll('valid');
    }
    return false;
  };
  return Search;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9zZWFyY2hfanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW1EO0FBQ2Y7QUFDZ0I7QUFDa0I7QUFDZDtBQUNSO0FBQzFCO0FBQ2dDO0FBQ3RDO0FBQ2U7QUFFL0IsSUFBTVMsWUFBWSxHQUFHLEVBQUU7QUFDdkIsSUFBTUMsYUFBYSxHQUFHLEVBQUU7QUFBQyxJQUVKQyxNQUFNLDBCQUFBQyxZQUFBO0VBQUFDLGNBQUEsQ0FBQUYsTUFBQSxFQUFBQyxZQUFBO0VBQUEsU0FBQUQsT0FBQTtJQUFBLE9BQUFDLFlBQUEsQ0FBQUUsS0FBQSxPQUFBQyxTQUFBO0VBQUE7RUFBQSxJQUFBQyxNQUFBLEdBQUFMLE1BQUEsQ0FBQU0sU0FBQTtFQUFBRCxNQUFBLENBQ3ZCRSwyQkFBMkIsR0FBM0IsU0FBQUEsNEJBQTRCQyxJQUFJLEVBQUU7SUFBQSxJQUFBQyxLQUFBO0lBQzlCLElBQU1DLFFBQVEsR0FBRztNQUNiQyxJQUFJLEVBQUVILElBQUksQ0FBQ0ksSUFBSTtNQUNmQyxFQUFFLEVBQUVMLElBQUksQ0FBQ00sUUFBUSxDQUFDRCxFQUFFO01BQ3BCRSxLQUFLLEVBQUU7UUFDSEMsUUFBUSxFQUFFUixJQUFJLENBQUNRO01BQ25CO0lBQ0osQ0FBQztJQUVELElBQUlSLElBQUksQ0FBQ08sS0FBSyxFQUFFO01BQ1pMLFFBQVEsQ0FBQ0ssS0FBSyxDQUFDRSxNQUFNLEdBQUdULElBQUksQ0FBQ08sS0FBSyxLQUFLLE1BQU07TUFDN0NMLFFBQVEsQ0FBQ1EsUUFBUSxHQUFHLElBQUk7SUFDNUI7SUFFQSxJQUFJVixJQUFJLENBQUNVLFFBQVEsRUFBRTtNQUNmUixRQUFRLENBQUNRLFFBQVEsR0FBRyxFQUFFO01BQ3RCVixJQUFJLENBQUNVLFFBQVEsQ0FBQ0MsT0FBTyxDQUFDLFVBQUNDLFNBQVMsRUFBSztRQUNqQ1YsUUFBUSxDQUFDUSxRQUFRLENBQUNHLElBQUks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QUNOO0lBRUEsT0FBTyxJQUFJO0VBQ2YsQ0FBQztFQUFBUCxNQUFBLENBRUR1RixLQUFLLEdBQUwsU0FBQUEsTUFBQSxFQUFRO0lBQ0osSUFBSSxJQUFJLENBQUNULFNBQVMsRUFBRTtNQUNoQixJQUFJLENBQUNBLFNBQVMsQ0FBQ3FGLFlBQVksRUFBRTtNQUM3QixPQUFPLElBQUksQ0FBQ3JGLFNBQVMsQ0FBQ3NGLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDekM7SUFFQSxPQUFPLEtBQUs7RUFDaEIsQ0FBQztFQUFBLE9BQUF6SyxNQUFBO0FBQUEsRUFsVitCVixnREFBVyIsInNvdXJjZXMiOlsid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL3NlYXJjaC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBob29rcyB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBDYXRhbG9nUGFnZSBmcm9tICcuL2NhdGFsb2cnO1xuaW1wb3J0IEZhY2V0ZWRTZWFyY2ggZnJvbSAnLi9jb21tb24vZmFjZXRlZC1zZWFyY2gnO1xuaW1wb3J0IHsgYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IGNvbXBhcmVQcm9kdWN0cyBmcm9tICcuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzJztcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuL2NvbW1vbi91dGlscy91cmwtdXRpbHMnO1xuaW1wb3J0IFVybCBmcm9tICd1cmwnO1xuaW1wb3J0IGNvbGxhcHNpYmxlRmFjdG9yeSBmcm9tICcuL2NvbW1vbi9jb2xsYXBzaWJsZSc7XG5pbXBvcnQgJ2pzdHJlZSc7XG5pbXBvcnQgbm9kIGZyb20gJy4vY29tbW9uL25vZCc7XG5cbmNvbnN0IGxlZnRBcnJvd0tleSA9IDM3O1xuY29uc3QgcmlnaHRBcnJvd0tleSA9IDM5O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2ggZXh0ZW5kcyBDYXRhbG9nUGFnZSB7XG4gICAgZm9ybWF0Q2F0ZWdvcnlUcmVlRm9ySlNUcmVlKG5vZGUpIHtcbiAgICAgICAgY29uc3Qgbm9kZURhdGEgPSB7XG4gICAgICAgICAgICB0ZXh0OiBub2RlLmRhdGEsXG4gICAgICAgICAgICBpZDogbm9kZS5tZXRhZGF0YS5pZCxcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IG5vZGUuc2VsZWN0ZWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChub2RlLnN0YXRlKSB7XG4gICAgICAgICAgICBub2RlRGF0YS5zdGF0ZS5vcGVuZWQgPSBub2RlLnN0YXRlID09PSAnb3Blbic7XG4gICAgICAgICAgICBub2RlRGF0YS5jaGlsZHJlbiA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgbm9kZURhdGEuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgbm9kZURhdGEuY2hpbGRyZW4ucHVzaCh0aGlzLmZvcm1hdENhdGVnb3J5VHJlZUZvckpTVHJlZShjaGlsZE5vZGUpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5vZGVEYXRhO1xuICAgIH1cblxuICAgIHNob3dQcm9kdWN0cyhuYXZpZ2F0ZSA9IHRydWUpIHtcbiAgICAgICAgdGhpcy4kcHJvZHVjdExpc3RpbmdDb250YWluZXIucmVtb3ZlQ2xhc3MoJ3UtaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuJGZhY2V0ZWRTZWFyY2hDb250YWluZXIucmVtb3ZlQ2xhc3MoJ3UtaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuJGNvbnRlbnRSZXN1bHRzQ29udGFpbmVyLmFkZENsYXNzKCd1LWhpZGRlbicpO1xuXG4gICAgICAgICQoJ1tkYXRhLWNvbnRlbnQtcmVzdWx0cy10b2dnbGVdJykucmVtb3ZlQ2xhc3MoJ25hdkJhci1hY3Rpb24tY29sb3ItLWFjdGl2ZScpO1xuICAgICAgICAkKCdbZGF0YS1jb250ZW50LXJlc3VsdHMtdG9nZ2xlXScpLmFkZENsYXNzKCduYXZCYXItYWN0aW9uJyk7XG5cbiAgICAgICAgJCgnW2RhdGEtcHJvZHVjdC1yZXN1bHRzLXRvZ2dsZV0nKS5yZW1vdmVDbGFzcygnbmF2QmFyLWFjdGlvbicpO1xuICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LXJlc3VsdHMtdG9nZ2xlXScpLmFkZENsYXNzKCduYXZCYXItYWN0aW9uLWNvbG9yLS1hY3RpdmUnKTtcblxuICAgICAgICB0aGlzLmFjdGl2YXRlVGFiKCQoJ1tkYXRhLXByb2R1Y3QtcmVzdWx0cy10b2dnbGVdJykpO1xuXG4gICAgICAgIGlmICghbmF2aWdhdGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlYXJjaERhdGEgPSAkKCcjc2VhcmNoLXJlc3VsdHMtcHJvZHVjdC1jb3VudCBzcGFuJykuZGF0YSgpO1xuICAgICAgICBjb25zdCB1cmwgPSAoc2VhcmNoRGF0YS5jb3VudCA+IDApID8gc2VhcmNoRGF0YS51cmwgOiB1cmxVdGlscy5yZXBsYWNlUGFyYW1zKHNlYXJjaERhdGEudXJsLCB7XG4gICAgICAgICAgICBwYWdlOiAxLFxuICAgICAgICB9KTtcblxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKHVybCk7XG4gICAgfVxuXG4gICAgc2hvd0NvbnRlbnQobmF2aWdhdGUgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuJGNvbnRlbnRSZXN1bHRzQ29udGFpbmVyLnJlbW92ZUNsYXNzKCd1LWhpZGRlbicpO1xuICAgICAgICB0aGlzLiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5hZGRDbGFzcygndS1oaWRkZW4nKTtcbiAgICAgICAgdGhpcy4kZmFjZXRlZFNlYXJjaENvbnRhaW5lci5hZGRDbGFzcygndS1oaWRkZW4nKTtcblxuICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LXJlc3VsdHMtdG9nZ2xlXScpLnJlbW92ZUNsYXNzKCduYXZCYXItYWN0aW9uLWNvbG9yLS1hY3RpdmUnKTtcbiAgICAgICAgJCgnW2RhdGEtcHJvZHVjdC1yZXN1bHRzLXRvZ2dsZV0nKS5hZGRDbGFzcygnbmF2QmFyLWFjdGlvbicpO1xuXG4gICAgICAgICQoJ1tkYXRhLWNvbnRlbnQtcmVzdWx0cy10b2dnbGVdJykucmVtb3ZlQ2xhc3MoJ25hdkJhci1hY3Rpb24nKTtcbiAgICAgICAgJCgnW2RhdGEtY29udGVudC1yZXN1bHRzLXRvZ2dsZV0nKS5hZGRDbGFzcygnbmF2QmFyLWFjdGlvbi1jb2xvci0tYWN0aXZlJyk7XG5cbiAgICAgICAgdGhpcy5hY3RpdmF0ZVRhYigkKCdbZGF0YS1jb250ZW50LXJlc3VsdHMtdG9nZ2xlXScpKTtcblxuICAgICAgICBpZiAoIW5hdmlnYXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWFyY2hEYXRhID0gJCgnI3NlYXJjaC1yZXN1bHRzLWNvbnRlbnQtY291bnQgc3BhbicpLmRhdGEoKTtcbiAgICAgICAgY29uc3QgdXJsID0gKHNlYXJjaERhdGEuY291bnQgPiAwKSA/IHNlYXJjaERhdGEudXJsIDogdXJsVXRpbHMucmVwbGFjZVBhcmFtcyhzZWFyY2hEYXRhLnVybCwge1xuICAgICAgICAgICAgcGFnZTogMSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXJsVXRpbHMuZ29Ub1VybCh1cmwpO1xuICAgIH1cblxuICAgIGFjdGl2YXRlVGFiKCR0YWJUb0FjdGl2YXRlKSB7XG4gICAgICAgIGNvbnN0ICR0YWJzQ29sbGVjdGlvbiA9ICQoJ1tkYXRhLXNlYXJjaC1wYWdlLXRhYnNdJykuZmluZCgnW3JvbGU9XCJ0YWJcIl0nKTtcblxuICAgICAgICAkdGFic0NvbGxlY3Rpb24uZWFjaCgoaWR4LCB0YWIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICR0YWIgPSAkKHRhYik7XG5cbiAgICAgICAgICAgIGlmICgkdGFiLmlzKCR0YWJUb0FjdGl2YXRlKSkge1xuICAgICAgICAgICAgICAgICR0YWIucmVtb3ZlQXR0cigndGFiaW5kZXgnKTtcbiAgICAgICAgICAgICAgICAkdGFiLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICR0YWIuYXR0cigndGFiaW5kZXgnLCAnLTEnKTtcbiAgICAgICAgICAgICR0YWIuYXR0cignYXJpYS1zZWxlY3RlZCcsIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25UYWJDaGFuZ2VXaXRoQXJyb3dzKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQud2hpY2g7XG4gICAgICAgIGNvbnN0IGlzTGVmdE9yUmlnaHRBcnJvd0tleWRvd24gPSBldmVudEtleSA9PT0gbGVmdEFycm93S2V5XG4gICAgICAgICAgICB8fCBldmVudEtleSA9PT0gcmlnaHRBcnJvd0tleTtcbiAgICAgICAgaWYgKCFpc0xlZnRPclJpZ2h0QXJyb3dLZXlkb3duKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgJHRhYnNDb2xsZWN0aW9uID0gJCgnW2RhdGEtc2VhcmNoLXBhZ2UtdGFic10nKS5maW5kKCdbcm9sZT1cInRhYlwiXScpO1xuXG4gICAgICAgIGNvbnN0IGlzQWN0aXZlRWxlbWVudE5vdFRhYiA9ICR0YWJzQ29sbGVjdGlvbi5pbmRleCgkKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSA9PT0gLTE7XG4gICAgICAgIGlmIChpc0FjdGl2ZUVsZW1lbnROb3RUYWIpIHJldHVybjtcblxuICAgICAgICBjb25zdCAkYWN0aXZlVGFiID0gJChgIyR7ZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5pZH1gKTtcbiAgICAgICAgY29uc3QgYWN0aXZlVGFiSWR4ID0gJHRhYnNDb2xsZWN0aW9uLmluZGV4KCRhY3RpdmVUYWIpO1xuICAgICAgICBjb25zdCBsYXN0VGFiSWR4ID0gJHRhYnNDb2xsZWN0aW9uLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgbGV0IG5leHRUYWJJZHg7XG4gICAgICAgIHN3aXRjaCAoZXZlbnRLZXkpIHtcbiAgICAgICAgY2FzZSBsZWZ0QXJyb3dLZXk6XG4gICAgICAgICAgICBuZXh0VGFiSWR4ID0gYWN0aXZlVGFiSWR4ID09PSAwID8gbGFzdFRhYklkeCA6IGFjdGl2ZVRhYklkeCAtIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSByaWdodEFycm93S2V5OlxuICAgICAgICAgICAgbmV4dFRhYklkeCA9IGFjdGl2ZVRhYklkeCA9PT0gbGFzdFRhYklkeCA/IDAgOiBhY3RpdmVUYWJJZHggKyAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6IGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgkdGFic0NvbGxlY3Rpb24uZ2V0KG5leHRUYWJJZHgpKS5mb2N1cygpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgfVxuXG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgY29tcGFyZVByb2R1Y3RzKHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuYXJyYW5nZUZvY3VzT25Tb3J0QnkoKTtcblxuICAgICAgICBjb25zdCAkc2VhcmNoRm9ybSA9ICQoJ1tkYXRhLWFkdmFuY2VkLXNlYXJjaC1mb3JtXScpO1xuICAgICAgICBjb25zdCAkY2F0ZWdvcnlUcmVlQ29udGFpbmVyID0gJHNlYXJjaEZvcm0uZmluZCgnW2RhdGEtc2VhcmNoLWNhdGVnb3J5LXRyZWVdJyk7XG4gICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgdHJ1ZSk7XG4gICAgICAgIGNvbnN0IHRyZWVEYXRhID0gW107XG4gICAgICAgIHRoaXMuJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyID0gJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKTtcbiAgICAgICAgdGhpcy4kZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoJyNmYWNldGVkLXNlYXJjaC1jb250YWluZXInKTtcbiAgICAgICAgdGhpcy4kY29udGVudFJlc3VsdHNDb250YWluZXIgPSAkKCcjc2VhcmNoLXJlc3VsdHMtY29udGVudCcpO1xuXG4gICAgICAgIC8vIEluaXQgZmFjZXRlZCBzZWFyY2hcbiAgICAgICAgaWYgKCQoJyNmYWNldGVkU2VhcmNoJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5pbml0RmFjZXRlZFNlYXJjaCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vblNvcnRCeVN1Ym1pdCA9IHRoaXMub25Tb3J0QnlTdWJtaXQuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIGhvb2tzLm9uKCdzb3J0Qnktc3VibWl0dGVkJywgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbml0IGNvbGxhcHNpYmxlc1xuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcblxuICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LXJlc3VsdHMtdG9nZ2xlXScpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnNob3dQcm9kdWN0cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCdbZGF0YS1jb250ZW50LXJlc3VsdHMtdG9nZ2xlXScpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnNob3dDb250ZW50KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ1tkYXRhLXNlYXJjaC1wYWdlLXRhYnNdJykub24oJ2tleXVwJywgdGhpcy5vblRhYkNoYW5nZVdpdGhBcnJvd3MpO1xuXG4gICAgICAgIGlmICh0aGlzLiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5maW5kKCdsaS5wcm9kdWN0JykubGVuZ3RoID09PSAwIHx8IHVybC5xdWVyeS5zZWN0aW9uID09PSAnY29udGVudCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0NvbnRlbnQoZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93UHJvZHVjdHMoZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFsaWRhdG9yID0gdGhpcy5pbml0VmFsaWRhdGlvbigkc2VhcmNoRm9ybSlcbiAgICAgICAgICAgIC5iaW5kVmFsaWRhdGlvbigkc2VhcmNoRm9ybS5maW5kKCcjc2VhcmNoX3F1ZXJ5X2FkdicpKTtcblxuICAgICAgICB0aGlzLmNvbnRleHQuY2F0ZWdvcnlUcmVlLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIHRyZWVEYXRhLnB1c2godGhpcy5mb3JtYXRDYXRlZ29yeVRyZWVGb3JKU1RyZWUobm9kZSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNhdGVnb3J5VHJlZURhdGEgPSB0cmVlRGF0YTtcbiAgICAgICAgdGhpcy5jcmVhdGVDYXRlZ29yeVRyZWUoJGNhdGVnb3J5VHJlZUNvbnRhaW5lcik7XG5cbiAgICAgICAgJHNlYXJjaEZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkQ2F0ZWdvcnlJZHMgPSAkY2F0ZWdvcnlUcmVlQ29udGFpbmVyLmpzdHJlZSgpLmdldF9zZWxlY3RlZCgpO1xuXG4gICAgICAgICAgICBpZiAoIXZhbGlkYXRvci5jaGVjaygpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRzZWFyY2hGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJjYXRlZ29yeVxcW1xcXVwiXScpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNhdGVnb3J5SWQgb2Ygc2VsZWN0ZWRDYXRlZ29yeUlkcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gJCgnPGlucHV0PicsIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdjYXRlZ29yeVtdJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkc2VhcmNoRm9ybS5hcHBlbmQoaW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCAkc2VhcmNoUmVzdWx0c01lc3NhZ2UgPSAkKGA8cFxuICAgICAgICAgICAgY2xhc3M9XCJhcmlhLWRlc2NyaXB0aW9uLS1oaWRkZW5cIlxuICAgICAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgICAgICByb2xlPVwic3RhdHVzXCJcbiAgICAgICAgICAgIGFyaWEtbGl2ZT1cInBvbGl0ZVwiXG4gICAgICAgICAgICA+JHt0aGlzLmNvbnRleHQuc2VhcmNoUmVzdWx0c0NvdW50fTwvcD5gKVxuICAgICAgICAgICAgLnByZXBlbmRUbygnYm9keScpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gJHNlYXJjaFJlc3VsdHNNZXNzYWdlLmZvY3VzKCksIDEwMCk7XG4gICAgfVxuXG4gICAgbG9hZFRyZWVOb2Rlcyhub2RlLCBjYikge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiAnL3JlbW90ZS92MS9jYXRlZ29yeS10cmVlJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENhdGVnb3J5SWQ6IG5vZGUuaWQsXG4gICAgICAgICAgICAgICAgcHJlZml4OiAnY2F0ZWdvcnknLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAneC14c3JmLXRva2VuJzogd2luZG93LkJDRGF0YSAmJiB3aW5kb3cuQkNEYXRhLmNzcmZfdG9rZW4gPyB3aW5kb3cuQkNEYXRhLmNzcmZfdG9rZW4gOiAnJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pLmRvbmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRSZXN1bHRzID0gW107XG5cbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgoZGF0YU5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRSZXN1bHRzLnB1c2godGhpcy5mb3JtYXRDYXRlZ29yeVRyZWVGb3JKU1RyZWUoZGF0YU5vZGUpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjYihmb3JtYXR0ZWRSZXN1bHRzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlQ2F0ZWdvcnlUcmVlKCRjb250YWluZXIpIHtcbiAgICAgICAgY29uc3QgdHJlZU9wdGlvbnMgPSB7XG4gICAgICAgICAgICBjb3JlOiB7XG4gICAgICAgICAgICAgICAgZGF0YTogKG5vZGUsIGNiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJvb3Qgbm9kZVxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5pZCA9PT0gJyMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYih0aGlzLmNhdGVnb3J5VHJlZURhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTGF6eSBsb2FkZWQgY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZFRyZWVOb2Rlcyhub2RlLCBjYik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRoZW1lczoge1xuICAgICAgICAgICAgICAgICAgICBpY29uczogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoZWNrYm94OiB7XG4gICAgICAgICAgICAgICAgdGhyZWVfc3RhdGU6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgICAgICAnY2hlY2tib3gnLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfTtcblxuICAgICAgICAkY29udGFpbmVyLmpzdHJlZSh0cmVlT3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaW5pdEZhY2V0ZWRTZWFyY2goKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBvYmplY3QtY3VybHktbmV3bGluZVxuICAgICAgICBjb25zdCB7IG9uTWluUHJpY2VFcnJvciwgb25NYXhQcmljZUVycm9yLCBtaW5QcmljZU5vdEVudGVyZWQsIG1heFByaWNlTm90RW50ZXJlZCwgb25JbnZhbGlkUHJpY2UgfSA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3QgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyID0gJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgJGNvbnRlbnRMaXN0aW5nQ29udGFpbmVyID0gJCgnI3NlYXJjaC1yZXN1bHRzLWNvbnRlbnQnKTtcbiAgICAgICAgY29uc3QgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIgPSAkKCcjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0ICRzZWFyY2hIZWFkaW5nID0gJCgnI3NlYXJjaC1yZXN1bHRzLWhlYWRpbmcnKTtcbiAgICAgICAgY29uc3QgJHNlYXJjaENvdW50ID0gJCgnI3NlYXJjaC1yZXN1bHRzLXByb2R1Y3QtY291bnQnKTtcbiAgICAgICAgY29uc3QgJGNvbnRlbnRDb3VudCA9ICQoJyNzZWFyY2gtcmVzdWx0cy1jb250ZW50LWNvdW50Jyk7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RzUGVyUGFnZSA9IHRoaXMuY29udGV4dC5zZWFyY2hQcm9kdWN0c1BlclBhZ2U7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0TGlzdGluZzogJ3NlYXJjaC9wcm9kdWN0LWxpc3RpbmcnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRMaXN0aW5nOiAnc2VhcmNoL2NvbnRlbnQtbGlzdGluZycsXG4gICAgICAgICAgICAgICAgc2lkZWJhcjogJ3NlYXJjaC9zaWRlYmFyJyxcbiAgICAgICAgICAgICAgICBoZWFkaW5nOiAnc2VhcmNoL2hlYWRpbmcnLFxuICAgICAgICAgICAgICAgIHByb2R1Y3RDb3VudDogJ3NlYXJjaC9wcm9kdWN0LWNvdW50JyxcbiAgICAgICAgICAgICAgICBjb250ZW50Q291bnQ6ICdzZWFyY2gvY29udGVudC1jb3VudCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgcHJvZHVjdF9yZXN1bHRzOiB7XG4gICAgICAgICAgICAgICAgICAgIGxpbWl0OiBwcm9kdWN0c1BlclBhZ2UsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93TW9yZTogJ3NlYXJjaC9zaG93LW1vcmUnLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKHJlcXVlc3RPcHRpb25zLCAoY29udGVudCkgPT4ge1xuICAgICAgICAgICAgJHNlYXJjaEhlYWRpbmcuaHRtbChjb250ZW50LmhlYWRpbmcpO1xuXG4gICAgICAgICAgICBjb25zdCB1cmwgPSBVcmwucGFyc2Uod2luZG93LmxvY2F0aW9uLmhyZWYsIHRydWUpO1xuICAgICAgICAgICAgaWYgKHVybC5xdWVyeS5zZWN0aW9uID09PSAnY29udGVudCcpIHtcbiAgICAgICAgICAgICAgICAkY29udGVudExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LmNvbnRlbnRMaXN0aW5nKTtcbiAgICAgICAgICAgICAgICAkY29udGVudENvdW50Lmh0bWwoY29udGVudC5jb250ZW50Q291bnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0NvbnRlbnQoZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkcHJvZHVjdExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LnByb2R1Y3RMaXN0aW5nKTtcbiAgICAgICAgICAgICAgICAkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcik7XG4gICAgICAgICAgICAgICAgJHNlYXJjaENvdW50Lmh0bWwoY29udGVudC5wcm9kdWN0Q291bnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Byb2R1Y3RzKGZhbHNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXJIYW5kbGVyKCdjb21wYXJlUmVzZXQnKTtcblxuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25FcnJvck1lc3NhZ2VzOiB7XG4gICAgICAgICAgICAgICAgb25NaW5QcmljZUVycm9yLFxuICAgICAgICAgICAgICAgIG9uTWF4UHJpY2VFcnJvcixcbiAgICAgICAgICAgICAgICBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICAgICAgbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgICAgIG9uSW52YWxpZFByaWNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdFZhbGlkYXRpb24oJGZvcm0pIHtcbiAgICAgICAgdGhpcy4kZm9ybSA9ICRmb3JtO1xuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6ICRmb3JtLFxuICAgICAgICAgICAgdGFwOiBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBiaW5kVmFsaWRhdGlvbigkZWxlbWVudCkge1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0b3IpIHtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICRlbGVtZW50LFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJGVsZW1lbnQuZGF0YSgnZXJyb3JNZXNzYWdlJyksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNoZWNrKCkge1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0b3IpIHtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiaG9va3MiLCJDYXRhbG9nUGFnZSIsIkZhY2V0ZWRTZWFyY2giLCJhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlIiwiY29tcGFyZVByb2R1Y3RzIiwidXJsVXRpbHMiLCJVcmwiLCJjb2xsYXBzaWJsZUZhY3RvcnkiLCJub2QiLCJsZWZ0QXJyb3dLZXkiLCJyaWdodEFycm93S2V5IiwiU2VhcmNoIiwiX0NhdGFsb2dQYWdlIiwiX2luaGVyaXRzTG9vc2UiLCJhcHBseSIsImFyZ3VtZW50cyIsIl9wcm90byIsInByb3RvdHlwZSIsImZvcm1hdENhdGVnb3J5VHJlZUZvckpTVHJlZSIsIm5vZGUiLCJfdGhpcyIsIm5vZGVEYXRhIiwidGV4dCIsImRhdGEiLCJpZCIsIm1ldGFkYXRhIiwic3RhdGUiLCJzZWxlY3RlZCIsIm9wZW5lZCIsImNoaWxkcmVuIiwiZm9yRWFjaCIsImNoaWxkTm9kZSIsInB1c2giLCJzaG93UHJvZHVjdHMiLCJuYXZpZ2F0ZSIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsInJlbW92ZUNsYXNzIiwiJGZhY2V0ZWRTZWFyY2hDb250YWluZXIiLCIkY29udGVudFJlc3VsdHNDb250YWluZXIiLCJhZGRDbGFzcyIsIiQiLCJhY3RpdmF0ZVRhYiIsInNlYXJjaERhdGEiLCJ1cmwiLCJjb3VudCIsInJlcGxhY2VQYXJhbXMiLCJwYWdlIiwiZ29Ub1VybCIsInNob3dDb250ZW50IiwiJHRhYlRvQWN0aXZhdGUiLCIkdGFic0NvbGxlY3Rpb24iLCJmaW5kIiwiZWFjaCIsImlkeCIsInRhYiIsIiR0YWIiLCJpcyIsInJlbW92ZUF0dHIiLCJhdHRyIiwib25UYWJDaGFuZ2VXaXRoQXJyb3dzIiwiZXZlbnQiLCJldmVudEtleSIsIndoaWNoIiwiaXNMZWZ0T3JSaWdodEFycm93S2V5ZG93biIsImlzQWN0aXZlRWxlbWVudE5vdFRhYiIsImluZGV4IiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiJGFjdGl2ZVRhYiIsImFjdGl2ZVRhYklkeCIsImxhc3RUYWJJZHgiLCJsZW5ndGgiLCJuZXh0VGFiSWR4IiwiZ2V0IiwiZm9jdXMiLCJ0cmlnZ2VyIiwib25SZWFkeSIsIl90aGlzMiIsImNvbnRleHQiLCJhcnJhbmdlRm9jdXNPblNvcnRCeSIsIiRzZWFyY2hGb3JtIiwiJGNhdGVnb3J5VHJlZUNvbnRhaW5lciIsInBhcnNlIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwidHJlZURhdGEiLCJpbml0RmFjZXRlZFNlYXJjaCIsIm9uU29ydEJ5U3VibWl0IiwiYmluZCIsIm9uIiwicHJldmVudERlZmF1bHQiLCJxdWVyeSIsInNlY3Rpb24iLCJ2YWxpZGF0b3IiLCJpbml0VmFsaWRhdGlvbiIsImJpbmRWYWxpZGF0aW9uIiwiY2F0ZWdvcnlUcmVlIiwiY2F0ZWdvcnlUcmVlRGF0YSIsImNyZWF0ZUNhdGVnb3J5VHJlZSIsInNlbGVjdGVkQ2F0ZWdvcnlJZHMiLCJqc3RyZWUiLCJnZXRfc2VsZWN0ZWQiLCJjaGVjayIsInJlbW92ZSIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UiLCJfc3RlcCIsImRvbmUiLCJjYXRlZ29yeUlkIiwidmFsdWUiLCJpbnB1dCIsInR5cGUiLCJuYW1lIiwiYXBwZW5kIiwiJHNlYXJjaFJlc3VsdHNNZXNzYWdlIiwic2VhcmNoUmVzdWx0c0NvdW50IiwicHJlcGVuZFRvIiwic2V0VGltZW91dCIsImxvYWRUcmVlTm9kZXMiLCJjYiIsIl90aGlzMyIsImFqYXgiLCJzZWxlY3RlZENhdGVnb3J5SWQiLCJwcmVmaXgiLCJoZWFkZXJzIiwiQkNEYXRhIiwiY3NyZl90b2tlbiIsImZvcm1hdHRlZFJlc3VsdHMiLCJkYXRhTm9kZSIsIiRjb250YWluZXIiLCJfdGhpczQiLCJ0cmVlT3B0aW9ucyIsImNvcmUiLCJ0aGVtZXMiLCJpY29ucyIsImNoZWNrYm94IiwidGhyZWVfc3RhdGUiLCJwbHVnaW5zIiwiX3RoaXM1IiwiX3RoaXMkY29udGV4dCIsIm9uTWluUHJpY2VFcnJvciIsIm9uTWF4UHJpY2VFcnJvciIsIm1pblByaWNlTm90RW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwiJGNvbnRlbnRMaXN0aW5nQ29udGFpbmVyIiwiJHNlYXJjaEhlYWRpbmciLCIkc2VhcmNoQ291bnQiLCIkY29udGVudENvdW50IiwicHJvZHVjdHNQZXJQYWdlIiwic2VhcmNoUHJvZHVjdHNQZXJQYWdlIiwicmVxdWVzdE9wdGlvbnMiLCJ0ZW1wbGF0ZSIsInByb2R1Y3RMaXN0aW5nIiwiY29udGVudExpc3RpbmciLCJzaWRlYmFyIiwiaGVhZGluZyIsInByb2R1Y3RDb3VudCIsImNvbnRlbnRDb3VudCIsImNvbmZpZyIsInByb2R1Y3RfcmVzdWx0cyIsImxpbWl0Iiwic2hvd01vcmUiLCJmYWNldGVkU2VhcmNoIiwiY29udGVudCIsImh0bWwiLCJ0cmlnZ2VySGFuZGxlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJ2YWxpZGF0aW9uRXJyb3JNZXNzYWdlcyIsIiRmb3JtIiwic3VibWl0IiwidGFwIiwiJGVsZW1lbnQiLCJhZGQiLCJzZWxlY3RvciIsInZhbGlkYXRlIiwiZXJyb3JNZXNzYWdlIiwicGVyZm9ybUNoZWNrIiwiYXJlQWxsIiwiZGVmYXVsdCJdLCJzb3VyY2VSb290IjoiIn0=