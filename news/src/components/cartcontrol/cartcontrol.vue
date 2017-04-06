<template>
    <div class="cartcontrol">
    <transition name="move">
        <div class="cart-decrease cart-decrease-icon" v-show='food.count>0' @click='decreaseCart'>&#xe60e;</div>
    </transition>
        <div class="cart-count" v-show='food.count>0'>{{food.count}}</div>
        <div class="cart-add cart-add-icon" @click='addCart'>&#xe603;</div>
    </div>
</template>
<script type="text/javascript">
import Vue from 'vue'
export default {
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart() {
            if (!this.food.count) {
            	Vue.set(this.food, 'count', 1)
                this.food.count = 1
            } else {
                this.food.count++
            }
        },
        decreaseCart(){
        	if(this.food.count){
        		this.food.count--
        	}
        }
    }
}
</script>
<style type="text/css">
.cartcontrol {
    font-size: 0;
}

.cartcontrol .cart-decrease,
.cartcontrol .cart-add {
    display: inline-block;
    padding: 6px;
    font-size: 24px;
    line-height: 24px;
    color: rgb(0, 160, 220);
}

.cartcontrol .cart-count {
    display: inline-block;
   	vertical-align: top;
   	width: 12px;
   	padding-top: 6px;
   	line-height: 24px;
   	text-align: center;
   	font-size: 10px;
   	color: rgb(147,153,159)
}
.move-enter-active, .move-leave-active {
  transition: opacity .9s;
}
.move-enter {
  opacity: 0
}
</style>
