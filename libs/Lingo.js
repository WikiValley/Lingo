jQuery(function ($){
	
	$(".tooltip")
	.mouseenter(function(){

		var tip = $(this);
		var wrapper = tip.find(".tooltip_tipwrapper");
		var tipdef = wrapper.find(".tooltip_tip");

		var maxAvailableWidth = window.innerWidth - 15; // -15 for scrollbar
		var maxAvailableHeightAbove = tip.offset().top - $(window).scrollTop() - 5;
		var maxAvailableHeightBelow = window.innerHeight - (tip.offset().top - $(window).scrollTop()) - tip.outerHeight() - 5 - 15;  // -15 for scrollbar

		var maxWidthWithoutBreak = maxAvailableWidth / 3;

		wrapper
		.css({
			'visibility': 'visible',
			'display': 'block',
			'width': '10000000px'
		});
	
		
		tipdef.css({
			'position': 'fixed',
			'width': 'auto',
			'top': '0px',
			'left': '0px'
		});

		// natural width is the width without any constraints
		var naturalWidth = tipdef.width();
		// natural height is the height without any constraints
		var naturalHeight = tipdef.height();

		var borderWidth = tipdef.outerWidth() - naturalWidth;

		maxAvailableWidth -= borderWidth;
		maxAvailableHeightAbove -= borderWidth;
		maxAvailableHeightBelow -= borderWidth;
		maxWidthWithoutBreak -= borderWidth;

		tipdef.width( maxAvailableWidth );

		// height if constrained to the window width, i.e.
		// the minimum width necessary if the full window width were available
		var heightAtMaxWidth = tipdef.height();

		// The tooltip will be placed above the term if it does fit above, but
		// not below. If it is to high for either, it will be put below at
		// maximum width so at least the first part is visible.
		if ( heightAtMaxWidth > maxAvailableHeightBelow ) {
			// will not fit below

			if ( heightAtMaxWidth > maxAvailableHeightAbove ) {
				// will neither fit above nor below
				var placeAbove = false;
				var tooLarge = true;
				var maxAvailableHeight = maxAvailableHeightBelow;

			} else {
				// will fit above
				var placeAbove = true;
				var tooLarge = false;
				var maxAvailableHeight = maxAvailableHeightAbove;
			}
		} else {
			// will fit below
			var placeAbove = false;
			var tooLarge = false;
			var maxAvailableHeight = maxAvailableHeightBelow;
		}

		if ( tooLarge ) {

			// if it is too large anyway, just set max available width and be
			// done with it
			wrapper.css({
				'width': maxAvailableWidth + 'px',
				'padding-left': '10px',
				'left': '0px',
				'top': '0px',
				'padding-bottom': '0px',
				'padding-top' : (tip.outerHeight() + 5 ) +'px'
			});

		} else {

			if ( naturalWidth > maxWidthWithoutBreak ) {

				var width = Math.max( Math.sqrt( 5 * naturalWidth * naturalHeight ), maxWidthWithoutBreak );
				width = Math.min( width, maxAvailableWidth );

			} else {

				var width = naturalWidth;

			}

			tipdef.width( width );

			var rounds = 0;

			while ( tipdef.height() > maxAvailableHeight && rounds < 5 ) {
				width = Math.min (width * ( tipdef.height() / maxAvailableHeight ), maxAvailableWidth);
				tipdef.width ( width );
				rounds++;
			}

			wrapper.height(tipdef.height());
			
			var maxAvailableWidthRight = window.innerWidth - (tip.offset().left - $(window).scrollLeft() ) - borderWidth;

			if ( maxAvailableWidthRight - 10 >= width ) {
				// will not bump into right window border
				wrapper.css({
					'width': (width + 10) + 'px',
					'padding-left': '10px',
					'left': '0px'
				});

			} else {
				// will bump into right window border
				var left = maxAvailableWidthRight - width - borderWidth;
				wrapper.width(width);
				wrapper.css({
					'width': width + 'px',
					'padding-left': '0px',
					'left': left + 'px'
				});
			}

			if ( placeAbove ) {
				wrapper.css({
					'top': ( - tipdef.outerHeight() - 5) + 'px',
					'padding-bottom': (tip.outerHeight() + 5 ) +'px',
					'padding-top' : '0px'
				});

			} else {
				wrapper.css({
					//					'position': 'absolute',
					'top': '0px',
					'padding-bottom': '0px',
					'padding-top' : (tip.outerHeight() + 5 ) +'px'
				});
			}


		}

		tipdef.css({
			'position': 'relative'
		});

		
		wrapper
		.css({
			'height': 'auto',
			'visibility': 'visible',
			'display': 'none'
		})
		
		.fadeIn(200);
	})
	
	.mouseleave(function(){
		$(".tooltip_tipwrapper", this).fadeOut(200);
	});
	

});