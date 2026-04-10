import type { MMExercise, MMChapter } from '../types/maximizeMemory'

export const TOTAL_DAYS = 45

export const exercises: MMExercise[] = [
  // ╔══════════════════════════════════════════════════════════════╗
  // ║  Chapter 1: The Mind and Memory (Days 1-4)                  ║
  // ╚══════════════════════════════════════════════════════════════╝
  {
    id: 1, day: 1, title: 'Types of Memory',
    type: 'multipleChoice',
    prompt: 'Understand how your mind stores and retrieves information — the foundation of all memory training.',
    questions: [
      { question: 'The conscious mind is responsible for:', options: ['Storing all memories permanently', 'Voluntary reasoning, analysis, and decision-making', 'Breathing and heart rate', 'Dreaming'], correctIndex: 1 },
      { question: 'The subconscious mind:', options: ['Only works during sleep', 'Records everything we perceive, even what we are not consciously aware of', 'Cannot influence memory', 'Is the same as the conscious mind'], correctIndex: 1 },
      { question: 'Short-term memory lasts approximately:', options: ['A few seconds', 'Several hours', 'One week', 'Permanently'], correctIndex: 0 },
      { question: 'Mid-term memory stores information for:', options: ['A few seconds only', 'Minutes to days — like cramming for an exam', 'Years at a time', 'Permanently with no decay'], correctIndex: 1 },
      { question: 'Long-term memory is characterized by:', options: ['Rapid decay within hours', 'Information stored almost permanently, accessible for life', 'Only storing emotional events', 'Being impossible to train'], correctIndex: 1 },
      { question: 'Memory is best defined as:', options: ['The ability to read quickly', 'The ability to store information and retrieve it when needed', 'A fixed genetic trait', 'Photographic recall of everything'], correctIndex: 1 },
    ],
  },
  {
    id: 2, day: 2, title: 'Types of Memorizable Facts',
    type: 'multipleChoice',
    prompt: 'Not all information is memorized the same way. Identifying the type of fact determines the best memorization strategy.',
    questions: [
      { question: 'Pure facts (dates, phone numbers, formulas) are best memorized by:', options: ['Reading them once', 'Association techniques since they have no inherent logic connecting them', 'Simply understanding them', 'Writing them once'], correctIndex: 1 },
      { question: 'Sequential facts (processes, stories, timelines) are:', options: ['Impossible to memorize', 'Connected in a chain — each fact leads logically to the next', 'Always pure facts', 'Only visual'], correctIndex: 1 },
      { question: 'A "photographic flash" in memory refers to:', options: ['Taking a photo of your notes', 'A vivid visual snapshot stored by the subconscious in a fraction of a second', 'A camera technique', 'Reading with a flashlight'], correctIndex: 1 },
      { question: 'The five senses that create sensory memories are:', options: ['Only sight and hearing', 'Visual, auditory, kinesthetic (touch), olfactory (smell), and gustatory (taste)', 'Visual and kinesthetic only', 'None — memory is not sensory'], correctIndex: 1 },
      { question: 'Focal points in memorization are:', options: ['Unimportant details', 'The starting point and ending point of what you need to memorize — your anchors', 'Random words you highlight', 'The first word of each page'], correctIndex: 1 },
    ],
  },
  {
    id: 3, day: 3, title: 'Memorization Direction & Focal Points',
    type: 'reflection',
    prompt: 'Practice identifying the type of facts you encounter and setting up focal points for memorization.',
    questions: [
      'Pick 5 things you need to remember this week (appointments, facts, tasks). Classify each as a pure fact, sequential fact, or sensory memory. How does the classification change your approach to remembering it?',
      'For each of the 5 items, identify the focal points: what is the starting anchor and the ending anchor? For example, for a phone number, the focal points might be the area code (start) and last digit (end).',
      'Campayo says memorization direction matters — you should always memorize from start to finish, never jump around. Take a list of 10 items (grocery list, to-do list, etc.) and practice memorizing them strictly in order, using the starting focal point as your trigger. How did it go?',
    ],
  },
  {
    id: 4, day: 4, title: 'The Four Memorization Systems',
    type: 'multipleChoice',
    prompt: 'Campayo identifies four distinct memorization systems, each with different strengths and applications.',
    questions: [
      { question: 'The repetition system works by:', options: ['Deep understanding', 'Repeating information over and over until it sticks — simple but weak for long-term retention', 'Creating vivid mental images', 'Logical reasoning'], correctIndex: 1 },
      { question: 'The reasoning system helps memory because:', options: ['It replaces the need to study', 'Understanding WHY something is true creates logical connections that aid recall', 'It only works for math', 'It is the fastest method'], correctIndex: 1 },
      { question: 'The far-fetched association system (Campayo\'s core technique) works by:', options: ['Memorizing through logic alone', 'Creating absurd, exaggerated, action-filled mental images that link items together', 'Simply reading more carefully', 'Copying notes multiple times'], correctIndex: 1 },
      { question: 'Why must associations be "far-fetched" (absurd/exaggerated)?', options: ['Because normal associations are boring', 'Because the brain flags unusual, emotional, and surprising events for long-term storage', 'Because it is more fun', 'There is no scientific basis for this'], correctIndex: 1 },
      { question: 'Motivation in memorization:', options: ['Is irrelevant — technique is everything', 'Directly affects how well the subconscious cooperates in storing information', 'Only matters for students', 'Cannot be trained'], correctIndex: 1 },
      { question: 'The "total memorization" system combines:', options: ['Only repetition', 'All available methods: repetition, reasoning, and association together for maximum effect', 'Only association', 'Random techniques'], correctIndex: 1 },
    ],
  },

  // ╔══════════════════════════════════════════════════════════════╗
  // ║  Chapter 2: Supermemory (Days 5-14)                         ║
  // ╚══════════════════════════════════════════════════════════════╝
  {
    id: 5, day: 5, title: 'Mental Charts Introduction',
    type: 'multipleChoice',
    prompt: 'The mental chart is a system that converts abstract numbers into vivid images using consonant sounds.',
    questions: [
      { question: 'In the number-consonant system, each digit (0-9) maps to:', options: ['A vowel sound', 'A specific consonant sound that never changes', 'A random word', 'A color'], correctIndex: 1 },
      { question: 'To form a memorable word from consonants, you:', options: ['Only use consonants', 'Add vowels between the consonants — vowels have no numeric value', 'Replace consonants with vowels', 'Use only single-letter words'], correctIndex: 1 },
      { question: 'The purpose of the mental chart is to:', options: ['Replace the need for memory', 'Convert abstract numbers into concrete, vivid mental images you can link with far-fetched associations', 'Make math easier', 'Create a secret code'], correctIndex: 1 },
      { question: 'Once you have a word for each number, you memorize number sequences by:', options: ['Repeating the words', 'Creating a far-fetched association chain linking the image-words together', 'Writing them down', 'Using a calculator'], correctIndex: 1 },
      { question: 'The mental chart system can be extended to:', options: ['Only single digits', 'Two-digit numbers (00-99) and beyond, creating a full library of image-words', 'Only the numbers 1-10', 'Letters only'], correctIndex: 1 },
    ],
  },
  {
    id: 6, day: 6, title: 'Number-Consonant Associations',
    type: 'matchPairs',
    prompt: 'Match each digit to its consonant sound. This is the foundation of the entire mental chart system.',
    pairs: [
      { left: '0', right: 'R' },
      { left: '1', right: 'T / D' },
      { left: '2', right: 'N' },
      { left: '3', right: 'M' },
      { left: '4', right: 'C / K / Q' },
      { left: '5', right: 'L' },
      { left: '6', right: 'S / Z' },
      { left: '7', right: 'F / V' },
      { left: '8', right: 'G / J / Ch' },
      { left: '9', right: 'B / P' },
    ],
  },
  {
    id: 7, day: 7, title: 'Creating Your Mental Chart 0-9',
    type: 'reflection',
    prompt: 'Create a vivid image-word for each digit 0-9 using the consonant system. These become your permanent mental anchors.',
    questions: [
      'Create a word for each digit: 0 (R), 1 (T/D), 2 (N), 3 (M), 4 (C/K), 5 (L), 6 (S/Z), 7 (F/V), 8 (G/J), 9 (B/P). Examples: 0=Ray, 1=Tie, 2=Noah, 3=Ma, 4=Car, 5=Law, 6=Shoe, 7=Fly, 8=Jaw, 9=Bee. Write your chosen words and describe the mental image for each.',
      'Test yourself: cover your list and try to recall all 10 words in order. Then try in reverse. Then try random: what is 7? What is 3? What is 0? How many did you get right?',
      'Create a short far-fetched story linking your words 0-9 in sequence. For example: "A Ray (0) of light hits a Tie (1) hanging from Noah\'s (2) ark where Ma (3) is driving a Car (4)..." Write your complete story.',
    ],
  },
  {
    id: 8, day: 8, title: 'Mental Chart Recall Test',
    type: 'timedRecall',
    items: ['0 = Ray', '1 = Tie', '2 = Noah', '3 = Ma', '4 = Car', '5 = Law', '6 = Shoe', '7 = Fly', '8 = Jaw', '9 = Bee'],
    studySeconds: 30,
    prompt: 'Test your recall of the basic mental chart. Can you remember all 10 number-word pairs?',
    instructions: 'Study these number-word associations for 30 seconds, then recall them all in order.',
  },
  {
    id: 9, day: 9, title: 'Expanding the Chart: 10-19',
    type: 'matchPairs',
    prompt: 'Extend your mental chart to two-digit numbers. The first consonant = tens digit, second = ones digit. Vowels fill the gaps.',
    pairs: [
      { left: '10 (T+R)', right: 'ToRe / Tower' },
      { left: '11 (T+T)', right: 'TiDe / Toad' },
      { left: '12 (T+N)', right: 'TiN / Tune' },
      { left: '13 (T+M)', right: 'ToMb / Time' },
      { left: '14 (T+C)', right: 'TaCK / Tick' },
      { left: '15 (T+L)', right: 'TaLe / Tile' },
      { left: '16 (T+S)', right: 'TiSSue' },
      { left: '17 (T+F)', right: 'TaFFy' },
      { left: '18 (T+G)', right: 'TiGer / Tag' },
      { left: '19 (T+B)', right: 'TuBe / Tab' },
    ],
  },
  {
    id: 10, day: 10, title: 'The Power of Far-Fetched Associations',
    type: 'multipleChoice',
    prompt: 'Master the golden rules of far-fetched association — the single most powerful memory technique.',
    questions: [
      { question: 'The key ingredients of a far-fetched association are:', options: ['Logic and order', 'Absurdity, exaggeration, action/motion, and personal involvement', 'Simplicity and realism', 'Repetition and review'], correctIndex: 1 },
      { question: 'Why is ACTION crucial in associations?', options: ['It burns calories', 'Moving, dynamic images are stored far more powerfully than static ones by the brain', 'It is not important', 'Only because Campayo says so'], correctIndex: 1 },
      { question: 'To remember "bread → elephant," a good association would be:', options: ['Bread is food, elephants eat food', 'An elephant surfing on a giant baguette while juggling loaves — absurd and vivid', 'Write "bread elephant" 10 times', 'Bread and elephant both have letters'], correctIndex: 1 },
      { question: 'Associations must be PERSONAL because:', options: ['Other people might laugh', 'Only YOUR imagination creates the neural pathways — what is vivid to you is what you will recall', 'They need to be secret', 'There is only one correct association per pair'], correctIndex: 1 },
      { question: 'The brain flags unusual events for long-term storage because:', options: ['It likes comedy', 'Evolutionarily, unusual events could signal danger or opportunity and needed to be remembered', 'Unusual events are common', 'There is no evolutionary basis'], correctIndex: 1 },
    ],
  },
  {
    id: 11, day: 11, title: 'Creating Mental Videos',
    type: 'reflection',
    prompt: 'Practice creating far-fetched association chains — linking items into a vivid "mental video" story.',
    questions: [
      'Create a far-fetched chain linking these 10 words: BOOK, FOUNTAIN, GIRAFFE, VOLCANO, PIANO, SPIDER, BICYCLE, DIAMOND, CLOUD, TELEPHONE. Write each absurd link (e.g., "A book opens and a fountain of lava erupts, scalding a giraffe...")',
      'Close your eyes and replay your "mental video" from start to finish. Could you see each scene vividly? Which links were strongest? Which were weakest? Strengthen the weak ones by making them more absurd.',
      'Now test yourself: without looking at your notes, write all 10 words in order. How many did you recall correctly? The goal is 10/10.',
    ],
  },
  {
    id: 12, day: 12, title: 'Association Chain Challenge',
    type: 'chainLinking',
    prompt: 'Practice the linking technique with guided associations, then create your own to memorize 15 words.',
    instructions: 'You will first see vivid, far-fetched associations for 7 word pairs. Visualize each scene as vividly as possible. Then you will create your own associations for the remaining pairs. Finally, recall all 15 words in order — each word should trigger the next.',
    guidedChain: {
      words: ['Hammer', 'Butterfly', 'Mountain', 'Guitar', 'Moon', 'Dragon', 'Waterfall', 'Crown'],
      associations: [
        'A massive hammer crashes down on a table, but instead of breaking it, thousands of colorful butterflies burst out from underneath. Their wings buzz so loudly you cover your ears as they fill the entire room.',
        'A single butterfly grows to the size of a jumbo jet and grabs an entire snow-capped mountain with its tiny legs. It lifts off, flapping hard — boulders tumble off as it flies across the sky.',
        'The mountain splits open down the middle, revealing a colossal guitar inside. Rivers of snowmelt rush down the strings, producing thunderous chords that echo for miles across the valley.',
        'A guitarist strums so violently that the sound wave rockets into space and cracks the Moon in half. The two halves slowly drift apart while the guitar strings glow white-hot.',
        'The cracked Moon hatches open like an egg and a massive dragon crawls out. It unfurls wings covered in craters and roars — streams of moonlight pour from its mouth instead of fire.',
        'The dragon opens its jaws to breathe fire, but instead a tremendous waterfall of crystal-clear water gushes out, crashing down into a valley below and flooding an entire village.',
        'At the base of the waterfall, a jeweled golden crown sits on a rock. The rushing water polishes it so brightly that it sends blinding golden reflections in every direction, like a disco ball.',
      ],
    },
    independentWords: ['Lighthouse', 'Compass', 'Eagle', 'Crystal', 'Thunder', 'Violin', 'Castle'],
  },
  {
    id: 13, day: 13, title: 'The 20-Item Supermemory Challenge',
    type: 'chainLinking',
    prompt: 'Your supermemory challenge — 20 items! Fewer guided links this time. Push your association skills.',
    instructions: 'This time you get only 5 guided associations to warm up. Then you must create your own vivid links for the remaining 14 pairs. The key: make each scene absurd, exaggerated, and full of action. After linking, recall all 20 words in sequence.',
    guidedChain: {
      words: ['Elephant', 'Candle', 'Submarine', 'Strawberry', 'Pyramid', 'Telescope'],
      associations: [
        'An elephant balances on its hind legs atop a birthday cake, trying to blow out a single candle with its trunk. The candle fights back, shooting flames like a flamethrower and singeing the elephant\'s ears.',
        'The melting candle drips wax into the ocean, and the wax hardens into a submarine. The wick becomes the periscope, still flickering with a tiny flame as the submarine dives underwater.',
        'The submarine surfaces and its hatch opens. A giant strawberry wearing a captain\'s hat pops out, saluting. Seeds fall off it like buttons popping from a too-tight uniform.',
        'The giant strawberry rolls across the desert, leaving a trail of red juice in the sand, until it crashes into the Great Pyramid and lodges at the very top like a bright red capstone.',
        'The Pyramid\'s pointed tip suddenly telescopes upward like a giant brass telescope extending into the stars. An astronomer peers through the Pyramid\'s base and gasps at distant galaxies.',
      ],
    },
    independentWords: ['Whale', 'Lantern', 'Cactus', 'Parachute', 'Hourglass', 'Volcano', 'Butterfly', 'Anchor', 'Meteor', 'Windmill', 'Scorpion', 'Crystal Ball', 'Labyrinth', 'Phoenix'],
  },
  {
    id: 14, day: 14, title: 'Supermemory Assessment',
    type: 'multipleChoice',
    prompt: 'Review all the key concepts from the Supermemory chapter.',
    questions: [
      { question: 'In the consonant system, the number 42 would use which consonants?', options: ['F and N', 'C/K and N', 'S and M', 'T and R'], correctIndex: 1 },
      { question: 'Why must far-fetched associations be ABSURD?', options: ['For entertainment', 'Because the brain prioritizes unusual/surprising information for long-term storage', 'No real reason', 'To confuse the subconscious'], correctIndex: 1 },
      { question: 'When creating a mental video chain, each link should:', options: ['Be as realistic as possible', 'Involve vivid action — things crashing, exploding, transforming — the more dynamic the better', 'Be written down in a notebook', 'Use only words, no images'], correctIndex: 1 },
      { question: 'The mental chart for two-digit numbers works by:', options: ['Memorizing 100 random words', 'Using the first consonant for the tens digit and second consonant for the ones digit, with vowels filling gaps', 'Using colors for each number', 'Mathematical formulas'], correctIndex: 1 },
      { question: 'A trained memorizer using these techniques can recall:', options: ['At most 10 items', '20, 50, or even 100+ items in perfect order', 'Only numbers, not words', 'Nothing without writing it down'], correctIndex: 1 },
    ],
  },

  // ╔══════════════════════════════════════════════════════════════╗
  // ║  Chapter 3: Photographic Reading (Days 15-19)               ║
  // ╚══════════════════════════════════════════════════════════════╝
  {
    id: 15, day: 15, title: 'Reading Defects Self-Assessment',
    type: 'reflection',
    prompt: 'Campayo identifies several common reading defects that slow you down and harm comprehension. Assess yourself honestly.',
    questions: [
      'Rate yourself 1-5 on each defect: (a) Regression — re-reading passages, (b) Sub-vocalization — hearing words in your head, (c) Linear word-by-word reading, (d) Mental fatigue — losing concentration quickly, (e) Poor posture/lighting. Which is your biggest weakness?',
      'Campayo says reading too slowly actually HARMS comprehension because the brain loses focus. Time yourself reading one page at your natural speed. How many words per minute? Do you agree that slow reading causes mind-wandering?',
      'Try reading one paragraph using a pen as a visual guide, moving it slightly faster than comfortable. Describe the experience. Did you notice reduced regression? Could you still comprehend the content?',
    ],
  },
  {
    id: 16, day: 16, title: 'Photographic Reading Principles',
    type: 'multipleChoice',
    prompt: 'Campayo\'s photographic (ultra-rapid) reading technique leverages mental absorption and visual control.',
    questions: [
      { question: 'Mental absorption means:', options: ['Reading while distracted', 'Letting the subconscious process text without forcing conscious word-by-word reading', 'Absorbing a book by touching it', 'Speed reading software'], correctIndex: 1 },
      { question: 'A visual guide (pen/pointer) helps because:', options: ['It covers up distracting words', 'It controls eye movement, reduces regression, and maintains consistent reading speed', 'It looks professional', 'It has no real benefit'], correctIndex: 1 },
      { question: 'Reading too slowly is counterproductive because:', options: ['You run out of time', 'It breaks natural language rhythm and allows the mind to wander, reducing concentration and comprehension', 'Slow reading is always better', 'It tires your eyes'], correctIndex: 1 },
      { question: 'Background noise while reading:', options: ['Is always helpful', 'Classical music can aid concentration, but lyrics or conversation harm it', 'Has no effect at all', 'Should always be complete silence'], correctIndex: 1 },
      { question: 'The ideal reading conditions include:', options: ['Dim lighting and a soft bed', 'Good lighting (back to sunlight), comfortable upright position, no distractions, and all materials ready', 'Any position is fine', 'Reading in a moving vehicle'], correctIndex: 1 },
    ],
  },
  {
    id: 17, day: 17, title: 'Speed Reading Training I',
    type: 'speedLog',
    prompt: 'Establish your reading speed baseline and practice with a visual guide.',
    instructions: 'Read a non-fiction chapter for exactly 5 minutes. Use a pen as a guide, moving it slightly faster than comfortable. Resist the urge to re-read. Count total words when done.',
    wordCount: 0,
    comprehensionQuestions: [
      { question: 'Using a visual guide while reading:', options: ['Slows you down', 'Reduces regression and maintains consistent forward movement', 'Is only for children', 'Has no effect'], correctIndex: 1 },
      { question: 'If comprehension drops when reading faster, you should:', options: ['Give up', 'Accept temporary drops — your brain will adapt and comprehension recovers at the higher speed', 'Return to slow reading permanently', 'Read each sentence twice'], correctIndex: 1 },
      { question: 'The average untrained reader reads at approximately:', options: ['100 wpm', '200-250 wpm', '500 wpm', '1000 wpm'], correctIndex: 1 },
    ],
  },
  {
    id: 18, day: 18, title: 'Vertical and Diagonal Reading',
    type: 'reflection',
    prompt: 'Train your eyes to absorb text in unconventional patterns — expanding beyond line-by-line reading.',
    questions: [
      'Practice vertical reading on a newspaper column: let your eyes travel down the center while peripheral vision catches both sides. Read an entire article this way. How much did you comprehend compared to normal reading?',
      'Practice diagonal reading on a full-width page: sweep your eyes diagonally from top-left to bottom-right in a zigzag. Read 2 pages this way. Describe the experience.',
      'Compare: which technique (horizontal, vertical, diagonal) captured the most information for you? Campayo says the goal is flexibility — different materials call for different approaches.',
    ],
  },
  {
    id: 19, day: 19, title: 'Speed Reading Assessment',
    type: 'speedLog',
    prompt: 'Measure your improvement after training. Apply all techniques: guide, reduced regression, expanded peripheral vision.',
    instructions: 'Read a new chapter for exactly 5 minutes using ALL techniques. Compare to your Day 17 baseline.',
    wordCount: 0,
    comprehensionQuestions: [
      { question: 'Campayo recommends reading at a speed that is:', options: ['As slow as possible for maximum comprehension', 'Slightly faster than comfortable — pushing the boundary progressively', 'The same speed forever', 'Only fast for easy material'], correctIndex: 1 },
      { question: 'Regression while reading is most often caused by:', options: ['Poor eyesight', 'Lack of confidence in comprehension, not actual misunderstanding', 'Reading too fast', 'Using a guide'], correctIndex: 1 },
      { question: 'The key to photographic reading is:', options: ['Memorizing words photographically', 'Training the eyes and mind to absorb text efficiently through visual control and mental absorption', 'Taking photos of pages', 'Reading in bright flashes'], correctIndex: 1 },
    ],
  },

  // ╔══════════════════════════════════════════════════════════════╗
  // ║  Chapter 4: General Study System — R.C.S. (Days 20-31)     ║
  // ╚══════════════════════════════════════════════════════════════╝
  {
    id: 20, day: 20, title: 'The R.C.S. Study System Overview',
    type: 'multipleChoice',
    prompt: 'Campayo\'s Ramón Campayo System (R.C.S.) is a complete methodology for studying any subject.',
    questions: [
      { question: 'The R.C.S. study phases in order are:', options: ['Read, Write, Review', 'Read & Understand → Underline Key Points → Create Summary → Make Mental Map → Memorize → Review', 'Memorize first, understand later', 'Read once and hope for the best'], correctIndex: 1 },
      { question: 'Before memorizing, you should always:', options: ['Skip straight to memorization', 'First UNDERSTAND the material — memorization without understanding is fragile and inefficient', 'Copy the textbook word for word', 'Ask someone else to summarize'], correctIndex: 1 },
      { question: 'When underlining, you should:', options: ['Underline everything', 'Underline only key terms and core ideas — not entire sentences', 'Never underline', 'Use 5 different colors'], correctIndex: 1 },
      { question: 'Summaries should be:', options: ['Longer than the original', 'Handwritten, reducing the original by 60-75%, using black pen on ruled paper', 'Typed on a computer always', 'Exact copies of the textbook'], correctIndex: 1 },
      { question: 'Why does Campayo insist on HANDWRITING summaries?', options: ['Computers did not exist', 'Handwriting engages more brain regions (motor, visual, linguistic) and creates stronger memory traces than typing', 'It is faster', 'No particular reason'], correctIndex: 1 },
    ],
  },
  {
    id: 21, day: 21, title: 'Personalizing Subject Matter',
    type: 'reflection',
    prompt: 'The first step of R.C.S.: read for understanding, then make the material YOUR OWN through underlining and margin notes.',
    questions: [
      'Choose a chapter from any textbook or non-fiction book. Read it once for understanding — do NOT try to memorize anything. Write a 2-3 sentence summary of what the chapter is about.',
      'Go back through the chapter and underline ONLY the key terms, definitions, and core ideas. Use Campayo\'s rule: if you underline more than 25% of the text, you are underlining too much. How much did you underline?',
      'Write margin notes in YOUR OWN WORDS next to the underlined sections. Campayo says personalization is critical — the material must become yours, not the author\'s. Describe how this changed your understanding.',
    ],
  },
  {
    id: 22, day: 22, title: 'Creating Adapted Summaries',
    type: 'reflection',
    prompt: 'Transform your underlined material into a concise, handwritten summary — your primary study tool.',
    questions: [
      'From your underlined text (Day 21), create a HANDWRITTEN summary on paper. Rules: black pen, ruled paper, reduce by 60-75%. The summary should be independently understandable without the original. How long is it compared to the original?',
      'Campayo says to use highlighters on your summary to mark pure facts (dates, formulas) that need association techniques vs. sequential facts that flow naturally. Mark up your summary — how many pure facts vs. sequential facts did you find?',
      'Read your summary aloud. Does it flow? Can you understand it without the original text? If not, add connecting words or brief explanations. The summary is your primary study weapon — it must be clear and complete.',
    ],
  },
  {
    id: 23, day: 23, title: 'Mental Maps',
    type: 'multipleChoice',
    prompt: 'Mental maps (mind maps) provide a visual overview that reveals relationships between concepts.',
    questions: [
      { question: 'Mental maps differ from summaries because:', options: ['They are longer', 'Maps show RELATIONSHIPS between concepts visually, while summaries show detail linearly', 'They are the same thing', 'Maps replace summaries'], correctIndex: 1 },
      { question: 'The center of a mental map should contain:', options: ['The first fact you learned', 'The main topic or subject, with branches radiating outward for subtopics', 'A random word', 'Your name'], correctIndex: 1 },
      { question: 'A "memorization unit" is:', options: ['The entire textbook', 'A chunk of information small enough to memorize in one focused pass', 'One word', 'The whole summary'], correctIndex: 1 },
      { question: 'Colors and images in mental maps:', options: ['Are a waste of time', 'Engage the visual and creative brain, making the map more memorable', 'Should never be used', 'Only matter for artists'], correctIndex: 1 },
      { question: 'The best order for study is:', options: ['Memorize → Read → Review', 'Read & Understand → Summary → Mental Map → Memorize units → Review', 'Review → Read → Memorize', 'Any order works equally well'], correctIndex: 1 },
    ],
  },
  {
    id: 24, day: 24, title: 'Memorizing Mental Maps',
    type: 'reflection',
    prompt: 'Put it all together: create a mental map from your summary, then memorize it using far-fetched associations.',
    questions: [
      'Take the summary you created on Day 22. Create a mental map: main topic in the center, 3-5 main branches for subtopics, and sub-branches for details. Describe your map structure.',
      'For the pure facts in your map (dates, numbers, formulas), create far-fetched associations using your mental chart. For sequential facts, create story chains. Write out your key associations.',
      'Cover your map and try to reconstruct it from memory — draw a new blank map and fill it in. How much could you recall? Campayo says 70%+ on first attempt is excellent. What percentage did you achieve?',
    ],
  },
  {
    id: 25, day: 25, title: 'Main Idea & Reading Speed Variation',
    type: 'multipleChoice',
    prompt: 'Master the skill of finding the main idea and varying your reading speed based on material difficulty.',
    questions: [
      { question: 'The "main idea" of a text is:', options: ['The first sentence', 'A one-sentence summary of what the entire text is fundamentally about', 'The longest paragraph', 'The conclusion only'], correctIndex: 1 },
      { question: 'The "expanded general idea" adds:', options: ['Nothing', 'Key supporting points to the main idea — enough to explain it to someone else', 'Every detail from the text', 'Only pure facts'], correctIndex: 1 },
      { question: 'Inconsistent reading speed means:', options: ['Always reading at the same pace', 'Deliberately varying speed — slow for new/difficult concepts, fast for familiar/filler material', 'Reading faster and faster until you can\'t comprehend', 'Only reading slowly'], correctIndex: 1 },
      { question: 'Reading-reviews are:', options: ['Reading the original text again', 'Quick re-reads of your SUMMARY to reinforce key points without returning to the full text', 'A waste of time', 'Only for final exams'], correctIndex: 1 },
      { question: 'When studying, the global memorization process follows:', options: ['Memorize everything at once', 'Break material into units → Memorize each unit → Connect units → Review the whole', 'Read once and move on', 'Only review the parts you like'], correctIndex: 1 },
    ],
  },
  {
    id: 26, day: 26, title: 'Memorizing Facts: Solar System',
    type: 'timedRecall',
    items: ['Mercury — smallest planet, closest to Sun', 'Venus — hottest planet, thick CO2 atmosphere', 'Earth — only known life, 71% water', 'Mars — red planet, largest volcano Olympus Mons', 'Jupiter — largest planet, Great Red Spot storm', 'Saturn — famous rings of ice and rock', 'Uranus — rotates on its side, blue-green', 'Neptune — strongest winds in solar system'],
    studySeconds: 90,
    prompt: 'Apply the R.C.S. method: read for understanding, identify key facts, create associations, memorize.',
    instructions: 'Use the R.C.S. approach: read each fact for understanding, identify the key word for each planet, create a far-fetched association chain. You have 90 seconds.',
  },
  {
    id: 27, day: 27, title: 'Memorizing Dates: Historical Timeline',
    type: 'timedRecall',
    items: ['1776 — American Declaration of Independence', '1789 — French Revolution begins', '1804 — Napoleon crowned Emperor', '1815 — Battle of Waterloo', '1848 — Revolutions across Europe', '1861 — American Civil War begins', '1869 — Suez Canal opens', '1876 — Telephone invented (Bell)', '1903 — Wright Brothers first flight', '1914 — World War I begins'],
    studySeconds: 120,
    prompt: 'Use your mental chart to convert dates into image-words, then chain them with far-fetched associations.',
    instructions: 'Convert each date using the number-consonant system, then create associations linking the image-word to the event. You have 2 minutes for 10 dates.',
  },
  {
    id: 28, day: 28, title: 'The Review System',
    type: 'multipleChoice',
    prompt: 'Campayo\'s review schedule ensures information moves from mid-term to permanent long-term memory.',
    questions: [
      { question: 'The first review should happen:', options: ['Next month', 'The same day as memorization, and again the next day', 'Only before the exam', 'Never — memorization is enough'], correctIndex: 1 },
      { question: 'The second review happens:', options: ['The same day', 'Approximately one week after the first review', 'One year later', 'Never'], correctIndex: 1 },
      { question: 'Conferential reviews are:', options: ['Reviews with friends', 'Periodic reviews that space out over increasing intervals as memory strengthens', 'Reviews only for conferences', 'Reviewing by reading the textbook again'], correctIndex: 1 },
      { question: 'The spacing effect means:', options: ['Studying in different locations', 'Reviews spread over time are far more effective than massed repetition (cramming)', 'Spacing words further apart on paper', 'Taking longer breaks'], correctIndex: 1 },
      { question: 'The final conferential review should happen:', options: ['Months before the exam', 'Close to the exam date — ensuring material is fresh', 'Never', 'Years in advance'], correctIndex: 1 },
    ],
  },
  {
    id: 29, day: 29, title: 'Review Practice',
    type: 'reflection',
    prompt: 'Put the review system into practice by testing your recall of material memorized earlier this week.',
    questions: [
      'WITHOUT looking at your notes, try to recall the 8 planets and their key facts from Day 26. Write them all down. Then check — what percentage did you remember? This tests your mid-term memory.',
      'Now try to recall the 10 historical dates from Day 27. Write them down. How many did you get right? Were the dates (pure facts) harder than the planet descriptions (sequential facts)?',
      'Re-study anything you missed from both exercises. Campayo says the review should be quick — just re-read your associations and strengthen any weak links. Plan your next review for 3 days from now. Set a reminder.',
    ],
  },
  {
    id: 30, day: 30, title: 'The Complete Study Cycle',
    type: 'multipleChoice',
    prompt: 'Review the complete R.C.S. study methodology from start to finish.',
    questions: [
      { question: 'The complete R.C.S. cycle is:', options: ['Read → Memorize → Hope', 'Read/Understand → Underline → Summarize → Mental Map → Memorize (associations) → Review (spaced)', 'Review → Read → Memorize → Forget', 'Only association technique'], correctIndex: 1 },
      { question: 'Pure facts within summaries need:', options: ['No special treatment', 'Far-fetched association techniques because they lack inherent logical connections', 'Only repetition', 'To be ignored'], correctIndex: 1 },
      { question: 'The ideal study session length is:', options: ['4 hours without breaks', '30-40 minutes with 5-10 minute breaks — the subconscious processes during rest', '5 minutes only', '12 hours on exam eve'], correctIndex: 1 },
      { question: 'The best time to MEMORIZE new material is:', options: ['Late at night when exhausted', 'Morning after a light breakfast, when the mind is fresh', 'Immediately after a heavy meal', 'Any time is equally good'], correctIndex: 1 },
      { question: 'The best time to REVIEW material is:', options: ['Only in the morning', 'Night is ideal for review; also any moment during the day works for review', 'Only during exams', 'Never review — memorize once'], correctIndex: 1 },
    ],
  },
  {
    id: 31, day: 31, title: 'Full R.C.S. Practice Session',
    type: 'reflection',
    prompt: 'Apply the FULL R.C.S. system to a real piece of material you need to learn.',
    questions: [
      'Choose a real subject (a Wikipedia article, textbook chapter, or work document). Apply the full cycle: Read → Underline → Summarize → Mental Map. Describe what you chose and what each step produced.',
      'Memorize your mental map using far-fetched associations for pure facts and story chains for sequential facts. How long did the full process take? Do you feel confident you could recall the material tomorrow?',
      'Campayo says the R.C.S. becomes faster with practice — the first few times feel slow, but eventually it becomes second nature. What was the hardest step? What came naturally? What would you do differently?',
    ],
  },

  // ╔══════════════════════════════════════════════════════════════╗
  // ║  Chapter 5: Academic & Competitive Exams (Days 32-34)       ║
  // ╚══════════════════════════════════════════════════════════════╝
  {
    id: 32, day: 32, title: 'Essay Exam Strategy',
    type: 'multipleChoice',
    prompt: 'Campayo\'s strategies for essay-format exams — maximizing your score within time constraints.',
    questions: [
      { question: 'For essay exams, you should memorize:', options: ['Everything in the textbook', 'An adapted version whose length matches the time allotted — don\'t memorize 20 pages for a 1-hour essay', 'Nothing — just improvise', 'Only the introduction and conclusion'], correctIndex: 1 },
      { question: 'The most important information to include is:', options: ['Random details', 'The key points that would earn marks — not filler or tangential material', 'Personal opinions only', 'Everything you can remember, no matter how irrelevant'], correctIndex: 1 },
      { question: 'Campayo recommends using which color pen for essays?', options: ['Red — it shows confidence', 'Blue — its light frequency is relaxing (unlike red which provokes excitement)', 'Green — for good luck', 'Pencil only'], correctIndex: 1 },
      { question: 'If you don\'t understand an exam instruction, you should:', options: ['Guess what it means', 'Ask the proctor immediately — nobody will penalize you for asking', 'Skip the question entirely', 'Leave the exam'], correctIndex: 1 },
      { question: 'To achieve 100% exam performance, Campayo says you must:', options: ['Be perfectly prepared', 'Go in as if nothing is at stake — relaxed, confident, and with high self-esteem', 'Be extremely nervous to stay alert', 'Not care about the result at all'], correctIndex: 1 },
    ],
  },
  {
    id: 33, day: 33, title: 'Multiple Choice Exam Strategy',
    type: 'multipleChoice',
    prompt: 'Campayo provides a mathematical framework for multiple choice exams — when to guess, when to leave blank.',
    questions: [
      { question: 'The formula for the guessing threshold on multiple choice is:', options: ['Always guess', '1 / (number of options - 1) — if the penalty per wrong answer is less than this value, guess', 'Never guess', 'Guess only on even-numbered questions'], correctIndex: 1 },
      { question: 'On a 4-option test (a,b,c,d), the mathematical balance is:', options: ['1/2', '1/4', '1/3 — you can risk losing 0.33 points or less per wrong answer', '1/5'], correctIndex: 2 },
      { question: 'On the first pass through the exam, you should:', options: ['Answer every question', 'Answer only questions you are 100% confident about, skip uncertain ones', 'Start from the last question', 'Guess randomly on all'], correctIndex: 1 },
      { question: 'Using intuition to answer uncertain questions means:', options: ['Random guessing', 'After eliminating obviously wrong options, your subconscious pattern recognition often identifies the correct answer', 'Astrology', 'Asking the person next to you'], correctIndex: 1 },
      { question: 'On competitive exams, Campayo recommends studying:', options: ['Only the first test topics', 'The FINAL test topics first (study backwards) — your freshest material faces the highest-pressure moment', 'Randomly', 'Only easy material'], correctIndex: 1 },
    ],
  },
  {
    id: 34, day: 34, title: 'Oral Exam & Test Day Strategy',
    type: 'multipleChoice',
    prompt: 'Practical strategies for oral exams and for the morning of any test.',
    questions: [
      { question: 'On the morning of an exam, Campayo advises:', options: ['Skip breakfast to save time', 'Eat an energetic breakfast, leave early, arrive without rush', 'Cram for 3 more hours', 'Don\'t sleep the night before'], correctIndex: 1 },
      { question: 'Before the exam starts, you should avoid:', options: ['Deep breathing', 'Nervous peers who are frantically reviewing material — their anxiety is contagious', 'Arriving early', 'Drinking water'], correctIndex: 1 },
      { question: 'The best seat in an exam room is:', options: ['Front row, center', 'Middle of the room, against the wall opposite windows — stable temperature, less noise', 'Back corner', 'Wherever the proctor assigns'], correctIndex: 1 },
      { question: 'During an oral exam, if nerves appear, you should:', options: ['Talk faster to finish quickly', 'Lower your voice, speak slower, breathe deeply, and relax your body', 'Ask to reschedule', 'Apologize for being nervous'], correctIndex: 1 },
      { question: 'Conferential reviews (telling the material to yourself as a story) are especially useful for:', options: ['Written exams only', 'Oral exams — they practice both recall AND verbal fluency simultaneously', 'Math only', 'They are useless'], correctIndex: 1 },
    ],
  },

  // ╔══════════════════════════════════════════════════════════════╗
  // ║  Chapter 6-7: Useful Advice & Health (Day 35)               ║
  // ╚══════════════════════════════════════════════════════════════╝
  {
    id: 35, day: 35, title: 'Study Habits & Brain Health',
    type: 'multipleChoice',
    prompt: 'Campayo\'s practical advice for optimizing your study environment, habits, and physical health for memory.',
    questions: [
      { question: 'It is much better to:', options: ['Cram for 10 hours the night before', 'Study a little bit daily — even just reviewing — than to cram from time to time', 'Study only on weekends', 'Never review'], correctIndex: 1 },
      { question: 'Resting every 30-40 minutes of study is important because:', options: ['You deserve a break', 'The subconscious needs time to assimilate and organize information — plus it maintains motivation', 'It wastes time', 'Only weak students need breaks'], correctIndex: 1 },
      { question: 'The best lighting for study is:', options: ['Dim lamplight', 'Bright, even light — preferably sunlight, with your back to the window', 'Complete darkness', 'Flickering fluorescent'], correctIndex: 1 },
      { question: 'The brain needs which minerals most for memory?', options: ['Iron and zinc only', 'Phosphorus (milk, eggs, nuts) and Magnesium (sea salt, cereals, chocolate)', 'No specific minerals', 'Only Vitamin C'], correctIndex: 1 },
      { question: 'Physical exercise helps memory because:', options: ['It builds muscle', 'It clears the mind, reduces stress, and improves blood flow to the brain', 'It has no effect on memory', 'Only extreme exercise helps'], correctIndex: 1 },
      { question: 'Don\'t memorize after a heavy meal because:', options: ['You might spill food on your notes', 'Blood flow is diverted to digestion — it\'s better to rest or at most review during this time', 'Heavy meals improve memory', 'There is no connection'], correctIndex: 1 },
    ],
  },

  // ╔══════════════════════════════════════════════════════════════╗
  // ║  Chapter 8: Psychometrics (Days 36-41)                      ║
  // ╚══════════════════════════════════════════════════════════════╝
  {
    id: 36, day: 36, title: 'Numeric Sequences I — Basic',
    type: 'sequenceInput',
    prompt: 'Find the pattern and complete each sequence. These are from Campayo\'s psychometric exercises.',
    sequences: [
      { shown: [2, 4, 6, 8], answer: 10, explanation: 'Add 2 each time' },
      { shown: [1, 4, 7, 10], answer: 13, explanation: 'Add 3 each time' },
      { shown: [3, 7, 11, 15], answer: 19, explanation: 'Add 4 each time' },
      { shown: [8, 7, 6, 5], answer: 4, explanation: 'Subtract 1 each time' },
      { shown: [1, 2, 4, 7, 11], answer: 16, explanation: 'Differences increase by 1: +1, +2, +3, +4, +5' },
      { shown: [3, 4, 7, 10, 17], answer: 27, explanation: 'Each number is the sum of the two before it' },
      { shown: [64, 32, 16, 8], answer: 4, explanation: 'Divide by 2 each time' },
      { shown: [1, 1, 2, 3, 5, 8], answer: 13, explanation: 'Fibonacci: each is sum of previous two' },
    ],
  },
  {
    id: 37, day: 37, title: 'Numeric Sequences II — Advanced',
    type: 'sequenceInput',
    prompt: 'These sequences involve more complex patterns — multiplication, powers, and interleaved sequences.',
    sequences: [
      { shown: [2, 6, 14, 30], answer: 62, explanation: 'Multiply by 2 then add 2: (2×2+2=6), (6×2+2=14), (14×2+2=30), (30×2+2=62)' },
      { shown: [1, 4, 9, 16, 25], answer: 36, explanation: 'Perfect squares: 1², 2², 3², 4², 5², 6²' },
      { shown: [3, 5, 9, 17], answer: 33, explanation: 'Differences double: +2, +4, +8, +16' },
      { shown: [100, 97, 91, 82, 70], answer: 55, explanation: 'Subtract increasing amounts: -3, -6, -9, -12, -15' },
      { shown: [1, 8, 27, 64], answer: 125, explanation: 'Perfect cubes: 1³, 2³, 3³, 4³, 5³' },
      { shown: [2, 3, 5, 7, 11, 13], answer: 17, explanation: 'Prime numbers in sequence' },
    ],
  },
  {
    id: 38, day: 38, title: 'Dominoes Sequences',
    type: 'multipleChoice',
    prompt: 'Domino sequences are common on psychometric tests. Each domino has a numerator (top) and denominator (bottom), values 0-6, cycling infinitely.',
    questions: [
      { question: 'Dominoes cycle through values 0-6. After 6 comes:', options: ['7', '0 — the sequence loops back like a circle', '1', 'The sequence stops'], correctIndex: 1 },
      { question: 'In a domino sequence where numerators go 3, 4, 5, 6, ?, the next numerator is:', options: ['7', '0 — because after 6 it loops to 0', '1', '6 again'], correctIndex: 1 },
      { question: 'If a domino sequence has ALTERNATING patterns (like 1/3, 2/2, 3/3, 4/2), you should:', options: ['Only look at the numerators', 'Separate odd-position and even-position dominoes into two sub-sequences and analyze each', 'Give up', 'Only look at the denominators'], correctIndex: 1 },
      { question: 'An "intrusive" domino in a sequence is:', options: ['A broken domino', 'A repeating domino (like 1/1) that appears between the main sequence — it IS the pattern to find', 'A domino placed upside down', 'A blank domino'], correctIndex: 1 },
      { question: 'When dominoes appear in PAIRS, the rule connects:', options: ['Adjacent sequences', 'The first domino to the second within each pair — the same rule applies to all pairs', 'Dominoes in different rows', 'Nothing — pairs are random'], correctIndex: 1 },
      { question: 'If stuck on a difficult domino problem, you should:', options: ['Spend 10 minutes on it', 'Skip it and move to easier problems in another section — come back only if time permits', 'Guess randomly', 'Leave the entire test'], correctIndex: 1 },
    ],
  },
  {
    id: 39, day: 39, title: 'Diagrammatic & Pattern Tests',
    type: 'multipleChoice',
    prompt: 'Diagrammatic tests present grids of shapes. You must find the pattern and identify the missing element.',
    questions: [
      { question: 'In a 3×3 grid with a missing square, the first thing to look for is:', options: ['The prettiest shape', 'Patterns in rows, columns, and diagonals — how shapes move, rotate, appear, or disappear', 'The biggest shape', 'Random guessing'], correctIndex: 1 },
      { question: 'Common patterns in diagrammatic tests include:', options: ['Only colors', 'Rotation (clockwise/counterclockwise), element addition/removal, size changes, and toggling (on/off)', 'Only size changes', 'No consistent patterns'], correctIndex: 1 },
      { question: 'If a dot moves one square clockwise in each frame, after 4 frames in a 2×2 grid it will be:', options: ['In a random position', 'Back at its starting position — it completes a full cycle', 'Off the grid', 'In the center'], correctIndex: 1 },
      { question: 'When shapes appear to move diagonally across a grid:', options: ['Ignore them', 'Track which diagonal they follow and predict where they will be in the missing frame', 'They are random', 'Only vertical movement matters'], correctIndex: 1 },
      { question: 'The strategy for diagrammatic tests is:', options: ['Spend equal time on all problems', 'Try to predict the answer BEFORE looking at the options, then match your prediction', 'Always choose option B', 'Skip all of them'], correctIndex: 1 },
    ],
  },
  {
    id: 40, day: 40, title: 'Psychometric Practice — Sequences',
    type: 'sequenceInput',
    prompt: 'Mixed-difficulty practice sequences from the book\'s exercise section. Find the next number.',
    sequences: [
      { shown: [5, 8, 11, 14, 17, 20], answer: 23, explanation: 'Add 3 each time' },
      { shown: [2, 4, 8, 16], answer: 32, explanation: 'Double each time' },
      { shown: [1, 3, 6, 10, 15, 21, 28], answer: 36, explanation: 'Triangular numbers: +2, +3, +4, +5, +6, +7, +8' },
      { shown: [96, 48, 24, 12], answer: 6, explanation: 'Halve each time' },
      { shown: [5, 10, 9, 18, 17, 34], answer: 33, explanation: 'Alternating ×2 and -1' },
      { shown: [1, 4, 2, 5, 3, 6], answer: 4, explanation: 'Two interleaved sequences: 1,2,3,4 and 4,5,6,7' },
      { shown: [3, 9, 8, 24, 23], answer: 69, explanation: 'Alternating ×3 and -1' },
      { shown: [1, 3, 9, 27, 81], answer: 243, explanation: 'Multiply by 3 each time' },
      { shown: [7, 14, 10, 20, 16], answer: 32, explanation: 'Alternating ×2 and -4' },
      { shown: [0, 1, 1, 2, 3, 5, 8, 13], answer: 21, explanation: 'Fibonacci sequence starting from 0' },
    ],
  },
  {
    id: 41, day: 41, title: 'Psychometric Knowledge Test',
    type: 'multipleChoice',
    prompt: 'Test your understanding of IQ scales, psychometric test types, and strategies.',
    questions: [
      { question: 'The most famous IQ scale is the:', options: ['Richter Scale', 'Cattell Scale', 'Fahrenheit Scale', 'Beaufort Scale'], correctIndex: 1 },
      { question: 'An IQ of 90-109 is classified as:', options: ['Below average', 'Average — representing about 50% of the population', 'Superior', 'Genius'], correctIndex: 1 },
      { question: 'To join Mensa, you need an IQ in the top:', options: ['50%', '25%', '10%', '2% (about 148+ on the Cattell scale)'], correctIndex: 3 },
      { question: 'All intelligence tests measure:', options: ['Knowledge of trivia', 'A person\'s capacity to reason and find logical sequences in problems', 'Physical coordination', 'Emotional intelligence only'], correctIndex: 1 },
      { question: 'Psychometric personality tests are designed to find:', options: ['Your IQ score', 'Contradictions in your responses and your psychological profile for a specific role', 'How fast you can read', 'Your memory capacity'], correctIndex: 1 },
    ],
  },

  // ╔══════════════════════════════════════════════════════════════╗
  // ║  Chapter 9: Psychological Preparation (Days 42-43)          ║
  // ╚══════════════════════════════════════════════════════════════╝
  {
    id: 42, day: 42, title: 'Overcoming Exam Fear',
    type: 'reflection',
    prompt: 'Campayo: "Failing is neither good nor bad. The secret is in the preparation, not the result." The psychological factor can reduce performance by 10-40%.',
    questions: [
      'Campayo identifies 3 types: Superprepared (2% of students), Slightly Prepared (20%), and Average Prepared (majority). Which type are you typically? How does the psychological factor (p.f.) affect YOUR performance? Be honest.',
      'Write a letter to yourself as if you were your own best friend who just failed an important exam. What would you say? Campayo says we must treat ourselves with the same compassion we show friends. Try it now.',
      'Campayo says "the die has been cast" when you sit for an exam — at that point you are no longer responsible for anything. Your job was the preparation. How does this perspective change your feelings about upcoming challenges?',
    ],
  },
  {
    id: 43, day: 43, title: 'Relaxation & Nerve Control Techniques',
    type: 'reflection',
    prompt: 'Practice Campayo\'s anti-tension technique. This is a physical skill — it gets better with daily practice.',
    questions: [
      'Practice the technique NOW: (1) Stop all movement, let your body go completely limp, (2) Breathe deeply 2-3 times, expelling all air, (3) Feel your body getting heavier with each breath, (4) Create inner calm: "Nothing bothers me. Better and better." Do this for 2 full minutes. Describe the experience.',
      'Campayo says if nerves appear during a WRITTEN exam: stop writing, do the technique for 1 minute. For an ORAL exam: lower your voice, speak slower, breathe deeply. Which scenario worries you more? Practice the relevant technique and describe how it felt.',
      'The root cause of exam nervousness is FEAR — of failure, judgment, or consequences. Campayo says: "If you can solve the problem, why worry? If you can\'t, why worry?" Identify one fear you carry into exams and write a rational counter-argument to it.',
    ],
  },

  // ╔══════════════════════════════════════════════════════════════╗
  // ║  Chapter 10-11: Worry & Creative Power (Days 44-45)         ║
  // ╚══════════════════════════════════════════════════════════════╝
  {
    id: 44, day: 44, title: 'The Science of Worry',
    type: 'multipleChoice',
    prompt: '99% of people live in a continuous state of worry. Campayo shows why worry is irrational and how to eliminate it.',
    questions: [
      { question: 'Campayo says worry is:', options: ['Helpful motivation', 'The detonator of the worst problems in society — 99% of people live in continuous worry', 'Rare and harmless', 'Only a student problem'], correctIndex: 1 },
      { question: 'Most things people worry about:', options: ['Always come true', 'Never materialize — they are "castles in the sand" about uncertain futures', 'Are within their control', 'Are rational concerns'], correctIndex: 1 },
      { question: 'The subconscious creates fear and anxiety because:', options: ['It is evil', 'It is trying to PROTECT you from perceived danger — all phobias are defense mechanisms', 'It wants you to fail', 'There is no connection'], correctIndex: 1 },
      { question: '"If you can solve your problem, then why worry? If you cannot solve it, then why worry?" This means:', options: ['Never do anything', 'Act on what you can control, accept what you cannot — worrying helps in neither case', 'Worry about everything equally', 'Only worry about big problems'], correctIndex: 1 },
      { question: 'A personal agenda (planner) reduces worry because:', options: ['It looks professional', 'It externalizes obligations — your subconscious no longer needs to carry the burden of remembering everything', 'It wastes time', 'Only organized people use them'], correctIndex: 1 },
    ],
  },
  {
    id: 45, day: 45, title: 'The Creative Power of Your Mind',
    type: 'reflection',
    prompt: 'Campayo\'s final message: the three keys to your mental power are Thought, Word, and Action. These create your reality.',
    questions: [
      'Campayo describes negative creators: they THINK they are unwell, TELL everyone about it, and ACT accordingly — and reality confirms their belief. Identify one area where you might be a "negative creator." How do your thoughts, words, and actions reinforce a limiting belief?',
      'Now flip it: Campayo says positive creators THINK wellness, SPEAK hope, and ACT accordingly. Write a specific plan for using Thought, Word, and Action positively in the area you identified above. Be concrete.',
      'Campayo\'s ultimate exercise: Look in the mirror and talk to yourself with love and confidence for 2 minutes. Tell yourself what you have accomplished so far in this 45-day program. Advise yourself as you would your best friend. Describe the experience and how you feel afterwards.',
    ],
  },
]

export const chapters: MMChapter[] = [
  {
    id: 1, title: 'The Mind and Memory', days: [1, 2, 3, 4],
    reading: `The mind has two fundamental components: the conscious mind and the subconscious. The conscious mind handles voluntary reasoning, analysis, and decision-making. The subconscious records everything we perceive — even information we are not consciously aware of — and manages involuntary functions.

Memory has three main types based on duration. Short-term memory lasts only seconds (like a phone number you hear once). Mid-term memory stores information for minutes to days — this is what cramming produces. Long-term memory stores information almost permanently, potentially for life. The goal of all memory training is to move information from short-term into long-term storage.

The types of facts we memorize also vary. Pure facts (dates, formulas, phone numbers) have no inherent logic and require special association techniques. Sequential facts (processes, stories) form connected chains. Sensory memories come through the five senses, with visual "photographic flashes" being especially powerful.

Campayo identifies four memorization systems: repetition (simple but weak), reasoning (understanding aids retention), far-fetched association (creating absurd mental images — the core technique), and total memorization (combining all methods). The key insight: motivation directly affects how well the subconscious cooperates in storing information.`,
  },
  {
    id: 2, title: 'Supermemory', days: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    reading: `The Supermemory system is built on two pillars: the mental chart (converting numbers to images) and far-fetched associations (linking images into memorable stories).

The mental chart uses a number-consonant system where each digit maps to specific consonant sounds: 0=R, 1=T/D, 2=N, 3=M, 4=C/K, 5=L, 6=S/Z, 7=F/V, 8=G/J, 9=B/P. By adding vowels (which have no numeric value), you create vivid words for any number. For example, 14 = T+C = "TaCK" (a thumbtack you can visualize). This transforms abstract numbers into concrete images.

Far-fetched associations are the engine of supermemory. The rules are simple but critical: make your associations ABSURD (a flying piano), EXAGGERATED (a 100-foot spider), full of ACTION (crashing, exploding, dancing), and PERSONAL (only your imagination matters). The brain is wired to flag unusual, emotional events for long-term storage — normal, logical connections are forgettable; bizarre ones are unforgettable.

To memorize a list, you create a "mental video" — a chain of far-fetched associations where each item links dramatically to the next. A trained practitioner can memorize 50, 100, or more items in perfect sequence using this technique. The associations seem silly, but they work because they exploit how the brain naturally prioritizes what to remember.`,
  },
  {
    id: 3, title: 'Photographic Reading', days: [15, 16, 17, 18, 19],
    reading: `Campayo's photographic (ultra-rapid) reading technique addresses common reading defects: regression (re-reading), sub-vocalization (hearing words mentally), linear word-by-word reading, and poor concentration from reading too slowly.

The core principle is mental absorption — allowing the subconscious to process text rather than forcing conscious word-by-word decoding. A visual guide (pen or pointer) controls eye movement, reduces regression, and maintains consistent speed. Counterintuitively, reading FASTER often improves comprehension because the brain stays engaged instead of wandering.

Training progresses through stages: first, eliminating regression using the guide. Then expanding peripheral vision to absorb groups of words per fixation. Then practicing vertical and diagonal reading patterns for different material types. The goal is flexibility — the ability to choose the optimal reading strategy for each text.

Environmental factors matter greatly: good lighting (preferably sunlight), comfortable upright posture, no distractions, and materials organized before starting. Classical instrumental music can aid concentration, but anything with lyrics or conversation will harm it.`,
  },
  {
    id: 4, title: 'General Study System (R.C.S.)', days: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    reading: `The Ramón Campayo System (R.C.S.) integrates all techniques into a complete study methodology. The phases are: Read and Understand → Underline Key Points → Create Handwritten Summary → Make Mental Map → Memorize → Review.

The critical first rule: UNDERSTAND before you memorize. Memorization without comprehension is fragile — it collapses under exam pressure. First read the material for understanding, then underline only key terms (no more than 25% of text), then create a handwritten summary reducing the original by 60-75%.

Mental maps provide visual structure, revealing relationships between concepts. Break the map into "memorization units" — chunks small enough to memorize in one focused pass. Pure facts get far-fetched associations; sequential facts get story chains.

The review system is what makes everything permanent. First review the same day and next day. Second review after one week. Then conferential reviews at increasing intervals. Each review is quick — just re-reading summaries and reinforcing weak associations. Study sessions should be 30-40 minutes with 5-10 minute breaks, and memorization is best in the morning with reviews at night.`,
  },
  {
    id: 5, title: 'Academic & Competitive Exams', days: [32, 33, 34],
    reading: `Campayo devotes special attention to exam strategy because even perfect preparation can be undermined by poor technique. For essay exams, adapt your memorized material to match the time allotted — never memorize more than you can write within the time limit.

For multiple choice tests, Campayo provides a mathematical framework: the guessing threshold is 1/(number of options - 1). On a 4-option test, if each wrong answer costs 0.33 points or less, it is mathematically safe to guess. Answer confident questions first, skip uncertain ones, then return. Use intuition for remaining questions — after eliminating wrong options, your subconscious pattern recognition often guides you correctly.

For competitive exams, study the final test topics FIRST. Since those topics will be freshest in memory when the highest-pressure moment arrives, this strategy maximizes performance when it matters most. On test day: eat a good breakfast, arrive early, avoid nervous peers, choose a seat in the middle of the room away from windows and doors, and use a blue pen for its calming light frequency.`,
  },
  {
    id: 6, title: 'Useful Advice', days: [35],
    reading: `Study habits and physical health form the foundation upon which all memory techniques rest. Campayo emphasizes daily consistency — studying a little every day is vastly superior to cramming. Rest for 5-10 minutes every 30-40 minutes to let the subconscious process information.

Your study environment matters: bright, even lighting (back to sunlight), comfortable upright posture, quiet room free from distractions. No radio or TV — studying is like watching a film; you cannot fully absorb it while multitasking.

The brain needs specific nutrients: phosphorus (found in milk, eggs, nuts, legumes), magnesium (sea salt, whole grains, chocolate), and vitamins A and D. A balanced Mediterranean diet provides all of these. Physical exercise clears the mind and improves blood flow. Adequate sleep is non-negotiable — an overtired mind creates "bad vibes" that make it resistant to learning.

Best time to memorize: morning after a light breakfast. Best time to review: evening, though any time works. Never memorize after a heavy meal — rest or at most review during digestion.`,
  },
  {
    id: 7, title: 'Memory and Our Health', days: [35],
    reading: `This brief but important chapter reinforces that memory performance is inseparable from physical health. A balanced diet without extremes, avoiding cigarettes and alcohol, moderate physical exercise, and sufficient rest form the biological foundation of a sharp memory.

The brain consumes an enormous proportion of the body's energy. Feeding it properly with phosphorus, magnesium, and vitamins is not optional — it is essential. The good news is that a normal balanced diet, particularly a Mediterranean one, provides everything the brain needs.`,
  },
  {
    id: 8, title: 'Psychometrics', days: [36, 37, 38, 39, 40, 41],
    reading: `Psychometric tests measure intelligence (IQ) and personality. They appear on competitive exams and job interviews, often provoking anxiety because test-takers feel the situation is out of their control. Campayo demystifies them.

Intelligence tests use the Cattell Scale (most famous), Stanford-Binet, or Weschler. IQ classifications range from Extremely Low (0-24) through Average (90-109) to Genius (160+). Mensa requires the top 2% — about 148+ on the Cattell scale. These tests measure reasoning and pattern recognition, not knowledge.

Numeric sequences present numbers following a hidden rule — your job is to find the rule and predict the next number. Patterns range from simple (add 2) to complex (interleaved sequences, powers, Fibonacci). Dominoes work similarly but with values 0-6 cycling in infinite circles. Diagrammatic tests present grids of shapes with patterns in rows, columns, and diagonals.

The universal strategy: start with easy problems, skip hard ones, return later. There is usually generous time, so don't panic. Practice builds pattern recognition — the more sequences you solve, the faster you spot new patterns.`,
  },
  {
    id: 9, title: 'Psychological Preparation', days: [42, 43],
    reading: `Campayo considers this chapter one of the most essential in the book. All the memory techniques and study strategies in the world mean nothing if nervous tension blocks your performance at the critical moment.

The psychological factor can reduce exam performance by 10-40%. Three personality types emerge: the Superprepared (2%, whose confidence mostly overcomes nerves), the Slightly Prepared (20%, who rely on luck), and the Average Prepared (majority, who suffer most because they are on the borderline).

Fear of failure is the root cause of exam anxiety. Campayo's radical insight: failing is neither good nor bad. There is no such thing as failure for those who fought with all their might. If we stop overrating exams and associating them with success and failure, they will stop making us afraid.

The anti-tension technique is physical: stop all movement, go limp, breathe deeply 2-3 times, feel your body getting heavier, and create inner calm with self-talk. This must be practiced regularly to work naturally under pressure. Prevention is better than cure — the real solution is eliminating the fear and worry that cause tension in the first place.`,
  },
  {
    id: 10, title: 'All About Worry', days: [44],
    reading: `Worry is the detonator of the worst problems in society. 99% of people live in continuous worry about uncertain futures — and most of these worries never materialize. Worry defies logic: it provides no benefit and causes enormous harm.

The subconscious creates fear and anxiety as defense mechanisms. It cannot understand why answering questions on an exam should put your health and self-esteem at risk, so it creates symptoms (anxiety, nausea, mental blocks) to protect you from the "danger." Phobias develop when repeated negative evaluations compound.

The antidote is twofold: First, act on what you can control and accept what you cannot. Second, treat yourself as your own best friend — with love, compassion, and encouraging words. Talk to yourself in the mirror. Reward yourself after difficult efforts. Never punish yourself for results.

A personal agenda (planner) is a powerful anti-worry tool. By externalizing all obligations into a trusted system, your subconscious is freed from the burden of remembering — one of the most common sources of background worry.`,
  },
  {
    id: 11, title: 'The Creative Power of Our Minds', days: [45],
    reading: `The mind's creative power operates through three keys: Thought, Word, and Action. These three personal modi operandi definitively make up our reality. When someone thinks they are unwell, tells everyone about it, and acts accordingly — their mind creates that reality.

The same creative power that can make us sick can make us well. We are not bad creators — we simply have more practice creating negative realities because we use our mental strength in the wrong direction. If we put the same energy into creating positive realities, we would achieve them just as easily, or even more so.

Campayo's ice cream shop analogy illustrates this: if you believe you have no money (even though you do), the result is identical to actually having no money. "If we think we are limited, we certainly will be." The creative power of our minds is instantaneous and its effects are immediate.

The program concludes with Campayo's ultimate advice: look in the mirror every day and talk to yourself with love and confidence. Be your own best friend. Choose your thoughts, words, and actions deliberately — for they create your reality. Consistency is the key to success. You choose.`,
  },
]

export function getExercise(day: number): MMExercise | undefined {
  return exercises.find(e => e.day === day)
}

export function getChapterForDay(day: number): MMChapter | undefined {
  return chapters.find(ch => ch.days.includes(day))
}
