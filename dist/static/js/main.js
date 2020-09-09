"use strict";

$(window).on('load', function () {
  var body = $('body');
  var scroll = calcScroll();
  var header = $('.header');
  body.css({
    'marginRight': scroll + 'px',
    'position': 'relative'
  });
  header.css({
    'transform': 'translateX(-' + scroll + 'px' + ')',
    'padding-left': scroll + 'px'
  });
  setTimeout(function () {
    $('.preloader__wrapper').fadeOut(500, function () {
      $(this).remove();

      if (body.hasClass('hidden')) {
        body.css({
          'marginRight': 0 + 'px',
          'position': ''
        });
        header.css({
          'transform': '',
          'padding-left': ''
        });
        body.delay(400).removeClass('hidden');
      }
    });
  }, 500);
});

function calcScroll() {
  var div = document.createElement('div');
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.overflowY = 'scroll';
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  var scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
}

$(function () {
  var _this = this;

  var menuSidebar = function menuSidebar() {
    var menu = $('.menu');
    $('.hamburger').on('click', function (e) {
      e.stopPropagation();
      $(this).toggleClass('is-active');
      menu.toggleClass('menu--open');
    });
    $('.menu__icon').on('click', function (e) {
      e.stopPropagation();
      menu.removeClass('menu--open');
      $('.hamburger').removeClass('is-active');
    });
    $(document).on('click', function (e) {
      var container = $('.menu');
      var target = e.target;

      if (!container.is(target) && container.has(target).length === 0) {
        menu.removeClass('menu--open');
        $('.hamburger').removeClass('is-active');
      }
    });
  };

  var progressBar = function progressBar() {
    var progress = $('.info-user__progress');
    var interest = $('.info-user__progress-content');
    progress.each(function () {
      var progressInterest = $(this).attr('data-percentage');
      $(this).find(interest).animate({
        'width': progressInterest
      }, 2000);
    });
  };

  var tabs = function tabs($link, $content, $itemCurrent, $contentActive) {
    var link = $($link);
    var content = $($content);
    content.hide();
    content.first().show();
    link.on('click', function (e) {
      e.preventDefault();

      if (!$(this).parent().hasClass($itemCurrent)) {
        var linkId = Number($(this).attr('data-id'));
        link.parent().removeClass($itemCurrent);
        $(this).parent().addClass($itemCurrent);
        content.each(function () {
          var contentId = Number($(this).attr('data-content-id'));

          if (linkId === contentId) {
            content.hide(600).removeClass($contentActive);
            $(this).show(600).addClass($contentActive);
          }
        });
      }
    });
  };

  var menuResize = function menuResize() {
    var w = $(_this).width();

    if (w <= 1050) {
      $('.header__menu-item[data-da]').removeClass('header__menu-item').addClass('menu__list-item').find('a').removeClass('header__menu-link').addClass('menu__list-link');
      return false;
    } else {
      var item = $('.menu__list-item[data-da]');
      item.removeClass('menu__list-item').addClass('header__menu-item').find('a').removeClass('menu__list-link').addClass('header__menu-link');
      return false;
    }
  };

  var accordion = function accordion() {
    $('.js-accordion__toggle').on('click', function (e) {
      e.preventDefault();
      var $this = $(this);

      if ($this.next().hasClass('show')) {
        $this.removeClass('active');
        $this.next().removeClass('show');
        $this.next().slideUp(350);
      } else {
        $this.parent().parent().find('li .c-accordion__title').removeClass('active');
        $this.parent().parent().find('li .c-accordion__content').removeClass('show');
        $this.parent().parent().find('li .c-accordion__content').slideUp(350);
        $this.toggleClass('active');
        $this.next().toggleClass('show');
        $this.next().slideToggle(350);
      }
    });
  };

  var reviews = function reviews() {
    var w = $(window).width();
    $(".js-review").rateYo({
      normalFill: "transparent",
      ratedFill: "#827C8F",
      halfStar: true,
      starWidth: w > 860 ? "20px" : "15px",
      spacing: w > 860 ? "5px" : "3px",
      "starSvg": "\n            <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path stroke=\"#827C8F\" stroke-width=\"2\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z\" />\n            </svg>\n        "
    });
  };

  var likeDislike = function likeDislike() {
    var elem = $('.js-link');
    elem.on('click', function () {
      if ($(this).hasClass('form__bottom-link--success') && !elem.hasClass('form__bottom-link--selected-error')) {
        $(this).addClass('form__bottom-link--selected-success');
      } else {
        if ($(this).hasClass('form__bottom-link--error') && !elem.hasClass('form__bottom-link--selected-success')) {
          $(this).addClass('form__bottom-link--selected-error');
        }
      }
    });
  };

  reviews();
  accordion();
  tabs('.slider__footer-link', '.slider__footer-content', 'slider__footer-item--current', 'slider__footer-content--active');
  tabs('.instruction__list-link', '.instruction__content', 'instruction__list-item--current', 'instruction__content--active');
  progressBar();
  menuSidebar();
  menuResize();
  $(window).resize(function () {
    menuResize();
  });
  likeDislike();
});

var lineChart = function lineChart() {
  var ctx = document.getElementById('line-chart');

  if (ctx) {
    ctx = document.getElementById('line-chart').getContext('2d');
    var labels = $('#line-chart').attr('data-labels');
    var date = $('#line-chart').attr('data-statistics');
    labels = JSON.parse("[  ".concat(labels, "  ]"));
    date = JSON.parse("[  ".concat(date, "  ]"));
    Chart.defaults.global.animation.duration = 3000;
    var gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, '#FF005B');
    gradient.addColorStop(.5, 'rgba(184, 22, 129, 0.4)');
    gradient.addColorStop(1, 'rgba(109, 51, 143, 0.24)');
    Chart.defaults.global.legend.display = false;
    Chart.defaults.global.legend.align = 'end';
    Chart.defaults.global.elements.point.borderWidth = 0;
    Chart.defaults.global.elements.point.borderColor = '#FF005B';
    Chart.defaults.global.elements.point.hoverBackgroundColor = '#fff';
    Chart.defaults.global.elements.point.radius = 0;
    Chart.defaults.global.elements.point.hoverRadius = 8;
    Chart.defaults.global.elements.point.hoverBorderWidth = 8;
    var data = {
      labels: labels,
      datasets: [{
        label: false,
        backgroundColor: gradient,
        data: date,
        pointStyle: 'circle'
      }]
    };
    var options = {
      maintainAspectRatio: false,
      tooltipFillColor: "rgba(0,0,0,0.8)",
      legendCallback: function legendCallback(chart) {
        console.log(chart);
      },
      scales: {
        xAxes: [{
          ticks: {
            display: false
          },
          gridLines: {
            display: false,
            lineWidth: 3,
            color: "rgba(0, 0, 0, 0)"
          }
        }],
        yAxes: [{
          ticks: {
            display: false
          },
          gridLines: {
            display: false,
            lineWidth: 3,
            color: "rgba(0, 0, 0, 0)"
          }
        }]
      },
      hover: {
        mode: 'nearest',
        intersect: false
      },
      tooltips: {
        mode: 'nearest',
        intersect: false,
        displayColors: false,
        backgroundColor: '#422E57',
        bodyFontSize: 16,
        callbacks: {
          title: function title(tooltipItem, data) {
            function setDate(data) {
              var date = new Date(data.event_details.event_start_date);
              return date.toLocaleDateString("ru-Ru", {
                month: 'short'
              }) + ' ' + tooltipItem[0].label;
            }

            return setDate({
              event_details: {
                event_start_date: Date.now()
              }
            });
          },
          label: function label(tooltipItem) {
            return tooltipItem.value.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ',');
          },
          labelTextColor: function labelTextColor(tooltipItem, chart) {
            return '#fff';
          }
        }
      }
    };
    new Chart(ctx, {
      type: 'line',
      responsive: true,
      data: data,
      options: options
    });
  }
};

var barChart = function barChart() {
  var ctx = document.getElementById('bar-chart');

  if (ctx) {
    var date = $('#bar-chart').attr('data-factory');
    date = JSON.parse("[  ".concat(date, "  ]"));
    ctx = document.getElementById('bar-chart').getContext('2d');
    Chart.defaults.global.animation.duration = 3000;
    var backgroundBlue = ctx.createLinearGradient(0, 0, 0, 222);
    backgroundBlue.addColorStop(0, '#00FFAA');
    backgroundBlue.addColorStop(.5, '#00BBFF');
    backgroundBlue.addColorStop(1, '#4579F5');
    var backgroundRed = ctx.createLinearGradient(0, 0, 0, 166);
    backgroundRed.addColorStop(0, '#6D338F');
    backgroundRed.addColorStop(.5, '#B81681');
    backgroundRed.addColorStop(1, '#FF005B');
    var backgroundYellow = ctx.createLinearGradient(0, 0, 0, 111);
    backgroundYellow.addColorStop(0, '#FF8800');
    backgroundYellow.addColorStop(.5, '#FFAA00');
    backgroundYellow.addColorStop(1, '#EEFF00');
    var backgroundGreen = ctx.createLinearGradient(0, 0, 0, 97);
    backgroundGreen.addColorStop(0, '#00858F');
    backgroundGreen.addColorStop(.5, '#16B862');
    backgroundGreen.addColorStop(1, '#66FF00');
    new Chart(ctx, {
      type: 'bar',
      responsive: true,
      data: {
        labels: ['Blue', 'Red', 'Yellow', 'Green'],
        datasets: [{
          borderWidth: 0,
          backgroundColor: [backgroundBlue, backgroundRed, backgroundYellow, backgroundGreen],
          data: date
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            ticks: {
              display: false
            },
            maxBarThickness: 48,
            gridLines: {
              display: false,
              lineWidth: 3,
              color: "rgba(0, 0, 0, 0)"
            }
          }],
          yAxes: [{
            ticks: {
              display: false
            },
            gridLines: {
              display: false,
              lineWidth: 3,
              color: "rgba(0, 0, 0, 0)"
            }
          }]
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }
};

var doughnutChart = function doughnutChart(elem, data, labels) {
  var ctx = document.getElementById(elem);

  if (ctx) {
    ctx = document.getElementById(elem).getContext('2d');
    var date = $('#' + elem).attr(data);
    date = JSON.parse("[  ".concat(date, "  ]"));
    var dataLabels = $('#' + elem).attr(labels);
    dataLabels = dataLabels.split(',');
    Chart.defaults.global.animation.duration = 3000;
    var backgroundBlue = ctx.createLinearGradient(0, 0, 0, 222);
    backgroundBlue.addColorStop(0, '#00FFAA');
    backgroundBlue.addColorStop(.5, '#00BBFF');
    backgroundBlue.addColorStop(1, '#4579F5');
    var backgroundRed = ctx.createLinearGradient(0, 0, 0, 166);
    backgroundRed.addColorStop(0, '#6D338F');
    backgroundRed.addColorStop(.5, '#B81681');
    backgroundRed.addColorStop(1, '#FF005B');
    var backgroundYellow = ctx.createLinearGradient(0, 0, 0, 111);
    backgroundYellow.addColorStop(0, '#FF8800');
    backgroundYellow.addColorStop(.5, '#FFAA00');
    backgroundYellow.addColorStop(1, '#EEFF00');
    var backgroundGreen = ctx.createLinearGradient(0, 0, 0, 97);
    backgroundGreen.addColorStop(0, '#00858F');
    backgroundGreen.addColorStop(.5, '#16B862');
    backgroundGreen.addColorStop(1, '#66FF00');
    var backgroundViolet = ctx.createLinearGradient(0, 0, 0, 97);
    backgroundViolet.addColorStop(0, '#CC00FF');
    backgroundViolet.addColorStop(.5, '#8A45F5');
    backgroundViolet.addColorStop(1, '#5D2DE1');
    new Chart(ctx, {
      type: 'doughnut',
      responsive: true,
      data: {
        labels: dataLabels,
        datasets: [{
          borderWidth: 0,
          backgroundColor: [backgroundBlue, backgroundRed, backgroundYellow, backgroundGreen, backgroundViolet],
          data: date
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            ticks: {
              display: false
            },
            maxBarThickness: 48,
            gridLines: {
              display: false,
              lineWidth: 3,
              color: "rgba(0, 0, 0, 0)"
            }
          }],
          yAxes: [{
            ticks: {
              display: false
            },
            gridLines: {
              display: false,
              lineWidth: 3,
              color: "rgba(0, 0, 0, 0)"
            }
          }]
        },
        tooltips: {// enabled: false
        }
      }
    });
  }
};

lineChart();
barChart();
doughnutChart('doughnut-chart-corrals', 'data-corrals', 'data-labels');
doughnutChart('doughnut-chart-plant', 'data-plant', 'data-labels');
doughnutChart('doughnut-chart-bakeries', 'data-bakeries', 'data-labels'); // document.onselectstart = noselect;
// document.ondragstart = noselect;
// document.oncontextmenu = noselect;
// function noselect() {return false;}