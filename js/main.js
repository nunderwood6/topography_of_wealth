//preload images
function preloadImage(url){
	var img = new Image();
	img.onload = notify_complete;
	img.src=url;
}

function notify_complete()
{
    console.log('The image has been loaded into the browser cache.');
}

//use higher resolution for large screens
	if(window.innerWidth<=500){
		var big = "";
	}else{
		var big = "_big";
	}


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
	imgH;

function sizeFrame() {
		//get window dimensions
bigW = window.innerWidth;
console.log("Width = " +bigW);
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

/////////////////
//create coast image tween
var coastObj = {curImg: 0};

var coast = TweenMax.to(coastObj, 5,{
	curImg: coastImages.length - 1,
	roundProps: "curImg",
	immediateRender: true,
	ease: Linear.easeNone,
	onUpdate: function(){

		$("#myimg").attr("src", coastImages[coastObj.curImg]);
		//fade in labels
		if(coastObj.curImg==coastImages.length-1){
			d3.selectAll(".g-Labels").style("opacity", 1);
		}
		//fade out labels
		if(coastObj.curImg==coastImages.length-2){
			d3.selectAll(".g-Labels").style("opacity", 0);
		}

}		
});

//create disparity image tween
var disparityObj = {curImg: 0};

var disparity = TweenMax.to(disparityObj, 5,{
	curImg: disparityImages.length - 1,
	roundProps: "curImg",
	immediateRender: true,
	ease: Linear.easeNone,
	onUpdate: function(){
		$("#myimg").attr("src", disparityImages[disparityObj.curImg]);
		/*//fade out labels
		if(disparityObj.curImg==0){
			d3.selectAll(".g-Labels").style("opacity", 1);
		}*/

		//fade out labels
		if(disparityObj.curImg==1){
			console.log("out");
			d3.selectAll(".g-Labels").style("opacity", 0);
		}
	}
});

//create compton image tween
var comptonObj = {curImg: 0};

var compton = TweenMax.to(comptonObj, 5,{
	curImg: comptonImages.length - 1,
	roundProps: "curImg",
	immediateRender: true,
	ease: Linear.easeNone,
	onUpdate: function(){
		$("#myimg").attr("src", comptonImages[comptonObj.curImg]);
	}
});

//create growth image tween
var growthObj = {curImg: 0};

var growth = TweenMax.to(growthObj, 5,{
	curImg: growthImages.length - 1,
	roundProps: "curImg",
	immediateRender: true,
	ease: Linear.easeNone,
	onUpdate: function(){
		$("#myimg").attr("src", growthImages[growthObj.curImg]);
	}
});

//init controller
var controller = new ScrollMagic.Controller();


//first pin img_sequence for duration
var length = parseFloat(d3.select("#trigger").style("height"));
var hookT = 1- (bigH-imgH)/bigH*.5;

var pin = new ScrollMagic.Scene({
	triggerElement: "#trigger",
	triggerHook: hookT,
	duration: length
})
	.setPin("#img_sequence", {pushFollowers:false})
	//.addIndicators()
	.addTo(controller);

//growth scene
//set duration equal to height of step
var dur0 = parseFloat(d3.select("#growth").style("height"));

var growthScene = new ScrollMagic.Scene({
	triggerElement: "#growth",
	triggerHook: .9,
	duration: dur0
})	
	.setTween(growth)
	//.addIndicators()
	.addTo(controller);

//coast scene
//set duration equal to height of text step
var dur1 = parseFloat(d3.select("#coast").style("height"));

var coastScene = new ScrollMagic.Scene({
	triggerElement: "#coast",
	triggerHook: .9,
	duration: dur1	//scene lasts for scroll distance of ____
})
	.setTween(coast)
	//.addIndicators()
	.addTo(controller);

//disparity scene
//set duration equal to height of text step
var dur2 = parseFloat(d3.select("#disparity").style("height"));

var disparityScene = new ScrollMagic.Scene({
	triggerElement: "#disparity",
	triggerHook: .9,
	duration: dur2	//scene lasts for scroll distance of ____
})
	.setTween(disparity)
	//.addIndicators()
	.addTo(controller);

//compton scene
//set duration equal to height of text step
var dur3 = parseFloat(d3.select("#compton").style("height"));

var comptonScene = new ScrollMagic.Scene({
	triggerElement: "#compton",
	triggerHook: .9,
	duration: dur3	//scene lasts for scroll distance of ____
})
	.setTween(compton)
	//.addIndicators()
	.addTo(controller);

/*





//set duration equal to height of text step
var d1 = parseFloat(d3.select("#text1").style("height"));


//first text scroll
var firstText = new ScrollMagic.Scene({
	triggerElement: "#text1",
	triggerHook:1,
	duration: d1,
	reverse: true
})
  .setPin("#img_sequence", {pushFollowers:false})
  .addIndicators()
  .addTo(controller);
*/

