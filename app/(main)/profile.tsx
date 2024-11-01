import { View, Text, TouchableOpacity, StyleSheet, Alert, Pressable } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'expo-router'
import Header from '@/components/Header'
import { hp, wp } from '@/helpers/common'
import Icon from '@/assets/icons'
import { theme } from '@/constants/theme'
import { supabase } from '@/lib/supabase'
import Avatar from '@/components/Avatar'


export default function Profile() {
    const { user, setAuth } = useAuth()
    const router = useRouter()

    const onLogout = async () => {
        // setAuth(null)
        const { error } = await supabase.auth.signOut()

        if (error) {
            Alert.alert('sign out', 'error signing out!')
        }
    }

    const handleLogout = () => {
        Alert.alert('Confirmar saída', "Tem certerza que vai sair", [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancelar'),
                style: 'cancel',
            },
            {
                text: 'Sair',
                onPress: () => onLogout(),
                style: 'destructive',
            }

        ])
    }
    return (
        <ScreenWrapper bg='white'>
            <UserHeader user={user} router={router} handleLogout={handleLogout} />

        </ScreenWrapper>
    )
}

const UserHeader = ({ user, router, handleLogout }) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: wp(4) }}>
            <View>
                <Header title="Perfil" mb={30} />
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Icon name="logout" color={theme.colors.rose} />
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <View style={{ gap: 15 }}>
                    <View style={styles.avatarContainer}>
                        <Avatar
                            uri={user?.image}
                            size={hp(12)}
                            rounded={theme.radius.xxl * 1.4} />
                        <Pressable style={styles.editIcon} onPress={() => router.push('editProfile')}>
                            <Icon name="edit" strokeWidt={2.5} size={hp(4)} />
                        </Pressable>
                    </View>

                    <View style={{ alignItems: 'center', gap: 4 }}>
                        <Text style={styles.userName}>{user && user.name}</Text>
                        <Text style={styles.infoText}>{user && user.address}</Text>
                    </View>

                    <View style={{ gap: 10 }}>
                        <View style={styles.info}>
                            <Icon name="mail" size={20} color={theme.colors.textLight} />
                            <Text style={styles.infoText}>{user && user.email}</Text>
                        </View>

                        {
                            user && user.phoneNumber && (
                                <View style={styles.info}>
                                    <Icon name="call" size={20} color={theme.colors.textLight} />
                                    <Text style={styles.infoText}>{user && user.phoneNumber}</Text>
                                </View>
                            )
                        }

                        {
                            user && user.bio &&(
                                <Text style={styles.infoText}>{user.bio}</Text>
                            )
                        }


                    </View>

                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logoutButton: {
        position: 'absolute',
        right: 0,
        padding: 5,
        borderRadius: theme.radius.sm,
        backgroundColor: '#fee2e2'
    },
    noPost: {
        textAlign: 'center',
        fontSize: hp(2),
        color: theme.colors.text
    },
    listStyle: {
        paddingHorizontal: wp(4),
        paddingBottom: 30
    },
    infoText: {
        fontSize: hp(1.6),
        fontWeight: '500',
        color: theme.colors.textLight,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    userName: {
        fontSize: hp(3),
        fontWeight: '500',
        color: theme.colors.textDark,
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: -12,
        padding: 7,
        borderRadius: 50,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 7,
    },
    avatarContainer: {
        height: hp(12),
        width: hp(12),
        alignSelf: 'center',
    },
    headerShape: {
        width: hp(100),
        height: hp(20)
    },
    headerContainer: {
        marginHorizontal: wp(4),
        marginBottom: 20
    },
})