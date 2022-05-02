/*

	@TODO:

	- go to current element #top on resize (not sure)
	- DRY in scroll functions
	- preloader!
	- remove .active in #pictellers when we are on top
	- fix faq navigation sidebar
*/

$(function(){

	var containers = ['#talent','#how','#cam','#top','#join','#faq','#collaborators'];
	var camContainers = ['#cam1','#cam2','#cam3','#cam4','#cam5'];
	var headerHeight = $('header#top').outerHeight();
	var nav = $('#nav');
	var navHeight = nav.outerHeight();

	// how should it look like?
	function setupScreen(){
		$.each(containers,function(index,value){
			// set min-heights on each section
			if(value != '#collaborators') {
				$(value).css('min-height',$(window).height());
			}
			// reset header height, just in case
			headerHeight = $('header#top').outerHeight();
		});

		$('[data-spy="scroll"]').each(function () {
		  var $spy = $(this).scrollspy('refresh')
		});
	};

	// setup Screen on each resize.
	$(window).resize(function(){
		setupScreen();
	});

	// sticky navigation.
	$(window).scroll( function() {

		var pos = $(window).scrollTop();
		stickyNav(headerHeight, nav, navHeight);
		var currentSection = "";
		var currentFaqSection = "";

		var camPos = pos + 40;
		$.each(camContainers,function(index,value){
			if( camPos >= $(value).offset().top && camPos <= ($(value).offset().top + $(value).outerHeight()) ){
				currentSection = value;
			}
		});

		var faqPos = pos + 80;
		$.each($('#faq article'),function(index,value){

			if(faqPos >= $(value).offset().top && faqPos <= $(value).offset().top + $(value).outerHeight()) {
				currentFaqSection = value;
			}

		});

		if(currentSection){
			if($('#cam-nav:hidden')){
				$('#cam-nav').fadeIn('fast');
			}
		} else {
			if($('#cam-nav:visible')){
				$('#cam-nav').fadeOut('fast');
			}
		}

		// get boundaries to fix cam position
		if(pos > ($('#cam1').offset().top) && pos < $('#cam5').offset().top) {
			$('#cam .image-container').css('position','fixed');
			$('#cam .image-container').css('top',200);
		} else {
			// end line
			$('#cam .image-container').css('position','absolute');

			if(currentSection == '#cam5') {
				$('#cam .image-container').css('top',$('#cam').outerHeight() - $('#cam .image-container').outerHeight() - 18);
			} else {
				if(pos > $('#cam').offset().top + $('#cam').outerHeight()) {
					$('#cam .image-container').css('top',200);
				}
			}
		};

		if(currentSection == '#cam1') {
			$('#cam .image-container').css('background-position','0px 0px');
		}

		if(currentSection == '#cam2') {
			$('#cam .image-container').css('background-position','-540px 0px');
		}

		if(currentSection == '#cam3') {
			$('#cam .image-container').css('background-position','-1080px 0px');
		}

		if(currentSection == '#cam4') {
			$('#cam .image-container').css('background-position','-1620px 0px');
		}

		if(currentSection == '#cam5') {
			$('#cam .image-container').css('background-position','-2160px 0px');
		}

		// enable / disable links at the end of the animation
		$('#cam-nav a').removeClass('active');
		$('#cam-nav a[href="'+currentSection+'"]').addClass('active');

		// faq nav
		});


	function stickyNav(headerHeight, nav, navHeight) {
		if ($(window).scrollTop() >= (headerHeight - navHeight)){
			nav.addClass('fixed');
			$('a.arrow').attr('href', '#top');
			$('a.arrow').addClass('active');
		} else {
			nav.removeClass('fixed');
			$('a.arrow').removeClass('active');
			$('a.arrow').attr('href', '#talent');
		}
	}

	// scroll to page position.
	$('nav a, #top a, #talent a.call').not('.social').not('.story').bind('click',function(e){

		e.preventDefault();

		var $anchor = $(this);

		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1200,'easeOutQuint');

	});

	// cam scroll to page position.
	$('#cam-nav a').bind('click',function(e){

		e.preventDefault();

		var $anchor = $(this);

		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1200,'easeOutQuint');

	});


	// faq accordion
	$('#faq h2').bind('click',function(e){

		e.preventDefault();
		$(this).parent().find('.data').slideToggle('fast');

	});

	$('form#ss-form').submit(function(e){

		$('.error').html('');

		if($('#entry_2106843989').val() == "" || $('#entry_1741170631').val() == "" ||  $('#entry_10199464').val() == "" || $("#checkbox-legal").is(':checked') == false){
			$('.error').html('Por favor, revisa que has rellenado todo el formulario.');
			return false;
		}
	});


	$('form#subscription').submit(function(e){

		$('.error').html('');

		if($('#name').val() == "" || $('#mkiltk-mkiltk').val() == "" || $("#checkbox-sub-legal").is(':checked') == false){
			$('.error').html('Por favor, revisa que has rellenado todo el formulario.');
			return false;
		}
	});


	// setup the screen
	setupScreen();

		$('#preloader').fadeOut('slow');

});
