import { sendEmail } from '../jobs/send-email.js';
import { addSignupData, db } from './firebase.js';
import { collection, query, where, limit, getDocs } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

/* ---------------------------------------------------------------
    報名表單收件端點
    ---------------------------------------------------------------
    留空時，表單仍會顯示「報名成功」畫面（方便先上線試用），
    但不會把資料寄出。正式使用前，把 SIGNUP_ENDPOINT 設為：
      • Formspree：       "https://formspree.io/f/xxxxxx"
      • Supabase Edge Function（可串接 Resend 自動發信）
      • Google Form 的 formResponse 網址
----------------------------------------------------------------*/
var SIGNUP_ENDPOINT = "https://formspree.io/f/xppaajod";

var SHARE_TITLE = "森林浴 · 7 週免費電郵課程｜韭菜俱樂部";
var SHARE_TEXT  = "在英國的樹林裡，找回原來的自己。這是韭菜俱樂部為移英港人而設的免費 7 週森林浴電郵課程，用科學與森林幫身心找回安定。一起報名？";

function shareUrl() {
  var u = window.location.href;
  if (u.indexOf("http") !== 0) { u = "https://ambrosecheng-bot.github.io/forest-bath/"; }
  return u.split("#")[0];
}

/* ---------- 報名表單 ---------- */
var submitBtn = document.getElementById("submitBtn");
var formCard  = document.getElementById("formCard");
var emailEl   = document.getElementById("email");
var nameEl    = document.getElementById("name");

function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

submitBtn.addEventListener("click", async function () {
  const email = emailEl.value.trim();
  const name  = nameEl.value.trim();
  const data = JSON.stringify({ name: name, email: email });
  
  if (!isEmail(email)) {
    emailEl.focus();
    emailEl.style.borderColor = "#C75E17";
    showToast("請填寫有效的電郵地址");
    return;
  }
  
  submitBtn.disabled = true;
  submitBtn.textContent = "報名中…";

  const done = function () { formCard.classList.add("is-done"); };
  
  let response = null;

  if (SIGNUP_ENDPOINT) {
    try {
      response = await fetch(SIGNUP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: data
      });
      done();
    } catch (error) {
      console.error("提交失敗:", error);
      done();
    }
  } else {
    console.warn("[森林浴] 尚未設定 SIGNUP_ENDPOINT，本次報名未實際寄出。");
    setTimeout(done, 500);
  }

  if (response && response.ok){
    sendEmail(email, "day0.html", "day0"); // Change file name to email.html
    addSignupData(data);
  }
});

/* ---------- 提示訊息 ---------- */
function showToast(msg) {
  var t = document.getElementById("toast");
  t.textContent = msg || "連結已複製";
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(function () { t.classList.remove("show"); }, 2400);
}

/* ---------- 分享 ---------- */
function copyLink() {
  var text = SHARE_TEXT + " " + shareUrl();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(function () { showToast("內容已複製，貼上即可分享"); })
      .catch(function () { legacyCopy(text); });
  } else {
    legacyCopy(text);
  }
}
function legacyCopy(text) {
  var ta = document.createElement("textarea");
  ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
  document.body.appendChild(ta); ta.select();
  try { document.execCommand("copy"); showToast("內容已複製，貼上即可分享"); }
  catch (e) { showToast("請手動複製此頁網址分享"); }
  document.body.removeChild(ta);
}

// WhatsApp：wa.me 在桌面與手機都可用
document.getElementById("shareWa").addEventListener("click", function () {
  var msg = encodeURIComponent(SHARE_TEXT + " " + shareUrl());
  window.open("https://wa.me/?text=" + msg, "_blank", "noopener");
});

// Signal：無標準網頁分享網址。手機優先用系統分享選單（含 Signal），桌面則退回複製連結。
document.getElementById("shareSig").addEventListener("click", function () {
  if (navigator.share) {
    navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url: shareUrl() }).catch(function () {});
  } else {
    copyLink();
    showToast("已複製內容，開啟 Signal 貼上即可分享");
  }
});
