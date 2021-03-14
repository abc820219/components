<template>
    <div id="app">
        <div class="guid">
            <ul>
                <li class="guid-title">screen shots</li>
                <li class="guid-sub-title">show life</li>
            </ul>
        </div>
        <div class="sidebar">
            <div class="logo">
                <div>
                    <p>screen</p>
                    <p>shots</p>
                    <span>
                        show life
                    </span>
                </div>
            </div>
            <div class="nav">
                <router-link to="/">home</router-link>
                <a href="https://abc820219.github.io/dist/#/home" target="_blank">author</a>
                <a>other works</a>
                <div class="record">record life</div>
            </div>
        </div>
        <div class="template-area">
            <router-view />
        </div>
        <div class="sns">
            <ul>
                <li>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=https://abc820219.github.io/dist/#/home">fb</a>
                </li>
                <li>
                    <a href="https://twitter.com/intent/tweet?url=https://abc820219.github.io/dist/#/home&text=">tw</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.gsap.from(
            '.guid-title',
            {
                opacity: 0,
                duration: 1,
                y: '-50%',
                ease: 'slow(0.7,0.7,0.7,0.7, false)',
            },
            1
        )
        this.gsap.from(
            '.guid-sub-title',
            {
                opacity: 0,
                duration: 1,
                y: '50%',
                ease: 'slow(0.7,0.7,0.7,0.7, false)',
            },
            1
        )
        this.gsap.to(
            '.guid',
            {
                duration: 1,
                y: '-100%',
                ease: 'slow(0.7,0.7,0.7,0.7, false)',
            },
            1
        )
        this.gsap.from(
            '.logo',
            {
                opacity: 0,
                delay: 1,
                duration: 2,
                y: '-100%',
                ease: 'slow(0.7,0.7,0.7,0.7, false)',
            },
            1
        )
        this.gsap.from(
            '.nav',
            {
                opacity: 0,
                delay: 1,
                duration: 2,
                y: '100%',
                ease: 'slow(0.7,0.7,0.7,0.7, false)',
            },
            1
        )
        this.gsap.from(
            '.sns',
            {
                delay: 2,
                opacity: 0,
                duration: 1,
                y: '100%',
                ease: 'slow(0.7,0.7,0.7,0.7, false)',
            },
            1
        )
    },
}
</script>
<style lang="scss">
@import '@/assets/scss/all.scss';
#app {
    overflow: hidden;
    display: flex;
    min-height: 100vh;
    font-family: 'agency fb';
    letter-spacing: 2px;
    text-transform: uppercase;
    a{
        text-decoration: none;
        color: #000;
    }
    .router-link-exact-active{
          text-decoration: underline;
    }
}

.guid {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #000;
    z-index: 1;
    color: #fff;
    text-align: center;
    line-height: 1.2;
    font-size: 30px;
    li:not(:last-child) {
        font-size: 60px;
    }
}

.sidebar {
    flex: 0 0 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .logo,
    .nav {
        flex: 0 0 50%;
    }
    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #000;
        color: #fff;
        line-height: 1.2;
        text-align: center;
        p {
            font-size: 48px;
        }
        span {
            font-size: 20px;
        }
    }
    .nav {
        a:first-child {
            margin-top: 30%;
        }
        position: relative;
        display: flex;
        flex-direction: column;
        text-align: right;
        font-size: 26px;
        line-height: 2;
        .record {
            display: flex;
            align-items: center;
            position: absolute;
            left: -10%;
            bottom: 100px;
            transform: rotate(-90deg);
            font-size: 16px;
            &::before {
                content: '';
                display: block;
                width: 40px;
                height: 1px;
                background-color: #000;
                margin-right: 5px;
            }
        }
    }
}
.template-area {
    width: 100%;
}
.sns {
    position: absolute;
    right: 60px;
    bottom: 60px;
    ul {
        display: flex;
        font-size: 20px;
        li:not(:last-child) {
            margin-right: 60px;
        }
    }
}
</style>
