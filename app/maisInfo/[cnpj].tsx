import { StyleSheet, View, Text, Image, ScrollView, ActivityIndicator, Button, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import apiClient from '../../components/apiClient';  // Importar o cliente de API


interface Socio {
  nome_socio: string;
  qualificacao_socio: string;
  faixa_etaria: string;
}

interface CNPJData {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string | null;
  descricao_situacao_cadastral: string;
  uf: string;
  municipio: string;
  bairro: string;
  logradouro: string;
  numero: string;
  cep: string;
  ddd_telefone_1: string;
  qsa: Socio[];
}

interface ResultScreenProps {
  route: {
    params: { cnpj: string };
  };
}

export default function MaisInfoCnpjScreen() {
  const { cnpj } = useLocalSearchParams<{ cnpj: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.getCNPJ(cnpj);
        setData(response);
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


  return (
    <ScrollView contentContainerStyle={styles.container} style={{ height: screenHeight * 0.8 }}>
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
            <Text style={styles.value}>08.561.701/0001-01</Text>
            <Text style={styles.value}>MATRIZ</Text>
          </View>
          <View style={{ flex: 0.5, paddingLeft: 5, paddingBottom: 5, borderRightWidth: 1, borderLeftWidth: 1 }}>
            <Text style={styles.titleCenter}>COMPROVANTE DE INSCRIÇÃO E DE SITUAÇÃO CADASTRAL</Text>
          </View>
          <View style={{ flex: 0.24, paddingLeft: 5, paddingBottom: 5, }}>
            <Text style={styles.label}>DATA DE ABERTURA</Text>
            <Text style={styles.value}>20/12/2006</Text>
          </View>
        </View>

        <View style={{ height: 12 }}></View>
        {/* Linha 2 */}
        <View style={styles.tableRow}>
          <View style={styles.tableCellFull}>
            <Text style={styles.label}>NOME EMPRESARIAL</Text>
            <Text style={styles.value}>PAGSEGURO INTERNET INSTITUICAO DE PAGAMENTO S.A.</Text>
          </View>
        </View>
        <View style={{ height: 12 }}></View>

        {/* Linha 3 */}
        <View style={styles.tableRowBlCustom}>
          <View style={styles.tableCellHalfBl388}>
            <Text style={styles.label}>TÍTULO DO ESTABELECIMENTO (NOME DE FANTASIA)</Text>
            <Text style={styles.value}>********</Text>
          </View>
          <View style={{ flex: 0.02 }}></View>
          <View style={styles.tableCellHalfBl310}>
            <Text style={styles.label}>PORTE</Text>
            <Text style={styles.valueCenter}>DEMAIS</Text>
          </View>
        </View>
        <View style={{ height: 12 }}></View>

        {/* Linha 4 */}
        <View style={styles.tableRow}>
          <View style={styles.tableCellFull}>
            <Text style={styles.label}>CÓDIGO E DESCRIÇÃO DA ATIVIDADE ECONÔMICA PRINCIPAL</Text>
            <Text style={styles.value}>66.19-3-99 - Outras atividades auxiliares dos serviços financeiros não especificadas anteriormente</Text>
          </View>
        </View>
        <View style={{ height: 12 }}></View>


        {/* Linha 5 */}
        <View style={styles.tableRow}>
          <View style={styles.tableCellFull}>
            <Text style={styles.label}>CÓDIGO E DESCRIÇÃO DAS ATIVIDADES ECONÔMICAS SECUNDÁRIAS</Text>
            <Text style={styles.value}>
              62.03-1-00 - Desenvolvimento e licenciamento de programas de computador não-customizáveis

            </Text>
            <Text style={styles.value}>
              64.24-7-03 - Cooperativas de crédito mútuo
            </Text>
            <Text style={styles.value}>
              64.63-8-00 - Outras sociedades de participação, exceto holdings
            </Text>
            <Text style={styles.value}>
              66.19-3-02 - Correspondentes de instituições financeiras
            </Text>
            <Text style={styles.value}>
              74.90-1-04 - Atividades de intermediação e agenciamento de serviços e negócios em geral, exceto imobiliários
            </Text>
            <Text style={styles.value}>
              82.11-3-00 - Serviços combinados de escritório e apoio administrativo
            </Text>
            <Text style={styles.value}>
              82.91-1-00 - Atividades de cobranças e informações cadastrais
            </Text>
            <Text style={styles.value}>
              82.99-7-02 - Emissão de vales-alimentação, vales-transporte e similares
            </Text>
            <Text style={styles.value}>
              82.99-7-99 - Outras atividades de serviços prestados principalmente às empresas não especificadas anteriormente
            </Text>

          </View>
        </View>
        <View style={{ height: 12 }}></View>

        {/* Linha 6 */}
        <View style={styles.tableRow}>
          <View style={styles.tableCellFull}>
            <Text style={styles.label}>CÓDIGO E DESCRIÇÃO DA NATUREZA JURÍDICA</Text>
            <Text style={styles.value}>205-4 - Sociedade Anônima Fechada</Text>
          </View>
        </View>
        <View style={{ height: 12 }}></View>

        {/* Linha 7 */}
        <View style={styles.tableRowBlCustom}>
          <View style={styles.tableCellHalfBl750}>
            <Text style={styles.label}>LOGRADOURO</Text>
            <Text style={styles.value}>AV BRIG FARIA LIMA</Text>
          </View>
          <View style={{ flex: 0.02 }}></View>
          <View style={styles.tableCellHalfBl710}>
            <Text style={styles.label}>NÚMERO</Text>
            <Text style={styles.value}>1384</Text>
          </View>
          <View style={{ flex: 0.02 }}></View>
          <View style={styles.tableCellHalfBl736}>
            <Text style={styles.label}>COMPLEMENTO</Text>
            <Text style={styles.value}>ANDAR 1 AO 10 MZNINOE SALAO</Text>
          </View>
        </View>
        <View style={{ height: 12 }}></View>

        {/* Linha 8 */}
        <View style={styles.tableRowBlCustom}>
          <View style={styles.tableCellHalfBl818}>
            <Text style={styles.label}>CEP</Text>
            <Text style={styles.value}>01.451-001</Text>
          </View>
          <View style={{ flex: 0.02 }}></View>
          <View style={styles.tableCellHalfBl830}>
            <Text style={styles.label}>BAIRRO/DISTRITO</Text>
            <Text style={styles.value}>JARDIM PAULISTANO</Text>
          </View>
          <View style={{ flex: 0.02 }}></View>
          <View style={styles.tableCellHalfBl838}>
            <Text style={styles.label}>MUNICÍPIO</Text>
            <Text style={styles.value}>SAO PAULO</Text>
          </View>
          <View style={{ flex: 0.02 }}></View>
          <View style={styles.tableCellHalfBl810}>
            <Text style={styles.label}>UF</Text>
            <Text style={styles.value}>SP</Text>
          </View>
        </View>

        <View style={{ height: 12 }}></View>

        {/* Linha 9 */}
        <View style={styles.tableRowBlCustom}>
          <View style={styles.tableCellHalf}>
            <Text style={styles.label}>ENDEREÇO ELETRÔNICO</Text>
            <Text style={styles.value}>L-PAGSEGURO-PARALEGAL@UOLINC.COM</Text>
          </View>
          <View style={{ flex: 0.02 }}></View>

          <View style={styles.tableCellHalf}>
            <Text style={styles.label}>TELEFONE</Text>
            <Text style={styles.value}>(11) 3339-6300</Text>
          </View>
        </View>
        <View style={{ height: 12 }}></View>

        {/* Linha 10 */}
        <View style={styles.tableRow}>
          <View style={styles.tableCellFull}>
            <Text style={styles.label}>ENTE FEDERATIVO RESPONSÁVEL (EFR)</Text>
            <Text style={styles.value}>*****
            </Text>
          </View>
        </View>
        <View style={{ height: 12 }}></View>

        {/* Linha 11 */}
        <View style={styles.tableRowBlCustom}>
          <View style={styles.tableCellHalfBl1164}>
            <Text style={styles.label}>SITUAÇÃO CADASTRAL</Text>
            <Text style={styles.value}>ATIVA</Text>
          </View>
          <View style={{ flex: 0.02 }}></View>

          <View style={styles.tableCellHalfBl1124}>
            <Text style={styles.label}>DATA DA SITUAÇÃO CADASTRAL</Text>
            <Text style={styles.value}>20/12/2006</Text>
          </View>
        </View>

        <View style={{ height: 12 }}></View>
        {/* Linha 12 */}
        <View style={styles.tableRow}>
          <View style={styles.tableCellFull}>
            <Text style={styles.label}>MOTIVO DE SITUAÇÃO CADASTRAL</Text>
            <Text style={styles.value}></Text>
          </View>
        </View>
        <View style={{ height: 12 }}></View>

        {/* Linha 13 */}
        <View style={styles.tableRowBlCustom}>
          <View style={styles.tableCellHalfBl1164}>
            <Text style={styles.label}>SITUAÇÃO ESPECIAL</Text>
            <Text style={styles.value}>********</Text>
          </View>
          <View style={{ flex: 0.02 }}></View>

          <View style={styles.tableCellHalfBl1124}>
            <Text style={styles.label}>DATA DA SITUAÇÃO ESPECIAL</Text>
            <Text style={styles.value}>********</Text>
          </View>
        </View>

      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Aprovado pela Instrução Normativa RFB nº 2.119, de 06 de dezembro de 2022.</Text>
        <Text style={styles.footerText}>Emitido no dia 17/12/2024 às 22:12:45 (data e hora de Brasília). Página: 1/1</Text>
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