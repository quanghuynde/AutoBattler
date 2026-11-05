import type { CardDefinition } from '../types/game';
import { CARD_IMAGES, CATEGORY_IMAGES as IMG } from './images';

const SRC_TEXTBOOK =
'Giáo trình Lịch sử Đảng Cộng sản Việt Nam (dành cho bậc đại học không chuyên lý luận chính trị), Bộ Giáo dục và Đào tạo, NXB Chính trị quốc gia Sự thật, 2021.';
const SRC_PORTAL = 'Cổng Thông tin điện tử Đảng Cộng sản Việt Nam — dangcongsan.vn';
const SRC_HCM = 'Hồ Chí Minh Toàn tập, NXB Chính trị quốc gia Sự thật.';

export const cards: CardDefinition[] = [
// ───────────── CẤP 1 ─────────────
{
  id: 'hoi_vn_cmtn',
  name: 'Hội Việt Nam Cách mạng Thanh niên',
  category: 'to_chuc',
  type: 'attack',
  tier: 1,
  period: 1,
  years: '1925 – 1929',
  tags: ['DOAN_KET', 'DOC_LAP'],
  image: CARD_IMAGES.hoi_vn_cmtn,
  summary: 'Tổ chức do Nguyễn Ái Quốc thành lập tháng 6/1925 tại Quảng Châu, chuẩn bị cho sự ra đời của Đảng.',
  history:
  'Hội Việt Nam Cách mạng Thanh niên ra đời tháng 6/1925 tại Quảng Châu (Trung Quốc). Hội xuất bản báo Thanh niên, mở các lớp huấn luyện cán bộ và từ năm 1928 thực hiện phong trào "vô sản hóa", đưa hội viên vào nhà máy, hầm mỏ, đồn điền. Đây là bước chuẩn bị quan trọng về tư tưởng, chính trị và tổ chức cho việc thành lập Đảng.',
  skill: {
    name: 'Truyền bá lý luận',
    description: 'Mỗi 2 lượt: đòn đánh mạnh hơn 10% và cộng 1 Kháng chiến.',
    cooldown: 2,
    effect: { kind: 'strikeResistance', percent: 0.1, resistance: 1 }
  },
  sources: [SRC_TEXTBOOK]
},
{
  id: 'nguyen_ai_quoc',
  name: 'Nguyễn Ái Quốc',
  category: 'nhan_vat',
  type: 'attack',
  tier: 1,
  period: 1,
  years: '1930',
  tags: ['DOC_LAP', 'DOAN_KET'],
  image: CARD_IMAGES.nguyen_ai_quoc,
  summary: 'Chủ trì Hội nghị hợp nhất các tổ chức cộng sản, thành lập Đảng Cộng sản Việt Nam đầu năm 1930.',
  history:
  'Năm 1920, Nguyễn Ái Quốc tiếp cận Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa của V.I. Lênin và tham gia sáng lập Đảng Cộng sản Pháp tại Đại hội Tua (12/1920). Từ ngày 6/1 đến 7/2/1930, Người chủ trì Hội nghị hợp nhất các tổ chức cộng sản tại Cửu Long (Hương Cảng, Trung Quốc), thành lập Đảng Cộng sản Việt Nam.',
  skill: {
    name: 'Hợp nhất lực lượng',
    description: 'Mỗi 3 lượt: đòn đánh mạnh hơn 30% và cộng 1 Kháng chiến.',
    cooldown: 3,
    effect: { kind: 'strikeResistance', percent: 0.3, resistance: 1 }
  },
  sources: [SRC_TEXTBOOK, SRC_HCM]
},
{
  id: 'xo_viet_nghe_tinh',
  name: 'Xô viết Nghệ – Tĩnh',
  category: 'su_kien',
  type: 'attack',
  tier: 1,
  period: 1,
  years: '1930 – 1931',
  tags: ['KHANG_CHIEN', 'DOAN_KET'],
  image: CARD_IMAGES.xo_viet_nghe_tinh,
  summary: 'Đỉnh cao của phong trào cách mạng 1930–1931, chính quyền kiểu Xô viết ra đời ở Nghệ An, Hà Tĩnh.',
  history:
  'Trong cao trào cách mạng 1930–1931 do Đảng lãnh đạo, ở nhiều xã thuộc Nghệ An và Hà Tĩnh, chính quyền thực dân, phong kiến tan rã; các Xô viết được thành lập và thực hiện nhiều chính sách tiến bộ. Phong trào bị thực dân Pháp đàn áp khốc liệt nhưng được xem là cuộc tập dượt đầu tiên của Đảng và quần chúng.',
  skill: {
    name: 'Cao trào cách mạng',
    description: 'Mỗi 3 lượt: gây thêm 50% sát thương cơ bản.',
    cooldown: 3,
    effect: { kind: 'bonusDamage', percent: 0.5 }
  },
  sources: [SRC_TEXTBOOK]
},
{
  id: 'tran_phu',
  name: 'Trần Phú',
  category: 'nhan_vat',
  type: 'attack',
  tier: 1,
  period: 1,
  years: '1930 – 1931',
  tags: ['DOC_LAP', 'KHANG_CHIEN'],
  image: CARD_IMAGES.tran_phu,
  summary: 'Tổng Bí thư đầu tiên của Đảng, người khởi thảo Luận cương chính trị tháng 10/1930.',
  history:
  'Tại Hội nghị Ban Chấp hành Trung ương lần thứ nhất (10/1930), Trần Phú được bầu làm Tổng Bí thư. Hội nghị thông qua Luận cương chính trị do đồng chí khởi thảo. Năm 1931, đồng chí bị thực dân Pháp bắt và hy sinh trong nhà tù khi mới 27 tuổi.',
  skill: {
    name: 'Giữ vững chí khí',
    description: 'Mỗi 2 lượt: nếu Kháng chiến từ 3 trở lên, gây thêm 40% sát thương.',
    cooldown: 2,
    effect: { kind: 'conditionalDamage', minResistance: 3, percent: 0.4 }
  },
  sources: [SRC_TEXTBOOK, SRC_PORTAL]
},
{
  id: 'cuong_linh',
  name: 'Cương lĩnh chính trị đầu tiên',
  category: 'van_kien',
  type: 'support',
  tier: 1,
  period: 1,
  years: '02/1930',
  tags: ['DOC_LAP'],
  image: CARD_IMAGES.cuong_linh,
  summary: 'Gồm Chánh cương vắn tắt và Sách lược vắn tắt do Nguyễn Ái Quốc soạn thảo, thông qua tại Hội nghị thành lập Đảng.',
  history:
  'Cương lĩnh chính trị đầu tiên xác định đường lối chiến lược của cách mạng Việt Nam: tiến hành cách mạng tư sản dân quyền và thổ địa cách mạng để đi tới xã hội cộng sản; nhiệm vụ hàng đầu là đánh đổ đế quốc, phong kiến, làm cho nước Việt Nam hoàn toàn độc lập.',
  skill: {
    name: 'Kim chỉ nam',
    description: 'Mỗi 2 lượt: cộng 1 Kháng chiến. Nội tại: +5% sát thương toàn đội.',
    cooldown: 2,
    effect: { kind: 'resistance', amount: 1 }
  },
  supportBuff: 0.05,
  sources: [SRC_TEXTBOOK]
},
{
  id: 'luan_cuong_1930',
  name: 'Luận cương chính trị 10/1930',
  category: 'van_kien',
  type: 'support',
  tier: 1,
  period: 1,
  years: '10/1930',
  tags: ['KHANG_CHIEN'],
  image: CARD_IMAGES.luan_cuong_1930,
  summary: 'Văn kiện do Trần Phú khởi thảo, được thông qua tại Hội nghị Trung ương lần thứ nhất.',
  history:
  'Hội nghị Ban Chấp hành Trung ương lần thứ nhất họp tháng 10/1930 tại Hương Cảng, thông qua Luận cương chính trị và quyết định đổi tên Đảng Cộng sản Việt Nam thành Đảng Cộng sản Đông Dương.',
  skill: {
    name: 'Củng cố đường lối',
    description: 'Mỗi 2 lượt: tạo 10 điểm giáp. Nội tại: +3% sát thương toàn đội.',
    cooldown: 2,
    effect: { kind: 'armor', amount: 10 }
  },
  supportBuff: 0.03,
  sources: [SRC_TEXTBOOK]
},
{
  id: 'dai_hoi_i',
  name: 'Đại hội Đảng lần thứ I',
  category: 'su_kien',
  type: 'support',
  tier: 1,
  period: 1,
  years: '03/1935',
  tags: ['DOAN_KET'],
  image: CARD_IMAGES.dai_hoi_i,
  summary: 'Họp tại Ma Cao (Trung Quốc), đánh dấu sự khôi phục hệ thống tổ chức của Đảng.',
  history:
  'Sau thời kỳ khủng bố trắng 1931–1934, các cơ sở Đảng dần được khôi phục. Tháng 3/1935, Đại hội đại biểu lần thứ I của Đảng họp tại Ma Cao, đánh dấu việc khôi phục hệ thống tổ chức Đảng từ cơ sở đến Trung ương.',
  skill: {
    name: 'Khôi phục tổ chức',
    description: 'Mỗi 3 lượt: hồi 5 Ý chí. Nội tại: +4% sát thương toàn đội.',
    cooldown: 3,
    effect: { kind: 'heal', amount: 5 }
  },
  supportBuff: 0.04,
  sources: [SRC_TEXTBOOK]
},

// ───────────── CẤP 2 ─────────────
{
  id: 'phong_trao_dan_chu',
  name: 'Phong trào dân chủ 1936 – 1939',
  category: 'su_kien',
  type: 'attack',
  tier: 2,
  period: 2,
  years: '1936 – 1939',
  tags: ['DOAN_KET', 'DOC_LAP'],
  image: CARD_IMAGES.phong_trao_dan_chu,
  summary: 'Cuộc vận động công khai đòi tự do, dân sinh, dân chủ, cơm áo và hòa bình.',
  history:
  'Trong bối cảnh quốc tế mới, Đảng chủ trương kết hợp các hình thức đấu tranh công khai, hợp pháp với bí mật. Tiêu biểu là phong trào Đông Dương Đại hội (1936) và cuộc mít tinh ngày 1/5/1938 tại khu Đấu Xảo, Hà Nội.',
  skill: {
    name: 'Đấu tranh công khai',
    description: 'Mỗi 2 lượt: đòn đánh mạnh hơn 20% và cộng 1 Kháng chiến.',
    cooldown: 2,
    effect: { kind: 'strikeResistance', percent: 0.2, resistance: 1 }
  },
  sources: [SRC_TEXTBOOK]
},
{
  id: 'ha_huy_tap',
  name: 'Hà Huy Tập',
  category: 'nhan_vat',
  type: 'attack',
  tier: 2,
  period: 2,
  years: '1936 – 1938',
  tags: ['DOC_LAP', 'KHANG_CHIEN'],
  image: CARD_IMAGES.ha_huy_tap,
  summary: 'Tổng Bí thư của Đảng giai đoạn 1936–1938.',
  history:
  'Hà Huy Tập giữ cương vị Tổng Bí thư của Đảng từ năm 1936 đến năm 1938, cùng Trung ương chỉ đạo chuyển hướng phương pháp đấu tranh trong thời kỳ vận động dân chủ. Đồng chí bị thực dân Pháp xử bắn năm 1941.',
  skill: {
    name: 'Chuyển hướng chỉ đạo',
    description: 'Mỗi 3 lượt: gây thêm 60% sát thương cơ bản.',
    cooldown: 3,
    effect: { kind: 'bonusDamage', percent: 0.6 }
  },
  sources: [SRC_TEXTBOOK, SRC_PORTAL]
},
{
  id: 'nguyen_van_cu',
  name: 'Nguyễn Văn Cừ',
  category: 'nhan_vat',
  type: 'attack',
  tier: 2,
  period: 2,
  years: '1938 – 1940',
  tags: ['DOAN_KET', 'KHANG_CHIEN'],
  image: CARD_IMAGES.nguyen_van_cu,
  summary: 'Tổng Bí thư 1938–1940, tác giả tác phẩm "Tự chỉ trích" (1939).',
  history:
  'Nguyễn Văn Cừ giữ cương vị Tổng Bí thư từ năm 1938. Tháng 11/1939, đồng chí chủ trì Hội nghị Trung ương lần thứ sáu tại Bà Điểm (Hóc Môn, Gia Định), bước đầu chuyển hướng chỉ đạo chiến lược, đặt nhiệm vụ giải phóng dân tộc lên hàng đầu. Đồng chí hy sinh năm 1941.',
  skill: {
    name: 'Tự chỉ trích',
    description: 'Mỗi 2 lượt: nếu Kháng chiến từ 4 trở lên, gây thêm 50% sát thương.',
    cooldown: 2,
    effect: { kind: 'conditionalDamage', minResistance: 4, percent: 0.5 }
  },
  sources: [SRC_TEXTBOOK, SRC_PORTAL]
},
{
  id: 'khoi_nghia_bac_son',
  name: 'Khởi nghĩa Bắc Sơn',
  category: 'su_kien',
  type: 'attack',
  tier: 2,
  period: 3,
  years: '09/1940',
  tags: ['KHANG_CHIEN'],
  image: CARD_IMAGES.khoi_nghia_bac_son,
  summary: 'Cuộc khởi nghĩa tại Bắc Sơn (Lạng Sơn), đội du kích Bắc Sơn ra đời.',
  history:
  'Ngày 27/9/1940, nhân dân Bắc Sơn (Lạng Sơn) dưới sự lãnh đạo của Đảng bộ địa phương nổi dậy khởi nghĩa. Cuộc khởi nghĩa bị đàn áp nhưng lực lượng vũ trang được duy trì, phát triển thành đội du kích Bắc Sơn.',
  skill: {
    name: 'Du kích Bắc Sơn',
    description: 'Mỗi 4 lượt: gây thêm 100% sát thương cơ bản.',
    cooldown: 4,
    effect: { kind: 'bonusDamage', percent: 1 }
  },
  sources: [SRC_TEXTBOOK]
},
{
  id: 'mat_tran_dan_chu',
  name: 'Mặt trận Dân chủ Đông Dương',
  category: 'to_chuc',
  type: 'support',
  tier: 2,
  period: 2,
  years: '1936 – 1939',
  tags: ['DOAN_KET'],
  image: CARD_IMAGES.mat_tran_dan_chu,
  summary: 'Mặt trận tập hợp rộng rãi các tầng lớp nhân dân trong thời kỳ vận động dân chủ.',
  history:
  'Năm 1936, Đảng chủ trương thành lập Mặt trận Thống nhất Nhân dân Phản đế Đông Dương. Tháng 3/1938, Mặt trận đổi tên thành Mặt trận Dân chủ Đông Dương, tập hợp các giai cấp, tầng lớp đấu tranh chống phản động thuộc địa, chống phát xít, bảo vệ hòa bình.',
  skill: {
    name: 'Tập hợp quần chúng',
    description: 'Mỗi 2 lượt: cộng 1 Kháng chiến. Nội tại: +8% sát thương toàn đội.',
    cooldown: 2,
    effect: { kind: 'resistance', amount: 1 }
  },
  supportBuff: 0.08,
  sources: [SRC_TEXTBOOK]
},
{
  id: 'hoi_nghi_tw8',
  name: 'Hội nghị Trung ương 8 (1941)',
  category: 'su_kien',
  type: 'support',
  tier: 2,
  period: 3,
  years: '05/1941',
  tags: ['DOC_LAP'],
  image: CARD_IMAGES.hoi_nghi_tw8,
  summary: 'Do Nguyễn Ái Quốc chủ trì tại Pác Bó, đặt nhiệm vụ giải phóng dân tộc lên hàng đầu.',
  history:
  'Hội nghị Ban Chấp hành Trung ương lần thứ tám họp từ ngày 10 đến 19/5/1941 tại Pác Bó (Cao Bằng) do Nguyễn Ái Quốc chủ trì. Hội nghị hoàn chỉnh chủ trương chuyển hướng chỉ đạo chiến lược và quyết định thành lập Mặt trận Việt Nam Độc lập Đồng minh (Việt Minh).',
  skill: {
    name: 'Chuyển hướng chiến lược',
    description: 'Mỗi 3 lượt: cộng 2 Kháng chiến. Nội tại: +5% sát thương toàn đội.',
    cooldown: 3,
    effect: { kind: 'resistance', amount: 2 }
  },
  supportBuff: 0.05,
  sources: [SRC_TEXTBOOK]
},

// ───────────── CẤP 3 ─────────────
{
  id: 'cach_mang_thang_tam',
  name: 'Cách mạng tháng Tám',
  category: 'su_kien',
  type: 'attack',
  tier: 3,
  period: 3,
  years: '08/1945',
  tags: ['DOC_LAP', 'DOAN_KET'],
  image: CARD_IMAGES.cach_mang_thang_tam,
  summary: 'Tổng khởi nghĩa giành chính quyền trong cả nước tháng 8/1945.',
  history:
  'Hội nghị toàn quốc của Đảng (13–15/8/1945) tại Tân Trào quyết định phát động Tổng khởi nghĩa. Từ ngày 14 đến 28/8/1945, nhân dân cả nước nổi dậy giành chính quyền, mở ra kỷ nguyên độc lập dân tộc gắn liền với chủ nghĩa xã hội.',
  skill: {
    name: 'Tổng khởi nghĩa',
    description: 'Mỗi 3 lượt: đòn đánh mạnh hơn 50% và cộng 2 Kháng chiến.',
    cooldown: 3,
    effect: { kind: 'strikeResistance', percent: 0.5, resistance: 2 }
  },
  sources: [SRC_TEXTBOOK]
},
{
  id: 'vo_nguyen_giap',
  name: 'Đại tướng Võ Nguyên Giáp',
  category: 'nhan_vat',
  type: 'attack',
  tier: 3,
  period: 5,
  years: '1944 – 1954',
  tags: ['KHANG_CHIEN', 'DOC_LAP'],
  image: CARD_IMAGES.vo_nguyen_giap,
  summary: 'Tổng Tư lệnh Quân đội nhân dân Việt Nam, chỉ huy chiến dịch Điện Biên Phủ.',
  history:
  'Ngày 22/12/1944, theo chỉ thị của lãnh tụ Hồ Chí Minh, Võ Nguyên Giáp thành lập Đội Việt Nam Tuyên truyền Giải phóng quân. Trong kháng chiến chống thực dân Pháp, Đại tướng là Tổng Tư lệnh, trực tiếp chỉ huy chiến dịch Điện Biên Phủ năm 1954.',
  skill: {
    name: 'Thế trận chủ động',
    description: 'Mỗi 2 lượt: nếu Kháng chiến từ 6 trở lên, gây thêm 60% sát thương.',
    cooldown: 2,
    effect: { kind: 'conditionalDamage', minResistance: 6, percent: 0.6 }
  },
  sources: [SRC_TEXTBOOK, SRC_PORTAL]
},
{
  id: 'chien_dich_viet_bac',
  name: 'Chiến dịch Việt Bắc 1947',
  category: 'su_kien',
  type: 'attack',
  tier: 3,
  period: 5,
  years: 'Thu – đông 1947',
  tags: ['KHANG_CHIEN'],
  image: CARD_IMAGES.chien_dich_viet_bac,
  summary: 'Đánh bại cuộc tiến công quy mô lớn của thực dân Pháp lên căn cứ địa Việt Bắc.',
  history:
  'Thu – đông 1947, thực dân Pháp mở cuộc tiến công lên Việt Bắc nhằm tiêu diệt cơ quan đầu não kháng chiến. Quân và dân ta đánh bại cuộc tiến công, bảo vệ an toàn căn cứ địa và cơ quan lãnh đạo, buộc địch chuyển sang đánh lâu dài.',
  skill: {
    name: 'Phản công Việt Bắc',
    description: 'Mỗi 3 lượt: gây thêm 70% sát thương cơ bản.',
    cooldown: 3,
    effect: { kind: 'bonusDamage', percent: 0.7 }
  },
  sources: [SRC_TEXTBOOK]
},
{
  id: 'viet_minh',
  name: 'Mặt trận Việt Minh',
  category: 'to_chuc',
  type: 'support',
  tier: 3,
  period: 3,
  years: '19/05/1941',
  tags: ['DOAN_KET', 'DOC_LAP'],
  image: CARD_IMAGES.viet_minh,
  summary: 'Mặt trận Việt Nam Độc lập Đồng minh, đoàn kết toàn dân vì mục tiêu giải phóng dân tộc.',
  history:
  'Thực hiện Nghị quyết Hội nghị Trung ương 8, ngày 19/5/1941 Mặt trận Việt Nam Độc lập Đồng minh (Việt Minh) được thành lập, tập hợp các hội Cứu quốc, xây dựng lực lượng chính trị rộng lớn chuẩn bị cho Tổng khởi nghĩa.',
  skill: {
    name: 'Hội Cứu quốc',
    description: 'Mỗi 2 lượt: cộng 1 Kháng chiến. Nội tại: +8% sát thương toàn đội.',
    cooldown: 2,
    effect: { kind: 'resistance', amount: 1 }
  },
  supportBuff: 0.08,
  sources: [SRC_TEXTBOOK]
},
{
  id: 'tuyen_ngon_doc_lap',
  name: 'Tuyên ngôn Độc lập',
  category: 'van_kien',
  type: 'support',
  tier: 3,
  period: 4,
  years: '02/09/1945',
  tags: ['DOC_LAP'],
  image: CARD_IMAGES.tuyen_ngon_doc_lap,
  summary: 'Chủ tịch Hồ Chí Minh đọc tại Quảng trường Ba Đình, khai sinh nước Việt Nam Dân chủ Cộng hòa.',
  history:
  'Ngày 2/9/1945, tại Quảng trường Ba Đình (Hà Nội), Chủ tịch Hồ Chí Minh thay mặt Chính phủ lâm thời đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa.',
  skill: {
    name: 'Khai sinh nền độc lập',
    description: 'Mỗi 3 lượt: cộng 2 Kháng chiến. Nội tại: +10% sát thương toàn đội.',
    cooldown: 3,
    effect: { kind: 'resistance', amount: 2 }
  },
  supportBuff: 0.1,
  sources: [SRC_TEXTBOOK, SRC_HCM]
},
{
  id: 'tong_tuyen_cu_1946',
  name: 'Tổng tuyển cử năm 1946',
  category: 'dau_moc',
  type: 'support',
  tier: 3,
  period: 4,
  years: '06/01/1946',
  tags: ['DOAN_KET'],
  image: CARD_IMAGES.tong_tuyen_cu_1946,
  summary: 'Cuộc Tổng tuyển cử đầu tiên, bầu ra Quốc hội khóa I của nước Việt Nam Dân chủ Cộng hòa.',
  history:
  'Ngày 6/1/1946, cử tri cả nước đi bầu Quốc hội khóa I. Quốc hội đã lập ra Chính phủ chính thức và ngày 9/11/1946 thông qua bản Hiến pháp đầu tiên, tạo cơ sở pháp lý vững chắc cho chính quyền cách mạng.',
  skill: {
    name: 'Chính quyền hợp hiến',
    description: 'Mỗi 2 lượt: tạo 16 điểm giáp. Nội tại: +6% sát thương toàn đội.',
    cooldown: 2,
    effect: { kind: 'armor', amount: 16 }
  },
  supportBuff: 0.06,
  sources: [SRC_TEXTBOOK]
},

// ───────────── CẤP 4 ─────────────
{
  id: 'dien_bien_phu',
  name: 'Chiến thắng Điện Biên Phủ',
  category: 'su_kien',
  type: 'attack',
  tier: 4,
  period: 5,
  years: '13/03 – 07/05/1954',
  tags: ['KHANG_CHIEN', 'DOC_LAP'],
  image: CARD_IMAGES.dien_bien_phu,
  summary: 'Thắng lợi quyết định, buộc thực dân Pháp ký Hiệp định Giơnevơ.',
  history:
  'Chiến dịch Điện Biên Phủ diễn ra từ ngày 13/3 đến 7/5/1954, tiêu diệt toàn bộ tập đoàn cứ điểm của thực dân Pháp. Thắng lợi này tạo cơ sở để ký kết Hiệp định Giơnevơ (21/7/1954), kết thúc cuộc kháng chiến chống thực dân Pháp.',
  skill: {
    name: 'Tập đoàn cứ điểm sụp đổ',
    description: 'Mỗi 3 lượt: gây thêm 100% sát thương cơ bản.',
    cooldown: 3,
    effect: { kind: 'bonusDamage', percent: 1 }
  },
  sources: [SRC_TEXTBOOK]
},
{
  id: 'dong_khoi',
  name: 'Phong trào Đồng khởi',
  category: 'su_kien',
  type: 'attack',
  tier: 4,
  period: 6,
  years: '1959 – 1960',
  tags: ['KHANG_CHIEN', 'THONG_NHAT'],
  image: CARD_IMAGES.dong_khoi,
  summary: 'Phong trào nổi dậy ở miền Nam, tiêu biểu tại Bến Tre, chuyển cách mạng sang thế tiến công.',
  history:
  'Sau Nghị quyết Hội nghị Trung ương 15 (1/1959), phong trào Đồng khởi bùng nổ ở nhiều địa phương miền Nam, tiêu biểu là Bến Tre từ ngày 17/1/1960, chuyển cách mạng miền Nam từ thế giữ gìn lực lượng sang thế tiến công.',
  skill: {
    name: 'Nổi dậy đồng loạt',
    description: 'Mỗi 2 lượt: đòn đánh mạnh hơn 30% và cộng 1 Kháng chiến.',
    cooldown: 2,
    effect: { kind: 'strikeResistance', percent: 0.3, resistance: 1 }
  },
  sources: [SRC_TEXTBOOK]
},
{
  id: 'mau_than',
  name: 'Tổng tiến công Tết Mậu Thân',
  category: 'su_kien',
  type: 'attack',
  tier: 4,
  period: 7,
  years: 'Xuân 1968',
  tags: ['KHANG_CHIEN', 'THONG_NHAT'],
  image: CARD_IMAGES.mau_than,
  summary: 'Cuộc Tổng tiến công và nổi dậy làm lung lay ý chí xâm lược của Mỹ.',
  history:
  'Tết Mậu Thân 1968, quân và dân miền Nam đồng loạt tiến công vào các đô thị. Cuộc tiến công làm lung lay ý chí xâm lược, buộc Mỹ phải tuyên bố "phi Mỹ hóa" chiến tranh, chấm dứt ném bom miền Bắc và chấp nhận đàm phán tại Paris.',
  skill: {
    name: 'Đồng loạt tiến công',
    description: 'Mỗi 4 lượt: gây thêm 120% sát thương cơ bản.',
    cooldown: 4,
    effect: { kind: 'bonusDamage', percent: 1.2 }
  },
  sources: [SRC_TEXTBOOK]
},
{
  id: 'loi_keu_goi',
  name: 'Lời kêu gọi toàn quốc kháng chiến',
  category: 'van_kien',
  type: 'support',
  tier: 4,
  period: 5,
  years: '19/12/1946',
  tags: ['KHANG_CHIEN', 'DOAN_KET'],
  image: CARD_IMAGES.loi_keu_goi,
  summary: 'Chủ tịch Hồ Chí Minh kêu gọi toàn dân đứng lên kháng chiến chống thực dân Pháp.',
  history:
  'Tối 19/12/1946, cuộc kháng chiến toàn quốc bùng nổ. Chủ tịch Hồ Chí Minh ra Lời kêu gọi toàn quốc kháng chiến, khẳng định quyết tâm bảo vệ nền độc lập. Cùng với các văn kiện của Đảng, Lời kêu gọi góp phần hình thành đường lối kháng chiến toàn dân, toàn diện, trường kỳ, tự lực cánh sinh.',
  skill: {
    name: 'Toàn dân kháng chiến',
    description: 'Mỗi 3 lượt: cộng 2 Kháng chiến. Nội tại: +10% sát thương toàn đội.',
    cooldown: 3,
    effect: { kind: 'resistance', amount: 2 }
  },
  supportBuff: 0.1,
  sources: [SRC_TEXTBOOK, SRC_HCM]
},
{
  id: 'dai_hoi_iii',
  name: 'Đại hội Đảng lần thứ III',
  category: 'su_kien',
  type: 'support',
  tier: 4,
  period: 6,
  years: '09/1960',
  tags: ['THONG_NHAT'],
  image: CARD_IMAGES.dai_hoi_iii,
  summary: 'Đề ra đường lối tiến hành đồng thời hai chiến lược cách mạng ở hai miền.',
  history:
  'Đại hội đại biểu toàn quốc lần thứ III của Đảng họp tại Hà Nội từ ngày 5 đến 10/9/1960, xác định đường lối cách mạng xã hội chủ nghĩa ở miền Bắc và cách mạng dân tộc dân chủ nhân dân ở miền Nam, tiến tới thống nhất nước nhà.',
  skill: {
    name: 'Hậu phương lớn',
    description: 'Mỗi 2 lượt: tạo 20 điểm giáp. Nội tại: +8% sát thương toàn đội.',
    cooldown: 2,
    effect: { kind: 'armor', amount: 20 }
  },
  supportBuff: 0.08,
  sources: [SRC_TEXTBOOK]
},
{
  id: 'mat_tran_dtgp',
  name: 'Mặt trận Dân tộc Giải phóng miền Nam Việt Nam',
  category: 'to_chuc',
  type: 'support',
  tier: 4,
  period: 6,
  years: '20/12/1960',
  tags: ['DOAN_KET', 'THONG_NHAT'],
  image: CARD_IMAGES.mat_tran_dtgp,
  summary: 'Tổ chức đoàn kết các tầng lớp nhân dân miền Nam đấu tranh vì độc lập, thống nhất.',
  history:
  'Ngày 20/12/1960, Mặt trận Dân tộc Giải phóng miền Nam Việt Nam được thành lập, tập hợp rộng rãi các giai cấp, tầng lớp, dân tộc, tôn giáo ở miền Nam đấu tranh chống Mỹ và chính quyền Sài Gòn.',
  skill: {
    name: 'Khối đoàn kết',
    description: 'Mỗi 2 lượt: cộng 1 Kháng chiến. Nội tại: +10% sát thương toàn đội.',
    cooldown: 2,
    effect: { kind: 'resistance', amount: 1 }
  },
  supportBuff: 0.1,
  sources: [SRC_TEXTBOOK]
},

// ───────────── CẤP 5 ─────────────
{
  id: 'chien_dich_hcm',
  name: 'Chiến dịch Hồ Chí Minh',
  category: 'su_kien',
  type: 'attack',
  tier: 5,
  period: 7,
  years: '26 – 30/04/1975',
  tags: ['THONG_NHAT', 'KHANG_CHIEN'],
  image: CARD_IMAGES.chien_dich_hcm,
  summary: 'Chiến dịch cuối cùng của cuộc Tổng tiến công và nổi dậy mùa Xuân 1975, giải phóng miền Nam.',
  history:
  'Chiến dịch Hồ Chí Minh diễn ra từ ngày 26 đến 30/4/1975. Trưa ngày 30/4/1975, Sài Gòn được giải phóng, kết thúc thắng lợi cuộc kháng chiến chống Mỹ, cứu nước, thống nhất đất nước.',
  skill: {
    name: 'Thần tốc, táo bạo',
    description: 'Mỗi 3 lượt: gây thêm 120% sát thương cơ bản.',
    cooldown: 3,
    effect: { kind: 'bonusDamage', percent: 1.2 }
  },
  sources: [SRC_TEXTBOOK]
},
{
  id: 'dai_hoi_vi',
  name: 'Đại hội Đảng lần thứ VI',
  category: 'su_kien',
  type: 'attack',
  tier: 5,
  period: 8,
  years: '12/1986',
  tags: ['DOI_MOI'],
  image: CARD_IMAGES.dai_hoi_vi,
  summary: 'Đề ra đường lối Đổi mới toàn diện đất nước.',
  history:
  'Đại hội đại biểu toàn quốc lần thứ VI của Đảng họp từ ngày 15 đến 18/12/1986 tại Hà Nội, nhìn thẳng vào sự thật, đánh giá đúng sự thật và đề ra đường lối đổi mới toàn diện, trước hết là đổi mới tư duy kinh tế.',
  skill: {
    name: 'Đổi mới tư duy',
    description: 'Mỗi 2 lượt: đòn đánh mạnh hơn 30% và cộng 2 Kháng chiến.',
    cooldown: 2,
    effect: { kind: 'strikeResistance', percent: 0.3, resistance: 2 }
  },
  sources: [SRC_TEXTBOOK]
},
{
  id: 'doi_moi',
  name: 'Công cuộc Đổi mới',
  category: 'dau_moc',
  type: 'attack',
  tier: 5,
  period: 9,
  years: '1986 – nay',
  tags: ['DOI_MOI', 'PHAT_TRIEN'],
  image: CARD_IMAGES.doi_moi,
  summary: 'Chuyển sang nền kinh tế hàng hóa nhiều thành phần theo định hướng xã hội chủ nghĩa.',
  history:
  'Từ sau Đại hội VI, Việt Nam từng bước xóa bỏ cơ chế tập trung quan liêu, bao cấp, phát triển kinh tế hàng hóa nhiều thành phần vận hành theo cơ chế thị trường có sự quản lý của Nhà nước. Đại hội VII (1991) thông qua Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội.',
  skill: {
    name: 'Bứt phá kinh tế',
    description: 'Mỗi 2 lượt: nếu Kháng chiến từ 8 trở lên, gây thêm 70% sát thương.',
    cooldown: 2,
    effect: { kind: 'conditionalDamage', minResistance: 8, percent: 0.7 }
  },
  sources: [SRC_TEXTBOOK]
},
{
  id: 'hiep_dinh_paris',
  name: 'Hiệp định Paris',
  category: 'van_kien',
  type: 'support',
  tier: 5,
  period: 7,
  years: '27/01/1973',
  tags: ['THONG_NHAT'],
  image: CARD_IMAGES.hiep_dinh_paris,
  summary: 'Hiệp định về chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam; Mỹ rút quân.',
  history:
  'Ngày 27/1/1973, Hiệp định Paris về chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam được ký kết. Mỹ cam kết tôn trọng độc lập, chủ quyền, thống nhất, toàn vẹn lãnh thổ của Việt Nam và rút hết quân viễn chinh.',
  skill: {
    name: 'Thắng lợi trên bàn đàm phán',
    description: 'Mỗi 2 lượt: tạo 25 điểm giáp. Nội tại: +10% sát thương toàn đội.',
    cooldown: 2,
    effect: { kind: 'armor', amount: 25 }
  },
  supportBuff: 0.1,
  sources: [SRC_TEXTBOOK]
},
{
  id: 'dai_hoi_iv',
  name: 'Đại hội Đảng lần thứ IV',
  category: 'su_kien',
  type: 'support',
  tier: 5,
  period: 8,
  years: '12/1976',
  tags: ['THONG_NHAT', 'PHAT_TRIEN'],
  image: CARD_IMAGES.dai_hoi_iv,
  summary: 'Đại hội đầu tiên sau khi đất nước thống nhất, đổi tên Đảng thành Đảng Cộng sản Việt Nam.',
  history:
  'Đại hội đại biểu toàn quốc lần thứ IV họp tháng 12/1976 tại Hà Nội, là đại hội đầu tiên sau khi đất nước thống nhất. Đại hội quyết định đổi tên Đảng Lao động Việt Nam thành Đảng Cộng sản Việt Nam và đề ra đường lối cách mạng xã hội chủ nghĩa trong cả nước.',
  skill: {
    name: 'Hàn gắn vết thương',
    description: 'Mỗi 3 lượt: hồi 12 Ý chí. Nội tại: +12% sát thương toàn đội.',
    cooldown: 3,
    effect: { kind: 'heal', amount: 12 }
  },
  supportBuff: 0.12,
  sources: [SRC_TEXTBOOK]
},
{
  id: 'hoi_nhap',
  name: 'Hội nhập quốc tế',
  category: 'dau_moc',
  type: 'support',
  tier: 5,
  period: 10,
  years: '1995 – nay',
  tags: ['PHAT_TRIEN', 'DOI_MOI'],
  image: CARD_IMAGES.hoi_nhap,
  summary: 'Gia nhập ASEAN (1995), APEC (1998), WTO (2007) và mở rộng quan hệ quốc tế.',
  history:
  'Ngày 28/7/1995, Việt Nam gia nhập ASEAN; cùng năm bình thường hóa quan hệ với Hoa Kỳ. Năm 1998 Việt Nam gia nhập APEC và ngày 11/1/2007 trở thành thành viên chính thức của Tổ chức Thương mại Thế giới (WTO).',
  skill: {
    name: 'Mở cửa hợp tác',
    description: 'Mỗi 2 lượt: cộng 2 Kháng chiến. Nội tại: +12% sát thương toàn đội.',
    cooldown: 2,
    effect: { kind: 'resistance', amount: 2 }
  },
  supportBuff: 0.12,
  sources: [SRC_TEXTBOOK, SRC_PORTAL]
}];