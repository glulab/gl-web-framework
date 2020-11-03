/* jshint esversion: 6 */
// import 'external';

import $ from 'jquery';

export class GlFramework {

    consoleLog(log = '') {
        if (this.debug) {
            console.log('GlFramework: ' + log);
        }
    }
    
    constructor(options) {
        
        this.debug = typeof window.debug !== 'undefined' ? window.debug : false;
        
        this.defaults = {
            el: 'body',
        };
        
        // merge options with defaults
        this.options = $.extend({}, this.defaults, options);
        
        // merge this.option to this
        $.extend(this, this.options);
        
        this.$el = $(this.el);
    }
    
    init() {
        if (this.check()) {
            this.prepare();
            this.run();
        }
    }
    
    check() {
        return this.$el.length;
    }
    
    prepare() {
        this.consoleLog('prepare [jquery: ' + $().jquery + ']');
        
        this.$window = $(window);
        this.$document = $(document);
    }
    
    run() {
        this.consoleLog('run [jquery: ' + $().jquery + ']');
        this.execute();
    }
    
    onWindowResize() {
        if (!this.check()) {
            return;
        }
        // this.execute();
        this.jumpOutOfTheContainer(2560);
    }
    
    execute() {
        this.externalLinks();
        this.moveElements();
        this.jumpOutOfTheContainer(2560);
    }
    
    
    ////////////////////
    // externalLinks  //
    ////////////////////
    
    externalLinks() {
        
        this.consoleLog('externalLinks');
        
        $('a[href^="http"]:not([href*="' + document.domain + '"])').each(function () {
            $(this).attr("target", "_blank");
        });
    }
    
    
    ///////////////////
    // move elements //
    ///////////////////
    
    moveElements() {
        
        this.consoleLog('moveElements');
        
        $('[data-insert-before]').each((index, Element) => {
            $(Element).insertBefore($(Element).data('insertBefore'));
        });
        
        $('[data-insert-after]').each((index, Element) => {
            $(Element).insertAfter($(Element).data('insertAfter'));
        });
        
        $('[data-append-to]').each((index, Element) => {
            $(Element).appendTo($(Element).data('appendTo'));
        });
        
        $('[data-pepend-to]').each((index, Element) => {
            $(Element).prependTo($(Element).data('prependTo'));
        });
    }
    
    
    ///////////////////////////////
    // jump out of the container //
    ///////////////////////////////
    
    jumpOutOfTheContainer(maxWidth, el = '.jump-out-of-container') {
        
        this.consoleLog('jumpOutOfTheContainer');
        
        let getMaxWidth = () => {
            
            let mw = this.$document.width();
            
            if (typeof maxWidth !== 'undefined' && maxWidth < mw) {
                mw = maxWidth;
            }
            
            return mw;
        };
            
        let $el = $(el);
        
        $el.each((index, Element) => {
            
            let $e = $(Element);
            
            $e.css('opacity', '0');
            $e.css('transition', 'all .5s');
            
            $e.css('display', 'block');
            $e.css('width', 'auto');
            
            let offset = (getMaxWidth() - $e.width()) / 2;
            
            $e.css('width', getMaxWidth() + 'px');
            // $e.css('transform', 'translateX(-' + offset + 'px)');
            $e.css('left', '-' + offset + 'px');
            // $e.css('visibility', 'visible');
            $e.css('opacity', '1');
            // $e.animate({'visibility': 'visible'}, 500, 'swing',  {});
            
        });
    }
}

///////////
// init  //
///////////

let xGlFramework = new GlFramework();

$(() => {
    xGlFramework.init();
});

export default xGlFramework;
