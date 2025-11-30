import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/theme';
import api from '../services/api';

type Person = { id: number; nombres: string; apellidos: string; dni: string };

const HomeScreen: React.FC = () => {
  const nav = useNavigation<any>();
  const [data, setData] = useState<Person[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Show sensitivity warning only the first time the user opens Home (persisted)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const AsyncStorage = await import('@react-native-async-storage/async-storage');
        const seen = await AsyncStorage.default.getItem('seenSensitiveAlert');
        if (!seen && mounted) {
          Alert.alert(
            'Aviso de privacidad',
            'La información mostrada puede ser sensible. Trátela con respeto y responsabilidad.',
            [{ text: 'Entendido', onPress: async () => { await AsyncStorage.default.setItem('seenSensitiveAlert', '1'); } }]
          );
        }
      } catch (e) {
        // If AsyncStorage isn't available, still show the alert once per session
        if (mounted) {
          Alert.alert('Aviso de privacidad', 'La información mostrada puede ser sensible. Trátela con respeto y responsabilidad.');
        }
      }
    })();
    return () => { mounted = false; };
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      const people = await api.getPeople();
      setData(people || []);
    } catch (_) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, []);

  const renderItem = ({ item }: { item: Person }) => (
    <TouchableOpacity style={styles.card} onPress={() => nav.navigate('PersonDetail', { id: item.id })}>
      <Text style={styles.name}>{item.nombres} {item.apellidos}</Text>
      <Text style={styles.sub}>{item.dni}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Personas Registradas</Text>

      <FlatList
        data={data}
        keyExtractor={(i) => String(i.id)}
        renderItem={renderItem}
        refreshControl={<RefreshControl tintColor={colors.text} refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={!loading ? <Text style={styles.empty}>No hay personas registradas</Text> : <Text style={styles.empty}>Cargando...</Text>}
        contentContainerStyle={data.length === 0 ? { flex: 1, justifyContent: 'center', alignItems: 'center' } : undefined}
      />

      <TouchableOpacity style={styles.fab} onPress={() => nav.navigate('RegisterPerson')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  title: { color: colors.white, fontSize: 20, fontWeight: '700', marginBottom: 12 },
  card: { backgroundColor: colors.surface, padding: 12, borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: colors.border },
  name: { color: colors.white, fontWeight: '600' },
  sub: { color: colors.textSecondary, marginTop: 4 },
  fab: { position: 'absolute', right: 20, bottom: 30, width: 56, height: 56, borderRadius: 28, backgroundColor: colors.success, alignItems: 'center', justifyContent: 'center', elevation: 6 },
  fabText: { color: colors.white, fontSize: 28, fontWeight: '700' },
  empty: { color: colors.textSecondary },
});

export default HomeScreen;
