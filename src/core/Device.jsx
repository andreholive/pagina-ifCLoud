import { AbstractReactFactory } from '@projectstorm/react-canvas-core';

export class Device extends AbstractReactFactory {
  constructor({
    type,
    name,
    description,
    group,
    model,
    widget,
    icon,
  }) {
    super(type);
    this.name = name;
    this.description = description;
    this.group = group;
    this.Model = model;
    this.Widget = widget;
    this.Icon = icon;
  }

  generateReactWidget(event) {
    const { Widget } = this;
    const { model } = event;
    return (<Widget engine={this.engine} model={model}/>);
  }

  generateModel(event) {
    const { Model } = this;
    const { type, name } = event.initialConfig;
    return new Model(type, name);
  }
}
