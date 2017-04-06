<template>
    <div id="app">
        <vheader :seller='seller'></vheader>
        <div class="tab">
            <div class="tab-item">
                <router-link to='/goods'>商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to='/ratings'>评论</router-link>
            </div>
            <div class="tab-item">
                <router-link to='/seller'>商家</router-link>
            </div>
        </div>
        <keep-alive><router-view :seller='seller'></router-view></keep-alive>
    </div>
</template>
<script>
import vheader from './components/header/header.vue'
export default {
    data() {
        return {
            seller: {
                id: (() => {
                    let queryParam = this.utin();
                     return queryParam.id
                })()
            }
        }
    },
    created() {
            this.$ajax.get('api/seller?id='+this.seller.id).then((data) => {
                this.seller = Object.assign({}, this.seller, data.data.seller)
                console.log(this.seller.id)
            })
        },
        components: {
            vheader,
        },
        methods: {
            utin() {
                let url = window.location.search
                let obj = {}
                let reg = /[?&][^?&]+=[^?&]+/g
                let arr = url.match(reg)
                if (arr) {
                    arr.forEach((item) => {
                        let tempArr = item.substring(1).split('=')
                        let key = decodeURIComponent(tempArr[0])
                        let val = decodeURIComponent(tempArr[1])
                        obj[key] = val
                    })

                }
                return obj
            }
        }
}
</script>
<style>
.tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
}

.tab-item {
    flex: 1;
    text-align: center;
}

.tab-item a {
    display: block;
    font-size: 14px;
    color: rgb(77, 85, 93);
}

a.active {
    color: rgb(240, 20, 20);
}
</style>
