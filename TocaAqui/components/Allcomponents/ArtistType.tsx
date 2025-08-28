import { Text, View, StyleSheet, } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



interface ArtistTypeProps {
    type: string;
}

const typeName: Record<string, string> = {
    solo: "microphone",
    banda: "guitar",
    dj: "compact-disc"
};


function getTypeName(type: string) {
    return typeName[type.toLowerCase()] || "user";
}

export default function ArtistType({ type }: ArtistTypeProps) {
    return (
        <View style={styles.container}>
            <FontAwesome5 name={getTypeName(type) as any} size={18} color="#7381A8" />
            <Text style={styles.text}>{type}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    text: {
        color: "#7381A8",
        fontSize: 14,
        fontWeight: "500",
    }
}) 