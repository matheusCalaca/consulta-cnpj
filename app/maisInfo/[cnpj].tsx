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
        console.log(response);
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={styles.purpleDark.color} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const headercss = (isActive: boolean) => ({
    backgroundColor: isActive ? 'green' : 'red',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  });

  return (
    <ScrollView style={styles.container}>
      <View style={headercss(data.descricao_situacao_cadastral === 'ATIVA')}>
        <Text style={styles.headerText}><Text style={styles.boldText}>Razão Social:</Text> {data.razao_social}</Text>
        <Text style={styles.headerText}><Text style={styles.boldText}>CNPJ:</Text> {data.cnpj}</Text>
        <Text style={styles.headerText}><Text style={styles.boldText}>Situação:</Text> {data.descricao_situacao_cadastral}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Informações Básicas</Text>
        <Text><Text style={styles.boldText}>Razão Social:</Text> {data.razao_social}</Text>
        <Text><Text style={styles.boldText}>Nome Fantasia:</Text> {data.nome_fantasia || '*****'}</Text>
        <Text><Text style={styles.boldText}>Natureza Jurídica:</Text> {data.natureza_juridica}</Text>
        <Text><Text style={styles.boldText}>Capital Social:</Text>  R$ {data.capital_social ? data.capital_social.toLocaleString() : "******"}</Text>
      </View>
      <View style={styles.section}>
        <Text><Text style={styles.boldText}>Logradouro:</Text> {data.logradouro}</Text>
        <Text><Text style={styles.boldText}>Número:</Text> {data.numero}</Text>
        <Text><Text style={styles.boldText}>Complemento:</Text> {data.complemento || '*****'}</Text>
        <Text><Text style={styles.boldText}>Bairro:</Text> {data.bairro}</Text>
        <Text><Text style={styles.boldText}>Município:</Text> {data.municipio}</Text>
        <Text><Text style={styles.boldText}>UF: </Text>{data.uf}</Text>
        <Text><Text style={styles.boldText}>CEP:</Text> {data.cep}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Contato</Text>
        <Text><Text style={styles.boldText}>Telefone:</Text> {data.ddd_telefone_1}</Text>
        <Text><Text style={styles.boldText}>Fax:</Text> {data.ddd_fax}</Text>
        <Text><Text style={styles.boldText}>Email:</Text> {data.email || '*****'}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Atividades</Text>
        <View style={{ margin: 5 }}></View>
        <Text><Text style={styles.boldText}>Atividade Principal: </Text> {data.cnae_fiscal} - {data.cnae_fiscal_descricao}</Text>
        <View style={styles.divider}></View>
        {data.cnaes_secundarios.map((cnae: CnaeSecundario, index: number) => (
          <Text key={index}><Text style={styles.boldText}>Secundária:</Text> {cnae.codigo} - {cnae.descricao}</Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Quadro Societário</Text>
        <View style={{ margin: 5 }}></View>
        {data.qsa.map((socio: Qsa, index: number) => (
          <View key={index} style={styles.socioContainer}>
            <Text><Text style={styles.boldText}>Nome:</Text> {socio.nome_socio}</Text>
            <Text><Text style={styles.boldText}>CPF/CNPJ:</Text> {socio.cnpj_cpf_do_socio || '*****'}</Text>
            <Text><Text style={styles.boldText}>Qualificação:</Text> {socio.qualificacao_socio}</Text>
            <Text><Text style={styles.boldText}>Faixa Etária:</Text> {socio.faixa_etaria}</Text>
            <Text><Text style={styles.boldText}>Data de Entrada:</Text> {socio.data_entrada_sociedade}</Text>
            <Text><Text style={styles.boldText}>País:</Text> {socio.pais || '*****'}</Text>
            <Text><Text style={styles.boldText}>Código do País:</Text> {socio.codigo_pais || '*****'}</Text>
            <Text><Text style={styles.boldText}>Identificador de Sócio:</Text> {socio.identificador_de_socio}</Text>
            <Text><Text style={styles.boldText}>CPF Representante Legal:</Text> {socio.cpf_representante_legal || '*****'}</Text>
            <Text><Text style={styles.boldText}>Nome Representante Legal:</Text> {socio.nome_representante_legal || '*****'}</Text>
            <Text><Text style={styles.boldText}>Qualificação Representante Legal:</Text> {socio.qualificacao_representante_legal}</Text>
            <Text><Text style={styles.boldText}>Código Qualificação Representante Legal:</Text> {socio.codigo_qualificacao_representante_legal}</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
    fontWeight: 'bold',
  },
  headerText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  boldText: {
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6200EE',
  },
  socioContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  purpleDark: {
    color: '#2A1A40',
  },
  purpleMiddle: {
    color: '#8469BF',
  },
  purple: {
    color: '#D0C2FD',
  },
  yellow: {
    color: '#F2BE22',
  },
  yellowMiddle: {
    color: '#F2D47A',
  },
});
