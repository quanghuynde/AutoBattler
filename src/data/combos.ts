import type { Combo } from '../types/game';

/** Special two-card combos. All combo logic reads from this list. */
export const specialCombos: Combo[] = [
{
  id: 'ngon_co_dau_tien',
  name: 'Ngọn cờ đầu tiên',
  cardIds: ['nguyen_ai_quoc', 'cuong_linh'],
  description: '+2 Kháng chiến khi bắt đầu trận.',
  effect: { kind: 'startResistance', amount: 2 }
},
{
  id: 'duong_loi_vung_vang',
  name: 'Đường lối vững vàng',
  cardIds: ['tran_phu', 'luan_cuong_1930'],
  description: 'Tạo 12 giáp khi bắt đầu trận.',
  effect: { kind: 'startArmor', amount: 12 }
},
{
  id: 'thoi_co_tong_khoi_nghia',
  name: 'Thời cơ Tổng khởi nghĩa',
  cardIds: ['viet_minh', 'cach_mang_thang_tam'],
  description: '+25% sát thương toàn đội ở lượt 3.',
  effect: { kind: 'turnDamage', turn: 3, percent: 0.25 }
},
{
  id: 'nen_doc_lap',
  name: 'Nền độc lập non trẻ',
  cardIds: ['tuyen_ngon_doc_lap', 'tong_tuyen_cu_1946'],
  description: 'Tạo 20 giáp khi bắt đầu trận.',
  effect: { kind: 'startArmor', amount: 20 }
},
{
  id: 'toan_dan_khang_chien',
  name: 'Toàn dân kháng chiến',
  cardIds: ['loi_keu_goi', 'dien_bien_phu'],
  description: 'Khi có ít nhất 5 Kháng chiến: +15% sát thương cho thẻ tấn công.',
  effect: { kind: 'conditionalAttack', minResistance: 5, percent: 0.15 }
},
{
  id: 'chien_dich_lich_su',
  name: 'Chiến dịch lịch sử',
  cardIds: ['vo_nguyen_giap', 'dien_bien_phu'],
  description: '+25% sát thương toàn đội ở lượt 6.',
  effect: { kind: 'turnDamage', turn: 6, percent: 0.25 }
},
{
  id: 'the_tien_cong',
  name: 'Thế tiến công',
  cardIds: ['dong_khoi', 'mat_tran_dtgp'],
  description: 'Khi có ít nhất 3 Kháng chiến: +10% sát thương cho thẻ tấn công.',
  effect: { kind: 'conditionalAttack', minResistance: 3, percent: 0.1 }
},
{
  id: 'non_song_thu_mot_dai',
  name: 'Non sông thu về một dải',
  cardIds: ['hiep_dinh_paris', 'chien_dich_hcm'],
  description: 'Từ lượt 5 trở đi: +20% sát thương toàn đội.',
  effect: { kind: 'fromTurnDamage', fromTurn: 5, percent: 0.2 }
},
{
  id: 'khoi_xuong_doi_moi',
  name: 'Khởi xướng Đổi mới',
  cardIds: ['dai_hoi_vi', 'doi_moi'],
  description: '+3 Kháng chiến khi bắt đầu trận.',
  effect: { kind: 'startResistance', amount: 3 }
},
{
  id: 'vuon_ra_the_gioi',
  name: 'Vươn ra thế giới',
  cardIds: ['doi_moi', 'hoi_nhap'],
  description: 'Từ lượt 4 trở đi: +15% sát thương toàn đội.',
  effect: { kind: 'fromTurnDamage', fromTurn: 4, percent: 0.15 }
}];