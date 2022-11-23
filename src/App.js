import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Question from './Components/Question';
import logoBergasol from './Assets/images/LOGO BERGASOL.webp';
import produit1 from './Assets/images/bergasol 1.webp';
import produit2 from './Assets/images/bergasol 2.webp';
import logo from './Assets/images/Logo.png'
import Quiz from "./Components/Quiz";
import {Component} from "react";
import quizQuestions from "./api/quizQuestions";
import Result from "./Components/Result";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {resetFirstInputPolyfill} from "web-vitals/dist/modules/lib/polyfills/firstInputPolyfill";
import {forEach} from "react-bootstrap/ElementChildren";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            questionId: 1,
            question: '',
            answerOptions: [],
            answer: '',
            answersCount: {},
            result: ''
        };
        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);

    }

    state = {
        nomComplet: '',
        numTel: '',
        prospects: [],
        exists: false
    }



    sendForm( event ) {

        let formData = new FormData()
        formData.append('nomComplet', this.state.nomComplet)
        formData.append('numTel', this.state.numTel)

        axios({
            method: 'post',
            url:'https://api.benrahmacasse.com/prospects.php',
            data: formData,
            config: { headers: {'Content-Type' : 'multipart/form-data'} }
        }).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error)
        });
    }
    isShown = true;
    error = false;
    handleClick() {
        this.isShown = !this.isShown;
    }
    handleError() {
        this.error = !this.error;
    }
    componentDidMount() {
        let tab = [];
        this.setState({
            question: quizQuestions[0].question,
            answerOptions:quizQuestions[0].answers,
        });

        axios({
            method: 'get',
            url:'https://api.benrahmacasse.com/prospects.php'
        }).then(
            res => this.setState({...this.state, prospects: res.data})
        ).catch(function (error) {
            console.log(error);
        });
    }
    handleAnswerSelected(event) {
        this.setUserAnswer(event.currentTarget.value);

        if (this.state.questionId < quizQuestions.length) {
            setTimeout(() => this.setNextQuestion(), 300);
        } else {
            setTimeout(() => this.setResults(this.getResults()), 300);
        }
    }
    setUserAnswer(answer) {
        this.setState((state, props) => ({
            answersCount: {
                ...state.answersCount,
                [answer]: (state.answersCount[answer] || 0) + 1
            },
            answer: answer
        }));
    }
    setNextQuestion() {
        const counter = this.state.counter + 1;
        const questionId = this.state.questionId + 1;

        this.setState({
            counter: counter,
            questionId: questionId,
            question: quizQuestions[counter].question,
            answerOptions: quizQuestions[counter].answers,
            answer: ''
        });
    }
    renderQuiz() {
        return (
            <Quiz
                answer={this.state.answer}
                answerOptions={this.state.answerOptions}
                questionId={this.state.questionId}
                question={this.state.question}
                questionTotal={quizQuestions.length}
                onAnswerSelected={this.handleAnswerSelected}
            />
        );
    }
    getResults() {
        const answersCount = this.state.answersCount;
        const answersCountKeys = Object.keys(answersCount);
        const answersCountValues = answersCountKeys.map(key => answersCount[key]);
        const maxAnswerCount = Math.max.apply(null, answersCountValues);

        return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
    }
    setResults(result) {
        if (result.length === 1) {
            this.setState({ result: result[0] });
        } else {
            this.setState({ result: 'Undetermined' });
        }
    }
    renderResult() {
        return <Result quizResult={this.state.result} />;
    }

    render() {
        return (
            <div className="App">
                <div className="divLogo">
                    <img src={logo} className="siteLogo"/>
                </div>
                <div className="leftContainer">
                    <img src={logoBergasol} className="logoBergasol"/>
                    <div className="imagesProduits">
                        <img src={produit1}/>
                        <img src={produit2}/>
                    </div>
                    <h2>L’écran de l’hiver</h2>
                </div>
                <div className="rightContainer">
                    <h3>Quiz Black Friday</h3>
                    <div className="form" style={{display: this.isShown ? 'block' : 'none'}}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Nom et prénom :</Form.Label>
                            <Form.Control type="text" name="nomComplet" onChange={e => this.setState({nomComplet: e.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Numéro de tél :</Form.Label>
                            <Form.Control type="text" name="numTel" onChange={e => this.setState({numTel: e.target.value})} />
                        </Form.Group>
                        <Button onClick={() => {
                            this.error = false
                            for (let pros of this.state.prospects) {
                               if (pros.NumTel === this.state.numTel) {
                                   this.state.exists = true
                               }
                            }
                            if (this.state.exists) {
                                this.handleError()
                                this.setState({ state: this.state })
                                this.state.exists = false
                            } else {
                                this.sendForm()
                                this.handleClick()
                                this.setState({ state: this.state })
                            }
                        }}>
                            Lancer le Quiz
                        </Button>
                        <div className="dejainscrit" style={{ display: this.error ? 'block' : 'none' }}>
                            <p>Le numéro utilisé est déjà inscrit! veuillez réessayer avec un autre numéro.</p>
                        </div>
                    </div>

                    <div className="quiz" style={{ display: this.isShown ? 'none' : 'block' }}>
                        {this.state.result ? this.renderResult() : this.renderQuiz()}
                    </div>
                </div>
                <div className="footer">
                </div>
            </div>
        );
    }



}

export default App;
