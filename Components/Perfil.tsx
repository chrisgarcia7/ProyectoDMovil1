import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useContextUsuario } from '../Context/Provider';

type Paginas = {
    Login: undefined;
    CambioPIN: undefined;
    Inicio: undefined;
};

export default function Perfil() {
    const { nombre, setNombre, identidad, setIdentidad, regresarPerfil, setRegresarPerfil, cod_cliente } = useContextUsuario();
    const navigation = useNavigation<StackNavigationProp<Paginas>>();
    
    const LogOut = () => {
        Alert.alert(
            "Cerrar sesión",
            "¿Estás seguro que deseas cerrar sesión?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Cerrar sesión",
                    style: "destructive",
                    onPress: () => {
                        setNombre('');
                        setIdentidad('');
                        navigation.navigate('Login');
                    }
                }
            ]
        );
    }
    
    const cambio = () => {
        setRegresarPerfil(true);
        navigation.navigate('CambioPIN');
    }

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .substring(0, 2)
            .toUpperCase();
    };
   
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1a365d" />
            
            {/* Header Section */}
            <View style={styles.headerSection}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{getInitials(nombre)}</Text>
                    </View>
                </View>
                <Text style={styles.headerTitle}>Mi Perfil</Text>
                <Text style={styles.headerSubtitle}>Información de la cuenta</Text>
            </View>

            {/* Content Section */}
            <View style={styles.contentSection}>
                
                {/* Personal Information Card */}
                <View style={styles.infoCard}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Información Personal</Text>
                    </View>
                    
                    <View style={styles.infoItem}>
                        <View style={styles.infoIconContainer}>
                            <Text style={styles.infoIcon}>👤</Text>
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Nombre completo</Text>
                            <Text style={styles.infoValue}>{nombre}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoItem}>
                        <View style={styles.infoIconContainer}>
                            <Text style={styles.infoIcon}>🆔</Text>
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Número de identidad</Text>
                            <Text style={styles.infoValue}>{identidad}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoItem}>
                        <View style={styles.infoIconContainer}>
                            <Text style={styles.infoIcon}>🏦</Text>
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Código de cliente</Text>
                            <Text style={styles.infoValue}>{cod_cliente}</Text>
                        </View>
                    </View>
                </View>

                {/* Security Card */}
                <View style={styles.securityCard}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Seguridad</Text>
                    </View>
                    
                    <TouchableOpacity style={styles.securityOption} onPress={cambio}>
                        <View style={styles.securityOptionLeft}>
                            <View style={styles.securityIconContainer}>
                                <Text style={styles.securityIcon}>🔐</Text>
                            </View>
                            <View>
                                <Text style={styles.securityOptionTitle}>Cambiar PIN</Text>
                                <Text style={styles.securityOptionSubtitle}>Actualiza tu PIN de seguridad</Text>
                            </View>
                        </View>
                        <Text style={styles.securityArrow}>›</Text>
                    </TouchableOpacity>
                </View>

                {/* Actions Section */}
                <View style={styles.actionsSection}>
                    <TouchableOpacity style={styles.logoutButton} onPress={LogOut}>
                        <Text style={styles.logoutIcon}>🚪</Text>
                        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
                    </TouchableOpacity>
                </View>

                {/* App Info */}
                <View style={styles.appInfoSection}>
                    <Text style={styles.appInfoText}>Banca Digital Cooperativa</Text>
                    <Text style={styles.versionText}>Versión 1.0.0</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    headerSection: {
        backgroundColor: '#1a365d',
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
    },
    avatarContainer: {
        marginBottom: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    avatarText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1a365d',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#cbd5e0',
        fontWeight: '400',
    },
    contentSection: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    infoCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    securityCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    cardHeader: {
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2d3748',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    infoIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f7fafc',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoIcon: {
        fontSize: 18,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 14,
        color: '#718096',
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2d3748',
    },
    divider: {
        height: 1,
        backgroundColor: '#e2e8f0',
        marginVertical: 8,
    },
    securityOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    securityOptionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    securityIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ebf8ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    securityIcon: {
        fontSize: 18,
    },
    securityOptionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2d3748',
        marginBottom: 2,
    },
    securityOptionSubtitle: {
        fontSize: 14,
        color: '#718096',
    },
    securityArrow: {
        fontSize: 24,
        color: '#cbd5e0',
        fontWeight: '300',
    },
    actionsSection: {
        marginBottom: 30,
    },
    logoutButton: {
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#fed7d7',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    logoutIcon: {
        fontSize: 20,
        marginRight: 12,
    },
    logoutButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#e53e3e',
    },
    appInfoSection: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    appInfoText: {
        fontSize: 14,
        color: '#718096',
        marginBottom: 4,
    },
    versionText: {
        fontSize: 12,
        color: '#a0aec0',
    },
});