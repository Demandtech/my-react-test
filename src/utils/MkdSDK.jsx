export default function MkdSDK() {
  this._baseurl = "https://reacttask.mkdlabs.com";
  this._project_id = "reacttask";
  this._secret = "d9hedycyv6p7zw8xi34t9bmtsjsigy5t7";
  this._table = "";
  this._custom = "";
  this._method = "";

  const raw = this._project_id + ":" + this._secret;
  let base64Encode = btoa(raw);

  this.setTable = function (table) {
    this._table = table;
  };

  this.login = async function (email, password, role) {
    //TODO
    const payload = { email, password, role };

    try {
      const headers = {
        "Content-Type": "application/json",
        "x-project": base64Encode,
      };

      const response = await fetch(`${this._baseurl}/v2/api/lambda/login`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorMessage = `Error: ${response.status} - ${response.statusText}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      const jsonResponse = await response.json();

      if (!jsonResponse.token || !jsonResponse.role) {
        const errorMessage = "Invalid response: Missing token or role.";
        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      localStorage.setItem("token", jsonResponse.token);
      localStorage.setItem("role", jsonResponse.role);

      return jsonResponse;
    } catch (error) {
      console.log(error);
      console.error("Login failed: ", error.message);
      throw error;
    }
  };

  this.getHeader = function () {
    return {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "x-project": base64Encode,
    };
  };

  this.baseUrl = function () {
    return this._baseurl;
  };

  this.callRestAPI = async function (payload, method) {
    const header = {
      "Content-Type": "application/json",
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    switch (method) {
      case "GET":
        const getResult = await fetch(
          this._baseurl + `/v1/api/rest/${this._table}/GET`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify(payload),
          }
        );
        const jsonGet = await getResult.json();

        if (getResult.status === 401) {
          throw new Error(jsonGet.message);
        }

        if (getResult.status === 403) {
          throw new Error(jsonGet.message);
        }
        return jsonGet;

      case "PAGINATE":
        if (!payload.page) {
          payload.page = 1;
        }
        if (!payload.limit) {
          payload.limit = 10;
        }
        const paginateResult = await fetch(
          this._baseurl + `/v1/api/rest/video/${method}`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify(payload),
          }
        );

        const jsonPaginate = await paginateResult.json();

        if (paginateResult.status === 401) {
          throw new Error(jsonPaginate.message);
        }

        if (paginateResult.status === 403) {
          throw new Error(jsonPaginate.message);
        }
        return jsonPaginate;
      default:
        break;
    }
  };

  this.check = async function (role) {
	// TODO
    const headers = this.getHeader(); 
    try {
        const response = await fetch(`${this._baseurl}/v2/api/lambda/check`, {
            method: "POST",
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ role }),
        });

        if (!response.ok) {
            const errorMessage = `Error: ${response.status} - ${response.statusText}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }

        const checkResult = await response.json();

        if (!checkResult || typeof checkResult !== 'object') {
            const errorMessage = "Invalid response: Expected an object.";
            console.error(errorMessage);
            throw new Error(errorMessage);
        }

        return checkResult;
    } catch (error) {
      
        console.error("Check operation failed: ", error.message);
        throw error;
    }
};


  return this;
}
