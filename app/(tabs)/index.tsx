import Button from '@/components/button';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
    return (
        <SafeAreaView className="flex-1" style={styles.container}>
            <Text className="text-red-600">coucou</Text>
            <Button title="Button" />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        margin: 20,
        minHeight: '100%',
    },
});