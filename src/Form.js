import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      value: 'Please write your terraform configuration here!',
      uuid: this.uuidv4()
    };

    this.setCookie();
    if (this.isShare()) {
      this.setValueFromParam()
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isShare() {
    var param = window.location.search.substr(1);
    console.log(param);
    if (param !== "") {
      return true
    }
    return false
  }

  setValueFromParam() {
    var param = window.location.search.substr(1);
    var keys = param.split("=");
    console.log(keys)
    var uuid = keys[1];
    console.log(uuid);
    //var value = PLAYGROUND_CONFIG.get(uuid)
    //this.uuid = uuid;
  }

  setCookie() {
    var obj = this.cookieObj()
    if (obj.uuid === undefined || obj.uuid === null || obj.uuid === "") {
      console.log("COOKIE")
      var newUUID = this.uuidv4()
      var newCookie = `uuid=${newUUID}; ${document.cookie}`
      document.cookie = newCookie
    }
  }

  getCookie() {
    this.setCookie()
    return document.cookie
  }

  cookieObj() {
    return document.cookie.split('; ').reduce((prev, current) => {
      const [name, ...value] = current.split('=');
      prev[name] = value.join('=');
      return prev;
    }, {});
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.cook = this.getCookie()
    this.config = this.state.value;
    this.uuid = this.state.uuid;
    fetch(`https://tf-playground-golang-jkhsr.ondigitalocean.app/apply/${this.uuid}`, {
      method: 'post',
      mode: 'no-cors',
      headers: {
        //"Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        //"Access-Control-Allow-Headers": "Accept",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        config: this.config,
      })
    })
    .then((response) => {
      return response.json()
    })
    .then((responseData) => {
      console.log("OMAR RESPONSE");
      console.log(responseData);
    })
    .catch((error) => {
      console.log("OMAR ERROR");
      console.error(error);
    });
  }

  render() {
    return (
      <div>
        <div className="App-form">
          <form onSubmit={this.handleSubmit}>
            <label>
              <textarea cols="100" rows="50" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="App-output">
          <p>Run: {this.runID}</p>
          <p>Output: {this.outputs}</p>
        </div>
      </div>
    );
  }
}

export default Form;
