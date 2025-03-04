const $c = document.querySelector("canvas");
const ctx = $c.getContext(`2d`);

// 오디오 객체 생성
const spinSound = new Audio('https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3');
const endSound = new Audio('https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3');

// 오디오 설정
spinSound.loop = true; // 회전 중에는 소리가 계속 반복되도록 설정

const product = [
  "떡볶이",
  "돈가스",
  "초밥",
  "피자",
  "냉면",
  "치킨",
  "족발",
  "피자",
  "삼겹살",
];

const colors = [
  "#dc0936",
  "#e6471d",
  "#f7a416",
  "#efe61f ",
  "#60b236",
  "#209b6c",
  "#169ed8",
  "#0d66e4",
  "#87207b",
  "#be107f",
  "#e7167b",
];

const newMake = () => {
  const [cw, ch] = [$c.width / 2, $c.height / 2];
  const arc = (2 * Math.PI) / product.length;

  for (let i = 0; i < product.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.moveTo(cw, ch);
    ctx.arc(cw, ch, cw - 2, arc * i - Math.PI / 2, arc * (i + 1) - Math.PI / 2);
    ctx.fill();
    ctx.closePath();
  }

  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;

  ctx.fillStyle = "#000";
  ctx.font = "1.8rem Pretendard";
  ctx.textAlign = "center";

  for (let i = 0; i < product.length; i++) {
    const angle = arc * i + arc / 2 - Math.PI / 2;

    ctx.save();

    ctx.translate(
      cw + Math.cos(angle) * (cw - 50),
      ch + Math.sin(angle) * (ch - 50)
    );

    ctx.rotate(angle + Math.PI / 2);

    product[i].split(" ").forEach((text, j) => {
      ctx.fillText(text, 0, 30 * j);
    });

    ctx.restore();
  }

  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.moveTo(cw, ch);
  ctx.arc(cw, ch, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
};

const rotate = () => {
  $c.style.transform = `initial`;
  $c.style.transition = `initial`;

  // 회전 소리 재생 시작
  spinSound.currentTime = 0;
  spinSound.play();

  setTimeout(() => {
    const ran = Math.floor(Math.random() * product.length);

    const arc = 360 / product.length;
    const rotate = (360 - arc * (ran + 1) + 3600) + (arc / 3);

    $c.style.transform = `rotate(${rotate}deg)`;
    $c.style.transition = `2s`;

    setTimeout(() => {
      // 회전 소리 중지
      spinSound.pause();
      
      // 결과 소리 재생
      endSound.currentTime = 0;
      endSound.play();
      
      // 결과 표시
      alert(`오늘의 음식은?! ${product[ran]} 어떠신가요?`);
    }, 2000);
  }, 1);
};

newMake();