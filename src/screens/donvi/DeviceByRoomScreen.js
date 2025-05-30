// src/screens/admin/DeviceByRoomScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DeviceCardInGrid from '../../components/DeviceCardInGrid';
import { getAllDevicesInPhong } from '../../services/deviceService'; // tạo hàm này

export default function DeviceByRoomScreen() {
    const { phongId, tenPhong } = useRoute().params;
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const data = await getAllDevicesInPhong(phongId);
                setDevices(data);
            } catch (e) {
                console.error('❌ Lỗi khi tải thiết bị theo phòng:', e);
            } finally {
                setLoading(false);
            }
        };

        fetchDevices();
    }, [phongId]);

    const renderItem = ({ item }) => (
        <DeviceCardInGrid
            device={item}
            onPress={() => navigation.navigate('ThietBiDetail', { thietBiId: item.id })}
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thiết bị phòng {tenPhong}</Text>
            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text>Đang tải thiết bị...</Text>
                </View>
            ) : (
                <FlatList
                    data={devices}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    renderItem={renderItem}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 12 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
    loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    row: { justifyContent: 'space-between' },
    listContent: { paddingBottom: 20 },
});
