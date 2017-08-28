
picker 插件 修改 
calendar js 1900-2100 农历数据  1901.2.1-2100-12.31 阳历最大值


packerDate({
  _min: [1901,1,1], //最小日期
  _max: [1911,11,11], // 最大日期
  el: 'packerDateId', // DOM ID
  
  /*  // 回调参数
  c:{
        leapMonth:0, // 闰月 月份 没有 为0 如果有 月份最大 13
        name:"农历"
        value:[1910,10,9]
    },
    l:{
        name:"阳历"
        value:[1910,11,10]
    }
  }
  */
  
  callback: function (_d){
    console.log(_d);
  }
});
