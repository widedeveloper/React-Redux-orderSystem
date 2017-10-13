module.exports = {
    formValidate: function (self) {
        console.log("form", self.refs.submitForm)
        // console.log("form",self.refs.submitForm[0].value)

        var formname = self.refs.submitForm.name
        switch (formname) {
            case 'prospect_form1':
                self.setState({ method: 'Prospect' })
                break;

        }




    },

    Inputvalidate: function (self) {
        // console.log(self)
        if (!self.value.length || !this.isValid(self)) {
            var label = typeof self.getAttribute('data-error-message') !== 'undefined' ? self.getAttribute('data-error-message') : self.getAttribute('name').toUpperCase() + ' is empty or invalid.';
            // if (pushError) {
            //     errors.push(label);
            // }
            this.addClass(self, 'no-error')
            this.removeClass(self,'has-error')
           
            // self.addClass(errorClass).removeClass(validClass);
        } else {
            // self.removeClass(errorClass).addClass(validClass);
             this.addClass(self, 'has-error')
            this.removeClass(self,'no-error')

        }

    },

    isValid: function (type) {
       
        if (typeof type.getAttribute('data-validate') === 'undefined') {
            return true;
        }
        var input = type.value;
        var passed = false;
        switch (type.getAttribute("data-validate")) {
            case 'email':
                /*if (type.data('xvcheck')) {
                    passed = xverifyStatus.email;
                } else {
                    RR if (!isValidMx) {
                        passed = false;
                    }
                    else if (input.match(/\w+/)) {
                        passed = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(input);
                    } else {
                        passed = true;
                    }
                    
                }*/
                if (input.match(/\w+/)) {
                    passed = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(input);
                } else {
                    passed = true;
                }
                break;
            case 'number':
                passed = /^\+?\d+(?:-\d+)*$/.test(input);
                break;
            case 'cvv':
                passed = /^[0-9]{3,4}$/.test(input);
                break;
            case 'phone':
                if (type.getAttribute("data-xvcheck")) {
                    passed = xverifyStatus.phone;
                } else {
                    passed = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i.test(input);
                }
                break;
            default:
                passed = true;
        }
        if (typeof type.getAttribute('min-length') !== 'undefined' && type.getAttribute('min-length') !== false && passed) {
            passed = $.trim(input).toString().length >= type.getAttribute('min-length');
        }
        if (typeof type.getAttribute('max-length') !== 'undefined' && type.getAttribute('max-length') !== false && passed) {
            passed = $.trim(input).toString().length <= type.getAttribute('max-length');
        }
        return passed;
    },


    hasClass: function (el, className) {
        if (el.classList)
            return el.classList.contains(className)
        else
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
    },

    addClass: function (el, className) {
        if (el.classList)
            el.classList.add(className)
        else if (!hasClass(el, className)) el.className += " " + className
    },

    removeClass: function (el, className) {
        if (el.classList)
            el.classList.remove(className)
        else if (hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
            el.className = el.className.replace(reg, ' ')
        }
    }
}