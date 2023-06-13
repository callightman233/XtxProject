// 封装产品分类数据相关的代码
import { ref, onMounted, watchEffect } from 'vue'
import { getCategoryAPI } from '@/apis/category'
import { useRoute } from 'vue-router'
export function useCategory() {
    const categoryData = ref({})
    const route = useRoute()
    const getCategory = async () => {
        const res = await getCategoryAPI(route.params.id)
        categoryData.value = res.result
    }
    // 目标路由变化后，可以把分类接口重新发送
    watchEffect(() => {
        getCategory()
    })

    onMounted(() => getCategory())
    return {
        categoryData
    }
}
