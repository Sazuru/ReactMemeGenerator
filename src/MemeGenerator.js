import React, { Component } from "react";

class MemeGenerator extends Component {
  constructor(params) {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data;
        console.log(memes[0]);
        this.setState({ allMemeImgs: memes });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const randMemeImg = this.state.allMemeImgs[randNum].url;
    this.setState({ randomImg: randMemeImg });
  }

  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          {
            <>
              <input
                type="text"
                name="topText"
                value={this.state.topText}
                onChange={this.handleChange}
                placeholder="Top Text"
              />
              <br />
              <input
                type="text"
                name="bottomText"
                value={this.state.bottomText}
                onChange={this.handleChange}
                placeholder="Bottom Text"
              />
              <br />
            </>
          }

          <button>Gen</button>
        </form>
        <div className="meme">
          <img align="center" src={this.state.randomImg} alt="Random meme" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
