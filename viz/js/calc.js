$("#buttonCalc").click(function() {
var VARRAW = $("#varRAW").val();
//alert("Start 4");

// minmin
// min
var VARMINMIN = "--"
var VARMIN = "-"
var VARPLUS = "+"
var VARPLUSPLUS = "++"

var varRAWlast = "000"
var varRAWpenultimate = "000"

//alert(varRAWlast);
//alert(varRAWpenultimate);

$("#minmin").val(VARMINMIN);
$("#min").val(VARMIN);
$("#plus").val(VARPLUS);
$("#plusplus").val(VARPLUSPLUS);

var VARLEN = VARRAW.length;
//alert(VARLEN);
//VARRAW.charAt(1) = "z"
//alert(VARRAW);


//alert(VARRAW.substring(VARRAW.length-2,VARRAW.length-1));
//alert(VARRAW.substring(VARRAW.length-1,VARRAW.length));
//Create stub of string with last two chars missing
var VARless2 = VARRAW.substring(0, VARRAW.length-2);
//alert(VARless2);

//alert(VARRAW.substring(VARRAW.length-1,VARRAW.length));
//Create stub of string with last one char missing
var VARless1 = VARRAW.substring(0,VARRAW.length-1);
//alert(VARless1);

var VARpen = VARRAW.charAt(VARRAW.length-2);
//alert(VARpen);

//Create stub of string with last one char missing
var VARlast = VARRAW.charAt(VARRAW.length-1);
//alert(VARlast);
//alert(VARRAW.substring(0,VARRAW.length-2));
//VARRAW.substring(0,VARRAW.length-2);

//alert(VARRAW.substring(0,VARRAW.length-1));
//alert(VARRAW.substring(0,VARRAW.length-1));

VARMIN = VARless1+String.fromCharCode(VARlast.charCodeAt() - 1);
VARMINMIN = VARless2+String.fromCharCode(VARpen.charCodeAt() - 1)+String.fromCharCode(VARlast.charCodeAt() - 1);


VARPLUS = VARless1+String.fromCharCode(VARlast.charCodeAt() + 1);
VARPLUSPLUS = VARless2+String.fromCharCode(VARpen.charCodeAt() + 1)+String.fromCharCode(VARlast.charCodeAt() + 1);

$("#minmin").val(VARMINMIN);
$("#min").val(VARMIN);
$("#plus").val(VARPLUS);
$("#plusplus").val(VARPLUSPLUS);


//VARRAW = VARRAW.substring(0,VARRAW.length-1)+"y";
//$("#plus").val(VARRAW);
//VARRAW = VARRAW.substring(0,VARRAW.length-1)+"z";
//$("#plusplus").val(VARRAW);

//alert(String.fromCharCode('A'.charCodeAt() - 2));
//alert(String.fromCharCode('A'.charCodeAt() - 1));
//alert(String.fromCharCode('A'.charCodeAt() + 1));
//alert(String.fromCharCode('A'.charCodeAt() + 2));
//alert(nextChar('n'););

//alert(nextChar('x'););



// plus
// plusplus
// alert(VOG);
// alert(VOG);
// alert(VOG);
//	DDP_display = parseInt(DDP);
//	DDP_display = DDP_display.toLocaleString();
//	$("#DDP2").val(DDP_display);

});
