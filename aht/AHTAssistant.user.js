// ==UserScript==
// @name         AHT Recaptcha Assistant
// @namespace    http://tampermonkey.net/
// @updateURL    https://ditroxs.github.io/aht/AHTAssistant.user.js
// @downloadURL  https://ditroxs.github.io/aht/AHTAssistant.user.js
// @version      0.1.0
// @description  try to take over the world!
// @author       DitroXS
// @match        http://*/*
// @match        https://*/*
// @connect      ditroxs.github.io
// @connect      apps.facebook.com
// @connect      twitch.tv
// @connect      dc4u.eu
// @connect      dc4in.com
// @connect      vina-full.com
// @connect      dc-canvas.socialpointgames.com
// @run-at document-start
// ==/UserScript==

(function() {
    'use strict';
    var a = setInterval(function(){
        try{
            document.querySelector("#buster-button").click();
            clearInterval(a);
        }catch(e){
        }
    },1000);
})();
