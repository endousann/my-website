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

      // 投票カウントを1増やす
      votes[target]++;
      localStorage.setItem("votes", JSON.stringify(votes));

      // メッセージ表示
      voteMessage.textContent = `「${btn.textContent}」に投票しました！`;
      voteMessage.style.color = "#0f0";

      // 2秒後にトップページへ移動
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    });
  });
});
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

      // 投票カウントを1増やす
      votes[target]++;
      localStorage.setItem("votes", JSON.stringify(votes));

      // メッセージ表示
      voteMessage.textContent = `「${btn.textContent}」に投票しました！`;
      voteMessage.style.color = "#0f0";

      // 2秒後にトップページへ移動
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    });
  });
});