const {ipcRenderer}=require('electron');
window.onload=function(){
  let logged;
  console.log(location.hostname);
  switch(location.hostname){
    case "giveaway.su":
      logged = document.querySelectorAll("#header .steam-login");
      if(logged.length!=0){
        logged[0].click();
      } else {
        var giveaways = document.querySelectorAll(".giveaway-item");
        //check if not yet claimed ??storing ids
        if(location.pathname==="/"){
        //  giveaways[0].click();
        } else if(location.pathname.includes("/giveaway/view/")){
          var keys=document.querySelectorAll(".giveaway-key input");
          if(keys.length!=0){
            //site,id,nombre,key
            var o = new Object();
            o.id = parseInt(location.pathname.split("/")[3]);
            o.parent = location.hostname;
            o.name = document.title.split('"')[1];
            o.key = keys[0].value;
            ipcRenderer.send('saveKey',o);
          } else {
            var actions = document.querySelectorAll(".giveaway-actions");
            if(actions.length>0){
              actions = actions[0].querySelector("#actions");
              var trs = actions.getElementsByTagName("tr");
              for(var t=0;t<trs.length;t++){
            //    trs[t].querySelectorAll("td")[2].children[0].click();
              }
            } else {
              alert("not loaded");
            }
          }
        }
      }
      break;
    case "marvelousga.com":
      logged = document.querySelectorAll('a[href="https://marvelousga.com/login"]');
      if(logged.length!=0){
        logged[0].click();
      } else {
        if(location.pathname==="/login"){
          document.querySelector('a[href="https://marvelousga.com/auth/steam"]').click();
        } else if(location.pathname.includes("/giveaway/")){
          var gameName = document.querySelector("body > main > div.container > div:nth-child(2) > div > h3").textContent;
          var gameKey = null;
          if(document.querySelectorAll("body > main > div.container > div:nth-child(4) > div > div > div")!=undefined){
            gameKey = document.querySelector("body > main > div.container > div:nth-child(4) > div > div > div").lastChild.textContent.trim();
            ipcRenderer.send('saveGame', {name:gameName,key:gameKey,location:location.hostname});
            window.location.href="/";
          } else {
            var tasks = document.querySelectorAll(".container_task");
            for(var t=0;t<tasks.length;t++){
              document.querySelectorAll(".container_task")[t].querySelector(".card-text.monospace a").click();
            }
          }
        } else {
          var whichAction = ipcRenderer.sendSync('getData', location.hostname+"-action");
          if(whichAction==null){
            whichAction=0;
          }
          ipcRenderer.send('setData', location.hostname+"-action",whichAction+1);
          var actions = document.querySelectorAll(".row.mt-4 a");
          if(actions.length>0 && whichAction<actions.length){
            actions[whichAction].click();
          }
        }
      }
      break;
    case "steamcommunity.com":
      logged = document.querySelectorAll("#imageLogin");
      if(logged.length!=0){
        logged[0].click();
      }
      break;
  }

}
