import instance from './request'
import axios from 'axios'

interface RequestOptions {
  params?: Record<string, any>
  data?: Record<string, any>
  headers?: Record<string, string>
}

export async function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  try {
    let response

    switch (method) {
      case 'GET':
        response = await instance.get<T>(url, { params: options.params, headers: options.headers })
        break
      case 'POST':
        response = await instance.post<T>(url, options.data, { headers: options.headers })
        break
      case 'PUT':
        response = await instance.put<T>(url, options.data, { headers: options.headers })
        break
      case 'PATCH':
        response = await instance.patch<T>(url, options.data, { headers: options.headers })
        break
      case 'DELETE':
        response = await instance.delete<T>(url, {
          params: options.params,
          headers: options.headers
        })
        break
      default:
        throw new Error('Invalid HTTP method')
    }

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Axios error during ${method.toUpperCase()} request to ${url}:`,
        error.response?.data || error.message
      )
    } else {
      console.error(`Unexpected error during ${method.toUpperCase()} request to ${url}:`, error)
    }
    throw error
  }
}
