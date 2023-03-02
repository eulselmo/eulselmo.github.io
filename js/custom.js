jQuery(document).ready(function(){
  var options = {
    accessibility: true,
    prevNextButtons: true,
    pageDots: true,
    setGallerySize: false,
    arrowShape: {
      x0: 10,
      x1: 60,
      y1: 50,
      x2: 60,
      y2: 45,
      x3: 15
    }
  };

  var carousel = document.querySelector('[data-carousel]');
  var slides = document.getElementsByClassName('carousel-cell');
  var flkty = new Flickity(carousel, options);

  flkty.on('scroll', function () {
    flkty.slides.forEach(function (slide, i) {
      var image = slides[i];
      var x = (slide.target + flkty.x) * -1/3;
      image.style.backgroundPosition = x + 'px';
      image.style.transform = "translateX(0%)!important";
    });
  });

  var $carousel = $('.carousel').flickity({
    // otras opciones
    initialIndex: 0
  });
  
  $carousel.on('scroll.flickity', function () {
    $carousel.find('.carousel-cell').each(function (i, cell) {
      var $cell = $(cell);
      var x = ($cell.position().left - $carousel.position().left) - ($carousel.width() / 2) + ($cell.width() / 2);
      $cell.css('background-position', x + 'px');
      $cell.css('transform', 'translateX(0)');
    });
  });
});

/*jQuery(document).ready(function(){
  // if (jQuery(window).width() <= 600) {
    // VARIABLES
    var counter = 1;
    var scrollDirection;
    var slides = $('#main section');
    var slidesLength = slides.length;
    var inTransition = false;

    // SCROLL DISTANCES 
    function scrollAnimate(distance){
      inTransition = true;
      $('#main').css('transform','translate3d(0,' + distance + '%,0)');
      setTimeout(function(){
        inTransition = false;
      }, 1300);
    };

    // SCROLL ANIMATIONS AND LOGIC
    function scrollLogic(){
      //---------------- DOWN TRANSITIONS ----------------------------
      // SLIDE 1 --> SLIDE 2
      if( counter == 1 && scrollDirection == "down" ){
        scrollAnimate(-25);
      }

      // SLIDE 2 --> SLIDE 3
      else if( counter == 2 && scrollDirection == "down" ){
        scrollAnimate(-50);
      } 

      // SLIDE 3 --> SLIDE 4
      else if( counter == 3 && scrollDirection == "down" ){
        scrollAnimate(-75);
      } 

      //---------------- UP TRANSITIONS ----------------------------
      // SLIDE 5 --> SLIDE 4
      else if( counter == 5 && scrollDirection == "up" ){
        scrollAnimate(-75);
      }

      // SLIDE 4 --> SLIDE 3
      else if( counter == 4 && scrollDirection == "up" ){
        scrollAnimate(-50);
      }

      // SLIDE 3 --> SLIDE 2
      else if( counter == 3 && scrollDirection == "up" ){
        scrollAnimate(-25);
      }

      // SLIDE 2 --> SLIDE 1
      else if( counter == 2 && scrollDirection == "up" ){
        scrollAnimate(0);
      }

      else{
        inTransition = false;
      };

      //---------------- UPDATE COUNTER ----------------------------
      if( scrollDirection == "down" && counter < slidesLength ){
        counter++;
      } else if( scrollDirection == "up" && counter > 1 ){
        counter--;
      };
    };

    // creates a global "addWheelListener" method
    (function(window,document) {

        var prefix = "", _addEventListener, onwheel, support;

        // detect event model
        if ( window.addEventListener ) {
            _addEventListener = "addEventListener";
        } else {
            _addEventListener = "attachEvent";
            prefix = "on";
        }

        // detect available wheel event
        support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
                  document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
                  "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

        window.addWheelListener = function( elem, callback, useCapture ) {
            _addWheelListener( elem, support, callback, useCapture );

            // handle MozMousePixelScroll in older Firefox
            if( support == "DOMMouseScroll" ) {
                _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
            }
        };

        function _addWheelListener( elem, eventName, callback, useCapture ) {
            elem[ _addEventListener ]( prefix + eventName, support == "wheel" ? callback : function( originalEvent ) {
                !originalEvent && ( originalEvent = window.event );

                // create a normalized event object
                var event = {
                    // keep a ref to the original event object
                    originalEvent: originalEvent,
                    target: originalEvent.target || originalEvent.srcElement,
                    type: "wheel",
                    deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
                    deltaX: 0,
                    delatZ: 0,
                    preventDefault: function() {
                        originalEvent.preventDefault ?
                            originalEvent.preventDefault() :
                            originalEvent.returnValue = false;
                    }
                };
                
                // calculate deltaY (and deltaX) according to the event
                if ( support == "mousewheel" ) {
                    event.deltaY = - 1/40 * originalEvent.wheelDelta;
                    // Webkit also support wheelDeltaX
                    originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
                } else {
                    event.deltaY = originalEvent.detail;
                }

                // it's time to fire the callback
                return callback( event );

            }, useCapture || false );
        }

    })(window,document);


    // LISTEN FOR WHEEL SCROLL 
    // addWheelListener( document.body, function(e) { 

    //   if (inTransition){
    //     return;
    //   };

    //   // DETERMINE WHEEL scrollDirection
    //   if (e.deltaY > 0){
    //     scrollDirection = "down";
    //   } else if (e.deltaY < 0) {
    //     scrollDirection = "up";
    //   };
          
    //   scrollLogic();
      
    // });

    // LISTEN FOR TOUCH SWIPE
  $('#main').swipe({
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      if (inTransition) {
        return;
      }

      // DETERMINE SWIPE DIRECTION
      if (direction == "down") {
        scrollDirection = "down";
      } else if (direction == "up") {
        scrollDirection = "up";
      }

      scrollLogic();
    }
  });

    // KeyStroke Support
    $(window).keydown(function(e){
        
        if (e.keyCode == 38){
          scrollDirection = "up";
        } else if (e.keyCode == 40){
          scrollDirection = "down";
        } else if (e.keyCode == 39){
          scrollDirection = "down";
        } else if (e.keyCode = 37){
          scrollDirection = "up";
        } else {
          return;
        };
      
      scrollLogic();
      
    });

    // Swipe Support
    $('#wrapper').swipe({
      swipe:function(event, direction, distance, duration, fingerCount){

        if (direction == "up"){
          scrollDirection = "down";
        } else if (direction == "down"){
          scrollDirection = "up";
        };

        scrollLogic();
        
      },
      threshold:100
    });
  // }
});*/