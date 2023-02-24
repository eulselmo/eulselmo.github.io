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