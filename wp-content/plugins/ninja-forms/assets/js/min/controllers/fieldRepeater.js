define('controllers/fieldRepeater', ['models/fieldRepeaterSetCollection', 'models/fieldCollection'], function(repeaterSetCollection, fieldCollection) {
    var controller = Marionette.Object.extend({

        initialize: function() {
            this.listenTo(nfRadio.channel('repeater'), 'init:model', this.initRepeater);
        },

        initRepeater: function(model) {
            if ('undefined' == typeof model.collection.options.formModel) {
                return false;
            }

            let fields = new fieldCollection(model.get('fields'), {
                formModel: model.collection.options.formModel,
                repeaterFieldModel: model
            });
            model.set('sets', new repeaterSetCollection([{
                fields: fields
            }], {
                templateFields: model.get('fields'),
                formModel: model.collection.options.formModel,
                repeaterFieldModel: model
            }));
            //Trigger Fields IDs sorting in case of same form being printed multiple times on DOM
            nfRadio.channel("field-repeater").trigger('sort:fieldsets');
        },

    });

    return controller;
});