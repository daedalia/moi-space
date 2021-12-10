import {useAudio} from 'react-use';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {Image} from "react-bootstrap";

export function Header() {
    const [audio, state, controls, ref] = useAudio({
        // src: 'https://vgmsite.com/soundtracks/alien-soldier-genesis/ujytudzdjm/05%20-%20Slap-Up.mp3',
        // src: 'https://vgmsite.com/soundtracks/lemmings-amiga/aeaymavf/08.%20How%20Much%20Is%20That%20Doggy%20in%20the%20Window.mp3',
        // src: 'https://vgmsite.com/soundtracks/star-fox-snes/bxybuhwxwq/03%20Controls.mp3',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        // src: 'https://vgmsite.com/soundtracks/star-fox-64-1997-n64-gamerip/ewzmhyyzri/17%20Titania%20And%20Macbeth.mp3',
        // src: 'https://vgmsite.com/soundtracks/city-hunter-1990-turbografx-16-gamerip/ofcvyyanyz/04%20Mission%201-%20Gone%20with%20the%20Beauty.mp3',
        autoPlay: true
    });
    
    const now = state.time/117.394286*100;
    const nowRead = Math.round(now);

    return(
        <header>
            <Image src="https://i.imgur.com/jZ7DG9A.gif?noredirect"/>
            <div>
                {audio}
                <ProgressBar now={now} label={`${nowRead}%`} />
                {/*<pre>{JSON.stringify(state, null, 2)}</pre>*/}
                <button onClick={controls.pause}>Pause</button>
                <button onClick={controls.play}>Play</button>
            </div>
            <hr/>
        </header>
    )
}