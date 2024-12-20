import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { DataFormatters } from '@/components/DataFormatters ';

export default function CnpjHistoryScreen() {
    const [cnpjHistory, setCnpjHistory] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const storedHistory = await AsyncStorage.getItem('cnpjHistory');
                if (storedHistory) {
                    setCnpjHistory(JSON.parse(storedHistory));
                }
            } catch (error) {
                console.error('Erro ao carregar histórico:', error);
            }
        };

        loadHistory();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.historyItem}
            onPress={() => { router.push(`/consultacnpj/${item.cnpj}`); }}
            key={item.cnpj}
        >
            <Text style={styles.cnpjText}>{DataFormatters.formatCNPJ(item.cnpj)}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Últimos CNPJs Consultados</Text>
            <FlatList
                data={cnpjHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhum histórico encontrado.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 24, // Aumentado para melhorar a visibilidade
        fontWeight: 'bold',
        color: '#4A148C',
        marginBottom: 20, // Aumentado o espaço
        textAlign: 'center', // Alinhamento centralizado
    },
    historyItem: {
        padding: 16, // Aumentado o espaçamento para melhorar a interação
        marginBottom: 12, // Espaço entre os itens
        backgroundColor: '#f9f9f9', // Fundo mais claro para os itens
        borderRadius: 8, // Bordas arredondadas
        shadowColor: '#000', 
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
    },
    cnpjText: {
        fontSize: 20, // Aumentado para melhorar a visibilidade
        fontWeight: 'bold',
        color: '#4A148C',
    },
    dateText: {
        fontSize: 16, // Aumentado para ficar mais legível
        color: '#777',
        marginTop: 8,
    },
    emptyText: {
        fontSize: 18, // Aumentado para maior legibilidade
        color: '#777',
        textAlign: 'center',
        marginTop: 20,
    },
});
