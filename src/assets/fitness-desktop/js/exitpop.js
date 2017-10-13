//if (!app_config.offer_current_step)
//    app_config.offer_current_step = 1;
//if (!app_config.downsell_current_step)
//    app_config.downsell_current_step = 1;
//
//var offerDetailStep = 'offer_details_step' + app_config.offer_current_step.toString();
//var exitPopup = 'exit_popup' + app_config.downsell_current_step.toString() + '_enabled';
//var exitPopupElem = 'exit_popup' + app_config.downsell_current_step.toString() + '_element_id';
//var exitPopupText = 'exit_popup' + app_config.downsell_current_step.toString() + '_browser_alert_text';
//
//var _exit = !app_config[offerDetailStep][exitPopup];
//
//(function($) {
//    $(document).ready(function() {
//        window.onbeforeunload = function() {
//            if (!_exit && $('#' + app_config[offerDetailStep][exitPopupElem]).length) {
//                _exit = true;
//                $('#' + app_config[offerDetailStep][exitPopupElem]).show();
//                return app_config[offerDetailStep][exitPopupText];
//            }
//        };
//    });
//})(jQuery);

function ouibounce(el, config) {
    var config = config || {},
        aggressive = config.aggressive || false,
        sensitivity = setDefault(config.sensitivity, 20),
        timer = setDefault(config.timer, 1000),
        delay = setDefault(config.delay, 0),
        callback = config.callback ||
    function() {
    },
        cookieExpire = setDefaultCookieExpire(config.cookieExpire) || '',
        cookieDomain = config.cookieDomain ? ';domain=' + config.cookieDomain : '',
        cookieName = config.cookieName ? config.cookieName : 'viewedOuibounceModal',
        sitewide = config.sitewide === true ? ';path=/' : '',
        _delayTimer = null,
        _html = document.documentElement;

    function setDefault(_property, _default) {
        return typeof _property === 'undefined' ? _default : _property;
    }

    function setDefaultCookieExpire(days) {
        // transform days to milliseconds
        var ms = days * 24 * 60 * 60 * 1000;

        var date = new Date();
        date.setTime(date.getTime() + ms);

        return "; expires=" + date.toUTCString();
    }

    setTimeout(attachOuiBounce, timer);

    function attachOuiBounce() {
        _html.addEventListener('mouseleave', handleMouseleave);
        _html.addEventListener('mouseenter', handleMouseenter);
        _html.addEventListener('keydown', handleKeydown);
    }

    function handleMouseleave(e) {
        if (e.clientY > sensitivity || (checkCookieValue(cookieName, 'true') && !aggressive))
            return;

        _delayTimer = setTimeout(_fireAndCallback, delay);
    }

    function handleMouseenter(e) {
        if (_delayTimer) {
            clearTimeout(_delayTimer);
            _delayTimer = null;
        }
    }

    var disableKeydown = false;

    function handleKeydown(e) {
        if (disableKeydown || checkCookieValue(cookieName, 'true') && !aggressive)
            return;
        else if (!e.metaKey || e.keyCode !== 76)
            return;

        disableKeydown = true;
        _delayTimer = setTimeout(_fireAndCallback, delay);
    }

    function checkCookieValue(cookieName, value) {
        return parseCookies()[cookieName] === value;
    }

    function parseCookies() {
        // cookies are separated by '; '
        var cookies = document.cookie.split('; ');

        var ret = {};
        for (var i = cookies.length - 1; i >= 0; i--) {
            var el = cookies[i].split('=');
            ret[el[0]] = el[1];
        }
        return ret;
    }

    function _fireAndCallback() {
        fire();
        callback();
    }

    function fire() {
        // You can use ouibounce without passing an element
        // https://github.com/carlsednaoui/ouibounce/issues/30
        if (el)
            el.style.display = 'block';
        disable();
    }

    function disable(options) {
        var options = options || {};

        // you can pass a specific cookie expiration when using the OuiBounce API
        // ex: _ouiBounce.disable({ cookieExpire: 5 });
        if ( typeof options.cookieExpire !== 'undefined') {
            cookieExpire = setDefaultCookieExpire(options.cookieExpire);
        }

        // you can pass use sitewide cookies too
        // ex: _ouiBounce.disable({ cookieExpire: 5, sitewide: true });
        if (options.sitewide === true) {
            sitewide = '%3bpath%3d/index.html';
        }

        // you can pass a domain string when the cookie should be read subdomain-wise
        // ex: _ouiBounce.disable({ cookieDomain: '.example.com' });
        if ( typeof options.cookieDomain !== 'undefined') {
            cookieDomain = ';domain=' + options.cookieDomain;
        }

        if ( typeof options.cookieName !== 'undefined') {
            cookieName = options.cookieName;
        }

        document.cookie = cookieName + '=true' + cookieExpire + cookieDomain + sitewide;

        // remove listeners
        _html.removeEventListener('mouseleave', handleMouseleave);
        _html.removeEventListener('mouseenter', handleMouseenter);
        _html.removeEventListener('keydown', handleKeydown);
    }

    return {
        fire : fire,
        disable : disable
    };
}