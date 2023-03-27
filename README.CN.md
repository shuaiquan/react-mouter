[ENGLISH](./README.md) | 中文文档

# React Mounter
React Mounter 是一款 React 体系下的分离式组件挂载方式。

可以在 MountProvider 组件下声明要被挂载的内容, 然后会被选渲染到指定的 MountConsumer 组件下。 

可以让组件的挂载和渲染，不再受到组件层次的限制，在应用中实现模块UI的解耦和注入方面有着非常好的效果。

## 与 createPortal 的区别
我们不必在需要知道目标的 DOM ，而是可以通过指定一致的 “name” 即可将 MountProvider 下的结构提供给 MountConsumer 渲染。

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
| params? | object | true | 会传递给 MountProvider 中 visible 和 children 的参数 |
| children? | ((views: ReactNode[]) => ReactNode) |  | 接收所有挂载视图的函数，并返回 ReactNode |

## 快速起步
### 挂载视图
```javascript
function Content() {
  // ...

  return (
    <div>
      {/* ... */}
      <MountProvider name="header-action">
        <h1>
          Mounted By React-Mounter
        </h1>
      </MountProvider>
    </div>
  )
}

function Header() {
  // ...

  return (
    <div>
      {/* ... */}
      <MountConsumer name="header-action" />
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

### 参数传递
```javascript
function Content() {
  return (
    <div>
      {/* ... */}
      <MountProvider 
        name="header-action"
        visible={(params: any) => params && params.value % 2 === 0}
      >
        {
          (params: any) => {
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

function Header() {
  const [value, setValue] = useState(10);

  return (
    <div>
      {/* ... */}
      <MountConsumer 
        name="header-action" 
        params={{ value }}
      />
    </div>
  )
}
```

### 组织视图
```javascript
function Content() {
  return (
    <div>
      <MountProvider name="header-action">
        <h1>
          Mounted By React-Mounter
        </h1>
      </MountProvider>
    </div>
  )
}

function Header() {
  const [value, setValue] = useState(10);

  return (
    <div>
       <MountConsumer name="header-action">
        {(views) => (
          <div className="container">{views}</div>
        )}
       </MountConsumer>
    </div>
  )
}
```