<template>
    <div class="gantt-wrap">
        <h2>{{year}}</h2>
        <div class="d-flex">
            <div class="gantt-list">
                <div class="d-flex flex-nowrap text-center">
                    <div
                        class="gantt-list-header border-bottom"
                        v-for="(col, i) in columns"
                        :key="i"
                        :style="{
                            width: col.width + 'px',
                            height: showType
                                ? height + 'px'
                                : 2 * height + 'px',
                            'line-height': showType
                                ? height + 'px'
                                : 2 * height + 'px',
                        }"
                    >
                        {{ col.title }}
                    </div>
                </div>
                <div class="text-center">
                    <div v-if="apiData.length">
                        <template v-for="row in apiData">
                            <div :key="row.id" class="d-flex">
                                <div
                                    v-for="col in columns"
                                    :key="col.col"
                                    :style="{
                                        width: col.width + 'px',
                                        height: height + 'px',
                                        'line-height': height + 'px',
                                    }"
                                    class="gantt-list-col"
                                >
                                    <template v-if="col.slot">
                                        <slot
                                            :name="col.slot"
                                            :row="row"
                                            :col="col"
                                        >
                                            <input
                                                type="checkbox"
                                                name=""
                                                id=""
                                            />
                                        </slot>
                                    </template>
                                    <template v-else>
                                        <span>{{ row[col.key] }}</span>
                                    </template>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="gantt" :style="{ width: tableWidth + 'px' }">
                <div class="d-flex flex-nowrap text-center">
                    <div
                        class="gantt-time-month border-bottom"
                        v-for="(month, i) in months"
                        :key="i"
                        :style="{
                            'min-width': month.width + 'px',
                            height: height + 'px',
                            'line-height': height + 'px',
                        }"
                    >
                        {{ month.m + 1 }}月
                    </div>
                </div>
                <div class="d-flex flex-nowrap  text-center" v-if="!showType">
                    <div
                        class="gantt-time-days d-flex  flex-nowrap border-bottom"
                        v-for="(month, m) in months"
                        :key="m"
                        :style="{
                            'min-width': month.width + 'px',
                        }"
                    >
                        <div
                            class="w-100 gantt-time-days-block"
                            v-for="d in days[month.m]"
                            :key="d"
                            :style="{
                                height: height + 'px',
                                'line-height': height + 'px',
                            }"
                        >
                            {{ d }}
                        </div>
                    </div>
                </div>

                <div
                    class=" d-flex flex-nowrap position-relative"
                    v-for="(data, key) in ganttData"
                    :key="key"
                >
                    <div class="d-flex" v-for="(month, i) in months" :key="i">
                        <div
                            class="gantt-time-block border-bottom"
                            v-for="day in days[month.m]"
                            :key="day"
                            :style="{
                                'min-width': columnWidth + 'px',
                                height: height + 'px',
                            }"
                        ></div>
                    </div>
                    <div
                        v-if="data.taskW"
                        class="gantt-time-bar"
                        :style="{
                            width: data.taskW + 'px',
                            left: data.taskS + 'px',
                            height: height * 0.9 + 'px',
                            'line-height': height * 0.9 + 'px',
                        }"
                    ></div>
                    <div
                        v-if="data.taskW"
                        class="gantt-time-progress d-flex bg-info"
                        :style="{
                            width: data.taskW * (data.progress / 100) + 'px',
                            left: data.taskS + 'px',
                            height: height * 0.7 + 'px',
                            'line-height': height * 0.7 + 'px',
                        }"
                    >
                        {{ data.progress }}%
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        columnBorder: {
            type: Boolean,
            default: false,
        },
        columns: {
            type: Array,
            default() {
                return [
                    {
                        title: '功能',
                        key: 'options',
                        slot: 'options',
                        width: '100',
                    },
                    {
                        title: '任務名稱',
                        key: 'name',
                        width: '100',
                    },
                    {
                        title: '起',
                        key: 'start',
                        width: '100',
                    },
                    {
                        title: '屹',
                        key: 'end',
                        width: '100',
                    },
                ]
            },
        },
        apiData: {
            type: Array,
            default() {
                return [
                    {
                        name: '任務1',
                        start: '2021/2/1',
                        end: '2021/5/1',
                        progress: 80,
                    },
                    {
                        name: '任務1',
                        start: '2020/5/1',
                        end: '2021/12/1',
                        progress: 50,
                    },
                ]
            },
        },
    },
    data() {
        return {
            showType: 'month',
            year: 2021,
            columnWidth: 3,
            height: 30,
        }
    },
    watch: {
        showType: {
            immediate: true,
            handler(newType) {
                if (!newType) {
                    this.columnWidth = 20
                }
            },
        },
    },
    computed: {
        tableWidth() {
            return this.months.reduce((pre, cur) => {
                return pre + cur.width
            }, 0)
        },
        ganttData() {
            return this.apiData.map((task) => {
                if (this.year < this.dayjs(task.start).year()) return task
                let taskS = 0
                let taskW = 0
                // console.log('end:' + this.dayjs(task.end).year())
                // console.log('start:' + this.dayjs(task.start).year())
                if (
                    this.year == this.dayjs(task.start).year() &&
                    this.year == this.dayjs(task.end).year()
                ) {
                    taskS =
                        (this.dayjs(task.start).dayOfYear() - 1) *
                        this.columnWidth
                    taskW =
                        (this.dayjs(task.end).dayOfYear() -
                            this.dayjs(task.start).dayOfYear() +
                            1) *
                        this.columnWidth
                }

                if (
                    this.year > this.dayjs(task.start).year() &&
                    this.year < this.dayjs(task.end).year()
                ) {
                    taskW =
                        ((this.dayjs(task.end).year() - this.year) * 365 +
                            (this.dayjs(task.end).dayOfYear() -
                                this.dayjs(task.start).dayOfYear() +
                                1)) *
                        this.columnWidth
                }

                if (
                    this.year > this.dayjs(task.start).year() &&
                    this.year == this.dayjs(task.end).year()
                ) {
                    taskS = 0
                    let totalDays = 0
                    for (
                        let index = 1;
                        index <= this.dayjs(task.end).month();
                        index++
                    ) {
                        totalDays += this.dayjs(
                            `${this.year}-${index}`
                        ).daysInMonth()
                    }
                    totalDays += Number(this.dayjs(task.end).format('DD'))
                    taskW = totalDays * this.columnWidth
                }

                if (
                    this.year < this.dayjs(task.end).year() &&
                    this.year == this.dayjs(task.start).year()
                ) {
                    taskS =
                        (this.dayjs(task.start).dayOfYear() - 1) *
                        this.columnWidth
                    taskW =
                        (365 - this.dayjs(task.start).dayOfYear() + 2) *
                        this.columnWidth
                }

                if (
                    this.dayjs(task.start).year() >
                    this.year >
                    this.dayjs(task.end).year()
                ) {
                    taskW = 0
                }

                return {
                    ...task,
                    taskS,
                    taskW,
                }
            })
        },
        months() {
            let result = []
            for (let index = 0; index < 12; index++) {
                result = [
                    ...result,
                    {
                        m: index,
                        width:
                            this.dayjs(
                                `${this.year}-${index + 1}`
                            ).daysInMonth() * this.columnWidth,
                    },
                ]
            }
            return result
        },
        days() {
            let result = []
            for (let index = 1; index < 13; index++) {
                result = [
                    ...result,
                    this.dayjs(`${this.year}-${index}`).daysInMonth(),
                ]
            }
            return result
        },
    },
    mounted() {},
}
</script>

<style lang="scss" scoped>
.gantt-wrap {
    max-width: 1600px;
    margin: 0 auto;
}
.gantt {
    max-width: 800px;
    min-height: 500px;
    overflow-x: scroll;
    border: 1px solid #ccc;
}
.gantt-time-month {
    font-size: 14px;
    border-right: 1px solid #ccc;
}

.gantt-time-days-block {
    border-right: 1px solid #ccc;
}

.gantt-time-block {
    border-bottom: 1px solid #ccc;
}

.gantt-time-bar,
.gantt-time-progress {
    position: absolute;
    border-radius: 15px;
    top: 50%;
    border-radius: 3px;
    transform: translateY(-50%);
}

.gantt-time-progress {
    padding-left: 15px;
    color: #fff;
}

.gantt-time-bar {
    background-color: rgb(175, 174, 174);
}

.gantt-list {
    border: 1px solid #ccc;
}
.gantt-list-col {
    border-bottom: 1px solid #ccc;
}
.gantt-list-header {
}
</style>
