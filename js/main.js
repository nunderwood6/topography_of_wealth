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

var images = [];

for(var i=1;i<10;i++){
	var url = `data/img/000${i}.jpg`;
	preloadImage(url);
	images.push(url);
}

for(var i=10;i<61;i++){
	var url = `data/img/00${i}.jpg`;
	preloadImage(url);
	images.push(url);
}
////////////////////////////////////////////////////////////////////////
//calculate padding
var bigW = window.innerWidth; //total width
var imgW = parseFloat(d3.select("#myimg").style("width")); //img width
var pad= `${(bigW- imgW)/2}px`;


d3.select("#myimg").style("padding-left", pad);

/////////////////
//create image tween
var obj = {curImg: 0};

var tween = TweenMax.to(obj, 5,{
	curImg: images.length - 1,
	roundProps: "curImg",
	immediateRender: true,
	ease: Linear.easeNone,
	onUpdate: function(){
		$("#myimg").attr("src", images[obj.curImg]);
	}
});


//init controller
var controller = new ScrollMagic.Controller();


//create scene
var firstFly = new ScrollMagic.Scene({
	triggerElement: "#trigger",
	triggerHook: 0.1,
	duration: '300vh',	//scene lasts for scroll distance of 100px
})
	.setTween(tween)
	.setPin("#img_sequence") //pins element for scene duration
	.addIndicators()
	.addTo(controller);



//first text scroll
var firstText = new ScrollMagic.Scene({
	triggerElement: "#text1",
	triggerHook:1,
	duration: 2000,
	reverse: true
})
  .setPin("#img_sequence", {pushFollowers:false})
  .addIndicators()
  .addTo(controller);


