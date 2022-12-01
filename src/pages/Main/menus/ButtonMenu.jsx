import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Button = styled.button.attrs(({ ...props }) => ({
    ...props,
    type: 'button',
  }))`
  position: absolute;
  box-shadow: 0 5px 10px rgba(0,0,0,0.4);
  bottom: 0;
  right: 0;
  z-index: 100;
  border: none;
  border-radius: 100%;
  background: #737fc7;
  width: 60px;
  height: 60px;
  margin: 16px;
  font-size: 2em;
  line-height: 1em;
  color: white;
  transition: 0.2s ease-in-out;
  `;

  export default function ButtonMenu({isOpen, setOpen}){
    
    return(
        
        <Button
          className="menu-button"
          data-for="tooltip"
          data-tip={!isOpen ? "Adicionar um Dispositivo" : "Fechar" }
          data-place="left"
          onClick={() => {setOpen()}}
        > 
          <FontAwesomeIcon className={isOpen ? "menu-open-button" : "menu-close-button"} icon={faPlus}/>
        </Button>
    )

}