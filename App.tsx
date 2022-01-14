import * as React from 'react';
import * as Tone from 'tone';
import { useState, useEffect } from 'react';
import PadButton from './PadButton';
import { Col, Container, Row } from 'react-bootstrap';
import { duration } from '@mui/material';

export default function App() {
  //Change chord mode between Sunset and Moonlight
  const [mode, setMode] = useState('Sunset');
  //Change chord arpeggio if its been played
  const [pattern2Played, setPattern2Played] = useState(false);
  const [pattern4Played, setPattern4Played] = useState(false);
  //Change chords
  const [chords, setChords] = useState([]);
  const [playLoop, stopLoop] = useState(true);
  
  //Change ambiance
  
  useEffect(() => {
    if (mode === 'Sunset') {
      setChords([
        ["E3", "G#3", "B3", "D#4", "F#4"],
        ["B2", "A#3", "C#4", "D#4", "F#4"],
        ["C#3", "B3", "D#4", "E4", "G#4"],
        ["G#2", "A#3", "B3", "D#4", "F#4"],
      ])
      document.getElementsByTagName('html')[0].style.backgroundImage = 'linear-gradient(90deg, rgb(219, 179, 0), rgb(196, 197, 40))';
      // playNatureSounds()
    } else if(mode === 'Moonlight') {
      setChords([
        ["E3", "G3", "B3", "D4", "F#4"],
        ["B2", "A3", "C#4", "D4", "F#4"],
        ["D3", "F#3", "A3", "C#4", "E4"],
        ["A2", "G#3", "B3", "C#4", "E4"]
      ]);
      document.getElementsByTagName('html')[0].style.backgroundImage = 'linear-gradient(90deg, rgb(45,129,19), rgb(17,75,56))';
    }
  }, [mode]);

  //Effects
  //const feedbackDelay = new Tone.FeedbackDelay(1, 0.1).toDestination();
  const chorus = new Tone.Chorus(1, 0.5, 4).toDestination().start();
  const phaser = new Tone.Phaser({
    "frequency" : 0.025, 
    "octaves" : 1, 
    "baseFrequency" : 432
  }).toDestination();
  
  //Samples
  const piano = new Tone.Sampler({
    urls: {
      "C4": "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      "A4": "A4.mp3",
    },
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
  }).toDestination()
  piano.connect(phaser);
  piano.connect(chorus)
  piano.volume.value=-20;
  
  //Helper Functions
  const raiseOctave = (octave) => {
    if (typeof octave === 'string') {
      return octave.replace(/[0-7]/g, (match) => {
          return String.fromCharCode(octave.charCodeAt(octave.indexOf(match))+1)
      })
    } 
  }

  const raiseNote = (note) => {
    if (typeof note === 'string') {
      return note.replace(/[a-f]/gi, (match) => {
          return String.fromCharCode(note.charCodeAt(note.indexOf(match))+1)
      })
    } 
  }
  // let natureSounds = new Tone.Player("https://assets.mixkit.co/sfx/preview/mixkit-crickets-at-night-in-nature-2475.mp3").toDestination();

  // const playNatureSounds = () => {
  //     natureSounds.volume.value = -50;
  //     natureSounds.loop = true;
  //     natureSounds.autostart = true
  // }
  
  const drawWaveform = () => {
    
  }
  
  //Chord Functions
  const playChord1 = () => {
    Tone.loaded().then(() => {
      piano.triggerAttackRelease(chords[0], 2)
    })
    
  } 

  const playChord2 = () => {
    Tone.loaded().then(() => {
      piano.triggerAttackRelease(chords[1], 2)
    })
  }

  const playChord3 = () => {
    Tone.loaded().then(() => {
      piano.triggerAttackRelease(chords[2], 2);
    })
  }

  const playChord4 = () => {
    Tone.loaded().then(() => {
      piano.triggerAttackRelease(chords[3], 2);
    })
  }

  const arpeggiateChord1 = () => {
    Tone.loaded().then(() => {
      const now = Tone.now()
      const velocity = .166666666667;
      piano.triggerAttack(chords[0][0], now, velocity*3);
      piano.triggerAttack(chords[0][1], now + 0.5, velocity*2);
      piano.triggerAttack(chords[0][2], now + 1, velocity*3);
      piano.triggerAttack(chords[0][3], now + 1.5, velocity*4);
      piano.triggerAttack(chords[0][4], now + 2, velocity*5);
      piano.triggerAttack(chords[0][4], now + 3, velocity*4);
      piano.triggerRelease([chords[0][0], chords[0][1],chords[0][2], chords[0][3], chords[0][4]], now + 4)
    })
  }
  
  const arpeggiateChord2 = () => {
    Tone.loaded().then(() => {
      const now = Tone.now()
      const velocity = .142857142857;
      if (mode === "Sunset") {
        if (!pattern2Played ) {
          piano.triggerAttack(chords[1][0], now, velocity*3);
          piano.triggerAttack(chords[1][1], now + 0.5, velocity*4);
          piano.triggerAttack(chords[1][2], now + 1, velocity*5);
          piano.triggerAttack(chords[1][3], now + 1.5, velocity*5);
          piano.triggerAttack(chords[1][4], now + 2, velocity*6);
          piano.triggerAttack(chords[1][4], now + 2.5, velocity*6);
          piano.triggerAttack(chords[1][4], now + 3.25, velocity*5);
          piano.triggerRelease([chords[1][0], chords[1][1], chords[1][2], chords[1][3], chords[1][4]], now + 4);
          setPattern2Played(true);
        } else {
          piano.triggerAttack(chords[1][0], now, velocity*3);
          piano.triggerAttack(chords[1][1], now + 0.5, velocity*4);
          piano.triggerAttack(chords[1][2], now + 1, velocity*5);
          piano.triggerAttack(chords[1][3], now + 1.5, velocity*5);
          piano.triggerAttack(chords[1][4], now + 2, velocity*6);
          piano.triggerAttack(raiseNote(chords[1][4]), now + 2.5, velocity*6);
          piano.triggerAttack(chords[1][4], now + 3, velocity*5);
          piano.triggerRelease([chords[1][0], chords[1][1], chords[1][2], chords[1][3], chords[1][4], raiseNote(chords[1][4])], now + 4);
          setPattern2Played(false);
        }
      } else if (mode === "Moonlight") {
        if (!pattern2Played ) {
          piano.triggerAttack(chords[1][0], now, velocity*3);
          piano.triggerAttack(chords[1][1], now + 0.5, velocity*4);
          piano.triggerAttack(chords[1][2], now + 1, velocity*5);
          piano.triggerAttack(chords[1][3], now + 1.5, velocity*5);
          piano.triggerAttack(chords[1][4], now + 2, velocity*6);
          piano.triggerAttack(chords[1][4], now + 2.5, velocity*6);
          piano.triggerAttack(chords[1][4], now + 3.25, velocity*5);
          piano.triggerRelease([chords[1][0], chords[1][1], chords[1][2], chords[1][3], chords[1][4]], now + 4);
          setPattern2Played(true);
        } else {
          piano.triggerAttack(chords[1][0], now, velocity*3);
          piano.triggerAttack(chords[1][1], now + 0.5, velocity*4);
          piano.triggerAttack(chords[1][2], now + 1, velocity*5);
          piano.triggerAttack(chords[1][3], now + 1.5, velocity*5);
          piano.triggerAttack(chords[1][4], now + 2, velocity*6);
          piano.triggerAttack(chords[1][4], now + 2.5, velocity*6);
          piano.triggerAttack(chords[1][4], now + 3, velocity*5);
          piano.triggerRelease([chords[1][0], chords[1][1], chords[1][2], chords[1][3], chords[1][4], raiseNote(chords[1][4])], now + 4);
          setPattern2Played(false);
        }
      }
    })
  }

  const arpeggiateChord3 = () => {
    Tone.loaded().then(() => {
      const now = Tone.now()
      const velocity = .166666666667;
      piano.triggerAttack(chords[2][0], now, velocity*3);
      piano.triggerAttack(chords[2][1], now + 0.5, velocity*2);
      piano.triggerAttack(chords[2][2], now + 1, velocity*3);
      piano.triggerAttack(chords[2][3], now + 1.5, velocity*3);
      piano.triggerAttack(chords[2][4], now + 2, velocity*4);
      piano.triggerAttack(chords[2][4], now + 3, velocity*3);
      piano.triggerRelease([chords[2][0], chords[2][1], chords[2][2], chords[2][3], chords[2][4]], now + 4);
    })
  }

  const arpeggiateChord4 = () => {
    Tone.loaded().then(() => {
      const now = Tone.now()
      const velocity = .142857142857;
      if (mode === "Sunset") {
        if (!pattern4Played) {
          piano.triggerAttack(chords[3][0], now, velocity*3);
          piano.triggerAttack(chords[3][1], now + 0.5, velocity*4);
          piano.triggerAttack(chords[3][2], now + 1, velocity*5);
          piano.triggerAttack(chords[3][3], now + 1.5, velocity*5);
          piano.triggerAttack(chords[3][4], now + 2, velocity*6);
          piano.triggerAttack(chords[3][4], now + 2.5, velocity*6);
          piano.triggerAttack(chords[3][4], now + 3.25, velocity*5);
          piano.triggerRelease([chords[3][0], chords[3][1], chords[3][2], chords[3][3], chords[3][4]], now + 4);
          setPattern4Played(true);
        } else {
          const velocity = 0.125
          piano.triggerAttack(chords[3][0], now, velocity*2);
          piano.triggerAttack(chords[3][1], now + 0.5, velocity*3);
          piano.triggerAttack(chords[3][2], now + 1, velocity*4);
          piano.triggerAttack(chords[3][3], now + 1.5, velocity*5);
          piano.triggerAttack(chords[3][4], now + 2, velocity*6);
          piano.triggerAttack(raiseOctave(chords[3][1]), now + 2.5, velocity*8);
          piano.triggerAttack(chords[3][4], now + 3, velocity*7);
          piano.triggerAttack(chords[3][3], now + 3.5, velocity*6);
          piano.triggerRelease([chords[3][0], chords[3][1], chords[3][2], chords[3][3], chords[3][4], raiseOctave(chords[3][1])], now + 4);
          setPattern4Played(false);
        } 
      } else if (mode === "Moonlight") {
        if (!pattern4Played) {
          piano.triggerAttack(chords[3][0], now, velocity*3);
          piano.triggerAttack(chords[3][1], now + 0.5, velocity*4);
          piano.triggerAttack(chords[3][2], now + 1, velocity*5);
          piano.triggerAttack(chords[3][3], now + 1.5, velocity*5);
          piano.triggerAttack(chords[3][4], now + 2, velocity*6);
          piano.triggerAttack(chords[3][4], now + 2.5, velocity*6);
          piano.triggerAttack(chords[3][4], now + 3.25, velocity*5);
          piano.triggerRelease([chords[3][0], chords[3][1], chords[3][2], chords[3][3], chords[3][4]], now + 4);
          setPattern4Played(true);
        } else {
          piano.triggerAttack(chords[3][0], now, velocity*2);
          piano.triggerAttack(chords[3][1], now + 0.5, velocity*3);
          piano.triggerAttack(chords[3][2], now + 1, velocity*4);
          piano.triggerAttack(chords[3][3], now + 1.5, velocity*5);
          piano.triggerAttack(chords[3][4], now + 2, velocity*6);
          piano.triggerAttack(raiseOctave(chords[3][1]), now + 2.5, velocity*8);
          piano.triggerAttack(chords[3][4], now + 3, velocity*7);
          piano.triggerAttack(chords[3][3], now + 3.5, velocity*6);
          piano.triggerRelease([chords[3][0], chords[3][1], chords[3][2], chords[3][3], chords[3][4], raiseOctave(chords[3][1])], now + 4);
          setPattern4Played(false);
        } 
      }
    })
  }
  
  return (
    <Container fluid id='soundboard' style={{backgroundImage: mode === 'Moonlight' ? `radial-gradient(circle at top left, #CACACA, #F4F4F4, #4B3475 25%, #2B2F77)`: null }}>
      <Row className='pad-row'>
          <Col onClick={() => setMode('Sunset')}></Col>
          <Col onClick={playChord1}><PadButton mode={mode}/></Col>
          <Col onClick={playChord2}><PadButton mode={mode}/></Col>
          <Col onClick={playChord3}><PadButton mode={mode}/></Col>
          <Col onClick={playChord4}><PadButton mode={mode}/></Col>
          <Col></Col>
      </Row>
      <Row className='pad-row'>
          <Col></Col>
          <Col onClick={arpeggiateChord1}><PadButton mode={mode}/></Col>
          <Col onClick={arpeggiateChord2}><PadButton mode={mode}/></Col>
          {/* <svg height="100" width="100">
            <circle cx="50" cy="50" r="10" stroke="black" stroke-width="3" fill="red" />
          </svg> */}
          <Col onClick={arpeggiateChord3}><PadButton mode={mode}/></Col>
          <Col onClick={arpeggiateChord4}><PadButton mode={mode}/></Col>
          <Col onClick={() => {setMode('Moonlight')}}></Col>
      </Row>
    </Container>
  );
}