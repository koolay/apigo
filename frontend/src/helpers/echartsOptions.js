/**
 *  type 类型 { string }
 *  options 数据 { object }
 *  如下： 
 *  ｛
 *    lengendData: [],
 *    xAxisData:[],
 *    yAxisData:[],
 *    series:{
 *      statck: ''
 *      data: [array,array]
 *    }
 *  ｝
 * 
 */
export default function echartsOptions(type, options) {

  options = options || {
    lengendData: [],
    xAxisData:[],
    yAxisData:[],
    series:{
      data: []
    }
  }
  switch(type.toLowerCase()){
    case 'xcloumn': return getXCloumnGraphOptions(options); break;
    case 'ycloumn': return getYCloumnGraphOptions(options); break;
  }
}

/**
 * 纵向柱图
 * @param   options 
 * @return 返回配置
 */
function getXCloumnGraphOptions(options) {

    let xseriesTpl = {
        name: '男',
        type: 'bar', //柱图
        stack: '性别', //同一个stack会将数据显示在一个柱上
        data: [10, 82, 60, 30, 55, 75],
        label: {
            normal: {
                show: true,
                formatter: (params) => {
                    return Number(params.value) > 2000/332 ? params.value + "%" : ''   
                }
            }
        }
    }


    let series = []

    xseriesTpl.data = options.series ? options.series.data.forEach((item, index) => {
        
        let serie = Object.assign({}, xseriesTpl)
        serie.data = item.data
        serie.name = options.lengendData[index]
        if(item.data.length < 4){
            serie.barWidth = 60
        }
        series.push(serie)
    }) : []

    

    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: params => {
                let len = params.length
                let str = ''
                for (var i = 0; i < len; i++) {
                    str += "<div style='float:left; margin:6px 4px 0px 0px; background-color:" + params[i].color + ";border-radius: 100%;width: 10px;height: 10px; '></div>" +
                        "<div style='float:left'> " + params[i].seriesName + " : " + params[i].value + "%</div><br>"
                }
                return str;
            }
        },
        legend: {
            data: options.lengendData,
            top: 10, //距离顶部距离，默认是自适应,
            padding: [0, 5, 0, 5],
            itemWidth: 14, // 图例图形宽度
            itemHeight: 14,
            itemGap: 5,
            formatter: params => {
                if(params){
                    let newParam = []
                    params.split("").forEach((item, index) => {
                      if (index < 7) {
                        newParam.push(item)
                      } else if (index == 7) {
                        newParam.push("...")
                      }
                    })
                    return newParam.join("");
                }
            }
        },
        grid: {
            y2: 60
        },
        xAxis: [{
            type: 'category',
            data: options.xAxisData,
            //x轴网格设置
            splitLine: {
                show: true, //显示网格
                lineStyle: {
                    color: '#ccc' //网格颜色
                }
            },
            //x轴轴线设置
            axisLine: {
                show: false, //如果x轴存在网格就把x轴轴线隐藏，避免重叠
                lineStyle: {
                    color: '#ccc'
                }
            },

            //x轴刻度设置
            axisTick: {
                show: false, //显示刻度
            },

            //x轴值设置
            axisLabel: {
              show: true, //显示值
              textStyle: {
                  color: '#000' //字体颜色
              },
              interval: 0, //坐标轴刻度标签的显示间隔,默认会采用标签不重叠的策略间隔显示标签，可以设置成 0 强制显示所有标签。
              /*rotate:0,  //旋转*/
              //换行显示
              formatter: params => {
                if(params){
                  let newParam = []
                  params.split("").forEach((item, index) => {
                      if ((index + 1) % 3 == 0) {
                          newParam.push(item)
                          newParam.push("\n")
                      } else {
                          newParam.push(item)
                      }
                  })
                  return newParam.join("")
                }
              }
            }

        }],
        yAxis: [{
            type: 'value',
            min: 0,
            max: 100,

            splitNumber: 2, //y坐标轴的分割段数

            //y轴网格
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#ccc' //网格颜色
                }
            },

            //y轴轴线设置
            axisLine: {
                show: false, //如果y轴存在网格就把x轴轴线隐藏，避免重叠
                lineStyle: {
                    color: '#ccc'
                }
            },

            //y轴刻度设置
            axisTick: {
                show: false, //显示刻度
            },

            //y轴值设置
            axisLabel: {
                show: true, //显示值
                formatter: '{value}%',
                textStyle: {
                    color: '#000' //字体颜色
                }
            },

        }],
        series: series
    }
}
/**
 * 横向柱图
 * @param   options [description]
 * @return 返回配置
 */
function getYCloumnGraphOptions(options) {
   
    let series = []
    let alldata = []

    let cloumnNum = options.lengendData.length * options.yAxisData.length

    if(options.series){
        options.series.data.forEach((item, index) => {
            alldata.push(item)
        })
    }

    let maxArr = []
    alldata.forEach(arr => {
        if(Array.isArray(arr)){
            arr.forEach(item => {
               maxArr.push(Number(item)) 
            })
        }
    })
    // 排序
    maxArr.sort((a,b) => b - a)

    let ymax = 1 
    if(maxArr.length > 0){
        ymax = Math.ceil(maxArr[0] / 0.5) * 0.5 
    }

    let yseriesTpl = {
        name: '产业型客户',
        type: 'bar',
        label: {
            normal: {
                show: true,
                formatter: (params) => Number(params.value) / ymax > 0.1 ? params.value : ''
            }
        },
        data: [0.5, 0.7]
    }

    let dataColumn = 0

    if(options.series){
        options.series.data.forEach((item, index) => {
            let serie = Object.assign({}, yseriesTpl)
            serie.data = item
            serie.name = options.lengendData[index]
            if(cloumnNum < 5){
                serie.barWidth = 60
            }
            if(cloumnNum > 12){
               yseriesTpl.label.normal.show = false 
            }
            dataColumn += item.length
            series.push(serie)
        })   
    }

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: options.lengendData,
            top: 10, //距离顶部距离，默认是自适应,
            padding: [0, 5, 0, 5],
            itemWidth: 14, // 图例图形宽度
            itemHeight: 14,
            itemGap: 5,
            formatter: params => {
              if(params){
                let newParam = []
                params.split("").forEach((item, index) => {
                  if (index < 7) {
                    newParam.push(item)
                  } else if (index == 7) {
                    newParam.push("...")
                  }
                })
                return newParam.join("");
              }
            }
        },
        grid: {
            x: 80,
            y2: 60
        },
        
        xAxis: {
            type: 'value',
            min: 0,
            max: ymax,
            interval: 0.5,
            //x轴网格设置
            splitLine: {
                show: true, //显示网格
                lineStyle: {
                    color: '#ccc' //网格颜色
                }
            },
            
            //x轴轴线设置
            axisLine: {
                show: true, //如果x轴存在网格就把x轴轴线隐藏，避免重叠
                lineStyle: {
                    color: '#ccc'
                }
            },

            //x轴刻度设置
            axisTick: {
                show: false, //显示刻度
            },

            //x轴值设置
            axisLabel: {
                show: true, //显示值
                textStyle: {
                    color: '#000' //字体颜色
                }
            }

        },
        yAxis: {
            type: 'category',
            data: options.yAxisData,
            //y轴网格
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#ccc' //网格颜色
                }
            },
            //y轴轴线设置
            axisLine: {
                show: false, //如果y轴存在网格就把x轴轴线隐藏，避免重叠
                lineStyle: {
                    color: '#ccc'
                }
            },
            axisLabel: {
                textStyle:{
                    fontSize: 10
                },
                formatter: (params) => {
                    if(params){
                        let newParam = []
                        params.split("").forEach((item, index) => {
                          if (index < 7) {
                            newParam.push(item)
                          } else if (index == 7) {
                            newParam.push("...")
                          }
                        })
                        return newParam.join("");
                    }
                }
            },
            //y轴刻度设置
            axisTick: {
                show: false, //显示刻度
            }
        },
        series: series
    }

    return dataColumn === 0 ? Object.assign({isEmpty: true},{options : option}) : Object.assign({isEmpty: false},{options : option})
       
}
