// lib/api/clients/apiClient.ts
export const apiClient = {
  async get<T>(url: string): Promise<T> {
    const accessToken = localStorage.getItem("accessToken")
    let headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    }
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`
    }

    const response = await fetch(url, {
      method: "GET",
      headers
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return response.json() as Promise<T>
  },

  async post<T, U>(url: string, data: U): Promise<T> {
    const accessToken = localStorage.getItem("accessToken")
    let headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    }
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      console.log(new Error(`HTTP error! Status: ${response.status}`))
    }
    return response.json() as Promise<T>
  },

  async put<T, U>(url: string, data: U): Promise<T> {
    const accessToken = localStorage.getItem("accessToken")
    let headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    }
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`
    }

    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return response.json() as Promise<T>
  },

  async delete<T>(url: string): Promise<boolean> {
    const accessToken = localStorage.getItem("accessToken")
    let headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    }
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`
    }

    const response = await fetch(url, {
      method: "DELETE",
      headers,
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return response.ok
  },
}
