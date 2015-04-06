function zipfolder(a,b){IO.directory.directories(b,function(c){zipfolder(a.folder(c.name),c.path)});IO.directory.files(b,function(c){a.file(c.name,c.path)})}function $manager(b,a){if(this.constructor!==$manager){return Function.Create(arguments.length).apply($manager,arguments)}this.options=a||{};if(typeof b=="string"){this.files={};this.loader={path:b,fp:-1,offset:0};this.load(b)}else{this.files=b||{}}}$manager.helper=zipfolder;$manager.prototype.folder=function(a){this.files[a]={};return new $manager(this.files[a])};$manager.prototype.file=function(a,b){this.files[a]=b;return this};$manager.prototype.generate=function(f,b){var c=IO.file.open(f,{forText:false});b=!!b;dogenerate(c,"",this.files);var a=[];for(var d=0;d<1024;d++){a.push(0)}IO.file.write(c,base64.toBinary(base64.e(a)));if(!b){IO.file.flush(c);IO.file.close(c);return true}else{IO.file.seek(c,0);var e=base64.d(base64.fromBinary(IO.file.read(c)));IO.file.close(c);return e}};$manager.prototype.load=function(f){var e=IO.file.get(f).size,g=0;if(e<1536){ExceptionManager.put(11566,"Tar.load","invalid filetype.");return}var b=IO.file.open(f,{forRead:true,forText:false});this.loader.fp=b;IO.file.seek(b,e-1024);var a=base64.d(base64.fromBinary(IO.file.read(b))),d=0;for(var c=0;c<1024;c++){d+=a[c]}if(d>0){IO.file.close(b);ExceptionManager.put(11566,"Tar.load","invalid filetype.");this.loader.fp=-1;return}if(this.options.loadall!==false){while(this.read(function(i,h){IO.file.seek(h,i.offset);i.data=IO.file.read(h,i.filesize);this.files[i.name]=i})){}this.close();this.loader.fp=-1}};$manager.prototype.read=function(h){if(this.loader.fp<0){return false}var g=this.loader.fp;IO.file.seek(g,this.loader.offset);var d=base64.d(base64.fromBinary(IO.file.read(g,512)));if(d.length<512){return false}if(d[0]==0){return false}var b=0;this.loader.offset+=512;var a=d.slice(0,100);a=F.string.fromByteArray(a);var f=d[156];var j=new tarHeader(a,"",f==53);var k=parseOtc(d.slice(124,136));j.filesize=k;j.offset=this.loader.offset;this.loader.offset+=k;if(k%512!=0){this.loader.offset+=512-(k%512)}j.createdate=parseOtc(d.slice(136,148));var e=d.slice(148,156);e.pop();j.checksum=parseOtc(e);for(var c=0;c<8;c++){d[148+c]=32}for(var c=0;c<512;c++){b+=d[c]}if(b!=j.checksum){ExceptionManager.put(11566,"Tar.read","checksum error.")}else{if(typeof h=="function"){h.call(this,j,g)}}return true};$manager.prototype.close=function(){IO.file.close(this.loader.fp)};function dogenerate(b,a,e){for(var d in e){if(!e.hasOwnProperty(d)){continue}var c=e[d];if(typeof c=="string"){var h=tarHeader(a+d,c,false);h.generate();IO.file.write(b,base64.toBinary(base64.e(h.data)));IO.file.write(b,IO.file.readAllBytes(h.file));var g=h.filesize%512;if(g>0){var f=[];for(var d=0;d<512-g;d++){f.push(0)}IO.file.write(b,base64.toBinary(base64.e(f)))}}else{var h=tarHeader(a+d,"",true);h.generate();IO.file.write(b,base64.toBinary(base64.e(h.data)));dogenerate(b,a+d+"\\",c)}}}$manager.packFolder=function(d,c){var b=new $manager();try{zipfolder(b,d);return b.generate(c)}catch(a){return false}};$manager.packFile=function(c,f,e){e=F.extend({filename:null},e);var a=e.filename||c.substr(c.lastIndexOf("\\")+1);var d=new $manager();try{d.file(a,c);return d.generate(f)}catch(b){return false}};$manager.unpack=function(g,b){var e=new $manager(g);var f=e.files;for(var d in f){if(!f.hasOwnProperty(d)){continue}var c=f[d];if(c.dir){IO.directory.create(IO.build(b,c.name))}else{var h=IO.build(b,c.name),a=IO.parent(h);if(!IO.directory.exists(a)){IO.directory.create(a)}IO.file.writeAllBytes(h,c.data)}}return true};var formatOtc=function(c,a){var b=c.toString(8)+" ";a=a||12;while(b.length<a){b=" "+b}return F.string.getByteArray(b)};var parseOtc=function(b){b.pop();var a=0;while(b[a]==32){b.shift()}return parseInt(F.string.fromByteArray(b),8)};function push(c,a){for(var b=0;b<c.length;b++){a.checksum+=c[b];a.data.push(c[b])}}function set(c,d,a){for(var b=0;b<c.length;b++){a.data[d+b]=c[b]}}var tarHeader=function(b,c,a){if(this.constructor!=tarHeader){return new tarHeader(b,c,a)}this.name=b;this.filesize=0;this.file=c;this.dir=!!a;this.data=[];this.checksum=0;this.offset=0;this.createdate=0};tarHeader.prototype.generate=function(){var a=F.string.getByteArray(this.name);while(a.length>99){a.pop()}while(a.length<100){a.push(0)}push(a,this);if(this.dir){push([32,52],this)}else{push([49,48],this)}push([48,55,55,55,32,0,32,32,32,32,32,48,32,0,32,32,32,32,32,48,32,0],this);var c=53;if(!this.dir){this.filesize=IO.file.get(this.file).size;c=48}push(formatOtc(this.filesize),this);push(formatOtc(F.timespan(new Date())),this);push([32,32,32,32,32,32,32,32],this);push([c],this);for(var b=0;b<355;b++){this.data.push(0)}set(formatOtc(this.checksum,7),148,this);this.data[155]=0};module.exports=$manager;