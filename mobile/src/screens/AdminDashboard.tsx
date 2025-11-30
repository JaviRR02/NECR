import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/theme';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';

const AdminDashboard: React.FC = () => {
  const nav = useNavigation<any>();
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPeople, setTotalPeople] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [a, people] = await Promise.all([api.getAdmins(), api.getPeople()]);
        setAdmins(a || []);
        setTotalPeople(people ? people.length : 0);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <View style={[styles.container, { justifyContent: 'center' }]}><ActivityIndicator /></View>;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Panel de administradores</Text>

      <View style={styles.stats}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total personas</Text>
          <Text style={styles.statValue}>{totalPeople ?? '-'}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total admins</Text>
          <Text style={styles.statValue}>{admins.length}</Text>
        </View>
      </View>

      <Text style={styles.sub}>Administradores</Text>

      <FlatList data={admins} keyExtractor={(i) => String(i.id)} renderItem={({ item }) => (
        <View style={styles.adminCard}>
          <Text style={styles.adminName}>{item.name}</Text>
          <Text style={styles.adminEmail}>{item.email}</Text>
        </View>
      )} />

      <TouchableOpacity style={styles.createButton} onPress={() => nav.navigate('CreateAdmin')}>
        <Text style={styles.createText}>Crear nuevo administrador</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  title: { color: colors.white, fontSize: 20, fontWeight: '700', marginBottom: 12 },
  stats: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: colors.surface, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: colors.border, alignItems: 'center' },
  statLabel: { color: colors.textSecondary },
  statValue: { color: colors.white, fontSize: 18, fontWeight: '700', marginTop: 6 },
  sub: { color: colors.textSecondary, marginBottom: 8 },
  adminCard: { backgroundColor: colors.surface, padding: 12, borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: colors.border },
  adminName: { color: colors.white, fontWeight: '700' },
  adminEmail: { color: colors.textSecondary, marginTop: 4 },
  createButton: { marginTop: 12, height: 48, borderRadius: 8, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  createText: { color: colors.white, fontWeight: '700' },
});

export default AdminDashboard;
