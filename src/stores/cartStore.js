import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const cartList = ref([])
    const addCart = (goods) => {
        //已添加过 count+1
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
            item.count++
        }
        //未添加过，push
        else {
            cartList.value.push(goods)
        }
    }
    return {
        cartList,
        addCart
    }
},{ persist: true, })