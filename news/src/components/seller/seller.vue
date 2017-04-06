<template>
    <div class="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc">
                    <star :size='36' :score='seller.score'></star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>
                            <span>元</span>
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>
                            <span>分钟</span>
                        </div>
                    </li>
                </ul>
                <div class="favorite" @click='toogleFavorite'>
                    <span class="icon-favorite" :class="{'active':favorite}">&#xe650;</span>
                    <span class="text">{{favoriteText}}</span>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul v-if='seller.supports' class="support">
                    <li class="support-item" v-for='item in seller.supports'>
                        <span class="icon" :class='classMap[item.type]'></span>
                        <span class="text">{{item.description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pics-wrapper">
                    <ul class="pic-list">
                        <li class="pic-item" v-for='pic in seller.pics'>
                            <img :src="pic" width="120" height="90">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="info">
                <h1 class="title">商家信息</h1>
                <ul>
                    <li class="info-item" v-for='info in seller.infos'>{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import star from '../../components/star/star.vue'
import split from '../../components/split/split.vue'
export default {
    props: {
        seller: {
            type: Object
        }
    },
    components: {
        star,
        split
    },
    data(){
        return{
            favorite:(()=>{
                return this.loadFromLocal(this.seller.id, 'favorite',false)
            })()
        }
    },
    computed:{
        favoriteText(){
            return this.favorite?'已收藏':'收藏'
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods:{
        toogleFavorite(){
            this.favorite = !this.favorite
            this.saveToLocal(this.seller.id, 'favorite', this.favorite)
        },
        saveToLocal(id,key,value){
            let seller = window.localStorage._seller_
            if(!seller){
                seller = {}
                seller[id] = {}
            }else{
                seller = JSON.parse(seller)
                if(!seller.id){
                    seller[id] = {}
                }
            }
            seller[id][key]=value
            window.localStorage._seller_ = JSON.stringify(seller)
        },
        loadFromLocal(id,key,def){
            let seller = window.localStorage._seller_
            if(!seller){
                return def
            }
            seller = JSON.parse(seller)[id]
            if(!seller){
                return def
            }
            let ret = seller[key]
            return ret || def
        }
    }
};
</script>
<style type="text/css">
.decrease {
    background-image: url(../seller/decrease_4@2x.png)
}

.discount {
    background-image: url(../seller/discount_4@2x.png)
}

.guarantee {
    background-image: url(../seller/guarantee_4@2x.png)
}

.invoice {
    background-image: url(../seller/invoice_4@2x.png)
}

.special {
    background-image: url(../seller/special_4@2x.png)
}

.seller {
    position: absolute;
    top: 174px;
    bottom: 0;
    width: 100%;
    left: 0;
    overflow: auto;
}

.seller .overview {
    padding: 18px;
    position: relative;
}
.seller .overview .favorite{
    width: 50px;
    position: absolute;
    right: 11px;
    top:18px;
    text-align: center;
}
.seller .overview .icon-favorite{
    display: block;
    color: #d4d6d9;
    line-height: 24px;
    font-size: 24px;
    margin-bottom: 4px;
}
.seller .overview .active{
    color: rgb(240,20,20);
}
.seller .overview .favorite .text{
    line-height: 10px;
    font-size: 10px;
    color: rgb(77,85,93)
}
.seller .overview .title {
    margin-bottom: 8px;
    color: rgb(7, 17, 27);
    font-size: 14px;
}

.seller .overview .desc {
    padding-bottom: 18px;
    border-bottom: 1px solid rgb(7, 17, 27, 0.1);
    font-size: 0;
}

.seller .overview .desc .star {
    display: inline-block;
    margin-right: 8px;
}

.seller .overview .desc .text {
    line-height: 14px;
    margin-right: 12px;
    display: inline-block;
    vertical-align: top;
    font-size: 10px;
    color: rgb(77, 85, 93);
}

.seller .remark {
    display: flex;
    padding-top: 18px;
}

.seller .remark .block {
    flex: 1;
    text-align: center;
    border-right: 1px solid rgba(7, 17, 27, 0.1);
}

.seller .remark .block:last-child {
    border-right: none;
}

.seller .remark .block h2 {
    margin-bottom: 10px;
    line-height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);
}

.seller .remark .block .content {
    line-height: 24px;
    font-size: 10px;
    color: rgb(7, 17, 27);
}

.seller .remark .block .stress {
    font-size: 24px;
}

.seller .bulletin {
    padding: 18px 18px 0 18px;
}

.seller .bulletin .title {
    margin-bottom: 8px;
    color: rgb(7, 17, 27);
    font-size: 14px;
}

.seller .bulletin .content-wrapper {
    padding: 16px 12px 16px 12px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
}

.seller .bulletin .content-wrapper .content {
    line-height: 24px;
    font-size: 12px;
    color: rgb(240, 20, 20);
}

.seller .support .support-item {
    padding: 16px 12px;
    font-size: 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
}

.seller .support .support-item .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    font-size: 16px;
    margin-right: 6px;
    vertical-align: top;
    background-size: 16px 16px;
    background-repeat: no-repeat;
}

.seller .support .support-item .text {
    line-height: 16px;
    font-size: 12px;
    color: rgb(7, 17, 27)
}

.seller .pics {
    padding: 18px;
}

.seller .pics .title {
    margin-bottom: 12px;
    color: rgb(7, 17, 27);
    font-size: 14px;
}

.seller .pics-wrapper {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    overflow-x: auto
}

.seller .pics-wrappeer .pic-list {
    font-size: 0;
}

.seller .pics-wrapper .pic-item {
    display: inline-block;
    margin-right: 6px;
    width: 120px;
    height: 90px;
}

.seller .info {
    padding: 18px 18px 0 18px;
}

.seller .info .title {
    padding-bottom: 12px;
    color: rgb(7, 17, 27);
    font-size: 14px;
    border-bottom:1px solid rgba(7, 17, 27, 0.1);
}
.seller .info .info-item{
    padding: 16px 12px;
    font-size: 12px;
    line-height: 16px;
    color: rgb(7,17,27);
    border-bottom:1px solid rgba(7, 17, 27, 0.1);
}
.seller .info .info-item:last-child{
    border: none;
}
</style>
