<template>
    <div class="home">
        <div class="shots-area-cover">
            <div class="shots-circle"></div>
            <div class="shots-area" ref="shotArea">
                <div
                    class="title"
                    @mouseenter="openInput"
                    @mouseleave="closeInput"
                >
                    {{ title }}<br />
                    <input
                        type="text"
                        v-model="title"
                        ref="typeTitle"
                        style="display:none"
                    />
                </div>
                <img src="@/assets/images/reindeer.png" alt="" ref="img" />
                <div class="download" @click="shotHandler">
                    download
                </div>
            </div>
        </div>
        <div class="upload">
            <label for="upload_img">
                upload your picture
                <input
                    type="file"
                    name=""
                    id="upload_img"
                    style="display:none"
                    @change="uploadImgHandler"
                />
            </label>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.home {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .shots-area-cover {
        position: relative;
        width: 80vh;
        height: 80vh;
        border: 1px solid #000;
        border-radius: 50%;
        margin-right: 20px;
    }
    .shots-circle {
        position: absolute;
        left: -10px;
        right: -10px;
        top: -10px;
        bottom: -10px;
        border-style: solid;
        border-width: 10px;
        border-color: #000 transparent;
        border-radius: 50%;
    }
    .shots-area {
        position: absolute;
        overflow: hidden;
        left: -5px;
        right: -5px;
        top: -5px;
        bottom: -5px;
        border-radius: 50%;
        .title {
            text-align: center;
            font-size: 30px;
            position: absolute;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 2;
        }
        img {
            position: absolute;
            height: 100%;
            left: 50%;
            transform: translateX(-50%);
        }
        .download {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background-color: #000;
            color: #fff;
            padding: 5px;
            font-size: 20px;
            cursor: pointer;
            display: none;
            z-index: 1;
        }
        &:hover:after {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            background-color: rgba(14, 14, 14, 0.138);
        }
        &:hover .download {
            display: block;
        }
    }
    .upload {
        label {
            cursor: pointer;
            font-size: 26px;
            background-color: #000;
            color: #fff;
            padding: 10px;
        }
    }
}
</style>
<script>
// @ is an alias to /src
import html2canvas from 'html2canvas'
export default {
    mounted() {
        this.gsap.from(
            '.upload',
            {
                delay: 2,
                opacity: 0,
                duration: 1,
                y: '100%',
                ease: 'slow(0.7,0.7,0.7,0.7, false)',
            },
            1
        )
        this.gsap.from(
            '.shots-area-cover',
            {
                delay: 1,
                opacity: 0,
                duration: 1,
                y: '100%',
                ease: 'slow(0.7,0.7,0.7,0.7, false)',
            },
            1
        )
        this.gsap.to('.shots-circle', {
            delay: 0,
            rotation: 360,
            duration: 6,
            repeat: -1,
            yoyo: true,
            repeatRefresh: true,
            ease: 'slow(0.7,0.7,0.7,0.7, false)',
        })
    },
    data() {
        return {
            title: 'type your title',
            strDataURI: '',
        }
    },
    name: 'Home',
    methods: {
        openInput() {
            this.$refs.typeTitle.style.display = 'block'
        },
        closeInput() {
            this.$refs.typeTitle.style.display = 'none'
        },
        uploadImgHandler(e) {
            let _this = this
            let input = e.target
            if (input.files && input.files[0]) {
                var reader = new FileReader()
                //轉成base64
                reader.readAsDataURL(input.files[0])
                reader.onload = function(e) {
                    _this.$refs.img.src = e.target.result
                    _this.$refs.img.style.display = 'block'
                }
            }
        },
        shotHandler() {
            let _this = this
            html2canvas(_this.$refs.shotArea).then(function(canvas) {
                var a = document.createElement('a')
                //canvas轉base64
                a.href = canvas
                    .toDataURL('image/jpeg')
                    .replace('image/jpeg', 'image/octet-stream')
                a.download = 'image.jpg'
                a.click()
            })
        },
    },
}
</script>
