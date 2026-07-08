# 🌿 森林浴 · 7 週免費電郵課程 Landing Page

![No build required](https://img.shields.io/badge/no%20build-required-brightgreen)
![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-orange)
![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-8A63D2)

一個為近年移英 BNO 港人而設的**森林浴（Shinrin-yoku）自然療癒**招生頁。用科學與森林，邀請社群報名一個**免費、7 週、7 主題的電郵課程（Educational Email Course, EEC）**，課程尾聲設 **2026 年 9 月 12 日**實體工作坊。

本專案為單一自足的 `index.html`（HTML + 內嵌 CSS + vanilla JavaScript），**無需任何 build step 或框架**，可直接部署至 GitHub Pages。

---

## 📖 關於這個專案 About

「森林浴」系列由 **韭菜俱樂部（The Chive Club）** 主辦——一個服務修咸頓（Southampton）周邊移英港人家庭的社群，隸屬 **AuLaw Organic Farm UK C.I.C.（歐羅有機農場）**。

這個 landing page 的唯一任務，是引導訪客**報名免費電郵課程**：由 2026 年 7 月 20 日起，每逢週一寄出一課，用實證研究陪伴剛落腳異鄉的港人，重新找回身心的安定；並在 9 月 12 日以一場由認證森林療癒師帶領的實體工作坊，作為整個旅程的終點。

---

## ✨ 主要功能 Features

- 🎯 **單一行動呼籲**：全頁聚焦於報名免費電郵課程。
- 🌬️ **「呼吸的光」招牌元素**：hero 中緩緩明滅的光暈，呼應森林浴放慢呼吸的核心。
- 🛤️ **7 週課程小徑**：以時間軸呈現每週一課，最後一站指向工作坊。
- 📊 **科學數據卡**：皮質醇 −12.7%、20 分鐘見效、免疫力持續 7 天+、芬多精 4 倍等實證。
- 📝 **報名表單**：含前端驗證與「報名成功」畫面，可接多種收件端點。
- 🔗 **一鍵分享**：WhatsApp 與 Signal 分享按鈕。
- 📱 **響應式設計**：手機優先，數據卡與表單自動重排。
- ♿ **無障礙考量**：鍵盤 focus 樣式、`prefers-reduced-motion`、語意化標記。
- 🖼️ **Open Graph 標籤**：分享時顯示標題與描述（可補 `og:image` 縮圖）。

---

## 🛠 技術與檔案結構 Tech & Structure

**技術**

- HTML5、CSS3（以 **CSS custom properties** 管理配色與字型）、vanilla JavaScript（無相依套件）
- 字型：**Noto Serif TC**（標題）＋ **Noto Sans TC**（內文），由 Google Fonts 載入
- 無 build step、無 bundler、無框架

**檔案結構**

```
.
├── index.html      # 整個網站（HTML + 內嵌 CSS + JS）
└── README.md       # 本文件
```

> 目前所有內容都在單一 `index.html` 內。如日後要加圖片，建議新增 `assets/` 資料夾存放。

---

## 🚀 快速開始 / 本地預覽 Quick Start

因為沒有 build step，任選一種方式即可：

**方式 A｜直接開啟**
以瀏覽器開啟 `index.html`（雙擊即可）。

> 注意：以 `file://` 開啟時，分享按鈕會退回官方連結。分享的實際行為，請在部署後或本地伺服器測試。

**方式 B｜本地伺服器（建議）**

```bash
# Python
python3 -m http.server 8000
# 然後開啟 http://localhost:8000

# 或 Node（如已安裝）
npx serve .
```

---

## 🌍 部署到 GitHub Pages Deployment

1. 建立一個新的 GitHub repository，把 `index.html` 與 `README.md` 推上去：

   ```bash
   git init
   git add .
   git commit -m "Add forest bathing landing page"
   git branch -M main
   git remote add origin https://github.com/<你的帳號>/<repo 名稱>.git
   git push -u origin main
   ```

2. 到 repo 的 **Settings → Pages**。
3. 在 **Build and deployment → Source** 選 **Deploy from a branch**。
4. **Branch** 選 `main`、資料夾選 `/ (root)`，按 **Save**。
5. 稍候片刻，頁面會發佈於：

   ```
   https://<你的帳號>.github.io/<repo 名稱>/
   ```

> 分享網址取自 `window.location.href`，一經部署便自動採用真實網址，無需改動程式碼。

---

## ⚙️ 設定 Configuration

以下設定都在 `index.html` 底部的 `<script>` 區塊，或 `<head>` 內。

### 1. 報名收件端點 `SIGNUP_ENDPOINT`（重要）

`<script>` 最上方有：

```javascript
var SIGNUP_ENDPOINT = "";
```

**留空時**，表單仍會顯示「報名成功」畫面（方便先上線試用），但**不會真正寄出**資料。正式使用前，請三選一填入：

| 方式 | 適用情境 | 設定 |
|------|----------|------|
| **Formspree** | 最快、免後端 | 到 formspree.io 建立表單，填入 `"https://formspree.io/f/xxxxxx"` |
| **Supabase Edge Function + Resend** | 想自動寄出課程信、自建資料庫 | 部署 Edge Function 後，填入其 URL |
| **Google Form** | 已有表單、想收進試算表 | 填入表單的 `formResponse` 網址 |

表單會以 JSON `POST` 送出 `{ name, email, course }`。

### 2. 分享按鈕行為 Share buttons

- **WhatsApp**：使用 `wa.me`，桌面與手機皆可，會帶出預設文案 + 本頁網址。
- **Signal**：無標準網頁分享網址，故**手機**優先叫出系統分享選單（含 Signal）；**桌面**則自動複製「文案＋連結」讓你貼進 Signal。

分享文案可在 `<script>` 內修改：

```javascript
var SHARE_TITLE = "森林浴 · 7 週免費電郵課程｜韭菜俱樂部";
var SHARE_TEXT  = "在英國的樹林裡，找回原來的自己……";
```

### 3. 分享縮圖 `og:image`

`<head>` 已有 Open Graph 標題與描述。若想在分享時顯示縮圖，補一行（圖片建議 1200 × 630）：

```html
<meta property="og:image" content="https://<你的網址>/assets/og-cover.jpg">
```

---

## 🎨 自訂 Customization

### 配色（CSS variables）

所有顏色集中在 `<style>` 開頭的 `:root`，改這裡即可全頁換色：

```css
:root{
  --forest-deep:#14352A;   /* 主色：深林綠（hero / footer 底） */
  --forest:#215A41;        /* 工作坊區底色 */
  --moss:#5E8B6A;          /* 苔綠：小標、節點 */
  --sage:#A9C4A0;          /* 淺鼠尾草綠：強調文字 */
  --cream:#F6F1E3;         /* 暖紙色：淺色區底 */
  --ember:#E8722A;         /* burnt orange：行動按鈕 */
  /* …其餘變數見檔案 */
}
```

### 字型 Typography

在 `<head>` 的 Google Fonts `<link>`，以及 `:root` 的 `--serif` / `--sans` 變數調整。

### 7 週課程內容

每一課是一個 `.week` 區塊（課程小徑處）。修改當中的 `.week-date`、`<h3>`、`<p>` 即可。

### 工作坊日期

搜尋 `9 月 12 日` 與 `date-badge`，即可更新日期與地點。

---

## 📅 課程資訊 Course Info

**免費 7 週電郵課程**（每逢週一寄出，全程廣東話）

| 週 | 日期 (2026) | 主題 |
|----|-------------|------|
| 01 | 7 月 20 日 | 森林浴如何幫大腦按下「焦慮暫停鍵」 |
| 02 | 7 月 27 日 | 在異鄉找回安定的力量 |
| 03 | 8 月 3 日 | 20 分鐘降壓，芬多精開啟修復模式 |
| 04 | 8 月 10 日 | 去森林浴也有「黃金時段」 |
| 05 | 8 月 17 日 | 「空氣維他命」與更強健的免疫力 |
| 06 | 8 月 24 日 | 城市公園也能療癒身心 |
| 07 | 8 月 31 日 | 打開感官，擁抱專業引導 |

**實體工作坊**：2026 年 9 月 12 日（星期六）· 修咸頓周邊林地（鄰近 New Forest 國家公園）· 由認證森林療癒師帶領。

---

## 🙏 關於與致謝 About & Credits

- **主辦**：韭菜俱樂部 The Chive Club — 修咸頓移英港人社群（自然、分享、學習、互助）
- **隸屬**：AuLaw Organic Farm UK C.I.C.（歐羅有機農場）· [aulawfarm.uk](https://aulawfarm.uk)
- 課程內容整合自千葉大學、日本醫科大學、臺灣大學、艾塞克斯大學等森林浴相關研究。

---

## 📄 授權 License

程式碼建議採用 **MIT License**（可自由重用）。課程文案、品牌名稱與視覺，屬韭菜俱樂部所有，請勿未經同意作商業使用。

如採用 MIT，可在 repo 新增 `LICENSE` 檔：

```
MIT License

Copyright (c) 2026 The Chive Club (韭菜俱樂部)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
（完整條文見 https://opensource.org/licenses/MIT）
```

---

<p align="center">🌿 <em>「讓樹林接手你暫時放不下的重量，讓自然告訴你的身體：你可以休息了。」</em></p>
