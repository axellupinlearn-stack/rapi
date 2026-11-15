import fs from 'fs';
import path from 'path';
import { Article, Artist, VideoItem, CommentItem, MediaFile, User, SiteStats } from './types';

interface DatabaseSchema {
  articles: Article[];
  artists: Artist[];
  videos: VideoItem[];
  comments: CommentItem[];
  media: MediaFile[];
  users: User[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Initial seed data with authentic, rich Rap Ivoire culture
const initialSeed: DatabaseSchema = {
  users: [
    {
      id: 'usr_admin',
      name: 'Koffi Adams',
      email: 'admin@rapivoire.ci',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Directeur de la Rédaction RAP IVOIRE. Spécialiste de l’industrie musicale africaine depuis 10 ans.',
      createdAt: '2024-01-15T10:00:00Z',
    },
    {
      id: 'usr_editor',
      name: 'Awa Bamba',
      email: 'redac@rapivoire.ci',
      role: 'editor',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
      bio: 'Journaliste culture & musique urbaine. Raconte la renaissance hip-hop d’Abidjan.',
      createdAt: '2024-02-01T12:00:00Z',
    },
    {
      id: 'usr_contrib',
      name: 'Yannick Gnahoré',
      email: 'contributeur@rapivoire.ci',
      role: 'contributor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      bio: 'Chroniqueur street rap, beatmakers et underground ivoirien.',
      createdAt: '2024-03-10T15:30:00Z',
    },
  ],
  articles: [
    {
      id: 'art-1',
      slug: 'didi-b-mojaveli-conquete-internationale-rap-ivoire',
      title: 'Didi B : De Kiff No Beat aux zéniths mondiaux, le sacre du Shogun du Rap Ivoire',
      subtitle: 'Comment l’enfant de Cocody a imposé la trap nouchi et le rap ivoirien aux yeux de toute l’industrie internationale.',
      summary: 'Porté par une série de récompenses continentales et des concerts à guichets fermés à Abidjan et Paris, Didi B incarne l’apogée d’une génération d’artistes qui ne demande plus la permission pour régner.',
      content: `<p class="lead">Le Rap Ivoire n'est plus une promesse : c'est un raz-de-marée culturel qui dicte désormais le tempo de la musique urbaine francophone. À la proue de cette armada sonore, une silhouette familière s'impose avec la précision d'un stratège : <strong>Didi B</strong>, surnommé le Shogun de la trap ivoirienne.</p>

<h2>Une ascension forgée dans le fer et le nouchi</h2>
<p>Né d'un père producteur et pianiste et d'une mère chorégraphe de renom, Bassa Zéréhoué Diyilem a grandi baigné dans les accords et les cadences de la scène abidjanaise. Mais c'est au sein du collectif légendaire <strong>Kiff No Beat</strong> qu'il dynamite les codes. Entre 2012 et 2020, le groupe réinvente le hip-hop africain, mêlant flows saccadés, argot nouchi acéré et street-credibility absolue.</p>

<blockquote class="editorial-quote">
  « On a commencé quand personne ne croyait qu'un rappeur ivoirien pouvait remplir un stade. Aujourd'hui, on ne vient plus frapper à la porte, on est la porte. »
  <span>— Didi B</span>
</blockquote>

<h2>L'ère Mojaveli : L'album qui a tout changé</h2>
<p>Avec son premier projet solo post-Kiff No Beat, <em>Mojaveli</em>, le rappeur ne s'est pas contenté de réussir un examen de passage. Il a signé un manifeste. Des hits comme <strong>"Tala"</strong>, <strong>"Yeye"</strong> et <strong>"En Haut"</strong> (en featuring avec JR La Melo et Tchaikabo) ont résonné des maquis de Yopougon jusqu'aux clubs parisiens et new-yorkais.</p>

<p>Sa signature chez 92i Africa sous l'égide de Booba a marqué un tournant institutionnel, prouvant que le marché ivoirien génère une ferveur capable de rivaliser avec les mastodontes de l'afrobeats nigérian ou de l'amapiano sud-africain.</p>

<h2>La scène internationale comme nouveau terrain de jeu</h2>
<p>Après avoir conquis le Palais de la Culture d'Abidjan à guichets fermés à plusieurs reprises, Didi B enchaîne les distinctions : Meilleur Artiste Hip-Hop d'Afrique aux AFRIMA, Kundé d'Or, et une nomination remarquée aux MTV EMA. Mais pour l'artiste, l'essentiel réside ailleurs :</p>

<p><em>« Le rap ivoirien a une âme unique parce qu'il puise dans notre réalité, notre argot, nos souffrances et nos joies. Le nouchi est devenu une langue universelle de fête et de revendication. »</em></p>`,
      category: 'Rap Ivoire',
      coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80'
      ],
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      quote: {
        text: 'Le nouchi est devenu une langue universelle de fête et de revendication.',
        author: 'Didi B'
      },
      author: {
        name: 'Koffi Adams',
        role: 'Directeur de la Rédaction',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      },
      publishedAt: '2026-11-10T14:00:00Z',
      readTime: '6 min',
      views: 18450,
      likes: 924,
      tags: ['Didi B', 'Mojaveli', 'Rap Ivoire', 'Abidjan', 'Hip-Hop'],
      relatedArtists: ['Didi B', 'Himra', 'Suspect 95'],
      status: 'published',
      isFeatured: true,
      isBreaking: true
    },
    {
      id: 'art-2',
      slug: 'himra-roi-de-la-drill-ivoirienne-recette-du-succes',
      title: 'Himra : Pourquoi la Drill de Marcory traumatise les compteurs de streaming',
      subtitle: 'Avec son énergie brute, sa gestuelle hypnotique et ses rimes incisives, Himra a converti la jeunesse ivoirienne au son sombre de Chicago et Londres.',
      summary: 'Du quartier de Sicogi Marcory aux scènes européennes, analyse du phénomène Himra, le franc-tireur du rap abidjanais qui a transformé la drill en identité locale.',
      content: `<p class="lead">Dans les ruelles de Marcory, le nom d'Himra résonne comme un signal de ralliement. Pionnier incontesté de l'adaptation ivoirienne de la drill, l'artiste a su insuffler une énergie tellurique à un genre souvent accusé de monotonie.</p>

<h2>La Drill ivoirienne : Un syncrétisme explosif</h2>
<p>Là où la drill britannique s'appuie sur la mélancolie des nuits londoniennes, Himra y a injecté la chaleur du bitume d'Abidjan, les onomatopées de la rue et un sens du spectacle hérité des plus grands ambianceurs ivoiriens.</p>

<blockquote class="editorial-quote">
  « On a pris leurs basses 808 glissantes et on a mis notre rage de vivre dedans. Chez nous, même dans la drill, on danse ! »
  <span>— Himra</span>
</blockquote>

<h2>Un parcours d'indépendant modèle</h2>
<p>Contrairement à certains de ses pairs adossés à des majors dès leurs débuts, Himra a patiemment bâti sa communauté via YouTube et TikTok, enchaînant les freestyles tranchants. Son slogan <strong>NFTR</strong> (No Faux Tout Réel) est devenu un code moral pour des milliers d'adolescents ivoiriens.</p>`,
      category: 'Rap Ivoire',
      coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
      author: {
        name: 'Awa Bamba',
        role: 'Journaliste Musique & Culture',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80'
      },
      publishedAt: '2026-11-09T18:30:00Z',
      readTime: '4 min',
      views: 12380,
      likes: 670,
      tags: ['Himra', 'Drill', 'Marcory', 'Abidjan', 'NFTR'],
      relatedArtists: ['Himra', 'Jr La Melo'],
      status: 'published',
      isFeatured: true
    },
    {
      id: 'art-3',
      slug: 'suspect-95-societe-suspecte-syndicat-rap-philosophique',
      title: 'Suspect 95 : Le Président du Syndicat remet les pendules à l’heure avec son nouvel opus',
      subtitle: 'Entre satire sociale, flow millimétré et réflexions intimes, Suspect 95 confirme son statut d’orfèvre des mots.',
      summary: 'Après des mois de travail acharné, l’auteur de "Société Suspecte" dévoile les coulisses d’un projet qui promet de bousculer les certitudes du rap francophone.',
      content: `<p class="lead">Porte-parole auto-proclamé des hommes face aux exigences amoureuses contemporaines, <strong>Suspect 95</strong> n'est pourtant pas qu'un humoriste du micro. C'est un styliste hors-pair, capable de passer de l'autodérision la plus cinglante à la méditation existentielle la plus poignante.</p>

<h2>L'art de la punchline intelligente</h2>
<p>Guy Ange Emmanuel, de son vrai nom, a forgé une écriture singulière qui séduit autant les puristes du boom-bap que les auditeurs occasionnels. Son duo avec <strong>Youssoupha</strong> sur <em>"Société Suspecte"</em> avait déjà marqué les esprits par sa profondeur critique.</p>

<blockquote class="editorial-quote">
  « Le rap doit faire réfléchir tout en faisant bouger la tête. Si un son ne dit rien sur la société dans laquelle on vit, alors ce n'est que du bruit. »
  <span>— Suspect 95</span>
</blockquote>

<p>Dans ce nouvel album, le rappeur aborde la santé mentale, la pression du succès et la paternité avec une vulnérabilité rare dans le rap ivoirien.</p>`,
      category: 'Interviews',
      coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
      author: {
        name: 'Koffi Adams',
        role: 'Directeur de la Rédaction',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      },
      publishedAt: '2026-11-08T09:15:00Z',
      readTime: '5 min',
      views: 15420,
      likes: 830,
      tags: ['Suspect 95', 'Syndicat', 'Société Suspecte', 'Paroles', 'Abidjan'],
      relatedArtists: ['Suspect 95', 'Didi B'],
      status: 'published',
      isFeatured: false
    },
    {
      id: 'art-4',
      slug: 'team-paiya-coup-du-marteau-zagba-revolution-festive',
      title: 'Team Paiya : Du bitume de Yopougon au phénomène viral mondial',
      subtitle: 'Comment Zagba le Requin et sa bande ont créé la bande-son officielle des victoires ivoiriennes.',
      summary: 'Hymne officieux de la CAN 2024 et morceau aux dizaines de millions de streams, "Coup du marteau" a consacré l’alliance parfaite entre esprit rap, coupé-décalé et ambiance purement abidjanaise.',
      content: `<p class="lead">Le mot d'ordre est clair : <em>la joie est obligatoire</em>. Avec la Team Paiya, menée par <strong>Zagba le Requin</strong>, le rap ivoire a embrassé sans complexe ses racines populaires et festives.</p>

<h2>La fusion des énergies abidjanaises</h2>
<p>Loin des rivalités de chapelles, la Team Paiya a fédéré toute une nation avec une formule redoutable : des refrains scandés en chœur, des chorégraphies virales et une fierté assumée des quartiers populaires d'Abidjan.</p>`,
      category: 'Culture Urbaine',
      coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
      author: {
        name: 'Yannick Gnahoré',
        role: 'Chroniqueur Street',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
      },
      publishedAt: '2026-11-07T16:45:00Z',
      readTime: '3 min',
      views: 22100,
      likes: 1450,
      tags: ['Team Paiya', 'Coup du Marteau', 'Zagba le Requin', 'Yopougon', 'Fête'],
      relatedArtists: ['Team Paiya', 'Ste Milano'],
      status: 'published',
      isFeatured: true
    },
    {
      id: 'art-5',
      slug: 'nouvelle-vague-beatmakers-abidjan-architectes-sonores',
      title: 'Les Beatmakers d’Abidjan : Qui sont les architectes secrets du son Rap Ivoire ?',
      subtitle: 'Dans leurs home studios de Cocody, Koumassi et Yopougon, ils façonnent les hits qui font danser toute l’Afrique.',
      summary: 'Tam Sir, Shado Chris, Stelair et les nouveaux prodiges de la MPC : plongée dans les coulisses de la création des instrumentales les plus convoitées du continent.',
      content: `<p class="lead">Si les voix des rappeurs ivoiriens captivent, c'est d'abord parce que les écrins sonores confectionnés par les beatmakers d'Abidjan possèdent une signature inimitable : un savant dosage de basses drill, de percussions traditionnelles ivoiriennes (ahoco, tam-tam) et de synthétiseurs futuristes.</p>`,
      category: 'Musique',
      coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
      author: {
        name: 'Awa Bamba',
        role: 'Journaliste Musique & Culture',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80'
      },
      publishedAt: '2026-11-06T11:00:00Z',
      readTime: '5 min',
      views: 8900,
      likes: 412,
      tags: ['Beatmaking', 'Production', 'Abidjan', 'Studio', 'Musique'],
      relatedArtists: ['Didi B', 'Himra'],
      status: 'published',
      isFeatured: false
    },
    {
      id: 'art-6',
      slug: 'ste-milano-flow-melodieux-abobo-nouveau-clip',
      title: 'Ste Milano dévoile son clip "Abobo Boy" et frappe un grand coup',
      subtitle: 'L’un des fers de lance de la nouvelle génération confirme sa signature mélodique irrésistible.',
      summary: 'Images léchées, ambiance nocturne et refrains entêtants : Ste Milano prouve une fois de plus que la commune d’Abobo regorge d’une créativité sans borne.',
      content: `<p class="lead">Avec son timbre vocal reconnaissable entre mille et ses mélodies imprégnées d'afropop et de rap moderne, Ste Milano continue son irrésistible conquête du public ouest-africain.</p>`,
      category: 'Clips',
      coverImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80',
      author: {
        name: 'Yannick Gnahoré',
        role: 'Chroniqueur Street',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
      },
      publishedAt: '2026-11-05T14:20:00Z',
      readTime: '3 min',
      views: 7400,
      likes: 380,
      tags: ['Ste Milano', 'Abobo', 'Clips', 'Nouveau Son'],
      relatedArtists: ['Ste Milano', 'Team Paiya'],
      status: 'published',
      isFeatured: false
    },
    {
      id: 'art-7',
      slug: 'brouillon-interview-jr-la-melo',
      title: 'JR La Melo : « Le futur du rap africain s’écrit à Abidjan » [Exclusif]',
      subtitle: 'Entretien vérité avec l’une des pépites les plus prometteuses du label Coast to Coast.',
      summary: 'Projets, collaborations secrètes et vision du mouvement : interview exclusive avec le prodige de la drill.',
      content: `<p>Contenu en cours de rédaction par le journaliste...</p>`,
      category: 'Interviews',
      coverImage: 'https://images.unsplash.com/photo-1520523839898-507127050c69?auto=format&fit=crop&w=1200&q=80',
      author: {
        name: 'Awa Bamba',
        role: 'Journaliste Musique & Culture',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80'
      },
      publishedAt: '2026-11-11T10:00:00Z',
      readTime: '4 min',
      views: 120,
      likes: 5,
      tags: ['JR La Melo', 'Interview', 'Exclusif'],
      relatedArtists: ['Jr La Melo'],
      status: 'draft',
      isFeatured: false
    },
    {
      id: 'art-8',
      slug: 'proposition-mc-one-retour-album',
      title: 'MC One prépare un retour triomphal avec un projet introspectif',
      subtitle: 'Le poulain de Kedjevara franchit une nouvelle étape de sa carrière avec un album mature.',
      summary: 'Soumission proposée par un contributeur indépendant pour relecture éditoriale.',
      content: `<p>Proposition d'article soumise par Yannick Gnahoré sur le prochain album de MC One.</p>`,
      category: 'Rap Ivoire',
      coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      author: {
        name: 'Yannick Gnahoré',
        role: 'Chroniqueur Street',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
      },
      publishedAt: '2026-11-11T12:00:00Z',
      readTime: '3 min',
      views: 45,
      likes: 2,
      tags: ['MC One', 'Album', 'Nouvelle Sortie'],
      relatedArtists: ['MC One'],
      status: 'pending',
      isFeatured: false
    }
  ],
  artists: [
    {
      id: 'art-didi-b',
      slug: 'didi-b',
      name: 'Didi B',
      realName: 'Bassa Zéréhoué Diyilem',
      commune: 'Cocody',
      genre: 'Trap Nouchi & Rap Hardcore',
      bio: 'Pionnier incontournable du Rap Ivoire moderne, ancien membre leader du groupe Kiff No Beat. Artiste de dimension internationale signé sur 92i Africa et multi-récompensé aux AFRIMA. Ses albums "History (Mojaveli)" et "DIYILEM" ont marqué l’histoire de la musique ivoirienne.',
      photo: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
      coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1400&q=80',
      debutYear: '2010',
      isTrending: true,
      popularTracks: ['Tala', 'Yeye', 'En Haut (ft. JR La Melo)', 'Chérie Coco', 'On a pris balle'],
      discography: [
        { title: 'History (Mojaveli)', year: '2022', type: 'Album' },
        { title: 'DIYILEM', year: '2023', type: 'Album' },
        { title: 'Before Mojaveli', year: '2021', type: 'EP' }
      ],
      socialLinks: {
        instagram: 'https://instagram.com/didib_official',
        tiktok: 'https://tiktok.com/@didib',
        facebook: 'https://facebook.com/DidiBOfficiel',
        twitter: 'https://twitter.com/didibofficial'
      },
      streamingLinks: {
        spotify: 'https://open.spotify.com',
        appleMusic: 'https://music.apple.com',
        youtube: 'https://youtube.com',
        boomplay: 'https://boomplay.com'
      }
    },
    {
      id: 'art-himra',
      slug: 'himra',
      name: 'Himra',
      realName: 'Konan Kouassi',
      commune: 'Marcory',
      genre: 'Drill Ivoire',
      bio: 'Le roi incontesté de la Drill ivoirienne. Issu de Marcory Sicogi, Himra a popularisé le slogan NFTR (No Faux Tout Réel). Réputé pour son agressivité scénique légendaire, ses transitions de flow brutales et sa connexion indéfectible avec la jeunesse des quartiers.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80',
      debutYear: '2018',
      isTrending: true,
      popularTracks: ['NFTR 3', 'Marcory Gang', 'Grille Pain', 'Bâtard', 'Dans le Viseur'],
      discography: [
        { title: 'NFTR The Album', year: '2023', type: 'Album' },
        { title: 'Drill Ivoire Vol. 1', year: '2021', type: 'EP' }
      ],
      socialLinks: {
        instagram: 'https://instagram.com/himra_officiel',
        tiktok: 'https://tiktok.com/@himra_nftr',
        facebook: 'https://facebook.com/HimraOfficiel'
      }
    },
    {
      id: 'art-suspect-95',
      slug: 'suspect-95',
      name: 'Suspect 95',
      realName: 'Guy Ange Emmanuel',
      commune: 'Yopougon / Cocody',
      genre: 'Rap Conscient & Satire Sociale',
      bio: 'Surnommé "Le Président du Syndicat", Suspect 95 est l’un des paroliers les plus doués et respectés de la scène africaine. Auteur de hits intemporels, il a su allier humour ravageur et chroniques poignantes sur la condition humaine et sociale.',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1400&q=80',
      debutYear: '2015',
      isTrending: true,
      popularTracks: ['Société Suspecte (ft. Youssoupha)', 'Enfant de Boss', 'C’est dans télé', 'Dis-lui', 'Mercon'],
      discography: [
        { title: 'Société Suspecte', year: '2023', type: 'Album' },
        { title: 'Syndicat First Class', year: '2020', type: 'EP' }
      ],
      socialLinks: {
        instagram: 'https://instagram.com/suspect_95',
        facebook: 'https://facebook.com/Suspect95'
      }
    },
    {
      id: 'art-team-paiya',
      slug: 'team-paiya',
      name: 'Team Paiya',
      realName: 'Collectif mené par Zagba le Requin',
      commune: 'Yopougon',
      genre: 'Paiya Sound / Coupé-Décalé Drill',
      bio: 'Le groupe phénomène d’Abidjan qui a enflammé toute l’Afrique avec "Coup du marteau" et le concept du Paiya (l’art de fêter sans modération). Ils incarnent la joie communicative et l’authenticité des maquis abidjanais.',
      photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      coverImage: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?auto=format&fit=crop&w=1400&q=80',
      debutYear: '2022',
      isTrending: true,
      popularTracks: ['Coup du Marteau', 'Fimbu', 'On Veut Paiya', 'C’est pas ma faute'],
      discography: [
        { title: 'Paiya Universel', year: '2024', type: 'Album' },
        { title: 'Ambiance de Yop', year: '2023', type: 'EP' }
      ],
      socialLinks: {
        instagram: 'https://instagram.com/teampaiya',
        tiktok: 'https://tiktok.com/@teampaiya'
      }
    },
    {
      id: 'art-jr-la-melo',
      slug: 'jr-la-melo',
      name: 'JR La Melo',
      commune: 'Treichville',
      genre: 'Drill & Melodic Trap',
      bio: 'Jeune prodige repéré par Didi B sur le titre colossal "En Haut". Avec son flow rapide et sa mélodie tranchante, JR La Melo représente l’avenir rayonnant de la nouvelle génération abidjanaise.',
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
      debutYear: '2021',
      isTrending: true,
      popularTracks: ['Tchapeu Tchapeu', 'En Haut', 'Légende', 'Abidjan City'],
      discography: [
        { title: 'Melo Trap Vol. 1', year: '2023', type: 'EP' }
      ]
    },
    {
      id: 'art-mc-one',
      slug: 'mc-one',
      name: 'MC One',
      realName: 'Jean-Noël Bagagnan',
      commune: 'Abobo',
      genre: 'Rap Hardcore & Afro-rap',
      bio: 'Enfant prodige du rap ivoirien dès l’âge de 14 ans sous la houlette de Kedjevara. Connu pour ses clashs retentissants, ses rimes techniques et sa constance musicale au plus haut niveau.',
      photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80',
      debutYear: '2016',
      isTrending: false,
      popularTracks: ['Opi Onka Ka Moun Gnan', 'Animan', 'Démocratie', 'Reconnaissance'],
      discography: [
        { title: 'Conquérant', year: '2022', type: 'Album' }
      ]
    }
  ],
  videos: [
    {
      id: 'vid-1',
      title: 'Didi B - Tala (Clip Officiel)',
      artist: 'Didi B',
      category: 'Clip Officiel',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      duration: '3:45',
      views: 12500000,
      publishedAt: '2024-05-12',
      isTrending: true
    },
    {
      id: 'vid-2',
      title: 'Himra - NFTR 3 (Freestyle Drill)',
      artist: 'Himra',
      category: 'Freestyle',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      duration: '2:50',
      views: 3400000,
      publishedAt: '2024-06-20',
      isTrending: true
    },
    {
      id: 'vid-3',
      title: 'Suspect 95 ft. Youssoupha - Société Suspecte (Clip)',
      artist: 'Suspect 95',
      category: 'Clip Officiel',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
      duration: '4:15',
      views: 8900000,
      publishedAt: '2023-11-14',
      isTrending: false
    },
    {
      id: 'vid-4',
      title: 'Team Paiya - Coup du Marteau (Clip Officiel)',
      artist: 'Team Paiya',
      category: 'Clip Officiel',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      duration: '3:30',
      views: 35000000,
      publishedAt: '2024-01-10',
      isTrending: true
    },
    {
      id: 'vid-5',
      title: 'Inside Abidjan Hip-Hop : Dans les studios avec les beatmakers ivoiriens',
      artist: 'RAP IVOIRE Documentaire',
      category: 'Documentaire',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
      duration: '18:22',
      views: 450000,
      publishedAt: '2024-08-01',
      isTrending: false
    },
    {
      id: 'vid-6',
      title: 'Didi B x Suspect 95 : L’Interview croisée historique',
      artist: 'RAP IVOIRE Exclusif',
      category: 'Interview',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
      duration: '25:10',
      views: 920000,
      publishedAt: '2024-09-15',
      isTrending: true
    }
  ],
  comments: [
    {
      id: 'comm-1',
      articleId: 'art-1',
      articleSlug: 'didi-b-mojaveli-conquete-internationale-rap-ivoire',
      authorName: 'Amadou Koné',
      content: 'Didi B a vraiment placé la barre très haut pour toute la Côte d’Ivoire. Fierté nationale pure !',
      createdAt: '2026-11-10T16:00:00Z',
      status: 'approved'
    },
    {
      id: 'comm-2',
      articleId: 'art-1',
      articleSlug: 'didi-b-mojaveli-conquete-internationale-rap-ivoire',
      authorName: 'Laetitia Touré',
      content: 'Le son Tala résonne encore partout en boîte de nuit à Abidjan et même à Dakar. Superbe analyse journalistique !',
      createdAt: '2026-11-10T18:20:00Z',
      status: 'approved'
    },
    {
      id: 'comm-3',
      articleId: 'art-2',
      articleSlug: 'himra-roi-de-la-drill-ivoirienne-recette-du-succes',
      authorName: 'Bamba de Marcory',
      content: 'Himra NFTR c’est notre fierté ! L’énergie en concert est inégalable.',
      createdAt: '2026-11-09T20:10:00Z',
      status: 'approved'
    }
  ],
  media: [
    {
      id: 'med-logo',
      name: 'logo-rap-ivoire.jpg',
      url: '/images/logo-rap-ivoire.jpg',
      size: 64903,
      type: 'image/jpeg',
      dimensions: '1000x1000',
      createdAt: '2026-11-11T19:40:00Z'
    },
    {
      id: 'med-didi',
      name: 'didi-b-live.jpg',
      url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      size: 245000,
      type: 'image/jpeg',
      dimensions: '1200x800',
      createdAt: '2026-11-10T12:00:00Z'
    },
    {
      id: 'med-himra',
      name: 'himra-concert.jpg',
      url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
      size: 198000,
      type: 'image/jpeg',
      dimensions: '1200x800',
      createdAt: '2026-11-09T14:00:00Z'
    }
  ]
};

// Thread-safe cached DB access
let dbCache: DatabaseSchema | null = null;

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getDatabase(): DatabaseSchema {
  if (dbCache) {
    return dbCache;
  }

  ensureDataDir();

  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialSeed, null, 2), 'utf-8');
    dbCache = initialSeed;
    return initialSeed;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    dbCache = JSON.parse(raw);
    return dbCache!;
  } catch (err) {
    console.error('Error reading database file, falling back to initial seed:', err);
    return initialSeed;
  }
}

export function saveDatabase(data: DatabaseSchema): void {
  ensureDataDir();
  dbCache = data;
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving database:', err);
  }
}

// Helper methods for Articles
export function getArticles(options?: {
  status?: string;
  category?: string;
  tag?: string;
  limit?: number;
  featuredOnly?: boolean;
}): Article[] {
  const db = getDatabase();
  let list = [...db.articles];

  if (options?.status) {
    list = list.filter((a) => a.status === options.status);
  }
  if (options?.category && options.category !== 'Tous') {
    list = list.filter((a) => a.category.toLowerCase() === options.category!.toLowerCase());
  }
  if (options?.tag) {
    list = list.filter((a) => a.tags.some((t) => t.toLowerCase() === options.tag!.toLowerCase()));
  }
  if (options?.featuredOnly) {
    list = list.filter((a) => a.isFeatured);
  }

  // Sort by publishedAt descending
  list.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  if (options?.limit) {
    list = list.slice(0, options.limit);
  }

  return list;
}

export function getArticleBySlug(slug: string): Article | null {
  const db = getDatabase();
  return db.articles.find((a) => a.slug === slug) || null;
}

export function getArticleById(id: string): Article | null {
  const db = getDatabase();
  return db.articles.find((a) => a.id === id) || null;
}

export function saveArticle(article: Partial<Article> & { title: string }): Article {
  const db = getDatabase();
  const now = new Date().toISOString();

  // If existing
  if (article.id) {
    const index = db.articles.findIndex((a) => a.id === article.id);
    if (index !== -1) {
      const updated: Article = {
        ...db.articles[index],
        ...article,
        updatedAt: now,
      };
      db.articles[index] = updated;
      saveDatabase(db);
      return updated;
    }
  }

  // Generate new slug
  const baseSlug = article.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const id = `art-${Date.now()}`;
  const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

  const newArticle: Article = {
    id,
    slug,
    title: article.title,
    subtitle: article.subtitle || '',
    summary: article.summary || '',
    content: article.content || '',
    category: article.category || 'Rap Ivoire',
    coverImage: article.coverImage || '/images/logo-rap-ivoire.jpg',
    images: article.images || [],
    youtubeUrl: article.youtubeUrl || '',
    localVideoUrl: article.localVideoUrl || '',
    videoType: article.videoType || (article.localVideoUrl ? 'upload' : 'youtube'),
    quote: article.quote,
    author: article.author || {
      name: 'Rédaction RAP IVOIRE',
      role: 'Journaliste',
      avatar: '/images/logo-rap-ivoire.jpg',
    },
    publishedAt: now,
    readTime: `${Math.max(2, Math.ceil((article.content?.length || 500) / 400))} min`,
    views: 0,
    likes: 0,
    tags: article.tags || ['Rap Ivoire'],
    relatedArtists: article.relatedArtists || [],
    status: article.status || 'draft',
    isFeatured: !!article.isFeatured,
    isBreaking: !!article.isBreaking,
  };

  db.articles.unshift(newArticle);
  saveDatabase(db);
  return newArticle;
}

export function updateArticleStatus(id: string, status: 'draft' | 'pending' | 'published'): boolean {
  const db = getDatabase();
  const article = db.articles.find((a) => a.id === id);
  if (!article) return false;
  article.status = status;
  article.updatedAt = new Date().toISOString();
  saveDatabase(db);
  return true;
}

export function deleteArticle(id: string): boolean {
  const db = getDatabase();
  const initLength = db.articles.length;
  db.articles = db.articles.filter((a) => a.id !== id);
  if (db.articles.length !== initLength) {
    saveDatabase(db);
    return true;
  }
  return false;
}

export function incrementArticleViews(idOrSlug: string): void {
  const db = getDatabase();
  const article = db.articles.find((a) => a.id === idOrSlug || a.slug === idOrSlug);
  if (article) {
    article.views = (article.views || 0) + 1;
    saveDatabase(db);
  }
}

// Helper methods for Artists
export function getArtists(): Artist[] {
  const db = getDatabase();
  return db.artists;
}

export function getArtistBySlug(slug: string): Artist | null {
  const db = getDatabase();
  return db.artists.find((a) => a.slug === slug) || null;
}

export function saveArtist(artist: Artist): Artist {
  const db = getDatabase();
  const index = db.artists.findIndex((a) => a.id === artist.id);
  if (index !== -1) {
    db.artists[index] = artist;
  } else {
    db.artists.push(artist);
  }
  saveDatabase(db);
  return artist;
}

// Helper methods for Videos
export function getVideos(): VideoItem[] {
  const db = getDatabase();
  return db.videos;
}

export function saveVideo(video: VideoItem): VideoItem {
  const db = getDatabase();
  const index = db.videos.findIndex((v) => v.id === video.id);
  if (index !== -1) {
    db.videos[index] = video;
  } else {
    db.videos.unshift(video);
  }
  saveDatabase(db);
  return video;
}

// Helper methods for Comments
export function getCommentsForArticle(articleId: string): CommentItem[] {
  const db = getDatabase();
  return db.comments.filter((c) => (c.articleId === articleId || c.articleSlug === articleId) && c.status === 'approved');
}

export function getAllComments(): CommentItem[] {
  const db = getDatabase();
  return db.comments;
}

export function addComment(comment: Omit<CommentItem, 'id' | 'createdAt' | 'status'>): CommentItem {
  const db = getDatabase();
  const newComment: CommentItem = {
    ...comment,
    id: `comm-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'approved', // Auto-approved or set pending if needed
  };
  db.comments.unshift(newComment);
  saveDatabase(db);
  return newComment;
}

export function updateCommentStatus(id: string, status: 'pending' | 'approved' | 'rejected'): boolean {
  const db = getDatabase();
  const comm = db.comments.find((c) => c.id === id);
  if (!comm) return false;
  comm.status = status;
  saveDatabase(db);
  return true;
}

// Helper methods for Media
export function getMediaFiles(): MediaFile[] {
  const db = getDatabase();
  return db.media;
}

export function addMediaFile(media: MediaFile): void {
  const db = getDatabase();
  db.media.unshift(media);
  saveDatabase(db);
}

// Helper methods for Stats
export function getSiteStats(): SiteStats {
  const db = getDatabase();
  const published = db.articles.filter((a) => a.status === 'published').length;
  const pending = db.articles.filter((a) => a.status === 'pending').length;
  const draft = db.articles.filter((a) => a.status === 'draft').length;
  const totalViews = db.articles.reduce((acc, curr) => acc + (curr.views || 0), 0);

  return {
    totalArticles: db.articles.length,
    publishedArticles: published,
    pendingArticles: pending,
    draftArticles: draft,
    totalViews,
    activeContributors: db.users.length,
  };
}
