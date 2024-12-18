import { StyleSheet, View, Text, Image, ScrollView, ActivityIndicator, Button } from 'react-native';
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Emblema_do_Brasil.svg/1024px-Emblema_do_Brasil.svg.png' }}
          style={styles.logo}
        />
        <Text style={styles.title}>REPÚBLICA FEDERATIVA DO BRASIL</Text>
        <Text style={styles.subtitle}>CADASTRO NACIONAL DA PESSOA JURÍDICA</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>NÚMERO DE INSCRIÇÃO</Text>
        <Text style={styles.value}>{data.cnpj}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>NOME EMPRESARIAL</Text>
        <Text style={styles.value}>{data.razao_social}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>TÍTULO DO ESTABELECIMENTO (NOME FANTASIA)</Text>
        <Text style={styles.value}>{data.nome_fantasia || 'Não informado'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>CÓDIGO E DESCRIÇÃO DA ATIVIDADE ECONÔMICA PRINCIPAL</Text>
        <Text style={styles.value}>{data.atividade_principal}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>CÓDIGO E DESCRIÇÃO DAS ATIVIDADES ECONÔMICAS SECUNDÁRIAS</Text>
        <Text style={styles.value}>{data.atividades_secundarias.join(', ')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>CÓDIGO E DESCRIÇÃO DA NATUREZA JURÍDICA</Text>
        <Text style={styles.value}>{data.natureza_juridica}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>LOGRADOURO</Text>
        <Text style={styles.value}>{data.endereco.logradouro}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>NUMERO</Text>
        <Text style={styles.value}>{data.endereco.numero}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>BAIRRO/DISTRITO</Text>
        <Text style={styles.value}>{data.endereco.bairro}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>MUNICÍPIO</Text>
        <Text style={styles.value}>{data.endereco.municipio}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>UF</Text>
        <Text style={styles.value}>{data.endereco.uf}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>CEP</Text>
        <Text style={styles.value}>{data.endereco.cep}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>TELEFONE</Text>
        <Text style={styles.value}>{data.telefone}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>SITUAÇÃO CADASTRAL</Text>
        <Text style={styles.value}>{data.situacao_cadastral}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>DATA DE SITUAÇÃO CADASTRAL</Text>
        <Text style={styles.value}>{data.data_situacao_cadastral}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>ENDEREÇO ELETRÔNICO</Text>
        <Text style={styles.value}>{data.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>PRAZO PARA REGULARIZAÇÃO</Text>
        <Text style={styles.value}>{data.prazo_regularizacao || 'Não informado'}</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { alignItems: 'center', marginBottom: 20 },
  logo: { width: 100, height: 100, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { fontSize: 16, marginBottom: 20 },
  section: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: 'bold' },
  value: { fontSize: 16, marginTop: 5 },
});