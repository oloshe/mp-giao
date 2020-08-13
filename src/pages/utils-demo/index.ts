import { formatTime, useStorage } from "../../utils/util"
const colorList = [
    '#e54d42',
    '#f37b1d',
    '#fbbd08',
    '#8dc63f',
    '#1cbbb4',
    '#0081ff',
    '#6739b6',
    '#9c26b0',
    '#e03997',
    '#a5673f',
    '#8799a3',
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
            useStorage(this.data, {
                key: 'colors',
                propertyName: 'colorList',
                defaultValue: colorList,
            })
                .then(res => this.setData({ colorList: res }))

        },
        onColorTap(e: any) {
            const index = parseInt(e.mark.index)
            this.setData({
                selectedIndex: index,
            })
        },
        deleteColor(e: any) {
            const index = parseInt(e.mark.index)
            this.data.colorList?.splice(index, 1)
            this.setData({
                colorList: this.data.colorList,
                selectedIndex: -1,
            })
        }
    }
})
