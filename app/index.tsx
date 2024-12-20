import { Image, StyleSheet, Platform, View, Text, TextInput, Button } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [cnpj, setCnpj] = React.useState('18236120000158');
  const router = useRouter();

  const handleConsulta = () => {
    if (cnpj) {
      router.push(`/consultacnpj/${cnpj}`);
    } else {
      alert("Por favor, digite um CNPJ.");
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F9A825', dark: '#F9A825' }}
      headerImage={
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={styles.reactLogo}
        />
      }>
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
          color="#F9A825" // Cor amarela para o botão
        />
      </View>
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
    color: '#4A148C', // Cor roxa para o texto
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#4A148C', // Cor roxa na borda
    padding: 16,
    marginBottom: 16,
    borderRadius: 4,
    fontSize: 16,
    width: '100%',
  },
});
