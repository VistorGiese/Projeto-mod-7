import React from "react";
import { View, Text, StyleSheet, ImageBackground, FlatList } from "react-native";
import Button from "../components/Allcomponents/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigate";
import NavBar from "@/components/Allcomponents/NavBar";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { colors } from "@/utils/colors";
import CardEvent from "@/components/Allcomponents/CardEvent";
import { eventsMock } from "@/components/Allcomponents/mockEvents";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Schedulling() {
    const navigation = useNavigation<NavigationProp>();

    return (
        <ImageBackground
            source={require('../assets/images/All/BG.png')} 
            style={styles.container}
            imageStyle={styles.backgroundImage}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Agendamento</Text>
            </View>

            <View style={styles.containerContent}>
                <View style={styles.buttonsContainer}>
                    <Button
                        style={styles.button}
                        onPress={() => navigation.navigate("CreateEvent")}
                    >
                        <Text style={styles.buttonText}>Crie um evento</Text>
                        <FontAwesome5 name="plus" size={18} color={colors.purpleBlack} />
                    </Button>
                </View>

                <FlatList
                    data={eventsMock}
                    keyExtractor={(item, idx) => idx.toString()}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => (
                        <CardEvent
                            date={item.date}
                            eventName={item.eventName}
                            interestedCount={item.interestedCount}
                            artists={item.artists}
                        />
                    )}
                    ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            <NavBar />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        position: "absolute",
        top: "10%",
        width: "100%",
        alignItems: "center",
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: colors.purpleBlack2,
        paddingBottom: 80, 
    },
    containerContent: {
        top: "20%",
        height: "100%",
    },
    backgroundImage: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontFamily: 'AkiraExpanded-Superbold',
        color: "#fff",
        marginBottom: 20,
        textAlign: "center",
    },
    buttonsContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    button: {
        width: "60%",
        height: 50,
        flexDirection: "row",
        gap: 10,
    },
    buttonText: {
        color: colors.purpleBlack,
        fontSize: 18,
        fontWeight: "bold",
    },
    listContent: {
        paddingBottom: 20,
    },
});
