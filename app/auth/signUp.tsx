import { View, Text, StyleSheet, Alert, Pressable } from 'react-native'
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

export default function SignUp() {
    const router = useRouter()
    const emailRef = useRef('')
    const nameRef = useRef('')
    const passwordRef = useRef('')
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        const name = nameRef.current.trim()
        const email = emailRef.current.trim()
        const password = passwordRef.current.trim()

        if (!name || !email || !password) {
            Alert.alert('Cadastrar', "Por favor preencha todos os campos")
            return
        }

        setLoading(true)

        const { data: { session }, error } = await supabase.auth.signUp({
            email,
            password,
            options:{
                data:{
                    name
                }
            }
        })

        setLoading(false)

        if (error) {
            Alert.alert('Cadastrar', error.message || "Houve um erro ao tentar cadastrar")
            return
        }

        Alert.alert('Cadastrar', "Cadastro realizado com sucesso! Você pode fazer login agora.")
        // Redirecionar para a tela de login após o registro
        router.push('/auth/signIn')
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
                        Crie sua conta para continuar
                    </Text>
                    <Input  
                        icon={<Icon name="user" size={26} strokeWidth={1.6} />}
                        placeholder='Digite o seu nome'
                        onChangeText={value => { nameRef.current = value }}
                    />
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

                    <Button title={'Cadastrar'} loading={loading} onPress={onSubmit} />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                       Já tem uma conta?
                    </Text>
                    <Pressable onPress={() => router.push('/auth/signIn')}>
                        <Text style={[styles.footerText, { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold }]}>
                            Login
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
