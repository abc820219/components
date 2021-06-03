<template>
    <div class="intro-cover">
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
                return {}
            },
        },
    },
    name: 'Intro',
    data() {
        return {
            flowsFuncs: [],
            step: -1,
            curNextFunc: null,
            curPreFunc: null,
            curTaget: null,
            padding: 3,
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
                    const TargetEle = document.querySelector(target)
                    const IntroContent = document.querySelector(
                        '#intro-content'
                    )
                    let padding = this.padding
                    function flowFunc() {
                        // console.log(targetRect)
                        // window.scrollTo(0, TargetEle.offsetTop)
                        // console.log(document.body.scrollTop)
                        // console.log(TargetEle.offsetTop)
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
                        if (
                            TargetEle.offsetTop <
                            (document.documentElement.clientHeight ||
                                document.body.offsetHeight)
                        ) {
                            document.documentElement.scrollTop = 0
                        }
                        let targetRect = TargetEle.getBoundingClientRect()

                        let { width, height, left, top, right } = targetRect
                        if (
                            right >
                            (document.documentElement.clientWidth / 2 ||
                                document.body.offsetWclientWidth / 2)
                        ) {
                            IntroContent.classList.remove('intro-content-left')
                            IntroContent.classList.add('intro-content-right')
                        } else {
                            IntroContent.classList.remove('intro-content-right')
                            IntroContent.classList.add('intro-content-left')
                        }
                        if (
                            top + IntroContent.getBoundingClientRect().height >=
                            (document.documentElement.clientHeight ||
                                document.body.offsetHeight)
                        ) {
                            IntroContent.classList.add('intro-content-top')
                        } else {
                            IntroContent.classList.remove('intro-content-top')
                        }

                        IntroTarget.style.width = width + 'px'
                        IntroTarget.style.height = height + 'px'
                        IntroTarget.style.left = left - 5 - padding + 'px'
                        IntroTarget.style.top = top - 5 - padding + 'px'
                        IntroTarget.style.padding = padding + 'px'

                        if (typeof curfunc === 'function') {
                            curfunc()
                        }

                        _this.curNextFunc = () => {
                            TargetEle.classList.toggle(
                                'introjs-relativePosition'
                            )
                            nextfunc()
                        }
                        _this.curPreFunc = () => {
                            TargetEle.classList.toggle(
                                'introjs-relativePosition'
                            )
                            prefunc()
                        }
                        _this.curContent = content
                        _this.curTaget = TargetEle
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
        document.documentElement.style.overflow = 'auto'
        document.documentElement.scrollTop = 0
    },
}
</script>

<style lang="scss" scoped>
.intro-cover {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.393);
}
.intro-target {
    position: absolute;
    border: 5px solid rgb(57, 12, 12);
    z-index: 999;
}

.intro-content-left {
    left: calc(100% + 12px);
}

.intro-content-right {
    right: calc(100% + 12px);
}

.intro-content-top {
    transform: translateY(-100%);
}

.intro-content {
    position: absolute;
    background-color: #fff;
    word-wrap: break-word;
    max-width: 300px;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.intro-title {
    text-align: right;
    padding: 10px;
}
.intro-content-info {
    padding: 10px;
}
.intro-options {
    padding: 10px;
}
.introjs-relativePosition {
    position: relative;
    z-index: 9999 !important;
}
</style>
