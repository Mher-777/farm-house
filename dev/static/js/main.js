$(function () {
    const menuSidebar = () => {
        const menu = $('.menu')
        $('.hamburger').on('click', function () {
            $(this).toggleClass('is-active')
            menu.toggleClass('menu--open')
        })
        $('.menu__icon').on('click', function () {
            menu.removeClass('menu--open')
            $('.hamburger').removeClass('is-active')
        })
    }
    const progressBar = () => {
        const progress = $('.info-user__progress')
        const interest = $('.info-user__progress-content')
        progress.each(function () {
            const progressInterest = $(this).attr('data-percentage')
            $(this).find(interest).animate({
                'width': progressInterest
            }, 2000)
        })
    }
    const tabs = ($link, $content, $itemCurrent, $contentActive) => {
        const link = $($link)
        const content = $($content)
        content.hide()
        content.first().show()
        link.on('click', function (e) {
            e.preventDefault()
            if(!$(this).parent().hasClass($itemCurrent)) {
                const linkId = Number($(this).attr('data-id'))
                link.parent().removeClass($itemCurrent)
                $(this).parent().addClass($itemCurrent)
                content.each(function () {
                    const contentId = Number($(this).attr('data-content-id'))
                    if(linkId === contentId) {
                        content.hide(600).removeClass($contentActive)
                        $(this).show(600).addClass($contentActive)
                    }
                })
            }
        })

    }
    const menuResize = () => {
        const w = $(this).width()
        if(w <= 1050) {
            $('.header__menu-item[data-da]')
                .removeClass('header__menu-item')
                .addClass('menu__list-item')
                .find('a')
                .removeClass('header__menu-link')
                .addClass('menu__list-link')
            return false;
        }else {
            const item = $('.menu__list-item[data-da]')
            item.removeClass('menu__list-item')
                .addClass('header__menu-item')
                .find('a')
                .removeClass('menu__list-link')
                .addClass('header__menu-link')
            return false;
        }
    }
    menuResize()
    $(window).resize(function () {
        menuResize()
    })
    tabs('.slider__footer-link', '.slider__footer-content', 'slider__footer-item--current', 'slider__footer-content--active')
    tabs('.instruction__list-link', '.instruction__content', 'instruction__list-item--current', 'instruction__content--active')
    progressBar()
    menuSidebar()
})