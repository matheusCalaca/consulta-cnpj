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
  const [data, setData] = useState<CNPJData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.getCNPJ(cnpj);  // Usando a classe ApiClient
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

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.text}>CNPJ: {data?.cnpj}</Text>
      <Text style={styles.text}>Razão Social: {data?.razao_social}</Text>
      <Text style={styles.text}>Nome Fantasia: {data?.nome_fantasia || 'Não informado'}</Text>
      <Text style={styles.text}>Situação Cadastral: {data?.descricao_situacao_cadastral}</Text>
      <Text style={styles.text}>UF: {data?.uf}</Text>
      <Text style={styles.text}>Município: {data?.municipio}</Text>
      <Text style={styles.text}>Bairro: {data?.bairro}</Text>
      <Text style={styles.text}>Endereço: {data?.logradouro}, {data?.numero}</Text>
      <Text style={styles.text}>CEP: {data?.cep}</Text>
      <Text style={styles.text}>Telefone: {data?.ddd_telefone_1}</Text>

      <Text style={styles.title}>Sócios:</Text>
      {data?.qsa.map((socio, index) => (
        <View key={index} style={styles.socioContainer}>
          <Text style={styles.text}>Nome do Sócio: {socio.nome_socio}</Text>
          <Text style={styles.text}>Qualificação: {socio.qualificacao_socio}</Text>
          <Text style={styles.text}>Faixa Etária: {socio.faixa_etaria}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: { flex: 1, padding: 16, backgroundColor: "#FFF" },
  text: { fontSize: 16, marginBottom: 8 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  socioContainer: { marginBottom: 12, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
});