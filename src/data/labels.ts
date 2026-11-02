import type { CardCategory, CardType, ComboTag } from '../types/game';

export const TAG_LABELS: Record<ComboTag, string> = {
  DOC_LAP: 'Độc lập',
  DOAN_KET: 'Đoàn kết',
  KHANG_CHIEN: 'Kháng chiến',
  THONG_NHAT: 'Thống nhất',
  DOI_MOI: 'Đổi mới',
  PHAT_TRIEN: 'Phát triển'
};

export const ALL_TAGS: ComboTag[] = ['DOC_LAP', 'DOAN_KET', 'KHANG_CHIEN', 'THONG_NHAT', 'DOI_MOI', 'PHAT_TRIEN'];

export const CATEGORY_LABELS: Record<CardCategory, string> = {
  nhan_vat: 'Nhân vật lịch sử',
  su_kien: 'Sự kiện lịch sử',
  to_chuc: 'Tổ chức',
  van_kien: 'Văn kiện',
  dau_moc: 'Dấu mốc phát triển'
};

export const TYPE_LABELS: Record<CardType, string> = {
  attack: 'Tấn công',
  support: 'Hỗ trợ'
};

export const TIER_COLORS: Record<number, string> = {
  1: '#9aa1a6',
  2: '#5f9b6a',
  3: '#4a8cc2',
  4: '#a06bc9',
  5: '#D8AD62'
};