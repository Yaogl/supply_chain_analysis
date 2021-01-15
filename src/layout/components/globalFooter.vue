<template>
    <div class="global-footer">
        Copyright {{ year }} Great Wall Motors.All rights reserved | 长城汽车股份有限公司版权所有｜企业数字化中心
    </div>
</template>
<script>
export default {
    data() {
        return {
            year: 2021
        }
    },
    created() {
        const now = new Date()
        this.year = now.getFullYear()
    }
}
</script>
<style lang="less" scoped>
.global-footer{
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: #2B343D;
    color: #fff;
    font-size: 14px;
}
</style>