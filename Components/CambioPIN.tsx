import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useContextUsuario } from '../Context/Provider';
import api from '../Service/api';

type Paginas = {
    Login: undefined;
    CambioPIN: undefined;
    Inicio: undefined;
    Perfil: undefined;
};

export default function CambioPIN() {
    const [newPIN, setNewPIN] = useState<string>('');
    const [oldPIN, setOldPIN] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [showOldPIN, setShowOldPIN] = useState<boolean>(false);
    const [showNewPIN, setShowNewPIN] = useState<boolean>(false);

    const navigation = useNavigation<StackNavigationProp<Paginas>>();
    const { id, setID, regresarPerfil, setRegresarPerfil } = useContextUsuario();

    const validatePIN = (pin: string): string | null => {
        if (pin.length < 5) {
            return 'El PIN debe tener al menos 5 caracteres';
        }
        if (pin === '12345') {
            return 'No puedes usar 12345 como PIN por seguridad';
        }
        if (!/^\d+$/.test(pin)) {
            return 'El PIN solo debe contener números';
        }
        return null;
    };

    const handleChangePIN = async () => {
        try {
            // Validaciones
            if (!oldPIN.trim() || !newPIN.trim()) {
                Alert.alert('Error', 'Por favor ingresa ambos PINs');
                return;
            }

            const pinError = validatePIN(newPIN);
            if (pinError) {
                Alert.alert('Error', pinError);
                return;
            }

            if (newPIN === oldPIN) {
                Alert.alert('Error', 'El nuevo PIN debe ser diferente al anterior');
                return;
            }

            setLoading(true);

            const response = await api.put(`apppin/${id}`, { 
                id, 
                oldPIN: parseInt(oldPIN), 
                newPIN: parseInt(newPIN) 
            });

            if (response.status === 200) {
                Alert.alert(
                    'Éxito',
                    'PIN cambiado exitosamente',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                if (regresarPerfil) {
                                    navigation.navigate('Perfil');
                                    setRegresarPerfil(false);
                                } else {
                                    navigation.navigate('Login');
                                }
                            }
                        }
                    ]
                );
            }
        } catch (error) {
            Alert.alert('Error', 'PIN actual incorrecto o servidor no disponible');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        setRegresarPerfil(false);
        navigation.navigate('Perfil');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1a365d" />
            
            {/* Header Section */}
            <View style={styles.headerSection}>
                <View style={styles.iconContainer}>
                    <Text style={styles.headerIcon}>🔐</Text>
                </View>
                <Text style={styles.headerTitle}>Cambiar PIN</Text>
                <Text style={styles.headerSubtitle}>
                    {regresarPerfil 
                        ? 'Actualiza tu PIN de seguridad' 
                        : 'Configura tu nuevo PIN de acceso'
                    }
                </Text>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
                
                {/* Security Notice */}
                <View style={styles.securityNotice}>
                    <Text style={styles.securityIcon}>⚠️</Text>
                    <View style={styles.securityTextContainer}>
                        <Text style={styles.securityTitle}>Recomendaciones de seguridad</Text>
                        <Text style={styles.securityText}>
                            • Usa al menos 5 dígitos{'\n'}
                            • Evita secuencias como 12345{'\n'}
                            • No compartas tu PIN con nadie
                        </Text>
                    </View>
                </View>

                {/* Current PIN Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>PIN actual</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="Ingresa tu PIN actual"
                            value={oldPIN}
                            onChangeText={setOldPIN}
                            style={styles.input}
                            secureTextEntry={!showOldPIN}
                            keyboardType="numeric"
                            maxLength={6}
                        />
                        <TouchableOpacity 
                            style={styles.eyeButton}
                            onPress={() => setShowOldPIN(!showOldPIN)}
                        >
                            <Text style={styles.eyeIcon}>{showOldPIN ? '🙈' : '👁️'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* New PIN Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Nuevo PIN</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="Ingresa tu nuevo PIN"
                            value={newPIN}
                            onChangeText={setNewPIN}
                            style={styles.input}
                            secureTextEntry={!showNewPIN}
                            keyboardType="numeric"
                            maxLength={6}
                        />
                        <TouchableOpacity 
                            style={styles.eyeButton}
                            onPress={() => setShowNewPIN(!showNewPIN)}
                        >
                            <Text style={styles.eyeIcon}>{showNewPIN ? '🙈' : '👁️'}</Text>
                        </TouchableOpacity>
                    </View>
                    {newPIN.length > 0 && (
                        <View style={styles.strengthIndicator}>
                            <Text style={styles.strengthText}>
                                Fortaleza: {newPIN.length >= 5 ? '✅ Buena' : '❌ Débil'}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.changePinButton, loading && styles.buttonDisabled]} 
                        onPress={handleChangePIN}
                        disabled={loading}
                    >
                        <Text style={styles.changePinButtonText}>
                            {loading ? 'Cambiando PIN...' : 'Cambiar PIN'}
                        </Text>
                    </TouchableOpacity>

                    {regresarPerfil && (
                        <TouchableOpacity 
                            style={styles.backButton} 
                            onPress={handleGoBack}
                        >
                            <Text style={styles.backButtonText}>Regresar al perfil</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Help Section */}
                <View style={styles.helpSection}>
                    <Text style={styles.helpTitle}>¿Necesitas ayuda?</Text>
                    <Text style={styles.helpText}>
                        Si tienes problemas para cambiar tu PIN, contacta a tu cooperativa
                    </Text>
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
    iconContainer: {
        backgroundColor: '#ffffff',
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    headerIcon: {
        fontSize: 32,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#cbd5e0',
        textAlign: 'center',
        fontWeight: '400',
    },
    formSection: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    securityNotice: {
        backgroundColor: '#fef5e7',
        borderLeftWidth: 4,
        borderLeftColor: '#f6ad55',
        borderRadius: 12,
        padding: 16,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    securityIcon: {
        fontSize: 20,
        marginRight: 12,
        marginTop: 2,
    },
    securityTextContainer: {
        flex: 1,
    },
    securityTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#744210',
        marginBottom: 8,
    },
    securityText: {
        fontSize: 14,
        color: '#975a16',
        lineHeight: 20,
    },
    inputContainer: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2d3748',
        marginBottom: 8,
    },
    inputWrapper: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 56,
        backgroundColor: '#ffffff',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingRight: 50,
        fontSize: 16,
        color: '#2d3748',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    eyeButton: {
        position: 'absolute',
        right: 16,
        padding: 8,
    },
    eyeIcon: {
        fontSize: 18,
    },
    strengthIndicator: {
        marginTop: 8,
    },
    strengthText: {
        fontSize: 14,
        fontWeight: '500',
    },
    buttonContainer: {
        marginTop: 20,
        gap: 16,
    },
    changePinButton: {
        backgroundColor: '#2b6cb0',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#2b6cb0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    buttonDisabled: {
        backgroundColor: '#a0aec0',
        shadowOpacity: 0.1,
    },
    changePinButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    backButton: {
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#e2e8f0',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    backButtonText: {
        color: '#4a5568',
        fontSize: 16,
        fontWeight: '600',
    },
    helpSection: {
        marginTop: 40,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    helpTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2d3748',
        marginBottom: 8,
    },
    helpText: {
        fontSize: 14,
        color: '#718096',
        lineHeight: 20,
    },
});