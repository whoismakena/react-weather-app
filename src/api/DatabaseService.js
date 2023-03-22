import React, { Component } from "react";
import axios from "axios";
import URLS from "../configurations/urls";

class DatabaseService extends Component {
  static settings = { url: URLS.BASE_URL };
  render() {
    return <div />;
  }

  static async GET(endpoint) {
    try {
      const response = await axios.get(this.settings.url + endpoint);
      return response.data;
    } catch (error) {
      throw this.errorHandler(error);
    }
  }

  static errorHandler(error) {
    let errorMessage;
    if (error.response) errorMessage = error.response.data;
    else if (error.request) errorMessage = error.message;
    else errorMessage = "System error" + error.message;
    return errorMessage;
  }
}

export default DatabaseService;
