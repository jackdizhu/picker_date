!function(){var e=window.calendar,t={leapMonth:e.leapMonth,lunarMonthDays:e.monthDays,toSolar:function(t,n,a){var l=this.leapMonth(t),r=!1;l&&l+1==n&&(r=!0),l&&n>l&&--n;var u=e.lunar2solar(t,n,a,r);return[u.cYear,u.cMonth,u.cDay]},toLunar:function(t,n,a){var l,r=e.solar2lunar(t,n,a),u=this.leapMonth(r.lYear);return l=u&&(r.lMonth>u||r.isLeap)?r.lMonth+1:r.lMonth,[r.lYear,l,r.lDay]}},n=function(e){function n(e){for(var t={},n=e||24,a=[],l=0;l<n;l++)t={text:l+"时",value:l},a.push(t);return a}function a(e){m=h?p.fn_Y():M.fn_Y(),x=h?p.fn_M(s[0]):M.fn_M(c[0]),_=h?p.fn_D(s[0],s[1]):M.fn_D(c[0],c[1]),g=n(),D&&(D.refillColumn(0,m),D.refillColumn(1,x),D.refillColumn(2,_),D.refillColumn(3,g)),e&&e()}function l(e,t){var n=JSON.parse(t),a=[];return a[0]=n[0][e[0]].value,a[1]=n[1][e[1]].value,a[2]=n[2][e[2]].value,a[3]=n[3][e[3]].value,a}function r(){var e=D,t=JSON.stringify(e.data),a=l(e.selectedIndex,t),r=24;h?a[0]==v[0]&&a[1]==v[1]&&a[2]==v[2]&&(r=d[3]+1):a[0]==d[0]&&a[1]==d[1]&&a[2]==d[2]&&(r=d[3]+1),g=n(r),D&&(D.refillColumn(3,g),a[3]>g.length-1&&D.scrollColumn(3,g.length-1),t=JSON.stringify(e.data),a=l(e.selectedIndex,t),I=a)}function u(e){var t=JSON.stringify(e.data),n=l(e.selectedIndex,t);if(I[0]!=n[0]){var a=h?p.fn_M(n[0]):M.fn_M(n[0]);D.refillColumn(1,a),n[1]>D.data[1].length&&(D.scrollColumn(1,D.data[1].length-1),D.selectedIndex[1]=D.data[1].length-1),t=JSON.stringify(D.data),n=l(e.selectedIndex,t);var u=h?p.fn_D(n[0],n[1]):M.fn_D(n[0],n[1]);D.refillColumn(2,u),n[2]>D.data[2].length&&(D.scrollColumn(2,D.data[2].length-1),D.selectedIndex[2]=D.data[2].length-1)}else if(I[1]!=n[1]){var u=h?p.fn_D(n[0],n[1]):M.fn_D(n[0],n[1]);D.refillColumn(2,u),n[2]>D.data[2].length&&(D.scrollColumn(2,D.data[2].length-1),D.selectedIndex[2]=D.data[2].length-1)}r(),I=n}function i(e,t){var n=JSON.stringify(e.data);l(e.selectedIndex,n);a(t)}function o(e,t){function n(){for(var t,n=D.data,r=JSON.stringify(D.data),u=0;u<n[2].length;u++)if(t=n[2][u],t.value==e[2]){D.scrollColumn(2,u),D.selectedIndex[2]=u,I=l(D.selectedIndex,r),a();break}}function a(){var t,n=D.data,a=JSON.stringify(D.data);e[3]||(e[3]=0);for(var r=0;r<n[3].length;r++)if(t=n[3][r],t.value==e[3]){D.scrollColumn(3,r),D.selectedIndex[3]=r,I=l(D.selectedIndex,a);break}}for(var r,u,i,o=D.data,f=0;f<o[0].length;f++){if(o[0][f].value==e[0]){D.scrollColumn(0,f),D.selectedIndex[0]=f,u=JSON.stringify(D.data),I=r=l(D.selectedIndex,u),i=h?p.fn_M(r[0]):M.fn_M(r[0]),D.refillColumn(1,i),function(){for(var t,a,u=D.data,i=0;i<u[1].length;i++)if(u[1][i].value==e[1]){D.scrollColumn(1,i),D.selectedIndex[1]=i,t=JSON.stringify(D.data),I=r=l(D.selectedIndex,t),a=h?p.fn_D(r[0],r[1]):M.fn_D(r[0],r[1]),D.refillColumn(2,a),n();break}}();break}}}var f={_min:e._min||[1900,1,31,0],_max:e._max||[1909,11,11,23],val:e.val||null,el:e.el||"packerDateId",submit:e.callback||null},c=f._min,s=t.toLunar(f._min[0],f._min[1],f._min[2]),d=f._max,v=t.toLunar(f._max[0],f._max[1],f._max[2]),h=(f.el,0),m=[{text:"1900",value:1900},{text:"1901",value:1901}],x=[{text:"1",value:1},{text:"2",value:2}],_=[{text:"1",value:1},{text:"2",value:2},{text:"3",value:3}],g=[],M={fn_Y:function(){for(var e,t=[],n={},a=d[0],l=c[0]-1,r=l;r<a;r++)e=r+1,n={text:e+"年",value:e},t.push(n);return t},fn_M:function(e){var t=0,n=12;D?(e==d[0]&&(n=d[1]),e==c[0]&&(t=c[1]-1)):t=c[1]-1;for(var a,l=[],r={},u=t;u<n;u++)a=u+1,r={text:a+"月",value:a},l.push(r);return l},fn_D:function(e,t){var n=this.fn_maxD(e,t),a=0;D?(e==d[0]&&t==d[1]&&(n=d[2]),e==c[0]&&t==c[1]&&(a=c[2]-1)):a=c[2]-1,data=[];for(var l,r={},u=a;u<n;u++)l=u+1,r={text:l+"日",value:l},data.push(r);return data},fn_maxD:function(e,t){if("01"==t||"03"==t||"05"==t||"07"==t||"08"==t||"10"==t||"12"==t)return 31;if("04"==t||"06"==t||"09"==t||"11"==t)return 30;if("02"==t){var n=e%4==0,a=e%100!=0,l=e%400==0;return n&&a||l?29:28}}},p={fn_Y:function(){for(var e,t=[],n={},a=v[0],l=s[0]-1,r=l;r<a;r++)e=r+1,n={text:e+"年",value:e},t.push(n);return t},fn_M:function(e){var n=0,a=12,l=!1,r=t.leapMonth(e);D?(e==v[0]&&(a=v[1],r&&a>r&&(l=!0)),e==s[0]&&(n=s[1]-1)):n=s[1]-1,r&&!l&&a>r&&a++;for(var u,i=["正","二","三","四","五","六","七","八","九","十","十一","十二"],o=[],f={},c=n,d=n;d<a;d++)c+=1,r&&c>r?(u=c-1,u=(c==r+1?"闰":"")+i[u-1]):u=i[c-1],f={text:u+"月",value:c},o.push(f);return o},fn_D:function(e,t){var n=this.fn_maxD(e,t),a=0;D?(e==v[0]&&t==v[1]&&(n=v[2]),e==s[0]&&t==s[1]&&(a=s[2]-1)):a=s[2]-1;var l=["初一","初二","初三","初四","初五","初六","初七","初八","初九","初十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十","二十一","二十二","二十三","二十四","二十五","二十六","二十七","二十八","二十九","三十"];data=[];for(var r,u={},i=a;i<n;i++)r=i+1,u={text:l[i],value:r},data.push(u);return data},fn_maxD:function(e,n){var a=t.leapMonth(e);return a&&n>a&&--n,t.lunarMonthDays(e,n)}};a();var D=new Picker({data:[m,x,_,g],selectedIndex:[0,0,0,0],title:"选择日期"});document.getElementById(f.el).addEventListener("click",function(){D.show(),f.val&&setTimeout(function(){o(f.val),f.val=null},0)});var I=c;return D.on("picker.change",function(){u(this)}),D.on("picker.cancel",function(){var e,n=JSON.stringify(this.data),a=l(this.selectedIndex,n);return e=h?t.toSolar(a[0],a[1],a[2]):t.toLunar(a[0],a[1],a[2]),h=!h,this.cancelEl.innerHTML=h?"选择阳历":"选择农历",i(this,function(){o(e,h)}),!1}),D.on("picker.valuechange",function(){var e,n={};h?(n.c={name:"农历",rawData:!0,value:this.selectedVal,leapMonth:t.leapMonth(this.selectedVal[0])},e=t.toSolar(this.selectedVal[0],this.selectedVal[1],this.selectedVal[2]),e[3]=this.selectedVal[3],n.l={name:"阳历",value:e}):(e=t.toLunar(this.selectedVal[0],this.selectedVal[1],this.selectedVal[2]),e[3]=this.selectedVal[3],n.c={name:"农历",value:e,leapMonth:t.leapMonth(e[0])},n.l={name:"阳历",rawData:!0,value:this.selectedVal}),f.submit&&f.submit(n)}),D};window.pickerDate=n}();