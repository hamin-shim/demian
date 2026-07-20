const STORAGE_KEY = "specimen-of-thought:v1";

const initialState = {
  version: 1,
  currentScreen: "opening",
  initialPosition: null,
  selectedPhilosopher: null,
  dialogueNode: "intro",
  answers: {
    epicurus: [],
    plato: [],
    aristotle: []
  },
  completedPhilosophers: [],
  finalPosition: null,
  specimenId: null,
  createdAt: null,
  savedSpecimens: []
};

const app = document.querySelector("#app");
const backButton = document.querySelector("#backButton");
const progressText = document.querySelector("#progressText");
const screenName = document.querySelector("#screenName");
const liveRegion = document.querySelector("#liveRegion");

let state = loadState();

const screens = {
  opening: { step: "00/08", name: "입장" },
  guide: { step: "01/08", name: "안내" },
  initial: { step: "02/08", name: "최초 판단" },
  philosopher: { step: "03/08", name: "철학자 선택" },
  dialogue: { step: "04/08", name: "가상 대화" },
  cubist: { step: "05/08", name: "CUBIST VIEW" },
  final: { step: "06/08", name: "최종 판단" },
  compare: { step: "07/08", name: "판단 변화" },
  specimen: { step: "08/08", name: "생각 표본" }
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return cloneState(initialState);
    const parsed = JSON.parse(raw);
    if (parsed.version !== initialState.version) return cloneState(initialState);
    return { ...cloneState(initialState), ...parsed };
  } catch {
    return cloneState(initialState);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    liveRegion.textContent = "저장소를 사용할 수 없어 현재 세션에서만 진행됩니다.";
  }
}

function setState(patch) {
  state = { ...state, ...patch };
  saveState();
  render();
}

function navigate(screen) {
  setState({ currentScreen: screen });
}

function render() {
  const meta = screens[state.currentScreen] || screens.opening;
  progressText.textContent = meta.step;
  screenName.textContent = meta.name;
  backButton.hidden = state.currentScreen === "opening";
  backButton.disabled = state.currentScreen === "opening";
  app.innerHTML = "";

  const renderer = {
    opening: renderOpening,
    guide: renderGuide,
    initial: renderInitial,
    philosopher: renderPhilosopher,
    dialogue: renderDialogue,
    cubist: renderCubist,
    final: renderFinal,
    compare: renderCompare,
    specimen: renderSpecimen
  }[state.currentScreen] || renderOpening;

  renderer();
  requestAnimationFrame(() => {
    app.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  });
}

function renderOpening() {
  app.append(section(`
    <div class="hero-copy">
      <p class="kicker">디지털 사고 실험실</p>
      <h1>죽음은 보이지<br>않을 때<br>사라지는가?<br>아니면 더<br>강하게<br>상상되는가?</h1>
      <p>현대미술의 질문과 고대 철학자의 관점 사이에서 당신의 판단을 하나의 표본으로 남깁니다.</p>
    </div>
  `, [
    button("표본실에 입장하기", () => navigate("guide"), "primary")
  ], "hero-panel"));
}

function renderGuide() {
  app.append(section(`
    <p class="kicker">약 5분 소요</p>
    <h1>이곳에는 정답이 없습니다.</h1>
    <p>예술가의 질문, 철학자의 관점, 그리고 당신의 판단만 남습니다.</p>
    <p class="notice">ARTIST A의 질문은 데이미언 허스트의 작품 세계에서 발견되는 문제의식을 바탕으로 재구성한 가상 대화입니다. 철학자의 답변 역시 주요 저술과 사상에 근거한 교육 목적의 재구성이며 실제 발언이 아닙니다.</p>
    <p class="notice">죽음에 관한 철학적 질문을 다루지만, 실제 작품 이미지나 충격적인 사체 이미지는 사용하지 않습니다.</p>
  `, [
    button("사고 실험 시작", () => navigate("initial"), "primary")
  ]));
}

function renderInitial() {
  app.append(choiceScreen(
    "우리는 죽음을 직접 보아야 삶을 이해할 수 있다고 생각합니까?",
    [
      { id: "initial_yes", label: "그렇다" },
      { id: "initial_no", label: "그렇지 않다" },
      { id: "initial_unsure", label: "아직 판단하기 어렵다" }
    ],
    (option) => setState({ initialPosition: option.id, currentScreen: "philosopher" })
  ));
}

function renderPhilosopher() {
  const wrap = document.createElement("section");
  wrap.className = "panel";
  wrap.innerHTML = `
    <p class="kicker">관점 선택</p>
    <h1>어떤 질문으로 들어가겠습니까?</h1>
    <p>연대보다 질문을 먼저 고르세요. 선택한 철학자의 관점으로 같은 대상을 살펴봅니다.</p>
    <div class="philosopher-grid"></div>
  `;
  const grid = wrap.querySelector(".philosopher-grid");
  PHILOSOPHERS.forEach((item) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "philosopher-card";
    card.innerHTML = `
      <span>${item.concept}</span>
      <strong>${item.theme}</strong>
      <small>${item.name}</small>
    `;
    card.addEventListener("click", () => {
      const answers = { ...state.answers, [item.id]: [] };
      setState({
        selectedPhilosopher: item.id,
        dialogueNode: "intro",
        answers,
        specimenId: null,
        createdAt: null,
        currentScreen: "dialogue"
      });
    });
    grid.append(card);
  });
  app.append(wrap);
}

function renderDialogue() {
  const dialogue = DIALOGUES[state.selectedPhilosopher];
  if (!dialogue) return navigate("philosopher");
  const node = dialogue.nodes[state.dialogueNode] || dialogue.nodes.intro;
  const wrap = document.createElement("section");
  wrap.className = "dialogue-panel";
  wrap.innerHTML = `
    <div class="dialogue-top">
      <div>
        <p class="kicker">${dialogue.theme}</p>
        <h1>${dialogue.name}</h1>
      </div>
      <p class="source">${dialogue.source}</p>
    </div>
    <div class="messages" aria-live="polite"></div>
  `;

  const messages = wrap.querySelector(".messages");
  node.lines.forEach((line) => messages.append(message(line)));

  if (node.question) {
    const question = document.createElement("div");
    question.className = "question-block";
    question.innerHTML = `<h2>${node.question}</h2>`;
    const options = document.createElement("div");
    options.className = "choice-list";
    node.options.forEach((option) => {
      options.append(button(option.label, () => selectDialogueOption(option), "choice"));
    });
    question.append(options);
    wrap.append(question);
  } else if (node.next) {
    wrap.append(button("다음 질문으로", () => setState({ dialogueNode: node.next }), "primary"));
  } else if (node.resultKey) {
    wrap.append(button("세 관점 비교하기", completeDialogue, "primary"));
  }

  app.append(wrap);
}

function selectDialogueOption(option) {
  const id = state.selectedPhilosopher;
  const answers = { ...state.answers, [id]: [...(state.answers[id] || []), option.id] };
  setState({ answers, dialogueNode: option.next });
}

function completeDialogue() {
  const completed = new Set(state.completedPhilosophers);
  completed.add(state.selectedPhilosopher);
  setState({ completedPhilosophers: [...completed], currentScreen: "cubist" });
}

function renderCubist() {
  const wrap = document.createElement("section");
  wrap.className = "panel cubist";
  wrap.innerHTML = `
    <p class="kicker">CUBIST VIEW</p>
    <h1>같은 대상을 세 개의 시선으로 본다면</h1>
    <p>하나의 표본을 여러 관점으로 절단해 보는 비교 화면입니다. 피카소를 장식으로 쓰지 않고, 입체주의의 원리만 인터페이스로 번역합니다.</p>
    <div class="cubist-grid"></div>
  `;
  const grid = wrap.querySelector(".cubist-grid");
  PHILOSOPHERS.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = `cubist-card cut-${index + 1}`;
    card.innerHTML = `
      <span>${item.name}</span>
      <h2>${item.summary}</h2>
      <p>${item.concept}</p>
    `;
    grid.append(card);
  });
  wrap.append(button("최종 판단으로 이동", () => navigate("final"), "primary"));
  app.append(wrap);
}

function renderFinal() {
  app.append(choiceScreen(
    "우리는 죽음을 직접 보아야 삶을 이해할 수 있다고 생각합니까?",
    FINAL_OPTIONS,
    (option) => setState({
      finalPosition: option.id,
      specimenId: state.specimenId || createSpecimenId(),
      createdAt: state.createdAt || new Date().toISOString(),
      currentScreen: "compare"
    }),
    "대화 후 같은 질문에 다시 답합니다. 정답이나 점수는 없습니다."
  ));
}

function renderCompare() {
  const initial = POSITION_LABELS[state.initialPosition] || "미선택";
  const final = POSITION_LABELS[state.finalPosition] || "미선택";
  app.append(section(`
    <p class="kicker">판단 변화</p>
    <h1>${changeMessage()}</h1>
    <div class="compare-line" aria-label="최초 판단 ${initial}, 최종 판단 ${final}">
      <div><strong>${initial}</strong><span>최초 판단</span></div>
      <i aria-hidden="true"></i>
      <div><strong>${final}</strong><span>최종 판단</span></div>
    </div>
  `, [
    button("생각 표본 만들기", () => navigate("specimen"), "primary")
  ]));
}

function renderSpecimen() {
  const philosopher = PHILOSOPHERS.find((item) => item.id === state.selectedPhilosopher);
  const result = RESULT_MAP[state.selectedPhilosopher]?.[state.finalPosition];
  const created = state.createdAt ? new Date(state.createdAt) : new Date();
  const wrap = document.createElement("section");
  wrap.className = "panel specimen-wrap";
  wrap.innerHTML = `
    <p class="kicker">생각의 표본</p>
    <h1>보존된 것은 정답이 아닙니다.<br>질문을 통과한 당신의 생각입니다.</h1>
    <article class="specimen-card" id="specimenCard">
      <div class="specimen-head">
        <span>SPECIMEN NO. ${state.specimenId || createSpecimenId()}</span>
        <span>가상 대화 및 사상 기반 재구성</span>
      </div>
      <h2>${result?.key || "SPECIMEN"}</h2>
      <p class="result-text">${result?.text || ""}</p>
      <dl>
        <div><dt>선택 철학자</dt><dd>${philosopher?.name || "미선택"}</dd></div>
        <div><dt>최초 판단</dt><dd>${POSITION_LABELS[state.initialPosition] || "미선택"}</dd></div>
        <div><dt>최종 판단</dt><dd>${POSITION_LABELS[state.finalPosition] || "미선택"}</dd></div>
        <div><dt>생성 날짜</dt><dd>${created.toLocaleDateString("ko-KR")}</dd></div>
      </dl>
      <p class="notice">ARTIST A와 철학자의 대화는 실제 발언이 아닌 교육 목적의 재구성입니다.</p>
    </article>
    <div class="button-row"></div>
  `;
  const row = wrap.querySelector(".button-row");
  row.append(button("표본 저장하기", saveSpecimen, "secondary"));
  row.append(button("다른 철학자와 대화하기", () => setState({ currentScreen: "philosopher", selectedPhilosopher: null, dialogueNode: "intro", specimenId: null, createdAt: null }), "secondary"));
  row.append(button("처음부터 다시 시작", restart, "danger"));
  app.append(wrap);
}

function section(markup, actions = [], className = "panel") {
  const el = document.createElement("section");
  el.className = className;
  el.innerHTML = markup;
  if (actions.length) {
    const row = document.createElement("div");
    row.className = "button-row";
    actions.forEach((action) => row.append(action));
    el.append(row);
  }
  return el;
}

function choiceScreen(title, options, onSelect, helper = "") {
  const el = section(`
    <p class="kicker">질문</p>
    <h1>${title}</h1>
    ${helper ? `<p>${helper}</p>` : ""}
  `);
  const list = document.createElement("div");
  list.className = "choice-list";
  options.forEach((option) => list.append(button(option.label, () => onSelect(option), "choice")));
  el.append(list);
  return el;
}

function button(label, handler, variant = "secondary") {
  const el = document.createElement("button");
  el.type = "button";
  el.className = `button ${variant}`;
  el.textContent = label;
  el.addEventListener("click", handler);
  return el;
}

function message(line) {
  const el = document.createElement("article");
  el.className = `message ${line.speaker}`;
  const label = line.speaker === "artist" ? "ARTIST A" : line.speaker === "philosopher" ? "PHILOSOPHER" : "YOU";
  el.innerHTML = `<span>${label}</span><p>${line.text}</p>`;
  return el;
}

function createSpecimenId() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function changeMessage() {
  if (state.finalPosition === "final_context") return "하나의 정답보다 상황과 관점의 차이를 남겼습니다.";
  if (state.initialPosition === "initial_unsure") return "불확실한 질문 속에서 하나의 관점을 선택했습니다.";
  const changed = (state.initialPosition === "initial_yes" && state.finalPosition !== "final_yes") ||
    (state.initialPosition === "initial_no" && state.finalPosition !== "final_no");
  return changed ? "당신의 판단은 대화를 지나며 이동했습니다." : "판단은 유지되었지만, 그 판단을 설명하는 이유가 확장되었습니다.";
}

function saveSpecimen() {
  const result = RESULT_MAP[state.selectedPhilosopher]?.[state.finalPosition];
  const item = {
    id: state.specimenId,
    philosopher: state.selectedPhilosopher,
    initialPosition: state.initialPosition,
    finalPosition: state.finalPosition,
    resultKey: result?.key,
    createdAt: state.createdAt
  };
  const saved = state.savedSpecimens.filter((old) => old.id !== item.id);
  setState({ savedSpecimens: [...saved, item] });
  liveRegion.textContent = "표본이 이 브라우저에 저장되었습니다. 카드 영역은 인쇄나 스크린샷에 적합하게 구성되어 있습니다.";
}

function restart() {
  if (!confirm("현재 진행 상태를 삭제하고 처음부터 다시 시작할까요?")) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
  state = cloneState(initialState);
  render();
}

function goBack() {
  const order = ["opening", "guide", "initial", "philosopher", "dialogue", "cubist", "final", "compare", "specimen"];
  if (state.currentScreen === "dialogue") return navigate("philosopher");
  const index = order.indexOf(state.currentScreen);
  navigate(order[Math.max(0, index - 1)]);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function cloneState(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

backButton.addEventListener("click", goBack);
render();
