(function(){var g=exports;var b=g.x64;var e=b.Word;var f=b.WordArray;var d=g.algo;var c=d.SHA512;var a=d.SHA384=c.extend({_doReset:function(){this._hash=new f.init([new e.init(3418070365,3238371032),new e.init(1654270250,914150663),new e.init(2438529370,812702999),new e.init(355462360,4144912697),new e.init(1731405415,4290775857),new e.init(2394180231,1750603025),new e.init(3675008525,1694076839),new e.init(1203062813,3204075428)])},_doFinalize:function(){var h=c._doFinalize.call(this);h.sigBytes-=16;return h}});g.SHA384=c._createHelper(a);g.HmacSHA384=c._createHmacHelper(a)}());