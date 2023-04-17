ENGLISH | [中文文档](./README.CN.md)

# React Mounter
**`React Mounter`** is a separate component mounting approach based on React。

It effectively solves the problem of component mounting being limited by the component hierarchy, somewhat similar in capability to `createPortal` but with a more concise syntax.

[![npm version](https://img.shields.io/npm/v/@s7n/react-mounter.svg?style=flat)](https://www.npmjs.com/package/@s7n/react-mounter)
[![npm downloads](https://img.shields.io/npm/dm/@s7n/react-mounter.svg?style=flat)](https://www.npmjs.com/package/@s7n/react-mounter)

## Installation
To use `@s7n/react-mounter` with your React App, install it as a dependency
```shell
# If you use npm:
npm install @s7n/react-mounter 

# If you use yarn:
yarn add @s7n/react-mounter
```

## Quick Start
Declare the components to be mounted under the `MountProvider` component, and then it will be selected to render under the `MountConsumer` component with **same name**.
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
For more information, see API and DEMO

## API
### MountProvider
| Props | Type | Default | Description |
| --- | --- | --- | --- |
| name | string |  | Mount Identification: children will be mount by same-name MountConsumer |
| visible? | boolean &#124; ((param?: object) => boolean) | true | Determines whether to mount. When use Function, param is passed through MountConsumer |
| children? | ReactNode &#124; ((param?: object) => ReactNode) | null | ReactNode or a Function that takes param and returns the ReactNode
 |

### MountConsumer
| Props | Type | Default | Description |
| --- | --- | --- | --- |
| name | string |  | Mount Identification: mount ReactNode that provide by same-name MountProvider |
| param? | any | | Param will deliver to MountProvider's (visible and children)'s Function |
| children? | ((views: ReactNode[]) => ReactNode) |  | Receives all the mounted view and returns a ReactNode |
| fallback? | ReactNode | null | A fallback UI when there is nothing to mount |

## DEMO
Pass parameters through 'param', and control whether components render through 'visible'
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

## Design inspiration
The design inspiration comes from the usage of [`Template`](https://devexpress.github.io/devextreme-reactive/react/core/docs/reference/template/) and [`TemplatePlaceholder`](https://devexpress.github.io/devextreme-reactive/react/core/docs/reference/template-placeholder/ ) in `DevExtreme Reactive`.

For more design Ideas, check out ["Concise Architecture — Component Separation Mounting"](https://medium.com/p/d76dc9234e08)

### Differences from createPortal
Instead of needing to know the DOM of the target, we can provide the structure under the MountProvider to the MountConsumer for rendering by specifying a consistent "name".

It has a very good effect in implementing UI decoupling and injection in applications.