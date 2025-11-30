import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/theme';
import api from '../services/api';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CreateAdminScreen: React.FC = () => {
  const nav = useNavigation<any>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    setError(null);
    if (!name.trim()) return setError('Nombre requerido');
    if (!emailRegex.test(email)) return setError('Email inválido');
    if (password.length < 6) return setError('Contraseña mínima 6 caracteres');
    if (password !== confirm) return setError('Las contraseñas no coinciden');

    setLoading(true);
    try {
      await api.createAdmin({ name, email, password });
      setLoading(false);
      Alert.alert('Éxito', 'Administrador creado', [{ text: 'OK', onPress: () => nav.navigate('Login') }]);
    } catch (e: any) {
      setLoading(false);
      setError(e?.response?.data?.message || e?.message || 'Error al crear administrador');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Crear administrador</Text>

      <TextInput placeholder="Nombre completo" placeholderTextColor={colors.textSecondary} style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Email" placeholderTextColor={colors.textSecondary} style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder="Contraseña" placeholderTextColor={colors.textSecondary} style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput placeholder="Confirmar contraseña" placeholderTextColor={colors.textSecondary} style={styles.input} secureTextEntry value={confirm} onChangeText={setConfirm} />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.primaryButton} onPress={handleCreate} disabled={loading}>
        {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.primaryText}>Crear administrador</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20, justifyContent: 'center' },
  title: { color: colors.white, fontSize: 24, fontWeight: '700', marginBottom: 16, textAlign: 'center' },
  input: { height: 48, borderRadius: 8, backgroundColor: colors.surface, color: colors.text, paddingHorizontal: 12, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  primaryButton: { height: 48, borderRadius: 8, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  primaryText: { color: colors.white, fontWeight: '700' },
  error: { color: '#ff6b6b', textAlign: 'center', marginBottom: 8 },
});

export default CreateAdminScreen;
