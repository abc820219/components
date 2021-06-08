<template>
    <div class="intro-cover" v-if="flowSetting.isOpen">
        <div class="intro-target" id="intro-target">
            <div class="intro-content" id="intro-content">
                <div class="intro-title">
                    <button @click="cancel">取消</button>
                </div>
                <div
                    v-html="curContent"
                    id="intro-content-info"
                    class="intro-content-info"
                ></div>
                <div class="intro-options">
                    <button @click="pre">上一步</button>
                    <button @click="next">下一步</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        flowSetting: {
            type: Object,
            default() {
                return {
                    isOpen: false,
                }
            },
        },
    },
    name: 'Intro',
    data() {
        return {
            flowsFuncs: [],
            elems: [],
            step: -1,
            curNextFunc: null,
            curPreFunc: null,
            curTaget: null,
            curContent: '',
        }
    },
    mounted() {
        let _this = this
        this.$nextTick(() => {
            this.flowSetting.flows.forEach(
                ({ target, content, curfunc, prefunc, nextfunc }) => {
                    console.log(target, content, curfunc)
                    const IntroTarget = document.querySelector('#intro-target')
                    const IntroContent = document.querySelector(
                        '#intro-content'
                    )
                    function flowFunc() {
                        // console.log(targetRect)
                        // window.scrollTo(0, TargetEle.offsetTop)
                        // console.log(document.body.scrollTop)
                        // console.log(TargetEle.offsetTop)
                        const TargetEle = document.querySelector(target)
                        TargetEle.classList.toggle('introjs-relativePosition')
                        if (
                            TargetEle.getBoundingClientRect().top <= 0 ||
                            TargetEle.getBoundingClientRect().top >=
                                (document.documentElement.clientHeight ||
                                    document.body.offsetHeight)
                        ) {
                            document.documentElement.scrollTop =
                                TargetEle.offsetTop - 100
                        }

                        // if (
                        //     TargetEle.offsetTop <
                        //     (document.documentElement.clientHeight ||
                        //         document.body.offsetHeight)
                        // ) {
                        //     document.documentElement.scrollTop = 0
                        // }

                        let targetRect = TargetEle.getBoundingClientRect()

                        let {
                            width,
                            height,
                            left,
                            top,
                            right,
                            bottom,
                        } = targetRect

                        IntroContent.classList.remove('intro-content-top')
                        IntroContent.classList.remove('intro-content-right')
                        IntroContent.classList.remove('intro-content-left')
                        IntroContent.classList.remove('intro-content-bottom')
                        IntroContent.classList.remove('intro-content-center')

                        if (
                            width >=
                                (document.documentElement.clientWidth / 2 ||
                                    document.body.offsetWclientWidth / 2) &&
                            bottom >
                                (document.documentElement.clientHeight / 2 ||
                                    document.body.offsetWclientHeight / 2)
                        ) {
                            IntroContent.classList.add('intro-content-center')
                            IntroContent.classList.add('intro-content-top')
                        } else if (
                            width >=
                            (document.documentElement.clientWidth / 2 ||
                                document.body.offsetWclientWidth / 2)
                        ) {
                            IntroContent.classList.add('intro-content-center')
                            IntroContent.classList.add('intro-content-bottom')
                        } else if (
                            right >
                            (document.documentElement.clientWidth / 2 ||
                                document.body.offsetWclientWidth / 2)
                        ) {
                            IntroContent.classList.add('intro-content-right')
                        } else {
                            IntroContent.classList.add('intro-content-left')
                        }

                        IntroTarget.style.width = width + 20 + 'px'
                        IntroTarget.style.height = height + 20 + 'px'
                        IntroTarget.style.left = left - 10 + 'px'
                        IntroTarget.style.top = top - 10 + 'px'

                        if (typeof curfunc === 'function') {
                            curfunc(TargetEle)
                        }

                        _this.curNextFunc = () => {
                            TargetEle.classList.toggle(
                                'introjs-relativePosition'
                            )
                            nextfunc(TargetEle)
                        }
                        _this.curPreFunc = () => {
                            TargetEle.classList.toggle(
                                'introjs-relativePosition'
                            )
                            prefunc(TargetEle)
                        }
                        _this.curContent = content
                        _this.curTaget = TargetEle
                        _this.elems.push(TargetEle)
                    }
                    this.flowsFuncs.push(flowFunc)
                }
            )
            this.start()
        })
    },
    methods: {
        start() {
            document.documentElement.style.overflow = 'hidden'
            this.step = 0
            this.flowsFuncs[this.step]()
        },
        next() {
            if (typeof this.curNextFunc === 'function') {
                this.curNextFunc()
            }
            this.step += 1
            if (this.step >= this.flowSetting.flows.length - 1)
                this.step = this.flowSetting.flows.length - 1
            this.flowsFuncs[this.step]()
        },
        pre() {
            if (typeof this.curPreFunc === 'function') {
                this.curPreFunc()
            }
            this.step -= 1
            if (this.step <= 0) this.step = 0
            this.flowsFuncs[this.step]()
        },
        cancel() {
            this.flowSetting.isOpen = false
        },
        end() {},
    },
    destroyed() {
        this.elems.forEach((dom) => {
            dom.classList.remove('introjs-relativePosition')
        })
        document.documentElement.style.overflow = 'auto'
        document.documentElement.scrollTop = 0
    },
}
</script>

<style lang="scss">
@import '@/assets/scss/_mixin.scss';
.intro-cover {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 998;
}
.intro-target {
    position: absolute;
    z-index: 999;
    border: 5px solid rgb(181, 11, 11);
    border-radius: 5px;
    transition: all 0.5s;
}

.intro-content-left {
    left: calc(120%);
    top: 10px;
}

.intro-content-right {
    right: calc(120%);
    top: 10px;
}

.intro-content-top {
    top: 0;
    transform: translate(-50%, -120%);
}

.intro-content-center {
    left: 50%;
}

.intro-content-bottom {
    top: calc(100% + 15px);
    transform: translateX(-50%);
}

.intro-content {
    position: absolute;
    background-color: #fff;
    color: $primary;
    font-weight: bold;
    border: 5px solid $primary;
    border-radius: 5px;
    word-wrap: break-word;
    max-width: 500px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
}

.intro-content-info {
    padding: 15px 0;
}

.introjs-relativePosition {
    position: relative !important;
    z-index: 998 !important;
}
</style>
