// DataFormatters.ts
export class DataFormatters {

    static formatCNPJ(cnpj: string | null): string {
      if (cnpj == null) { return "Falaha"; }
      const cleaned = cnpj;
      const formatted = cleaned.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
      return formatted;
    }
  
    static formatDate(dateString: string | null): string {
      if (dateString == null) { return "Falaha"; }
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  
    static formatCNAE(input: number | string): string {
      const inputString = typeof input === 'number' ? input.toString() : input;
      const cleaned = inputString.replace(/\D/g, '');
      const formatted = cleaned.replace(/^(\d)(\d{2})(\d{2})(\d{2})$/, '$1.$2-$3-$4');
      return formatted;
    }
  
    static formatNaturezaJuridica(input: number | string): string {
      const inputString = typeof input === 'number' ? input.toString() : input;
      const formatted = inputString.replace(/^(\d{3})(\d)$/, '$1-$2');
      return formatted;
    }
  
    static formatCEP(cep: number | string): string {
      const cepString = typeof cep === 'number' ? cep.toString() : cep;
      const cleaned = cepString.replace(/\D/g, '');
      const formatted = cleaned.replace(/^(\d{2})(\d{3})(\d{3})$/, '$1.$2-$3');
      return formatted;
    }
  
    static formatPhoneNumber(phoneNumber: number | string): string {
      const phoneString = typeof phoneNumber === 'number' ? phoneNumber.toString() : phoneNumber;
      const cleaned = phoneString.replace(/\D/g, '');
      const formatted = cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
      return formatted;
    }
  }
  