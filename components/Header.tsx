import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { theme } from '@/constants/theme'
import { hp } from '@/helpers/common'
import BackButtom from './BackButtom'

export default function Header({title, showBackButton = true, mb=10}) {
    const router = useRouter()
  return (
    <View style={[styles.container, {marginBottom: 10}]}>
      {
        showBackButton && (
            <View style={styles.backButton}>
                <BackButtom router={router}/>
            </View>
            
        )
      }
      <Text style={styles.title}>{title || ""}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        gap: 12,
    },

    title:{
      fontSize: hp(2.7),
      fontWeight: theme.fonts.semibold,
      color: theme.colors.textDark
    },
    backButton:{
        position: 'absolute',
        left: 12,
        top: 0
    }
});