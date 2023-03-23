ENGLISH | [中文文档](./README.CN.md)

# React Mounter
**React Mounter** is a separate component mounting approach in the React system

Declare the components to be mounted under the MountProvider component, and then it will be selected to render under the same-name MountConsumer component.

It allows component mounting and rendering without being limited by component levels, and has a very good effect in implementing UI decoupling and injection in applications

### Differences from createPortal
Instead of needing to know the DOM of the target, we can provide the structure under the MountProvider to the MountConsumer for rendering by specifying a consistent "name".