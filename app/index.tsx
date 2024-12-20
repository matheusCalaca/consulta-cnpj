import { Image, StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [cnpj, setCnpj] = useState('18236120000158');
  const router = useRouter();

  const handleConsulta = async () => {
    if (cnpj) {
      // Salva o CNPJ no histórico
      const currentDate = new Date().toLocaleString();
      const newHistoryItem = { cnpj, date: currentDate };

      try {
        const storedHistory = await AsyncStorage.getItem('cnpjHistory');
        let history = storedHistory ? JSON.parse(storedHistory) : [];

        // Verifica se o CNPJ já existe no histórico
        const existingIndex = history.findIndex(item => item.cnpj === cnpj);

        if (existingIndex > -1) {
          // Se o CNPJ já existe, atualiza a data
          history[existingIndex].date = currentDate;
        } else {
          // Caso contrário, adiciona um novo item
          history = [newHistoryItem, ...history].slice(0, 20); // Limita a 20 itens
        }

        await AsyncStorage.setItem('cnpjHistory', JSON.stringify(history));
        router.push(`/consultacnpj/${cnpj}`);
      } catch (error) {
        console.error('Erro ao salvar no histórico:', error);
      }
    } else {
      alert('Por favor, digite um CNPJ.');
    }
  };

  const handleGoToHistory = () => {
    router.push('/CnpjHistoryScreen');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F9A825', dark: '#F9A825' }}
      headerImage={
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bem-vindo!</ThemedText>
        <HelloWave />
      </ThemedView>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Digite o CNPJ</Text>
        <TextInput
          style={styles.input}
          value={cnpj}
          onChangeText={setCnpj}
          placeholder="Ex: 12345678000195"
          keyboardType="numeric"
        />
        <Button
          title="Consultar"
          onPress={handleConsulta}
          disabled={!cnpj}
          color="#F9A825"
        />
      </View>

      <Button
        title="Histórico de Consultas"
        onPress={handleGoToHistory}
        color="#4A148C" // Cor roxa para o botão
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  formContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 32,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  label: {
    fontSize: 18,
    color: '#4A148C',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#4A148C',
    padding: 16,
    marginBottom: 16,
    borderRadius: 4,
    fontSize: 16,
    width: '100%',
  },
});
