/*
   (=======================)
   (|| LONTONG.js v0.0.1 ||)
   (=======================)
   
   @Author : alfequilfe@gmail.com
   @Pesan : Sarapan Programmer Indonesia di Pagi Hari :v
*/
$A = {};
$D = document;
$L = document.body.innerHTML;

$EL = function(tag,name,val){
	var ret = "";
	var tags = tag.split("+");
	if(tags.length > 1){
		for(var i = 1; i < tags.length; i++){
			val = "<"+tags[i]+">"+val+"</"+tags[i]+">";
		}
	}
		if(name.includes("@")){
			var id = name.substring(1).trim();
			ret = "<"+tags[0]+" id='"+id+"'>"+val+"</"+tags[0]+">";
		}
		if(name.includes("#")){
			var cls = name.substring(1).trim();
			ret = "<"+tags[0]+" class='"+cls+"'>"+val+"</"+tags[0]+">";
		}
	return ret;
};
$GL = function(name){
	var node = null;
			if(name.includes("@")){
				var id = name.substring(1).trim();
				node = $D.getElementById(id);
			}
			if(name.includes("#")){
				var cls = name.substring(1).trim();
				node = $D.getElementsByClassName(cls);
			}
	return node;
};

$FL = function(ob,n,rel){
	if(rel != null){
		ob.rel = rel;
	}
		ob.add = function(x){
			if(x != null){
				n.innerText = x;
				this.init();
			}
			return ob;
		};
		ob.child = function(x){
			if(x != null){
				var ch = x.split(",");
				for(var i = 0; i < ch.length; i++){
					if(ch[i].trim().length > 0){
						var node = $GL(ch[i].trim());
						if(node != null) n.appendChild(node);
					}
				}
			}
			return ob;
		};
		ob.val = function(x){
			if(x != null){
				n.innerText = x;
			}
			
			if(ob.rel != null && x == null)
				ob.rel = n.innerText;
				
			return n.innerText;
		};
		ob.html = function(x){
			if(x != null){
				n.innerHTML = x;
			}
			if(ob.rel != null && x == null)
				ob.rel = n.innerHTML;
			
			return n.innerHTML;
		};
		ob.css = function(x){
			if(x != null){
				var ret = n.getAttribute("style");
					if(ret != null){
						n.setAttribute("style",ret+" "+x);
					}else{
						n.setAttribute("style",x);
					}
			}
			return ob;
		};
		ob.aftVal = function(x){
			if(x != null){
				n.innerText = n.innerText + x;
			}
			return ob;
		};
		ob.preVal = function(x){
			if(x != null){
				n.innerText = x + n.innerText;
			}
			return ob;
		};
		ob.aftHtml = function(x){
			if(x != null){
				n.innerHTML = n.innerHTML + x;
			}
			return ob;
		};
		ob.preHtml = function(x){
			if(x != null){
				n.innerHTML = x + n.innerHTML;
			}
			return ob;
		};
		ob.attr = function(x){
			if(x != null){
				var arg = x.split(",");
					for(var i = 0; i < arg.length; i++){
						if(arg[i].length > 0){
							var args = arg[i].split(":=");
							var key = args[0].trim();
							var val = args[1].trim();
							
							var ret = n.getAttribute(key);
							if(ret != null){
								n.setAttribute(key,ret+","+val);
							}else{
								n.setAttribute(key,val);
							}
						}
					}
			}
			return ob;
		};
		ob.click = function(x){
			if(x != null){
				var ret = n.getAttribute("onclick");
					if(ret != null){
						n.setAttribute("onclick",ret+" "+x);
					}else{
						n.setAttribute("onclick",x);
					}
			}
			return ob;
		};
		
		var itog = 0;
		ob.toggle = function(x,y){
			if(x != null && y != null){
				if(itog == 0){
					eval(x);
				}else{
					eval(y);
				}
				itog += 1;
				if(itog > 1){
					itog = 0;
				}
			}
			return ob;
		};
		ob.del = function(){
			$D.body.removeChild(n);
			return ob;
		};
};

var Lontong = {
	
	init : function(){
		var db = $D.body;
		var dbi = db.innerHTML;
			
			//DEFINE VARIABLE FINDING
			/*var fdv = dbi.match(/\$+[(\w\S)*]+\s+(\"|\')+(.*)+(\"|\')+(\;|)/g);	
			if(fdv != null){
				for(var i = 0; fdv.length; i++){
					var a = fdv[i].trim();
					if(a.length > 0){
						var key = a.substring(1,a.indexOf("\""));
						var val = a.substring(a.indexOf("\"")+1,a.lastIndexOf("\""));
						
						if(key != null && val != null && key != "" && val != ""){
							db.innerHTML = db.innerHTML.replace(a,"<div id='"+key+"' datval='"+val+"'></div>");
							dbi = db.innerHTML;
						}
					}
				}
			}*/
			
			//ELEMENT FINDING
			var fe = dbi.match(/[(\w\S)*]+\:+[(\w\S)*]+\(+(.*)+\)+(\;|)/g);
			if(fe != null){
				for(var i = 0; i < fe.length; i++){
					if(fe[i].trim().length > 0){
						var el = fe[i].trim();
						var tag = el.substring(0,el.indexOf(":"));
						var name = el.substring(el.indexOf(":")+1,el.indexOf("("));
						var val = el.substring(el.indexOf("(")+1,el.lastIndexOf(")"));
						if(val.includes("\"") || val.includes("\'")){
							val = val.substring(1,val.length-1);
						}
						if(tag != null && name != null && tag != "" && name != ""){
							db.innerHTML = db.innerHTML.replace(el,$EL(tag,name,val));
							dbi = db.innerHTML;
						}
					}
				}
			}
			
			//COMMENT FINDING
			var fc = dbi.match(/\#!+(.*)+\!#/g);
			if(fc != null){
				for(var i = 0; i < fc.length; i++){
					var a = fc[i].trim();
					if(a.length > 0){
						db.innerHTML = db.innerHTML.replace(a,"");
						dbi = db.innerHTML;
					}
				}
			}
	},
	
	accept : function(count){
		var db = $D.body;
		var dbi = db.innerHTML;
		
		for(i = 0; i < count; i++){
			this.init();
			
			//FUNCTION FINDING
			var ff = dbi.match(/(\@|\#)+[(\w\S\)*]+\.+[(\w\S)*]+\(+(.*)+\)/g);
			if(ff != null){
				for(var i = 0; i < ff.length; i++){
					if(ff[i].trim().length > 0){
						var el = ff[i].trim();
						var name = el.substring(0,el.indexOf("."));
						var fk = el.substring(el.indexOf(".")+1,el.indexOf("("));
						var fv = el.substring(el.indexOf("(")+1,el.lastIndexOf(")"));
						
						var node = $GL(name);
						if(node != null){
							var named = name.substring(1).trim();
							
							eval("var "+named+" = this.apply(\""+name+"\",\"\");");
							eval(named+"."+fk+"("+fv+");");
							
							db.innerHTML = db.innerHTML.replace(el,eval(named+".rel"));
							dbi = db.innerHTML;
						}
				}
			}
			}
			
		}
	},
	
	
	apply : function(name,rel){
		var ob = {};
		ob.node = $GL(name);
		var n = ob.node;
		
		if(name.includes("@")){
			if(n != null) $FL(ob,n,rel);
		}
		if(name.includes("#")){
			if(n != null){
				for(var i = 0; i < n.length; i++){
					$FL(ob,n[i],rel);
				}
			}
		}
		
		return ob;
	},
	
	include : function(key,value){
		eval("$A."+key+" = \""+value+"\;");
	},
	
	inject : function(handler){
		handler($A);
	}
};
