import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import PresentationChatbot from "@/components/PresentationChatbot";
import PresentationDetailCards, { type PresentationDetailItem } from "@/components/PresentationDetailCards";

const foundations = [
  {
    body: "Lòng yêu nước, nhân nghĩa, cần cù, đoàn kết và ý thức lấy dân làm gốc là dòng chảy nền tảng của đạo đức Việt Nam.",
    hoverDetail: "Đây là lớp giá trị giúp tư tưởng đạo đức Hồ Chí Minh gần gũi với nhân dân, không tách rời đời sống dân tộc.",
    icon: "01",
    title: "Truyền thống đạo đức dân tộc Việt Nam",
  },
  {
    body: "Tiếp thu những yếu tố tích cực của Nho giáo, Phật giáo và các giá trị tiến bộ trong đạo đức phương Tây.",
    hoverDetail: "Điểm quan trọng là tiếp thu có chọn lọc: giữ phần nhân văn, tiến bộ, loại bỏ yếu tố lạc hậu.",
    icon: "02",
    title: "Tinh hoa đạo đức nhân loại",
  },
  {
    body: "Chủ nghĩa Mác - Lênin đem lại cơ sở khoa học cho đạo đức cộng sản và tinh thần quốc tế vô sản.",
    hoverDetail: "Nguồn này làm cho đạo đức không chỉ là phẩm chất cá nhân mà còn gắn với lý tưởng giải phóng con người.",
    icon: "03",
    title: "Chủ nghĩa Mác - Lênin",
  },
];

const features = [
  "Kết hợp hài hòa giữa lý luận và thực tiễn, giữa nói và làm.",
  "Mang đậm tính dân tộc nhưng vẫn bắt kịp yêu cầu của thời đại.",
  "Coi đạo đức là gốc rễ, là nền tảng của người cách mạng.",
  "Nhấn mạnh tu dưỡng đạo đức là việc làm thường xuyên, suốt đời.",
];

const visualMoments = [
  {
    caption: "→ Yêu thương con người",
    src: "/bacvoithieunhidongbao.jpg",
    title: "Bác với thiếu nhi",
  },
  {
    caption: "→ Trung với nước",
    src: "/bacvoiquandoico.jpg",
    title: "Bác với quân đội",
  },
  {
    caption: "→ Cần, kiệm, liêm, chính",
    src: "/bacchihuybieudienvannghe.jpg",
    title: "Bác trong sinh hoạt giản dị",
  },
  {
    caption: "→ Tinh thần yêu nước",
    src: "/bactruoccodo.jpg",
    title: "Lý tưởng độc lập dân tộc",
  },
];

const roleCards: PresentationDetailItem[] = [
  {
    badge: "Vai trò 1",
    body: [
      "Hồ Chí Minh xem đạo đức là nền tảng của người cách mạng, giống như gốc của cây và nguồn của nước. Nếu thiếu đạo đức, tài năng và địa vị không đủ để tạo nên uy tín lãnh đạo.",
      "Đạo đức giúp người cách mạng vượt qua thử thách, không dao động trước lợi ích cá nhân và luôn đặt lợi ích của Tổ quốc, nhân dân lên trước.",
    ],
    summary: "Đạo đức là nền móng để người cách mạng đứng vững và hoàn thành sứ mệnh.",
    takeaway: "Ý chốt khi thuyết trình: tài năng có thể tạo hiệu quả nhất thời, nhưng đạo đức mới tạo niềm tin bền vững.",
    title: "Đạo đức là gốc của người cách mạng",
  },
  {
    badge: "Vai trò 2",
    body: [
      "Trong cách mạng và đời sống, đạo đức quyết định việc người cán bộ có được nhân dân tin yêu, ủng hộ hay không. Người có tài nhưng thiếu đức có thể gây hại cho tập thể và làm suy yếu sự nghiệp chung.",
      "Quan hệ giữa đức và tài vì vậy không phải là chọn một trong hai. Đức là nền tảng, tài là năng lực để biến phẩm chất đạo đức thành hành động có ích.",
    ],
    summary: "Đạo đức quyết định sự thành bại của cán bộ và sự nghiệp cách mạng.",
    takeaway: "Có tài mà không có đức thì khó tạo giá trị đúng hướng; có đức mà thiếu tài thì cần tiếp tục học tập để phụng sự tốt hơn.",
    title: "Nhân tố quyết định thành bại",
  },
  {
    badge: "Vai trò 3",
    body: [
      "Đạo đức cách mạng theo Hồ Chí Minh không phải đạo đức thủ cựu, phong kiến hay tư sản. Đó là đạo đức mới, hướng tới Đảng, Tổ quốc và nhân dân, không vì danh lợi cá nhân.",
      "Điểm mới nằm ở chỗ đạo đức gắn với vai trò làm chủ đất nước, làm chủ xã hội và gắn liền lợi ích cá nhân với lợi ích của giai cấp công nhân, nhân dân lao động.",
    ],
    summary: "Đây là đạo đức mới, đặt lợi ích chung và trách nhiệm xã hội lên trên chủ nghĩa cá nhân.",
    title: "Đạo đức cách mạng là đạo đức mới",
  },
  {
    badge: "Vai trò 4",
    body: [
      "Đức và tài bổ sung cho nhau. Đức giúp giữ vững lập trường, còn tài giúp hoàn thành nhiệm vụ trong thực tiễn.",
      "Trong tư tưởng Hồ Chí Minh, đức là gốc nhưng không thay thế cho năng lực. Người cách mạng phải rèn luyện cả phẩm chất lẫn trình độ để hành động đúng và hiệu quả.",
    ],
    summary: "Đức là nền tảng, tài là phương tiện để biến đạo đức thành hành động cụ thể.",
    title: "Mối quan hệ giữa đức và tài",
  },
];

const qualityCards: PresentationDetailItem[] = [
  {
    badge: "Phẩm chất 1",
    body: [
      "Trung với nước là trung thành với sự nghiệp dựng nước, giữ nước và con đường cách mạng vì độc lập dân tộc, hạnh phúc nhân dân.",
      "Hiếu với dân là hết lòng phục vụ nhân dân, lấy dân làm gốc, việc gì có lợi cho dân thì làm, việc gì có hại cho dân thì tránh.",
    ],
    examples: [
      "Trong đại dịch COVID-19, nhiều y bác sĩ, công an, bộ đội và tình nguyện viên vào tâm dịch, chấp nhận nguy hiểm để bảo vệ tính mạng nhân dân.",
      "Khi bão lũ, sạt lở xảy ra, lực lượng cứu hộ và người dân cùng tham gia cứu nạn, tiếp tế, dọn dẹp để giúp vùng bị nạn ổn định đời sống.",
    ],
    summary: "Trung thành với đất nước và tận tụy phục vụ nhân dân là phẩm chất đứng đầu.",
    takeaway: "Có thể dẫn bằng câu hỏi: nếu nói yêu nước nhưng thờ ơ với đời sống nhân dân, liệu đó có phải là trung với nước không?",
    title: "Trung với nước, hiếu với dân",
  },
  {
    badge: "Phẩm chất 2",
    body: [
      "Cần là siêng năng, chăm chỉ, làm việc có kế hoạch và sáng tạo. Kiệm là tiết kiệm thời gian, sức lực, của cải của mình và của nhân dân.",
      "Liêm là trong sạch, không tham lam, không biến của công thành của tư. Chính là ngay thẳng, thật thà. Chí công vô tư là đặt lợi ích chung lên trên lợi ích riêng.",
    ],
    examples: [
      "Các chiến dịch phòng chống tham nhũng thể hiện yêu cầu liêm, chính và chí công vô tư trong xây dựng bộ máy nhà nước trong sạch.",
      "Những người dân trả lại của rơi, không nhận thứ không thuộc về mình, là ví dụ gần gũi về chữ liêm trong đời sống hằng ngày.",
    ],
    summary: "Năm phẩm chất này tạo nên chuẩn mực sống trong sạch, trách nhiệm và công bằng.",
    title: "Cần, kiệm, liêm, chính, chí công vô tư",
  },
  {
    badge: "Phẩm chất 3",
    body: [
      "Hồ Chí Minh coi yêu thương con người là phẩm chất cao quý của người cách mạng. Tình yêu đó không dừng ở gia đình, làng xóm mà mở rộng đến nhân dân lao động và các dân tộc bị áp bức.",
      "Yêu thương con người trong tư tưởng của Người là tình thương thiết thực, thể hiện bằng hành động cụ thể, không chỉ bằng lời nói.",
    ],
    examples: [
      "Các phong trào thiện nguyện như quỹ vì người nghèo, quán cơm giá rẻ, ATM gạo hay hỗ trợ bệnh nhi cho thấy tinh thần thương người trong cộng đồng.",
      "Mỗi khi có thiên tai, tinh thần lá lành đùm lá rách thể hiện qua việc quyên góp, nấu bánh, gửi nhu yếu phẩm đến vùng khó khăn.",
    ],
    summary: "Tình yêu thương phải đi vào hành động cụ thể, thiết thực và rộng mở.",
    title: "Yêu thương con người",
  },
  {
    badge: "Phẩm chất 4",
    body: [
      "Tinh thần quốc tế trong sáng thể hiện ở sự đoàn kết với giai cấp công nhân, nhân dân lao động thế giới và các dân tộc đấu tranh vì độc lập, tự do.",
      "Hồ Chí Minh gắn chủ nghĩa yêu nước với chủ nghĩa quốc tế vô sản, đặt cách mạng Việt Nam trong dòng chảy chung của phong trào cách mạng thế giới.",
    ],
    examples: [
      "Lực lượng mũ nồi xanh Việt Nam tham gia gìn giữ hòa bình Liên Hợp Quốc, vừa làm nhiệm vụ chuyên môn vừa hỗ trợ đời sống người dân địa phương.",
      "Việt Nam từng cử lực lượng cứu hộ sang Thổ Nhĩ Kỳ và Syria sau thảm họa động đất năm 2023, thể hiện trách nhiệm quốc tế và tinh thần nhân đạo.",
    ],
    summary: "Yêu nước không khép kín mà gắn với đoàn kết, nhân đạo và trách nhiệm quốc tế.",
    title: "Tinh thần quốc tế trong sáng",
  },
];

const principleCards: PresentationDetailItem[] = [
  {
    badge: "Nguyên tắc 1",
    body: [
      "Nói đi đôi với làm là nguyên tắc hàng đầu trong đạo đức Hồ Chí Minh. Nói mà không làm sẽ làm mất niềm tin, thậm chí gây tác hại vì tạo ra khoảng cách giữa lời hứa và hành động.",
      "Nêu gương có sức thuyết phục mạnh vì quần chúng nhìn thấy chuẩn mực đạo đức trong đời sống thực tế chứ không chỉ nghe khẩu hiệu.",
    ],
    summary: "Lời nói phải được kiểm chứng bằng hành động, đặc biệt với cán bộ, đảng viên.",
    title: "Nói đi đôi với làm, nêu gương đạo đức",
  },
  {
    badge: "Nguyên tắc 2",
    body: [
      "Xây dựng đạo đức mới phải đi cùng đấu tranh chống các biểu hiện phi đạo đức như chủ nghĩa cá nhân, tham ô, lãng phí, quan liêu, xa hoa và hưởng lạc.",
      "Hồ Chí Minh xem chủ nghĩa cá nhân là kẻ thù bên trong vì nó có thể phá hoại tổ chức từ nội bộ, làm người cách mạng đánh mất lý tưởng.",
    ],
    summary: "Muốn xây cái tốt phải đồng thời phê phán và loại bỏ cái xấu.",
    title: "Xây đi đôi với chống",
  },
  {
    badge: "Nguyên tắc 3",
    body: [
      "Tu dưỡng đạo đức là công việc của cả đời người. Không ai có thể tự cho rằng mình đã hoàn thiện và dừng rèn luyện.",
      "Trong mọi hoàn cảnh, thuận lợi hay khó khăn, thời chiến hay thời bình, con người đều cần tự soi xét, sửa mình và bền bỉ nâng cao phẩm chất.",
    ],
    summary: "Đạo đức không tự nhiên có và cũng không tự động bền vững nếu ngừng rèn luyện.",
    takeaway: "Hình ảnh dễ nhớ: ngọc càng mài càng sáng, vàng càng luyện càng trong.",
    title: "Tu dưỡng đạo đức suốt đời",
  },
  {
    badge: "Nguyên tắc 4",
    body: [
      "Đạo đức cách mạng không phải đạo đức cá nhân thuần túy. Nó phải gắn với lợi ích tập thể, lợi ích giai cấp và lợi ích dân tộc.",
      "Người cách mạng cần biết đặt lợi ích chung lên trên lợi ích riêng, sẵn sàng hy sinh khi cần thiết để bảo vệ nghĩa lớn.",
    ],
    summary: "Cá nhân chỉ thật sự có đạo đức cách mạng khi biết sống trong trách nhiệm với tập thể.",
    title: "Gắn đạo đức cá nhân với đạo đức tập thể",
  },
];

const practiceCards: PresentationDetailItem[] = [
  {
    badge: "Phương pháp 1",
    body: [
      "Đạo đức không tự nhiên có mà được hình thành qua thực tiễn. Mỗi khó khăn, nhiệm vụ và va chạm đời sống là cơ hội để rèn bản lĩnh.",
      "Người cách mạng cần dấn thân, không né tránh gian khổ, vì phẩm chất đạo đức chỉ vững khi được thử thách trong hành động.",
    ],
    summary: "Rèn đạo đức bằng việc làm thật, nhiệm vụ thật và thử thách thật.",
    title: "Rèn luyện trong thực tiễn đấu tranh",
  },
  {
    badge: "Phương pháp 2",
    body: [
      "Tự phê bình và phê bình giúp mỗi người nhận ra khuyết điểm, sửa sai và giữ tổ chức trong sạch.",
      "Phê bình phải thẳng thắn, chân thành, xuất phát từ tinh thần xây dựng, tránh biến thành công kích cá nhân.",
    ],
    summary: "Biết tự soi và góp ý đúng cách là một phương pháp rèn đạo đức.",
    title: "Tự phê bình và phê bình",
  },
  {
    badge: "Phương pháp 3",
    body: [
      "Tu dưỡng đạo đức cần gắn với học tập lý luận Mác - Lênin, học kinh nghiệm thực tiễn và học từ nhân dân.",
      "Lý luận giúp người cách mạng giữ vững lập trường, phân biệt đúng sai và hành động có phương hướng.",
    ],
    summary: "Học tập giúp đạo đức không chỉ là thiện chí mà có định hướng đúng.",
    title: "Học tập và nâng cao lý luận",
  },
  {
    badge: "Phương pháp 4",
    body: [
      "Rèn đạo đức phải gắn với việc sâu sát nhân dân, lắng nghe nhân dân và học hỏi nhân dân.",
      "Xa dân dễ dẫn tới quan liêu, chủ quan và thoái hóa đạo đức. Gần dân giúp người cán bộ hiểu nhu cầu thật của đời sống.",
    ],
    summary: "Gần dân là cách giữ đạo đức không rơi vào hình thức.",
    title: "Gắn bó với nhân dân",
  },
  {
    badge: "Phương pháp 5",
    body: [
      "Tu dưỡng đạo đức không thể nóng vội, càng không thể chỉ làm theo phong trào. Nó cần được duy trì hằng ngày, từ việc nhỏ đến quyết định lớn.",
      "Sự bền bỉ giúp phẩm chất tốt trở thành thói quen và bản lĩnh, chứ không chỉ là phản ứng nhất thời.",
    ],
    summary: "Đạo đức cần nhịp rèn luyện đều đặn, liên tục và không phô trương.",
    title: "Kiên trì, bền bỉ, duy trì",
  },
  {
    badge: "Phương pháp 6",
    body: [
      "Chủ nghĩa cá nhân biểu hiện qua tham lam, lười biếng, kiêu ngạo, hẹp hòi và đặt lợi ích riêng lên trên lợi ích chung.",
      "Đấu tranh với chủ nghĩa cá nhân là đấu tranh với kẻ thù bên trong, vì nó có thể làm suy yếu đạo đức từ chính mỗi con người.",
    ],
    summary: "Muốn rèn đạo đức phải nhận diện và chống lại phần ích kỷ trong chính mình.",
    title: "Đấu tranh chống chủ nghĩa cá nhân",
  },
];

const educationCards: PresentationDetailItem[] = [
  {
    badge: "Giáo dục 1",
    body: [
      "Hồ Chí Minh đặc biệt quan tâm giáo dục đạo đức cho thanh niên, thiếu niên và nhi đồng, vì đây là đội ngũ kế cận và chủ nhân tương lai của đất nước.",
      "Giáo dục đạo đức cần bắt đầu sớm, từ gia đình, nhà trường đến các tổ chức xã hội, để hình thành nền tảng nhân cách bền vững.",
    ],
    summary: "Thế hệ trẻ là đối tượng ưu tiên trong giáo dục đạo đức.",
    takeaway: "Câu dẫn phù hợp: vì lợi ích trăm năm thì phải trồng người.",
    title: "Đối tượng ưu tiên: thế hệ trẻ",
  },
  {
    badge: "Giáo dục 2",
    body: [
      "Giáo dục từ bên ngoài cần đi cùng tự giáo dục từ bên trong. Nhà trường, Đảng, đoàn thể chỉ thật sự hiệu quả khi người học tự nguyện tiếp nhận và biến thành hành động.",
      "Vì vậy, giáo dục đạo đức không chỉ là truyền đạt chuẩn mực mà còn khơi dậy ý thức tự rèn luyện.",
    ],
    summary: "Giáo dục phải kết hợp với tự giáo dục để trở thành hành động tự giác.",
    title: "Kết hợp giáo dục với tự giáo dục",
  },
  {
    badge: "Giáo dục 3",
    body: [
      "Nội dung cốt lõi là bồi dưỡng lòng yêu nước, tinh thần dân tộc, lý tưởng cộng sản và ý thức trách nhiệm với cộng đồng.",
      "Khi có lý tưởng đúng đắn, con người có động lực tự rèn luyện đạo đức để xứng đáng với mục tiêu mình theo đuổi.",
    ],
    summary: "Lý tưởng và lòng yêu nước là trục chính của giáo dục đạo đức.",
    title: "Giáo dục lý tưởng và lòng yêu nước",
  },
  {
    badge: "Giáo dục 4",
    body: [
      "Trong giáo dục đạo đức, gương mẫu có sức thuyết phục hơn nhiều lời nói. Cán bộ, đảng viên, thầy cô và người lớn cần thể hiện chuẩn mực trong cả công việc lẫn đời sống.",
      "Một môi trường gia đình, nhà trường, cơ quan và xã hội lành mạnh sẽ giúp đạo đức tốt đẹp nảy sinh và phát triển.",
    ],
    summary: "Gương mẫu và môi trường lành mạnh làm cho giáo dục đạo đức có sức sống.",
    title: "Vai trò của gương mẫu và môi trường",
  },
];

const meaningCards: PresentationDetailItem[] = [
  {
    badge: "Ý nghĩa 1",
    body: [
      "Tư tưởng đạo đức Hồ Chí Minh là nền tảng tư tưởng và đạo đức của Đảng Cộng sản Việt Nam, soi đường cho xây dựng Nhà nước pháp quyền và phòng chống tham nhũng.",
      "Nó còn định hướng chiến lược xây dựng con người mới xã hội chủ nghĩa và là căn cứ để phê phán sự suy thoái đạo đức trong Đảng, xã hội.",
    ],
    summary: "Là nền tảng tư tưởng - đạo đức cho sự nghiệp cách mạng Việt Nam.",
    title: "Đối với sự nghiệp cách mạng Việt Nam",
  },
  {
    badge: "Ý nghĩa 2",
    body: [
      "Tư tưởng đạo đức Hồ Chí Minh kết tinh nhiều giá trị đạo đức cao đẹp của nhân loại, thể hiện sự thống nhất giữa lý tưởng và lối sống, lời nói và việc làm.",
      "Trong bối cảnh toàn cầu hóa và kinh tế thị trường, tư tưởng này vẫn gợi mở cách xây dựng đạo đức xã hội dựa trên nhân văn, trách nhiệm và liêm chính.",
    ],
    summary: "Có giá trị vượt khỏi phạm vi một thời kỳ, gắn với chuẩn mực nhân văn tiến bộ.",
    title: "Giá trị nhân loại và thời đại",
  },
  {
    badge: "Ý nghĩa 3",
    body: [
      "Với thế hệ trẻ, học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh giúp lấy đạo đức làm nền tảng trong học tập, nghề nghiệp và cuộc sống.",
      "Điều này cũng giúp người trẻ kế thừa truyền thống dân tộc, tiếp thu văn minh nhân loại và xây dựng lối sống trung thực, nhân ái, văn minh.",
    ],
    summary: "Giúp người trẻ định hình nhân cách và trách nhiệm xã hội trong đời sống hiện đại.",
    title: "Đối với thế hệ trẻ ngày nay",
  },
  {
    badge: "Ý nghĩa 4",
    body: [
      "Trong công cuộc đổi mới, học tập và làm theo Bác là cuộc vận động chính trị - đạo đức lớn của toàn Đảng, toàn dân.",
      "Tư tưởng cần, kiệm, liêm, chính có ý nghĩa trực tiếp trong phòng chống tham nhũng, lãng phí, nâng cao tinh thần trách nhiệm và xây dựng văn hóa công sở, văn hóa doanh nghiệp.",
    ],
    summary: "Có giá trị thực tiễn trong đổi mới, quản trị xã hội và xây dựng văn hóa hiện nay.",
    title: "Trong công cuộc đổi mới hiện nay",
  },
];

export default function PresentationPage() {
  return (
    <main className="presentation-shell min-h-screen overflow-hidden bg-[#fff7ec] text-[#1a0a00]">
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-[#7f0000]/95 via-[#c8102e]/95 to-[#9f1239]/95 px-4 py-3 shadow-lg backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2">
          {[
            ["Cơ sở", "#co-so"],
            ["Hình ảnh", "#hinh-anh"],
            ["Vai trò", "#vai-tro"],
            ["Phẩm chất", "#pham-chat"],
            ["Nguyên tắc", "#nguyen-tac"],
            ["Phương pháp", "#phuong-phap"],
            ["Giáo dục", "#giao-duc"],
            ["Ý nghĩa", "#y-nghia"],
          ].map(([label, href]) => (
            <a className="nav-pill rounded-lg px-3 py-2 text-sm font-semibold text-white/85" href={href} key={href}>
              {label}
            </a>
          ))}
          <Link className="gold-button rounded-lg px-4 py-2 text-sm font-black text-[#8b0000]" href="/game">
            Chơi mini game
          </Link>
        </div>
      </nav>

      <section className="hero-stage relative flex min-h-screen items-center overflow-hidden bg-[url('/vietnam-bg.png')] bg-cover bg-center px-5 pb-24 pt-28 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7f0000]/95 via-[#c8102e]/86 to-[#4c0519]/95" />
        <div className="hero-grid absolute inset-0 opacity-45" />
        <div className="light-beams absolute inset-0" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="sparkle-field absolute inset-0" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              className="sparkle"
              key={index}
              style={
                {
                  "--sparkle-delay": `${index * -0.42}s`,
                  "--sparkle-duration": `${6 + (index % 5) * 0.55}s`,
                  "--sparkle-left": `${(index * 47) % 100}%`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="text-center lg:text-left">
            <span className="hero-kicker mb-6 inline-flex rounded-full border border-[#ffd700]/45 bg-white/10 px-5 py-2 text-sm font-black uppercase tracking-[0.22em] text-[#fff0a0] backdrop-blur">
              Bài học tư tưởng đạo đức
            </span>
            <h1 className="hero-title text-4xl font-black leading-tight text-[#fff0a0] md:text-6xl">
              Tư Tưởng Đạo Đức
              <br />
              Hồ Chí Minh
            </h1>
            <p className="hero-description mt-5 max-w-3xl text-lg leading-8 text-white/90">
              Nền tảng tinh thần, sức mạnh nội sinh và kim chỉ nam cho sự nghiệp cách mạng Việt Nam, kết tinh từ tinh hoa văn hóa dân tộc và nhân loại.
            </p>
            <div className="hero-actions mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a className="gold-button rounded-2xl px-6 py-4 font-black text-[#8b0000]" href="#co-so">
                Bắt đầu bài học
              </a>
              <Link className="glass-button rounded-2xl px-6 py-4 font-black text-white" href="/game">
                Ôn tập bằng game
              </Link>
            </div>
            <div className="scroll-cue mx-auto mt-10 lg:mx-0" aria-hidden="true">
              <span />
            </div>
          </div>

          <div className="portrait-aura mx-auto">
            <div className="portrait-ring">
              <Image
                alt="Chân dung Chủ tịch Hồ Chí Minh"
                className="rounded-full border-4 border-white object-cover"
                height={280}
                priority
                src="/hcm-portrait.png"
                width={280}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="lesson-section px-5 py-20" id="co-so">
        <AnimateOnScroll className="mx-auto max-w-6xl">
          <SectionTitle
            subtitle="Những cội nguồn và nét đặc trưng cốt lõi của tư tưởng đạo đức Hồ Chí Minh"
            title="Cơ Sở Hình Thành & Đặc Điểm"
          />
          <div className="stagger-child grid gap-5 md:grid-cols-3">
            {foundations.map((item) => (
              <article className="hover-detail-card effect-card group rounded-2xl border border-[#c8102e]/10 bg-white p-6" key={item.title}>
                <span className="number-chip">{item.icon}</span>
                <h3 className="mt-5 text-xl font-black text-[#8b0000]">{item.title}</h3>
                <p className="mt-3 leading-7 text-[#3d1f00]">{item.body}</p>
                <p className="hover-detail mt-4 rounded-2xl bg-[#fff0dc] p-4 text-sm font-semibold leading-6 text-[#6b2400]">
                  {item.hoverDetail}
                </p>
              </article>
            ))}
          </div>
          <div className="effect-panel stagger-child mt-8 rounded-2xl border border-[#ffd700]/50 bg-white p-6">
            <h3 className="text-xl font-black text-[#8b0000]">Đặc điểm</h3>
            <ul className="mt-4 grid gap-3 text-[#3d1f00] md:grid-cols-2">
              {features.map((feature) => (
                <li className="feature-hover rounded-xl bg-[#fff8ee] px-4 py-3" key={feature}>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </AnimateOnScroll>
      </section>

      <section className="lesson-section bg-[#fff0dc] px-5 py-20" id="hinh-anh">
        <AnimateOnScroll className="mx-auto max-w-6xl">
          <SectionTitle
            subtitle="Một số hình ảnh tiêu biểu gắn với các giá trị đạo đức Hồ Chí Minh"
            title="Hình Ảnh Minh Họa Tư Tưởng Đạo Đức Hồ Chí Minh"
          />
          <div className="visual-story-grid stagger-child grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {visualMoments.map((moment) => (
              <figure className="visual-story-card overflow-hidden rounded-2xl border border-[#c8102e]/10 bg-white shadow-lg" key={moment.title}>
                <div className="relative aspect-[16/10]">
                  <Image alt={moment.title} className="object-cover" fill sizes="(max-width: 768px) 100vw, 25vw" src={moment.src} />
                </div>
                <figcaption className="p-5">
                  <h3 className="text-lg font-black text-[#8b0000]">{moment.title}</h3>
                  <p className="visual-ethic-link mt-3 rounded-xl px-3 py-2 text-sm font-black">{moment.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      <section className="lesson-section bg-[#fff0dc] px-5 py-20" id="vai-tro">
        <AnimateOnScroll className="mx-auto max-w-6xl">
          <SectionTitle subtitle="Tầm quan trọng mang tính nền tảng và quyết định" title="Vai Trò Của Đạo Đức" />
          <PresentationDetailCards items={roleCards} />
        </AnimateOnScroll>
      </section>

      <section className="lesson-section px-5 py-20" id="pham-chat">
        <AnimateOnScroll className="mx-auto max-w-6xl">
          <SectionTitle subtitle="Bốn phẩm chất then chốt tạo nên nhân cách người cách mạng" title="Phẩm Chất Đạo Đức" />
          <PresentationDetailCards items={qualityCards} />
        </AnimateOnScroll>
      </section>

      <section className="lesson-section bg-[#fff0dc] px-5 py-20" id="nguyen-tac">
        <AnimateOnScroll className="mx-auto max-w-6xl">
          <SectionTitle subtitle="Phương châm hành động định hướng quá trình rèn luyện" title="Nguyên Tắc Xây Dựng Đạo Đức" />
          <PresentationDetailCards items={principleCards} />
        </AnimateOnScroll>
      </section>

      <section className="lesson-section px-5 py-20" id="phuong-phap">
        <AnimateOnScroll className="mx-auto max-w-6xl">
          <SectionTitle subtitle="Cách biến chuẩn mực đạo đức thành thói quen và bản lĩnh sống" title="Phương Pháp Tu Dưỡng" />
          <PresentationDetailCards columns="three" items={practiceCards} />
        </AnimateOnScroll>
      </section>

      <section className="lesson-section bg-[#fff0dc] px-5 py-20" id="giao-duc">
        <AnimateOnScroll className="mx-auto max-w-6xl">
          <SectionTitle subtitle="Đưa tư tưởng đạo đức vào nhà trường, gia đình và môi trường xã hội" title="Giáo Dục Đạo Đức" />
          <PresentationDetailCards items={educationCards} />
        </AnimateOnScroll>
      </section>

      <section className="lesson-section px-5 py-20" id="y-nghia">
        <AnimateOnScroll className="mx-auto max-w-6xl">
          <SectionTitle title="Ý Nghĩa Của Tư Tưởng Đạo Đức Hồ Chí Minh" />
          <PresentationDetailCards columns="two" items={meaningCards} />
          <div className="cta-animate cta-panel stagger-child mt-10 rounded-3xl bg-gradient-to-r from-[#8b0000] via-[#c8102e] to-[#9f1239] p-8 text-center text-white">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#fff0a0]">Cuối bài thuyết trình</p>
            <h2 className="mt-2 text-3xl font-black">Caro Quiz Battle</h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/85">
              Sau khi xem bài, người nghe có thể bấm vào mini game để ôn lại nội dung qua câu hỏi và bảng xếp hạng.
            </p>
            <Link className="gold-button mt-6 inline-flex rounded-2xl px-7 py-4 font-black text-[#8b0000]" href="/game">
              Mở mini game
            </Link>
          </div>
        </AnimateOnScroll>
      </section>
      <PresentationChatbot />
    </main>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="section-title stagger-child mb-10 text-center">
      <h2 className="text-3xl font-black text-[#8b0000] md:text-4xl">{title}</h2>
      <div className="section-underline mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-[#c8102e] to-[#ffd700]" />
      {subtitle ? <p className="mx-auto mt-4 max-w-3xl text-[#6b4226]">{subtitle}</p> : null}
    </div>
  );
}
