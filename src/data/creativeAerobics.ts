import type { CAExercise, CAChapter } from '../types/think'

export const TOTAL_DAYS = 30

export const exercises: CAExercise[] = [
  // === Chapter 1: Taking the Wraps/Raps off Creative Aerobics (Days 1-3) ===
  {
    id: 1, day: 1, title: 'Words, Words, Words',
    type: 'wordHunt',
    prompt: 'Take the word "advertisement" and find as many four-letter-or-more words as you can. Avoid proper names, foreign words, slang, and abbreviations. Use the root of a word only once ("dart" not "dart, darts, darted"). There are more than 300 possible words!',
    targetCount: 50,
    sourceWord: 'advertisement',
    minLetters: 4,
  },
  {
    id: 2, day: 2, title: 'Consonant Challenge',
    type: 'consonantWords',
    prompt: 'Find twenty words that contain ALL of the consonants T, R, B, and L. You must use all four letters in each word. Follow the same rules as Exercise 1.',
    targetCount: 20,
    consonants: ['T', 'R', 'B', 'L'],
  },
  {
    id: 3, day: 3, title: 'Pick Your Own Consonants',
    type: 'consonantWords',
    prompt: 'Choose your own three or four consonants, write your own rules, then find twenty words that meet your criteria. Push yourself to pick challenging letter combinations!',
    targetCount: 20,
    consonants: [],
    userPicksLetters: true,
  },
  // === Chapter 2: In the Beginning... (Days 4-5) ===
  {
    id: 4, day: 4, title: 'Forward and Backward',
    type: 'reverseWords',
    prompt: 'Find words (three letters or more) that, when spelled backwards, form a different valid word. For example: ton = not, rat = tar. Avoid proper names, foreign words, slang. Plural forms are fine (rats = star).',
    targetCount: 30,
    minLetters: 3,
  },
  {
    id: 5, day: 5, title: 'Plural Pairs',
    type: 'reverseWords',
    prompt: 'Go back to your reverse-word pairs and find ten pairs where you can add an "s" to both words to form additional valid pairs. For example: rats/star → rats/stars.',
    targetCount: 10,
    minLetters: 3,
    addPlurals: true,
  },
  // === Chapter 3: David versus Goliath (Days 6-8) ===
  {
    id: 6, day: 6, title: 'Four for Four',
    type: 'wordTransform',
    prompt: 'Select a four-letter word. Change one letter at a time to form new four-letter words. First change the first letter, cycling through the alphabet. Then go back and change the third letter. Try to turn 10 starting words into 4 words each (40 total).',
    targetCount: 10,
    rules: [
      'Select a four-letter word',
      'Change the first letter to form new words',
      'If the second letter is a vowel, try substituting other vowels',
      'Go back to your original and change the third letter',
      'Substitute letters from "a" onwards',
    ],
    example: 'dare → bare, care, fare, hare, mare, pare, rare, ware',
    wordLength: 4,
  },
  {
    id: 7, day: 7, title: 'Triple Anagrams',
    type: 'wordTransform',
    prompt: 'Select ten four-letter words where you can rearrange the letters to form two additional words. For example: meat / mate / team.',
    targetCount: 10,
    rules: [
      'Choose a four-letter word',
      'Rearrange ALL letters to form a second word',
      'Rearrange again to form a third word',
      'All three must be valid English words',
    ],
    example: 'meat → mate → team',
    wordLength: 4,
  },
  {
    id: 8, day: 8, title: 'Five, Four, Three, Two, One',
    type: 'wordTransform',
    prompt: 'Find five-letter words where you can remove one letter at a time (from any position) to create valid shorter words all the way down to one letter. For example: stone → tone → one → on → o.',
    targetCount: 10,
    rules: [
      'Start with a five-letter word',
      'Remove one letter (any position) to form a four-letter word',
      'Remove another to form a three-letter word',
      'Continue to two letters, then one',
      'You cannot rearrange letters, only remove',
    ],
    example: 'stone → tone → one → on',
    wordLength: 5,
  },
  // === Chapter 4: Defining the Creative Process Today (Days 9-10) ===
  {
    id: 9, day: 9, title: 'Two for One (Homophones)',
    type: 'homophones',
    prompt: 'Find fifty pairs of homophones—words that sound the same but are spelled differently. You can use proper names, slang, and foreign words. Just make sure the vowel sound is the same.',
    targetCount: 30,
    examples: ['pear = pare = père', 'two = too = to', 'there = their = they\'re'],
    tips: [
      'Look for rhyming words that have alternate spellings',
      'Try adding a letter to your homophone to find additional pairs: hay → h + a/y',
      'Start with common vowel sounds and find all words that share them',
    ],
  },
  {
    id: 10, day: 10, title: 'Word Tools',
    type: 'homophones',
    prompt: 'Invent your own word tools! Start at the beginning of the alphabet and find as many double-letter-together words as you can (e.g., AaRdvark, buBBle, CaCao). Or create another pattern of your own.',
    targetCount: 20,
    examples: ['AaRdvark', 'buBBle', 'CaCao', 'aDDress'],
    tips: [
      'Try double letters: aa, bb, cc, dd...',
      'Try words where the same letter appears 3+ times',
      'Create your own pattern and see how far you can go',
    ],
  },
  // === Chapter 5: Developing Your Creative Magnifying Glass (Days 11-15) ===
  {
    id: 11, day: 11, title: 'Word Reduction',
    type: 'wordTransform',
    prompt: 'Find twenty five-letter words and reduce each by removing one letter at a time to form valid words at each step. Example: feast → east → eat → at → a.',
    targetCount: 15,
    rules: [
      'Start with a five-letter word',
      'Remove one letter at a time',
      'Each step must be a valid word',
      'End with a one-letter word (a, I, or O)',
    ],
    example: 'feast → east → eat → at → a',
    wordLength: 5,
  },
  {
    id: 12, day: 12, title: 'Word Building',
    type: 'wordTransform',
    prompt: 'Start with a single vowel and build up to five-letter words by adding one letter at a time. Each step must form a valid word. Example: a → am → ram → cram → cramp.',
    targetCount: 10,
    rules: [
      'Start with a single vowel (a, e, i, o, u)',
      'Add one letter at a time (any position)',
      'Each step must form a valid word',
      'Build up to a five-letter word',
    ],
    example: 'a → am → ram → cram → cramp',
  },
  {
    id: 13, day: 13, title: 'Alphabet Pairs',
    type: 'wordTransform',
    prompt: 'Run each vowel through the alphabet, pairing it with consonants to form two-letter words. Then add a third letter, then fourth, then fifth. Example: fa → fad → fade → faded.',
    targetCount: 10,
    rules: [
      'Start with a vowel + consonant pair (e.g., "fa")',
      'Must be a valid two-letter word or abbreviation',
      'Add letters one at a time to build longer words',
      'Build each chain to at least four letters',
    ],
    example: 'fa → fad → fade → faded',
  },
  {
    id: 14, day: 14, title: 'Vowel Builders',
    type: 'wordTransform',
    prompt: 'Use the remaining vowels (e, i, o, u) as starting points and build two-to-five-letter word chains, just like the previous exercise.',
    targetCount: 10,
    rules: [
      'Start with vowels: e, i, o, or u',
      'Pair with consonants to form two-letter words',
      'Build up to five-letter words',
      'Try to find at least 2 chains per vowel',
    ],
    example: 'in → pin → pine → spine',
  },
  {
    id: 15, day: 15, title: 'Fill in the Blanks',
    type: 'creativePrompt',
    prompt: 'Answer each of these creative/sensory questions. There are no wrong answers—let your imagination run wild. Write at least a sentence for each.',
    targetCount: 10,
    questions: [
      'What color is Thursday?',
      'What does transparency smell like?',
      'What is the smell of happiness?',
      'What do you feel when you touch a cloud?',
      'What is the color of velvet?',
      'What would you paint a sneeze?',
      'If you could taste a dream, what flavor would it be?',
      'What scent does your birthday give off?',
      'If anger were an animal, what would it be?',
      'If you had success, how would it feel?',
    ],
  },
  // === Chapter 6: Training for Your Creativity Marathon (Day 16) ===
  {
    id: 16, day: 16, title: 'Facts Practice',
    type: 'caExercise',
    prompt: 'Choose a product you use every day. Find 10 unusual, surprising, or little-known facts about it. These are facts that would make someone say "Really? I didn\'t know that!"',
    targetCount: 10,
    caStep: 'CA1',
    guidance: 'CA1 is about finding facts—unusual facts, little-known facts, surprising facts. Think of yourself as a detective searching for clues others have overlooked. Use the Internet, but dig deeper than the first page of results. Look for manufacturing details, history, ingredient origins, scientific properties.',
    productSuggestions: ['Your toothpaste', 'Your phone', 'Your shoes', 'Coffee', 'A pencil'],
  },
  // === Chapter 7: CA1 - The Facts (Day 17) ===
  {
    id: 17, day: 17, title: 'CA1: The Facts, Just the Facts',
    type: 'caExercise',
    prompt: 'Pick a product from the suggestions (or choose your own) and find 10 unusual facts. Then add a "twist" to each fact—an individual point of view that is verbal or visual. The twist is what makes the fact into a potential ad idea.',
    targetCount: 10,
    caStep: 'CA1',
    guidance: 'The twist creates an individual point of view that is verbal or visual. It is estimated that 90 percent of people reading ads will read only the headlines, so the twist must convey the message succinctly. Find the fact, then ask: "What\'s surprising about this? How can I present this in a way nobody has seen before?"',
    productSuggestions: ['Running shoes', 'A chocolate bar', 'A wristwatch', 'Sunglasses', 'A backpack'],
  },
  // === Chapter 8: CA2 - New Nomenclature (Days 18-20) ===
  {
    id: 18, day: 18, title: 'CA2: New Names from Facts',
    type: 'caExercise',
    prompt: 'Take the 10 facts you found in CA1 and create a new name for each. The new name should suggest the fact without stating it directly. For example: if a fact about running shoes is that they contain 60 components, a new name might be "The 60-Piece Symphony."',
    targetCount: 10,
    caStep: 'CA2',
    guidance: 'Creative Aerobic 2 is about creating new nomenclature—inventing new names for your product based on the facts you discovered. Each new name gives the reader a fresh way of looking at the product. Think metaphors, analogies, and unexpected connections.',
    productSuggestions: ['Same product from Day 17'],
  },
  {
    id: 19, day: 19, title: 'CA2: Fresh Analogies',
    type: 'caExercise',
    prompt: 'Pick a new product. Use established words in fresh ways—as analogies or metaphors. Give the product 10 new names that capture something essential about it. Think: what is this product LIKE?',
    targetCount: 10,
    caStep: 'CA2',
    guidance: 'Go beyond literal renaming. A battery isn\'t just "power storage"—it could be a "pocket lightning bolt" or a "portable sunrise." The best CA2 names create an instant visual or emotional connection.',
    productSuggestions: ['A umbrella', 'A flashlight', 'A bicycle', 'Headphones', 'A sandwich'],
  },
  {
    id: 20, day: 20, title: 'CA2: Feature Renaming',
    type: 'caExercise',
    prompt: 'Choose any product and rename 10 of its features or attributes using CA2 technique. Don\'t rename the product itself—rename its characteristics.',
    targetCount: 10,
    caStep: 'CA2',
    guidance: 'Focus on individual features. If your product is a car: don\'t rename "car"—rename "horsepower" (thunder herd?), "air conditioning" (arctic breath?), "leather seats" (second-skin loungers?). Each renamed feature could become its own ad.',
    productSuggestions: ['A car', 'A laptop', 'A restaurant', 'A gym', 'A streaming service'],
  },
  // === Chapter 9: CA3 - It's the Same, Only Different (Days 21-22) ===
  {
    id: 21, day: 21, title: 'CA3: Find Similarities',
    type: 'caExercise',
    prompt: 'Take 5 of your CA2 new names and find 2 similarities between each new name and something completely unrelated to your product. The more unlikely the comparison, the more creative the result.',
    targetCount: 10,
    caStep: 'CA3',
    guidance: 'CA3 challenges you to find similarities between your product and something else entirely—something that, on the surface, has nothing in common. A Stradivarius violin is a musical masterpiece—so is my product. Every similarity is a potential headline, a potential ad, a potential campaign.',
    productSuggestions: ['Use your product from Days 18-20'],
  },
  {
    id: 22, day: 22, title: 'CA3: Reverse Similarities',
    type: 'caExercise',
    prompt: 'Start with 10 completely random objects (a cloud, a hammer, a river, etc.) and find a meaningful similarity between EACH random object and a product of your choice.',
    targetCount: 10,
    caStep: 'CA3',
    guidance: 'This is reverse CA3—instead of starting with your product, start with random things and work backwards. This forces more creative connections. How is a river like a smartphone? Both carry currents. Both connect distant places. Both can be shallow or deep.',
    productSuggestions: ['Any product you want to advertise'],
  },
  // === Chapter 10: CA4 - Refining Creativity (Days 23-26) ===
  {
    id: 23, day: 23, title: 'CA4: New Definitions',
    type: 'caExercise',
    prompt: 'Choose 10 common words and create new definitions for each that relate to a product of your choosing. Example: "Marathon" isn\'t just a long-distance race—it\'s what our battery gives your phone.',
    targetCount: 10,
    caStep: 'CA4',
    guidance: 'CA4 is about redefining the familiar. Take a word everyone knows and give it a new meaning tied to your product. The best CA4 definitions create a moment of surprise and delight—an "aha!" that makes the reader see both the word and the product differently.',
    productSuggestions: ['An energy drink', 'A mattress', 'A travel app', 'A pen', 'A coffee shop'],
  },
  {
    id: 24, day: 24, title: 'CA4: The Full Chain',
    type: 'caExercise',
    prompt: 'Pick one product and run the FULL CA process: find 5 facts (CA1), create 5 new names (CA2), find 5 similarities (CA3), and create 5 new definitions (CA4). Write all 20 results.',
    targetCount: 20,
    caStep: 'fullCA',
    guidance: 'This is the complete Creative Aerobics process in action. Start with CA1 facts, build to CA2 names, extend to CA3 similarities, and refine with CA4 definitions. Each step feeds the next. By the end, you\'ll have a rich pool of creative material for advertising.',
    productSuggestions: ['A new energy bar', 'A ride-sharing app', 'A smartwatch', 'A bookstore'],
  },
  {
    id: 25, day: 25, title: 'CA4: Glossary Redefine',
    type: 'caExercise',
    prompt: 'Take 10 everyday words (e.g., breakfast, commute, weekend, sleep, exercise) and redefine each using the CA4 technique—but this time, make each definition work as a potential tagline for an imaginary product.',
    targetCount: 10,
    caStep: 'CA4',
    guidance: 'Think of this as a tagline factory. "Breakfast: the first meeting of the day between you and possibility." "Commute: the daily migration from who you were to who you\'re becoming." Each redefinition should be punchy enough to work on a billboard.',
  },
  {
    id: 26, day: 26, title: 'CA4: Speed Run',
    type: 'caExercise',
    prompt: 'Set a timer for 20 minutes. Pick a product and race through CA1→CA2→CA3→CA4, writing 3 items for each step (12 total). Speed forces your brain to skip the obvious and jump to the creative.',
    targetCount: 12,
    caStep: 'fullCA',
    guidance: 'Speed is your friend here. Don\'t overthink—write the first thing that comes to mind for each CA step. The best creative ideas often arrive when you don\'t have time to censor yourself. 3 facts, 3 names, 3 similarities, 3 definitions. Go!',
    productSuggestions: ['Sunscreen', 'A notebook', 'A bus pass', 'Chewing gum'],
  },
  // === Chapter 11: Verbal Foreplay (Day 27) ===
  {
    id: 27, day: 27, title: 'Write Headlines',
    type: 'caExercise',
    prompt: 'Write 10 advertising headlines for a product of your choice. Use your CA skills: 3 headlines based on CA1 (facts), 3 based on CA2 (new names), 2 based on CA3 (similarities), and 2 based on CA4 (new definitions).',
    targetCount: 10,
    caStep: 'headline',
    guidance: 'A great headline stops the reader. It should be surprising, specific, and irresistible. Use your CA training: a CA1 headline leads with a surprising fact. A CA2 headline introduces a new name. A CA3 headline draws an unexpected comparison. A CA4 headline redefines something familiar.',
    productSuggestions: ['A new restaurant', 'A fitness app', 'A bicycle brand', 'A bookshop'],
  },
  // === Chapters 12-14: Body English / Students / Professionals (Day 28) ===
  {
    id: 28, day: 28, title: 'Create a Full Ad',
    type: 'caExercise',
    prompt: 'Create a complete print ad using all four Creative Aerobic exercises. Include: (1) a headline, (2) body copy (2-3 sentences), (3) a visual concept description, and (4) a tagline. Write it all out.',
    targetCount: 4,
    caStep: 'fullCA',
    guidance: 'The best advertising creates synergy between words and images. Your headline grabs attention (CA1 or CA4). Your body copy tells the story (CA1 facts + CA3 similarities). Your visual concept reinforces the message (CA2 new perspective). Your tagline seals the deal (CA4 redefinition).',
    productSuggestions: ['A sustainable water bottle', 'A local bakery', 'A meditation app', 'A vintage record store'],
  },
  // === Chapter 15: Every Body Needs a Slogan (Day 29) ===
  {
    id: 29, day: 29, title: 'Slogan Workshop',
    type: 'caExercise',
    prompt: 'Create slogans for 5 different products using the CA process. For each product: write 1 CA1-based slogan (fact-driven), 1 CA2-based slogan (new name), and 1 CA4-based slogan (redefinition). That\'s 15 slogans total.',
    targetCount: 15,
    caStep: 'slogan',
    guidance: 'Slogans are the shortest form of advertising copy. Think "Just Do It" (3 words), "Think Different" (2 words), "Because You\'re Worth It" (5 words). Your CA training gives you three angles: lead with a surprising fact, coin a new term, or redefine something familiar.',
    productSuggestions: ['A coffee brand', 'A running shoe', 'A music streaming service', 'A bookstore', 'A airline'],
  },
  // === Chapters 16-18: Mass Media / .Com / Reflections (Day 30) ===
  {
    id: 30, day: 30, title: 'Capstone: Digital Campaign',
    type: 'caExercise',
    prompt: 'Design a digital advertising campaign for a product of your choice. Include: (1) 3 social media post concepts, (2) a 15-second video ad script, (3) a banner ad headline + tagline, (4) a search ad copy (title + description). Use all four CAs throughout.',
    targetCount: 4,
    caStep: 'fullCA',
    guidance: 'Digital media requires adapting CA to different formats. Social posts need to be shareable (CA3 similarities create "I relate to this" moments). Video needs a hook in the first 3 seconds (CA1 surprising fact). Banner ads need instant comprehension (CA4 redefinition). Search ads need relevance (CA1 facts + CA2 naming).',
    productSuggestions: ['A new podcast app', 'An online learning platform', 'A food delivery service', 'A sustainable fashion brand'],
  },
]

export const chapters: CAChapter[] = [
  {
    id: 1,
    title: 'Taking the Wraps/Raps off Creative Aerobics',
    days: [1, 2, 3],
    reading: `Creative Aerobics (CA) is an ideation process designed to make coming up with ideas faster, less stressful, and more fun. It consists of four exercises that build on each other:

In Creative Aerobics 1, you're finding little-known facts about your product and adding a twist—an individual point of view that is verbal or visual.

In Creative Aerobics 2, you create new names—new nomenclature for your products, and the main intent is to figure out the connection.

In Creative Aerobics 3, you're expressing the relationship between your market and your product, identifying the similarities between them.

In Creative Aerobics 4, you're creating new definitions for things, picking out differences that make the reader think about it from a different perspective.

The more you use CA, the more proficient you will become. Soon, it will be second nature. What makes your CA ideas effective is that they present your product or idea differently from the way readers are used to experiencing it—in ways that force readers to "get it." Getting it is kind of like the punchline of a joke—it rewards you for listening.

Before diving into the CA exercises, let's start with brain warm-ups to build your left and right brain flexibility.`,
  },
  {
    id: 2,
    title: 'In the Beginning...',
    days: [4, 5],
    reading: `Notice what happens to your thinking as you add more internal answers to the exercises. Are the answers coming faster? Are you finding more questions as you go?

Your brain should be feeling tired—but the fatigue should be accompanied by a sense of accomplishment. That's the creative muscle building.

Nobel Prize winner Roger Sperry theorized that specific activities are controlled by one side of the brain or the other. The right side controls creative activities, while the left side handles logic, language, and reasoning. Creative Aerobics works by engaging both sides simultaneously.

The exercises in this chapter push you from left-brain word logic into right-brain pattern recognition and back again. Each time you switch, the connection between the two hemispheres grows stronger. That's why these warm-ups matter—they're building the neural pathways you'll need for the CA exercises ahead.`,
  },
  {
    id: 3,
    title: 'David versus Goliath, AKA Small versus The Big Idea',
    days: [6, 7, 8],
    reading: `The term "The Big Idea" goes back decades in advertising. But here's the secret: Big Ideas start out as small ideas. They start as those fresh, small, out-of-the-box thoughts that CA generates for you. And then they grow.

It's much more productive to keep adding elements and dimensions until your thoughts scream "I'm a Big Idea now!" than to sit around waiting for lightning to strike.

A Big Idea transcends cultural and geographical boundaries. It must resonate with consumers. It is disruptive—a game changer. It has talk value. And it stretches brands.

The advantage of thinking small is the depth to which your creativity can descend. The breadth of thinking big is that there's that much more to work with. The exercises in this chapter continue building your word-manipulation skills while you internalize this principle.`,
  },
  {
    id: 4,
    title: 'Defining the Creative Process Today',
    days: [9, 10],
    reading: `The four stages of the creative process—preparation, incubation, illumination, and verification—were identified in 1926 by Graham Wallas. James Webb Young added his five steps in 1939. Edward de Bono introduced lateral thinking in 1967. Tony Buzan added mind mapping in 1974.

What's missing from all of them? Interrelationship among steps, and speed. Today we need a simpler, faster way to search for ideas.

CA supplies both. Since the exercises are related to each other, they're step savers. They snowball—building solutions as you practice, making the process habit-forming. You start to recognize results while you're still implementing an exercise.

The exercises are always the same structure. That comfort level is a feature, not a bug. It's a database that's completely open-ended, depending on how much information you choose to work with. When you finish all four exercises, the solutions will be in place.`,
  },
  {
    id: 5,
    title: 'Developing Your Creative Magnifying Glass',
    days: [11, 12, 13, 14, 15],
    reading: `Creativity begins with close observation. Think of peering through a magnifying glass into a kaleidoscope—examining every detail in extreme close-up, then watching how the mirrors and colors reshape your thinking.

Primary research—direct contact with what you're studying—lets you use all your senses. In a world where everyone can access the same content, developing an individual identity for what we create is growing more important in every endeavor.

The warm-up exercises in this chapter reduce language to its lowest common denominator: the letters that make up words. They're abstract verbal warm-ups that stretch your left and right brains, making them more flexible. You'll begin to look at words in a narrower context, stripping away normal interaction with them.

Each exercise is open-ended—there isn't the stress of having to come up with THE right answer. There are many right answers. And after all, you're going to need words to express your ideas!`,
  },
  {
    id: 6,
    title: 'Training for Your Creativity Marathon',
    days: [16],
    reading: `Just as every athlete must train to get into shape for competition, you need to develop a training program for your creativity. The key is to approach each exercise with curiosity and openness—don't judge your ideas too quickly.

The exercises you've been completing have been building your creative stamina. Now it's time to apply those strengthened mental muscles to real products. This is where CA1 begins—the transition from word games to idea generation.

Step 1: Become totally familiar with the assignment. Collect background information on the product.

Step 2: Absorb the information. Discuss it with your team if it's a group project.

Step 3: Let the information percolate. Ideas may come immediately, or they may arrive when you're concentrating on something else.

Step 4: Share and evaluate ideas, deciding which best meet the assignment criteria.`,
  },
  {
    id: 7,
    title: 'Creative Aerobic 1 (CA1)—The Facts. Just the Facts',
    days: [17],
    reading: `Creative Aerobic 1 asks you to find facts—unusual facts, little-known facts, surprising facts—about your product or service. These are the kinds of facts that most people don't know, the kinds that make people say "Really? I didn't know that!"

The first step in the CA process is gathering information. But not just any information—you're looking for the unusual, the surprising, the little-known. Think of yourself as a detective, searching for clues that others have overlooked.

When you find these facts, you'll discover that they often lead naturally to creative ideas. A surprising fact about a product can become the basis for an entire advertising campaign. It's the twist—the unexpected detail—that captures people's attention.

The twist creates an individual point of view. 90 percent of people reading ads will read only the headlines, so the twist must convey the message succinctly.`,
  },
  {
    id: 8,
    title: 'Creative Aerobic 2 (CA2)—New Nomenclature—It Is What It Isn\'t',
    days: [18, 19, 20],
    reading: `Creative Aerobic 2 asks you to look at the information you gathered in CA1 and create new names for existing objects. This is the "fun" exercise—inventing new names for your product.

Each new name gives the reader a fresh way of looking at the product. Go beyond literal renaming. A battery isn't just "power storage"—it could be a "pocket lightning bolt." The best CA2 names create an instant visual or emotional connection.

The naming process works at multiple levels: you can rename the product itself, rename its features, rename its benefits, or rename the experience of using it. Each approach opens different creative doors.

When you rename something, you force both yourself and the audience to see it through fresh eyes. That's the power of CA2—it breaks the automatic association between a thing and its name, creating space for new ideas to emerge.`,
  },
  {
    id: 9,
    title: 'Creative Aerobic 3 (CA3)—It\'s the Same. Only Different',
    days: [21, 22],
    reading: `CA3 is perhaps the most challenging Creative Aerobic—and the most rewarding. It requires you to find similarities between your product and something entirely unrelated. On the surface, they have nothing in common. But dig deeper.

A Stradivarius violin is a musical masterpiece. So is my product. Every similarity you find is a potential headline, a potential ad, a potential campaign.

Here's how the chain works: In CA1, you found that Stradivarius violins are made from a special maple wood. In CA2, you might rename the wood "acoustic gold." In CA3, you compare this quality to something else—perhaps the way a great chef selects ingredients.

The more unlikely the comparison, the more creative the result. That's the paradox of CA3—constraint breeds creativity.`,
  },
  {
    id: 10,
    title: 'Creative Aerobic 4 (CA4)—Refining Creativity',
    days: [23, 24, 25, 26],
    reading: `The fourth and final exercise is about creating new definitions. Take the familiar and make it unfamiliar by defining it in a new way.

You simply redefine a word from its usual meaning to a new meaning that relates to your product. "Marathon" isn't just a long-distance race—it's what our battery gives your phone.

CA4 often produces the most memorable advertising lines. When you redefine a familiar word or phrase, you create a moment of surprise and delight in the reader's mind.

The full CA chain—CA1 facts feeding CA2 names feeding CA3 similarities feeding CA4 definitions—is where the real magic happens. Each step enriches the next. By the time you reach CA4, you have a deep well of creative material that no one else could have produced, because it's built on your unique chain of associations.`,
  },
  {
    id: 11,
    title: 'Verbal Four-/Foreplay',
    days: [27],
    reading: `The purpose of verbal foreplay is to loosen up your verbal skills—to get you thinking in terms of words, their sounds, their rhythms, their multiple meanings. Words are the raw material of advertising, and the more facile you are with them, the more creative your advertising will be.

Now it's time to combine your CA skills with headline writing. A great headline stops the reader. It should be surprising, specific, and irresistible.

A CA1 headline leads with a surprising fact. A CA2 headline introduces a new name. A CA3 headline draws an unexpected comparison. A CA4 headline redefines something familiar.

The best headlines work on multiple levels—they reward repeated reading with new layers of meaning.`,
  },
  {
    id: 12,
    title: 'Body English & How the Winners Do It',
    days: [28],
    reading: `"Body English" in advertising refers to the physical expression of ideas through visual design. The visual elements of an ad communicate as much as—or more than—the words.

The visual and verbal should work together. The best advertising creates a synergy between words and images that is greater than either alone.

Student award winners and professional advertisers who use CA demonstrate that the process works regardless of background, experience level, or cultural context. Whether you're a student in Florida, Illinois, or Ahmedabad, the process produces results.

The real value of CA is authenticity. Your CA experience will be very different from anyone else's. Your ideas will be shaped by the person you are and by the experiences you've had.`,
  },
  {
    id: 13,
    title: 'Every Body (Copy) Needs a Slogan, Sometimes',
    days: [29],
    reading: `A slogan—also known as a tagline, motto, or catchphrase—summarizes the essence of a brand in a few memorable words. "Just Do It." "Think Different." "Because You're Worth It."

What makes these work? They're simple, memorable, and they capture something essential about the brand.

Your CA training gives you three powerful angles for slogan creation: lead with a surprising fact (CA1), coin a new term (CA2), or redefine something familiar (CA4). CA3 can also inspire slogans through unexpected comparisons.

The shortest form of advertising copy demands the most creativity per word. Every word must earn its place.`,
  },
  {
    id: 14,
    title: 'Mass Media, .Com Creativity & Reflections',
    days: [30],
    reading: `The media landscape has transformed dramatically. Traditional media now coexists with digital, social, and mobile platforms. For the creative professional, this means more opportunities and more challenges.

Digital media requires adapting CA to different formats: social posts need to be shareable, video needs a hook in the first 3 seconds, banner ads need instant comprehension, search ads need relevance.

Through all these changes, the fundamental principles of CA remain constant: find the facts, create new names, discover similarities, and redefine the familiar. The medium may change, but the creative process stays the same.

CA was developed to address the core challenge of creative work: how do you capture someone's attention and persuade them to take action? Whether you're writing a tweet or producing a television commercial, the four CA exercises will serve you well. Practice them until they become second nature.`,
  },
]

export function getExercise(day: number): CAExercise | undefined {
  return exercises.find(e => e.day === day)
}

export function getChapterForDay(day: number): CAChapter | undefined {
  return chapters.find(ch => ch.days.includes(day))
}
