import { useEffect, useState } from 'react';
import { getDsKtvByPhanCongId } from '../services/phanCongService';

export default function usePhanCongKtvViewModel(phanCongId) {
    const [ktvList, setKtvList] = useState([]);
    const [trangThaiChung, setTrangThaiChung] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!phanCongId) return;

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getDsKtvByPhanCongId(phanCongId);
                setKtvList(data.ktvList);
                setTrangThaiChung(data.trangThaiChung);
            } catch (e) {
                console.error('❌ Lỗi khi load KTV:', e);
                setError('Không thể tải danh sách KTV');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [phanCongId]);

    return {
        ktvList,
        trangThaiChung,
        isLoading,
        error,
        refresh: () => getDsKtvByPhanCongId(phanCongId).then(data => {
            setKtvList(data.ktvList);
            setTrangThaiChung(data.trangThaiChung);
        }),
    };
}
