const url = 'http://localhost:5000/'

export interface HttpResponse {
  status: number;
  body: string;
}

export type RequestParameters = {
  url: string;
  headers?: {
    [s: string]: string;
  };
  token?: string;
}

export type PostRequestParameters = {
  payload?: { [key: string]: any };
} & RequestParameters

export const api = {
  async get(parameters: RequestParameters): Promise<HttpResponse> {
    let headers = {}
    if (parameters.token) {
      headers = {
        ...headers,
        Accept: 'application/json; charset=UTF-8',
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${parameters.token}`
      }
    }
    const response = await fetch(`${url}${parameters.url}`, {
      headers
    })

    if (response.status === 401) {
      throw Error('Forbidden')
    }

    return {
      status: response.status,
      body: await response.text(),
    }
  },

  async post(parameters: PostRequestParameters): Promise<HttpResponse> {
    let headers = {}
    if (parameters.token) {
      headers = {
        ...parameters.headers,
        Authorization: `Bearer ${parameters.token}`
      }
    }
    const response = await fetch(`${url}${parameters.url}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json; charset=UTF-8',
        'Content-Type': 'application/json; charset=UTF-8',
        ...headers,
      },
      body: JSON.stringify(parameters.payload),
    })

    if (response.status === 401) {
      throw Error('Forbidden')
    }

    return {
      status: response.status,
      body: await response.text(),
    }
  },

  async put(parameters: PostRequestParameters): Promise<HttpResponse> {
    let headers = {}
    if (parameters.token) {
      headers = {
        ...parameters.headers,
        Authorization: `Bearer ${parameters.token}`
      }
    }
    const response = await fetch(`${url}${parameters.url}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json; charset=UTF-8',
        'Content-Type': 'application/json; charset=UTF-8',
        ...headers,
      },
      body: JSON.stringify(parameters.payload),
    })

    if (response.status === 401) {
      throw Error('Forbidden')
    }

    return {
      status: response.status,
      body: await response.text(),
    }
  },

  async delete(parameters: RequestParameters): Promise<HttpResponse> {
    let headers = {}
    if (parameters.token) {
      headers = {
        ...parameters.headers,
        Authorization: `Bearer ${parameters.token}`
      }
    }
    const response = await fetch(`${url}${parameters.url}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json; charset=UTF-8',
        'Content-Type': 'application/json; charset=UTF-8',
        ...headers,
      },
    })

    if (response.status === 401) {
      throw Error('Forbidden')
    }

    return {
      status: response.status,
      body: await response.text(),
    }
  },
}
