import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Form from './components/Form'
import MemeGenerator from './components/MemeGenerator'

function App() {
  const [memeText, setMemeText] = useState({ top: " ", bottom:" " })
  const [memeImg, setMemeImg] = useState(null)


  useEffect( () => {
    if (memeText.top && memeText.bottom){
      fetch(`https://api.imgflip.com/get_memes`)
      .then( (response) => response.json() )
      .then( (json) => {
        
        //generate random meme
        if (json.data.memes.length > 0) {
          const randomIndex = Math.floor(Math.random() * json.data.memes.length);
          setMemeImg(json.data.memes[randomIndex]);
        } 
       
      })
      .catch( (error) => {
        console.log('Error fetching data:', error);
      })
    }
  }, [memeText] );

  return (
    <div className='container'>
      <Header />
      
      <div className='container-meme-generator'>
        <Form setMemeText={setMemeText} />
        <MemeGenerator memeText={memeText} memeImg={memeImg} />
      </div>
      

      
    </div>
  )
}

export default App
