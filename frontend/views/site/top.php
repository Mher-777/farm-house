<?php

use yii\helpers\Url;

?>
<section class="best">
    <div class="container">
        <h2 class="title best__title"><?= Yii::t('app', 'Топ 100') ?></h2>
        <div class="best__inner">

            <table  class="best__table table">
                <thead class="table__head">
                <tr class="table__head-row">
                    <td class="table__head-title"><span class="table__head-text"></span></td>
                    <td class="table__head-title"><span class="table__head-text"></span></td>
                    <td class="table__head-title"><span class="table__head-text"><?= Yii::t('app', 'Фермер' ) ?></span></td>
                    <td class="table__head-title"><span
                                class="table__head-text table__head-text--align-right"><?= Yii::t('app', 'Уровень' ) ?></span></td>
                </tr>
                </thead>
                <tbody class="table__body">
                <?php $i=1; if(Yii::$app->user->isGuest):  ?>
                    <?php foreach($users as $idx => $user) : ?>
                        <?php if($i % 2 === 1): ?>
                        <tr class="table__body-row table__body-row--link table__body-row--nowrap" style="cursor: auto">
                            <td class="table__body-col"><span class="table__body-number"><?= $idx+1 ?></span></td>
                            <td class="table__body-col"><img class="table__body-pic" src="/img/common/user-<?= 1 + $idx ?>.png"></td>
                            <td class="table__body-col"><span class="table__body-text"><?= $user->username; ?></span></td>
                            <td class="table__body-col"><span
                                        class="table__body-number table__body-number--align-right table__body-number--color-gray"><?= $user->level; ?></span>
                            </td>
                        </tr>
                        <?php endif; ?>
                        <?php $i++ ?>
                    <?php endforeach; ?>
                <?php else: ?>
                    <?php foreach($users as $idx => $user) : ?>
                        <?php if($i % 2 === 1): ?>
                            <tr data-href="<?= Url::toRoute('/profile/view/' . $user->username) ?>" class="table__body-row table__body-row--link table__body-row--nowrap">
                                <td class="table__body-col"><span class="table__body-number"><?= $idx+1 ?></span></td>
                                <td class="table__body-col"><img class="table__body-pic" src="/img/common/user-<?= 1 + $idx ?>.png"></td>
                                <td class="table__body-col"><span class="table__body-text"><?= $user->username; ?></span></td>
                                <td class="table__body-col"><span
                                            class="table__body-number table__body-number--align-right table__body-number--color-gray"><?= $user->level; ?></span>
                                </td>
                            </tr>
                        <?php endif; ?>
                        <?php $i++ ?>
                    <?php endforeach; ?>
                <?php endif; ?>
                </tbody>
            </table>
            <table  class="best__table table">
                <thead class="table__head">
                <tr class="table__head-row">
                    <td class="table__head-title"><span class="table__head-text"></span></td>
                    <td class="table__head-title"><span class="table__head-text"></span></td>
                    <td class="table__head-title"><span class="table__head-text"><?= Yii::t('app', 'Фермер' ) ?></span></td>
                    <td class="table__head-title"><span
                                class="table__head-text table__head-text--align-right"><?= Yii::t('app', 'Уровень' ) ?></span></td>
                </tr>
                </thead>
                <tbody class="table__body">
                <?php $i=1; if(Yii::$app->user->isGuest):  ?>
                    <?php foreach($users as $idx => $user) : ?>
                        <?php if($i % 2 === 0): ?>
                            <tr class="table__body-row table__body-row--link table__body-row--nowrap" style="cursor: auto">
                                <td class="table__body-col"><span class="table__body-number"><?= $idx+1 ?></span></td>
                                <td class="table__body-col"><img class="table__body-pic" src="/img/common/user-<?= 1 + $idx ?>.png"></td>
                                <td class="table__body-col"><span class="table__body-text"><?= $user->username; ?></span></td>
                                <td class="table__body-col"><span
                                            class="table__body-number table__body-number--align-right table__body-number--color-gray"><?= $user->level; ?></span>
                                </td>
                            </tr>
                        <?php endif; ?>
                        <?php $i++ ?>
                    <?php endforeach; ?>
                <?php else: ?>
                    <?php foreach($users as $idx => $user) : ?>
                        <?php if($i % 2 === 0): ?>
                            <tr data-href="<?= Url::toRoute('/profile/view/' . $user->username) ?>" class="table__body-row table__body-row--link table__body-row--nowrap">
                                <td class="table__body-col"><span class="table__body-number"><?= $idx+1 ?></span></td>
                                <td class="table__body-col"><img class="table__body-pic" src="/img/common/user-<?= 1 + $idx ?>.png"></td>
                                <td class="table__body-col"><span class="table__body-text"><?= $user->username; ?></span></td>
                                <td class="table__body-col"><span
                                            class="table__body-number table__body-number--align-right table__body-number--color-gray"><?= $user->level; ?></span>
                                </td>
                            </tr>
                        <?php endif; ?>
                        <?php $i++ ?>
                    <?php endforeach; ?>
                <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</section>