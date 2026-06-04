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
      "Nội dung nêu rõ tư tưởng đạo đức Hồ Chí Minh được hình thành từ ba nguồn gốc lớn.",
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
    question: "Theo nội dung, đạo đức giữ vị trí nào đối với người cách mạng?",
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
    question: "Câu nói nào trong nội dung thể hiện quan hệ giữa tài và đức?",
    options: [
      "Tài năng là tất cả",
      "Có tài mà không có đức là người vô dụng; có đức mà không có tài thì làm việc gì cũng khó",
      "Có đức thì không cần học tập",
      "Đức và tài không liên quan đến nhau",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Nội dung trích câu nói nhấn mạnh người cách mạng phải rèn cả đức và tài.",
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
      "Nội dung giải thích liêm là trong sạch, không tham lam, không lấy của công làm của tư.",
    difficulty: "easy",
  },
  {
    id: "q08",
    question: "'Chí công vô tư' trong nội dung được hiểu là gì?",
    options: [
      "Lo trước thiên hạ, vui sau thiên hạ",
      "Ưu tiên lợi ích cá nhân",
      "Tránh mọi trách nhiệm xã hội",
      "Chỉ làm việc khi có lợi",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Nội dung nêu chí công vô tư là lo trước thiên hạ, vui sau thiên hạ, không để lợi ích cá nhân ảnh hưởng lợi ích chung.",
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
      "Nội dung nhấn mạnh tình yêu thương rộng lớn phải được biểu hiện qua hành động cụ thể, không chỉ là lời nói suông.",
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
      "Nội dung nêu tinh thần quốc tế trong sáng gắn với đoàn kết quốc tế và chủ nghĩa quốc tế vô sản.",
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
      "Nội dung xác định nói đi đôi với làm, nêu gương đạo đức là nguyên tắc hàng đầu và xuyên suốt.",
    difficulty: "easy",
  },
  {
    id: "q12",
    question: "Hồ Chí Minh gọi chủ nghĩa cá nhân là gì?",
    options: ["Động lực phát triển", "Giặc nội xâm", "Mục tiêu rèn luyện", "Biểu hiện của sáng tạo"],
    correctAnswerIndex: 1,
    explanation:
      "Trong phần xây đi đôi với chống, nội dung nêu Hồ Chí Minh coi chủ nghĩa cá nhân là giặc nội xâm.",
    difficulty: "medium",
  },
  {
    id: "q13",
    question: "Tu dưỡng đạo đức theo nội dung là công việc trong bao lâu?",
    options: ["Một học kỳ", "Một năm", "Cả đời người", "Chỉ khi còn trẻ"],
    correctAnswerIndex: 2,
    explanation:
      "Nội dung nêu rèn luyện đạo đức là công việc của cả một đời người, không bao giờ ngừng.",
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
      "Nội dung nêu phê bình phải thẳng thắn, chân thành, xuất phát từ tinh thần xây dựng.",
    difficulty: "medium",
  },
  {
    id: "q15",
    question: "Đối tượng ưu tiên trong giáo dục đạo đức theo nội dung là ai?",
    options: [
      "Thế hệ trẻ, đội ngũ kế cận",
      "Chỉ cán bộ cấp cao",
      "Chỉ người đã đi làm",
      "Chỉ người cao tuổi",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Nội dung nhấn mạnh giáo dục đạo đức cho thanh niên, thiếu niên, nhi đồng - đội ngũ kế cận.",
    difficulty: "easy",
  },
  {
    id: "q16",
    question: "Nội dung cốt lõi của giáo dục đạo đức trong nội dung là gì?",
    options: [
      "Bồi dưỡng lòng yêu nước, tinh thần dân tộc và lý tưởng cộng sản",
      "Chỉ rèn luyện thể lực",
      "Chỉ học kỹ năng thuyết trình",
      "Chỉ học cách cạnh tranh",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Nội dung nêu giáo dục lý tưởng và lòng yêu nước là nội dung cốt lõi của giáo dục đạo đức.",
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
      "Nội dung nêu cần xây dựng môi trường đạo đức lành mạnh trong gia đình, nhà trường, cơ quan và xã hội.",
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
      "Nội dung nêu tư tưởng đạo đức Hồ Chí Minh là nền tảng tư tưởng và đạo đức của Đảng Cộng sản Việt Nam.",
    difficulty: "medium",
  },
  {
    id: "q19",
    question: "Vì sao Hồ Chí Minh coi đạo đức là gốc của người cách mạng?",
    options: [
      "Vì đạo đức định hướng hành động và giúp người cách mạng vượt qua khó khăn",
      "Vì đạo đức thay thế hoàn toàn năng lực chuyên môn",
      "Vì đạo đức chỉ cần cho người làm lãnh đạo",
      "Vì đạo đức không liên quan đến thực tiễn",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Đạo đức là gốc vì nó định hướng tài năng, hành động và ý chí phục vụ nhân dân của người cách mạng.",
    difficulty: "medium",
  },
  {
    id: "q20",
    question: "Phẩm chất 'cần' trong cần, kiệm, liêm, chính nhấn mạnh điều gì?",
    options: [
      "Siêng năng, chăm chỉ, làm việc có kế hoạch",
      "Tiêu dùng thật nhiều để kích thích sản xuất",
      "Tránh làm việc khó",
      "Chỉ làm việc khi được khen thưởng",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Cần là siêng năng, chăm chỉ, bền bỉ và biết tổ chức công việc một cách hiệu quả.",
    difficulty: "easy",
  },
  {
    id: "q21",
    question: "Phẩm chất 'kiệm' được hiểu đúng là gì?",
    options: [
      "Tiết kiệm thời gian, tiền của, công sức nhưng không keo kiệt",
      "Không chi tiêu bất kỳ việc gì",
      "Chỉ tiết kiệm cho bản thân",
      "Tiết kiệm bằng cách giảm chất lượng công việc",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Kiệm là sử dụng hợp lý thời gian, tiền của và công sức, tránh lãng phí nhưng không phải keo kiệt.",
    difficulty: "easy",
  },
  {
    id: "q22",
    question: "Phẩm chất 'chính' trong tư tưởng đạo đức Hồ Chí Minh là gì?",
    options: [
      "Ngay thẳng, đứng đắn, không gian dối",
      "Luôn làm theo lợi ích cá nhân",
      "Chỉ cần nói hay trước tập thể",
      "Tránh góp ý cho sai phạm",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Chính là sống ngay thẳng, trung thực, có trách nhiệm và không gian dối trong lời nói, việc làm.",
    difficulty: "easy",
  },
  {
    id: "q23",
    question: "Nói đi đôi với làm yêu cầu người rèn luyện đạo đức phải làm gì?",
    options: [
      "Thống nhất giữa lời nói, cam kết và hành động thực tế",
      "Nói thật nhiều để tạo ảnh hưởng",
      "Chỉ cần làm, không cần giải thích",
      "Hứa trước rồi tính sau",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Nói đi đôi với làm yêu cầu lời nói phải được chứng minh bằng hành động cụ thể và nhất quán.",
    difficulty: "easy",
  },
  {
    id: "q24",
    question: "Nêu gương đạo đức có ý nghĩa gì trong giáo dục đạo đức?",
    options: [
      "Tạo sức thuyết phục bằng hành động mẫu mực",
      "Thay thế hoàn toàn việc học tập lý luận",
      "Chỉ dùng để gây chú ý",
      "Chỉ áp dụng với học sinh nhỏ tuổi",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Nêu gương giúp đạo đức trở nên cụ thể, dễ noi theo và có sức thuyết phục hơn lời nói suông.",
    difficulty: "medium",
  },
  {
    id: "q25",
    question: "Xây đi đôi với chống trong rèn luyện đạo đức nghĩa là gì?",
    options: [
      "Bồi dưỡng phẩm chất tốt đồng thời chống thói hư, chủ nghĩa cá nhân",
      "Chỉ phê bình người khác",
      "Chỉ học điều tốt, không cần sửa sai",
      "Chống mọi ý kiến khác biệt",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Xây đi đôi với chống là vừa vun đắp cái tốt, vừa đấu tranh với cái xấu trong bản thân và xã hội.",
    difficulty: "medium",
  },
  {
    id: "q26",
    question: "Biểu hiện đúng của yêu thương con người theo tư tưởng Hồ Chí Minh là gì?",
    options: [
      "Quan tâm, giúp đỡ con người bằng hành động thiết thực",
      "Chỉ thương người thân quen",
      "Chỉ nói lời tốt đẹp mà không hành động",
      "Giúp người khác để được nổi tiếng",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Yêu thương con người phải thể hiện qua sự tôn trọng, chia sẻ và hành động giúp đỡ thiết thực.",
    difficulty: "easy",
  },
  {
    id: "q27",
    question: "Tinh thần quốc tế trong sáng không đối lập với điều gì?",
    options: [
      "Chủ nghĩa yêu nước chân chính",
      "Chủ nghĩa cá nhân",
      "Lối sống ích kỷ",
      "Tư tưởng cục bộ hẹp hòi",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Tinh thần quốc tế trong sáng gắn bó với chủ nghĩa yêu nước chân chính và đoàn kết giữa các dân tộc.",
    difficulty: "medium",
  },
  {
    id: "q28",
    question: "Trong rèn luyện đạo đức, tự phê bình có vai trò gì?",
    options: [
      "Giúp nhận ra khuyết điểm để sửa chữa và tiến bộ",
      "Làm giảm uy tín nên không cần thực hiện",
      "Chỉ dùng để chỉ trích người khác",
      "Chỉ thực hiện khi bị bắt buộc",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Tự phê bình giúp mỗi người nhìn lại mình, sửa khuyết điểm và rèn luyện đạo đức bền bỉ hơn.",
    difficulty: "medium",
  },
  {
    id: "q29",
    question: "Vì sao tu dưỡng đạo đức phải diễn ra suốt đời?",
    options: [
      "Vì hoàn cảnh luôn thay đổi và con người phải thường xuyên tự rèn mình",
      "Vì đạo đức chỉ hình thành khi về già",
      "Vì học một lần là đủ",
      "Vì đạo đức không cần thực hành",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Tu dưỡng đạo đức là việc suốt đời vì mỗi giai đoạn đều có thử thách và yêu cầu rèn luyện mới.",
    difficulty: "medium",
  },
  {
    id: "q30",
    question: "Đạo đức cách mạng khác lối sống cá nhân chủ nghĩa ở điểm nào?",
    options: [
      "Đặt lợi ích chung, nhân dân và tập thể lên trên lợi ích ích kỷ",
      "Luôn đặt lợi ích cá nhân lên đầu",
      "Tránh trách nhiệm với cộng đồng",
      "Chỉ quan tâm đến danh tiếng riêng",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Đạo đức cách mạng hướng tới lợi ích chung và trách nhiệm với nhân dân, trái với lối sống ích kỷ cá nhân.",
    difficulty: "medium",
  },
  {
    id: "q31",
    question: "Trong học tập, vận dụng phẩm chất 'cần' thể hiện qua hành động nào?",
    options: [
      "Chủ động học đều, làm bài đúng hạn và kiên trì sửa lỗi",
      "Chỉ học trước ngày kiểm tra",
      "Sao chép bài của bạn",
      "Bỏ qua phần khó",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Trong học tập, cần thể hiện ở sự chăm chỉ, chủ động, có kế hoạch và kiên trì hoàn thành nhiệm vụ.",
    difficulty: "easy",
  },
  {
    id: "q32",
    question: "Trong đời sống học sinh, 'liêm' có thể biểu hiện như thế nào?",
    options: [
      "Không gian lận, không lấy của người khác, tôn trọng của công",
      "Lấy đồ chung vì không ai biết",
      "Gian lận nếu điểm số quan trọng",
      "Chỉ trung thực khi có người giám sát",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Liêm trong đời sống học sinh là trung thực, không gian lận và biết tôn trọng tài sản chung, tài sản người khác.",
    difficulty: "easy",
  },
  {
    id: "q33",
    question: "Hành động nào phù hợp với nguyên tắc đặt lợi ích chung lên trên lợi ích cá nhân?",
    options: [
      "Sẵn sàng nhận phần khó khi tập thể cần và làm đúng trách nhiệm",
      "Chỉ chọn việc dễ cho mình",
      "Đổ lỗi cho người khác khi nhóm thất bại",
      "Làm việc nhóm theo cảm hứng cá nhân",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Đặt lợi ích chung lên trên lợi ích cá nhân thể hiện ở tinh thần trách nhiệm, hợp tác và sẵn sàng đóng góp cho tập thể.",
    difficulty: "medium",
  },
  {
    id: "q34",
    question: "Giáo dục đạo đức cho thế hệ trẻ cần gắn với nội dung nào?",
    options: [
      "Lý tưởng sống, lòng yêu nước, trách nhiệm với gia đình và xã hội",
      "Chỉ kiến thức thi cử",
      "Chỉ kỹ năng kiếm tiền",
      "Chỉ hoạt động giải trí",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Giáo dục đạo đức cho thế hệ trẻ cần bồi dưỡng lý tưởng, lòng yêu nước và trách nhiệm trong học tập, đời sống.",
    difficulty: "medium",
  },
  {
    id: "q35",
    question: "Môi trường đạo đức lành mạnh trong nhà trường cần điều gì?",
    options: [
      "Tôn trọng, trung thực, hợp tác và kỷ luật tích cực",
      "Cạnh tranh bằng mọi cách",
      "Che giấu sai phạm để giữ thành tích",
      "Chỉ quan tâm điểm số",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Môi trường đạo đức lành mạnh cần sự tôn trọng, trung thực, hợp tác và kỷ luật giúp mỗi người tiến bộ.",
    difficulty: "easy",
  },
  {
    id: "q36",
    question: "Vì sao đức và tài phải đi đôi với nhau?",
    options: [
      "Vì tài cần đạo đức định hướng, còn đức cần năng lực để hành động hiệu quả",
      "Vì chỉ cần tài là đủ",
      "Vì chỉ cần đức, không cần học tập",
      "Vì đức và tài không ảnh hưởng nhau",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Đức và tài bổ sung cho nhau: đạo đức định hướng mục tiêu đúng, tài năng giúp thực hiện mục tiêu hiệu quả.",
    difficulty: "medium",
  },
  {
    id: "q37",
    question: "Chống chủ nghĩa cá nhân trước hết cần bắt đầu từ đâu?",
    options: [
      "Từ việc tự soi, tự sửa thói ích kỷ trong bản thân",
      "Từ việc chỉ trích người khác",
      "Từ việc né tránh trách nhiệm",
      "Từ việc đặt mình cao hơn tập thể",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Chống chủ nghĩa cá nhân phải bắt đầu từ tự phê bình, tự sửa mình và rèn thói quen vì lợi ích chung.",
    difficulty: "medium",
  },
  {
    id: "q38",
    question: "Bài học thực tiễn quan trọng từ tư tưởng đạo đức Hồ Chí Minh là gì?",
    options: [
      "Rèn đạo đức qua việc làm cụ thể hằng ngày, không chỉ qua khẩu hiệu",
      "Chỉ cần hiểu lý thuyết là đủ",
      "Đạo đức không liên quan đến học tập",
      "Rèn luyện đạo đức chỉ dành cho cán bộ",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Tư tưởng đạo đức Hồ Chí Minh nhấn mạnh rèn luyện bằng hành động cụ thể, thường xuyên và gắn với đời sống.",
    difficulty: "hard",
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
