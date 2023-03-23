[ENGLISH](./README.md) | 中文文档

# React Mounter
React Mounter 是一款 React 体系下的分离式组件挂载方式。

可以在 MountProvider 组件下声明要被挂载的内容, 然后会被选渲染到指定的 MountConsumer 组件下。 

可以让组件的挂载和渲染，不再受到组件层次的限制，在应用中实现模块UI的解耦和注入方面有着非常好的效果。

## 与 createPortal 的区别
我们不必在需要知道目标的 DOM ，而是可以通过指定一致的 “name” 即可将 MountProvider 下的结构提供给 MountConsumer 渲染。