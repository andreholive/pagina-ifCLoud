import { DefaultLabelModel } from '@projectstorm/react-diagrams-defaults';

export default class LabelModel extends DefaultLabelModel{
    constructor(options){
        super(options);
    }

    setLabel(label){
        this.options.label = label;
    }
}