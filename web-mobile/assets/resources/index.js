System.register("chunks:///_virtual/br.ts",["cc"],(function(e){var a;return{setters:[function(e){a=e.cclegacy}],execute:function(){a._RF.push({},"5be50sI8r9MUq7gBwOQ72PK","br",void 0);var o=window,t=e("languages",{help:{title:"Regras",desc1:"APOSTA",desc2:"Durante o tempo permitido para apostas, clique em Apostar para fazer sua aposta. Após o término do tempo de apostas, o foguete decolará.",next:"Próxima página",desc3:"SAQUE",desc4:"Antes do foguete explodir, você pode clicar em SAQUE para retirar o lucro atual. Se você não tiver SAQUE antes da explosão, perderá todas as apostas desta rodada",close:"fecho"},game:{normal:"Normal",auto:"Auto",autoescape:"Retirada auto",bet:"APOSTA",betsucc:"APOSTA SUCC",escape:"SAQUE",prebet:"Aposte na próxima rodada",noprebet:"Cancelar aposta",mybet:"MINHA APOSTA",history:"HISTÓRIA",roundid:"ID redondo",time:"Tempo",bets:"APOSTA",result:"Resultado",profit:"Lucro",startauto:"COMEÇAR",stopauto:"PARAR",autoplay:"Automação",stopbywin:"pare quando ganhar",stopbylose:"pare quando perder",reset:"Reiniciar",increase:"Aumentar",bywin:"ao vencer",bylose:"ao perder",savesetting:"salvar"}});o.languages||(o.languages={}),o.languages.br=t,a._RF.pop()}}}));

System.register("chunks:///_virtual/co.ts",["cc"],(function(e){var a;return{setters:[function(e){a=e.cclegacy}],execute:function(){a._RF.push({},"edb3bgY6PRL1JkE/0kj9sm5","co",void 0);var t=window,s=e("languages",{help:{title:"Regla",desc1:"APUESTA",desc2:"Durante el tiempo permitido para apostar, haga clic en Apostar para realizar su apuesta. Una vez finalizado el tiempo de apuestas, el cohete despegará.",next:"Siguiente página",desc3:"SAQUE",desc4:"Antes de que el cohete explote, puedes hacer clic en RETIRAR para retirar tus ganancias actuales. Si no tienes RETIRAR antes de la explosión, perderás todas las apuestas de esta ronda.",close:"cierre"},game:{normal:"Normal",auto:"Auto",autoescape:"Retiro auto",bet:"APUESTA",betsucc:"APUESTA SUCC",escape:"RETIRAR",prebet:"Apuesta en la siguiente ronda",noprebet:"Cancelar apuesta",mybet:"MI APUESTA",history:"HISTORIA",roundid:"ID redonda",time:"Tiempo",bets:"APUESTA",result:"Resultado",profit:"Ganancia",startauto:"COMENZAR",stopauto:"DETENER",autoplay:"Automatica",stopbywin:"detenerse al ganar",stopbylose:"detenerse al perder",reset:"Reiniciar",increase:"Aumentar",bywin:"al ganar",bylose:"al perder",savesetting:"ahorrar"}});t.languages||(t.languages={}),t.languages.co=s,a._RF.pop()}}}));

System.register("chunks:///_virtual/resources",["./br.ts","./co.ts","./zn.ts"],(function(){return{setters:[null,null,null],execute:function(){}}}));

System.register("chunks:///_virtual/zn.ts",["cc"],(function(e){var t;return{setters:[function(e){t=e.cclegacy}],execute:function(){t._RF.push({},"3b7860dNwBEwLQ0cB1nU2wa","zn",void 0);var s=window,n=e("languages",{help:{title:"规则",desc1:"说明1",desc2:"在允许投注的时间内，点击投注进行下注，待投注时间结束后，火箭将起飞",next:"下一页",desc3:"说明2",desc4:"火箭在为爆炸前，你可以点击提款来取走当前的盈利。如果在爆炸前你没有提款，你将失去本轮的所有押注",close:"关闭"},game:{normal:"普通",auto:"自动",autoescape:"自动逃离",bet:"下注",betsucc:"下注成功",escape:"逃离",prebet:"预下注",noprebet:"取消预下注",mybet:"我的下注",history:"历史记录",roundid:"局号",time:"时间",bets:"下注数量",result:"结果",profit:"获得数量",startauto:"开始自动",stopauto:"停止自动",autoplay:"自动玩法",stopbywin:"stop when winning",stopbylose:"stop when losing",reset:"Reset",increase:"Increase",bywin:"By winning",bylose:"By losing",savesetting:"保存设置"}});s.languages||(s.languages={}),s.languages.zn=n,t._RF.pop()}}}));

(function(r) {
  r('virtual:///prerequisite-imports/resources', 'chunks:///_virtual/resources'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});