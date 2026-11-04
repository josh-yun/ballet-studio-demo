const designs = {
  1: { name: 'ATELIER BALLET', label: '성인 클래식 발레', headline: '기본 자세부터\n차근차근', intro: '발레가 처음이라면 바를 잡고 기본 발 위치부터 배워 보세요.' },
  2: { name: 'ACTE.', label: '성인 발레 스튜디오', headline: '바에서 배운 동작을\n음악에 맞춰', intro: '발레 첫걸음부터 기본 동작을 연결하는 클래식 베이직까지.' },
  3: { name: '소소발레', label: '성인 취미 발레', headline: '처음 시작하는\n성인 발레', intro: '발레 경험 없이도 원하는 날짜에 한 번 예약해 참여할 수 있어요.' },
};

const requested = new URLSearchParams(location.search).get('design');
const designNumber = Object.hasOwn(designs, requested) ? requested : '1';
const design = designs[designNumber];
document.body.dataset.design = designNumber;
document.querySelector('[data-design-choice="' + designNumber + '"]')?.setAttribute('aria-current', 'page');
const themeToggle = document.querySelector('.theme-toggle');
const themeOptions = document.querySelector('#theme-options');
function setPreviewMenu(expanded) {
  themeOptions.hidden = !expanded;
  themeToggle.setAttribute('aria-expanded', String(expanded));
  themeToggle.setAttribute('aria-label', expanded ? '시안과 테마 선택 닫기' : '시안과 테마 선택 열기');
}
themeToggle?.addEventListener('click', () => setPreviewMenu(themeOptions.hidden));
themeToggle?.parentElement.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || themeOptions.hidden) return;
  setPreviewMenu(false);
  themeToggle.focus();
});

const comparisonSections = new Set(['#classes', '#full-schedule', '#beginner-schedule', '#academy', '#journal', '#faq', '#visit-faq']);
themeOptions?.querySelectorAll('[data-design-choice]').forEach(link => {
  link.addEventListener('click', () => {
    link.hash = comparisonSections.has(location.hash) ? location.hash : '';
  });
});

const themeButtons = document.querySelectorAll('[data-theme-choice]');
function applyTheme(theme) {
  document.body.dataset.theme = theme;
  themeButtons.forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme));
  });
}
applyTheme(designNumber);
themeButtons.forEach(button => {
  button.addEventListener('click', () => applyTheme(button.dataset.themeChoice));
});
document.title = design.name + ' | 발레 스튜디오';
document.querySelectorAll('.logo').forEach(logo => { logo.textContent = design.name; });
document.querySelector('#business-name').textContent = design.name;
document.querySelector('#tagline').textContent = design.label;
document.querySelector('#hero-title').textContent = design.headline;
document.querySelector('#intro').textContent = design.intro;

if (designNumber === '2') {
  document.querySelector('.studio-story').hidden = false;
}

if (designNumber === '3') {
  document.querySelector('.hero .button').href = '#classes';
  document.querySelector('#hero-schedule-label').textContent = '다가오는 수업 보기';
}

const classes = [
  { weekday: '화', date: '2026-11-10', day: '11월 10일 (화) 19:00–19:55', teacher: '김하은', recommendation: '발레 경험이 없어도 참여 가능', name: '발레 첫걸음', lesson: '발레 바를 잡고 발 위치와 무릎을 굽히는 기본 동작을 연습합니다.', teachingStyle: '동작을 한 번씩 보여주고 처음 배우는 분의 속도에 맞춰 설명합니다.', level: '입문', period: '저녁', info: '입문 · 55분 · 잔여 4석', price: '₩32,000' },
  { weekday: '목', date: '2026-11-12', day: '11월 12일 (목) 19:30–20:30', teacher: '이서윤', recommendation: '기본 발 포지션을 배운 분', name: '클래식 베이직', lesson: '바에서 배운 기본 동작을 음악에 맞춘 짧은 조합으로 연결합니다.', teachingStyle: '기본 자세를 짚은 뒤 동작을 연결하는 순서를 나누어 지도합니다.', level: '초급', period: '저녁', info: '초급 · 60분 · 잔여 2석', price: '₩35,000' },
  { weekday: '토', date: '2026-11-14', day: '11월 14일 (토) 11:00–11:50', teacher: '박지우', recommendation: '가볍게 몸을 풀고 싶은 모든 분', name: '발레 스트레칭', lesson: '가벼운 준비 운동 후 발목과 고관절을 천천히 움직입니다.', teachingStyle: '각자 편하게 움직일 수 있는 범위에서 따라가도록 안내합니다.', level: '전 레벨', period: '오전', info: '모든 레벨 · 50분 · 잔여 5석', price: '₩30,000' },
];

// Add later sessions of each program to the example timetable.
for (const week of [
  ['2026-11-17', '2026-11-19', '2026-11-21'],
  ['2026-11-24', '2026-11-26', '2026-11-28'],
]) {
  week.forEach((date, index) => {
    const program = classes[index];
    classes.push({ ...program, date, day: program.day.replace(/\d+일/, Number(date.slice(-2)) + '일') });
  });
}
const sessions = classes.map((item, index) => ({ item, id: index + 1 }))
  .sort((a, b) => a.item.date.localeCompare(b.item.date));

const bookingPage = document.querySelector('#booking-page');
const extraPages = Array.from(document.querySelectorAll('.extra-page'));
const bookingEffects = document.querySelector('#booking-effects');
const studioHome = document.querySelector('#studio-home');
const title = document.querySelector('#booking-title');
const step = document.querySelector('#booking-step');
const method = document.querySelector('#booking-method');
const reference = document.querySelector('#booking-reference');
const receipt = document.querySelector('#booking-receipt');
const finish = document.querySelector('#booking-finish');
const preview = document.querySelector('#preview');
const schedule = document.querySelector('#schedule');
const fullSchedule = document.querySelector('#full-schedule-list');
const bookingReturnLinks = document.querySelectorAll('[data-booking-return]');
const lookupForm = document.querySelector('#lookup-form');
const lookupCode = document.querySelector('#lookup-code');
const lookupStatus = document.querySelector('#lookup-status');
const lookupResult = document.querySelector('#lookup-result');
const storageKey = 'ballet-demo-bookings-' + designNumber;
let bookings = [];
try {
  bookings = JSON.parse(sessionStorage.getItem(storageKey) || '[]');
} catch {
  // The current page still supports lookup when browser storage is unavailable.
}
let selectedClass;
let lastCode;
let previousBookingButton;
const copyStatus = document.querySelector('#copy-status');

function createScheduleRow({ item, id }, returnHash) {
  const row = document.createElement('article');
  row.className = 'class-row';
  row.dataset.day = item.weekday;
  row.dataset.level = item.level;
  row.dataset.period = item.period;
  row.innerHTML = '<time></time><div><h3></h3><small></small></div><span class="price"></span><button type="button" class="row-button">예약 ↗</button>';
  const time = row.querySelector('time');
  time.dateTime = item.date;
  time.textContent = item.day;
  row.querySelector('h3').textContent = item.name;
  row.querySelector('small').textContent = '1회 수업 · ' + item.info + ' · ' + item.teacher + ' 강사 · ' + item.recommendation;
  const lesson = document.createElement('p');
  lesson.className = 'class-lesson';
  lesson.textContent = item.lesson;
  row.querySelector('h3').parentElement.append(lesson);
  row.querySelector('.price').textContent = item.price;
  const button = row.querySelector('button');
  button.setAttribute('aria-label', item.name + ' 예약 · ' + item.day);
  button.addEventListener('click', () => {
    previousBookingButton = button;
    bookingReturnLinks.forEach(link => { link.href = returnHash; });
    location.hash = 'book-' + id;
  });
  return row;
}
schedule.append(...sessions.slice(0, 3).map(session => createScheduleRow(session, '#classes')));
const weekHeading = new Intl.DateTimeFormat('ko-KR', {
  month: 'long', day: 'numeric', timeZone: 'UTC',
});
const weeks = new Map();
for (const session of sessions) {
  const monday = new Date(session.item.date + 'T00:00:00Z');
  monday.setUTCDate(monday.getUTCDate() - (monday.getUTCDay() + 6) % 7);
  const key = monday.toISOString();
  if (!weeks.has(key)) {
    const group = document.createElement('section');
    group.className = 'schedule-week';
    const heading = document.createElement('h2');
    heading.textContent = weekHeading.format(monday) + ' 주';
    group.append(heading);
    weeks.set(key, group);
    fullSchedule.append(group);
  }
  weeks.get(key).append(createScheduleRow(session, '#full-schedule'));
}

preview.addEventListener('click', () => {
  if (preview.hidden) return;
  const payment = method.querySelector('input:checked').value;
  const code = 'B-' + String(101 + bookings.length).padStart(4, '0');
  const booking = { ...selectedClass, payment, code };
  bookings.push(booking);
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(bookings));
  } catch {
    // Keep the example available for the rest of this page visit.
  }
  history.replaceState({ completedBookingCode: code }, '');
  showBookingCompletion(booking);
  title.focus();
});

function showBookingCompletion({ code, payment, name, day, price }) {
  lastCode = code;
  step.textContent = '02 / 02 · 예약 완료 예시';
  title.textContent = '예시 예약이 완료되었습니다';
  document.querySelector('#booking-code').textContent = lastCode;
  receipt.textContent = '예시 결제수단 · ' + payment;
  document.querySelector('#sms-preview').textContent =
    design.name + ' ' + name + ' 예약이 확정되었습니다. ' + day + ' · 예약번호 ' + lastCode;
  document.querySelector('#admin-preview').textContent =
    [lastCode, name, day, price, payment, '결제 완료 (예시)'].join(' · ');
  bookingEffects.hidden = false;
  document.querySelector('#booking-visit').open = true;
  receipt.hidden = false;
  reference.hidden = false;
  method.hidden = true;
  preview.hidden = true;
  finish.hidden = false;
}

lookupForm.addEventListener('submit', event => {
  event.preventDefault();
  const code = lookupCode.value.trim().toUpperCase();
  const booking = bookings.find(item => item.code === code);
  lookupResult.replaceChildren();
  lookupResult.hidden = !booking;
  lookupStatus.textContent = booking ? '예시 예약을 찾았습니다.' : '해당 예약번호의 예시 예약을 찾을 수 없습니다.';
  if (!booking) return;

  for (const [label, value] of [
    ['예약번호', booking.code], ['수업', booking.name], ['시간', booking.day],
    ['담당 강사', booking.teacher || '예시 강사'], ['취소·변경 (예시)', '수업 24시간 전까지 변경·취소 접수'], ['결제 금액', booking.price], ['결제수단', booking.payment], ['상태', '예약 완료 (예시)'],
  ]) {
    const row = document.createElement('div');
    const term = document.createElement('dt');
    const detail = document.createElement('dd');
    term.textContent = label;
    detail.textContent = value;
    if (label === '취소·변경 (예시)') {
      const contactLink = document.createElement('a');
      contactLink.href = '#contact';
      contactLink.textContent = '문의하기';
      detail.append(' · ', contactLink);
    }
    row.append(term, detail);
    lookupResult.append(row);
  }
});

function showPage({ smooth = false } = {}) {
  const hash = location.hash;
  const bookingId = /^#book-([1-9]\d*)$/.exec(hash)?.[1];
  const item = bookingId ? classes[Number(bookingId) - 1] : undefined;
  const beginnerSchedule = hash === '#beginner-schedule';
  const visitFaq = hash === '#visit-faq';
  const pageHash = beginnerSchedule ? '#full-schedule' : hash === '#contact' || visitFaq ? '#faq' : hash;
  if (beginnerSchedule) resetScheduleFilters('입문');
  const extraPage = extraPages.find(page => '#' + page.id === pageHash);
  extraPages.forEach(page => {
    page.hidden = page !== extraPage;
  });
  studioHome.hidden = Boolean(item || extraPage);
  bookingPage.hidden = !item;
  if (extraPage) {
    if (visitFaq) {
      const guide = document.querySelector('#first-visit-faq');
      guide.open = true;
      guide.scrollIntoView({ behavior: 'instant' });
      guide.querySelector('summary').focus({ preventScroll: true });
      previousBookingButton = undefined;
      return;
    }
    if (hash === '#contact') {
      document.querySelector('#contact').scrollIntoView({ behavior: 'instant' });
      document.querySelector('#contact-title').focus({ preventScroll: true });
      previousBookingButton = undefined;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (extraPage.contains(previousBookingButton) && !previousBookingButton.closest('[hidden]')) {
      previousBookingButton.focus();
    } else {
      extraPage.querySelector('h1').focus({ preventScroll: true });
    }
    previousBookingButton = undefined;
    return;
  }
  if (!item) {
    const target = document.getElementById(hash.slice(1));
    if (target?.matches('.journal details')) target.open = true;
    target?.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant' });
    if (hash === '#classes' && schedule.contains(previousBookingButton)) {
      previousBookingButton.focus({ preventScroll: true });
    }
    previousBookingButton = undefined;
    if (hash === '#my-booking') document.querySelector('#my-booking h2').focus({ preventScroll: true });
    return;
  }

  selectedClass = item;
  document.querySelector('#booking-visit').open = false;
  step.textContent = '01 / 02 · 예약 확인';
  title.textContent = '예약 내용을 확인해 주세요';
  document.querySelector('#booking-class').textContent = item.name;
  document.querySelector('#booking-time').textContent = item.day;
  document.querySelector('#booking-price').textContent = item.price;
  document.querySelector('#booking-teacher').textContent = item.teacher;
  document.querySelector('#booking-lesson').textContent = item.lesson;
  document.querySelector('#booking-teaching-style').textContent = item.teachingStyle;
  copyStatus.textContent = '';
  method.querySelector('input').checked = true;
  method.hidden = false;
  reference.hidden = true;
  receipt.hidden = true;
  finish.hidden = true;
  bookingEffects.hidden = true;
  preview.hidden = false;
  const completed = bookings.find(booking => booking.code === history.state?.completedBookingCode);
  if (completed) showBookingCompletion(completed);
  window.scrollTo({ top: 0, behavior: 'instant' });
  title.focus({ preventScroll: true });
}

document.querySelector('header').addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || studioHome.hidden || event.defaultPrevented || event.button !== 0
      || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const target = document.getElementById(link.hash.slice(1));
  if (!target || (link.hash !== '#top' && !studioHome.contains(target))) return;

  event.preventDefault();
  if (location.hash !== link.hash) history.pushState(null, '', link.hash);
  showPage({ smooth: !reducedMotion.matches });
});

document.querySelector('#booking-lookup').addEventListener('click', () => {
  location.hash = 'my-booking';
  lookupCode.value = lastCode;
  lookupForm.requestSubmit();
});

const filters = { day: '', level: '', period: '' };

function filterSchedule() {
  let count = 0;
  for (const week of weeks.values()) {
    let visibleRows = 0;
    for (const row of week.querySelectorAll('.class-row')) {
      row.hidden = Object.entries(filters).some(([key, value]) => value && row.dataset[key] !== value);
      if (!row.hidden) visibleRows++;
    }
    week.hidden = visibleRows === 0;
    count += visibleRows;
  }
  document.querySelector('#schedule-count').textContent = count
    ? '수업 ' + count + '개'
    : '조건에 맞는 수업이 없습니다. 선택한 필터를 변경해 주세요.';
}

const filterGroups = document.querySelectorAll('.filter-chips');
const filterPanel = document.querySelector('#schedule-filter-panel');
const narrowSchedule = matchMedia('(max-width: 600px)');
function setFilterPanelDefault() {
  filterPanel.open = !narrowSchedule.matches;
}
narrowSchedule.addEventListener('change', setFilterPanelDefault);
setFilterPanelDefault();

function refreshScheduleFilters() {
  for (const group of filterGroups) {
    for (const button of group.querySelectorAll('button')) {
      button.setAttribute('aria-pressed', String(button.dataset.value === filters[group.dataset.filter]));
    }
  }
  const active = [...document.querySelectorAll('.filter-chips button[aria-pressed="true"]')]
    .filter(button => button.dataset.value)
    .map(button => button.textContent.trim());
  const summary = document.querySelector('#active-filters');
  summary.textContent = '선택한 필터 · ' + active.join(' · ');
  summary.hidden = active.length === 0;
  document.querySelector('#filter-total').textContent = active.length ? ' · ' + active.length + '개 적용' : '';
  filterSchedule();
}

function resetScheduleFilters(level = '') {
  Object.assign(filters, { day: '', level, period: '' });
  refreshScheduleFilters();
}

for (const group of filterGroups) {
  group.addEventListener('click', event => {
    const button = event.target.closest('button[data-value]');
    if (!button) return;
    filters[group.dataset.filter] = button.dataset.value;
    refreshScheduleFilters();
  });
}
document.querySelector('#reset-filters').addEventListener('click', () => resetScheduleFilters());
filterSchedule();
window.addEventListener('hashchange', showPage);
showPage();

document.querySelector('#copy-booking').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(lastCode);
    copyStatus.textContent = '예약번호를 복사했습니다.';
  } catch {
    copyStatus.textContent = '복사할 수 없습니다. 표시된 예약번호를 기록해 주세요.';
  }
});

const academyCopy = {
  1: '자연광이 들어오는 연습실에서 바를 잡고 기본 자세부터 차근차근 배웁니다. 수업은 발레가 처음인 성인도 따라올 수 있는 속도로 진행합니다.',
  2: '무대를 닮은 연습실에서 자세와 음악에 집중합니다. 바에서 익힌 동작을 공간을 가로지르는 짧은 조합으로 연결합니다.',
  3: '밝은 연습실에서 스트레칭부터 가볍게 시작합니다. 첫 방문이라면 발레 첫걸음 수업에서 바와 기본 동작을 익혀 보세요.',
};
const academySlides = [
  { image: 'academy-', label: '연습실', alt: '발레 바와 거울이 있는 예시 연습실', copy: academyCopy[designNumber] },
  { image: 'cover-', label: '수업 풍경', alt: '발레 동작을 연습하는 수강생 예시', copy: '바에서 기본 자세를 익힌 뒤 음악에 맞춰 동작을 이어갑니다. 각자의 속도에 맞춰 연습합니다.' },
  { image: 'hero-', label: '첫 방문', alt: '발레 바에서 연습하는 예시 모습', copy: '움직이기 편한 옷과 양말을 준비하고 수업 10분 전에 도착해 주세요.' },
];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const academy = document.querySelector('#academy');
const academyViewport = academy.querySelector('.academy-viewport');
const academySlide = academyViewport.querySelector('.academy-slide');
const academyDots = document.querySelector('#academy-dots');
const academyAutoplay = document.querySelector('#academy-autoplay');
let academyIndex = 0;
let academyTimer;
let academyVisible = false;
let academyPlaying = !reducedMotion.matches;
let swipeStart;

const academyDotButtons = academySlides.map((slide, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', (index + 1) + '번 슬라이드 · ' + slide.label);
  button.addEventListener('click', () => manuallySelectAcademySlide(index));
  academyDots.append(button);
  return button;
});

function showAcademySlide() {
  const slide = academySlides[academyIndex];
  const photo = document.querySelector('#academy-photo');
  photo.src = slide.image + designNumber + '.jpg';
  photo.alt = slide.alt;
  academySlide.querySelector('figcaption').textContent = slide.label + ' · 예시 이미지';
  document.querySelector('#academy-copy').textContent = slide.copy;
  academyDotButtons.forEach((button, index) => {
    button.setAttribute('aria-current', index === academyIndex ? 'true' : 'false');
  });
}

function scheduleAcademySlide() {
  clearTimeout(academyTimer);
  if (academyPlaying && academyVisible && !document.hidden && !swipeStart) {
    academyTimer = setTimeout(() => selectAcademySlide(academyIndex + 1), 6000);
  }
}

function selectAcademySlide(index) {
  const nextIndex = (index + academySlides.length) % academySlides.length;
  if (nextIndex !== academyIndex) {
    const direction = Math.sign(index - academyIndex);
    const outgoing = reducedMotion.matches ? null : academySlide.cloneNode(true);
    academyIndex = nextIndex;
    showAcademySlide();
    if (outgoing) animateAcademySlide(outgoing, direction);
  }
  scheduleAcademySlide();
}

function animateAcademySlide(outgoing, direction) {
  academyViewport.querySelector('[inert]')?.remove();
  academySlide.getAnimations().forEach(animation => animation.cancel());
  outgoing.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
  outgoing.inert = true;
  outgoing.setAttribute('aria-hidden', 'true');
  academyViewport.prepend(outgoing);

  const timing = { duration: 420, easing: 'cubic-bezier(.22,.61,.36,1)' };
  outgoing.animate([
    { transform: 'translateX(0)' },
    { transform: 'translateX(' + (-direction * 100) + '%)' },
  ], timing).onfinish = () => outgoing.remove();
  academySlide.animate([
    { transform: 'translateX(' + (direction * 100) + '%)' },
    { transform: 'translateX(0)' },
  ], timing);
}

function setAcademyAutoplay(playing) {
  academyPlaying = playing;
  academyAutoplay.setAttribute('aria-pressed', String(playing));
  academyAutoplay.textContent = playing ? 'Ⅱ' : '▶';
  scheduleAcademySlide();
}

function manuallySelectAcademySlide(index) {
  setAcademyAutoplay(false);
  selectAcademySlide(index);
}

academy.addEventListener('focusin', event => {
  if (event.target !== academyAutoplay) setAcademyAutoplay(false);
});
document.querySelector('#academy-prev').addEventListener('click', () => manuallySelectAcademySlide(academyIndex - 1));
document.querySelector('#academy-next').addEventListener('click', () => manuallySelectAcademySlide(academyIndex + 1));
academyAutoplay.addEventListener('click', () => setAcademyAutoplay(!academyPlaying));
reducedMotion.addEventListener('change', event => {
  if (event.matches) setAcademyAutoplay(false);
});
document.addEventListener('visibilitychange', scheduleAcademySlide);
new IntersectionObserver(([entry]) => {
  academyVisible = entry.isIntersecting;
  scheduleAcademySlide();
}).observe(academy);

academyViewport.addEventListener('pointerdown', event => {
  if (!event.isPrimary || event.button !== 0) return;
  swipeStart = { id: event.pointerId, x: event.clientX, y: event.clientY };
  academyViewport.setPointerCapture(event.pointerId);
  scheduleAcademySlide();
});

academyViewport.addEventListener('pointerup', event => {
  if (event.pointerId !== swipeStart?.id) return;
  const dx = event.clientX - swipeStart.x;
  const dy = event.clientY - swipeStart.y;
  swipeStart = null;

  if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    manuallySelectAcademySlide(academyIndex + (dx < 0 ? 1 : -1));
  } else {
    scheduleAcademySlide();
  }
});

academyViewport.addEventListener('lostpointercapture', event => {
  if (event.pointerId !== swipeStart?.id) return;
  swipeStart = null;
  scheduleAcademySlide();
});
academyViewport.addEventListener('dragstart', event => event.preventDefault());

showAcademySlide();
setAcademyAutoplay(academyPlaying);

const heroVideo = document.querySelector('.hero-video');

async function syncHeroVideo() {
  if (studioHome.hidden) {
    heroVideo.pause();
    heroVideo.hidden = true;
    return;
  }

  try {
    await heroVideo.play();
    if (!studioHome.hidden && !heroVideo.paused) heroVideo.hidden = false;
  } catch {
    // Keep the cover image if the browser blocks playback.
  }
}

heroVideo.src = designNumber === '2' ? 'studio-tour-2.mp4' : 'cover-' + designNumber + '.mp4';
syncHeroVideo();
window.addEventListener('hashchange', syncHeroVideo);
