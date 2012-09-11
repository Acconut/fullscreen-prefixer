(function( w, d ) {
    
    // get document
    d = d || w.document;
    
    // create an example element
    var e = d.createElement("div");
    
    // if fullscreen is supported stop
    if(e.requestFullScreen) return;
    
    // prefix
    var p = "";
    
    if(e.mozRequestFullScreen) p = "moz"
    else if(e.webkitRequestFullscreen) p = "webkit"
    else return;
    
    // document.fullscreenEnabled
    d.fullscreenEnabled = d[p + ((p === "moz") ? "FullScreenEnabled" : "FullscreenEnabled")];
    
    // document.fullscreenElement
    d.fullscreenElement = null;
    
    // Element.requestFullscreen polyfill
    Element.prototype.requestFullscreen = function() {
        
        // document.fullscreenElement
        d.fullscreenElement = this;
        
        return this[p + "RequestFullScreen"]();
        
    };
    
    // document.exitFullscreen
    d.exitFullscreen = function() {
        
        // document.fullscreenElemnt
        d.fullscreenElement = null;
        
        d[p + "CancelFullScreen"]();
    }
    
    // Event : fullscreenchange
    var fschangeevt = d.createEvent("Event");
    fschangeevt.initEvent("fullscreenchange", true, true);
    document.addEventListener(p + "fullscreenchange", function() {

        d.dispatchEvent(fschangeevt);
        
    });
    
    // Event : fullscreenerror
    var fserrorevt = d.createEvent("Event");
    fserrorevt.initEvent("fullscreenerror", true, true);
    document.addEventListener(p + "fullscreenerror", function() {

        d.dispatchEvent(fserrorevt);
        
    });
    
})( window );