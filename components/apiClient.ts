import axios, { AxiosInstance } from 'axios';

class ApiClient {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://brasilapi.com.br/api/cnpj/v1/',  // Defina a URL base para a API
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Método GET para consultar a API com CNPJ
  public async getCNPJ(cnpj: string) {
    try {
      const response = await this.api.get(`/${cnpj}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar CNPJ:", error);
      throw error;
    }
  }
}

const apiClient = new ApiClient();
export default apiClient;
