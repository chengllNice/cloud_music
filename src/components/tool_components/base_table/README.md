# base-table组件说明

## 参数

```javascript
  data
    类型：数组
    例如：
    一、一列表格
    data = [
      {
        t_head: [],
        t_body: [],
        t_page: {}
      }
    ];
    二、两个表格
    data = [
      {
        t_head: [],
        t_body: [],
        t_page: {}
      },
      {
        t_head: [],
        t_body: [],
        t_page: {}
      }
    ];
    t_head配置遵循iview官方文档
    增加配置项：
      table_slot:插槽
      type:operate
  config
    类型：对象 
    遵循iview官方文档配置
    例如：
    config = {
      colsNum: '1',
      size: "small",
      showheader: true,
      disabledhover: false,//禁用鼠标悬停时的高亮
      highlightrow: true,//是否支持高亮选中的行，即单选
      stripe: 'stripe',//斑马纹
      space: '',//两列表格时，表格之间的间距，默认无间距，值为距离px
    }
  
```
