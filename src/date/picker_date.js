(function () {


    // 依赖插件 chinese-lunar.js  或 calendar.js
    // var lunar = window.Lunar;
    var lunar = window.calendar;
    // var lunar = require('./date/calendar.js');
    var _Lunar = {
      // 获取闰月
      leapMonth: lunar.leapMonth,
      // 获取天数
      // lunarMonthDays: lunar.lunarMonthDays, // chinese-lunar.js
      lunarMonthDays: lunar.monthDays, // calendar.js 农历
      // lunarMonthDays2: lunar.solarDays, // calendar.js  阳历
      // 农历转阳历
      // toSolar: lunar.toSolar, // chinese-lunar.js
      // calendar.js
      toSolar: function (y,m,d){
        var _m = this.leapMonth(y);
        var isLeapMonth = false; // 是否闰月
        if(_m+1 == m){
            isLeapMonth = true;
        }
        if(_m && m > _m){
          --m;
        }
        var _d = lunar.lunar2solar(y,m,d,isLeapMonth);
          return [_d.cYear,_d.cMonth,_d.cDay];
      },
      // 阳历转农历
      // toLunar: lunar.toLunar, // chinese-lunar.js
      // calendar.js
      toLunar: function (y,m,d){
        var _d = lunar.solar2lunar(y,m,d);

        var _cm;
        var _m = this.leapMonth(_d.lYear);
        if(_m && ((_d.lMonth > _m) || _d.isLeap)){
            _cm = _d.lMonth + 1;
        }else{
          _cm = _d.lMonth;
        }
        return [_d.lYear,_cm,_d.lDay];
      },
    };
    var pickerDate = function (opt){
        var _opt = {
          _min: opt._min || [1900,1,31],
          _max: opt._max || [1909,11,11],
          el: opt.el || 'packerDateId',
          submit: opt.callback || null
        };

        var _min = _opt._min; // 最小日期
        // 农历
        var _min2 = _Lunar.toLunar(_opt._min[0],_opt._min[1],_opt._min[2]);
        var _max = _opt._max; // 最大日期
        // 农历
        var _max2 = _Lunar.toLunar(_opt._max[0],_opt._max[1],_opt._max[2]);
        var el = _opt.el;


        // 是否农历
        var isLunarDate = 0;
        // 年
        var data1 = [
          {
            text: '1900',
            value: 1900
          }, {
            text: '1901',
            value: 1901
          }
        ];
        // 月
        var data2 = [
          {
            text: '1',
            value: 1
          },
          {
            text: '2',
            value: 2
          }
        ];
        // 日
        var data3 = [
          {
            text: '1',
            value: 1
          }, {
            text: '2',
            value: 2
          },
          {
            text: '3',
            value: 3
          }
        ];

        // 阳历数据 年月日
        var _D = {
            fn_Y: function () {
              var data = [];
              var __obj = {},j;
              var _Y2 = _max[0];
              var _Y1 = _min[0] - 1;
              for (var i = _Y1; i < _Y2; i++) {
                j = i + 1;
                __obj = {
                  text: ''+j+'年',
                  value: j
                };
                data.push(__obj);
              }
              return data;
            },
            fn_M: function (_Y) {
              var _i = 0,_M = 12;
              if(picker){
                  if(_Y == _max[0]){
                    _M = _max[1];
                  }
                  if(_Y == _min[0]){
                    _i = _min[1]-1;
                  }
              }else{
                _i = _min[1]-1;
              }

              var data = [];
              var __obj = {},j;
              for (var i = _i; i < _M; i++) {
                j = i + 1;
                __obj = {
                  text: ''+j+'月',
                  value: j
                };
                data.push(__obj);
              }
              return data;
            },
            fn_D: function (_Y,_M) {
              var _D = this.fn_maxD(_Y,_M);
              var _i =  0;
              if(picker){
                  if(_Y == _max[0] && _M == _max[1]){
                    _D = _max[2];
                  }
                  if(_Y == _min[0] && _M == _min[1]){
                    _i = _min[2]-1;
                  }
              }else{
                 _i = _min[2]-1;
              }
              data = [];
              var __obj = {},j;
              for (var i = _i; i < _D; i++) {
                j = i + 1;
                __obj = {
                  text: ''+j+'日',
                  value: j
                };
                data.push(__obj);
              }
              return data;
            },
            fn_maxD: function (_Y,_M) {
                if (_M == '01' || _M == '03' || _M == '05' || _M == '07' || _M == '08' || _M == '10' || _M == '12') {
                    return 31;
                }
                else if (_M == '04' || _M == '06' || _M == '09' || _M == '11') {
                    return 30;
                } else if (_M == '02' ){
                    var cond1 = _Y % 4 == 0;  //条件1：年份必须要能被4整除
                    var cond2 = _Y % 100 != 0;  //条件2：年份不能是整百数
                    var cond3 = _Y % 400 == 0;  //条件3：年份是400的倍数
                    //当条件1和条件2同时成立时，就肯定是闰年，所以条件1和条件2之间为“与”的关系。
                    //如果条件1和条件2不能同时成立，但如果条件3能成立，则仍然是闰年。所以条件3与前2项为“或”的关系。
                    //所以得出判断闰年的表达式：
                    var cond = cond1 && cond2 || cond3;
                    if (cond) {
                        return 29;
                    } else {
                        return 28;
                    }
                }
            }
        };
        // 农历数据 年月日
        var _D2 = {
            fn_Y: function () {
              var data = [];
              var __obj = {},j;
              var _Y2 = _max2[0];
              var _Y1 = _min2[0] - 1;
              for (var i = _Y1; i < _Y2; i++) {
                j = i + 1;
                __obj = {
                  text: ''+j+'年',
                  value: j
                };
                data.push(__obj);
              }
              return data;
            },
            fn_M: function (_Y) {
              var _i = 0,_M = 12;
              if(picker){
                  if(_Y == _max[0]){
                    _M = _max[1];
                  }
                  if(_Y == _min[0]){
                    _i = _min[1]-1;
                  }
              }else{
                _i = _min[1]-1;
              }
              // 获取闰月
              var _is = _Lunar.leapMonth(_Y);

              var data = [];
              var __obj = {},j = _i;
              for (var i = _i; i < _M; i++) {
                j = j + 1;
                __obj = {
                  text: ''+j+'月',
                  value: j
                };
                data.push(__obj);
                if(_is && j == _is){
                    j++;
                    __obj = {
                        text: '闰'+'月',
                        value: j
                    };
                    data.push(__obj);
                }
              }
              return data;
            },
            fn_D: function (_Y,_M) {
              var _D = this.fn_maxD(_Y,_M);
              var _i =  0;
              if(picker){
                  if(_Y == _max[0] && _M == _max[1]){
                    _D = _max[2];
                  }
                  if(_Y == _min[0] && _M == _min[1]){
                    _i = _min[2]-1;
                  }
              }else{
                 _i = _min[2]-1;
              }
              var _day = ['初一','初二','初三','初四','初五','初六','初七','初八','初九','初十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','二一','二二','二三','二四','二五','二六','二七','二八','二九','三十'];
              data = [];
              var __obj = {},j;
              for (var i = _i; i < _D; i++) {
                j = i + 1;
                __obj = {
                  text: _day[i],
                  value: j
                };
                data.push(__obj);
              }
              return data;
            },
            fn_maxD: function (_Y,_M) {
                var leap;
                // 获取闰月
                var _is = _Lunar.leapMonth(_Y);
                if(_is && _M > _is){
                    --_M;
                }
                // 获取天数
                return _Lunar.lunarMonthDays(_Y,_M);
            }
        };

        // 重新生成数据
        function update_Date(fn){

            data1 = isLunarDate ? _D2.fn_Y() : _D.fn_Y();
            data2 = isLunarDate ? _D2.fn_M(_min2[0]) : _D.fn_M(_min[0]);
            data3 = isLunarDate ? _D2.fn_D(_min2[0],_min2[1]) : _D.fn_D(_min[0],_min[1]);

            if(picker){
                picker.refillColumn(0, data1);
                picker.refillColumn(1, data2);
                picker.refillColumn(2, data3);
            }
            if(fn){
              fn();
            }
        }
        update_Date();

        var picker = new Picker({
          data: [data1, data2, data3],
          selectedIndex: [0, 0, 0],
          title: '选择日期'
        });

        var _el = document.getElementById(_opt.el);
        _el.addEventListener('click', function () {
          picker.show();
        });

        var selectedVal = _min;
        // 获取选中val 值
        function get_selectedVal(selectedI,str){
          var _data = JSON.parse(str);
            var _v = [];
            _v[0] = _data[0][selectedI[0]].value;
            _v[1] = _data[1][selectedI[1]].value;
            _v[2] = _data[2][selectedI[2]].value;

            return _v;
        }
        // 滑动列数据触发
        function fn_change(_this) {
            // 获取选中val 值
            var str = JSON.stringify(_this.data);
            var _selectedVal = get_selectedVal(_this.selectedIndex,str);

            // 选中年份
            if(selectedVal[0] != _selectedVal[0]){
              var _data2 = isLunarDate ? _D2.fn_M(_selectedVal[0]) : _D.fn_M(_selectedVal[0]);
              // 替换列数据
              picker.refillColumn(1, _data2);
              picker.scrollColumn(1, 0);

              var _data3 = isLunarDate ? _D2.fn_D(_selectedVal[0],_selectedVal[1]) : _D.fn_D(_selectedVal[0],_selectedVal[1]);
              // 替换列数据
              picker.refillColumn(2, _data3);
              picker.scrollColumn(2, 0);
            }else if(selectedVal[1] != _selectedVal[1]){
                var _data3 = isLunarDate ? _D2.fn_D(_selectedVal[0],_selectedVal[1]) : _D.fn_D(_selectedVal[0],_selectedVal[1]);
                // 替换列数据
                picker.refillColumn(2, _data3);
                picker.scrollColumn(2, 0);
            }

            selectedVal = _selectedVal;
        }
        // 点击阳历 农历切换 触发
        function fn_change2(_this,fn) {
            // 获取选中val 值
            var str = JSON.stringify(_this.data);
            var _selectedVal = get_selectedVal(_this.selectedIndex,str);
            // 更新数据
            update_Date(fn);

        }
        // 选中val 值 isLunar 是否农历 默认否
        function fn_setPickerVal(_arr,isLunar){
          var _selectedVal;
          var _data = picker.data;
          for (var i = 0; i < _data[0].length; i++) {
            var e1 = _data[0][i];
            if(e1.value == _arr[0]){
              picker.scrollColumn(0,i);
              picker.selectedIndex[0] =i;
              var str = JSON.stringify(picker.data);
              _selectedVal = get_selectedVal(picker.selectedIndex,str);
              var _data2 = isLunarDate ? _D2.fn_M(_selectedVal[0]) : _D.fn_M(_selectedVal[0]);
              // 替换列数据
              picker.refillColumn(1, _data2);
              set_M();
            }
          }
          function set_M(){
              var _data = picker.data;
              for (var j = 0; j < _data[1].length; j++) {
                var e2 = _data[1][j];
                if(e2.value == _arr[1]){
                  picker.scrollColumn(1,j);
                  picker.selectedIndex[1] = j;
                  var str = JSON.stringify(picker.data);
                  _selectedVal = get_selectedVal(picker.selectedIndex,str);
                  var _data3 = isLunarDate ? _D2.fn_D(_selectedVal[0],_selectedVal[1]) : _D.fn_D(_selectedVal[0],_selectedVal[1]);
                  // 替换列数据
                  picker.refillColumn(2, _data3);
                  set_D();
                }
              }
          }
          function set_D(){
              var _data = picker.data;
              for (var k = 0; k < _data[2].length; k++) {
                var e3 = _data[2][k];
                if(e3.value == _arr[2]){
                  picker.scrollColumn(2,k);
                  picker.selectedIndex[2] = k;
                }
              }
          }
        }
        picker.on('picker.change',function () {
            fn_change(this);
        });
        // 点击农历 阳历 切换按钮触发
        picker.on('picker.cancel',function () {
          // 获取选中val 值
          var str = JSON.stringify(this.data);
          var _selectedVal = get_selectedVal(this.selectedIndex,str);
          var __d;
          if(isLunarDate){
            // 农历转 阳历
            __d = _Lunar.toSolar(_selectedVal[0],_selectedVal[1],_selectedVal[2]);
            // 选中值
            // fn_setPickerVal(__d,true);
          }else{
            // 阳历 转农历
            __d = _Lunar.toLunar(_selectedVal[0],_selectedVal[1],_selectedVal[2]);
            // 选中值
            // fn_setPickerVal(__d);
          }

          isLunarDate = !isLunarDate;
          if(isLunarDate){
            this.cancelEl.innerHTML = '选择阳历';
          }else{
            this.cancelEl.innerHTML = '选择农历';
          }
          // 更新列
          fn_change2(this,function(){
            fn_setPickerVal(__d,isLunarDate);
          });
          return false;
        });
        // 点击确定时触发
        picker.on('picker.valuechange',function () {

            var _d = {};
            var __;

            if(isLunarDate){
              // 农历
              _d.c = {
                name: '农历',
                rawData: true,
                value: this.selectedVal,
                leapMonth:  _Lunar.leapMonth(this.selectedVal[0])
              };
              __ = _Lunar.toSolar(this.selectedVal[0],this.selectedVal[1],this.selectedVal[2]);
              _d.l = {
                name: '阳历',
                value: __
              };
            }else{
              // 阳历
              __ = _Lunar.toLunar(this.selectedVal[0],this.selectedVal[1],this.selectedVal[2]);
              _d.c = {
                name: '农历',
                value: __,
                leapMonth: _Lunar.leapMonth(__[0])
              };
              _d.l = {
                name: '阳历',
                rawData: true,
                value: this.selectedVal
              };
            }
            _opt.submit && _opt.submit(_d);
        });


        return picker;
    }
    window.pickerDate = pickerDate;

})();
