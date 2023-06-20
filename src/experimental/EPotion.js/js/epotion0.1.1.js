/*======================*/
/*  © 2019 EPotion.JS   */
/*======================*/

/* @Author : [ muhammadalfajriarraihan@gmail.com ] */
/* @Release : [ v0.1.1 22 Oct 2019, (15:17) ] */

$EPL$ = {};
var EPotion = {
	
	EPScript : 
	function(){ return "Epotion JS"; },
	EPAuthor : 
	function(){ return "Alfajri Arraihan"; },
	EPVersion : 
	function(){ return "0.1.1"; },
	
	include : function(key,value){
		eval("$EPL$."+key+" = "+"\""+value+"\""+";");
	},
	
	observe : function(name,segment,data){
		var elm = document.getElementById(name);
		var seg = document.getElementById(segment);
		
		var varg = eval("$EPL$."+data);
		var srg = seg.innerHTML;
		var sval = srg.replace(new RegExp(varg,'g'),"%"+data);
		
		if(elm.tagName == "INPUT"){
			elm.addEventListener("input",function(){
				eval("$EPL$."+data+" = \""+elm.value+"\";");
				seg.innerHTML = sval;
				var obs = seg.innerHTML;
			
				var oobs = obs.match(/\%+[\w\.]*/g);
				for(i = 0; i < oobs.length; i++){
					var val = oobs[i].substring(1).trim();
					var oel = seg.innerHTML;
				
					var value = eval("$EPL$."+val);
				
					if(value != null){
						seg.innerHTML = oel.replace(oobs[i],value);
					}
				}
				
			},false);
		}
	},
	
	apply : function(count){
		for(i = 0; i < (count+1); i++){
			var elem = document.body;
			var obs = elem.innerHTML;
			
			var oobs = obs.match(/\%+[\w\.]*/g);
			for(i = 0; i < oobs.length; i++){
				var val = oobs[i].substring(1).trim();
				var oel = elem.innerHTML;
				
				var value = eval("$EPL$."+val);
				
				if(value != null){
					elem.innerHTML = oel.replace(oobs[i],value);
				}
			}
			
			var pl = document.body;
			var obsl = pl.innerHTML;
			
			var oobsl = obsl.match(/\%+\epl+\@+\w*/g);
			for(i = 0; i < oobsl.length; i++){
				var val = oobsl[i].substring(5).trim();
				var oel = pl.innerHTML;
				
				pl.innerHTML = oel.replace(oobsl[i],"id = \""+val+"\"");
			}
		}
		
	},
	
	infect : function(handler){
		$potion = {}; handler($potion);
			handler($EPL$);
			
			var elem = document.body;
			var obs = elem.innerHTML;
			
			var oobs = obs.match(/\%+[\w\.]*/g);
			for(i = 0; i < oobs.length; i++){
				var val = oobs[i].substring(1).trim();
				var oel = elem.innerHTML;
				
				var value = eval("$EPL$."+val);
				
				if(value != null){
					elem.innerHTML = oel.replace(oobs[i],value);
				}
			}
			
		return $potion;
	},
	
	inject : function(name,handler){
		$potion = {};
		handler($potion);
			
		var elem = document.getElementById(name);
		var o = $potion;
		
		if(o.name != null){
			elem.setAttribute("id",o.name);
		}
		if(o.val != null){
			elem.innerText = o.val;
		}
		if(o.html != null){
			elem.innerHTML = o.html;
		}
		if(o.click != null){
			elem.onclick = o.click;
		}
		if(o.attr != null){
			var atv = o.attr.split(",");
			for(i = 0; i < atv.length; i++){
				if(atv[i].length > 0){
					var args = atv[i].split(":=");
					var key = args[0].trim();
					var val = args[1].trim();
					elem.setAttribute(key,val);
				}
			}
			
		}
		if(o.binds != null && elem.tagName == "INPUT"){
			elem.addEventListener("input",function(){
				var targs = o.binds.split(",");
				for(i = 0; i < targs.length; i++){
					if(targs[i].length > 0){
						var inel = document.getElementById(targs[i]);
						inel.innerText = elem.value;
					}
				}
			},false);
		}
		if(o.roots != null){
			var rel = o.roots;
			var rels = rel.split(",");
			for(i = 0; i < rels.length; i++){
				if(rels[i].length > 0){
					var el = elem.innerHTML;
					elem.innerHTML = el + eval("o."+rels[i]);
				}
			}
		}
		if(o.loops != null){
			var l = o.loops.split(",");
			var typ = l[0].trim();
			var par = l[1].trim();
			var dats = l[2].trim();
			
			var pars = eval("o."+par);
			var odats = eval("o."+dats);
			var ii = 0;
			for(i = 0; i < odats.length; i++){
				var pi = pars.length;
				if(ii >= pi){
				   ii = 0;
				}
				if(odats[i].length > 0){
					var el = elem.innerHTML;
					
					var element = "<"+typ+" "+pars[ii]+">"+odats[i]+"</"+typ+">";
					elem.innerHTML = el + element;
				}
				
				ii++;
			}
		}
		if(o.blank == "!"){
			document.body.removeChild(elem);
		}
		
		return $potion;
	},
	
	applyInfect : function(data){
		var elem = document.body;
			var obs = elem.innerHTML;
			
			var oobs = obs.match(/\%+[\w\.]*/g);
			for(i = 0; i < oobs.length; i++){
				var val = oobs[i].substring(1).trim();
				var oel = elem.innerHTML;
				
				var value = eval("data."+val);
				
				if(value != null){
					elem.innerHTML = oel.replace(oobs[i],value);
				}
			}
	},
	
	applyInject : function(name,data){
		this.inject(name,function($O){
			$O.name = data.name;
			$O.val = data.val;
			$O.html = data.html;
			$O.click = data.click;
			$O.attr = data.attr;
			$O.binds = data.binds;
			$O.roots = data.roots;
			$O.loops = data.loops;
			$O.blank = data.blank;
		});
	}
};
