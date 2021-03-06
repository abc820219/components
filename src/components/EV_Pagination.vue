<template>
    <ul>
        <li @click="changeHandler(1)">最前</li>
        <li @click="preHandler()">上一步</li>
        <li
            v-for="n in totalPage"
            :key="n"
            v-show="currentPage + 3 > n && n > currentPage - 3"
        >
            {{ n }}
        </li>
        <li @click="nextHandler()">下一步</li>
        <li @click="changeHandler(totalPage)">最後</li>
    </ul>
</template>

<script>
export default {
    props: {
        currentPage: {
            type: Number,
            default: 1,
        },
        totalPage: {
            type: Number,
            default: 1,
        },
    },
    methods: {
        changeHandler(n) {
            this.$emit('update:currentPage', n)
        },
        preHandler() {
            if (this.currentPage <= 1) return
            this.$emit('update:currentPage', this.currentPage - 1)
        },
        nextHandler() {
            if (this.currentPage >= this.totalPage) return
            this.$emit('update:currentPage', this.currentPage + 1)
        },
    },
}
</script>

<style lang="scss" scoped></style>
