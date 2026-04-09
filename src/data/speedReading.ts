import type { SRExercise, SRChapter } from '../types/speedReading'

export const TOTAL_DAYS = 30

export const exercises: SRExercise[] = [
  // ============================================================
  // DIVISION ONE: EXPLORING YOUR SPEEDS
  // ============================================================

  // === Chapter 1: Where Are You Now? (Days 1-2) ===
  {
    id: 1, day: 1, title: 'Opening Quiz',
    type: 'multipleChoice',
    prompt: 'Test your assumptions about reading. Answer True or False to each statement about speed reading.',
    questions: [
      {
        question: 'Speeds of over 1000 words per minute are possible.',
        options: ['True', 'False'],
        correctIndex: 0,
      },
      {
        question: 'If you read faster, your comprehension will automatically drop.',
        options: ['True', 'False'],
        correctIndex: 1,
      },
      {
        question: 'The faster you read, the less you concentrate.',
        options: ['True', 'False'],
        correctIndex: 1,
      },
      {
        question: 'Average reading speeds cannot be significantly improved.',
        options: ['True', 'False'],
        correctIndex: 1,
      },
      {
        question: 'It is important to read every word to fully understand a text.',
        options: ['True', 'False'],
        correctIndex: 1,
      },
      {
        question: 'Going back to re-read passages improves comprehension.',
        options: ['True', 'False'],
        correctIndex: 1,
      },
      {
        question: 'Reading aloud or moving your lips helps you understand better.',
        options: ['True', 'False'],
        correctIndex: 1,
      },
      {
        question: 'One word at a time is the best way to read.',
        options: ['True', 'False'],
        correctIndex: 1,
      },
      {
        question: 'Using a guide (finger or pointer) is childish and slows you down.',
        options: ['True', 'False'],
        correctIndex: 1,
      },
      {
        question: 'Your reading speed is fixed by the time you leave school.',
        options: ['True', 'False'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 2, day: 2, title: 'Self Test 1: The Intelligence War',
    type: 'speedLog',
    prompt: 'Read the passage below at your normal speed. Time yourself, then answer the comprehension questions.',
    instructions: 'Read the passage using a timer. Calculate your WPM: words in passage ÷ time in minutes. Then answer the comprehension questions to assess your understanding.',
    wordCount: 0,
    passage: `In 1979, Dr Luis Alberto Machado became the first person in history to be appointed a Minister for the Development of Intelligence, in Venezuela. This appointment was not mere political novelty — it was backed by a profound conviction, supported by growing scientific evidence, that human intelligence is not a fixed quantity determined solely by genetics, but a dynamic, trainable capacity that can be improved at any age.

Machado's programs, implemented across Venezuelan schools and communities, produced startling results. Children who participated in structured brain-training curricula showed IQ increases of up to 40 per cent. These were not marginal improvements on the fringes of measurement error; they were substantial, replicable gains that challenged the long-held assumption that intelligence is essentially immutable after early childhood.

The implications of this work reached far beyond Venezuela. Around the world, researchers and educators began re-examining the question: is intelligence fixed, or can it be trained? The answer, supported by an ever-growing body of evidence, is that it can most certainly be trained. The brain, like any other organ of the body, responds to exercise. When given appropriate stimulation and challenge, it grows stronger, more efficient, and more capable.

The ancient Greeks understood this intuitively. In their civilisation, memory was considered one of the highest intellectual virtues. They developed elaborate mnemonic systems — the Method of Loci, for example — that allowed trained individuals to memorise vast quantities of information with extraordinary accuracy. These were not tricks or shortcuts; they were systematic methods for exercising and expanding the brain's natural capabilities. The Greeks knew that a trained memory was not merely a party trick but the foundation of all learning, reasoning, and creative thought.

In the modern corporate world, this understanding has begun to take root as well. Companies such as Digital Equipment Corporation, Nabisco, and numerous Fortune 500 firms have invested heavily in brain-training programs for their employees. These programs typically focus on memory enhancement, speed reading, creative thinking, and problem-solving skills. The results have been consistently positive: employees who undergo such training show measurable improvements in productivity, decision-making speed, and the ability to absorb and retain complex information.

The average untrained reader reads at approximately 200 to 250 words per minute, with a comprehension rate of around 50 to 70 per cent. These figures are remarkably low when one considers the extraordinary capabilities of the human brain. The brain contains approximately ten billion nerve cells, each one capable of forming connections with thousands of others. The number of potential neural patterns is, for all practical purposes, infinite — greater than the number of atoms in the known universe.

Yet despite this staggering potential, most people use only a tiny fraction of their brain's capacity. This is not because the brain is inherently limited, but because most people have never been taught how to use it effectively. Reading is a perfect case in point. The vast majority of readers still use the same basic techniques they were taught in primary school — techniques designed for six-year-olds learning to decode letters, not for adults seeking to process complex information efficiently.

The good news is that this can change. Research conducted over the past fifty years has conclusively demonstrated that reading speed and comprehension can both be improved dramatically through proper training. The key insight is that speed and comprehension are not opposites on a fixed continuum; they are complementary skills that improve together. When you learn to read faster, you are not sacrificing understanding — you are training your brain to process information more efficiently, which actually enhances comprehension.

The formula for measuring reading speed is straightforward: words per minute equals the total number of words in a passage divided by the time taken to read it in minutes. This simple metric provides a baseline against which you can measure your progress throughout this course. But remember that speed alone is meaningless without comprehension. The goal is not merely to move your eyes across the page faster, but to take in and understand more information in less time.

One of the most persistent myths about the brain is that we inevitably lose brain cells as we age, leading to an unavoidable decline in mental capacity. Recent neuroscientific research has thoroughly debunked this notion. Studies of healthy, mentally active adults have found no evidence of significant brain cell loss with age. In fact, the opposite appears to be true: brains that are regularly exercised and challenged continue to grow new connections and maintain their processing power well into old age.

Professor Marian Diamond of the University of California at Berkeley demonstrated that enriched environments — those providing mental stimulation, challenge, and novelty — actually cause the brain to grow physically larger, with more and denser neural connections. Her research, conducted over decades, showed that this growth potential exists throughout the entire lifespan, not just in childhood.

The message is clear: your brain is not a fixed, declining organ. It is a dynamic, adaptable, and extraordinarily powerful biological computer that responds to training. The intelligence war — the battle to unlock human potential — is one that can be won. And the first step in winning it is to challenge your assumptions about what is possible, starting with the way you read.

Your current reading speed, whatever it may be, is not your natural limit. It is simply the result of the training — or lack of training — you have received. With the right techniques and consistent practice, you can dramatically increase both your speed and your comprehension, unlocking more of the vast potential that resides within your remarkable brain.`,
    passageWordCount: 808,
    comprehensionQuestions: [
      {
        question: 'Research into brain training shows that intelligence can be trained and improved at any age.',
        options: ['True', 'False'],
        correctIndex: 0,
      },
      {
        question: 'What is the average reading speed of an untrained reader?',
        options: ['100-150 wpm', '200-250 wpm', '300-350 wpm', '400-450 wpm'],
        correctIndex: 1,
      },
      {
        question: 'There is evidence of significant brain cell loss in healthy, mentally active brains.',
        options: ['True', 'False'],
        correctIndex: 1,
      },
      {
        question: 'What is the formula for calculating words per minute (WPM)?',
        options: [
          'Words × time in minutes',
          'Words + time in seconds',
          'Words ÷ time in minutes',
          'Words - time in minutes',
        ],
        correctIndex: 2,
      },
      {
        question: 'According to the passage, speed and comprehension should:',
        options: [
          'Be traded off against each other',
          'Both improve together with training',
          'Be trained separately at different times',
          'Not be measured simultaneously',
        ],
        correctIndex: 1,
      },
    ],
  },

  // === Chapter 2: The History of Speed Reading (Day 3) ===
  {
    id: 3, day: 3, title: 'History of Speed Reading',
    type: 'multipleChoice',
    prompt: 'Test your knowledge of how speed reading developed throughout history.',
    questions: [
      {
        question: 'Speed reading research began during which major conflict, when the military needed pilots to identify aircraft quickly?',
        options: ['World War I', 'World War II', 'The Korean War', 'The Vietnam War'],
        correctIndex: 1,
      },
      {
        question: 'The tachistoscope, an early speed reading training device, was originally developed to help pilots:',
        options: [
          'Read maps faster',
          'Identify friendly and enemy aircraft at very fast flash speeds',
          'Read instrument panels',
          'Decode encrypted messages',
        ],
        correctIndex: 1,
      },
      {
        question: 'What was the limitation of tachistoscope-based speed reading courses?',
        options: [
          'They were too expensive',
          'Speed gains were not maintained long-term because the machine only trained recognition, not overall reading process',
          'They required military clearance',
          'They only worked for fiction',
        ],
        correctIndex: 1,
      },
      {
        question: 'Evelyn Wood\'s breakthrough in the 1950s was discovering that:',
        options: [
          'Computers could teach reading',
          'Naturally fast readers used a sweeping hand motion as a visual guide across and down the page',
          'Speed reading is genetic',
          'Phonics is the key to speed',
        ],
        correctIndex: 1,
      },
      {
        question: 'President John F. Kennedy was a notable advocate of speed reading and reportedly read at speeds of:',
        options: ['200 wpm', '400 wpm', 'Over 1000 wpm', 'Over 2000 wpm'],
        correctIndex: 2,
      },
      {
        question: 'The key advance beyond the tachistoscope era was the realisation that speed reading involves training:',
        options: [
          'Only eye muscles',
          'The whole reading process including eye movements, comprehension, and mental engagement',
          'Only vocabulary',
          'Only peripheral vision',
        ],
        correctIndex: 1,
      },
    ],
  },

  // === Chapter 3: Reading: a New Definition (Day 4) ===
  {
    id: 4, day: 4, title: 'A New Definition of Reading',
    type: 'multipleChoice',
    prompt: 'Explore what reading truly is and why the traditional definition falls short.',
    questions: [
      {
        question: 'According to Buzan, the traditional definition of reading as simply "understanding words on a page" is:',
        options: [
          'Completely accurate',
          'Incomplete — it ignores the seven major skills involved in reading',
          'Only relevant for fiction',
          'The same as speed reading',
        ],
        correctIndex: 1,
      },
      {
        question: 'Which of the following is NOT one of the seven skills of reading identified by Buzan?',
        options: ['Recognition', 'Assimilation', 'Handwriting speed', 'Comprehension'],
        correctIndex: 2,
      },
      {
        question: 'In Buzan\'s model, "intra-integration" means:',
        options: [
          'Linking what you read with what you already know',
          'Linking and connecting all parts of the information being read with all other parts',
          'Reading between the lines of a text',
          'Combining speed and comprehension',
        ],
        correctIndex: 1,
      },
      {
        question: '"Extra-integration" in reading means:',
        options: [
          'Reading extra material on the subject',
          'Connecting the information you have just read with all your previous knowledge, experience, and understanding',
          'Reading beyond the assigned text',
          'Integrating pictures with text',
        ],
        correctIndex: 1,
      },
      {
        question: 'Retention and Recall are listed as separate reading skills because:',
        options: [
          'They are the same thing',
          'Retention is storing information; Recall is the ability to retrieve it when needed — you can retain without being able to recall',
          'Retention applies to fiction and Recall to non-fiction',
          'Retention is short-term and Recall is not important',
        ],
        correctIndex: 1,
      },
      {
        question: 'The final skill in the reading model is Communication, which includes:',
        options: [
          'Only writing essays',
          'Speaking, writing, drawing, Mind Mapping — applying what you have read',
          'Only verbal discussion',
          'Only taking linear notes',
        ],
        correctIndex: 1,
      },
    ],
  },

  // ============================================================
  // DIVISION TWO: YOUR AMAZING EYES
  // ============================================================

  // === Chapter 4: Gaining Control of Your Eye Movements (Days 5-6) ===
  {
    id: 5, day: 5, title: 'Eye Movement Science',
    type: 'multipleChoice',
    prompt: 'Test your understanding of how the eyes actually work during reading.',
    questions: [
      {
        question: 'When reading, the eye does not move smoothly across the line. Instead it makes a series of quick jumps called:',
        options: ['Fixations', 'Saccades', 'Regressions', 'Scans'],
        correctIndex: 1,
      },
      {
        question: 'The brief pauses between saccades, during which the brain actually takes in information, are called:',
        options: ['Saccades', 'Regressions', 'Fixations', 'Absorptions'],
        correctIndex: 2,
      },
      {
        question: 'A poor reader typically fixates on:',
        options: [
          'Every single word or even parts of words',
          'Groups of 3-5 words',
          'Whole sentences at once',
          'Only the first word of each line',
        ],
        correctIndex: 0,
      },
      {
        question: 'Back-skipping differs from regression in that:',
        options: [
          'They are the same thing',
          'Back-skipping is unconscious and unintentional, while regression is a conscious decision to re-read',
          'Back-skipping is faster',
          'Regression is unconscious and back-skipping is conscious',
        ],
        correctIndex: 1,
      },
      {
        question: 'The average poor reader back-skips approximately how many times per line?',
        options: ['Once', 'Twice', '5-10 times', 'They never back-skip'],
        correctIndex: 0,
      },
      {
        question: 'Expanding peripheral vision during reading allows you to:',
        options: [
          'See the whole page at once',
          'Absorb more words per fixation, reducing the total number of fixations needed',
          'Read without moving your eyes at all',
          'See in the dark',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 6, day: 6, title: 'Self Test 2: Art — Primitive to Christian',
    type: 'speedLog',
    prompt: 'Read the passage below and time yourself. Then answer the comprehension questions.',
    instructions: 'Use a timer and your guide. Calculate your WPM after reading. Answer all comprehension questions.',
    wordCount: 0,
    passage: `The story of art begins in the darkness of prehistoric caves, where the earliest known human paintings date from approximately 40,000 to 10,000 BC. These cave paintings, found most famously at Lascaux in France and Altamira in Spain, represent humanity's first known attempt to capture the visible world in permanent form. The paintings depict animals — bison, horses, deer, and mammoths — with a vitality and accuracy that astonished the modern archaeologists who first discovered them.

The purpose of these primitive paintings has been the subject of much scholarly debate. The most widely accepted theory is that they served a magical or religious function. By painting an animal on the cave wall, the prehistoric artist believed he was gaining power over it — ensuring a successful hunt. The paintings were not decorative art in the modern sense; they were functional, ritualistic, and deeply connected to survival. The caves themselves were often difficult to access, suggesting the paintings were meant for ceremonial rather than casual viewing.

As civilisation developed, art became increasingly bound to religion and the state. In ancient Egypt, art served primarily as a vehicle for religious expression and a means of ensuring immortality for the pharaohs and the elite. Egyptian art followed strict conventions that remained remarkably stable for nearly three thousand years. Figures were depicted in a characteristic combination of frontal and profile views — the head in profile, the eye shown frontally, shoulders facing forward, and legs in profile. This was not because Egyptian artists lacked the skill to depict figures naturalistically; it was because their purpose was not to capture a moment of reality but to provide a complete and idealised representation that would serve the deceased in the afterlife.

The transition to Greek art marked a revolution in the history of visual expression. The Greeks were the first civilisation to place human beauty and naturalistic representation at the centre of their artistic ambition. Beginning with the archaic period and its stiff, formalised kouroi statues, Greek art evolved through the classical period to achieve an extraordinary mastery of the human form. Sculptors such as Phidias, Polykleitos, and Praxiteles created works of such anatomical precision and idealised beauty that they have defined Western aesthetic standards ever since.

Greek painting was equally accomplished, though far less of it has survived. We know of its excellence primarily through literary descriptions and through Roman copies. The eruptions of Vesuvius in AD 79, while destroying the cities of Pompeii and Herculaneum, paradoxically preserved some of the finest examples of ancient painting under layers of volcanic ash. The frescoes recovered from these sites reveal sophisticated techniques of perspective, shading, and colour that would not be matched again in Western art for over a thousand years.

Roman art drew heavily upon Greek models, and indeed many of the Greek paintings and sculptures we know today survive only as Roman copies. But Rome made its own distinctive contributions, particularly in the field of mosaic art. Roman mosaics, created from thousands of tiny coloured stones called tesserae, adorned the floors and walls of villas, baths, and public buildings throughout the empire. These mosaics ranged from simple geometric patterns to extraordinarily detailed pictorial scenes depicting mythology, daily life, hunting, and the natural world. The technical skill involved in creating a detailed image from thousands of individual stone fragments was remarkable.

The fall of the Roman Empire and the rise of Christianity brought about a fundamental transformation in the purpose and appearance of Western art. Early Christian artists faced a profound theological dilemma: the Second Commandment prohibited the making of "graven images," and many early Church fathers believed that realistic depiction of the human form was blasphemous — an arrogant attempt to replicate God's creation. This theological conviction led to a deliberate move away from the naturalistic traditions of Greek and Roman art.

Early Christian art therefore adopted a highly stylised, symbolic visual language. Figures were depicted as flat, frontal, and hieratic — arranged according to their spiritual importance rather than their physical position in space. The emphasis was on conveying spiritual truth rather than physical reality. Gold backgrounds replaced naturalistic landscapes, eyes were enlarged to suggest spiritual vision, and bodies were elongated and dematerialised. The purpose of art was no longer to celebrate the beauty of the physical world but to direct the viewer's mind toward the divine.

This approach dominated Western art for several centuries and found its fullest expression in the Byzantine tradition, where icons — sacred images of Christ, the Virgin Mary, and the saints — were created according to strict theological and artistic conventions. The icon was not considered a mere representation; it was believed to be a window into heaven, a sacred object through which the faithful could commune with the divine. The artist was not expressing personal creativity but serving as a channel for spiritual truth.

The tension between the desire for naturalistic representation and the theological suspicion of realistic imagery would continue to shape Western art for centuries to come, eventually finding resolution in the great synthesis of the Renaissance, when artists discovered how to celebrate both the beauty of the physical world and the glory of the divine within a single unified vision.`,
    passageWordCount: 793,
    comprehensionQuestions: [
      {
        question: 'What is the main benefit of expanding peripheral vision during reading?',
        options: [
          'It helps you skip unimportant words',
          'It allows you to absorb more words per fixation',
          'It makes the text appear larger',
          'It reduces eye strain',
        ],
        correctIndex: 1,
      },
      {
        question: 'When readers are prevented from regressing (going back), their comprehension is:',
        options: [
          'Dramatically worse',
          'Slightly worse',
          'The same or better than before',
          'Impossible to measure',
        ],
        correctIndex: 2,
      },
      {
        question: 'The average untrained reading speed is approximately:',
        options: ['100-150 wpm', '200-250 wpm', '350-400 wpm', '500-600 wpm'],
        correctIndex: 1,
      },
      {
        question: 'Fewer fixations per line work because:',
        options: [
          'You skip unimportant words',
          'Each fixation takes in a wider group of words',
          'Your eyes move faster between fixations',
          'You only read key words',
        ],
        correctIndex: 1,
      },
      {
        question: 'Regression is a conscious decision to re-read, while back-skipping is:',
        options: [
          'Also conscious',
          'Unconscious and unintentional',
          'Faster than regression',
          'Only done by advanced readers',
        ],
        correctIndex: 1,
      },
    ],
  },

  // === Chapter 5: Eye-Deal: Environmental Conditions (Day 7) ===
  {
    id: 7, day: 7, title: 'Optimising Your Reading Environment',
    type: 'reflection',
    prompt: 'Evaluate and improve the environmental factors that affect your reading speed and comprehension.',
    questions: [
      'Assess your current reading environment against the ideal conditions: lighting (bright, even, preferably natural light from behind or to the side), desk/chair setup (upright posture, feet flat, material at a slight angle about 50 cm from your eyes), and noise level. What changes can you make today?',
      'Experiment with reading the same passage in two different environments — one poorly lit and one well-lit. Describe any difference you notice in speed, focus, and comfort. Buzan states that poor lighting can reduce speed by up to 50%.',
      'Plan your ideal reading sessions for this week: when will you read, for how long (20-50 minute sessions with breaks), and where? Commit to specific times and places that optimise your concentration.',
    ],
  },

  // === Chapter 6: Guiding the Eyes (Days 8-9) ===
  {
    id: 8, day: 8, title: 'Guide Technique',
    type: 'multipleChoice',
    prompt: 'Test your knowledge of the visual guide technique and its benefits.',
    questions: [
      {
        question: 'The primary reason a visual guide (pen, finger, or pointer) improves reading speed is that it:',
        options: [
          'Makes the text bigger',
          'Provides a smooth, continuous, forward-moving target for the eyes to follow, reducing regression and back-skipping',
          'Blocks out other words',
          'Forces you to skip words',
        ],
        correctIndex: 1,
      },
      {
        question: 'When using the guide technique, the pointer should move:',
        options: [
          'In jerky stop-start motions',
          'Smoothly and slightly faster than feels comfortable, just under the line being read',
          'Only on the first and last word of each line',
          'In circles around each paragraph',
        ],
        correctIndex: 1,
      },
      {
        question: 'Evelyn Wood pioneered the use of a visual guide in her speed reading courses in the:',
        options: ['1930s-40s', '1950s-60s', '1970s-80s', '1990s-2000s'],
        correctIndex: 1,
      },
      {
        question: 'After using a guide for about a week, most readers find that:',
        options: [
          'They want to stop using it',
          'Reading without the guide feels strange and uncomfortable',
          'The guide makes no difference',
          'They read slower with the guide',
        ],
        correctIndex: 1,
      },
      {
        question: 'The guide technique reduces regression because:',
        options: [
          'It covers up previous lines',
          'The forward-moving visual target gives the eyes a consistent direction, making backward movement less likely',
          'It forces you to read every word',
          'It blocks peripheral vision',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 9, day: 9, title: 'Self Test 3: Animal Intelligence',
    type: 'speedLog',
    prompt: 'Read the passage using your guide technique. Time yourself carefully and calculate your WPM.',
    instructions: 'Use your guide throughout. Time yourself and calculate WPM. Then answer the comprehension questions without looking back at the passage.',
    wordCount: 0,
    passage: `Of all the creatures that share our planet, few have captured the human imagination as powerfully as the dolphin. These remarkable marine mammals, members of the family Delphinidae, have been celebrated in human culture for thousands of years — from the dolphin frescoes of ancient Minoan Crete to the modern marine research laboratories where scientists are only now beginning to understand the true depth of dolphin intelligence.

Dolphins communicate using a sophisticated system of clicks, whistles, and body language that many researchers believe constitutes a genuine language — or more accurately, multiple languages. Studies conducted at research centres around the world have revealed that different dolphin populations use distinctly different patterns of communication, effectively speaking in regional dialects. A pod of bottlenose dolphins off the coast of Scotland communicates using a recognisably different set of vocalisations from a pod living in the waters of the Gulf of Mexico, just as human communities separated by geography develop distinct linguistic characteristics.

Perhaps the most extraordinary aspect of dolphin communication is their sonar system, known as echolocation. Dolphins emit rapid sequences of high-frequency clicks that bounce off objects in the water and return to the dolphin, providing a detailed acoustic picture of their surroundings. This biological sonar is so sophisticated that a dolphin can distinguish between objects of different sizes, shapes, and materials even in complete darkness or murky water. They can detect a small fish at distances of over a hundred metres and can differentiate between a solid sphere and a hollow one of the same size.

What makes dolphin echolocation truly remarkable is that it operates simultaneously with their communication system. A dolphin can be engaged in complex social vocalisation with other members of its pod while simultaneously using echolocation to navigate and hunt — the equivalent of a human carrying on a detailed conversation while simultaneously operating radar equipment. This dual-processing capability suggests a level of neurological sophistication that is genuinely extraordinary.

Dolphins are found in all of the world's major oceans and in many river systems as well. They live in social groups called pods, which can range in size from a handful of individuals to groups of several hundred. Within these pods, dolphins maintain complex social relationships characterised by cooperation, play, and what can only be described as friendship. They have been observed supporting sick or injured pod members at the surface so they can breathe, protecting vulnerable individuals from sharks, and engaging in elaborate games that appear to serve no survival function whatsoever — they play simply for the joy of playing.

One of the most striking facts about dolphins is their relationship with humans. Despite being powerful predators with impressive speed and sharp teeth, there is no verified record of a wild dolphin ever making a serious attack on a human being. On the contrary, there are numerous documented cases of dolphins actively protecting humans from sharks, guiding lost swimmers to shore, and approaching boats and divers with apparent curiosity and friendliness. This benevolent disposition toward an entirely different species is almost without parallel in the animal kingdom.

Dolphin vocalisations fall within the range of human hearing, which has made them accessible to scientific study in ways that many other forms of animal communication are not. Researchers have catalogued hundreds of distinct vocalisations and have found that individual dolphins appear to develop unique "signature whistles" — personal identifiers that function remarkably like names. When separated from the pod, a dolphin will repeatedly broadcast its signature whistle, and other dolphins will respond with their own, suggesting a system of individual recognition and calling.

The intelligence of dolphins appears to be passed from generation to generation not merely through genetics but through active teaching and cultural transmission. Mother dolphins spend years training their calves in hunting techniques, social behaviour, and navigation skills. Young dolphins learn by observation and imitation, and different pods have been documented using different hunting strategies — some drive fish onto mud banks, some use sponges on their snouts to protect against rough sea floors while foraging, and some cooperate with human fishermen in mutual hunting arrangements that have persisted for generations.

The three-dimensional spatial intelligence of dolphins deserves special attention. While humans have evolved as essentially two-dimensional creatures — we navigate primarily across flat surfaces — dolphins operate in a fully three-dimensional environment. They must constantly process spatial information in all directions simultaneously: above, below, left, right, forward, and behind. This three-dimensional awareness, combined with their echolocation and social communication, represents a form of intelligence that is not merely different from human intelligence in degree but fundamentally different in kind. We are only beginning to understand what it means to think in three dimensions, and the dolphin may have much to teach us about the possibilities of the mind.`,
    passageWordCount: 747,
    comprehensionQuestions: [
      {
        question: 'The guide technique reduces regression primarily by:',
        options: [
          'Covering previous text',
          'Providing a forward-moving visual target for the eyes to follow',
          'Forcing you to skip words',
          'Making the text appear differently',
        ],
        correctIndex: 1,
      },
      {
        question: 'Who pioneered the use of a visual guide for speed reading in the 1950s-60s?',
        options: ['Tony Buzan', 'Evelyn Wood', 'John F. Kennedy', 'Dr Luis Machado'],
        correctIndex: 1,
      },
      {
        question: 'The main factors that improve speed at this stage are:',
        options: [
          'Reading more books',
          'Awareness of reading habits plus consistent use of a guide',
          'Using a computer screen instead of paper',
          'Reading only easy material',
        ],
        correctIndex: 1,
      },
      {
        question: 'After about a week of consistent guide use, most people find that:',
        options: [
          'The guide becomes unnecessary',
          'Reading without the guide feels strange and uncomfortable',
          'Their speed has not changed',
          'They prefer to stop using it',
        ],
        correctIndex: 1,
      },
      {
        question: 'Buzan recommends taking breaks from reading every:',
        options: ['5-10 minutes', '20-50 minutes', '60-90 minutes', '2-3 hours'],
        correctIndex: 1,
      },
    ],
  },

  // === Chapter 7: Onward to Super-Speed Reading (Day 10) ===
  {
    id: 10, day: 10, title: 'Super-Speed Reading Principles',
    type: 'multipleChoice',
    prompt: 'Test your understanding of advanced speed reading techniques that go beyond the basic guide.',
    questions: [
      {
        question: 'The key to moving from basic speed reading to super-speed reading is:',
        options: [
          'Reading only short texts',
          'Increasing the amount of text taken in per fixation while maintaining guide use and reducing regression',
          'Skipping every other line',
          'Only reading summaries',
        ],
        correctIndex: 1,
      },
      {
        question: 'When increasing your reading speed, temporary dips in comprehension are:',
        options: [
          'A sign you should slow down permanently',
          'Normal and expected — comprehension catches up as the brain adapts to the new speed',
          'A sign of permanent damage',
          'Impossible if using the guide correctly',
        ],
        correctIndex: 1,
      },
      {
        question: 'The concept of "speed bursts" involves:',
        options: [
          'Reading at a comfortable pace',
          'Pushing yourself to read at a pace faster than feels comfortable for short bursts, then returning to a slightly lower but still faster pace',
          'Only reading the first sentence of each paragraph',
          'Reading without a guide',
        ],
        correctIndex: 1,
      },
      {
        question: 'Speed reading is best compared to:',
        options: [
          'A sprint',
          'Driving a car — you shift gears depending on the terrain, adjusting speed to the difficulty and purpose of the material',
          'A marathon at constant pace',
          'Watching television',
        ],
        correctIndex: 1,
      },
      {
        question: 'The "2-3-2" pattern refers to:',
        options: [
          'A breathing exercise',
          'Reading 2 words, skipping 3, reading 2',
          'Starting 2 words in from the margin, expanding to take in 3-word groups, and ending 2 words before the right margin',
          'A posture adjustment technique',
        ],
        correctIndex: 2,
      },
    ],
  },

  // === Chapter 8: Meta-Guiding Towards Photographic Memory (Days 11-12) ===
  {
    id: 11, day: 11, title: 'Meta-Guiding',
    type: 'multipleChoice',
    prompt: 'Explore meta-guiding techniques that expand your visual intake beyond the single line.',
    questions: [
      {
        question: 'Meta-guiding differs from basic guiding in that it:',
        options: [
          'Uses a different type of pointer',
          'Expands the amount of text taken in per movement by guiding the eyes across multiple lines or in sweeping patterns',
          'Eliminates the need for a guide',
          'Only works for left-handed readers',
        ],
        correctIndex: 1,
      },
      {
        question: 'When first learning meta-guiding techniques, a temporary drop in comprehension is:',
        options: [
          'A sign the technique does not work',
          'Normal and expected — the brain needs time to adjust to processing larger chunks of text',
          'Permanent',
          'A sign you should stop immediately',
        ],
        correctIndex: 1,
      },
      {
        question: 'The "vertical sweep" meta-guiding pattern involves:',
        options: [
          'Reading each word vertically',
          'Moving the guide straight down the centre of the page while peripheral vision catches text on both sides',
          'Reading only the middle word of each line',
          'Turning the book sideways',
        ],
        correctIndex: 1,
      },
      {
        question: 'Meta-guiding forces the brain to take in larger chunks of text, which improves speed because:',
        options: [
          'It skips unimportant words',
          'It reduces the total number of fixations and eliminates regression by maintaining constant forward momentum',
          'It only reads headlines',
          'It activates a different part of the brain',
        ],
        correctIndex: 1,
      },
      {
        question: 'The "lazy S" pattern is a meta-guiding technique where the guide moves:',
        options: [
          'In straight horizontal lines',
          'In a smooth S-shaped pattern down the page, sweeping left-to-right then right-to-left across successive lines',
          'Only vertically',
          'In circles',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 12, day: 12, title: 'Self Test 4: Are We Alone in the Universe?',
    type: 'speedLog',
    prompt: 'Use your meta-guiding technique for this passage. Time yourself and calculate your WPM.',
    instructions: 'Try using a meta-guiding technique (such as the lazy S or vertical sweep) while reading. Time yourself and calculate WPM. Then answer the comprehension questions.',
    wordCount: 0,
    passage: `The question of whether we are alone in the universe is one of the most profound that humanity has ever asked. It is a question that touches on our deepest understanding of our place in the cosmos, and in recent decades it has moved from the realm of philosophy and science fiction into the domain of rigorous scientific inquiry.

The numbers alone are staggering. Our galaxy, the Milky Way, contains approximately 80 billion stars. Many of these stars are similar to our own sun, and modern astronomical observations have confirmed that planetary systems are not rare exceptions but common features of stellar evolution. The Kepler space telescope and its successors have identified thousands of exoplanets, and statistical analysis suggests that there are more planets in our galaxy than there are stars — potentially hundreds of billions of worlds, many of them in the "habitable zone" where liquid water could exist on the surface.

The question of how many of these worlds might harbour intelligent life was formalised in 1961 by the astronomer Frank Drake, who developed what is now known as the Drake Equation. This elegant formula attempts to estimate the number of communicating civilisations in our galaxy by multiplying a series of factors: the rate of star formation, the fraction of stars with planets, the fraction of planets that could support life, the fraction where life actually develops, the fraction where intelligence evolves, the fraction that develop technology capable of interstellar communication, and the average lifetime of such civilisations.

Each factor in the Drake Equation involves enormous uncertainty, and estimates of the final number range from essentially zero to millions of civilisations in our galaxy alone. But what makes the equation valuable is not any specific answer it produces — it is the systematic framework it provides for thinking about the question. Frank Drake himself was not merely a theoretician; he was a pioneer of the practical search for extraterrestrial intelligence. In 1960, he conducted Project Ozma, the first systematic attempt to detect radio signals from other civilisations, pointing a radio telescope at the nearby stars Tau Ceti and Epsilon Eridani.

The search has continued and expanded enormously since Drake's pioneering effort. The centrepiece of this effort for many years was the Arecibo radio telescope in Puerto Rico, a colossal instrument with a dish approximately 1,000 feet wide — so large that it was built into a natural limestone sinkhole in the mountains. Arecibo was capable of detecting extraordinarily faint radio signals from across the galaxy, and it served as a primary tool for the Search for Extraterrestrial Intelligence, or SETI.

The SETI project searches for patterns in radio signals from space — not random noise, but structured, repetitive signals that could only be produced by an intelligent source. The challenge is immense: the team must search across millions of radio frequencies, pointing at millions of stars, looking for a signal that may be extraordinarily faint and brief. It has been compared to searching for a particular grain of sand on all the beaches of the world.

Among the remarkable individuals who have dedicated their careers to this search is Kent Cullers, a scientist who has been blind since birth. Cullers brought to the SETI team an extraordinary sensitivity to patterns in sound and signal — his blindness had honed his auditory processing abilities to a remarkable degree. He developed much of the signal-processing software used by the SETI project, writing algorithms that could sift through vast quantities of radio data to identify potential artificial signals amidst the natural background noise of the cosmos.

One of the primary target areas for SETI observations has been the constellation of Hercules, chosen because it contains a dense concentration of stars at distances that would allow radio signals to reach Earth within a reasonable timeframe. The great globular cluster M13, located in Hercules, contains hundreds of thousands of stars packed into a relatively small volume of space — making it a promising region in which to search for the signals of a technological civilisation.

In 1974, the Arecibo telescope was used to transmit a powerful radio message toward M13 — a carefully encoded signal containing information about human DNA, the solar system, and the population of Earth. The message will take approximately 25,000 years to reach its destination, and any reply would take an equal time to return. This act — sending a message into the void on the chance that someone might be listening — captures something essential about the human spirit: our refusal to accept that we might be alone, and our determination to reach out across the immensity of space in search of connection.

The search continues today with ever more powerful instruments and sophisticated analysis techniques. Whether it will succeed in our lifetimes — or ever — remains unknown. But the search itself, regardless of its outcome, represents one of the noblest enterprises of the human mind: the attempt to answer the oldest and deepest of all questions about our place in the universe.`,
    passageWordCount: 793,
    comprehensionQuestions: [
      {
        question: 'Meta-guiding expands reading speed primarily by:',
        options: [
          'Skipping paragraphs',
          'Increasing the amount of text taken in per eye movement',
          'Eliminating the need to understand the text',
          'Using audio aids',
        ],
        correctIndex: 1,
      },
      {
        question: 'Temporary comprehension drops when first using meta-guiding are:',
        options: [
          'A sign the technique is harmful',
          'Normal — the brain adapts and comprehension recovers',
          'Permanent',
          'Only experienced by slow readers',
        ],
        correctIndex: 1,
      },
      {
        question: 'The improvement from meta-guiding comes from a combination of:',
        options: [
          'Skipping words and reading summaries',
          'Reduced regression, consistent guide use, and expanded fixation width',
          'Reading only topic sentences',
          'Memorising the text beforehand',
        ],
        correctIndex: 1,
      },
      {
        question: 'In the vertical sweep technique, the guide moves:',
        options: [
          'Horizontally across each line',
          'Down the centre of the page while peripheral vision catches text on both sides',
          'In a circular pattern',
          'Only along the left margin',
        ],
        correctIndex: 1,
      },
      {
        question: 'Meta-guiding forces the reader to maintain forward momentum, which:',
        options: [
          'Reduces comprehension permanently',
          'Forces the brain to process larger chunks of text and eliminates back-skipping',
          'Is only useful for fiction',
          'Works only in bright light',
        ],
        correctIndex: 1,
      },
    ],
  },

  // === Chapter 9: Developing Your Skimming and Scanning Skills (Day 13) ===
  {
    id: 13, day: 13, title: 'Skimming and Scanning',
    type: 'multipleChoice',
    prompt: 'Understand the difference between skimming and scanning, and when to use each.',
    questions: [
      {
        question: 'Skimming is best defined as:',
        options: [
          'Reading every word very quickly',
          'Rapidly moving through material to get the overall gist, structure, and main ideas without reading every word',
          'Only reading the first page',
          'Reading and immediately forgetting',
        ],
        correctIndex: 1,
      },
      {
        question: 'Scanning differs from skimming in that scanning is:',
        options: [
          'Slower than skimming',
          'Searching for specific information, such as a name, date, or keyword, without reading surrounding text',
          'The same as normal reading',
          'Only used for fiction',
        ],
        correctIndex: 1,
      },
      {
        question: 'When skimming a non-fiction chapter, you should focus on:',
        options: [
          'Every word equally',
          'Headings, first and last sentences of paragraphs, bold text, images, and summary sections',
          'Only the longest paragraphs',
          'Only the footnotes',
        ],
        correctIndex: 1,
      },
      {
        question: 'Skimming is most useful as:',
        options: [
          'A replacement for reading',
          'A preview step before deeper reading, or when you need only the main ideas from a text',
          'A method for memorising details',
          'Something only fast readers can do',
        ],
        correctIndex: 1,
      },
      {
        question: 'Effective scanning requires:',
        options: [
          'Reading the whole text first',
          'A clear mental image of what you are looking for before you begin, then moving your guide rapidly through the text',
          'Closing one eye',
          'Reading aloud',
        ],
        correctIndex: 1,
      },
    ],
  },

  // === Chapter 10: Your Relativistic Brain: Metronome Training (Days 14-15) ===
  {
    id: 14, day: 14, title: 'Metronome Practice',
    type: 'reflection',
    prompt: 'Practice using a metronome (or metronome app) to establish consistent reading rhythm and push your speed.',
    questions: [
      'Set a metronome to 60 beats per minute. Read for 5 minutes, turning the page on each beat (or moving to the next line group). Describe the experience — did the consistent rhythm feel different from your usual reading pace? What was your approximate WPM?',
      'Now increase the metronome to 80 beats per minute and read for another 5 minutes. After finishing, immediately return to 60 bpm. Does the slower speed now feel easier and more comfortable than it did before? This is your "relativistic brain" at work — speed perception is relative to your recent experience.',
      'Reflect on the concept of "speed bursts." By periodically pushing beyond your comfort zone, you reset your brain\'s baseline. How might you incorporate speed bursts into your daily reading practice going forward? Set a specific plan for the next week.',
    ],
  },
  {
    id: 15, day: 15, title: 'Self Test 5: Baby Brain',
    type: 'speedLog',
    prompt: 'Read this passage using your guide at a challenging pace. Time yourself and calculate your WPM.',
    instructions: 'Set a metronome if possible. Use your guide. Push slightly beyond your comfort zone. Calculate your WPM and answer the comprehension questions.',
    wordCount: 0,
    passage: `The human brain is arguably the most complex and remarkable structure in the known universe, and its development begins with extraordinary speed and precision almost from the moment of conception. By just eight weeks after conception — when the embryo is still smaller than a walnut — the basic structure of the brain has already formed. The major divisions are in place, neurons are being generated at an astonishing rate, and the foundations of the most complex organ ever to evolve are being laid down with breathtaking speed.

By ten weeks before birth, the brain is largely formed in its basic architecture. The cerebral hemispheres, the cerebellum, the brainstem, and the intricate folds and convolutions that give the human brain its characteristic wrinkled appearance are all established. From this point forward, the primary task is not building new structures but refining, connecting, and myelinating the billions of neurons that will form the thinking, feeling, dreaming organ of the newborn child.

At birth, the human brain already weighs approximately 25 per cent of its eventual adult weight — a remarkably high proportion when one considers that the newborn's total body weight is only about 5 per cent of what it will eventually be. The brain, in other words, develops far ahead of the rest of the body, reflecting the supreme importance that evolution has placed on cognitive capacity in our species. By the age of two, the brain has reached approximately 75 per cent of its adult weight, and by the age of five it has reached roughly 90 per cent.

This means that approximately 75 per cent of brain development occurs in the first two years of life — a period of growth and learning so intense that it dwarfs anything that follows. During these early years, the infant brain is forming connections between neurons at a rate of up to two million new synapses per second. The baby is not a passive recipient of stimulation but an active, voracious learner, constructing an internal model of the world with a speed and efficiency that no adult learner can match.

Babies enter the world already equipped to engage with a three-dimensional environment. From the earliest hours of life, newborns demonstrate sophisticated visual capabilities. They can track moving objects, they show a clear preference for face-like patterns over other visual stimuli, and they can distinguish their mother's face from a stranger's within hours of birth. This is not learned behaviour in the traditional sense — it is the product of neural circuits that have been shaped by millions of years of evolution to prioritise social information from the very beginning.

Even more remarkably, research has shown that babies recognise their mother's voice from birth — indeed, from before birth. Studies in which newborns were given a choice between hearing their mother's voice and a stranger's voice (by adjusting their sucking rate on a specially designed pacifier) consistently showed a strong preference for the mother's voice. The baby has been listening and learning in the womb, tuning in to the rhythms and patterns of the voice it will depend on for survival.

The infant brain's capacity for connection-making is, paradoxically, even greater than the adult brain's in certain respects. During critical periods of development — the so-called "brain spurts" that occur at regular intervals throughout childhood — the number of connections between brain cells actually exceeds the number found in adult brains. The infant brain produces a vast surplus of synaptic connections, far more than it will ultimately need. This process of overproduction followed by selective pruning — in which frequently used connections are strengthened while unused ones are eliminated — is the brain's way of adapting itself to the specific environment in which it finds itself.

This discovery has profound implications. It means that a baby's brain is not a simplified version of an adult brain waiting to grow up. In some ways, it is a more richly connected brain — one with more potential pathways, more possibilities, and more flexibility than the adult brain that it will eventually become. The infant brain is not less capable than the adult brain; it is differently capable, optimised for the rapid, flexible learning that the early years demand.

The implications for education and brain training are enormous. If the brain is this plastic, this responsive to its environment, this capable of growth and change during infancy, there is every reason to believe that it retains significant plasticity throughout life. The adult brain may not form connections at two million per second, but it continues to form new connections, strengthen existing ones, and adapt to new challenges throughout the entire lifespan — provided it is given appropriate stimulation and challenge.`,
    passageWordCount: 751,
    comprehensionQuestions: [
      {
        question: 'A metronome helps improve reading speed primarily by:',
        options: [
          'Making a pleasant sound',
          'Establishing a consistent rhythm that reduces irregular pauses and hesitations',
          'Distracting you from the text',
          'Increasing your heart rate',
        ],
        correctIndex: 1,
      },
      {
        question: 'The "relativistic brain" concept means that:',
        options: [
          'The brain is related to other organs',
          'Speed perception is relative to recent experience — after reading fast, normal speed feels easy',
          'Intelligence is relative',
          'Reading speed cannot change',
        ],
        correctIndex: 1,
      },
      {
        question: 'Speed bursts are effective because they:',
        options: [
          'Tire out the brain',
          'Push past your comfort zone, making your previous normal speed feel slower and easier by comparison',
          'Only work once',
          'Permanently damage comprehension',
        ],
        correctIndex: 1,
      },
      {
        question: 'Research shows that recall is highest at which points in a reading session?',
        options: [
          'Only in the middle',
          'At the beginning and end, with a dip in the middle',
          'Only at the very end',
          'Recall is constant throughout',
        ],
        correctIndex: 1,
      },
      {
        question: 'By this point in the course, a cumulative speed increase of what range is typical?',
        options: ['5-10%', '10-20%', '30-100% or more', 'No change expected yet'],
        correctIndex: 2,
      },
    ],
  },

  // ============================================================
  // DIVISION THREE: SUPER-CONCENTRATION AND COMPREHENSION
  // ============================================================

  // === Chapter 11: The Common Reading Problems (Day 16) ===
  {
    id: 16, day: 16, title: 'Common Reading Problems',
    type: 'multipleChoice',
    prompt: 'Identify and understand the most common problems that hold readers back.',
    questions: [
      {
        question: 'Sub-vocalisation (hearing words in your head) is:',
        options: [
          'Essential for good comprehension',
          'A natural habit from childhood that, when excessive, limits reading speed to speaking speed (~250 wpm)',
          'Only a problem for slow readers',
          'Impossible to reduce',
        ],
        correctIndex: 1,
      },
      {
        question: 'Finger-pointing was discouraged in schools primarily because:',
        options: [
          'Teachers misunderstood its function — they thought it slowed reading, when in fact it is a natural and effective guide',
          'It damages the eyes',
          'It tears pages',
          'It was correctly identified as harmful',
        ],
        correctIndex: 0,
      },
      {
        question: 'Regression (going back to re-read) typically indicates:',
        options: [
          'Thorough reading',
          'Lack of confidence, poor concentration, or difficult vocabulary — not actual need to re-read',
          'Superior comprehension',
          'Advanced reading skills',
        ],
        correctIndex: 1,
      },
      {
        question: 'A limited vocabulary affects reading speed because:',
        options: [
          'It does not affect speed at all',
          'Unknown words cause hesitation, anxiety, and breaks in comprehension flow, often triggering regression',
          'It only affects non-fiction',
          'Vocabulary and speed are unrelated',
        ],
        correctIndex: 1,
      },
      {
        question: 'Reading at the wrong speed for the material means:',
        options: [
          'Always reading too fast',
          'Always reading too slowly',
          'Not adjusting speed to match difficulty — reading easy material slowly or difficult material without slowing down',
          'Speed does not need to vary',
        ],
        correctIndex: 2,
      },
    ],
  },

  // === Chapter 12: Improving Your Concentration and Comprehension (Day 17) ===
  {
    id: 17, day: 17, title: 'Concentration and Comprehension',
    type: 'multipleChoice',
    prompt: 'Learn strategies for maintaining deep focus and improving understanding while reading.',
    questions: [
      {
        question: 'Buzan compares concentration to:',
        options: [
          'A gentle stream',
          'A wild stallion — always powerful and in motion, needing to be directed rather than created',
          'A light switch',
          'A computer program',
        ],
        correctIndex: 1,
      },
      {
        question: 'When you find yourself losing concentration while reading, the most effective response is to:',
        options: [
          'Force yourself to re-read the same passage until you focus',
          'Take a short break, then return with a clear goal for what you want to learn from the next section',
          'Give up and read something else',
          'Read more slowly',
        ],
        correctIndex: 1,
      },
      {
        question: 'The ideal length for a focused reading session before taking a break is:',
        options: ['5-10 minutes', '20-50 minutes', '2-3 hours', '15 seconds'],
        correctIndex: 1,
      },
      {
        question: 'The "severe critic" approach to uninteresting material involves:',
        options: [
          'Skipping it entirely',
          'Pretending to enjoy it',
          'Reading as if you must find errors, challenge the author, and form strong opinions — this activates engagement',
          'Reading it as slowly as possible',
        ],
        correctIndex: 2,
      },
      {
        question: 'During breaks between reading sessions, your brain:',
        options: [
          'Stops processing entirely',
          'Continues to process and integrate the information subconsciously',
          'Forgets everything immediately',
          'Only rests without any processing',
        ],
        correctIndex: 1,
      },
      {
        question: 'Comprehension improves with speed because:',
        options: [
          'Faster reading skips difficult words',
          'At higher speeds, the brain receives information in meaningful chunks rather than isolated words, allowing it to see patterns and connections more easily',
          'Faster readers have higher IQs',
          'Comprehension is unrelated to speed',
        ],
        correctIndex: 1,
      },
    ],
  },

  // ============================================================
  // DIVISION FOUR: DEVELOPING YOUR ADVANCED SPEED READING SKILLS
  // ============================================================

  // === Chapter 13: Mind Mapping (Day 18) ===
  {
    id: 18, day: 18, title: 'Mind Mapping',
    type: 'multipleChoice',
    prompt: 'Learn the principles and rules of Mind Mapping as a tool for reading comprehension.',
    questions: [
      {
        question: 'Traditional linear note-taking has which major problem?',
        options: [
          'It is too colourful',
          'The volume of notes becomes so large that revising is nearly as time-consuming as re-reading the original',
          'It is too fast',
          'It uses too many keywords',
        ],
        correctIndex: 1,
      },
      {
        question: 'A Mind Map starts with:',
        options: [
          'A numbered list in the top-left corner',
          'A coloured central image representing the main topic',
          'A paragraph of text',
          'An alphabetical index',
        ],
        correctIndex: 1,
      },
      {
        question: 'How many Key Words should appear on each branch of a Mind Map?',
        options: ['As many as possible', 'One per line', 'Full sentences', 'Exactly three'],
        correctIndex: 1,
      },
      {
        question: 'Colours in Mind Mapping are important because they:',
        options: [
          'Make it look pretty but serve no function',
          'Stimulate the brain, aid memory, and help distinguish different branches and categories',
          'Are required by law',
          'Slow you down for better comprehension',
        ],
        correctIndex: 1,
      },
      {
        question: 'A single Mind Map can summarize:',
        options: [
          'Only a single paragraph',
          'An entire book on one page',
          'Only fiction',
          'Nothing useful',
        ],
        correctIndex: 1,
      },
      {
        question: 'Mind Mapping and speed reading create a feedback loop because:',
        options: [
          'They are unrelated techniques',
          'Speed reading gives you the overview to build the map, and the map gives you structure to speed read more effectively on later passes',
          'Mind Maps replace the need to read',
          'Speed reading eliminates the need for notes',
        ],
        correctIndex: 1,
      },
    ],
  },

  // === Chapter 14: Paragraph Structure (Day 19) ===
  {
    id: 19, day: 19, title: 'Paragraph Structure',
    type: 'multipleChoice',
    prompt: 'Understand how paragraphs are structured and how to use this knowledge to read faster.',
    questions: [
      {
        question: 'Most well-written paragraphs follow a structure where the main idea is in:',
        options: [
          'The last sentence only',
          'The topic sentence, usually the first or second sentence, with supporting details following',
          'The exact middle',
          'A random position',
        ],
        correctIndex: 1,
      },
      {
        question: 'Knowing paragraph structure helps speed reading because:',
        options: [
          'It does not help',
          'You can identify the main idea quickly and adjust your speed for supporting details based on their relevance to your purpose',
          'It lets you skip all paragraphs',
          'It only helps with fiction',
        ],
        correctIndex: 1,
      },
      {
        question: 'The three most common paragraph structures are:',
        options: [
          'Alphabetical, numerical, random',
          'Topic sentence first (deductive), topic sentence last (inductive), and topic sentence in the middle',
          'Short, medium, and long',
          'Simple, compound, and complex',
        ],
        correctIndex: 1,
      },
      {
        question: 'Signal words such as "however," "therefore," and "in conclusion" are important because they:',
        options: [
          'Are decorative filler',
          'Signal the relationship between ideas and alert the reader to transitions, contrasts, or conclusions',
          'Should be skipped',
          'Only appear in academic texts',
        ],
        correctIndex: 1,
      },
      {
        question: 'When speed reading, understanding paragraph structure allows you to:',
        options: [
          'Read every word at the same speed',
          'Allocate more attention to topic sentences and key arguments while processing supporting details more rapidly',
          'Skip all supporting details',
          'Only read the first sentence of each paragraph',
        ],
        correctIndex: 1,
      },
    ],
  },

  // === Chapter 15: Previewing: Your Mental Reconnaissance (Day 20) ===
  {
    id: 20, day: 20, title: 'Previewing',
    type: 'multipleChoice',
    prompt: 'Master the art of previewing — your mental reconnaissance before deep reading.',
    questions: [
      {
        question: 'Previewing a book before reading it in detail should take approximately:',
        options: ['1 second', '2-5 minutes', '1 hour', 'The same time as reading it'],
        correctIndex: 1,
      },
      {
        question: 'During a preview, you should look at:',
        options: [
          'Every word on every page',
          'Title, subtitle, table of contents, headings, bold text, images, and first and last paragraphs',
          'Only the cover',
          'Only the index',
        ],
        correctIndex: 1,
      },
      {
        question: '"Apply What You Already Know" before reading means:',
        options: [
          'Ignoring prior knowledge',
          'Quickly brainstorming everything you already know about the topic, ideally as a Mind Map, to activate relevant neural pathways',
          'Looking up everything online first',
          'Asking someone else to summarize it',
        ],
        correctIndex: 1,
      },
      {
        question: 'The "Be a Detective" previewing strategy involves:',
        options: [
          'Searching for factual errors',
          'Constantly predicting what comes next and testing the author\'s plan against your expectations',
          'Reading mystery novels',
          'Only reading footnotes',
        ],
        correctIndex: 1,
      },
      {
        question: 'Previewing should be applied to:',
        options: [
          'Only textbooks',
          'Everything you read — novels, newspapers, emails, articles, textbooks',
          'Only non-fiction',
          'Only material over 100 pages',
        ],
        correctIndex: 1,
      },
    ],
  },

  // === Chapter 16: Vocabulary (I) Prefixes (Days 21-22) ===
  {
    id: 21, day: 21, title: 'Core Prefixes',
    type: 'matchPairs',
    prompt: 'Match each prefix to its correct meaning. Knowing word parts unlocks thousands of new words instantly.',
    pairs: [
      { left: 'anti-', right: 'against' },
      { left: 'pre-', right: 'before' },
      { left: 'post-', right: 'after' },
      { left: 'sub-', right: 'under / below' },
      { left: 'super-', right: 'above / beyond' },
      { left: 'inter-', right: 'between / among' },
      { left: 'trans-', right: 'across' },
      { left: 'mis-', right: 'wrongly' },
      { left: 'un-', right: 'not / opposite' },
      { left: 're-', right: 'again / back' },
    ],
  },
  {
    id: 22, day: 22, title: 'Prefix Challenge',
    type: 'vocabFill',
    prompt: 'Fill in the blank with the correct word from the word bank. Each word uses a prefix you learned yesterday.',
    sentences: [
      { text: 'The doctor prescribed an _____ to fight the infection.', answer: 'antibiotic' },
      { text: 'Please _____ the document before the meeting starts.', answer: 'preview' },
      { text: 'The _____ exam will test everything from the second half of the course.', answer: 'post-term' },
      { text: 'The _____ was built to carry passengers beneath the city streets.', answer: 'subway' },
      { text: 'Her abilities were _____ — far beyond what anyone expected.', answer: 'superhuman' },
      { text: 'The _____ conference brought together delegates from many countries.', answer: 'international' },
      { text: 'The goods were shipped via _____ rail across the entire continent.', answer: 'transcontinental' },
      { text: 'She _____ the instructions and assembled it incorrectly.', answer: 'misread' },
      { text: 'The results were _____ — the experiment needed to be repeated.', answer: 'unreliable' },
      { text: 'He decided to _____ the application after finding errors in it.', answer: 'resubmit' },
    ],
    wordBank: [
      'antibiotic', 'preview', 'post-term', 'subway', 'superhuman',
      'international', 'transcontinental', 'misread', 'unreliable', 'resubmit',
    ],
  },

  // === Chapter 17: Vocabulary (II) Suffixes (Day 23) ===
  {
    id: 23, day: 23, title: 'Suffixes',
    type: 'matchPairs',
    prompt: 'Match each suffix to its meaning. Suffixes change the grammatical function of a word.',
    pairs: [
      { left: '-able / -ible', right: 'capable of being' },
      { left: '-tion / -sion', right: 'act or state of' },
      { left: '-ment', right: 'result or act of' },
      { left: '-ness', right: 'state or quality of' },
      { left: '-ful', right: 'full of' },
      { left: '-less', right: 'without' },
      { left: '-ous / -ious', right: 'having the quality of' },
      { left: '-ist', right: 'one who practises' },
      { left: '-ology', right: 'study of' },
      { left: '-ward', right: 'in the direction of' },
    ],
  },

  // === Chapter 18: Vocabulary (III) Roots (Day 24) ===
  {
    id: 24, day: 24, title: 'Word Roots',
    type: 'matchPairs',
    prompt: 'Match each root to its meaning. Roots are the core building blocks of words.',
    pairs: [
      { left: 'aud (audible)', right: 'to hear' },
      { left: 'vis / vid (visible)', right: 'to see' },
      { left: 'scrib / script (describe)', right: 'to write' },
      { left: 'port (transport)', right: 'to carry' },
      { left: 'dict (predict)', right: 'to say / speak' },
      { left: 'duc / duct (conduct)', right: 'to lead' },
      { left: 'cred (incredible)', right: 'to believe' },
      { left: 'tract (extract)', right: 'to pull / draw' },
      { left: 'rupt (interrupt)', right: 'to break' },
      { left: 'graph (biography)', right: 'to write / record' },
    ],
  },

  // ============================================================
  // DIVISION FIVE: BECOMING A MASTER READER
  // ============================================================

  // === Chapter 19: The Mind Map Organic Study Technique — MMOST (Days 25-26) ===
  {
    id: 25, day: 25, title: 'MMOST',
    type: 'multipleChoice',
    prompt: 'Master the Mind Map Organic Study Technique — the integration of all your speed reading skills.',
    questions: [
      {
        question: 'MMOST stands for:',
        options: [
          'Mind Map Online Study Tool',
          'Mind Map Organic Study Technique',
          'Multiple Methods Of Speed Training',
          'Mental Model Of Structured Thinking',
        ],
        correctIndex: 1,
      },
      {
        question: 'The Preparation phase of MMOST includes:',
        options: [
          'Reading the text in full detail',
          'Browsing, setting time goals, Mind Mapping prior knowledge, and establishing goals for the reading',
          'Only looking at the cover',
          'Memorising the table of contents',
        ],
        correctIndex: 1,
      },
      {
        question: 'The Application phase of MMOST follows the sequence:',
        options: [
          'Read, Write, Review',
          'Overview, Preview, Inview, Review',
          'Skim, Scan, Read',
          'Read, Highlight, Summarise',
        ],
        correctIndex: 1,
      },
      {
        question: '"Inview" in MMOST refers to:',
        options: [
          'Looking at the illustrations',
          'The detailed, focused reading of the material, filling in the gaps left by overview and preview',
          'Watching a video summary',
          'Reviewing your notes',
        ],
        correctIndex: 1,
      },
      {
        question: 'MMOST integrates which of the following skills?',
        options: [
          'Only speed reading',
          'Speed reading, Mind Mapping, previewing, and active learning — all combined into one systematic approach',
          'Only note-taking',
          'Only vocabulary building',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 26, day: 26, title: 'Self Test 6: The Awakening Earth',
    type: 'speedLog',
    prompt: 'Apply the MMOST approach: preview the passage briefly, then read with your guide and time yourself.',
    instructions: 'Preview the passage for 30 seconds (headings, first/last sentences). Then read fully with a guide, timing yourself. Calculate WPM and answer the questions.',
    wordCount: 0,
    passage: `The universe, according to our best current understanding, began approximately 15 billion years ago in an event of unimaginable violence and creativity — the Big Bang. In that first instant, all the matter and energy that would eventually form every galaxy, every star, every planet, and every living creature was compressed into a single point of infinite density and temperature. Then it exploded outward, and the universe as we know it began its long, slow unfolding.

To grasp the scale of this history, it is helpful to use an analogy first proposed by the writer and scientist Peter Russell, author of The Brain Book. Imagine compressing the entire 15-billion-year history of the universe into a single calendar year, with the Big Bang occurring at midnight on January 1st and the present moment arriving at midnight on December 31st.

On this compressed timescale, each month represents roughly 1.25 billion years, each day about 41 million years, each hour about 1.7 million years, and each second about 475 years. With this framework in mind, the story of cosmic evolution becomes vivid and dramatic.

In the first few weeks of January, the universe was a seething cauldron of elementary particles and radiation, far too hot and energetic for any complex structures to form. By February and March, the first great clouds of hydrogen and helium gas had begun to condense under the force of gravity, forming the earliest galaxies — vast rotating collections of billions of stars, separated by incomprehensible distances of empty space.

Our own solar system — the sun, the Earth, and the other planets — did not form until early September. For the first eight months of cosmic history, the Earth did not exist. When it did form, from the gravitational collapse of a cloud of gas and dust surrounding the young sun, it was a molten, lifeless world, bombarded by asteroids and comets, its surface a sea of liquid rock.

Simple, single-celled life — algae and bacteria — appeared by the beginning of October. For nearly three months of our cosmic year, life on Earth consisted of nothing more complex than these microscopic organisms. They were, however, performing a feat of extraordinary importance: photosynthesis. These simple algae were converting sunlight into energy and, as a byproduct, releasing oxygen into the atmosphere. Over hundreds of millions of years, they transformed the Earth's atmosphere from a toxic mixture of methane and ammonia into the oxygen-rich air that complex life would eventually require.

The first vertebrates — creatures with backbones — did not crawl onto land until early December. The dinosaurs, those magnificent creatures that dominated the Earth for over 160 million years, appeared around Christmas Day and were wiped out by midday on December 30th. Their entire 160-million-year reign occupies just five days of our cosmic calendar.

Ape-like ancestors who walked upright appeared in the last hour of the last day of the year — December 31st. Modern humans, Homo sapiens, arrived in the final minutes. Human language — that extraordinary capacity that distinguishes us from all other species and makes possible culture, science, philosophy, and art — developed approximately one and a half minutes before midnight.

The entirety of recorded human history — the rise and fall of empires, the development of writing, mathematics, science, and technology, the construction of every building and the composition of every book, every symphony, every painting — occupies roughly the last thirty seconds of the cosmic year. The Industrial Revolution, which transformed human society more dramatically than any event since the development of agriculture, occurred in the last half second. The Second World War, the event that shaped the modern geopolitical world, took place less than a tenth of a second before midnight.

The acceleration of change is the central fact of our time. Each new development builds upon all that came before it, and the pace of innovation increases exponentially. We are living in a period of change so rapid that the human brain — evolved to cope with the relatively stable environment of the African savannah — is struggling to keep up.

Peter Russell proposes that humanity is in the process of becoming a kind of planetary nervous system. Just as individual neurons in the brain are relatively simple on their own but produce consciousness when connected in vast networks, individual human beings are being connected through technology into a global network of communication and shared intelligence. The internet, satellite communications, and mobile technology are creating links between human minds that have no precedent in the history of life on Earth.

This moment of rapid change and potential crisis has a parallel in Chinese philosophy. The Chinese word for crisis, wei-chi, is composed of two characters. The first means "beware of danger." The second means "opportunity for change." Every crisis, in the Chinese understanding, contains within it both a threat and an opportunity. The question is which aspect we choose to respond to.

There is a precedent for this kind of transformative crisis in the history of life itself. When photosynthetic algae first began flooding the atmosphere with oxygen billions of years ago, it was a catastrophe for the anaerobic organisms that then dominated the Earth. Oxygen was poison to them, and the vast majority perished. But this crisis also created the conditions for an entirely new kind of life — aerobic organisms that could harness the energy of oxygen to power far more complex biological processes. The crisis of oxygen pollution led directly to the evolution of complex, multicellular life and eventually to the emergence of intelligence itself.

Russell suggests that we may be living through an analogous moment. The crises we face — environmental destruction, nuclear proliferation, resource depletion, social fragmentation — may be the birth pangs of a new level of organisation, just as the oxygen crisis was the birth pang of complex life. The evolutionary future, he argues, does not lie in our genes or in our technology but in our own brains and minds. The next great leap of evolution will not be physical but mental — a transformation of consciousness itself.

Whether we rise to this challenge depends on our willingness to develop and use the extraordinary organ that evolution has given us. The human brain, with its billions of neurons and its effectively infinite capacity for connection, is the most powerful tool the universe has yet produced. The question is not whether we have the capacity to solve the problems we face. The question is whether we will choose to develop and use that capacity. The evolutionary future lies within our own brains and minds, waiting to be awakened.`,
    passageWordCount: 1000,
    comprehensionQuestions: [
      {
        question: 'According to the passage, the universe began approximately:',
        options: ['5 billion years ago', '10 billion years ago', '15 billion years ago', '20 billion years ago'],
        correctIndex: 2,
      },
      {
        question: 'In Russell\'s one-year analogy, human language develops:',
        options: [
          'In early December',
          'On the afternoon of December 31st',
          'One and a half minutes before midnight on December 31st',
          'At exactly midnight',
        ],
        correctIndex: 2,
      },
      {
        question: 'The Chinese word "wei-chi" (crisis) is composed of two characters meaning:',
        options: [
          '"Strength" and "wisdom"',
          '"Beware of danger" and "opportunity for change"',
          '"Past" and "future"',
          '"Fear" and "courage"',
        ],
        correctIndex: 1,
      },
      {
        question: 'According to Russell, the evolutionary future lies in:',
        options: [
          'Genetic engineering',
          'Artificial intelligence',
          'Our own brains and minds',
          'Space exploration',
        ],
        correctIndex: 2,
      },
      {
        question: 'The passage suggests that crises may serve as:',
        options: [
          'Inevitable endings',
          'Evolutionary catalysts that push life to a higher level of organisation',
          'Purely destructive forces',
          'Random events with no meaning',
        ],
        correctIndex: 1,
      },
    ],
  },

  // === Chapter 20: Newspapers, Magazines and Screens (Day 27) ===
  {
    id: 27, day: 27, title: 'Everyday Reading',
    type: 'multipleChoice',
    prompt: 'Apply speed reading skills to newspapers, magazines, and digital screens.',
    questions: [
      {
        question: 'Newspapers, magazines, and screens make up what proportion of most people\'s reading?',
        options: ['Less than 10%', '20-30%', 'More than 50%', 'Exactly 50%'],
        correctIndex: 2,
      },
      {
        question: 'The recommended approach for reading a newspaper is:',
        options: [
          'Read every article from start to finish',
          'Preview the entire paper first (headings, layout), then selectively read articles of interest using the guide technique',
          'Only read the front page',
          'Read it backwards',
        ],
        correctIndex: 1,
      },
      {
        question: 'The "magazine blitz" technique involves:',
        options: [
          'Reading every page carefully',
          'Setting a metronome and turning pages at its pace, ripping out only pages of genuine interest, then reading those selected pages properly',
          'Throwing away all magazines',
          'Only reading digital versions',
        ],
        correctIndex: 1,
      },
      {
        question: 'When reading on screens, which technique is MOST important to maintain?',
        options: [
          'Adjusting screen brightness',
          'Using a guide (finger or cursor) to maintain forward momentum and reduce regression',
          'Making the text as large as possible',
          'Reading in dark mode only',
        ],
        correctIndex: 1,
      },
      {
        question: 'Buzan recommends that when reading news, you should always:',
        options: [
          'Accept everything at face value',
          'Read critically, remembering that all reporting involves bias, and compare with other sources',
          'Only read headlines',
          'Avoid news entirely',
        ],
        correctIndex: 1,
      },
    ],
  },

  // === Chapter 21: Creating Your Knowledge File (Day 28) ===
  {
    id: 28, day: 28, title: 'Building a Knowledge File',
    type: 'reflection',
    prompt: 'Create a system for organising and retrieving everything you read and learn.',
    questions: [
      'Describe how you currently store and organise information from your reading (bookmarks, highlights, notes, etc.). What are the strengths and weaknesses of your current system? How often can you actually retrieve information you need?',
      'Design your ideal Knowledge File system: will you use Mind Maps, a digital note-taking tool, physical files, or a combination? How will you categorise information (by topic, by source, by date)? How will you ensure regular review so the information stays accessible?',
      'Choose one book or article you have read recently and create a Knowledge File entry for it: a one-page Mind Map or structured summary that captures the key ideas, your reactions, and connections to other things you know. Describe what you created and how the process felt.',
    ],
  },

  // === Chapter 22: Getting Full Value from Literature and Poetry (Day 29) ===
  {
    id: 29, day: 29, title: 'Literature and Poetry',
    type: 'reflection',
    prompt: 'Apply speed reading techniques to literature and poetry for deeper appreciation.',
    questions: [
      'Buzan compares a novel to an ocean — words are little waves, sentences are larger waves, and themes are the largest waves. How does reading at different speeds help you perceive these different "wave levels"? Have you ever felt that reading too slowly caused you to miss the larger patterns in a book?',
      'Choose a poem and read it three times at different speeds: first a rapid preview for overall shape, then a moderate reading for ideas and rhythm, then a slow reading aloud for full musicality. Describe what you noticed at each speed that you missed at the others.',
      'Reflect on how your relationship with reading has changed over this course. Has speed reading enhanced or diminished your enjoyment of literature? How do you plan to vary your reading speed for different types of material going forward?',
    ],
  },

  // === Chapter 23: Your Extraordinary Possibilities for the Future (Day 30) ===
  {
    id: 30, day: 30, title: 'Self Test 7: Your Brain — The Enchanted Loom',
    type: 'speedLog',
    prompt: 'Your final self test. Apply everything you have learned. Preview, use your guide, push your speed, and test your comprehension.',
    instructions: 'Preview the passage for 30 seconds. Then read with your guide at a challenging pace. Calculate your final WPM and compare it with your Day 2 baseline. Answer all comprehension questions.',
    wordCount: 0,
    passage: `Sir Charles Sherrington, the Nobel Prize-winning neuroscientist, described the human brain as "an enchanted loom where millions of flashing shuttles weave a dissolving pattern, always a meaningful pattern, though never an abiding one." It is perhaps the most beautiful description ever given of the organ that makes us who we are — and it is, if anything, an understatement.

The brain weighs approximately three and a half pounds. It sits in its bony fortress, the skull, cushioned by cerebrospinal fluid, consuming roughly 20 per cent of the body's energy while constituting only about 2 per cent of its weight. By any measure, it is the most metabolically expensive organ in the body — and the most productive.

Within this three-and-a-half-pound organ reside approximately 10 billion nerve cells, or neurons. Each of these neurons is capable of forming connections with thousands — potentially tens of thousands — of other neurons. The total number of possible connections is not merely large; it is, for all practical purposes, infinite. Mathematicians express this potential as 10 to the power of n, where n itself is a number so vast that it exceeds any meaningful comparison. There are more potential neural pathways in a single human brain than there are atoms in the known universe.

The physicist and writer John Rader Platt attempted to convey the staggering complexity of the brain through an extraordinary visual analogy. He asked his readers to imagine that they could see the electrical activity of the brain — every signal, every firing neuron, every cascade of electrochemical impulses — as visible light. He then compared the visible brightness of common objects to what we would see if we could look at the brain in this way.

A single burning match, Platt suggested, would represent the electrical activity of a simple switch. A candle would represent a small circuit. A light bulb might represent a modest electronic device. The sun itself — that overwhelming furnace of nuclear fusion that lights our entire solar system — would, in Platt's analogy, fade to pale simplicity compared with what we would see if we could look at the activity within a living brain.

Platt went further. If we could see the neural activity of a rose bush as light, he suggested, it would glow with a soft, complex luminescence. A dog's brain would appear as something like a city of light — millions of interconnected signals creating a shimmering web of activity. But a human brain, if we could see it, would outshine everything else in the known universe. The complexity of its activity would be so far beyond anything else we have ever encountered that our existing vocabulary and conceptual framework simply cannot capture it.

The basis of this extraordinary complexity is the nerve cell, or neuron. Neurons differ from every other cell in the body in several fundamental ways. Most body cells are relatively compact and uniform in shape. Neurons, by contrast, are among the most complicated cells in terms of their physical structure. They come in an astonishing variety of shapes and sizes, from tiny interneurons a fraction of a millimetre in length to motor neurons whose axons can reach up to a metre or more — stretching, for example, from the base of the spine all the way down to the toes.

Each neuron consists of a cell body containing the nucleus, a number of branching extensions called dendrites that receive incoming signals from other neurons, and a single long projection called an axon that carries outgoing signals to other neurons. The axon is the critical transmission cable of the nervous system — it conducts the vital nerve impulses that carry information throughout the brain and body.

These nerve impulses are electrochemical in nature. They are not simple on-off signals like the binary code of a computer. Instead, they pass in rapid, multiple waves of varying frequency and intensity. A single neuron can receive, process, and transmit up to 100,000 neuronal messages per second. When you consider that there are 10 billion of these cells, each simultaneously sending and receiving thousands of signals every second, the total volume of information processing taking place in the brain at any given moment is beyond comprehension.

The signals travel along the axon at speeds ranging from about 2 miles per hour for the thinnest, unmyelinated fibres to over 200 miles per hour for the thickest, myelinated ones. Myelin — the fatty sheath that insulates many axons — dramatically increases the speed and efficiency of signal transmission, and the process of myelination continues well into adulthood, explaining why certain cognitive abilities continue to improve with age and experience.

John Rader Platt formulated what he called the Fourth Law of Man, which states that no human being has yet come remotely close to using the full potential of the brain. We are, all of us, operating with vast reserves of untapped cognitive power. The question is not whether we have the capacity for extraordinary mental achievement — the architecture is already in place, built from 10 billion neurons with their effectively infinite connection potential. The question is whether we will learn to use what we already possess.

The most important practical step you can take toward realising this potential is deceptively simple: consistently use a guide when you read. This single habit — maintaining forward visual momentum, reducing regression, expanding your fixation width, and training your brain to process information in larger chunks — is the foundation upon which all other speed reading skills are built. It is the enchanted loom's thread, and it will weave patterns of understanding more rich and complex than you have ever imagined possible. The evolutionary future lies within our own brains and minds.`,
    passageWordCount: 868,
    comprehensionQuestions: [
      {
        question: 'Who described the brain as an "enchanted loom"?',
        options: ['John Rader Platt', 'Tony Buzan', 'Sir Charles Sherrington', 'Peter Russell'],
        correctIndex: 2,
      },
      {
        question: 'The brain weighs approximately:',
        options: ['1½ pounds', '2½ pounds', '3½ pounds', '5 pounds'],
        correctIndex: 2,
      },
      {
        question: 'The potential number of connections per brain cell is expressed as:',
        options: ['Exactly 1000', '10 to the power of n (effectively infinite)', 'One million', 'Ten billion'],
        correctIndex: 1,
      },
      {
        question: 'The basis of the brain\'s extraordinary complexity is:',
        options: ['Its weight', 'The skull that protects it', 'The nerve cell or neuron', 'The cerebrospinal fluid'],
        correctIndex: 2,
      },
      {
        question: 'According to the passage, the most important habit for continued improvement in reading is:',
        options: [
          'Reading more hours per day',
          'Consistently using a guide when you read',
          'Only reading difficult material',
          'Taking detailed linear notes',
        ],
        correctIndex: 1,
      },
    ],
  },
]

// ============================================================
// CHAPTERS
// ============================================================

export const chapters: SRChapter[] = [
  // --- Division One: Exploring Your Speeds ---
  {
    id: 1,
    title: 'Where Are You Now?',
    days: [1, 2],
    reading: `This chapter establishes your starting point. Before you can improve your reading, you need to know where you currently stand. Most people have never measured their reading speed or thought critically about their reading habits since leaving school.

The opening quiz reveals that almost everything most people believe about reading is wrong. Speeds of over 1000 words per minute are indeed possible — and with comprehension. Faster reading does not reduce comprehension; it enhances it. Reading every word is not necessary. Going back to re-read does not help. Using a guide is not childish. Your reading speed is not fixed.

The first Self Test establishes your baseline reading speed and comprehension. You will return to this benchmark throughout the course to measure your progress. The key formula is simple: words per minute equals the number of words divided by the time in minutes. Record your results carefully — they are the foundation of your improvement journey.`,
  },
  {
    id: 2,
    title: 'The History of Speed Reading',
    days: [3],
    reading: `Speed reading research has its origins in World War II, when the military discovered that certain pilots could identify enemy aircraft at extremely fast flash speeds using a device called the tachistoscope. This finding inspired researchers to investigate whether similar training could improve reading speed.

Early tachistoscope-based courses produced initial speed gains, but these were not sustained because the device only trained recognition speed, not the overall reading process. The breakthrough came in the 1950s and 1960s when Evelyn Wood observed that naturally fast readers used a sweeping hand motion across the page as a visual guide. She developed this observation into a complete reading system.

President John F. Kennedy was an enthusiastic advocate who reportedly read at over 1000 words per minute. His endorsement helped popularise speed reading, but the real significance of Wood's discovery was the insight that speed reading involves training the entire reading process — eye movements, comprehension, concentration, and mental engagement — not just raw recognition speed.`,
  },
  {
    id: 3,
    title: 'Reading: a New Definition',
    days: [4],
    reading: `Buzan argues that the traditional definition of reading — understanding words on a page — is dangerously incomplete. True reading involves seven distinct skills: Recognition (seeing the symbols), Assimilation (the physical process of light reaching the eyes), Comprehension (basic understanding), Intra-integration (connecting parts of the text to each other), Extra-integration (connecting the text to your existing knowledge), Retention (storing the information), and Recall (retrieving it when needed).

Most reading education focuses only on the first three skills, leaving the remaining four — which are arguably the most important — entirely untrained. The final, often overlooked skill is Communication: the ability to apply what you have read through speaking, writing, and creative output.

Understanding this expanded definition transforms your approach to reading. You are not merely decoding symbols; you are engaging in a complex, multi-layered cognitive process that, when all seven skills are developed, produces understanding far deeper than simple word recognition could ever achieve.`,
  },
  // --- Division Two: Your Amazing Eyes ---
  {
    id: 4,
    title: 'Gaining Control of Your Eye Movements',
    days: [5, 6],
    reading: `Your eyes do not move smoothly across a line of text. Instead, they make a series of rapid jumps called saccades, pausing briefly between each jump in moments called fixations. It is only during fixations that the brain actually takes in information. A poor reader makes many small fixations, sometimes fixating on every single word or even parts of words.

Back-skipping is the unconscious, unintentional movement of the eyes backward to re-read text already passed. It differs from regression, which is a conscious decision to go back. The average poor reader back-skips once or more per line, wasting enormous amounts of time. Research has shown that when readers are physically prevented from back-skipping, their comprehension remains the same or actually improves.

Expanding your peripheral vision allows you to take in more words per fixation, reducing the total number of fixations needed per line. A skilled reader might make only 2-3 fixations per line, each taking in a group of several words, while a poor reader makes 10 or more fixations per line, processing one word at a time.`,
  },
  {
    id: 5,
    title: 'Eye-Deal: Environmental Conditions',
    days: [7],
    reading: `The physical environment in which you read has a far greater impact on your speed and comprehension than most people realise. Poor lighting alone can reduce reading speed by up to 50 per cent. The ideal reading light is bright, even, and free from glare — natural light is best, positioned behind you or to the side so it falls directly on the page without casting shadows.

Your posture matters significantly. The ideal reading position is upright, with feet flat on the floor, back supported, and the reading material positioned at a slight angle approximately 50 centimetres from your eyes. Slouching or lying down restricts blood flow to the brain and encourages drowsiness.

The distance between your eyes and the material affects how much text your peripheral vision can take in per fixation. At the correct distance of about 50 cm, you can comfortably see several words on either side of your central focus point. Too close, and your peripheral span narrows; too far, and the text becomes difficult to resolve.`,
  },
  {
    id: 6,
    title: 'Guiding the Eyes',
    days: [8, 9],
    reading: `The visual guide — a pen, slim pointer, chopstick, or even your finger — is the single most powerful tool for improving reading speed. By providing a smooth, continuous, forward-moving target for the eyes, the guide achieves three things simultaneously: it reduces regression and back-skipping, it maintains consistent pace, and it helps the eyes move smoothly rather than in erratic jumps.

Evelyn Wood pioneered the use of a guide in her speed reading courses in the 1950s and 1960s after observing that naturally fast readers invariably used some form of visual pacing. The guide should move smoothly just beneath the line being read, slightly faster than feels entirely comfortable. After about a week of consistent use, most readers find that reading without the guide feels strange and uncomfortable.

Buzan recommends using the guide for all reading, not just practice sessions. The improvement comes from the combination of reduced regression, maintained forward momentum, and the brain's adaptation to processing text at a consistently higher pace. Breaks should be taken every 20-50 minutes to maintain peak concentration.`,
  },
  {
    id: 7,
    title: 'Onward to Super-Speed Reading',
    days: [10],
    reading: `Moving beyond basic speed reading into super-speed territory requires expanding the amount of text processed per fixation while maintaining the forward momentum established by the guide. The key techniques include starting your fixation 2 words in from the left margin and ending 2 words before the right margin, allowing your peripheral vision to pick up the remaining words.

Speed bursts are a crucial training tool: push yourself to read at a pace significantly faster than comfortable for short bursts of 1-2 minutes, then return to a slightly lower but still elevated pace. This works because of the brain's relativistic nature — speed perception is relative to recent experience, so after a fast burst, your normal pace feels easy.

Temporary dips in comprehension during speed training are normal and expected. The brain needs time to adapt to processing information at a new rate. With consistent practice, comprehension catches up and often exceeds its previous level, because the brain is now receiving information in meaningful chunks rather than isolated words.`,
  },
  {
    id: 8,
    title: 'Meta-Guiding Towards Photographic Memory',
    days: [11, 12],
    reading: `Meta-guiding takes the basic guide technique to the next level by expanding the movement pattern beyond simple left-to-right underlining. Instead of following each line individually, meta-guiding techniques move the guide in sweeping patterns that encompass multiple lines or even the entire width of the page.

The "lazy S" pattern moves the guide in a smooth S-shape down the page, sweeping left-to-right on one line and right-to-left on the next. The "vertical sweep" moves the guide straight down the centre of the page while peripheral vision catches text on both sides. These patterns force the brain to process much larger chunks of text per eye movement.

A temporary drop in comprehension is entirely normal when first practising meta-guiding. The brain needs time to adapt to processing information in these larger units. With consistent practice over days and weeks, comprehension recovers and often improves, because the meta-guiding patterns eliminate regression, maintain constant forward momentum, and train the brain to make connections across larger spans of text.`,
  },
  {
    id: 9,
    title: 'Developing Your Skimming and Scanning Skills',
    days: [13],
    reading: `Skimming and scanning are not inferior forms of reading — they are powerful, distinct skills that every master reader must develop. Skimming involves rapidly moving through material to grasp the overall structure, gist, and main ideas without reading every word. It is the ideal first pass through any new material.

Scanning is the targeted search for specific information — a name, a date, a keyword, a particular fact. Effective scanning requires a clear mental image of what you are looking for before you begin. You then move your guide rapidly through the text, allowing your visual system to flag the target when it appears, much as you can spot a friend's face in a crowd.

Both skills should be combined with the guide technique and your expanding peripheral vision. When skimming a chapter, focus on headings, topic sentences, bold text, images, and summary sections. When scanning, move your guide rapidly in a vertical or zigzag pattern rather than reading line by line. These skills multiply the practical value of your speed reading abilities enormously.`,
  },
  {
    id: 10,
    title: 'Your Relativistic Brain: Metronome Training',
    days: [14, 15],
    reading: `The brain perceives speed relative to its recent experience, not in absolute terms. After driving at 100 mph on a motorway, 30 mph in a town feels painfully slow. The same principle applies to reading. After a burst of reading at 500 wpm, returning to 300 wpm feels comfortable and easy — even though 300 wpm may have felt impossibly fast an hour earlier.

A metronome exploits this relativity by establishing a consistent, external rhythm that prevents the irregular pauses and speed variations that characterise untrained reading. Set the metronome to a comfortable pace, read for several minutes, then increase the pace by 10-20 beats and read for another few minutes. When you return to the original pace, it will feel noticeably easier.

Research on memory and recall shows that performance is highest at the beginning and end of a study session, with a dip in the middle. This is why Buzan recommends sessions of 20-50 minutes with breaks. The metronome helps maintain consistent pace throughout the session, minimising the mid-session dip. By this point in the course, a cumulative speed increase of 30-100% or more is typical.`,
  },
  // --- Division Three: Super-Concentration and Comprehension ---
  {
    id: 11,
    title: 'The Common Reading Problems',
    days: [16],
    reading: `The most common reading problems are not signs of inability — they are habits left over from childhood reading instruction that was never updated for adult needs. Sub-vocalisation, the habit of hearing words in your head or moving your lips, limits reading speed to speaking speed (about 250 wpm). While complete elimination of the "inner voice" is neither necessary nor desirable, reducing excessive sub-vocalisation unlocks higher speeds.

Regression and back-skipping are perhaps the most damaging habits. Most regression is driven not by genuine need but by lack of confidence, poor concentration, or encountering unknown vocabulary. Research consistently shows that preventing regression does not reduce comprehension — it often improves it, because the brain is forced to process information on the first pass.

Limited vocabulary is a silent speed killer. Each unknown word causes a moment of hesitation, anxiety, and often regression, breaking the flow of comprehension. Building vocabulary systematically through knowledge of prefixes, suffixes, and roots — rather than word-by-word memorisation — is the most efficient approach.`,
  },
  {
    id: 12,
    title: 'Improving Your Concentration and Comprehension',
    days: [17],
    reading: `Concentration is not something you need to create — it is already present. The challenge is to direct it toward your reading rather than allowing it to wander. Buzan compares concentration to a wild stallion: enormously powerful, always in motion, and needing to be steered rather than generated.

The main enemies of reading concentration include vocabulary difficulties, conceptual difficulty, reading at the wrong speed, incorrect mental set, poor organisation, lack of interest, and lack of motivation. For uninteresting material, try the "severe critic" approach: read as if you must find errors, challenge the author's arguments, and form strong opinions. This forces engagement.

Comprehension paradoxically improves with speed because at higher speeds the brain receives information in meaningful groups rather than isolated words. Imagine hearing a sentence spoken one word per minute versus at normal conversational pace — the faster version is far more comprehensible because the brain can perceive patterns and relationships. The same principle applies to reading. Strategic breaks every 20-50 minutes exploit the brain's natural recall pattern, which peaks at the beginning and end of each session.`,
  },
  // --- Division Four: Developing Your Advanced Speed Reading Skills ---
  {
    id: 13,
    title: 'Mind Mapping',
    days: [18],
    reading: `Traditional linear note-taking has three major problems: you miss the forest for the trees, it prevents objective analysis during reading, and the volume of notes becomes so large that revision is nearly as time-consuming as re-reading the original. The Mind Map solves all three problems by presenting information in a radiant, visual structure that mirrors the brain's own associative thinking.

To create a Mind Map: place a coloured central image representing the main topic in the centre of the page. Main ideas go on thick branches radiating outward, with sub-ideas on thinner branches extending from them. Use one Key Word per line, print words on the lines, use colours throughout, and add as many images as possible.

A single Mind Map can summarise an entire book on one page. When used with speed reading, it creates a powerful feedback loop: speed reading gives you the overview to construct the map, and the map gives you the structure to speed read more effectively on subsequent passes. Mind Maps multiply reading efficiency by a factor of three or more.`,
  },
  {
    id: 14,
    title: 'Paragraph Structure',
    days: [19],
    reading: `Understanding how paragraphs are constructed is a powerful speed reading tool. Most well-written paragraphs place the main idea in a topic sentence — usually the first or second sentence — followed by supporting details, examples, and evidence. Knowing this allows you to quickly identify the main point and then adjust your reading speed for the supporting material based on its relevance.

The three most common paragraph structures are: deductive (topic sentence first, followed by supporting details), inductive (details first, building to the main point at the end), and mixed (main point in the middle, sandwiched between introductory and supporting material). Recognising these patterns allows you to predict where key information will appear.

Signal words — "however," "therefore," "in contrast," "for example," "in conclusion" — are road signs that alert you to the relationship between ideas. Learning to spot these words allows you to anticipate transitions, contrasts, and conclusions, enabling you to allocate your attention efficiently rather than reading every sentence at the same speed and with the same level of focus.`,
  },
  {
    id: 15,
    title: 'Previewing: Your Mental Reconnaissance',
    days: [20],
    reading: `Previewing is your mental reconnaissance before committing to a full reading. It takes just 2-5 minutes for an entire book and gives you the skeleton on which detailed understanding will later be built. During a preview, rapidly survey the title, subtitle, table of contents, headings, bold text, images, and first and last paragraphs of key sections.

Three powerful previewing strategies enhance the process: Apply What You Already Know — before reading, brainstorm everything you already know about the topic, ideally as a Mind Map, to activate relevant neural pathways. Interact Actively with the Author — treat the text as a conversation, noting questions and reactions. Be a Detective — constantly predict what comes next, testing your expectations against what the author actually presents.

Previewing should be applied to everything you read, not just textbooks. Preview a novel before reading it (jacket, chapter titles, opening and closing paragraphs). Preview a newspaper before committing to articles. Preview emails before responding. The few minutes invested in previewing save far more time through faster, more focused reading.`,
  },
  {
    id: 16,
    title: 'Vocabulary (I) Prefixes',
    days: [21, 22],
    reading: `Vocabulary building is one of the most effective ways to increase reading speed, because unknown words cause hesitation, anxiety, and regression. Rather than memorising individual words, Buzan advocates learning word parts — prefixes, suffixes, and roots — which unlock thousands of words at once.

Prefixes are word beginnings that modify meaning. Learning just twenty common prefixes gives you the key to understanding thousands of unfamiliar words. For example, "anti-" means against (antibody, antisocial), "pre-" means before (predict, preview), "trans-" means across (transport, translate), and "mis-" means wrongly (mistake, misunderstand). When you encounter an unknown word, breaking it into its component parts often reveals its meaning without needing a dictionary.

The exercises in this chapter move from recognition (matching prefixes to meanings) to application (using prefixed words in context). This progression mirrors how the brain naturally learns: first understanding the concept, then practising its use in realistic situations. Regular practice with word parts builds a vocabulary that grows exponentially rather than linearly.`,
  },
  {
    id: 17,
    title: 'Vocabulary (II) Suffixes',
    days: [23],
    reading: `While prefixes change the meaning of a word, suffixes typically change its grammatical function — turning a noun into an adjective, a verb into a noun, or an adjective into an adverb. Knowing common suffixes helps you recognise how a word is being used in a sentence, even if you have never encountered that specific word before.

Key suffixes include: "-able/-ible" (capable of being: readable, visible), "-tion/-sion" (act or state of: education, decision), "-ment" (result of: achievement, development), "-ness" (state or quality: happiness, darkness), "-ful" (full of: beautiful, hopeful), "-less" (without: hopeless, careless), and "-ology" (study of: biology, psychology).

When combined with your knowledge of prefixes and roots, suffixes complete the toolkit for decoding unfamiliar words. A word like "incomprehensible" breaks down into "in-" (not) + "comprehens-" (to grasp) + "-ible" (capable of being) = not capable of being grasped. This analytical approach is far more powerful and lasting than rote memorisation.`,
  },
  {
    id: 18,
    title: 'Vocabulary (III) Roots',
    days: [24],
    reading: `Roots are the core building blocks from which most English words are constructed. The majority of English words derive from Latin and Greek roots, and learning these roots provides the deepest level of vocabulary power. A single root can unlock dozens or even hundreds of related words.

For example, the root "scrib/script" (to write) appears in: describe, inscribe, prescribe, subscribe, transcript, manuscript, scripture, and postscript. The root "duct/duc" (to lead) gives us: conduct, deduce, educate, induce, introduce, produce, and reduce. The root "port" (to carry) yields: transport, export, import, portable, report, support, and deport.

When you combine your knowledge of prefixes, suffixes, and roots, you possess a powerful system for decoding virtually any word in the English language. The word "transportation," for instance, breaks down into "trans-" (across) + "port" (to carry) + "-ation" (act of) = the act of carrying across. This systematic approach to vocabulary transforms unknown words from obstacles into puzzles that you can solve on the spot.`,
  },
  // --- Division Five: Becoming a Master Reader ---
  {
    id: 19,
    title: 'The Mind Map Organic Study Technique (MMOST)',
    days: [25, 26],
    reading: `MMOST — the Mind Map Organic Study Technique — integrates all the skills you have developed throughout this course into a single, systematic approach to deep study. It consists of two main phases: Preparation and Application.

The Preparation phase has four steps: Browse (flip through the material to get a sense of its length, structure, and difficulty), set Time Goals (decide how long you will spend on each phase), Mind Map Prior Knowledge (brainstorm everything you already know about the topic), and Establish Goals (define exactly what you want to learn from this reading session).

The Application phase follows the sequence: Overview (a rapid skim of the entire text, noting structure and key themes), Preview (a slightly deeper pass focusing on beginnings and endings of sections), Inview (the detailed reading, filling gaps left by the overview and preview), and Review (consolidating understanding, completing your Mind Map, and testing recall). This five-step process produces thorough understanding in a fraction of the time that traditional linear study requires.`,
  },
  {
    id: 20,
    title: 'Newspapers, Magazines and Screens',
    days: [27],
    reading: `Newspapers, magazines, and computer screens make up more than 50 per cent of most people's reading — and often more than 90 per cent in professional settings. Applying speed reading to these everyday materials yields enormous time savings that compound over weeks and months.

For newspapers: always preview first. Decide what you want from the paper, rapidly skim the whole thing noting layout and headlines, then selectively read articles of interest using the guide technique. Remember that all news reporting involves bias — the reporter's perspective, editorial choices, and the natural embellishment of writing. Read critically, comparing with other sources.

For magazines: try the monthly "magazine blitz." Gather all accumulated magazines, set a metronome to 60 beats per minute, and force yourself to turn pages at that speed. Rip out only pages of genuine interest, discarding everything else. In most cases, only 2-10 per cent of a magazine is actually relevant to you. Sort selected pages by topic, then read them properly using your full speed reading toolkit.`,
  },
  {
    id: 21,
    title: 'Creating Your Knowledge File',
    days: [28],
    reading: `A Knowledge File is a personal system for organising, storing, and retrieving everything you learn from your reading. Without such a system, even the most efficient reading produces knowledge that gradually fades and becomes irretrievable. The Knowledge File ensures that the time you invest in reading pays dividends indefinitely.

The ideal Knowledge File entry for a book or article is a single-page Mind Map that captures the key ideas, your personal reactions, connections to other knowledge, and any action items. These Mind Maps should be stored in a system that allows easy retrieval — whether physical folders organised by topic, a digital note-taking system, or a combination of both.

Regular review is essential. Schedule periodic reviews of your Knowledge File — perhaps weekly for recent entries and monthly for older ones. Each review takes only minutes (because the Mind Maps are concise and visual) but dramatically strengthens retention and reveals new connections between ideas that were not apparent when you first read the material.`,
  },
  {
    id: 22,
    title: 'Getting Full Value from Literature and Poetry',
    days: [29],
    reading: `Speed reading is not only for non-fiction. A novel can be compared to an ocean — little waves (words) carry larger waves (sentences), which carry still larger waves (paragraphs, chapters, themes). Reading too slowly can cause you to miss the larger patterns, just as standing with your nose against a painting prevents you from seeing the overall composition.

When reading literature, attend to: Plot (the storyline), Theme (underlying ideas), Standpoint (author's perspective), Character Development, Mood and Atmosphere, Setting, Imagery, Symbolism, and Use of Language. All these elements are interconnected and best appreciated when the reader can perceive multiple levels simultaneously — which faster reading facilitates.

Poetry should be read in three passes at different speeds: first a rapid preview for overall shape and subject, then a moderate reading for ideas and rhythm, and finally a slow reading aloud for full musicality and meaning. The speed reader has the ability to vary pace for maximum appreciation, rather than being stuck at one speed for everything.`,
  },
  {
    id: 23,
    title: 'Your Extraordinary Possibilities for the Future',
    days: [30],
    reading: `You now possess a complete toolkit for reading mastery: the guide technique, expanded peripheral vision, reduced regression, meta-guiding, skimming and scanning, vocabulary building through word parts, paragraph structure awareness, previewing, concentration management, Mind Mapping, the MMOST study technique, and strategies for literature and everyday reading.

The human brain contains approximately 10 billion nerve cells, each capable of forming connections with thousands of others. The number of potential patterns is effectively infinite. Every time you read, you physically grow new neural pathways, strengthening connections and expanding the associative network that is your mind.

Your continuing success depends on consistent practice. Use your guide every time you read. Push your speed regularly. Build your vocabulary daily. Mind Map your important reading. Preview everything. Track your speed periodically. The average person who completes this program and continues to practise can expect to at least double their reading speed while maintaining or improving comprehension. The true benefit is not just speed — it is the confidence, comprehension, and joy that come from being a masterful reader.`,
  },
]

export function getExercise(day: number): SRExercise | undefined {
  return exercises.find(e => e.day === day)
}

export function getChapterForDay(day: number): SRChapter | undefined {
  return chapters.find(ch => ch.days.includes(day))
}
