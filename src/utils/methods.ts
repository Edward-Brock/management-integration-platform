import instance from './request'

interface RequestOptions {
  params?: Record<string, any>
  data?: Record<string, any>
}

export async function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  options?: RequestOptions
): Promise<T> {
  try {
    let response

    switch (method) {
      case 'GET':
        response = await instance.get<T>(url, { params: options?.params })
        break
      case 'POST':
        response = await instance.post<T>(url, options?.data)
        break
      case 'PUT':
        response = await instance.put<T>(url, options?.data)
        break
      case 'PATCH':
        response = await instance.patch<T>(url, options?.data)
        break
      case 'DELETE':
        response = await instance.delete<T>(url, { params: options?.params })
        break
      default:
        throw new Error('Invalid HTTP method')
    }

    return response.data
  } catch (error) {
    console.error(`Error during ${method.toUpperCase()} request to ${url}:`, error)
    throw error
  }
}
