function copyText(element) {
	navigator.clipboard.writeText($("#"+element)[0].text);
	// Faire une info bull pour le copy
	$("#zonePopup").css("display", "none");
	//$("#popupText").html(element + " est copié !");
	
	/*
	$("#popupText").css("transform", "translateY(50px)");
	$("#popupText").css("opacity", "0");
	$("#popupText").css("transition", "transform 0.5s ease");
	*/
	
	setTimeout(function() {
		$("#zonePopup").css("display", "none");
	}, 2000);
	setTimeout(function() {
		$("#zonePopup").css("display", "flex");
		
		/*
		$("#popupText").css("transform", "translateY(0px)");
		$("#popupText").css("opacity", "0");
		*/
	}, 50);
	$("#zonePopup")[0].animate({top: 0}, 250*val+(25*val));
}

function moveArrow() {
	if(parseInt($(window).scrollTop() + $(window).height())+10 >= $(document).height()) {
		$("#zoneArrow").css("transform", "rotate(180deg)");
		$("html, body").animate({ scrollTop: "0" }, 500);
	} else {
		let pos = $(window).scrollTop() + $(window).height();
		$("html, body").animate({ scrollTop: pos }, 500);
		//$("html, body").animate({scroll: $(window).scrollTop() + $(window).height()}, 250);
		$("#zoneArrow").css("transform", "rotate(0deg)");
	}
}

function calculAge() {
	let ageDate = new Date($("#age")[0].textContent);
	let nowDate = new Date();
	let age = nowDate.getFullYear() - ageDate.getFullYear();
	if(nowDate.getMonth()+1 < ageDate.getMonth()+1 || nowDate.getDate() < ageDate.getDate()) {
		age -= 1;
	}
	$("#age")[0].textContent = "(" + age.toString() + " ans)";
}

$(document).ready(function() {
	calculAge();
});