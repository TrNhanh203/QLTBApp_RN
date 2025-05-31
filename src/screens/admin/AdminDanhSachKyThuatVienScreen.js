

import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
    Modal,
} from 'react-native';
import { getTechniciansWithFilters } from '../../services/technicianService';
import { getTrangThaiKtvColor } from '../../constants/trangThaiKtv';
import useAppTheme from '../../hooks/useAppTheme';

const avatarList = [
    require('../../../assets/engineers/engineer01.png'),
    require('../../../assets/engineers/engineer02.png'),
    require('../../../assets/engineers/engineer03.png'),
    require('../../../assets/engineers/engineer04.png'),
    require('../../../assets/engineers/engineer05.png'),
    require('../../../assets/engineers/engineer06.png'),
];

function randomAvatar() {
    return avatarList[Math.floor(Math.random() * avatarList.length)];
}

export default function AdminDanhSachKyThuatVienScreen() {
    const { colors } = useAppTheme();
    const [technicians, setTechnicians] = useState([]);
    const [search, setSearch] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [filters, setFilters] = useState({ trangThai: [], chuyenMon: [] });

    useEffect(() => {
        loadData();
    }, [filters]);

    const loadData = async () => {
        try {
            const result = await getTechniciansWithFilters({
                ten: search,
                trangThai: filters.trangThai,
                chuyenMon: filters.chuyenMon,
            });
            setTechnicians(result);
        } catch (e) {
            console.error('Lỗi khi load kỹ thuật viên:', e);
        }
    };

    const renderItem = ({ item }) => {
        //console.log('📞 Số điện thoại:', item.soDienThoai);
        const color = getTrangThaiKtvColor(item.trangThai);
        return (
            <View style={styles.card}>
                <View style={styles.avatarWrapper}>
                    <Image source={randomAvatar()} style={styles.avatar} />
                </View>

                <View style={styles.info}>
                    <Text style={styles.name}>{item.hoTen}</Text>
                    <Text style={styles.phone}>{item.soDienThoai}</Text>
                    <View style={[styles.statusChip, { backgroundColor: color }]}>
                        <Text style={styles.statusText}>{item.trangThai}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.searchRow}>
                <TextInput
                    style={[styles.searchInput, { borderColor: colors.outlineVariant, color: colors.onSurface }]}
                    placeholder="Tìm kiếm kỹ thuật viên..."
                    placeholderTextColor={colors.onSurfaceVariant}
                    value={search}
                    onChangeText={text => setSearch(text)}
                    onSubmitEditing={loadData}
                />
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.filterButton}>
                    <Text style={{ color: colors.primary }}>Bộ lọc</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={technicians}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
            />

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
                        <Text style={styles.sheetTitle}>Bộ lọc</Text>
                        <Text style={styles.filterLabel}>Trạng thái</Text>
                        {['Đang làm', 'Đang nghỉ', 'Bận', 'Offline'].map(status => (
                            <TouchableOpacity
                                key={status}
                                onPress={() =>
                                    setFilters(prev => ({
                                        ...prev,
                                        trangThai: prev.trangThai.includes(status)
                                            ? prev.trangThai.filter(s => s !== status)
                                            : [...prev.trangThai, status],
                                    }))
                                }
                            >
                                <Text style={{ padding: 8 }}>
                                    {filters.trangThai.includes(status) ? '✅' : '⬜'} {status}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={{ marginTop: 16, alignSelf: 'flex-end' }}
                        >
                            <Text style={{ color: colors.primary }}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 2,
    },
    avatarWrapper: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        borderWidth: 2,
        borderColor: '#ccc',
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    info: {
        flex: 1,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    phone: {
        color: '#000',
        fontSize: 14,
        marginBottom: 6,
    },
    statusChip: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 16,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 8,
    },
    filterButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderRadius: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    sheet: {
        padding: 16,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    sheetTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    filterLabel: {
        fontWeight: '600',
        marginTop: 8,
    },
});
