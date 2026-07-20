const POSITION_LABELS = {
  initial_yes: "그렇다",
  initial_no: "그렇지 않다",
  initial_unsure: "아직 판단하기 어렵다",
  final_yes: "필요하다",
  final_no: "필요하지 않다",
  final_context: "경우에 따라 다르다"
};

const FINAL_OPTIONS = [
  { id: "final_yes", label: "필요하다" },
  { id: "final_no", label: "필요하지 않다" },
  { id: "final_context", label: "경우에 따라 다르다" }
];

const PHILOSOPHERS = [
  {
    id: "epicurus",
    name: "에피쿠로스",
    theme: "죽음은 왜 두려운가?",
    concept: "죽음과 평온",
    summary: "죽음의 공포는 현재의 상상에서 생긴다."
  },
  {
    id: "plato",
    name: "플라톤",
    theme: "눈앞에 있는 것은 진짜인가?",
    concept: "실재와 이미지",
    summary: "눈앞의 사체는 죽음의 본질 자체가 아니다."
  },
  {
    id: "aristotle",
    name: "아리스토텔레스",
    theme: "형태만 남아도 같은 존재인가?",
    concept: "질료, 형상, 생명",
    summary: "형태는 남아도 생명 활동의 원리는 사라졌다."
  }
];

const RESULT_MAP = {
  epicurus: {
    final_yes: {
      key: "E-01 CONFRONTATION",
      text: "죽음을 마주하는 일은 죽음을 배우기 위해서가 아니라, 아직 살아 있는 시간을 확인하기 위해 필요하다."
    },
    final_no: {
      key: "E-02 TRANQUILITY",
      text: "죽음은 경험할 수 없는 미래다. 보이지 않는 죽음보다 지금 경험하는 삶에 집중할 수 있다."
    },
    final_context: {
      key: "E-03 AMBIVALENCE",
      text: "죽음의 이미지는 성찰을 만들 수도, 공포를 소비하게 할 수도 있다. 의미는 이미지보다 그것을 본 이후의 태도에서 결정된다."
    }
  },
  plato: {
    final_yes: {
      key: "P-01 APPEARANCE",
      text: "실제 대상을 사용한 작품은 현실의 물질적 흔적을 제시한다. 그러나 보이는 것이 곧 본질 전체인지는 계속 질문해야 한다."
    },
    final_no: {
      key: "P-02 REPRESENTATION",
      text: "전시장에 놓인 현실은 이미 선택되고 분리된 현실이다. 작품은 진실 자체보다 누군가의 시선으로 구성된 이미지를 보여준다."
    },
    final_context: {
      key: "P-03 BEYOND THE VISIBLE",
      text: "예술은 진리를 그대로 담을 수 없지만, 보이는 것 너머에 무엇이 있는지 질문하게 만들 수 있다."
    }
  },
  aristotle: {
    final_yes: {
      key: "A-01 CONTINUITY",
      text: "물질과 형태의 연속성은 과거의 존재를 현재에 남긴다. 그러나 같은 이름이 같은 존재 방식을 의미하지는 않는다."
    },
    final_no: {
      key: "A-02 REMAINS",
      text: "형태는 남아 있지만 생명 활동은 사라졌다. 보존된 것은 생명이 아니라 생명이 존재했다는 물질적 흔적이다."
    },
    final_context: {
      key: "A-03 TRANSFORMATION",
      text: "같은 물질은 목적과 관계가 달라지면서 새로운 존재 방식으로 전환된다. 과거의 생명과 현재의 작품은 한 대상 안에 겹쳐 있다."
    }
  }
};

const DIALOGUES = {
  epicurus: {
    name: "에피쿠로스",
    theme: "죽음은 왜 두려운가?",
    source: "에피쿠로스, 「메노이케우스에게 보내는 편지」",
    nodes: {
      intro: {
        lines: [
          { speaker: "artist", text: "에피쿠로스, 당신은 죽음이 우리에게 아무것도 아니라고 했습니다. 그런데 사람들은 보존된 죽음 앞에서 왜 본능적으로 뒤로 물러납니까?" },
          { speaker: "philosopher", text: "그들이 두려워하는 것은 눈앞의 죽은 존재가 아닐 것입니다. 그 죽음에 비친 자신의 미래를 현재의 고통처럼 상상하고 있는 것이지요." }
        ],
        question: "당신은 무엇을 두려워한다고 생각합니까?",
        options: [
          { id: "nothing_remains", label: "죽은 뒤 아무것도 남지 않는 것", next: "e_nothing" },
          { id: "dying_pain", label: "죽어 가는 과정의 고통", next: "e_pain" },
          { id: "separation", label: "사랑하는 사람들과 헤어지는 것", next: "e_separation" }
        ]
      },
      e_nothing: {
        lines: [
          { speaker: "you", text: "죽은 뒤 아무것도 남지 않는 것이 두렵습니다." },
          { speaker: "philosopher", text: "아무것도 느낄 수 없는 상태를 지금의 감각으로 상상하기 때문에 두려운 것입니다. 존재하지 않는 동안에는 상실을 경험할 주체도 없습니다." },
          { speaker: "artist", text: "하지만 인간은 죽은 뒤에도 자신의 몸과 이름이 어떻게 남을지 끊임없이 고민합니다. 느낄 수 없는 미래가 현재의 삶을 지배하고 있는 셈 아닙니까?" }
        ],
        next: "e_common"
      },
      e_pain: {
        lines: [
          { speaker: "you", text: "죽어 가는 과정의 고통이 두렵습니다." },
          { speaker: "philosopher", text: "그렇다면 두려움의 대상은 죽음이 아니라 고통입니다. 고통은 완화하거나 대비할 수 있지만, 죽음을 무한한 공포로 상상하면 현재의 평온까지 잃게 됩니다." },
          { speaker: "artist", text: "예술은 때로 그 고통을 가리지 않고 확대해 보여줍니다. 고통을 직시하는 행위가 평온을 깨뜨리는 것일까요, 막연한 공포를 구체화하는 것일까요?" }
        ],
        next: "e_common"
      },
      e_separation: {
        lines: [
          { speaker: "you", text: "사랑하는 사람들과 헤어지는 것이 두렵습니다." },
          { speaker: "philosopher", text: "그것은 죽음 자체보다 관계의 상실에 대한 슬픔입니다. 죽음을 피할 수 없다는 사실은 바뀌지 않지만, 지금 함께하는 시간을 어떻게 살아갈지는 선택할 수 있습니다." },
          { speaker: "artist", text: "그렇다면 죽음을 보여주는 작품은 이별의 고통을 이용하는 것입니까, 남아 있는 관계의 가치를 깨닫게 하는 것입니까?" }
        ],
        next: "e_common"
      },
      e_common: {
        lines: [
          { speaker: "artist", text: "죽음을 눈앞에 전시하는 일은 막연한 공포를 줄이는 행위입니까, 아니면 공포를 볼거리로 만드는 행위입니까?" }
        ],
        question: "전시된 죽음의 의미는 어디에 있다고 봅니까?",
        options: [
          { id: "confront", label: "죽음을 직시하게 하므로 의미가 있다", next: "e_result_a" },
          { id: "consume", label: "죽음을 자극적인 볼거리로 소비한다", next: "e_result_b" },
          { id: "both", label: "의미와 소비가 동시에 존재할 수 있다", next: "e_result_c" }
        ]
      },
      e_result_a: {
        lines: [{ speaker: "philosopher", text: "그 경험이 현재의 삶을 더 평온하고 충실하게 만든다면 의미가 있을 것입니다. 그러나 계속 불안에 머물게 한다면 죽음에 대한 집착을 강화할 뿐입니다." }],
        resultKey: "conversation_complete"
      },
      e_result_b: {
        lines: [{ speaker: "philosopher", text: "타인의 죽음을 자신의 자극을 위해 소비한다면, 죽음에 대한 이해보다 욕망을 키우는 일이 될 수 있습니다. 중요한 것은 무엇을 보았는지가 아니라, 본 이후 어떻게 살아가는가입니다." }],
        resultKey: "conversation_complete"
      },
      e_result_c: {
        lines: [{ speaker: "philosopher", text: "인간의 경험은 하나의 의도로만 이루어지지 않습니다. 충격에 끌려 다가갔다가 삶을 성찰할 수도 있습니다. 다만 충격 자체를 진실로 착각하지는 말아야 합니다." }],
        resultKey: "conversation_complete"
      }
    }
  },
  plato: {
    name: "플라톤",
    theme: "눈앞에 있는 것은 진짜인가?",
    source: "플라톤, 『국가』 제6, 7, 10권",
    nodes: {
      intro: {
        lines: [
          { speaker: "artist", text: "플라톤, 이것은 실제로 죽은 생명체입니다. 그림이나 조각처럼 외형을 모방한 것도 아니지요. 그렇다면 관객은 지금 진짜 죽음을 보고 있는 것입니까?" },
          { speaker: "philosopher", text: "관객이 보는 것은 죽음의 본질이 아니라 죽은 육체의 외형일 것입니다. 실제 사체를 제시했다고 해서 죽음이라는 진리를 그대로 보여주었다고 할 수는 없습니다." },
          { speaker: "artist", text: "그렇다면 실제 사체조차 죽음의 이미지일 뿐이라는 뜻입니까?" },
          { speaker: "philosopher", text: "눈앞의 대상은 실제 육체이지만, 관객이 그것을 통해 떠올리는 죽음의 의미는 대상 그 자체와 같지 않습니다. 보이는 것과 그것이 의미하는 것을 구분해야 합니다." }
        ],
        question: "유리 상자 속 대상은 무엇입니까?",
        options: [
          { id: "real_death", label: "실제 죽음 그 자체", next: "p_real" },
          { id: "image", label: "죽음을 보여주는 이미지", next: "p_image" },
          { id: "symbol", label: "실제 사체이자 죽음의 상징", next: "p_symbol" }
        ]
      },
      p_real: {
        lines: [
          { speaker: "you", text: "실제 죽음 그 자체라고 생각합니다." },
          { speaker: "philosopher", text: "죽음의 결과를 보고 있다고 해서 죽음의 본질까지 보고 있다고 할 수 있을까요? 당신은 멈춘 육체를 보고 있지만, 생명이 사라진다는 것이 무엇인지는 눈으로 직접 확인할 수 없습니다." },
          { speaker: "artist", text: "관객은 가짜 이미지보다 실제 사체 앞에서 훨씬 강한 감정을 느낍니다. 감정의 강도가 대상의 진실성을 증명하지는 않습니까?" },
          { speaker: "philosopher", text: "강렬한 감정은 경험의 힘을 보여주지만, 그것이 곧 진리의 증거는 아닙니다. 그림자도 충분히 크고 두려울 수 있지만, 그림자가 실체가 되는 것은 아닙니다." }
        ],
        next: "p_common"
      },
      p_image: {
        lines: [
          { speaker: "you", text: "죽음을 보여주는 이미지라고 생각합니다." },
          { speaker: "philosopher", text: "사체는 실제이지만 작품 속에서 연출되고 배치된 순간 하나의 이미지로 작동할 수 있습니다." },
          { speaker: "artist", text: "실제 존재를 전시장에 옮겨놓는 순간 이미지가 된다면, 미술관은 현실을 진실하게 보여주는 장소입니까, 현실을 새롭게 꾸미는 장소입니까?" },
          { speaker: "philosopher", text: "미술관은 대상을 선택하고 분리하며 특정한 방식으로 보게 합니다. 그곳에서 보는 현실은 이미 해석된 현실에 가깝습니다." }
        ],
        next: "p_common"
      },
      p_symbol: {
        lines: [
          { speaker: "you", text: "실제 사체이자 죽음의 상징이라고 생각합니다." },
          { speaker: "philosopher", text: "실제 육체가 존재하는 것과 그것이 죽음 전체를 대표하는 것은 서로 다른 문제입니다." },
          { speaker: "artist", text: "그렇다면 이 작품은 현실과 이미지 사이에 있는 것일까요?" },
          { speaker: "philosopher", text: "그 경계에서 중요한 것은 관객이 보이는 외형에 머무르는지, 그 외형을 넘어 본질을 질문하는지에 있습니다." }
        ],
        next: "p_common"
      },
      p_common: {
        lines: [
          { speaker: "artist", text: "관객이 이 작품 앞에서 마주하는 것은 죽은 생명체입니까, 아니면 언젠가 죽을 자기 자신의 모습입니까?" }
        ],
        question: "무엇을 동시에 보고 있다고 느낍니까?",
        options: [
          { id: "object", label: "작품 속 실제 대상", next: "p_result_a" },
          { id: "self", label: "대상에 비친 나 자신", next: "p_result_b" },
          { id: "both", label: "대상과 나 자신을 동시에 본다", next: "p_result_c" }
        ]
      },
      p_result_a: {
        lines: [
          { speaker: "philosopher", text: "감각은 우선 눈앞의 대상을 향합니다. 그러나 보이는 외형만 관찰한다면 작품이 던지는 질문보다 표면적인 충격에 머물 수 있습니다." }
        ],
        next: "p_ai"
      },
      p_result_b: {
        lines: [
          { speaker: "philosopher", text: "눈앞의 대상은 자신의 유한성을 생각하게 만드는 계기가 됩니다. 그러나 자기 감정을 대상의 의미 전부라고 단정해서는 안 됩니다. 성찰 역시 하나의 해석이기 때문입니다." }
        ],
        next: "p_ai"
      },
      p_result_c: {
        lines: [
          { speaker: "philosopher", text: "감각으로는 대상을 보고, 사유를 통해 자신의 존재를 돌아보는 것입니다. 작품은 보이는 것 너머를 질문하게 하는 매개가 될 수 있습니다." },
          { speaker: "artist", text: "예술은 진리를 그대로 보여줄 수는 없지만, 진리를 향해 생각하게 만들 수는 있습니까?" },
          { speaker: "philosopher", text: "예술이 외형의 매혹에 머물지 않고 영혼을 사유로 이끈다면, 진리를 향한 질문의 출발점은 될 수 있을 것입니다." }
        ],
        next: "p_ai"
      },
      p_ai: {
        lines: [
          { speaker: "artist", text: "실제 생명체의 사진, 사실적인 조형물, AI로 생성한 존재하지 않는 생명체가 똑같이 진짜처럼 보인다면 무엇을 기준으로 진실을 판단해야 합니까?" }
        ],
        question: "무엇을 기준으로 진실을 판단해야 합니까?",
        options: [
          { id: "photo_source", label: "실제 대상을 촬영했는지가 중요하다", next: "p_ai_a" },
          { id: "image_meaning", label: "이미지가 전달하는 의미가 중요하다", next: "p_ai_b" },
          { id: "process_meaning", label: "제작 과정과 의미를 함께 확인해야 한다", next: "p_ai_c" }
        ]
      },
      p_ai_a: {
        lines: [
          { speaker: "you", text: "실제 대상을 촬영했는지가 중요하다고 봅니다." },
          { speaker: "philosopher", text: "실제 대상을 근거로 했다는 사실은 중요하지만 사진도 대상을 선택하고 자르고 배열합니다. 현실을 기록한 이미지가 현실 전체를 보여주지는 않습니다." }
        ],
        resultKey: "conversation_complete"
      },
      p_ai_b: {
        lines: [
          { speaker: "you", text: "이미지가 전달하는 의미가 중요하다고 봅니다." },
          { speaker: "philosopher", text: "존재하지 않는 이미지도 진실한 생각을 전달할 수 있습니다. 그러나 설득력 있는 이미지가 거짓을 진실처럼 보이게 할 위험도 있습니다." }
        ],
        resultKey: "conversation_complete"
      },
      p_ai_c: {
        lines: [
          { speaker: "you", text: "제작 과정과 의미를 함께 확인해야 한다고 봅니다." },
          { speaker: "philosopher", text: "보이는 결과뿐 아니라 무엇을 근거로 어떻게 만들어졌는지 질문하는 것은 감각적 인상에 머무르지 않고 이미지의 구조를 살펴보는 태도입니다." }
        ],
        resultKey: "conversation_complete"
      }
    }
  },
  aristotle: {
    name: "아리스토텔레스",
    theme: "형태만 남아도 같은 존재인가?",
    source: "아리스토텔레스, 『영혼에 관하여』, 『형이상학』",
    nodes: {
      intro: {
        lines: [
          { speaker: "artist", text: "아리스토텔레스, 눈앞의 생명체는 죽기 전과 거의 같은 형태로 보존되어 있습니다. 그렇다면 이것은 여전히 같은 존재입니까?" },
          { speaker: "philosopher", text: "같은 물질과 외형이 남아 있다는 점에서는 연속성이 있습니다. 하지만 생명체를 그 생명체이게 했던 감각과 운동, 생명 활동은 더 이상 실현되지 않습니다." },
          { speaker: "artist", text: "형태가 유지되어도 존재의 본질은 달라졌다는 뜻입니까?" },
          { speaker: "philosopher", text: "살아 있는 몸은 특정한 모양의 물질이 아니라 생명을 실현할 수 있는 몸입니다. 그 능력을 잃었다면 외형은 남아 있어도 존재 방식은 달라진 것입니다." }
        ],
        question: "수조 속 대상은 무엇입니까?",
        options: [
          { id: "same_life", label: "죽었지만 여전히 같은 생명체", next: "a_same" },
          { id: "matter", label: "생명체의 형태만 남은 물질", next: "a_matter" },
          { id: "artwork", label: "이전 존재와 새 작품이 겹쳐 있다", next: "a_artwork" }
        ]
      },
      a_same: {
        lines: [
          { speaker: "you", text: "죽었지만 여전히 같은 생명체라고 생각합니다." },
          { speaker: "philosopher", text: "과거에 어떤 생명체였는지를 확인할 수 있다는 점에서는 같은 이름을 사용할 수 있습니다. 그러나 살아 있을 때와 죽은 뒤의 존재 방식까지 동일하다고 보기는 어렵습니다." },
          { speaker: "artist", text: "같은 이름을 사용하는 이유는 대상이 그대로이기 때문입니까, 과거의 기억을 붙잡고 있기 때문입니까?" },
          { speaker: "philosopher", text: "이름은 연속성을 표현할 수 있지만 대상의 상태까지 보존하지는 못합니다." }
        ],
        next: "a_common"
      },
      a_matter: {
        lines: [
          { speaker: "you", text: "생명체의 형태만 남은 물질이라고 생각합니다." },
          { speaker: "philosopher", text: "살아 있던 존재의 질료와 외형은 남아 있지만 생명 활동은 사라졌습니다." },
          { speaker: "artist", text: "그렇다면 나는 생명을 보존한 것이 아니라 생명을 잃은 물질을 보존한 것에 불과합니까?" },
          { speaker: "philosopher", text: "생명 자체가 아니라 생명이 존재했다는 물질적 흔적을 보존했다고 할 수 있습니다." }
        ],
        next: "a_common"
      },
      a_artwork: {
        lines: [
          { speaker: "you", text: "이전의 존재와 새로운 예술작품이 겹쳐 있다고 생각합니다." },
          { speaker: "philosopher", text: "같은 물질이라도 놓인 목적과 관계가 바뀌면 다르게 이해될 수 있습니다. 살아 있을 때는 생명체였지만 전시장에서는 관찰과 사유의 대상으로 기능합니다." }
        ],
        next: "a_common"
      },
      a_common: {
        lines: [
          { speaker: "artist", text: "생명이 빠져나간 자리에 예술적 의미를 채워 넣는 것은 창조입니까, 죽음을 이용하는 일입니까?" }
        ],
        question: "그 행위의 성격은 무엇에 가깝습니까?",
        options: [
          { id: "creation", label: "새로운 의미를 만드는 창조", next: "a_result_a" },
          { id: "use", label: "죽은 존재를 재료로 이용하는 행위", next: "a_result_b" },
          { id: "both", label: "창조와 이용이 동시에 존재한다", next: "a_result_c" }
        ]
      },
      a_result_a: {
        lines: [
          { speaker: "philosopher", text: "예술은 재료에 일정한 형식과 목적을 부여합니다. 그러나 새로운 의미가 만들어졌다는 사실만으로 그 과정이 정당화되는 것은 아닙니다." }
        ],
        next: "a_identity"
      },
      a_result_b: {
        lines: [
          { speaker: "philosopher", text: "대상을 어떤 목적으로 사용하는지는 행위의 성격을 판단하는 중요한 기준입니다. 좋은 목적만으로 모든 수단이 정당해지지는 않습니다." }
        ],
        next: "a_identity"
      },
      a_result_c: {
        lines: [
          { speaker: "philosopher", text: "작품은 새로운 사유를 만들면서 동시에 한 존재를 재료화할 수 있습니다. 예술적 가치와 윤리적 문제를 함께 검토해야 합니다." }
        ],
        next: "a_identity"
      },
      a_identity: {
        lines: [
          { speaker: "artist", text: "보존 과정에서 피부와 장기, 액체와 구조물을 계속 교체한다면 어느 순간부터 이것은 원래의 존재가 아니게 됩니까?" }
        ],
        question: "동일성은 어디에서 이어집니까?",
        options: [
          { id: "matter_continues", label: "원래 물질이 남아 있어야 같은 존재다", next: "a_identity_a" },
          { id: "form_continues", label: "형태가 유지되면 같은 존재다", next: "a_identity_b" },
          { id: "memory_continues", label: "기억과 이름이 이어지면 같은 존재다", next: "a_identity_c" }
        ]
      },
      a_identity_a: {
        lines: [
          { speaker: "you", text: "원래 물질이 남아 있어야 같은 존재라고 봅니다." },
          { speaker: "philosopher", text: "질료의 연속성을 중시하는 판단입니다. 그러나 생명체의 몸도 살아 있는 동안 끊임없이 변화하므로 물질만으로 동일성을 완전히 설명하기는 어렵습니다." }
        ],
        resultKey: "conversation_complete"
      },
      a_identity_b: {
        lines: [
          { speaker: "you", text: "형태가 유지되면 같은 존재라고 봅니다." },
          { speaker: "philosopher", text: "형태는 대상을 인식하게 하는 중요한 조건입니다. 하지만 살아 있는 존재의 형상은 외곽선이 아니라 생명 활동의 원리까지 포함합니다." }
        ],
        resultKey: "conversation_complete"
      },
      a_identity_c: {
        lines: [
          { speaker: "you", text: "기억과 이름이 이어지면 같은 존재라고 봅니다." },
          { speaker: "philosopher", text: "대상을 기억하고 해석하는 공동체의 관계를 강조합니다. 다만 기억 속 존재와 현재의 물질적 존재는 구분할 필요가 있습니다." }
        ],
        resultKey: "conversation_complete"
      }
    }
  }
};
