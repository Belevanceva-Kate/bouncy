$(document).ready(function() {
	
	//isotope filtration
	var $isotop = $('.grid').isotope({
		itemSelector: '.grid__item',
		masonry: {
			columnWidth: 40,
			gutter: 1,
			horizontalOrder: true
		}
	});

	$("body").on("click", ".filters li a", function(e) {
		e.preventDefault();
		$(".filters li a").removeClass("active");
		$(this).addClass("active");
		var filter = $(this).attr("data-filter");
		filter = filter == '*' ? filter : '.' + filter;
		$isotop.isotope({ filter: filter });
	});



	//smooth scrolling
	$("body").on("click", ".scrollTo", function(e) {
		e.preventDefault();
		var target = $(this).attr("href");
		var offset = Math.floor($(target).offset().top);
		$("html").animate({
			scrollTop: offset
		}, 1000, function() {

		});
			
	});



	//slider
	$(".slider").slick({
		dots: true,
		arrows: false
	});

});	

//map
function createMarker(coords, map) {
	return new google.maps.Marker({
		position: coords,
		map: map,
		icon: "img/beetroot.png",
		animation: google.maps.Animation.DROP
	});
}

function initMap() {

	var map, 
		marker,
		infoWindow,
		address 	= "Мариуполь, ул. Энгельса, 60",
		geocoder 	= new google.maps.Geocoder();

	geocoder.geocode({
		"address" : address
	}, function(result, status) {
		if (status == "OK" && result.length) {
			map = new google.maps.Map(document.getElementById('map'), {
				zoom: 13,
				center: result[0].geometry.location
			});
			marker = createMarker(result[0].geometry.location, map);
			
			infoWindow = new google.maps.InfoWindow({
				content: address
			});

			setTimeout(function() {
				infoWindow.open(map, marker);
			}, 1500);

		}
	});
}