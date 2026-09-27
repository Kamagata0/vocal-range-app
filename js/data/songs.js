// カラオケ定番・人気曲 100曲データベース
// 客観的な音域データ・難易度・練習ポイント（歌詞・音源は含みません）

export const SONGS_DATABASE = [
  // --- Vaundy ---
  { id: "v1", title: "怪獣の花唄", artist: "Vaundy", lowest_note: "C3", highest_note: "A4", main_range: "E3〜G4", difficulty: 4, vocal_type: "male", is_estimate: false, practice_tags: ["高音", "声量", "ロングトーン", "ミックスボイス練習"], practice_focus: "サビで連発するmid2G〜hiAの力強い高音発声。喉を開いたまま声を張るスタミナ強化に最適。" },
  { id: "v2", title: "napori", artist: "Vaundy", lowest_note: "A#2", highest_note: "G4", main_range: "C3〜F4", difficulty: 2, vocal_type: "male", is_estimate: false, practice_tags: ["グルーヴ感", "脱力", "中低音"], practice_focus: "最高音mid2Gと歌いやすいキー。チルなビートに乗せて力まずに息を流す練習に最適。" },
  { id: "v3", title: "不可幸力", artist: "Vaundy", lowest_note: "G#2", highest_note: "G#4", main_range: "C3〜F#4", difficulty: 3, vocal_type: "male", is_estimate: false, practice_tags: ["ラップ・リズム", "低音", "エッジボイス"], practice_focus: "Aメロの低音語りとサビのメロディアスな広がり。緩急のコントロール練習にぴったり。" },
  { id: "v4", title: "踊り子", artist: "Vaundy", lowest_note: "B2", highest_note: "F#4", main_range: "D3〜E4", difficulty: 2, vocal_type: "male", is_estimate: false, practice_tags: ["脱力", "リズムキープ", "安定感"], practice_focus: "一定の淡々としたビートの中でニュアンスを崩さずに歌う脱力発声の基礎に。" },
  { id: "v5", title: "タイムパラドックス", artist: "Vaundy", lowest_note: "C3", highest_note: "A4", main_range: "F3〜G4", difficulty: 3, vocal_type: "male", is_estimate: false, practice_tags: ["高音", "地声→裏声の切り替え", "ポップス"], practice_focus: "キャッチーなサビのメロディとhiAのアクセント。明るく抜ける声の練習に。" },

  // --- Official髭男dism ---
  { id: "h1", title: "Pretender", artist: "Official髭男dism", lowest_note: "D#3", highest_note: "D#5", main_range: "G3〜C5", difficulty: 5, vocal_type: "male", is_estimate: false, practice_tags: ["ミックスボイス練習", "超高音", "裏声", "音程"], practice_focus: "サビのhiC〜hiD#を息漏れのない美しいミックスボイスと裏声で歌い分ける超定番の高難度曲。" },
  { id: "h2", title: "Subtitle", artist: "Official髭男dism", lowest_note: "C3", highest_note: "C5", main_range: "F3〜A#4", difficulty: 5, vocal_type: "male", is_estimate: false, practice_tags: ["ミックスボイス練習", "高音", "ロングトーン"], practice_focus: "hiA〜hiCの超高音域をクリアな声質で維持する高度なミックスボイスの持続力が試されます。" },
  { id: "h3", title: "I LOVE...", artist: "Official髭男dism", lowest_note: "C#3", highest_note: "D5", main_range: "G3〜B4", difficulty: 4, vocal_type: "male", is_estimate: false, practice_tags: ["裏声", "高音", "表現力"], practice_focus: "サビの地声張り上げとファルセット（hiD）の鮮やかな対比のトレーニングになります。" },
  { id: "h4", title: "宿命", artist: "Official髭男dism", lowest_note: "C3", highest_note: "C5", main_range: "F3〜A#4", difficulty: 4, vocal_type: "male", is_estimate: false, practice_tags: ["声量", "ブラスサウンド", "高音"], practice_focus: "力強く突き抜けるブラスに負けない芯のある発声。腹圧の支えが重要です。" },
  { id: "h5", title: "ミックスナッツ", artist: "Official髭男dism", lowest_note: "C#3", highest_note: "C#5", main_range: "F#3〜B4", difficulty: 5, vocal_type: "male", is_estimate: false, practice_tags: ["高速テンポ", "滑舌・ブレス", "超高音"], practice_focus: "スウィングビートと超ハイスピードな譜割り。素早い息継ぎと音程跳躍の難曲。" },

  // --- Mrs. GREEN APPLE ---
  { id: "m1", title: "青と夏", artist: "Mrs. GREEN APPLE", lowest_note: "C3", highest_note: "B4", main_range: "G3〜A#4", difficulty: 4, vocal_type: "male", is_estimate: false, practice_tags: ["高音", "ミックスボイス練習", "ロングトーン"], practice_focus: "サビ全体が高い音域（hiA〜hiB）で推移するため、喉を締めずに高い呼気圧を保つ練習に。" },
  { id: "m2", title: "ダンスホール", artist: "Mrs. GREEN APPLE", lowest_note: "C3", highest_note: "B4", main_range: "E3〜A4", difficulty: 4, vocal_type: "male", is_estimate: false, practice_tags: ["高音", "リズム", "滑舌・ブレス"], practice_focus: "軽快なテンポでhiA〜hiBのハイトーンを連打する、明るい抜け感のある発声練習に最適。" },
  { id: "m3", title: "ライラック", artist: "Mrs. GREEN APPLE", lowest_note: "D3", highest_note: "B4", main_range: "G3〜A#4", difficulty: 5, vocal_type: "male", is_estimate: false, practice_tags: ["超高速ブレス", "高音", "地声→裏声の切り替え"], practice_focus: "目まぐるしいメロディ移動と換声点跨ぎ。声帯の柔軟性を鍛えるハイレベルな1曲。" },
  { id: "m4", title: "点描の唄", artist: "Mrs. GREEN APPLE", lowest_note: "A#2", highest_note: "C5", main_range: "D3〜G#4", difficulty: 3, vocal_type: "male", is_estimate: false, practice_tags: ["デュエット", "バラード", "抑揚"], practice_focus: "繊細な息遣いから感情豊かなクレッシェンドまで。バラードの基礎表現に最適。" },
  { id: "m5", title: "ケセラセラ", artist: "Mrs. GREEN APPLE", lowest_note: "C3", highest_note: "C5", main_range: "F3〜A#4", difficulty: 5, vocal_type: "male", is_estimate: false, practice_tags: ["ダイナミクス", "高音", "声量"], practice_focus: "壮大なストリングスに乗せた圧倒的な高音ロングトーン。身体全身を使った共鳴が必須。" },

  // --- 優里 ---
  { id: "y1", title: "ドライフラワー", artist: "優里", lowest_note: "B2", highest_note: "A4", main_range: "D3〜G4", difficulty: 3, vocal_type: "male", is_estimate: false, practice_tags: ["表現力", "地声→裏声の切り替え", "高音"], practice_focus: "Aメロの抑えた低音からラスサビの叫ぶような高音までのダイナミクス（抑揚）の練習に。" },
  { id: "y2", title: "ベテルギウス", artist: "優里", lowest_note: "C3", highest_note: "A4", main_range: "E3〜G4", difficulty: 3, vocal_type: "male", is_estimate: false, practice_tags: ["声量", "高音", "エモーショナル"], practice_focus: "サビの最高音hiAに向かって息の圧力を高めていく、情熱的な歌い上げの練習に向いています。" },
  { id: "y3", title: "レオ", artist: "優里", lowest_note: "B2", highest_note: "G#4", main_range: "D3〜F#4", difficulty: 3, vocal_type: "male", is_estimate: false, practice_tags: ["語り口調", "バラード", "感情表現"], practice_focus: "言葉ひとつひとつを丁寧に紡ぐストーリーテリングな発声法。" },
  { id: "y4", title: "ビリミリオン", artist: "優里", lowest_note: "A#2", highest_note: "A4", main_range: "D3〜G4", difficulty: 3, vocal_type: "male", is_estimate: false, practice_tags: ["リズム", "前向きな発声", "ロングトーン"], practice_focus: "前へ押し出すストレートな声と、リズミカルな息のコントロール。" },

  // --- あいみょん ---
  { id: "am1", title: "マリーゴールド", artist: "あいみょん", lowest_note: "F3", highest_note: "D5", main_range: "A3〜C5", difficulty: 2, vocal_type: "female", is_estimate: false, practice_tags: ["安定感", "音程", "地声練習"], practice_focus: "音域が中音域中心で歌いやすく、音程の正確さと安定した息の吐き方を鍛える基礎練習に。" },
  { id: "am2", title: "君はロックを聴かない", artist: "あいみょん", lowest_note: "G3", highest_note: "C#5", main_range: "A3〜B4", difficulty: 2, vocal_type: "female", is_estimate: false, practice_tags: ["安定感", "地声練習", "リズム"], practice_focus: "最高音hiC#と中音域主体の安定した歌唱。ストレートな発声で歌詞を届ける基礎作りに最適。" },
  { id: "am3", title: "愛を伝えたいだとか", artist: "あいみょん", lowest_note: "F3", highest_note: "D5", main_range: "A3〜C#5", difficulty: 3, vocal_type: "female", is_estimate: false, practice_tags: ["グルーヴ感", "ファンク", "リズム"], practice_focus: "跳ねる16ビートのリズムに言葉をタイトに乗せるトレーニングにぴったり。" },
  { id: "am4", title: "裸の心", artist: "あいみょん", lowest_note: "G3", highest_note: "C5", main_range: "A3〜A#4", difficulty: 2, vocal_type: "female", is_estimate: false, practice_tags: ["バラード", "息の抜け感", "音程"], practice_focus: "ピアノ伴奏に寄り添う丁寧な発声と、静かなサビの美しい響き作り。" },

  // --- 米津玄師 ---
  { id: "yk1", title: "Lemon", artist: "米津玄師", lowest_note: "B2", highest_note: "B4", main_range: "E3〜G4", difficulty: 4, vocal_type: "male", is_estimate: false, practice_tags: ["音程", "裏声", "リズム"], practice_focus: "低音の語り口調と、サビ後半の繊細なファルセット（裏声）へのシフト。しゃくりの練習に。" },
  { id: "yk2", title: "KICK BACK", artist: "米津玄師", lowest_note: "B2", highest_note: "A4", main_range: "D3〜G4", difficulty: 4, vocal_type: "male", is_estimate: false, practice_tags: ["シャウト", "リズム", "地声練習"], practice_focus: "がなり・エッジボイスのスパイスと、激しいドラムに負けないビート感を身につける練習曲。" },
  { id: "yk3", title: "感電", artist: "米津玄師", lowest_note: "A2", highest_note: "A4", main_range: "C3〜F#4", difficulty: 4, vocal_type: "male", is_estimate: false, practice_tags: ["ファンク", "裏声", "滑舌"], practice_focus: "低音域と裏声を行き来するファンキーなボーカルワーク。" },
  { id: "yk4", title: "アイネクライネ", artist: "米津玄師", lowest_note: "B2", highest_note: "G4", main_range: "D3〜F#4", difficulty: 2, vocal_type: "male", is_estimate: false, practice_tags: ["中音域", "音程", "安定感"], practice_focus: "最高音mid2Gと男性の無理のない高さ。ピッチの正確さを磨くのに最適。" },
  { id: "yk5", title: "ピースサイン", artist: "米津玄師", lowest_note: "D3", highest_note: "A4", main_range: "F#3〜G4", difficulty: 3, vocal_type: "male", is_estimate: false, practice_tags: ["アタック", "ロック", "高音"], practice_focus: "疾走感あふれるロックナンバー。声を前に飛ばすストレートな発声法。" },

  // --- King Gnu ---
  { id: "kg1", title: "白日", artist: "King Gnu", lowest_note: "C#3", highest_note: "F5", main_range: "F#3〜C#5", difficulty: 5, vocal_type: "male", is_estimate: false, practice_tags: ["裏声", "地声→裏声の切り替え", "ミックスボイス練習"], practice_focus: "冒頭の透き通るファルセットから力強い地声への行き来。チェストとヘッドの結合トレーニング。" },
  { id: "kg2", title: "逆夢", artist: "King Gnu", lowest_note: "B2", highest_note: "B4", main_range: "E3〜G#4", difficulty: 4, vocal_type: "male", is_estimate: false, practice_tags: ["バラード", "壮大", "裏声"], practice_focus: "静けさと激しさの二面性。サビの切ないハイトーン裏声の響き。" },
  { id: "kg3", title: "一途", artist: "King Gnu", lowest_note: "C#3", highest_note: "A#4", main_range: "F3〜G#4", difficulty: 4, vocal_type: "male", is_estimate: false, practice_tags: ["超高速", "アジリティ", "高音"], practice_focus: "息継ぎポイントが極少の高速ビート。呼気圧を一定に保つスタミナが求められます。" },

  // --- back number ---
  { id: "bn1", title: "高嶺の花子さん", artist: "back number", lowest_note: "C#3", highest_note: "A4", main_range: "F3〜G#4", difficulty: 3, vocal_type: "male", is_estimate: false, practice_tags: ["高音", "地声→裏声の切り替え", "声量"], practice_focus: "サビ終わりのhiAへの跳躍と、地声・裏声の境界線（換声点）を滑らかに越える練習に。" },
  { id: "bn2", title: "水平線", artist: "back number", lowest_note: "A2", highest_note: "G#4", main_range: "D3〜F#4", difficulty: 2, vocal_type: "male", is_estimate: false, practice_tags: ["低音", "安定感", "ロングトーン"], practice_focus: "最高音mid2G#と男性が無理なく感情を込められるキー設定。丁寧なピッチコントロールに最適。" },
  { id: "bn3", title: "ハッピーエンド", artist: "back number", lowest_note: "A#2", highest_note: "G#4", main_range: "D#3〜F#4", difficulty: 3, vocal_type: "male", is_estimate: false, practice_tags: ["切なさ", "ファルセット", "バラード"], practice_focus: "サビの裏声への自然な抜き感。息混じりの切ない歌声を身につける。" },
  { id: "bn4", title: "クリスマスソング", artist: "back number", lowest_note: "A2", highest_note: "G#4", main_range: "D#3〜G4", difficulty: 3, vocal_type: "male", is_estimate: false, practice_tags: ["ロングトーン", "感情の盛り上がり", "中高音"], practice_focus: "Aメロの静かな語りからサビの大きな広がりへの移行。" },

  // --- Ado ---
  { id: "ad1", title: "うっせぇわ", artist: "Ado", lowest_note: "G#3", highest_note: "D5", main_range: "B3〜C#5", difficulty: 4, vocal_type: "female", is_estimate: false, practice_tags: ["がなり・声色変化", "表現力", "声量"], practice_focus: "ウィスパーからがなり声、クリアな高音まで、声色を自在にコントロールする練習に。" },
  { id: "ad2", title: "新時代", artist: "Ado", lowest_note: "G#3", highest_note: "G#5", main_range: "C#4〜E5", difficulty: 5, vocal_type: "female", is_estimate: false, practice_tags: ["超高音", "ミックスボイス練習", "ロングトーン"], practice_focus: "hihiG#に達する驚異的な高音域。ヘッドボイスとミックスボイスの極限強化に。" },
  { id: "ad3", title: "踊", artist: "Ado", lowest_note: "F#3", highest_note: "F#5", main_range: "B3〜D#5", difficulty: 5, vocal_type: "female", is_estimate: false, practice_tags: ["ダンスビート", "フェイク", "超高音"], practice_focus: "ドロップ部分のフェイクやグルーヴ感。洋楽的なリズム感とピッチの俊敏性。" },
  { id: "ad4", title: "私は最強", artist: "Ado", lowest_note: "G#3", highest_note: "F#5", main_range: "C#4〜E5", difficulty: 5, vocal_type: "female", is_estimate: false, practice_tags: ["壮大", "ベルティング", "超高音"], practice_focus: "ミュージカルのように劇的なベルティングボイスの練習に。" },

  // --- スピッツ ---
  { id: "sp1", title: "チェリー", artist: "スピッツ", lowest_note: "C3", highest_note: "F4", main_range: "D3〜E4", difficulty: 1, vocal_type: "male", is_estimate: false, practice_tags: ["安定感", "地声練習", "音程"], practice_focus: "最高音mid2Fと非常に歌いやすく、音程の安定と心地よい息の抜け感をマスターするのに最高の名曲。" },
  { id: "sp2", title: "ロビンソン", artist: "スピッツ", lowest_note: "C#3", highest_note: "A4", main_range: "E3〜G#4", difficulty: 3, vocal_type: "male", is_estimate: false, practice_tags: ["裏声", "ミックスボイス練習", "透明感"], practice_focus: "サビのhiAへの跳躍を、細く透き通るような美しいハイトーンで歌いこなす練習に。" },
  { id: "sp3", title: "空も飛べるはず", artist: "スピッツ", lowest_note: "C3", highest_note: "F4", main_range: "D3〜E4", difficulty: 1, vocal_type: "male", is_estimate: false, practice_tags: ["脱力", "音程", "初心者に最適"], practice_focus: "力まずに喉をリラックスさせたまま歌う初心者の入門曲として完璧です。" },
  { id: "sp4", title: "楓", artist: "スピッツ", lowest_note: "C3", highest_note: "A4", main_range: "E3〜G4", difficulty: 3, vocal_type: "male", is_estimate: false, practice_tags: ["美声", "バラード", "裏声"], practice_focus: "切ないハイトーンと息のコントロールの極致。" },

  // --- 福山雅治 ---
  { id: "fk1", title: "家族になろうよ", artist: "福山雅治", lowest_note: "G2", highest_note: "E4", main_range: "A2〜D4", difficulty: 1, vocal_type: "male", is_estimate: false, practice_tags: ["低音", "響き（共鳴）", "ロングトーン"], practice_focus: "深みのある低音ボイスと胸の共鳴（チェストレゾナンス）をじっくり育てるのに最も適した曲。" },
  { id: "fk2", title: "HELLO", artist: "福山雅治", lowest_note: "A2", highest_note: "F#4", main_range: "C3〜E4", difficulty: 2, vocal_type: "male", is_estimate: false, practice_tags: ["アタック", "リズム", "地声練習"], practice_focus: "小気味よいアタックと歯切れの良い発音。" },
  { id: "fk3", title: "Squall", artist: "福山雅治", lowest_note: "G2", highest_note: "E4", main_range: "A2〜C#4", difficulty: 1, vocal_type: "male", is_estimate: false, practice_tags: ["バラード", "低音の包容力", "ブレス"], practice_focus: "息混じりの暖かいトーンで語るように歌う練習。" },

  // --- YOASOBI ---
  { id: "yo1", title: "夜に駆ける", artist: "YOASOBI", lowest_note: "F3", highest_note: "F5", main_range: "C4〜D#5", difficulty: 4, vocal_type: "female", is_estimate: false, practice_tags: ["高速ピッチ", "高音", "ブレス"], practice_focus: "疾走するピアノに乗せた連続ハイトーン。腹式呼吸の瞬発力。" },
  { id: "yo2", title: "アイドル", artist: "YOASOBI", lowest_note: "G#3", highest_note: "F#5", main_range: "C4〜E5", difficulty: 5, vocal_type: "female", is_estimate: false, practice_tags: ["高音", "滑舌・ブレス", "音程"], practice_focus: "超ハイテンポな言葉数とhiF#の高音域。素早いブレスとピッチ移動の限界突破に。" },
  { id: "yo3", title: "群青", artist: "YOASOBI", lowest_note: "G3", highest_note: "F5", main_range: "C4〜D5", difficulty: 4, vocal_type: "female", is_estimate: false, practice_tags: ["合唱・声量", "高音", "ロングトーン"], practice_focus: "ラストの大サビに向かって高まるエモーションと高音発声。" },

  // --- BUMP OF CHICKEN ---
  { id: "bp1", title: "天体観測", artist: "BUMP OF CHICKEN", lowest_note: "B2", highest_note: "G4", main_range: "D3〜F#4", difficulty: 2, vocal_type: "male", is_estimate: false, practice_tags: ["リズム", "地声練習", "言葉の滑舌"], practice_focus: "中音域主体のストレートなロックボーカル。フレーズの頭にアクセントを置く練習に。" },
  { id: "bp2", title: "ray", artist: "BUMP OF CHICKEN", lowest_note: "C3", highest_note: "G#4", main_range: "D#3〜F#4", difficulty: 3, vocal_type: "male", is_estimate: false, practice_tags: ["ダンスロック", "軽快さ", "ブレス"], practice_focus: "四つ打ちに乗せた跳ねるようなステップアップ練習。" },
  { id: "bp3", title: "SOUVENIR", artist: "BUMP OF CHICKEN", lowest_note: "C3", highest_note: "G4", main_range: "E3〜F#4", difficulty: 2, vocal_type: "male", is_estimate: false, practice_tags: ["心地よいリズム", "脱力", "音程"], practice_focus: "軽快なポップスを力まずリラックスして歌う。" },

  // --- RADWIMPS ---
  { id: "rd1", title: "前前前世", artist: "RADWIMPS", lowest_note: "C#3", highest_note: "G#4", main_range: "E3〜G#4", difficulty: 3, vocal_type: "male", is_estimate: false, practice_tags: ["スピード感", "高音", "滑舌"], practice_focus: "ハイスピードな譜割りとサビのmid2G#連打。息切れしないスタミナ養成に。" },
  { id: "rd2", title: "なんでもないや", artist: "RADWIMPS", lowest_note: "B2", highest_note: "A4", main_range: "D3〜G4", difficulty: 3, vocal_type: "male", is_estimate: false, practice_tags: ["ファルセット", "バラード", "表現力"], practice_focus: "透き通るウィスパーボイスとサビの感動的な広がり。" },
  { id: "rd3", title: "スパークル", artist: "RADWIMPS", lowest_note: "A#2", highest_note: "G#4", main_range: "D#3〜F#4", difficulty: 3, vocal_type: "male", is_estimate: false, practice_tags: ["ロングトーン", "美声", "ピアノ伴奏"], practice_focus: "壮大なピアノに寄り添う伸びやかな声の出し方。" },

  // --- 星野源 ---
  { id: "hg1", title: "恋", artist: "星野源", lowest_note: "C3", highest_note: "A4", main_range: "E3〜G4", difficulty: 3, vocal_type: "male", is_estimate: false, practice_tags: ["裏声切り替え", "ダンスビート", "ハッピー"], practice_focus: "Bメロとサビのファルセットへの心地よい切り替え。" },
  { id: "hg2", title: "喜劇", artist: "星野源", lowest_note: "A#2", highest_note: "G4", main_range: "D3〜F4", difficulty: 2, vocal_type: "male", is_estimate: false, practice_tags: ["ソウル・R&B", "脱力", "ウィスパー"], practice_focus: "力を完全に抜いたソウルフルな歌声のトレーニング。" },

  // --- ONE OK ROCK ---
  { id: "oor1", title: "Wherever you are", artist: "ONE OK ROCK", lowest_note: "C#3", highest_note: "A4", main_range: "E3〜G#4", difficulty: 4, vocal_type: "male", is_estimate: false, practice_tags: ["英語発音", "ミックスボイス練習", "バラード"], practice_focus: "洋楽的な母音の響きと、サビの太いハイトーンミックス。" },
  { id: "oor2", title: "完全感覚Dreamer", artist: "ONE OK ROCK", lowest_note: "D3", highest_note: "A#4", main_range: "G3〜A4", difficulty: 5, vocal_type: "male", is_estimate: false, practice_tags: ["シャウト", "超高音", "激しいロック"], practice_focus: "圧倒的な呼気圧と喉を壊さない歪み（ディストーション）発声。" },

  // --- 椎名林檎 / 東京事変 ---
  { id: "sr1", title: "丸ノ内サディスティック", artist: "椎名林檎", lowest_note: "A3", highest_note: "D#5", main_range: "C4〜C5", difficulty: 3, vocal_type: "female", is_estimate: false, practice_tags: ["地声→裏声の切り替え", "グルーヴ感", "音程"], practice_focus: "Bメロからサビにかけての裏声への素早い移行と、独特の跳ねるリズムキープ。" },
  { id: "sr2", title: "本能", artist: "椎名林檎", lowest_note: "G#3", highest_note: "D5", main_range: "B3〜C#5", difficulty: 4, vocal_type: "female", is_estimate: false, practice_tags: ["巻き舌・がなり", "声量", "色気"], practice_focus: "声帯の強いアタックと息のスピード感。" },
  { id: "sr3", title: "群青日和", artist: "東京事変", lowest_note: "A3", highest_note: "D#5", main_range: "C4〜D5", difficulty: 4, vocal_type: "female", is_estimate: false, practice_tags: ["パンクロック", "ストレート", "スピード"], practice_focus: "疾走するギターに乗せて抜けの良い地声で突き抜ける。" },

  // --- 宇多田ヒカル ---
  { id: "ut1", title: "First Love", artist: "宇多田ヒカル", lowest_note: "G3", highest_note: "D5", main_range: "A3〜C5", difficulty: 3, vocal_type: "female", is_estimate: false, practice_tags: ["ビブラート", "息混じり", "フェイク"], practice_focus: "繊細な息漏れトーンと細やかなビブラート、R&Bフェイクの入門。" },
  { id: "ut2", title: "One Last Kiss", artist: "宇多田ヒカル", lowest_note: "F#3", highest_note: "D5", main_range: "A3〜B4", difficulty: 3, vocal_type: "female", is_estimate: false, practice_tags: ["中音域の響き", "シンセポップ", "リズム"], practice_focus: "淡々としながらも引き込まれる中音域の倍音作り。" },

  // --- 定番バラード＆名曲 ---
  { id: "cl1", title: "小さな恋のうた", artist: "MONGOL800", lowest_note: "C3", highest_note: "F4", main_range: "D3〜E4", difficulty: 1, vocal_type: "male", is_estimate: false, practice_tags: ["地声練習", "安定感", "リズム"], practice_focus: "最高音mid2Fと歌いやすいキー。カラオケで誰でも盛り上がれる王道。" },
  { id: "cl2", title: "残酷な天使のテーゼ", artist: "高橋洋子", lowest_note: "G#3", highest_note: "D#5", main_range: "B3〜C#5", difficulty: 3, vocal_type: "female", is_estimate: false, practice_tags: ["声量", "ロングトーン", "地声練習"], practice_focus: "芯のある声を前へ飛ばす、アタックとビブラートの基礎。" },
  { id: "cl3", title: "奏（かなで）", artist: "スキマスイッチ", lowest_note: "C3", highest_note: "G#4", main_range: "D#3〜F#4", difficulty: 3, vocal_type: "male", is_estimate: false, practice_tags: ["バラード", "高音", "裏声"], practice_focus: "大サビの最高音mid2G#の歌い上げと切ない裏声の切り替え。" },
  { id: "cl4", title: "粉雪", artist: "レミオロメン", lowest_note: "A2", highest_note: "A4", main_range: "D3〜G4", difficulty: 4, vocal_type: "male", is_estimate: false, practice_tags: ["サビの張り上げ", "声量", "スタミナ"], practice_focus: "サビ頭のhiAのアタック。喉を絞めずに叫ぶための腹筋の支え。" },
  { id: "cl5", title: "3月9日", artist: "レミオロメン", lowest_note: "A#2", highest_note: "F#4", main_range: "D3〜E4", difficulty: 2, vocal_type: "male", is_estimate: false, practice_tags: ["中音域", "語り", "優しさ"], practice_focus: "最高音mid2F#と歌いやすく、卒業ソング・感謝の歌唱に最適。" },
  { id: "cl6", title: "糸", artist: "中島みゆき", lowest_note: "F3", highest_note: "C5", main_range: "A3〜A#4", difficulty: 2, vocal_type: "female", is_estimate: false, practice_tags: ["息の支え", "ロングトーン", "名曲"], practice_focus: "言葉の重みと安定した母音の響きを保つ。" },
  { id: "cl7", title: "ハナミズキ", artist: "一青窈", lowest_note: "F#3", highest_note: "C#5", main_range: "A3〜B4", difficulty: 2, vocal_type: "female", is_estimate: false, practice_tags: ["こぶし・ビブラート", "バラード", "ブレス"], practice_focus: "独特の揺れと音程のニュアンス表現。" },
  { id: "cl8", title: "Everything", artist: "MISIA", lowest_note: "G#3", highest_note: "E5", main_range: "C4〜D5", difficulty: 5, vocal_type: "female", is_estimate: false, practice_tags: ["圧倒的声量", "超高音", "ベルティング"], practice_focus: "日本屈指の本格派ディーヴァ曲。胸声から頭声までの豊かな鳴り。" },
  { id: "cl9", title: "さよならエレジー", artist: "菅田将暉", lowest_note: "B2", highest_note: "G#4", main_range: "E3〜F#4", difficulty: 3, vocal_type: "male", is_estimate: false, practice_tags: ["アタック", "ロック", "声量"], practice_focus: "しゃくりと力強いアタックで推進力を生み出す。" },
  { id: "cl10", title: "虹", artist: "菅田将暉", lowest_note: "A2", highest_note: "G4", main_range: "D3〜F#4", difficulty: 2, vocal_type: "male", is_estimate: false, practice_tags: ["温かい声", "バラード", "脱力"], practice_focus: "最高音mid2G。力まない素朴で温かいトーン作り。" },
  { id: "cl11", title: "シンデレラボーイ", artist: "Saucy Dog", lowest_note: "C3", highest_note: "A#4", main_range: "F3〜G#4", difficulty: 4, vocal_type: "male", is_estimate: false, practice_tags: ["超高音", "ミックスボイス練習", "女性キー"], practice_focus: "男性ボーカルとしては非常に高いhiA#。高い呼気圧と薄い声帯の接触。" },
  { id: "cl12", title: "アゲハ蝶", artist: "ポルノグラフィティ", lowest_note: "C3", highest_note: "G#4", main_range: "D3〜F#4", difficulty: 3, vocal_type: "male", is_estimate: false, practice_tags: ["ラテンリズム", "滑舌", "ブレス"], practice_focus: "言葉数が多く歯切れの良い発音と、サビの力強い高音。" },
  { id: "cl13", title: "サウダージ", artist: "ポルノグラフィティ", lowest_note: "B2", highest_note: "A4", main_range: "E3〜G4", difficulty: 3, vocal_type: "male", is_estimate: false, practice_tags: ["哀愁", "情熱", "高音"], practice_focus: "ラテンの哀愁あるメロディとhiAの力強いロングトーン。" },
  { id: "cl14", title: "紅蓮華", artist: "LiSA", lowest_note: "G#3", highest_note: "E5", main_range: "B3〜C#5", difficulty: 4, vocal_type: "female", is_estimate: false, practice_tags: ["ロック", "声量", "高音"], practice_focus: "パンチの効いたアタックとサビの高音hiEの迫力。" },
  { id: "cl15", title: "炎", artist: "LiSA", lowest_note: "G3", highest_note: "D5", main_range: "A3〜C5", difficulty: 3, vocal_type: "female", is_estimate: false, practice_tags: ["バラード", "壮大", "ビブラート"], practice_focus: "深みのある低音からサビの切ない叫びまで。" },
  { id: "cl16", title: "ただ君に晴れ", artist: "ヨルシカ", lowest_note: "A3", highest_note: "D5", main_range: "C4〜C5", difficulty: 3, vocal_type: "female", is_estimate: false, practice_tags: ["透明感", "跳ねるリズム", "息遣い"], practice_focus: "涼しげなウィスパートーンと正確なピッチ移動。" },
  { id: "cl17", title: "秒針を噛む", artist: "ずっと真夜中でいいのに。", lowest_note: "G#3", highest_note: "E5", main_range: "B3〜D#5", difficulty: 4, vocal_type: "female", is_estimate: false, practice_tags: ["早口", "裏声", "グルーヴ"], practice_focus: "高難度のリズムとオクターブ跳躍。" },
  { id: "cl18", title: "廻廻奇譚", artist: "Eve", lowest_note: "C#3", highest_note: "A#4", main_range: "F3〜G#4", difficulty: 4, vocal_type: "male", is_estimate: false, practice_tags: ["ダーク", "ハイトーン", "高速"], practice_focus: "低音の呟きからサビのハイテンションな叫びへ。" },
  { id: "cl19", title: "ダーリン", artist: "須田景凪", lowest_note: "C#3", highest_note: "C5", main_range: "F3〜A#4", difficulty: 4, vocal_type: "male", is_estimate: true, practice_tags: ["高音", "地声→裏声の切り替え", "リズム"], practice_focus: "リズミカルな譜割りと急激なオクターブ跳躍。" }
];
