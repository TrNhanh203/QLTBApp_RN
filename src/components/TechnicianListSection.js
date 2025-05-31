// 📁 src/components/TechnicianListSection.js
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { getDsKtvByPhanCongId } from '../services/phanCongService';
import { useNavigation } from '@react-navigation/native';
import TechnicianCard from './TechnicianCard';

export default function TechnicianListSection({ phanCongId }) {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        getDsKtvByPhanCongId(phanCongId)
            .then(res => setList(res.ktvList))
            .finally(() => setLoading(false));
    }, [phanCongId]);


    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 32 }} />;
    }

    if (list.length === 0) {
        return (
            <View style={{ alignItems: 'center', marginTop: 32 }}>
                <Text style={{ color: '#888' }}>Chưa có kỹ thuật viên tham gia</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={list}
            keyExtractor={(item) => item.phanCongKtv.id.toString()}
            renderItem={({ item }) => (
                <TechnicianCard item={item} onPress={() => { }} />
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
        />
    );
}

// const getColorForStatus = (status) => {
//     switch (status) {
//         case 'Đã chấp nhận': return '#4CAF50';     // xanh lá
//         case 'Đang thực hiện': return '#2196F3';   // xanh dương
//         case 'Tạm nghỉ': return '#FFC107';         // vàng
//         case 'Bị Hủy':
//         case 'Đã từ chối': return '#F44336';       // đỏ
//         case 'Hoàn Thành': return '#9C27B0';        // tím
//         default: return '#BDBDBD';                 // xám
//     }
// };

// export function TechnicianCard({ item, onPress }) {
//     return (
//         <TouchableOpacity onPress={onPress} style={styles.card}>
//             <Text>{item.taiKhoan?.hoTen || 'Không rõ'}</Text>

//             <Text style={styles.status}>{item.phanCongKtv.trangThai}</Text>
//         </TouchableOpacity>
//     );
// }

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#f4f4f4',
        borderRadius: 12,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    status: {
        marginTop: 4,
        color: '#555',
    },
});
