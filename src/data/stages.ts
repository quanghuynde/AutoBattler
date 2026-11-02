import type { Stage } from '../types/game';
import { IMAGES } from './images';

const SRC_TEXTBOOK =
'Giáo trình Lịch sử Đảng Cộng sản Việt Nam (dành cho bậc đại học không chuyên lý luận chính trị), Bộ Giáo dục và Đào tạo, NXB Chính trị quốc gia Sự thật, 2021.';
const SRC_PORTAL = 'Cổng Thông tin điện tử Đảng Cộng sản Việt Nam — dangcongsan.vn';

export const stages: Stage[] = [
{
  id: 1,
  name: 'Đảng ra đời',
  period: '1930 – 1935',
  description: 'Đảng Cộng sản Việt Nam ra đời, lãnh đạo cao trào cách mạng 1930–1931 và khôi phục tổ chức sau khủng bố trắng.',
  target: 1800,
  enemy: {
    name: 'Ách thống trị thực dân',
    description: 'Bộ máy cai trị và chính sách khủng bố trắng của thực dân Pháp.',
    resist: 0,
    image: IMAGES.enemyMilitary,
    kind: 'military'
  },
  history: {
    title: 'Đảng Cộng sản Việt Nam ra đời và cao trào 1930 – 1931',
    timeline: [
    { time: '6/1 – 7/2/1930', text: 'Hội nghị hợp nhất các tổ chức cộng sản, thành lập Đảng.' },
    { time: '1930 – 1931', text: 'Cao trào cách mạng, đỉnh cao là Xô viết Nghệ – Tĩnh.' },
    { time: '10/1930', text: 'Hội nghị Trung ương lần thứ nhất thông qua Luận cương chính trị.' },
    { time: '3/1935', text: 'Đại hội lần thứ I của Đảng tại Ma Cao.' }],

    summary:
    'Sự ra đời của Đảng chấm dứt cuộc khủng hoảng về đường lối cứu nước. Ngay sau đó, Đảng lãnh đạo cao trào cách mạng 1930–1931. Dù bị đàn áp khốc liệt, Đảng đã khôi phục hệ thống tổ chức và chuẩn bị cho giai đoạn mới.',
    related: ['Nguyễn Ái Quốc', 'Trần Phú', 'Cương lĩnh chính trị đầu tiên', 'Xô viết Nghệ – Tĩnh'],
    sources: [SRC_TEXTBOOK]
  }
},
{
  id: 2,
  name: 'Vận động dân chủ',
  period: '1936 – 1939',
  description: 'Đảng lãnh đạo cuộc vận động đòi tự do, dân sinh, dân chủ, cơm áo, hòa bình.',
  target: 2500,
  enemy: {
    name: 'Phản động thuộc địa',
    description: 'Thế lực phản động thuộc địa và nguy cơ phát xít, chiến tranh.',
    resist: 0.02,
    image: IMAGES.enemyMilitary,
    kind: 'military'
  },
  history: {
    title: 'Phong trào dân chủ 1936 – 1939',
    timeline: [
    { time: '7/1936', text: 'Hội nghị Trung ương xác định nhiệm vụ trực tiếp, chủ trương lập Mặt trận.' },
    { time: '1936', text: 'Phong trào Đông Dương Đại hội.' },
    { time: '3/1938', text: 'Mặt trận Dân chủ Đông Dương được thành lập.' },
    { time: '1/5/1938', text: 'Mít tinh lớn tại khu Đấu Xảo, Hà Nội.' }],

    summary:
    'Đảng linh hoạt kết hợp đấu tranh công khai, hợp pháp với bí mật, xây dựng lực lượng chính trị đông đảo. Phong trào là cuộc tập dượt thứ hai, chuẩn bị cho Cách mạng tháng Tám.',
    related: ['Hà Huy Tập', 'Nguyễn Văn Cừ', 'Mặt trận Dân chủ Đông Dương'],
    sources: [SRC_TEXTBOOK]
  }
},
{
  id: 3,
  name: 'Giải phóng dân tộc',
  period: '1939 – 1945',
  description: 'Đảng chuyển hướng chỉ đạo chiến lược, chuẩn bị lực lượng và lãnh đạo Tổng khởi nghĩa tháng Tám.',
  target: 3400,
  enemy: {
    name: 'Ách thống trị Pháp – Nhật',
    description: 'Ách thống trị của phát xít Nhật và thực dân Pháp đè nặng lên nhân dân.',
    resist: 0.04,
    image: IMAGES.enemyMilitary,
    kind: 'military'
  },
  history: {
    title: 'Cuộc vận động giải phóng dân tộc 1939 – 1945',
    timeline: [
    { time: '11/1939', text: 'Hội nghị Trung ương 6 bước đầu chuyển hướng chỉ đạo chiến lược.' },
    { time: '5/1941', text: 'Hội nghị Trung ương 8 tại Pác Bó; thành lập Mặt trận Việt Minh.' },
    { time: '22/12/1944', text: 'Thành lập Đội Việt Nam Tuyên truyền Giải phóng quân.' },
    { time: '14 – 28/8/1945', text: 'Tổng khởi nghĩa giành chính quyền trong cả nước.' }],

    summary:
    'Với chủ trương đặt nhiệm vụ giải phóng dân tộc lên hàng đầu, Đảng xây dựng lực lượng chính trị và vũ trang, chớp thời cơ lãnh đạo Cách mạng tháng Tám thành công.',
    related: ['Hội nghị Trung ương 8', 'Mặt trận Việt Minh', 'Cách mạng tháng Tám', 'Khởi nghĩa Bắc Sơn'],
    sources: [SRC_TEXTBOOK]
  }
},
{
  id: 4,
  name: 'Giữ vững chính quyền',
  period: '1945 – 1946',
  description: 'Nước Việt Nam Dân chủ Cộng hòa non trẻ đối mặt với giặc đói, giặc dốt và giặc ngoại xâm.',
  target: 4500,
  enemy: {
    name: 'Giặc đói, giặc dốt, giặc ngoại xâm',
    description: 'Nạn đói, nạn mù chữ và âm mưu quay lại xâm lược của thực dân Pháp.',
    resist: 0.06,
    image: IMAGES.enemyMilitary,
    kind: 'military'
  },
  history: {
    title: 'Xây dựng và bảo vệ chính quyền cách mạng 1945 – 1946',
    timeline: [
    { time: '2/9/1945', text: 'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập.' },
    { time: '6/1/1946', text: 'Tổng tuyển cử bầu Quốc hội khóa I.' },
    { time: '9/11/1946', text: 'Quốc hội thông qua Hiến pháp đầu tiên.' },
    { time: '19/12/1946', text: 'Toàn quốc kháng chiến bùng nổ.' }],

    summary:
    'Đảng và Chủ tịch Hồ Chí Minh lãnh đạo nhân dân chống giặc đói, giặc dốt, củng cố chính quyền, sách lược mềm dẻo để giữ vững thành quả cách mạng trước thù trong, giặc ngoài.',
    related: ['Tuyên ngôn Độc lập', 'Tổng tuyển cử năm 1946'],
    sources: [SRC_TEXTBOOK]
  }
},
{
  id: 5,
  name: 'Kháng chiến chống Pháp',
  period: '1946 – 1954',
  description: 'Cuộc kháng chiến toàn dân, toàn diện, trường kỳ, kết thúc bằng chiến thắng Điện Biên Phủ.',
  target: 5700,
  enemy: {
    name: 'Thực dân Pháp xâm lược',
    description: 'Quân viễn chinh Pháp tái chiếm Đông Dương.',
    resist: 0.08,
    image: IMAGES.enemyMilitary,
    kind: 'military'
  },
  history: {
    title: 'Kháng chiến chống thực dân Pháp 1946 – 1954',
    timeline: [
    { time: '19/12/1946', text: 'Lời kêu gọi toàn quốc kháng chiến.' },
    { time: 'Thu – đông 1947', text: 'Chiến thắng Việt Bắc.' },
    { time: '2/1951', text: 'Đại hội lần thứ II của Đảng.' },
    { time: '7/5/1954', text: 'Chiến thắng Điện Biên Phủ.' },
    { time: '21/7/1954', text: 'Ký Hiệp định Giơnevơ.' }],

    summary:
    'Dưới sự lãnh đạo của Đảng, quân và dân ta tiến hành cuộc kháng chiến gian khổ, kết thúc thắng lợi bằng chiến thắng Điện Biên Phủ và Hiệp định Giơnevơ, giải phóng hoàn toàn miền Bắc.',
    related: ['Lời kêu gọi toàn quốc kháng chiến', 'Võ Nguyên Giáp', 'Chiến thắng Điện Biên Phủ'],
    sources: [SRC_TEXTBOOK]
  }
},
{
  id: 6,
  name: 'Xây dựng và đấu tranh',
  period: '1954 – 1965',
  description: 'Miền Bắc xây dựng chủ nghĩa xã hội, miền Nam chuyển từ thế giữ gìn lực lượng sang thế tiến công.',
  target: 7000,
  enemy: {
    name: 'Chiến lược "Chiến tranh đặc biệt"',
    description: 'Chiến lược chiến tranh của Mỹ và chính quyền Sài Gòn ở miền Nam.',
    resist: 0.1,
    image: IMAGES.enemyMilitary,
    kind: 'military'
  },
  history: {
    title: 'Cách mạng hai miền 1954 – 1965',
    timeline: [
    { time: '1/1959', text: 'Hội nghị Trung ương 15 về cách mạng miền Nam.' },
    { time: '1959 – 1960', text: 'Phong trào Đồng khởi.' },
    { time: '9/1960', text: 'Đại hội lần thứ III của Đảng.' },
    { time: '20/12/1960', text: 'Thành lập Mặt trận Dân tộc Giải phóng miền Nam Việt Nam.' }],

    summary:
    'Đại hội III xác định đường lối tiến hành đồng thời hai chiến lược cách mạng. Phong trào Đồng khởi mở ra bước phát triển nhảy vọt của cách mạng miền Nam.',
    related: ['Đại hội III', 'Phong trào Đồng khởi', 'Mặt trận Dân tộc Giải phóng miền Nam Việt Nam'],
    sources: [SRC_TEXTBOOK]
  }
},
{
  id: 7,
  name: 'Thống nhất đất nước',
  period: '1965 – 1975',
  description: 'Kháng chiến chống Mỹ, cứu nước đi đến thắng lợi hoàn toàn mùa Xuân 1975.',
  target: 8500,
  enemy: {
    name: 'Chiến tranh xâm lược của Mỹ',
    description: '"Chiến tranh cục bộ", chiến tranh phá hoại miền Bắc và "Việt Nam hóa chiến tranh".',
    resist: 0.12,
    image: IMAGES.enemyMilitary,
    kind: 'military'
  },
  history: {
    title: 'Kháng chiến chống Mỹ, cứu nước 1965 – 1975',
    timeline: [
    { time: 'Xuân 1968', text: 'Tổng tiến công và nổi dậy Tết Mậu Thân.' },
    { time: '12/1972', text: 'Đánh bại cuộc tập kích bằng B-52 vào Hà Nội, Hải Phòng.' },
    { time: '27/1/1973', text: 'Ký Hiệp định Paris.' },
    { time: '30/4/1975', text: 'Chiến dịch Hồ Chí Minh toàn thắng.' }],

    summary:
    'Với tinh thần "không có gì quý hơn độc lập, tự do", quân và dân cả nước đánh bại các chiến lược chiến tranh của Mỹ, giải phóng miền Nam, thống nhất đất nước.',
    related: ['Tổng tiến công Tết Mậu Thân', 'Hiệp định Paris', 'Chiến dịch Hồ Chí Minh'],
    sources: [SRC_TEXTBOOK]
  }
},
{
  id: 8,
  name: 'Khắc phục hậu quả',
  period: '1975 – 1986',
  description: 'Cả nước đi lên chủ nghĩa xã hội trong bối cảnh hậu quả chiến tranh nặng nề và khủng hoảng kinh tế – xã hội.',
  target: 10200,
  enemy: {
    name: 'Hậu quả chiến tranh & khủng hoảng',
    description: 'Hậu quả chiến tranh, cơ chế tập trung quan liêu bao cấp và khủng hoảng kinh tế – xã hội.',
    resist: 0.14,
    image: IMAGES.enemyChallenge,
    kind: 'challenge'
  },
  history: {
    title: 'Cả nước quá độ lên chủ nghĩa xã hội 1975 – 1986',
    timeline: [
    { time: '7/1976', text: 'Nước Cộng hòa xã hội chủ nghĩa Việt Nam ra đời.' },
    { time: '12/1976', text: 'Đại hội IV, Đảng lấy lại tên Đảng Cộng sản Việt Nam.' },
    { time: '3/1982', text: 'Đại hội lần thứ V của Đảng.' },
    { time: '12/1986', text: 'Đại hội VI đề ra đường lối Đổi mới.' }],

    summary:
    'Sau thống nhất, đất nước gặp nhiều khó khăn do hậu quả chiến tranh và những hạn chế của cơ chế cũ. Những tìm tòi, thử nghiệm trong thực tiễn đã dẫn tới quyết định đổi mới tại Đại hội VI.',
    related: ['Đại hội IV', 'Đại hội VI'],
    sources: [SRC_TEXTBOOK]
  }
},
{
  id: 9,
  name: 'Đổi mới',
  period: '1986 – 2000',
  description: 'Thực hiện đường lối Đổi mới, đưa đất nước ra khỏi khủng hoảng kinh tế – xã hội.',
  target: 12000,
  enemy: {
    name: 'Khủng hoảng & cấm vận',
    description: 'Khủng hoảng kinh tế – xã hội, lạm phát cao và tình trạng bị bao vây, cấm vận.',
    resist: 0.17,
    image: IMAGES.enemyChallenge,
    kind: 'challenge'
  },
  history: {
    title: 'Thực hiện đường lối Đổi mới 1986 – 2000',
    timeline: [
    { time: '6/1991', text: 'Đại hội VII thông qua Cương lĩnh xây dựng đất nước.' },
    { time: '1994', text: 'Hoa Kỳ bãi bỏ lệnh cấm vận đối với Việt Nam.' },
    { time: '7/1995', text: 'Việt Nam gia nhập ASEAN.' },
    { time: '1996', text: 'Đại hội VIII: đất nước ra khỏi khủng hoảng kinh tế – xã hội.' }],

    summary:
    'Đường lối Đổi mới từng bước đi vào cuộc sống: kinh tế tăng trưởng, lạm phát được kiềm chế, quan hệ đối ngoại được mở rộng, đất nước ra khỏi khủng hoảng.',
    related: ['Công cuộc Đổi mới', 'Đại hội VI'],
    sources: [SRC_TEXTBOOK, SRC_PORTAL]
  }
},
{
  id: 10,
  name: 'Hội nhập và phát triển',
  period: '2001 – nay',
  description: 'Đẩy mạnh công nghiệp hóa, hiện đại hóa và hội nhập quốc tế sâu rộng.',
  target: 14000,
  enemy: {
    name: 'Thách thức phát triển',
    description: 'Nguy cơ tụt hậu, cạnh tranh hội nhập và yêu cầu phát triển bền vững.',
    resist: 0.2,
    image: IMAGES.enemyChallenge,
    kind: 'challenge'
  },
  history: {
    title: 'Đẩy mạnh công nghiệp hóa, hiện đại hóa và hội nhập quốc tế',
    timeline: [
    { time: '4/2001', text: 'Đại hội IX của Đảng.' },
    { time: '11/1/2007', text: 'Việt Nam trở thành thành viên WTO.' },
    { time: '1/2011', text: 'Đại hội XI bổ sung, phát triển Cương lĩnh (Cương lĩnh 2011).' },
    { time: '1/2021', text: 'Đại hội XIII của Đảng.' }],

    summary:
    'Việt Nam tiếp tục đổi mới toàn diện, hội nhập quốc tế sâu rộng, nâng cao vị thế trên trường quốc tế, hướng tới mục tiêu dân giàu, nước mạnh, dân chủ, công bằng, văn minh.',
    related: ['Hội nhập quốc tế', 'Công cuộc Đổi mới'],
    sources: [SRC_TEXTBOOK, SRC_PORTAL]
  }
}];