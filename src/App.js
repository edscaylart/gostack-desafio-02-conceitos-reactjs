import React, {useState, useEffect} from "react";

import "./styles.css";
import gostack from './assets/img/gostack.png';
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    async function loadRepositories() {
      try {
        const response = await api.get('repositories');
        setRepositories(response.data);
      } catch (error) {
        console.log('Oops, erro ao carregar repositorios', error);
      }
    }

    loadRepositories();
  }, []);

  async function handleAddRepository(e) {
    e.preventDefault();
    try {
      const response = await api.post('repositories', {
        title,
        url,
        techs,
      });
      setRepositories([...repositories, response.data])
    } catch (error) {
      console.log('Erro ao adicionar repositorio');
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      setRepositories(repositories.filter(item => item.id !== id));
    } catch (error) {
      console.log('Erro ao adicionar repositorio');
    }
  }

  return (
    <div className="Container">
      <img src={gostack} alt="GoStack"/>
      <form>
        <div className="input-block">
          <label htmlFor="title">Título</label>
          <input 
            name="title" 
            id="title" 
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label htmlFor="url">Link do Github</label>
          <input 
            name="url" 
            id="url" 
            required
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label htmlFor="techs">Techs</label>
          <input 
            name="techs" 
            id="techs" 
            required
            value={techs}
            onChange={e => setTechs(e.target.value)}
          />
        </div>

        <button onClick={handleAddRepository}>Adicionar</button>
      </form>

      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
