import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const getColorForStatus = (status) => {
    switch (status) {
        case 'Đã chấp nhận':        // TrangThaiPhanCong.DA_CHAP_NHAN
        case 'Hoàn Thành':          // TrangThaiPhanCong.HOAN_THANH
            return '#4CAF50';       // Xanh lá

        case 'Chờ phản hồi':        // TrangThaiPhanCong.CHO_PHAN_HOI
            return '#FFC107';       // Vàng đậm

        case 'Đang thực hiện':      // TrangThaiPhanCong.DANG_THUC_HIEN
            return '#2196F3';       // Xanh dương

        case 'Tạm nghỉ':            // TrangThaiPhanCong.TAM_NGHI
            return '#FF9800';       // Cam

        case 'Bị Hủy':              // TrangThaiPhanCong.BI_HUY
            return '#9E9E9E';       // Xám

        case 'Đã từ chối':          // TrangThaiPhanCong.DA_TU_CHOI
            return '#F44336';       // Đỏ

        default:
            return '#BDBDBD';       // Xám nhạt (fallback)
    }
};


// Danh sách ảnh avatar mẫu
const avatarSources = [
    require('../../assets/engineers/engineer01.png'),
    require('../../assets/engineers/engineer02.png'),
    require('../../assets/engineers/engineer03.png'),
    require('../../assets/engineers/engineer04.png'),
    require('../../assets/engineers/engineer05.png'),
    require('../../assets/engineers/engineer06.png'),
];

export default function TechnicianCard({ item, onPress }) {
    const { taiKhoan, phanCongKtv } = item;
    const statusColor = getColorForStatus(phanCongKtv.trangThai);

    // 🎲 Chọn ngẫu nhiên avatar 1 lần duy nhất khi render
    const randomAvatar = useMemo(() => {
        const idx = Math.floor(Math.random() * avatarSources.length);
        return avatarSources[idx];
    }, []);

    return (
        <TouchableOpacity onPress={onPress} style={styles.cardWrapper}>
            <View style={[styles.statusBar, { backgroundColor: statusColor }]} />
            <View style={styles.cardContent}>
                <Image
                    source={randomAvatar}
                    style={styles.avatar}
                    resizeMode="cover"
                />
                <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{taiKhoan?.hoTen ?? 'Không rõ'}</Text>
                    <Text style={[styles.status, { color: statusColor }]}>
                        {phanCongKtv.trangThai}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardWrapper: {
        marginBottom: 12,
        borderRadius: 12,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,

        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    statusBar: {
        height: 6,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16,
        backgroundColor: '#ddd',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    status: {
        fontSize: 14,
        fontWeight: '500',
    },
});
