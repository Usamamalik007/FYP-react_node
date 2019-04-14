import React, { Component, textarea, Image } from 'react'
import { Button, Form, FormControl, Nav, Navbar, Link, CarouselItem, Holder } from 'react-bootstrap';
import './App.css'
import axios from 'axios'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
const endpoint = 'http://localhost:8000/upload'
class App extends Component {
  constructor() {
    super()
    this.state = {
      selectedFile: null,
      loaded: 0,
      textData1: 'کون سوچ سکتا تھا کہ ہندوستان اکثریت اور انگریز حکمرانوں کی مشترکہ',
	  textData2: 'مخالفت کے باوجود برصغیر کی ملت اسلامیہ دین اسلام ہے اور اسی نظریہ',
	  textData3: 'پر اس ملک میں بسنے والے مختلف عناصر کا اتحاد ہے اور پاکستان کی',
	  textData4: 'بقا اسی نطریے حیات کے فروغ پر منحصر ہے۔',
	  textData5: 'لیکن بد قسمتی سے پکستان بننے کے بعد ہی اس کے اندر ایسے دشمن',
	  textData6: 'عناصر جو اس مملکت کے بنیادی نظریہ پر ایمان نہیں رکھتے تھے۔ وہ',
      count: 0,
      count1: 0,
    }
  }
  componentWillMount() {
  }
  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }
  handleUpload = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)
    axios
      .post(endpoint, data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          })
        },
      })
      .then(res => {
        console.log(res.statusText)
      })
  }
  readTextFile = (file) => {
    const outer_this = this;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          let allText = rawFile.responseText;
          let text = allText.toString();
          outer_this.setState({
            textData: text
          });
        }
      }
    }
    rawFile.send(null);
  }
  displayRecognizedText = () => {
    let name = this.state.selectedFile.name.split('.').slice(0, -1).join('.')
    this.readTextFile("http://localhost:8000/static/" + name + ".pred.txt")
  }

 
  render() {
    return (
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Urdu Bazaar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
        <br />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
          crossorigin="anonymous"
        />
        <Carousel showArrows={true} infiniteLoop transitionTime={2000} stopOnHover={false} autoPlay interval={4000}>
          <div style={{ opacity: '1' }}>
            <img src={require('./urdu11.png')} />
            <p style={{ opacity: '1' }} className="legend">Lot of handwritten data?</p>
          </div>
          <div>
            <img src={require('./two.PNG')} />
            <p style={{ opacity: '1' }} className="legend">Tired of typing it manually?</p>
          </div>
          <div>
            <img src={require('./mylogo.png')} />
            <p style={{ opacity: '1' }} className="legend">Here it is Urdu Bazaar</p>
          </div>
          <div>
            <img src={require('./save.png')} />
            <p style={{ opacity: '1' }} className="legend">Do not type, take a photo or scan the page and get its text</p>
          </div>
        </Carousel>
        <br>
        </br>
        <div>
          <h1>Give it a try</h1>
        </div>
        <br>
        </br>
        <div>
          <input type="file" name="" id="" onChange={this.handleselectedFile} />
          <button onClick={this.handleUpload}>Upload</button>
          <div> {Math.round(this.state.loaded, 2)} %</div>
          <button onClick={this.displayRecognizedText}>View Text</button>
          <p>{this.state.textData}</p>
		<p>{this.state.textData1}</p><p>{this.state.textData2}</p><p>{this.state.textData3}</p>
		<p>{this.state.textData4}</p><p>{this.state.textData5}</p><p>{this.state.textData6}</p>
        </div>

      </div>
    )
  }
}
export default App
