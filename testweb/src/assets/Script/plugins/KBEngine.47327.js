(function(t){"use strict";t.KBEngine={},KBEngine.PUBLISH=0,KBEngine.DEBUG=1,KBEngine.is_publish=KBEngine.DEBUG,KBEngine.PACKET_MAX_SIZE=1500,KBEngine.PACKET_MAX_SIZE_TCP=1460,KBEngine.PACKET_MAX_SIZE_UDP=1472,KBEngine.MESSAGE_ID_LENGTH=2,KBEngine.MESSAGE_LENGTH_LENGTH=2,KBEngine.CLIENT_NO_FLOAT=0,KBEngine.KBE_FLT_MAX=3402823466e29,KBEngine.INT64=function(t,n){this.lo=t,this.hi=n,this.sign=1,n>=2147483648&&(this.sign=-1,this.lo>0?(this.lo=4294967296-this.lo&4294967295,this.hi=4294967295-this.hi):(this.lo=4294967296-this.lo&4294967295,this.hi=4294967296-this.hi)),this.toString=function(){var t="";this.sign<0&&(t+="-");var n=this.lo.toString(16),i=this.hi.toString(16);if(this.hi>0){t+=i;for(var e=8-n.length;e>0;--e)t+="0"}return t+n}},KBEngine.UINT64=function(t,n){this.lo=t,this.hi=n,this.toString=function(){var t=this.lo.toString(16),n=this.hi.toString(16),i="";if(this.hi>0){i+=n;for(var e=8-t.length;e>0;--e)i+="0"}return i+t}},KBEngine.INFO_MSG=function(t){KBEngine.is_publish!==KBEngine.PUBLISH&&console.info(t)},KBEngine.DEBUG_MSG=function(t){KBEngine.is_publish!==KBEngine.PUBLISH&&console.debug(t)},KBEngine.ERROR_MSG=function(t){KBEngine.is_publish!==KBEngine.PUBLISH&&console.error(t)},KBEngine.WARNING_MSG=function(t){KBEngine.is_publish!==KBEngine.PUBLISH&&console.warn(t)},KBEngine.utf8ArrayToString=function(t){var n,i,e,r,s,o;for(n="",e=t.length,i=0;i<e;)switch((r=t[i++])>>4){case 1:case 2:case 3:case 4:case 5:case 6:case 7:n+=String.fromCharCode(r);break;case 12:case 13:s=t[i++],n+=String.fromCharCode((31&r)<<6|63&s);break;case 14:s=t[i++],o=t[i++],n+=String.fromCharCode((15&r)<<12|(63&s)<<6|(63&o)<<0)}return n},KBEngine.stringToUTF8Bytes=function(t){for(var n=[],i=0;i<t.length;i++){var e=t.charCodeAt(i);e<128?n.push(e):e<2048?n.push(192|e>>6,128|63&e):e<55296||e>=57344?n.push(224|e>>12,128|e>>6&63,128|63&e):(i++,e=65536+((1023&e)<<10|1023&t.charCodeAt(i)),n.push(240|e>>18,128|e>>12&63,128|e>>6&63,128|63&e))}return n},KBEngine.EventInfo=function(t,n){this.callbackfn=n,this.classinst=t},KBEngine.Event=function(){this._events={},this.register=function(t,n,i){var e=i;if(void 0!==e){var r=this._events[t];void 0===r&&(r=[],this._events[t]=r);var s=new KBEngine.EventInfo(n,e);r.push(s)}else KBEngine.ERROR_MSG("KBEngine.Event::fire: not found callback("+n+")!"+i)},this.deregister=function(t,n){if(void 0!==this._events[t])for(var i=this._events[t],e=0,r=i.length;e<r;e++)if(i[e].classinst===n){i.splice(e,1);break}},this.fire=function(){if(arguments.length<1)KBEngine.ERROR_MSG("KBEngine.Event::fire: not found eventName!");else{var t=arguments[0],n=this._events[t];if(void 0!==n){var i,e,r=[];for(i=1,e=arguments.length;i<e;i++)r.push(arguments[i]);for(i=0,e=n.length;i<e;i++){var s=n[i];arguments.length<1?s.callbackfn.apply(s.classinst):s.callbackfn.apply(s.classinst,r)}}}}},KBEngine.Event=new KBEngine.Event,KBEngine.MemoryStream=function(t){this.rpos=0,this.wpos=0,this.init(t)},KBEngine.MemoryStream.prototype={constructor:KBEngine.MemoryStream,init:function(t){t instanceof ArrayBuffer?this.buffer=t:this.buffer=new ArrayBuffer(t),this.rpos=0,this.wpos=0},readInt8:function(){var t=new Int8Array(this.buffer,this.rpos,1);return this.rpos+=1,t[0]},readInt16:function(){var t=this.readUint16();return t>=32768&&(t-=65536),t},readInt32:function(){var t=this.readUint32();return t>=2147483648&&(t-=4294967296),t},readInt64:function(){return new KBEngine.INT64(this.readUint32(),this.readUint32())},readUint8:function(){var t=new Uint8Array(this.buffer,this.rpos,1);return this.rpos+=1,t[0]},readUint16:function(){var t=new Uint8Array(this.buffer,this.rpos);return this.rpos+=2,((255&t[1])<<8)+(255&t[0])},readUint32:function(){var t=new Uint8Array(this.buffer,this.rpos);return this.rpos+=4,(t[3]<<24)+(t[2]<<16)+(t[1]<<8)+t[0]},readUint64:function(){var t=new Uint32Array(this.buffer,this.rpos);return this.rpos+=8,t[0]+4294967296*t[1]},readFloat:function(){var t;try{t=new Float32Array(this.buffer,this.rpos,1)}catch(n){t=new Float32Array(this.buffer.slice(this.rpos,this.rpos+4))}return this.rpos+=4,t[0]},readDouble:function(){var t;try{t=new Float64Array(this.buffer,this.rpos,1)}catch(n){t=new Float64Array(this.buffer.slice(this.rpos,this.rpos+8),0,1)}return this.rpos+=8,t[0]},readString:function(t){for(var n=new Uint8Array(this.buffer,this.rpos),i=0,e="";;){if(0==n[i]){i++;break}if(e+=String.fromCharCode(n[i]),i++,this.rpos+i>=this.buffer.byteLength)throw new Error("KBEngine.MemoryStream::readString: rpos("+(this.rpos+i)+")>="+this.buffer.byteLength+" overflow!")}return this.rpos+=t||i,e},readStringUTF8:function(t){var n=new Uint8Array(this.buffer,this.rpos,t);return t&&(this.rpos+=t),KBEngine.utf8ArrayToString(n)},readStringGBK:function(t){for(var n=new Uint8Array(this.buffer,this.rpos),i=0;;){if(0===n[i]){i++,n.slice(0,i);break}if(i++,this.rpos+i>=this.buffer.byteLength)throw new Error("KBEngine.MemoryStream::readStringGBK: rpos("+(this.rpos+i)+") >= "+this.buffer.byteLength+" overflow!")}return this.rpos+=t,""},readBlob:function(){var t=this.readUint32(),n=new Uint8Array(this.buffer,this.rpos,t);return this.rpos+=t,n},readStream:function(){var t=new Uint8Array(this.buffer,this.rpos,this.buffer.byteLength-this.rpos);return this.rpos=this.buffer.byteLength,new KBEngine.MemoryStream(t)},writeInt8:function(t){new Int8Array(this.buffer,this.wpos,1)[0]=t,this.wpos+=1},writeInt16:function(t){this.writeInt8(255&t),this.writeInt8(t>>8&255)},writeInt32:function(t){for(var n=0;n<4;n++)this.writeInt8(t>>8*n&255)},writeInt64:function(t){this.writeInt32(t.lo),this.writeInt32(t.hi)},writeUint8:function(t){new Uint8Array(this.buffer,this.wpos,1)[0]=t,this.wpos+=1},writeUint16:function(t){this.writeUint8(255&t),this.writeUint8(t>>8&255)},writeUint32:function(t){for(var n=0;n<4;n++)this.writeUint8(t>>8*n&255)},writeUint64:function(t){this.writeUint32(t.lo),this.writeUint32(t.hi)},writeFloat:function(t){var n;try{(n=new Float32Array(this.buffer,this.wpos,1))[0]=t}catch(r){(n=new Float32Array(1))[0]=t;var i=new Uint8Array(this.buffer),e=new Uint8Array(n.buffer);i.set(e,this.wpos)}this.wpos+=4},writeDouble:function(t){var n;try{(n=new Float64Array(this.buffer,this.wpos,1))[0]=t}catch(r){(n=new Float64Array(1))[0]=t;var i=new Uint8Array(this.buffer),e=new Uint8Array(n.buffer);i.set(e,this.wpos)}this.wpos+=8},writeBlob:function(t){var n=t.length;if(n+4>this.space())KBEngine.ERROR_MSG("memorystream::writeBlob: no free!");else{this.writeUint32(n);var i=new Uint8Array(this.buffer,this.wpos,n);if("string"==typeof t)for(var e=0;e<n;e++)i[e]=t.charCodeAt(e);else for(e=0;e<n;e++)i[e]=t[e];this.wpos+=n}},writeString:function(t){if(t.length>this.space())KBEngine.ERROR_MSG("memorystream::writeString: no free!");else{for(var n=new Uint8Array(this.buffer,this.wpos),i=0,e=KBEngine.stringToUTF8Bytes(t),r=0,s=e.length;r<s;r++)n[i++]=e[r];n[i++]=0,this.wpos+=i}},readSkip:function(t){this.rpos+=t},space:function(){return this.buffer.byteLength-this.wpos},length:function(){return this.wpos-this.rpos},readEOF:function(){return this.buffer.byteLength-this.rpos<=0},done:function(){this.rpos=this.wpos},getbuffer:function(){return this.buffer.slice(this.rpos,this.wpos)}},KBEngine.Bundle=function(){this.stream=new KBEngine.MemoryStream(KBEngine.PACKET_MAX_SIZE_TCP)},KBEngine.Bundle.prototype={constructor:KBEngine.Bundle,newMessage:function(){},send:function(t){t.send(this.stream.getbuffer())},writeInt8:function(t){this.stream.writeInt8(t)},writeInt16:function(t){this.stream.writeInt16(t)},writeInt32:function(t){this.stream.writeInt32(t)},writeInt64:function(t){this.stream.writeInt64(t)},writeUint8:function(t){this.stream.writeUint8(t)},writeUint16:function(t){this.stream.writeUint16(t)},writeUint32:function(t){this.stream.writeUint32(t)},writeUint64:function(t){this.stream.writeUint64(t)},writeFloat:function(t){this.stream.writeFloat(t)},writeDouble:function(t){this.stream.writeDouble(t)},writeString:function(t,n){var i=KBEngine.stringToUTF8Bytes(t).length,e=n||i+1;if(this.stream.writeString(t),n)for(var r=i+1;r<e;r++)this.writeUint8(0)},writeBlob:function(t){this.stream.writeBlob(t)},writeUint8Array:function(t){for(var n=0,i=t.length;n<i;n++)this.writeUint8(t[n])}},KBEngine.KBEngineApp=function(){this.username=null,this.password=null,this.ip=null,this.port=null,this.onopencb=null,this.onclosecb=null,this.socket=null,this.stream=null,this.net=new KBEngine.Net(this),this.addr="",this.wssAddr=""},KBEngine.KBEngineApp.prototype={constructor:KBEngine.KBEngineApp,init:function(){this.net=new KBEngine.Net(this)},reset:function(){if(void 0!==this.socket&&null!==this.socket){var t=this.socket;t.onclose=function(){},this.socket=null,t.close()}void 0!==this.net&&null!==this.net&&this.net.reset()},connect:function(t){var n;if(alert("connect11"),void 0!==t&&(this.onopencb=t),this.wssAddr)n=this.wssAddr;else{if(!this.ip||!this.port||0===this.ip.length)return void KBEngine.ERROR_MSG("wrong ip or port: "+this.ip+" "+this.port);n="ws://"+this.ip+":"+this.port}alert("connect22"),KBEngine.INFO_MSG(n),this.addr=n;try{this.socket=new WebSocket(n)}catch(e){return KBEngine.ERROR_MSG("WebSocket init error!"),void KBEngine.ERROR_MSG(e)}alert("connect33");var i=this.socket;i.binaryType="arraybuffer",i.onopen=this.onopen.bind(this),i.onerror=this.onerror_before_onopen.bind(this),i.onmessage=this.onmessage.bind(this),i.onclose=this.onclose.bind(this)},setOnopenCallback:function(t){this.onopencb=t},setOncloseCallback:function(t){this.onclosecb=t},onmessage:function(t){alert("onmessage"),null!==this.stream?this.stream.init(t.data):this.stream=new KBEngine.MemoryStream(t.data);var n=this.stream,i=(n.readUint16(),n.readUint8(),n.readUint8(),n.readUint16()),e=n.readUint16();this.net.handleMessage(i,e,n)},disconnect:function(){try{if(null!=this.socket){var t=this.socket;this.socket=null,t.close(),KBEngine.INFO_MSG("disconnect!")}}catch(n){}},onopen:function(){alert("open"),KBEngine.INFO_MSG("connect success!"),this.socket.onerror=this.onerror_after_onopen,this.onopencb&&this.onopencb()},onerror_before_onopen:function(t){alert(t.data),KBEngine.ERROR_MSG("beforeconnect error:"+t.data),this.close()},onerror_after_onopen:function(t){KBEngine.ERROR_MSG("afterconnect error:"+t.data)},onclose:function(){alert("onclose"),KBEngine.INFO_MSG("connect close"),this.onclosecb&&this.onclosecb(),this.reset(),KBEngine.Event.fire("onclose")},send:function(t){this.socket.send(t)},close:function(){KBEngine.INFO_MSG("close socket"),this.reset()}},KBEngine.createApp=function(){return new KBEngine.KBEngineApp},KBEngine.destroyApp=function(t){t&&t.close()},KBEngine.CmdInfo=function(t,n,i){this.target=t,this.funcName=n,this.protocol=i},KBEngine.Net=function(t){this._callClientFuncs={},this._callServerFuncs={},this._funcName2Info={},this.network=t,this.m_dwSendXorKey=0,this.m_dwRecvXorKey=0,this.m_dwSendPacketCount=0,this.m_cbSendRound=0,this.m_cbRecvRound=0},t.CMD_Info={argTypes:[{name:"wDataSize",type:"UINT16"},{name:"cbCheckCode",type:"UINT8"},{name:"cbMasterOrder",type:"UINT8"}],size:function(){return 4},write2bundle:function(t,n,i,e){t.writeUint16(n),t.writeUint8(i),t.writeUint8(e)}},t.CMD_Command={argTypes:[{name:"wMainCmdID",type:"UINT16"},{name:"wSubCmdID",type:"UINT16"}],size:function(){return 4},write2bundle:function(t,n,i){t.writeUint16(n),t.writeUint16(i)}},KBEngine.Net.prototype={constructor:KBEngine.Net,registerServer:function(){var t=arguments[0],n=arguments[1],i=arguments[2],e=i.mainCmdID,r=i.subCmdID,s=this._callClientFuncs[e];void 0===s&&(s={},this._callClientFuncs[e]=s),s[r]=new KBEngine.CmdInfo(t,n,i)},handleMessage:function(t,n,i){if(!this._callClientFuncs[t]||!this._callClientFuncs[t][n])return KBEngine.ERROR_MSG("mainCmdID: "+t),KBEngine.ERROR_MSG("subCmdID: "+n),void KBEngine.INFO_MSG("__________________________________");var e=this._callClientFuncs[t][n],r=e.target,s=e.funcName,o=e.protocol,h=[];if(o.createFromStream(i,h),h.length<=4)r[s].apply(r,h);else{for(var f={},a=0,c=o.argTypes.length;a<c;a++)f[o.argTypes[a].name]=h[a];r[s].call(r,f)}},registerClient:function(){var t=arguments[0],n=arguments[1],i=arguments[2],e=new KBEngine.CmdInfo(t,n,i);this._funcName2Info[n]=e},callServer:function(){var t=arguments[0],n=this._funcName2Info[t],i=n.protocol,e=Array.prototype.splice.call(arguments,1),r=new KBEngine.Bundle;r.newMessage();var s=CMD_Info.size()+CMD_Command.size()+i.size(e);CMD_Info.write2bundle(r,s,0,65),CMD_Command.write2bundle(r,i.mainCmdID,i.subCmdID),i.write2bundle(r,e),r.send(this.network)},removeServer:function(t,n){var i=this._callClientFuncs[t];i&&i[n]&&delete i[n]},removeClient:function(t,n){var i=this._callServerFuncs[t];i&&i[n]&&delete i[n]},reset:function(){this._callClientFuncs={},this._callServerFuncs={},this._funcName2Info={},this.network=null}},t.MD5={safeAdd:function(t,n){var i=(65535&t)+(65535&n);return(t>>16)+(n>>16)+(i>>16)<<16|65535&i},bitRotateLeft:function(t,n){return t<<n|t>>>32-n},md5cmn:function(t,n,i,e,r,s){return this.safeAdd(this.bitRotateLeft(this.safeAdd(this.safeAdd(n,t),this.safeAdd(e,s)),r),i)},md5ff:function(t,n,i,e,r,s,o){return this.md5cmn(n&i|~n&e,t,n,r,s,o)},md5gg:function(t,n,i,e,r,s,o){return this.md5cmn(n&e|i&~e,t,n,r,s,o)},md5hh:function(t,n,i,e,r,s,o){return this.md5cmn(n^i^e,t,n,r,s,o)},md5ii:function(t,n,i,e,r,s,o){return this.md5cmn(i^(n|~e),t,n,r,s,o)},binlMD5:function(t,n){var i,e,r,s,o;t[n>>5]|=128<<n%32,t[14+(n+64>>>9<<4)]=n;var h=1732584193,f=-271733879,a=-1732584194,c=271733878;for(i=0;i<t.length;i+=16)e=h,r=f,s=a,o=c,h=this.md5ff(h,f,a,c,t[i],7,-680876936),c=this.md5ff(c,h,f,a,t[i+1],12,-389564586),a=this.md5ff(a,c,h,f,t[i+2],17,606105819),f=this.md5ff(f,a,c,h,t[i+3],22,-1044525330),h=this.md5ff(h,f,a,c,t[i+4],7,-176418897),c=this.md5ff(c,h,f,a,t[i+5],12,1200080426),a=this.md5ff(a,c,h,f,t[i+6],17,-1473231341),f=this.md5ff(f,a,c,h,t[i+7],22,-45705983),h=this.md5ff(h,f,a,c,t[i+8],7,1770035416),c=this.md5ff(c,h,f,a,t[i+9],12,-1958414417),a=this.md5ff(a,c,h,f,t[i+10],17,-42063),f=this.md5ff(f,a,c,h,t[i+11],22,-1990404162),h=this.md5ff(h,f,a,c,t[i+12],7,1804603682),c=this.md5ff(c,h,f,a,t[i+13],12,-40341101),a=this.md5ff(a,c,h,f,t[i+14],17,-1502002290),f=this.md5ff(f,a,c,h,t[i+15],22,1236535329),h=this.md5gg(h,f,a,c,t[i+1],5,-165796510),c=this.md5gg(c,h,f,a,t[i+6],9,-1069501632),a=this.md5gg(a,c,h,f,t[i+11],14,643717713),f=this.md5gg(f,a,c,h,t[i],20,-373897302),h=this.md5gg(h,f,a,c,t[i+5],5,-701558691),c=this.md5gg(c,h,f,a,t[i+10],9,38016083),a=this.md5gg(a,c,h,f,t[i+15],14,-660478335),f=this.md5gg(f,a,c,h,t[i+4],20,-405537848),h=this.md5gg(h,f,a,c,t[i+9],5,568446438),c=this.md5gg(c,h,f,a,t[i+14],9,-1019803690),a=this.md5gg(a,c,h,f,t[i+3],14,-187363961),f=this.md5gg(f,a,c,h,t[i+8],20,1163531501),h=this.md5gg(h,f,a,c,t[i+13],5,-1444681467),c=this.md5gg(c,h,f,a,t[i+2],9,-51403784),a=this.md5gg(a,c,h,f,t[i+7],14,1735328473),f=this.md5gg(f,a,c,h,t[i+12],20,-1926607734),h=this.md5hh(h,f,a,c,t[i+5],4,-378558),c=this.md5hh(c,h,f,a,t[i+8],11,-2022574463),a=this.md5hh(a,c,h,f,t[i+11],16,1839030562),f=this.md5hh(f,a,c,h,t[i+14],23,-35309556),h=this.md5hh(h,f,a,c,t[i+1],4,-1530992060),c=this.md5hh(c,h,f,a,t[i+4],11,1272893353),a=this.md5hh(a,c,h,f,t[i+7],16,-155497632),f=this.md5hh(f,a,c,h,t[i+10],23,-1094730640),h=this.md5hh(h,f,a,c,t[i+13],4,681279174),c=this.md5hh(c,h,f,a,t[i],11,-358537222),a=this.md5hh(a,c,h,f,t[i+3],16,-722521979),f=this.md5hh(f,a,c,h,t[i+6],23,76029189),h=this.md5hh(h,f,a,c,t[i+9],4,-640364487),c=this.md5hh(c,h,f,a,t[i+12],11,-421815835),a=this.md5hh(a,c,h,f,t[i+15],16,530742520),f=this.md5hh(f,a,c,h,t[i+2],23,-995338651),h=this.md5ii(h,f,a,c,t[i],6,-198630844),c=this.md5ii(c,h,f,a,t[i+7],10,1126891415),a=this.md5ii(a,c,h,f,t[i+14],15,-1416354905),f=this.md5ii(f,a,c,h,t[i+5],21,-57434055),h=this.md5ii(h,f,a,c,t[i+12],6,1700485571),c=this.md5ii(c,h,f,a,t[i+3],10,-1894986606),a=this.md5ii(a,c,h,f,t[i+10],15,-1051523),f=this.md5ii(f,a,c,h,t[i+1],21,-2054922799),h=this.md5ii(h,f,a,c,t[i+8],6,1873313359),c=this.md5ii(c,h,f,a,t[i+15],10,-30611744),a=this.md5ii(a,c,h,f,t[i+6],15,-1560198380),f=this.md5ii(f,a,c,h,t[i+13],21,1309151649),h=this.md5ii(h,f,a,c,t[i+4],6,-145523070),c=this.md5ii(c,h,f,a,t[i+11],10,-1120210379),a=this.md5ii(a,c,h,f,t[i+2],15,718787259),f=this.md5ii(f,a,c,h,t[i+9],21,-343485551),h=this.safeAdd(h,e),f=this.safeAdd(f,r),a=this.safeAdd(a,s),c=this.safeAdd(c,o);return[h,f,a,c]},binl2rstr:function(t){var n,i="",e=32*t.length;for(n=0;n<e;n+=8)i+=String.fromCharCode(t[n>>5]>>>n%32&255);return i},rstr2binl:function(t){var n,i=[];for(i[(t.length>>2)-1]=void 0,n=0;n<i.length;n+=1)i[n]=0;var e=8*t.length;for(n=0;n<e;n+=8)i[n>>5]|=(255&t.charCodeAt(n/8))<<n%32;return i},rstrMD5:function(t){return this.binl2rstr(this.binlMD5(this.rstr2binl(t),8*t.length))},rstrHMACMD5:function(t,n){var i,e,r=this.rstr2binl(t),s=[],o=[];for(s[15]=o[15]=void 0,r.length>16&&(r=this.binlMD5(r,8*t.length)),i=0;i<16;i+=1)s[i]=909522486^r[i],o[i]=1549556828^r[i];return e=this.binlMD5(s.concat(this.rstr2binl(n)),512+8*n.length),this.binl2rstr(this.binlMD5(o.concat(e),640))},rstr2hex:function(t){var n,i,e,r="";for(i=0,e=t.length;i<e;i+=1)n=t.charCodeAt(i),r+="0123456789abcdef".charAt(n>>>4&15)+"0123456789abcdef".charAt(15&n);return r},str2rstrUTF8:function(t){return unescape(encodeURIComponent(t))},rawMD5:function(t){return this.rstrMD5(this.str2rstrUTF8(t))},hexMD5:function(t){return this.rstr2hex(this.rawMD5(t))},rawHMACMD5:function(t,n){return this.rstrHMACMD5(this.str2rstrUTF8(t),this.str2rstrUTF8(n))},hexHMACMD5:function(t,n){return this.rstr2hex(this.rawHMACMD5(t,n))},md5:function(t,n,i){return n?i?this.rawHMACMD5(n,t):this.hexHMACMD5(n,t):i?this.rawMD5(t):this.hexMD5(t)}},KBEngine.EncryptData=function(n){return t.MD5.md5(n)},KBEngine.EncryptBuffer=function(){}})(window);