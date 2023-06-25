// 管理用户数据相关
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/uesr'
import { useCartStore } from './cartStore'

export const useUserStore = defineStore('user', () => {
    const cartStore = useCartStore()
    // 1.定义管理用户数据的state
    const userInfo = ref({})
    // 2.定义获取接口的action函数
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.result
    }

    // 用户数据删除
    const clearUserInfo = () => {
        userInfo.value = {}
        cartStore.clearCart()
    }
    // 3.以对象的格式把state和action return
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
}, { persist: true, })