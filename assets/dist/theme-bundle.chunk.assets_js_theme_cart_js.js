"use strict";
(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_cart_js"],{

/***/ "./assets/js/theme/cart.js":
/*!*********************************!*\
  !*** ./assets/js/theme/cart.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cart)
/* harmony export */ });
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/bind */ "./node_modules/lodash/bind.js");
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_bind__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cart/shipping-estimator */ "./assets/js/theme/cart/shipping-estimator.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _common_cart_item_details__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common/cart-item-details */ "./assets/js/theme/common/cart-item-details.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var Cart = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Cart, _PageManager);
  function Cart() {
    return _PageManager.apply(this, arguments) || this;
  }
  var _proto = Cart.prototype;
  _proto.onReady = function onReady() {
    this.$modal = null;
    this.$cartPageContent = $('[data-cart]');
    this.$cartContent = $('[data-cart-content]');
    this.$cartMessages = $('[data-cart-status]');
    this.$cartTotals = $('[data-cart-totals]');
    this.$cartAdditionalCheckoutBtns = $('[data-cart-additional-checkout-buttons]');
    this.$overlay = $('[data-cart] .loadingOverlay').hide(); // TODO: temporary until roper pulls in his cart components
    this.$activeCartItemId = null;
    this.$activeCartItemBtnAction = null;
    this.setApplePaySupport();
    this.bindEvents();
    this.getorinaPrice();
    this.cartbrandGrouping(); //custom function
    this.getCartProductsCombo();
  };
  _proto.setApplePaySupport = function setApplePaySupport() {
    if (window.ApplePaySession) {
      this.$cartPageContent.addClass('apple-pay-supported');
    }
  };
  _proto.getCartProductsCombo = function getCartProductsCombo() {
    var options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch('https:/api/storefront/carts', options).then(function (response) {
      return response.json();
    }).then(function (response) {
      return console.log("hiiiiiiiiii" + response);
    })["catch"](function (err) {
      return console.error(err);
    });
  };
  _proto.getorinaPrice = function getorinaPrice() {
    var storefrontCall = function storefrontCall(endpoint, requestBody) {
      if (requestBody === void 0) {
        requestBody = null;
      }
      var resource = window.location.origin + "/api/storefront" + endpoint.route;
      var init = {
        method: endpoint.method,
        credentials: "same-origin",
        headers: {
          // note: no authorization
          "Accept": endpoint.accept
        }
      };
      if (requestBody) {
        init.body = JSON.stringify(requestBody);
        init.headers["Content-Type"] = endpoint.content;
      }
      return fetch(resource, init).then(function (response) {
        if (response.status === endpoint.success) {
          // resolve promise using the Fetch API method that correlates with the endpoint.accept value
          return response.json(); // or response.text()
        } else {
          return new Error("response.status is " + response.status);
        }
      }).then(function (result) {
        console.log(result); // requested data
        var $exactprice;
        result.map(function (item) {
          //console.log("result",item);
          item.lineItems.physicalItems.map(function (item, index) {
            $exactprice = parseInt(item.originalPrice);
            // console.log("Orginal price "+$exactprice);
            // $price += $exactprice;  

            $('.orginal-price').eq(index).text("$" + $exactprice);
          });
        });
      })["catch"](function (error) {
        return console.error(error);
      });
    };
    var endpoint = {
      route: "/carts?include=lineItems.physicalItems.options&include_fields=line_items.physical_items.custom_fields.my_custom_field",
      method: "GET",
      accept: "application/json",
      success: 200
    }; // content: "application/json",
    ///carts?include=lineItems.physicalItems.options&include_fields=line_items.physical_items.custom_fields.my_custom_field

    storefrontCall(endpoint);
  };
  _proto.cartbrandGrouping = function cartbrandGrouping() {
    var $items = $(".cart-item");
    var groupedItems = {}; //created a object to stor grouped products 

    $items.each(function (index, item) {
      var brand = $(this).data('brand'); //getting all brands

      if (!groupedItems[brand]) {
        groupedItems[brand] = {
          lineItems: []
        };
      }

      // Add the current item's line-item to the array for the brand
      groupedItems[brand].lineItems.push($(this).find('.product-item'));
    });
    ////////////////////////////

    // Creating a new container for the grouped items to append
    var newContainer = $('<div class="cart-banner"></div>');

    // Iterate over the grouped items and create a new cart item container for each brand
    var _loop = function _loop() {
      var $subtotal = 0;
      var $pricewithdoll = 0;
      var $gsttotal = 0;
      // let $shipping= 0; 
      $totalAmountwithgst = 0;
      var $offer = $('<div class="offer"></div>');
      var $dollar = "$";
      // let uniqueProducts = {};           

      $(groupedItems[brand].lineItems).each(function () {
        var $strprices = $(this).data('price');
        var $convertedNumber = parseFloat($strprices.slice(1)); //converting a string to a number and removing the extra character

        var $amount = $subtotal += $convertedNumber;
        $gsttotal = 0.1 * $amount;
        $totalAmountwithgst = parseInt($gsttotal);
        $totalAmountwithgst = $dollar + $totalAmountwithgst;
        $pricewithdoll = $dollar + $amount;
        var keys = Object.keys(groupedItems);
        for (var $i = 0; $i < keys.length; $i++) {
          if (keys[$i] === "Common Good") {
            $offer.text("Free shipping on orders above $300.00 from this Brand");
          } else {
            $offer.text("");
          }
        }
      });
      var newText = newContainer.append(groupedItems[brand].lineItems);
      var totals = $('<h5 class="totaltext"></h5>');
      // let shipping= $('<h5 class="shippingtext"></h5>');
      var gst = $('<h5 class="totaltext"></h5>');
      //let totalAmount= $('<h5 class="totaltext"></h5>');

      var showprice = $('<span class="totalprice"></span>');
      var showgstprice = $('<span class="totalprice"></span>');
      //  let totalAmountprice= $('<span class="totalprice"></span>');

      var border = $('<div class="line"></div>');
      totals.text('SubTotal :');
      showprice.append($pricewithdoll);
      gst.text("Gst :");
      showgstprice.append($totalAmountwithgst);
      newText.append(totals);
      totals.append(showprice);
      newText.append(gst);
      gst.append(showgstprice);
      newText.append(border);
      newText.append($offer);

      // Replace the original cart container with the new on
    };
    for (var brand in groupedItems) {
      var $totalAmountwithgst;
      _loop();
    }
    $('.cart').replaceWith(newContainer);

    ////////////////////////  
  };
  _proto.cartUpdate = function cartUpdate($target) {
    var _this = this;
    var itemId = $target.data('cartItemid');
    this.$activeCartItemId = itemId;
    this.$activeCartItemBtnAction = $target.data('action');
    var $el = $("#qty-" + itemId);
    var oldQty = parseInt($el.val(), 10);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;
    // Does not quality for min/max quantity
    if (newQty < minQty) {
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(minError);
    } else if (maxQty > 0 && newQty > maxQty) {
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(maxError);
    }
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      showPopup();
      _this.$overlay.hide();
      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;
        _this.refreshContent(remove);
      } else {
        $el.val(oldQty);
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
      }
    });
  };
  _proto.cartUpdateQtyTextChange = function cartUpdateQtyTextChange($target, preVal) {
    var _this2 = this;
    if (preVal === void 0) {
      preVal = null;
    }
    var itemId = $target.data('cartItemid');
    var $el = $("#qty-" + itemId);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var oldQty = preVal !== null ? preVal : minQty;
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = parseInt(Number($el.val()), 10);
    var invalidEntry;

    // Does not quality for min/max quantity
    if (!Number.isInteger(newQty)) {
      invalidEntry = $el.val();
      $el.val(oldQty);
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(this.context.invalidEntryMessage.replace('[ENTRY]', invalidEntry));
    } else if (newQty < minQty) {
      $el.val(oldQty);
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(minError);
    } else if (maxQty > 0 && newQty > maxQty) {
      $el.val(oldQty);
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(maxError);
    }
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this2.$overlay.hide();
      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;
        _this2.refreshContent(remove);
      } else {
        $el.val(oldQty);
        return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
      }
    });
  };
  _proto.cartRemoveItem = function cartRemoveItem(itemId) {
    var _this3 = this;
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemRemove(itemId, function (err, response) {
      if (response.data.status === 'succeed') {
        _this3.refreshContent(true);
      } else {
        _this3.$overlay.hide();
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
      }
    });
  };
  _proto.cartEditOptions = function cartEditOptions(itemId, productId) {
    var _this4 = this;
    var context = Object.assign({
      productForChangeId: productId
    }, this.context);
    var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.defaultModal)();
    if (this.$modal === null) {
      this.$modal = $('#modal');
    }
    var options = {
      template: 'cart/modals/configure-product'
    };
    modal.open();
    this.$modal.find('.modal-content').addClass('hide-content');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.configureInCart(itemId, options, function (err, response) {
      modal.updateContent(response.content);
      var optionChangeHandler = function optionChangeHandler() {
        var $productOptionsContainer = $('[data-product-attributes-wrapper]', _this4.$modal);
        var modalBodyReservedHeight = $productOptionsContainer.outerHeight();
        if ($productOptionsContainer.length && modalBodyReservedHeight) {
          $productOptionsContainer.css('height', modalBodyReservedHeight);
        }
      };
      if (_this4.$modal.hasClass('open')) {
        optionChangeHandler();
      } else {
        _this4.$modal.one(_global_modal__WEBPACK_IMPORTED_MODULE_7__.ModalEvents.opened, optionChangeHandler);
      }
      _this4.productDetails = new _common_cart_item_details__WEBPACK_IMPORTED_MODULE_8__["default"](_this4.$modal, context);
      _this4.bindGiftWrappingForm();
    });
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].hooks.on('product-option-change', function (event, currentTarget) {
      var $form = $(currentTarget).find('form');
      var $submit = $('input.button', $form);
      var $messageBox = $('.alertMessageBox');
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.optionChange(productId, $form.serialize(), function (err, result) {
        var data = result.data || {};
        if (err) {
          (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(err);
          return false;
        }
        if (data.purchasing_message) {
          $('p.alertBox-message', $messageBox).text(data.purchasing_message);
          $submit.prop('disabled', true);
          $messageBox.show();
        } else {
          $submit.prop('disabled', false);
          $messageBox.hide();
        }
        if (!data.purchasable || !data.instock) {
          $submit.prop('disabled', true);
        } else {
          $submit.prop('disabled', false);
        }
      });
    });
  };
  _proto.refreshContent = function refreshContent(remove) {
    var _this5 = this;
    var $cartItemsRows = $('[data-item-row]', this.$cartContent);
    var $cartPageTitle = $('[data-cart-page-title]');
    var options = {
      template: {
        content: 'cart/content',
        totals: 'cart/totals',
        pageTitle: 'cart/page-title',
        statusMessages: 'cart/status-messages',
        additionalCheckoutButtons: 'cart/additional-checkout-buttons'
      }
    };
    this.$overlay.show();

    // Remove last item from cart? Reload
    if (remove && $cartItemsRows.length === 1) {
      return window.location.reload();
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getContent(options, function (err, response) {
      _this5.$cartContent.html(response.content);
      _this5.$cartTotals.html(response.totals);
      _this5.$cartMessages.html(response.statusMessages);
      _this5.$cartAdditionalCheckoutBtns.html(response.additionalCheckoutButtons);
      $cartPageTitle.replaceWith(response.pageTitle);
      _this5.bindEvents();
      _this5.$overlay.hide();
      var quantity = $('[data-cart-quantity]', _this5.$cartContent).data('cartQuantity') || 0;
      $('body').trigger('cart-quantity-update', quantity);

      //this.showpopup();

      $("[data-cart-itemid='" + _this5.$activeCartItemId + "']", _this5.$cartContent).filter("[data-action='" + _this5.$activeCartItemBtnAction + "']").trigger('focus');
    });
  };
  _proto.bindCartEvents = function bindCartEvents() {
    var _this6 = this;
    var debounceTimeout = 400;
    var cartUpdate = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdate, debounceTimeout), this);
    var cartUpdateQtyTextChange = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdateQtyTextChange, debounceTimeout), this);
    var cartRemoveItem = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartRemoveItem, debounceTimeout), this);
    var preVal;

    // cart update
    $('[data-cart-update]', this.$cartContent).on('click', function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault();

      // update cart quantity
      cartUpdate($target);
    });

    // cart qty manually updates
    $('.cart-item-qty-input', this.$cartContent).on('focus', function onQtyFocus() {
      preVal = this.value;
    }).change(function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault();

      // update cart quantity
      cartUpdateQtyTextChange($target, preVal);
    });
    $('.cart-remove', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('cartItemid');
      var string = $(event.currentTarget).data('confirmDelete');
      (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(string, {
        icon: 'warning',
        showCancelButton: true,
        onConfirm: function onConfirm() {
          // remove item from cart
          cartRemoveItem(itemId);
        }
      });
      event.preventDefault();
    });
    $('[data-item-edit]', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemEdit');
      var productId = $(event.currentTarget).data('productId');
      event.preventDefault();
      // edit item in cart
      _this6.cartEditOptions(itemId, productId);
    });
  };
  _proto.bindPromoCodeEvents = function bindPromoCodeEvents() {
    var _this7 = this;
    var $couponContainer = $('.coupon-code');
    var $couponForm = $('.coupon-form');
    var $codeInput = $('[name="couponcode"]', $couponForm);
    $('.coupon-code-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).hide();
      $couponContainer.show();
      $('.coupon-code-cancel').show();
      $codeInput.trigger('focus');
    });
    $('.coupon-code-cancel').on('click', function (event) {
      event.preventDefault();
      $couponContainer.hide();
      $('.coupon-code-cancel').hide();
      $('.coupon-code-add').show();
    });
    $couponForm.on('submit', function (event) {
      var code = $codeInput.val();
      event.preventDefault();

      // Empty code
      if (!code) {
        return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)($codeInput.data('error'));
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyCode(code, function (err, response) {
        if (response.data.status === 'success') {
          _this7.refreshContent();
        } else {
          (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
        }
      });
    });
  };
  _proto.bindGiftCertificateEvents = function bindGiftCertificateEvents() {
    var _this8 = this;
    var $certContainer = $('.gift-certificate-code');
    var $certForm = $('.cart-gift-certificate-form');
    var $certInput = $('[name="certcode"]', $certForm);
    $('.gift-certificate-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).toggle();
      $certContainer.toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $('.gift-certificate-cancel').on('click', function (event) {
      event.preventDefault();
      $certContainer.toggle();
      $('.gift-certificate-add').toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $certForm.on('submit', function (event) {
      var code = $certInput.val();
      event.preventDefault();
      if (!(0,_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__["default"])(code)) {
        var validationDictionary = (0,_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__.createTranslationDictionary)(_this8.context);
        return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(validationDictionary.invalid_gift_certificate);
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyGiftCertificate(code, function (err, resp) {
        if (resp.data.status === 'success') {
          _this8.refreshContent();
        } else {
          (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(resp.data.errors.join('\n'));
        }
      });
    });
  };
  _proto.bindGiftWrappingEvents = function bindGiftWrappingEvents() {
    var _this9 = this;
    var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.defaultModal)();
    $('[data-item-giftwrap]').on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemGiftwrap');
      var options = {
        template: 'cart/modals/gift-wrapping-form'
      };
      event.preventDefault();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getItemGiftWrappingOptions(itemId, options, function (err, response) {
        modal.updateContent(response.content);
        _this9.bindGiftWrappingForm();
      });
    });
  };
  _proto.bindGiftWrappingForm = function bindGiftWrappingForm() {
    $('.giftWrapping-select').on('change', function (event) {
      var $select = $(event.currentTarget);
      var id = $select.val();
      var index = $select.data('index');
      if (!id) {
        return;
      }
      var allowMessage = $select.find("option[value=" + id + "]").data('allowMessage');
      $(".giftWrapping-image-" + index).hide();
      $("#giftWrapping-image-" + index + "-" + id).show();
      if (allowMessage) {
        $("#giftWrapping-message-" + index).show();
      } else {
        $("#giftWrapping-message-" + index).hide();
      }
    });
    $('.giftWrapping-select').trigger('change');
    function toggleViews() {
      var value = $('input:radio[name ="giftwraptype"]:checked').val();
      var $singleForm = $('.giftWrapping-single');
      var $multiForm = $('.giftWrapping-multiple');
      if (value === 'same') {
        $singleForm.show();
        $multiForm.hide();
      } else {
        $singleForm.hide();
        $multiForm.show();
      }
    }
    $('[name="giftwraptype"]').on('click', toggleViews);
    toggleViews();
  };
  _proto.bindEvents = function bindEvents() {
    this.bindCartEvents();
    this.bindPromoCodeEvents();
    this.bindGiftWrappingEvents();
    this.bindGiftCertificateEvents();

    // initiate shipping estimator module
    var shippingErrorMessages = {
      country: this.context.shippingCountryErrorMessage,
      province: this.context.shippingProvinceErrorMessage
    };
    this.shippingEstimator = new _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__["default"]($('[data-shipping-estimator]'), shippingErrorMessages);
  };
  return Cart;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);

function showPopup() {
  var $items = $(".cart-item");
  var brArr = [];
  $items.each(function (index, item) {
    var brand = $(this).data('brand'); //getting all brands
    brArr.push(brand);
  });
  var $ofs = brArr.filter(function (name) {
    return name === "OFS";
  });
  if ($ofs.length >= 2) {
    var $message = "You Are Elgible For Free Shipping For OFS";
    (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showShippingModal)("</h2>" + $message + "</h2>");
  }
}

/***/ }),

/***/ "./assets/js/theme/cart/shipping-estimator.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/cart/shipping-estimator.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShippingEstimator)
/* harmony export */ });
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");






var ShippingEstimator = /*#__PURE__*/function () {
  function ShippingEstimator($element, shippingErrorMessages) {
    this.$element = $element;
    this.$state = $('[data-field-type="State"]', this.$element);
    this.isEstimatorFormOpened = false;
    this.shippingErrorMessages = shippingErrorMessages;
    this.initFormValidation();
    this.bindStateCountryChange();
    this.bindEstimatorEvents();
  }
  var _proto = ShippingEstimator.prototype;
  _proto.initFormValidation = function initFormValidation() {
    var _this = this;
    var shippingEstimatorAlert = $('.shipping-quotes');
    this.shippingEstimator = 'form[data-shipping-estimator]';
    this.shippingValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: this.shippingEstimator + " .shipping-estimate-submit",
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.announceInputErrorMessage
    });
    $('.shipping-estimate-submit', this.$element).on('click', function (event) {
      // estimator error messages are being injected in html as a result
      // of user submit; clearing and adding role on submit provides
      // regular announcement of these error messages
      if (shippingEstimatorAlert.attr('role')) {
        shippingEstimatorAlert.removeAttr('role');
      }
      shippingEstimatorAlert.attr('role', 'alert');
      // When switching between countries, the state/region is dynamic
      // Only perform a check for all fields when country has a value
      // Otherwise areAll('valid') will check country for validity
      if ($(_this.shippingEstimator + " select[name=\"shipping-country\"]").val()) {
        _this.shippingValidator.performCheck();
      }
      if (_this.shippingValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
    this.bindValidation();
    this.bindStateValidation();
    this.bindUPSRates();
  };
  _proto.bindValidation = function bindValidation() {
    this.shippingValidator.add([{
      selector: this.shippingEstimator + " select[name=\"shipping-country\"]",
      validate: function validate(cb, val) {
        var countryId = Number(val);
        var result = countryId !== 0 && !Number.isNaN(countryId);
        cb(result);
      },
      errorMessage: this.shippingErrorMessages.country
    }]);
  };
  _proto.bindStateValidation = function bindStateValidation() {
    var _this2 = this;
    this.shippingValidator.add([{
      selector: $(this.shippingEstimator + " select[name=\"shipping-state\"]"),
      validate: function validate(cb) {
        var result;
        var $ele = $(_this2.shippingEstimator + " select[name=\"shipping-state\"]");
        if ($ele.length) {
          var eleVal = $ele.val();
          result = eleVal && eleVal.length && eleVal !== 'State/province';
        }
        cb(result);
      },
      errorMessage: this.shippingErrorMessages.province
    }]);
  }

  /**
   * Toggle between default shipping and ups shipping rates
   */;
  _proto.bindUPSRates = function bindUPSRates() {
    var UPSRateToggle = '.estimator-form-toggleUPSRate';
    $('body').on('click', UPSRateToggle, function (event) {
      var $estimatorFormUps = $('.estimator-form--ups');
      var $estimatorFormDefault = $('.estimator-form--default');
      event.preventDefault();
      $estimatorFormUps.toggleClass('u-hiddenVisually');
      $estimatorFormDefault.toggleClass('u-hiddenVisually');
    });
  };
  _proto.bindStateCountryChange = function bindStateCountryChange() {
    var _this3 = this;
    var $last;

    // Requests the states for a country with AJAX
    (0,_common_state_country__WEBPACK_IMPORTED_MODULE_0__["default"])(this.$state, this.context, {
      useIdForStates: true
    }, function (err, field) {
      if (err) {
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_5__.showAlertModal)(err);
        throw new Error(err);
      }
      var $field = $(field);
      if (_this3.shippingValidator.getStatus(_this3.$state) !== 'undefined') {
        _this3.shippingValidator.remove(_this3.$state);
      }
      if ($last) {
        _this3.shippingValidator.remove($last);
      }
      if ($field.is('select')) {
        $last = field;
        _this3.bindStateValidation();
      } else {
        $field.attr('placeholder', 'State/province');
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.Validators.cleanUpStateValidation(field);
      }

      // When you change a country, you swap the state/province between an input and a select dropdown
      // Not all countries require the province to be filled
      // We have to remove this class when we swap since nod validation doesn't cleanup for us
      $(_this3.shippingEstimator).find('.form-field--success').removeClass('form-field--success');
    });
  };
  _proto.toggleEstimatorFormState = function toggleEstimatorFormState(toggleButton, buttonSelector, $toggleContainer) {
    var changeAttributesOnToggle = function changeAttributesOnToggle(selectorToActivate) {
      $(toggleButton).attr('aria-labelledby', selectorToActivate);
      $(buttonSelector).text($("#" + selectorToActivate).text());
    };
    if (!this.isEstimatorFormOpened) {
      changeAttributesOnToggle('estimator-close');
      $toggleContainer.removeClass('u-hidden');
    } else {
      changeAttributesOnToggle('estimator-add');
      $toggleContainer.addClass('u-hidden');
    }
    this.isEstimatorFormOpened = !this.isEstimatorFormOpened;
  };
  _proto.bindEstimatorEvents = function bindEstimatorEvents() {
    var _this4 = this;
    var $estimatorContainer = $('.shipping-estimator');
    var $estimatorForm = $('.estimator-form');
    (0,_common_collapsible__WEBPACK_IMPORTED_MODULE_4__["default"])();
    $estimatorForm.on('submit', function (event) {
      var params = {
        country_id: $('[name="shipping-country"]', $estimatorForm).val(),
        state_id: $('[name="shipping-state"]', $estimatorForm).val(),
        city: $('[name="shipping-city"]', $estimatorForm).val(),
        zip_code: $('[name="shipping-zip"]', $estimatorForm).val()
      };
      event.preventDefault();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.getShippingQuotes(params, 'cart/shipping-quotes', function (err, response) {
        $('.shipping-quotes').html(response.content);

        // bind the select button
        $('.select-shipping-quote').on('click', function (clickEvent) {
          var quoteId = $('.shipping-quote:checked').val();
          clickEvent.preventDefault();
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.submitShippingQuote(quoteId, function () {
            window.location.reload();
          });
        });
      });
    });
    $('.shipping-estimate-show').on('click', function (event) {
      event.preventDefault();
      _this4.toggleEstimatorFormState(event.currentTarget, '.shipping-estimate-show__btn-name', $estimatorContainer);
    });
  };
  return ShippingEstimator;
}();


/***/ }),

/***/ "./assets/js/theme/common/cart-item-details.js":
/*!*****************************************************!*\
  !*** ./assets/js/theme/common/cart-item-details.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CartItemDetails)
/* harmony export */ });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _product_details_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product-details-base */ "./assets/js/theme/common/product-details-base.js");
/* harmony import */ var _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/ie-helpers */ "./assets/js/theme/common/utils/ie-helpers.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var CartItemDetails = /*#__PURE__*/function (_ProductDetailsBase) {
  _inheritsLoose(CartItemDetails, _ProductDetailsBase);
  function CartItemDetails($scope, context, productAttributesData) {
    var _this;
    if (productAttributesData === void 0) {
      productAttributesData = {};
    }
    _this = _ProductDetailsBase.call(this, $scope, context) || this;
    var $form = $('#CartEditProductFieldsForm', _this.$scope);
    var $productOptionsElement = $('[data-product-attributes-wrapper]', $form);
    var hasOptions = $productOptionsElement.html().trim().length;
    var hasDefaultOptions = $productOptionsElement.find('[data-default]').length;
    $productOptionsElement.on('change', function () {
      _this.setProductVariant();
    });
    var optionChangeCallback = _product_details_base__WEBPACK_IMPORTED_MODULE_2__.optionChangeDecorator.call(_assertThisInitialized(_this), hasDefaultOptions);

    // Update product attributes. Also update the initial view in case items are oos
    // or have default variant properties that change the view
    if ((lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(productAttributesData) || hasDefaultOptions) && hasOptions) {
      var productId = _this.context.productForChangeId;
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', optionChangeCallback);
    } else {
      _this.updateProductAttributes(productAttributesData);
    }
    return _this;
  }
  var _proto = CartItemDetails.prototype;
  _proto.setProductVariant = function setProductVariant() {
    var unsatisfiedRequiredFields = [];
    var options = [];
    $.each($('[data-product-attribute]'), function (index, value) {
      var optionLabel = value.children[0].innerText;
      var optionTitle = optionLabel.split(':')[0].trim();
      var required = optionLabel.toLowerCase().includes('required');
      var type = value.getAttribute('data-product-attribute');
      if ((type === 'input-file' || type === 'input-text' || type === 'input-number') && value.querySelector('input').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === 'date') {
        var isSatisfied = Array.from(value.querySelectorAll('select')).every(function (select) {
          return select.selectedIndex !== 0;
        });
        if (isSatisfied) {
          var dateString = Array.from(value.querySelectorAll('select')).map(function (x) {
            return x.value;
          }).join('-');
          options.push(optionTitle + ":" + dateString);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === 'set-select') {
        var select = value.querySelector('select');
        var selectedIndex = select.selectedIndex;
        if (selectedIndex !== 0) {
          options.push(optionTitle + ":" + select.options[selectedIndex].innerText);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch' || type === 'input-checkbox' || type === 'product-list') {
        var checked = value.querySelector(':checked');
        if (checked) {
          var getSelectedOptionLabel = function getSelectedOptionLabel() {
            var productVariantslist = (0,_utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__.convertIntoArray)(value.children);
            var matchLabelForCheckedInput = function matchLabelForCheckedInput(inpt) {
              return inpt.dataset.productAttributeValue === checked.value;
            };
            return productVariantslist.filter(matchLabelForCheckedInput)[0];
          };
          if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
            var label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__.isBrowserIE ? getSelectedOptionLabel().innerText.trim() : checked.labels[0].innerText;
            if (label) {
              options.push(optionTitle + ":" + label);
            }
          }
          if (type === 'swatch') {
            var _label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__.isBrowserIE ? getSelectedOptionLabel().children[0] : checked.labels[0].children[0];
            if (_label) {
              options.push(optionTitle + ":" + _label.title);
            }
          }
          if (type === 'input-checkbox') {
            options.push(optionTitle + ":Yes");
          }
          return;
        }
        if (type === 'input-checkbox') {
          options.push(optionTitle + ":No");
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
    });
    var productVariant = unsatisfiedRequiredFields.length === 0 ? options.sort().join(', ') : 'unsatisfied';
    var view = $('.modal-header-title');
    if (productVariant) {
      productVariant = productVariant === 'unsatisfied' ? '' : productVariant;
      if (view.attr('data-event-type')) {
        view.attr('data-product-variant', productVariant);
      } else {
        var productName = view.html().match(/'(.*?)'/)[1];
        var card = $("[data-name=\"" + productName + "\"]");
        card.attr('data-product-variant', productVariant);
      }
    }
  }

  /**
   * Hide or mark as unavailable out of stock attributes if enabled
   * @param  {Object} data Product attribute data
   */;
  _proto.updateProductAttributes = function updateProductAttributes(data) {
    _ProductDetailsBase.prototype.updateProductAttributes.call(this, data);
    this.$scope.find('.modal-content').removeClass('hide-content');
  };
  return CartItemDetails;
}(_product_details_base__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(cert) {
  if (typeof cert !== 'string' || cert.length === 0) {
    return false;
  }

  // Add any custom gift certificate validation logic here
  return true;
}

/***/ }),

/***/ "./assets/js/theme/common/state-country.js":
/*!*************************************************!*\
  !*** ./assets/js/theme/common/state-country.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/transform */ "./node_modules/lodash/transform.js");
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_transform__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");






/**
 * If there are no options from bcapp, a text field will be sent. This will create a select element to hold options after the remote request.
 * @returns {jQuery|HTMLElement}
 */
function makeStateRequired(stateElement, context) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_1___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
  var replacementAttributes = {
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-select',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<select></select>', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  var $hiddenInput = $('[name*="FormFieldIsText"]');
  if ($hiddenInput.length !== 0) {
    $hiddenInput.remove();
  }
  if ($newElement.prev().find('small').length === 0) {
    // String is injected from localizer
    $newElement.prev().append("<small>" + context.required + "</small>");
  } else {
    $newElement.prev().find('small').show();
  }
  return $newElement;
}

/**
 * If a country with states is the default, a select will be sent,
 * In this case we need to be able to switch to an input field and hide the required field
 */
function makeStateOptional(stateElement) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_1___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
  var replacementAttributes = {
    type: 'text',
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-input',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<input />', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  if ($newElement.length !== 0) {
    (0,_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.insertStateHiddenField)($newElement);
    $newElement.prev().find('small').hide();
  }
  return $newElement;
}

/**
 * Adds the array of options from the remote request to the newly created select box.
 * @param {Object} statesArray
 * @param {jQuery} $selectElement
 * @param {Object} options
 */
function addOptions(statesArray, $selectElement, options) {
  var container = [];
  container.push("<option value=\"\">" + statesArray.prefix + "</option>");
  if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()($selectElement)) {
    statesArray.states.forEach(function (stateObj) {
      if (options.useIdForStates) {
        container.push("<option value=\"" + stateObj.id + "\">" + stateObj.name + "</option>");
      } else {
        container.push("<option value=\"" + stateObj.name + "\">" + (stateObj.label ? stateObj.label : stateObj.name) + "</option>");
      }
    });
    $selectElement.html(container.join(' '));
  }
}

/**
 *
 * @param {jQuery} stateElement
 * @param {Object} context
 * @param {Object} options
 * @param {Function} callback
 */
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(stateElement, context, options, callback) {
  if (context === void 0) {
    context = {};
  }
  /**
   * Backwards compatible for three parameters instead of four
   *
   * Available options:
   *
   * useIdForStates {Bool} - Generates states dropdown using id for values instead of strings
   */
  if (typeof options === 'function') {
    /* eslint-disable no-param-reassign */
    callback = options;
    options = {};
    /* eslint-enable no-param-reassign */
  }

  $('select[data-field-type="Country"]').on('change', function (event) {
    var countryName = $(event.currentTarget).val();
    if (countryName === '') {
      return;
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.country.getByName(countryName, function (err, response) {
      if (err) {
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_4__.showAlertModal)(context.state_error);
        return callback(err);
      }
      var $currentInput = $('[data-field-type="State"]');
      if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(response.data.states)) {
        // The element may have been replaced with a select, reselect it
        var $selectElement = makeStateRequired($currentInput, context);
        addOptions(response.data, $selectElement, options);
        callback(null, $selectElement);
      } else {
        var newElement = makeStateOptional($currentInput, context);
        callback(null, newElement);
      }
    });
  });
}

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTranslationDictionary": () => (/* binding */ createTranslationDictionary)
/* harmony export */ });
var TRANSLATIONS = 'translations';
var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};
var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};

/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */
var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
    validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
    validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jYXJ0X2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlDO0FBRThCO0FBQ1M7QUFDakM7QUFDVztBQUNtQztBQUNwQztBQUFBLElBRXBDVSxJQUFJLDBCQUFBQyxZQUFBO0VBQUFDLGNBQUEsQ0FBQUYsSUFBQSxFQUFBQyxZQUFBO0VBQUEsU0FBQUQsS0FBQTtJQUFBLE9BQUFDLFlBQUEsQ0FBQUUsS0FBQSxPQUFBQyxTQUFBO0VBQUE7RUFBQSxJQUFBQyxNQUFBLEdBQUFMLElBQUEsQ0FBQU0sU0FBQTtFQUFBRCxNQUFBLENBQ3JCRSxPQUFPLEdBQVAsU0FBQUEsUUFBQSxFQUFVO0lBQ04sSUFBSSxDQUFDQyxNQUFNLEdBQUcsSUFBSTtJQUNsQixJQUFJLENBQUNDLGdCQUFnQixHQUFHQyxDQUFDLENBQUMsYUFBYSxDQUFDO0lBQ3hDLElBQUksQ0FBQ0MsWUFBWSxHQUFHRCxDQUFDLENBQUMscUJBQXFCLENBQUM7SUFDNUMsSUFBSSxDQUFDRSxhQUFhLEdBQUdGLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQztJQUM1QyxJQUFJLENBQUNHLFdBQVcsR0FBR0gsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO0lBQzFDLElBQUksQ0FBQ0ksMkJBQTJCLEdBQUdKLENBQUMsQ0FBQyx5Q0FBeUMsQ0FBQztJQUMvRSxJQUFJLENBQUNLLFFBQVEsR0FBR0wsQ0FBQyxDQUFDLDZCQUE2QixDQUFDLENBQzNDTSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2IsSUFBSSxDQUFDQyxpQkFBaUIsR0FBRyxJQUFJO0lBQzdCLElBQUksQ0FBQ0Msd0JBQXdCLEdBQUcsSUFBSTtJQUVwQyxJQUFJLENBQUNDLGtCQUFrQixFQUFFO0lBQ3pCLElBQUksQ0FBQ0MsVUFBVSxFQUFFO0lBQ2pCLElBQUksQ0FBQ0MsYUFBYSxFQUFFO0lBQ3BCLElBQUksQ0FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6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OUJBLDJCQUEyQkEsQ0FBSXFJLE9BQU8sRUFBSztFQUNwRCxJQUFReVAsd0JBQXdCLEdBQXdFelAsT0FBTyxDQUF2R3lQLHdCQUF3QjtJQUFFQyxnQ0FBZ0MsR0FBc0MxUCxPQUFPLENBQTdFMFAsZ0NBQWdDO0lBQUVDLCtCQUErQixHQUFLM1AsT0FBTyxDQUEzQzJQLCtCQUErQjtFQUNuRyxJQUFNQyxnQkFBZ0IsR0FBR1Asc0JBQXNCLENBQUNJLHdCQUF3QixFQUFFQyxnQ0FBZ0MsRUFBRUMsK0JBQStCLENBQUM7RUFDNUksSUFBTUUsYUFBYSxHQUFHblMsTUFBTSxDQUFDb1MsTUFBTSxDQUFDRixnQkFBZ0IsQ0FBQ1YsWUFBWSxDQUFDLENBQUM7RUFDbkUsSUFBTWEsZUFBZSxHQUFHclMsTUFBTSxDQUFDRCxJQUFJLENBQUNtUyxnQkFBZ0IsQ0FBQ1YsWUFBWSxDQUFDLENBQUMsQ0FBQ3RULEdBQUcsQ0FBQyxVQUFBb1UsR0FBRztJQUFBLE9BQUlBLEdBQUcsQ0FBQ3hFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQ3lFLEdBQUcsRUFBRTtFQUFBLEVBQUM7RUFFcEcsT0FBT0YsZUFBZSxDQUFDRyxNQUFNLENBQUMsVUFBQ0MsR0FBRyxFQUFFSCxHQUFHLEVBQUVWLENBQUMsRUFBSztJQUMzQ2EsR0FBRyxDQUFDSCxHQUFHLENBQUMsR0FBR0gsYUFBYSxDQUFDUCxDQUFDLENBQUM7SUFDM0IsT0FBT2EsR0FBRztFQUNkLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNWLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaWdjb21tZXJjZS1jb3JuZXJzdG9uZS8uL2Fzc2V0cy9qcy90aGVtZS9jYXJ0LmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NhcnQvc2hpcHBpbmctZXN0aW1hdG9yLmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9jYXJ0LWl0ZW0tZGV0YWlscy5qcyIsIndlYnBhY2s6Ly9iaWdjb21tZXJjZS1jb3JuZXJzdG9uZS8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vZ2lmdC1jZXJ0aWZpY2F0ZS12YWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3N0YXRlLWNvdW50cnkuanMiLCJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IHsgYmluZCwgZGVib3VuY2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGNoZWNrSXNHaWZ0Q2VydFZhbGlkIGZyb20gJy4vY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yJztcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IFNoaXBwaW5nRXN0aW1hdG9yIGZyb20gJy4vY2FydC9zaGlwcGluZy1lc3RpbWF0b3InO1xuaW1wb3J0IHsgZGVmYXVsdE1vZGFsLCBzaG93QWxlcnRNb2RhbCxzaG93U2hpcHBpbmdNb2RhbCwgTW9kYWxFdmVudHMgfSBmcm9tICcuL2dsb2JhbC9tb2RhbCc7XG5pbXBvcnQgQ2FydEl0ZW1EZXRhaWxzIGZyb20gJy4vY29tbW9uL2NhcnQtaXRlbS1kZXRhaWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydCBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBvblJlYWR5KCkge1xuICAgICAgICB0aGlzLiRtb2RhbCA9IG51bGw7XG4gICAgICAgIHRoaXMuJGNhcnRQYWdlQ29udGVudCA9ICQoJ1tkYXRhLWNhcnRdJyk7XG4gICAgICAgIHRoaXMuJGNhcnRDb250ZW50ID0gJCgnW2RhdGEtY2FydC1jb250ZW50XScpO1xuICAgICAgICB0aGlzLiRjYXJ0TWVzc2FnZXMgPSAkKCdbZGF0YS1jYXJ0LXN0YXR1c10nKTtcbiAgICAgICAgdGhpcy4kY2FydFRvdGFscyA9ICQoJ1tkYXRhLWNhcnQtdG90YWxzXScpO1xuICAgICAgICB0aGlzLiRjYXJ0QWRkaXRpb25hbENoZWNrb3V0QnRucyA9ICQoJ1tkYXRhLWNhcnQtYWRkaXRpb25hbC1jaGVja291dC1idXR0b25zXScpO1xuICAgICAgICB0aGlzLiRvdmVybGF5ID0gJCgnW2RhdGEtY2FydF0gLmxvYWRpbmdPdmVybGF5JylcbiAgICAgICAgICAgIC5oaWRlKCk7IC8vIFRPRE86IHRlbXBvcmFyeSB1bnRpbCByb3BlciBwdWxscyBpbiBoaXMgY2FydCBjb21wb25lbnRzXG4gICAgICAgIHRoaXMuJGFjdGl2ZUNhcnRJdGVtSWQgPSBudWxsO1xuICAgICAgICB0aGlzLiRhY3RpdmVDYXJ0SXRlbUJ0bkFjdGlvbiA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5zZXRBcHBsZVBheVN1cHBvcnQoKTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuZ2V0b3JpbmFQcmljZSgpO1xuICAgICAgICB0aGlzLmNhcnRicmFuZEdyb3VwaW5nKCk7Ly9jdXN0b20gZnVuY3Rpb25cbiAgICAgICAgdGhpcy5nZXRDYXJ0UHJvZHVjdHNDb21ibygpO1xuICAgIH1cblxuICAgIHNldEFwcGxlUGF5U3VwcG9ydCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5BcHBsZVBheVNlc3Npb24pIHtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRQYWdlQ29udGVudC5hZGRDbGFzcygnYXBwbGUtcGF5LXN1cHBvcnRlZCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q2FydFByb2R1Y3RzQ29tYm8oKXsgICAgICAgICBcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7bWV0aG9kOiAnR0VUJywgaGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9fTtcbiAgICBmZXRjaCgnaHR0cHM6L2FwaS9zdG9yZWZyb250L2NhcnRzJywgb3B0aW9ucylcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gY29uc29sZS5sb2coXCJoaWlpaWlpaWlpaVwiK3Jlc3BvbnNlKSlcbiAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XG5cbiAgICB9XG4gICAgXG4gICAgZ2V0b3JpbmFQcmljZSgpe1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc3RvcmVmcm9udENhbGwgPSAoZW5kcG9pbnQsIHJlcXVlc3RCb2R5ID0gbnVsbCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc291cmNlID0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYXBpL3N0b3JlZnJvbnQke2VuZHBvaW50LnJvdXRlfWA7XG4gICAgICAgICAgICBsZXQgaW5pdCA9IHtcbiAgICAgICAgICAgICAgbWV0aG9kOiBlbmRwb2ludC5tZXRob2QsXG4gICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAvLyBub3RlOiBubyBhdXRob3JpemF0aW9uXG4gICAgICAgICAgICAgICAgXCJBY2NlcHRcIjogZW5kcG9pbnQuYWNjZXB0LFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihyZXF1ZXN0Qm9keSkge1xuICAgICAgICAgICAgICBpbml0LmJvZHkgPSBKU09OLnN0cmluZ2lmeShyZXF1ZXN0Qm9keSk7XG4gICAgICAgICAgICAgIGluaXQuaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSA9IGVuZHBvaW50LmNvbnRlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGZldGNoKHJlc291cmNlLCBpbml0KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT09IGVuZHBvaW50LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAvLyByZXNvbHZlIHByb21pc2UgdXNpbmcgdGhlIEZldGNoIEFQSSBtZXRob2QgdGhhdCBjb3JyZWxhdGVzIHdpdGggdGhlIGVuZHBvaW50LmFjY2VwdCB2YWx1ZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7IC8vIG9yIHJlc3BvbnNlLnRleHQoKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoYHJlc3BvbnNlLnN0YXR1cyBpcyAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7IC8vIHJlcXVlc3RlZCBkYXRhXG4gICAgICAgICAgICAgIGxldCAkZXhhY3RwcmljZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXN1bHQubWFwKGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJyZXN1bHRcIixpdGVtKTtcbiAgICAgICAgICAgICAgICBpdGVtLmxpbmVJdGVtcy5waHlzaWNhbEl0ZW1zLm1hcChmdW5jdGlvbihpdGVtLGluZGV4KXtcbiAgICAgICAgICAgICAgICAgICAgJGV4YWN0cHJpY2U9IHBhcnNlSW50KGl0ZW0ub3JpZ2luYWxQcmljZSk7ICBcbiAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiT3JnaW5hbCBwcmljZSBcIiskZXhhY3RwcmljZSk7XG4gICAgICAgICAgICAgICAgIC8vICRwcmljZSArPSAkZXhhY3RwcmljZTsgIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAkKCcub3JnaW5hbC1wcmljZScpLmVxKGluZGV4KS50ZXh0KFwiJFwiKyRleGFjdHByaWNlKTtcblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGVuZHBvaW50ID0geyAgcm91dGU6IFwiL2NhcnRzP2luY2x1ZGU9bGluZUl0ZW1zLnBoeXNpY2FsSXRlbXMub3B0aW9ucyZpbmNsdWRlX2ZpZWxkcz1saW5lX2l0ZW1zLnBoeXNpY2FsX2l0ZW1zLmN1c3RvbV9maWVsZHMubXlfY3VzdG9tX2ZpZWxkXCIsICBtZXRob2Q6IFwiR0VUXCIsICBhY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLCBzdWNjZXNzOiAyMDAgfS8vIGNvbnRlbnQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vL2NhcnRzP2luY2x1ZGU9bGluZUl0ZW1zLnBoeXNpY2FsSXRlbXMub3B0aW9ucyZpbmNsdWRlX2ZpZWxkcz1saW5lX2l0ZW1zLnBoeXNpY2FsX2l0ZW1zLmN1c3RvbV9maWVsZHMubXlfY3VzdG9tX2ZpZWxkXG5cblxuICAgICAgICAgICAgc3RvcmVmcm9udENhbGwoZW5kcG9pbnQpO1xuXG4gIH1cblxuICBjYXJ0YnJhbmRHcm91cGluZygpe1xuICAgIGxldCAkaXRlbXM9ICQoXCIuY2FydC1pdGVtXCIpOyBcblxuICAgIGxldCBncm91cGVkSXRlbXMgPSB7fTsgLy9jcmVhdGVkIGEgb2JqZWN0IHRvIHN0b3IgZ3JvdXBlZCBwcm9kdWN0cyBcblxuICAgICAkaXRlbXMuZWFjaChmdW5jdGlvbihpbmRleCxpdGVtKXtcbiAgIFxuICAgICAgbGV0IGJyYW5kPSAkKHRoaXMpLmRhdGEoJ2JyYW5kJyk7ICAvL2dldHRpbmcgYWxsIGJyYW5kc1xuICBcbiAgICAgIGlmICghZ3JvdXBlZEl0ZW1zW2JyYW5kXSkgeyAgICAgICAgXG4gICAgICAgICAgZ3JvdXBlZEl0ZW1zW2JyYW5kXSA9IHsgbGluZUl0ZW1zOiBbXSB9OyBcbiAgICAgIH1cbiAgXG4gICAgICAvLyBBZGQgdGhlIGN1cnJlbnQgaXRlbSdzIGxpbmUtaXRlbSB0byB0aGUgYXJyYXkgZm9yIHRoZSBicmFuZFxuICAgICAgZ3JvdXBlZEl0ZW1zW2JyYW5kXS5saW5lSXRlbXMucHVzaCgkKHRoaXMpLmZpbmQoJy5wcm9kdWN0LWl0ZW0nKSk7IFxuICBcbiAgICAgfSk7XG4gICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgICAvLyBDcmVhdGluZyBhIG5ldyBjb250YWluZXIgZm9yIHRoZSBncm91cGVkIGl0ZW1zIHRvIGFwcGVuZFxuICAgICBsZXQgbmV3Q29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cImNhcnQtYmFubmVyXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIGdyb3VwZWQgaXRlbXMgYW5kIGNyZWF0ZSBhIG5ldyBjYXJ0IGl0ZW0gY29udGFpbmVyIGZvciBlYWNoIGJyYW5kXG4gICAgICAgICBmb3IgKGxldCBicmFuZCBpbiBncm91cGVkSXRlbXMpIHtcbiAgICAgICAgICBcbiAgICAgICAgICAgICBsZXQgJHN1YnRvdGFsPSAwO1xuICAgICAgICAgICAgIGxldCAkcHJpY2V3aXRoZG9sbD0wO1xuICAgICAgICAgICAgIGxldCAkZ3N0dG90YWw9IDA7XG4gICAgICAgICAgICAvLyBsZXQgJHNoaXBwaW5nPSAwOyBcbiAgICAgICAgICAgICB2YXIgJHRvdGFsQW1vdW50d2l0aGdzdD0wO1xuICAgICAgICAgICAgIGxldCAkb2ZmZXI9ICQoJzxkaXYgY2xhc3M9XCJvZmZlclwiPjwvZGl2PicpOyAgIFxuICAgICAgICAgICAgIGxldCAgJGRvbGxhciA9IFwiJFwiO1xuICAgICAgICAgICAgLy8gbGV0IHVuaXF1ZVByb2R1Y3RzID0ge307ICAgICAgICAgICBcblxuICAgICAgICAgICAgJChncm91cGVkSXRlbXNbYnJhbmRdLmxpbmVJdGVtcykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICBsZXQgJHN0cnByaWNlcyA9ICQodGhpcykuZGF0YSgncHJpY2UnKTtcbiAgICAgICAgICAgICBsZXQgJGNvbnZlcnRlZE51bWJlciA9IHBhcnNlRmxvYXQoJHN0cnByaWNlcy5zbGljZSgxKSk7ICAvL2NvbnZlcnRpbmcgYSBzdHJpbmcgdG8gYSBudW1iZXIgYW5kIHJlbW92aW5nIHRoZSBleHRyYSBjaGFyYWN0ZXJcbiAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgJGFtb3VudD0gICRzdWJ0b3RhbCArPSAkY29udmVydGVkTnVtYmVyO1xuICAgICAgICAgICAgJGdzdHRvdGFsID0gMC4xICogJGFtb3VudDsgXG4gICAgICAgICAgICAkdG90YWxBbW91bnR3aXRoZ3N0PXBhcnNlSW50KCRnc3R0b3RhbCk7XG4gICAgICAgICAgICAkdG90YWxBbW91bnR3aXRoZ3N0PSAkZG9sbGFyKyR0b3RhbEFtb3VudHdpdGhnc3Q7XG5cbiAgICAgICAgICAgICRwcmljZXdpdGhkb2xsPSAkZG9sbGFyKyRhbW91bnQ7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZ3JvdXBlZEl0ZW1zKTtcblxuICAgICAgICAgICAgZm9yKCBsZXQgJGk9MDsgJGk8a2V5cy5sZW5ndGg7ICRpKyspe1xuICAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoa2V5c1skaV0gPT09IFwiQ29tbW9uIEdvb2RcIil7XG4gICAgICAgICAgICAgICAgJG9mZmVyLnRleHQoXCJGcmVlIHNoaXBwaW5nIG9uIG9yZGVycyBhYm92ZSAkMzAwLjAwIGZyb20gdGhpcyBCcmFuZFwiKSAgIFxuICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAkb2ZmZXIudGV4dChcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IFxuICAgICAgICAgfSlcblxuICAgICAgICAgICBsZXQgbmV3VGV4dCA9IG5ld0NvbnRhaW5lci5hcHBlbmQoZ3JvdXBlZEl0ZW1zW2JyYW5kXS5saW5lSXRlbXMpXG4gICAgICAgICAgIFxuICAgICAgICAgICBsZXQgdG90YWxzPSAkKCc8aDUgY2xhc3M9XCJ0b3RhbHRleHRcIj48L2g1PicpO1xuICAgICAgICAgIC8vIGxldCBzaGlwcGluZz0gJCgnPGg1IGNsYXNzPVwic2hpcHBpbmd0ZXh0XCI+PC9oNT4nKTtcbiAgICAgICAgICAgICBsZXQgZ3N0PSAkKCc8aDUgY2xhc3M9XCJ0b3RhbHRleHRcIj48L2g1PicpO1xuICAgICAgICAgICAgIC8vbGV0IHRvdGFsQW1vdW50PSAkKCc8aDUgY2xhc3M9XCJ0b3RhbHRleHRcIj48L2g1PicpO1xuXG4gICAgICAgICAgICAgbGV0IHNob3dwcmljZSA9ICQoJzxzcGFuIGNsYXNzPVwidG90YWxwcmljZVwiPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICBsZXQgc2hvd2dzdHByaWNlPSAkKCc8c3BhbiBjbGFzcz1cInRvdGFscHJpY2VcIj48L3NwYW4+Jyk7XG4gICAgICAgICAgIC8vICBsZXQgdG90YWxBbW91bnRwcmljZT0gJCgnPHNwYW4gY2xhc3M9XCJ0b3RhbHByaWNlXCI+PC9zcGFuPicpO1xuXG4gICAgICAgICAgICAgbGV0IGJvcmRlcj0gJCgnPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj4nKTtcblxuICAgICAgICAgICAgIHRvdGFscy50ZXh0KCdTdWJUb3RhbCA6Jyk7XG4gICAgICAgICAgICAgc2hvd3ByaWNlLmFwcGVuZCgkcHJpY2V3aXRoZG9sbCk7XG4gICAgICAgICAgICAgZ3N0LnRleHQoXCJHc3QgOlwiKTtcbiAgICAgICAgICAgICBzaG93Z3N0cHJpY2UuYXBwZW5kKCR0b3RhbEFtb3VudHdpdGhnc3QpO1xuXG4gICAgICAgICAgICAgbmV3VGV4dC5hcHBlbmQodG90YWxzKTtcbiAgICAgICAgICAgICB0b3RhbHMuYXBwZW5kKHNob3dwcmljZSk7XG5cbiAgICAgICAgICAgICBuZXdUZXh0LmFwcGVuZChnc3QpO1xuICAgICAgICAgICAgIGdzdC5hcHBlbmQoc2hvd2dzdHByaWNlKTtcblxuICAgICAgICAgICAgIG5ld1RleHQuYXBwZW5kKGJvcmRlcik7XG4gICAgICAgICAgICAgbmV3VGV4dC5hcHBlbmQoJG9mZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFJlcGxhY2UgdGhlIG9yaWdpbmFsIGNhcnQgY29udGFpbmVyIHdpdGggdGhlIG5ldyBvblxuICAgICAgICAgfSBcblxuICAgICAgICAgJCgnLmNhcnQnKS5yZXBsYWNlV2l0aChuZXdDb250YWluZXIpO1xuICAgICAgICAgXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gIFxufVxuXG4gICAgY2FydFVwZGF0ZSgkdGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IGl0ZW1JZCA9ICR0YXJnZXQuZGF0YSgnY2FydEl0ZW1pZCcpO1xuICAgICAgICB0aGlzLiRhY3RpdmVDYXJ0SXRlbUlkID0gaXRlbUlkO1xuICAgICAgICB0aGlzLiRhY3RpdmVDYXJ0SXRlbUJ0bkFjdGlvbiA9ICR0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XG5cbiAgICAgICAgY29uc3QgJGVsID0gJChgI3F0eS0ke2l0ZW1JZH1gKTtcbiAgICAgICAgY29uc3Qgb2xkUXR5ID0gcGFyc2VJbnQoJGVsLnZhbCgpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1heFF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1heCcpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1pblF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1pbicpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1pbkVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWluRXJyb3InKTtcbiAgICAgICAgY29uc3QgbWF4RXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNYXhFcnJvcicpO1xuICAgICAgICBjb25zdCBuZXdRdHkgPSAkdGFyZ2V0LmRhdGEoJ2FjdGlvbicpID09PSAnaW5jJyA/IG9sZFF0eSArIDEgOiBvbGRRdHkgLSAxO1xuICAgICAgICAvLyBEb2VzIG5vdCBxdWFsaXR5IGZvciBtaW4vbWF4IHF1YW50aXR5XG4gICAgICAgIGlmIChuZXdRdHkgPCBtaW5RdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbChtaW5FcnJvcik7XG4gICAgICAgIH0gZWxzZSBpZiAobWF4UXR5ID4gMCAmJiBuZXdRdHkgPiBtYXhRdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbChtYXhFcnJvcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcblxuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtVXBkYXRlKGl0ZW1JZCwgbmV3UXR5LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgc2hvd1BvcHVwKCk7XG4gICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHF1YW50aXR5IGlzIGNoYW5nZWQgXCIxXCIgZnJvbSBcIjBcIiwgd2UgaGF2ZSB0byByZW1vdmUgdGhlIHJvdy5cbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAobmV3UXR5ID09PSAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHJlbW92ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgICAgICBzaG93QWxlcnRNb2RhbChyZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBjYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSgkdGFyZ2V0LCBwcmVWYWwgPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1JZCA9ICR0YXJnZXQuZGF0YSgnY2FydEl0ZW1pZCcpO1xuICAgICAgICBjb25zdCAkZWwgPSAkKGAjcXR5LSR7aXRlbUlkfWApO1xuICAgICAgICBjb25zdCBtYXhRdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHlNYXgnKSwgMTApO1xuICAgICAgICBjb25zdCBtaW5RdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHlNaW4nKSwgMTApO1xuICAgICAgICBjb25zdCBvbGRRdHkgPSBwcmVWYWwgIT09IG51bGwgPyBwcmVWYWwgOiBtaW5RdHk7XG4gICAgICAgIGNvbnN0IG1pbkVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWluRXJyb3InKTtcbiAgICAgICAgY29uc3QgbWF4RXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNYXhFcnJvcicpO1xuICAgICAgICBjb25zdCBuZXdRdHkgPSBwYXJzZUludChOdW1iZXIoJGVsLnZhbCgpKSwgMTApO1xuICAgICAgICBsZXQgaW52YWxpZEVudHJ5O1xuXG4gICAgICAgIC8vIERvZXMgbm90IHF1YWxpdHkgZm9yIG1pbi9tYXggcXVhbnRpdHlcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKG5ld1F0eSkpIHtcbiAgICAgICAgICAgIGludmFsaWRFbnRyeSA9ICRlbC52YWwoKTtcbiAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbCh0aGlzLmNvbnRleHQuaW52YWxpZEVudHJ5TWVzc2FnZS5yZXBsYWNlKCdbRU5UUlldJywgaW52YWxpZEVudHJ5KSk7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3UXR5IDwgbWluUXR5KSB7XG4gICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwobWluRXJyb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKG1heFF0eSA+IDAgJiYgbmV3UXR5ID4gbWF4UXR5KSB7XG4gICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwobWF4RXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0Lml0ZW1VcGRhdGUoaXRlbUlkLCBuZXdRdHksIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VlZCcpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcXVhbnRpdHkgaXMgY2hhbmdlZCBcIjFcIiBmcm9tIFwiMFwiLCB3ZSBoYXZlIHRvIHJlbW92ZSB0aGUgcm93LlxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9IChuZXdRdHkgPT09IDApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudChyZW1vdmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwocmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYXJ0UmVtb3ZlSXRlbShpdGVtSWQpIHtcbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0Lml0ZW1SZW1vdmUoaXRlbUlkLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VlZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcbiAgICAgICAgICAgICAgICBzaG93QWxlcnRNb2RhbChyZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBjYXJ0RWRpdE9wdGlvbnMoaXRlbUlkLCBwcm9kdWN0SWQpIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHsgcHJvZHVjdEZvckNoYW5nZUlkOiBwcm9kdWN0SWQsIC4uLnRoaXMuY29udGV4dCB9O1xuICAgICAgICBjb25zdCBtb2RhbCA9IGRlZmF1bHRNb2RhbCgpO1xuXG4gICAgICAgIGlmICh0aGlzLiRtb2RhbCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy4kbW9kYWwgPSAkKCcjbW9kYWwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2NhcnQvbW9kYWxzL2NvbmZpZ3VyZS1wcm9kdWN0JyxcbiAgICAgICAgfTtcblxuICAgICAgICBtb2RhbC5vcGVuKCk7XG4gICAgICAgIHRoaXMuJG1vZGFsLmZpbmQoJy5tb2RhbC1jb250ZW50JykuYWRkQ2xhc3MoJ2hpZGUtY29udGVudCcpO1xuXG4gICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5jb25maWd1cmVJbkNhcnQoaXRlbUlkLCBvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgbW9kYWwudXBkYXRlQ29udGVudChyZXNwb25zZS5jb250ZW50KTtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbkNoYW5nZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyID0gJCgnW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGVzLXdyYXBwZXJdJywgdGhpcy4kbW9kYWwpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGFsQm9keVJlc2VydmVkSGVpZ2h0ID0gJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyLm91dGVySGVpZ2h0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyLmxlbmd0aCAmJiBtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAkcHJvZHVjdE9wdGlvbnNDb250YWluZXIuY3NzKCdoZWlnaHQnLCBtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuJG1vZGFsLmhhc0NsYXNzKCdvcGVuJykpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25DaGFuZ2VIYW5kbGVyKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuJG1vZGFsLm9uZShNb2RhbEV2ZW50cy5vcGVuZWQsIG9wdGlvbkNoYW5nZUhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3REZXRhaWxzID0gbmV3IENhcnRJdGVtRGV0YWlscyh0aGlzLiRtb2RhbCwgY29udGV4dCk7XG5cbiAgICAgICAgICAgIHRoaXMuYmluZEdpZnRXcmFwcGluZ0Zvcm0oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXRpbHMuaG9va3Mub24oJ3Byb2R1Y3Qtb3B0aW9uLWNoYW5nZScsIChldmVudCwgY3VycmVudFRhcmdldCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGZvcm0gPSAkKGN1cnJlbnRUYXJnZXQpLmZpbmQoJ2Zvcm0nKTtcbiAgICAgICAgICAgIGNvbnN0ICRzdWJtaXQgPSAkKCdpbnB1dC5idXR0b24nLCAkZm9ybSk7XG4gICAgICAgICAgICBjb25zdCAkbWVzc2FnZUJveCA9ICQoJy5hbGVydE1lc3NhZ2VCb3gnKTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLm9wdGlvbkNoYW5nZShwcm9kdWN0SWQsICRmb3JtLnNlcmlhbGl6ZSgpLCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gcmVzdWx0LmRhdGEgfHwge307XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5wdXJjaGFzaW5nX21lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgncC5hbGVydEJveC1tZXNzYWdlJywgJG1lc3NhZ2VCb3gpLnRleHQoZGF0YS5wdXJjaGFzaW5nX21lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICRtZXNzYWdlQm94LnNob3coKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAkbWVzc2FnZUJveC5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhLnB1cmNoYXNhYmxlIHx8ICFkYXRhLmluc3RvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlZnJlc2hDb250ZW50KHJlbW92ZSkge1xuICAgICAgICBjb25zdCAkY2FydEl0ZW1zUm93cyA9ICQoJ1tkYXRhLWl0ZW0tcm93XScsIHRoaXMuJGNhcnRDb250ZW50KTtcbiAgICAgICAgY29uc3QgJGNhcnRQYWdlVGl0bGUgPSAkKCdbZGF0YS1jYXJ0LXBhZ2UtdGl0bGVdJyk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICdjYXJ0L2NvbnRlbnQnLFxuICAgICAgICAgICAgICAgIHRvdGFsczogJ2NhcnQvdG90YWxzJyxcbiAgICAgICAgICAgICAgICBwYWdlVGl0bGU6ICdjYXJ0L3BhZ2UtdGl0bGUnLFxuICAgICAgICAgICAgICAgIHN0YXR1c01lc3NhZ2VzOiAnY2FydC9zdGF0dXMtbWVzc2FnZXMnLFxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxDaGVja291dEJ1dHRvbnM6ICdjYXJ0L2FkZGl0aW9uYWwtY2hlY2tvdXQtYnV0dG9ucycsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuXG4gICAgICAgIC8vIFJlbW92ZSBsYXN0IGl0ZW0gZnJvbSBjYXJ0PyBSZWxvYWRcbiAgICAgICAgaWYgKHJlbW92ZSAmJiAkY2FydEl0ZW1zUm93cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH1cblxuICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRDb250ZW50KG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRjYXJ0Q29udGVudC5odG1sKHJlc3BvbnNlLmNvbnRlbnQpO1xuICAgICAgICAgICAgdGhpcy4kY2FydFRvdGFscy5odG1sKHJlc3BvbnNlLnRvdGFscyk7XG4gICAgICAgICAgICB0aGlzLiRjYXJ0TWVzc2FnZXMuaHRtbChyZXNwb25zZS5zdGF0dXNNZXNzYWdlcyk7XG4gICAgICAgICAgICB0aGlzLiRjYXJ0QWRkaXRpb25hbENoZWNrb3V0QnRucy5odG1sKHJlc3BvbnNlLmFkZGl0aW9uYWxDaGVja291dEJ1dHRvbnMpO1xuXG4gICAgICAgICAgICAkY2FydFBhZ2VUaXRsZS5yZXBsYWNlV2l0aChyZXNwb25zZS5wYWdlVGl0bGUpO1xuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcblxuICAgICAgICAgICAgY29uc3QgcXVhbnRpdHkgPSAkKCdbZGF0YS1jYXJ0LXF1YW50aXR5XScsIHRoaXMuJGNhcnRDb250ZW50KS5kYXRhKCdjYXJ0UXVhbnRpdHknKSB8fCAwO1xuXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlcignY2FydC1xdWFudGl0eS11cGRhdGUnLCBxdWFudGl0eSk7XG5cbiAgICAgICAgICAgIC8vdGhpcy5zaG93cG9wdXAoKTtcblxuICAgICAgICAgICAgJChgW2RhdGEtY2FydC1pdGVtaWQ9JyR7dGhpcy4kYWN0aXZlQ2FydEl0ZW1JZH0nXWAsIHRoaXMuJGNhcnRDb250ZW50KVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoYFtkYXRhLWFjdGlvbj0nJHt0aGlzLiRhY3RpdmVDYXJ0SXRlbUJ0bkFjdGlvbn0nXWApXG4gICAgICAgICAgICAgICAgLnRyaWdnZXIoJ2ZvY3VzJyk7XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZENhcnRFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IGRlYm91bmNlVGltZW91dCA9IDQwMDtcbiAgICAgICAgY29uc3QgY2FydFVwZGF0ZSA9IGJpbmQoZGVib3VuY2UodGhpcy5jYXJ0VXBkYXRlLCBkZWJvdW5jZVRpbWVvdXQpLCB0aGlzKTtcbiAgICAgICAgY29uc3QgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UgPSBiaW5kKGRlYm91bmNlKHRoaXMuY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UsIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xuICAgICAgICBjb25zdCBjYXJ0UmVtb3ZlSXRlbSA9IGJpbmQoZGVib3VuY2UodGhpcy5jYXJ0UmVtb3ZlSXRlbSwgZGVib3VuY2VUaW1lb3V0KSwgdGhpcyk7XG4gICAgICAgIGxldCBwcmVWYWw7XG5cbiAgICAgICAgLy8gY2FydCB1cGRhdGVcbiAgICAgICAgJCgnW2RhdGEtY2FydC11cGRhdGVdJywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgY2FydCBxdWFudGl0eVxuICAgICAgICAgICAgY2FydFVwZGF0ZSgkdGFyZ2V0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2FydCBxdHkgbWFudWFsbHkgdXBkYXRlc1xuICAgICAgICAkKCcuY2FydC1pdGVtLXF0eS1pbnB1dCcsIHRoaXMuJGNhcnRDb250ZW50KS5vbignZm9jdXMnLCBmdW5jdGlvbiBvblF0eUZvY3VzKCkge1xuICAgICAgICAgICAgcHJlVmFsID0gdGhpcy52YWx1ZTtcbiAgICAgICAgfSkuY2hhbmdlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIGNhcnQgcXVhbnRpdHlcbiAgICAgICAgICAgIGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlKCR0YXJnZXQsIHByZVZhbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5jYXJ0LXJlbW92ZScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2NhcnRJdGVtaWQnKTtcbiAgICAgICAgICAgIGNvbnN0IHN0cmluZyA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnY29uZmlybURlbGV0ZScpO1xuICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwoc3RyaW5nLCB7XG4gICAgICAgICAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXG4gICAgICAgICAgICAgICAgb25Db25maXJtOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBpdGVtIGZyb20gY2FydFxuICAgICAgICAgICAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbShpdGVtSWQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ1tkYXRhLWl0ZW0tZWRpdF0nLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbUlkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdpdGVtRWRpdCcpO1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdwcm9kdWN0SWQnKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAvLyBlZGl0IGl0ZW0gaW4gY2FydFxuICAgICAgICAgICAgdGhpcy5jYXJ0RWRpdE9wdGlvbnMoaXRlbUlkLCBwcm9kdWN0SWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kUHJvbW9Db2RlRXZlbnRzKCkge1xuICAgICAgICBjb25zdCAkY291cG9uQ29udGFpbmVyID0gJCgnLmNvdXBvbi1jb2RlJyk7XG4gICAgICAgIGNvbnN0ICRjb3Vwb25Gb3JtID0gJCgnLmNvdXBvbi1mb3JtJyk7XG4gICAgICAgIGNvbnN0ICRjb2RlSW5wdXQgPSAkKCdbbmFtZT1cImNvdXBvbmNvZGVcIl0nLCAkY291cG9uRm9ybSk7XG5cbiAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWFkZCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkuaGlkZSgpO1xuICAgICAgICAgICAgJGNvdXBvbkNvbnRhaW5lci5zaG93KCk7XG4gICAgICAgICAgICAkKCcuY291cG9uLWNvZGUtY2FuY2VsJykuc2hvdygpO1xuICAgICAgICAgICAgJGNvZGVJbnB1dC50cmlnZ2VyKCdmb2N1cycpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuY291cG9uLWNvZGUtY2FuY2VsJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJGNvdXBvbkNvbnRhaW5lci5oaWRlKCk7XG4gICAgICAgICAgICAkKCcuY291cG9uLWNvZGUtY2FuY2VsJykuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWFkZCcpLnNob3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGNvdXBvbkZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvZGUgPSAkY29kZUlucHV0LnZhbCgpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyBFbXB0eSBjb2RlXG4gICAgICAgICAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwoJGNvZGVJbnB1dC5kYXRhKCdlcnJvcicpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuYXBwbHlDb2RlKGNvZGUsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgJGNlcnRDb250YWluZXIgPSAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jb2RlJyk7XG4gICAgICAgIGNvbnN0ICRjZXJ0Rm9ybSA9ICQoJy5jYXJ0LWdpZnQtY2VydGlmaWNhdGUtZm9ybScpO1xuICAgICAgICBjb25zdCAkY2VydElucHV0ID0gJCgnW25hbWU9XCJjZXJ0Y29kZVwiXScsICRjZXJ0Rm9ybSk7XG5cbiAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtYWRkJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkudG9nZ2xlKCk7XG4gICAgICAgICAgICAkY2VydENvbnRhaW5lci50b2dnbGUoKTtcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLnRvZ2dsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJGNlcnRDb250YWluZXIudG9nZ2xlKCk7XG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1hZGQnKS50b2dnbGUoKTtcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLnRvZ2dsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkY2VydEZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvZGUgPSAkY2VydElucHV0LnZhbCgpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBpZiAoIWNoZWNrSXNHaWZ0Q2VydFZhbGlkKGNvZGUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGlvbkRpY3Rpb25hcnkgPSBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkodGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwodmFsaWRhdGlvbkRpY3Rpb25hcnkuaW52YWxpZF9naWZ0X2NlcnRpZmljYXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuYXBwbHlHaWZ0Q2VydGlmaWNhdGUoY29kZSwgKGVyciwgcmVzcCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwLmRhdGEuc3RhdHVzID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKHJlc3AuZGF0YS5lcnJvcnMuam9pbignXFxuJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kR2lmdFdyYXBwaW5nRXZlbnRzKCkge1xuICAgICAgICBjb25zdCBtb2RhbCA9IGRlZmF1bHRNb2RhbCgpO1xuXG4gICAgICAgICQoJ1tkYXRhLWl0ZW0tZ2lmdHdyYXBdJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbUlkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdpdGVtR2lmdHdyYXAnKTtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICdjYXJ0L21vZGFscy9naWZ0LXdyYXBwaW5nLWZvcm0nLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgbW9kYWwub3BlbigpO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRJdGVtR2lmdFdyYXBwaW5nT3B0aW9ucyhpdGVtSWQsIG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbW9kYWwudXBkYXRlQ29udGVudChyZXNwb25zZS5jb250ZW50KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuYmluZEdpZnRXcmFwcGluZ0Zvcm0oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kR2lmdFdyYXBwaW5nRm9ybSgpIHtcbiAgICAgICAgJCgnLmdpZnRXcmFwcGluZy1zZWxlY3QnKS5vbignY2hhbmdlJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgJHNlbGVjdCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICBjb25zdCBpZCA9ICRzZWxlY3QudmFsKCk7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9ICRzZWxlY3QuZGF0YSgnaW5kZXgnKTtcblxuICAgICAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgYWxsb3dNZXNzYWdlID0gJHNlbGVjdC5maW5kKGBvcHRpb25bdmFsdWU9JHtpZH1dYCkuZGF0YSgnYWxsb3dNZXNzYWdlJyk7XG5cbiAgICAgICAgICAgICQoYC5naWZ0V3JhcHBpbmctaW1hZ2UtJHtpbmRleH1gKS5oaWRlKCk7XG4gICAgICAgICAgICAkKGAjZ2lmdFdyYXBwaW5nLWltYWdlLSR7aW5kZXh9LSR7aWR9YCkuc2hvdygpO1xuXG4gICAgICAgICAgICBpZiAoYWxsb3dNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1tZXNzYWdlLSR7aW5kZXh9YCkuc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKGAjZ2lmdFdyYXBwaW5nLW1lc3NhZ2UtJHtpbmRleH1gKS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5naWZ0V3JhcHBpbmctc2VsZWN0JykudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gdG9nZ2xlVmlld3MoKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9ICQoJ2lucHV0OnJhZGlvW25hbWUgPVwiZ2lmdHdyYXB0eXBlXCJdOmNoZWNrZWQnKS52YWwoKTtcbiAgICAgICAgICAgIGNvbnN0ICRzaW5nbGVGb3JtID0gJCgnLmdpZnRXcmFwcGluZy1zaW5nbGUnKTtcbiAgICAgICAgICAgIGNvbnN0ICRtdWx0aUZvcm0gPSAkKCcuZ2lmdFdyYXBwaW5nLW11bHRpcGxlJyk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJ3NhbWUnKSB7XG4gICAgICAgICAgICAgICAgJHNpbmdsZUZvcm0uc2hvdygpO1xuICAgICAgICAgICAgICAgICRtdWx0aUZvcm0uaGlkZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2luZ2xlRm9ybS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgJG11bHRpRm9ybS5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkKCdbbmFtZT1cImdpZnR3cmFwdHlwZVwiXScpLm9uKCdjbGljaycsIHRvZ2dsZVZpZXdzKTtcblxuICAgICAgICB0b2dnbGVWaWV3cygpO1xuICAgIH1cblxuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuYmluZENhcnRFdmVudHMoKTtcbiAgICAgICAgdGhpcy5iaW5kUHJvbW9Db2RlRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYmluZEdpZnRXcmFwcGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLmJpbmRHaWZ0Q2VydGlmaWNhdGVFdmVudHMoKTtcblxuICAgICAgICAvLyBpbml0aWF0ZSBzaGlwcGluZyBlc3RpbWF0b3IgbW9kdWxlXG4gICAgICAgIGNvbnN0IHNoaXBwaW5nRXJyb3JNZXNzYWdlcyA9IHtcbiAgICAgICAgICAgIGNvdW50cnk6IHRoaXMuY29udGV4dC5zaGlwcGluZ0NvdW50cnlFcnJvck1lc3NhZ2UsXG4gICAgICAgICAgICBwcm92aW5jZTogdGhpcy5jb250ZXh0LnNoaXBwaW5nUHJvdmluY2VFcnJvck1lc3NhZ2UsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2hpcHBpbmdFc3RpbWF0b3IgPSBuZXcgU2hpcHBpbmdFc3RpbWF0b3IoJCgnW2RhdGEtc2hpcHBpbmctZXN0aW1hdG9yXScpLCBzaGlwcGluZ0Vycm9yTWVzc2FnZXMpO1xuICAgIH1cbn1cblxuIGZ1bmN0aW9uIHNob3dQb3B1cCgpe1xuXG4gICAgbGV0ICRpdGVtcz0gJChcIi5jYXJ0LWl0ZW1cIik7IFxuICAgIGxldCBickFyciA9IFtdO1xuICAgICRpdGVtcy5lYWNoKGZ1bmN0aW9uKGluZGV4LGl0ZW0pe1xuICAgICAgICBsZXQgYnJhbmQ9ICQodGhpcykuZGF0YSgnYnJhbmQnKTsgIC8vZ2V0dGluZyBhbGwgYnJhbmRzXG4gICAgICAgIGJyQXJyLnB1c2goYnJhbmQpOyAgIFxuICAgICAgIH0pO1xuXG4gICAgY29uc3QgJG9mcyA9IGJyQXJyLmZpbHRlcihuYW1lID0+IG5hbWUgPT09IFwiT0ZTXCIpO1xuXG4gICAgIGlmKCAkb2ZzLmxlbmd0aCA+PSAyICl7XG4gICAgICAgIGxldCAkbWVzc2FnZT0gXCJZb3UgQXJlIEVsZ2libGUgRm9yIEZyZWUgU2hpcHBpbmcgRm9yIE9GU1wiXG4gICAgICAgc2hvd1NoaXBwaW5nTW9kYWwoXCI8L2gyPlwiKyRtZXNzYWdlK1wiPC9oMj5cIik7ICBcbiAgICAgICB9XG5cbiAgfSIsImltcG9ydCBzdGF0ZUNvdW50cnkgZnJvbSAnLi4vY29tbW9uL3N0YXRlLWNvdW50cnknO1xuaW1wb3J0IG5vZCBmcm9tICcuLi9jb21tb24vbm9kJztcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgeyBWYWxpZGF0b3JzLCBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IGNvbGxhcHNpYmxlRmFjdG9yeSBmcm9tICcuLi9jb21tb24vY29sbGFwc2libGUnO1xuaW1wb3J0IHsgc2hvd0FsZXJ0TW9kYWwgfSBmcm9tICcuLi9nbG9iYWwvbW9kYWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwcGluZ0VzdGltYXRvciB7XG4gICAgY29uc3RydWN0b3IoJGVsZW1lbnQsIHNoaXBwaW5nRXJyb3JNZXNzYWdlcykge1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy4kc3RhdGUgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nLCB0aGlzLiRlbGVtZW50KTtcbiAgICAgICAgdGhpcy5pc0VzdGltYXRvckZvcm1PcGVuZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaGlwcGluZ0Vycm9yTWVzc2FnZXMgPSBzaGlwcGluZ0Vycm9yTWVzc2FnZXM7XG4gICAgICAgIHRoaXMuaW5pdEZvcm1WYWxpZGF0aW9uKCk7XG4gICAgICAgIHRoaXMuYmluZFN0YXRlQ291bnRyeUNoYW5nZSgpO1xuICAgICAgICB0aGlzLmJpbmRFc3RpbWF0b3JFdmVudHMoKTtcbiAgICB9XG5cbiAgICBpbml0Rm9ybVZhbGlkYXRpb24oKSB7XG4gICAgICAgIGNvbnN0IHNoaXBwaW5nRXN0aW1hdG9yQWxlcnQgPSAkKCcuc2hpcHBpbmctcXVvdGVzJyk7XG5cbiAgICAgICAgdGhpcy5zaGlwcGluZ0VzdGltYXRvciA9ICdmb3JtW2RhdGEtc2hpcHBpbmctZXN0aW1hdG9yXSc7XG4gICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiBgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSAuc2hpcHBpbmctZXN0aW1hdGUtc3VibWl0YCxcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLnNoaXBwaW5nLWVzdGltYXRlLXN1Ym1pdCcsIHRoaXMuJGVsZW1lbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIC8vIGVzdGltYXRvciBlcnJvciBtZXNzYWdlcyBhcmUgYmVpbmcgaW5qZWN0ZWQgaW4gaHRtbCBhcyBhIHJlc3VsdFxuICAgICAgICAgICAgLy8gb2YgdXNlciBzdWJtaXQ7IGNsZWFyaW5nIGFuZCBhZGRpbmcgcm9sZSBvbiBzdWJtaXQgcHJvdmlkZXNcbiAgICAgICAgICAgIC8vIHJlZ3VsYXIgYW5ub3VuY2VtZW50IG9mIHRoZXNlIGVycm9yIG1lc3NhZ2VzXG4gICAgICAgICAgICBpZiAoc2hpcHBpbmdFc3RpbWF0b3JBbGVydC5hdHRyKCdyb2xlJykpIHtcbiAgICAgICAgICAgICAgICBzaGlwcGluZ0VzdGltYXRvckFsZXJ0LnJlbW92ZUF0dHIoJ3JvbGUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2hpcHBpbmdFc3RpbWF0b3JBbGVydC5hdHRyKCdyb2xlJywgJ2FsZXJ0Jyk7XG4gICAgICAgICAgICAvLyBXaGVuIHN3aXRjaGluZyBiZXR3ZWVuIGNvdW50cmllcywgdGhlIHN0YXRlL3JlZ2lvbiBpcyBkeW5hbWljXG4gICAgICAgICAgICAvLyBPbmx5IHBlcmZvcm0gYSBjaGVjayBmb3IgYWxsIGZpZWxkcyB3aGVuIGNvdW50cnkgaGFzIGEgdmFsdWVcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSBhcmVBbGwoJ3ZhbGlkJykgd2lsbCBjaGVjayBjb3VudHJ5IGZvciB2YWxpZGl0eVxuICAgICAgICAgICAgaWYgKCQoYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1jb3VudHJ5XCJdYCkudmFsKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYmluZFZhbGlkYXRpb24oKTtcbiAgICAgICAgdGhpcy5iaW5kU3RhdGVWYWxpZGF0aW9uKCk7XG4gICAgICAgIHRoaXMuYmluZFVQU1JhdGVzKCk7XG4gICAgfVxuXG4gICAgYmluZFZhbGlkYXRpb24oKSB7XG4gICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuYWRkKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1jb3VudHJ5XCJdYCxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY291bnRyeUlkID0gTnVtYmVyKHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNvdW50cnlJZCAhPT0gMCAmJiAhTnVtYmVyLmlzTmFOKGNvdW50cnlJZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5zaGlwcGluZ0Vycm9yTWVzc2FnZXMuY291bnRyeSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIGJpbmRTdGF0ZVZhbGlkYXRpb24oKSB7XG4gICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuYWRkKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdYCksXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0O1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRlbGUgPSAkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctc3RhdGVcIl1gKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoJGVsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZVZhbCA9ICRlbGUudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGVsZVZhbCAmJiBlbGVWYWwubGVuZ3RoICYmIGVsZVZhbCAhPT0gJ1N0YXRlL3Byb3ZpbmNlJztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuc2hpcHBpbmdFcnJvck1lc3NhZ2VzLnByb3ZpbmNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIGJldHdlZW4gZGVmYXVsdCBzaGlwcGluZyBhbmQgdXBzIHNoaXBwaW5nIHJhdGVzXG4gICAgICovXG4gICAgYmluZFVQU1JhdGVzKCkge1xuICAgICAgICBjb25zdCBVUFNSYXRlVG9nZ2xlID0gJy5lc3RpbWF0b3ItZm9ybS10b2dnbGVVUFNSYXRlJztcblxuICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgVVBTUmF0ZVRvZ2dsZSwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkZXN0aW1hdG9yRm9ybVVwcyA9ICQoJy5lc3RpbWF0b3ItZm9ybS0tdXBzJyk7XG4gICAgICAgICAgICBjb25zdCAkZXN0aW1hdG9yRm9ybURlZmF1bHQgPSAkKCcuZXN0aW1hdG9yLWZvcm0tLWRlZmF1bHQnKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJGVzdGltYXRvckZvcm1VcHMudG9nZ2xlQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcbiAgICAgICAgICAgICRlc3RpbWF0b3JGb3JtRGVmYXVsdC50b2dnbGVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kU3RhdGVDb3VudHJ5Q2hhbmdlKCkge1xuICAgICAgICBsZXQgJGxhc3Q7XG5cbiAgICAgICAgLy8gUmVxdWVzdHMgdGhlIHN0YXRlcyBmb3IgYSBjb3VudHJ5IHdpdGggQUpBWFxuICAgICAgICBzdGF0ZUNvdW50cnkodGhpcy4kc3RhdGUsIHRoaXMuY29udGV4dCwgeyB1c2VJZEZvclN0YXRlczogdHJ1ZSB9LCAoZXJyLCBmaWVsZCkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKGVycik7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0ICRmaWVsZCA9ICQoZmllbGQpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5nZXRTdGF0dXModGhpcy4kc3RhdGUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IucmVtb3ZlKHRoaXMuJHN0YXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCRsYXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5yZW1vdmUoJGxhc3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJGZpZWxkLmlzKCdzZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgICRsYXN0ID0gZmllbGQ7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kU3RhdGVWYWxpZGF0aW9uKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRmaWVsZC5hdHRyKCdwbGFjZWhvbGRlcicsICdTdGF0ZS9wcm92aW5jZScpO1xuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMuY2xlYW5VcFN0YXRlVmFsaWRhdGlvbihmaWVsZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFdoZW4geW91IGNoYW5nZSBhIGNvdW50cnksIHlvdSBzd2FwIHRoZSBzdGF0ZS9wcm92aW5jZSBiZXR3ZWVuIGFuIGlucHV0IGFuZCBhIHNlbGVjdCBkcm9wZG93blxuICAgICAgICAgICAgLy8gTm90IGFsbCBjb3VudHJpZXMgcmVxdWlyZSB0aGUgcHJvdmluY2UgdG8gYmUgZmlsbGVkXG4gICAgICAgICAgICAvLyBXZSBoYXZlIHRvIHJlbW92ZSB0aGlzIGNsYXNzIHdoZW4gd2Ugc3dhcCBzaW5jZSBub2QgdmFsaWRhdGlvbiBkb2Vzbid0IGNsZWFudXAgZm9yIHVzXG4gICAgICAgICAgICAkKHRoaXMuc2hpcHBpbmdFc3RpbWF0b3IpLmZpbmQoJy5mb3JtLWZpZWxkLS1zdWNjZXNzJykucmVtb3ZlQ2xhc3MoJ2Zvcm0tZmllbGQtLXN1Y2Nlc3MnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdG9nZ2xlRXN0aW1hdG9yRm9ybVN0YXRlKHRvZ2dsZUJ1dHRvbiwgYnV0dG9uU2VsZWN0b3IsICR0b2dnbGVDb250YWluZXIpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlQXR0cmlidXRlc09uVG9nZ2xlID0gKHNlbGVjdG9yVG9BY3RpdmF0ZSkgPT4ge1xuICAgICAgICAgICAgJCh0b2dnbGVCdXR0b24pLmF0dHIoJ2FyaWEtbGFiZWxsZWRieScsIHNlbGVjdG9yVG9BY3RpdmF0ZSk7XG4gICAgICAgICAgICAkKGJ1dHRvblNlbGVjdG9yKS50ZXh0KCQoYCMke3NlbGVjdG9yVG9BY3RpdmF0ZX1gKS50ZXh0KCkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICghdGhpcy5pc0VzdGltYXRvckZvcm1PcGVuZWQpIHtcbiAgICAgICAgICAgIGNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSgnZXN0aW1hdG9yLWNsb3NlJyk7XG4gICAgICAgICAgICAkdG9nZ2xlQ29udGFpbmVyLnJlbW92ZUNsYXNzKCd1LWhpZGRlbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hhbmdlQXR0cmlidXRlc09uVG9nZ2xlKCdlc3RpbWF0b3ItYWRkJyk7XG4gICAgICAgICAgICAkdG9nZ2xlQ29udGFpbmVyLmFkZENsYXNzKCd1LWhpZGRlbicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkID0gIXRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkO1xuICAgIH1cblxuICAgIGJpbmRFc3RpbWF0b3JFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0ICRlc3RpbWF0b3JDb250YWluZXIgPSAkKCcuc2hpcHBpbmctZXN0aW1hdG9yJyk7XG4gICAgICAgIGNvbnN0ICRlc3RpbWF0b3JGb3JtID0gJCgnLmVzdGltYXRvci1mb3JtJyk7XG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xuICAgICAgICAkZXN0aW1hdG9yRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIGNvdW50cnlfaWQ6ICQoJ1tuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgICAgICBzdGF0ZV9pZDogJCgnW25hbWU9XCJzaGlwcGluZy1zdGF0ZVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgICAgICBjaXR5OiAkKCdbbmFtZT1cInNoaXBwaW5nLWNpdHlcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICAgICAgemlwX2NvZGU6ICQoJ1tuYW1lPVwic2hpcHBpbmctemlwXCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0U2hpcHBpbmdRdW90ZXMocGFyYW1zLCAnY2FydC9zaGlwcGluZy1xdW90ZXMnLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5zaGlwcGluZy1xdW90ZXMnKS5odG1sKHJlc3BvbnNlLmNvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gYmluZCB0aGUgc2VsZWN0IGJ1dHRvblxuICAgICAgICAgICAgICAgICQoJy5zZWxlY3Qtc2hpcHBpbmctcXVvdGUnKS5vbignY2xpY2snLCBjbGlja0V2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVvdGVJZCA9ICQoJy5zaGlwcGluZy1xdW90ZTpjaGVja2VkJykudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2xpY2tFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LnN1Ym1pdFNoaXBwaW5nUXVvdGUocXVvdGVJZCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuc2hpcHBpbmctZXN0aW1hdGUtc2hvdycpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUVzdGltYXRvckZvcm1TdGF0ZShldmVudC5jdXJyZW50VGFyZ2V0LCAnLnNoaXBwaW5nLWVzdGltYXRlLXNob3dfX2J0bi1uYW1lJywgJGVzdGltYXRvckNvbnRhaW5lcik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgUHJvZHVjdERldGFpbHNCYXNlLCB7IG9wdGlvbkNoYW5nZURlY29yYXRvciB9IGZyb20gJy4vcHJvZHVjdC1kZXRhaWxzLWJhc2UnO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBpc0Jyb3dzZXJJRSwgY29udmVydEludG9BcnJheSB9IGZyb20gJy4vdXRpbHMvaWUtaGVscGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnRJdGVtRGV0YWlscyBleHRlbmRzIFByb2R1Y3REZXRhaWxzQmFzZSB7XG4gICAgY29uc3RydWN0b3IoJHNjb3BlLCBjb250ZXh0LCBwcm9kdWN0QXR0cmlidXRlc0RhdGEgPSB7fSkge1xuICAgICAgICBzdXBlcigkc2NvcGUsIGNvbnRleHQpO1xuXG4gICAgICAgIGNvbnN0ICRmb3JtID0gJCgnI0NhcnRFZGl0UHJvZHVjdEZpZWxkc0Zvcm0nLCB0aGlzLiRzY29wZSk7XG4gICAgICAgIGNvbnN0ICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQgPSAkKCdbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZXMtd3JhcHBlcl0nLCAkZm9ybSk7XG4gICAgICAgIGNvbnN0IGhhc09wdGlvbnMgPSAkcHJvZHVjdE9wdGlvbnNFbGVtZW50Lmh0bWwoKS50cmltKCkubGVuZ3RoO1xuICAgICAgICBjb25zdCBoYXNEZWZhdWx0T3B0aW9ucyA9ICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuZmluZCgnW2RhdGEtZGVmYXVsdF0nKS5sZW5ndGg7XG5cbiAgICAgICAgJHByb2R1Y3RPcHRpb25zRWxlbWVudC5vbignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRQcm9kdWN0VmFyaWFudCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBvcHRpb25DaGFuZ2VDYWxsYmFjayA9IG9wdGlvbkNoYW5nZURlY29yYXRvci5jYWxsKHRoaXMsIGhhc0RlZmF1bHRPcHRpb25zKTtcblxuICAgICAgICAvLyBVcGRhdGUgcHJvZHVjdCBhdHRyaWJ1dGVzLiBBbHNvIHVwZGF0ZSB0aGUgaW5pdGlhbCB2aWV3IGluIGNhc2UgaXRlbXMgYXJlIG9vc1xuICAgICAgICAvLyBvciBoYXZlIGRlZmF1bHQgdmFyaWFudCBwcm9wZXJ0aWVzIHRoYXQgY2hhbmdlIHRoZSB2aWV3XG4gICAgICAgIGlmICgoaXNFbXB0eShwcm9kdWN0QXR0cmlidXRlc0RhdGEpIHx8IGhhc0RlZmF1bHRPcHRpb25zKSAmJiBoYXNPcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0SWQgPSB0aGlzLmNvbnRleHQucHJvZHVjdEZvckNoYW5nZUlkO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMub3B0aW9uQ2hhbmdlKHByb2R1Y3RJZCwgJGZvcm0uc2VyaWFsaXplKCksICdwcm9kdWN0cy9idWxrLWRpc2NvdW50LXJhdGVzJywgb3B0aW9uQ2hhbmdlQ2FsbGJhY2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhwcm9kdWN0QXR0cmlidXRlc0RhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0UHJvZHVjdFZhcmlhbnQoKSB7XG4gICAgICAgIGNvbnN0IHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMgPSBbXTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuXG4gICAgICAgICQuZWFjaCgkKCdbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZV0nKSwgKGluZGV4LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uTGFiZWwgPSB2YWx1ZS5jaGlsZHJlblswXS5pbm5lclRleHQ7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25UaXRsZSA9IG9wdGlvbkxhYmVsLnNwbGl0KCc6JylbMF0udHJpbSgpO1xuICAgICAgICAgICAgY29uc3QgcmVxdWlyZWQgPSBvcHRpb25MYWJlbC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdyZXF1aXJlZCcpO1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9IHZhbHVlLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZScpO1xuXG4gICAgICAgICAgICBpZiAoKHR5cGUgPT09ICdpbnB1dC1maWxlJyB8fCB0eXBlID09PSAnaW5wdXQtdGV4dCcgfHwgdHlwZSA9PT0gJ2lucHV0LW51bWJlcicpICYmIHZhbHVlLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWUgPT09ICcnICYmIHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICd0ZXh0YXJlYScgJiYgdmFsdWUucXVlcnlTZWxlY3RvcigndGV4dGFyZWEnKS52YWx1ZSA9PT0gJycgJiYgcmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNTYXRpc2ZpZWQgPSBBcnJheS5mcm9tKHZhbHVlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpKS5ldmVyeSgoc2VsZWN0KSA9PiBzZWxlY3Quc2VsZWN0ZWRJbmRleCAhPT0gMCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNTYXRpc2ZpZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IEFycmF5LmZyb20odmFsdWUucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykpLm1hcCgoeCkgPT4geC52YWx1ZSkuam9pbignLScpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7ZGF0ZVN0cmluZ31gKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3NldC1zZWxlY3QnKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ID0gdmFsdWUucXVlcnlTZWxlY3Rvcignc2VsZWN0Jyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHNlbGVjdC5zZWxlY3RlZEluZGV4O1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSW5kZXggIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke3NlbGVjdC5vcHRpb25zW3NlbGVjdGVkSW5kZXhdLmlubmVyVGV4dH1gKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3NldC1yZWN0YW5nbGUnIHx8IHR5cGUgPT09ICdzZXQtcmFkaW8nIHx8IHR5cGUgPT09ICdzd2F0Y2gnIHx8IHR5cGUgPT09ICdpbnB1dC1jaGVja2JveCcgfHwgdHlwZSA9PT0gJ3Byb2R1Y3QtbGlzdCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGVja2VkID0gdmFsdWUucXVlcnlTZWxlY3RvcignOmNoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBnZXRTZWxlY3RlZE9wdGlvbkxhYmVsID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdFZhcmlhbnRzbGlzdCA9IGNvbnZlcnRJbnRvQXJyYXkodmFsdWUuY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hMYWJlbEZvckNoZWNrZWRJbnB1dCA9IGlucHQgPT4gaW5wdC5kYXRhc2V0LnByb2R1Y3RBdHRyaWJ1dGVWYWx1ZSA9PT0gY2hlY2tlZC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9kdWN0VmFyaWFudHNsaXN0LmZpbHRlcihtYXRjaExhYmVsRm9yQ2hlY2tlZElucHV0KVswXTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzZXQtcmVjdGFuZ2xlJyB8fCB0eXBlID09PSAnc2V0LXJhZGlvJyB8fCB0eXBlID09PSAncHJvZHVjdC1saXN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBpc0Jyb3dzZXJJRSA/IGdldFNlbGVjdGVkT3B0aW9uTGFiZWwoKS5pbm5lclRleHQudHJpbSgpIDogY2hlY2tlZC5sYWJlbHNbMF0uaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke2xhYmVsfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzd2F0Y2gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGlzQnJvd3NlcklFID8gZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCgpLmNoaWxkcmVuWzBdIDogY2hlY2tlZC5sYWJlbHNbMF0uY2hpbGRyZW5bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7bGFiZWwudGl0bGV9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2lucHV0LWNoZWNrYm94Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfTpZZXNgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2lucHV0LWNoZWNrYm94Jykge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9Ok5vYCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgcHJvZHVjdFZhcmlhbnQgPSB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLmxlbmd0aCA9PT0gMCA/IG9wdGlvbnMuc29ydCgpLmpvaW4oJywgJykgOiAndW5zYXRpc2ZpZWQnO1xuICAgICAgICBjb25zdCB2aWV3ID0gJCgnLm1vZGFsLWhlYWRlci10aXRsZScpO1xuXG4gICAgICAgIGlmIChwcm9kdWN0VmFyaWFudCkge1xuICAgICAgICAgICAgcHJvZHVjdFZhcmlhbnQgPSBwcm9kdWN0VmFyaWFudCA9PT0gJ3Vuc2F0aXNmaWVkJyA/ICcnIDogcHJvZHVjdFZhcmlhbnQ7XG4gICAgICAgICAgICBpZiAodmlldy5hdHRyKCdkYXRhLWV2ZW50LXR5cGUnKSkge1xuICAgICAgICAgICAgICAgIHZpZXcuYXR0cignZGF0YS1wcm9kdWN0LXZhcmlhbnQnLCBwcm9kdWN0VmFyaWFudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3ROYW1lID0gdmlldy5odG1sKCkubWF0Y2goLycoLio/KScvKVsxXTtcbiAgICAgICAgICAgICAgICBjb25zdCBjYXJkID0gJChgW2RhdGEtbmFtZT1cIiR7cHJvZHVjdE5hbWV9XCJdYCk7XG4gICAgICAgICAgICAgICAgY2FyZC5hdHRyKCdkYXRhLXByb2R1Y3QtdmFyaWFudCcsIHByb2R1Y3RWYXJpYW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGUgb3IgbWFyayBhcyB1bmF2YWlsYWJsZSBvdXQgb2Ygc3RvY2sgYXR0cmlidXRlcyBpZiBlbmFibGVkXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIFByb2R1Y3QgYXR0cmlidXRlIGRhdGFcbiAgICAgKi9cbiAgICB1cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhkYXRhKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKGRhdGEpO1xuXG4gICAgICAgIHRoaXMuJHNjb3BlLmZpbmQoJy5tb2RhbC1jb250ZW50JykucmVtb3ZlQ2xhc3MoJ2hpZGUtY29udGVudCcpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChjZXJ0KSB7XG4gICAgaWYgKHR5cGVvZiBjZXJ0ICE9PSAnc3RyaW5nJyB8fCBjZXJ0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQWRkIGFueSBjdXN0b20gZ2lmdCBjZXJ0aWZpY2F0ZSB2YWxpZGF0aW9uIGxvZ2ljIGhlcmVcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbiIsImltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCB9IGZyb20gJy4vdXRpbHMvZm9ybS11dGlscyc7XG5pbXBvcnQgeyBzaG93QWxlcnRNb2RhbCB9IGZyb20gJy4uL2dsb2JhbC9tb2RhbCc7XG5cbi8qKlxuICogSWYgdGhlcmUgYXJlIG5vIG9wdGlvbnMgZnJvbSBiY2FwcCwgYSB0ZXh0IGZpZWxkIHdpbGwgYmUgc2VudC4gVGhpcyB3aWxsIGNyZWF0ZSBhIHNlbGVjdCBlbGVtZW50IHRvIGhvbGQgb3B0aW9ucyBhZnRlciB0aGUgcmVtb3RlIHJlcXVlc3QuXG4gKiBAcmV0dXJucyB7alF1ZXJ5fEhUTUxFbGVtZW50fVxuICovXG5mdW5jdGlvbiBtYWtlU3RhdGVSZXF1aXJlZChzdGF0ZUVsZW1lbnQsIGNvbnRleHQpIHtcbiAgICBjb25zdCBhdHRycyA9IF8udHJhbnNmb3JtKHN0YXRlRWxlbWVudC5wcm9wKCdhdHRyaWJ1dGVzJyksIChyZXN1bHQsIGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgcmV0ID0gcmVzdWx0O1xuICAgICAgICByZXRbaXRlbS5uYW1lXSA9IGl0ZW0udmFsdWU7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXBsYWNlbWVudEF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIGlkOiBhdHRycy5pZCxcbiAgICAgICAgJ2RhdGEtbGFiZWwnOiBhdHRyc1snZGF0YS1sYWJlbCddLFxuICAgICAgICBjbGFzczogJ2Zvcm0tc2VsZWN0JyxcbiAgICAgICAgbmFtZTogYXR0cnMubmFtZSxcbiAgICAgICAgJ2RhdGEtZmllbGQtdHlwZSc6IGF0dHJzWydkYXRhLWZpZWxkLXR5cGUnXSxcbiAgICB9O1xuXG4gICAgc3RhdGVFbGVtZW50LnJlcGxhY2VXaXRoKCQoJzxzZWxlY3Q+PC9zZWxlY3Q+JywgcmVwbGFjZW1lbnRBdHRyaWJ1dGVzKSk7XG5cbiAgICBjb25zdCAkbmV3RWxlbWVudCA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xuICAgIGNvbnN0ICRoaWRkZW5JbnB1dCA9ICQoJ1tuYW1lKj1cIkZvcm1GaWVsZElzVGV4dFwiXScpO1xuXG4gICAgaWYgKCRoaWRkZW5JbnB1dC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgJGhpZGRlbklucHV0LnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGlmICgkbmV3RWxlbWVudC5wcmV2KCkuZmluZCgnc21hbGwnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gU3RyaW5nIGlzIGluamVjdGVkIGZyb20gbG9jYWxpemVyXG4gICAgICAgICRuZXdFbGVtZW50LnByZXYoKS5hcHBlbmQoYDxzbWFsbD4ke2NvbnRleHQucmVxdWlyZWR9PC9zbWFsbD5gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkbmV3RWxlbWVudC5wcmV2KCkuZmluZCgnc21hbGwnKS5zaG93KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuICRuZXdFbGVtZW50O1xufVxuXG4vKipcbiAqIElmIGEgY291bnRyeSB3aXRoIHN0YXRlcyBpcyB0aGUgZGVmYXVsdCwgYSBzZWxlY3Qgd2lsbCBiZSBzZW50LFxuICogSW4gdGhpcyBjYXNlIHdlIG5lZWQgdG8gYmUgYWJsZSB0byBzd2l0Y2ggdG8gYW4gaW5wdXQgZmllbGQgYW5kIGhpZGUgdGhlIHJlcXVpcmVkIGZpZWxkXG4gKi9cbmZ1bmN0aW9uIG1ha2VTdGF0ZU9wdGlvbmFsKHN0YXRlRWxlbWVudCkge1xuICAgIGNvbnN0IGF0dHJzID0gXy50cmFuc2Zvcm0oc3RhdGVFbGVtZW50LnByb3AoJ2F0dHJpYnV0ZXMnKSwgKHJlc3VsdCwgaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCByZXQgPSByZXN1bHQ7XG4gICAgICAgIHJldFtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH0pO1xuXG4gICAgY29uc3QgcmVwbGFjZW1lbnRBdHRyaWJ1dGVzID0ge1xuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIGlkOiBhdHRycy5pZCxcbiAgICAgICAgJ2RhdGEtbGFiZWwnOiBhdHRyc1snZGF0YS1sYWJlbCddLFxuICAgICAgICBjbGFzczogJ2Zvcm0taW5wdXQnLFxuICAgICAgICBuYW1lOiBhdHRycy5uYW1lLFxuICAgICAgICAnZGF0YS1maWVsZC10eXBlJzogYXR0cnNbJ2RhdGEtZmllbGQtdHlwZSddLFxuICAgIH07XG5cbiAgICBzdGF0ZUVsZW1lbnQucmVwbGFjZVdpdGgoJCgnPGlucHV0IC8+JywgcmVwbGFjZW1lbnRBdHRyaWJ1dGVzKSk7XG5cbiAgICBjb25zdCAkbmV3RWxlbWVudCA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xuXG4gICAgaWYgKCRuZXdFbGVtZW50Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkKCRuZXdFbGVtZW50KTtcbiAgICAgICAgJG5ld0VsZW1lbnQucHJldigpLmZpbmQoJ3NtYWxsJykuaGlkZSgpO1xuICAgIH1cblxuICAgIHJldHVybiAkbmV3RWxlbWVudDtcbn1cblxuLyoqXG4gKiBBZGRzIHRoZSBhcnJheSBvZiBvcHRpb25zIGZyb20gdGhlIHJlbW90ZSByZXF1ZXN0IHRvIHRoZSBuZXdseSBjcmVhdGVkIHNlbGVjdCBib3guXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVzQXJyYXlcbiAqIEBwYXJhbSB7alF1ZXJ5fSAkc2VsZWN0RWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gYWRkT3B0aW9ucyhzdGF0ZXNBcnJheSwgJHNlbGVjdEVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBjb250YWluZXIgPSBbXTtcblxuICAgIGNvbnRhaW5lci5wdXNoKGA8b3B0aW9uIHZhbHVlPVwiXCI+JHtzdGF0ZXNBcnJheS5wcmVmaXh9PC9vcHRpb24+YCk7XG5cbiAgICBpZiAoIV8uaXNFbXB0eSgkc2VsZWN0RWxlbWVudCkpIHtcbiAgICAgICAgc3RhdGVzQXJyYXkuc3RhdGVzLmZvckVhY2goKHN0YXRlT2JqKSA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy51c2VJZEZvclN0YXRlcykge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5wdXNoKGA8b3B0aW9uIHZhbHVlPVwiJHtzdGF0ZU9iai5pZH1cIj4ke3N0YXRlT2JqLm5hbWV9PC9vcHRpb24+YCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5wdXNoKGA8b3B0aW9uIHZhbHVlPVwiJHtzdGF0ZU9iai5uYW1lfVwiPiR7c3RhdGVPYmoubGFiZWwgPyBzdGF0ZU9iai5sYWJlbCA6IHN0YXRlT2JqLm5hbWV9PC9vcHRpb24+YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzZWxlY3RFbGVtZW50Lmh0bWwoY29udGFpbmVyLmpvaW4oJyAnKSk7XG4gICAgfVxufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge2pRdWVyeX0gc3RhdGVFbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZUVsZW1lbnQsIGNvbnRleHQgPSB7fSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAvKipcbiAgICAgKiBCYWNrd2FyZHMgY29tcGF0aWJsZSBmb3IgdGhyZWUgcGFyYW1ldGVycyBpbnN0ZWFkIG9mIGZvdXJcbiAgICAgKlxuICAgICAqIEF2YWlsYWJsZSBvcHRpb25zOlxuICAgICAqXG4gICAgICogdXNlSWRGb3JTdGF0ZXMge0Jvb2x9IC0gR2VuZXJhdGVzIHN0YXRlcyBkcm9wZG93biB1c2luZyBpZCBmb3IgdmFsdWVzIGluc3RlYWQgb2Ygc3RyaW5nc1xuICAgICAqL1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuICAgICAgICBjYWxsYmFjayA9IG9wdGlvbnM7XG4gICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuICAgIH1cblxuICAgICQoJ3NlbGVjdFtkYXRhLWZpZWxkLXR5cGU9XCJDb3VudHJ5XCJdJykub24oJ2NoYW5nZScsIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgY291bnRyeU5hbWUgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpO1xuXG4gICAgICAgIGlmIChjb3VudHJ5TmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHV0aWxzLmFwaS5jb3VudHJ5LmdldEJ5TmFtZShjb3VudHJ5TmFtZSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBzaG93QWxlcnRNb2RhbChjb250ZXh0LnN0YXRlX2Vycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgJGN1cnJlbnRJbnB1dCA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xuXG4gICAgICAgICAgICBpZiAoIV8uaXNFbXB0eShyZXNwb25zZS5kYXRhLnN0YXRlcykpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGUgZWxlbWVudCBtYXkgaGF2ZSBiZWVuIHJlcGxhY2VkIHdpdGggYSBzZWxlY3QsIHJlc2VsZWN0IGl0XG4gICAgICAgICAgICAgICAgY29uc3QgJHNlbGVjdEVsZW1lbnQgPSBtYWtlU3RhdGVSZXF1aXJlZCgkY3VycmVudElucHV0LCBjb250ZXh0KTtcblxuICAgICAgICAgICAgICAgIGFkZE9wdGlvbnMocmVzcG9uc2UuZGF0YSwgJHNlbGVjdEVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsICRzZWxlY3RFbGVtZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IG1ha2VTdGF0ZU9wdGlvbmFsKCRjdXJyZW50SW5wdXQsIGNvbnRleHQpO1xuXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgbmV3RWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwiY29uc3QgVFJBTlNMQVRJT05TID0gJ3RyYW5zbGF0aW9ucyc7XG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XG5jb25zdCBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5ID0gKC4uLmRpY3Rpb25hcnlKc29uTGlzdCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGljdGlvbmFyeUpzb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XG4gICAgICAgIGlmIChpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5KGRpY3Rpb25hcnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogZGVmaW5lcyBUcmFuc2xhdGlvbiBEaWN0aW9uYXJ5IHRvIHVzZVxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XG4gKiB2YWxpZGF0aW9uX21lc3NhZ2VzLCB2YWxpZGF0aW9uX2ZhbGxiYWNrX21lc3NhZ2VzIGFuZCBkZWZhdWx0X21lc3NhZ2VzXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5ID0gKGNvbnRleHQpID0+IHtcbiAgICBjb25zdCB7IHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04gfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XG4gICAgY29uc3QgbG9jYWxpemF0aW9ucyA9IE9iamVjdC52YWx1ZXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleXMgPSBPYmplY3Qua2V5cyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLm1hcChrZXkgPT4ga2V5LnNwbGl0KCcuJykucG9wKCkpO1xuXG4gICAgcmV0dXJuIHRyYW5zbGF0aW9uS2V5cy5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XG4gICAgICAgIGFjY1trZXldID0gbG9jYWxpemF0aW9uc1tpXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59O1xuIl0sIm5hbWVzIjpbIlBhZ2VNYW5hZ2VyIiwiY2hlY2tJc0dpZnRDZXJ0VmFsaWQiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJ1dGlscyIsIlNoaXBwaW5nRXN0aW1hdG9yIiwiZGVmYXVsdE1vZGFsIiwic2hvd0FsZXJ0TW9kYWwiLCJzaG93U2hpcHBpbmdNb2RhbCIsIk1vZGFsRXZlbnRzIiwiQ2FydEl0ZW1EZXRhaWxzIiwiQ2FydCIsIl9QYWdlTWFuYWdlciIsIl9pbmhlcml0c0xvb3NlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJvblJlYWR5IiwiJG1vZGFsIiwiJGNhcnRQYWdlQ29udGVudCIsIiQiLCIkY2FydENvbnRlbnQiLCIkY2FydE1lc3NhZ2VzIiwiJGNhcnRUb3RhbHMiLCIkY2FydEFkZGl0aW9uYWxDaGVja291dEJ0bnMiLCIkb3ZlcmxheSIsImhpZGUiLCIkYWN0aXZlQ2FydEl0ZW1JZCIsIiRhY3RpdmVDYXJ0SXRlbUJ0bkFjdGlvbiIsInNldEFwcGxlUGF5U3VwcG9ydCIsImJpbmRFdmVudHMiLCJnZXRvcmluYVByaWNlIiwiY2FydGJyYW5kR3JvdXBpbmciLCJnZXRDYXJ0UHJvZHVjdHNDb21ibyIsIndpbmRvdyIsIkFwcGxlUGF5U2Vzc2lvbiIsImFkZENsYXNzIiwib3B0aW9ucyIsIm1ldGhvZCIsImhlYWRlcnMiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjb25zb2xlIiwibG9nIiwiZXJyIiwiZXJyb3IiLCJzdG9yZWZyb250Q2FsbCIsImVuZHBvaW50IiwicmVxdWVzdEJvZHkiLCJyZXNvdXJjZSIsImxvY2F0aW9uIiwib3JpZ2luIiwicm91dGUiLCJpbml0IiwiY3JlZGVudGlhbHMiLCJhY2NlcHQiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbnRlbnQiLCJzdGF0dXMiLCJzdWNjZXNzIiwiRXJyb3IiLCJyZXN1bHQiLCIkZXhhY3RwcmljZSIsIm1hcCIsIml0ZW0iLCJsaW5lSXRlbXMiLCJwaHlzaWNhbEl0ZW1zIiwiaW5kZXgiLCJwYXJzZUludCIsIm9yaWdpbmFsUHJpY2UiLCJlcSIsInRleHQiLCIkaXRlbXMiLCJncm91cGVkSXRlbXMiLCJlYWNoIiwiYnJhbmQiLCJkYXRhIiwicHVzaCIsImZpbmQiLCJuZXdDb250YWluZXIiLCJfbG9vcCIsIiRzdWJ0b3RhbCIsIiRwcmljZXdpdGhkb2xsIiwiJGdzdHRvdGFsIiwiJHRvdGFsQW1vdW50d2l0aGdzdCIsIiRvZmZlciIsIiRkb2xsYXIiLCIkc3RycHJpY2VzIiwiJGNvbnZlcnRlZE51bWJlciIsInBhcnNlRmxvYXQiLCJzbGljZSIsIiRhbW91bnQiLCJrZXlzIiwiT2JqZWN0IiwiJGkiLCJsZW5ndGgiLCJuZXdUZXh0IiwiYXBwZW5kIiwidG90YWxzIiwiZ3N0Iiwic2hvd3ByaWNlIiwic2hvd2dzdHByaWNlIiwiYm9yZGVyIiwicmVwbGFjZVdpdGgiLCJjYXJ0VXBkYXRlIiwiJHRhcmdldCIsIl90aGlzIiwiaXRlbUlkIiwiJGVsIiwib2xkUXR5IiwidmFsIiwibWF4UXR5IiwibWluUXR5IiwibWluRXJyb3IiLCJtYXhFcnJvciIsIm5ld1F0eSIsInNob3ciLCJhcGkiLCJjYXJ0IiwiaXRlbVVwZGF0ZSIsInNob3dQb3B1cCIsInJlbW92ZSIsInJlZnJlc2hDb250ZW50IiwiZXJyb3JzIiwiam9pbiIsImNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlIiwicHJlVmFsIiwiX3RoaXMyIiwiTnVtYmVyIiwiaW52YWxpZEVudHJ5IiwiaXNJbnRlZ2VyIiwiY29udGV4dCIsImludmFsaWRFbnRyeU1lc3NhZ2UiLCJyZXBsYWNlIiwiY2FydFJlbW92ZUl0ZW0iLCJfdGhpczMiLCJpdGVtUmVtb3ZlIiwiY2FydEVkaXRPcHRpb25zIiwicHJvZHVjdElkIiwiX3RoaXM0IiwiYXNzaWduIiwicHJvZHVjdEZvckNoYW5nZUlkIiwibW9kYWwiLCJ0ZW1wbGF0ZSIsIm9wZW4iLCJwcm9kdWN0QXR0cmlidXRlcyIsImNvbmZpZ3VyZUluQ2FydCIsInVwZGF0ZUNvbnRlbnQiLCJvcHRpb25DaGFuZ2VIYW5kbGVyIiwiJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyIiwibW9kYWxCb2R5UmVzZXJ2ZWRIZWlnaHQiLCJvdXRlckhlaWdodCIsImNzcyIsImhhc0NsYXNzIiwib25lIiwib3BlbmVkIiwicHJvZHVjdERldGFpbHMiLCJiaW5kR2lmdFdyYXBwaW5nRm9ybSIsImhvb2tzIiwib24iLCJldmVudCIsImN1cnJlbnRUYXJnZXQiLCIkZm9ybSIsIiRzdWJtaXQiLCIkbWVzc2FnZUJveCIsIm9wdGlvbkNoYW5nZSIsInNlcmlhbGl6ZSIsInB1cmNoYXNpbmdfbWVzc2FnZSIsInByb3AiLCJwdXJjaGFzYWJsZSIsImluc3RvY2siLCJfdGhpczUiLCIkY2FydEl0ZW1zUm93cyIsIiRjYXJ0UGFnZVRpdGxlIiwicGFnZVRpdGxlIiwic3RhdHVzTWVzc2FnZXMiLCJhZGRpdGlvbmFsQ2hlY2tvdXRCdXR0b25zIiwicmVsb2FkIiwiZ2V0Q29udGVudCIsImh0bWwiLCJxdWFudGl0eSIsInRyaWdnZXIiLCJmaWx0ZXIiLCJiaW5kQ2FydEV2ZW50cyIsIl90aGlzNiIsImRlYm91bmNlVGltZW91dCIsIl9iaW5kIiwiX2RlYm91bmNlIiwicHJldmVudERlZmF1bHQiLCJvblF0eUZvY3VzIiwidmFsdWUiLCJjaGFuZ2UiLCJzdHJpbmciLCJpY29uIiwic2hvd0NhbmNlbEJ1dHRvbiIsIm9uQ29uZmlybSIsImJpbmRQcm9tb0NvZGVFdmVudHMiLCJfdGhpczciLCIkY291cG9uQ29udGFpbmVyIiwiJGNvdXBvbkZvcm0iLCIkY29kZUlucHV0IiwiY29kZSIsImFwcGx5Q29kZSIsImJpbmRHaWZ0Q2VydGlmaWNhdGVFdmVudHMiLCJfdGhpczgiLCIkY2VydENvbnRhaW5lciIsIiRjZXJ0Rm9ybSIsIiRjZXJ0SW5wdXQiLCJ0b2dnbGUiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeSIsImludmFsaWRfZ2lmdF9jZXJ0aWZpY2F0ZSIsImFwcGx5R2lmdENlcnRpZmljYXRlIiwicmVzcCIsImJpbmRHaWZ0V3JhcHBpbmdFdmVudHMiLCJfdGhpczkiLCJnZXRJdGVtR2lmdFdyYXBwaW5nT3B0aW9ucyIsIiRzZWxlY3QiLCJpZCIsImFsbG93TWVzc2FnZSIsInRvZ2dsZVZpZXdzIiwiJHNpbmdsZUZvcm0iLCIkbXVsdGlGb3JtIiwic2hpcHBpbmdFcnJvck1lc3NhZ2VzIiwiY291bnRyeSIsInNoaXBwaW5nQ291bnRyeUVycm9yTWVzc2FnZSIsInByb3ZpbmNlIiwic2hpcHBpbmdQcm92aW5jZUVycm9yTWVzc2FnZSIsInNoaXBwaW5nRXN0aW1hdG9yIiwiZGVmYXVsdCIsImJyQXJyIiwiJG9mcyIsIm5hbWUiLCIkbWVzc2FnZSIsInN0YXRlQ291bnRyeSIsIm5vZCIsIlZhbGlkYXRvcnMiLCJhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlIiwiY29sbGFwc2libGVGYWN0b3J5IiwiJGVsZW1lbnQiLCIkc3RhdGUiLCJpc0VzdGltYXRvckZvcm1PcGVuZWQiLCJpbml0Rm9ybVZhbGlkYXRpb24iLCJiaW5kU3RhdGVDb3VudHJ5Q2hhbmdlIiwiYmluZEVzdGltYXRvckV2ZW50cyIsInNoaXBwaW5nRXN0aW1hdG9yQWxlcnQiLCJzaGlwcGluZ1ZhbGlkYXRvciIsInN1Ym1pdCIsInRhcCIsImF0dHIiLCJyZW1vdmVBdHRyIiwicGVyZm9ybUNoZWNrIiwiYXJlQWxsIiwiYmluZFZhbGlkYXRpb24iLCJiaW5kU3RhdGVWYWxpZGF0aW9uIiwiYmluZFVQU1JhdGVzIiwiYWRkIiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImNiIiwiY291bnRyeUlkIiwiaXNOYU4iLCJlcnJvck1lc3NhZ2UiLCIkZWxlIiwiZWxlVmFsIiwiVVBTUmF0ZVRvZ2dsZSIsIiRlc3RpbWF0b3JGb3JtVXBzIiwiJGVzdGltYXRvckZvcm1EZWZhdWx0IiwidG9nZ2xlQ2xhc3MiLCIkbGFzdCIsInVzZUlkRm9yU3RhdGVzIiwiZmllbGQiLCIkZmllbGQiLCJnZXRTdGF0dXMiLCJpcyIsImNsZWFuVXBTdGF0ZVZhbGlkYXRpb24iLCJyZW1vdmVDbGFzcyIsInRvZ2dsZUVzdGltYXRvckZvcm1TdGF0ZSIsInRvZ2dsZUJ1dHRvbiIsImJ1dHRvblNlbGVjdG9yIiwiJHRvZ2dsZUNvbnRhaW5lciIsImNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSIsInNlbGVjdG9yVG9BY3RpdmF0ZSIsIiRlc3RpbWF0b3JDb250YWluZXIiLCIkZXN0aW1hdG9yRm9ybSIsInBhcmFtcyIsImNvdW50cnlfaWQiLCJzdGF0ZV9pZCIsImNpdHkiLCJ6aXBfY29kZSIsImdldFNoaXBwaW5nUXVvdGVzIiwiY2xpY2tFdmVudCIsInF1b3RlSWQiLCJzdWJtaXRTaGlwcGluZ1F1b3RlIiwiUHJvZHVjdERldGFpbHNCYXNlIiwib3B0aW9uQ2hhbmdlRGVjb3JhdG9yIiwiaXNCcm93c2VySUUiLCJjb252ZXJ0SW50b0FycmF5IiwiX1Byb2R1Y3REZXRhaWxzQmFzZSIsIiRzY29wZSIsInByb2R1Y3RBdHRyaWJ1dGVzRGF0YSIsImNhbGwiLCIkcHJvZHVjdE9wdGlvbnNFbGVtZW50IiwiaGFzT3B0aW9ucyIsInRyaW0iLCJoYXNEZWZhdWx0T3B0aW9ucyIsInNldFByb2R1Y3RWYXJpYW50Iiwib3B0aW9uQ2hhbmdlQ2FsbGJhY2siLCJfYXNzZXJ0VGhpc0luaXRpYWxpemVkIiwiX2lzRW1wdHkiLCJ1cGRhdGVQcm9kdWN0QXR0cmlidXRlcyIsInVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMiLCJvcHRpb25MYWJlbCIsImNoaWxkcmVuIiwiaW5uZXJUZXh0Iiwib3B0aW9uVGl0bGUiLCJzcGxpdCIsInJlcXVpcmVkIiwidG9Mb3dlckNhc2UiLCJpbmNsdWRlcyIsInR5cGUiLCJnZXRBdHRyaWJ1dGUiLCJxdWVyeVNlbGVjdG9yIiwiaXNTYXRpc2ZpZWQiLCJBcnJheSIsImZyb20iLCJxdWVyeVNlbGVjdG9yQWxsIiwiZXZlcnkiLCJzZWxlY3QiLCJzZWxlY3RlZEluZGV4IiwiZGF0ZVN0cmluZyIsIngiLCJjaGVja2VkIiwiZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCIsInByb2R1Y3RWYXJpYW50c2xpc3QiLCJtYXRjaExhYmVsRm9yQ2hlY2tlZElucHV0IiwiaW5wdCIsImRhdGFzZXQiLCJwcm9kdWN0QXR0cmlidXRlVmFsdWUiLCJsYWJlbCIsImxhYmVscyIsInRpdGxlIiwicHJvZHVjdFZhcmlhbnQiLCJzb3J0IiwidmlldyIsInByb2R1Y3ROYW1lIiwibWF0Y2giLCJjYXJkIiwiY2VydCIsImluc2VydFN0YXRlSGlkZGVuRmllbGQiLCJtYWtlU3RhdGVSZXF1aXJlZCIsInN0YXRlRWxlbWVudCIsImF0dHJzIiwiX3RyYW5zZm9ybSIsInJldCIsInJlcGxhY2VtZW50QXR0cmlidXRlcyIsIiRuZXdFbGVtZW50IiwiJGhpZGRlbklucHV0IiwicHJldiIsIm1ha2VTdGF0ZU9wdGlvbmFsIiwiYWRkT3B0aW9ucyIsInN0YXRlc0FycmF5IiwiJHNlbGVjdEVsZW1lbnQiLCJjb250YWluZXIiLCJwcmVmaXgiLCJzdGF0ZXMiLCJmb3JFYWNoIiwic3RhdGVPYmoiLCJjYWxsYmFjayIsImNvdW50cnlOYW1lIiwiZ2V0QnlOYW1lIiwic3RhdGVfZXJyb3IiLCIkY3VycmVudElucHV0IiwibmV3RWxlbWVudCIsIlRSQU5TTEFUSU9OUyIsImlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkiLCJkaWN0aW9uYXJ5IiwiY2hvb3NlQWN0aXZlRGljdGlvbmFyeSIsImkiLCJwYXJzZSIsInVuZGVmaW5lZCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiIsImFjdGl2ZURpY3Rpb25hcnkiLCJsb2NhbGl6YXRpb25zIiwidmFsdWVzIiwidHJhbnNsYXRpb25LZXlzIiwia2V5IiwicG9wIiwicmVkdWNlIiwiYWNjIl0sInNvdXJjZVJvb3QiOiIifQ==