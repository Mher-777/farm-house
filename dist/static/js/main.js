"use strict";

$(function () {
  var _this = this;

  var menuSidebar = function menuSidebar() {
    var menu = $('.menu');
    $('.hamburger').on('click', function () {
      $(this).toggleClass('is-active');
      menu.toggleClass('menu--open');
    });
    $('.menu__icon').on('click', function () {
      menu.removeClass('menu--open');
      $('.hamburger').removeClass('is-active');
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

  menuResize();
  $(window).resize(function () {
    menuResize();
  });
  tabs();
  progressBar();
  menuSidebar();
});