import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/theme';
import api from '../services/api';
import { useRoute, useNavigation } from '@react-navigation/native';

const PersonDetailScreen: React.FC = () => {
  const route = useRoute<any>();
  const nav = useNavigation<any>();
  const { id } = route.params || {};
  const [person, setPerson] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const p = await api.getPerson(id);
        setPerson(p);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <View style={[styles.container, { justifyContent: 'center' }]}><ActivityIndicator /></View>;

  if (!person) return <View style={styles.container}><Text style={styles.empty}>No se encontró la persona</Text></View>;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
      {person.foto ? <Image source={{ uri: person.foto }} style={styles.photo} /> : null}
      <View style={styles.card}>
        <Text style={styles.label}>Nombres</Text>
        <Text style={styles.value}>{person.nombres}</Text>

        <Text style={styles.label}>Apellidos</Text>
        <Text style={styles.value}>{person.apellidos}</Text>

        <Text style={styles.label}>DNI</Text>
        <Text style={styles.value}>{person.dni}</Text>

        <Text style={styles.label}>Fecha de nacimiento</Text>
        <Text style={styles.value}>{person.fecha_nacimiento ? new Date(person.fecha_nacimiento).toLocaleDateString() : '-'}</Text>

        <Text style={styles.label}>Lugar de nacimiento</Text>
        <Text style={styles.value}>{person.lugar || '-'}</Text>

        <Text style={styles.label}>Sexo</Text>
        <Text style={styles.value}>{person.sexo || '-'}</Text>

        <Text style={styles.label}>Estado civil</Text>
        <Text style={styles.value}>{person.estadoCivil || '-'}</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => nav.navigate('RegisterPerson', { editId: id })}>
        <Text style={styles.editText}>Editar</Text>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  photo: { width: '100%', height: 200, borderRadius: 8, marginBottom: 12 },
  card: { backgroundColor: colors.surface, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: colors.border },
  label: { color: colors.textSecondary, marginTop: 8, fontSize: 12 },
  value: { color: colors.text, fontSize: 16, fontWeight: '600' },
  editButton: { marginTop: 16, height: 48, borderRadius: 8, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  editText: { color: colors.white, fontWeight: '700' },
  empty: { color: colors.textSecondary, textAlign: 'center', marginTop: 20 },
});

export default PersonDetailScreen;
