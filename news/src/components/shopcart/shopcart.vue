<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="log-wrapper">
                    <div class="logo" :class="{'heightlight': totalCount>0}">
                        <span class="icon-shopping-cart" :class="{'height': totalCount>0}">&#xe600;</span>
                    </div>
                    <div class="num" v-show='totalCount>0'>{{totalCount}}</div>
                </div>
                <div class="price" :class="{'height': totalCount>0}">{{totalPrice}}元</div>
                <div class="desc">另配送运费${{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="pay" :class='payClass'>
                    {{payDesc}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        selectFoods: {
            type: Array,
            default () {
                return []
            }
        },
        deliveryPrice: {
            type: Number,
            default: 0,
        },
        minPrice: {
            type: Number,
            default: 30,
        }
    },
    computed: {
        totalPrice() {
            let total = 0
            this.selectFoods.forEach((food) => {
                total += food.price * food.count
            })
            return total
        },
        totalCount() {
            let count = 0
            this.selectFoods.forEach((food) => {
                count += food.count
            })
            return count
        },
        payDesc(){
        	if(this.totalPrice===0){
        		return `$${this.minPrice}元起送`
        	}else if(this.totalPrice<this.minPrice){
        		let diff =this.minPrice - this.totalPrice
        		return `还差${diff}元起送`
        	}else{
        		return '去结算'
        	}
        },
        payClass(){
        	if(this.totalPrice<this.minPrice){
        		return 'not-enough'
        	}else{
        		return 'enough'
        	}
        },
    }
}
</script>
<style type="text/css">
.shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
}

.shopcart .content {
    display: flex;
    background-color: #141d27;
    font-size: 0;
}

.shopcart .content .content-left {
    flex: 1;
}

.shopcart .content .content-left .log-wrapper {
    display: inline-block;
    vertical-align: top;
    position: relative;
    top: -20px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #141d27;
}

.shopcart .content .content-left .log-wrapper .logo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    text-align: center;
    background-color: #2b343c;
}
.shopcart .content .content-left .log-wrapper .logo.heightlight{
	background-color: rgb(0,160,220);
}
.icon-shopping-cart.height{
	color:#fff;
}
.num {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    background-color: rgb(240, 20, 20);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
}

.icon-shopping-cart {
    line-height: 44px;
    font-size: 24px;
    color: #80858a
}

.shopcart .content .content-left .price {
    display: inline-block;
    vertical-align: top;
    margin-top: 12px;
    line-height: 24px;
    padding-right: 12px;
    box-sizing: border-box;
    border-radius: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 16px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.4);
}

.shopcart .content .content-left .desc {
    display: inline-block;
    vertical-align: top;
    margin: 12px 0 0 12px;
    line-height: 24px;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.4);
}

.shopcart .content .content-right {
    flex: 0 0 105px;
    width: 105px
}

.shopcart .content .content-right .pay {
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
    font-weight: 700;
    
}
.shopcart .content .content-right .not-enough{
	background-color: #2b333b;
}
.shopcart .content .content-right .enough{
	background-color: #00b43c;
	color:#fff;
}
</style>
