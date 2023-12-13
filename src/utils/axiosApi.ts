import axios, { AxiosRequestConfig } from "axios";

class AxiosAPI {
  private baseURL: string | undefined;
  private isLoading: boolean;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || process.env.NEXT_PUBLIC_BACKEND_URL;
    this.isLoading = false;
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      this.isLoading = true;
      const response = await axios(config);
      this.isLoading = false;
      return response.data as any;
    } catch (error) {
      this.isLoading = false;
      throw error;
    }
  }

  public isLoadingStatus(): boolean {
    return this.isLoading;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: "get",
      url: `${this.baseURL}${url}`,
    });
  }

  public async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>({
      ...config,
      method: "post",
      url: `${this.baseURL}${url}`,
      data,
    });
  }

  public async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>({
      ...config,
      method: "put",
      url: `${this.baseURL}${url}`,
      data,
    });
  }

  public async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>({
      ...config,
      method: "patch",
      url: `${this.baseURL}${url}`,
      data,
    });
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: "delete",
      url: `${this.baseURL}${url}`,
    });
  }
}

export default AxiosAPI;