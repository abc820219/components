<template>
    <div class="home">
        {{ message }}
        <div class="w">
            <div id="step1">123</div>
            <div id="step2">123</div>
        </div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div class="w">
            <div id="step12">123</div>
            <div id="step13">123</div>
        </div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step4">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div id="step3">123</div>
        <div class="w">
            <div id="step14">123</div>
            <div id="step15">123</div>
        </div>
        <button @click="test">start</button>
        <Intro v-if="flowSetting.isOpen" :flowSetting="flowSetting"></Intro>
    </div>
</template>

<script>
// @ is an alias to /src
import Intro from '@/components/intro.vue'
export default {
    components: {
        Intro,
    },
    name: 'Home',
    data() {
        return {
            message: 'test',
            flowSetting: {
                isOpen: true,
                flows: [
                    {
                        target: '#step1',
                        content:
                            '<div>hi1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</div>',
                        curfunc: () => console.log('生命週期'),
                        prefunc: () => (this.message = 'test'),
                        nextfunc: () => (this.message = 'QQQQ'),
                    },
                    {
                        target: '#step2',
                        content: '<div>hi2</div>',
                        curfunc: () => console.log('生命週期'),
                        prefunc: () => (this.message = 'test'),
                        nextfunc: () => console.log('2-next'),
                    },
                    {
                        target: '.t',
                        content: '<div>hi2</div>',
                        curfunc: () => console.log('生命週期'),
                        prefunc: () => console.log('2-pre'),
                        nextfunc: () => console.log('2-next'),
                    },
                    {
                        target: '#step12',
                        content: '<div>hi32</div>',
                        curfunc: () => console.log('生命週期'),
                        prefunc: () => console.log('2-pre'),
                        nextfunc: () => console.log('2-next'),
                    },
                    {
                        target: '#step13',
                        content: '<div>hi32</div>',
                        curfunc: () => console.log('生命週期'),
                        prefunc: () => console.log('2-pre'),
                        nextfunc: () => console.log('2-next'),
                    },
                    {
                        target: '#step14',
                        content: '<div>hi32</div>',
                        curfunc: () => console.log('生命週期'),
                        prefunc: () => console.log('2-pre'),
                        nextfunc: () => console.log('2-next'),
                    },
                    {
                        target: '#step15',
                        content: '<div>hi32</div>',
                        curfunc: () => console.log('生命週期'),
                        prefunc: () => console.log('2-pre'),
                        nextfunc: () => console.log('2-next'),
                    },
                ],
            },
        }
    },
    methods: {
        test() {
            this.flowSetting.isOpen = true
        },
    },
}
</script>

<style lang="scss">
.w {
    display: flex;
    justify-content: space-between;
}
#step1 {
    background-color: red;
    width: 300px;
    margin-bottom: 30px;
}
#step2 {
    background-color: red;
    width: 300px;
    margin-bottom: 30px;
}
#step4 {
    background-color: red;
    width: 300px;
    margin-bottom: 30px;
}
#step12 {
    background-color: red;
    width: 300px;
}
#step13 {
    background-color: red;
    width: 300px;
}
#step14 {
    background-color: red;
    width: 300px;
}
#step15 {
    background-color: red;
    width: 300px;
}
</style>
