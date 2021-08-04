import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write your terraform configuration here!',
      uuid: "random_uuid"
    };

    this.setCookie();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      console.log("OMAR RESPONSE");
      console.log(response);
    })
    .catch((error) => {
      console.log("OMAR ERROR");
      console.error(error);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <textarea cols="100" rows="50" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Form;
