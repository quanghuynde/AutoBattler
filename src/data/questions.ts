export interface Question {
  stage: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const questions: Question[] = [
{
  stage: 1,
  question: 'Hội nghị thành lập Đảng Cộng sản Việt Nam đầu năm 1930 do ai chủ trì?',
  options: ['Trần Phú', 'Nguyễn Ái Quốc', 'Lê Hồng Phong', 'Hà Huy Tập'],
  answer: 1,
  explanation: 'Nguyễn Ái Quốc chủ trì Hội nghị hợp nhất các tổ chức cộng sản (6/1 – 7/2/1930) tại Hương Cảng, Trung Quốc.'
},
{
  stage: 2,
  question: 'Tháng 3/1938, Mặt trận Thống nhất Nhân dân Phản đế Đông Dương đổi tên thành gì?',
  options: ['Mặt trận Việt Minh', 'Mặt trận Liên Việt', 'Mặt trận Dân chủ Đông Dương', 'Mặt trận Tổ quốc'],
  answer: 2,
  explanation: 'Tháng 3/1938, Mặt trận đổi tên thành Mặt trận Dân chủ Đông Dương.'
},
{
  stage: 3,
  question: 'Hội nghị Trung ương 8 (5/1941) quyết định thành lập tổ chức nào?',
  options: ['Mặt trận Việt Minh', 'Hội Việt Nam Cách mạng Thanh niên', 'Mặt trận Dân chủ Đông Dương', 'Quân đội Quốc gia'],
  answer: 0,
  explanation: 'Hội nghị Trung ương 8 tại Pác Bó quyết định thành lập Mặt trận Việt Nam Độc lập Đồng minh (Việt Minh), ra đời ngày 19/5/1941.'
},
{
  stage: 4,
  question: 'Cuộc Tổng tuyển cử bầu Quốc hội khóa I diễn ra vào ngày nào?',
  options: ['2/9/1945', '6/1/1946', '19/12/1946', '9/11/1946'],
  answer: 1,
  explanation: 'Ngày 6/1/1946, cử tri cả nước đi bầu Quốc hội khóa I của nước Việt Nam Dân chủ Cộng hòa.'
},
{
  stage: 5,
  question: 'Chiến dịch Điện Biên Phủ kết thúc thắng lợi vào ngày nào?',
  options: ['7/5/1954', '21/7/1954', '19/12/1946', '30/4/1975'],
  answer: 0,
  explanation: 'Chiến dịch Điện Biên Phủ diễn ra từ 13/3 đến 7/5/1954.'
},
{
  stage: 6,
  question: 'Phong trào Đồng khởi (1959–1960) tiêu biểu nhất diễn ra ở địa phương nào?',
  options: ['Quảng Ngãi', 'Bến Tre', 'Tây Ninh', 'Cà Mau'],
  answer: 1,
  explanation: 'Bến Tre là nơi tiêu biểu của phong trào Đồng khởi, bắt đầu từ ngày 17/1/1960.'
},
{
  stage: 7,
  question: 'Hiệp định Paris về chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam được ký năm nào?',
  options: ['1968', '1972', '1973', '1975'],
  answer: 2,
  explanation: 'Hiệp định Paris được ký kết ngày 27/1/1973.'
},
{
  stage: 8,
  question: 'Đại hội nào của Đảng quyết định đổi tên Đảng Lao động Việt Nam thành Đảng Cộng sản Việt Nam?',
  options: ['Đại hội III', 'Đại hội IV', 'Đại hội V', 'Đại hội VI'],
  answer: 1,
  explanation: 'Đại hội IV (12/1976), đại hội đầu tiên sau thống nhất, quyết định đổi tên Đảng thành Đảng Cộng sản Việt Nam.'
},
{
  stage: 9,
  question: 'Việt Nam gia nhập Hiệp hội các quốc gia Đông Nam Á (ASEAN) vào năm nào?',
  options: ['1986', '1991', '1995', '2007'],
  answer: 2,
  explanation: 'Việt Nam gia nhập ASEAN ngày 28/7/1995.'
},
{
  stage: 10,
  question: 'Việt Nam trở thành thành viên chính thức của WTO vào năm nào?',
  options: ['2001', '2005', '2007', '2010'],
  answer: 2,
  explanation: 'Ngày 11/1/2007, Việt Nam trở thành thành viên thứ 150 của Tổ chức Thương mại Thế giới (WTO).'
}];