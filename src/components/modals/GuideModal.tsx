import React from 'react';
import { BALANCE } from '../../data/balance';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

interface GuideModalProps {
  open: boolean;
  onClose: () => void;
}

const SECTIONS: {title: string;body: string[];}[] = [
{
  title: 'Mục tiêu',
  body: [
  'Vượt qua 10 màn gắn với lịch sử Đảng Cộng sản Việt Nam từ 1930 đến nay.',
  'Mỗi màn có mục tiêu sát thương chia thành 4 mốc (40% · 60% · 80% · 100%). Bắt buộc đạt mốc 1 để vượt màn; các mốc còn lại thưởng thêm xu.']

},
{
  title: 'Đội hình & kho',
  body: [
  `Đội hình tối đa ${BALANCE.maxFormation} vị trí (mở dần sau mỗi màn 1–5), kho lưu trữ ${BALANCE.maxStorage} vị trí. Chỉ thẻ trong đội hình mới chiến đấu.`,
  'Kéo thả thẻ giữa đội hình và kho, đổi chỗ trong đội hình, hoặc kéo vào thùng rác để bán. Nhấn vào thẻ để xem chi tiết và thao tác nhanh.']

},
{
  title: 'Nâng sao',
  body: [
  'Kéo hai thẻ cùng loại và cùng số sao vào nhau để ghép: 1★ + 1★ = 2★, 2★ + 2★ = 3★ (tối đa).',
  'Hệ số sao: 1★ ×1.0 · 2★ ×1.7 · 3★ ×2.5 — áp dụng cho sát thương, giáp và cường độ hiệu ứng.']

},
{
  title: 'Chiến đấu tự động',
  body: [
  `Mỗi trận tối đa ${BALANCE.maxTurns} lượt: hiệu ứng đầu lượt → thẻ hỗ trợ dùng kỹ năng → cộng Kháng chiến → thẻ tấn công ra đòn → đối thủ phản công ở lượt 2, 4, 6, 8.`,
  'Phản công trừ Ý chí; giáp từ thẻ hỗ trợ sẽ chặn bớt. Nếu Ý chí về 0 trước khi đạt mốc 1, bạn phải đánh lại màn.']

},
{
  title: 'Kháng chiến & combo',
  body: [
  'Kháng chiến (0–20) mỗi điểm +2% sát thương toàn đội, được đặt lại khi bắt đầu màn mới.',
  'Combo nhãn: 2 thẻ khác nhau cùng nhãn +10%, 3 thẻ +18% và +1 Kháng chiến/lượt, 4+ thẻ +25% và +2 Kháng chiến/lượt. Một số cặp thẻ có combo đặc biệt. Tổng combo tối đa +25%.']

},
{
  title: 'Cửa hàng',
  body: [
  'Cửa hàng mở giữa các màn với 5 thẻ ngẫu nhiên (luôn có ít nhất 1 thẻ hỗ trợ). Giá mua bằng cấp thẻ. Làm mới tốn 1 xu.',
  'Giá bán: Thẻ 1 sao nhận lại 100% giá mua; Thẻ đã hợp nhất nhận lại 70% tổng số xu đã ghép. Sau mỗi màn có câu hỏi lịch sử, trả lời đúng nhận thêm 1 xu.']

}];


export function GuideModal({ open, onClose }: GuideModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Hướng dẫn chơi"
      subtitle="Tập hợp sức mạnh, kết nối dấu mốc lịch sử và xây dựng đội hình."
      size="lg"
      footer={
      <Button variant="gold" onClick={onClose}>
          Đã hiểu
        </Button>
      }>
      
      <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
        {SECTIONS.map((s, i) =>
        <section key={s.title} className="flex gap-3">
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded bg-flag font-display text-sm font-bold">{i + 1}</span>
            <div>
              <h3 className="font-display text-lg font-bold uppercase tracking-wide text-gold">{s.title}</h3>
              {s.body.map((p) =>
            <p key={p} className="mt-1 text-sm leading-relaxed text-paper/80">
                  {p}
                </p>
            )}
            </div>
          </section>
        )}
      </div>
    </Modal>);

}