import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user'
import { insertCartAPI, findNewCartListAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)

    const cartList = ref([])
    const addCart = async (goods) => {
        const { skuId, count } = goods
        if (isLogin) {
            // 登录后购物车逻辑
            await insertCartAPI({ skuId, count })
            const res = await findNewCartListAPI()
            cartList.value = res.result
        } else {
            // 本地购物车逻辑
            //已添加过 count+1
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {
                item.count += goods.count
            }
            //未添加过，push
            else {
                cartList.value.push(goods)
            }
        }

    }
    const delCart = (skuId) => {
        const index = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(index, 1)
    }

    // 单选功能
    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }

    // 全选功能
    const allCheck = (selected) => {
        cartList.value.forEach((item) => item.selected = selected)
    }

    //计算属性
    // 1.总的数量
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    // 2.总价
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
    // 3.已选数量
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
    // 4.已选商品总价
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))

    return {
        cartList,
        allCount,
        allPrice,
        isAll,
        selectedCount,
        selectedPrice,
        addCart,
        delCart,
        singleCheck,
        allCheck
    }
}, { persist: true, })