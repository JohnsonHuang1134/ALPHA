define('models/fieldRepeaterSetCollection', ['models/fieldRepeaterSetModel', 'models/fieldCollection'], function(repeaterSetModel, fieldCollection) {
    var collection = Backbone.Collection.extend({
        model: repeaterSetModel,

        initialize: function(models, options) {
            this.options = options;

            this.listenTo(nfRadio.channel('field-repeater'), 'sort:fieldsets', this.sortIDs);
            this.listenTo(nfRadio.channel('field-repeater'), 'remove:fieldset', this.removeSet);
            this.listenTo(nfRadio.channel('field-repeater'), 'add:fieldset', this.addSet);
            nfRadio.channel("field-repeater").reply('get:fieldsets', this.getFieldSets, this);

        },

        addSet: function(repeaterFieldID = false) {
            if (repeaterFieldID) {
                //Get correct Field Model in case of multiple Repeater fields use
                const repeaterFieldModel = this.options.repeaterFieldModel.id === repeaterFieldID ? this.options.repeaterFieldModel : false;

                if (repeaterFieldModel) {
                    //Create a new collection
                    let fields = new fieldCollection(this.options.templateFields, {
                        formModel: this.options.formModel,
                        repeaterFieldModel: repeaterFieldModel
                    });
                    //Add it th sets of collection
                    this.add({
                        fields: fields
                    }, {
                        repeaterFieldModel: repeaterFieldModel
                    });
                }
            }
            //reset all fields IDs
            this.sortIDs();

        },

        removeSet: function(fieldset) {
            // Remove possible form errors related to required fields
            this.removeRequiredFieldsErrors(fieldset);

            //Remove field models saved globally
            const formID = fieldset.repeaterFieldModel.get('formID');
            const repeaterID = fieldset.repeaterFieldModel.get('id');
            const isRepeaterModelSet = nfAllRepeaterFieldsModels.find(rep => rep.id === repeaterID && rep.form === formID);
            if (isRepeaterModelSet) {
                _.each(isRepeaterModelSet.fields, (field, index) => {
                    if (typeof field !== "undefined") {
                        _.each(fieldset.get('fields').models, (fieldsetField) => {
                            const fieldID = typeof field.id !== "undefined" ? field.id : field.get('id');
                            if (fieldsetField.id === fieldID) {
                                isRepeaterModelSet.fields.splice(index, 1);
                            }
                        });
                    }
                });
                nfRadio.channel("field-repeater").trigger('set:repeaterModels');
            }

            //Remove the fieldset
            this.remove(fieldset);
            fieldset.destroy();

            //reset all fields IDs
            this.sortIDs();

            //Reset values
            nfRadio.channel("field-repeater").trigger('set:value');
        },

        removeRequiredFieldsErrors: function(fieldset) {
            let fields = fieldset.get('fields');
            _.each(fields.models, function(field) {
                nfRadio.channel('fields').request('remove:error', field.get("id"), "required-error");
            });
        },

        getFieldsets: function() {
            return this.models;
        },

        sortIDs: function() {
            const fieldsets = this.getFieldsets();

            //Reset repeater fields IDs when adding / removing a field
            _.each(fieldsets, function(fieldset, modelIndex) {
                let fields = fieldset.get('fields');
                fieldset.set('index', modelIndex + 1);
                _.each(fields.models, function(field) {
                    //Always rebuild ID to allow same form multiple times on DOM
                    //Remove suffix if it has one
                    const cutEl = String(field.id).split('_')[0];
                    //Extract Field index of ID
                    const fieldIndex = String(cutEl).split(".").length > 1 ? String(cutEl).split(".").pop() : false;
                    //The loop makes first fieldset of second same form to miss correct index here, next iteration will get that correct index
                    if (!fieldIndex) return;
                    //Update FieldID using ( REPEATER FIELD id . field index in the repeater field _ fieldset index in the repeater field ) format
                    const newID = field.collection.options.repeaterFieldModel.id + "." + fieldIndex + "_" + modelIndex;
                    field.set("id", newID);
                });
            });
            //Reload repeater field view ( collection of fieldsets updated )
            nfRadio.channel('field-repeater').trigger('rerender:fieldsets');
        },

    });
    return collection;
});