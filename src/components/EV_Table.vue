<template>
    <table border="1">
        <colgroup>
            <col v-for="(col, key) in columns" :key="key" :width="col.width" />
        </colgroup>
        <thead>
            <tr>
                <th v-for="col in columns" :key="col.key">{{ col.title }}</th>
            </tr>
        </thead>
        <tbody v-if="showData.length">
            <template v-for="row in showData">
                <tr :key="row.id">
                    <td v-for="col in columns" :key="col.col">
                        <template v-if="col.slot">
                            <slot :name="col.slot" :row="row" :col="col"></slot>
                        </template>
                        <template v-else>
                            <span>{{ row[col.key] }}</span>
                        </template>
                    </td>
                </tr>
            </template>
        </tbody>
        <tbody v-else>
            <tr>
                無資料
            </tr>
        </tbody>
    </table>
</template>
<script>
//static
//dynamic
export default {
    props: {
        currentPage: {
            type: Number,
            default: 1,
        },
        showList: {
            type: Number,
            default: 3,
        },
        type: {
            type: String,
            default: 'static',
        },
        columns: {
            type: Array,
            default() {
                return []
            },
        },
        listData: {
            type: Array,
            default() {
                return []
            },
        },
    },
    computed: {
        showData() {
            if (this.type === 'static') {
                return this.listData.slice(
                    (this.currentPage - 1) * this.showList,
                    (this.currentPage - 1) * this.showList + this.showList
                )
            }
            return this.listData
        },
    },
}
</script>

<style></style>
