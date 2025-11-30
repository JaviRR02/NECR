import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../styles/theme';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';

const RegisterPersonScreen: React.FC = () => {
  const nav = useNavigation<any>();
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [dni, setDni] = useState('');
  const [fecha, setFecha] = useState<Date | null>(null);
  const [showDate, setShowDate] = useState(false);
  const [lugar, setLugar] = useState('');
  const [sexo, setSexo] = useState('Masculino');
  const [estadoCivil, setEstadoCivil] = useState('Soltero/a');
  const [loading, setLoading] = useState(false);

  const handleDateChange = (event: any, sel?: Date) => {
    setShowDate(Platform.OS === 'ios');
    if (sel) setFecha(sel);
  };

  const handleSubmit = async () => {
    if (!nombres.trim() || !apellidos.trim() || !dni.trim()) return Alert.alert('Error', 'Complete los campos obligatorios');
    setLoading(true);
    try {
      await api.createPerson({ nombres, apellidos, dni, fecha_nacimiento: fecha?.toISOString?.() || null, lugar, sexo, estadoCivil });
      setLoading(false);
      Alert.alert('Éxito', 'Persona registrada', [{ text: 'OK', onPress: () => nav.goBack() }]);
    } catch (e: any) {
      setLoading(false);
      Alert.alert('Error', e?.response?.data?.message || e?.message || 'No se pudo registrar');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Registrar persona</Text>

      <TextInput placeholder="Nombres" placeholderTextColor={colors.textSecondary} style={styles.input} value={nombres} onChangeText={setNombres} />
      <TextInput placeholder="Apellidos" placeholderTextColor={colors.textSecondary} style={styles.input} value={apellidos} onChangeText={setApellidos} />
      <TextInput placeholder="DNI" placeholderTextColor={colors.textSecondary} style={styles.input} value={dni} onChangeText={setDni} keyboardType="number-pad" />

      <TouchableOpacity onPress={() => setShowDate(true)} style={styles.input}>
        <Text style={{ color: fecha ? colors.text : colors.textSecondary }}>{fecha ? fecha.toLocaleDateString() : 'Fecha de nacimiento'}</Text>
      </TouchableOpacity>

      {showDate && (
        <DateTimePicker value={fecha || new Date(1990, 0, 1)} mode="date" display="default" onChange={handleDateChange} maximumDate={new Date()} />
      )}

      <TextInput placeholder="Lugar de nacimiento" placeholderTextColor={colors.textSecondary} style={styles.input} value={lugar} onChangeText={setLugar} />
      <TextInput placeholder="Sexo (Masculino/Femenino/Otro)" placeholderTextColor={colors.textSecondary} style={styles.input} value={sexo} onChangeText={setSexo} />
      <TextInput placeholder="Estado civil" placeholderTextColor={colors.textSecondary} style={styles.input} value={estadoCivil} onChangeText={setEstadoCivil} />

      <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.primaryText}>Registrar persona</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  title: { color: colors.white, fontSize: 20, fontWeight: '700', marginBottom: 12 },
  input: { height: 48, borderRadius: 8, backgroundColor: colors.surface, color: colors.text, paddingHorizontal: 12, marginBottom: 12, justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  primaryButton: { height: 48, borderRadius: 8, backgroundColor: colors.success, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  primaryText: { color: colors.white, fontWeight: '700' },
});

export default RegisterPersonScreen;
