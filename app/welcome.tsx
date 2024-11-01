import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import { wp, hp } from '@/helpers/common';
import { theme } from '@/constants/theme';
import Button from '@/components/Button';
import { useRouter } from 'expo-router';

export default function Welcome() {
    const router = useRouter()
    return (
        <ScreenWrapper bg="white">
            <StatusBar style="dark" />
            <View style={styles.container}>
                <Image
                    style={styles.welcomeImage}
                    resizeMode="contain"
                    source={require('@/assets/images/welcome.png')}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Bem-vindo ao Socializando</Text>
                    <Text style={styles.subtitle}>A plataforma que te conecta com pessoas ao redor do mundo</Text>
                </View>
                <View style={styles.footer}>
                    <Button buttonStyle={{ marginHorizontal: wp(3) }} title='Vamos Começar' onPress={() => router.push('/auth/signUp')} />
                </View>
                <View style={styles.bottomTextContainer}>
                    <Text style={styles.loginText}>
                        Já tem uma conta!
                    </Text>
                    <Pressable onPress={() => router.push('auth/signIn')}>
                        <Text style={[styles.loginText, { color: theme.colors.primaryDark, fontWeight: '600' }]} >
                            Login
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: wp(4),
    },
    welcomeImage: {
        height: hp(30),
        width: wp(100),
        alignSelf: 'center',
    },
    textContainer: {
        marginTop: hp(2),
        alignItems: 'center',
    },
    title: {
        fontSize: hp(3),
        color: theme.colors.text,
        textAlign: 'center',
        fontWeight: '700', // ajuste para garantir compatibilidade com React Native
    },
    subtitle: {
        textAlign: 'center',
        paddingHorizontal: wp(15),
        fontSize: hp(1.7),
        color: theme.colors.text,
    },
    footer: {
        gap: 30,
        width: '100%'
    },
    bottomTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    loginText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(1.6)
    },
});
