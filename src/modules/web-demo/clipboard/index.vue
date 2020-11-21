<template>
    <p class="header-tip">
        本页面是<a
            href="https://zhuqingguang.github.io/2020/11/20/web-clipboard-api/"
            target="_blank"
        >Clipboard API 深入浅出</a>的 Demo 页面
    </p>
    <div class="flex">
        <example title="获取文本">
            <button @click="getClipboardText">
                获取剪切板文本
            </button>
            <p>当前剪贴板的文字为: {{ clipboardText }}</p>
            <template #summary>
                通过 <pre>clipboard.readText()</pre> 获取文本内容
            </template>
        </example>
        <example title="获取多种类型的内容">
            <button @click="getClipboardData">
                获取剪切板MIME类型的内容
            </button>
            <p>当前剪贴板的内容如下: </p>
            <div
                v-for="(item, index) of clipboardData.clipboardItemList"
                :key="index"
            >
                当前 {{ index + 1 }} 个
                <div
                    v-for="type of item"
                    :key="type.type"
                    class="type-wrap"
                >
                    <strong>{{ type.type }}:</strong><br>
                    <p v-if="type.type.includes('text/')">
                        {{ type.data }}
                    </p>
                    <img
                        v-else
                        class="img"
                        :src="type.data"
                        alt=""
                    >
                </div>
            </div>
            <template #summary>
                通过 <code>clipboard.read()</code> 获取多种类型的内容
            </template>
        </example>
        <example title="往剪切板写入文本">
            <button @click="writeText">
                往剪切板写入文本
            </button>
            <textarea
                id="text"
                class="textarea"
                name="text"
                cols="100"
                rows="5"
                resize
            />
            <template #summary>
                通过 <code>clipboard.writeText()</code> 写入文本内容
            </template>
        </example>
        <example title="往剪切板写入MIME类型的内容">
            <button @click="write">
                往剪切板写入多种类型
            </button>
            <input
                id="file-upload"
                ref="fileUpload"
                type="file"
                name="file"
                @change="onFileUpload"
            >
            <div
                contenteditable="true"
                class="edit-div"
            />
            <template #summary>
                通过 <code>clipboard.write()</code> 写入MIME内容。先上传一张图片，然后点击按钮“往剪切板写入多种类型”，<br>
                然后在读取内容的示例中，点击“获取剪切板MIME类型的内容”,即可获取到新传入的图片。<br>
                在微信的聊天窗口中粘贴，就会发现图片能粘贴过去😉
            </template>
        </example>

        <example title="复制时更改剪切板内容">
            <div @copy="onCopy">
                选中并复制这一段话：床前明月光疑是地上霜
            </div>
            <label for="copy">
                粘贴到这里：<div
                    class="edit-div"
                    contenteditable="true"
                />
            </label>
            <template #summary>
                通过 <code>event.clipboardData.setData()</code> 在复制时更改剪切板的内容。<br>
                任意选中并复制一段文字，然后粘贴到上面的输入框，会发现文字已经被改变
            </template>
        </example>

        <example title="粘贴时获取剪切板内容, 并更改粘贴的内容">
            <label for="paste">
                把复制的内容粘贴到这里：<textarea
                    id="paste"
                    rows="5"
                    @paste="onPaste"
                />
            </label>
            <template #summary>
                通过 <code>event.clipboardData.getData()</code> 获取剪切板内容，并进行更改
            </template>
        </example>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
// import { getBlobAsDataUrl } from './utils'

export default defineComponent({
    name: 'Clipboard',
    components: {},
    emits: [],
    setup() {
        const clipboardText = ref('')
        const getClipboardText = () => {
            navigator.clipboard.readText().then(value => {
                clipboardText.value = value
            })
        }

        const clipboardData = reactive({ clipboardItemList: [] })
        const getClipboardData = () => {
            navigator.clipboard.read().then(async clipboardItems => {
                console.log(clipboardItems)
                // console.log(clipboardItems[0].types)
                // const blob = await clipboardItems[0].getType('text/html')
                // const text = await blob.text()
                // console.log(text)
                const promises = clipboardItems.map(async (item: ClipboardItem) => {
                    // 获取所有的 types 并获取对应的内容
                    const promises = item.types.map(async type => {
                        console.log('type of data: ', type)
                        const typeData = await item.getType(type)
                        let data = ''
                        if (/text/.test(type)) {
                            data = await typeData?.text?.()
                        } else if (/image/.test(type)) {
                            // 将图片内容读取为 DataUrl
                            // data = await getBlobAsDataUrl(typeData)
                            data = URL.createObjectURL(typeData)
                        }
                        console.log(`data of type ${type}`, data)
                        return {
                            type,
                            data,
                        }
                    })
                    const typeList = await Promise.all(promises)
                    console.log('typeList 类型', typeList.length)
                    return typeList
                })
                clipboardData.clipboardItemList = await Promise.all(promises)
                console.log(clipboardData.clipboardItemList)
            })
        }

        const writeText = () => {
            navigator.clipboard.writeText('这是往剪切板中写入的文本内容').then(() => {
                alert('写入成功, 可以往文本框里复制内容')
            })
        }

        const file = ref<File>(null)
        const onFileUpload = (e) => {
            console.log(e)
            file.value = e.target.files[0]
        }

        // 写入MIME类型的内容
        const write = () => {
            const textItem: ClipboardItem = new window.ClipboardItem({
                'text/plain': new Blob([ '剪切板的文案' ], { type: 'text/plain' }),
                'text/html': new Blob([ '<span style="color: #9cdcfe;">这是文案的html格式</span>' ], { type: 'text/html' }),
                'image/png': new Blob([ file.value ],{ type: 'image/png' }),
            })
            navigator.clipboard.write([ textItem ]).then(() => {
                alert('写入成功')
            })
        }

        const onCopy = e => {
            console.log(e.clipboardData)
            const selection = document.getSelection()
            e.clipboardData.setData('text/html', `你复制的内容已经被我更改了！<span style="color: #ff0000;">${selection}</span>`)
            e.preventDefault()
        }

        const onPaste = e => {
            // const items = [ ...e.clipboardData.items ]
            // const contentList = items.map((item, index) => {
            //     console.log('剪切板的内容 ' + index, item)
            //     const { type } = item
            //     if (type === 'image/png') {
            //         return URL.createObjectURL(item.getAsFile())
            //     }
            //     return ''
            // })
            const text = e.clipboardData.getData('text/plain')
            e.target.value = '这是代码手动更改后的内容:\n\n' + text
            e.preventDefault()
        }
        return {
            getClipboardText,
            clipboardText,

            clipboardData,
            getClipboardData,

            writeText,

            write,
            onFileUpload,

            onCopy,
            onPaste,
        }
    },
})
</script>
<style scoped lang="less">
.header-tip {
    font-size: 16px;
    font-weight: 500;
}
.textarea {
    width: 100%;
}
.img {
    width: 200px;
    object-fit: contain;
}
.type-wrap {
    border: 1px solid #d3d3d3;
    padding: 10px;
    margin-bottom: 15px;
}
.edit-div {
    min-height: 50px;
    border: 1px solid #e2e2e2;
    border-radius: 6px;
}
</style>
