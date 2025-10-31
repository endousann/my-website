// ---- 投票機能 ----
document.addEventListener("DOMContentLoaded", () => {
  const voteButtons = document.querySelectorAll(".vote-btn");
  const voteMessage = document.getElementById("vote-message");

  // ✅ ローカルストレージからデータを取得 or 初期化
  let votes = JSON.parse(localStorage.getItem("votes")) || {
    magic: 0,
    science: 0,
    music: 0,
    game: 0
  };

  // ✅ 投票処理
  voteButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;

      // ✅ 既に投票済みなら弾く
      if (localStorage.getItem("voted")) {
        voteMessage.textContent = "すでに投票済みです！";
        voteMessage.style.color = "#f00";
        return;
      }

      // ✅ 投票カウントを1増やす
      votes[target]++;
      localStorage.setItem("votes", JSON.stringify(votes));

      // ✅ 投票済みフラグを保存
      localStorage.setItem("voted", "true");

      // ✅ メッセージ表示
      voteMessage.textContent = `「${btn.textContent}」に投票しました！`;
      voteMessage.style.color = "#0f0";

      // ✅ 2秒後にトップページへ移動
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    });
  });
});
// Firebase設定（Firebaseコンソール → プロジェクト設定 → 「ウェブアプリに追加」）
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebase初期化
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const voteButtons = document.querySelectorAll(".vote-btn");
const voteMessage = document.getElementById("vote-message");

voteButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;

    // Realtime Database から現在の票数を取得して +1
    const voteRef = db.ref('votes/' + target);
    voteRef.transaction(current => (current || 0) + 1);

    voteMessage.textContent = `「${btn.textContent}」に投票しました！`;
    voteMessage.style.color = "#0f0";

    // 2秒後にトップページへ
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  });
});
const rankingList = document.getElementById("ranking-list");

db.ref('votes').on('value', snapshot => {
  const votes = snapshot.val() || {};
  const sorted = Object.entries(votes).sort((a,b) => b[1] - a[1]);
  
  rankingList.innerHTML = '';
  sorted.forEach(([key, count], index) => {
    const li = document.createElement('li');
    li.textContent = `${index+1}位：${key}：${count}票`;
    rankingList.appendChild(li);
  });
});
