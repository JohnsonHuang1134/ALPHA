define('models/fieldCollection', ['models/fieldModel'], function(fieldModel) {
    var collection = Backbone.Collection.extend({
        model: fieldModel,
        comparator: 'order',

        initialize: function(models, options) {
            this.options = options;
            this.on('reset', function(fieldCollection) {
                nfRadio.channel('fields').trigger('reset:collection', fieldCollection);
            }, this);

            nfRadio.channel('fields').reply('get:firstFieldByOrder', this.getFirstFieldByOrder);
        },

        validateFields: function() {
            _.each(this.models, function(fieldModel) {
                if (fieldModel.get("type") === "repeater") {
                    const repeaterModels = nfRadio.channel("field-repeater").request('get:repeaterFieldsModelsArrayByForm', fieldModel.get('formID'));
                    _.each(repeaterModels, function(repeaterFieldModel) {
                        // added here for help with multi-part part validation
                        repeaterFieldModel.set('clean', false);
                        nfRadio.channel('submit').trigger('validate:field', repeaterFieldModel);
                    });
                } else {
                    // added here for help with multi-part part validation
                    fieldModel.set('clean', false);
                    nfRadio.channel('submit').trigger('validate:field', fieldModel);
                }
            }, this);
            //Focus the first invalid input when found
            var formModel = nfRadio.channel('form-' + this.models[0].get('formID')).request('get:form');
            if (_.size(formModel.get('fieldErrors')) > 0) {
                nfRadio.channel('submit').request('focus:firstInvalidInput', Object.keys(formModel.get('fieldErrors')));
            }
        },

        showFields: function() {
            this.invoke('set', {
                visible: true
            });
            this.invoke(function() {
                this.trigger('change:value', this);
            });
        },

        hideFields: function() {
            this.invoke('set', {
                visible: false
            });
            this.invoke(function() {
                this.trigger('change:value', this);
            });
        },

        getFirstFieldByOrder: function(ids_array) {
            let targetID = 0;
            //Loop through an array of fieldIDs to return the one that is positioned first
            _.each(ids_array, function(id) {
                //Get field order
                const order = nfRadio.channel('fields').request('get:field', id).get('order');
                //Set it as the target when the lowest order is found
                targetID = (targetID === 0 || order < targetID) ? id : targetID;
            });

            return targetID;
        }
    });
    return collection;
});