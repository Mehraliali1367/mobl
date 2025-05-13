const mainUrl = "http://web:8000/api";

const getFetch = async (url, headers = {}) => {
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
};

const postFetch = async (url, body, headers = {}) => {
  const request = await fetch(`${mainUrl}${url}`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ,
  });
  // console.log(request);
  const response = await request.json();
  return { status_code: request.status, response: response };
};

const putFetch = async (url, body, headers = {}) => {
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
};
const deleteFetch = async (url, body, headers = {}) => {
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
};

export { getFetch, postFetch, putFetch, deleteFetch };
