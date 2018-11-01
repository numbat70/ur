$("#buttonCalc").click(function() {
//EX WORKS
    var VOG=parseInt($("#VOG").val());
    var COH=parseInt($("#COH").val());
	var COC=parseInt($("#COC").val());
	var HC=parseInt($("#HC").val());
//FOB	
    var FOB=VOG + COH + COC + HC  
    //FOB = parseInt(FOB);
	//FOB = FOB.toLocaleString();         
    $("#FOB").val(FOB);

//FOB
	var TC=parseInt($("#TC").val());
	var IC=parseInt($("#IC").val());

//CIF
    var CIF=TC + IC  + FOB       

	//CIF = parseInt(CIF);
	//CIF = CIF.toLocaleString();
    $("#CIF").val(CIF);
//CIF

	var COHA=parseInt($("#COHA").val());
	var CDpercent=parseInt($("#CDpercent").val());
    var CD=CDpercent * CIF;
    CD=CD/100;

    //CD = parseInt(CD);
	//CD = CD.toLocaleString();
    $("#CD").val(CD);
	
	var ITpercent=parseInt($("#ITpercent").val());
    var IT=ITpercent * CIF;
    IT= IT/100; 
    
	//IT = parseInt(IT);
	//IT = IT.toLocaleString();
    $("#IT").val(IT);

	var ICust=parseInt($("#ICust").val());
	var CCA=parseInt($("#CCA").val())

//DDP
	var DDP=CIF  + COHA + CD + IT + ICust + CCA;

	//DDP = parseInt(DDP);
	//DDP = DDP.toLocaleString();
    $("#DDP").val(DDP);
//DDP



//alert(VOG);
//alert(VOG);
//alert(VOG);

//Plus and Minus 5%
    $("#VOG2").val(VOG);
    $("#VOG3").val(VOG);
    $("#VOG4").val(VOG);

var FOBplus = ((COH + COC + HC)*1.05) + VOG;
var FOBminus = ((COH + COC + HC)*0.95) + VOG;
    
    FOBplus_display = parseInt(FOBplus);
	FOBplus_display = FOBplus_display.toLocaleString();
    $("#FOBplus").val(FOBplus_display);
    
	FOBminus_display = parseInt(FOBminus);
	FOBminus_display = FOBminus_display.toLocaleString();
    $("#FOBminus").val(FOBminus_display);
    
	FOB_display = parseInt(FOB);
	FOB_display = FOB_display.toLocaleString();
    $("#FOB2").val(FOB_display);

var CIFplus =  ((TC + IC)*1.05) + FOBplus;
var CIFminus = ((TC + IC)*0.95) + FOBminus;
    
	CIFplus_display = parseInt(CIFplus);
	CIFplus_displays = CIFplus_display.toLocaleString();
    $("#CIFplus").val(CIFplus_display);
    
	CIFminus_display = parseInt(CIFminus);
	CIFminus_display = CIFminus_display.toLocaleString();
    $("#CIFminus").val(CIFminus_display);
	
	CIF_display = parseInt(CIF);
	CIF_display = CIF_display.toLocaleString();
	$("#CIF2").val(CIF_display);

var DDPplus =  ((COHA + CD + IT + ICust + CCA)*1.05) + CIFplus;
var DDPminus = ((COHA + CD + IT + ICust + CCA)*0.95) + CIFminus;

	DDPplus_display = parseInt(DDPplus);
	DDPplus_display = DDPplus_display.toLocaleString();
    $("#DDPplus").val(DDPplus_display);

	DDPminus_display = parseInt(DDPminus);
	DDPminus_display = DDPminus_display.toLocaleString();
    $("#DDPminus").val(DDPminus_display);

	//Already done higher up
	DDP_display = parseInt(DDP);
	DDP_display = DDP_display.toLocaleString();
	$("#DDP2").val(DDP_display);
});

//Code to roundto whole numbers and show thousand seperator if in teh UK. 
//DDP = parseInt(DDP);
//DDP = DDP.toLocaleString();
      
