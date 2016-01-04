(function( $ ) {
    $.fn.FRresize = function( options ) {

        var item = $(this); //Elemement d'origine à resizer
        var items = {
            allItems: item
        };
        var ALLITEM = items.allItems;

        var FRresize = function() {};

        var newResize = new FRresize();

        var biggerHeight;
        biggerHeight = 0;

        //Si il y à vraiment des elements à resizer
        if (item.length > 1) {

            options = $.extend({
                onLoad: true,
                responsive: false,
                responsiveBootstrap: {
                    screenXs: 480,
                    screenSm: 768,
                    screenMd: 992,
                    screenLg: 1200
                },
                resizeXs: false
            }, options);

            FRresize.prototype.whatOptions = function () {
                return options;
            };

            FRresize.prototype.elemToResize = function(elem) {
                var elemToResize = $(elem).find('.elem-to-resize');
                if (elemToResize.length > 0) {
                    return elemToResize
                } else {
                    return $(elem)
                }
            };
            FRresize.prototype.cssToChange = function(elem) {
                var cssToChange = FRresize.prototype.elemToResize(elem).data('newheight');
                if ( cssToChange ) {
                    return cssToChange;
                } else {
                    return 'height';
                }
            };
            FRresize.prototype.getBiggerValue = function(elem) {
                biggerHeight = 0;
                var itemHeight;
                var i;
                for (i = 0; i < elem.length; i++) {
                    itemHeight = $(elem[i]).outerHeight();
                    if (itemHeight > biggerHeight) {
                        biggerHeight = itemHeight;
                    }
                }
                return biggerHeight;
            };
            FRresize.prototype.getWindowWidth = function() {
                var windowWidth = 0;
                if (typeof(window.innerWidth) == 'number') {
                    windowWidth = window.innerWidth;
                }
                else {
                    if (document.documentElement && document.documentElement.clientWidth) {
                        windowWidth = document.documentElement.clientWidth;
                    }
                    else {
                        if (document.body && document.body.clientWidth) {
                            windowWidth = document.body.clientWidth;
                        }
                    }
                }
                return windowWidth;
            };
            console.log(newResize);
            FRresize.prototype.wichScreen = function() {
                var screenSizeBeforeResize = FRresize.prototype.getWindowWidth();
                if ( screenSizeBeforeResize < options.responsiveBootstrap.screenSm ) {
                    return 'screenXs'
                } else if ( screenSizeBeforeResize >= options.responsiveBootstrap.screenSm && screenSizeBeforeResize < options.responsiveBootstrap.screenMd ) {
                    return 'screenSm'
                } else if (screenSizeBeforeResize >= options.responsiveBootstrap.screenMd && screenSizeBeforeResize < options.responsiveBootstrap.screenLg ) {
                    return 'screenMd'
                } else if ( screenSizeBeforeResize >= options.responsiveBootstrap.screenLg ) {
                    return 'screenLg'
                }
            };

            function removeAllStyle(elem) {
                biggerHeight = 0;
                var i;
                for (i = 0; i < elem.length; i++) {
                    var thisElem = $(elem[i]);
                    var cssToChange = FRresize.prototype.cssToChange(thisElem);
                    thisElem.css(cssToChange, '')
                }
            }
            function startResize(elem) {
                biggerHeight = FRresize.prototype.getBiggerValue(elem);

                var i;
                for (i = 0; i < elem.length; i++) {

                    var thisElem = $(elem[i]);
                    var thisElemToChange = FRresize.prototype.elemToResize(thisElem);
                    var cssToChange = FRresize.prototype.cssToChange(thisElem);
                    var heightDiff = biggerHeight - thisElem.outerHeight();

                    var oldCssValue = parseInt(thisElemToChange.css(cssToChange).replace('px', ''));
                    var newCssValue = oldCssValue + heightDiff;

                    thisElemToChange.css(cssToChange, newCssValue + 'px');
                }
            }
            var wichScreenBeforeResize = FRresize.prototype.wichScreen();
            if (options.onLoad) {
                if ( wichScreenBeforeResize != 'screenXs' || (wichScreenBeforeResize != 'screenXs' && options.resizeXs )) {
                    startResize(ALLITEM);
                }
            }
            if (options.responsive) {
                $(window).resize(function () {
                    var wichScreenduringResize = FRresize.prototype.wichScreen();

                    if ( wichScreenduringResize != wichScreenBeforeResize &&  wichScreenduringResize != 'screenXs') {
                        removeAllStyle(ALLITEM);
                        startResize(ALLITEM);
                        wichScreenBeforeResize = FRresize.prototype.wichScreen();
                    } else if ( wichScreenduringResize == 'screenXs' ) {
                        removeAllStyle(ALLITEM);

                        if (options.resizeXs) {
                            startResize(ALLITEM);
                        } else {
                            removeAllStyle(ALLITEM)
                        }
                    }
                });
            }
        }
    }
}( jQuery ));