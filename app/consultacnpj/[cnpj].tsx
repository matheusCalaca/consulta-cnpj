import { StyleSheet, View, Text, Image, ScrollView, ActivityIndicator, Button, Dimensions, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import apiClient from '../../components/apiClient';  // Importar o cliente de API

export interface EmpresaDTO {
  uf: string;
  cep: string;
  qsa: SocioDTO[];
  cnpj: string;
  pais: string | null;
  email: string | null;
  porte: string;
  bairro: string;
  numero: string;
  ddd_fax: string;
  municipio: string;
  logradouro: string;
  cnae_fiscal: number;
  codigo_pais: string | null;
  complemento: string;
  codigo_porte: number;
  razao_social: string;
  nome_fantasia: string | null;
  capital_social: number;
  ddd_telefone_1: string;
  ddd_telefone_2: string | null;
  opcao_pelo_mei: boolean | null;
  descricao_porte: string | null;
  codigo_municipio: number;
  cnaes_secundarios: CnaeSecundarioDTO[];
  natureza_juridica: string;
  situacao_especial: string | null;
  opcao_pelo_simples: boolean | null;
  situacao_cadastral: number;
  data_opcao_pelo_mei: string | null;
  data_exclusao_do_mei: string | null;
  cnae_fiscal_descricao: string;
  codigo_municipio_ibge: number;
  data_inicio_atividade: string;
  data_situacao_especial: string | null;
  data_opcao_pelo_simples: string | null;
  data_situacao_cadastral: string;
  nome_cidade_no_exterior: string | null;
  codigo_natureza_juridica: number;
  data_exclusao_do_simples: string | null;
  motivo_situacao_cadastral: number;
  ente_federativo_responsavel: string | null;
  identificador_matriz_filial: number;
  qualificacao_do_responsavel: number;
  descricao_situacao_cadastral: string;
  descricao_tipo_de_logradouro: string;
  descricao_motivo_situacao_cadastral: string;
  descricao_identificador_matriz_filial: string;
}

export interface SocioDTO {
  pais: string | null;
  nome_socio: string;
  codigo_pais: string | null;
  faixa_etaria: string;
  cnpj_cpf_do_socio: string;
  qualificacao_socio: string;
  codigo_faixa_etaria: number;
  data_entrada_sociedade: string;
  identificador_de_socio: number;
  cpf_representante_legal: string;
  nome_representante_legal: string | null;
  codigo_qualificacao_socio: number;
  qualificacao_representante_legal: string;
  codigo_qualificacao_representante_legal: number;
}

export interface CnaeSecundarioDTO {
  codigo: number;
  descricao: string;
}


export default function ConsultaPdfCnpjScreen() {
  const { cnpj } = useLocalSearchParams<{ cnpj: string }>();
  const [data, setData] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: EmpresaDTO = await apiClient.getCNPJ(cnpj);
        setData(response);
        console.log(response);

        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os dados. Tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchData();
  }, [cnpj]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  const screenHeight = Dimensions.get('window').height;

  function formatCNPJ(cnpj: string | null): string {
    // Remove qualquer caractere que não seja número 
    if (cnpj == null) { return "Falaha"; }

    const cleaned = cnpj;
    // Formata o CNPJ 
    const formatted = cleaned.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    return formatted;
  }

  function formatDate(dateString: string | null): string {
    if (dateString == null) { return "Falaha"; }

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses são indexados a partir de 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  function formatCNAE(cnae: number | string): string {
    // Converte o número para string, se necessário
    const cnaeString = typeof cnae === 'number' ? cnae.toString() : cnae;

    // Remove qualquer caractere que não seja número
    const cleaned = cnaeString.replace(/\D/g, '');

    // Formata o CNAE
    const formatted = cleaned.replace(
      /^(\d{2})(\d{2})(\d)(\d{1})(\d{2})$/,
      '$1.$2-$3-$4$5'
    );

    return formatted;
  }

  function formatNaturezaJuridica(input: number | string): string {
    // Converte o número para string, se necessário
    const inputString = typeof input === 'number' ? input.toString() : input;

    // Formata o número
    const formatted = inputString.replace(/^(\d{3})(\d)$/, '$1-$2');

    return formatted;
  }

  function formatCEP(cep: number | string): string {
    // Converte o número para string, se necessário
    const cepString = typeof cep === 'number' ? cep.toString() : cep;

    // Remove qualquer caractere que não seja número
    const cleaned = cepString.replace(/\D/g, '');

    // Formata o CEP
    const formatted = cleaned.replace(/^(\d{2})(\d{3})(\d{3})$/, '$1.$2-$3');

    return formatted;
  }

  function formatPhoneNumber(phoneNumber: number | string): string {
    // Converte o número para string, se necessário
    const phoneString = typeof phoneNumber === 'number' ? phoneNumber.toString() : phoneNumber;

    // Remove qualquer caractere que não seja número
    const cleaned = phoneString.replace(/\D/g, '');

    // Formata o número de telefone
    const formatted = cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');

    return formatted;
  }

  const handleMaisInfo = () => {
    console.log(`../maisInfo/${data.cnpj}`);
    router.push(`../maisInfo/${data.cnpj}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} >
      <View style={styles.tableContainer}>
        {/* Cabeçalho */}
        <View style={styles.tableRow}>
          <View style={styles.tableCellBl110}>
            <View style={{ width: 60, height: 60 }}>
              <Image source={require('@/assets/images/brasao2.gif')} style={{ width: 60, height: 60 }} />
            </View>
          </View>
          <View style={{ flex: 0.05 }}></View>

          <View style={styles.tableCellBl180}>
            <Text style={styles.headerText}>REPÚBLICA FEDERATIVA DO BRASIL</Text>
            <Text style={styles.subHeaderText}>CADASTRO NACIONAL DA PESSOA JURÍDICA</Text>
          </View>
        </View>
        {/* Tabela de Informações */}

        <View style={{ height: 12 }}></View>


        {/* Linha 1 */}
        <View style={styles.tableRow}>
          <View style={{ flex: 0.24, paddingLeft: 5, paddingBottom: 5, }}>
            <Text style={styles.label}>NÚMERO DE INSCRIÇÃO</Text>
            <Text style={styles.value}>{formatCNPJ(data.cnpj)}</Text>
            <Text style={styles.value}>{data?.descricao_identificador_matriz_filial}</Text>
          </View>
          <View style={{ flex: 0.5, paddingLeft: 5, paddingBottom: 5, borderRightWidth: 1, borderLeftWidth: 1 }}>
            <Text style={styles.titleCenter}>COMPROVANTE DE INSCRIÇÃO E DE SITUAÇÃO CADASTRAL</Text>
          </View>
          <View style={{ flex: 0.24, paddingLeft: 5, paddingBottom: 5, }}>
            <Text style={styles.label}>DATA DE ABERTURA</Text>
            <Text style={styles.value}>{formatDate(data.data_inicio_atividade)}</Text>
          </View>
        </View>

        <View style={{ height: 12 }}></View>
        {/* Linha 2 */}
        <View style={styles.tableRow}>
          <View style={styles.tableCellFull}>
            <Text style={styles.label}>NOME EMPRESARIAL</Text>
            <Text style={styles.value}>{data.razao_social}</Text>
          </View>
        </View>
        <View style={{ height: 12 }}></View>

        {/* Linha 3 */}
        <View style={styles.tableRowBlCustom}>
          <View style={styles.tableCellHalfBl388}>
            <Text style={styles.label}>TÍTULO DO ESTABELECIMENTO (NOME DE FANTASIA)</Text>
            <Text style={styles.value}>{data.nome_fantasia ? data.nome_fantasia : "********"}</Text>
          </View>
          <View style={{ flex: 0.02 }}></View>
          <View style={styles.tableCellHalfBl310}>
            <Text style={styles.label}>PORTE</Text>
            <Text style={styles.valueCenter}>{data.porte}</Text>
          </View>
        </View>
        <View style={{ height: 12 }}></View>

        {/* Linha 4 */}
        <View style={styles.tableRow}>
          <View style={styles.tableCellFull}>
            <Text style={styles.label}>CÓDIGO E DESCRIÇÃO DA ATIVIDADE ECONÔMICA PRINCIPAL</Text>
            <Text style={styles.value}>{formatCNAE(data.cnae_fiscal)} - {data.cnae_fiscal_descricao}</Text>
          </View>
        </View>
        <View style={{ height: 12 }}></View>


        {/* Linha 5 */}
        <View style={styles.tableRow}>
          <View style={styles.tableCellFull}>
            <Text style={styles.label}>CÓDIGO E DESCRIÇÃO DAS ATIVIDADES ECONÔMICAS SECUNDÁRIAS</Text>
            {data.cnaes_secundarios.map((cnae: CnaeSecundarioDTO) => (
              <Text key={cnae.codigo} style={styles.value}>
                {formatCNAE(cnae.codigo)} - {cnae.descricao}
              </Text>
            ))}
          </View>
        </View>
        <View style={{ height: 12 }}></View>

        {/* Linha 6 */}
        <View style={styles.tableRow}>
          <View style={styles.tableCellFull}>
            <Text style={styles.label}>CÓDIGO E DESCRIÇÃO DA NATUREZA JURÍDICA</Text>
            <Text style={styles.value}>{formatNaturezaJuridica(data.codigo_natureza_juridica)} - {data.natureza_juridica}</Text>
          </View>
        </View>
        <View style={{ height: 12 }}></View>

        {/* Linha 7 */}
        <View style={styles.tableRowBlCustom}>
          <View style={styles.tableCellHalfBl750}>
            <Text style={styles.label}>LOGRADOURO</Text>
            <Text style={styles.value}>{data.descricao_tipo_de_logradouro} {data.logradouro}</Text>
          </View>
          <View style={{ flex: 0.02 }}></View>
          <View style={styles.tableCellHalfBl710}>
            <Text style={styles.label}>NÚMERO</Text>
            <Text style={styles.value}>{data.numero}</Text>
          </View>
          <View style={{ flex: 0.02 }}></View>
          <View style={styles.tableCellHalfBl736}>
            <Text style={styles.label}>COMPLEMENTO</Text>
            <Text style={styles.value}>{data.complemento}</Text>
          </View>
        </View>
        <View style={{ height: 12 }}></View>

        {/* Linha 8 */}
        <View style={styles.tableRowBlCustom}>
          <View style={styles.tableCellHalfBl818}>
            <Text style={styles.label}>CEP</Text>
            <Text style={styles.value}>{formatCEP(data.cep)}</Text>
          </View>
          <View style={{ flex: 0.02 }}></View>
          <View style={styles.tableCellHalfBl830}>
            <Text style={styles.label}>BAIRRO/DISTRITO</Text>
            <Text style={styles.value}>{data.bairro}</Text>
          </View>
          <View style={{ flex: 0.02 }}></View>
          <View style={styles.tableCellHalfBl838}>
            <Text style={styles.label}>MUNICÍPIO</Text>
            <Text style={styles.value}>{data.municipio}</Text>
          </View>
          <View style={{ flex: 0.02 }}></View>
          <View style={styles.tableCellHalfBl810}>
            <Text style={styles.label}>UF</Text>
            <Text style={styles.value}>{data.uf}</Text>
          </View>
        </View>

        <View style={{ height: 12 }}></View>

        {/* Linha 9 */}
        <View style={styles.tableRowBlCustom}>
          <View style={styles.tableCellHalf}>
            <Text style={styles.label}>ENDEREÇO ELETRÔNICO</Text>
            <Text style={styles.value}>{data.email}</Text>
          </View>
          <View style={{ flex: 0.02 }}></View>

          <View style={styles.tableCellHalf}>
            <Text style={styles.label}>TELEFONE</Text>
            <Text style={styles.value}>{formatPhoneNumber(data.ddd_telefone_1)}</Text>
          </View>
        </View>
        <View style={{ height: 12 }}></View>

        {/* Linha 10 */}
        <View style={styles.tableRow}>
          <View style={styles.tableCellFull}>
            <Text style={styles.label}>ENTE FEDERATIVO RESPONSÁVEL (EFR)</Text>
            <Text style={styles.value}>{data.ente_federativo_responsavel ? data.ente_federativo_responsavel : "*****"}</Text>
          </View>
        </View>
        <View style={{ height: 12 }}></View>

        {/* Linha 11 */}
        <View style={styles.tableRowBlCustom}>
          <View style={styles.tableCellHalfBl1164}>
            <Text style={styles.label}>SITUAÇÃO CADASTRAL</Text>
            <Text style={styles.value}>{data.situacao_cadastral}</Text>
          </View>
          <View style={{ flex: 0.02 }}></View>

          <View style={styles.tableCellHalfBl1124}>
            <Text style={styles.label}>DATA DA SITUAÇÃO CADASTRAL</Text>
            <Text style={styles.value}>{formatDate(data.data_situacao_cadastral)}</Text>
          </View>
        </View>

        <View style={{ height: 12 }}></View>
        {/* Linha 12 */}
        <View style={styles.tableRow}>
          <View style={styles.tableCellFull}>
            <Text style={styles.label}>MOTIVO DE SITUAÇÃO CADASTRAL</Text>
            <Text style={styles.value}>{data.motivo_situacao_cadastral}</Text>
          </View>
        </View>
        <View style={{ height: 12 }}></View>

        {/* Linha 13 */}
        <View style={styles.tableRowBlCustom}>
          <View style={styles.tableCellHalfBl1164}>
            <Text style={styles.label}>SITUAÇÃO ESPECIAL</Text>
            <Text style={styles.value}>{data.situacao_especial ? data.situacao_especial : "********"}</Text>
          </View>
          <View style={{ flex: 0.02 }}></View>

          <View style={styles.tableCellHalfBl1124}>
            <Text style={styles.label}>DATA DA SITUAÇÃO ESPECIAL</Text>
            <Text style={styles.value}>{data.data_situacao_especial ? formatDate(data.data_situacao_especial) : "********"}</Text>
          </View>
        </View>

      </View>

      {data.cnpj ?
        (<Button
          title="Mais Informações"
          onPress={handleMaisInfo}
        />)
        : ""}

      <View style={{ flex: 1, margin: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Text>----------------------------------- </Text>
      </View>


      <View style={styles.tableRow}>
        <View style={styles.tableCellFull}>
          <View style={{ height: 100 }}>
           
          </View>
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  tableContainer: {
    borderWidth: 1,
    padding: 10,
    borderColor: '#000',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRowBlCustom: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tableCellFull: {
    flex: 1,
    padding: 10,
  },
  tableCellHalfBl388: {
    flex: 0.88,
    borderWidth: 1,
    paddingLeft: 5,
    borderColor: '#000',
  },
  tableCellHalfBl310: {
    flex: 0.10,
    borderWidth: 1,
    paddingLeft: 5,
    borderColor: '#000',
  },
  tableCellHalf: {
    flex: 0.5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  tableCellBl110: {
    flex: 0.1,
    padding: 10,
  },
  tableCellBl180: {
    flex: 0.8,
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between'
  },
  tableCellHalfBl750: {
    flex: 0.5,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#000',
  }, tableCellHalfBl736: {
    flex: 0.36,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#000',
  }, tableCellHalfBl710: {
    flex: 0.1,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#000',
  }, tableCellHalfBl818: {
    flex: 0.18,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#000',
  }, tableCellHalfBl830: {
    flex: 0.30,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#000',
  }, tableCellHalfBl838: {
    flex: 0.38,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#000',
  }, tableCellHalfBl810: {
    flex: 0.1,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#000',
  }, tableCellHalfBl1164: {
    flex: 0.64,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#000',
  },
  tableCellHalfBl1124: {
    flex: 0.34,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#000',
  },
  label: {
    fontFamily: 'Arial', fontSize: 8
  },
  value: {
    fontSize: 10,
    fontWeight: 'bold',
  }, valueCenter: {
    fontSize: 10,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
  },
  trstile: {
    margin: 0,
    padding: 0,

  },
  imagFederation: {
  },
  fillAvailable: { width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between' },
  // tableRow: {
  //   flexDirection: 'row',
  //   borderWidth: 1,
  //   borderColor: '#000',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  // },
  tableCellQuarter: {
    flex: 0.25, // Cada coluna lateral ocupa 25% da linha
    padding: 8,
    // borderRightWidth: 1,
    // borderColor: '#000',
  },

  // tableCellHalf: {
  //   flex: 0.5, // A coluna central ocupa 50% da linha
  //   padding: 8,
  // },
  // label: {
  //   fontSize: 12,
  //   fontWeight: 'bold',
  //   textAlign: 'left',
  // },
  // value: {
  //   fontSize: 12,
  //   textAlign: 'left',
  // },
  titleCenter: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});