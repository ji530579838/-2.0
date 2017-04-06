<template>
    <div class="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :size='36' :score='seller.serviceScore'></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :size='36' :score='seller.foodScore'></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <useMi :select-type='selectType' :ratings='ratings'></useMi>
            <div class="rating-wrapper">
                <ul>
                    <li v-for='rating in ratings' class="rating-item">
                        <div class="item-avatar">
                            <img width="28" height="28" :src="rating.avatar">
                        </div>
                        <div class="item-content">
                            <h1 class="item-name">{{rating.username}}</h1>
                            <div class="item-star-wrapper">
                                <star :size='36' :score='rating.score'></star>
                                <span class="delivery" v-show='rating.deliveryTime'></span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show='rating.recommend && rating.recommend.length'>
                                <span class="icon-thumb_up">&#xe610;</span>
                                <span class="item" v-for="item in rating.recommend">{{item}}</span>
                            </div>
                            <div class="time">
                                {{rating.rateTime | formatDate}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import star from '../../components/star/star.vue'
import useMi from '../../components/usebtn/usebtn.vue'
import split from '../../components/split/split.vue'
import {
    formatDate
} from '../../common/js/data.js'
const ALL = 2
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            ratings: [],
            showFlag: true,
            selectType: ALL,
            onlyContent: true
        }
    },
    created() {
        this.$ajax.get('api/ratings').then((data) => {
            this.ratings = data.data.ratings
        })
    },
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    },
    components: {
        star,
        useMi,
        split
    }
}
</script>
<style type="text/css">
.ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    width: 100%;
    left: 0;
    overflow: auto;
}

.ratings .overview {
    display: flex;
    padding: 18px 0;
}

.ratings .overview .overview-left {
    flex: 0 0 137px;
    width: 137px;
    border-right: 1px solid rgba(7, 17, 27, 0.1);
    text-align: center;
    padding-bottom: 6px;
}

.ratings .overview .overview-right {
    flex: 1;
    padding: 6px 0 6px 24px;
}

.ratings .overview .overview-left .score {
    line-height: 28px;
    font-size: 24px;
    color: rgb(255, 153, 0);
    margin-bottom: 6px;
}

.ratings .overview .overview-left .title {
    line-height: 12px;
    font-size: 12px;
    color: rgb(7, 17, 27);
    margin-bottom: 8px;
}

.ratings .overview .overview-left .rank {
    line-height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);
}

.ratings .overview .overview-right .score-wrapper {
    margin-bottom: 8px;
    font-size: 0;
}

.ratings .overview .overview-right .score-wrapper .title {
    line-height: 18px;
    font-size: 12px;
    color: rgb(7, 17, 27);
}

.ratings .overview .overview-right .score-wrapper .star {
    display: inline-block;
    vertical-align: top;
    margin: 0 12px;
}

.ratings .overview .overview-right .score-wrapper .score {
    line-height: 18px;
    font-size: 12px;
    color: rgb(255, 13, 0);
}

.ratings .overview .overview-right .delivery-wrapper {
    font-size: 0;
}

.ratings .overview .overview-right .delivery-wrapper .title {
    line-height: 18px;
    font-size: 12px;
    color: rgb(7, 17, 27);
}

.ratings .overview .overview-right .delivery-wrapper .delivery {
    margin-left: 12px;
    font-size: 12px;
    color: rgb(147, 153, 159);
}

.rating-wrapper {
    padding: 0 18px;
}

.rating-item {
    display: flex;
    padding: 18px 0;
    border-bottom: rgba(7, 17, 27, 0.1);
}

.ratings .item-avatar {
    flex: 0 0 28px;
    width: 28px;
    margin-right: 12px;
    border-radius: 50%;
}

.ratings .item-avatar img {
    border-radius: 50%;
}

.ratings .item-content {
    position: relative;
    flex: 1;
}

.ratings .item-name {
    margin-bottom: 4px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(7, 17, 27);
}

.item-star-wrapper {
    margin-bottom: 6px;
    font-size: 0;
}

.ratings .item-star-wrapper .star {
    display: inline-block;
    margin-right: 6px;
    vertical-align: top;
}

.ratings .item-star-wrapper .delivery {
    display: inline-block;
    vertical-align: top;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
}

.ratings .item-content .text {
    margin-bottom: 8px;
    line-height: 18px;
    color: rgb(7, 17, 27);
    font-size: 12px;
}

.ratings .item-content .recommend {
    line-height: 16px;
    font-size: 0;
}

.ratings .recommend .icon-thumb_up {
    display: inline-block;
    margin: 0 8px 4px 0;
    font-size: 9px;
    color: rgb(0, 160, 220);
}

.ratings .recommend .item {
    display: inline-block;
    margin: 0 8px 4px 0;
    font-size: 9px;
    padding: 0 6px;
    border: 1px solid rgba(7, 17, 27, 0.1);
    border-radius: 1px;
    color: rgb(147, 153, 159);
    background: #fff;
}

.ratings .item-content .time {
    position: absolute;
    top: 0;
    right: 0;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
}
</style>
