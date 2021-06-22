// ==========jQuery==========
$(document).ready(function () {
	// $(`h1`).click(function () {
	// 	$(this).css(`background-color`, `#ff0000`);
	// });

	// Segment: Steaky navigation
	// Point: Implemented with waypoints plugin --> imakewebthings.com/waypoints
	const touchScreen = "ontouchstart" in window; // Remark: Detecting touch screen or not!
	const offset = touchScreen ? 60 : 82;
	$(`.js--section-features`).waypoint(
		// Remark: Triggers on reaching js--section-features
		function (direction) {
			if (direction === `down`) $(`nav`).addClass(`sticky`);
			// Remark: Trigger effects on nav
			else $(`nav`).removeClass(`sticky`);
		},
		{ offset: `${offset}px` }
	);

	// Segment: Scroll on buttons
	$(`.js--scroll-to-plans`).click(function (e) {
		e.preventDefault();
		$(`html, body`).animate(
			{
				scrollTop: $(`.js--section-plans`).offset().top - offset
			},
			1000
		);
	});

	$(`.js--scroll-to-features`).click(function (e) {
		e.preventDefault();
		$(`html, body`).animate(
			{
				scrollTop: $(`.js--section-features`).offset().top - offset
			},
			1000
		);
	});

	$(`.scroll-to-header`).click(function (e) {
		e.preventDefault();
		$(`html, body`).animate(
			{
				scrollTop: $(`header`).offset().top
			},
			1000
		);
	});

	// Segment: Navigation smooth scrolling snippet
	// Select all links with hashes
	$('a[href*="#"]')
		// Remove links that don't actually link to anything
		.not('[href="#"]')
		.not('[href="#0"]')
		.click(function (event) {
			// On-page links
			if (
				location.pathname.replace(/^\//, "") ==
					this.pathname.replace(/^\//, "") &&
				location.hostname == this.hostname
			) {
				// Figure out element to scroll to
				var target = $(this.hash);
				target = target.length
					? target
					: $("[name=" + this.hash.slice(1) + "]");
				// Does a scroll target exist?
				if (target.length) {
					// Only prevent default if animation is actually gonna happen
					event.preventDefault();
					scrollControl();

					$("html, body").animate(
						{
							scrollTop: target.offset().top - offset
						},
						1000
					);
				}
			}
		});

	// Segment: Animation on scroll
	// Point: Achieved with imakewebthings.com and animate.style
	$(`.js--wp-1`).waypoint(
		function (_) {
			$(`.js--wp-1`).addClass(
				`animated animate__animated animate__backInDown`
			);
		},
		{ offset: `40%` }
	);

	$(`.js--wp-2`).waypoint(
		function (_) {
			$(`.js--wp-2`).addClass(
				`animated animate__animated animate__fadeInUp`
			);
		},
		{ offset: `40%` }
	);

	$(`.js--wp-3`).waypoint(
		function (_) {
			$(`.js--wp-3`).addClass(
				`animated animate__animated animate__flipInX`
			);
		},
		{ offset: `40%` } // Remark: It is the distance between the content and the tip of the viewport!
	);

	$(`.js--wp-4`).waypoint(
		function (_) {
			$(`.js--wp-4`).addClass(`animate__animated animate__bounce`);
		},
		{ offset: `35%` }
	);

	// Segment: Mobile navigation
	const icon = document.querySelector(`.js--mobile-nav-icon i`);
	const nav = document.querySelector(`.main-nav`);
	const links = document.querySelectorAll(`.js--main-nav li`);
	let flag = true;

	const menuControl = function () {
		nav.classList.toggle(`nav-active`);
		icon.classList.toggle(`ion-navicon`);
		icon.classList.toggle(`ion-close`);
		document.querySelector(`.disable-scroll`).classList.toggle(`overlay`);
		links.forEach((lnk, i) => {
			if (lnk.style.animation) lnk.style.animation = ``;
			else
				lnk.style.animation = `navAnimation 0.5s ease forwards ${
					i / 5 + 0.5
				}s`;
		});
	};

	const scrollControl = function (scroll = false, close = true) {
		if (scroll) {
			document.querySelector(`.main-nav`).style.opacity = 1;
			const x = window.scrollX;
			const y = window.scrollY;
			window.onscroll = function () {
				window.scrollTo(x, y);
			};
		} else {
			window.onscroll = null;
			document.querySelector(`.main-nav`).style.opacity = 0;

			if (close) {
				menuControl();
			}
		}
	};

	icon.addEventListener(`click`, () => {
		menuControl();
		scrollControl(flag, false);
		flag = !flag;
	});

	// Segment: Mobile navigation with jQuery
	/* $(icon).click(function () {
		$(`.js--main-nav`).slideToggle(200);

		if ($(icon).hasClass(`ion-navicon`)) {
			$(icon).addClass(`ion-close`);
			$(icon).removeClass(`ion-navicon`);
		} else {
			$(icon).removeClass(`ion-close`);
			$(icon).addClass(`ion-navicon`);
		}
	}); */

	// Segment: Preventing element resize on keyboard opening on mobile
	setTimeout(function () {
		const viewheight = $(window).height();
		const viewwidth = $(window).width();
		const viewport = $("meta[name=viewport]");
		viewport.attr(
			"content",
			"height=" +
				viewheight +
				"px, width=" +
				viewwidth +
				"px, initial-scale=1.0"
		);
	}, 300);
});
