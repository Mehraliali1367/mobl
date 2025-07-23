const mainUrl = "http://37.152.180.252:8000/api";
// const mainUrl = "http://localhost:8000/api";

const getFetch = async (url, headers = {}) => {
  try {
    if(url.startsWith('http')||url.startsWith('https')){
      const temp = url.split('api')
      url=temp[1]
      console.log("url: "+ url )
    }
    const request = await fetch(`${mainUrl}${url}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    const response = await request.json();
    // console.log(response);
    return { status_code: request.status, response: response };
  } catch (error) {
    // console.log(error);
    console.log("event error in post to address " + url);
    return {status_code: 400}
  }
};

const postFetch = async (url, body, headers = {}) => {
  try {
    const request = await fetch(`${mainUrl}${url}`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body,
    });
    // console.log(request);
    const response = await request.json();
    return { status_code: request.status, response: response };
  } catch (error) {
    // console.log(error);
    console.log("event error in post to address " + url);
    return {status_code: 400}
  }
};

const putFetch = async (url, body, headers = {}) => {
  try {
    const request = await fetch(`${mainUrl}${url}`, {
      method: "PUT",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body,
    });
    const response = await request.json();
    // console.log(response);
    // console.log(request.status);
    return { status_code: request.status, response: response };
  } catch (error) {
    // console.log(error);
    console.log("event error in post to address " + url);
    return {status_code: 400}
  }
};
const deleteFetch = async (url, body, headers = {}) => {
  try {
    const request = await fetch(`${mainUrl}${url}`, {
      method: "DELETE",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body,
    });
    const response = await request.json();
    // console.log(response);
    // console.log(request.status);
    return { status_code: request.status, response: response };
  } catch (error) {
    // console.log(error);
    console.log("event error in post to address " + url);
    return {status_code: 400}
  }
};

export { getFetch, postFetch, putFetch, deleteFetch };
