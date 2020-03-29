import React, { useState } from 'react';
import { Link, useHistory }  from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './style.css';

import api from '../../services/api';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function logon (){
    const history = useHistory();
    const [id, setId] = useState('');
    
    async function handleLogin(e) {
        e.preventDefault();

        try {
            const res = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', res.data.name);

            history.push('/Profile')
        } catch (error) {
            alert('ID incorreto, tente novamente');
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Logo Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input value={id} onChange={e => setId(e.target.value)} placeholder="Sua Id"/>
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}