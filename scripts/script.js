function copyText(element) {
	// Copy le texte
	navigator.clipboard.writeText($("#"+element).text());

	// Crée une info bull
	let popup = $('<div id="contentPopup"><div id="popup">Copier !</div></div>');
	$("body").append(popup);

	popup.css("display", "none");
	
	setTimeout(function() {
		popup.css("display", "none");
		popup.remove();
	}, 2000);
	setTimeout(function() {
		popup.css("display", "flex");
	}, 50);
}

// Calcul l'age et l'affiche (pour ne pas le changer chaque année ^o^)
function calculAge() {
	let ageDate = new Date($("#age").text().slice(1, -1));
	let nowDate = new Date();
	let age = nowDate.getFullYear() - ageDate.getFullYear();
	if(nowDate.getMonth()+1 < ageDate.getMonth()+1 || nowDate.getDate() < ageDate.getDate()) {
		age -= 1;
	}
	
	if(!isNaN(parseInt(age))) {
		$("#age").text("(" + age.toString() + " ans)");
		$("#age").css("display", "inline");
	}
}

// Fait défilé la page
function scrollArrow() {
	var scrollPosition = $(window).scrollTop();
	var windowHeight = $(window).height();
	var documentHeight = $(document).height();

	if (isAnimating) {
		return;
	}
	if(parseInt(scrollPosition + windowHeight) >= documentHeight - 100 || angleArrow == 180) {
		$("html, body").animate({ "scrollTop": "0" }, 250, () => {
			isAnimating = false;
		});
	} else {
		let pos = $("#zone3").offset().top + $("#zone3").height();
		if(actuZone != 3) {
			pos = $("#zone"+(actuZone+1)).offset().top;
		}
		$("html, body").animate({ "scrollTop": pos }, 250, () => {
			isAnimating = false;
		});
	}
	isAnimating = true;
}

// Detecter si il faut mettre la fleche vers le haut ou le bas
function rotateArrow() {
	var scrollPosition = $(window).scrollTop();
	var windowHeight = $(window).height();
	var documentHeight = $(document).height();
	
	if (scrollPosition === 0) {
		angleArrow = 0;
		$("#imgArrow").css("transform", "rotate("+angleArrow+"deg) scale(1, 0.5)");
		$(".apparition").addClass("invisible");
	}
	if(scrollPosition + windowHeight >= documentHeight - 100) {
		angleArrow = 180;
		$("#imgArrow").css("transform", "rotate("+angleArrow+"deg) scale(1, 0.5)");
	}
}

// Fonction pour le LazyLoad
function updateZone() {
	var scrollPosition = $(window).scrollTop();
	var windowHeight = $(window).height();

	$(".invisible").each(function() {
		if(scrollPosition + (windowHeight*0.85) >= $(this).offset().top) {
			$(this).removeClass("invisible");
		}
	});

	// Pour savoir où on se trouve
	if(scrollPosition >= $("#zone1").offset().top && scrollPosition < $("#zone1").offset().top + ($("#zone1").height()*0.75)) {
		actuZone = 1;
	} else if(scrollPosition >= Math.floor($("#zone2").offset().top) && scrollPosition < $("#zone2").offset().top + ($("#zone2").height()*0.75)) {
		actuZone = 2;
	} else if(scrollPosition >= Math.floor($("#zone3").offset().top) && scrollPosition < $("#zone3").offset().top + ($("#zone3").height()*0.75)) {
		actuZone = 3;
	}
}

// Fonction pour afficher ou masquer les card dans le "carousel"
function checkCard(id) {
	$("#defil"+id).children().each(function(index) {
		var distanceLeft = $(this).offset().left;
		var distanceRight = $(window).width() - ($(this).offset().left + $(this).outerWidth());

		var nbr = 2;
		if(valDec[id-1] < 0) {
			if(distanceLeft < ($(window).width() / 2) - ($(this).outerWidth(true) * nbr) || distanceRight < ($(window).width() / 2) - ($(this).outerWidth(true) * (nbr*2))) {
				$(this).addClass("hidden");
			}
			else {
				$(this).removeClass("hidden");
			}
		} else {
			if(distanceLeft < ($(window).width() / 2) - ($(this).outerWidth(true) * (nbr*2)) || distanceRight < ($(window).width() / 2) - ($(this).outerWidth(true) * nbr)) {
				$(this).addClass("hidden");
			}
			else {
				$(this).removeClass("hidden");
			}
		}
	});
}

// Fonction du "carousel"
function defilCard(id) {
	// Cache ou montre les card
	checkCard(id);
	
	// Fait défiler
	setTimeout(function() {
		$("#defil"+id).animate({ "margin-left": "+=" + valDec[id-1] + "px"}, 250, "linear");
		if(valDec[id-1] < 0) {
			posCard[id-1] += 1;
		} else {
			posCard[id-1] -= 1;
		}
		if(posCard[id-1] == $("#defil"+id).children().length-1 && valDec[id-1] < 0) {
			valDec[id-1] = -valDec[id-1];
		}
		if(posCard[id-1] == 0 && valDec[id-1] > 0) {
			valDec[id-1] = -valDec[id-1];
		}
		defilCard(id);
	}, 1500);
}

// Ecran de chargement
$("main").css("display", "none");
$("#loading-screen").css("display", "flex");
let container = $("#loading-screen").children();
let text = container.text().split('');
container.empty();
text.forEach((letter) => {
	$('<span/>', { text: letter, class: "letter", }).appendTo(container);
});

var isAnimating = false;
var angleArrow = 0;
var posCard = Array(0, 0);
var valDec = Array(-150, -150);
var themeDark = false;
var actuZone = 1;
$(window).on("load", () => {
	// Gestion de l'écran de chargement
	$("main").css("display", "initial");
	$("#loading-screen").remove();

	// Calcule l'age est l'affiche
	calculAge();
	
	// Gestion de la flèche de "navigation"
	$("#imgArrow").click(scrollArrow);
	$("#imgArrow").css("cursor", "pointer");
	$("#imgArrow").hover(function () {
			$(this).css({
				"background-color": "var(--color5)",
				"box-shadow": "0 2px 2px 0 rgba(var(--special2), 0.2), 0 4px 4px 0 rgba(var(--special2), 0.15)",
				"transform": "rotate("+angleArrow+"deg) scale(1.2, 0.7)"
			});
		}, function () {
			$(this).css({
				"background-color": "",
				"box-shadow": "",
				"transform": "rotate("+angleArrow+"deg) scale()"
			});
		}
	);
	$("#imgArrow").focus(function (e) { 
		e.preventDefault();
		$(this).css({
			"transform": "rotate("+angleArrow+"deg) scale(1.1, 0.6)",
			"opacity": 0.75
		});
	});
	rotateArrow();

	// Gestion de l'effet "Lazy-load"
	$(".apparition").addClass("invisible");
	updateZone();

	// Gestion des zones de "carousel"
	$(".defil").css({
		"flex-flow": "row nowrap",
		"justify-content": "flex-start",
		"width": "1000%",
		"margin-left": "calc(50% - 75px)"
	});
	defilCard(1);
	defilCard(2);

	// Gestion du thème de couleur avec un bouton  /!\ défaut : en taille mobile à cause du fond, le bouton est souvent mal contrasté
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		themeDark = true;
	} else {
		themeDark = false;
	}
	$("#zone-button-theme").css("display", "flex");
	$("#zone-button-theme").on("click", function() {
		if(themeDark) {
			$("body").css({
				"--color1": "#2C3E3D",
				"--color5": "#FFFFFF",
				"--special1": "255, 255, 255",
				"--special2": "44, 62, 61",
				"--iconTheme": "url(../images/Sun_icon.svg)",
				"--positionTheme": "left"
			});
			themeDark = false;
		} else {
			$("body").css({
				"--color1": "#FFFFFF",
				"--color5": "#2C3E3D",
				"--special1": "44, 62, 61",
				"--special2": "255, 255, 255",
				"--iconTheme": "url(../images/Moon_icon.svg)",
				"--positionTheme": "right"
			});
			themeDark = true;
		}
	});

	// Pour imprimer le site avec un bouton  /!\ Bug après un appui : bordure de l'about ne disparaît pas contrairement au reste ..
	$("#boutonPDF").click(function() {
		window.print();
	});
	$("#boutonPDF").removeAttr('href');
	
	// Gestion du scroll
	$(window).scroll(() => {
		rotateArrow();
		updateZone();
	});
	// Gestion du scroll sur écran tactile
	$(window).on({
		"touchmove": function(e) { 
			rotateArrow();
			updateZone();
		}
	});
});