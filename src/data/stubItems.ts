/**
 * Stub items for diagnostic/drill/simulation flows when API is not available.
 * Replace with API fetch in production.
 */

export interface StubItem {
  id: string;
  stimulus: string;
  options?: string[];
  correct_answer: string;
  explanation?: string;
  question_type: string;
  difficulty?: 'D1' | 'D2' | 'D3' | 'D4' | 'D5';
}

export const stubModule1Questions: StubItem[] = [
  {
    id: 'stub-rw-1',
    stimulus:
      'The following text is from a 1924 essay. Which choice best states the main idea?\n\n"Education must train the student to think clearly and to act with purpose. Without these, information is useless."',
    options: [
      'Education should focus on facts.',
      'Education should develop clear thinking and purposeful action.',
      'Students need more free time.',
      'Information is the goal of school.',
    ],
    correct_answer:
      'Education should develop clear thinking and purposeful action.',
    question_type: 'RW_IA_CENTRAL',
    difficulty: 'D2',
  },
  {
    id: 'stub-rw-2',
    stimulus:
      'Which choice best completes the text?\n\n"Scientists have long debated whether birds evolved from dinosaurs. Recent fossil evidence _____."',
    options: [
      'has ended the debate',
      'suggests a close relationship between the two',
      'proves birds are older',
      'has been lost',
    ],
    correct_answer: 'suggests a close relationship between the two',
    question_type: 'RW_IA_INF',
    difficulty: 'D2',
  },
  {
    id: 'stub-rw-3',
    stimulus:
      'The writer wants to add a sentence that introduces the main topic. Which choice best does that?\n\n"_____ The new policy will take effect in January."',
    options: [
      'The weather was nice.',
      'The company has announced a change to its leave policy.',
      'Many people prefer summer.',
      'January is a cold month.',
    ],
    correct_answer: 'The company has announced a change to its leave policy.',
    question_type: 'RW_EOI',
    difficulty: 'D1',
  },
];

export const stubModule2EasyQuestions: StubItem[] = [
  {
    id: 'stub-rw-m2-1',
    stimulus:
      'Which choice best states the purpose of the underlined sentence?\n\n"The author uses this example to show how one idea can lead to another."',
    options: [
      'To introduce a new character',
      'To illustrate how ideas connect',
      'To summarize the paragraph',
      'To ask a question',
    ],
    correct_answer: 'To illustrate how ideas connect',
    question_type: 'RW_CS_STRUCTURE',
    difficulty: 'D2',
  },
  {
    id: 'stub-rw-m2-2',
    stimulus:
      'The text most strongly suggests that the author believes _____.',
    options: [
      'change is inevitable',
      'reading is optional',
      'practice improves skill',
      'everyone agrees',
    ],
    correct_answer: 'practice improves skill',
    question_type: 'RW_IA_INF',
    difficulty: 'D2',
  },
];

export const stubModule2HardQuestions: StubItem[] = [
  {
    id: 'stub-rw-m2h-1',
    stimulus:
      'The author refers to "the prevailing view" primarily to _____.',
    options: [
      'establish a contrast with his own position',
      'cite an expert opinion',
      'define a technical term',
      'summarize the previous paragraph',
    ],
    correct_answer: 'establish a contrast with his own position',
    question_type: 'RW_CS_PURPOSE',
    difficulty: 'D4',
  },
  {
    id: 'stub-rw-m2h-2',
    stimulus:
      'Which choice best describes the relationship between the two paragraphs?',
    options: [
      'The second contradicts the first.',
      'The second qualifies the first.',
      'The second repeats the first.',
      'The second introduces a new topic.',
    ],
    correct_answer: 'The second qualifies the first.',
    question_type: 'RW_CS_STRUCTURE',
    difficulty: 'D3',
  },
];

/** Stub items for drill session (same shape, can reuse or slice from above) */
export const stubDrillQuestions: StubItem[] = [
  ...stubModule1Questions,
  ...stubModule2EasyQuestions,
].map((q) => ({
  ...q,
  id: `drill-${q.id}`,
}));
