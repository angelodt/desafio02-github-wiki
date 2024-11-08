
import { useState } from 'react';
import githubLogo from '../assets/github.png'
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';

import { Container } from './styles';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`)

    if(data.id) {
      const isExist = repos.find(r => r.id === data.id);

      if(!isExist) {
        setRepos(prev =>[...prev, data]);
        setCurrentRepo('');
        return
      }
    }
    alert('Repositório não encontrado')
  }

  const handleRemoveRepo = (id) => {
    console.log('Removendo registro', id);

    const filteredRepos = repos.filter(r => r.id !== id);

    setRepos(filteredRepos);
    
  }

  return (
    <Container>
    <div className="App">
    <img src={githubLogo} width={72} height={72} alt='logo github'></img>
    <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
    <Button onClick={handleSearchRepo}/>
    {repos.map( r => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={r} />)}    
    </div>
    </Container>
  );
}

export default App;
