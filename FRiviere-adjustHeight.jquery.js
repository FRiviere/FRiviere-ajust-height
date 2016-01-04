(function( $ ) {
    $.fn.FRresize = function( options ) {

        var item = $(this); //Elemement d'origine à resizer

        options = $.extend({
            onLoad: true,
            defaultCss: 'min-height',
            responsiveScreen: {
                0:  'everytime',
                768: 'screen',
                992: 'screen',
                1200: 'screen'
            },
            lineResize: false
        }, options);

        var optionsOnLoad = options.onLoad;
        var optionsDefaultCss = options.defaultCss;
        var optionsResponsiveScreen = options.responsiveScreen;
        var optionsLineResize = options.lineResize;

        var resize = function() {};

        var allElemMaxHeight = 0;
        var lineBiggerHeight = 0;

        function dataAllItem() {
            allElemMaxHeight = 0;
            var FRitems = [];
            item.each(function(i){
                var thisItem = $(this);
                FRitems[i] = [];
                FRitems[i]['ITEM'] = this;
                FRitems[i]['HEIGHT'] = thisItem.outerHeight();
                FRitems[i]['ITEMTORESIZE'] = itemToResize(thisItem);
                FRitems[i]['CSSTOCHANGE'] = cssToChange(thisItem);
                FRitems[i]['OLDCSSVALUE'] = oldCssValue(thisItem);

                if (optionsLineResize) {

                }
                if ( FRitems[i].HEIGHT > allElemMaxHeight ) {
                    allElemMaxHeight = FRitems[i].HEIGHT;
                }
            });
            return FRitems;
        }

        resize.prototype.items = dataAllItem();
        resize.prototype.allElemMaxHeight = allElemMaxHeight;
        resize.prototype.whichScreen = whichScreen();

        console.log(resize.prototype);

        function itemToResize(elem) {
            var elemToResize = elem.find('.elem-to-resize');
            if (elemToResize.length > 0) {
                return elemToResize[0]
            } else {
                return elem[0]
            }
        }
        function cssToChange(elem) {
            var cssToChange = elem.data('newheight');
            if ( cssToChange ) {
                return cssToChange;
            } else {
                return optionsDefaultCss;
            }
        }
        function oldCssValue(elem) {
            return parseInt($(itemToResize(elem)).css(cssToChange(elem)).replace('px', ''));
        }
        function getWindowWidth() {
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
        }
        function whichScreen() {
            var screenSizeBeforeResize = getWindowWidth();
            var thisNewScreen;
            for ( var thisScreen in optionsResponsiveScreen ) {
                if (optionsResponsiveScreen.hasOwnProperty(thisScreen)) {
                    if (screenSizeBeforeResize >= thisScreen ) {
                        thisNewScreen = thisScreen;
                    }
                }
            }
            return parseInt(thisNewScreen);
        }





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
}( jQuery ));