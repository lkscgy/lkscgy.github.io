function InitTonWallet(){window.TonWallet=new TON_CONNECT_UI.TonConnectUI({manifestUrl:"https://www.pears.work/tonconnect-manifest.json",actionsConfiguration:{twaReturnUrl:"https://t.me/lkfishgamebot/start"}}),window.addEventListener("ton-connect-ui-transaction-sent-for-signature",n=>{console.log("transaction-sent-for-signature",n)}),window.addEventListener("ton-connect-ui-transaction-signed",n=>{console.log("transaction-signed",n)}),window.addEventListener("ton-connect-ui-transaction-signing-failed",n=>{console.log("transaction-signing-failed",n)})}window.display=cc.winSize,window.canUpdateElapsed=!1,window.RoomOffLine=!1,window.FishFightSceneHouTai=!1,window.AutoCheckRedPacketTypeIndex=0,window.RedPacketOpenEffectViewShowAni=!1,window.newPlayRedpacketRoomID=1901,window.G_isOffline=!1,window.G_isOfflineCC=!1,window.G_isOfflineHT=!1,window.ChannelID=1001,window.GLanguage="zh",window.LobbyServerAddr="wss://h5fish.pears.work:1600",window.PayServerAddr="https://wxauth.11478.com:2013/";