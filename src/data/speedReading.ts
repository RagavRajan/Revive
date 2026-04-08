import type { SRExercise, SRChapter } from '../types/speedReading'

export const TOTAL_DAYS = 30

export const exercises: SRExercise[] = [
  // === Chapter 1: Your Reading Brain (Days 1-2) ===
  {
    id: 1, day: 1, title: 'Reading Habits Self-Assessment',
    type: 'reflection',
    prompt: 'Before improving your reading, take an honest inventory of your current habits. Reflect on each question below.',
    questions: [
      'How many books have you read in the past 6 months? What types of material do you read most (fiction, news, textbooks, work documents)?',
      'Describe how you physically read right now: Where do you sit? What is your posture? Do you use a finger or pointer? Do you move your lips or "hear" the words in your head?',
      'What are your biggest frustrations with reading? (e.g., slow speed, poor concentration, forgetting what you read, re-reading passages)',
      'What would you do differently if you could read 3x faster with the same or better comprehension?',
    ],
  },
  {
    id: 2, day: 2, title: 'How Reading Works',
    type: 'multipleChoice',
    prompt: 'Test your understanding of the science behind reading and eye movements.',
    questions: [
      {
        question: 'When you read, your eyes do NOT move smoothly across the line. Instead, they make small jumps called:',
        options: ['Saccades', 'Regressions', 'Fixations', 'Dilations'],
        correctIndex: 0,
      },
      {
        question: 'The moment when your eyes pause on a word or group of words to take in information is called a:',
        options: ['Saccade', 'Fixation', 'Regression', 'Perception'],
        correctIndex: 1,
      },
      {
        question: 'A slow reader typically makes how many fixations per line of text?',
        options: ['1-2', '3-4', '5-10 or more', 'Exactly one per word'],
        correctIndex: 2,
      },
      {
        question: 'Which of these is TRUE about reading speed?',
        options: [
          'Slower reading always means better comprehension',
          'The average untrained reader reads about 200-240 wpm',
          'Reading speed is fixed and cannot be improved',
          'Speed reading sacrifices all comprehension',
        ],
        correctIndex: 1,
      },
      {
        question: 'Peripheral vision in reading refers to:',
        options: [
          'Reading with one eye closed',
          'The ability to take in words on either side of your central focus point',
          'Reading from the edges of the page inward',
          'Using a magnifying glass while reading',
        ],
        correctIndex: 1,
      },
      {
        question: 'Going back to re-read words or passages you have already passed is called:',
        options: ['Scanning', 'Skimming', 'Regression', 'Previewing'],
        correctIndex: 2,
      },
    ],
  },

  // === Chapter 2: The Speed Reading Environment (Days 3-4) ===
  {
    id: 3, day: 3, title: 'Setting Up Your Reading Space',
    type: 'reflection',
    prompt: 'The right environment dramatically affects reading speed and comprehension. Set up your ideal reading space and report on it.',
    questions: [
      'Describe your reading environment: lighting (ideally natural or bright, even light), desk/chair setup, and how you have positioned your reading material (should be at a slight angle, about 50cm from eyes).',
      'Did you try using a guide (pen, chopstick, or slim pointer) while reading today? Describe the experience. Was it awkward at first? Did you notice any difference in focus?',
      'How did you sit? The ideal posture is upright with both feet on the floor, back supported. Compare your usual reading posture to this ideal.',
    ],
  },
  {
    id: 4, day: 4, title: 'Guide Technique Fundamentals',
    type: 'multipleChoice',
    prompt: 'Test your knowledge of the guide technique and optimal reading conditions.',
    questions: [
      {
        question: 'Why does using a visual guide (pen or pointer) improve reading speed?',
        options: [
          'It makes the text bigger',
          'It helps your eyes maintain smooth, consistent movement and reduces regression',
          'It blocks out distracting words',
          'It is purely a placebo effect',
        ],
        correctIndex: 1,
      },
      {
        question: 'What is the recommended distance between your eyes and the reading material?',
        options: ['15-20 cm', '30-40 cm', '50 cm or more', 'As close as possible'],
        correctIndex: 2,
      },
      {
        question: 'Poor lighting can reduce reading speed by as much as:',
        options: ['5%', '10%', '25%', '50%'],
        correctIndex: 3,
      },
      {
        question: 'When using a guide, you should:',
        options: [
          'Move it word by word, pausing on each',
          'Move it smoothly and slightly faster than you think you can read',
          'Hold it still and move your head instead',
          'Only use it for difficult passages',
        ],
        correctIndex: 1,
      },
      {
        question: 'The ideal reading posture involves:',
        options: [
          'Lying flat on your back',
          'Leaning far forward over the desk',
          'Sitting upright with feet flat and material at a slight angle',
          'Standing at a lectern',
        ],
        correctIndex: 2,
      },
    ],
  },

  // === Chapter 3: Eye Movements & Perception (Days 5-7) ===
  {
    id: 5, day: 5, title: 'Eye Movement Science',
    type: 'multipleChoice',
    prompt: 'Deepen your understanding of how your eyes process text and how to optimize their performance.',
    questions: [
      {
        question: 'An efficient speed reader takes in how many fixations per line?',
        options: ['One per word', '2-3 fixations per line', '10+ fixations', 'Zero — they scan continuously'],
        correctIndex: 1,
      },
      {
        question: 'What is the main benefit of expanding your peripheral vision for reading?',
        options: [
          'You can read in the dark',
          'You absorb more words per fixation, reducing the total number of eye stops needed',
          'Your eyes get less tired',
          'You can read multiple pages at once',
        ],
        correctIndex: 1,
      },
      {
        question: 'A metronome can help with speed reading because:',
        options: [
          'The ticking sound blocks out distractions',
          'It establishes a consistent rhythm for eye movements, reducing irregular pauses',
          'It helps you memorize content',
          'It slows down your breathing',
        ],
        correctIndex: 1,
      },
      {
        question: 'Back-skipping differs from regression because:',
        options: [
          'Back-skipping is conscious and regression is unconscious',
          'Regression is conscious and back-skipping is unconscious',
          'They are exactly the same thing',
          'Back-skipping only happens with fiction',
        ],
        correctIndex: 1,
      },
      {
        question: 'To train your eyes to take in wider groups of words, you should practice:',
        options: [
          'Reading one letter at a time',
          'Focusing on the center of each line and using peripheral vision to capture words on either side',
          'Squinting to narrow your visual field',
          'Reading with your book very close to your face',
        ],
        correctIndex: 1,
      },
      {
        question: 'Studies show that readers who were not allowed to re-read (regress) showed:',
        options: [
          'Much worse comprehension',
          'The same or slightly better comprehension',
          'Complete inability to understand the text',
          'Faster speed but zero retention',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 6, day: 6, title: 'Peripheral Vision Training',
    type: 'reflection',
    prompt: 'Today you will practice expanding your visual span. Complete these exercises and report your experience.',
    questions: [
      'Fixation exercise: Pick a page of text. Instead of reading word-by-word, try making only 3 fixation points per line (beginning, middle, end). Read 2 full pages this way. How did it feel? Could you still understand the content?',
      'Peripheral awareness: Focus on one word in the center of a line. Without moving your eyes, how many words can you identify on either side? Practice this on 10 different lines and note your range.',
      'Speed push: Set a timer for 2 minutes. Read as fast as possible using your guide, even if comprehension suffers. The goal is to push your eyes beyond their comfort zone. What was the experience like? Did you notice your eyes wanting to go back?',
    ],
  },
  {
    id: 7, day: 7, title: 'Baseline Speed Test',
    type: 'speedLog',
    prompt: 'Establish your baseline reading speed. This is your starting point — all future progress will be measured against it.',
    instructions: 'Choose any non-fiction book or article you have not read before. Read for exactly 5 minutes using a timer. Use your guide (pen/pointer). When the timer stops, count the total words you read (count words per line × number of lines). Then answer the comprehension questions below about reading science.',
    wordCount: 0,
    comprehensionQuestions: [
      {
        question: 'The formula for calculating words per minute (WPM) is:',
        options: [
          'Number of pages ÷ minutes',
          'Number of words ÷ time in minutes',
          'Number of lines × time',
          'Number of words × time in minutes',
        ],
        correctIndex: 1,
      },
      {
        question: 'What is considered an average reading speed for an untrained adult?',
        options: ['100 wpm', '200-250 wpm', '500 wpm', '1000 wpm'],
        correctIndex: 1,
      },
      {
        question: 'A good speed reader with training can typically reach:',
        options: ['300 wpm', '400-700 wpm', '50 wpm', 'Exactly 250 wpm'],
        correctIndex: 1,
      },
      {
        question: 'When measuring your reading speed, you should:',
        options: [
          'Use material you have already read',
          'Use new material at an appropriate difficulty level',
          'Always use the same passage',
          'Only count long words',
        ],
        correctIndex: 1,
      },
      {
        question: 'Speed AND comprehension should ideally:',
        options: [
          'Be inversely related — one always drops when the other rises',
          'Both improve together with proper training',
          'Be measured separately with no connection',
          'Only matter for academic reading',
        ],
        correctIndex: 1,
      },
    ],
  },

  // === Chapter 4: Overcoming Reading Problems (Days 8-9) ===
  {
    id: 8, day: 8, title: 'Defeating Bad Reading Habits',
    type: 'multipleChoice',
    prompt: 'Identify and understand the common problems that slow readers down.',
    questions: [
      {
        question: 'Sub-vocalization is:',
        options: [
          'Reading out loud to others',
          'The habit of silently "speaking" or "hearing" each word in your mind as you read',
          'Whispering while reading',
          'A type of eye movement disorder',
        ],
        correctIndex: 1,
      },
      {
        question: 'Should sub-vocalization be completely eliminated?',
        options: [
          'Yes, it must be destroyed entirely',
          'No — it should be reduced and used selectively for key words and concepts, not every word',
          'It cannot be changed at all',
          'Only for fiction reading',
        ],
        correctIndex: 1,
      },
      {
        question: 'Regression (going back to re-read) is often caused by:',
        options: [
          'Poor eyesight',
          'Lack of confidence in comprehension, not actual misunderstanding',
          'Reading too slowly',
          'Using a guide',
        ],
        correctIndex: 1,
      },
      {
        question: 'Using a guide helps reduce regression because:',
        options: [
          'It covers up previous text',
          'It gives your eyes a forward-moving target to follow, discouraging backward movement',
          'It makes words bigger',
          'It distracts you from wanting to go back',
        ],
        correctIndex: 1,
      },
      {
        question: 'The best way to increase reading speed when material is difficult is to:',
        options: [
          'Read more slowly and carefully',
          'Actually try going faster — speed and rhythm can improve comprehension on difficult material',
          'Skip the difficult parts entirely',
          'Read each sentence three times',
        ],
        correctIndex: 1,
      },
      {
        question: 'Finger-pointing while reading was traditionally considered bad because:',
        options: [
          'It actually is always bad and should never be done',
          'It was a misconception — a guide is one of the best tools for maintaining focus and speed',
          'It damages the pages',
          'It only works for children',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 9, day: 9, title: 'Speed Test After Technique Practice',
    type: 'speedLog',
    prompt: 'After learning about reading problems and the guide technique, test your speed again to see early improvement.',
    instructions: 'Read a new chapter or article for exactly 5 minutes. This time, consciously: (1) Use your guide throughout, (2) Push the guide slightly faster than comfortable, (3) Resist the urge to go back and re-read. Count your total words read when done.',
    wordCount: 0,
    comprehensionQuestions: [
      {
        question: 'Which reading problem involves unconsciously skipping back to words you just read?',
        options: ['Sub-vocalization', 'Back-skipping', 'Previewing', 'Scanning'],
        correctIndex: 1,
      },
      {
        question: 'The guide technique was first advocated by Evelyn Wood in the:',
        options: ['1920s', '1940s', '1950s-60s', '1990s'],
        correctIndex: 2,
      },
      {
        question: 'When you notice yourself sub-vocalizing, you should:',
        options: [
          'Stop reading immediately',
          'Increase your speed slightly — your inner voice cannot keep up at higher speeds',
          'Read even more slowly to eliminate it',
          'Hold your breath',
        ],
        correctIndex: 1,
      },
      {
        question: 'Compared to your Day 7 baseline, a speed improvement is likely because:',
        options: [
          'You read easier material',
          'Awareness of bad habits and use of a guide immediately reduces wasted eye movements',
          'The time of day matters most',
          'It is impossible to improve this quickly',
        ],
        correctIndex: 1,
      },
      {
        question: 'Breaks during extended reading sessions should be taken every:',
        options: ['5 minutes', '15 minutes', '30-50 minutes', '2 hours'],
        correctIndex: 2,
      },
    ],
  },

  // === Chapter 5: Vocabulary Power I — Prefixes (Days 10-12) ===
  {
    id: 10, day: 10, title: 'Core Prefixes Set 1',
    type: 'matchPairs',
    prompt: 'Match each prefix to its correct meaning. A strong vocabulary is one of the most powerful speed reading tools — knowing word parts lets you instantly decode unfamiliar words.',
    pairs: [
      { left: 'anti-', right: 'against' },
      { left: 'auto-', right: 'self' },
      { left: 'bi-', right: 'two' },
      { left: 'circum-', right: 'around' },
      { left: 'co-, com-, con-', right: 'together, with' },
      { left: 'contra-', right: 'against, counter' },
      { left: 'de-', right: 'down, from' },
      { left: 'dis-', right: 'not, opposite' },
      { left: 'ex-', right: 'out of' },
      { left: 'hyper-', right: 'above, excessive' },
    ],
  },
  {
    id: 11, day: 11, title: 'Core Prefixes Set 2',
    type: 'matchPairs',
    prompt: 'Match each prefix to its correct meaning. These prefixes unlock the meaning of thousands of English words.',
    pairs: [
      { left: 'inter-', right: 'between' },
      { left: 'intra-', right: 'within' },
      { left: 'mal-', right: 'bad, wrong' },
      { left: 'mono-', right: 'one, single' },
      { left: 'poly-', right: 'many' },
      { left: 'post-', right: 'after' },
      { left: 'pre-', right: 'before' },
      { left: 'retro-', right: 'backward' },
      { left: 'sub-', right: 'under' },
      { left: 'trans-', right: 'across' },
    ],
  },
  {
    id: 12, day: 12, title: 'Prefix Vocabulary Challenge',
    type: 'vocabFill',
    prompt: 'Use your knowledge of prefixes to fill in the correct word for each sentence. Select from the word bank.',
    wordBank: ['antisocial', 'bicycle', 'circumnavigate', 'coexist', 'decompose', 'exhale', 'hyperactive', 'interstellar', 'monologue', 'transport'],
    sentences: [
      { text: 'To breathe out is to ___.', answer: 'exhale' },
      { text: 'A child who cannot sit still and is constantly in motion might be described as ___.', answer: 'hyperactive' },
      { text: 'A two-wheeled vehicle is called a ___.', answer: 'bicycle' },
      { text: 'To sail completely around the world is to ___ the globe.', answer: 'circumnavigate' },
      { text: 'When an actor speaks alone on stage, the speech is called a ___.', answer: 'monologue' },
      { text: 'Travel between stars is called ___ travel.', answer: 'interstellar' },
      { text: 'To carry goods across a distance is to ___ them.', answer: 'transport' },
      { text: 'Different species can ___ peacefully in the same habitat.', answer: 'coexist' },
      { text: 'Organic matter will gradually ___ into simpler substances.', answer: 'decompose' },
      { text: 'A person who avoids and dislikes the company of others is ___.', answer: 'antisocial' },
    ],
  },

  // === Chapter 6: Vocabulary Power II — Suffixes (Days 13-15) ===
  {
    id: 13, day: 13, title: 'Core Suffixes Set 1',
    type: 'matchPairs',
    prompt: 'Match each suffix to its correct meaning. Suffixes tell you about the function, quality, or state of a word.',
    pairs: [
      { left: '-able, -ible', right: 'capable of' },
      { left: '-tion, -sion', right: 'action or state' },
      { left: '-ful', right: 'full of' },
      { left: '-less', right: 'lacking, without' },
      { left: '-ness', right: 'state or condition' },
      { left: '-ment', right: 'act or result' },
      { left: '-ous, -ious', right: 'full of, having' },
      { left: '-ist', right: 'one who practices' },
      { left: '-ity, -ty', right: 'quality or degree' },
      { left: '-ly', right: 'in the manner of' },
    ],
  },
  {
    id: 14, day: 14, title: 'Core Suffixes Set 2',
    type: 'matchPairs',
    prompt: 'Match each suffix to its correct meaning. These suffixes help you identify parts of speech instantly.',
    pairs: [
      { left: '-dom', right: 'condition or realm' },
      { left: '-fy, -ify', right: 'to make or become' },
      { left: '-ism', right: 'doctrine or belief' },
      { left: '-ive', right: 'tending toward' },
      { left: '-ent, -ant', right: 'performing agent' },
      { left: '-ary, -ory', right: 'relating to, place for' },
      { left: '-hood', right: 'state or period' },
      { left: '-ward', right: 'direction' },
      { left: '-ette', right: 'small, diminutive' },
      { left: '-logy', right: 'study or science of' },
    ],
  },
  {
    id: 15, day: 15, title: 'Suffix Vocabulary Challenge',
    type: 'vocabFill',
    prompt: 'Use your knowledge of suffixes to fill in the correct word for each sentence.',
    wordBank: ['fearless', 'government', 'happiness', 'beautiful', 'simplify', 'freedom', 'creative', 'childhood', 'westward', 'biology'],
    sentences: [
      { text: 'The state of being happy is ___.', answer: 'happiness' },
      { text: 'A person without fear is ___.', answer: 'fearless' },
      { text: 'The study of living organisms is ___.', answer: 'biology' },
      { text: 'Full of beauty describes something ___.', answer: 'beautiful' },
      { text: 'To make something simpler is to ___ it.', answer: 'simplify' },
      { text: 'The condition of being free is ___.', answer: 'freedom' },
      { text: 'The act or system of governing is ___.', answer: 'government' },
      { text: 'Tending toward creating new things makes a person ___.', answer: 'creative' },
      { text: 'The period of being a child is ___.', answer: 'childhood' },
      { text: 'Moving in the direction of the west is traveling ___.', answer: 'westward' },
    ],
  },

  // === Chapter 7: Vocabulary Power III — Roots (Days 16-18) ===
  {
    id: 16, day: 16, title: 'Core Roots Set 1',
    type: 'matchPairs',
    prompt: 'Match each Latin/Greek root to its meaning. Roots are the core building blocks of the English language.',
    pairs: [
      { left: 'chron', right: 'time' },
      { left: 'graph, scrib', right: 'write' },
      { left: 'aud', right: 'hear' },
      { left: 'vid, vis', right: 'see' },
      { left: 'duc, duct', right: 'lead' },
      { left: 'port', right: 'carry' },
      { left: 'mort', right: 'death' },
      { left: 'bio', right: 'life' },
      { left: 'geo', right: 'earth' },
      { left: 'photo, luc', right: 'light' },
    ],
  },
  {
    id: 17, day: 17, title: 'Core Roots Set 2',
    type: 'matchPairs',
    prompt: 'Match each root to its meaning. These roots appear in hundreds of everyday English words.',
    pairs: [
      { left: 'path', right: 'feeling, suffering' },
      { left: 'phil', right: 'love' },
      { left: 'phob', right: 'fear' },
      { left: 'corp', right: 'body' },
      { left: 'cred', right: 'believe' },
      { left: 'miss, mitt', right: 'send' },
      { left: 'ven, vent', right: 'come' },
      { left: 'spec, spect', right: 'look' },
      { left: 'therm', right: 'heat, warm' },
      { left: 'ann', right: 'year' },
    ],
  },
  {
    id: 18, day: 18, title: 'Root Vocabulary Challenge',
    type: 'vocabFill',
    prompt: 'Use your knowledge of roots to fill in the correct word for each sentence.',
    wordBank: ['chronological', 'auditorium', 'biography', 'geography', 'spectator', 'transport', 'immortal', 'empathy', 'credible', 'annual'],
    sentences: [
      { text: 'Events arranged in order of time are in ___ order.', answer: 'chronological' },
      { text: 'A large hall for hearing lectures or concerts is an ___.', answer: 'auditorium' },
      { text: 'The written account of someone\'s life is a ___.', answer: 'biography' },
      { text: 'The study of the earth\'s surface and features is ___.', answer: 'geography' },
      { text: 'A person who watches an event is a ___.', answer: 'spectator' },
      { text: 'To carry goods from one place to another is to ___ them.', answer: 'transport' },
      { text: 'A being that cannot die is ___.', answer: 'immortal' },
      { text: 'The ability to understand and share another person\'s feelings is ___.', answer: 'empathy' },
      { text: 'A story that is believable is ___.', answer: 'credible' },
      { text: 'An event that occurs every year is ___.', answer: 'annual' },
    ],
  },

  // === Chapter 8: Paragraph Structure (Days 19-20) ===
  {
    id: 19, day: 19, title: 'Identifying Paragraph Types',
    type: 'multipleChoice',
    prompt: 'Understanding paragraph structure lets you skim more effectively and know where to focus. Identify the correct paragraph types and structures.',
    questions: [
      {
        question: 'An explanatory paragraph is one that:',
        options: [
          'Sets the scene and describes objects or people',
          'Explains a concept or point of view — the first sentences give the general idea and the rest fills in details',
          'Joins two sections of text together',
          'Tells a story with characters',
        ],
        correctIndex: 1,
      },
      {
        question: 'A descriptive paragraph usually:',
        options: [
          'Introduces a brand new argument',
          'Expands on or embellishes ideas that were already introduced',
          'Summarizes the entire chapter',
          'Contains only facts and statistics',
        ],
        correctIndex: 1,
      },
      {
        question: 'A linking paragraph serves to:',
        options: [
          'Describe a scene in detail',
          'Join together what has preceded and what follows, often summarizing context',
          'Present the main argument of the text',
          'Provide comic relief',
        ],
        correctIndex: 1,
      },
      {
        question: 'In newspapers and magazines, the most important information is typically found:',
        options: [
          'In the middle paragraphs',
          'In the first and last few paragraphs of the article',
          'Only in the final paragraph',
          'Evenly distributed throughout',
        ],
        correctIndex: 1,
      },
      {
        question: 'The "Memory Word" game for paragraphs involves:',
        options: [
          'Memorizing every word in the paragraph',
          'Picking out the main theme and secondary theme as Key Words while you read',
          'Writing the paragraph from memory',
          'Reading the paragraph backwards',
        ],
        correctIndex: 1,
      },
      {
        question: 'When skimming, which paragraphs should you focus on most?',
        options: [
          'Only the middle paragraphs',
          'The opening, closing, and any linking paragraphs — these carry the structure',
          'Only paragraphs with numbers',
          'Every paragraph equally',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 20, day: 20, title: 'Key Word Extraction Practice',
    type: 'reflection',
    prompt: 'A Key Word is a word that encapsulates a multitude of meanings in a small unit. Practice extracting key words from your reading today.',
    questions: [
      'Read one page of any non-fiction book. List the 5-7 Key Words or phrases that capture the essential meaning of that page. A good Key Word should trigger recall of the surrounding content.',
      'Read a newspaper or magazine article. For each paragraph, write down ONE word that captures its main point. Then string these words together — can you reconstruct the article\'s argument?',
      'What is the difference between a Key Recall Word (triggers memory of general content) and a Key Creative Word (evokes specific images and connections)? Give an example of each from your reading today.',
    ],
  },

  // === Chapter 9: Previewing & Skimming (Days 21-22) ===
  {
    id: 21, day: 21, title: 'Previewing Techniques',
    type: 'multipleChoice',
    prompt: 'Previewing is your mental reconnaissance — seeing the whole territory before exploring it in detail.',
    questions: [
      {
        question: 'The purpose of previewing a text before reading it is to:',
        options: [
          'Replace the need to read it fully',
          'Build a mental framework so your brain can more easily fit in the details during full reading',
          'Find spelling errors',
          'Count the number of pages',
        ],
        correctIndex: 1,
      },
      {
        question: '"Apply What You Already Know" means:',
        options: [
          'Only read about topics you are expert in',
          'Before reading, quickly Mind Map your existing knowledge of the subject to activate relevant mental schemas',
          'Skip books on new topics',
          'Test yourself before reading',
        ],
        correctIndex: 1,
      },
      {
        question: '"Interact Actively with the Author" means:',
        options: [
          'Email the author with questions',
          'Treat the book as a conversation — note questions, agreements, and disagreements in margins',
          'Read the author\'s biography first',
          'Highlight every sentence',
        ],
        correctIndex: 1,
      },
      {
        question: '"Be a Detective" in previewing means:',
        options: [
          'Look for hidden messages',
          'Constantly predict what the author will say next and what their plan of action is',
          'Read mystery novels only',
          'Check if the facts are true',
        ],
        correctIndex: 1,
      },
      {
        question: 'When previewing a book, you should look at:',
        options: [
          'Only the first page',
          'Table of contents, chapter headings, images, bold text, first and last paragraphs of chapters',
          'Only the index',
          'Only the bibliography',
        ],
        correctIndex: 1,
      },
      {
        question: 'Skimming differs from previewing because:',
        options: [
          'They are the same thing',
          'Skimming selectively reads portions of the text at speed, while previewing surveys the overall structure',
          'Skimming is slower than previewing',
          'Previewing involves reading every word',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 22, day: 22, title: 'Skimming & Scanning Practice',
    type: 'reflection',
    prompt: 'Put previewing and skimming into practice with real material today.',
    questions: [
      'Preview an entire book you have not read yet in under 10 minutes. Report: What is it about? What are the main sections? What do you already know about the topic? What are 3 questions you want the book to answer?',
      'Skim a newspaper or online news section. In 10 minutes, identify: (a) the 3 most important stories, (b) 1 sentence summary of each, (c) which articles you would read in full and why.',
      'Scanning exercise: Open any reference material (dictionary, textbook, manual). Find 5 specific pieces of information as fast as possible — e.g., a definition, a date, a name. How did you guide your eyes? Did you read linearly or jump around?',
    ],
  },

  // === Chapter 10: Concentration & Comprehension (Days 23-24) ===
  {
    id: 23, day: 23, title: 'Mastering Concentration',
    type: 'multipleChoice',
    prompt: 'Concentration is like a wild stallion — always present, just not always directed where you want it. Learn to ride it.',
    questions: [
      {
        question: 'When you "lose concentration" while reading, what is actually happening?',
        options: [
          'Your brain stops working',
          'Your concentration is redirecting to other stimuli — you are always concentrating on something',
          'You fall asleep briefly',
          'Your eyes stop moving',
        ],
        correctIndex: 1,
      },
      {
        question: 'The best way to handle daydreaming during reading is to:',
        options: [
          'Punish yourself for losing focus',
          'Recognize it happens naturally every 30-40 minutes and take planned breaks at those intervals',
          'Never take any breaks',
          'Read standing up',
        ],
        correctIndex: 1,
      },
      {
        question: 'Setting clear reading goals before you start helps concentration because:',
        options: [
          'It makes the reading shorter',
          'It gives your brain a purpose and direction, keeping the concentration stallion on track',
          'Goals are just motivational fluff',
          'It only matters for textbooks',
        ],
        correctIndex: 1,
      },
      {
        question: 'If reading material is boring or difficult, the best approach is to:',
        options: [
          'Give up immediately',
          'Read it more slowly and carefully',
          'Try the "severe critic" approach — actively argue with and challenge the material',
          'Read something else entirely',
        ],
        correctIndex: 2,
      },
      {
        question: 'Vocabulary difficulties hurt concentration because:',
        options: [
          'Big words are intimidating',
          'Unknown words create gaps in understanding that compound, making the reader anxious and distracted',
          'They make sentences longer',
          'They only matter in foreign languages',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 24, day: 24, title: 'Mid-Program Speed Test',
    type: 'speedLog',
    prompt: 'Time to measure your progress! You are halfway through the program. Compare this result to your Day 7 and Day 9 baselines.',
    instructions: 'Read a new article or book chapter for exactly 5 minutes using your guide. Apply everything you have learned: guide technique, reduced regression, expanded fixations, previewing the material before starting. Count your total words when done.',
    wordCount: 0,
    comprehensionQuestions: [
      {
        question: 'What strategy should you apply BEFORE starting your timed reading?',
        options: ['Close your eyes for 1 minute', 'Preview the material — scan headings, structure, and first/last paragraphs', 'Read the last page first', 'Count the words'],
        correctIndex: 1,
      },
      {
        question: 'During reading, your guide should move:',
        options: ['At a constant slow pace', 'Smoothly and slightly faster than fully comfortable', 'Word by word', 'Only across difficult sections'],
        correctIndex: 1,
      },
      {
        question: 'If you notice yourself regressing, you should:',
        options: ['Stop and start over', 'Accept it, trust your brain caught it the first time, and push forward', 'Slow down dramatically', 'Close the book'],
        correctIndex: 1,
      },
      {
        question: 'Optimal learning period length before a break is:',
        options: ['5 minutes', '10 minutes', '20-50 minutes', '3 hours'],
        correctIndex: 2,
      },
      {
        question: 'By this point in training, a speed increase of what percentage is typical?',
        options: ['0% — no change is possible', '10-20%', '30-100% or more', 'Exactly 50%'],
        correctIndex: 2,
      },
    ],
  },

  // === Chapter 11: Mind Mapping (Days 25-26) ===
  {
    id: 25, day: 25, title: 'Mind Mapping Principles',
    type: 'multipleChoice',
    prompt: 'Mind Mapping transforms how you take notes and retain information from reading. Learn the rules.',
    questions: [
      {
        question: 'In a Mind Map, the central image should be:',
        options: [
          'A bullet point list',
          'A coloured image representing the main topic, placed in the center of the page',
          'The title written in a box',
          'A table of contents',
        ],
        correctIndex: 1,
      },
      {
        question: 'Mind Map branches should contain:',
        options: [
          'Full sentences',
          'Long paragraphs',
          'One Key Word per line/branch',
          'Complete chapter summaries',
        ],
        correctIndex: 2,
      },
      {
        question: 'Why does one word per branch work better than phrases?',
        options: [
          'It saves paper',
          'Each word has enormous associative potential — a phrase limits the connections your brain can make',
          'It looks more artistic',
          'Phrases are too hard to write',
        ],
        correctIndex: 1,
      },
      {
        question: 'Main ideas in a Mind Map should be:',
        options: [
          'At the bottom of the page',
          'In larger letters on thick branches radiating from the center, with sub-ideas on thinner branches',
          'Listed numerically',
          'All the same size',
        ],
        correctIndex: 1,
      },
      {
        question: 'Mind Maps help speed reading because they:',
        options: [
          'Replace the need to read',
          'Provide a whole-brain summary that aids recall, review, and identifies Key Words for future reading',
          'Make books shorter',
          'Are only useful for students',
        ],
        correctIndex: 1,
      },
      {
        question: 'Which of these is a Mind Map rule?',
        options: [
          'Use only black ink',
          'Write in straight horizontal lines',
          'Use colours, images, and dimension wherever possible to aid memory',
          'Keep everything the same size',
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 26, day: 26, title: 'Create Your First Reading Mind Map',
    type: 'reflection',
    prompt: 'Create a Mind Map from something you read today. This is the key integration exercise — combining speed reading with powerful note-taking.',
    questions: [
      'Read a chapter or substantial article using all your speed reading techniques (guide, previewing, expanded fixations). Then create a Mind Map of the content. Describe what you put in the center and what the main branches are.',
      'List the Key Words you chose for your Mind Map. For each, explain why it is a good Key Word — does it trigger recall of the surrounding content? Is it evocative rather than generic?',
      'Compare your Mind Map to traditional linear notes you might have taken. How much space did each use? Which captures the relationships between ideas better? Which would be more useful for review in a week?',
    ],
  },

  // === Chapter 12: Advanced Reading Applications (Days 27-28) ===
  {
    id: 27, day: 27, title: 'Reading in the Real World',
    type: 'multipleChoice',
    prompt: 'Apply speed reading to everyday material: newspapers, magazines, and screens.',
    questions: [
      {
        question: 'The recommended approach to newspaper reading is:',
        options: [
          'Read every article from start to finish',
          'Decide your goals first, rapidly preview the whole paper, then selectively read articles of interest',
          'Only read headlines',
          'Read the newspaper backwards',
        ],
        correctIndex: 1,
      },
      {
        question: 'A "magazine blitz" involves:',
        options: [
          'Buying every magazine at the newsstand',
          'Rapidly flipping through all your magazines, tearing out pages of interest, discarding the rest, then sorting and reading the selected pages',
          'Speed reading one magazine per day',
          'Only reading the covers',
        ],
        correctIndex: 1,
      },
      {
        question: 'Most magazine articles follow a structure of:',
        options: [
          'Random paragraphs',
          'Tell \'m what you\'re gonna tell \'m, tell \'m, tell \'m what you told \'m (teaser, body, conclusion)',
          'Only bullet points',
          'Alphabetical order',
        ],
        correctIndex: 1,
      },
      {
        question: 'When reading on a computer screen, speed reading is helped by:',
        options: [
          'Making text as small as possible',
          'Using a meta-guide (chopstick or stylus) on the screen and taking breaks every 10-15 minutes',
          'Reading in a dark room',
          'Never scrolling — only using page down',
        ],
        correctIndex: 1,
      },
      {
        question: 'Newspaper reports should be read with the awareness that:',
        options: [
          'They are always 100% accurate',
          'Every report involves some bias — from the reporter\'s perspective, editors\' choices, and writing embellishments',
          'Only tabloids have bias',
          'Photos always match the story accurately',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 28, day: 28, title: 'Magazine Blitz & Screen Reading',
    type: 'reflection',
    prompt: 'Apply advanced reading techniques to your real-world reading today.',
    questions: [
      'Perform a "magazine blitz" or digital equivalent: Go through a magazine, news app, or your reading list. In under 15 minutes, preview everything, select only the articles worth reading in full (typically less than 10% of the total). What did you select and why?',
      'Read one article on a screen using a meta-guide (your cursor, a stylus, or your finger on a tablet). Set the metronome pace by scrolling at a fixed speed. Take a 1-minute break after 10 minutes. Compare this experience to your normal screen reading.',
      'Apply the MMOST technique to something you need to study: (1) Browse, (2) Set time/amount goals, (3) Mind Map prior knowledge, (4) Set objectives, then (5) Overview → Preview → Inview → Review. Describe your experience with each step.',
    ],
  },

  // === Chapter 13: Literature & Poetry (Day 29) ===
  {
    id: 29, day: 29, title: 'Reading Literature & Poetry',
    type: 'reflection',
    prompt: 'Speed reading enhances appreciation of literature by letting you perceive the deeper layers — not just the surface words.',
    questions: [
      'Choose a novel or short story and read a chapter using speed reading techniques. Then analyze it using the elements of literature: What is the plot? Theme? What is the author\'s standpoint? How do characters develop? What is the mood/atmosphere?',
      'Read a poem at normal speed, then again at speed, then slowly aloud. Buzan notes these three speeds reveal different layers. What did you notice at each speed? What imagery or symbolism emerged?',
      'Setting, imagery, symbolism, and use of language are all interconnected in literature. Pick one passage from your reading today and show how at least two of these elements work together.',
    ],
  },

  // === Chapter 14: Your Speed Reading Future (Day 30) ===
  {
    id: 30, day: 30, title: 'Final Speed Test & Master Plan',
    type: 'speedLog',
    prompt: 'Your final assessment. Measure how far you have come and create your ongoing speed reading practice plan.',
    instructions: 'Read a new chapter or article for exactly 5 minutes. Apply ALL techniques: previewing, guide, expanded fixations, minimal regression, Key Word awareness. Count your total words. Then compare to your Day 7 baseline, Day 9 post-technique test, and Day 24 mid-program test.',
    wordCount: 0,
    comprehensionQuestions: [
      {
        question: 'The five-step MMOST reading technique in order is:',
        options: [
          'Read, Write, Review, Test, Forget',
          'Browse, Time/Amount, Prior Knowledge Mind Map, Goals, then Overview → Preview → Inview → Review',
          'Skim, Read, Skim again, Highlight, Copy',
          'Preview, Read, Summarize, Quiz, Repeat',
        ],
        correctIndex: 1,
      },
      {
        question: 'To continue improving your reading speed after this program, you should:',
        options: [
          'Stop practicing — you have peaked',
          'Practice daily with a guide, build your vocabulary, Mind Map your reading, and progressively push your speed',
          'Only read easy material',
          'Re-read this program monthly',
        ],
        correctIndex: 1,
      },
      {
        question: 'A Knowledge File is:',
        options: [
          'A computer backup drive',
          'A personal organized collection of Mind Maps, articles, and notes sorted by topic — your external brain',
          'A school report card',
          'A filing cabinet for receipts',
        ],
        correctIndex: 1,
      },
      {
        question: 'The most important single change for continued speed reading improvement is:',
        options: [
          'Buying expensive software',
          'Consistently using a guide every time you read',
          'Reading only short articles',
          'Avoiding difficult material',
        ],
        correctIndex: 1,
      },
      {
        question: 'The potential capacity of the human brain for learning is:',
        options: [
          'Strictly limited and mostly used up',
          'Effectively infinite — we use a tiny fraction of our potential',
          'Fixed at birth and unchangeable',
          'Determined entirely by genetics',
        ],
        correctIndex: 1,
      },
    ],
  },
]

export const chapters: SRChapter[] = [
  {
    id: 1,
    title: 'Your Reading Brain',
    days: [1, 2],
    reading: `When you read, your eyes do not glide smoothly across each line. Instead, they make a series of small jumps called saccades, pausing briefly at each stop to take in information. Each pause is called a fixation. During a fixation, your brain absorbs a group of words — but how many words per fixation depends entirely on training.

An untrained reader typically makes many small fixations, absorbing only one or two words at a time, with frequent backward jumps (regressions) to re-read material. This results in an average speed of about 200-250 words per minute. But this speed is not a limit — it is simply the result of untrained habits.

Your peripheral vision plays a crucial role. Even when your eye focuses on one word, it can actually perceive several words on either side. A trained reader leverages this, taking in whole phrases or even lines in a single fixation. Combined with reduced regression and a steady rhythm, speeds of 400-1000+ wpm with strong comprehension become achievable.

Speed reading is not about skipping content or sacrificing understanding. Research consistently shows that speed and comprehension can improve together. Faster reading actually aids concentration — your brain stays engaged because it is not waiting around for the next word. Think of it like driving: highway speed demands attention, while crawling through traffic invites mind-wandering.`,
  },
  {
    id: 2,
    title: 'The Speed Reading Environment',
    days: [3, 4],
    reading: `Your physical reading setup has an enormous impact on speed and comprehension. Poor lighting alone can reduce reading speed by up to 50%. The ideal setup includes: bright, even lighting (natural light is best), your reading material positioned at about 50cm from your eyes and tilted at a slight angle (about 45 degrees), and an upright seated posture with feet flat on the floor.

The single most powerful technique in speed reading is the use of a visual guide — a pen, slim pointer, chopstick, or even your finger. The guide serves as a pacer for your eyes, giving them a smooth, consistent path to follow. It eliminates random wandering and dramatically reduces regression (backward eye movement). Move the guide smoothly under each line at a pace slightly faster than feels comfortable.

Despite traditional teaching that finger-pointing slows you down, this is one of the great misconceptions in reading education. Every study on the subject confirms that a visual guide maintains focus, increases speed, and improves concentration. The slight disadvantage (your hand partially blocks the view) is vastly outweighed by the benefits.

Start using your guide on everything you read from today forward. It will feel awkward for a day or two, then become natural. Within a week, reading without a guide will feel strange.`,
  },
  {
    id: 3,
    title: 'Eye Movements & Perception',
    days: [5, 6, 7],
    reading: `The key to faster reading lies in your fixation patterns. A slow reader makes 5-10+ fixations per line, absorbing one or two words at each stop. An efficient reader makes 2-3 fixations per line, absorbing groups of 3-5 words at each stop. The goal is to reduce your fixation count while expanding the word group you absorb at each stop.

To train this, practice focusing on the center of a line and using peripheral vision to capture words on either side. Start with short lines (newspaper columns are ideal) where you can take in an entire line in one or two fixations. Gradually work with wider text.

Back-skipping and regression are two related but distinct problems. Regression is conscious — you deliberately go back to re-read something. Back-skipping is unconscious — your eyes automatically jump backward without your awareness. Studies show that when readers are prevented from going back, their comprehension remains the same or even improves. The reason? Most regression is driven by lack of confidence, not actual misunderstanding. Your brain usually did absorb the content the first time.

A metronome can be a powerful training tool. Set it to a steady beat and pace your eye movements to it, making one fixation per beat. Start at a comfortable speed, then gradually increase the tempo. This builds consistent rhythm and trains your eyes to move forward without hesitation. You can also use your guide as a rhythm tool, sweeping it across lines at a steady pace.`,
  },
  {
    id: 4,
    title: 'Overcoming Reading Problems',
    days: [8, 9],
    reading: `Sub-vocalization — the habit of "hearing" or silently "speaking" each word as you read — is the most common barrier to speed. It ties your reading speed to your speaking speed (about 200-250 wpm), creating a hard ceiling. However, the solution is not to eliminate sub-vocalization entirely. You can benefit from sub-vocalizing important Key Words and concepts while letting filler words pass through silently.

The best way to reduce sub-vocalization is simply to read faster. When you push your speed beyond your speaking rate, your inner voice cannot keep up and naturally falls away. You can also consciously increase the "volume" of your sub-vocalization on important words while muting it on connecting words like "the," "and," "is."

Regression and back-skipping together can consume up to 20% of your reading time. The cure is twofold: First, use your guide consistently — it gives your eyes a forward-moving target. Second, gradually push your speed up. At higher speeds, your brain has less time to trigger the regression reflex, and the rhythm of the guide keeps your eyes moving forward.

The traditional advice to "read slowly and carefully" for difficult material is counterproductive. Reading too slowly breaks the natural rhythm of language, makes concentration harder, and actually reduces comprehension. When you encounter difficult material, vary your speed — push through quickly for overview, then come back for detail — rather than crawling through at a snail's pace.`,
  },
  {
    id: 5,
    title: 'Vocabulary Power I — Prefixes',
    days: [10, 11, 12],
    reading: `Vocabulary is one of the most powerful predictors of reading speed and comprehension. When you know a word, your eyes fly past it. When you encounter an unfamiliar word, your brain stalls — breaking rhythm, triggering regression, and disrupting concentration. Building vocabulary is building speed.

Most of us have three vocabularies: our spoken vocabulary (the smallest, often under 1,000 words in daily use), our written vocabulary (somewhat larger), and our recognition vocabulary (the largest — words we understand when we encounter them). The gap between these is enormous, and the fastest way to close it is to learn word parts.

A prefix is a letter group placed at the beginning of a word to modify its meaning. Learning just 14 key prefixes gives you access to over 14,000 words in a standard dictionary. Dr. Minninger of the University of Minnesota estimated that these 14 "power prefixes" alone offer the keys to 14,000 word meanings.

The 14 power prefixes are: pre- (before), de- (from/down), inter- (between), mono- (one), epi- (upon), mis- (wrong), re- (again/back), non- (not), trans- (across), over- (above), com-/con- (together), ex- (out), in-/im- (not/into), and sub- (under). As you read from now on, actively look for prefixes. You will find them in almost every sentence, and recognizing them will instantly unlock word meanings.`,
  },
  {
    id: 6,
    title: 'Vocabulary Power II — Suffixes',
    days: [13, 14, 15],
    reading: `While prefixes modify the beginning of a word, suffixes are letters or syllables placed at the end. Many suffixes are concerned with characteristics, qualities, or changing one part of speech into another (for example, turning an adjective into an adverb with "-ly").

Suffixes are your key to instantly identifying a word's function in a sentence. If a word ends in "-tion" or "-ment," it is almost certainly a noun (an action or result). If it ends in "-ous" or "-ful," it is an adjective (describing a quality). If it ends in "-ly," it is likely an adverb. If it ends in "-ify" or "-ize," it is a verb (an action of making or becoming).

This instant part-of-speech recognition is enormously valuable for speed reading. When you skim, you can quickly identify the nouns (topics and objects) and verbs (actions and changes) in a passage, skipping over less critical modifiers. This selective attention is what allows expert readers to extract meaning at very high speeds.

Like prefixes, most English suffixes derive from Latin and Greek. By learning approximately 50 common suffixes, you gain the ability to decode the function and meaning of thousands of words you have never seen before. Combined with your prefix knowledge, you now have powerful tools for the beginning and ending of any word.`,
  },
  {
    id: 7,
    title: 'Vocabulary Power III — Roots',
    days: [16, 17, 18],
    reading: `Roots are the core building blocks from which words grow. While prefixes modify the beginning and suffixes modify the ending, the root carries the fundamental meaning. Most English roots come from Latin and Greek, and learning approximately 50 common roots gives you the ability to decode an enormous portion of the English language.

For example, the root "scrib/script" means "write." From this single root, you can understand: describe (write about), inscribe (write on), manuscript (handwritten), prescription (written before), scripture (sacred writing), and dozens more. Each root is a master key that unlocks a family of words.

Five steps for continuing vocabulary improvement: First, study word parts systematically (as you are doing now). Second, add at least one new word to your vocabulary every day. Third, be alert for unfamiliar words in your reading — underline them and look them up later. Fourth, keep a record of noteworthy examples. And fifth, use your new words in conversation and writing as soon as possible — words you use actively become permanent.

The pen is mightier than the sword — but only if the brain behind it knows how to wield the word. Your growing vocabulary is not just a speed reading tool — it is a thinking tool. Every new word you learn is a new concept your brain can work with, a new connection it can make, and a new precision it can bring to communication.`,
  },
  {
    id: 8,
    title: 'Paragraph Structure',
    days: [19, 20],
    reading: `By understanding the structure of paragraphs, you gain enormous power to skim efficiently and comprehend deeply. There are three main types of paragraphs, and recognizing them instantly tells you where to focus your attention.

Explanatory paragraphs set out to explain a concept or point of view. They are easy to recognize: the first sentence or two gives the general idea, the last sentence or two contains the conclusion, and the middle fills in the details. When skimming, focus on the first and last sentences.

Descriptive paragraphs expand on or embellish ideas that have already been introduced. They are often less critical than explanatory paragraphs and can sometimes be skimmed quickly or even skipped when you are reading for the main argument.

Linking paragraphs join together sections of text, summarizing what has come before and introducing what follows. They are extremely valuable signposts — they tell you the structure of the author's argument and are excellent for previewing and reviewing. When you see a linking paragraph, pay attention: it is the author's own summary.

Two games to play while reading: First, the "Memory Word" game — for each paragraph, identify the main topic word and a secondary theme word. Second, identify whether each paragraph is introductory, transitional, or concluding. These games force active engagement and dramatically improve both speed and retention.`,
  },
  {
    id: 9,
    title: 'Previewing & Skimming',
    days: [21, 22],
    reading: `Previewing is your mental reconnaissance — knowing the map before entering the territory. The purpose is to build a framework in your mind so that when you do the full reading, each detail has a place to fit. Without a preview, each new piece of information floats in isolation. With a preview, it clicks into a structure.

Your preview approach should combine skimming and scanning. First, rapidly survey the material: read the title, subtitle, table of contents, headings, bold text, images, and first and last paragraphs. This takes just 2-5 minutes for a full book and gives you the skeleton. Then do a second, slightly deeper pass on sections that seem most important.

Three powerful strategies for active previewing: Apply What You Already Know — before reading, quickly brainstorm everything you already know about the topic, ideally as a Mind Map. This activates relevant neural pathways. Interact Actively with the Author — treat the text as a conversation, noting questions and reactions. Be a Detective — constantly predict what comes next, testing the author's plan against your expectations.

Previewing should be applied to everything you read — not just textbooks. Preview a novel before reading it (jacket, chapter titles, opening and closing paragraphs). Preview a newspaper before committing to articles. Preview emails before responding. The 2-5 minutes of previewing saves far more time in faster, more focused reading.`,
  },
  {
    id: 10,
    title: 'Concentration & Comprehension',
    days: [23, 24],
    reading: `Problems with concentration are caused not by inherent inability, but by the difficulties caused by incomplete education in reading. When you struggle to concentrate, it is not that your concentration has disappeared — it has simply redirected to something else. You are always concentrating on something.

Concentration can be likened to a wild stallion. It is enormously powerful and always in motion, going off at full gallop in whatever direction it pleases. Your job as a reader is not to create concentration (it is already there), but to rein it in and steer it toward the reading task at hand.

The main enemies of reading concentration are: vocabulary difficulties (unknown words create anxiety and gaps), conceptual difficulty (try reading faster, not slower), inappropriate speed (too slow is as bad as too fast), incorrect mental set (daydreaming about other things), poor organization (not having materials ready), lack of interest (try the "severe critic" approach), and lack of motivation (define why you are reading this).

Take breaks strategically. Research shows that recall is highest at the beginning and end of a study session, with a dip in the middle. The ideal learning period is 20-50 minutes before a 5-10 minute break. During the break, step away from the material — your brain continues to process and integrate the information subconsciously. Multiple short sessions with breaks will always outperform one long marathon session.`,
  },
  {
    id: 11,
    title: 'Mind Mapping',
    days: [25, 26],
    reading: `Traditional linear note-taking has three major problems: the note-taker misses the forest for the trees, it prevents objective analysis during reading, and the volume of notes becomes so large that revising is nearly as time-consuming as re-reading the original.

The Mind Map is a revolutionary alternative. Instead of linear sentences, you place a central image representing the main topic in the center of the page, then branch out using Key Words, colours, and images. Main ideas go on thick branches radiating from the center, with sub-ideas on thinner branches extending from them.

The rules of Mind Mapping: (1) Start with a coloured image in the center. (2) Main ideas branch off from the center. (3) Main ideas should be in larger letters than secondary ideas. (4) Always use one Key Word per line. (5) Words should be printed on the lines. (6) Lines should be connected and the same length as the word. (7) Use colours throughout. (8) Use as many images as possible. (9) Use dimension and variety. (10) Use numbers or codes for ordering. (11) Use arrows, symbols, and connectors.

A single Mind Map can summarize an entire book on one page. When used in conjunction with speed reading, it creates a powerful feedback loop: speed reading gives you the overview needed to construct the map, and the map gives you the structure needed to speed read the material more effectively on subsequent passes. Mind Maps multiply your reading efficiency by a factor of three or more.`,
  },
  {
    id: 12,
    title: 'Advanced Reading Applications',
    days: [27, 28],
    reading: `Newspapers, magazines, and computer screens make up more than 50% of most people's reading — and often more than 90% in professional settings. Applying speed reading to these everyday materials yields enormous time savings.

For newspapers: always preview first. Decide what you want from the paper, rapidly skim the whole thing (noting layout and headlines), then selectively read articles of interest using the guide technique. Remember that all news reporting involves bias — the reporter's perspective, editorial choices, and the natural embellishment of writing. Read critically, comparing with other sources.

For magazines: try the monthly "magazine blitz." Gather all your accumulated magazines, set a metronome to 60 beats per minute, and force yourself to turn pages at that speed. Rip out only the pages that truly interest you, discarding everything else. In most cases, only 2-10% of the magazine is actually relevant to you. Sort the selected pages by topic, then read them properly.

The Mind Map Organic Study Technique (MMOST) integrates all your skills for deep study: Preparation (browse, set time goals, Mind Map prior knowledge, establish goals) followed by Application (Overview, Preview, Inview, Review). This five-step process applies speed reading, Mind Mapping, and active learning to produce thorough understanding in a fraction of the time traditional study takes.`,
  },
  {
    id: 13,
    title: 'Literature & Poetry',
    days: [29],
    reading: `Many people believe speed reading cannot apply to literature and poetry. Nothing could be further from the truth. A novel can be compared to an ocean — little waves (words) carry larger waves (sentences), which carry still larger waves (paragraphs, chapters, themes). Speed reading lets you perceive the larger waves that a word-by-word reader misses entirely.

When reading literature, be aware of these elements: Plot (the storyline), Theme (the underlying ideas), Standpoint (the author's perspective), Character Development (how characters change), Mood and Atmosphere (the emotional quality), Setting (time and place), Imagery (sensory descriptions and metaphors), Symbolism (objects representing ideas), and Use of Language (the author's style). All these elements are interconnected — the setting may be symbolic, the mood may reflect the theme, the language may mirror the character's development.

Poetry should be read in three passes at different speeds: first a rapid preview to get the overall shape and subject, then a more thorough reading at moderate speed to see how ideas and rhythms connect, and finally a slow reading aloud to appreciate the full musicality and meaning. Speed is not irrelevant when it comes to literature — it is a tool you choose to deploy at the right moments. The speed reader has the ability to vary their pace for maximum appreciation, rather than being stuck at one speed for everything.`,
  },
  {
    id: 14,
    title: 'Your Speed Reading Future',
    days: [30],
    reading: `You now possess a complete toolkit for reading mastery: the guide technique, expanded peripheral vision, reduced regression, vocabulary building through word parts, paragraph structure awareness, previewing and skimming, concentration management, Mind Mapping, and the MMOST study technique.

The human brain is a galaxy of potential. Each of its ten billion nerve cells is capable of forming thousands of connections with others. The number of potential patterns of connections is effectively infinite. Every time you read, you are not just absorbing information — you are physically growing new neural pathways, strengthening connections, and expanding the associative network that is your mind.

Your continuing success depends on one thing: practice. Use your guide every time you read — not just when "doing speed reading exercises." Push your speed regularly, even if comprehension dips temporarily (it will bounce back as your brain adapts). Build your vocabulary daily. Mind Map your important reading. Preview everything. And keep tracking your speed periodically to see your progress.

The average person who completes a structured speed reading program and continues to practice can expect to at least double their reading speed while maintaining or improving comprehension. Many achieve far more. But the true benefit is not just speed — it is the confidence, comprehension, and joy that come from being a masterful reader. The more efficiently you read, the more you read. The more you read, the more you know. The more you know, the more connections your brain can make. It is an upward spiral without limit.`,
  },
]

export function getExercise(day: number): SRExercise | undefined {
  return exercises.find(e => e.day === day)
}

export function getChapterForDay(day: number): SRChapter | undefined {
  return chapters.find(ch => ch.days.includes(day))
}
