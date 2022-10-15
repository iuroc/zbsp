获取标签列表
```js
data = []
var eles = $('.listcheck .clearfix  li')
for (var i = 0; i < eles.length; i++) {
    data.push($(eles[i]).text())
}
data
```