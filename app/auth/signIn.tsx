import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import BackButtom from '@/components/BackButtom'
import { useRouter } from 'expo-router'
import { hp, wp } from '@/helpers/common'
import { theme } from '@/constants/theme'
import Input from '@/components/Input'
import Icon from '@/assets/icons'
import Button from '@/components/Button'
import { supabase } from '@/lib/supabase'


export default function SignIn() {
    const router = useRouter()
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert('Login', "Por favor adicione suas credenciais")
            return
        }
        let email = emailRef.current.trim()
        let password = passwordRef.current.trim()
        setLoading(true)
        const {error} = await supabase.auth.signInWithPassword({email, password})

        setLoading(false)
        console.log('error', error)
        if (error) {
            Alert.alert('Login', "Falha ao fazer login. Verifique suas credenciais")
           
        }
        
    }
    return (
        <ScreenWrapper bg='white'>
            <StatusBar style='dark' />
            <View style={styles.container}>
                <BackButtom router={router} />

                <View>
                    <Text style={styles.welcomeText}>Olá,</Text>
                    <Text style={styles.welcomeText}>Seja bem vindo.</Text>
                </View>

                <View style={styles.form}>
                    <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
                        Faça seu login para continuar
                    </Text>
                    <Input
                        icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
                        placeholder='Digite o seu email'
                        onChangeText={value => { emailRef.current = value }}
                    />
                    <Input
                        icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
                        placeholder='Digite sua senha'
                        secureTextEntry={true}
                        onChangeText={value => { passwordRef.current = value }}
                    />
                    <Text style={styles.forgotPassword}>
                        Esqueceu a senha?
                    </Text>

                    <Button title={'Acessar agora'} loading={loading} onPress={onSubmit} />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Ainda não tem uma conta?
                    </Text>
                    <Pressable onPress={() => router.push('/auth/signUp')}>
                        <Text style={[styles.footerText, { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold }]}>
                            Crie uma agora
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 45,
        paddingHorizontal: wp(5)
    },
    welcomeText: {
        fontSize: hp(4),
        fontWeight: 'bold',
        color: theme.colors.text
    },
    form: {
        gap: 25
    },
    forgotPassword: {
        textAlign: 'right',
        fontWeight: 'bold',
        color: theme.colors.text
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    footerText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(1.6)
    }
})