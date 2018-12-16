function preloadImage(url){
	var img=new Image();
	img.src=url;
}


var images = [];

for(var i=1;i<10;i++){
	var url = `data/img/000${i}.png`;
	preloadImage(url);
	images.push(url);
}

for(var i=10;i<61;i++){
	var url = `data/img/00${i}.png`;
	preloadImage(url);
	images.push(url);
}

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
var containerScene = new ScrollMagic.Scene({
	triggerElement: "#trigger",
	duration: 500,	//scene lasts for scroll distance of 100px
	offset: 0		//start this scene after scrolling for 50px
})
	.setTween(tween)
	.setPin("#sticky") //pins element for scene duration
	.addIndicators()
	.addTo(controller);




  



