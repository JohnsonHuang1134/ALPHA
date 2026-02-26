define('views/fieldItem', [], function() {
    var view = Marionette.ItemView.extend({
        tagName: 'div',

        initialize: function() {
            this.listenTo(this.model, 'reRender', this.render, this);
            this.listenTo(this.model, 'change:addWrapperClass', this.addWrapperClass, this);
            this.listenTo(this.model, 'change:removeWrapperClass', this.removeWrapperClass, this);
            this.listenTo(this.model, 'change:invalid', this.toggleAriaInvalid, this);

            this.template = '#tmpl-nf-field-' + this.model.get('wrap_template');
        },

        test: function(model) {
            console.log('firing from trigger 1');
        },

        addWrapperClass: function() {
            var cl = this.model.get('addWrapperClass');
            if ('' != cl) {
                jQuery(this.el).addClass(cl);
                this.model.set('addWrapperClass', '');
            }
        },

        removeWrapperClass: function() {
            var cl = this.model.get('removeWrapperClass');
            if ('' != cl) {
                jQuery(this.el).removeClass(cl);
                this.model.set('removeWrapperClass', '');
            }
        },

        toggleAriaInvalid: function() {
            var invalid = this.model.get('invalid');
            jQuery('[aria-invalid]', this.el).attr('aria-invalid', JSON.stringify(invalid));
        },

        onRender: function() {
            this.$el = this.$el.children();
            this.$el.unwrap();
            this.setElement(this.$el);

            /*
             * If we have an input mask, init that mask.
             * TODO: Move this to a controller so that the logic isn't in the view.
             */
            if ('undefined' != typeof this.model.get('mask') && '' != String(this.model.get('mask')).trim()) {
                if ('custom' == this.model.get('mask')) {
                    var mask = this.model.get('custom_mask');
                } else {
                    var mask = this.model.get('mask');
                }

                /* POLYFILL */
                Number.isInteger = Number.isInteger || function(value) {
                    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
                };
                if (Number.isInteger(mask)) {
                    mask = mask.toString();
                }

                if ('currency' == mask) {
                    var form = nfRadio.channel('app').request('get:form', this.model.get('formID'));

                    var thousands_sep = form.get('thousands_sep');
                    /*
                     * TODO: if we have a &nbsp; , replace it with a string with a space
                     */
                    if ('&nbsp;' == thousands_sep || 160 == thousands_sep.charCodeAt(0)) {
                        thousands_sep = ' ';
                    }
                    var currencySymbol = jQuery('<div/>').html(form.get('currencySymbol')).text();
                    thousands_sep = jQuery('<div/>').html(thousands_sep).text();
                    var decimal_point = jQuery('<div/>').html(form.get('decimal_point')).text();

                    /*
                     * TODO: Currently, these options use the plugin-wide defaults for locale.
                     * When per-form locales are implemented, these will need to be revisited.
                     */
                    var autoNumericOptions = {
                        digitGroupSeparator: thousands_sep,
                        decimalCharacter: decimal_point,
                        currencySymbol: currencySymbol,
                        modifyValueOnWheel: false
                    };

                    // Initialization
                    var autoN_el = jQuery(jQuery(this.el).find('.nf-element')[0]);
                    new AutoNumeric(jQuery(this.el).find('.nf-element')[0], autoNumericOptions);
                    // update the value for the model so it gets saved to
                    // the database properly
                    var context = this;
                    autoN_el.on('change', function(e) {
                        context.model.set('value', e.target.value);
                    })
                } else {
                    jQuery(this.el).find('.nf-element').mask(mask);
                }
            }

            nfRadio.channel(this.model.get('type')).trigger('render:view', this);
            nfRadio.channel('fields').trigger('render:view', this);
        },

        templateHelpers: function() {
            var that = this;
            return {

                renderElement: function() {
                    // Account for falsey default value of 0.
                    if (this.clean && !this.value && 0 === this.default) this.value = '0';
                    var tmpl = _.find(this.element_templates, function(tmpl) {
                        if (0 < jQuery('#tmpl-nf-field-' + tmpl).length) {
                            return true;
                        }
                    });
                    var template = nfRadio.channel('app').request('get:template', '#tmpl-nf-field-' + tmpl);

                    return template(this);
                },

                renderLabel: function() {
                    var template = nfRadio.channel('app').request('get:template', '#tmpl-nf-field-label');
                    return template(this);
                },

                renderLabelClasses: function() {
                    var classes = '';
                    if ('undefined' != typeof this.customLabelClasses) {
                        classes = this.customLabelClasses(classes);
                    }
                    return classes;
                },

                renderPlaceholder: function() {
                    var placeholder = this.placeholder;

                    if ('undefined' != typeof this.customPlaceholder) {
                        placeholder = this.customPlaceholder(placeholder);
                    }

                    if ('' != String(placeholder).trim()) {
                        return 'placeholder="' + _.escape(placeholder) + '"';
                    } else {
                        return '';
                    }
                },

                renderWrapClass: function() {
                    var wrapClass = 'field-wrap ' + this.type + '-wrap';

                    // Check if type and parentType are different. If, so
                    // then add appropriate parentType wrap class
                    if (this.type !== this.parentType) {
                        wrapClass = wrapClass + ' ' + this.parentType + '-wrap';
                    }
                    // If we have an old_classname defined, output wrap class for backward compatibility
                    if ('undefined' != typeof this.old_classname && 0 < String(this.old_classname).trim().length) {
                        wrapClass += ' ' + this.old_classname + '-wrap';
                    }

                    if ('undefined' != typeof customWrapClass) {
                        wrapClass = customWrapClass(wrapClass);
                    }

                    return wrapClass;
                },

                renderClasses: function() {
                    var classes = this.classes;

                    if (this.error) {
                        classes += ' nf-error';
                    } else {
                        classes = classes.replace('nf-error', '');
                    }

                    if ('undefined' != typeof this.element_class && 0 < String(this.element_class).trim().length) {
                        classes += ' ' + this.element_class;
                    }

                    /*
                     * If we have a function for adding extra classes, add those.
                     */

                    if ('undefined' != typeof this.customClasses) {
                        classes = this.customClasses(classes);
                    }

                    return classes;
                },

                maybeFilterHTML: function() {
                    return typeof nfFrontEnd.filter_esc_status !== "undefined" ? nfFrontEnd.filter_esc_status : "false";
                },

                maybeDisabled: function() {
                    if (1 == this.disable_input) {
                        return 'disabled';
                    } else {
                        return '';
                    }
                },

                maybeRequired: function() {
                    if (1 == this.required) {
                        return 'aria-required="true" required';
                    } else {
                        return '';
                    }
                },

                maybeDisableAutocomplete: function() {
                    if (1 == this.disable_browser_autocomplete) {
                        return 'autocomplete="off"';
                    } else {
                        const autoType = this.translateAutoCompletionType(this.type);
                        return 'autocomplete="' + autoType + '"';
                    }
                },

                translateAutoCompletionType: function(type) {
                    //https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
                    switch (type) {
                        case 'address':
                            return 'street-address';
                        case 'city':
                            return 'address-level2';
                        case 'email':
                            return 'email';
                        case 'firstname':
                            return 'given-name';
                        case 'lastname':
                            return 'family-name';
                        case 'zip':
                            return 'postal-code';
                        case 'phone':
                            return 'tel';
                        default:
                            return 'on';
                    }
                },

                maybeInputLimit: function() {
                    if ('characters' == this.input_limit_type && '' != String(this.input_limit).trim()) {
                        return 'maxlength="' + this.input_limit + '"';
                    } else {
                        return '';
                    }
                },

                getHelpText: function() {
                    // this.help_text = jQuery( this.help_text ).html();
                    // return ( 'undefined' != typeof this.help_text ) ? this.help_text.replace(/"/g, "&quot;") : '';
                    return ('undefined' != typeof this.help_text) ? this.help_text : '';
                },

                maybeRenderHelp: function() {

                    // use jQuery().text() to make sure help_text has actual
                    // text and not just HTML tags.
                    var check_text_par = document.createElement('p');
                    check_text_par.innerHTML = this.help_text;

                    var shouldRenderHelpText = false;
                    // Check for text or image tags
                    if (0 != String(jQuery(check_text_par).text()).trim().length ||
                        0 < jQuery(check_text_par).find('img').length) {
                        shouldRenderHelpText = true;
                    }

                    if ('undefined' != typeof this.help_text && shouldRenderHelpText) {

                        // Strip HTML tags for accessibility
                        function stripTags(input) {
                            return input.replace(/<\/?[^>]+(>|$)/g, "").trim();
                        }

                        var icon = document.createElement('span');
                        icon.classList.add('fa', 'fa-info-circle', 'nf-help');
                        icon.setAttribute('data-text', this.getHelpText());
                        icon.setAttribute('tabindex', '0'); // Make it focusable
                        icon.setAttribute('aria-describedby', 'hidden-help-text-' + this.id); // Link to the hidden description

                        // Create a hidden element for screen readers
                        var hiddenHelpText = document.createElement('span');
                        hiddenHelpText.textContent = stripTags(this.help_text); // Output the help text without tags
                        hiddenHelpText.id = 'hidden-help-text-' + this.id;
                        hiddenHelpText.classList.add('nf-sr-only'); // Visually hidden but available for screen readers
                        hiddenHelpText.setAttribute('role', 'tooltip');

                        icon.appendChild(hiddenHelpText); // Append the hidden help text

                        return icon.outerHTML;
                    } else {
                        return '';
                    }
                },

                renderDescText: function() {
                    if ('undefined' == typeof this.desc_text) {
                        return '';
                    }

                    // Creates an element so we can check to see if the text is empty.
                    var text = document.createElement('p');
                    text.innerHTML = this.desc_text;
                    if (0 == String(text.innerText).trim().length) return '';

                    var check, checkText;
                    checkText = document.createTextNode(this.desc_text);
                    check = document.createElement('p');
                    check.appendChild(checkText);
                    if (0 != String(jQuery(check).text()).trim().length) {
                        var descriptionText, fieldDescription;
                        descriptionText = document.createRange().createContextualFragment(this.desc_text);
                        fieldDescription = document.createElement('div');
                        fieldDescription.classList.add('nf-field-description');
                        fieldDescription.setAttribute('aria-hidden', 'true');
                        fieldDescription.setAttribute('id', 'nf-description-' + this.id);
                        fieldDescription.appendChild(descriptionText);
                        return fieldDescription.outerHTML;
                    } else {
                        return '';
                    }
                },

                renderNumberDefault: function() {
                    // If the field is clean...
                    if (this.clean) {
                        // If we have a default...
                        if (0 === this.default || this.default) {
                            return this.default;
                        } // If we do not have a placeholder...
                        else if (!this.placeholder) {
                            return this.value;
                        } // Otherwise...
                        else {
                            return '';
                        }
                    } // Otherwise... (The field is not clean.)
                    else {
                        return this.value;
                    }
                },

                renderCurrencyFormatting: function(number) {
                    /*
                     * Our number will have a . as a decimal point. We want to replace that with our locale decimal, nfi18n.decimal_point.
                     */
                    var replacedDecimal = number.toString().replace('.', '||');
                    /*
                     * Add thousands separator. Our original number var won't have thousands separators.
                     */
                    var replacedThousands = replacedDecimal.replace(/\B(?=(\d{3})+(?!\d))/g, nfi18n.thousands_sep);
                    var formattedNumber = replacedThousands.replace('||', nfi18n.decimal_point);

                    var form = nfRadio.channel('app').request('get:form', that.model.get('formID'));
                    var currency_symbol = form.get('settings').currency_symbol;
                    return currency_symbol + formattedNumber;
                },

                maybeRenderTime: function() {
                    if ('time_only' == this.date_mode || 'date_and_time' == this.date_mode) {
                        return true;
                    }
                    return false;
                },
            };
        },

        events: {
            'change .nf-element': 'fieldChange',
            'keyup .nf-element': 'fieldKeyup',
            'click .nf-element': 'fieldClick',
            'click .extra': 'extraClick',
            'change .extra': 'extraChange',
            'blur .nf-element': 'fieldBlur'
        },

        fieldChange: function(e) {
            var el = jQuery(e.currentTarget);
            var response = nfRadio.channel('nfAdmin').request('change:field', el, this.model);
        },

        fieldKeyup: function(e) {
            var el = jQuery(e.currentTarget);
            var keyCode = e.keyCode;
            nfRadio.channel('field-' + this.model.get('id')).trigger('keyup:field', el, this.model, keyCode);
            nfRadio.channel(this.model.get('type')).trigger('keyup:field', el, this.model, keyCode);
            nfRadio.channel('fields').trigger('keyup:field', el, this.model, keyCode);
        },

        fieldClick: function(e) {
            var el = jQuery(e.currentTarget);
            nfRadio.channel('field-' + this.model.get('id')).trigger('click:field', el, this.model);
            nfRadio.channel(this.model.get('type')).trigger('click:field', el, this.model);
            nfRadio.channel('fields').trigger('click:field', el, this.model);
        },

        extraClick: function(e) {
            nfRadio.channel('field-' + this.model.get('id')).trigger('click:extra', e, this.model);
            nfRadio.channel(this.model.get('type')).trigger('click:extra', e, this.model);
            nfRadio.channel('fields').trigger('click:extra', e, this.model);
        },

        extraChange: function(e) {
            nfRadio.channel('field-' + this.model.get('id')).trigger('change:extra', e, this.model);
            nfRadio.channel(this.model.get('type')).trigger('change:extra', e, this.model);
            nfRadio.channel('fields').trigger('change:extra', e, this.model);
        },

        fieldBlur: function(e) {
            var el = jQuery(e.currentTarget);
            nfRadio.channel('field-' + this.model.get('id')).trigger('blur:field', el, this.model);
            nfRadio.channel(this.model.get('type')).trigger('blur:field', el, this.model);
            nfRadio.channel('fields').trigger('blur:field', el, this.model);
        },

        onAttach: function() {
            nfRadio.channel(this.model.get('type')).trigger('attach:view', this);
        }
    });

    return view;
});