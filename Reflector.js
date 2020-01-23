var validateRef = false;
var myReflector;
class Reflector{
    constructor(thin){
        this.thin = thin;
        this.map = {};
        var matches = thin.split(" ");
        console.log(matches);
        for(var i = 0 ; i < matches.length;i++){
            var tempPair = matches[i];
            this.map[tempPair.charAt(0)] = tempPair.charAt(1);
            this.map[tempPair.charAt(1)] = tempPair.charAt(0);
        }
        console.log(this.map);
        
    }
    reflect(c){
        if(c in this.map){
            return this.map[c];
        }
        return c;
    }
    getMap(){
        return this.map.toString();
    }

}
reflectors = {};
reflectors["b_thin"] = "AE BN CK DQ FU GY HW IJ LO MP RX SZ TV";
reflectors["c_thin"] = "AR BD CO EJ FN GT HK IV LM PW QZ SX UY";
selectedChoice = 0;
selectedReflectorText = "";
$(function(){
    $("#dropReflector").on("change",function(){
        
        var selectText = $("option:selected", this).text();
        var select = parseInt($(this).val());
         if(select!=0){
            switch (select){
                case 1: 
                   $("#reflectorans").html(reflectors.b_thin);
                   selectedReflectorText = reflectors.b_thin;
                   break;
                case 2:
                   $("#reflectorans").html(reflectors.c_thin);
                   selectedReflectorText = reflectors.c_thin;
                   break;
                default:
                    break;
                
            }
            selectedChoice = select;
        
        }
        $(this).val(selectedChoice);
        $("#reflectorselection").html(selected.toString());
        validateReflector();
     });
     $("#testreflector").keyup(function(e){
        if(e.keyCode >=65 && e.keyCode <=90)
        {   
            var test = $(this).val();
            $(this).val(test.toUpperCase());
            var chr = String.fromCharCode(e.keyCode);
            console.log(myReflector.reflect(chr));
            
        }

     });
     
     
});

function validateReflector(){
    if(selectedChoice!=0){
        myReflector = new Reflector(selectedReflectorText);
        console.log("Reflector Set");
    }
    validatedRef = true;
}

