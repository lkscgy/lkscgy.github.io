function InitTonWallet(){window.TonWallet=new TON_CONNECT_UI.TonConnectUI({manifestUrl:"https://www.pears.work/tonconnect-manifest.json",actionsConfiguration:{twaReturnUrl:"https://t.me/lkteswebapp_bot"}}),window.addEventListener("ton-connect-ui-connection-started",n=>{console.log("\u5f00\u59cb\u8fde\u63a5",n.detail)}),window.addEventListener("ton-connect-ui-connection-completed",n=>{console.log("\u8fde\u63a5\u6210\u529f",n.detail)}),window.addEventListener("ton-connect-ui-connection-error",n=>{console.log("\u8fde\u63a5\u5931\u8d25",n.detail)}),window.addEventListener("ton-connect-ui-disconnection",n=>{console.log("\u65ad\u5f00\u8fde\u63a5",n.detail)}),window.addEventListener("ton-connect-ui-transaction-sent-for-signature",n=>{console.log("\u53d1\u9001\u4ea4\u6613",n.detail)}),window.addEventListener("ton-connect-ui-transaction-signed",n=>{console.log("\u4ea4\u6613\u53d1\u9001\u6210\u529f",n.detail)}),window.addEventListener("ton-connect-ui-transaction-signing-failed",n=>{console.log("\u4ea4\u6613\u53d1\u9001\u5931\u8d25",n.detail)})}window.display=cc.winSize,window.canUpdateElapsed=!1,window.RoomOffLine=!1,window.FishFightSceneHouTai=!1,window.AutoCheckRedPacketTypeIndex=0,window.RedPacketOpenEffectViewShowAni=!1,window.newPlayRedpacketRoomID=1901,window.G_isOffline=!1,window.G_isOfflineCC=!1,window.G_isOfflineHT=!1,window.ChannelID=1001,window.GLanguage="zh",window.LobbyServerAddr="wss://h5fish.pears.work:1600",window.PayServerAddr="https://wxauth.11478.com:2013/";