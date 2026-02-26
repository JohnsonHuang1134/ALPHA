define('views/fieldRepeaterLayout', ['views/fieldRepeaterSetCollection'], function(repeaterSetCollection) {

    var view = Marionette.LayoutView.extend({
        tagName: 'div',
        template: '#tmpl-nf-field-repeater',

        regions: {
            sets: '.nf-repeater-fieldsets',
        },

        initialize: function() {

            this.collection = this.model.get('sets');

            this.listenTo(nfRadio.channel('field-repeater'), 'rerender:fieldsets', this.render);

        },

        onRender: function() {
            this.sets.show(new repeaterSetCollection({
                collection: this.collection
            }));
        },

        templateHelpers: function() {
            return {
                maybeFilterHTML: function() {
                    return typeof nfFrontEnd.filter_esc_status !== "undefined" ? nfFrontEnd.filter_esc_status : "false";
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
                        fieldDescription.appendChild(descriptionText);
                        return fieldDescription.outerHTML;
                    } else {
                        return '';
                    }
                },
            }
        },

        events: {
            'click .nf-add-fieldset': 'addSet'
        },

        addSet: function() {
            nfRadio.channel('field-repeater').trigger('add:fieldset', this.model.id);
        },

        beforeSubmit: function() {
            this.collection.beforeSubmit(this.model.get('sets'));
        }


    });

    return view;
});