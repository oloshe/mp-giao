import { formatTime, useStorage, getRandomColor, createInnerAudioContext } from "../../utils/util"
// 默认颜色
const colorList = ['#E54D42','#F37B1D','#FBBD08', '#8DC63F','#1CBBB4']
Object.freeze(colorList)


export { }

interface IData {
    timeStringList: string[]
    colorList?: string[]
    selectedIndex?: number,
}

interface IMethod extends WechatMiniprogram.Component.MethodOption {

}

Component<IData, {}, IMethod>({

    behaviors: [],

    data: {
        timeStringList: [],
        colorList: [],
    },

    methods: {
        onLoad() {
            // formatTime 格式化事件
            const timestamp = new Date(),
                formatList = [
                    'YYYY-MM-DD hh:mm:ss',
                    'YY年MM月DD日 hh时mm分ss秒',
                    'MM/DD hh:mm',
                    'hh:mm DD/MM/YYYY',
                ]
            const timeStringList = formatList.map(f => formatTime(timestamp, f))
            this.setData({ timeStringList })

            // useStorage 使用本地存储
            // usage1
            const colors = useStorage(this.data, {
                key: 'colors',
                propKey: 'colorList',
                defaultValue: [...colorList],
            })
            // usage2
            const selectedIndex = useStorage(this, {
                key: 'selectedIndex',
                defaultValue: -1,
            }, index => {
                this.setData({
                    selectedIndex: index
                })
            })
            this.setData({ colorList: colors, selectedIndex })

            // createInnerAudioContext 创建音频
            ;(this as any).sound1 = createInnerAudioContext({
                src: '/asset/1gwlgg.wav',
                onPlay: () => {
                    console.log('一giao我哩giao giao')
                    this.setData({
                        sound1_on: true,
                    })
                },
                onEnded: () => {
                    console.log('giao完了')
                    this.setData({
                        sound1_on: false,
                    })
                },
                onTimeUpdate: () => {
                    const progress = (this as any).sound1.currentTime / (this as any).sound1.duration * 100
                    console.log(progress)
                }
            })
            ;(this as any).sound2 = createInnerAudioContext({
                src: '/asset/huhuo.wav',
                onPlay: () => {
                    console.log('唬嚯')
                    this.setData({
                        sound2_on: true,
                    })
                },
                onEnded: () => {
                    this.setData({
                        sound2_on: false,
                    })
                },
            })
            ;(this as any).sound3 = createInnerAudioContext({
                src: '/asset/yahu.wav',
                onPlay: () => {
                    console.log('呀呼')
                    this.setData({
                        sound3_on: true,
                    })
                },
                onEnded: () => {
                    this.setData({
                        sound3_on: false,
                    })
                },
            })
        },
        onUnload(){
            
        },
        onPlaySound(e: any){
            const {target} = e.currentTarget.dataset
            ;(this[target] as any)?.play()
        },
        /** 色块触摸事件 */
        onColorTap(e: any) {
            const index = parseInt(e.mark.index)
            if ((this as any).selectedIndex === index) {
                this.onColorDelete(e)
            } else {
                (this as any).selectedIndex = index // 自动执行usage2注册的回调函数，故不用setData
            }
        },
        /** 删除颜色 */
        onColorDelete(e: any) {
            const index = parseInt(e.mark.index)
            this.data.colorList?.splice(index, 1)
                ; (this as any).selectedIndex = -1
            this.setData({
                colorList: this.data.colorList,
            })
        },
        /** 恢复颜色 */
        onColorRecover() {
            (this as any).selectedIndex = -1
            this.setData({
                colorList: [...colorList]
            })
            wx.showToast({ title: '已恢复默认' })
        },
        /** 添加随机颜色 */
        addRandomColor() {
            const color = getRandomColor().toUpperCase()
            console.log(color)
            this.data.colorList?.push(color)
                && this.setData({ 
                    colorList: this.data.colorList, 
                    colorView: `color-${this.data.colorList.length - 1}` 
                })
        },
    }
})
