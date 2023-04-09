[ENGLISH](./README.md) | 中文文档

# React Mounter
**`React Mounter`** 是基于 React 体系的一种分离式组件挂载方案。

它可以有效地解决组件挂载受到组件层级结构限制的问题，其能力有点类似于 `createPortal` 但是它的语法更加简洁。

[![npm version](https://img.shields.io/npm/v/@s7n/react-mounter.svg?style=flat)](https://www.npmjs.com/package/@s7n/react-mounter)
[![npm downloads](https://img.shields.io/npm/dm/@s7n/react-mounter.svg?style=flat)](https://www.npmjs.com/package/@s7n/react-mounter)

## 安装
将 `@s7n/react-mounter` 安装为依赖，就可以在你的 React App 中使用了：
```shell
# If you use npm:
npm install @s7n/react-mounter 

# If you use yarn:
yarn add @s7n/react-mounter
```

## 使用
在 `MountProvider` 组件下声明要被挂载的内容, 然后其内容就会被渲染到相同 name 的 `MountConsumer` 组件下。
```javascript
function Header() {
  return (
    <div>
      <span>Welcome</span>
      <MountConsumer name="header-action" />  
    </div>
  )
}

function Content() {
  function onClick() {
    // do something ...
  }

  return (
    <div>
      <MountProvider name="header-action">
        <Button onClick={onClick}>Content Action</Button>
      </MountProvider>
    </div>
  )
}

function App() {
  return (
    <div>
      <Header />
      <Content />
    </div>
  )
}
```
更多用法请参考 API 和 DEMO

## API
### MountProvider
| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| name | string |  | 挂载点标识：其 children 会被挂载到同名的 MountConsumer 下 |
| visible? | boolean &#124; ((param?: object) => boolean) | true | 控制其内容是否挂载。当前为 Function 时，param 通过 MountConsumer 传递 |
| children? | ReactNode &#124; ((param?: object) => ReactNode) | null | ReactNode 或者接收 param 为参数的 Function，并返回 ReactNode |

### MountConsumer
| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| name | string |  | 挂载点标识：其会挂载渲染同名 MountProvider 提供的 ReactNode |
| param? | any | | 会传递给 MountProvider 中 visible 和 children 的参数 |
| children? | ((views: ReactNode[]) => ReactNode) |  | 接收所有挂载视图，并返回 ReactNode |
| fallback? | ReactNode | null | 当没有任何组件挂载时的默认渲染UI ｜

## DEMO
通过 `param` 传递参数，通过 `visible` 控制组件是否渲染
```javascript
function Header() {
  const [value, setValue] = useState(10);

  return (
    <div>
      <MountConsumer 
        name="header-action" 
        param={{ value }}
      />
    </div>
  )
}

function Content() {
  return (
    <div>
      <MountProvider 
        name="header-action"
        visible={(param: any) => param && param.value % 2 === 0}
      >
        {
          (param: any) => {
            if (param?.value !== undefined) {
              return <h1>current value is: {param.value}</h1>
            }

            return <h1>Nothing</h1>
          } 
        }
      </MountProvider>
    </div>
  )
}
```

## 设计灵感
设计灵感来自于 `DevExtreme Reactive` 中的 [`Template`](https://devexpress.github.io/devextreme-reactive/react/core/docs/reference/template/) 和 [`TemplatePlaceholder`](https://devexpress.github.io/devextreme-reactive/react/core/docs/reference/template-placeholder/) 的使用方式。

关于 [“简洁架构之组件的分离式挂载”](https://juejin.cn/post/7216526756096901180) 的内容，可以翻阅这篇文章。

### 与 `createPortal` 的区别
我们不必在需要知道目标的 DOM ，而是可以通过指定一致的 “name” 即可将 MountProvider 下的结构提供给 MountConsumer 渲染。

在应用中实现模块UI的解耦和注入方面有着非常好的效果。
