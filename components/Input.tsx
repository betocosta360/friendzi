import { View, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { theme } from '@/constants/theme';
import { hp } from '@/helpers/common';

export default function Input({ icon, containerStyles, inputRef, ...props }) {
    return (
        <View style={[styles.container, containerStyles && containerStyles]}>
            {icon && icon}
            <TextInput
                style={{ flex: 1 }}
                placeholderTextColor={theme.colors.textLight}
                ref={inputRef}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: hp(7.2),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.4,
        borderColor: theme.colors.text,
        borderRadius: theme.radius.xxl,
        paddingHorizontal: 18,
        gap: 12,
    },
});
