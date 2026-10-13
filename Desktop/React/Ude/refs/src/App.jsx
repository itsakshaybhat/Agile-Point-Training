import Player from './components/Player.jsx';
import TimerChallenge from './components/TimerChallenge.jsx';

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimerChallenge targetTime={1} title="Easy"/>
        <TimerChallenge targetTime={5} title="not Easy"/>
        <TimerChallenge targetTime={1} title="Getting Tough"/>
        <TimerChallenge targetTime={5} title="Pros Only"/>
      </div>
    </>
  );
}

export default App;
