$(function () {
    const menuSidebar = () => {
        $('.hamburger').on('click', function () {
            $(this).toggleClass('is-active')
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
    const tabs = () => {
        const link = $('.slider__footer-link')
        const content = $('.slider__footer-content')
        content.hide()
        content.first().show()
        link.on('click', function (e) {
            e.preventDefault()
            if(!$(this).parent().hasClass('slider__footer-item--current')) {
                const linkId = Number($(this).attr('data-id'))
                link.parent().removeClass('slider__footer-item--current')
                $(this).parent().addClass('slider__footer-item--current')
                content.each(function () {
                    const contentId = Number($(this).attr('data-content-id'))
                    if(linkId === contentId) {
                        content.hide(600).removeClass('slider__footer-content--active')
                        $(this).show(600).addClass('slider__footer-content--active')
                    }
                })
            }
        })

    }
    tabs()
    progressBar()
    menuSidebar()
})