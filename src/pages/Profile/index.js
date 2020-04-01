import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {

    setIsLoading(true);
    api.get('profile', {
      headers: {
        authorization: ongId,
      }
    }).then(response => {
      setIsLoading(false);
      setIncidents(response.data)
    });

  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          authorization: ongId,
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert('Erro ao deletar caso');
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem Vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {
          isLoading
            ? (
              <SkeletonTheme color="#fff" highlightColor="#f0f0f5">
                <li>
                  <strong><Skeleton width={500} height={30} /></strong>

                  <strong><Skeleton width={500} height={30} /></strong>

                  <strong><Skeleton width={500} height={30} /></strong>
                </li>
              </SkeletonTheme>
            )
            : null
        }
        {
          isLoading
            ? (
              <SkeletonTheme color="#fff" highlightColor="#f0f0f5">
                <li>
                  <strong><Skeleton width={500} height={30} /></strong>

                  <strong><Skeleton width={500} height={30} /></strong>

                  <strong><Skeleton width={500} height={30} /></strong>
                </li>
              </SkeletonTheme>
            )
            : null
        }

        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Caso:</strong>
            <p>{incident.title}</p>

            <strong>Descrição:</strong>
            <p>{incident.description}</p>

            <strong>Valor:</strong>
            <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button type="button" onClick={() => { handleDeleteIncident(incident.id) }}>
              <FiTrash2 size={20} color="a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div >
  )
}
