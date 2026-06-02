# Caro Quiz Battle

Mini game cuối bài thuyết trình: người chơi nhập tên, đánh caro 9x9 với bot, trả lời quiz lấy từ nội dung PDF, nhận kỹ năng và cập nhật điểm lên leaderboard Supabase realtime.

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Database
- Supabase Realtime
- Deploy target: Vercel

## Cài dependency

Từ root repo:

```bash
npm install
```

Hoặc trong workspace app:

```bash
npm install --workspace hcm-ethics
```

## Tạo Supabase project

1. Tạo project mới trên Supabase.
2. Vào SQL Editor.
3. Chạy toàn bộ nội dung trong `supabase/schema.sql`.
4. Bảo đảm Realtime bật cho table `scores`. File SQL đã có dòng `alter publication supabase_realtime add table public.scores;`. Nếu Supabase báo table đã được thêm vào publication, có thể bỏ qua.

## Thêm env

Copy `.env.example` thành `.env.local` trong thư mục `hcm-ethics`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Chỉ dùng anon key ở client. Không đưa `SUPABASE_SERVICE_ROLE_KEY` vào frontend.
`NEXT_PUBLIC_SUPABASE_URL` nên là URL project gốc dạng `https://xxxx.supabase.co`, không cần thêm `/rest/v1`. App vẫn tự chuẩn hóa nếu lỡ nhập URL có `/rest/v1`.

Nếu chưa cấu hình Supabase, game vẫn chơi được. Leaderboard sẽ hiển thị trạng thái `Chưa kết nối Supabase`.

## Chạy local

Từ root repo:

```bash
npm run dev
```

Mở `http://localhost:3000`.

Các route chính:

- `/`: nhập tên và bắt đầu chơi
- `/play`: caro quiz battle
- `/leaderboard`: top 10 realtime
- `/presenter`: QR code và top 5 realtime cho slide cuối

## Build

```bash
npm run build
```

## Deploy Vercel

1. Import repo vào Vercel.
2. Nếu Vercel hỏi root directory, chọn `hcm-ethics` hoặc giữ root repo và dùng npm workspace scripts hiện có.
3. Thêm env:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` bằng URL Vercel public.
4. Deploy.

Nếu deploy từ root repo, `vercel.json` ở root đã trỏ build về workspace `hcm-ethics`. Nếu chọn root directory là `hcm-ethics` trong Vercel, Vercel sẽ dùng `hcm-ethics/vercel.json`.

## Gameplay

- Người chơi là X, bot là O.
- Bàn 9x9, thắng khi có 5 quân liên tiếp ngang, dọc hoặc chéo.
- Sau mỗi 3 lượt người chơi, game mở quiz.
- Trả lời đúng: +30 điểm và nhận ngẫu nhiên 1 kỹ năng.
- Trả lời sai: -10 điểm và bot được ưu tiên nước mạnh hơn lượt kế tiếp.
- Thắng bot: +100 điểm.
- Hòa: +50 điểm.
- Thua: +20 điểm.
- Thắng dưới 15 lượt: bonus +50 điểm.
- Tổng điểm không nhỏ hơn 0.

## Code structure

```text
src/app/page.tsx
src/app/play/page.tsx
src/app/leaderboard/page.tsx
src/app/presenter/page.tsx
src/components/GameBoard.tsx
src/components/QuizModal.tsx
src/components/Leaderboard.tsx
src/components/QRCodeJoin.tsx
src/lib/supabaseClient.ts
src/lib/gameLogic.ts
src/lib/botLogic.ts
src/lib/scoring.ts
src/data/questions.ts
supabase/schema.sql
.env.example
```
