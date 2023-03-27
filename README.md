ENGLISH | [中文文档](./README.CN.md)

# React Mounter
**React Mounter** is a separate component mounting approach in the React system

Declare the components to be mounted under the MountProvider component, and then it will be selected to render under the same-name MountConsumer component.

It allows component mounting and rendering without being limited by component levels, and has a very good effect in implementing UI decoupling and injection in applications

### Differences from createPortal
Instead of needing to know the DOM of the target, we can provide the structure under the MountProvider to the MountConsumer for rendering by specifying a consistent "name".

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
| params? | object | true | Param will deliver to MountProvider's (visible and children)'s Function |
| children? | ((views: ReactNode[]) => ReactNode) |  | Receives all the functions of the mounted view and returns a ReactNode |

## Quick Start
### Mount Views
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

### Use Param
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

### Use Children In MountConsumer
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