
picker 插件 修改
calendar js 1900-2100 农历数据
1900,3,1-2100.12.31 阳历最大值

  packerDate({
    _min: [1900,3,1], //最小日期
    val: [2000,1,1],
    _max: [2100,12,31], // 最大日期
    el: 'packerDateId', // DOM ID
    /*  // 回调参数
    c:{
          leapMonth:0, // 闰月 月份 没有 为0 如果有 月份最大 13
          name:"农历",
          rawData: true, // true 表示 农历是选中值 阳历是 计算值 [防止计算错误 校验字段]
          value:[1910,10,9]
      },
      l:{
          name:"阳历",
          value:[1910,11,10]
      }
    }
    */
    callback: function (_d){
      console.log(_d);
    }
  });

