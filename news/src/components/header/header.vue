<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatra">
                <img :src="seller.avatar" width="64" height="64" />
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if='seller.supports' class="support">
                    <div class="icon" :class="classMap[seller.supports[0].type]"></div>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
                <div v-if='seller.supports' class="support-count" @click='showDetail'>
                    <span class="count">{{seller.supports.length}}</span>
                    <span class="icon-keyboard_arrow_right">&#xe612;</span>
                </div>
            </div>
        </div>
        <div class="bulletin-wrapper" @click='showDetail'>
            <span class="bulletin-titlt"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <span class="icon-keyboard_arrow_right">&#xe612;</span>
        </div>
        <div class="background">
            <img :src="seller.avatar" width='100%' height="100%">
        </div>
        <transition name="fade">
            <div class="detail" v-show='detailShow'>
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star :size='48' :score='seller.score'></star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul v-if='seller.supports' class="support">
                            <li class="support-item" v-for='item in seller.supports'>
                                <span class="icon" :class='classMap[item.type]'></span>
                                <span class="text">{{item.description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close" @click='hideDatil'>
                    <div class="icon-close">&#xe662;</div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script type="text/javascript">
import star from '../../components/star/star.vue'
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            detailShow: false
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
        showDetail() {
            this.detailShow = true
        },
        hideDatil() {
            this.detailShow = false
        }
    },
    components: {
        star
    }
}
</script>
<style type="text/css">
.decrease {
    background-image: url(../header/decrease_1@2x.png)
}

.discount {
    background-image: url(../header/discount_1@2x.png)
}

.guarantee {
    background-image: url(../header/guarantee_1@2x.png)
}

.invoice {
    background-image: url(../header/invoice_1@2x.png)
}

.special {
    background-image: url(../header/special_1@2x.png)
}

.header {
    color: #fff;
    position: relative;
    background-color: rgba(7, 17, 27, 0.5);
    overflow: hidden;
}

.header .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
}

.header .avatra {
    display: inline-block;
    vertical-align: top;
}

.header .avatra img {
    border-right: 2px;
}

.header .content {
    display: inline-block;
    font-size: 14px;
    margin-left: 16px;
}

.header .title {
    margin: 2px 0 8px 0;
}

.header .title .brand {
    display: inline-block;
    width: 30px;
    height: 18px;
    background-image: url(../header/brand@3x.png);
    background-size: 30px 18px;
    background-repeat: no-repeat;
    vertical-align: top;
}

.header .name {
    margin-left: 6px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
}

.header .star-wrapper {
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
}

.header .detail-main .title {
    display: flex;
    width: 80%;
    margin: 28px auto 24px auto;
}

.header .detail-main .title .line {
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2)
}

.header .detail-main .title .text {
    padding: 0 12px;
    font-size: 14px;
    font-weight: 700;
}

.header .detail-main .support {
    width: 80%;
    margin: 0 auto;
}

.header .detail-main .support .support-item {
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 0;
}

.header .detail-main .support .support-item:last-child {
    margin-bottom: 0;
}

.header .detail-main .support .support-item .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
}

.header .detail-main .support .support-item .text {
    line-height: 16px;
    font-size: 12px;
}

.header .detail-main .bulletin {
    width: 80%;
    margin: 0 auto;
}

.detail-main .bulletin .content {
    line-height: 24px;
    font-size: 12px;
}

.header .description {
    margin-left: 10px;
    line-height: 22px;
    font-size: 12px;
}

.header .content-wrapper .support .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    vertical-align: top;
}

.header .content-wrapper .support .text {
    line-height: 12px;
    font-size: 10px;
}

.header .content-wrapper .support-count {
    position: absolute;
    right: 12px;
    bottom: 8px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background: rgba(0, 0, 0, 0.2);
    text-align: center;
}

.header .content-wrapper .support-count .count {
    font-size: 10px;
}

.header .icon-keyboard_arrow_right {
    font-size: 12px;
}

.header .bulletin-wrapper {
    background-color: rgba(7, 17, 27, 0.2);
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.header .bulletin-titlt {
    display: inline-block;
    width: 22px;
    height: 12px;
    background-image: url(../header/bulletin@2x.png);
    background-repeat: no-repeat;
    background-size: 22px 12px;
    vertical-align: top;
    margin-top: 7px;
}

.header .bulletin-text {
    font-size: 10px;
    margin: 0 4px;
    vertical-align: top;
}

.header .bulletin-wrapper .icon-keyboard_arrow_right {
    position: absolute;
    right: 12px;
    font-size: 10px;
}

.header .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
}

.header .detail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, 0.8);
    background-filter:blur(10px);
}

.header .detail-wrapper {
    min-height: 100%;
    width: 100%;
}

.header .detail-main {
    margin-top: 64px;
    padding-bottom: 64px;
}

.header .detail-close {
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    clear: both;
    font-size: 32px;
}

.header .detail-main .name {
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .9s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
