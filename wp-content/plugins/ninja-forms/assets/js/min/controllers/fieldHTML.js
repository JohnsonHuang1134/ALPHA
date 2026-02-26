define('controllers/fieldHTML', [], function() {
    var controller = Marionette.Object.extend({

        htmlFields: [],
        trackedMergeTags: [],

        initialize: function() {
            this.listenTo(Backbone.Radio.channel('fields-html'), 'init:model', this.setupFieldMergeTagTracking);
        },

        setupFieldMergeTagTracking: function(fieldModel) {
            this.htmlFields.push(fieldModel);

            var formID = fieldModel.get('formID');

            this.listenTo(nfRadio.channel('form-' + formID), 'init:model', function(formModel) {

                var mergeTags = fieldModel.get('default').match(new RegExp(/{field:(.*?)}/g));
                if (!mergeTags) return;

                _.each(mergeTags, function(mergeTag) {
                    var fieldKey = mergeTag.replace('{field:', '').replace('}', '');
                    var fieldModel = formModel.get('fields').findWhere({
                        key: fieldKey
                    });
                    if ('undefined' == typeof fieldModel) return;

                    this.trackedMergeTags.push(fieldModel);
                    this.listenTo(nfRadio.channel('field-' + fieldModel.get('id')), 'change:modelValue', this.updateFieldMergeTags);
                }, this);

                // Let's get this party started!
                this.updateFieldMergeTags();
            }, this);
        },

        updateFieldMergeTags: function(fieldModel) {
            _.each(this.htmlFields, function(htmlFieldModel) {
                var value = htmlFieldModel.get('value');
                _.each(this.trackedMergeTags, function(fieldModel) {

                    /* Search the value for any spans with mergetag data-key
                     * values
                     */
                    var spans = value.match(new RegExp(/<span data-key="field:(.*?)<\/span>/g));
                    _.each(spans, function(spanVar) {
                        /* See if the span string contains the current
                         * fieldModel's key. If so replace the span with a
                         * merge tag for evaluation.
                         */
                        if (-1 < spanVar.indexOf("data-key=\"field:" + fieldModel.get('key'))) {
                            value = value.replace(spanVar, "{field:" + fieldModel.get('key') + "}");
                        }
                    });

                    var mergeTag = '{field:' + fieldModel.get('key') + '}';

                    const fieldValue = fieldModel.get('type') === "repeater" ? this.displayRepeaterData(fieldModel) : fieldModel.getValue();

                    /* We replace the merge tag with the value
                     * surrounded by a span so that we can still find it
                     * and not affect itself or other field merge tags
                     */
                    value = value.replace(mergeTag, "<span data-key=\"field:" +
                        fieldModel.get('key') + "\">" +
                        fieldValue + "</span>");
                }, this);
                htmlFieldModel.set('value', value);
                htmlFieldModel.trigger('reRender');
            }, this);
        },

        displayRepeaterData: function(fieldModel) {
            const repeaterFieldIDs = Object.keys(fieldModel.getValue());
            let returnHTML = "",
                passedFields = [];

            _.each(repeaterFieldIDs, function(fieldID) {
                if (passedFields.indexOf(fieldID) === -1) {
                    const field = nfRadio.channel('fields').request('get:field', fieldID);
                    if (typeof field !== "undefined") {
                        const excluded = ['submit', 'html', 'hidden', 'password', 'passwordconfirm', 'divider', 'hr', 'note', 'unknown', 'button', 'confirm', 'creditcard', 'creditcardcvc', 'creditcardexpiration', 'creditcardfullname', 'creditcardnumber', 'creditcardzip', 'recaptcha', 'recaptcha_v3'];
                        if (excluded.indexOf(field.get('type')) === -1 && field.getValue().toString().length > 0) {
                            const index = Number(fieldID.split("_").pop()) + 1;
                            returnHTML += "<p>" + field.get("label") + " " + index + " : " + field.getValue() + "</p>";
                            passedFields.push(fieldID);
                        }
                    }
                }
            });

            return returnHTML;
        }

    });

    return controller;
});