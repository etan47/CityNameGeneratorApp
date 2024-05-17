import './App.css';
import Welcome from './components/Welcome'
import MainBody from './components/MainBody';
import { Container } from '@mui/material';


function App() {
  return (
    <Container maxWidth='sm' style={{marginTop: '20px'}} className='container'>
      <Welcome className='topText'/>
      <MainBody />
    </Container>
  );
}


export default App;