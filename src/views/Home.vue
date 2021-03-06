<template>
    <div class="home">
        <select v-model.number="showList">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="11">11</option>
        </select>
        <EV-Table
            type="static"
            :columns="columns"
            :listData="listData"
            :currentPage="currentPage"
            :showList="showList"
        >
            <template v-slot:options="slotProps">
                <span @click="edit(slotProps)">1</span>
                <span @click="edit(slotProps)">2</span>
                <span @click="edit(slotProps)">3</span>
            </template>
        </EV-Table>
        <EV-Pagination
            :currentPage.sync="currentPage"
            :totalPage="Math.ceil(listData.length / showList)"
        ></EV-Pagination>
    </div>
</template>

<script>
import EV_Table from '@/components/EV_Table.vue'
import EV_Pagination from '@/components/EV_Pagination.vue'

export default {
    name: 'Home',
    components: {
        'EV-Table': EV_Table,
        'EV-Pagination': EV_Pagination,
    },
    watch: {
        showList() {
            this.currentPage = 1
        },
    },
    data() {
        return {
            showList: 1,
            currentPage: 1,
            //表頭
            columns: [
                {
                    title: '功能',
                    key: 'options',
                    slot: 'options',
                    width: '200',
                },
                {
                    title: '年齡',
                    key: 'age',
                    width: '150',
                },
                {
                    title: '性別',
                    key: 'sex',
                    width: '150',
                },
            ],
            //表體
            listData: [
                {
                    id: 1,
                    age: 1,
                    sex: '男生',
                },
                {
                    id: 2,
                    age: 2,
                    sex: '男生',
                },
                {
                    id: 3,
                    age: 3,
                    sex: '男生',
                },
                {
                    id: 4,
                    age: 4,
                    sex: '男生',
                },
                {
                    id: 5,
                    age: 5,
                    sex: '男生',
                },
                {
                    id: 6,
                    age: 6,
                    sex: '男生',
                },
                {
                    id: 7,
                    age: 7,
                    sex: '男生',
                },
                {
                    id: 8,
                    age: 8,
                    sex: '男生',
                },
                {
                    id: 9,
                    age: 9,
                    sex: '男生',
                },
                {
                    id: 10,
                    age: 10,
                    sex: '男生',
                },
            ],
        }
    },
    methods: {
        edit(v) {
            console.log(v)
        },
    },
}
</script>
