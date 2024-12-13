// ---------Responsive-navbar-active-animation-----------
function test(){
	var tabsNewAnim = $('#navbarSupportedContent');
	var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
	var activeItemNewAnim = tabsNewAnim.find('.active');
	var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
	var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
	var itemPosNewAnimTop = activeItemNewAnim.position();
	var itemPosNewAnimLeft = activeItemNewAnim.position();
	$(".hori-selector").css({
		"top":itemPosNewAnimTop.top + "px", 
		"left":itemPosNewAnimLeft.left + "px",
		"height": activeWidthNewAnimHeight + "px",
		"width": activeWidthNewAnimWidth + "px"
	});
	$("#navbarSupportedContent").on("click","li",function(e){
		$('#navbarSupportedContent ul li').removeClass("active");
		$(this).addClass('active');
		var activeWidthNewAnimHeight = $(this).innerHeight();
		var activeWidthNewAnimWidth = $(this).innerWidth();
		var itemPosNewAnimTop = $(this).position();
		var itemPosNewAnimLeft = $(this).position();
		$(".hori-selector").css({
			"top":itemPosNewAnimTop.top + "px", 
			"left":itemPosNewAnimLeft.left + "px",
			"height": activeWidthNewAnimHeight + "px",
			"width": activeWidthNewAnimWidth + "px"
		});
	});
}
$(document).ready(function(){
	setTimeout(function(){ test(); });
});
$(window).on('resize', function(){
	setTimeout(function(){ test(); }, 500);
});
$(".navbar-toggler").click(function(){
	$(".navbar-collapse").slideToggle(300);
	setTimeout(function(){ test(); });
});



// --------------add active class-on another-page move----------
jQuery(document).ready(function($){
	// Get current path and find target link
	var path = window.location.pathname.split("/").pop();

	// Account for home page with empty path
	if ( path == '' ) {
		path = 'index.html';
	}

	var target = $('#navbarSupportedContent ul li a[href="'+path+'"]');
	// Add active class to target link
	target.parent().addClass('active');
});



// ----------------- Seach bar function -----------------//

const btnSearch = document.getElementById("btnSearch");
const btnResetSearch = document.getElementById("btnClear");

function searchTravel() {
    const input = document.getElementById('travelInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation.json')
    .then(response => response.json())
    .then(data => {

        if (input !== '') {
            if (input.includes('beach')) {
                const beaches = data.beaches;
                beaches.forEach(beach => {
                    resultDiv.innerHTML += `
                    <div class="result-item">
                    <div class="image-section"> 
                    <img src="${beach.imageUrl}" alt="${beach.name}">
                    </div><div class="text-section">
                    <h2>${beach.name}</h2>
                    <p>${beach.description}</p>
                    </div>
                    </div>`;
                });
            }

            if (input.includes('temple')) {
                const temples = data.temples;
                temples.forEach(temple => {
                    resultDiv.innerHTML += `
                    <div class="result-item">
                    <div class="image-section"> 
                    <img src="${temple.imageUrl}" alt="${temple.name}">
                    </div><div class="text-section">
                    <h2>${temple.name}</h2>
                    <p>${temple.description}</p>
                    </div>
                    </div>`;
                });
            }

            if (input.includes('country') || input.includes('countries')) {
                const countries = data.countries;
                countries.forEach(country => {
                    country.cities.forEach(city => {
                        resultDiv.innerHTML += `
                        <div class="result-item">
                        <div class="image-section"> 
                        <img src="${city.imageUrl}" alt="${city.name}">
                        </div><div class="text-section">
                        <h2>${city.name}</h2>
                        <p>${city.description}</p>
                        </div>
                        </div>`;
                    });
                });
            }
        }

    })
    
    .catch(error => {
        console.log('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}

    btnSearch.addEventListener('click', searchTravel);

	function resetSearch() {
		document.getElementById("travelInput").value = "";
		const resultDiv = document.getElementById('result');
		resultDiv.innerHTML = '';
	}
	btnResetSearch.addEventListener('click', resetSearch);