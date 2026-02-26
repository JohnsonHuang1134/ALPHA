define('controllers/changeDate', [], function() {
    var radioChannel = nfRadio.channel('date');
    var errorID = 'invalid-date';

    var controller = Marionette.Object.extend({

        initialize: function() {
            this.listenTo(radioChannel, 'change:modelValue', this.onChangeModelValue);
            this.listenTo(radioChannel, 'keyup:field', this.dateKeyup);
            this.listenTo(radioChannel, 'blur:field', this.onBlurField);

            this.listenTo(radioChannel, 'change:extra', this.changeHoursMinutes, this)
        },

        onChangeModelValue: function(model) {
            var original = moment.locale();
            moment.locale('ninja-forms');
            this.dateChange(model);
            moment.locale(original);
        },

        onBlurField: function(el, model) {
            var original = moment.locale();
            moment.locale('ninja-forms');
            this.dateChange(model);
            moment.locale(original);
        },

        dateChange: function(model) {
            var fieldID = model.get('id');
            var value = model.get('value');
            var format = model.get('date_format');

            // If we are dealing with purely a time field, bail early.
            if ('time_only' == model.get('date_mode')) {
                return false;
            }

            if (0 < value.length) {
                // use moment's isValid to check against the fields format setting
                if (this.isDateValid(value, format, fieldID)) {
                    nfRadio.channel('fields').request('remove:error', fieldID, errorID);
                } else {
                    var fieldModel = nfRadio.channel('fields').request('get:field', fieldID);
                    var formModel = nfRadio.channel('app').request('get:form', fieldModel.get('formID'));
                    nfRadio.channel('fields').request('add:error', fieldID, errorID, formModel.get('settings').changeDateErrorMsg);
                }
            } else {
                nfRadio.channel('fields').request('remove:error', fieldID, errorID);
            }
        },

        /**
         * When a user types inside of an dat field, track their keypresses
         * and add the appropriate class.
         * If the value validates as an date, add a class of nf-pass
         * If the value does not validate as date, add a class of nf-fail
         *
         * @since  3.0
         * @param  {object} el    Element that triggered the keyup event.
         * @param  {object} model Model connected to the element that triggered the event
         * @return {void}
         */
        dateKeyup: function(el, model, keyCode) {

            /*
             * If we pressed the 'tab' key to get to this field, return false.
             */
            if (9 == keyCode) {
                return false;
            }
            /*
             * Get the current value from our element.
             */
            var value = jQuery(el).val();

            /*
             * Get our current ID
             */
            var fieldID = model.get('id');

            /*
             * Get our current date format
             */
            var format = model.get('date_format');

            var original = moment.locale();
            moment.locale('ninja-forms');

            /*
             * Check our value to see if it is a valid date.
             */
            if (0 == value.length) {
                nfRadio.channel('fields').request('remove:error', fieldID, errorID);
            }
            // use moment's isValid to check against the fields format setting
            else if (!this.isDateValid(value, format, fieldID) && !model.get('clean')) {

                var fieldModel = nfRadio.channel('fields').request('get:field', fieldID);
                var formModel = nfRadio.channel('app').request('get:form', fieldModel.get('formID'));
                nfRadio.channel('fields').request('add:error', fieldID, errorID, formModel.get('settings').changeDateErrorMsg);

                model.removeWrapperClass('nf-pass');
            }
            // use moment's isValid to check against the fields format setting
            else if (this.isDateValid(value, format, fieldID)) {
                nfRadio.channel('fields').request('remove:error', fieldID, errorID);
                /*
                 * Add nf-pass class to the wrapper.
                 */
                model.addWrapperClass('nf-pass');
                model.set('clean', false);
            }
            moment.locale(original);
        },

        changeHoursMinutes: function(e, fieldModel) {
            let type = '';
            let container = jQuery(e.target).closest('.nf-field-element');

            // Set our hour, minute, and ampm
            let selected_hour = jQuery(container).find('.hour').val();
            let selected_minute = jQuery(container).find('.minute').val();
            let selected_ampm = jQuery(container).find('.ampm').val();

            fieldModel.set('selected_hour', selected_hour);
            fieldModel.set('selected_minute', selected_minute);
            fieldModel.set('selected_ampm', selected_ampm);
            // Trigger a change on our model.
            fieldModel.trigger('change:value', fieldModel);
        },

        isDateValid: function(value, format, fieldID) {
            //Get Date and Timestamp using the precise flatPickr instance of the field to catch the locale
            const parseDate = document.querySelector("[name='nf-field-" + fieldID + "']")._flatpickr.parseDate(value, format);
            // If parsedDate is undefined, the date is invalid
            if (!parseDate) {
                return false;
            }
            const timestamp = parseDate.getTime();
            if (isNaN(timestamp)) {
                return false; // Invalid date
            }
            //Convert timestamp back to Date object and string
            const parsedDate = new Date(timestamp);
            const formattedDate = document.querySelector("[name='nf-field-" + fieldID + "']")._flatpickr.formatDate(parsedDate, format);
            // Check vlaue and date string are deeply equals
            return formattedDate === value;
        }

    });

    return controller;
});