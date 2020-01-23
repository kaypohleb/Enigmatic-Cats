plugboard = {};
for(i = 0; i < 26; i++){
    var chr = String.fromCharCode(65 + i);
    plugboard[chr]="";
    $("#"+chr).val("");
}
function SteckerSwap(chr){
    if(plugboard[chr]){
        console.log(plugboard[chr]);
    }
    else{
        console.log(chr);
    }
}

$(function(){
 $(".stk").keyup(function(e){
    if(e.keyCode >=65 && e.keyCode <=90)
    {
        var temp = $(this).val();
        var tempID  = $(this).attr('id');
        if (temp != temp.toUpperCase()){
            temp = temp.toUpperCase();
            $(this).val(temp);
        }
        var prevslot = $("#"+temp).val();
        if(prevslot!=tempID){
            $("#"+prevslot).val("");
            plugboard[prevslot]="";
            
        }
        if(temp != tempID && temp !="")
        {
            $("#"+temp).val(tempID);
            plugboard[temp]=tempID;
            plugboard[tempID]=temp;
        }
        else{
            $(this).val("");
        }    
    }  
 });
 $("#teststk").keyup(function(e){
     
    if(e.keyCode >=65 && e.keyCode <=90)
    {   
        var test = $(this).val();
        $(this).val(test.toUpperCase());
        var chr = String.fromCharCode(e.keyCode);
        SteckerSwap(chr);
    }

        
 });
});