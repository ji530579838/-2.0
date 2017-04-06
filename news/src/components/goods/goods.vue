<template>
    <div class="goods">
        <div class="menu-wrapper">
            <ul>
                <li v-for='(item,index) in goods' class="menu-item" @click='change(index)'>
                    <span class="text">
                    <span v-show='item.type>0' class="icon" :class='classMap[item.type]'></span> {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper">
            <ul class="move">
                <li v-for='item in goods' class="food-list">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for='food in item.foods' class="food-item">
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon">
                            </div>
                            <div class="content">
                                <h1 class="name">{{food.name}}</h1>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}</span>
                                </div>
                                <div class="price">
                                    <span class="now">${{food.price}}</span>
                                    <span class="old" v-show='food.oldPrice'>{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food='food'></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart :selectFoods='selectfood'></shopcart>
    </div>
</template>
<script type="text/javascript">
import shopcart from '../../components/shopcart/shopcart.vue'
import cartcontrol from '../../components/cartcontrol/cartcontrol.vue'
export default {
    props: {
        seller: {
            tyoe: Object
        }
    },
    data() {
        return {
            goods: []
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        this.$ajax.get('api/goods').then((data) => {
            this.goods = data.data.goods
        })
    },
    computed:{
        selectfood(){
            let foods = []
            this.goods.forEach((good)=>{
                good.foods.forEach((food)=>{
                    if(food.count){
                        foods.push(food)
                    }
                })
            })
            return foods
        }
    },
    methods: {
        change(index) {
            $(".foods-wrapper").scrollTop(0)
            let count = 0
            let move = $('.move')
            let result = []
            let t = $('.move>li')
            for (let i = 0; i < t.length; i++) {
                let h = $(t[i]).height()
                result.push(h)
            }
            let s = result.slice(0, index)
            count = s.reduce(((a, b) => a + b), 0)
            move.animate({
                top: -count
            }, 'slow')
        }
    },
    components: {
        shopcart,
        cartcontrol
    },
}
</script>
<style type="text/css">
.goods {
    display: flex;
    overflow: hidden;
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 64px;
}

.goods .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
}

.goods .foods-wrapper {
    flex: 1;
    position: relative;
    overflow: auto;
}

.move {
    position: absolute;
    top: 0;
}

.goods .menu-wrapper .menu-item {
    display: table;
    height: 54px;
    width: 56px;
    line-height: 14px;
    padding: 0 12px;
}

.goods .menu-wrapper .menu-item .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    vertical-align: top;
}

.goods .menu-wrapper .menu-item .text {
    font-size: 12px;
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}

.decrease {
    background-image: url(../goods/decrease_3@2x.png)
}

.discount {
    background-image: url(../goods/discount_3@2x.png)
}

.guarantee {
    background-image: url(../goods/guarantee_3@2x.png)
}

.invoice {
    background-image: url(../goods/invoice_3@2x.png)
}

.special {
    background-image: url(../goods/special_3@2x.png)
}

.foods-wrapper .title {
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dd11;
    font-size: 12px;
    color: rgb(147, 153, 159);
    background: #f3f5f7;
}

.foods-wrapper .food-item {
    display: flex;
    margin: 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    padding-bottom: 18px;
}

.foods-wrapper .food-item:last-child {
    border-bottom: 1px solid #f3f5f7;
    margin-bottom: 0.2px;
}

.foods-wrapper .food-item .icon {
    flex: 0 0 57px;
    margin-right: 10px;
}

.foods-wrapper .food-item .content {
    flex: 1;
    position: relative;
}

.foods-wrapper .food-item .content .name {
    margin: 2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    color: rgb(7, 17, 27);
}

.foods-wrapper .food-item .content .desc {
    margin-bottom: 8px;
    line-height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);
}

.foods-wrapper .food-item .content .extra {
    line-height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);
}

.foods-wrapper .food-item .content .extra .count {
    margin-right: 12px;
}

.foods-wrapper .food-item .content .price {
    font-weight: 700;
    line-height: 24px;
}
.goods .cartcontrol-wrapper{
    position: absolute;
    right: 0;
    bottom: 12px;
}

.goods .content .price .now {
    margin-right: 18px;
    font-size: 14px;
    color: rgb(240, 20, 20)
}

.goods .content .price .old {
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147, 153, 159);
}

.goods .menu-item-selected {
    margin-top: -1px;
}

.goods .shopcart {
    position: fixed;
    bottom: 0
}
</style>
