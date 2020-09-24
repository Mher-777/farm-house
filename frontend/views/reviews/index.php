<?php

use yii\widgets\LinkPager;
use yii\helpers\Url;

?>
<script type="text/javascript" src="/js/urlControl.js"></script>
<script>
    $(document).ready(function () {
        $(".reviews-post").click(function () {

            var element = $(this);
            var issetUrl = false;
            var content = element.closest('.reviews-form').find('#reviews-textarea').val();
            content = $.trim(content);
            var validate = $('.msg_response').hide();

            var level = $(".level").html();

            if (content == "") {
                $('.msg_response').text('');
                var message = "<?= Yii::t('app', 'Все поля должны быть заполнены') ?>";
                validate.append(message);
                validate.css('color', 'red');
                validate.show();
            } else {

                var findRU = content.indexOf(".ru");
                var findCOM = content.indexOf(".com");
                var findNET = content.indexOf(".net");
                var findORG = content.indexOf(".org");
                var findHTTP = content.indexOf("http://");
                var findHTTPS = content.indexOf("https://");
                var findWWW = content.indexOf("www.");

                if (findRU >= 0 || findCOM >= 0 || findNET >= 0 || findORG >= 0 || findHTTP >= 0 || findHTTPS >= 0 || findWWW >= 0) {

//                    alert('В тексты не должны быть ссылки!');

                } else {

                    var username = $(".username").html();
                    var avatar = $(".avatar").html();
                    avatar = $.trim(avatar);
                    var sex = $(".sex").html();
                    sex = $.trim(sex);

                    issetUrl = findUrls(content);
                    if (issetUrl.length > 0) {
                        console.log(issetUrl);
                        return 1;
                    }
                    $.ajax({
                        url: "<?= Url::toRoute('/reviews/send/') ?>",
                        type: "POST",
                        async: true,
                        data: {'content': content, 'level': level, 'type': 1}
                    }).done(function (result) {
                        if (result.reviews) {
                            $('.msg_response').html('');
                            validate.append(result.reviews);
                            validate.css('color', 'red');
                            validate.show();
                        } else {
                            $('#reviews-textarea').val('');
                            var content = result.content;
                            var date = result.date;
                            var link = "<?= Url::toRoute('/profile/view') ?>";
                            $(".reviews-div").before('<div class="news-comment-list">' +
                                '<a href="' + link + '/' + username + '" target="_blank" class="reviews-username">' + username + '</a>' +

                                '<img class="wm" src="/img/' + $.trim(sex) + '">' +

                                '<span>(' + date + ')</span>' +
                                '<div style="clear: both"></div>' +

                                '<img src="/avatars/' + $.trim(avatar) + '" class="reviews-image" alt="">' +

                                '<span class="reviews-content">' + content + '</span>' +

                                '<div style="clear: both"></div>' +
                                '</div>');
                        }
                    });

                }

            }

        });
    });

</script>

<section class="reviews">
    <span class="level" style="display: none"><?= (!Yii::$app->user->isGuest) ? $user->level : '' ?></span>
    <span class="username"
          style="display: none"><?= (!Yii::$app->user->isGuest) ? \Yii::$app->user->identity->username : '' ?></span>
    <span class="avatar" style="display: none">
            <?php
            if (!Yii::$app->user->isGuest) {
                if (!Yii::$app->user->identity->photo) {
                    echo 'noavatar.png';
                } else {
                    echo trim(Yii::$app->user->identity->photo);
                }
            }
            ?>
        </span>
    <span class="sex" style="display: none">
            <?php
            if (!Yii::$app->user->isGuest) {
                if (Yii::$app->user->identity->sex == 1) {
                    echo 'man.png';
                } else {
                    echo 'woman.png';
                }
            }
            ?>
        </span>

    <div class="container">
        <div class="reviews__wrapper">
            <div class="main-holder">
                <h2 class="title reviews__title"><?= Yii::t('app', 'Отзывы') ?></h2>
                <?php
                if (!Yii::$app->user->isGuest) {
                    echo '<a class="main-holder__link btn" data-fancybox data-src="#reviews" href="#" data-da="reviews__wrapper, last, 500">Оставить отзыв</a>';
                }
                ?>
            </div>

            <div class="reviews__inner">
                <?php foreach ($reviews as $review) : ?>
                    <div class="review">
                        <div class="review__top"><a class="review__user" href="#">
                                <img class="review__user-image" src="static/images/common/logo-user.png">
                                <div class="review__user-info"><span class="review__user-name">Xun Guiying</span><span
                                            class="review__user-subtitle">Blade Runner</span>
                                </div>
                            </a>
                            <div class="review__stars">
                                <div class="review__star js-review" data-rateyo-rating="4.5"
                                     data-rateyo-read-only="true"></div>
                                <time class="review__day" datetime="3/14/2019">3/14/2019</time>
                            </div>
                        </div>
                        <p class="review__text">A merry little surge of electricity piped by automatic alarm from the
                            mood
                            organ beside his bed awakened Rick Deckard. Surprised — it always surprised him.</p>
                    </div>
                <?php endforeach ?>


            </div>
            <?php if(count($reviews) >= 4) { ?>
                 <a class="reviews__more link link--size-small" href="#">Показать больше</a>
            <?php } ?>
        </div>
    </div>
</section>
<div id="reviews" class="popup reviews__popup">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid animi consectetur consequuntur deleniti doloribus eaque esse, excepturi explicabo hic impedit libero necessitatibus, nemo numquam quae ratione similique, suscipit voluptates.
</div>