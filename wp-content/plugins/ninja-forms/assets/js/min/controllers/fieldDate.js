define('controllers/fieldDate', [], function() {
    var controller = Marionette.Object.extend({

        initialize: function() {
            this.listenTo(nfRadio.channel('date'), 'init:model', this.initModel);
            this.listenTo(nfRadio.channel('date'), 'render:view', this.initDatepicker);
        },

        initModel: function(model) {
            this.registerFunctions(model);
        },

        registerFunctions: function(model) {
            model.set('renderHourOptions', this.renderHourOptions);
            model.set('renderMinuteOptions', this.renderMinuteOptions);
            model.set('maybeRenderAMPM', this.maybeRenderAMPM);
            model.set('customClasses', this.customClasses);
            // Overwrite the default getValue() method.
            model.getValue = this.getValue;
        },

        renderHourOptions: function() {
            return this.hours_options;
        },

        renderMinuteOptions: function() {
            return this.minutes_options;
        },

        maybeRenderAMPM: function() {
            if ('undefined' == typeof this.hours_24 || 1 == this.hours_24) {
                return;
            }
            var requiredAttr = (this.required == 1) ? 'aria-required="true" required' : '';
            return `<div style="float:left;" class="time-wrap"><select id="ampm-select" class="ampm extra" aria-label="am-pm-select" ${requiredAttr}><option value="am">AM</option><option value="pm">PM</option></select></div>`;
        },

        initDatepicker: function(view) {
            view.model.set('el', view.el);
            var el = jQuery(view.el).find('.nf-element')[0];
            view.listenTo(nfRadio.channel('form-' + view.model.get('formID')), 'before:submit', this.beforeSubmit, view);

            // If we are using a time_only date_mode, then hide the date input.
            if ('undefined' != typeof view.model.get('date_mode') && 'time_only' == view.model.get('date_mode')) {
                jQuery(el).hide();
                return false;
            }

            // Make sure date format is correctly converted.
            var dateFormat = this.convertDateFormat(view.model.get('date_format'));
            // Make sure this is a deep conversion of the original model.
            view.model.set('date_format', dateFormat);

            var dateSettings = {
                onReady: (selectedDates, datestr, dateObject) => {
                    dateObject.altInput.setAttribute('aria-labelledby', jQuery(el).attr("aria-labelledby"));
                    dateObject.altInput.setAttribute('aria-invalid', false);
                },
                dateFormat: dateFormat,
                altFormat: dateFormat,
                altInput: true,
                ariaDateFormat: dateFormat,
                mode: "single",
                allowInput: true,
                disableMobile: "true",
                minDate: this.getMinDate(view.model),
                maxDate: this.getMaxDate(view.model),
            };

            const nfCustomLocale = this.checkCustomLocale();
            if (nfCustomLocale) {
                dateSettings.locale = nfCustomLocale;
            }

            // Filter our datepicker settings object.
            let filteredDatePickerSettings = nfRadio.channel('flatpickr').request('filter:settings', dateSettings, view);
            if ('undefined' != typeof filteredDatePickerSettings) {
                dateSettings = filteredDatePickerSettings;
            }

            var dateObject = flatpickr(el, dateSettings);

            if (1 == view.model.get('date_default')) {
                dateObject.defaultDate = new Date();
                dateObject.setDate(dateObject.defaultDate);
                view.model.set('value', dateObject.defaultDate);
            }

            //Trigger Pikaday backwards compatibility
            nfRadio.channel('pikaday-bc').trigger('init', dateObject, view.model, view);

            nfRadio.channel('flatpickr').trigger('init', dateObject, view.model, view);
        },

        beforeSubmit: function(formModel) {
            //Get value from input if the default date wasn't edited in the field and the value is still a global unformatted date object
            if (_.isObject(this.model.get('value'))) {
                const inputID = this.el.id.replace("-wrap", '');
                const date_value = this.el.querySelector("#" + inputID).value;
                this.model.set('value', date_value);
            }

            if ('date_only' == this.model.get('date_mode')) {
                return false;
            }
            let hour = jQuery(this.el).find('.hour').val();
            let minute = jQuery(this.el).find('.minute').val();
            let ampm = jQuery(this.el).find('.ampm').val();
            let current_value = this.model.get('value');
            let date = false;

            if (_.isObject(current_value)) {
                date = current_value.date;
            } else {
                date = current_value;
            }

            let date_value = {
                date: date,
                hour: hour,
                minute: minute,
                ampm: ampm,
            };

            this.model.set('value', date_value);
        },

        getMinDate: function(fieldModel) {
            let minDate = null;
            if (typeof fieldModel.get('year_range_start') !== "undefined") {
                const yearRangeStart = fieldModel.get('year_range_start');
                if (yearRangeStart) {
                    minDate = flatpickr.formatDate(new Date(String(yearRangeStart)), fieldModel.get('date_format'));
                }
            }
            return minDate;
        },

        getMaxDate: function(fieldModel) {
            let maxDate = null;
            if (typeof fieldModel.get('year_range_end') !== "undefined") {
                const yearRangeEnd = fieldModel.get('year_range_end');
                if (yearRangeEnd) {
                    maxDate = flatpickr.formatDate(new Date(String(yearRangeEnd)), fieldModel.get('date_format'));
                }
            }
            return maxDate;
        },

        convertDateFormat: function(dateFormat) {
            //If dateFormat is empty or null, try to get a value from the Field's model
            if (!dateFormat && this.model) {
                dateFormat = this.model.get('date_format');
            }
            //If it is still empty or null set it to be "default"
            if (!dateFormat) {
                dateFormat = "default";
            }
            //Convert PHP format in setting to flatPickr expected setting if needed
            const lookup = {
                'MM/DD/YYYY': 'm/d/Y',
                'MM-DD-YYYY': 'm-d-Y',
                'MM.DD.YYYY': 'm.d.Y',
                'DD/MM/YYYY': 'd/m/Y',
                'DD-MM-YYYY': 'd-m-Y',
                'DD.MM.YYYY': 'd.m.Y',
                'YYYY-MM-DD': 'Y-m-d',
                'YYYY/MM/DD': 'Y/m/d',
                'YYYY.MM.DD': 'Y.m.d',
                'dddd, MMMM D YYYY': 'l, F d Y',
                'default': nfi18n.dateFormat ? nfi18n.dateFormat : 'default'
            };
            return Object.keys(lookup).includes(dateFormat) ? lookup[dateFormat] : dateFormat;
        },

        customClasses: function(classes) {
            if ('date_and_time' == this.date_mode) {
                classes += ' date-and-time';
            }
            return classes;
        },
        //retrieve localized values and assign them to flatpickr locale format
        checkCustomLocale: function() {
            let customLocale = {};
            if (nfi18n) {
                if (nfi18n.months || nfi18n.monthsShort) {
                    customLocale.months = {};
                    if (nfi18n.months) {
                        customLocale.months.longhand = nfi18n.months;
                    }
                    if (nfi18n.monthsShort) {
                        customLocale.months.shorthand = nfi18n.monthsShort;
                    }
                }
                if (nfi18n.weekdays || nfi18n.weekdaysShort) {
                    customLocale.weekdays = {};
                    if (nfi18n.weekdays) {
                        customLocale.weekdays.longhand = nfi18n.weekdays;
                    }
                    if (nfi18n.weekdaysShort) {
                        customLocale.weekdays.shorthand = nfi18n.weekdaysShort;
                    }
                }
                if (nfi18n.startOfWeek) {
                    customLocale.firstDayOfWeek = nfi18n.startOfWeek;
                }
            }
            return _.isEmpty(customLocale) ? false : customLocale;
        },

        // This function is called whenever we want to know the value of the date field.
        // Since it could be a date/time field, we can't return just the value.
        getValue: function() {

            if ('date_only' == this.get('date_mode')) {
                return this.get('value');
            }
            let el = this.get('el');
            let hour = jQuery(el).find('.hour').val();
            let minute = jQuery(el).find('.minute').val();
            let ampm = jQuery(el).find('.ampm').val();
            let current_value = this.get('value');
            let date = false;

            if (_.isObject(current_value)) {
                date = current_value.date;
            } else {
                date = current_value;
            }

            let value = '';

            if ('undefined' != typeof date) {
                value += date;
            }

            if ('undefined' != typeof hour && 'undefined' != typeof minute) {
                value += ' ' + hour + ':' + minute;
            }

            if ('undefined' != typeof ampm) {
                value += ' ' + ampm;
            }

            return value;

            // let date_value = {
            //     date: date,
            //     hour: hour,
            //     minute: minute,
            //     ampm: ampm,
            // };

            // this.model.set( 'value', date_value );
        }
    });

    return controller;
});