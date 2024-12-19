import { StyleSheet, View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import apiClient from '../../components/apiClient';  // Importar o cliente de API


type Qsa = {
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
  nome_representante_legal: string;
  codigo_qualificacao_socio: number;
  qualificacao_representante_legal: string;
  codigo_qualificacao_representante_legal: number;
};

type CnaeSecundario = {
  codigo: number;
  descricao: string;
};

type CNPJData = {
  uf: string;
  cep: string;
  qsa: Qsa[];
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
  nome_fantasia: string;
  capital_social: number;
  ddd_telefone_1: string;
  ddd_telefone_2: string | null;
  opcao_pelo_mei: string | null;
  descricao_porte: string;
  codigo_municipio: number;
  cnaes_secundarios: CnaeSecundario[];
  natureza_juridica: string;
  situacao_especial: string;
  opcao_pelo_simples: string | null;
  situacao_cadastral: number;
  data_opcao_pelo_mei: string | null;
  data_exclusao_do_mei: string | null;
  cnae_fiscal_descricao: string;
  codigo_municipio_ibge: number;
  data_inicio_atividade: string;
  data_situacao_especial: string | null;
  data_opcao_pelo_simples: string | null;
  data_situacao_cadastral: string;
  nome_cidade_no_exterior: string;
  codigo_natureza_juridica: number;
  data_exclusao_do_simples: string | null;
  motivo_situacao_cadastral: number;
  ente_federativo_responsavel: string;
  identificador_matriz_filial: number;
  qualificacao_do_responsavel: number;
  descricao_situacao_cadastral: string;
  descricao_tipo_de_logradouro: string;
  descricao_motivo_situacao_cadastral: string;
  descricao_identificador_matriz_filial: string;
};


export default function MaisInfoCnpjScreen() {
  const { cnpj } = useLocalSearchParams<{ cnpj: string }>();
  const [data, setData] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: CNPJData = await apiClient.getCNPJ(cnpj);  // Usando a classe ApiClient
        console.log(response)
        setData(response);
      } catch (err) {
        setError('Erro ao consultar o CNPJ');
      } finally {
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

  const headercss = (isActive: boolean) => ({
    backgroundColor: isActive ? 'green' : 'red',
    padding: 15,
  });

  return (
    <ScrollView style={styles.container}>
      <View style={headercss(data.descricao_situacao_cadastral === 'ATIVA')}>
        <Text><Text style={{ fontWeight: 'bold', }}>Razão Social:</Text> {data.razao_social}</Text>
        <Text style={styles.headerText}><Text style={{ fontWeight: 'bold', }}>CNPJ:</Text> {data.cnpj}</Text>
        <Text style={styles.headerText}><Text style={{ fontWeight: 'bold', }}>Situação:</Text> {data.descricao_situacao_cadastral}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Informações Básicas</Text>
        <Text><Text style={{ fontWeight: 'bold', }}>Razão Social:</Text> {data.razao_social}</Text>
        <Text><Text style={{ fontWeight: 'bold', }}>Nome Fantasia:</Text> {data.nome_fantasia || '*****'}</Text>
        <Text><Text style={{ fontWeight: 'bold', }}>Natureza Jurídica:</Text> {data.natureza_juridica}</Text>
        <Text><Text style={{ fontWeight: 'bold', }}>Capital Social:</Text>  R$ {data.capital_social.toLocaleString()}</Text>
      </View>
      <View style={styles.section}>
        <Text><Text style={{ fontWeight: 'bold', }}>Logradouro:</Text> {data.logradouro}</Text>
        <Text><Text style={{ fontWeight: 'bold', }}>Número:</Text> {data.numero}</Text>
        <Text><Text style={{ fontWeight: 'bold', }}>Complemento:</Text> {data.complemento || '*****'}</Text>
        <Text><Text style={{ fontWeight: 'bold', }}>Bairro:</Text> {data.bairro}</Text>
        <Text><Text style={{ fontWeight: 'bold', }}>Município:</Text> {data.municipio}</Text>
        <Text><Text style={{ fontWeight: 'bold', }}>UF: </Text>{data.uf}</Text>
        <Text><Text style={{ fontWeight: 'bold', }}>CEP:</Text> {data.cep}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Contato</Text>
        <Text><Text style={{ fontWeight: 'bold', }}>Telefone:</Text> {data.ddd_telefone_1}</Text>
        <Text><Text style={{ fontWeight: 'bold', }}>Fax:</Text> {data.ddd_fax}</Text>
        <Text><Text style={{ fontWeight: 'bold', }}>Email:</Text> {data.email || '*****'}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Atividades</Text>
        <View style={{ margin: 5 }}></View>
        <Text><Text style={{ fontWeight: 'bold', }}>Atividade Principal: </Text> {data.cnae_fiscal} - {data.cnae_fiscal_descricao}</Text>
        <View style={{ flex: 1, margin: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text>----------------------------------- </Text>
        </View>
        {data.cnaes_secundarios.map((cnae: CnaeSecundario, index: number) => (
          <Text key={index}><Text style={{ fontWeight: 'bold', }}>Secundária:</Text> {cnae.codigo} - {cnae.descricao}</Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Quadro Societário</Text>
        <View style={{ margin: 5 }}></View>
        {data.qsa.map((socio: Qsa, index: number) => (
          <View key={index} style={styles.socioContainer}>
            <Text><Text style={{ fontWeight: 'bold' }}>Nome:</Text> {socio.nome_socio}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>CPF/CNPJ:</Text> {socio.cnpj_cpf_do_socio || '*****'}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Qualificação:</Text> {socio.qualificacao_socio}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Faixa Etária:</Text> {socio.faixa_etaria}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Data de Entrada:</Text> {socio.data_entrada_sociedade}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>País:</Text> {socio.pais || '*****'}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Código do País:</Text> {socio.codigo_pais || '*****'}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Identificador de Sócio:</Text> {socio.identificador_de_socio}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>CPF Representante Legal:</Text> {socio.cpf_representante_legal || '*****'}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Nome Representante Legal:</Text> {socio.nome_representante_legal || '*****'}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Qualificação Representante Legal:</Text> {socio.qualificacao_representante_legal}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Código Qualificação Representante Legal:</Text> {socio.codigo_qualificacao_representante_legal}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  headerText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  socioContainer: {
    marginBottom: 10,
  },
});
