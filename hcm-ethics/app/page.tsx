import React from 'react';

export default function Home() {
  return (
    <main>
      {/* Navbar */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, background: 'linear-gradient(135deg, var(--red-dark), var(--red-primary))', padding: '1rem 0', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <a href="#co-so" className="nav-link">Cơ sở</a>
          <a href="#dac-diem" className="nav-link">Đặc điểm</a>
          <a href="#vai-tro" className="nav-link">Vai trò</a>
          <a href="#pham-chat" className="nav-link">Phẩm chất</a>
          <a href="#nguyen-tac" className="nav-link">Nguyên tắc</a>
          <a href="#phuong-phap" className="nav-link">Phương pháp</a>
          <a href="#giao-duc" className="nav-link">Giáo dục</a>
          <a href="#y-nghia" className="nav-link">Ý nghĩa</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        paddingTop: '8rem', 
        paddingBottom: '5rem',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        background: 'url(/vietnam-bg.png) center/cover no-repeat',
        color: 'white',
        overflow: 'hidden'
      }}>
        <div className="hero-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}></div>
        <div className="container animate-fadeInUp" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className="float-star" style={{ marginBottom: '2rem' }}>
            <span className="star-icon" style={{ fontSize: '4rem', filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.8))' }}>★</span>
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--gold-light)', textShadow: '0 4px 10px rgba(0,0,0,0.3)', marginBottom: '1rem', lineHeight: 1.2 }}>
            TƯ TƯỞNG ĐẠO ĐỨC<br/>HỒ CHÍ MINH
          </h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 3rem', color: 'rgba(255,255,255,0.9)' }}>
            Nền tảng tinh thần, sức mạnh nội sinh và kim chỉ nam cho sự nghiệp cách mạng Việt Nam, kết tinh từ tinh hoa văn hóa dân tộc và nhân loại.
          </p>
          
          <div style={{ position: 'relative', width: '250px', height: '250px', borderRadius: '50%', padding: '10px', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', animation: 'pulse-gold 3s infinite' }}>
            <img src="/hcm-portrait.png" alt="Chân dung Chủ tịch Hồ Chí Minh" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '5px solid #fff' }} />
          </div>
        </div>
      </section>

      {/* 1. Cơ sở hình thành & 2. Đặc điểm */}
      <section id="co-so" className="section">
        <div className="container">
          <h2 className="section-title animate-fadeInUp">Cơ sở Hình thành & Đặc điểm</h2>
          <p className="section-subtitle animate-fadeInUp" style={{ animationDelay: '0.1s' }}>Những cội nguồn và nét đặc trưng cốt lõi của Tư tưởng Đạo đức Hồ Chí Minh</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {/* Cơ sở hình thành */}
            <div className="card animate-fadeInLeft" style={{ animationDelay: '0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '10px' }}>
                <span className="star-icon">★</span>
                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Cơ sở hình thành</h3>
              </div>
              <p style={{ marginBottom: '1rem', fontWeight: 500 }}>Được hình thành từ ba nguồn gốc lớn:</p>
              <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', color: 'var(--text-medium)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li><strong>Truyền thống đạo đức dân tộc Việt Nam:</strong> lòng yêu nước, nhân nghĩa, cần cù.</li>
                <li><strong>Tinh hoa đạo đức nhân loại:</strong> Nho giáo, Phật giáo, đạo đức phương Tây tiến bộ.</li>
                <li><strong>Chủ nghĩa Mác – Lênin:</strong> đạo đức cộng sản và tinh thần quốc tế vô sản.</li>
              </ul>
            </div>

            {/* Đặc điểm */}
            <div className="card animate-fadeInLeft" style={{ animationDelay: '0.3s' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '10px' }}>
                <span className="star-icon">★</span>
                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Đặc điểm</h3>
              </div>
              <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', color: 'var(--text-medium)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li>Kết hợp hài hòa giữa lý luận và thực tiễn, giữa nói và làm.</li>
                <li>Mang đậm tính dân tộc và tính thời đại.</li>
                <li>Coi đạo đức là gốc rễ, là nền tảng của người cách mạng.</li>
                <li>Nhấn mạnh việc tu dưỡng đạo đức là việc làm suốt đời.</li>
              </ul>
              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <img src="/ethics-icon.png" alt="Biểu tượng đạo đức" style={{ width: '100px', opacity: 0.8 }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vai trò của Đạo đức */}
      <section id="vai-tro" className="section section-alt">
        <div className="container">
          <h2 className="section-title">Vai Trò Của Đạo Đức</h2>
          <p className="section-subtitle">Tầm quan trọng mang tính nền tảng và quyết định</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem' }}>
            <div className="card">
              <span className="badge" style={{ marginBottom: '1rem' }}>Vai trò 1</span>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Đạo đức là gốc của người cách mạng</h3>
              <p>Hồ Chí Minh xác định: đạo đức là nền tảng, là gốc rễ của người cách mạng, không phải là điều phụ thuộc vào tài năng hay địa vị. Người dùng hình ảnh "gốc cây", "nguồn nước" để diễn đạt: không có đạo đức thì dù tài giỏi đến đâu cũng không thể lãnh đạo nhân dân, không thể hoàn thành sứ mệnh cách mạng. Đạo đức là động lực tinh thần để vượt qua mọi thử thách.</p>
            </div>
            
            <div className="card">
              <span className="badge" style={{ marginBottom: '1rem' }}>Vai trò 2</span>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Đạo đức là nhân tố quyết định sự thành bại</h3>
              <p>Trong cách mạng và trong cuộc sống, Hồ Chí Minh nhấn mạnh rằng đạo đức quyết định sự thành hay bại của người cán bộ và của sự nghiệp cách mạng. Người cán bộ có đức thì được nhân dân tin yêu, ủng hộ; thiếu đức thì dù có tài cũng thất bại, thậm chí gây hại cho cách mạng.</p>
              <div className="quote-block" style={{ marginTop: '1rem' }}>
                "Có tài mà không có đức là người vô dụng; có đức mà không có tài thì làm việc gì cũng khó."
              </div>
            </div>

            <div className="card">
              <span className="badge" style={{ marginBottom: '1rem' }}>Vai trò 3</span>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Đạo đức cách mạng không phải là đạo đức thủ cựu</h3>
              <p>Hồ Chí Minh phân biệt rõ đạo đức cách mạng với đạo đức phong kiến hay đạo đức tư sản. Đạo đức cách mạng là đạo đức mới — vì Đảng, vì Tổ quốc, vì nhân dân, không vì danh lợi cá nhân. Đó là đạo đức của con người làm chủ đất nước, làm chủ xã hội, gắn liền với lợi ích của giai cấp công nhân và nhân dân lao động.</p>
            </div>

            <div className="card">
              <span className="badge" style={{ marginBottom: '1rem' }}>Vai trò 4</span>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Mối quan hệ giữa đức và tài</h3>
              <p>Theo Hồ Chí Minh, đức và tài không tách rời nhau mà bổ sung cho nhau. Đức là gốc nhưng tài là cần thiết để đưa đức ra thực tiễn. Người cách mạng phải rèn luyện cả hai: đức để giữ vững lập trường, tài để hoàn thành nhiệm vụ. Trong đó, đức làm nền tảng, tài là biểu hiện cụ thể của đức trong hành động thực tiễn.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Phẩm chất của Đạo đức */}
      <section id="pham-chat" className="section">
        <div className="container">
          <h2 className="section-title">Phẩm Chất Của Đạo Đức</h2>
          <p className="section-subtitle">Bốn phẩm chất then chốt tạo nên nhân cách người cách mạng</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
              <div style={{ flex: '1 1 300px' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="principle-number">1</span> Trung với nước, hiếu với dân
                </h3>
                <p style={{ marginBottom: '1rem' }}>Đây là phẩm chất quan trọng hàng đầu. Trung với nước là trung thành với sự nghiệp dựng nước và giữ nước, với con đường cách mạng mà Đảng và Bác đã lựa chọn. Hiếu với dân là hết lòng phục vụ nhân dân, lấy dân làm gốc, coi lợi ích của nhân dân là trên hết, việc gì có lợi cho dân thì làm, việc gì có hại cho dân thì tránh. Đây là sự phát triển cao nhất, sáng tạo nhất của khái niệm trung — hiếu trong đạo đức truyền thống dân tộc.</p>
              </div>
              <div style={{ flex: '1 1 300px', background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-medium)' }}>Minh chứng thực tiễn:</h4>
                <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-light)', fontSize: '0.95rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Cuộc chiến chống đại dịch COVID-19: Hàng vạn y bác sĩ, chiến sĩ công an, bộ đội đã xung phong vào tâm dịch... chấp nhận rủi ro để bảo vệ nhân dân.</li>
                  <li>Hình ảnh chiến sĩ cứu hộ trong thiên tai: Mỗi khi bão lũ... các chiến sĩ lại lao mình vào dòng nước dữ để cứu dân... Đó chính là "Hiếu với dân".</li>
                </ul>
              </div>
            </div>

            <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
              <div style={{ flex: '1 1 300px' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="principle-number">2</span> Cần, kiệm, liêm, chính, chí công vô tư
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                  <p><strong>Cần:</strong> siêng năng, chăm chỉ, cần cù, làm việc sáng tạo.</p>
                  <p><strong>Kiệm:</strong> tiết kiệm sức lực, thời gian, của cải, không xa xỉ.</p>
                  <p><strong>Liêm:</strong> trong sạch, không tham lam, không lấy của công làm tư.</p>
                  <p><strong>Chính:</strong> ngay thẳng, thật thà, không làm điều xấu xa.</p>
                  <p><strong>Chí công vô tư:</strong> lo trước thiên hạ, vui sau thiên hạ.</p>
                </div>
              </div>
              <div style={{ flex: '1 1 300px', background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-medium)' }}>Minh chứng thực tiễn:</h4>
                <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-light)', fontSize: '0.95rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Các chiến dịch phòng chống tham nhũng: Công cuộc "đốt lò" là biểu hiện mạnh mẽ của việc thực hiện "Liêm", "Chính" và "Chí công vô tư".</li>
                  <li>Tấm gương người dân trả lại của rơi: Hành động nhặt được tài sản giao nộp công an trả lại người mất là minh chứng sống động.</li>
                </ul>
              </div>
            </div>

            <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
              <div style={{ flex: '1 1 300px' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="principle-number">3</span> Yêu thương con người
                </h3>
                <p style={{ marginBottom: '1rem' }}>Hồ Chí Minh coi tình yêu thương con người là một trong những phẩm chất cao quý nhất của người cách mạng. Tình yêu đó không chỉ dừng lại ở tình cảm gia đình, làng xóm, mà mở rộng ra toàn thể nhân dân lao động, các dân tộc bị áp bức trên toàn thế giới. Đó là tình yêu thương rộng lớn, sâu sắc, thiết thực — được biểu hiện qua hành động cụ thể chứ không chỉ là lời nói suông. Người dạy: "Thương người như thể thương thân".</p>
              </div>
              <div style={{ flex: '1 1 300px', background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-medium)' }}>Minh chứng thực tiễn:</h4>
                <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-light)', fontSize: '0.95rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Các phong trào thiện nguyện toàn dân: "Cặp lá yêu thương", "Trái tim cho em", ATM gạo...</li>
                  <li>Tinh thần "lá lành đùm lá rách" của người Việt bùng nổ mỗi khi có thiên tai, dịch bệnh.</li>
                </ul>
              </div>
            </div>

            <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
              <div style={{ flex: '1 1 300px' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="principle-number">4</span> Tinh thần quốc tế trong sáng
                </h3>
                <p style={{ marginBottom: '1rem' }}>Đây là phẩm chất đặc trưng của đạo đức cộng sản, mang tầm nhìn toàn cầu. Tinh thần quốc tế trong sáng thể hiện ở sự đoàn kết với giai cấp công nhân và nhân dân lao động toàn thế giới, với các dân tộc đang đấu tranh giải phóng. Hồ Chí Minh coi chủ nghĩa yêu nước gắn liền với chủ nghĩa quốc tế vô sản.</p>
              </div>
              <div style={{ flex: '1 1 300px', background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-medium)' }}>Minh chứng thực tiễn:</h4>
                <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-light)', fontSize: '0.95rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Đội mũ nồi xanh Việt Nam tham gia gìn giữ hòa bình Liên Hợp Quốc: làm tốt nhiệm vụ và giúp đỡ cộng đồng quốc tế.</li>
                  <li>Giúp đỡ các nước bạn khi gặp thiên tai: Cử đội cứu hộ cứu nạn đến Thổ Nhĩ Kỳ và Syria năm 2023.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Nguyên tắc xây dựng Đạo đức */}
      <section id="nguyen-tac" className="section section-alt">
        <div className="container">
          <h2 className="section-title">Nguyên Tắc Xây Dựng Đạo Đức Cách Mạng</h2>
          <p className="section-subtitle">Phương châm hành động định hướng sự rèn luyện</p>
          
          <div className="card" style={{ padding: '0' }}>
            <table className="content-table">
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>Nguyên tắc</th>
                  <th>Nội dung cốt lõi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>1. Nói đi đôi với làm, nêu gương đạo đức</strong></td>
                  <td>Đây là nguyên tắc hàng đầu và xuyên suốt. Nói mà không làm thì vô ích, thậm chí có hại. Cán bộ, đảng viên phải làm gương cho quần chúng noi theo. Bản thân Hồ Chí Minh là tấm gương sáng ngời về sự thống nhất giữa lời nói và việc làm suốt cuộc đời mình.</td>
                </tr>
                <tr>
                  <td><strong>2. Xây đi đôi với chống</strong></td>
                  <td>Xây dựng đạo đức mới phải gắn liền với việc phê phán, đấu tranh chống lại những biểu hiện phi đạo đức: chủ nghĩa cá nhân, tham ô, lãng phí, quan liêu. Hồ Chí Minh coi chủ nghĩa cá nhân là "giặc nội xâm". Xây và chống cần tiến hành đồng thời và kiên quyết.</td>
                </tr>
                <tr>
                  <td><strong>3. Tu dưỡng đạo đức suốt đời</strong></td>
                  <td>Việc rèn luyện đạo đức là công việc của cả một đời người, không bao giờ ngừng và không được chủ quan thỏa mãn. Tu dưỡng đạo đức như "ngọc càng mài càng sáng, vàng càng luyện càng trong". Dù thuận lợi hay khó khăn đều phải không ngừng tự rèn luyện.</td>
                </tr>
                <tr>
                  <td><strong>4. Đạo đức cá nhân gắn liền với đạo đức tập thể</strong></td>
                  <td>Đạo đức cách mạng phải gắn liền với lợi ích tập thể, lợi ích giai cấp và dân tộc. Người cách mạng phải biết đặt lợi ích chung lên trên lợi ích cá nhân, sẵn sàng hi sinh vì nghĩa lớn.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. Phương pháp tu dưỡng & 7. Giáo dục */}
      <section id="phuong-phap" className="section">
        <div className="container">
          <h2 className="section-title">Phương Pháp Tu Dưỡng & Giáo Dục</h2>
          <p className="section-subtitle">Cách thức thực hiện để đạt hiệu quả cao nhất</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            <div id="phuong-phap-col" className="card" style={{ borderTop: '5px solid var(--red-primary)' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--red-dark)', textAlign: 'center' }}>Phương Pháp Tu Dưỡng</h3>
              
              <div className="principle-item">
                <span className="principle-number">1</span>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>Rèn luyện trong thực tiễn đấu tranh</h4>
                  <p style={{ fontSize: '0.95rem' }}>Đạo đức không phải tự nhiên có được mà phải được rèn luyện qua thực tiễn cách mạng. Mỗi khó khăn, thử thách là cơ hội để tôi luyện phẩm chất. Người cách mạng phải dấn thân, không né tránh gian khổ.</p>
                </div>
              </div>
              
              <div className="principle-item">
                <span className="principle-number">2</span>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>Tự phê bình và phê bình</h4>
                  <p style={{ fontSize: '0.95rem' }}>Hồ Chí Minh coi tự phê bình và phê bình là "vũ khí sắc bén" để xây dựng tổ chức và rèn luyện đạo đức. Cần phê bình thẳng thắn, chân thành, xuất phát từ tinh thần xây dựng.</p>
                </div>
              </div>

              <div className="principle-item">
                <span className="principle-number">3</span>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>Học tập và nâng cao lý luận</h4>
                  <p style={{ fontSize: '0.95rem' }}>Tu dưỡng đạo đức gắn với việc không ngừng học tập lý luận Mác - Lênin, học hỏi kinh nghiệm thực tiễn, học từ nhân dân. Lý luận soi đường cho thực tiễn.</p>
                </div>
              </div>

              <div className="principle-item">
                <span className="principle-number">4</span>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>Gắn bó với nhân dân & Kiên trì</h4>
                  <p style={{ fontSize: '0.95rem' }}>Phải "từ trong quần chúng mà ra, trở lại với quần chúng". Việc tu dưỡng phải kiên trì, bền bỉ, liên tục từ những việc nhỏ nhất, kiên quyết đấu tranh chống chủ nghĩa cá nhân.</p>
                </div>
              </div>
            </div>

            <div id="giao-duc" className="card" style={{ borderTop: '5px solid var(--gold)' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--red-dark)', textAlign: 'center' }}>Giáo Dục Đạo Đức</h3>
              
              <div className="principle-item">
                <span className="star-icon">★</span>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>Đối tượng ưu tiên</h4>
                  <p style={{ fontSize: '0.95rem' }}><strong>Giáo dục thế hệ trẻ — đội ngũ kế cận:</strong> "Vì lợi ích mười năm trồng cây, vì lợi ích trăm năm trồng người." Giáo dục đạo đức phải bắt đầu từ sớm, ngay từ tuổi ấu thơ trong gia đình, nhà trường.</p>
                </div>
              </div>
              
              <div className="principle-item">
                <span className="star-icon">★</span>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>Phương pháp kết hợp</h4>
                  <p style={{ fontSize: '0.95rem' }}><strong>Kết hợp giáo dục với tự giáo dục:</strong> Giáo dục từ bên ngoài phải đi kèm với quá trình tự giáo dục từ bên trong mỗi người. Biến kiến thức thành hành động tự giác.</p>
                </div>
              </div>

              <div className="principle-item">
                <span className="star-icon">★</span>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>Nội dung & Vai trò</h4>
                  <p style={{ fontSize: '0.95rem' }}><strong>Giáo dục lý tưởng và lòng yêu nước</strong> là nội dung cốt lõi. Cán bộ, đảng viên phải làm gương vì sự gương mẫu có sức thuyết phục hơn nghìn lời nói.</p>
                </div>
              </div>

              <div className="principle-item">
                <span className="star-icon">★</span>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>Môi trường giáo dục</h4>
                  <p style={{ fontSize: '0.95rem' }}>Xây dựng môi trường đạo đức lành mạnh trong gia đình, nhà trường, cơ quan, xã hội là điều kiện thuận lợi để đạo đức tốt đẹp nảy sinh và phát triển.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Ý nghĩa */}
      <section id="y-nghia" className="section section-alt">
        <div className="container">
          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(200, 16, 46, 0.05) 0%, rgba(255, 215, 0, 0.05) 100%)', border: '1px solid rgba(255, 215, 0, 0.3)' }}>
            <h2 className="section-title" style={{ marginTop: '1rem' }}>Ý Nghĩa Của Tư Tưởng Đạo Đức Hồ Chí Minh</h2>
            <div style={{ height: '3rem' }}></div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--red-dark)', borderBottom: '2px solid var(--red-light)', paddingBottom: '0.5rem' }}>Đối với sự nghiệp cách mạng</h3>
                <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-medium)', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li>Là nền tảng tư tưởng và đạo đức của Đảng Cộng sản Việt Nam.</li>
                  <li>Soi đường cho công cuộc xây dựng Nhà nước pháp quyền, phòng chống tham nhũng.</li>
                  <li>Định hướng cho chiến lược xây dựng con người mới xã hội chủ nghĩa.</li>
                  <li>Là căn cứ để phê phán và ngăn chặn sự suy thoái đạo đức trong Đảng và xã hội.</li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--red-dark)', borderBottom: '2px solid var(--red-light)', paddingBottom: '0.5rem' }}>Giá trị nhân loại và thời đại</h3>
                <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-medium)', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li>Kết tinh những giá trị đạo đức nhân loại cao đẹp nhất.</li>
                  <li>Mô hình về sự thống nhất giữa lý tưởng và lối sống, lời nói và việc làm.</li>
                  <li>Bài học về xây dựng đạo đức trong bối cảnh toàn cầu hóa và kinh tế thị trường.</li>
                  <li>Tấm gương về lãnh đạo đạo đức được UNESCO và cộng đồng quốc tế tôn vinh.</li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--red-dark)', borderBottom: '2px solid var(--red-light)', paddingBottom: '0.5rem' }}>Đối với thế hệ trẻ & Đổi mới</h3>
                <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-medium)', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li>Lấy đạo đức làm nền tảng trong học tập, nghề nghiệp và cuộc sống.</li>
                  <li>Kế thừa truyền thống đạo đức dân tộc, tiếp thu văn minh nhân loại.</li>
                  <li>Xây dựng lối sống văn minh, trung thực, nhân ái trong xã hội hiện đại.</li>
                  <li>Học tập và làm theo Bác là cuộc vận động chính trị - đạo đức lớn.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--red-dark)', color: 'rgba(255,255,255,0.8)', padding: '3rem 1.5rem', textAlign: 'center' }}>
        <div className="container">
          <div className="star-icon" style={{ marginBottom: '1rem', fontSize: '2rem' }}>★</div>
          <h3 style={{ color: 'var(--gold)', fontSize: '1.5rem', marginBottom: '1rem', fontFamily: "'Be Vietnam Pro', sans-serif" }}>TƯ TƯỞNG ĐẠO ĐỨC HỒ CHÍ MINH</h3>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
            Tài liệu giáo dục chuyên đề tôn vinh và học tập các giá trị tư tưởng, đạo đức, phong cách Chủ tịch Hồ Chí Minh. Thiết kế theo chuẩn mực và tôn trọng tinh thần dân tộc.
          </p>
          <div style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
            &copy; 2026 - Educational Purpose Website
          </div>
        </div>
      </footer>
    </main>
  );
}
