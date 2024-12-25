import { Image, StyleSheet, View, Text, Button } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';  // Importando a máscara
import { CnpjHistoryDTO } from '@/domain/cnpjHitory';

export default function HomeScreen() {
  //18236120000158
  const [cnpj, setCnpj] = useState('');
  const router = useRouter();
  const handleConsulta = async () => {
    console.log('Iniciando handleConsulta'); // Log inicial

    if (cnpj) {
        console.log('CNPJ fornecido:', cnpj); // Verifica se o CNPJ foi fornecido
        // Remove caracteres não numéricos do CNPJ
        const sanitizedCNPJ = cnpj.replace(/[^\d]+/g, '');
        console.log('CNPJ sanitizado:', sanitizedCNPJ);

        setCnpj(sanitizedCNPJ);

        const currentDate = new Date().toLocaleString();
        console.log('Data atual:', currentDate);

        const newHistoryItem: CnpjHistoryDTO = { cnpj: sanitizedCNPJ, date: currentDate };
        console.log('Novo item de histórico criado:', newHistoryItem);

        try {
            // Obtém o histórico armazenado
            console.log('Tentando obter o histórico do AsyncStorage...');
            const storedHistory = await AsyncStorage.getItem('cnpjHistory');
            let history: CnpjHistoryDTO[] = storedHistory ? JSON.parse(storedHistory) : [];
            console.log('Histórico recuperado:', history);

            // Verifica se o CNPJ já existe no histórico
            const existingIndex = history.findIndex(item => item.cnpj === sanitizedCNPJ);
            console.log('Índice do CNPJ existente:', existingIndex);

            if (existingIndex > -1) {
                // Se o CNPJ já existe, atualiza a data
                console.log('CNPJ já existe no histórico. Atualizando data...');
                history[existingIndex].date = currentDate;
            } else {
                // Caso contrário, adiciona um novo item
                console.log('CNPJ não encontrado no histórico. Adicionando novo item...');
                history = [newHistoryItem, ...history].slice(0, 20); // Limita a 20 itens
                console.log('Histórico atualizado (com limite de 20):', history);
            }

            // Salva o histórico atualizado
            console.log('Salvando histórico atualizado no AsyncStorage...');
            await AsyncStorage.setItem('cnpjHistory', JSON.stringify(history));
            console.log('Histórico salvo com sucesso.');

            // Navega para a tela de consulta
            console.log('Redirecionando para a tela de consulta do CNPJ:', sanitizedCNPJ);
            router.push(`/consultacnpj/${sanitizedCNPJ}`);
        } catch (error) {
            console.error('Erro ao salvar no histórico:', error);
        }
    } else {
        console.warn('Nenhum CNPJ fornecido. Mostrando alerta para o usuário.');
        alert('Por favor, digite um CNPJ.');
    }

    console.log('Finalizando handleConsulta'); // Log final
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
        <TextInputMask
          style={styles.input}
          type={'cnpj'}  // Aplica a máscara de CNPJ
          value={cnpj}
          onChangeText={setCnpj}
          placeholder="Ex: 12.345.678/0001-95"
          keyboardType="numeric"
          returnKeyType="done" // Ajusta o botão do teclado para "OK"
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
    marginBottom: 10,
  },
  formContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 10,
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
