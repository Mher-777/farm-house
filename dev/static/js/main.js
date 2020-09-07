$(function () {
    const menuSidebar = () => {
        const menu = $('.menu')
        $('.hamburger').on('click', function (e) {
            e.stopPropagation();
            $(this).toggleClass('is-active')
            menu.toggleClass('menu--open')
        })
        $('.menu__icon').on('click', function (e) {
            e.stopPropagation();
            menu.removeClass('menu--open')
            $('.hamburger').removeClass('is-active')
        })
        $(document).on('click', function (e) {
            let container = $('.menu')
            const target = e.target
            if (!container.is(target) && container.has(target).length === 0) {
                menu.removeClass('menu--open')
                $('.hamburger').removeClass('is-active')
            }
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
            if (!$(this).parent().hasClass($itemCurrent)) {
                const linkId = Number($(this).attr('data-id'))
                link.parent().removeClass($itemCurrent)
                $(this).parent().addClass($itemCurrent)
                content.each(function () {
                    const contentId = Number($(this).attr('data-content-id'))
                    if (linkId === contentId) {
                        content.hide(600).removeClass($contentActive)
                        $(this).show(600).addClass($contentActive)
                    }
                })
            }
        })

    }
    const menuResize = () => {
        const w = $(this).width()
        if (w <= 1050) {
            $('.header__menu-item[data-da]')
                .removeClass('header__menu-item')
                .addClass('menu__list-item')
                .find('a')
                .removeClass('header__menu-link')
                .addClass('menu__list-link')
            return false;
        } else {
            const item = $('.menu__list-item[data-da]')
            item.removeClass('menu__list-item')
                .addClass('header__menu-item')
                .find('a')
                .removeClass('menu__list-link')
                .addClass('header__menu-link')
            return false;
        }
    }
    const accordion = () => {
        $('.js-accordion__toggle').on('click', function (e) {
            e.preventDefault();
            let $this = $(this);
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
        })
    }
    const reviews = () => {
        const w = $(window).width()
        $(".js-review").rateYo({
            normalFill: "transparent",
            ratedFill: "#827C8F",
            halfStar: true,
            starWidth: (w > 860) ? "20px" : "15px",
            spacing: (w > 860) ? "5px" : "3px",
            "starSvg": `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke="#827C8F" stroke-width="2" fill-rule="evenodd" clip-rule="evenodd" d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>
        `,
        });
    }
    const likeDislike = () => {
        const elem = $('.js-link');
        elem.on('click', function () {
            if($(this).hasClass('form__bottom-link--success') && !elem.hasClass('form__bottom-link--selected-error')) {
                $(this).addClass('form__bottom-link--selected-success')
            }
            else {
                if($(this).hasClass('form__bottom-link--error') && !elem.hasClass('form__bottom-link--selected-success')) {
                    $(this).addClass('form__bottom-link--selected-error')
                }
            }
        })
    }
    reviews()
    accordion()
    tabs('.slider__footer-link', '.slider__footer-content', 'slider__footer-item--current', 'slider__footer-content--active')
    tabs('.instruction__list-link', '.instruction__content', 'instruction__list-item--current', 'instruction__content--active')
    progressBar()
    menuSidebar()
    menuResize()
    $(window).resize(function () {
        menuResize()
    })
    likeDislike()
})
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}

// document.onselectstart = noselect;
// document.ondragstart = noselect;
// document.oncontextmenu = noselect;
// function noselect() {return false;}