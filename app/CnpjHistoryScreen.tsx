import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { DataFormatters } from '@/components/DataFormatters ';

export default function CnpjHistoryScreen() {
    const [cnpjHistory, setCnpjHistory] = useState([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
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

    const handleDelete = async (cnpjToDelete: string | string[]) => {
        try {
            let updatedHistory;
            if (Array.isArray(cnpjToDelete)) {
                updatedHistory = cnpjHistory.filter(item => !cnpjToDelete.includes(item.cnpj));
            } else {
                updatedHistory = cnpjHistory.filter(item => item.cnpj !== cnpjToDelete);
            }

            setCnpjHistory(updatedHistory);
            await AsyncStorage.setItem('cnpjHistory', JSON.stringify(updatedHistory));
        } catch (error) {
            console.error('Erro ao deletar item:', error);
        }
    };

    const handleLongPress = (cnpj: string) => {
        if (Platform.OS === 'android') {
            if (selectedItems.includes(cnpj)) {
                setSelectedItems(prev => prev.filter(item => item !== cnpj));
            } else {
                setSelectedItems(prev => [...prev, cnpj]);
            }
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.historyItem,
                selectedItems.includes(item.cnpj) && Platform.OS === 'android' && styles.selectedItem,
            ]}
            onPress={() => {
                if (selectedItems.length > 0 && Platform.OS === 'android') {
                    handleLongPress(item.cnpj);
                } else {
                    router.push(`/consultacnpj/${item.cnpj}`);
                }
            }}
            onLongPress={() => handleLongPress(item.cnpj)}
            key={item.cnpj}
        >
            <View style={styles.itemContent}>
                <View>
                    <Text style={styles.cnpjText}>{DataFormatters.formatCNPJ(item.cnpj)}</Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                </View>
                {Platform.OS === 'web' && (
                    <TouchableOpacity onPress={() => handleDelete(item.cnpj)}>
                        <MaterialIcons name="delete" size={24} color="red" />
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );

    const handleDeleteSelected = () => {
        Alert.alert(
            'Confirmar exclusão',
            'Você tem certeza que deseja excluir os itens selecionados?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Excluir', onPress: () => handleDelete(selectedItems) },
            ]
        );
        setSelectedItems([]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Últimos CNPJs Consultados</Text>
            {Platform.OS === 'android' && selectedItems.length > 0 && (
                <View style={styles.actionBar}>
                    <Text style={styles.selectedCount}>{`${selectedItems.length} selecionados`}</Text>
                    <Button title="Excluir Selecionados" onPress={handleDeleteSelected} color="#FF0000" />
                </View>
            )}
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4A148C',
        marginBottom: 20,
        textAlign: 'center',
    },
    historyItem: {
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
    },
    selectedItem: {
        backgroundColor: '#FFD700',
    },
    cnpjText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4A148C',
    },
    dateText: {
        fontSize: 16,
        color: '#777',
        marginTop: 8,
    },
    emptyText: {
        fontSize: 18,
        color: '#777',
        textAlign: 'center',
        marginTop: 20,
    },
    itemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#f1f1f1',
        marginBottom: 10,
        borderRadius: 8,
    },
    selectedCount: {
        fontSize: 16,
        color: '#4A148C',
        fontWeight: 'bold',
    },
});
