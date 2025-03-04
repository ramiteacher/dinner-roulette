const $c = document.querySelector("canvas");
const ctx = $c.getContext(`2d`);

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

  setTimeout(() => {
    const ran = Math.floor(Math.random() * product.length);

    const arc = 360 / product.length;
    const rotate = (360 - arc * (ran + 1) + 3600) + (arc / 3);

    $c.style.transform = `rotate(${rotate}deg)`;
    $c.style.transition = `2s`;

    setTimeout(
      () => alert(`오늘의 야식은?! ${product[ran]} 어떠신가요?`),
      2000
    );
  }, 1);
};

newMake();