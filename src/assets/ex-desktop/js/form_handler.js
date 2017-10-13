(function($) {
    'use strict';
    var errorClass = 'has-error';
    var validClass = 'no-error';
    var ucZipValid = false;
    var reprocessed = false;
    var threeRetries = 0;
    var cardPatternFull = {
        'visa': /^4[0-9]{12}(?:[0-9]{3})?$/,
        'master': /^5[1-5][0-9]{14}$/,
        'maestro': /^(5018|5020|5038|5612|5893|6304|6390|6759|676[1-3]|0604)/,
        'amex': /^3[47][0-9]{13}$/,
        'discover': /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        'jcb': /^(?:2131|1800|35\d{3})\d{11}$/,
        'diners': /^(54|55)/,
        'solo': /^(6334|6767)/,
        'laser': /^(6304|670[69]|6771)/
    };
    var cardPatternStarting = {
        'visa': /^4[0-9]/,
        'master': /^5[1-5]/,
        'maestro': /^(5018|5020|5038|5612|5893|6304|6390|6759|676[1-3]|0604)/,
        'amex': /^3[47]/,
        'discover': /^6(?:011|5[0-9]{2})/,
        'jcb': /^(?:21|180|35)/,
        'diners': /^(54|55)/,
        'solo': /^(6334|6767)/,
        'laser': /^(6304|670[69]|6771)/
    };
    var formActions = {
        'prospect': 'new_prospect',
        'checkout': 'new_order_prospect',
        'downsell1': 'downsell1',
        'downsell2': 'downsell2',
        'upsell': 'upsell'
    };
    $.fn.formHandler = function(options) {
        var errors = [];
        var _self;
        /**
         * -------------------------------------------------------------
         * Check the existence of the element before binding any events
         * on its childrens.
         * -------------------------------------------------------------
         */
        if (!this.length) {
            return false;
        }
        /**
         * ------------------------------------------------
         * The error modal is set to true by default.
         * ------------------------------------------------
         */
        var defaults = {
            errorModal: true,
            autoFillFormElement: false,
            countryDropdown: 'Select Country',
            ajaxLoader: {
                div: '',
                timeInOut: 500
            },
            responseLoader: {
                div: '',
                timeInOut: 500
            }
        };
        options = $.extend({}, defaults, options);
        /**
         * Make _self usable throughout.
         */
        _self = $(this);
        checkCCMasked();
        if (app_config.crm_type == 'ultracart') {
            if (options.type != 'checkout') {
                ultraCartInit();
            }
            _self.find('input[name=shippingZip]').on('blur', function(e) {
                var tempCountry = _self.find('select[name=shippingCountry]').val();
                if (tempCountry == 'US' || tempCountry == 'CA') {
                    $('#zip-validate').show();
                    $.get('ajax.php?method=city_state&zip=' + $(this).val(), function(data) {
                        $('#zip-validate').hide();
                        if (data.response.validZip) {
                            _self.find('input[name=shippingCity]').val(data.response.city);
                            _self.find('select[name=shippingState]').val(data.response.state);
                        } else {
                            _self.find('input[name=shippingZip]').addClass(errorClass);
                        }
                    });
                }
            });
        }

        /**
         * ------------------------------------
         * Chrome Autofill issue PATCH
         * ------------------------------------
         */
        
        _self
            .find('input[name=shippingState]')
            .change(function(e) {
                $('body').data({
                    chromeAutofilled: $(this).val()
                });

                getStates('shippingState', 'shippingCountry');
            });

        if (options.autoFillFormElement) {
            var _copyToForm = $('form[name=' + options.autoFillFormElement + ']');
            _self.find('input[type=text]').on('keyup', function() {
                var elem = $(this).attr('name');
                _copyToForm.find('input[name=' + elem + ']').val($(this).val());
            });
            _self.find('textarea').on('keyup', function() {
                var elem = $(this).attr('name');
                _copyToForm.find('textarea[name=' + elem + ']').val($(this).val());
            });
        }
        _self.submit(function(_event) {
            _event.preventDefault();
            _self.find('input[name=creditCardNumber]').keyup();
            _self.find('input.required, select.required, textarea.required').each(function() {
                validate($(this), true);
            });
            if (options.type !== 'undefined' && options.type != 'checkout' && options.type != 'upsell') {
                isValidPin('shippingCountry', 'shippingZip');
            }
            if (options.type !== 'undefined' && options.type != 'prospect' && options.type != 'upsell') {
                if (_self.find('input[name=billingSameAsShipping]:checked').val() == 'no') {
                    isValidPin('billingCountry', 'billingZip');
                }
                //isValidCard();
                hasCardExpired();
            }
            if (_self.find('.agree-checkbox').length) {
                console.log('123');
                if (!_self.find('.agree-checkbox').prop('checked')) {
                    if (typeof _self.find('.agree-checkbox').data('error-message') !== 'undefined') {
                        errors.push(_self.find('.agree-checkbox').data('error-message'));
                    } else {
                        errors.push(app_lang.not_checked);
                    }
                }
            }
            if (_self.find('select[name=shippingCountry]').val() == 'CA' && !isValidCaZip($('input[name=shippingZip]').val())) {
                errors.push(app_lang.ca_zip_invalid);
            }

            if (! handleTrialOffer()) {
                errors.push('Your credit card is about to expire, please update your card information.');
            }

            if (!errors.length && options.type in formActions) {
                if (_self.find('input[name=user_is_at]').length) {
                    _self.find('input[name=user_is_at]').remove();
                }
                _self.append('<input type="hidden" name="user_is_at" value="' + location.href + '" />');
                if (app_config.crm_type == 'ultracart' && options.type == 'prospect' && ucZipValid == false) {
                    ucValidateZip();
                    return;
                }
                if (_self.find('input[name=email]').data('mxcheck') && typeof app_config.mailgun_api_key !== 'undefined' && app_config.mailgun_api_key.length) {
                    checkEmailMx('submit');
                } else {
                    if (app_config.enable_smarty_address_validation && _self.find('select[name=shippingCountry]').val() == 'US') {
                        $.post('ajax.php?smarty_api=1', _self.serialize(), function(response) {
                            var res = $.parseJSON(response);
                            console.log(res);
                            if (res.length) {
                                _self.find('input[name=shippingZip]').val(res[0].components.zipcode);
                                submitForm();
                            } else {
                                _self.find('input[name=shippingCity]').addClass(errorClass).removeClass(validClass);
                                _self.find('input[name=shippingAddress1]').addClass(errorClass).removeClass(validClass);
                                _self.find('select[name=shippingState]').addClass(errorClass).removeClass(validClass);
                                _self.find('input[name=shippingZip]').addClass(errorClass).removeClass(validClass);
                            }
                        });
                    } else {
                        submitForm();
                    }
                }
            } else {
                if (typeof options.errorModal !== 'undefined' && options.errorModal) {
                    var err, parent;
                    if (app_config.show_validation_errors == 'inline') {
                        $('span.' + app_config.inline_error_class).remove();
                        $.each(errors, function(k, v) {
                            $('input[data-error-message=' + v + ']').length
                            if ($('input[data-error-message=' + v + ']').length) {
                                err = $('input[data-error-message=' + v + ']');
                                parent = err.closest('p, div');
                                $('<span />').addClass(app_config.inline_error_class).text(v).appendTo(parent);
                            }
                        });
                    } else if (app_config.show_validation_errors == 'modal') {
                        error_handler(errors);
                    } else if (app_config.show_validation_errors == 'hide') {
                        //
                    } else {
                        //
                    }
                    errors = [];
                }
            }
        });
        _self.find('input.required[type=text], select, textarea').blur(function(e) {
            validate($(this));
        });
        /*_self.find('input[name=email]').on('focusout', function (e) {
            checkEmailMx();
        });*/
        if (options.type !== 'undefined' && options.type != 'checkout') {
            getCountries('shippingCountry');
            _self.find('select[name=shippingCountry]').change(function() {
                if ($(this).data('oldValue') == $(this).val())
                {
                    return;
                }

                $(this).data({
                    oldValue: $(this).val()
                });
                
                getStates('shippingState', 'shippingCountry');
            });
        }
        if (options.type !== 'undefined' && options.type != 'prospect') {
            _self.find('input[name=creditCardNumber]').keyup(guessCardType);
            _self.find('select[name=creditCardType]').change(function(e) {
                /**
                 * Handle validation differently if user selects PayPal
                 */
                var fields = ['creditCardNumber', 'expmonth', 'expyear', 'CVV'];
                var cardType = $(this).val();
                $.each(fields, function(index, el) {
                    if (cardType == 'paypal') {
                        console.log(el);
                        $('[name=' + el + ']').removeClass('required').closest('p, div').hide();
                    } else {
                        $('[name=' + el + ']').addClass('required').closest('p, div').show();
                    }
                });
                var _length;
                switch ($(this).val()) {
                    case 'visa':
                        _length = 16;
                        break;
                    case 'master':
                        _length = 16;
                        break;
                    case 'amex':
                        _length = 15;
                        break;
                    default:
                        _length = 16;
                }
                setCCMaxLength(_length);
            });
            _self.find('input[name=billingSameAsShipping]').change(function(e) {
                if ($(this).val() == 'no') {
                    $('.billing-info').show();
                    getCountries('billingCountry');
                    _self.find('select[name=billingCountry]').change(function() {
                        getStates('billingState', 'billingCountry');
                    });
                    $('.billing-info input,.billing-info select').addClass('required');
                } else {
                    $('.billing-info input,.billing-info select').removeClass('required');
                    $('.billing-info input,.billing-info select').removeClass(errorClass);
                    $('.billing-info').hide();
                }
            });
        }

        function submitForm() {
            var actionType = formActions[options.type];
            if ($('input[name=altered_action]').length) {
                actionType = $('input[name=altered_action]').val();
            }

            /**
             * ------------------------
             * Send Test Flag to server
             * ------------------------
             */
            
            var testFlag = location.search.match('test_flag') ? '&test_flag=on' : '';
            
            $.ajax({
                url: 'ajax.php?method=' + actionType,
                method: 'post',
                data: _self.serialize() + testFlag,
                beforeSend: function() {
                    /**
                     * Reset response element if exists.
                     */
                    if ($(options.responseLoader.div).length) {
                        $(options.responseLoader.div).fadeOut(options.responseLoader.timeInOut).html('');
                    }
                    if ($(options.ajaxLoader.div).length) {
                        $(options.ajaxLoader.div).fadeIn(options.ajaxLoader.timeInOut);
                    } else {
                        if (!$('#loaderImage').length) {
                            $('body').append('<div id="loaderImage" />');
                        }
                        new imageLoader(cImageSrc, 'startAnimation()');
                    }
                    _self.find('[type=submit]').attr('disabled', 'disabled');
                },
                success: function(_data) {
                    var data = $.parseJSON(_data);
                    if (typeof data == 'object' && typeof data.context !== 'undefined' && data.context.errorFound == 0 && data.redirect && data.context.responseCode == 100) {
                        _exit = true;
                        if (typeof options.onSuccess === 'function') {
                            options.onSuccess(data);
                        } else {
                            history.pushState({}, null, data.redirect);
                            window.location.assign(data.redirect);
                        }
                    } else if (typeof data == 'object' && typeof data.context !== 'undefined' && data.context.errorFound == 0 && data.context.responseCode == 101) {
                        $.get('ajax.php?3d_redirect=1&order_id=' + data.context.orderId, function(data) {
                            var newDoc = document.open("text/html", "replace");
                            newDoc.write(data);
                            newDoc.close();
                        });
                    } else {
                        if (typeof options.onError === 'function') {
                            options.onError(data);
                        } else {
                            try {
                                if ($(options.responseLoader.div).length) {
                                    $(options.responseLoader.div).html(data.context.errorMessage).fadeIn(options.responseLoader.timeInOut);
                                } else {
                                    if (data.context.responseCode == 800 && $('#cc-overlay-tpl').length) {
                                        var tpl = $('#cc-overlay-tpl').html();
                                        $('.process_overlay_decline').remove();
                                        $('body').append(tpl);
                                        $('.process_overlay_decline').find('[data-selected]').each(function(index, el) {
                                            $(this).val($(this).attr('data-selected'));
                                        });
                                        $('#cc-declined-error').text('ERROR: ' + data.context.errorMessage);
                                        //return false;
                                    } else if (data.prepaid_redirect) {
                                        _exit = true;
                                        window.location.href = data.prepaid_redirect;
                                    } else if(
                                        data.context.responseCode == 800
                                        &&
                                        data.context.errorMessage.match('three_d_redirect_url')
                                        &&
                                        app_config.reprocess_3ds
                                        &&
                                        reprocessed == false
                                        ) {
                                        threeRetries++;
                                        if (threeRetries == app_config.threed_retries)
                                        {
                                            reprocessed = true;
                                        }
                                        submitForm();
                                    }else {
                                        error_handler(typeof data.context.errorMessage == 'string' ? [data.context.errorMessage] : data.context.errorMessage);
                                    }
                                }
                            } catch (err) {
                                error_handler([app_lang.common_error]);
                            }
                        }
                        
                        if ($(options.ajaxLoader.div).length) {
                            $(options.ajaxLoader.div).fadeOut(options.ajaxLoader.timeInOut);
                        } else {
                            $('body').find('#loaderImage').remove();
                        }
                        _self.find('[type=submit]').removeAttr('disabled');
                    }
                },
                complete: function() {
                }
            });
        }

        function ultraCartInit() {
            $.get('ajax.php?method=cart_init');
            return true;
        }

        function ucValidateZip() {
            $('#zip-validate').show();
            $.ajax({
                url: 'ajax.php',
                data: {
                    method: 'city_state',
                    zip: _self.find('input[name=shippingZip]').val()
                },
                success: function(data) {
                    if (!data.response.validZip) {
                        ucZipValid = false;
                        _self.find('input[name=shippingZip]').addClass(errorClass);
                        error_handler([_self.find('input[name=shippingZip]').data('error-message')]);
                        return false;
                    } else {
                        _self.find('input[name=shippingCity]').val(data.response.city);
                        _self.find('select[name=shippingState]').val(data.response.state);
                        ucZipValid = true;
                        _self.find('input[type=submit]').submit();
                    }
                },
                complete: function() {
                    $('#zip-validate').hide();
                }
            });
        }

        function checkCCMasked() {
            var ccField = _self.find('input[name=creditCardNumber]');
            if (ccField.length && ccField.hasClass('masked') && $.fn.payment) {
                if (ccField.hasClass('masked-dotted-dashed')) {
                    ccField.payment('formatCardNumber', '-');
                    ccField.attr('placeholder', '••••-••••-••••-••••');
                } else if (ccField.hasClass('masked-lined-dashed')) {
                    ccField.payment('formatCardNumber', '-');
                    ccField.attr('placeholder', '____-____-____-____');
                } else if (ccField.hasClass('masked-lined')) {
                    ccField.payment('formatCardNumber');
                    ccField.attr('placeholder', '____ ____ ____ ____');
                } else {
                    ccField.payment('formatCardNumber');
                    ccField.attr('placeholder', '•••• •••• •••• ••••');
                }
                setCCMaxLength(ccField.attr('maxlength'));
            }
        }

        function setCCMaxLength(length) {
            var ccField = _self.find('input[name=creditCardNumber]');
            if (ccField.length && ccField.hasClass('masked') && $.fn.payment) {
                ccField.attr('maxlength', parseInt(length) + 3);
            } else {
                ccField.attr('maxlength', parseInt(length));
            }
        }

        function getCCNumber() {
            var ccField = _self.find('input[name=creditCardNumber]');
            if (ccField.hasClass('masked') && $.fn.payment) {
                var ccFieldVal = ccField.val().toString().replace(/ /g, '');
                return ccFieldVal.toString().replace(/-/g, '');
            } else {
                return ccField.val();
            }
        }

        function hasCardExpired() {
            var date = new Date();
            var year = date.getFullYear().toString().substr(2, 2);
            var month = date.getMonth() + 1;
            if (_self.find('select[name=expmonth]').val().length && _self.find('select[name=expmonth]').val() < month && _self.find('select[name=expyear]').val().length && _self.find('select[name=expyear]').val() <= year) {
                errors.push(app_lang.card_expired);
                _self.find('input[name=creditCardNumber]').addClass(errorClass);
            }
        }

        function guessCardType() {
            var ccNumber = getCCNumber();
            $('select[name=creditCardType]').find('option').each(function() {
                if (validateCCOnType($(this).val(), ccNumber)) {
                    _self.find('select[name=creditCardType]').val($(this).val()).trigger('change').removeClass(errorClass).addClass(validClass);
                    return false;
                } else {
                    if (_self.find('select[name=creditCardType]').data('deselect') != false) {
                        _self.find('select[name=creditCardType]').val('').trigger('change').addClass(errorClass).removeClass(validClass);
                    }
                }
            });
        }

        function isValidCard() {
            var type = _self.find('select[name=creditCardType]').val();
            var cc = _self.find('input[name=creditCardNumber]');
            var number = getCCNumber();
            if (typeof app_config.allowed_tc !== 'undefined' && app_config.allowed_tc.length) {
                var testCard = false;
                $(app_config.allowed_tc).each(function(k, v) {
                    var card = v.toString().split('|');
                    if (number == card[0]) {
                        testCard = true;
                        return true;
                    }
                });
                if (testCard) {
                    return true;
                }
            }
            if (type.toString().length && number.toString().length && !validateCC(type, number)) {
                errors.push('Invalid ' + type.toUpperCase() + ' Card!');
                cc.addClass(errorClass);
            }
        }

        function validateCC(type, number) {
            if (typeof app_config.allowed_tc !== 'undefined' && app_config.allowed_tc.length) {
                var matchType = false;
                $(app_config.allowed_tc).each(function(k, v) {
                    var card = v.toString().split('|');
                    if (type == card[1] && number == card[0]) {
                        matchType = true;
                        return true;
                    }
                });
                if (matchType) {
                    return true;
                }
            }
            switch (type) {
                case 'visa':
                    return cardPatternFull.visa.test(number);
                case 'master':
                    return cardPatternFull.master.test(number);
                case 'maestro':
                    return cardPatternFull.maestro.test(number);
                case 'amex':
                    return cardPatternFull.amex.test(number);
                case 'discover':
                    return cardPatternFull.discover.test(number);
                case 'jcb':
                    return cardPatternFull.jcb.test(number);
                case 'solo':
                    return cardPatternFull.solo.test(number);
                case 'laser':
                    return cardPatternFull.laser.test(number);
                case 'offline':
                    return checkOfflinePaymentCard(number);
            }
        }

        function checkOfflinePaymentCard(number) {
            var passed = false;
            // for visa match
            if (!passed && cardPatternFull.visa.test(number)) {
                passed = true;
            }
            // for master card match
            if (!passed && cardPatternFull.master.test(number)) {
                passed = true;
            }
            // for maestro card match
            if (!passed && cardPatternFull.maestro.test(number)) {
                passed = true;
            }
            // for amex match
            if (!passed && cardPatternFull.amex.test(number)) {
                passed = true;
            }
            // for discover match
            if (!passed && cardPatternFull.discover.test(number)) {
                passed = true;
            }
            // for jcb match
            if (!passed && cardPatternFull.jcb.test(number)) {
                passed = true;
            }
            // for solo match
            if (!passed && cardPatternFull.solo.test(number)) {
                passed = true;
            }
            // for laser match
            if (!passed && cardPatternFull.laser.test(number)) {
                passed = true;
            }
            return passed;
        }

        function validateCCOnType(type, number) {
            if (typeof app_config.allowed_tc !== 'undefined' && app_config.allowed_tc.length) {
                var matchType = false;
                $(app_config.allowed_tc).each(function(k, v) {
                    var card = v.toString().split('|');
                    if (type == card[1] && number == card[0]) {
                        matchType = true;
                        return true;
                    }
                });
                if (matchType) {
                    return true;
                }
            }
            switch (type) {
                case 'visa':
                    return cardPatternStarting.visa.test(number);
                case 'master':
                    return cardPatternStarting.master.test(number);
                case 'maestro':
                    return cardPatternStarting.maestro.test(number);
                case 'amex':
                    return cardPatternStarting.amex.test(number);
                case 'discover':
                    return cardPatternStarting.discover.test(number);
                case 'jcb':
                    return cardPatternStarting.jcb.test(number);
                case 'solo':
                    return cardPatternStarting.solo.test(number);
                case 'laser':
                    return cardPatternStarting.laser.test(number);
                case 'offline':
                    return checkOfflinePaymentCard(number);
            }
        }

        function isValidPin(country, zip) {
            var valid = true;
            var country = _self.find('select[name=' + country + ']');
            var zip = _self.find('input[name=' + zip + ']');
            var zipcode = zip.val();
            if (!zipcode.length) {
                return valid;
            }
            switch (country.val()) {
                case 'US':
                    valid = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode);
                    break;
                    /*case 'GB':
                     valid = /(GIR 0AA)|((([A-Z-[QVX]][0-9][0-9]?)|(([A-Z-[QVX]][A-Z-[IJZ]][0-9][0-9]?)|(([A-Z-[QVX]][0-9][A-HJKSTUW])|([A-Z-[QVX]][A-Z-[IJZ]][0-9][ABEHMNPRVWXY])))) [0-9][A-Z-[CIKMOV]]{2})/.test(zipcode);
                     break;*/
                default:
                    valid = /^[a-zA-Z0-9-\s]+$/.test(zipcode);
            }
            if (valid) {
                zip.removeClass(errorClass).addClass(validClass);
                return true;
            } else {
                errors.push(app_lang.pin_invalid);
                zip.addClass(errorClass).removeClass(validClass);
                return false;
            }
        }

        function isValidForm() {
            var required = ['firstName', 'lastName', 'shippingAddress1', 'shippingCountry', 'shippingState', 'shippingCity', 'shippingZip', 'phone', 'email'];
            $(required).each(function(key, value) {
                if (typeof _self.find('[name=' + value + ']').attr('name') === 'undefined') {
                    return false;
                }
            });
            return true;
        }

        function validate(self, pushError) {
            if (!self.val().length || !isValid(self)) {
                var label = typeof self.data('error-message') !== 'undefined' ? self.data('error-message') : self.attr('name').toUpperCase() + ' is empty or invalid.';
                if (pushError) {
                    errors.push(label);
                }
                self.addClass(errorClass).removeClass(validClass);
            } else {
                self.removeClass(errorClass).addClass(validClass);
            }
        }

        function isValid(type) {
            if (typeof type.data('validate') === 'undefined') {
                return true;
            }
            var input = type.val();
            var passed = false;
            switch (type.data('validate')) {
                case 'email':
                    passed = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(input);
                    break;
                case 'number':
                    passed = /^\+?\d+(?:-\d+)*$/.test(input);
                    break;
                case 'cvv':
                    passed = /^[0-9]{3,4}$/.test(input);
                    break;
                case 'phone':
                    passed = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i.test(input);
                    break;
                default:
                    passed = true;
            }
            if (typeof type.data('min-length') !== 'undefined' && type.data('min-length') !== false && passed) {
                passed = $.trim(input).toString().length >= type.data('min-length');
            }
            if (typeof type.data('max-length') !== 'undefined' && type.data('max-length') !== false && passed) {
                passed = $.trim(input).toString().length <= type.data('max-length');
            }
            return passed;
        }

        function getCountries(country, state) {
            var element = _self.find('select[name=' + country + ']');
            var selected = element.data('selected');
            $.ajax({
                url: app_config.offer_path + 'assets/storage/country_states.json',
                dataType: 'json',
                global: false,
                success: function(json) {
                    var select = '';
                    var no_of_countries = 0;
                    $.each(app_config.allowed_country_codes, function(key, value) {
                        console.log(value);
                        $.each(json, function(key1, value1) {
                            if (value == value1.FIELD2) {
                                no_of_countries++;
                                select += '<option value="' + value1.FIELD2 + '" data-cid="">' + value1.FIELD1 + '</option>';
                            }
                        });
                    });
                    if (no_of_countries != 1) {
                        select = '<option value="">' + options.countryDropdown + '</option>' + select;
                    }
                    element.html(select).trigger('change');
                    if (typeof selected !== 'undefined' && selected.length) {
                        element.val(selected).trigger('change');
                    }
                }
            });
        }

        function getStates(state, country) {
            var element = _self.find('input[name=' + state + ']');
            var selected = element.data('selected');
            var chromeAutofilled = $('body').data('chromeAutofilled') ? $('body').data('chromeAutofilled') : '';
            var parent = _self.find('select[name=' + country + ']');
            var select = '';
            if (parent.val() == 'CA' && !app_config.device_is_mobile && app_config.enable_ca_statecode_validation) {
                _self.find('input[name=shippingZip]').mask(app_config.ca_state_code_mask);
            } else if (parent.val() == 'US') {
                _self.find('input[name=shippingZip]').mask('00000-0000');
            } else if (parent.val() == 'CA' && app_config.device_is_mobile && app_config.enable_ca_statecode_validation && app_config.ca_state_code_mask.match(/\s/)) {
                _self.find('input[name=shippingZip]').keyup(function(e){
                    console.log(parent.val());
                    if (parent.val() != 'CA') {
                        return;
                    }

                    var v = $(this).val();
                    if (e.which != 8 && v.length > 2 && v.length < 4) {
                        $(this).val(v + ' ');
                    }
                });
            } else {
                _self.find('input[name=shippingZip]').unmask();
            }
            /**
             * Phone number masking update
             */
            if (app_config.enable_phone_masking && $('input[name=phone]').length && $('select[name=shippingCountry]').val() == 'US' && $.fn.mask) {
                $('input[name=phone]').mask('(000) 000-0000');
            } else {
                $('input[name=phone]').unmask();
            }
            if (app_config.country_lang_mapping.hasOwnProperty(parent.val())) {
                _self.find('select[name=shippingState], input[name=shippingState]').closest('p, div').find('label').text(app_config.country_lang_mapping[parent.val()].state);
                _self.find('input[name=shippingZip]').closest('p, div').find('label').text(app_config.country_lang_mapping[parent.val()].zip);
            } else {
                _self.find('select[name=shippingState], input[name=shippingState]').closest('p, div').find('label').text('State: ');
                _self.find('input[name=shippingZip]').closest('p, div').find('label').text('Zip: ');
            }
            $.ajax({
                url: app_config.offer_path + 'assets/storage/country_states.json',
                dataType: 'json',
                global: false,
                success: function(json) {
                    var cid = $(parent).val() + '-';
                    $.each(json, function(key, value) {
                        if (value.FIELD4.length && value.FIELD4.indexOf(cid) === 0) {
                            var state_code = value.FIELD4;
                            if (cid == 'US-') {
                                state_code = state_code.replace(cid, '');
                            } else if (cid == 'CA-') {
                                state_code = state_code.replace(cid, '');
                            }

                            if (value.FIELD3.toLowerCase() == chromeAutofilled.toLowerCase()) {
                                console.log('Setting selected value:' + state_code);
                                selected = state_code;
                            }

                            select += '<option value="' + state_code + '" data-cid="">' + value.FIELD3 + '</option>';
                        }
                    });
                    if (select.length) {
                        if (!_self.find('select[name=' + state + ']').length) {
                            $('<select id="fields_state" name="' + state + '" class="required" />').insertAfter(element);
                            element.remove();
                        }
                        _self.find('select[name=' + state + ']').html(select);
                        if (selected) {
                            _self.find('select[name=' + state + ']').val(selected);
                        }
                    } else {
                        _self.find('input[name=' + state + ']').removeAttr('readonly');
                    }
                }
            });
        }

        function checkEmailMx(type) {
            var elem = _self.find('input[name=email]');
            if (elem.val().length && elem.data('mxcheck') && typeof app_config.mailgun_api_key !== 'undefined' && app_config.mailgun_api_key.length) {
                $.ajax({
                    type: "GET",
                    url: 'https://api.mailgun.net/v2/address/validate?callback=?',
                    data: {
                        address: elem.val(),
                        api_key: app_config.mailgun_api_key
                    },
                    dataType: "jsonp",
                    crossDomain: true,
                    timeout: 3000,
                    beforeSend: function() {
                        mx_validation_progress();
                    },
                    success: function(data, status_text) {
                        if (data.is_valid) {
                            mx_validation_success();
                            if (typeof type !== 'undefined' && type == 'submit') {
                                submitForm();
                            }
                        } else {
                            mx_validation_error();
                        }
                    },
                    error: function(request, status_text, error) {
                        console.log(status_text);
                        console.log(error);
                        // for network failure return success, so that the sale is not wasted
                        mx_validation_success();
                        if (typeof type !== 'undefined' && type == 'submit') {
                            submitForm();
                        }
                    }
                });
            }
        }
        // while the lookup is performing
        function mx_validation_progress() {
            var elem = _self.find('input[name=email]');
            if (elem.data('mxcheck-progress-callback').length && elem.data('mxcheck-progress-callback') != 'mx_validation_progress' && typeof elem.data('mxcheck-progress-callback') == 'function') {
                return elem.data('mxcheck-progress-callback')(elem);
            }
            _self.find('[type=submit]').attr('disabled', 'disabled');
            if (elem.data('mxcheck-error-placeholder') && $(elem.data('mxcheck-error-placeholder')).length) {
                $(elem.data('mxcheck-error-placeholder')).html('').hide();
            }
            if (elem.data('mxcheck-success-placeholder') && $(elem.data('mxcheck-success-placeholder')).length) {
                $(elem.data('mxcheck-success-placeholder')).html('').hide();
            }
            if (elem.val().length && elem.data('mxcheck-progress-placeholder') && $(elem.data('mxcheck-progress-placeholder')).length) {
                $(elem.data('mxcheck-progress-placeholder')).show();
            }
        }
        // if email successfull validated
        function mx_validation_success() {
            var elem = _self.find('input[name=email]');
            if (elem.data('mxcheck-success-callback').length && elem.data('mxcheck-success-callback') != 'mx_validation_success' && typeof elem.data('mxcheck-success-callback') == 'function') {
                return elem.data('mxcheck-success-callback')(elem);
            }
            if (elem.val().length) {
                _self.find('[type=submit]').removeAttr('disabled');
                if (elem.data('mxcheck-progress-placeholder') && $(elem.data('mxcheck-progress-placeholder')).length) {
                    $(elem.data('mxcheck-progress-placeholder')).hide();
                }
                if (elem.data('mxcheck-success-placeholder') && $(elem.data('mxcheck-success-placeholder')).length) {
                    var success_message = 'Valid email id.';
                    if (elem.data('mxcheck-success-message') && elem.data('mxcheck-success-message').length) {
                        success_message = elem.data('mxcheck-success-message');
                    }
                    $(elem.data('mxcheck-success-placeholder')).html('<span style="color:green;">' + success_message + '</span>').show();
                }
                elem.removeClass(errorClass);
            }
        }
        // if email is invalid
        function mx_validation_error() {
            var elem = _self.find('input[name=email]');
            if (elem.data('mxcheck-error-callback').length && elem.data('mxcheck-error-callback') != 'mx_validation_error' && typeof elem.data('mxcheck-error-callback') == 'function') {
                return elem.data('mxcheck-error-callback')(elem);
            }
            if (elem.val().length) {
                _self.find('[type=submit]').removeAttr('disabled');
                if (elem.data('mxcheck-progress-placeholder') && $(elem.data('mxcheck-progress-placeholder')).length) {
                    $(elem.data('mxcheck-progress-placeholder')).hide();
                }
                if (elem.data('mxcheck-error-placeholder') && $(elem.data('mxcheck-error-placeholder')).length) {
                    var error_message = 'Invalid email id!';
                    if (elem.data('mxcheck-error-message') && elem.data('mxcheck-error-message').length) {
                        error_message = elem.data('mxcheck-error-message');
                    }
                    $(elem.data('mxcheck-error-placeholder')).html('<span style="color:red;">' + error_message + '</span>').show();
                }
                elem.addClass(errorClass);
            }
        }

        function isValidCaZip(str) {
            return str.match(app_config.ca_state_code_regex);
        }

        function handleTrialOffer() {
            var productPrice = parseInt(app_config.offer_details_step1.product_price);
            if (productPrice === 0) {
                var $expmonth = _self.find('select[name=expmonth]');
                var $expyear = _self.find('select[name=expyear]');
                var expiryM = parseInt($expmonth.val());
                var expiryY = parseInt($expyear.val());

                var expiry = new Date().setFullYear("20" + expiryY, expiryM-3);
                var diff = expiry - new Date();

                if (diff < 1) {
                    return false;
                }
            }

            return true;

        }

    };
})(jQuery);