"use strict";

$(function () {
  var menuSidebar = function menuSidebar() {
    $('.hamburger').on('click', function () {
      $(this).toggleClass('is-active');
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

  var tabs = function tabs() {
    var link = $('.slider__footer-link');
    var content = $('.slider__footer-content');
    content.hide();
    content.first().show();
    link.on('click', function (e) {
      e.preventDefault();

      if (!$(this).parent().hasClass('slider__footer-item--current')) {
        var linkId = Number($(this).attr('data-id'));
        link.parent().removeClass('slider__footer-item--current');
        $(this).parent().addClass('slider__footer-item--current');
        content.each(function () {
          var contentId = Number($(this).attr('data-content-id'));

          if (linkId === contentId) {
            content.hide(600).removeClass('slider__footer-content--active');
            $(this).show(600).addClass('slider__footer-content--active');
          }
        });
      }
    });
  };

  tabs();
  progressBar();
  menuSidebar();
});