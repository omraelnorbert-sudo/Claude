-- Long-form version of the 20 Nahuales in English (working translation,
-- reviewed by Omrael). Run in the Supabase SQL Editor. Idempotent.

-- 01 · B’AATZ (Chuen)
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  1, 'en',
  'B’AATZ (Chuen)',
  'E A’KAB’AL, W KAWOQ, S KAAN, N NO’J',
  array[
    'B’AATZ is the umbilical cord to the Divine in all aspects of life, the spirituality unfolding in each person’s own rhythm of time (el hilo del tiempo, the thread of time), the red thread running through spaces, dimensions and times, the source of all wisdom — everything opens to each person at the moment that is right for them.',
    'B’AATZ is the human development that arises from the four sources of strength and wisdom of the four cardinal directions.',
    'B’AATZ is time and the insight that grows from it, the maturity every change requires, the unfolding consciousness. It is the force that connects everything with everything else: man and woman, the ancestors, the baby’s umbilical cord, the bond between beings and forces.',
    'B’AATZ is the red thread that lovingly connects worlds, time-gates and dimensions, that opens the spiritual paths and, from there, unfolds the meaning of our lives.',
    'B’AATZ is the guardian of art and culture, which are the expression of the different levels of consciousness within humanity. The highest form of art is what a human being creates out of their divine connection.',
    'In the sign 8 B’AATZ, the 20 forces of the sacred MAYA calendar unfold. On this day the Sacred Year of the MAYA unfolds, making its way through 9 EE. The MAYA year comprises 260 days arising from the connection between cosmic vibration (expressed by the numbers 1 to 13) and the quality of the day expressed through the 20 Nahuales.',
    'The Sacred MAYA Year is also connected to the 9 months of pregnancy, to the rebirth of a soul that, out of unfolding time and maturity, begins its further development on planet Earth. B’AATZ is the umbilical cord of the human being toward their Creator, who nourishes them on this journey and gives them shelter and growth. It connects us with the quality of motherhood — the birth mother, the spiritual mother, the planetary mother — who nourishes and strengthens us from our roots. In this way B’AATZ stands as the connecting force for the energy of the Earth and the cosmos available to us.',
    'B’AATZ is also the power of trust in our guidance; it nourishes the strength of faith. Without this trust, without faith, we create isolation and loneliness for ourselves, we lose our footing and our protection. People without trust and faith are exposed to doubts and fears that let them fall out of cosmic law. In this way, people without faith and trust lose the connection to the spiritual world that lies deeply within every being, and they forget the task their indwelling soul had already set itself for this life, in other states of being. This thread of connection, upward and downward, gives us support between the upper and lower worlds.',
    'B’AATZ is also woven into our clothing, which gives us not only warmth but also protection, beauty and spiritual connection. We dress ourselves, connected with the creative force, with imagination and vitality, and in doing so give expression to our own inner liveliness and creative power.',
    'The Nahual B’AATZ stands as a symbol for humanity and for humaneness. It activates human intelligence and unfolds the wisdom and power of the 20 Nahuales, making them effective for us as human beings on our planet.',
    'This is why, in MAYA tradition, the Sacred Year begins from this quality. It recalls the sacredness of the human being, who as a divine being is connected to all that IS.',
    'In the rhythm of time — given, in earthly life, by the alternation of day and night — B’AATZ calls forth the dawning day, the returning sun, and hands us over to the sacred night. It moves the counter-clockwise spiral of cosmic force. The MAYA dance 13 times counter-clockwise around the fire, and at the end of the ceremony the dance opens into a clockwise direction, to make conscious, in B’AATZ, the time that is unfolding and to embed it in our development.',
    'B’AATZ calls the respective day-Nahual into the power field of the East. It invites the wisdom of the ancestors for the development of each incarnated generation. In human creativity it shows itself as the maker of art and culture. As creator, a human being can only give form to what has already been created on the subtle plane. Thus every physical act of creation has already been created beforehand on the subtle plane.',
    'On the day B’AATZ, we become aware that, like a child through its umbilical cord, we are in constant contact with the four spiritual gates of our planet. In the white North we are connected with the clarity of the divine spirit, with the Councils of Masters and God’s messengers of light. In the red East we are connected with the power of the higher, divine will and with love. In the yellow South we receive pure and loving feelings expressed as compassion and mercy.',
    'In the black West we connect with the life wisdom, strength and companionship of KEME, Brother Death, who keeps everything in constant change. Through him we also receive the connection to the soul community of the ancestors, who express themselves through us.',
    'Through B’AATZ we are also connected, by the GOLDEN RAY, to the HEART OF GOD. As a cosmic essence, this ray gives us liberation from old behavior patterns, outdated beliefs and the often-hindering programs at work within the human condition.',
    'The strengths of those born on B’AATZ are their special connection to other planes of being, thoughtfulness, watchfulness and mindfulness, and the security that comes from divine trust and faith. From this, a person creates for themselves a life of abundance and strength. For this reason, people born on B’AATZ make good shamans. They are disposed to unfold space and time within themselves and thereby become travelers through the dimensions. Those born on B’AATZ are very good bridge-builders to other planes of being, cultures, religions, and to different energies and power fields, which — from their basic disposition — they easily weave together within themselves, both on the subtle and the material plane.',
    'The weaknesses of those born on B’AATZ show up as arrogance, haughtiness, cynicism and unpunctuality, a strong attachment to the shadow realms, acting as creators in the service of manipulating beings from the worlds of light or shadow, with a tendency toward pride and personal power and control.'
  ],
  array[
    'On the day B’AATZ we ask for our divine companionship, for connection to God’s GOLDEN RAY; we ask for the companionship of all the spiritual forces that are close to us, from our soul constellation, for our life’s task. In rituals, musicians and artists likewise ask for access to higher levels of creation, from which, through their work, they become carriers of message and energy. They should recognize that, through their special gift of creativity, they manifest God’s creative spirit on the planet.',
    'In this way they are mediators of the cosmic forces, which express themselves in their diversity — in their portions of light and of shadow — through art and music. Through the finished work they touch people in both their light and their shadow aspects. Both aspects carry within them the power of recognition and the liberation and redemption that follows from it. On the day B’AATZ we ask for every form of connection in the sense of human community; on this day we enter into the bond of marriage, we ask for a healing connection to our children and relatives.',
    'Ceremonies are also held for a powerful beginning to a project and for the healthful, gentle birth of a child. We ask for the strength of our soul, for recognizing our soul’s purpose, and for the companionship of the 20 Nahuales in fulfilling our life’s work. B’AATZ is a very good day to ask for well-being and divine companionship for the whole of humanity. May humankind, in its many fields of work, be aware of its divine companionship and guidance.'
  ],
  'Veins, arteries and the blood vessels',
  'The monkey, as a symbol of wisdom, the arts and agility'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 02 · EE
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  2, 'en',
  'EE (Eb), pronounced “eh”',
  'E KAT, W AJPUU, S KEME, N TIJAAX',
  array[
    'EE is the sacred Nahual of the human path of life and development; it leads the human being on their journey home to GOD, determined by the soul’s original intention and guiding force, and by its task.',
    'EE thus also guards the mystery of destiny, of birth, and also of the moment of death. From the given path of life, from the soul’s disposition, within its particular soul constellation, the course of a life takes shape, showing itself as density or as opening and liberation. Through EE we come to know our original intention to incarnate. EE therefore also stands in close connection with KEME, the “White Death,” who forms the body from a person’s soul disposition and releases it for its journey on Earth.',
    'The human path holds within it the obstacles necessary for human insight, and the goal envisioned by the human being in attunement with the divine will. In MAYA tradition, the human path of development, attuned to GOD, is accompanied by the 20 Nahuales that unfold from the Nahual B’AATZ.',
    'The next day in the calendar is EE; it stands in the dynamic of a life unfolding on its journey. We experience life in its light and shadow sides, through the impulses of our soul, in the symbol of the path of life. So we always begin the path of insight in the rhythm of the sacred 20, in B’AATZ, and end it on the day of clarity and the cosmic law of love, on the day TZ’I’. The spiral unfolds on a higher plane, on a path of insight that rises upward, toward new experiences, through new spaces and times, into the light of GOD.',
    'Whatever a human being visualizes and manifests along their path should be brought into harmony with EE, the guide laid down within the soul.',
    'From this arises the spiritual guidance that protects us from detours and that is concerned that we draw our conclusions from the experiences we need. This path resembles the steps of a pyramid, a symbol of development and of the goal to be reached, but also of the connection between the Divine and the human being.',
    'EE thus also leads the human being through the levels of the shadow realm, with all the experiences that open up from severed portions of the soul along life’s journey. At the same time, the human being becomes grounded in the Earth’s power field through the experience of density and lightness.',
    'From this connection, the human being is empowered — through an inner force and authority — to carry out, on planet Earth, the intention of the divine plan held within their soul, as their life’s task. If a person has forgotten their path in life, has become too entangled in matter, in the earthly, then the connection to EE recalls the return to the soul’s original intention, to come home. This cry for help from a withered soul, calling for a turning-back, can trigger painful blows of fate.',
    'On the day EE, paths open for spiritual as well as physical undertakings — for founding a company, an association, a life partnership, a family. Good and healing intentions, placed into the hands of the divine cosmos, are supported by these forces. This means protection, companionship, abundance and blessing.',
    'EE is thus also a good day for business, for projects, for connecting with the invisible “SPIRITUAL COUNCIL,” which blesses a vision and finds it good — or less good.',
    'On the day EE, the MAYA also connect with the planets, the stars, with solar systems and galaxies, in order to recognize a person’s path in life, their development within the power field of planetary and stellar constellations, and to invite the beings of extraterrestrial worlds to open their path. The soul remembers its home planet and the underlying dispositions connected with it — the guideposts for the way home to GOD.',
    'EE is the guardian of humanity’s ever-moving and ever-changing history, the wheel of life, whose movement carries human development forward. Thus EE also stands at the present change of era in the solar cycle, on the day 4 AJPUU, December 21, 2012, as the Nahual of humanity’s development path so far, with the sacred 9 in the East.',
    'The strengths of those born on EE are their individual personality, clear insight from soul-spiritual guidance, great flexibility and a readiness to be spiritually guided, a willingness to share with others, to be a guide for others, well suited to spiritual professions, good spiritual leaders and priests, whose particular gift is to recognize people’s capacities and open the way for them; a special access to children and an inclination toward professions that involve children and young people.',
    'The weaknesses of those born on EE arise from their lack of turning toward spiritual guidance: isolation, loneliness, lack of protection on life’s path, misleading others, selfishness in work and in life, know-it-all behavior, power, self-importance once goals are reached, and — through a lack of insight — hindering the paths of others in raising children, at work, in judging and condemning those who walk their own path.'
  ],
  array[
    'EE is the day of good fortune and of recognizing one’s destiny in life.',
    'On this day we ask for our spiritual development, for recognizing our soul’s purpose and our life’s task. In ritual we call upon this great companion and wanderer of life, EE, to clear away obstacles on our path.',
    'We release suffering and pain, as expressions of these obstacles, through trust and surrender.',
    'We ask EE for spiritual protection on our journey, on a trip, in an undertaking.',
    'We ask EE for a life partner who honors our spiritual development and who is willing and able to share our path in life with us.',
    'We lay out a life road of the White Path, the “camino blanco,” with 7 or 13 candles each, like an avenue of white candles, and scatter sugar along this avenue for the sweetness of the path, for joy and happiness, connecting with our own soul’s intention or with the soul of someone who has died or who has been lost in life. In doing so we ask for the opening and recognition of the soul-guided path, for ourselves and for others. The blessing of Jesus’s path by Mary Magdalene, the anointing of his feet, show us how to bless a person’s path in the same way, whether for an individual path or a shared one.'
  ],
  'The soles of the feet, the foot; the blessing of the path through anointing; subtle-energetic cleansing of the feet and legs',
  'The wildcat, the White Jaguar (protective animal of the White Path), the lynx, the white wolf'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 03 · AAJ
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  3, 'en',
  'AAJ (Ben), pronounced “ahch”',
  'E KAAN, W IMOX, S KIEJ, N KAWOQ',
  array[
    'AAJ is the symbol of maize, of sowing, of the community of animals, of the family community.',
    'AAJ is, in the symbol of the tree of life, the spirituality that unfolds as if from a treetop. It is a day of the multiplying forces between people that grow out of community and become integrated into each person’s sense of WE. From this, shared happiness and joy also arise. Human beings sow the seed of their attitude toward life and always reap the fruits of their behavior toward others.',
    'AAJ turns this human sowing toward the good and the wholesome; it lends its strength and its protection when we are oriented toward community and recognize community, in all its diversity, as a reflection of the divine communities of souls and beings on the most varied levels of consciousness.',
    'Men and women, life partners, married couples, people living alone — they all carry within them the deep wish to be part of the human community, but also part of spiritual communities. We all wish for shelter, for the feeling of being accepted and loved, and we should recognize that, to have this, we must plant the seed within ourselves.',
    'AAJ is the Nahual through whose connection and guidance we can recognize that loving ourselves, giving ourselves the attention we need, is nourishment for our own soul. From a nourished soul, a person’s personality draws sustenance with great intensity — a strength that should lie in serving, in connection to the shared and the common good.',
    'AAJ shows itself in community on the levels of the spiritual families and on the level of the earthly family. Depending on our attitude, its power always works from two sides of its polarity — the side of happiness and joy in life, or the side of our weaknesses and imperfections.',
    'AAJ thus stands as an archetype for the change in life that we can bring about through conscious recognition. We rise out of difficult life circumstances by recognizing who we are and what we came to this Earth for.',
    'In this way AAJ leads us, on the path of insight, toward an orientation to the common good. It is the day of cleansing interpersonal conflicts, of becoming aware of selfish behavior, the day of renewal, of clarity, and of the recognition that as human beings we are part of the cosmic community. Incarnation is a soul detaching itself from the spiritual community and, connected with this, entering the physical community of human existence. This is shown in the symbol of the tree of life, which is nourished equally from below and from above for its growth.',
    'In nature we find AAJ in the power of the oak tree; in MAYA tradition, in the sacred Ceiba tree.',
    'A person’s steadiness, their trust in divine wisdom and guidance, form the foundation on which they can be empowered by the spiritual world. Thus the AJKIEJ, the MAYA priest, hands the conscious person the symbol of this power, the sacred Vara, the staff of power for tasks within the community. The Vara, in turn, is a symbol of a person’s return to their roots, to their spiritual soul family, to true community in GOD.',
    'AAJ is the day of students, teachers and inventors, of pastoral workers and social workers. They stand in a special way in the task of manifesting wisdom and divine intuition within human community, and of communicating new insights and understanding.',
    'The strengths of those born on AAJ are expressed in people blessed with great creative power and a strong sense of community; they are caring, integrative in teamwork, and well suited to leadership positions. They show particular gifts in parenthood, are good healers and shamans, and are often blessed with luck, abundance and the affection of others. They stand in a healthy connection with the natural realms and have a special connection to the spirit of animals.',
    'The weaknesses of those born on AAJ show up in a disoriented approach to life, in disturbed connections to family and clan, in a disrupted connection to their surroundings. Inconstancy, unrestrained passions, selfishness, a lack of roots, superficiality, a lack of steadiness and constancy, and instability of character give people the feeling of being excluded from life — just as they themselves exclude others.'
  ],
  array[
    'AAJ gives strength and creates a person’s connection with the planetary communities, with the mineral, plant, animal and human realms. We ask for protection for life, for the companionship of the community of ancestors, we ask for protection and companionship from the community of angels and protective beings, for connection to the community of nature beings, to the communities of the spiritual councils.',
    'It is a day of gratitude for the destiny we have been given, which is co-shaped by the working of the soul communities. In rituals with AAJ we ask for protection for home and family, for an integrative path in life for our children, for a harmonious partnership, for a peaceful working environment, and at the same time we dissolve obstacles and energies of hatred, envy and resentment within the community.',
    'On the day AAJ we receive connection to the community of animals, to the guardians of the animal kingdom, to nourishing and protective communication with power animals. We ask for the withdrawal of animals that cause harm from human living spaces. With the sugar (a symbol for AAJ) that we bring into the ceremony, we ask for the sweetness of life for ourselves, for burdened family members, for the soul community on other planes of being, in the realm of the deceased and in the worlds of light.'
  ],
  'The spine; clearing the bone marrow of old programming at work within the community',
  'The power of whales and dolphins, the community behavior of other animal communities'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 04 · I’X
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  4, 'en',
  'I’X (Ix), pronounced “eesh”',
  'E KEME, W IQ’, S Q’ANIL, N AJPUU',
  array[
    'I’X stands as archetype for the creative, maternal force of the universe. This force is connected with the goddesses who represent the different qualities of being woman, and who are thereby mediators of these forces for women as well as for men. In Christianity these goddesses are expressed in the one Goddess, the Cosmic Mother Mary, but also in the various saints, the blessed masters and women.',
    'I’X is manifested in the sacredness of Mother Earth and the realms of nature — the mineral, plant and animal kingdoms. I’X thus represents the power of the mountains, the trees, the water altars, the places of air, the special ceremonial sites of the MAYA as well as of the Celts and other cultures, and their altars in nature.',
    'I’X, expression of Mother Earth, corresponds to the heart of our planet — “Corazón de la Tierra” — to the female uterus, to human conception, to female fertility in humans, in the animal and plant kingdoms. Connected with this also stands the moon, which carries these aspects of feminine creative power within itself and stimulates and expresses them in nature.',
    'In the power field of I’X we stand within the energy field of our planet, with all its wisdom and power, and with the places of nature in the polarity of light and dark places alike. Thus nature and humanity likewise stand in imperfection and in the task of maintaining balance. This harmony is greatly hindered or made difficult by humanity’s careless activity.',
    'Through I’X we also stand in connection with the power field of the four elements and their influence on nature and on being human. Through the Earth’s magnetism we are, as human beings, held in place, so to speak. People feel this state when they are too little connected with this energy field, when their soul is not yet in resonance with the Earth’s energy fields. We should therefore bless arriving children with I’X and ask for their acceptance into the Earth’s power field.',
    'Through this, children experience love of nature, shelter, cleansing and healing, maternal protection, and access to the diversity of nature beings. Legends, fairy tales and stories often have the task of building these bridges for children, to the denser energy fields of life on Earth.',
    'Since I’X can also be connected to the spirit of a place, including a home, a ceremony on the day I’X is needed to clarify discord within the family and between people, also by asking the spirit of a place or a house for harmony, protection and mutual respect. These forces are also connected to bound nature beings who feel displaced by building activity, whose home was taken from them without being asked. In agreement with them, we should offer them a new place to dwell.',
    'We often live in the power fields of those who, before us, inhabited, loved and revered this planet — but also rejected and wounded it. This calls for mindfulness: to cleanse these places, to ask for entry, and to seek an integrative solution for a shared coexistence.',
    'I’X stands for the power and intelligence of the black jaguar, which moves with clarity and fearlessness through the darkness of night, and thus also through the levels of the underworld. I’X is thus a powerful being for the protection of a place or a person. With I’X, the black jaguar, it is possible to walk through the levels of the underworlds without danger.',
    'Through I’X we can meet burdened people, but also dangers in life, with wakefulness, intuition and understanding strength, and under the protection of the Earth Mother against destruction (through disasters). Under the protection of I’X, the healer, the shaman, is able — together with the forces of the Earth, with plants and animals — to work healingly for a person, by leading the disoriented person, separated from Mother Earth, back to their roots, to Mother Earth.',
    'The strengths of those born on I’X are strength, steadiness, dynamism and vitality. They are great lovers of nature, with access to the wisdom and healing power of nature. They draw from the healing springs of the natural realms, are blessed with a strong sexual power that they can use in many ways as creative power. Through the symbolism of the black jaguar, those born on I’X also have a special access to the underworlds, to the planes of density, they love physical work and thus also stand in abundance, cultivating a healthful relationship with material things.',
    'The weaknesses of those born on I’X show up in a tendency toward aggression, arising from misdirected force, often turned inward or against others, from which an abuse of natural powers frequently also arises: negatively acting witchcraft energy, harmful magic, rigidity, simplicity of mind, stubbornness, a tendency to go it alone, a physical urge toward destruction, being absorbed by an all-encompassing mother energy, the influencing of others through a centered force and power.'
  ],
  array[
    'On the day I’X we honor and sanctify Mother Earth, her mistresses and goddesses, and we ask for the opening of the qualities of the feminine within humanity.',
    'We can ask for forgiveness for exploiting Mother Nature and taking from her without giving. We can ask for the sprouting of plants, for a rich harvest, and for the protection of Mother Earth from storms.',
    'A request for a harmonious family life, for the protection of house and family from storms and disasters, would also be possible on this day.',
    'I’X is the day of thanks to the ancestors for leaving us their heritage, their wisdom, the matter that has already been created since the beginning of the Earth.',
    'Since the riches of our planet, through the four elements, are also laid down within the human being, the day I’X is a particularly good day to recognize our inner wealth and to ask, from the heart of Mother Earth, for access to her four gates, the four cardinal directions and elements.',
    'Outwardly we manifest I’X, God’s creative power, in physical beauty and abundance, in a wealth of ideas, in our love, our will, in our dynamism and strength, in a sexuality lived from the heart.',
    'Given from the heart of Mother Earth, we ask for our physical strength for the good of the Earth and the natural realms connected with it, for a harmonious whole.'
  ],
  'Muscles and ligaments, the musculoskeletal system',
  'The black jaguar'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 05 · TZ’IKIN
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  5, 'en',
  'TZ’IKIN (Men), pronounced “tsee-KEEN”',
  'E KIEJ, W A’KAB’AL, S TOOJ, N IMOX',
  array[
    'The Nahual TZ’IKIN shows itself in the power animal of the eagle, the condor, the quetzal, in birds. It is a symbol of abundance, liveliness, agility and joy in life. Assigned to the element of air, TZ’IKIN connects us with this mobility, from which we can experience the beauty and vitality of our planet from a bird’s-eye view. TZ’IKIN stands for good fortune, for the flow of money, for material and, at the same time, spiritual stability, for wholesome wealth and joy in life, for the lightness of the heart’s love, for the decision — arising from a flash of insight — to do something or to leave it undone.',
    'TZ’IKIN acts as a messenger of the divine universe. Just as the eagle lets itself be carried aloft, we human beings have the possibility of letting ourselves be carried through the heights and depths of being. From these invisible planes, which many people no longer perceive as real, we gain access to levels of being from which we can draw guidance, help, wisdom and strength.',
    'So TZ’IKIN stands for the gift of seeing, for the sharp and attentive observer, for the gift of mediumship, for the connection of Corazón del Cielo, Corazón de la Tierra, for Gucumatz, the Feathered Serpent. This in turn is a symbol for the union of spirit (the feathers) and serpent (transformation), and for the unfolding creative power. Through transformation and insight, through our gift of continually shedding our skin, we reach a state of lightness, of ease, of clarity and purity of spirit.',
    'Communication between God, God’s mediators and the human being is possible for all those who are aware of their own lightness and, at the same time, their steadiness. The connection of planetary and cosmic vibrations and power fields is mirrored in the cosmic human being who, like the eagle with its sharp gaze, observes what is happening and, from this, makes decisions and takes responsibility. From the beauty of our Earth seen from above, human beings should, through recognition and love, draw abundance and joy from their inner strength and liveliness.',
    'The quetzal’s feathers remind us of the colorful splendor of the inwardly free and loving human being. The feathers of the Guacamaya, the macaw, are, in Copán, Honduras, a symbol for the deity of human beauty, for the colorful splendor of the soul, for its luminous radiance and healing power. Eagle and condor let us experience divinely given empowerment in human oversight. The diversity of the bird world mirrors the flow of money, the joys that are also connected with material things.',
    'TZ’IKIN shows us the way to spiritual and material abundance and unity.',
    'The strengths of those born on TZ’IKIN are a clear mind, centeredness, spiritual guidance, and trust in being carried through life. Clarity, insight and oversight create a far-sighted view into deeper worlds. They manage to rise above things even within the density of life; they move material and spiritual abundance in equal measure; they are generous and live a wholesome mediumship connected with spirit and heart. From these sources of truth they receive visions, the blessing of prophets, and, from their overview, trust, joy in life, abundance and happiness.',
    'The weaknesses of those born on TZ’IKIN are the missing balance between the material and spiritual parts of life. The dark side of TZ’IKIN shows itself as an expression of a poverty consciousness, in greed, in selfishness, in self-overestimation and misjudgment, in an arrogant, misguided mediumship through which impure beings influence the person and their surroundings.'
  ],
  array[
    'In TZ’IKIN we ask for the presence of, and cooperation with, the angelic realms, who are always depicted with wings, in their purity and lightness.',
    'On this day we ask for a rich life, for centeredness and spiritual guidance, for trust and for being carried through life, for material and, at the same time, spiritual abundance, for the beauty of spirit and body, and for the joy of life that unfolds in abundance.',
    'We turn to GOD, from Corazón del Cielo, from Corazón de la Tierra, to Gucumatz, who gave us life and who, as the Feathered Serpent, carries us ever higher in constant change, and in doing so brings us close to the liveliness and diversity of the cosmos.',
    'TZ’IKIN is called upon for the power of vision, for connection toward the Divine, for flight through the planes of being, for stepping out of the physical body and the insight and wisdom connected with it.',
    'With the raven’s feather we ask for lightness on our journey through the shadow realms. Healers and shamans ask, with the feather, for the dissolving of dense energy fields that weigh heavily on a person.',
    'With the eagle’s feather we ask for clarity in speech and in our daily expressions of life. Out of the lightness of spirit we rise, in TZ’IKIN, through the working of angelic messengers and beings of light, into the planes of divine light and love.'
  ],
  'The eyes and the inner gaze; clairvoyance and the intuition of the spirit',
  'The eagle, the quetzal, the condor, the macaw, birds, the butterfly'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 06 · AJMAQ
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  6, 'en',
  'AJMAQ (Cib), pronounced “ahch-MAHK”',
  'E Q’ANIL, W KAT, S TZ’I’, N IQ’',
  array[
    'AJMAQ is the day of the ancestors, the day of the deceased, but also a day of the imperfections of our humanity, of the burdens under which souls suffer, here and in the beyond.',
    'AJMAQ is connected with awareness, the ancestors’ wisdom of life, balance, talent, disposition, sensitivity and a wealth of ideas.',
    'AJMAQ is the day of the violet ray of healing and change, the day of forgiveness. AJMAQ leads us also to portions of the soul separated off in earlier lives, into our impure underworlds; by tracking down these portions of the soul, the work of healing opens up. AJMAQ leads to experiences and to the readiness to face these attachments from old burdens, in order to attain healing and wholeness of the soul.',
    'AJMAQ, as an aspect of BROTHER KEME, leads us, as a kind of mediator, to the weaknesses and imperfections of our being. Our ancestors from various incarnations and cultures, and we ourselves, have many lives behind us that hold experiences on every level. Through AJMAQ the ancestors accompany us with their wisdom of life; they are our protection through joy and sorrow.',
    'AJMAQ reminds us that every step of human unfolding is connected to other realms and has a strong effect on everyone involved, including the souls in the realm of the deceased. Thus our life is the wonderful possibility of dissolving attachments, bonds and obstacles for ourselves and, at the same time, for our ancestors. What a person sets in motion, through their intention, through conscious thinking, feeling and acting in service, has effects on their entire environment, on a change in the realm of the deceased, on a better return of the soul to this Earth, on the state of the conscious, liberated person in the Now, and on their unfolding future.',
    'For the unconscious person, the being AJMAQ shows itself from the side of heaviness and burden, which we take on from our ancestors and often, consciously or unconsciously, carry off for them here on Earth. For this reason people born on AJMAQ are often subject to obstacles in their life circumstances, caused by too strong an influence from their ancestors. They frequently carry this heaviness with self-pity and wonder at the injustice of life. And yet, before their birth, they had already agreed to work off old karma of their own and the karma of the soul community they belong to. So they often drag the burdens of others along with them, and in doing so take on the suffering and feelings of guilt of others too.',
    'Our weaknesses show themselves in the divine cosmos as a black cloud that veils our view of the Divine. In this way AJMAQ veils our sight, to remind the person affected of the task they voluntarily took on when entering earthly life: their own liberation, and the liberation of others.',
    'The strengths of those born on AJMAQ are their readiness to help, a special quality of heart, and a great sense for the needs of others. They are very sensitive and thin-skinned, and thereby also strongly gifted with mediumship. By their basic disposition they have a special access to the realm of the deceased, connected with the power and wisdom of the ancestors, with the wise ones of old peoples and cultures. Their readiness to serve and be there for others often goes so far that they forget themselves.',
    'The weaknesses of those born on AJMAQ carry the danger of being guided and determined by bad habits and sinful vices, by heaviness and immobility. They often also carry the burdens of the deceased on their backs and have the feeling of having to work through something that isn’t truly theirs.',
    'They like to blame others for their own weaknesses, are unbalanced, and often project their own lessons to learn, their own imperfection, onto others.',
    'Unreliability, disorientation in life, the danger of becoming entangled, a magnetism toward impure places and power fields, a tendency to deceive and seduce others are signs of the dark side of AJMAQ.'
  ],
  array[
    'On this day we ask for the liberation of the deceased from all attachments to earthly life. In the violet ray we work with our relatives in the realm of the dead, ask for forgiveness, heal and integrate those who were excluded, betrayers, abusers and the abused.',
    'We ask AJMAQ for intercession and help, for insight, for the healing of aberrations, passions, heaviness, depressions, physical and psychological illnesses connected with attachments from burdened portions of the soul.',
    'In prayers and ceremonies on this day we include, in particular, the imperfections of the deceased; we bless them, open for them the path to liberation by inviting them to walk the way of change together with us.',
    'In MAYA tradition, on this day the deceased are reminded, through the scents of the food (banquete), of a joyful meal in life. They are invited back into the community of the living for the feast of life — a symbol of shared joy and of peace in being together.',
    'Ceremonies on the day AJMAQ can also be held for the liberation of bound souls at old power places, but also at accident sites, in houses and places of violence and destruction, as well as in cemeteries and similar places. Black-magic occupations, too, can be well recognized and dissolved on the day AJMAQ.'
  ],
  'The sexual organs, the emotional body; programming and experiences laid down by the person in the spine and in the bones',
  'The eagle owl, the bee, insects, mosquitoes'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 07 · NOJ
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  7, 'en',
  'NOJ (Caban), pronounced “nohch”',
  'E TOOJ, W KAAN, S B’AATZ, N A’KAB’AL',
  array[
    'The human brain, connected with the heart, is the temple of divine wisdom. NOJ is the guardian of this wisdom, which begins to open to a person as they increasingly cleanse and clarify their heart and mind.',
    'Through the sacred SEVEN, in NOJ we stand connected to God’s plan of creation, to the sacred Seven Rays in their 7 basic qualities of light and the 6 phases of rest and integration.',
    'NOJ is the day of wisdom, of active intelligence, of knowledge and empowerment, of the motivation in all doing that should be connected with divine intention.',
    'Incense stands for this sacred connection between the human being and the will of God. Like the rising scent, heaven and earth, spirit and matter, connect with one another.',
    'A special form of creative power is our ability to think and to direct our thoughts. Creativity is the expression of the human connection with divine creative power. We can only invent what already exists, on a subtle level, in the cosmos. Thus the creating person is dependent on the cosmic library, in which everything already exists and can be made accessible to the three-dimensional world. The person assembles this knowledge, stored on higher planes, according to their own judgment, and puts it to use in the sign of serving — or also of destroying.',
    'NOJ reminds us that we should use divine intelligence only in connection with our heart, and for the good of humanity and of planet Earth. It guards the secret of cosmic wisdom, centered in our cool mental power, which should always be warmed through the heart.',
    'Thus NOJ also stands within the power field of magic, when mentally strong people, purely through the direction of their thought-power, generate fields of vibration and consciously or unconsciously influence people and life situations — for the good, or, on NOJ’s dark side, to the harm of others.',
    'Out of the power of recognition, NOJ helps a person master their life’s task. From its impulses, from the insight of the spirit, memories reveal themselves of ancient knowledge and wisdom, of spiritual access points and the mediumistic sources of cosmic wisdom connected with them. In this way Jesus symbolically opened, from NOJ, for his companions, access to the “Holy Spirit,” from which they were able to recognize and grasp much anew.',
    'In the change of eras, NOJ shows itself in the human capacity to separate the wheat from the chaff, even within the scriptures and the knowledge of religions and cultures. Much within spiritual scriptures and messages has, over the cycles of time, been influenced and altered by human hand, but also by impure influences and forces from other worlds. In this way, within religions and creeds, untruth, intolerance, war and discord between faiths were created out of manipulated messages.',
    'In NOJ the various sources of wisdom from different planes of being are centered into a shared truth, divine insight. This knowledge can be grasped from the different levels of consciousness and degrees of maturity within humanity. It takes shape, connected with the cosmic ray of wisdom and love, with the ray of cosmic intelligence and the all-penetrating spirit, in NOJ, forming a shared truth that connects everything.',
    'The strengths of those born on NOJ are their many good ideas, connected with divine insight and intuition. They show great, creative talent, act with a sense of justice and have a strong memory for what is essential.',
    'They are outstanding messengers of wisdom and teachers, people of great spirit and open heart. They defend humanistic ideas and orient their actions toward the old traditions, which they weave back into the present day.',
    'Among them one finds great healers and doctors, wise businesspeople and outstanding intellectuals, writers, musicians, teachers of wisdom and politicians. They have particularly strong magical abilities and spiritual gifts, which should be consciously used with the heart. So those born on NOJ are often authors and priests of divine truth, nourished from divine sources.',
    'The weaknesses of those born on NOJ show up in people who are often proud, haughty and arrogant, and who lack empathy. They act isolated from the truth of the heart and from their own inner, luminous gifts. In this way they often become entangled as servants of forces that want to preserve their realm on Earth and to realize their lower plans and insights. They frequently act in the service of star beings who, far from the Divine, bring their qualities into human existence as cold knowledge isolated from the Divine, and in doing so also misuse human beings as a source of information and power, as inventors, and in the service of science, art and religion.'
  ],
  array[
    'Ceremonies on this day are especially effective for dissolving ideas and notions created out of negative emotions and thoughts from lower worlds.',
    'On this day it is also possible to dissolve impure ideas and notions as well as bad habits, and to transform injustices — for example, an unjustified verdict of guilt or malicious gossip — through the purity of spirit.',
    'Likewise there is the possibility of ceremonially turning away people and beings with impure intentions, by asking for NOJ’s protection.',
    'On this day, a good thought, a pure heart, pure speech are enough, with which one asks for the sacred connection to divine power and wisdom, and begins to express it in life.',
    'Great effect shows itself, on the day NOJ, in the heart-connected devotion of a woman, a shaman or priestess, and the birth of the new, the sublime and the pure connected with it, in the symbol of the birth of the divine child, the manifestation of cosmic love.',
    'On this day we ask for universal wisdom, for connection to the planes of being, in order to unite heart and mind. On this day we can draw especially close to the meaning of life and the goal of our soul. It is a good day to connect ideas and notions, in the form of projects and undertakings, with a Spiritual Council. The help of the forces of angels and masters can also be asked for in realizing a vision.',
    'On the day NOJ we ask for the lived wisdom of life and the strength of the ancestors for our journey through life. NOJ is the day of the Consejo Invisible, the invisible Spiritual Council, of the working of the ascended masters, women and men, of the “White Sisterhoods and Brotherhoods.”'
  ],
  'The brain, the wisdom of the heart',
  'The monkey, the woodpecker, the coyote, the white eagle, the white jaguar'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 08 · TIJAAX
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  8, 'en',
  'TIJAAX (Eznab), pronounced “tee-HAHSH”',
  'E TZ’I’, W KEME, S EE, N KAT',
  array[
    'The quality of the day TIJAAX is, first and foremost, connected with the power of woman.',
    'When a woman has integrated her qualities, she represents directness, clarity, strength, intuition, joined with gentleness, kindness, compassion, and a connecting, all-nourishing warmth of heart. On subtle planes these qualities also express themselves in the image of the Black Goddess found in various cultures and religions.',
    'The polar force of light and dark challenges human beings to connect both parts and bring them into harmony with one another. TIJAAX is the contrast, the double-edged sword, sharpness and softness, the power of discernment that, in a given moment, transforms softness into clarity and sharpness.',
    'TIJAAX rules with the sword of clarity and justice and, as a warrior of the heart, separates truth from untruth. She is ready, as a healer, to descend into the depths of unconscious and dark humanity, in order to free the human soul for the path into the light.',
    'In TIJAAX we overcome a reduced view of life; we widen the narrowing way of judging life situations as black and white, good and evil, light and shadow. In MAYA tradition, the shades of light always show themselves without evaluation and judgment, as part of divine creation, as effects of a ray of light within polarity. In this lie many possibilities for a person to experience and unfold themselves within this field of tension.',
    'In TIJAAX we recognize and free the connection between the energetic cycle in which perpetrator and victim find themselves. Both always stand facing each other within the same theme, often across many incarnations, and move and encounter one another within the cycle of lower forces and beings acting upon them.',
    'The power of the sword is a special task for whoever is connected with it. If misused, it turns against its own bearer.',
    'In these unconscious and unclear aspects of humanity, TIJAAX is thus also a day of soul wounds, of injuries, of heartache, of heaviness and suffering. In MAYA tradition, TIJAAX is for this reason connected with the passage into the underworld. On this day, workers of harmful magic use the sword to destroy and to create division.',
    'The sword, carried in divine awareness and love, separates what is unclear, impure and untrue, and thereby brings the human being purity, healing and insight. The human soul rises out of the clouded, unconscious portions of the darkness and strives, through the black mist that opens with the sword’s stroke, toward the light of insight.',
    'TIJAAX is connected with the quality of obsidian, which is brittle, sharp and difficult to work. Yet whoever has ground obsidian with patience and empathy recognizes its possibilities: to unfold, out of the gentleness of the shadow realm, its protective stillness, its nocturnal, radiating warmth, protection and harmony.',
    'Thus TIJAAX also represents the harmonious, warming and protective sacred underworld. In the light of the moon, TIJAAX, within the power field of the moon goddess IXCHEL, gives shelter, protection and mystery.',
    'The strengths of those born on TIJAAX: they are optimistic people, they hold human values high, they enjoy working together in a spirit of teamwork. They do not let themselves be confused by passions and are reliable in love and in friendships. They readily take on the problems of others and stand vehemently against any violence and injustice. In the face of injustice they speak and act with the sword; they like to fight for their rights and for the dignity of others, and thereby quickly take sides. Because of this, however, they are also prone to fanaticism and self-righteousness.',
    'Those born on TIJAAX are usually also strong healer personalities. They often fight with all their strength for a person’s well-being, and use their gift of discernment to orient and raise the awareness of others (a sense of mission). In healing work they like to work with the sword of clarity and to sever energetic connections that hinder a person on their path. They are good bridge-builders between light and dark, once they themselves have learned to bring both worlds and sources of wisdom into harmony within themselves.',
    'The weaknesses of those born on TIJAAX are anger, aggression, a tendency toward injustice and harshness, toward fanaticism and condemnation. They understand little humor and often, with great coldness, neglect family and partner; they are very restless and self-righteous. Their fight for the good turns the moment they raise themselves up as guardians of truth and use every means to get their due. They fight with the sword for their convictions and are ready to kill for the truth, and even to go to their own death for it.',
    'In this way they stand in great danger of raising this sword, out of lower planes, out of their own entanglement with power (which they themselves nonetheless condemn in others), often in the name of God, believing they must do so for GOD.'
  ],
  array[
    'On this day we ask for release from attachments and burdens, for inner liberation from feelings of enmity, for the dissolving of bad friendships, of bonds and dependencies, of physical or spiritual bonds. We ourselves release ourselves from guilt and a victim consciousness, from hindering habits and confining doctrines of belief, and from fanaticism. Any liberation from bondage and unfreedom, from excessive materialism, from catastrophes and accidents laid down within us, should happen in harmony with our soul’s task. So we ask, first of all, for the opening of the luminous soul’s path out of the dark mists of the underworlds.',
    'Through TIJAAX we ask for freedom, health, independence and insight for our path in life. May everything that binds, every blockage in recognizing our life’s task and the portions of soul connected with it, be recognized and dissolved through forgiveness and turning toward the Divine. On this day we ask our spirit guides to recognize arrogance and to dissolve it in humility.',
    'TIJAAX is also a very good day to rise, in ritual, above the illusions of good and evil, and to bring the realms of light and shadow within us into harmony.',
    'On TIJAAX, woman is reminded of her great task as guardian and nurturer, and is honored as one who loves and is loved, as guardian of her mystery and as temple of the Goddess.'
  ],
  'Teeth, tongue, fingernails and toenails',
  'The swordfish, the shark'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 09 · KAWOQ
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  9, 'en',
  'KAWOQ (Cauac), pronounced “kah-WOHK”',
  'E B’AATZ, W KIEJ, S AAJ, N KAAN',
  array[
    'KAWOQ watches over human community, the group consciousness of the human being who, in the service of one’s fellow humans and, above all, in the service of God, fulfills their nourishing task. It is the Nahual of the village community working together, of the community of nations oriented toward the common good, of the planetary family, of the growing tree of life, and the guardian of the different stages of life.',
    'KAWOQ is, at once, the power of water and of fire, in the natural realm of thunderstorms and severe weather — the power of witches and of the forces of nature that act upon community. Just as the rain, and the storm discharging through atmospheric tension, cleanses and cools the air, creates clarity and at the same time nourishes growth, so too should the human being, likewise in fire and water, be a cleanser, a nourisher, and one who gives.',
    'KAWOQ is the Nahual of mental and emotional connection within the human being.',
    'One of the special deities in MAYA tradition under the sign KAWOQ is CHAK, the MAYA rain god. From him flows everything nourishing and cleansing; he stands for the life-giving fluids and for fertility; from him, density and tension are discharged, bringing harmony and clarity into human existence. CHAK acts from the four cardinal directions in different qualities.',
    'Thus KAWOQ, as the Nahual of fertility, also nourishes in a harmony of masculine fire and feminine water. When the rain lets the seed germinate, it is the fire of the sun and the nourishing earth that bring it to growth. The power of the storm and the fire of lightning, connected with KAWOQ, intensify human action with the tremendous power and primal force of a storm, of lightning strikes, followed by a clear, cleansed atmosphere and a nourished nature.',
    'In our own latitudes, KAWOQ shows itself in the forces and beings of nature acting upon human beings, which legends and stories often give us precious hints about, regarding the qualities of the nature that surrounds us. The efficacy of a person who, connected with KAWOQ, walks their path in life is correspondingly high. Yet with the same intensity, this Nahual can also entangle an unconscious, selfish and self-important person in their own misfortune.',
    'The strengths of those born on KAWOQ show up in their readiness to take on responsibility in social professions; they are leadership figures in political affairs as much as in teamwork. At the same time they are special people of nature and lovers of nature beings, and thus also very good nature healers, herbalists and healers. They are alert, community-oriented, with great empathy; they have a very strong intuition, spiritual insight and premonition.',
    'As shamans and healers they are strong by their basic disposition; they hardly ever fall ill, and can barely be influenced, intimidated or misled by other people and situations. They are born of water and fire, and thus are often also very sensitive, empathetic and generous, while in other situations they are stubborn, direct and self-willed.',
    'Those born on KAWOQ, through their strong intuition and sensitivity connected with the power of fire, are outstanding mediums and channels, from the access given them in water and fire. It is important for them to bring clarity and purity into their world of feeling. Every open conflict intensifies from their basic disposition and lets human thunderstorms arise. From clarity, spontaneity, strength and warmth of heart, a strong, inwardly resting and powerful personality develops in those born on KAWOQ.',
    'The weaknesses of those born on KAWOQ: they like to meddle in matters that are none of their business; they take on responsibility where it is not called for. Through arrogance and self-overestimation — their power drawn from impure fire, from power itself — they paper over their weaknesses and their emotionally accented basic disposition.',
    'They are emotionally easily manipulated and prone to illnesses that manifest from their suppressed and unconscious power. Within the family, it is mothers and fathers who want to live their children’s lives, who manipulate them and suffer enviously that other people go their own way.',
    'Impure thoughts and feelings bring a great deal of misfortune and conflict into community.'
  ],
  array[
    'On the day KAWOQ we ask for the healing and harmonizing of human community, as well as of existing tensions and discord. We ask for the dissolving of resistances — emotional ones, or those arising from others’ power — that hinder a group or community in its development.',
    'We pray for spiritual help and guidance for those who carry weight-bearing functions in politics and in leadership positions. In KAWOQ we awaken our social spirit, our self-love; we direct our attention to interpersonal relations and love of neighbor, to mutual help and care, to recognizing and carrying out our individual as well as our shared life’s task.',
    'In KAWOQ we unfold, out of fire and water, a sexuality oriented toward the divine creative spirit, out of the fire of kundalini power and a feeling warmth of heart. We ask KAWOQ for a healing sexuality and for the healing of infertility, impotence, illness.',
    'We ask for rain and fertility for our sowing, for support for all projects that serve the human community, for a wealth of ideas for a vital and many-sided society and community (impulses of thought, flashes of insight). We ask for the healthy development of the unborn and, at birth, for their integration into the family and into the community of Earth.',
    'Ceremonies on this day are especially suited to the transformation of personal power and emotional outbursts that burden a human community, a partnership. Through water we cleanse negative feelings such as envy, hatred, resentment, jealousy, illness, feelings of guilt, unjustified accusations, malicious gossip, tittle-tattle, mental and emotional (magical) curses, stress, mobbing at the workplace, and more. We offer our readiness to work, in a balance of both elements, toward a harmonious, developing humanity.'
  ],
  'Heart, mind, blood, nervous system',
  'The turtle'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 10 · AJPUU
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  10, 'en',
  'AJPUU (Ahau), pronounced “ahch-POO”',
  'E EE, W Q’ANIL, S I’X, N KEME',
  array[
    'AJPUU is the power of the sun, the solar fire as a symbol for the divine father GRAN AJAU, who embodies and gives the principle of life. AJPUU stands for material and spiritual security, for the power of the divine creator present in every moment of life, who supports and encourages us in our development to become like his image.',
    'In AJPUU we set out on the journey of life, with the intention of letting the Divine within us become experienced. We carry the staff of empowerment and the lance as protection against all hindering powers that would try to turn us from our goal.',
    'AJPUU is the hunter who pursues their intention purposefully and who defeats and overcomes everything that stands in their way. AJPUU is the fairy-tale hero who knows what they want and uses the power of the heart to reach their goal all the faster.',
    'HUN AJPUU is one of the legendary MAYA figures, as is IXBALANQUE. They were born from light and shadow, from the upper and the lower world, from the sun god and the moon goddess. As twins, with cunning, courage, wisdom and purposefulness, they were able to pass the trials and tests of the lords of the MAYA underworld and, through this, reach the heights of divine light.',
    'AJPUU is the power of the heart-warrior, the guardian of human will attuned to GOD and of an intention directed toward service. Just as the sun rises in the morning and gives the day light and warmth, so the Nahual AJPUU gives life and warmth to all those who say a clear yes to planetary life and to connection with GOD.',
    'AJPUU widens and opens our consciousness and frees us from the burdens of an unconsciously lived life. Just as it dissolves the darkness of night and, at dawn, announces the awakening day, so AJPUU dissolves our unconscious fears and dependencies within our awakening consciousness. The fire of the sun lets us recognize the diversity of life; we are supplied with warmth and light, and go about our life’s work with determination, wanting it to be fulfilled.',
    'AJPUU is the Nahual of masculine power, of physical and spiritual fertility, of regeneration, of the warrior who walks the path of life with wisdom and insight. In the image of the rainbow warrior, AJPUU stands for the connection of courage, bravery and the wisdom of the heart. AJPUU is connected with the warrior Orion, who, under the influence of the Pleiadian forces, loses his hardness and destructive power. For this reason AJPUU also represents the cosmic human being; in Christianity it represents the divine messenger Jesus, an expression of the Divine, connected with the cosmic fire and the power of devotion to GOD’s will.',
    'The strengths of those born on AJPUU: they are people who are secure, intelligent, clear, alert and amiable. They radiate warmth and light and have the capacity, out of their connection to God, to grasp cosmic wisdom and the subtle planes of both light and shadow, and to hold their forces in hand. They possess a sunny nature, are good friends and reliable partners.',
    'Through their qualities they possess inner and outer wealth; they are disposed toward joy, happiness and abundance. Drawing from this source, they are valuable in leadership positions, but are also, as coworkers, very responsible and reliable. Through their intuitive insight into other worlds they find good solutions to problems and convince others through their sense of security. In their basic disposition they carry access to the realm of the deceased and are outstanding healers for souls seeking help and healing.',
    'The weaknesses of those born on AJPUU show up in their tendency toward power, toward arrogance, toward haughtiness and self-importance. They are very choosy in their dealings with friends and always have a tendency to raise themselves above others, to influence, correct and control them. They set the rules wherever they can, and hold their own truth to be the only correct one. Out of their claim to power they reject any form of criticism and insist that others’ opinions be subordinated to their own. In this way they become entangled in the misuse of power, delight in the suppression of others, and misuse their strength to exploit others.'
  ],
  array[
    'On this day the wisdom of the sun god of the indigenous peoples is especially at work.',
    'From AJPUU arises the cycle of the four seasons, a constant play of change in birth, death and resurrection.',
    'It is a particularly good day to analyze our life, to rethink it, to initiate a change, to re-center ourselves on our given life’s task.',
    'AJPUU is a precious day for woman and man, to sanctify and honor the masculine. For this reason a woman may also, on this day, voice her request to be received into the sacredness of the masculine power field. In rituals we could ask the masculine for forgiveness and thus ask for the healing of a marriage or a partnership.',
    'It is the day of emotional, intellectual and mental security, and of clear recognition of our path in life and our life’s task.',
    'We give thanks to Grandfather Sun for his blessings, for awakening our consciousness, which, like the rising sun, illuminates our being and, at the end of life, withdraws into the other realms.',
    'On the day AJPUU we give thanks for the blessings of everyday life that opens from our soul’s disposition, for our daily experiences and for our strength of will. In AJPUU, power transforms into spiritual empowerment, personal will into God’s will.',
    'On the day AJPUU we can give a clear no to our fears, our doubts and all the hindering forces on our life’s journey. As beings and forces, their task is to make us aware of our true being, to help us recognize ourselves, and to strengthen our humanity.',
    'Ceremonies on the day AJPUU could also be held at sunrise.',
    'A clear YES to our life, the intention coming from the heart to want to draw closer to ourselves, and the readiness to commit to this, are the precondition if we wish to invite AJPUU into our life.'
  ],
  'Chest, eyes, heart, blood',
  'The lion — Nahual of the lion, as an expression of divine humanity'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 11 · IMOX
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  11, 'en',
  'IMOX (Imix), pronounced “ee-MOHSH”',
  'E AAJ, W TOOJ, S TZ’IKIN, N KIEJ',
  array[
    'IMOX is the power of water, the giving maternal breast, the source and the river of life, the water of life, hormones and digestive fluids, and essences of fertility. From IMOX, visions, wishes, dreams and the mystery of manifesting feelings and lower emotions take shape within human life.',
    'The element of water stands, in human existence, for the world of feelings and emotions, for emotional attachments and bonds, for the programming and experiences of the emotional body. We react out of the quality of emotional patterns, ideas and belief-images which, according to the MAYA cosmovision, are subtly formed beings acting upon us. Depending on their quality and their belonging to the realm of light or shadow, they guide the person either in a wholesome, positive way or in a divisive, negative one.',
    'Thus IMOX stands for the “forces of illusion” at work from the emotional body. We can dissolve, heal, and replace these beings and worlds — self-created by human beings — with wholesome and light-filled forces working from higher planes. IMOX is our mediator to these forces and beings, at work from the inner layers of experience, from the emotional body.',
    'The preciousness of feeling-elementals and higher beings shows itself in the purity of our inner water world, in compassion, mercy and love. When people repress feelings, when they act predominantly from their mental powers, from reason and intellect, the heart turns to stone and the qualities of humaneness connected with it wither. Repressed and impure emotions often channel energy into addictions, dependencies, aberrations, into aggression, into mechanisms of power and control.',
    'In this way a withered emotional life is also, through IMOX, connected with madness, insanity and derangement, with the destructive force that overwhelms a person. To be in the flow of life means not clinging to the old, letting go, entrusting oneself to the cosmic current, knowing that the flow of life has its own intention and its own goal. IMOX is the power that leads, holds and guides us through life’s turbulences, and to which we may trustingly surrender.',
    'IMOX nourishes our feminine side, our intuition, the inner knowing that all our experiences serve the good of our soul’s development. IMOX is our mediator to the beings of the waters, to the beings of springs, brooks, rivers, lakes and seas.',
    'So IMOX is also connected with the goddess of the moon, with Chak, the MAYA rain deity, and with Mary, the Christian mother of the healing waters. Connected with the waters that are nourished by the sacred rain, the purity of the human being flourishes just as Mother Nature grows. In the sign IMOX we call the rain; we ask for connection to the sacred element water. In the sign IMOX we bless water, which is thereby transformed into a healing essence.',
    'Water becomes physical and spiritual life-sap, which nourishes everything from the heart of God, in the symbol of the blood of Christ. Healing springs are a living connection of beings of light and beings of water. Both act upon the human being, illuminating, healing and nourishing.',
    'The strengths of those born on IMOX: they let their feelings act from their heart and let their soul speak in compassion and humaneness. They are very helpful, fond of order, but also good businesspeople with the ability to assert themselves, very inspiring and motivating, visionary and gifted with telepathy. They absorb cosmic messages with ease. They love to work in the occult and the mysterious, are very strongly connected to the earth, and for this reason also stand with both feet on the ground. This also makes it easy for them to master everyday life with all its problems.',
    'They have a deep connection to Mother Nature, to everything natural, to the realms of nature, to the moon goddess, to the element water, but also to minerals, plants and animals. They are usually strong spiritual healers.',
    'The weaknesses of those born on IMOX come to light when they let themselves be guided too much by their feelings. The unconscious person thereby becomes entangled in an inner chaos, in madness, acts chaotically, becomes distrustful, self-righteous, insecure and indecisive.',
    'Those born on IMOX easily cause confusion through their unstable behavior. Their emotional worlds move in an intense up and down, thereby unsettling those around them. From an impure emotional body grow impure and divisive thoughts, feelings and actions. Through water, through emotions and feelings, these people are very easily influenced.'
  ],
  array[
    'On the day IMOX we ask for messages from the beings of the waters. We stir the watchfulness of our spirit, so as to be able to enter into sacred connection with the beings of water and the natural realms. We ask for messages through our dreams.',
    'On this day we can ask the heart of Mother Earth to give us, once more, strength and connection, steadiness and constancy, for our overly unstable feelings. In this way people can come again into a state of inner harmony and connection. May we receive spiritual nourishment in the form of creative inspiration and put it to use for the good of our planet Earth.',
    'We ask IMOX for the cleansing of our emotions, for the dissolving of behavior patterns and imprints that hinder us, including from earlier existences.',
    'On the day IMOX we heal emotional unrest, inner imbalance, madness and quarrels within community, and the mental problems and misconceptions that arise from them.',
    'We ask for the cleansing of our bodily fluids, for balance in our hormone levels, for inner peace and for inner balance.',
    'In IMOX we bless water as a healing essence. Blessed water, at the workplace, in living areas and in bedrooms (especially important for children), can bind lower forces acting upon us and thereby give us protection.'
  ],
  'Blood, ganglia, sexual essences, hormones',
  'The crocodile, the iguana, the shark, reptilian beings'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 12 · IQ’
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  12, 'en',
  'IQ’ (Ik), pronounced “eek”',
  'E I’X, W TZ’I’, S AJMAQ, N Q’ANIL',
  array[
    'IQ’ is air, the cleansing wind, the power of thunder, the sound and moving force of music, the power of sacred mathematics. It shows itself in the purity and clarity of crystal, in spirit, intellect, in spiritual alertness and awareness, in human mental power. Comprehension, the capacity for insight and versatility in a person are expressions of this cosmic power, which shows itself, in the blue ray, also within the spiritual hierarchies as forces and beings with the clarity of the sword. It is especially through the breath flowing within us that the energies in our body move.',
    'On the planetary plane, the Nahual IQ’ expresses itself as the sacred power of the air. The Pocomam MAYA also call it SANTA MAJOM, the primal force of wind, of storm, which moves the entire planet within its energy field, cleanses it and strongly influences the weather. From IQ’, at sensitive and impure places, forces and storms center and discharge themselves in hurricanes and cyclones.',
    'In the power field of the sacred wind we receive the cleansing of our world of thought and mind, and we order and harmonize our intentions and ideas.',
    'Since the element air is assigned to our mental body, we subtly connect our world of thought, our visions and our life’s intentions with IQ’. If our thoughts are connected with low intentions and emotions, we manifest, from the level of the mental body, forces that hinder us on our path in life and can even harm us and others. Impure thoughts are followed by impure emotions and divisive actions, which in turn create soul-impurity, attachments and dependencies within us.',
    'On the path of life, the spiritually seeking person strives to embed a pure spirit within a pure body, and thereby give expression to the Divine Spirit. From this pure spirit, a person draws cosmic insight and wisdom. A pure spirit is flexible and adaptable; it penetrates the layers of mist of unclarity and impurity. This quality is, in the current change of era, especially important for us as human beings.',
    'Like the clarity of a crystal, our spirit too should rise and strive toward divine unity. IQ’ is the power that raises us into the planes of spirit, that subtly cleanses us of low thoughts, and that again and again brings clarity and insight out of confusion and unclarity. From this clarity, connected with the wisdom of the heart, a flexible, far-sighted and responsible human being takes shape.',
    'An expression of this clarity, in certain aspects, is reason, the intellect, which, connected with IQ’, also represents the creative power and inventive spirit of the scientist. Knowledge connected with IQ’ stands in the service of one’s fellow human beings, because IQ’, the Nahual of coolness and clarity of thought, always stands connected with the divine spirit and is moved from divine sources. This would be the key for our insights and inventions to have a wholesome effect for the good of humanity, connected with the heart.',
    'The light of wisdom gives us clarity in perception.',
    'In the same way, IQ’ shows itself in its impure form for all those who use reason and their striving for structures of power and control, and thereby create division within themselves and within humanity.',
    'The strengths of those born on IQ’ are their very clear ideas and notions. Through the flexibility of their mind, they can quickly grasp and put into practice new insights, realizations, conditions, ideas, attitudes and positions, and thereby also convey new insights to other people and convince them of their truth.',
    'Those born on IQ’ easily put ideas into action and, through their clear-sightedness, are also good problem analysts and problem solvers. They have the ability to focus their attention, to perceive unclarity, and to recognize the confusions of emotionally driven people. As mental healers they help bring emotional outbursts and excessive emotions under control and give them clarity.',
    'Through insight and awareness they move the power of imagination and, with it, the creative spirit of God. Those born on IQ’ are very powerful, filled with the power of the spiritual wind, the breath of God. They move with ease through the difficulties of life, because they are able to view much of it from a higher vantage point.',
    'The weaknesses of those born on IQ’ are forgetfulness, superficiality and distraction. They are unreliable and careless and have a strong tendency toward haughtiness. Great dangers for those born on IQ’ are arrogance, a strong ego and attachment to a narrow reason. People with a cold mental expression are isolated from warmth of heart and from divine virtues. These traits are often even defined by them as weaknesses.',
    'The sharpness of intellect and reason is expressed by those born on IQ’ in a self-appropriated dominance and power stemming from arrogance. Because of their mental strength, those born on IQ’ can harm their fellow human beings merely through negative thoughts and intentions.',
    'In the same way, these people also harm themselves, by directing their spiritual power against themselves and suffering from rejection, selfishness and a lack of community spirit.'
  ],
  array[
    'On the day IQ’ we ask for the clarification and centering of our spirit, for the integration and connection of our reason and intellect with the heart. We ask the Nahual of the air for insight and understanding in the manifestation of the intentions we direct toward the spiritual world.',
    'We ask for the power of the wind, to free us from impurities and to illuminate our soul. In this way IQ’ pushes aside the fog over our consciousness, gives us clarity and insight into our soul’s task. We ask Brother Wind for the cleansing and clarifying of our subtle bodies, which again and again become impure within our environment. May the dark spirits and negative energies, illness, suffering and need be released, with the power of IQ’, from our being (body, house, family). Smudging, but also the airing of our dwellings, can, with IQ’, become a special act of cleansing. From IQ’ we ask for the purity of the air we breathe.',
    'As the carrier of sound, IQ’ moves and carries the vibrations of music. It moves, transforms, heals and cleanses our subtle bodies and our surroundings.',
    'Through the vibration of sound, spiritual forces and beings also move into our being and our surroundings.'
  ],
  'Lungs, respiratory tract, breath',
  'Bird beings, the falcon, the hummingbird, the dove, the eagle, insects and mosquitoes'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 13 · AK’AB’AL
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  13, 'en',
  'AK’AB’AL (Akbal), pronounced “ah-kah-BAHL”',
  'E TZ’IKIN, W B’AATZ, S NOJ, N TOOJ',
  array[
    'AK’AB’AL is the BRIDGE-NAHUAL of the passage from one state to another. In nature it is dusk and dawn; in human life, the transitions from childhood to youth and adulthood. On the subtle plane, AK’AB’AL represents the transitions from illness to healing, from death to resurrection, from being caught in the shadow realm to liberation into the light, the healing, liberation and rebirth in the soul’s transformation — the soul that steps forward before the personality and guides the human being — the light that begins to illuminate the darkness of matter on our planet.',
    'AK’AB’AL is the Nahual of the transition from light to dark and from dark to light. It leads us into the mystery of the new, of the awakening day and of the arriving night. AK’AB’AL lets us, as human beings, recognize this transition; it gives us access to the mystery of the dark, from which we draw mysticism, stillness, shelter and calm.',
    'Through AK’AB’AL, guardian of the threshold, we also reach, for healing and redemption, deeper levels of the underworld. Through the integration of our shadow worlds, through healing and the retrieval of our severed portions of soul, we bring light and shadow into balance. In this way we create inner and outer harmony and the longed-for inner peace.',
    'AK’AB’AL can only be recognized and integrated by people who are ready to accept the mystery of the sacred darkness. Like a bridge, AK’AB’AL leads from the light into the planes of the shadow realm of KEME. The forces at work there, and the resting portions of soul, open their power and life wisdom to those who respect and love them. In AK’AB’AL we also honor and value the realms of the ancestors and the deceased. Across the bridge AK’AB’AL, through our help, the souls of those who went before us can journey into the light and be redeemed.',
    'As the day awakens, AK’AB’AL wakes us to hand us over to the activity of everyday life. Every day we hope and wish for a peaceful and happy day. So AK’AB’AL is also connected with the power of hope, from which we draw a new beginning. It also stands as a sign of aging, of the evening of life, and, at the same time, for the new beginning of life on other planes of being.',
    'The prayer house of the MAYA is, among other things, also underground chambers and caves. They very vividly represent the levels of the MAYA underworld, XIBALBA, through which, with a pure heart and wholesome intentions, one finds access and guidance to one’s own impure portions of soul and to those of the deceased. AK’AB’AL opens for us the gates into these realms of experience, which should only be entered for healing and blessing.',
    'The trustworthy power and being AK’AB’AL, through the black jaguar, gives us protection and companionship in the transitions through the depths of the shadow realms.',
    'In AK’AB’AL we also connect with the power fields of the four nocturnal energies: dusk, night, midnight, dawn. Each of these power fields has its own meaning and effect within us as human beings, but also stands connected with the working of different energy fields.',
    'The four light-messengers of the MAYA once asked the divine Creator, on a day AK’AB’AL 8, for sunlight for the planet and for humanity.',
    'The strengths of those born on AK’AB’AL: they are strong bridge-builders between the realm of light and the realm of shadow. They have the special quality of awakening and strengthening the light within their fellow human beings. In their own movement upon the bridge, they preserve an everlasting inner youth. Generally, they act out of a mystery and are, in many respects, rather reserved. They love being by themselves and acting out of stillness.',
    'In everyday life, however, from their dark portions they are also realists who are ready to take on responsibility. They have luck in their activities and are highly valued by those around them as healers and bridge-builders. Toward adversaries they act very forcefully and strongly, setting clear boundaries.',
    'Those born on AK’AB’AL are very strongly gifted with mediumship; from this insight and access to other worlds, they can give help and healing. Like their Nahual, they have the ability to change dimensions and spaces, to adapt to new states of being. They are very strong mystics and magicians, strong healers and shamans who can heal equally from the sources of light and dark, and free people from their attachments.',
    'The weaknesses of those born on AK’AB’AL show up in their often very great readiness to suffer. When they cannot accept their own darkness, they suffer from it to a high degree. They reject themselves, inwardly and often outwardly too, as different, feel themselves impure and dark, they suffer from phenomena they cannot explain to themselves, and thereby become entangled in strong fears and dependency. Harmful thoughts, feelings and conflicts draw those born on AK’AB’AL immediately into the depths of their own underworlds.',
    'Their task is to always know themselves connected with light, love and compassion. By their basic disposition they always stand in a rather diffuse light; here lies their challenge, and here too lies the recognition of their own life’s context, the starting point for self-knowledge and healing.'
  ],
  array[
    'On the day AK’AB’AL we ask for the opening and clarification of our path in life, of our life’s task; we ask for the redemption of active portions of soul in the shadow realm, for the illumination of our unconscious. We ask for stability on our path, in our existence, in our work, through the balance of light and shadow.',
    'In the rising light we ask for guidance and healing out of love and insight; we ask for health and for the healing of our soul.',
    'AK’AB’AL is the day on which we can pray for a new perspective, for recognizing the larger and deeper connections behind accidents and illnesses.',
    'At sunrise we ask for happiness and peace for our families, for the healing of family and community.',
    'At sunset, as night falls, we ask for the dissolving of negative feelings and thoughts, for the release of a curse, for protection from black-magic actions, for the healing of the deceased from their impure portions of soul, for the peace and protection of the falling night. We ask for the protection and companionship of KEME on our journey through the night, for our sleep.',
    'In AK’AB’AL the hands of the healer are blessed and opened for the flow of healing energy.'
  ],
  'The stomach',
  'The bat, the owl, the vulture, the raven, the macaw (Guacamaya)'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 14 · KAT
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  14, 'en',
  'KAT (Kan), pronounced “kaht”',
  'E AJMAQ, W EE, S TIJAAX, N TZ’I’',
  array[
    'KAT is the network, the grid of the Earth, the power of bringing together, of wholesome cooperation, the quality of the heart-centered fisher of people, the symbol of the sphere, the power of connecting togetherness, teamwork and networking, the possibilities of the networking of knowledge (the internet), the power of shared growth — but also the power of negative entanglement and enmeshment, the misfortune of family entanglements, emotional or mental bonds and dependencies, harmful magical bonds, curses, hexes and oaths, dependency and misdirection through subtle extraterrestrial worlds.',
    'The Nahual KAT could also be described as the guardian and companion of human community. It connects, from its magnetically acting force of the heart, and is thus a symbol for the cohesion of matter within the Earth’s magnetic field, which keeps us, as human beings, held together in a shared task.',
    'Its quality as a connecting link is felt on many physical and subtle planes. It connects cultures, peoples, races, alliances of nations in the same way it is effective as guardian of a teamwork or a community of interest. From it works the magnetism between man and woman, in friendships and relationships of every kind.',
    'MAYA tradition has, for every interpersonal phenomenon, an image and a master-force on the subtle plane. As archetype of human community, KAT is thus also guardian of the diversity of interconnected species in the plant and animal kingdoms. Through its power it gives life and lets people who are aware of these connections to nature and cosmos grow within group energy.',
    'KAT is comparable to the fishing net that reminds us of Jesus, the fisher of people. People come together as communities of interest and seek out others like themselves on their path. In the Age of Pisces, missionary work was also the appropriate form for spreading spiritual wisdom. In the Age of Aquarius we recognize that the confining form of persuasion and forceful conviction has lost its validity in many areas of life.',
    'KAT thus shows itself in the garment of a community that forms and unfolds in freedom and out of truth.',
    'On its dark side, KAT represents forms of dependency, being imprisoned in patterns of emotion and thought, sexual and emotional dependency on partners, bonds to the deceased, aberrations within community and family that act destructively on the community.',
    'KAT also stands for the traps and trials on life’s path, for physical and spiritual dependency, in the symbol of being caught in the spider’s web.',
    'The strengths of those born on KAT make them especially well suited to working within a team.',
    'They are often very sensitive and fond of order. A special magnetism for togetherness emanates from them. In being together they create a feeling of shelter, they bind together family disputes, and through their presence they wholesomely steer the group consciousness.',
    'In this sense they are also especially precious for the manifestation of the cosmic power of heart-love, connecting all things, between the three natural kingdoms and the human kingdom, but also between soul communities on other planes of being.',
    'They are outstanding builders of networks and precious members within spiritual communities and in the professional world. They always have an open ear for the problems of others and feel themselves to be in the service of forces bringing healing and peace. One often finds them working in healing professions and in social work. Family analyses and constellations, too, take on their effectiveness within the power field of KAT.',
    'Out of impure and entangled portions of soul, KAT reveals harmful forces at work and makes them conscious. Through the healer’s spiritual access to these portions of soul, people are healed and redeemed.',
    'The weaknesses of those born on KAT point to the fact that they should make a special effort toward inner balance. They often suffer from their own behavior; they bind others into their intentions and thereby often create dependencies. Out of the impurity of their nature there is a danger that they too create spiritual or physical dependencies.',
    'Those born on KAT are especially called to observe themselves and to critically examine the fruits of their work. Out of inner imbalance and a tendency toward their own entanglement, they find it hard to realize plans, to correctly assess themselves, to analyze their life situation and to learn from it. They have a tendency to enjoy life in its intensity, but also to create dependencies with the same intensity, and to suffer from them.',
    'Those born on KAT are in danger of being over-controlling, patronizing and confining toward others, just as they themselves do not mind being confined by their own limited notions and their own gift for undoing themselves.'
  ],
  array[
    'On the day KAT we ask to be able to recognize forces and people that act harmfully, and to dissolve dependencies and entanglements. We ask for help for repressed and depressed people, who often suffer under the massive influence of their own environment. We ask for liberation from subtle and gross dependencies (addictions), for liberation from emotional and mental bonds and entanglements with people, but also from dependency on and influence from impure subtle planes, for release from worlds and beings far from God.',
    'We ask for the healthy spiritual, mental and also physical growth of our children, for the loving support of family and community. We ask for the recognition and release of mutual bonds stemming from old, still-active behavioral norms and from karmic entanglements. We ask for success in our work, for release from obstacles, blockages and mental curses from coworkers. On the day KAT we also dissolve the criminal’s bond to lower beings who steer them. We ask for the freedom of prisoners who, out of dependency on or attachment to beings and forces, bring division into community. We ask for freedom and peace for those who dedicate themselves to law and to human and divine order on Earth, and are condemned for it.'
  ],
  'Kidneys, ribs, vertebrae, connective tissue, tendons, ligaments',
  'The lizard, the spider, animals that spin themselves a cocoon and are then reborn transformed'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 15 · KAAN
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  15, 'en',
  'KAAN (Chiccan), pronounced “kahn”',
  'E NOJ, W AAJ, S KAWOQ, N B’AATZ',
  array[
    'KAAN is the power and wisdom of the serpent, the serpentine movement that shows itself in vibrations and tones, the power of the rising fire in kundalini power, the movements of the biorhythm, the movement and power within the male seed, the primal program of our genes, the DNA moving within the double helix, the galactic energies connected with it, the creating and form-giving servants and forces of GOD in MAYA tradition — Hun-Ra-Kaan, Huracán del Cielo, Huracán de la Tierra — the inner fire, the life force, the wisdom of the ancestors rising from the depths, the rhythm within the cycles of time, the great working of the Feathered Serpent in the birth-act of the New Human Being and the New Earth — out of KU-KUUL-KAAN.',
    'KAAN is the Nahual of subtle, human transformation, but also of tonal vibration, of sound. Through KAAN the MAYA stand in connection with the beings of extraterrestrial worlds.',
    'Cosmic music resembles the interplay of a cosmic family that, in orchestral fashion, with lows, mid-tones and highs, realizes the divine plan of UNITY out of the New Human Being and the New Earth. Our planet Earth is enveloped by this cosmic fullness of sound, which keeps us in constant change.',
    'KU-KUUL-KAAN is a MAYA deity who represents the connection between humanity and the spiritual world within the power field and symbol of the spirit serpent, out of the deity of the wind. As a fire dragon in the underworlds, it rises through the middle world of nature and of human existence into the airy heights, into the subtle feather-garment of the divine spirit. The deep frequencies arise from a person’s own depths, which are in need of cleansing.',
    'The mid-tones correspond to our life in the middle world, the Earth, and the high tones are the vibration of our divine soul. These frequencies shape the sound of each individual. They give a person’s spiritual and physical work its fullness of sound, its beauty and its purity.',
    'KAAN is the cosmic light that expands spirally into the galaxies and that connects us with divine wisdom on the most varied planes and states of being.',
    'KAAN guides us along the path through the rhythm of life (biorhythm), a constant up and down, an ever-recurring densifying and expanding, a coming and going in a constant transformation of our form of being. Within the power field of transformation, we raise our spirit through our luminous soul and return into the high vibrations of the divine cosmos, embedded within the divine family.',
    'The return to MAYA is carried by this Nahual, who also represents the Feathered Serpent, Quetzalcoatl (GUKUMATZ). KAAN lifts us into the spiral of cosmic energy; it carries us beyond the boundaries of space and time and activates the cosmic energy in our body as kundalini energy. The cosmic fire cleanses our spirit, connects us with cosmic life force, and opens for us the gates into the planes of Corazón del Cielo, Corazón de la Tierra.',
    'In this way we are ever newly born from the serpent’s jaws. In the movement of KAAN, in the rising serpent, we experience ourselves as cosmic beings. Out of the access given in MAYA tradition to these creative powers, we manifest the nature of spirit and the divine LOVE that vibrates within everything.',
    'People born on the day KAAN have great life force. They are very intelligent and agile, and readily willing to put their strength in the service of community, to serve their neighbor. They are capable of preserving traditions and of weaving them together with the new.',
    'Those born on KAAN carry qualities such as justice, harmony, transformation, love and wisdom within themselves. They often represent law, honor and justice. They love technology and science, are very intelligent and enjoy moving within tighter structures; they love to harvest praise and recognition. They build their life’s work on a solid and firm foundation. In healing work they often draw, unconsciously, on their sexual and creative power. As healers and change-makers, they gladly make use of the wholesome, very intensely moving and transforming sexual fire.',
    'Those born on KAAN easily make contact with other planes of being and worlds. They move, through the connection to their chakras, through the rising power in the spine, into the cosmic worlds. The dark side of this Nahual is marked by the misuse of sexual power.',
    'Those born on KAAN who are not aware of their roots and of their great power and magical access are often driven by their sexuality. In this way they cause much harm and also misuse this power to bring others into sexual dependency and aberration. They are pulled, by the unbridled power of KAAN, into heights and depths, and thereby suffer from constant instability in life. The serpent’s fire consumes them; their organs and bodily systems suffer under KAAN’s unbridled fire. Their mediumistic channel into other worlds is in danger of being taken over by beings that mislead, abuse and manipulate.'
  ],
  array[
    'On the day KAAN we ask for spiritual development, for rising out of the depths of painful human experience. We ask for healing and cleansing of our soul, for support from the divine cosmos. On the spiritual path we ask to be able to recognize the true messengers of light and love. From the pure fire of the spirit KAAN (the tongues of fire at Pentecost) we ask for insight, understanding, wisdom, health and well-being, truth and justice, balance and inner harmony.',
    'We hold ceremonies for the healing of illnesses that arise from unrestrained sexual behavior. We ask for the strengthening and healing of the nervous system, which can suffer under the fire of passion. We ask the sacred fire for the cleansing of our relationships to our fellow human beings, to other planes and beings. We ask, for our journey, for the wisdom of the divine cosmos.',
    'Ceremonies in KAAN activate the divine fire, the working of the subtle fire upon our soul. Symbolically, the shaman connects, in the fire ritual, with the light and warmth of the divine sun.'
  ],
  'Nervous system, spine',
  'The serpent, the dragon'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 16 · KEME
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  16, 'en',
  'KEME (Cimi), pronounced “keh-MEH”',
  'E TIJAAX, W I’X, S AJPUU, N EE',
  array[
    'KEME is the brother, the sister Death — guardian of the human portions of soul within the realms of the deceased, the power of transformation, of change before a new birth.',
    'KEME is divine grace and mercy, at work within the MAYA underworlds.',
    'Gentleness, harmony, stillness and peacefully embedded rest are expressions of the sacred underworld.',
    'Through KEME, access opens to the lost portions of soul from which we gain experience in life, by which we are guided and misled. The path of initiation passes through the realms of KEME and leads, through the gate of density, into the divine, light-filled dimensions. KEME is protection from the lower worlds, the reminder of the power of forgiveness, a pointer toward redemption from the negative feelings and portions of soul of hatred, resentment, envy and other lower emotional states. KEME is the ancestors’ wisdom of life, the power and wisdom of the crystal skulls at work within humanity.',
    'The Nahual KEME is the master who guards the realm of the dead and, with it, the portions of our soul that exist within these realms. We can also speak of brother and sister Death. As companion to human beings, KEME stands very close to the physical plane of being. Through our soul it reaches into our human life as a form-giving, but also form-taking, force.',
    'KEME stands in a very particular way within the polarity of light and shadow. Death’s many faces show themselves to a person according to the relationship they hold toward death and toward their own soul. If I recognize KEME in its loving, gentle, kind form, it truly becomes a brother, a companion and a mediator into the realm of the deceased, toward the lessons our soul sets for us. If I reject KEME, it shows the face of the aggressive one, the reaper, who shakes and wakes the unheeding through blows of fate, out of the impulses of the soul it guards.',
    'Sister Death is the form-giving power that brings us, as a fetus, once again into human form, but that also, during our lifetime, initiates and accompanies the “rebirth” within our humanity. Both sister and brother Death stand in direct contact with our soul and respond alone to its impulses.',
    'MAYA tradition works with both beings, the White and the Black Death. As mediator into the planes of darkness, KEME leads us into the secret and mystery of the shadow realm, with which we stand connected through a part of our being. It leads us over the bridge from dark into light and opens for us the gates into the redeeming, divine light. Through our connection to our portions of light and shadow, it is possible for us to maintain mediumistic contact with our ancestors, but also with our true, divine home.',
    'From our connection to the realm of the dead we receive deep wisdom of life and life experience from those who lived before us. KEME also opens, for the healer and shaman, access into the depths of the dividing, demonic underworlds, which should be opened by the healer solely in the service of souls, for healing and peace.',
    'People born on the day KEME have a strong connection to the other worlds. For this reason they possess the gift of foresight, mediumistic abilities; they are very intuitive, very integrative and social. They are people with great charisma, with great heart and a need for harmony. They have control over themselves because they are able to draw from their inner spiritual and emotional peace. KEME people are very sensitive, “thin-skinned” and very strong healers.',
    'They often find their task in cooperating with KEME as agents of change, transformers, as companions on people’s journeys, as healers of the human soul.',
    'The dark side of those born on KEME is aggression, coldness of feeling, heartlessness.',
    'Those born on KEME who are not aware of themselves tend toward lying and betrayal. They have the gift of destroying what others have painstakingly built up, of sowing resentment and discord within communities. Through their behavior, and through their uncontrolled access to the underworlds but also through their mediumistic insights, they create division and destruction, consciously or unconsciously, because they are strongly guided, like a destructive death energy, by their unredeemed and impure portions of soul.'
  ],
  array[
    'Through KEME we have the possibility, through rituals, prayers and meditations, to work healingly and liberatingly into the realm of the dead. Ceremonies on the day KEME are held to calm and harmonize negative thoughts and feelings. We can ask for release from addiction, from suffering and painful experiences, from lies and betrayal. We ask for the ending of a dispute, a conflict, a war.',
    'Ceremonies on the day KEME should be held in stillness, and especially with the violet ray of transformation. Places for such ceremonies could be a cave, but also a dark altar built for the ritual, or a quiet place in a cellar. One can light a black candle and, out of stillness and calm, connect with KEME. On this day it is possible to make contact with the deceased, to ask them for help and advice, or to heal them, bring them joy, and free them from burdensome ties to earthly life through prayer and meditation.',
    'In doing so, KEME opens the planes from which the impure portions of soul of the deceased are at work. To immerse these portions of soul in the love, grace and divine mercy of KEME’s heart brings profound healing and redemption to these portions of soul. KEME opens, for the entangled portions of a person’s soul, the path to liberation into the divine light.',
    'On the day KEME we ask for contact and spiritual counsel for the protection of our living environment, for the protection of life. We ask for inner strength and steadiness, for inner calm and inner peace. From the healing of our portions of soul arises the clarification of our path in life and of our life’s purpose. Above all, we ask the generations that went before us for their integrated wisdom of life, for mastering, opening and protecting our path in life.'
  ],
  'Physical death',
  'The raven, the vulture, the owl and other nocturnal animals'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 17 · KIEJ
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  17, 'en',
  'KIEJ (Manik), pronounced “kee-EHCH”',
  'E KAWOQ, W TZ’IKIN, S IMOX, N AAJ',
  array[
    'KIEJ is the interplay of the power fields of the four cardinal directions and the four elements, the dynamic rhythm of life. KIEJ is the spirit of hills, mountains, rivers, lakes and landscapes acting upon our humanity, the power field of the indigenous American and Celtic power animals acting upon human beings.',
    'KIEJ is the deer standing on four legs, in the symbol of instinct and intuition, the physically strengthening energies of the forces of nature, the electromagnetic power of our planet, the intensity of human power to realize things, the gravity that anchors the human being, the expanding and contracting of power in the symbol of the heartbeat, action and the reaction that follows it, the hunter and the hunted animal, which stand symbolically for life and death.',
    'The Nahual KIEJ is especially connected with the power field of the four cardinal directions, which stand in harmony with one another. They are the four pillars on which our existence, but also our planet, rests. The deer, as the power animal of this Nahual, stands with its four legs in the four cardinal directions. It is agile, powerful, intuitive (instinctive) and watchful. From these qualities it survives and preserves its freedom.',
    'The four elements — fire, earth, air and water — should also always stand in balance with one another. This harmony, too, the human being should maintain within. They vibrate, within this harmony, to the rhythm of life. The four elements show themselves in the human being as body — spirit — feeling — will. They unite within the connecting, loving and clear heart.',
    'Thus the human being stands at the center of the MAYA Cross, which is guarded by the Nahual KIEJ. The healing of a person always occurs through the harmonizing of thoughts (air), emotions (water), will (fire) and physicality (earth), in which the elements manifest within human consciousness.',
    'KIEJ is the Nahual whose power keeps us always in motion.',
    'Whenever a person is out of balance, they have the possibility of recognizing the dominance of one or several elements within themselves and bringing them into harmony with one another. From this arises the inwardly free human being who, through this empowerment, becomes master over life and death.',
    'Connection to the four elements means that, in harmony with the guardians of the elements, we can truly move mountains. For this reason KIEJ is one of the strongest, physically effective forces within the sacred calendar of the MAYA. It reminds us to become aware, once again, of the sources of power within the natural realms, and to bring the beings of these realms into the shaping of our lives, and into the healing of our planet, with respect and in accordance with their tasks.',
    'Within this connection our Mother Earth is once again sanctified; the human kingdom and the natural realms fit back together, giving each other strength and dynamism for a wholesome life.',
    'People born under the sign KIEJ are agile, strong, responsible, intelligent and in inner balance with themselves. But they stand especially in outer balance with the beings and elements of nature. From their steadiness and dynamism they take on responsibility, often stand in leadership positions, and love recognition and public roles. They possess an open mind, are farsighted, mentally flexible and intuitive.',
    'Those born on KIEJ are thereby also strongly called upon to remain aware of these sources of power and to nourish and cultivate them with insight and in balance. So those born on KIEJ are good psychologists, judges and lawyers, and especially well suited to social professions.',
    'Weaknesses of those born on KIEJ are their reserve. Not being aware of one’s own roots means, for someone born on KIEJ, that the same forces turn against them in the form of aggression, hatred and division. For this reason they tend to see only their own advantage and to react to others with control and power. Their inner imbalance then shows itself in exaggerated pride, in haughtiness and in a strong imbalance of their emotional life.',
    'The bodily being often dominates over all other human qualities; an exaggerated cult of the body, a sexuality aimed purely at gratification, are the consequences of this body-focused one-sidedness.',
    'An excessively strong connection to the forces of nature creates, in these people, a rough, unrefined power under which those around them suffer.'
  ],
  array[
    'On the day KIEJ we ask for empowerment from the realms of nature, for the strengthening of physical power directed toward physical life, toward one’s profession. We ask for insight, for appreciation at the workplace, for authenticity and security, for the realization of our life’s task.',
    'In KIEJ we ask for the balance of the four elements within us. We ask for release from the negative influence of third parties, for release from pride and haughtiness. We ask for well-being, for strength in our hands and legs, for joy in our work, for healing power in our hands.',
    'On the day KIEJ we can also ask for happiness in life, if we are ready to create the foundation for it within ourselves. This foundation forms out of an unfolding love for nature and for our fellow human beings, out of love for GOD and God’s helpers. In KIEJ we ask for strength and harmony in all areas of life, and for balance and peace with the physical, material world.'
  ],
  'Arms and legs, hands and feet',
  'The deer, the horse, indigenous American and Celtic power animals'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 18 · Q’ANIL
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  18, 'en',
  'Q’ANIL (Lamat), pronounced “kah-NEEL”',
  'E AJPUU, W AJMAQ, S IQ’, N I’X',
  array[
    'Q’ANIL is the power of the union of seed and egg cell, fertilization and fertility, God’s creative power within sexuality, the realization and implementation of ideas, projects and visions arising from this cosmic power, the life newly unfolding from the plan of creation, the planetary fertility manifesting from God’s seven rays of creation, the subtle shaping of forms and beings, spiritual and material abundance and growth, the beings of other worlds connecting with the plan of creation, new forms of cooperation and living together for the cosmically oriented human being, the program of the NEW EARTH AND THE NEW HUMAN BEING opening within the heart of Q’ANIL.',
    'The Nahual Q’ANIL activates a person’s inner and outer creative power. This Nahual thus contains the human being’s program for life, in harmony with growth in the realms of nature. Q’ANIL stands in constant connection with the deities of God’s plan of creation. It is the cosmic law of love, from whose power field seed and egg cell join to create new life and other states of being in other worlds.',
    'So, in MAYA tradition, Q’ANIL stands within the sphere of influence and power field of Venus, giver of beauty and abundance. With our thoughts, our feelings, and through our actions, we create our own reality.',
    'Q’ANIL is the seed laid down within us that, in connection with the feminine, fertilizes our ideas and notions. Q’ANIL represents the abundance and diversity of forms of creation, and the wealth laid down within human beings.',
    'Just as our planet Earth is beautiful and diverse, so it is possible for the human being to unfold the image of the planet within themselves and to manifest beauty and abundance outwardly as well.',
    'Q’ANIL, as humanity’s seed of growth, lies within the fertile element of earth. For its growth it needs the light- and warmth-giving fire of the sun from the East, the abundance- and healing-bringing water of the South, and the pure, clear air of the North. In this way our personality, too, flourishes from these same qualities:',
    'Our inner strength and beauty spring from the purity of feeling and thought, and require the warmth- and light-giving human fire. All these qualities show themselves in a person as happiness, joy, abundance, sublimity and beauty. Q’ANIL is the sprouting of this seed, the fulfillment of our earthly existence opening in love.',
    'On the day Q’ANIL, the forces of the four cardinal directions and the seven creative rays of God are especially at work. In its power we also heal human infertility and problems in sexuality.',
    'A day Q’ANIL is the ideal time to create life, visions, projects. Even the fertility and strength of an exhausted soil can, with Q’ANIL, be restored through subtle nourishment.',
    'People born on the day Q’ANIL are very intuitive; in their ideas and notions they act inspiringly and motivatingly. They have a special gift for creating matter and filling it with spiritual content. They are responsible and popular coworkers and implementers of ideas.',
    'Those born on Q’ANIL make an impression of shyness, but draw, hidden within, from great inner strength; they are good lovers with empathy and power. They put their deep connection to sexual and creative energy to use for a creative and vital living environment, and are thus also good entrepreneurs, gifted artists and musicians. In healing work they know how to put their strength and dynamism into the service of the divine creative powers.',
    'Weaknesses of those born on Q’ANIL are credulity, instability and unreliability. If they are not aware of their power, they create, from impure thoughts and feelings, chaos in their life, without recognizing themselves as the cause of this chaos. Connected with their stimulating sexual power, they readily also become victims of their own passions and easily fall into dependency on others. The misuse of their misdirected creative power readily entangles them in undertakings that arise from selfishness, from arrogance, from haughtiness and from an exaggerated striving for power, and that then very soon collapse again from within.'
  ],
  array[
    'On the day Q’ANIL we ask for fertility for people, for animals, for the earth, for our visions and projects. We ask for the healthy growth of plants, for energy for our food, for the nourishing blessing of agriculture, for an abundant harvest.',
    'We ask for the success of an idea, a vision, an undertaking, a project, for the success of our tasks in life, for success in our working world. We ask Q’ANIL for a good new beginning after a dismissal, a change of career, a personal downturn and change. We ask for the healthy growth of our children and for the strength and steadiness of young people’s visions for life.',
    'On the day Q’ANIL we ask, in the field of healing, for release and healing from impotence and frigidity, for the healing of the portions of soul connected with these from earlier lives. We ask for the healing and redemption of people who have suffered sexual abuse.',
    'We ask (in connection with the Nahual AAJ), in agriculture, for release from pests on cultivated soil, for release from illnesses in animals and plants, and for the nourishing health of the soil.'
  ],
  'Ovaries, womb, male sperm, sexual organs',
  'The rabbit, the hare'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 19 · TOOJ
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  19, 'en',
  'TOOJ (Muluc), pronounced “tohch”',
  'E IMOX, W NOJ, S A’KAB’AL, N TZ’IKIN',
  array[
    'TOOJ is the balance within the wheel of life, the gift and the giving of oneself, the divine grace that flows to me, the giving within forgiveness, the balance of giving and receiving, the offering in the principle of readiness to give. TOOJ is also the offering within the rites, the TOOJ of a MAYA ceremony, the gift and the present for what we ask for, in the cycle, from spiritual sources. TOOJ is the stream of life that, out of the giving principle, keeps everything in motion and flow.',
    'TOOJ is the sacred power of the heart-stone, jade, the stone of life and wisdom of the MAYA.',
    'TOOJ is the Nahual that closes the cycle of giving and receiving. Whatever we ask for from the spiritual world is connected (and this is bound up with it) with what we are willing to give. TOOJ is the power of love within giving. Through our readiness to give, the gates open for what can flow to us. When we accumulate matter and knowledge, this often happens at the expense of others. Because of this, what we have created for ourselves then also turns against us and against our flow of life. Whoever attains the abundance of life by being willing to give creates within themselves the magnetism by which a corresponding abundance can also flow to them.',
    'In fire ceremonies, the MAYA priest gives the sagrado TOOJ in the form of a great abundance of precious ceremonial materials. In this way, the shaman literally pays, in the truest sense of the word, for what the affected person, the one seeking healing, has manifested out of a lack of understanding. Thus TOOJ stands as a symbol of balance, of filling an inner vacuum created, as a blockage, through greed or through a confining consciousness of poverty. In TOOJ we balance guilt and imperfection through what we are willing to give.',
    'One could also describe TOOJ as the guardian of open karma pressing toward balance. In our own culture, this giving means the readiness to donate to a social project, to place one’s labor in the service of a social project, and similar things. Conflicts and disputes within a community can also be balanced through a TOOJ, in the sense that the power-hungry person, willing to reach consensus, seeks a shared solution. TOOJ also stands for this consensus and thereby also holds the community together.',
    'It can be compared to a rotating energy that keeps us in constant motion and calls us to give.',
    'From the gift and the giving of oneself, within the wheel of life, the foundation is also given for a spiritually unfolding life. Through our attentiveness and wakefulness, in giving, we keep contact with the invisible planes, which, in gratitude, open the way for us toward fulfillment and abundance. In Christianity, TOOJ is the power of sacrifice, of fasting, of the readiness to give and to take in other people.',
    'On its dark side, TOOJ stands for the effects of our lower emotions and thoughts as a consequence of our attitude. It draws us into illness, pain, suffering and a burden of guilt when we are not aware of its giving nature and are only takers and exploiters. For this reason TOOJ is also a day for the worker of black magic, who shapes their rituals on this day and offers their gifts to the dark, destructive side of TOOJ, thereby harnessing forces for their destructive intentions.',
    'People born on the day TOOJ are, in their basic traits, calm, easygoing, respectful, full of joy in life, community-oriented, with a need to stand out from others through special attention and through gifts. They act in a balancing and harmonizing way within community and are thus also highly valued. Those born on TOOJ are very sensitive and emotional, which can also work to their disadvantage if they do not handle it consciously. Their readiness to give is a sign that they are ready to let go of matter and create space for the new.',
    'Weaknesses of those born on TOOJ are an unstable and restless character; in their actions, through their one-sidedness and their taking attitude, they are shortsighted, destructive, focused only on their own advantage. They have a materialistic disposition and are prone to accidents. They tend to take on others’ guilt, to co-suffer or to arouse pity, and to languish in self-pity.',
    'Those born on TOOJ often carry, in their soul’s disposition, the task of balancing something for their ancestors, or for their own former way of living. This often brings them into intense life situations and repeatedly causes them to lose what they have built up.',
    'Their attitude of giving and gift-giving is, from TOOJ’s dark aspects, connected with intention. They give in order to attract attention, to force a change in another’s behavior, to appear generous, and so on.'
  ],
  array[
    'On the day TOOJ we ask, through gratitude and the gift, for balance in giving and receiving. We ask for forgiveness for what we set off in others through our thinking, feeling and acting. This also refers to spiritual, energetic and material theft, the unasked taking of energy, the exploitation of hospitality, breaking into another’s intimate spaces, the unasked mediumistic latching-on to another person. In this way, through our offering, through the ritual of forgiveness, through a conscious turning toward interpersonal giving, we ask for release from hindering burdens and from blocking forces we ourselves have activated.',
    'Through the gift we calm inner and outer imbalance. We stabilize our existence and ask the divine Creator for insight and for the inner attitude not to expect, but to give in trust in the divine cycle.',
    'In the ritual of giving and forgiving we can also ward off dangers of every kind that we ourselves have conjured up through a lack of insight and through a basic attitude of unasked taking (accidents, suffering, fear and untimely death, disasters, revenge, black magic, etc.)'
  ],
  'Hands, heart',
  'The devotion of domestic animals, the unconditional love of the dog'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 20 · TZ’I’
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  20, 'en',
  'TZ’I’ (Oc), pronounced “tsee”',
  'E IQ’, W TIJAAX, S KAT, N AJMAQ',
  array[
    'TZ’I’ represents spiritual and physical order, the protection against destructive influences that arises from it, the cosmic law of all-connecting love, spiritual and human authority, the sense of justice, the order within the soul’s step-by-step unfolding, spiritual fidelity, the word that rises from the heart and from life experience, the hierarchy across the different planes of being and worlds, the guardian of social order and of human legislation, the guardian of spiritual-cosmic order, the power of faith and of trust.',
    'TZ’I’, the spiritual guardian of cosmic order and truth, carries within itself the cosmic law from which the different planes of being — the various spiritual living spaces of the under-, middle- and upper worlds — are held connected to one another. Among the Hebrew people this order was especially recognized, guarded and regarded as a mystery. From the treasury of wisdom of the great sages and masters of this people, the new world order builds itself up, connected with the deities of the creative powers. The sense of justice of people connected with the heart is the highest expression of this spiritual order within humanity.',
    'In matters of jurisdiction, may it become clear to human beings that the condemnation of a person offers the community protection from individuals living outside of order. At the same time it should be recognized that these people also find themselves outside cosmic order. Out of a given disorder within the soul, they stand under the influence of forces creating division and misfortune. The healing of these people comes through help in the reordering, healing and cleansing of their soul.',
    'TZ’I’ thereby again and again gives us orientation, so that through insight and in the principle of cosmic love we live and express the divine law, and include it in matters of justice.',
    'Just as ancient peoples and the wise of past cultures maintained their connection back to the Divine by orienting themselves toward cosmic laws, so should we too be aware that any transgression of laws represents a moving away from the Divine. Returning to divine order is bound up with the power of love and divine grace. TZ’I’ protects us from falling, one-sidedly, out of the law of life, out of the power field of protective community and the forces of the divine cosmos that accompany and protect us, into the confining, illusory world of matter.',
    'Through TZ’I’ we recognize the portions of soul from which we are led astray, which lead us into experiences of life in which division also arises within a person’s surroundings — division that likewise exists within the soul of that person. In TZ’I’, workers of harmful magic exploit the negative qualities of the person by intensifying the inner disorder (chaos, hatred, envy, jealousy...) through magical influence.',
    'TZ’I’ is the Nahual of trust in divine guidance and divine protection. Our spiritual companions, from various planes of being, stand by us with their power and wisdom as we search for truth. The symbol of this order in the soul’s unfolding, of spiritual order and of cosmic laws, is the stepped structure of a pyramid. Step by step we walk the path of initiation.',
    'Step by step (among the MAYA, in a serpentine ascent) we walk through the worlds of life and experience of various cosmic dimensions and spaces. Each step carries within it access to worlds, to life experiences, to portions of soul and to spiritual forces that inhabit these spiritual realms, that grant us access and are guideposts on the path toward the crown of the pyramid (toward GOD’s plane of being).',
    'The dark side of the day TZ’I’ is the great destructive power of disorder and the lack of a legal order connected with the heart. This leads to legal battles, to greed and power in matters of justice. The disorientation of people who live in aberration as an expression of their soul’s separation from GOD, murder, bloodshed, unbridled sexuality, as well as the human vices, are expressions of a person living removed from divine order.',
    'People born on the day TZ’I’ love to authentically be their own master, their own woman, to orient themselves solely by their own sense of truth, by their individual conduct of life, by their own behavior. They have a pronounced sense for truth, for order and for the laws of life; they always keep connection with their spiritual companions through prayer, meditation and daily communication. They live in harmony with themselves, are loyal and reliable; they preserve and, at the same time, extend traditions, and follow the impulses of their inner transformation.',
    'They are outstanding lawyers, notaries, civil servants, judges, business people, with a consciously or unconsciously existing connection to their heart.',
    'Their weaknesses are an unbridled striving for power and control, but also an unbridled everyday life, often also a sexual life isolated from the heart, strong jealousy and a striving for possession. They are very self-satisfied, hard, selfish and easily provoked when criticized. Through their self-satisfaction they readily place themselves above the law and act hard-heartedly, inflexibly and stubbornly. They are often very tightly bound to traditions and measure their fellow human beings, in judgment, against their own standards of value.'
  ],
  array[
    'On the day TZ’I’ we ask for human and divine order within community.',
    'We ask for the inner mental and emotional harmony that grows from the heart, for a conduct of life attuned to spiritual order, for foresight and transparency. We ask for the wholesome bringing-together of people of different dispositions, of organizational structures, of different tasks within communities, for a harmonious coexistence among family members. We ask for the recognition and dissolving of rigid structures that hinder us on our path in life, arising from old belief-programs and behavioral norms.',
    'We ask for the revelation of the divine mysteries that let us understand the larger connections of the attuned spiritual hierarchies. We ask for protection from power-hungry superiors, politicians, from injustice, from mobbing at the workplace, from mass hysteria and mass manipulation, from negative influences through harmful magic.',
    'In TZ’I’ we also ask for the protection of our house and our family. During ongoing court proceedings we connect, through TZ’I’, with the spiritual protective forces, from whose wisdom may come a solution that benefits all involved.'
  ],
  'The right hemisphere of the brain, intuition, instinct',
  'The dog, protective animals'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();
