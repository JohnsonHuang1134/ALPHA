/**
 * When a form is loaded, enable any help text that appears on the page.
 */
define('controllers/helpText', [], function() {
    var controller = Marionette.Object.extend({
        initialize: function() {
            this.listenTo(nfRadio.channel('form'), 'render:view', this.initHelpText);

            nfRadio.channel('form').reply('init:help', this.initHelpText);
        },

        initHelpText: function(view) {
            jQuery(view.el).find('.nf-help').each(function() {
                var jBox = jQuery(this).jBox('Tooltip', {
                    theme: 'TooltipBorder',
                    content: jQuery(this).data('text'),
                    trigger: 'mouseenter focus',
                    closeOnMouseleave: true,
                    closeOnClick: true
                });
                // Hide tooltip on keydown and mouseleave
                jQuery(this).on('keydown mouseleave', function() {
                    jBox.close();
                });
            });
        }
    });

    return controller;
});