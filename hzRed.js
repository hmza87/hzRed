r = function(str){
    var this_;
    var lst_=[];
    var x=[];
    
    if(chnoType(str)=='string'){
        if(str.indexOf(", ")>0){
            var x = str.split(", ")
        }
        
        if(x.length==0){
            lst_ = getDOM(str);
        }else{
            for(i=0;i<x.length;++i){
                var ls = getDOM(x[i]);
                for(h=0;h<ls.length;h++){
                    lst_.push(ls[h]);
                }
            }
        }
        
        this_ = lst_[0];
    }else if(chnoType(str)=='htmlcollection'){
        this_ = str[0];
        lst_ = str;
    }else{
        this_ = str;
        lst_ = [this_];
    }
    
    spanta = {
        css: function(prop){
            this.each(function(e){
                doCss(e, prop);
            });
            
            return r(lst_);
            
        }
        ,attr: function(prop){
            return this_[prop];
        }
        ,hide: function(){
            this.each(function(e){
                e.style['display']='none';
            });
            
             return r(lst_);
        }
        ,show: function(){
            this.each(function(e){
                e.style['display']='';
            });
            
             return r(lst_);
        }
        ,each: function(func){
            for(i=0;i<lst_.length;i++){
                func(lst_[i]);
            }
             return r(lst_);
        }
        ,append: function(html){
            for(i=0;i<lst_.length;i++){
                lst_[i].innerHTML += html
            }
             return r(lst_);
        }
        ,html: function(html){
            if(html==null){return this_.innerHTML}
            for(i=0;i<lst_.length;i++){
                lst_[i].innerHTML = html
            }
             return r(lst_);
        }
        ,children: function(filter){
            if(filter==null){
                return this_.childNodes;

            }else{
                if(filter=='last'){
                    return r(this_.childNodes[this_.childNodes.length-1]);
                }else if(filter=='first'){
                    return r(this_.childNodes[0]);
                }
            }
        }
        ,getType:function(){
            return chnoType(this_);            
        }
        ,tree:function(){
            return buildTree();
        }
        
       
    }


    function doCss(elem, css){
        
        var obj = elem.id==undefined?getDOM(elem)[0]:elem;
    
        for(i=0;i<Object.keys(css).length;i++){
            obj.style[Object.keys(css)[i]] = css[Object.keys(css)[i]];
            

        }
        return obj;
        
    }

    function getDOM(string){
        if(string.substr(0,1)=='.'){
            return document.getElementsByClassName(string.substr(1, string.length))
        }else if(string.substr(0,1)=='#'){
            return [document.getElementById(string.substr(1, string.length))]
        }else{
            return document.getElementsByTagName(string)

        }
    }

    function chnoType(thing){
        if(thing===null)return "null"; // special case
        return Object.prototype.toString.call(thing).replace('[object ', '').replace(']', '').toLowerCase();
    }

    function buildTree(){
        var themall = document.getElementsByTagName('*');
        var theTree = {
            c:{}
            
        }
        for(i=0;i<themall.length;i++){
           var th = themall[i];
           if(th.hasAttribute('id')){
               theTree['_'+th.id] = r(th.id);

           }else if(th.hasAttribute('class')){
               theTree.c[th.className] = r(th.className);
           }
            theTree[th.tagName] = r(th);
        }
        return theTree;
        
    }







     return spanta;
}