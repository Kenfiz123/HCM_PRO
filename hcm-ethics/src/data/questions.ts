export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q01",
    question: "Tư tưởng đạo đức Hồ Chí Minh được hình thành từ mấy nguồn gốc lớn?",
    options: ["Hai nguồn gốc", "Ba nguồn gốc", "Bốn nguồn gốc", "Năm nguồn gốc"],
    correctAnswerIndex: 1,
    explanation:
      "PDF nêu rõ tư tưởng đạo đức Hồ Chí Minh được hình thành từ ba nguồn gốc lớn.",
    difficulty: "easy",
  },
  {
    id: "q02",
    question: "Nguồn gốc nào gắn với lòng yêu nước, nhân nghĩa và cần cù?",
    options: [
      "Truyền thống đạo đức dân tộc Việt Nam",
      "Đạo đức phương Tây tiến bộ",
      "Chủ nghĩa quốc tế vô sản",
      "Kinh tế thị trường hiện đại",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Truyền thống đạo đức dân tộc Việt Nam được mô tả qua lòng yêu nước, nhân nghĩa, cần cù.",
    difficulty: "easy",
  },
  {
    id: "q03",
    question: "Theo PDF, đạo đức giữ vị trí nào đối với người cách mạng?",
    options: [
      "Là phần phụ thuộc vào địa vị",
      "Là gốc rễ và nền tảng",
      "Chỉ là kỹ năng giao tiếp",
      "Chỉ cần khi làm lãnh đạo",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Hồ Chí Minh xác định đạo đức là nền tảng, là gốc rễ của người cách mạng.",
    difficulty: "easy",
  },
  {
    id: "q04",
    question: "Đặc điểm nào sau đây thuộc tư tưởng đạo đức Hồ Chí Minh?",
    options: [
      "Tách rời lý luận khỏi thực tiễn",
      "Chỉ coi trọng tài năng",
      "Kết hợp hài hòa giữa lý luận và thực tiễn, giữa nói và làm",
      "Chỉ áp dụng trong thời chiến",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Một đặc điểm cốt lõi là kết hợp hài hòa giữa lý luận và thực tiễn, giữa nói và làm.",
    difficulty: "easy",
  },
  {
    id: "q05",
    question: "Câu nói nào trong PDF thể hiện quan hệ giữa tài và đức?",
    options: [
      "Tài năng là tất cả",
      "Có tài mà không có đức là người vô dụng; có đức mà không có tài thì làm việc gì cũng khó",
      "Có đức thì không cần học tập",
      "Đức và tài không liên quan đến nhau",
    ],
    correctAnswerIndex: 1,
    explanation:
      "PDF trích câu nói nhấn mạnh người cách mạng phải rèn cả đức và tài.",
    difficulty: "medium",
  },
  {
    id: "q06",
    question: "Phẩm chất 'Trung với nước, hiếu với dân' đặt lợi ích nào lên trên hết?",
    options: [
      "Lợi ích cá nhân",
      "Lợi ích của nhân dân",
      "Lợi ích vật chất trước mắt",
      "Lợi ích của một nhóm nhỏ",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Hiếu với dân là hết lòng phục vụ nhân dân, coi lợi ích của nhân dân là trên hết.",
    difficulty: "easy",
  },
  {
    id: "q07",
    question: "Trong bộ phẩm chất 'Cần, kiệm, liêm, chính', 'liêm' nghĩa là gì?",
    options: [
      "Siêng năng, chăm chỉ",
      "Tiết kiệm thời gian và của cải",
      "Trong sạch, không tham lam, không lấy của công làm của tư",
      "Ngay thẳng, thật thà",
    ],
    correctAnswerIndex: 2,
    explanation:
      "PDF giải thích liêm là trong sạch, không tham lam, không lấy của công làm của tư.",
    difficulty: "easy",
  },
  {
    id: "q08",
    question: "'Chí công vô tư' trong PDF được hiểu là gì?",
    options: [
      "Lo trước thiên hạ, vui sau thiên hạ",
      "Ưu tiên lợi ích cá nhân",
      "Tránh mọi trách nhiệm xã hội",
      "Chỉ làm việc khi có lợi",
    ],
    correctAnswerIndex: 0,
    explanation:
      "PDF nêu chí công vô tư là lo trước thiên hạ, vui sau thiên hạ, không để lợi ích cá nhân ảnh hưởng lợi ích chung.",
    difficulty: "medium",
  },
  {
    id: "q09",
    question: "Tình yêu thương con người trong tư tưởng Hồ Chí Minh được biểu hiện như thế nào?",
    options: [
      "Chỉ bằng lời nói",
      "Qua hành động cụ thể, thiết thực",
      "Chỉ trong phạm vi gia đình",
      "Chỉ khi có thiên tai",
    ],
    correctAnswerIndex: 1,
    explanation:
      "PDF nhấn mạnh tình yêu thương rộng lớn phải được biểu hiện qua hành động cụ thể, không chỉ là lời nói suông.",
    difficulty: "easy",
  },
  {
    id: "q10",
    question: "Tinh thần quốc tế trong sáng thể hiện ở điều gì?",
    options: [
      "Đoàn kết với công nhân, nhân dân lao động thế giới và các dân tộc đấu tranh giải phóng",
      "Chỉ quan tâm đến lợi ích trong nước",
      "Tách chủ nghĩa yêu nước khỏi quốc tế",
      "Không tham gia các hoạt động quốc tế",
    ],
    correctAnswerIndex: 0,
    explanation:
      "PDF nêu tinh thần quốc tế trong sáng gắn với đoàn kết quốc tế và chủ nghĩa quốc tế vô sản.",
    difficulty: "medium",
  },
  {
    id: "q11",
    question: "Nguyên tắc hàng đầu trong xây dựng đạo đức cách mạng là gì?",
    options: [
      "Nói đi đôi với làm, nêu gương đạo đức",
      "Chỉ học lý thuyết",
      "Chỉ phê bình người khác",
      "Tránh tiếp xúc quần chúng",
    ],
    correctAnswerIndex: 0,
    explanation:
      "PDF xác định nói đi đôi với làm, nêu gương đạo đức là nguyên tắc hàng đầu và xuyên suốt.",
    difficulty: "easy",
  },
  {
    id: "q12",
    question: "Hồ Chí Minh gọi chủ nghĩa cá nhân là gì?",
    options: ["Động lực phát triển", "Giặc nội xâm", "Mục tiêu rèn luyện", "Biểu hiện của sáng tạo"],
    correctAnswerIndex: 1,
    explanation:
      "Trong phần xây đi đôi với chống, PDF nêu Hồ Chí Minh coi chủ nghĩa cá nhân là giặc nội xâm.",
    difficulty: "medium",
  },
  {
    id: "q13",
    question: "Tu dưỡng đạo đức theo PDF là công việc trong bao lâu?",
    options: ["Một học kỳ", "Một năm", "Cả đời người", "Chỉ khi còn trẻ"],
    correctAnswerIndex: 2,
    explanation:
      "PDF nêu rèn luyện đạo đức là công việc của cả một đời người, không bao giờ ngừng.",
    difficulty: "easy",
  },
  {
    id: "q14",
    question: "Phương pháp tự phê bình và phê bình cần xuất phát từ tinh thần nào?",
    options: [
      "Đả kích cá nhân",
      "Xây dựng, thẳng thắn và chân thành",
      "Che giấu khuyết điểm",
      "Làm theo phong trào",
    ],
    correctAnswerIndex: 1,
    explanation:
      "PDF nêu phê bình phải thẳng thắn, chân thành, xuất phát từ tinh thần xây dựng.",
    difficulty: "medium",
  },
  {
    id: "q15",
    question: "Đối tượng ưu tiên trong giáo dục đạo đức theo PDF là ai?",
    options: [
      "Thế hệ trẻ, đội ngũ kế cận",
      "Chỉ cán bộ cấp cao",
      "Chỉ người đã đi làm",
      "Chỉ người cao tuổi",
    ],
    correctAnswerIndex: 0,
    explanation:
      "PDF nhấn mạnh giáo dục đạo đức cho thanh niên, thiếu niên, nhi đồng - đội ngũ kế cận.",
    difficulty: "easy",
  },
  {
    id: "q16",
    question: "Nội dung cốt lõi của giáo dục đạo đức trong PDF là gì?",
    options: [
      "Bồi dưỡng lòng yêu nước, tinh thần dân tộc và lý tưởng cộng sản",
      "Chỉ rèn luyện thể lực",
      "Chỉ học kỹ năng thuyết trình",
      "Chỉ học cách cạnh tranh",
    ],
    correctAnswerIndex: 0,
    explanation:
      "PDF nêu giáo dục lý tưởng và lòng yêu nước là nội dung cốt lõi của giáo dục đạo đức.",
    difficulty: "medium",
  },
  {
    id: "q17",
    question: "Môi trường nào cần được xây dựng để đạo đức tốt đẹp phát triển?",
    options: [
      "Gia đình, nhà trường, cơ quan và xã hội lành mạnh",
      "Chỉ môi trường trực tuyến",
      "Chỉ nơi làm việc",
      "Chỉ trong lớp học",
    ],
    correctAnswerIndex: 0,
    explanation:
      "PDF nêu cần xây dựng môi trường đạo đức lành mạnh trong gia đình, nhà trường, cơ quan và xã hội.",
    difficulty: "easy",
  },
  {
    id: "q18",
    question: "Ý nghĩa của tư tưởng đạo đức Hồ Chí Minh đối với Đảng là gì?",
    options: [
      "Là nền tảng tư tưởng và đạo đức của Đảng Cộng sản Việt Nam",
      "Chỉ là tài liệu tham khảo lịch sử",
      "Không còn giá trị trong hiện tại",
      "Chỉ dùng trong hoạt động ngoại giao",
    ],
    correctAnswerIndex: 0,
    explanation:
      "PDF nêu tư tưởng đạo đức Hồ Chí Minh là nền tảng tư tưởng và đạo đức của Đảng Cộng sản Việt Nam.",
    difficulty: "medium",
  },
];

export function getRandomQuestion(excludedIds: string[] = []): QuizQuestion | null {
  if (quizQuestions.length === 0) {
    return null;
  }

  const pool = quizQuestions.filter((question) => !excludedIds.includes(question.id));
  const available = pool.length > 0 ? pool : quizQuestions;
  return available[Math.floor(Math.random() * available.length)];
}
