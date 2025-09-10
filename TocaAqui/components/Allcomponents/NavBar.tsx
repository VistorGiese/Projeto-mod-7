import { StyleSheet, Text, View, Pressable } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors } from "@/utils/colors";
import { useState } from "react";

export default function NavBar() {
    const [selectedSection, setSelectedSection] = useState('home');

    const navItems = [
        { id: 'home', icon: 'house', text: 'Início', type: 'FontAwesome6' },
        { id: 'calendar', icon: 'calendar-day', text: 'Agenda', type: 'FontAwesome6' },
        { id: 'favorites', icon: 'star', text: 'Favoritos', type: 'FontAwesome' },
        { id: 'profile', icon: 'user', text: 'Perfil', type: 'FontAwesome' }
    ];

    return (
        <View style={styles.container}>
            {navItems.map((item) => (
                <Pressable 
                    key={item.id}
                    onPress={() => setSelectedSection(item.id)}
                    style={[
                        styles.containerItem,
                        selectedSection === item.id && styles.selectedItem
                    ]}
                >
                    {item.type === 'FontAwesome6' ? (
                        <FontAwesome6 
                            name={item.icon} 
                            size={18} 
                            color={selectedSection === item.id ? colors.purpleBlack : "white"} 
                        />
                    ) : (
                        <FontAwesome 
                            name={item.icon} 
                            size={20} 
                            color={selectedSection === item.id ? colors.purpleBlack : "white"} 
                        />
                    )}
                    {selectedSection === item.id && (
                        <Text style={styles.text}>{item.text}</Text>
                    )}
                </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#07010C",
        padding: '8%',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        bottom: 0,
        position: 'absolute',
        zIndex: 2,
    },
    containerItem: {
        flexDirection: 'row',
        gap: 6,
        padding: 10,
        borderRadius: 20,
    },
    selectedItem: {
        backgroundColor: 'white',
    },
    text: {
        color: colors.purpleBlack,
        fontSize: 14,
        fontFamily: 'Montserrat-Bold'
    }
})