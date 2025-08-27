import { Text, StyleSheet } from "react-native";

interface TagMusicProps {
    genre: string
}

const genreColors: Record<string, string> = {
    rock: "#A87373",
    pop: "#FF6EC7",
    rap: "#CF4646",
    reggae: "#FFD700",
    jazz: "#5D3A9B",
    blues: "#1E4D8B",
    indie: "#A29BFE",
    metal: "#4B4B4B",
    trap: "#CF1111",
    bossaNova: "#C2B280",
    pagode: "#F28500",
    eletronica: "#16BABA",
    funk: "#FF4500",
    sertanejo: "#D4A373",
    mpb: "#2E8B57",
    forro: "#DAA520",
    classica: "#8B8B8B",
};

function getGenreColor(genre: string) {
    return genreColors[genre.toLowerCase()] || "#CCCCCC"; 
}

export default function TagMusic({ genre }: TagMusicProps) {
    return (
        <Text style={[styles.content, { backgroundColor: getGenreColor(genre) }]}>
            {genre}
        </Text>
    );
}

const styles = StyleSheet.create({
    content: {
        fontSize: 14,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 50,
        color: "#0A0212"
    }
});