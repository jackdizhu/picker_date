(function () {
    // 依赖插件 chinese-lunar.js  或 calendar.js
    // var lunar = window.Lunar;
    var lunar = window.calendar;
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
    var packerDate = function (opt){
        var _o = {
          _min: opt._min || [1900,1,31],
          _max: opt._max || [1909,11,11],
          el: opt.el || 'packerDateId',
          submit: opt.callback || null
        };

        var _min = _o._min; // 最小日期
        var _min2 = _Lunar.toLunar(_o._min[0],_o._min[1],_o._min[2]);
        var _max = _o._max; // 最大日期
        var _max2 = _Lunar.toLunar(_o._max[0],_o._max[1],_o._max[2]);
        var el = _o.el;

        var _Y1 = _min[0] - 1;
        var _Y2 = _max[0];
        
        // 阳历数据 年月日
        var _D = {
            fn_Y: function (_Y1,_Y2) {
              var data = [];
              var __obj = {},j;
              if(_Y2 > _max[0]){
                _Y2 = _max[0];
              }
              if(_Y1 < _min[0]){
                _Y1 = _min[0];
              }
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
            fn_M: function (_M) {
              var _i = 0;
              if(picker){
                  if(picker.selectedIndex[0]+_Y1+1 == _max[0]){
                    _M = (_M > _max[1]) ? _max[1] : _M;
                  }
                  if(picker.selectedIndex[0]+_Y1+1 == _min[0]){
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
            fn_D: function (_D) {
              var _i =  0;
              if(picker){
                  if(picker.selectedIndex[0]+_Y1+1 == _max[0] && picker.selectedIndex[1]+1 == _max[1]){
                    _D = (_D > _max[2]) ? _max[2] : _D;
                  }
                  if(picker.selectedIndex[0]+_Y1+1 == _min[0] && picker.selectedIndex[1]+1 == _min[1]){
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
            fn_Y: function (_Y1,_Y2) {
                var data = [];
                var __obj = {},j;
                if(_Y2 > _max2[0]){
                  _Y2 = _max2[0];
                }
                if(_Y1 < _min2[0]){
                  _Y1 = _min2[0];
                }
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
            fn_M: function (_M,_Y2) {
                var _i = 0;
                if(picker){
                    if(picker && picker.selectedIndex[0]+_Y1+1 == _max2[0]){
                      _M = (_M > _max2[1]) ? _max2[1] : _M;
                    }
                    if(picker && picker.selectedIndex[0]+_Y1+1 == _min2[0]){
                      _i = _min2[1]-1;
                    }
                }else{
                  _i = _min2[1]-1;
                }
                
                var r = 0;
                if(_Y2){
                  // 获取闰月
                  var _is = _Lunar.leapMonth(_Y2);
                  if(_is){
                      r = _is;
                  }
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
                if(r && j == r){
                    __obj = {
                        text: '闰'+'月',
                        value: j
                    };
                    data.push(__obj);
                }
                }
                return data;
            },
            fn_D: function (_D) {
                var _i = 0;
                if(picker){
                    if(picker.selectedIndex[0]+_Y1+1 >= _max2[0] && picker.selectedIndex[1]+1 >= _max2[1]){
                      _D = (_D > _max2[2]) ? _max2[2] : _D;
                    }
                    if(picker.selectedIndex[0]+_Y1+1 == _min2[0] && picker.selectedIndex[1]+1 == _min2[1]){
                      _i = _min2[2]-1;
                    }
                }else{
                  _i = _min2[2]-1;
                }
                
                var _day = ['初一','初二','初三','初四','初五','初六','初七','初八','初九','初十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','二一','二二','二三','二四','二五','二六','二七','二八','二九','三十'];
                if(!_D){
                return [];
                }
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

        // 是否农历
        var isLunarDate = 0;
        // 年
        var data1 = [
          {
            text: '1998',
            value: 1998
          }, {
            text: '1999',
            value: 1999
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


        if(!isLunarDate){
            // 阳历
            data1 = _D.fn_Y(_Y1,_Y2);
            data2 = _D.fn_M(12);
            data3 = _D.fn_D(31);
        }else{
            // 农历
            data1 = _D2.fn_Y(_Y1,_Y2);
            data2 = _D2.fn_M(12,_Y1+1);
            data3 = _D2.fn_D(_D2.fn_maxD(_Y1+1,1));
        }

        var picker = new Picker({
          data: [data1, data2, data3],
          selectedIndex: [0, 0, 0],
          title: '选择日期'
        });

        var _el = document.getElementById(el);
        _el.addEventListener('click', function () {
          picker.show();
        });

        // 切换 农历阳历 后需要选中的数据
        var _check = [];

        var selectedIndex = [_Y1+1,1,1];
        // 滑动列数据触发
        function fn_change(_obj) {
            var _this = _obj;
            // 中间变量 保存选中日期
            var _selectedIndex = [];
            _selectedIndex[0] = _Y1 + 1 + _this.selectedIndex[0];
            _selectedIndex[1] = _this.selectedIndex[1] + 1;
            _selectedIndex[2] = _this.selectedIndex[2] + 1;
            if(selectedIndex[0] != _selectedIndex[0]){
              var _data2 = isLunarDate ? _D2.fn_M(12,_selectedIndex[0]) : _D.fn_M(12);
              // 替换列数据
              picker.refillColumn(1, _data2);
              picker.scrollColumn(1, 0);
            }
            if(selectedIndex[1] != _selectedIndex[1]){
              var _data3 = isLunarDate ? _D2.fn_D(_D2.fn_maxD(_selectedIndex[0],_selectedIndex[1])) : _D.fn_D(_D.fn_maxD(_selectedIndex[0],_selectedIndex[1]));
              // 替换列数据
              picker.refillColumn(2, _data3);
              picker.scrollColumn(2, 0);
            }
            // 更新选中值变量
            selectedIndex = _selectedIndex;
        }
        // 点击阳历 农历切换 触发
        function fn_change2(_obj) {
            var _this = _obj;
            var _data2 = isLunarDate ? _D2.fn_M(12,_check[0]) : _D.fn_M(12);
            _this.selectedIndex[0] = _check[0]-1-_Y1;
            // 替换列数据
            picker.refillColumn(1, _data2);
            if(_check[0] >= _max[0] && _check[1] >= _max[1]){
              _this.selectedIndex[1] = _max[1]-1;
              picker.scrollColumn(1, _max[1]-1);
            }else{
              picker.scrollColumn(1, _check[1]-1);
              _this.selectedIndex[1] = _check[1]-1;
            }

            var _data3 = isLunarDate ? _D2.fn_D(_D2.fn_maxD(_check[0],_check[1])) : _D.fn_D(_D.fn_maxD(_check[0],_check[1]));
            // 替换列数据
            picker.refillColumn(2, _data3);
            if(_check[0] >= _max[0] && _check[1] >= _max[1] && _check[2] >= _max[2]){
              picker.scrollColumn(2, _max[2]-1);
              _this.selectedIndex[2] = _max[2]-1;
            }else{
              picker.scrollColumn(2, _check[2]-1);
              _this.selectedIndex[2] = _check[2]-1;
            }
            // 更新选中值变量
            selectedIndex = _check;
        }
        picker.on('picker.change',function () {
            fn_change(this);
        });
        // 点击确定时触发
        picker.on('picker.valuechange',function () {
            var _selectedIndex = [];
            _selectedIndex[0] = _Y1 + 1 + this.selectedIndex[0];
            _selectedIndex[1] = this.selectedIndex[1] + 1;
            _selectedIndex[2] = this.selectedIndex[2] + 1;

            var _d = {};
            var __;
            if(isLunarDate){
              _d.c = {
                name: '农历',
                value: _selectedIndex,
                leapMonth:  _Lunar.leapMonth(_selectedIndex[0])
              };
              __ = _Lunar.toSolar(selectedIndex[0],_selectedIndex[1],_selectedIndex[2]);
              _d.l = {
                name: '阳历',
                value: __
              };
            }else{
              __ = _Lunar.toLunar(selectedIndex[0],_selectedIndex[1],_selectedIndex[2]);
              _d.c = {
                name: '农历',
                value: __,
                leapMonth: _Lunar.leapMonth(__[0])
              };
              _d.l = {
                name: '阳历',
                value: _selectedIndex
              };
            }
            _o.submit && _o.submit(_d);
        });
        // 点击农历 阳历 切换按钮触发
        picker.on('picker.cancel',function () {
          var _selectedIndex = [];
            _selectedIndex[0] = _Y1 + 1 + this.selectedIndex[0];
            _selectedIndex[1] = this.selectedIndex[1] + 1;
            _selectedIndex[2] = this.selectedIndex[2] + 1;
            var __d;
          if(isLunarDate){
            // 农历转 阳历
            __d = _Lunar.toSolar(_selectedIndex[0],_selectedIndex[1],_selectedIndex[2]);
          }else{
            // 阳历 转农历
            __d = _Lunar.toLunar(_selectedIndex[0],_selectedIndex[1],_selectedIndex[2]);
          }
          console.log(this.selectedIndex);
          console.log(_selectedIndex);
          // 要选中的 日期
          _check[0] = __d[0];
          _check[1] = __d[1];
          _check[2] = __d[2];

          isLunarDate = !isLunarDate;

          if(isLunarDate){
            this.cancelEl.innerHTML = '选择阳历';
          }else{
            this.cancelEl.innerHTML = '选择农历';
          }

          if(!isLunarDate){
              // 阳历
              data1 = _D.fn_Y(_Y1,_Y2);
              data2 = _D.fn_M(12);
              data3 = _D.fn_D(31);
          }else{
              // 农历
              data1 = _D2.fn_Y(_Y1,_Y2);
              data2 = _D2.fn_M(12,_Y1+1);
              data3 = _D2.fn_D(_D2.fn_maxD(_Y1+1,1));
          }

          picker.refillColumn(0, data1);
          picker.refillColumn(1, data2);
          picker.refillColumn(2, data3);

          if(_check[0] >= _Y2){
            // this.selectedIndex[0] = _Y2-_Y1-1;
            picker.scrollColumn(0, _Y2-_Y1-1);
          }else if(_check[0] <= _Y1){
            picker.scrollColumn(0, 0);
            // this.selectedIndex[0] = 0;
          }else{
            picker.scrollColumn(0, _check[0]-_Y1-1);
            // this.selectedIndex[0] = _check[0]-_Y1-1;
          }
          // 更新列
          fn_change2(this);

          return false;

        });

        return picker;
    }
    window.packerDate = packerDate;
})();

packerDate({
  _min: [1900,2,2],
  _max: [1909,11,11],
  el: 'packerDateId',
  callback: function (_d){
    console.log(_d);
  }
});
packerDate({
  _min: [1901,1,1],
  _max: [1910,11,10],
  el: 'packerDateId2',
  callback: function (_d){
    console.log(_d);
  }
});
