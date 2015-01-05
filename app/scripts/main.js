(function () {
	//'use strict';
	var wHeight, scrollT;
	var projCounter = 0;
	var polylineCoord = [[270,0],[270,260],[270,500],[270,800],[600,800],[600,1100],[600,1600]];
	var draw = SVG('drawing').size($(".projects").width(), 5000);
	var polyline = draw.polyline([polylineCoord[0]]).fill('none').stroke({ width: 1, color: "#efeff1"});
	var polyline_proj1 = draw.polyline([polylineCoord[1]]).fill('none').stroke({ width: 1, color: "#efeff1"});
	var polyline_proj2 = draw.polyline([polylineCoord[5]]).fill('none').stroke({ width: 1, color: "#efeff1"});

	$('.open-menu').click(function(e){
		$('.menu').addClass('active');
		$('body').css('overflow','hidden').addClass('menu-opened');
		$('.menu-wrapper').css('display','block').stop().animate({opacity:0.8},400);
	});

	$('.menu-wrapper').click(function(){
		$('.menu').removeClass('active');
		$('body').removeClass('menu-opened');
		$('.menu-wrapper').stop().animate({opacity:0},400,function(){
			$(this).css('display','none');
			$('body').css('overflow','auto');
		});
	});

	$(window).scroll(onScroll);

	function onScroll(){
  		scrollT = $('html').scrollTop() || $('body').scrollTop();
    	wHeight = $(window).height();
    	
    	if(scrollT>(wHeight - 50)){
			$(".open-menu .black").addClass("active");
		}else{
			$(".open-menu .black").removeClass("active");
		}

		$('.project').each(function(i){
			var _this = $(this);
			var offsetTop = $(this).offset().top;
			if($(this).offset().top - scrollT < wHeight/2 && (!$(this).hasClass('animated') && !$(this).hasClass('animating'))){
				$(this).addClass('readyToAnimate');
			}
			if($(this).hasClass('readyToAnimate') && ($(this).prev('.project').hasClass('animated') || $(this).prev('.project').length <= 0)){
				drawProject(i+1, $(this));
			}
		});
	}

	function drawProject(i, _this){
		_this.removeClass('readyToAnimate').addClass('animating');
		if(i == 1){
			polyline.animate(400).plot([polylineCoord[0],polylineCoord[1]]).after(function(){
				draw.circle(0).fill('#2e4155').move(polylineCoord[1][0], polylineCoord[1][1]).animate(500).radius(6).after(function(){
					polyline_proj1.animate(400).plot([polylineCoord[1],[600,polylineCoord[1][1]]]);
					polyline.animate(400).plot([polylineCoord[0],polylineCoord[1],polylineCoord[2]]).after(function(){
						_this.removeClass('animating').addClass('animated');
						onScroll();
					});
					showProject(_this);
				});
			});
		}else if(i == 2){
			polyline.animate(400).plot([polylineCoord[0],polylineCoord[1],polylineCoord[2]]).after(function(){
				polyline.animate(400).plot([polylineCoord[0],polylineCoord[1],polylineCoord[2],polylineCoord[3]]).after(function(){
					polyline.animate(400).plot([polylineCoord[0],polylineCoord[1],polylineCoord[2],polylineCoord[3],polylineCoord[4]]).after(function(){
						polyline.animate(400).plot([polylineCoord[0],polylineCoord[1],polylineCoord[2],polylineCoord[3],polylineCoord[4],polylineCoord[5]]).after(function(){
							draw.circle(0).fill('#2e4155').move(polylineCoord[5][0], polylineCoord[5][1]).animate(500).radius(6).after(function(){
								polyline_proj2.animate(400).plot([polylineCoord[5],[270,polylineCoord[5][1]]]);
								polyline.animate(400).plot([polylineCoord[0],polylineCoord[1],polylineCoord[2],polylineCoord[3],polylineCoord[4],polylineCoord[5],polylineCoord[6]]).after(function(){
									_this.removeClass('animating').addClass('animated');
									onScroll();
								});
								showProject(_this);
							});
						});
					});
				});
			});
		}		
	}

	function showProject(_this){
		_this.find('.visuel').addClass('active');
		var content_item = _this.find('.content>div>*');
		content_item.each(function(i){
			var it = $(this);
			setTimeout(function(){
				it.addClass('active');
				if(i == content_item.length -1){
					setTimeout(function(){
						_this.find('.title').addClass('underlined');
					}, 200);
				}
			}, i*120);
		});
	}
	



	
	//var circle = draw.circle(32).fill('#f7f7f7').stroke({ width: 5, color: "#ffd22e" }).move(485, 65);

})();
