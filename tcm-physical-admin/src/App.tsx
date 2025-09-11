import './globals.css';
import './styles/index.css';
import SetupRouter from './router/setup';
import { useEffect } from 'react';
import { Howl } from 'howler';

export default function App() {
  useEffect(() => {
    const sound = new Howl({
      src: ['/sounds/click.mp3'],
    });

    window.addEventListener('click', () => {
      sound.play();
    });
    return () => {
      window.removeEventListener('click', () => {
        sound.stop();
      });
    };
  }, []);
  return <SetupRouter />;
}
