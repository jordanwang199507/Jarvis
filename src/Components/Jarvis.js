import React, { Component } from 'react';
import jarvis from '../Assets/gif/XDZT.gif';
import backgroundGif from '../Assets/gif/5ARz.gif';
import { TodoWrapper } from './TodoWrapper';
import "./Jarvis.css";

class Jarvis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transcript: 'Click here to speak',
            enableTodo: false,
        };
        this.recognition = null;
    }

    componentDidMount() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();

        this.recognition.onresult = (event) => {
            const current = event.resultIndex;
            const transcript = event.results[current][0].transcript;
            this.setState({ transcript });
            this.takeCommand(transcript.toLowerCase());
        };

        this.speak("Initializing JARVIS...");
        this.wishMe();

        // Setup listening event on the talk button in a React way
        this.recognition.onstart = () => {
            this.setState({ transcript: 'Listening...' });
        };
    }

    componentWillUnmount() {
        this.recognition.stop();
    }

    speak = (text) => {
        const text_speak = new SpeechSynthesisUtterance(text);
        text_speak.rate = 1;
        text_speak.volume = 1;
        text_speak.pitch = 1;
        window.speechSynthesis.speak(text_speak);
    }

    wishMe = () => {
        const hour = new Date().getHours();
        if (hour < 12) {
            this.speak("Good Morning Boss...");
        } else if (hour < 17) {
            this.speak("Good Afternoon Master...");
        } else {
            this.speak("Good Evening Sir...");
        }
    }

    takeCommand = (message) => {
        if (message.includes('hey') || message.includes('hello')) {
            this.speak("Hello Sir, How May I Help You?");
        } else if (message.includes("open google")){
            window.open("https://google.com", "_blank");
            this.speak("Opening Google...");
        } else if (message.includes("open youtube")){
            window.open("https://youtube.com", "_blank");
            this.speak("Opening Youtube...");
        } else if (message.includes("open facebook")){
            window.open("https://facebook.com", "_blank");
            this.speak("Opening Facebook...");
        } else if(message.includes("task list")){
            if(message.includes("open task list")){
                this.setState({ enableTodo: true });
                this.speak("Opening Task List...");
            }else if(message.includes("close task list")){
                this.setState({ enableTodo: false });
                this.speak("Closing Task List...");
            }
        } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
            window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
            const finalText = "This is what I found on the internet regarding " + message;
            this.speak(finalText);
        } else if (message.includes('wikipedia')) {
            window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
            const finalText = "This is what I found on Wikipedia regarding " + message;
            this.speak(finalText);
        } else if (message.includes('time')) {
            const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
            const finalText = "The current time is " + time;
            this.speak(finalText);
        } else if (message.includes('date')) {
            const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
            const finalText = "Today's date is " + date;
            this.speak(finalText);
        } else if (message.includes('calculator')) {
            window.open('Calculator:///');
            const finalText = "Opening Calculator";
            this.speak(finalText);
        }else {
            window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
            const finalText = "I found some information for " + message + " on Google";
            this.speak(finalText);
        }
    }

    handleTalkClick = () => {
        this.recognition.start();
    }

    render() {
        return (
            <section className="main">
                <img className="main-background" src={backgroundGif} alt="main background"/>
                <div className="jarvis-container">
                    <div className="jarvis-loader">
                        <div className="jarvis-image__container">
                            <img src={jarvis} alt="jarvis"/>
                            <span className="jarvis-loader__inner"></span>
                            <span className="jarvis-loader__inner"></span>
                        </div>
                    </div>

                    <h1 className="jarvis-header">J A R V I S</h1>
                    <p className="jarvis-text">I'm a Virtual Assistant JARVIS, How may I help you?</p>
                    <div className="input">
                        <button className="talk" onClick={this.handleTalkClick}>
                            <i className="fas fa-microphone-alt"></i>
                            <h1 className="content">{this.state.transcript}</h1>
                        </button>
                    </div>
                </div>
                {this.state.enableTodo ? <TodoWrapper/>:""}
            </section>
        );
    }
}

export default Jarvis;