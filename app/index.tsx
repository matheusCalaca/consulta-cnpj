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
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      <View>
        <Text>Digite o CNPJ</Text>
        <TextInput
          style={styles.input}
          value={cnpj}
          onChangeText={setCnpj}
          placeholder="Ex: 12345678000195"
          keyboardType="numeric"></TextInput>
        <Button
          title="Consultar"
          onPress={handleConsulta}
          disabled={!cnpj}
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
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  label: { fontSize: 18, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16, borderRadius: 4 },
});
