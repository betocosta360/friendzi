import { View, Text, Button, Alert, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { theme } from '@/constants/theme'
import { hp, wp } from '@/helpers/common'
import Icon from '@/assets/icons'
import { useRouter } from 'expo-router'
import Avatar from '@/components/Avatar'

export default function Home() {
    const {user, setAuth} = useAuth()
    const router = useRouter()

    console.log('user:', user)
    const onLogout = async () => {
       // setAuth(null)
        const {error} = await supabase.auth.signOut()

        if(error){
            Alert.alert('sign out', 'error signing out!')
        }
    }
  return (
    <ScreenWrapper bg='white'>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Friendzi</Text>
          <View style={styles.icons}>
            <Pressable onPress={()=>router.push('/(main)/notifications')}>
              <Icon name="heart" size={hp(3.2)} strokeWidth={2} color={theme.colors.text}/>
            </Pressable>
            <Pressable onPress={()=>router.push('/(main)/newPost')}>
              <Icon name="plus" size={hp(3.2)} strokeWidth={2} color={theme.colors.text}/>
            </Pressable>
            <Pressable onPress={()=>router.push('/(main)/profile')}>
              <Avatar 
              uri={user?.image}
              size={hp(4.3)}
              rounded={theme.radius.sm}
              style={{borderWidth: 2}} />
            </Pressable>
          </View>
        </View>
      </View>
      {/* <Button title='logout' onPress={onLogout} />*/}
     
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  header:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginBottom: 10,
    marginHorizontal: wp(4)
  },
  title:{
    color: theme.colors.text,
    fontSize: hp(3.2),
    fontWeight: 'bold'
  },
  avatarImage:{
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: theme.radius.sm,
    borderCurve:'continuous',
    borderColor: theme.colors.gray,
    borderWidth: 3
  },
  icons:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18

  },
  pill:{
    position: 'absolute',
    right: -10,
    top: -4,
    height: hp(2.2),
    width: hp(2.2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: theme.colors.roseLight,
  },
  pillText:{
    color: 'white',
    fontSize: hp(1.2),
    fontWeight: 'bold',
   },
  noPosts:{
    fontSize: hp(2),
    textAlign: 'center',
    color: theme.colors.text
  },
  listStyle:{
    paddingTop: 20,
    paddingHorizontal: wp(4)
  }
})