$(function() {
  //variables
  var base_api_url = "https://api.nasa.gov/EPIC/api/"
  var api_key = "u6FlZ9A0Mow32d0ExoYEU5Btyne17lYyovYxeE3l";
  var carousel_inner = $("#carouselInner");
  var carousel_indicators = $(".carousel-indicators");

  $( "#datepicker" ).datepicker();
  var image_base_url = "https://epic.gsfc.nasa.gov/archive/";
  var result = [];

  function create_api_url (epic_type, date) {
    return base_api_url + epic_type + "/date/" + date + "?api_key=" + api_key;
  }

  function build_image_url (epic_type, date, image_name) {
    var tmp_date = date.replace(/-/g, "/");
    return image_base_url + epic_type + "/" + tmp_date + "/png/" + image_name + ".png";
  }

  function build_carousel_images (items) {
    var carousel_items = '<div class="carousel-item"><img class="d-block w-100" src="'
    carousel_items += items.join('"></div><div class="carousel-item"><img class="d-block w-100" src="') + '</div>';
    return carousel_items
  }

  function build_carousel_tabs (items) {
    var carousel_tabs = ""
    for (var i = 0; i < items.length; i++) {
      carousel_tabs += '<li class="carousel-tab" data-target="#nasaEpicCarousel"></li>'
    }
    return carousel_tabs
  }

  $( "#submit" ).click(function() {
    var date = $("#datepicker").val();
    var epic_type = $("input[name='epicType']").val();
    var api_url = create_api_url(epic_type, date);

    if (date.length === 0 ) {
      alert("Please input a Date");
      return;
    }
    if (epic_type.length === 0 ) {
      alert("Please input a EPIC Type");
      return;
    }

    $.getJSON(api_url, function(result) {
      var items = result.map(function (item) {
        return build_image_url(epic_type, date, item.image)
      });

      carousel_inner.empty();

      if (items.length) {
        var list = build_carousel_images(items)
        carousel_inner.append(list)
        var tabs = build_carousel_tabs(items)
        carousel_indicators.append(tabs)
        $(".carousel-item:first").addClass("active")
        $(".carousel-tab:first").addClass("active")

        $('.carousel').carousel({
          interval: 2000,
          pause: false
        });
      }
    });
  });
});
