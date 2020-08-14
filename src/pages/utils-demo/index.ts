import { formatTime, useStorage, getRandomColor } from "../../utils/util"
const colorList = [
    '#e54d42',
    '#f37b1d',
    '#fbbd08',
    '#8dc63f',
    '#1cbbb4',
    '#0081ff',
    '#6739b6',
]
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
            // formatTime
            const timestamp = new Date(),
                formatList = [
                    'YYYY-MM-DD hh:mm:ss',
                    'YY年MM月DD日 hh时mm分ss秒',
                    'MM/DD hh:mm',
                    'hh:mm DD/MM/YYYY',
                ]
            const timeStringList = formatList.map(f => formatTime(timestamp, f))
            this.setData({ timeStringList })

            // useStorage
            // usage1
            const colors = useStorage(this.data, {
                key: 'colors',
                propertyName: 'colorList',
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

        },
        onColorTap(e: any) {
            const index = parseInt(e.mark.index)
            ;(this as any).selectedIndex = index // 自动执行56行注册的回调函数，故不用setData
        },
        deleteColor(e: any) {
            const index = parseInt(e.mark.index)
            this.data.colorList?.splice(index, 1)
            ;(this as any).selectedIndex = -1
            this.setData({
                colorList: this.data.colorList,
            })
        },
        recover() {
            (this as any).selectedIndex = -1
            this.setData({
                colorList: [...colorList]
            })
        },
        addRandom() {
            const color = getRandomColor()
            console.log(color)
            this.data.colorList?.push(color)
                && this.setData({ colorList: this.data.colorList })
        },
    }
})
