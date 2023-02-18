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
    });
  });

  // Modifica de forma instantanea en que punto se encuentra el menú dentro de la web
  $("#1 > a").click(function(){
    $(this).parent().addClass("customClass");
    $("#2").removeClass('customClass');
    $("#3").removeClass('customClass');
    $("#4").removeClass('customClass');
  });

  $("#2 > a").click(function(){
    $(this).parent().addClass("customClass");
    $("#1").removeClass('customClass');
    $("#3").removeClass('customClass');
    $("#4").removeClass('customClass');
  });

  $("#3 > a").click(function(){
    $(this).parent().addClass("customClass");
    $("#1").removeClass('customClass');
    $("#2").removeClass('customClass');
    $("#4").removeClass('customClass');
  });

  $("#4 > a").click(function(){
    $(this).parent().addClass("customClass");
    $("#1").removeClass('customClass');
    $("#2").removeClass('customClass');
    $("#3").removeClass('customClass');
  });

  // Identifica al recarga la url para mostrar en que zona de la web se encuentra el menú
  $(function() {
    var loc = window.location.href; // returns the full URL
    if(/#inicio/.test(loc)) {
      $('#1').addClass('customClass');
    } 
    if(/#prueba1/.test(loc)) {
      $('#2').addClass('customClass');
    }  
    if(/#prueba2/.test(loc)) {
      $('#3').addClass('customClass');
    } 
    if(/#prueba3/.test(loc)) {
      $('#4').addClass('customClass');
    }
  });
});