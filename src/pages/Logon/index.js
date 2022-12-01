import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import LogInApi from '../../services/authApi';
import './logon.css';
import CloudsImg from '../../assets/clouds.png';
import logoImg from '../../assets/logo_ifcloud.png';
import {changeProject} from '../../services/users';

export default function Logon(){
    const [id, setId] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(false);
    let navigate = useNavigate();
    useEffect(() => {
        localStorage.clear();
    },[]);
    

    async function handleLogin(e){
        
        e.preventDefault();
        if(id == '' || pass == ''){
            return;
        }
        const data = {
            id : id,
            pass: pass
        };
        try{
            const projectId = await LogInApi(data);
            if(!projectId){
                setError(true);
                return;
            }
            await changeProject(projectId);
            navigate("/project", { replace: true });
        }catch(err){

        
        }
        }
    
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="ifCloud" width="350px"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça o Login</h1>
                    {error?(<div className='error_information'>Usuário ou Senha incorretos.</div>):''}
                    <input 
                        placeholder="Nome de Usuário" 
                        value={id}
                        onChange={e => setId(e.target.value)}
                        className={error?'error':''}
                    />
                    <input 
                        placeholder="Sua Senha" 
                        type="password"
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                        className={error?'error':''}
                    />
                    <button type="submit" className="button">Entrar</button>   
                </form>
            </section>
            <img src={CloudsImg} alt="Clouds"  width="700px"/>
        </div>
    );
}