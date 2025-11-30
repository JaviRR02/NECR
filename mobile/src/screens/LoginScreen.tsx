import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/theme';
import api from '../services/api';

const LoginScreen: React.FC = () => {
  const nav = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await api.login({ email, password });
      setLoading(false);
      nav.navigate('Home');
    } catch (e: any) {
      setLoading(false);
      setError(e?.response?.data?.message || e?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={{ flex: 1 }}>
        <View style={styles.inner}>
        <Text style={styles.logo}>NECR</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.primaryText}>Iniciar sesión</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.ghostButton} onPress={() => nav.navigate('CreateAdmin')}>
          <Text style={styles.ghostText}>Crear primer administrador</Text>
        </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  inner: { flex: 1, padding: 20, justifyContent: 'center' },
  logo: { color: colors.white, fontSize: 48, fontWeight: '800', textAlign: 'center', marginBottom: 40 },
  input: {
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.surface,
    color: colors.text,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  primaryButton: {
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  primaryText: { color: colors.white, fontWeight: '700' },
  ghostButton: { marginTop: 12, alignItems: 'center' },
  ghostText: { color: colors.textSecondary },
  error: { color: '#ff6b6b', textAlign: 'center', marginTop: 8 },
});

export default LoginScreen;
