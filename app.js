// DrumPad component
const DrumPad = ({ drumKey, song, handleClick, url, volume }) => {
    return (
        <div className="drum-pad" id={song} onClick={handleClick(drumKey, song)}>
            {drumKey}
            <audio className="clip" src={url} id={drumKey} volume={volume}></audio>
        </div>
    );
};

// DrumMachine component
class DrumMachine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drumPads: [
                {
                    "key": "Q",
                    "song": "Heater-1",
                    "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
                },
                {
                    "key": "W",
                    "song": "Heater-2",
                    "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
                },
                {
                    "key": "E",
                    "song": "Heater-3",
                    "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
                },
                {
                    "key": "A",
                    "song": "Heater-4",
                    "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
                },
                {
                    "key": "S",
                    "song": "clap",
                    "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
                },
                {
                    "key": "D",
                    "song": "open_hh",
                    "url": "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
                },
                {
                    "key": "Z",
                    "song": "Kick_n_Hat",
                    "url": "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
                },
                {
                    "key": "X",
                    "song": "Kick",
                    "url": "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
                },
                {
                    "key": "C",
                    "song": "Close_hh",
                    "url": "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
                }
            ],
            currentSongText: '',
            volume: 0.5 // Initial volume set to 50%
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
    }

    componentDidMount() {
        // will click the button when the corresponding key pressed
        window.addEventListener('keypress', this.handleKeyPress);
    }

    componentWillUnmount() {
        window.removeEventListener('keypress', this.handleKeyPress);
    }

    handleButtonClick(key, song) {
        return () => {
            const audio = document.getElementById(key);
            audio.currentTime = 0;
            audio.play();
            this.setState({
                currentSongText: song
            });
        };
    }

    handleVolumeChange(event) {
        const newVolume = parseFloat(event.target.value);
        this.setState({ volume: newVolume });
    }

    handleKeyPress(e) {
        const pad = this.state.drumPads.find(
            item => item.key === e.key.toUpperCase()
        );
        if (pad) {
            const audio = document.getElementById(pad.key);
            audio.currentTime = 0;
            audio.play();
            this.setState({ currentSongText: pad.song });
        }
    }

    render() {
        return (
            <div id="drum-machine">
                <div className="app_title">
                    <h1>Drum Machine</h1>
                </div>
                <div className="display-container">
                    <div id="display-pads">
                        {this.state.drumPads.map(item => (
                            <DrumPad
                                song={item.song}
                                key={item.key}
                                drumKey={item.key}
                                handleClick={this.handleButtonClick}
                                url={item.url}
                                volume={this.state.volume}
                            />
                        ))}
                    </div>
                    <p id="display" className="current-text">{this.state.currentSongText}</p>
                    <p id="volume-display">Volume: {Math.round(this.state.volume * 100)}%</p>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.02"
                        value={this.state.volume}
                        onChange={this.handleVolumeChange}
                    />
                </div>
            </div>
        );
    }
}

// Render the DrumMachine component
ReactDOM.render(<DrumMachine />, document.getElementById('root'));
