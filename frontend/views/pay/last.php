<?php

use yii\widgets\LinkPager;

?>
<section class="payments">
    <div class="container">
        <div class="payments__wrapper">
            <div class="main-holder">
                <h2 class="title payments__title"><?= Yii::t('app', 'Последние выплаты') ?></h2>
            </div>
            <div class="payments__inner">
                <div class="payments__wrapper">
                    <div class="payments__main">
                        <div class="payments__box">
                            <?php $i=1; foreach($payOutList as $history) : ?>
                                <?php $class = ($i%2==0) ? 'info' : 'active'; ?>

                                <div class="payments__row">
                                    <div class="payments__col"><span class="payments__text payments__text--id">#<?= $i ?></span></div>
                                    <div class="payments__col"><span class="payments__text payments__text--name"><?= $history->username ?></span></div>
                                    <div class="payments__col"><span class="payments__text payments__text--subject"><?= $history->amount; ?></span></div>
                                    <div class="payments__col"><span class="payments__text payments__text--desc"><?= date('Y-m-d H:i:s', $history->created_at); ?></span></div>
                                    <div class="payments__col"><span class="payments__text payments__text--day"><?= date('M j', $history->created_at); ?></span></div>
                                </div>
                                <?php $i++ ?>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
                <? echo LinkPager::widget([
                    'pagination' => $pages,
                    'registerLinkTags' => true,
                    'maxButtonCount' => 5,
                    'linkContainerOptions' => [
                        'class' => 'pagination__link',
                    ],
                    'options' => [
                        'class' => 'pagination payments__pagination',
                    ],
                    'activePageCssClass' => 'pagination__link--current',
                    'nextPageLabel' => '<svg
                                            class="svg-sprite-icon icon-arrow-right pagination__icon pagination__icon--right">
                                            <use xlink:href="/img/sprite/symbol/sprite.svg#arrow-right"></use>
                                        </svg>',
                    'prevPageLabel' => '<svg
                                            class="svg-sprite-icon icon-arrow-right pagination__icon pagination__icon--left">
                                            <use xlink:href="/img/sprite/symbol/sprite.svg#arrow-right"></use>
                                        </svg>',
                    'disabledPageCssClass' => 'pagination__link-disabled'
                ]); ?>
            </div>
        </div>
    </div>
</section>