import PageManager from './page-manager';
import { bind, debounce } from 'lodash';
import checkIsGiftCertValid from './common/gift-certificate-validator';
import { createTranslationDictionary } from './common/utils/translations-utils';
import utils from '@bigcommerce/stencil-utils';
import ShippingEstimator from './cart/shipping-estimator';
import { defaultModal, showAlertModal,showShippingModal, ModalEvents } from './global/modal';
import CartItemDetails from './common/cart-item-details';

export default class Cart extends PageManager {
    onReady() {
        this.$modal = null;
        this.$cartPageContent = $('[data-cart]');
        this.$cartContent = $('[data-cart-content]');
        this.$cartMessages = $('[data-cart-status]');
        this.$cartTotals = $('[data-cart-totals]');
        this.$cartAdditionalCheckoutBtns = $('[data-cart-additional-checkout-buttons]');
        this.$overlay = $('[data-cart] .loadingOverlay')
            .hide(); // TODO: temporary until roper pulls in his cart components
        this.$activeCartItemId = null;
        this.$activeCartItemBtnAction = null;

        this.setApplePaySupport();
        this.bindEvents();
        this.getorinaPrice();
        this.cartbrandGrouping();//custom function
        this.getCartProductsCombo();
    }

    setApplePaySupport() {
        if (window.ApplePaySession) {
            this.$cartPageContent.addClass('apple-pay-supported');
        }
    }

    getCartProductsCombo(){         

    const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};
    fetch('https:/api/storefront/carts', options)
    .then(response => response.json())
    .then(response => console.log("hiiiiiiiiii"+response))
    .catch(err => console.error(err));

    }
    
    getorinaPrice(){
        
        const storefrontCall = (endpoint, requestBody = null) => {
            let resource = `${window.location.origin}/api/storefront${endpoint.route}`;
            let init = {
              method: endpoint.method,
              credentials: "same-origin",
              headers: {
                // note: no authorization
                "Accept": endpoint.accept,
              }
            }
            if(requestBody) {
              init.body = JSON.stringify(requestBody);
              init.headers["Content-Type"] = endpoint.content;
            }
           
            return fetch(resource, init)
            .then(response => {
             
              if(response.status === endpoint.success) {
                // resolve promise using the Fetch API method that correlates with the endpoint.accept value
                return response.json(); // or response.text()
              } else {
                return new Error(`response.status is ${response.status}`);
              }
            })
            .then(result => {
              console.log(result); // requested data
              let $exactprice;
                         
                result.map(function(item){
                //console.log("result",item);
                item.lineItems.physicalItems.map(function(item,index){
                    $exactprice= parseInt(item.originalPrice);  
                  // console.log("Orginal price "+$exactprice);
                 // $price += $exactprice;  
                    
                $('.orginal-price').eq(index).text("$"+$exactprice);

                })
               
             });
            
            })
            .catch(error => console.error(error));
          }
            let endpoint = {  route: "/carts?include=lineItems.physicalItems.options&include_fields=line_items.physical_items.custom_fields.my_custom_field",  method: "GET",  accept: "application/json", success: 200 }// content: "application/json",
                                     ///carts?include=lineItems.physicalItems.options&include_fields=line_items.physical_items.custom_fields.my_custom_field


            storefrontCall(endpoint);

  }

  cartbrandGrouping(){
    let $items= $(".cart-item"); 

    let groupedItems = {}; //created a object to stor grouped products 

     $items.each(function(index,item){
   
      let brand= $(this).data('brand');  //getting all brands
  
      if (!groupedItems[brand]) {        
          groupedItems[brand] = { lineItems: [] }; 
      }
  
      // Add the current item's line-item to the array for the brand
      groupedItems[brand].lineItems.push($(this).find('.product-item')); 
  
     });
     ////////////////////////////

     // Creating a new container for the grouped items to append
     let newContainer = $('<div class="cart-banner"></div>');
                            
      // Iterate over the grouped items and create a new cart item container for each brand
         for (let brand in groupedItems) {
          
             let $subtotal= 0;
             let $pricewithdoll=0;
             let $gsttotal= 0;
            // let $shipping= 0; 
             var $totalAmountwithgst=0;
             let $offer= $('<div class="offer"></div>');   
             let  $dollar = "$";
            // let uniqueProducts = {};           

            $(groupedItems[brand].lineItems).each(function() {
             let $strprices = $(this).data('price');
             let $convertedNumber = parseFloat($strprices.slice(1));  //converting a string to a number and removing the extra character
           
            let $amount=  $subtotal += $convertedNumber;
            $gsttotal = 0.1 * $amount; 
            $totalAmountwithgst=parseInt($gsttotal);
            $totalAmountwithgst= $dollar+$totalAmountwithgst;

            $pricewithdoll= $dollar+$amount; 
                                          
            const keys = Object.keys(groupedItems);

            for( let $i=0; $i<keys.length; $i++){
             
            if(keys[$i] === "Common Good"){
                $offer.text("Free shipping on orders above $300.00 from this Brand")   
             }

            else{
             $offer.text("");
            }
              
            } 
         })

           let newText = newContainer.append(groupedItems[brand].lineItems)
           
           let totals= $('<h5 class="totaltext"></h5>');
          // let shipping= $('<h5 class="shippingtext"></h5>');
             let gst= $('<h5 class="totaltext"></h5>');
             //let totalAmount= $('<h5 class="totaltext"></h5>');

             let showprice = $('<span class="totalprice"></span>');
             let showgstprice= $('<span class="totalprice"></span>');
           //  let totalAmountprice= $('<span class="totalprice"></span>');

             let border= $('<div class="line"></div>');

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
         } 

         $('.cart').replaceWith(newContainer);
         
////////////////////////  
}

    cartUpdate($target) {
        const itemId = $target.data('cartItemid');
        this.$activeCartItemId = itemId;
        this.$activeCartItemBtnAction = $target.data('action');

        const $el = $(`#qty-${itemId}`);
        const oldQty = parseInt($el.val(), 10);
        const maxQty = parseInt($el.data('quantityMax'), 10);
        const minQty = parseInt($el.data('quantityMin'), 10);
        const minError = $el.data('quantityMinError');
        const maxError = $el.data('quantityMaxError');
        const newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;
        // Does not quality for min/max quantity
        if (newQty < minQty) {
            return showAlertModal(minError);
        } else if (maxQty > 0 && newQty > maxQty) {
            return showAlertModal(maxError);
        }

        this.$overlay.show();

        utils.api.cart.itemUpdate(itemId, newQty, (err, response) => {
            showPopup();
            this.$overlay.hide();
            if (response.data.status === 'succeed') {
                // if the quantity is changed "1" from "0", we have to remove the row.
                const remove = (newQty === 0);
                this.refreshContent(remove);
            } else {
                $el.val(oldQty);
                showAlertModal(response.data.errors.join('\n'));
            }            
        });
        
    }

    cartUpdateQtyTextChange($target, preVal = null) {
        const itemId = $target.data('cartItemid');
        const $el = $(`#qty-${itemId}`);
        const maxQty = parseInt($el.data('quantityMax'), 10);
        const minQty = parseInt($el.data('quantityMin'), 10);
        const oldQty = preVal !== null ? preVal : minQty;
        const minError = $el.data('quantityMinError');
        const maxError = $el.data('quantityMaxError');
        const newQty = parseInt(Number($el.val()), 10);
        let invalidEntry;

        // Does not quality for min/max quantity
        if (!Number.isInteger(newQty)) {
            invalidEntry = $el.val();
            $el.val(oldQty);
            return showAlertModal(this.context.invalidEntryMessage.replace('[ENTRY]', invalidEntry));
        } else if (newQty < minQty) {
            $el.val(oldQty);
            return showAlertModal(minError);
        } else if (maxQty > 0 && newQty > maxQty) {
            $el.val(oldQty);
            return showAlertModal(maxError);
        }

        this.$overlay.show();
        utils.api.cart.itemUpdate(itemId, newQty, (err, response) => {
            this.$overlay.hide();

            if (response.data.status === 'succeed') {
                // if the quantity is changed "1" from "0", we have to remove the row.
                const remove = (newQty === 0);

                this.refreshContent(remove);
            } else {
                $el.val(oldQty);

                return showAlertModal(response.data.errors.join('\n'));
            }
        });
    }

    cartRemoveItem(itemId) {
        this.$overlay.show();
        utils.api.cart.itemRemove(itemId, (err, response) => {
            if (response.data.status === 'succeed') {
                this.refreshContent(true);
            } else {
                this.$overlay.hide();
                showAlertModal(response.data.errors.join('\n'));
            }
        });
    }
    
    cartEditOptions(itemId, productId) {
        const context = { productForChangeId: productId, ...this.context };
        const modal = defaultModal();

        if (this.$modal === null) {
            this.$modal = $('#modal');
        }

        const options = {
            template: 'cart/modals/configure-product',
        };

        modal.open();
        this.$modal.find('.modal-content').addClass('hide-content');

        utils.api.productAttributes.configureInCart(itemId, options, (err, response) => {
            modal.updateContent(response.content);
            const optionChangeHandler = () => {
                const $productOptionsContainer = $('[data-product-attributes-wrapper]', this.$modal);
                const modalBodyReservedHeight = $productOptionsContainer.outerHeight();

                if ($productOptionsContainer.length && modalBodyReservedHeight) {
                    $productOptionsContainer.css('height', modalBodyReservedHeight);
                }
            };

            if (this.$modal.hasClass('open')) {
                optionChangeHandler();
            } else {
                this.$modal.one(ModalEvents.opened, optionChangeHandler);
            }

            this.productDetails = new CartItemDetails(this.$modal, context);

            this.bindGiftWrappingForm();
        });

        utils.hooks.on('product-option-change', (event, currentTarget) => {
            const $form = $(currentTarget).find('form');
            const $submit = $('input.button', $form);
            const $messageBox = $('.alertMessageBox');

            utils.api.productAttributes.optionChange(productId, $form.serialize(), (err, result) => {
                const data = result.data || {};

                if (err) {
                    showAlertModal(err);
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
    }

    refreshContent(remove) {
        const $cartItemsRows = $('[data-item-row]', this.$cartContent);
        const $cartPageTitle = $('[data-cart-page-title]');
        const options = {
            template: {
                content: 'cart/content',
                totals: 'cart/totals',
                pageTitle: 'cart/page-title',
                statusMessages: 'cart/status-messages',
                additionalCheckoutButtons: 'cart/additional-checkout-buttons',
            },
        };

        this.$overlay.show();

        // Remove last item from cart? Reload
        if (remove && $cartItemsRows.length === 1) {
            return window.location.reload();
        }

        utils.api.cart.getContent(options, (err, response) => {
            this.$cartContent.html(response.content);
            this.$cartTotals.html(response.totals);
            this.$cartMessages.html(response.statusMessages);
            this.$cartAdditionalCheckoutBtns.html(response.additionalCheckoutButtons);

            $cartPageTitle.replaceWith(response.pageTitle);
            this.bindEvents();
            this.$overlay.hide();

            const quantity = $('[data-cart-quantity]', this.$cartContent).data('cartQuantity') || 0;

            $('body').trigger('cart-quantity-update', quantity);

            //this.showpopup();

            $(`[data-cart-itemid='${this.$activeCartItemId}']`, this.$cartContent)
                .filter(`[data-action='${this.$activeCartItemBtnAction}']`)
                .trigger('focus');

        });
    }

    bindCartEvents() {
        const debounceTimeout = 400;
        const cartUpdate = bind(debounce(this.cartUpdate, debounceTimeout), this);
        const cartUpdateQtyTextChange = bind(debounce(this.cartUpdateQtyTextChange, debounceTimeout), this);
        const cartRemoveItem = bind(debounce(this.cartRemoveItem, debounceTimeout), this);
        let preVal;

        // cart update
        $('[data-cart-update]', this.$cartContent).on('click', event => {
            const $target = $(event.currentTarget);

            event.preventDefault();

            // update cart quantity
            cartUpdate($target);
        });

        // cart qty manually updates
        $('.cart-item-qty-input', this.$cartContent).on('focus', function onQtyFocus() {
            preVal = this.value;
        }).change(event => {
            const $target = $(event.currentTarget);
            event.preventDefault();

            // update cart quantity
            cartUpdateQtyTextChange($target, preVal);
        });

        $('.cart-remove', this.$cartContent).on('click', event => {
            const itemId = $(event.currentTarget).data('cartItemid');
            const string = $(event.currentTarget).data('confirmDelete');
            showAlertModal(string, {
                icon: 'warning',
                showCancelButton: true,
                onConfirm: () => {
                    // remove item from cart
                    cartRemoveItem(itemId);
                },
            });
            event.preventDefault();
        });

        $('[data-item-edit]', this.$cartContent).on('click', event => {
            const itemId = $(event.currentTarget).data('itemEdit');
            const productId = $(event.currentTarget).data('productId');
            event.preventDefault();
            // edit item in cart
            this.cartEditOptions(itemId, productId);
        });
    }

    bindPromoCodeEvents() {
        const $couponContainer = $('.coupon-code');
        const $couponForm = $('.coupon-form');
        const $codeInput = $('[name="couponcode"]', $couponForm);

        $('.coupon-code-add').on('click', event => {
            event.preventDefault();

            $(event.currentTarget).hide();
            $couponContainer.show();
            $('.coupon-code-cancel').show();
            $codeInput.trigger('focus');
        });

        $('.coupon-code-cancel').on('click', event => {
            event.preventDefault();

            $couponContainer.hide();
            $('.coupon-code-cancel').hide();
            $('.coupon-code-add').show();
        });

        $couponForm.on('submit', event => {
            const code = $codeInput.val();

            event.preventDefault();

            // Empty code
            if (!code) {
                return showAlertModal($codeInput.data('error'));
            }

            utils.api.cart.applyCode(code, (err, response) => {
                if (response.data.status === 'success') {
                    this.refreshContent();
                } else {
                    showAlertModal(response.data.errors.join('\n'));
                }
            });
        });
    }

    bindGiftCertificateEvents() {
        const $certContainer = $('.gift-certificate-code');
        const $certForm = $('.cart-gift-certificate-form');
        const $certInput = $('[name="certcode"]', $certForm);

        $('.gift-certificate-add').on('click', event => {
            event.preventDefault();
            $(event.currentTarget).toggle();
            $certContainer.toggle();
            $('.gift-certificate-cancel').toggle();
        });

        $('.gift-certificate-cancel').on('click', event => {
            event.preventDefault();
            $certContainer.toggle();
            $('.gift-certificate-add').toggle();
            $('.gift-certificate-cancel').toggle();
        });

        $certForm.on('submit', event => {
            const code = $certInput.val();

            event.preventDefault();

            if (!checkIsGiftCertValid(code)) {
                const validationDictionary = createTranslationDictionary(this.context);
                return showAlertModal(validationDictionary.invalid_gift_certificate);
            }

            utils.api.cart.applyGiftCertificate(code, (err, resp) => {
                if (resp.data.status === 'success') {
                    this.refreshContent();
                } else {
                    showAlertModal(resp.data.errors.join('\n'));
                }
            });
        });
    }

    bindGiftWrappingEvents() {
        const modal = defaultModal();

        $('[data-item-giftwrap]').on('click', event => {
            const itemId = $(event.currentTarget).data('itemGiftwrap');
            const options = {
                template: 'cart/modals/gift-wrapping-form',
            };

            event.preventDefault();

            modal.open();

            utils.api.cart.getItemGiftWrappingOptions(itemId, options, (err, response) => {
                modal.updateContent(response.content);

                this.bindGiftWrappingForm();
            });
        });
    }

    bindGiftWrappingForm() {
        $('.giftWrapping-select').on('change', event => {
            const $select = $(event.currentTarget);
            const id = $select.val();
            const index = $select.data('index');

            if (!id) {
                return;
            }

            const allowMessage = $select.find(`option[value=${id}]`).data('allowMessage');

            $(`.giftWrapping-image-${index}`).hide();
            $(`#giftWrapping-image-${index}-${id}`).show();

            if (allowMessage) {
                $(`#giftWrapping-message-${index}`).show();
            } else {
                $(`#giftWrapping-message-${index}`).hide();
            }
        });

        $('.giftWrapping-select').trigger('change');

        function toggleViews() {
            const value = $('input:radio[name ="giftwraptype"]:checked').val();
            const $singleForm = $('.giftWrapping-single');
            const $multiForm = $('.giftWrapping-multiple');

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
    }

    bindEvents() {
        this.bindCartEvents();
        this.bindPromoCodeEvents();
        this.bindGiftWrappingEvents();
        this.bindGiftCertificateEvents();

        // initiate shipping estimator module
        const shippingErrorMessages = {
            country: this.context.shippingCountryErrorMessage,
            province: this.context.shippingProvinceErrorMessage,
        };
        this.shippingEstimator = new ShippingEstimator($('[data-shipping-estimator]'), shippingErrorMessages);
    }
}

 function showPopup(){

    let $items= $(".cart-item"); 
    let brArr = [];
    $items.each(function(index,item){
        let brand= $(this).data('brand');  //getting all brands
        brArr.push(brand);   
       });

    const $ofs = brArr.filter(name => name === "OFS");

     if( $ofs.length >= 2 ){
        let $message= "You Are Elgible For Free Shipping For OFS"
       showShippingModal("</h2>"+$message+"</h2>");  
       }

  }