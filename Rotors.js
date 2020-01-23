var myRotors;
class Rotor {
    constructor(order,oriMap,kp){
    this.order = order;
    this.kp = kp;
    this.alphaMap = "";
    this.pos = 0;
    this.oriMap = oriMap;
    this.plainText = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    step(){
        var newStr = this.alphaMap;
        newStr = newStr.charAt(newStr.length-1) + newStr.substring(0,newStr.length-1);
        this.alphaMap = newStr;
        //console.log(this.alphaMap);
    }
    getMap(){
        if(this.alphaMap){
            return this.alphaMap;
        }
        return this.oriMap;
    }
    setInitPos(c){
        var n  = parseInt(c,36)-10;
        this.pos = n;
        this.alphaMap =  this.oriMap;
        if(n>0){
            for(var i=0; i<n;i++){
              this.step();
            }
        }
    }
    posIncrement(){
        this.pos = (this.pos + 1) % 26;
        this.step();
        console.log("Pos " + this.order + " :"  + this.pos);
    }
    getPos(){
        return this.pos;
    }
    isKnockOff(){
        for(var i = 0;i<this.kp.length;i++){
            if(this.kp[i] == this.pos){
                return true;
            }
        }
        return false;
    }
    forwardPermutate(c){
        var i = this.plainText.indexOf(c);
        return this.getMap().charAt(i);
    }
    inversePermutate(c){
        var i = this.getMap().indexOf(c);
        return this.plainText.charAt(i);
    }
    
}

class Rotors{
    constructor(rotor1,rotor2,rotor3){
        var rotor1Map = arrRotorsMap[rotor1];
        var rotor2Map = arrRotorsMap[rotor2];
        var rotor3Map = arrRotorsMap[rotor3];
        var rotor1kp = arrNudge[rotor1];
        var rotor2kp = arrNudge[rotor2];
        var rotor3kp = arrNudge[rotor3];
        this.rotors = new Array();
        this.rotors[0] = new Rotor(0,rotor1Map,rotor1kp);
        this.rotors[1] = new Rotor(1,rotor2Map,rotor2kp);
        this.rotors[2] = new Rotor(2,rotor3Map,rotor3kp);
        for(var i=0;i<3;i++){
            this.rotors[i].setInitPos("A");
        }
    }
    rotorStep(){
        var nextStep=true;
        for(var i=0; i<3;i++){
            if(nextStep){
                this.rotors[i].posIncrement();
                //console.log(i.toString()+" "+this.rotors[i].getMap());
                nextStep = this.rotors[i].isKnockOff();
            }else{
                break;
            }
            
        }
        
    }
    sendForward(c){
        
        for(var i = 2 ; i>=0; i--) {
             c = this.rotors[i].forwardPermutate(c);
        }
        
        return c;
    }
    sendInverse(c){
        var temp = c;
        for(var i = 0; i<3 ;i++) {
            temp = this.rotors[i].inversePermutate(temp);
        }
        return temp;
    }
}



arrRotorsMap = {};
arrNudge = {};
arrRotorsMap["I"] = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
arrRotorsMap["II"] = "AJDKSIRUXBLHWTMCQGZNPYFVOE";
arrRotorsMap["III"] =  "BDFHJLCPRTXVZNYEIWGAKMUSQO";
arrRotorsMap["IV"] =  "ESOVPZJAYQUIRHXLNFTGKDCMWB";
arrRotorsMap["V"] =  "VZBRGITYUPSDNHLXAWMJQOFECK";
arrRotorsMap["VI"] =  "JPGVOUMFYQBENHZRDKASXLICTW";
arrRotorsMap["VII"] =  "NZJHGRCXMYSWBOUFAIVLPEKQDT";
arrRotorsMap["VIII"] =  "FKQHTLXOCBJSPDZRAMEWNIUYGV";
arrRotorsMap["Beta"] =  "LEYJVCNIXWPBQMDRTAKZGFUHOS";
arrRotorsMap["Gamma"] =  "FSOKANUERHMBTIYCWLQPZXVGJD";
arrNudge["I"] = [17]; //Q
arrNudge["II"] = [5, 5];//E
arrNudge["III"] = [22,22]; //V
arrNudge["IV"] = [10,10]; //J
arrNudge["V"] = [26,26]; //Z
arrNudge["VI"] = [26,13]; // Z/M
arrNudge["VII"] = [26,13]; // Z/M
arrNudge["VIII"] = [26,13]; // Z/M
selected = new Array();
selected[0]="";
selected[1]="";
selected[2]="";
selectedText = new Array();
selectedText[0]="";
selectedText[1]="";
selectedText[2]="";

function validateRotor(){
    var validateR = true;
    for(var i = 0 ;i<selected.length;i++){
        if (selected[i]==0){
            $("#isOK").html("not OK");
            validateR = false;
            break;
        }
    }
    if(validateR){
        $("#isOK").html("OK");
        setRotor();
    }
}
function setRotor(){
    myRotors = new Rotors(selectedText[0],selectedText[1],selectedText[2]);
}

function encrypt(chr){
    if(myRotors && myReflector){
        myRotors.rotorStep();
        chr = SteckerSwap(myRotors.sendForward(myReflector.reflect(myRotors.sendInverse(chr))));
        var temp = $("#testrotortext").html();
        return temp.concat(chr);
    }else{
        alert("Rotors and Reflector not set");
    }
}

$(function(){
 $("#testrotor").keyup(function(e){
    if(e.keyCode >=65 && e.keyCode <=90)
    {   
        var test = $(this).val();
        $(this).val(test.toUpperCase());
        var chr = String.fromCharCode(e.keyCode);
        console.log(encrypt(chr));
    }

 });
 $("#dropRotorFirst").on("change",function(){
    var swap = true;
    var selectText = $("option:selected", this).text();
    var select = parseInt($(this).val());
    for(var i = 1; i<=3; i++){
        if(select==selected[i-1]){
            swap = false;
            break;
        }
     }
     if(swap){
        switch (select){
            case 1: 
               $("#firstans").html(arrRotorsMap.I);
               break;
            case 2:
               $("#firstans").html(arrRotorsMap.II);
               break;
            case 3:
               $("#firstans").html(arrRotorsMap.III);
               break;
            case 4:
               $("#firstans").html(arrRotorsMap.IV);
               break;
            case 5:
               $("#firstans").html(arrRotorsMap.V);
               break;
            case 6:
               $("#firstans").html(arrRotorsMap.VI);
               break;
            case 7:
               $("#firstans").html(arrRotorsMap.VII);
               break;
            case 8:
               $("#firstans").html(arrRotorsMap.VIII);
               break;
            default:
                break;
            
        }
        selected[0] = select;
        selectedText[0] = selectText;
    }
    $(this).val(selected[0]);
    $("#rotorselection").html(selected.toString());
    validateRotor();
 });
 $("#dropRotorSecond").on("change",function(){
    var swap = true; 
    var selectText = $("option:selected", this).text();
    var select = parseInt($(this).val());
    for(var i = 1; i<=3; i++){
        if(select==selected[i-1]){
            swap = false;
            break;
        }
     }
     if(swap){
        switch (select){
            case "I": 
               $("#secondans").html(arrRotorsMap.I);
               break;
            case 2:
               $("#secondans").html(arrRotorsMap.II);
               break;
            case 3:
               $("#secondans").html(arrRotorsMap.III);
               break;
            case 4:
               $("#secondans").html(arrRotorsMap.IV);
               break;
            case 5:
               $("#secondans").html(arrRotorsMap.V);
               break;
            case 6:
               $("#secondans").html(arrRotorsMap.VI);
               break;
            case 7:
               $("#secondans").html(arrRotorsMap.VII);
               break;
            case 8:
               $("#secondans").html(arrRotorsMap.VIII);
               break;
            default:
                break;
            
        }
        selected[1] = select;
        selectedText[1] = selectText;
    }
    $(this).val(selected[1]);
    $("#rotorselection").html(selected.toString());
    validateRotor();
});
$("#dropRotorThird").on("change",function(){
    var swap = true; 
    var selectText = $("option:selected", this).text();
    var select = parseInt($(this).val());
    for(var i = 1; i<=3; i++){
        if(select==selected[i-1]){
            swap = false;
            break;
        }
     }
     if(swap){
        switch (select){
            case "I": 
               $("#thirdans").html(arrRotorsMap.I);
               break;
            case 2:
               $("#thirdans").html(arrRotorsMap.II);
               break;
            case 3:
               $("#thirdans").html(arrRotorsMap.III);
               break;
            case 4:
               $("#thirdans").html(arrRotorsMap.IV);
               break;
            case 5:
               $("#thirdans").html(arrRotorsMap.V);
               break;
            case 6:
               $("#thirdans").html(arrRotorsMap.VI);
               break;
            case 7:
               $("#thirdans").html(arrRotorsMap.VII);
               break;
            case 8:
               $("#thirdans").html(arrRotorsMap.VIII);
               break;
            default:
                break;
        }
        selected[2] = select;
        selectedText[2] = selectText;
    }
    $(this).val(selected[2]);
    $("#rotorselection").html(selected.toString());
    validateRotor();
});
$("#rotorstep").click(function(){
   myRotors.rotorStep();     
});
});

