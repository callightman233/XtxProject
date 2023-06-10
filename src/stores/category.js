import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'

export const useCategoryStore = defineStore('category', () => {
    // 导航列表数据管理
    // state导航列表数据
    const categoryList = ref([])

    // action获取导航列表数据方法
    const getCategory = async () => {
        const res = await getCategoryAPI()
        console.log(res)
        categoryList.value = res.result
    }
    return{
        categoryList,
        getCategory
    }
})
