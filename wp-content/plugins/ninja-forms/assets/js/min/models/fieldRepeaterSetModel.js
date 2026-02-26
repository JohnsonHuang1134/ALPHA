let nfAllRepeaterFieldsModels = [];
define('models/fieldRepeaterSetModel', [], function() {
    var model = Backbone.Model.extend({

        initialize: function(collection, options) {

            this.repeaterFieldModel = options.repeaterFieldModel;

            this.set('label', this.repeaterFieldModel.get('label'));

            if (collection && options) {
                this.initAllRepeaterFieldsModels(collection, options);
            }

            nfRadio.channel("field-repeater").reply('get:repeaterFields', this.getRepeaterFields, this);
            nfRadio.channel("field-repeater").reply('get:repeaterFieldById', this.getRepeaterFieldById, this);
            nfRadio.channel("field-repeater").reply('get:repeaterModels', this.getAllRepeaterFieldsModels, this);
            nfRadio.channel("field-repeater").reply('get:repeaterFieldsetsByForm', this.getAllFieldsetsByForm, this);
            nfRadio.channel("field-repeater").reply('get:repeaterFieldsModelsArrayByForm', this.getAllFieldsModelsArrayByForm, this);
            this.listenTo(nfRadio.channel('field-repeater'), 'set:repeaterModels', this.setAllRepeaterFieldsModels);
            this.listenTo(nfRadio.channel('field-repeater'), 'set:value', this.setAllRepeatersValues);
        },

        setAllRepeaterFieldsModels: function() {
            this.set('repeaterFieldsetsModels', nfAllRepeaterFieldsModels);
            this.allRepeatersFieldsetsModels = nfAllRepeaterFieldsModels;
        },

        initAllRepeaterFieldsModels: function(collection, options) {
            const formID = options.repeaterFieldModel.get('formID');
            const repeaterID = options.repeaterFieldModel.get('id');
            const currentModels = collection.fields.models;

            let isModelSet = nfAllRepeaterFieldsModels.find(model => model.id === repeaterID && model.form === formID);

            if (isModelSet) {
                isModelSet.fields = isModelSet.fields.concat(currentModels);
            } else {
                nfAllRepeaterFieldsModels.push({
                    form: formID,
                    id: repeaterID,
                    fields: currentModels
                });
            }

            this.setAllRepeaterFieldsModels();
        },

        getAllRepeaterFieldsModels: function() {
            return nfAllRepeaterFieldsModels;
        },

        getAllFieldsetsByForm: function(formID) {
            const allFormsModels = this.getAllRepeaterFieldsModels();
            const thisFormModels = allFormsModels.filter(model => model.form === formID);

            return thisFormModels;
        },

        getAllFieldsModelsArrayByForm: function(formID) {
            const thisFormModels = this.getAllFieldsetsByForm(formID);
            let singleArray = [];
            thisFormModels.map(model => {
                singleArray = singleArray.concat(model.fields);
            });

            return singleArray;
        },

        getRepeaterFields: function(repeaterID) {
            const allModels = this.getAllRepeaterFieldsModels();
            let fields = allModels.find(model => String(model.id) === String(repeaterID));
            if (typeof fields === "undefined") {
                fields = this.reverseResearchFieldsetModel(repeaterID, allModels);
            }

            return fields;
        },

        reverseResearchFieldsetModel: function(repeaterID, allModels) {
            let fields;
            _.each(allModels, function(fieldsetModel) {
                _.each(fieldsetModel.fields, function(fieldModel) {
                    if (String(fieldModel.id).startsWith(repeaterID)) {
                        fields = fieldsetModel;
                    }
                });
            });

            return fields;
        },

        getRepeaterFieldById: function(id) {
            const repeaterID = String(id).split('.')[0];
            const fieldObject = this.getRepeaterFields(repeaterID);
            //return early if no match found by ID
            if (typeof fieldObject === 'undefined') return;

            const model = fieldObject.fields.find(field => field.id === id);

            return model;
        },

        setAllRepeatersValues: function() {
            const repeaters = this.getAllRepeaterFieldsModels();
            if (repeaters.length > 0) {

                _.each(repeaters, function(repeater) {
                    let fields = repeater.fields;
                    let repeaterFieldModel = nfRadio.channel('fields').request('get:field', repeater.id);

                    if (fields.length > 0) {
                        let repeaterFieldValue = {};
                        //Loop through fields
                        _.each(fields, function(field) {
                            //Get ID and Value to format and store them in the repeaterFieldValue object
                            let value = field.get('value');
                            let id = field.get('id');
                            //Refactor ID used in case we have multiple same form on the DOM and using a changed ID for main repeater field.
                            if (id.split("_").length > 2) {
                                let idArray = id.split("_");
                                idArray[1] = idArray[1].split(".")[1];
                                let newID = idArray[0] + "." + idArray[1] + "_" + idArray[2];
                                delete repeaterFieldValue[id];
                                id = newID;
                            }
                            repeaterFieldValue[id] = {
                                "value": value,
                                "id": id
                            }
                            if (field.get('type') === "file_upload" && field.get('value')) {
                                repeaterFieldValue[id].files = field.attributes.files;
                            }
                        });

                        repeaterFieldModel.set('isUpdated', false);
                        //Update repeater field value with repeaterFieldValue 
                        nfRadio.channel('nfAdmin').request('update:field', repeaterFieldModel, repeaterFieldValue);
                    }
                });
            }
        },

    });

    return model;
});