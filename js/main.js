//listen for changes at breakpoints
var currentWidth;
var newWidth;
var loadCounter=0;
var bigLabels=true;

var growth,
	coast,
	disparity,
	compton;

//use higher resolution for large screens
	if(window.innerWidth<=500){
		var big = "";
	}else{
		var big = "_big";
		//load larger opener image if big
		d3.select("div.title")
		  .style("background-image", `url("data/img/la_halves${big}.jpg`);
		
	}

//preload images
function preloadImage(url){
	var img = new Image();
	img.onload = notify_complete;
	img.src=url;
}

function notify_complete(){
	loadCounter++;

    if(loadCounter==15){
    	growth.progress(1).progress(0);
    	console.log("Growth done");
    }

    if(loadCounter==75){
		console.log("Coast done");
		coast.progress(1).progress(0);
	}

	if(loadCounter==135){
		console.log("Disparity done");
		disparity.progress(1).progress(0);
	}

	if(loadCounter==195){
		console.log("Compton done");
		compton.progress(1).progress(0);
		growth.progress(1).progress(0);
		//when all have loaded remove all labels
		switchOpacity(".openerLabels");
		switchOpacity(".comptonLabels");
		//double check
		d3.selectAll("g.labels,g.Labels")
			.style("opacity", 0);
		
	}
}

//fix vh bug, use window.height instead

	function setHeight(){

		d3.select("div.title")
			.style("height",function(){
				return window.innerHeight*0.8+"px";
			});

		d3.selectAll("div.spacer")
			.style("height",function(){
				return window.innerHeight*0.6+"px";
			});

		d3.selectAll("section")
			.style("height",function(){
				return window.innerHeight*0.75+"px";
			});

	}

	setHeight();


var tweenRefs = {
	"growth": growth,
	"coast": coast,
	"disparity": disparity,
	"compton": compton
};


//load growth images
var growthImages = [];

for(var i=1;i<10;i++){
	var url = `data/img/growth${big}/000${i}.jpg`;
	preloadImage(url);
	growthImages.push(url);
}

for(var i=10;i<16;i++){
	var url = `data/img/growth${big}/00${i}.jpg`;
	preloadImage(url);
	growthImages.push(url);
}


//load coast images
var coastImages = [];

for(var i=1;i<10;i++){
	var url = `data/img/coast${big}/000${i}.jpg`;
	preloadImage(url);
	coastImages.push(url);
}

for(var i=10;i<61;i++){
	var url = `data/img/coast${big}/00${i}.jpg`;
	preloadImage(url);
	coastImages.push(url);
}

//load disparity images

var disparityImages = [];

for(var i=1;i<10;i++){
	var url = `data/img/disparity${big}/000${i}.jpg`;
	preloadImage(url);
	disparityImages.push(url);
}

for(var i=10;i<61;i++){
	var url = `data/img/disparity${big}/00${i}.jpg`;
	preloadImage(url);
	disparityImages.push(url);
}

//load compton images

var comptonImages = [];

for(var i=1;i<10;i++){
	var url = `data/img/compton/000${i}.jpg`;
	preloadImage(url);
	comptonImages.push(url);
}

for(var i=10;i<61;i++){
	var url = `data/img/compton/00${i}.jpg`;
	preloadImage(url);
	comptonImages.push(url);
}
////////////////////////////////////////////////////////////////////////
var bigW,
	bigH,
	imgW,
	imgH,
	pinScene;

function checkLabels(imgW) {

			console.log(imgW);
			console.log(bigLabels);
			//remove if small and not removed
			if(imgW<=850 && bigLabels==true){
			  d3.selectAll(".bigOnly")
			  .transition(1000)
			  .style("display", "none");
			  bigLabels==false;
			}
			//add if large and removed
			else if(imgW>850 && bigLabels==false){
			 d3.selectAll(".bigOnly")
			 .transition(1000)
			 .style("display", "block");
			}
	}


////////////////////////////////////////////////////////////////////////
//////////////////////////////////////

var resizeCounter= 0;

function sizeFrame() {
	resizeCounter++;
		//get window dimensions
bigW = window.innerWidth;
bigH = window.innerHeight;
aspectRatio = bigW/bigH;

//maintain aspect ratio if possible
if(aspectRatio>=1.6236){
	//set img dimensions
	d3.select("#imageHolder").style("height", function(d){
		return bigH*.95 + "px";
	});
	d3.select("#imageHolder").style("width", function(d){
		var h = parseFloat(d3.select("#imageHolder").style("height"));
		return h*1.6236 + "px";
	});

	//calculate padding
	imgW = parseFloat(d3.select("#imageHolder").style("width")); //img width
	imgH = parseFloat(d3.select("#imageHolder").style("height")); //img height
	var pad= `${(bigW- imgW)/2}px`;
	d3.select("#imageHolder").style("padding-left", pad);
} 

//or crop sides
else {
	//set img dimensions
	d3.select("#imageHolder").style("width", function(d){
		return bigW + "px";
	});
	d3.select("#imageHolder").style("height", function(d){
		var w = parseFloat(d3.select("#imageHolder").style("width"));
		return w*.6159 + "px";
	});
	//calculate padding
	imgW = parseFloat(d3.select("#imageHolder").style("width")); //img width
	imgH = parseFloat(d3.select("#imageHolder").style("height")); //img height
	var pad= `${(bigW- imgW)/2}px`;
	d3.select("#imageHolder").style("padding-left", pad);
}

	checkLabels(imgW);

	//set tween durations based on window height
	setDurations();
	//reset pinScene if not first frameSize
	if(resizeCounter !=1){
		resetScene();

	}

	//store original left as custom attribute
	if(resizeCounter==1){

		d3.selectAll("div.g-Labels,div.g-labels")
			.attr("originalLeft", function(){
				return d3.select(this).style("left");
			});
}

//shift labels right if small
var shiftFactor = .008333333;
var originalLeft;

	if(imgW<1000){
		//target labels
		d3.selectAll("div.g-Labels,div.g-labels")
			.style("left", function(){
			//custom shift for downtown
			if(d3.select(this).attr("downtown")=="true"){
				console.log("downtown");
				shiftFactor = .003;
			}

	var newLeft = parseFloat(d3.select(this).attr("originalLeft")) + (1000-imgW)*shiftFactor + "%";
				return newLeft;
			});
			//custom shiftUp for eastLA
			d3.select(".eastLA")
				.style("top", function(){
					var newTop = parseFloat(d3.select(this).attr("originalTop")) - (1000-imgW)*.003 + "%";
					return newTop;
				});



	}
	///
/*
	
/*	
	//adjust label position if small
	if()
*/


	
}
//invoke on load
sizeFrame();

///resize functions
window.addEventListener("resize", resizeThrottler, false);

  var resizeTimeout;
  function resizeThrottler() {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if ( !resizeTimeout ) {
      resizeTimeout = setTimeout(function() {
        resizeTimeout = null;
        actualResizeHandler();
     
       // The actualResizeHandler will execute at a rate of 15fps
       }, 50);
    }
  }

  function actualResizeHandler() {
    sizeFrame();
    //way to change pin location?
  }


  //set label fadetime in ms
  var fadeTime = 1000;
  //for fading in/out labels
  function switchOpacity(target,goal){
  		//check if already desired, change if not
  		if(d3.select(target).style("opacity") != goal){
  			d3.selectAll(target)
  				.transition(fadeTime)
  				.style("opacity", goal);
  		}

  }

/////////////////
//CREATE ALL TWEENS

//create coast image tween
var coastObj = {curImg: 0};

  coast = TweenMax.to(coastObj, 5,{
	curImg: coastImages.length - 1,
	roundProps: "curImg",
	immediateRender: false,
	ease: Linear.easeNone,
	onUpdate: function(){
		$("#myimg").attr("src", coastImages[coastObj.curImg]);
		//fade in opener labels backwards
		if(coastObj.curImg<=2 && coastObj.curImg!=0){
			switchOpacity(".openerLabels",1);
		}
		//fade out opener Labels
		if(coastObj.curImg>2){
			switchOpacity(".openerLabels",0);
		}
		//fade in coast labels
		if(coastObj.curImg>=coastImages.length-2){
			switchOpacity(".coastLabels",1);
		}
		//fade out coast labels
		if(coastObj.curImg<coastImages.length-2){
			switchOpacity(".coastLabels",0);
		}

}		
});


//create disparity image tween
var disparityObj = {curImg: 0};

	 disparity = TweenMax.to(disparityObj, 5,{
	curImg: disparityImages.length - 1,
	roundProps: "curImg",
	immediateRender: false,
	ease: Linear.easeNone,
	onUpdate: function(){
		$("#myimg").attr("src", disparityImages[disparityObj.curImg]);
		//fade in coast labels backwards
		if(disparityObj.curImg<=2 && disparityObj.curImg!=0){
			switchOpacity(".coastLabels",1);
		}
		//fade out coast labels
		if(disparityObj.curImg>2){
			switchOpacity(".coastLabels",0);
		}

		//fade in disparity labels
		if(disparityObj.curImg>=disparityImages.length-2){
			switchOpacity(".disparityLabels",1)
		}
		//fade out disparity labels backwards
		if(disparityObj.curImg<disparityImages.length-2){
			switchOpacity(".disparityLabels",0);
		}
		

	}
});

//create compton image tween
var comptonObj = {curImg: 0};

	 compton = TweenMax.to(comptonObj, 5,{
	curImg: comptonImages.length - 1,
	roundProps: "curImg",
	immediateRender: false,
	ease: Linear.easeNone,
	onUpdate: function(){
		$("#myimg").attr("src", comptonImages[comptonObj.curImg]);
		
		//fade in disparity labels backwards
		if(comptonObj.curImg<=2 && comptonObj.curImg!=0){
			switchOpacity(".disparityLabels",1);
		}
		//fade out disparity labels
		if(comptonObj.curImg>2){
			switchOpacity(".disparityLabels",0);
		}
		
		//fade in compton labels
		if(comptonObj.curImg>=comptonImages.length-2){
			switchOpacity(".comptonLabels",1)
		}
		//fade out compton labels backwards
		if(comptonObj.curImg<comptonImages.length-2){
			switchOpacity(".comptonLabels",0);
		}
		
	}
});


//create growth image tween
var growthObj = {curImg: 0};

	 growth = TweenMax.to(growthObj, 5,{
	curImg: growthImages.length - 1,
	roundProps: "curImg",
	immediateRender: false,
	ease: Linear.easeNone,
	onUpdate: function(){
		$("#myimg").attr("src", growthImages[growthObj.curImg]);
		//fade in opener labels
		if(growthObj.curImg>=growthImages.length-2){
			switchOpacity(".openerLabels",1);
		}
		//fade out opener labels
		if(growthObj.curImg<growthImages.length-2){
			switchOpacity(".openerLabels",0);
		}
	}
});

//init controller
var controller = new ScrollMagic.Controller();

var length,
	hookT,
	dur0,
	dur1,
	dur2,
	dur3;

//set all durations
 function setDurations(){
 	//set pin length
 	length = parseFloat(d3.select("#trigger").style("height"));
	hookT = 1- (bigH-imgH)/bigH*.5;
	//set duration equal to height of step
	dur0 = parseFloat(d3.select("#growth").style("height"));
	dur1 = parseFloat(d3.select("#coast").style("height"));
	dur2 = parseFloat(d3.select("#disparity").style("height"));
	dur3 = parseFloat(d3.select("#compton").style("height"));
 }


 //pin img_sequence for duration
 var pinScene = new ScrollMagic.Scene({
	triggerElement: "#trigger",
	triggerHook: hookT,
	duration: length
})
 	.setPin("#img_sequence", {pushFollowers:false})
	//.addIndicators()
	.addTo(controller);
  
  function resetScene(){
 	//
  	pinScene = pinScene.destroy(true);
  	pinScene = new ScrollMagic.Scene({
	triggerElement: "#trigger",
	triggerHook: hookT,
	duration: length
})
 	.setPin("#img_sequence", {pushFollowers:false})
	//.addIndicators()
	.addTo(controller);
  }

//growth scene
var growthScene = new ScrollMagic.Scene({
	triggerElement: "#growth",
	triggerHook: .9,
	duration: dur0
})	
	.setTween(growth)
	//.addIndicators()
	.addTo(controller);

//coast scene
var coastScene = new ScrollMagic.Scene({
	triggerElement: "#coast",
	triggerHook: .9,
	duration: dur1	//scene lasts for scroll distance of ____
})
	.setTween(coast)
	//.addIndicators()
	.addTo(controller);

//disparity scene
var disparityScene = new ScrollMagic.Scene({
	triggerElement: "#disparity",
	triggerHook: .9,
	duration: dur2	//scene lasts for scroll distance of ____
})
	.setTween(disparity)
	//.addIndicators()
	.addTo(controller);

//compton scene
var comptonScene = new ScrollMagic.Scene({
	triggerElement: "#compton",
	triggerHook: .9,
	duration: dur3	//scene lasts for scroll distance of ____
})
	.setTween(compton)
	//.addIndicators()
	.addTo(controller);


