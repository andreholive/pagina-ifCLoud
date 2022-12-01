import { PortWidget } from '@projectstorm/react-diagrams';

function PortSvg({port, model, className}){
    
  return(
    <svg 
    viewBox="0 0 32.96 33.99"
    className={`${className} port port-${port.state}`}
    data-name={port.options.name}
    data-nodeid={model.getID()}
    port={port}
    width="12"
    height="12"
    >
    <g>
      <path className='port-border' d="M29.44,33.99H3.51C1.57,33.99,0,32.42,0,30.48V3.51C0,1.57,1.57,0,3.51,0h25.93c1.94,0,3.51,1.57,3.51,3.51
        v26.96C32.96,32.42,31.38,33.99,29.44,33.99z"/>
      <g>
        <polygon fill="#46515C" points="28.88,5.2 4.08,5.2 4.08,22.66 11.47,22.66 11.47,28.79 21.49,28.79 21.49,22.66 28.88,22.66 		
          "/>
        <g>
          <rect x="8.25" y="5.2" fill="#FEFEFE" width="2.72" height="5.53"/>
          <rect x="12.83" y="5.2" fill="#FEFEFE" width="2.72" height="5.53"/>
          <rect x="17.41" y="5.2" fill="#FEFEFE" width="2.72" height="5.53"/>
          <rect x="21.99" y="5.2" fill="#FEFEFE" width="2.72" height="5.53"/>
        </g>
      </g>
      <path fill={port.getColor()} d="M9.16,30.42H2.3c-0.5,0-0.9-0.43-0.9-0.96v-3.12c0-0.53,0.4-0.96,0.9-0.96h6.86c0.5,0,0.9,0.43,0.9,0.96
        v3.12C10.06,29.99,9.66,30.42,9.16,30.42z"/>
    </g>
    </svg>
  )

}

export class Port extends PortWidget {

  constructor(props){
    super();
    this.port = props.port;
  }

  render() {
    const { model, port, className = '' } = this.props;
    if (!port) return null;
    
    return (      
    <PortSvg port={port} model={model} className={className}/>
    );
  }
}
