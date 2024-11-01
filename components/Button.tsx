import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { theme } from '@/constants/theme';
import { hp } from '@/helpers/common';
import Loading from './Loading';

export default function Button({
    onPress = () => { },
    buttonStyle,
    textStyle,
    title = '',
    loading = false,
    hasShadow = true
}) {
    const shadowStyle = {
        shadowColor: theme.colors.dark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    };

    return (
        <Pressable
            onPress={loading ? null : onPress}
            style={[
                styles.button,
                buttonStyle,
                hasShadow && !loading && shadowStyle,
                loading && styles.loadingButton // Adiciona estilo adicional ao carregar
            ]}
        >
            {loading ? (
                <Loading size="small" color={theme.colors.primary} />
            ) : (
                <Text style={[styles.text, textStyle]}>{title}</Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primary,
        height: hp(6.6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.radius.xl,
        borderCurve: 'continuous'
    },
    loadingButton: {
        backgroundColor: theme.colors.primary, // Cor mais clara ao carregar
    },
    text: {
        fontSize: hp(2.5),
        color: 'white',
        fontWeight: theme.fonts.bold,
    }
});
