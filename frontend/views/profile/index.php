<?php
use vova07\fileapi\Widget as FileAPI;
use common\models\Settings;
use yii\helpers\Url;
use yii\widgets\ActiveForm;

?>
<script>
    //empty function for infinitive scroll
    function fook()
    {

    }
    $(document).ready(function(){

        $("body").on('click', '.js-like', function(){

            var wallID = $(this).data('wallid');
            var thisA = $(this);
            var validate = $('.msg_response').hide();

            if(wallID){
                $.ajax({
                    url: "<?= Url::toRoute('/profile/like/') ?>",
                    type: "POST",
                    async:true,
                    data: {'wallID': wallID}
                }).done(function(response){
                    if(response.status){
                        response.like ? thisA.addClass('js-like-success') : thisA.removeClass('js-like-success');
                        thisA.parent('.rig').find(".js-like-count").empty();
                        thisA.parent('span').find(".js-like-count").append(response.like_count);
                    }else{
                        validate.css('color','red');
                        validate.append(response.msg);
                        validate.show();
                    }
                });
            }else{
                validate.css('color','red');
                validate.append(response.msg);
                validate.show();
            }

        });

        $("body").on('click', '.comment_post', function(){

            var element = $(this);

            var text = element.closest('.input-group').find('.comment-text').val();
                text = $.trim(text);
            var wall_id = element.closest('.input-group').find('#wall_id').val();
                wall_id = $.trim(wall_id);
            var username = $(".username").text();
            var avatar = $(".avatar").html();
            var validate = $('.msg_response').hide();

            var findRU = text.indexOf(".ru");
            var findCOM = text.indexOf(".com");
            var findNET = text.indexOf(".net");
            var findORG = text.indexOf(".org");
            var findHTTP = text.indexOf("http://");
            var findHTTPS = text.indexOf("https://");
            var findWWW = text.indexOf("www.");

            if (findRU >= 0 || findCOM >= 0 || findNET >= 0 || findORG >= 0 || findHTTP >=0 || findHTTPS >=0 || findWWW >= 0){

//                alert('В тексты не должны быть ссылки!');

            }else {

                if (text == "" || wall_id == "") {
                    var message = "<?= Yii::t('app', 'Все поля должны быть заполнены') ?>";
                    validate.append(message);
                    validate.css('color', 'red');
                    validate.show();
                } else {

                    var findRU = text.indexOf(".ru");
                    var findCOM = text.indexOf(".com");
                    var findNET = text.indexOf(".net");
                    var findORG = text.indexOf(".org");
                    var findHTTP = text.indexOf("http://");
                    var findHTTPS = text.indexOf("https://");
                    var findWWW = text.indexOf("www.");

                    if (findRU >= 0 || findCOM >= 0 || findNET >= 0 || findORG >= 0 || findHTTP >= 0 || findHTTPS >= 0 || findWWW >= 0) {

                        alert('Ошибка!');

                    } else {

                        $.ajax({
                            url: "<?= Url::toRoute('/profile/comment/') ?>",
                            type: "POST",
                            async: true,
                            data: {'text': text, 'wall_id': wall_id, 'type': 1}
                        }).done(function (result) {
                            if (result.status) {
                                var count = element.closest('.wall_content').find('.comment_count').html();
                                count++;
                                element.closest('.wall_content').find(".comment_count").empty().html(count);
                                element.closest('.wall_content').find(".comment-text").val("");
                                var comment = element.closest('#comments').find('.comment-add');
                                comment.before('<div class="comment-list">' +
                                    '<div class="'+(result.commentID)+'">' +
                                    '<img src="/avatars/' + avatar + '" class="comment-image" alt="">' +
                                    '<a href="" class="comment-user">' + username + '</a>' +
                                    '<p class="comment-content">' + text + '</p>' +
                                    '<a href="javascript:void(0);" class="comment_delete" style="position: absolute; right: 10px; top: 10px;" comment_id="'+(result.commentID)+'">Удалить</a></div></div>'
                                );
                            } else {
                                validate.css('color', 'red');
                                validate.append(result.msg);
                                validate.show();
                            }
                        });

                    }

                }
            }
        });

        $("body").on('click','.wall_delete', function(){

            var wall_id = $(this).attr('wall_id');

            $.ajax({
                url: "<?= Url::toRoute('/profile/ajaxwalldelete/') ?>",
                type: "POST",
                async:true,
                data: {'wall_id':wall_id}
            }).done(function(result){
                if(result.removeWall){
                    $('#'+wall_id).remove();
                }else{
                    alert('error');
                }
            });

        });

        $("body").on('click','.comment_delete', function(){

            var element = $(this);

            var comment_id = $(this).attr('comment_id');

            var count = element.closest('.wall_content').find('.comment_count').html();
            count--;
            element.closest('.wall_content').find(".comment_count").empty().html(count);

            $.ajax({
                url: "<?= Url::toRoute('/profile/ajaxcommentdelete/') ?>",
                type: "POST",
                async:true,
                data: {'comment_id':comment_id}
            }).done(function(result){
                if(result.removeComment){
                    $('.'+comment_id).remove();
                }else{
                    alert('error');
                }
            });

        });

        $("body").on('click','.toggleCommentText', function(){
            var ids = $(this).attr("id");
            $("#toggleComment"+ids).slideToggle();
        });

        $("#toggleDetailText").click(function(){
            $("#toggleDetail").slideToggle();
        });

        $("button[name=wall_button]").click(function(e){

            var text = $("#wall_post_text").val();

            var findRU = text.indexOf(".ru");
            var findCOM = text.indexOf(".com");
            var findNET = text.indexOf(".net");
            var findORG = text.indexOf(".org");
            var findHTTP = text.indexOf("http://");
            var findHTTPS = text.indexOf("https://");
            var findWWW = text.indexOf("www.");

            if (findRU >= 0 || findCOM >= 0 || findNET >= 0 || findORG >= 0 || findHTTP >= 0 || findHTTPS >= 0 || findWWW >= 0) {

                e.preventDefault();
//                alert('В тексты не должны быть ссылки!');
//                return false;

            }

        });

    });
</script>

<section class="profile office-section">
    <span class="username" style="display: none"><?=\Yii::$app->user->identity->username; ?></span>
    <div class="container">
        <h2 class="title title--size-medium statistics__title">Профиль</h2>
        <div class="profile__inner">
            <div class="info-user profile__col">
                <div class="info-user__top">
                    <div class="info-user__userpic" data-level="55">
                        <img class="info-user__userpic-image" src="<?php
                        if(!$user->photo){
                            echo '/avatars/noavatar.png';
                        }else{
                            echo '/avatars/'.$user->photo;
                        }
                        ?>" alt="пользователь"></div>
                    <div class="info-user__box"><a class="info-user__name" href="#"><?= Yii::$app->user->identity->username; ?></a><span
                                class="info-user__subtitle subtitle"><?= Yii::t('app', 'Добро пожаловать') . '!' ?></span></div>
                </div>
                <div class="info-user__statistics">
                    <div class="info-user__progress" data-percentage="<?= (($user->experience) * 100) / ($user->need_experience) ?>%">
                        <div class="info-user__progress-holder"><span class="info-user__statistics-title">Опыт</span>
                            <div class="info-user__statistics-count" data-count-after="<?= $user->experience; ?>" data-count-before=" / <?= $user->need_experience; ?>">
                            </div>
                        </div>
                        <div class="info-user__progress-outer"><span
                                    class="info-user__progress-content info-user__progress-content--color-blue"></span></div>
                    </div>
                    <div class="info-user__progress" data-percentage="<?php if (($user->energy) > 1000) {
                        echo 100;
                    } else {
                        echo ($user->energy) / 10;
                    } ?>%">
                        <div class="info-user__progress-holder">
                            <span class="info-user__statistics-title"><?= Yii::t('app', 'Энергия') ?></span>
                            <div class="info-user__statistics-count" data-count-after="" data-count-before="<?= $user->energy; ?>"></div>
                        </div>
                        <div class="info-user__progress-outer">
                            <span class="info-user__progress-content info-user__progress-content--color-red"></span>
                        </div>
                    </div>
                </div>
                <div class="info-user__payment">
                    <div class="info-user__payment-row"><span
                                class="info-user__payment-title"><?= Yii::t('app', 'Оплата') ?></span><span
                                class="info-user__payment-price">
                            <?= number_format($user->for_pay, 0, '.', ' ') ?> <?= Yii::t('app', 'руб') ?>
                        </span>
                    </div>
                    <div class="info-user__payment-row"><span
                                class="info-user__payment-title"><?= Yii::t('app', 'Вывод') ?></span><span
                                class="info-user__payment-price">
                            <?= number_format($user->for_out, 0, '.', ' ') ?> <?= Yii::t('app', 'руб') ?>
                        </span>
                    </div>
                </div>
            </div>
            <div class="profile__col box">
                <?php $form = ActiveForm::begin([
                        'options' => [
                                'class' => 'box__form'
                        ]
                ]); ?>

                <div class="box__top">
                    <h3 class="box__title">Личные данные</h3><span class="info-icon"
                                                                   data-tippy-content="&lt;span class='tooltip  tooltip--width'&gt;<?= Yii::t('app', 'В целях безопасности личного кабинета, почта пользователей не подлежит изменению. Для смены почты необходимо создать тикет в тех. поддержку. Ваш запрос будет удовлетворён в течении 3-х дней, после проверки на предмет мошенничества.') ?>&lt;/span&gt;"><svg
                                class="svg-sprite-icon icon-info">
                        <use xlink:href="/img/sprite/symbol/sprite.svg#info"></use>
                      </svg></span>
                </div>
                <div class="box__main">
                    <ul class="box__list">
                        <li class="box__list-item"><span class="box__list-subtitle subtitle">Email</span>
                            <input class="box__list-input" type="text" value="<?= Yii::$app->user->identity->email; ?>" disabled="disabled">
                        </li>
                        <li class="box__list-item"><span class="box__list-subtitle subtitle"><?= Yii::t('app', 'Пол') ?></span>
                            <div class="box__list-group">
                                <input class="box__list-radio" type="radio" name="gender" checked id="men">
                                <label class="box__list-btn" data-text="<?= Yii::t('app', 'М') ?>" for="men"></label>
                                <input class="box__list-radio" type="radio" name="gender" id="women">
                                <label class="box__list-btn" data-text="<?= Yii::t('app', 'Ж') ?>" for="women"></label>
                            </div>
                        </li>
                        <li class="box__list-item"><span class="box__list-subtitle subtitle"><?= Yii::t('app', 'Получать новости на емайл?') ?></span><input class="box__list-switch" type="checkbox" id="switch"><label
                                    class="box__list-checkbox" for="switch"></label></li>
                    </ul>
                </div>
                <div class="box__bottom"><button class="box__btn link link--color-white"
                                                 type="submit">Сохранить</button></div>
                <?php ActiveForm::end(); ?><br>
            </div>
            <div class="profile__col box">
                <form class="box__form" action="#">
                    <div class="box__top">
                        <h3 class="box__title">Сменить пароль</h3>
                    </div>
                    <div class="box__main"><input class="box__input input" type="password" placeholder="Старый пароль"
                                                  required><input class="box__input input" type="password" placeholder="Новый пароль"
                                                                  required><input class="box__input input" type="password" placeholder="Подтвердите пароль"
                                                                                  required></div>
                    <div class="box__bottom"><button class="box__btn link link--color-white"
                                                     type="submit">Сохранить</button></div>
                </form>
            </div>
            <div class="profile__col box">
                <div class="box__top">
                    <h3 class="box__title">Основные данные</h3>
                </div>
                <div class="box__main">
                    <ul class="box__list">
                        <li class="box__list-item"><span class="box__list-subtitle subtitle">Регистрация</span><span
                                    class="box__list-text">2019-05-28 09:16:50</span></li>
                        <li class="box__list-item"><span class="box__list-subtitle subtitle">Последний вход</span><span
                                    class="box__list-text">2019-06-29 03:27:54</span></li>
                        <li class="box__list-item"><span class="box__list-subtitle subtitle">IP регистрации</span><span
                                    class="box__list-text">91.234.78.218</span></li>
                        <li class="box__list-item"><span class="box__list-subtitle subtitle">Последний IP</span><span
                                    class="box__list-text">93.75.62.252</span></li>
                        <li class="box__list-item"><span class="box__list-subtitle subtitle">Текуший IP</span><span
                                    class="box__list-text">94.228.207.147</span></li>
                        <li class="box__list-item"><span class="box__list-subtitle subtitle">Ваша страна</span><span
                                    class="box__list-text">Россия</span></li>
                    </ul>
                </div>
            </div>
            <div class="profile__col box">
                <div class="box__top">
                    <h3 class="box__title">Платежный пароль</h3><span class="info-icon"
                                                                      data-tippy-content="&lt;span class='tooltip'&gt;Для смены почты необходимо создать тикет в тех. поддержку. Ваш запрос будет удовлетворён в течении 3-х дней, после проверки на предмет мошенничества.&lt;/span&gt;"><svg
                                class="svg-sprite-icon icon-info">
                      <use xlink:href="static/images/sprite/symbol/sprite.svg#info"></use>
                    </svg></span>
                </div>
                <div class="box__bottom"><a class="box__btn link link--color-white box__btn--width"
                                            href="#">Восстановить платежный пароль</a></div>
            </div>
        </div>
    </div>
</section>
