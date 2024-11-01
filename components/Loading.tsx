import { View, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import { theme } from '@/constants/theme';

export default function Loading({ size = "large", color = theme.colors.primary }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa o espaço total da tela
    justifyContent: 'center',
    alignItems: 'center',
   // backgroundColor: 'white', // Opcional: adicionar fundo branco
  },
});
