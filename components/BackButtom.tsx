import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { theme } from '@/constants/theme'
import Icon from '@/assets/icons'
import { useRouter } from 'expo-router'

export default function BackButtom({size=26, router}) {
    
  return (
    <Pressable onPress={()=>router.back()} style={styles.button}>
      <Icon name='arrowLeft' strokeWidth={2.5} size={size} color={theme.colors.text}/>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    button:{
        alignItems: 'flex-start',
        padding: 5,
        borderRadius: theme.radius.sm,
        backgroundColor: 'rgba(0,0,0,0.07)'
    },
})