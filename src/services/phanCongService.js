import { db } from './firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

// 🔍 1. Lấy phân công theo ID
export async function getPhanCongById(id) {
    console.log('📥 getPhanCongById - ID:', id);
    const ref = doc(db, 'phan_cong', id.toString());
    const snap = await getDoc(ref);
    const result = snap.exists() ? { id: snap.id, ...snap.data() } : null;
    console.log('📤 getPhanCongById - Kết quả:', result);
    return result;
}

// 🔍 2. Lấy danh sách kỹ thuật viên của phân công
export async function getPhanCongKtvList(phanCongId) {
    console.log('📥 getPhanCongKtvList - phanCongId:', phanCongId);
    const ref = collection(db, 'phan_cong_ktv');
    const q = query(ref, where('phanCongId', '==', phanCongId));
    const snap = await getDocs(q);
    console.log('📊 Số lượng bản ghi phan_cong_ktv:', snap.size);

    const list = [];
    for (const docSnap of snap.docs) {
        const data = docSnap.data();
        console.log('📄 Dữ liệu phan_cong_ktv:', data);

        let taiKhoan = null;
        try {
            const rawTaiKhoanId = data.taiKhoanKTVId ?? data.taiKhoanId; // fix here ✅
            if (rawTaiKhoanId) {
                const taiKhoanIdStr = rawTaiKhoanId.toString();
                const tkRef = doc(db, 'tai_khoan', taiKhoanIdStr);
                const tkSnap = await getDoc(tkRef);

                if (tkSnap.exists()) {
                    taiKhoan = { id: tkSnap.id, ...tkSnap.data() };
                    console.log(`✅ Tải tài khoản thành công (ID: ${taiKhoanIdStr}):`, taiKhoan);
                } else {
                    console.warn(`⚠️ Không tìm thấy tài khoản với ID: ${taiKhoanIdStr}`);
                }
            }
        } catch (err) {
            console.error('❌ Không lấy được tài khoản:', err);
        }

        list.push({ id: docSnap.id, ...data, taiKhoan });
    }


    return list;
}

// 🔧 Hàm mới: lấy danh sách kỹ thuật viên + trạng thái chung của phân công
export async function getDsKtvByPhanCongId(phanCongId) {
    console.log('🚀 Bắt đầu getDsKtvByPhanCongId:', phanCongId);
    const ktvListRaw = await getPhanCongKtvList(phanCongId);
    const phanCong = await getPhanCongById(phanCongId);

    const ktvList = ktvListRaw.map((item) => {
        const mapped = {
            phanCongKtv: {
                id: item.id,
                phanCongId: item.phanCongId,
                taiKhoanId: item.taiKhoanId,
                trangThai: item.trangThai,
                ghiChu: item.ghiChu ?? null,
            },
            taiKhoan: item.taiKhoan || null,
        };
        console.log('🧑‍🔧 Kỹ thuật viên mapped:', mapped);
        return mapped;
    });

    const result = {
        ktvList,
        trangThaiChung: phanCong?.trangThai || null,
    };
    console.log('🏁 Kết quả cuối cùng:', result);
    return result;
}



// import { db } from './firebaseConfig';
// import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

// // 🔍 1. Lấy phân công theo ID
// export async function getPhanCongById(id) {
//     const ref = doc(db, 'phan_cong', id.toString());
//     const snap = await getDoc(ref);
//     return snap.exists() ? { id: snap.id, ...snap.data() } : null;

// }

// // 🔍 2. Lấy danh sách kỹ thuật viên của phân công
// export async function getPhanCongKtvList(phanCongId) {
//     const ref = collection(db, 'phan_cong_ktv');
//     const q = query(ref, where('phanCongId', '==', phanCongId));
//     const snap = await getDocs(q);

//     const list = [];
//     for (const docSnap of snap.docs) {
//         const data = docSnap.data();
//         let taiKhoan = null;

//         try {
//             if (data.taiKhoanId) {
//                 const tkRef = doc(db, 'tai_khoan', data.taiKhoanId.toString());
//                 const tkSnap = await getDoc(tkRef);
//                 taiKhoan = tkSnap.exists() ? { id: tkSnap.id, ...tkSnap.data() } : null;
//             }
//         } catch (err) {
//             console.error('❌ Không lấy được tài khoản:', err);
//         }


//         list.push({ id: docSnap.id, ...data, taiKhoan });
//     }

//     return list;
// }


// // 🔧 Hàm mới: lấy danh sách kỹ thuật viên + trạng thái chung của phân công
// export async function getDsKtvByPhanCongId(phanCongId) {
//     const ktvListRaw = await getPhanCongKtvList(phanCongId);
//     const phanCong = await getPhanCongById(phanCongId);

//     // Chuyển đổi lại cho đúng dạng
//     const ktvList = ktvListRaw.map((item) => ({
//         phanCongKtv: {
//             id: item.id,
//             phanCongId: item.phanCongId,
//             taiKhoanId: item.taiKhoanId,
//             trangThai: item.trangThai,
//             ghiChu: item.ghiChu ?? null,
//         },
//         taiKhoan: item.taiKhoan || null,
//     }));

//     return {
//         ktvList,
//         trangThaiChung: phanCong?.trangThai || null,
//     };
// }
