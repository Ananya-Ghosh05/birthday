import { Memory, HugLetter } from './types';

export const INITIAL_MEMORIES: Memory[] = [
  {
    id: 'smile-1',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnsQbVBrFzn8ia7ZTc7FQMYh74ZJx-O_iHzlXOmIjjzfU5txZ1_uBJJqVWimhTil28b2R8Gocd9mZtJx0HGomysOY1b-vSMsJ5aT2vosj1VGSFGgliBij3BXCeo8r1rEGAayv2HzsRhywTJjayRbBy7EXBdW6zfYo1AJojOkpU2opZqMC4lmrAkvqlBNCBhwcFWhz9AS4qbBbnb-P9IdyhMzJpWP3g8OezqngVgkASKr6_MUjl-oro8LmUwwTmZzYy528',
    caption: 'That bright smile ✨',
    category: 'Candid',
    createdAt: '2024-03-12',
    rotation: 3,
    liked: false,
    detailedDescription: 'One of the most authentic clicks ever. Your smile has this magical energy that literally lights up the entire room. Captured this during one of our random late-night food walks where we forgot the time entirely!',
    tags: ['Laughter', 'Nostalgia', 'Late Night']
  },
  {
    id: 'therapy-2',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJMj6ZEnpxJjVCnPdhab26G6op2OulTEqmelb5KcdQOkNcBjICRhAvRTIKxho3dYtMZgPEND5IVhd-lWwxBnY_oVDkITaLVnLeEjox5EaVLZZ4JqPzNpt3UK4IyaPpHBN4-jbMdPQovWsRThsFzOpXnNlHAtAbjeb70yw3F6k-3IAf6iUIfPsY8EAF3rSKBiYHrqaQglsE08QFGUCBFIfxZtfKYx9u3kqfjVGY2FCkhzYRcfMX7X4c5jWKZdwRI7kcySw',
    caption: 'therapy',
    category: 'Therapy',
    createdAt: '2024-05-18',
    rotation: -1,
    liked: true,
    detailedDescription: 'They say shopping, coffee, and therapy are different things, but being around you and having these goofy sessions is the ultimate soul-healer! Best three musketeers pose ever!',
    tags: ['Besties', 'Goofy', 'Seoul of Life']
  },
  {
    id: 'joy-3',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC52RLae-yOnXlwCJhvjVbl52COU8W96SgapzvaCD10fXRpXsKsUZBAlULYm5EGvT0DBrQ2JRtROYPTavPxXzigWhLl1JXUEQess6EWdNZzkcuKMPTwxDCpM5-YiKUXZHZvsJ1QgGk8eNJWhRI175EYUSKTpYpv1nIbgj45hxpPcW-spmzL4M9cC54Cb5tU8Dw4PvLEK-RAVF4RQvPbLq-c34GoLMa7ILiwWyIn9Yr8Yy5cKepeto75pjEFMDL-gKwSWx4',
    caption: 'Pure joy caught on tape',
    category: 'Collage',
    createdAt: '2024-07-21',
    rotation: 2,
    liked: false,
    detailedDescription: 'No filters, no posing, just raw unadulterated happiness. This is a testament to how comfortable and full of life we are whenever we hang out. Gurl, you look absolutely gorgeous and happy here!',
    tags: ['Sweet', 'Chilling', 'Raw Clicks']
  },
  {
    id: 'fav-2024',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFJtSQGVNzabRRAtn5bKSqeSh6PeM-7j1LXZXi0nf7UfZUkOf9i4vRykmxmnWvJmQ-Y4TgmqpnOpk_QcoXfYY4_aztQ9sh3gL6JvAy_KdLjELrjHmzH1d_AB6AB4SwvMRX4_3OAXtvZyq1VFEGXhdrWJdq09K856f0P_v-OSgbPsiLcR94mml-d-ZIQsdYvT2Gv05q9cPs2iJ9plT9s3_ZFT8iK_xRWzoWEYe08JmrCaDjupfibmbwrvgT4_4ix8brcwU',
    caption: 'Favorite Memories #2024',
    category: 'Love',
    createdAt: '2024-09-02',
    rotation: -1,
    liked: true,
    detailedDescription: 'Sitting in that cozy cafe with bookshelves piled high up behind us, talking about everything and nothing. These are the sweet silent pauses in life that I hold on to the most. You slay always!',
    tags: ['Cafe', 'Deep Talk', 'Literary Vibe']
  },
  {
    id: 'school-miss',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfl79YrvMSMBdFDmFvy-gKzURXrilKEZWDMB89y4u5aZaOoOd4hOvW02Anhtoxt1tAXA4in238sNAMlOFRLyG7iUOeR3M8sxEmK2fJHeyM0LMykBddL5u34S9Z69MisuPHcP0uZ5JUF0DOWwfyMQheWCSr4rH-PwfKHVUOnLIl_HNswfLuXR8C4gZIIMkQmhVKo0XgW2GMk2oT2ry40gHMZdv6kuxOqrznxASkx2CLiYKifbgGz-yQkkrhZsb4zIIgvHk',
    caption: 'miss school',
    category: 'School',
    createdAt: '2023-11-10',
    rotation: -3,
    liked: false,
    detailedDescription: 'Back in the day when the biggest worry was submission deadlines and teachers catching us eating school lunch under the desks. We have come so far, but those core memories will never fade!',
    tags: ['Silly', 'Uniform Days', 'Miss It']
  }
];

export const GRID_SAMPLES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBoHnLDUMhq3Vs4DNIMVjSPnyhGWyFPPjjRHnwXoV37dlXlFIPhr6EFhwqdCzjlHYIc8_qrUWw62x05XxPqkUyJZS6HnEeaic551YnpAP-S8zhQUtZo9iy0wCUEAgi-IzUrlpE8lvRR_KZ4-1bIaKrpnQ-zYDo9zKqhnufdZVY_SQr51rURhxrC3J56Q3wVjYxGbtbmqTSuoxAH9JW0GZyeDzJ2Pt5LGiTTXqB7XM2YHij8tG1m4klmiWiWDX_lIbKkq0w',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDPUTQrxhklWOzMZboNBGn-uJ1-HwgBIH3xBAeUQGg3ec0COHwWdZR2AImhagEM7hLwjcH4TpSsw-PRPyeYKbBeIBjDSxK0tP0c8B4yRsaBMa2nibT_1HEciX_MloOJ4cBHVJOKoGO-M-TQ6lzm1qpF_E-CCIpdnV6U0QGv-WcpYeWRF2S--GHxVbxJRWOBymQgEZKBRflLy3CXdk5HJ4InDqeuRH7bqf5xGzZmQTOtSjmlbV2ElLofonciSlAtdI-Ltkk',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAM6MlL2m71vMZiIbYF5Y_jj5l1ePioOusGeOVFFNFVDlWjZ7c4-RP_rWrE7UiobsxBuPiWbFvvxwK03j5yDWtYnJxOWzBhpjhqLdTLIy_bpHS1jWHtzjhFuhXuB12-4uKIUvT6Wk0UA2qsyLtSY61GEBfhTpcrnrdrUk3JOhvRaAeXiWO0I0pcgriUcY-M4udlYnKZu1qAP9CE-IBGqrc0awq07KOJvzFNE2sVVw8fGyFsEPLaZCBIb1BsXxM0Cn7gguU',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDetqKl2LK8fHyAODVYamdlhPLZnj6zJp-y9CFDJsVEZ5NTdCLw3h0yHwsaUUpdYjAIKm9QmBL5SbQirBpcGhi1K3GWGexCNeUT0ZrlymPpqMC9wlK2ukBYXd0voYSi3l7O9qUn5yzEYULkqu4L-KMoC-qQ9tapIvZ6uhQM0RkfvG2S4_br3LVEUsPmRp2g7o4Ac3nuHPR30OicEkKDeq3k-PYwJUDR7NMUObzlEE6wloL0VDfTijLQU5_NFUWtsnro1K0'
];

export const EXTRA_TILT_PORTRAIT = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMHHKoTB7T1LjJC1bW5BS8gCY3Tozk3OuN0VN9UzrkkAfp3JfahWU0jN5SqhJLcx_KnW3EacfPIRJbNMYd9NqunrXUM503wSaFQMuJRejiV8uFEpOVFdmBHh3UUGztpnqIQpPF3Nv1i0Sar8JkEKL_mpYX_-r7UgICCxejtJnuz9XLEX5VnWOnH7Rc6TZkDQ9iH_kmUo_lP0EkB7xUkf6O9L2YCRcRqZGwleokvYExq9WXnlchA2d05MIAmGeM8SxeLvE';

export const TRIPLE_COLLAGE_IMAGES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDXmkU7ktntTe16Kp1QGgwowBZ0zMVK-qjYCe5mkSKIkMuFDQenm2EaWSIU7yjwwQfQw80a1mF89ekQJ3YQeURlqudpT3n8ZuSBibZsSuQ24n-F-xEEXWIZdEASCGxXXVsFa7ot0E-lPZ3N5D7kWXTPMDjViU-Wbs3t2A3RAaWdEi2HIUAy6DCOcGswb8q0efnoxmXhuTEawcoth9zs5ayuvf-qvIEgJwmkLvdnH88sR3f6OAV7Dosb1e8Mkgl5r2zdiZU',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDvi765GvrEzP-j5OTcaJvN_i-ATlhtPUryDD46NijZ0l5KhYeczlwGwJdFtqCerAJ2xo0e0WWkYL8gTbC0v6SFsfCrdyeQ6nCrHqI3l3m1oBEqhAuU2dvKIS91XmdfBJO94puhh65Dk0b6FTadwJhEFoK_xdgidWvB8WmL_V815Ci9mvKEFJfvfbqY2Pm6V7PDCdX0NnzI7ru4GTj2DQq8_fVS7v-DrWQKjETknsLZxw-pZiyqZBhLA1I9BBrUZ56x9e0',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC52RLae-yOnXlwCJhvjVbl52COU8W96SgapzvaCD10fXRpXsKsUZBAlULYm5EGvT0DBrQ2JRtROYPTavPxXzigWhLl1JXUEQess6EWdNZzkcuKMPTwxDCpM5-YiKUXZHZvsJ1QgGk8eNJWhRI175EYUSKTpYpv1nIbgj45hxpPcW-spmzL4M9cC54Cb5tU8Dw4PvLEK-RAVF4RQvPbLq-c34GoLMa7ILiwWyIn9Yr8Yy5cKepeto75pjEFMDL-gKwSWx4'
];

export const PRESET_HUG_LETTERS: HugLetter[] = [
  {
    id: 'l-1',
    sender: 'Ananya',
    message: 'Happy birthday gurl! Slay today and forever. You are the absolute best and deserve the entire galaxy of happiness! Sending cozy hugs! 💕',
    giftType: 'hug',
    createdAt: '2026-06-05T10:30:00Z'
  },
  {
    id: 'l-2',
    sender: 'Riya',
    message: 'To our queen of dramatic stories and infinite jokes! Warm cupcake and hot chocolate waiting for you! love u tons!',
    giftType: 'cupcake',
    createdAt: '2026-06-05T12:00:00Z'
  },
  {
    id: 'l-3',
    sender: 'Siddharth',
    message: 'Happiest birthday Modi! Hope this year brings you crazy adventures, silly laughs, and less exam stress. Have a chocolate on me!',
    giftType: 'chocolate',
    createdAt: '2026-06-05T13:45:00Z'
  }
];

export const GIFT_CATALOG = [
  { type: 'hug', label: 'Warm Virtual Hug', emoji: '🤗', bg: 'bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300' },
  { type: 'chocolate', label: 'Sweet Chocolate', emoji: '🍫', bg: 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300' },
  { type: 'coffee', label: 'Nostalgic Coffee', emoji: '☕', bg: 'bg-orange-100 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300' },
  { type: 'cupcake', label: 'Birthday Cupcake', emoji: '🧁', bg: 'bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300' },
  { type: 'blanket', label: 'Cozy Blanket', emoji: '🧸', bg: 'bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300' },
  { type: 'star', label: 'Wish Upon a Star', emoji: '✨', bg: 'bg-yellow-100 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-300' }
];
