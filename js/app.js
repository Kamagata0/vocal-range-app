// VocalAI アプリケーション統合スクリプト
// ローカルファイル直接オープン (file://) でもローカルサーバー (http://) でも完全動作するように設計

(function () {
  'use strict';

  // ================= 1. カラオケ定番・人気楽曲データベース =================
  const BUILTIN_SONGS = [
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

  // ================= 2. 音名・音域ユーティリティ =================
  const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  function getKaraokeNoteName(midiNote) {
    if (!midiNote || midiNote < 24 || midiNote > 96) return '';
    const noteIndex = ((midiNote % 12) + 12) % 12;
    const noteName = NOTE_NAMES[noteIndex];
    // 日本のカラオケ音域体系は「A（ラ）」でオクターブ接頭辞が切り替わる（A4=hiA, A#4=hiA#, B4=hiB, A3=mid2A, A2=mid1A）
    const kOctave = Math.floor((midiNote - 9) / 12);
    if (kOctave === 1) return `lowlow${noteName}`;
    if (kOctave === 2) return `low${noteName}`;
    if (kOctave === 3) return `mid1${noteName}`;
    if (kOctave === 4) return `mid2${noteName}`;
    if (kOctave === 5) return `hi${noteName}`;
    if (kOctave === 6) return `hihi${noteName}`;
    if (kOctave >= 7) return `hihihi${noteName}`;
    return `${noteName}`;
  }

  function noteToMidi(noteStr) {
    if (!noteStr || typeof noteStr !== 'string') return null;
    const match = noteStr.trim().toUpperCase().match(/^([A-G]#?)(-?\d+)$/);
    if (!match) return null;
    const note = match[1];
    const octave = parseInt(match[2], 10);
    const noteIndex = NOTE_NAMES.indexOf(note);
    if (noteIndex === -1) return null;
    return (octave + 1) * 12 + noteIndex;
  }

  function midiToNote(midi) {
    if (typeof midi !== 'number' || isNaN(midi)) return '';
    const noteIndex = ((midi % 12) + 12) % 12;
    const octave = Math.floor(midi / 12) - 1;
    return `${NOTE_NAMES[noteIndex]}${octave}`;
  }

  function formatKaraokeNote(noteStr) {
    if (!noteStr) return '';
    const midi = typeof noteStr === 'number' ? noteStr : noteToMidi(noteStr);
    if (!midi) return noteStr;
    return getKaraokeNoteName(midi) || noteStr;
  }

  function formatFullNote(noteStr) {
    if (!noteStr) return '';
    const midi = typeof noteStr === 'number' ? noteStr : noteToMidi(noteStr);
    if (!midi) return noteStr;
    const standard = midiToNote(midi);
    const karaoke = getKaraokeNoteName(midi);
    return karaoke ? `${karaoke} (${standard})` : standard;
  }

  function getAvailableNotes(minNote = 'C2', maxNote = 'C6') {
    const minMidi = noteToMidi(minNote) || 36;
    const maxMidi = noteToMidi(maxNote) || 84;
    const list = [];
    for (let m = minMidi; m <= maxMidi; m++) {
      const note = midiToNote(m);
      const karaoke = getKaraokeNoteName(m);
      list.push({
        midi: m,
        name: note,
        label: `${karaoke} (${note})`,
        karaoke
      });
    }
    return list;
  }

  function calculateCompatibility(userProfile, song) {
    if (!userProfile || !userProfile.chest_high) {
      return {
        status: 'unknown',
        badgeClass: 'bg-slate-800 text-slate-300 border-slate-700',
        title: '音域未登録',
        reason: '音域を登録すると、あなたとの相性が自動判定されます。',
        recommendedKey: 0
      };
    }

    const songHigh = noteToMidi(song.highest_note);
    const songLow = noteToMidi(song.lowest_note);
    const userChestHigh = noteToMidi(userProfile.chest_high);
    const userChestLow = noteToMidi(userProfile.chest_low || 'C3');
    const userFalsettoHigh = noteToMidi(userProfile.falsetto_high || userProfile.chest_high);

    if (!songHigh || !songLow || !userChestHigh) {
      return {
        status: 'unknown',
        badgeClass: 'bg-slate-800 text-slate-300 border-slate-700',
        title: '判定不可',
        reason: '音域データが不足しています。',
        recommendedKey: 0
      };
    }

    const highDiff = songHigh - userChestHigh;
    const lowDiff = songLow - userChestLow;

    let title = '';
    let badgeClass = '';
    let reason = '';
    let recommendedKey = 0;

    if (highDiff > 0) {
      recommendedKey = -highDiff;
    } else if (highDiff < -4) {
      recommendedKey = Math.min(4, Math.abs(highDiff) - 2);
    }

    const songHighK = formatKaraokeNote(song.highest_note);
    const songLowK = formatKaraokeNote(song.lowest_note);
    const userHighK = formatKaraokeNote(userProfile.chest_high);
    const userLowK = formatKaraokeNote(userProfile.chest_low);
    const userFalsettoHighK = formatKaraokeNote(userProfile.falsetto_high);

    if (highDiff <= 0 && lowDiff >= 0) {
      title = '歌いやすそう';
      badgeClass = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      reason = `曲の最高音(${songHighK})・最低音(${songLowK})があなたの地声の範囲内に無理なく収まっています。原曲キーで気持ちよく歌えそうです！`;
    } else if (highDiff > 0 && songHigh <= userFalsettoHigh) {
      title = '裏声を活用すると歌いやすそう';
      badgeClass = 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      reason = `最高音(${songHighK})は地声最高音(${userHighK})より${highDiff}半音高めですが、あなたの裏声音域(${userFalsettoHighK})ならカバーできます。サビのファルセット・ミックスボイス練習に最適です。`;
    } else if (highDiff >= 1 && highDiff <= 2) {
      title = 'やや高め';
      badgeClass = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      reason = `あなたの最高音(${userHighK})より曲の最高音が${highDiff}半音高いため、サビの高音部分は少し張る必要があります。キーを${recommendedKey}にするか、少しの高音練習で歌える範囲です。`;
    } else if (highDiff >= 3 && highDiff <= 5) {
      title = '高音練習向け';
      badgeClass = 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      reason = `あなたの最高音(${userHighK})より${highDiff}音(半音)高く、現状では高音がきつく感じやすい曲です。キーを${recommendedKey}に下げるか、高音域を広げるステップアップ練習にぴったりです。`;
    } else if (highDiff > 5) {
      title = '難易度高め';
      badgeClass = 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      reason = `曲の最高音(${songHighK})が地声最高音より${highDiff}半音離れており、原曲キーの難易度はかなり高めです。キーを${recommendedKey}前後下げるか、ファルセットの強化が必要です。`;
    } else if (lowDiff < 0) {
      title = '低音練習向け';
      badgeClass = 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      reason = `曲の最低音(${songLowK})があなたの最低音(${userLowK})より${Math.abs(lowDiff)}半音低いです。低音の響きを意識した練習に活用できます。`;
    } else {
      title = '歌いやすそう';
      badgeClass = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      reason = 'あなたの音域にバランスよく適合しています。';
    }

    return {
      title,
      badgeClass,
      reason,
      recommendedKey,
      highDiff,
      lowDiff
    };
  }

  // ================= 3. ストレージ管理（マイ楽曲登録対応） =================
  const STORAGE_KEYS = {
    USER_PROFILE: 'vocal_range_user_profile',
    PRACTICE_LOGS: 'vocal_range_practice_logs',
    CUSTOM_SONGS: 'vocal_range_custom_songs'
  };

  const DEFAULT_PROFILE = {
    id: 'guest-user',
    name: 'シンガー',
    gender: 'male',
    chest_low: 'C3',
    chest_high: 'G4',
    falsetto_low: 'E4',
    falsetto_high: 'C5',
    weak_points: ['高音になると喉が締まる', '地声と裏声のつながり'],
    practice_goals: ['ミックスボイスの習得', 'hiAを安定して出したい']
  };

  function getUserProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (!data) return DEFAULT_PROFILE;
      return JSON.parse(data);
    } catch (e) {
      return DEFAULT_PROFILE;
    }
  }

  function saveUserProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
      return true;
    } catch (e) {
      return false;
    }
  }

  function getCustomSongs() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_SONGS);
      if (!data) return [];
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  }

  function addCustomSong(song) {
    try {
      const list = getCustomSongs();
      const newSong = {
        id: 'custom-' + Date.now(),
        is_custom: true,
        is_estimate: true,
        ...song
      };
      list.unshift(newSong);
      localStorage.setItem(STORAGE_KEYS.CUSTOM_SONGS, JSON.stringify(list));
      return newSong;
    } catch (e) {
      return null;
    }
  }

  function deleteCustomSong(songId) {
    try {
      const list = getCustomSongs().filter(s => s.id !== songId);
      localStorage.setItem(STORAGE_KEYS.CUSTOM_SONGS, JSON.stringify(list));
      return true;
    } catch (e) {
      return false;
    }
  }

  // 全楽曲（組み込み＋ユーザー追加曲）
  function getAllSongs() {
    return [...getCustomSongs(), ...BUILTIN_SONGS];
  }

  function getPracticeLogs() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRACTICE_LOGS);
      if (!data) {
        const initialLogs = [
          {
            id: 'log-sample-1',
            song_id: 'v1',
            song_title: '怪獣の花唄',
            artist: 'Vaundy',
            date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
            duration: 25,
            highest_note: 'G4',
            lowest_note: 'D3',
            hard_parts: 'サビの連続する高音で息が続かなかった',
            memo: '喉を開く意識をしたら少し楽に出た。',
            ai_advice: 'サビの高音は息を押し出すのではなく、腹圧を一定に保ちながら上あごに響かせる意識を持つと喉が疲れにくくなります！'
          }
        ];
        localStorage.setItem(STORAGE_KEYS.PRACTICE_LOGS, JSON.stringify(initialLogs));
        return initialLogs;
      }
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  }

  function addPracticeLog(log) {
    try {
      const logs = getPracticeLogs();
      const newLog = {
        id: 'log-' + Date.now(),
        created_at: new Date().toISOString(),
        ...log
      };
      logs.unshift(newLog);
      localStorage.setItem(STORAGE_KEYS.PRACTICE_LOGS, JSON.stringify(logs));
      return newLog;
    } catch (e) {
      return null;
    }
  }

  function deletePracticeLog(id) {
    try {
      const logs = getPracticeLogs().filter(item => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.PRACTICE_LOGS, JSON.stringify(logs));
      return true;
    } catch (e) {
      return false;
    }
  }

  // ================= 4. AI音域推定ロジック =================
  function estimateSongVocalRange(title, artist, vocalType) {
    const isFemale = vocalType === 'female' || 
                     ['tuki.', 'Aimer', 'Ado', 'YOASOBI', 'あいみょん', '椎名林檎', '宇多田ヒカル', 'MISIA', 'ヨルシカ', 'ずっと真夜中でいいのに。', '緑黄色社会', 'LiSA', 'milet', 'yama', 'Superfly', '絢香'].some(a => artist.includes(a));

    let lowestNote = isFemale ? 'G3' : 'C3';
    let highestNote = isFemale ? 'D#5' : 'A4';
    let difficulty = 3;
    let practiceTags = ['高音', '安定感', '音程'];

    // キーワード判定
    const text = (title + ' ' + artist).toLowerCase();
    if (text.includes('バラード') || text.includes('愛') || text.includes('恋') || text.includes('歌') || text.includes('letter') || text.includes('first')) {
      difficulty = isFemale ? 2 : 2;
      practiceTags = ['バラード', '表現力', 'ロングトーン'];
      if (!isFemale) highestNote = 'G4';
    } else if (text.includes('rock') || text.includes('night') || text.includes('踊') || text.includes('kick') || text.includes('炎') || text.includes('新時代')) {
      difficulty = 4;
      highestNote = isFemale ? 'F5' : 'A#4';
      practiceTags = ['高音', '声量', 'ミックスボイス練習'];
    }

    if (artist.includes('Official髭男dism') || artist.includes('Mrs. GREEN APPLE') || artist.includes('King Gnu')) {
      highestNote = 'C5';
      difficulty = 5;
      practiceTags = ['超高音', 'ミックスボイス練習', '裏声'];
    }

    return {
      title,
      artist,
      lowest_note: lowestNote,
      highest_note: highestNote,
      main_range: `${lowestNote}〜${highestNote}`,
      difficulty,
      vocal_type: isFemale ? 'female' : 'male',
      is_estimate: true,
      practice_tags: practiceTags,
      practice_focus: `AIによる音域推定データです。サビの高音（${highestNote}）とAメロの低音の響きを意識して練習してみましょう。`
    };
  }

  // ================= 5. ピッチ検出 =================
  let audioContext = null;
  let analyser = null;
  let mediaStream = null;
  let isListening = false;
  let rafId = null;

  function frequencyToMidi(freq) {
    return Math.round(69 + 12 * Math.log2(freq / 440));
  }

  function autoCorrelate(buf, sampleRate) {
    const SIZE = buf.length;
    let rms = 0;
    for (let i = 0; i < SIZE; i++) {
      const val = buf[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    // ノイズゲート：息や微小環境音をカット
    if (rms < 0.02) return -1;

    let r1 = 0;
    let r2 = SIZE - 1;
    const thres = 0.2;
    for (let i = 0; i < SIZE / 2; i++) {
      if (Math.abs(buf[i]) < thres) {
        r1 = i;
        break;
      }
    }
    for (let i = 1; i < SIZE / 2; i++) {
      if (Math.abs(buf[SIZE - i]) < thres) {
        r2 = SIZE - i;
        break;
      }
    }

    buf = buf.slice(r1, r2);
    const newSize = buf.length;
    const c = new Array(newSize).fill(0);
    for (let i = 0; i < newSize; i++) {
      for (let j = 0; j < newSize - i; j++) {
        c[i] = c[i] + buf[j] * buf[j + i];
      }
    }

    let d = 0;
    while (c[d] > c[d + 1]) d++;
    let maxval = -1;
    let maxpos = -1;
    for (let i = d; i < newSize; i++) {
      if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
      }
    }

    // 周期的（音程感があるか）の厳密判定：息や摩擦音などの非周期ノイズをカット
    if (c[0] <= 0 || (maxval / c[0]) < 0.78) return -1;

    let T0 = maxpos;
    const x1 = c[T0 - 1];
    const x2 = c[T0];
    const x3 = c[T0 + 1];
    const a = (x1 + x3 - 2 * x2) / 2;
    const b = (x3 - x1) / 2;
    if (a) T0 = T0 - b / (2 * a);
    return sampleRate / T0;
  }

  async function startPitchDetection(onPitchDetected, onError) {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        onError('このブラウザは音声解析に対応していません。');
        return false;
      }
      mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
      });
      audioContext = new AudioContextClass();
      const source = audioContext.createMediaStreamSource(mediaStream);
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);

      const buffer = new Float32Array(analyser.fftSize);
      isListening = true;

      function updatePitch() {
        if (!isListening) return;
        analyser.getFloatTimeDomainData(buffer);
        const freq = autoCorrelate(buffer, audioContext.sampleRate);
        if (freq !== -1 && freq >= 65 && freq <= 1100) {
          const midi = frequencyToMidi(freq);
          if (midi >= 36 && midi <= 84) {
            const noteName = midiToNote(midi);
            const karaokeName = getKaraokeNoteName(midi);
            onPitchDetected({ frequency: Math.round(freq), midi, noteName, karaokeName });
          }
        }
        rafId = requestAnimationFrame(updatePitch);
      }
      updatePitch();
      return true;
    } catch (err) {
      onError('マイクへのアクセスが拒否されたか、マイクが見つかりませんでした。ブラウザの設定でマイクを許可してください。');
      return false;
    }
  }

  function stopPitchDetection() {
    isListening = false;
    if (rafId) cancelAnimationFrame(rafId);
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      mediaStream = null;
    }
    if (audioContext && audioContext.state !== 'closed') {
      audioContext.close();
      audioContext = null;
    }
  }

  // ================= 6. AIアドバイザー =================
  function generatePracticeAdvice(songTitle, hardPart, highestNote, userProfile) {
    const parts = hardPart || '';
    const high = highestNote || userProfile?.chest_high || 'G4';

    if (parts.includes('裏声') || parts.includes('切り替え') || parts.includes('換声点')) {
      return `「${songTitle}」の裏声切り替えは多くの人が躓くポイントです。まずは「リップロール（唇をプルプル震わせる発声）」で低音から高音まで滑らかに音程を繋ぐ練習を行い、喉仏が急激に上下しない感覚を掴みましょう。`;
    }
    if (parts.includes('息') || parts.includes('スタミナ') || parts.includes('続かない')) {
      return `息が苦しくなる時は、息を吸いすぎているか、声帯が開きすぎて息が漏れていることが多いです。お腹の支え（ドローインの感覚）を意識し、「すっ」と短く息を吐ききってから自然に吸うブレス練習を取り入れてみてください。`;
    }
    if (parts.includes('喉') || parts.includes('締まる') || parts.includes('苦しい')) {
      return `高音（${high}付近）で喉が締まる時は、あくびの初期動作のように軟口蓋（上あごの奥の柔らかい部分）を少し上げ、舌の力を抜く「喉を開く」フォームを意識してください。音量を無理に出そうとせず、ハミングから始めると効果的です。`;
    }
    return `最高音${high}の安定には、体幹の安定とリラックスが不可欠です。まずは無理に原キーで張り上げず、少しキーを下げて力みのない発声フォームを身体に覚え込ませてから段階的にキーを戻していく練習が上達への最短ルートです！`;
  }

  function generateAIChatResponse(query, userProfile) {
    const q = query.toLowerCase();
    if (q.includes('痛') || q.includes('枯れ') || q.includes('出血') || q.includes('ガラガラ') || q.includes('違和感')) {
      return `【注意】声帯や喉に痛み・強い嗄声（ガラガラ声）がある場合は、無理な発声を直ちに中止し、十分に喉を休めてください。症状が数日以上続く場合は、自己判断での練習は避け、耳鼻咽喉科（音声外来）の受診を強くおすすめします。回復後は脱力したハミングから少しずつ再開しましょう。`;
    }
    if (q.includes('裏声') && (q.includes('地声') || q.includes('つながらない') || q.includes('ミックス'))) {
      return `【地声と裏声をつなぐ（ミックスボイス）ステップ】<br>
1. <strong>ファルセット（綺麗な裏声）の強化</strong><br>
   息漏れのある裏声から、少し芯のある裏声（ヘッドボイス）を出せるようにします。「フクロウの鳴き真似（ホーホー）」が効果的です。<br>
2. <strong>エッジボイスの導入</strong><br>
   「あ゛あ゛あ゛」と呪怨のような声帯閉鎖の感覚を掴みます。<br>
3. <strong>裏声にエッジを混ぜる</strong><br>
   裏声を出したまま、少しずつ声帯を閉じて芯を作っていきます。<br>
あなたの登録音域（${userProfile.chest_high}〜${userProfile.falsetto_high}）の間がブリッジ（換声点）ですので、この帯域をゆっくりスライドさせる練習を毎日5分続けてみてください！`;
    }
    if (q.includes('高音') || q.includes('出ない') || q.includes('高く')) {
      return `【高音を無理なく伸ばすための3つのポイント】<br>
1. <strong>顎を上げない（むしろ少し引く）</strong><br>
   高い音を出そうとすると顎が上がり、喉が締まりやすくなります。目線はまっすぐか、少し下を意識しましょう。<br>
2. <strong>母音の修正（ナローイング）</strong><br>
   「ア」の口で高音を出すと喉に負担がかかります。「オ」や「ウ」の深めの口の形を意識して高音に入ると、声帯が薄く伸びやすくなります。<br>
3. <strong>あなたの音域（地声${userProfile.chest_high}）について</strong><br>
   ここから上の音は「地声のまま張り上げる」のではなく、「裏声の筋肉を混ぜる感覚」へ移行していくと、喉を傷めずに最高音を更新できます。`;
    }
    if (q.includes('声量') || q.includes('大きい声') || q.includes('通る声')) {
      return `【喉を痛めずに声量を2倍にする響き（共鳴）のコツ】<br>
声量は「息の力」ではなく「声の響く空間（共鳴腔）」で作ります。<br>
1. <strong>ハミング練習</strong><br>
   口を閉じて「ンーー」と発声し、鼻の頭や唇がビリビリ振動する感覚を確認します。<br>
2. <strong>マイク乗りを良くする</strong><br>
   口先で大声を出すのではなく、上あごの骨に声を当てる意識を持つと、カラオケのマイクにしっかり芯のある声が通るようになります。`;
    }
    return `ご質問ありがとうございます！現在のあなたの音域（地声: ${userProfile.chest_low}〜${userProfile.chest_high}、裏声: ${userProfile.falsetto_low}〜${userProfile.falsetto_high}）を基準に考えると、まずは得意な中音域で安定した呼気圧（息の支え）を作り、そこから半音ずつ上下に広げていくのが最も近道です。<br>
具体的に「この曲の歌い方を知りたい」「○○の音が出にくい」など、より詳しい状況を教えていただければピンポイントでアドバイスします！`;
  }

  // ================= 7. アプリケーション コントローラー =================
  let currentFilter = 'all';
  let selectedHighestFilter = 'all';
  let selectedArtist = '';
  let isMicRunning = false;
  let currentMicMode = 'chest'; // 'chest' または 'falsetto'
  let detectedMinMidi = null;
  let detectedMaxMidi = null;
  let growthChartInstance = null;
  let currentKeyShift = 0;
  let currentModalSong = null;
  let audioCtx = null;

  // ピアノ・基準音シンセサイザー（Web Audio API）
  function playPitchTone(midiNote, duration = 1.0) {
    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtxClass) return;
      if (!audioCtx) audioCtx = new AudioCtxClass();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const freq = 440 * Math.pow(2, (midiNote - 69) / 12);
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.35, audioCtx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio tone error:', e);
    }
  }

  function initApp() {
    const elements = {
      navItems: document.querySelectorAll('.nav-item'),
      views: {
        'view-home': document.getElementById('view-home'),
        'view-songs': document.getElementById('view-songs'),
        'view-range': document.getElementById('view-range'),
        'view-practice': document.getElementById('view-practice'),
        'view-ai': document.getElementById('view-ai')
      },
      headerUserRange: document.getElementById('header-user-range'),
      btnQuickProfile: document.getElementById('btn-quick-profile'),
      homeChestRange: document.getElementById('home-chest-range'),
      homeChestKaraoke: document.getElementById('home-chest-karaoke'),
      homeFalsettoRange: document.getElementById('home-falsetto-range'),
      homeFalsettoKaraoke: document.getElementById('home-falsetto-karaoke'),
      homeRangeBar: document.getElementById('home-range-bar'),
      homeRecommendedSongs: document.getElementById('home-recommended-songs'),
      btnHomeMeasure: document.getElementById('btn-home-measure'),
      btnHomeFind: document.getElementById('btn-home-find'),
      btnHomeEditRange: document.getElementById('btn-home-edit-range'),
      btnHomeSeeAllSongs: document.getElementById('btn-home-see-all-songs'),
      btnQuickSearch: document.getElementById('btn-quick-search'),
      btnQuickPractice: document.getElementById('btn-quick-practice'),
      btnQuickAi: document.getElementById('btn-quick-ai'),
      
      // 曲一覧・検索
      btnOpenAddSongModal: document.getElementById('btn-open-add-song-modal'),
      songSearchInput: document.getElementById('song-search-input'),
      artistFilterSelect: document.getElementById('artist-filter-select'),
      btnClearArtistFilter: document.getElementById('btn-clear-artist-filter'),
      filterChips: document.querySelectorAll('.filter-chip'),
      songListContainer: document.getElementById('song-list-container'),

      // 曲追加モーダル
      modalAddSong: document.getElementById('modal-add-song'),
      btnCloseAddSongModal: document.getElementById('btn-close-add-song-modal'),
      tabAddAi: document.getElementById('tab-add-ai'),
      tabAddManual: document.getElementById('tab-add-manual'),
      formAiAddSong: document.getElementById('form-ai-add-song'),
      aiSongTitle: document.getElementById('ai-song-title'),
      aiSongArtist: document.getElementById('ai-song-artist'),
      aiSongVocalType: document.getElementById('ai-song-vocal-type'),
      formManualAddSong: document.getElementById('form-manual-add-song'),
      manualSongTitle: document.getElementById('manual-song-title'),
      manualSongArtist: document.getElementById('manual-song-artist'),
      manualSongLow: document.getElementById('manual-song-low'),
      manualSongHigh: document.getElementById('manual-song-high'),
      manualSongVocalType: document.getElementById('manual-song-vocal-type'),
      manualSongDiff: document.getElementById('manual-song-diff'),
      manualSongTags: document.getElementById('manual-song-tags'),

      // 音域・マイク
      btnMicModeChest: document.getElementById('btn-mic-mode-chest'),
      btnMicModeFalsetto: document.getElementById('btn-mic-mode-falsetto'),
      btnToggleMic: document.getElementById('btn-toggle-mic'),
      micDetectedNote: document.getElementById('mic-detected-note'),
      micKaraokeNote: document.getElementById('mic-karaoke-note'),
      micMinNote: document.getElementById('mic-min-note'),
      micMaxNote: document.getElementById('mic-max-note'),
      micMinLabel: document.getElementById('mic-min-label'),
      micMaxLabel: document.getElementById('mic-max-label'),
      micStatusMsg: document.getElementById('mic-status-msg'),
      rangeProfileForm: document.getElementById('range-profile-form'),
      inputName: document.getElementById('input-name'),
      selectGender: document.getElementById('select-gender'),
      selectChestLow: document.getElementById('select-chest-low'),
      selectChestHigh: document.getElementById('select-chest-high'),
      selectFalsettoLow: document.getElementById('select-falsetto-low'),
      selectFalsettoHigh: document.getElementById('select-falsetto-high'),
      inputWeakness: document.getElementById('input-weakness'),
      inputGoal: document.getElementById('input-goal'),

      // 練習記録
      practiceLogsContainer: document.getElementById('practice-logs-container'),
      btnOpenLogModal: document.getElementById('btn-open-log-modal'),
      btnCloseLogModal: document.getElementById('btn-close-log-modal'),
      modalPracticeLog: document.getElementById('modal-practice-log'),
      formAddPractice: document.getElementById('form-add-practice'),
      logInputSong: document.getElementById('log-input-song'),
      logInputDate: document.getElementById('log-input-date'),
      logInputDuration: document.getElementById('log-input-duration'),
      logSelectLow: document.getElementById('log-select-low'),
      logSelectHigh: document.getElementById('log-select-high'),
      logInputHard: document.getElementById('log-input-hard'),
      logInputMemo: document.getElementById('log-input-memo'),

      // 楽曲詳細モーダル
      btnOpenQrModal: document.getElementById('btn-open-qr-modal'),
      modalQr: document.getElementById('modal-qr'),
      btnCloseQrModal: document.getElementById('btn-close-qr-modal'),
      btnCopyLiveUrl: document.getElementById('btn-copy-live-url'),
      modalSongDetail: document.getElementById('modal-song-detail'),
      btnCloseSongModal: document.getElementById('btn-close-song-modal'),
      btnModalFilterArtist: document.getElementById('btn-modal-filter-artist'),
      modalSongBadge: document.getElementById('modal-song-badge'),
      modalSongTitle: document.getElementById('modal-song-title'),
      modalSongArtist: document.getElementById('modal-song-artist'),
      modalSongRange: document.getElementById('modal-song-range'),
      modalSongHighest: document.getElementById('modal-song-highest'),
      modalSongDifficulty: document.getElementById('modal-song-difficulty'),
      modalSongRecKey: document.getElementById('modal-song-rec-key'),
      modalSongReason: document.getElementById('modal-song-reason'),
      modalSongTags: document.getElementById('modal-song-tags'),
      modalSongFocus: document.getElementById('modal-song-focus'),
      btnModalRecordSong: document.getElementById('btn-modal-record-song'),

      // キー変更シミュレーター
      keyShiftButtons: document.querySelectorAll('.btn-key-shift'),
      keyShiftCurrentLabel: document.getElementById('key-shift-current-label'),
      keyShiftHighestNote: document.getElementById('key-shift-highest-note'),
      btnPlayShiftedTone: document.getElementById('btn-play-shifted-tone'),
      keyShiftStatusPill: document.getElementById('key-shift-status-pill'),

      // ピアノ基準音 & 最高音フィルター
      pianoKeysContainer: document.getElementById('piano-keys-container'),
      pianoPlayingNote: document.getElementById('piano-playing-note'),
      highestFilterChips: document.querySelectorAll('.highest-filter-chip'),
      highestFilterLabel: document.getElementById('highest-filter-label'),

      // 音域診断SNSシェア
      btnHomeShareCard: document.getElementById('btn-home-share-card'),
      modalShareCard: document.getElementById('modal-share-card'),
      btnCloseShareModal: document.getElementById('btn-close-share-modal'),
      shareCardCanvas: document.getElementById('share-card-canvas'),
      btnShareToX: document.getElementById('btn-share-to-x'),
      btnDownloadShareCard: document.getElementById('btn-download-share-card'),
      btnNativeShareCard: document.getElementById('btn-native-share-card'),

      // AIチャット
      aiChatMessages: document.getElementById('ai-chat-messages'),
      aiInput: document.getElementById('ai-input'),
      btnSendAi: document.getElementById('btn-send-ai'),
      presetAiBtns: document.querySelectorAll('.preset-ai-btn'),

      // トースト
      toast: document.getElementById('toast'),
      toastText: document.getElementById('toast-text')
    };

    function showToast(message) {
      if (!elements.toast || !elements.toastText) return;
      elements.toastText.textContent = message;
      elements.toast.classList.remove('opacity-0', 'pointer-events-none');
      setTimeout(() => {
        elements.toast.classList.add('opacity-0', 'pointer-events-none');
      }, 2500);
    }

    function switchView(targetViewId) {
      // 1. 全画面を確実に非表示
      Object.keys(elements.views).forEach(key => {
        const view = elements.views[key];
        if (view) {
          view.classList.add('hidden');
          view.style.display = 'none';
        }
      });

      // 2. 対象画面だけを確実に表示
      const targetView = elements.views[targetViewId];
      if (targetView) {
        targetView.classList.remove('hidden');
        targetView.style.display = 'block';
      }

      // 3. ナビゲーションバーのアクティブ表示更新
      elements.navItems.forEach(item => {
        if (item.dataset.target === targetViewId) {
          item.classList.add('text-purple-400');
          item.classList.remove('text-slate-400');
        } else {
          item.classList.remove('text-purple-400');
          item.classList.add('text-slate-400');
        }
      });

      // 4. 即座にスクロール位置を最上部にリセット（smoothの遅延やバグを排除）
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      const mainEl = document.querySelector('main');
      if (mainEl) mainEl.scrollTop = 0;

      if (targetViewId === 'view-practice') {
        setTimeout(initGrowthChart, 50);
      }
    }

    function populateNoteSelectors() {
      const notes = getAvailableNotes('C2', 'C6');
      const selects = [
        elements.selectChestLow,
        elements.selectChestHigh,
        elements.selectFalsettoLow,
        elements.selectFalsettoHigh,
        elements.logSelectLow,
        elements.logSelectHigh,
        elements.manualSongLow,
        elements.manualSongHigh
      ];
      selects.forEach(sel => {
        if (!sel) return;
        sel.innerHTML = '';
        notes.forEach(n => {
          const opt = document.createElement('option');
          opt.value = n.name;
          opt.textContent = `${n.karaoke} (${n.name})`;
          sel.appendChild(opt);
        });
      });
      if (elements.manualSongLow) elements.manualSongLow.value = 'C3';
      if (elements.manualSongHigh) elements.manualSongHigh.value = 'A4';
    }

    function populateArtistFilter() {
      if (!elements.artistFilterSelect) return;
      const allSongs = getAllSongs();
      const counts = {};
      allSongs.forEach(s => {
        counts[s.artist] = (counts[s.artist] || 0) + 1;
      });

      const sortedArtists = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

      elements.artistFilterSelect.innerHTML = '<option value="">すべてのアーティスト（全曲）</option>';
      sortedArtists.forEach(artist => {
        const opt = document.createElement('option');
        opt.value = artist;
        opt.textContent = `${artist} (${counts[artist]}曲)`;
        elements.artistFilterSelect.appendChild(opt);
      });
      if (selectedArtist) elements.artistFilterSelect.value = selectedArtist;
    }

    function loadUserProfile() {
      const profile = getUserProfile();
      if (elements.headerUserRange) {
        elements.headerUserRange.textContent = `${formatKaraokeNote(profile.chest_low || 'C3')} - ${formatKaraokeNote(profile.chest_high || 'G4')}`;
      }
      if (elements.homeChestRange) {
        elements.homeChestRange.textContent = `${formatKaraokeNote(profile.chest_low)} 〜 ${formatKaraokeNote(profile.chest_high)}`;
      }
      if (elements.homeChestKaraoke) {
        elements.homeChestKaraoke.textContent = `(${profile.chest_low} 〜 ${profile.chest_high})`;
      }
      if (elements.homeFalsettoRange) {
        elements.homeFalsettoRange.textContent = `${formatKaraokeNote(profile.falsetto_low)} 〜 ${formatKaraokeNote(profile.falsetto_high)}`;
      }
      if (elements.homeFalsettoKaraoke) {
        elements.homeFalsettoKaraoke.textContent = `(${profile.falsetto_low} 〜 ${profile.falsetto_high})`;
      }

      const totalNotes = 84 - 36;
      const userMin = noteToMidi(profile.chest_low) || 48;
      const userMax = noteToMidi(profile.falsetto_high || profile.chest_high) || 72;
      const leftPercent = Math.max(0, Math.min(100, ((userMin - 36) / totalNotes) * 100));
      const widthPercent = Math.max(5, Math.min(100 - leftPercent, ((userMax - userMin) / totalNotes) * 100));
      if (elements.homeRangeBar) {
        elements.homeRangeBar.style.left = `${leftPercent}%`;
        elements.homeRangeBar.style.width = `${widthPercent}%`;
      }

      if (elements.inputName) elements.inputName.value = profile.name || '';
      if (elements.selectGender) elements.selectGender.value = profile.gender || 'male';
      if (elements.selectChestLow) elements.selectChestLow.value = profile.chest_low || 'C3';
      if (elements.selectChestHigh) elements.selectChestHigh.value = profile.chest_high || 'G4';
      if (elements.selectFalsettoLow) elements.selectFalsettoLow.value = profile.falsetto_low || 'E4';
      if (elements.selectFalsettoHigh) elements.selectFalsettoHigh.value = profile.falsetto_high || 'C5';
      if (elements.inputWeakness) elements.inputWeakness.value = (profile.weak_points || []).join('、');
      if (elements.inputGoal) elements.inputGoal.value = (profile.practice_goals || []).join('、');

      if (elements.logSelectLow) elements.logSelectLow.value = profile.chest_low || 'C3';
      if (elements.logSelectHigh) elements.logSelectHigh.value = profile.chest_high || 'G4';
    }

    function createSongCardHtml(song, userProfile) {
      const compat = calculateCompatibility(userProfile, song);
      const diffStars = '★'.repeat(song.difficulty) + '☆'.repeat(5 - song.difficulty);
      const estimateBadge = song.is_estimate ? `<span class="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">参考値</span>` : '';
      const customBadge = song.is_custom ? `<span class="text-[9px] bg-purple-900/60 text-purple-300 font-bold px-1.5 py-0.5 rounded border border-purple-500/40">マイ登録</span>` : '';

      const highestK = formatKaraokeNote(song.highest_note);
      const lowestK = formatKaraokeNote(song.lowest_note);

      return `
        <div class="song-card glass-panel p-4 rounded-2xl border border-surface-border hover:border-purple-500/40 active:scale-[0.99] transition cursor-pointer relative" data-id="${song.id}">
          <div class="flex items-start justify-between gap-2 mb-2">
            <div>
              <div class="flex items-center gap-1.5 mb-1 flex-wrap">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full border ${compat.badgeClass}">
                  ${compat.title}
                </span>
                ${customBadge}
                ${estimateBadge}
              </div>
              <h4 class="text-sm font-bold text-white leading-tight">${song.title}</h4>
              <p class="text-xs text-slate-400 font-medium">${song.artist}</p>
            </div>
            <div class="text-right shrink-0">
              <span class="text-xs text-amber-400 font-semibold">${diffStars}</span>
              <p class="text-[10px] text-slate-400 mt-0.5">最高: <span class="font-bold text-slate-100 text-xs">${highestK}</span> <span class="text-[9px] text-slate-500">(${song.highest_note})</span></p>
            </div>
          </div>
          <div class="flex items-center justify-between text-[11px] pt-2 border-t border-white/5 text-slate-400">
            <span>音域: <strong class="text-slate-200 font-semibold">${lowestK} 〜 ${highestK}</strong></span>
            <span class="text-purple-400 font-medium flex items-center gap-0.5">
              分析を見る <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            </span>
          </div>
        </div>
      `;
    }

    function renderSongList() {
      const userProfile = getUserProfile();
      const allSongs = getAllSongs();
      const query = elements.songSearchInput ? elements.songSearchInput.value.toLowerCase().trim() : '';

      let songs = allSongs.filter(song => {
        if (selectedArtist && song.artist !== selectedArtist) return false;
        const matchQuery = song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query);
        if (!matchQuery) return false;

        // 最高音フィルター
        if (selectedHighestFilter !== 'all') {
          const songHighMidi = noteToMidi(song.highest_note);
          const songHighKaraoke = getKaraokeNoteName(songHighMidi);
          if (selectedHighestFilter === 'hiD+') {
            const hiDMidi = noteToMidi('D5') || 74;
            if (!songHighMidi || songHighMidi < hiDMidi) return false;
          } else {
            if (songHighKaraoke !== selectedHighestFilter) return false;
          }
        }

        if (currentFilter === 'all') return true;
        if (currentFilter === 'custom') return song.is_custom === true;
        const compat = calculateCompatibility(userProfile, song);
        if (currentFilter === 'fit') return compat.title === '歌いやすそう';
        if (currentFilter === 'high') return compat.title === '高音練習向け' || compat.title === 'やや高め';
        if (currentFilter === 'falsetto') return compat.title === '裏声を活用すると歌いやすそう';
        return true;
      });

      if (!elements.songListContainer) return;

      if (songs.length === 0) {
        // 曲が見つからない場合、AIで推定追加するサジェストを表示
        const searchPrompt = query ? `「${query}」` : '';
        elements.songListContainer.innerHTML = `
          <div class="glass-panel p-6 rounded-3xl text-center border border-purple-500/30 bg-purple-950/20 space-y-3">
            <div class="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center mx-auto text-purple-400">
              <i data-lucide="sparkles" class="w-5 h-5"></i>
            </div>
            <div>
              <h4 class="text-sm font-bold text-white">${searchPrompt}が見つかりませんでした</h4>
              <p class="text-xs text-slate-400 mt-1">AIに音域を推定させてマイライブラリに追加できます！</p>
            </div>
            <button id="btn-quick-ai-add-from-search" class="px-4 py-2.5 bg-gradient-music text-white text-xs font-bold rounded-2xl shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-1.5 mx-auto">
              <i data-lucide="plus" class="w-4 h-4"></i>
              <span>AIでこの曲の音域を追加する</span>
            </button>
          </div>
        `;
        const quickAddBtn = document.getElementById('btn-quick-ai-add-from-search');
        if (quickAddBtn) {
          quickAddBtn.onclick = () => {
            elements.modalAddSong.classList.remove('hidden');
            elements.modalAddSong.classList.add('flex');
            elements.aiSongTitle.value = query;
          };
        }
      } else {
        elements.songListContainer.innerHTML = songs.map(s => createSongCardHtml(s, userProfile)).join('');
      }

      if (window.lucide) window.lucide.createIcons();
      attachSongCardClicks();
    }

    function renderHomeRecommendations() {
      if (!elements.homeRecommendedSongs) return;
      const userProfile = getUserProfile();
      const allSongs = getAllSongs();
      const scored = allSongs.map(song => ({
        song,
        compat: calculateCompatibility(userProfile, song)
      })).sort((a, b) => {
        if (a.compat.title === '歌いやすそう') return -1;
        if (b.compat.title === '歌いやすそう') return 1;
        return 0;
      }).slice(0, 3);

      elements.homeRecommendedSongs.innerHTML = scored.map(item => createSongCardHtml(item.song, userProfile)).join('');
      if (window.lucide) window.lucide.createIcons();
      attachSongCardClicks();
    }

    function openSongModal(songId) {
      const allSongs = getAllSongs();
      const song = allSongs.find(s => s.id === songId);
      if (!song || !elements.modalSongDetail) return;
      const userProfile = getUserProfile();
      const compat = calculateCompatibility(userProfile, song);

      elements.modalSongTitle.textContent = song.title;
      elements.modalSongArtist.textContent = song.artist;
      elements.modalSongRange.textContent = `${formatKaraokeNote(song.lowest_note)} 〜 ${formatKaraokeNote(song.highest_note)} (${song.lowest_note}〜${song.highest_note})`;
      elements.modalSongHighest.textContent = `${formatKaraokeNote(song.highest_note)} (${song.highest_note})`;
      elements.modalSongDifficulty.textContent = '★'.repeat(song.difficulty) + '☆'.repeat(5 - song.difficulty);

      if (compat.recommendedKey === 0) {
        elements.modalSongRecKey.textContent = '原曲キー (±0) がおすすめ';
      } else if (compat.recommendedKey < 0) {
        elements.modalSongRecKey.textContent = `キーを ${compat.recommendedKey} 下げると歌いやすい`;
      } else {
        elements.modalSongRecKey.textContent = `キーを +${compat.recommendedKey} 上げると歌いやすい`;
      }

      elements.modalSongBadge.className = `inline-block text-[11px] font-bold px-2.5 py-1 rounded-full border mb-2 ${compat.badgeClass}`;
      elements.modalSongBadge.textContent = compat.title;
      elements.modalSongReason.textContent = compat.reason;

      elements.modalSongTags.innerHTML = (song.practice_tags || []).map(tag => `
        <span class="text-[10px] bg-cyan-500/15 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/20"># ${tag}</span>
      `).join('');
      elements.modalSongFocus.textContent = song.practice_focus || 'サビの高音とリズムキープを意識して練習しましょう。';

      elements.btnModalRecordSong.onclick = () => {
        elements.modalSongDetail.classList.add('hidden');
        elements.modalSongDetail.classList.remove('flex');
        openPracticeLogModal(song.title);
      };

      if (elements.btnModalFilterArtist) {
        elements.btnModalFilterArtist.onclick = (e) => {
          e.stopPropagation();
          elements.modalSongDetail.classList.add('hidden');
          elements.modalSongDetail.classList.remove('flex');
          switchView('view-songs');
          selectedArtist = song.artist;
          if (elements.artistFilterSelect) elements.artistFilterSelect.value = song.artist;
          if (elements.btnClearArtistFilter) elements.btnClearArtistFilter.classList.remove('hidden');
          renderSongList();
        };
      }

      // キー変更シミュレーターの初期化
      currentModalSong = song;
      currentKeyShift = 0;
      updateKeyShiftSimulator();

      elements.modalSongDetail.classList.remove('hidden');
      elements.modalSongDetail.classList.add('flex');
    }

    function attachSongCardClicks() {
      document.querySelectorAll('.song-card').forEach(card => {
        card.onclick = () => {
          openSongModal(card.dataset.id);
        };
      });
    }

    function openPracticeLogModal(presetSongTitle = '') {
      if (!elements.modalPracticeLog) return;
      elements.modalPracticeLog.classList.remove('hidden');
      elements.modalPracticeLog.classList.add('flex');
      if (presetSongTitle && elements.logInputSong) {
        elements.logInputSong.value = presetSongTitle;
      }
    }

    function renderPracticeLogs() {
      if (!elements.practiceLogsContainer) return;
      const logs = getPracticeLogs();
      if (logs.length === 0) {
        elements.practiceLogsContainer.innerHTML = `
          <div class="text-center py-8 text-slate-400 text-xs">
            <i data-lucide="music" class="w-8 h-8 mx-auto mb-2 text-slate-500"></i>
            まだ練習記録がありません。「記録をつける」から追加してみましょう！
          </div>
        `;
      } else {
        elements.practiceLogsContainer.innerHTML = logs.map(log => `
          <div class="glass-panel p-4 rounded-2xl border border-surface-border space-y-2.5">
            <div class="flex items-start justify-between">
              <div>
                <span class="text-[10px] text-slate-400">${log.date} ・ ${log.duration}分</span>
                <h4 class="text-sm font-bold text-white mt-0.5">${log.song_title}</h4>
              </div>
              <div class="text-right">
                <span class="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-2 py-0.5 rounded-full border border-purple-500/30">
                  最高: ${formatKaraokeNote(log.highest_note)} (${log.highest_note})
                </span>
              </div>
            </div>

            ${log.hard_parts ? `
              <div class="text-xs text-slate-300 bg-surface-card/60 p-2.5 rounded-xl border border-surface-border/60">
                <span class="text-[10px] text-slate-400 block font-semibold mb-0.5">課題・難しかった点:</span>
                ${log.hard_parts}
              </div>
            ` : ''}

            ${log.ai_advice ? `
              <div class="text-xs text-purple-200 bg-purple-950/25 p-2.5 rounded-xl border border-purple-500/20 flex items-start gap-2">
                <i data-lucide="sparkles" class="w-4 h-4 text-purple-400 shrink-0 mt-0.5"></i>
                <div>
                  <span class="text-[10px] text-purple-300 font-bold block mb-0.5">AIトレーナーからのアドバイス:</span>
                  ${log.ai_advice}
                </div>
              </div>
            ` : ''}

            <div class="flex justify-end pt-1">
              <button class="btn-delete-log text-[10px] text-slate-500 hover:text-rose-400 transition" data-id="${log.id}">
                削除
              </button>
            </div>
          </div>
        `).join('');
      }

      document.querySelectorAll('.btn-delete-log').forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          if (confirm('この練習記録を削除しますか？')) {
            deletePracticeLog(btn.dataset.id);
            renderPracticeLogs();
            initGrowthChart();
            showToast('記録を削除しました');
          }
        };
      });

      if (window.lucide) window.lucide.createIcons();
    }

    function initGrowthChart() {
      const canvas = document.getElementById('growthChart');
      if (!canvas || !window.Chart) return;

      const logs = [...getPracticeLogs()].reverse();
      const labels = logs.length > 0 ? logs.map(l => l.date.slice(5)) : ['9/20', '9/23', '9/25', '今日'];
      const highNotesMidi = logs.length > 0 
        ? logs.map(l => noteToMidi(l.highest_note) || 67)
        : [65, 67, 68, 69];

      if (growthChartInstance) growthChartInstance.destroy();

      const ctx = canvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, 160);
      gradient.addColorStop(0, 'rgba(168, 85, 247, 0.4)');
      gradient.addColorStop(1, 'rgba(168, 85, 247, 0.0)');

      growthChartInstance = new window.Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: '最高音',
            data: highNotesMidi,
            borderColor: '#a855f7',
            borderWidth: 3,
            pointBackgroundColor: '#38bdf8',
            pointBorderColor: '#ffffff',
            pointRadius: 5,
            tension: 0.35,
            fill: true,
            backgroundColor: gradient
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => `最高音: ${getKaraokeNoteName(context.parsed.y)} (${midiToNote(context.parsed.y)})`
              }
            }
          },
          scales: {
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.05)' },
              ticks: { color: '#94a3b8', font: { size: 10 } }
            },
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.05)' },
              ticks: {
                color: '#94a3b8',
                font: { size: 10 },
                stepSize: 2,
                callback: (val) => getKaraokeNoteName(val) || midiToNote(val)
              }
            }
          }
        }
      });
    }

    // ================= イベントリスナー =================
    elements.navItems.forEach(item => {
      item.addEventListener('click', () => switchView(item.dataset.target));
    });

    if (elements.btnQuickProfile) elements.btnQuickProfile.addEventListener('click', () => switchView('view-range'));
    if (elements.btnHomeMeasure) elements.btnHomeMeasure.addEventListener('click', () => switchView('view-range'));
    if (elements.btnHomeFind) elements.btnHomeFind.addEventListener('click', () => switchView('view-songs'));
    if (elements.btnHomeEditRange) elements.btnHomeEditRange.addEventListener('click', () => switchView('view-range'));
    if (elements.btnHomeSeeAllSongs) elements.btnHomeSeeAllSongs.addEventListener('click', () => switchView('view-songs'));
    if (elements.btnQuickSearch) elements.btnQuickSearch.addEventListener('click', () => switchView('view-songs'));
    if (elements.btnQuickPractice) elements.btnQuickPractice.addEventListener('click', () => switchView('view-practice'));
    if (elements.btnQuickAi) elements.btnQuickAi.addEventListener('click', () => switchView('view-ai'));

    if (elements.songSearchInput) elements.songSearchInput.addEventListener('input', renderSongList);

    if (elements.artistFilterSelect) {
      elements.artistFilterSelect.addEventListener('change', () => {
        selectedArtist = elements.artistFilterSelect.value;
        if (selectedArtist) {
          elements.btnClearArtistFilter.classList.remove('hidden');
        } else {
          elements.btnClearArtistFilter.classList.add('hidden');
        }
        renderSongList();
      });
    }

    if (elements.btnClearArtistFilter) {
      elements.btnClearArtistFilter.addEventListener('click', () => {
        selectedArtist = '';
        elements.artistFilterSelect.value = '';
        elements.btnClearArtistFilter.classList.add('hidden');
        renderSongList();
      });
    }

    elements.filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        elements.filterChips.forEach(c => {
          c.classList.remove('bg-purple-600', 'text-white');
          c.classList.add('bg-surface-card', 'text-slate-300');
        });
        chip.classList.add('bg-purple-600', 'text-white');
        chip.classList.remove('bg-surface-card', 'text-slate-300');
        currentFilter = chip.dataset.filter;
        renderSongList();
      });
    });

    // 曲追加モーダルの開閉とタブ切り替え
    if (elements.btnOpenAddSongModal) {
      elements.btnOpenAddSongModal.addEventListener('click', () => {
        elements.modalAddSong.classList.remove('hidden');
        elements.modalAddSong.classList.add('flex');
      });
    }

    if (elements.btnCloseAddSongModal) {
      elements.btnCloseAddSongModal.addEventListener('click', () => {
        elements.modalAddSong.classList.add('hidden');
        elements.modalAddSong.classList.remove('flex');
      });
    }

    if (elements.tabAddAi && elements.tabAddManual) {
      elements.tabAddAi.addEventListener('click', () => {
        elements.tabAddAi.className = 'py-2 rounded-xl font-bold bg-purple-600 text-white transition flex items-center justify-center gap-1.5';
        elements.tabAddManual.className = 'py-2 rounded-xl font-bold text-slate-400 hover:text-white transition flex items-center justify-center gap-1.5';
        elements.formAiAddSong.classList.remove('hidden');
        elements.formManualAddSong.classList.add('hidden');
      });

      elements.tabAddManual.addEventListener('click', () => {
        elements.tabAddManual.className = 'py-2 rounded-xl font-bold bg-purple-600 text-white transition flex items-center justify-center gap-1.5';
        elements.tabAddAi.className = 'py-2 rounded-xl font-bold text-slate-400 hover:text-white transition flex items-center justify-center gap-1.5';
        elements.formManualAddSong.classList.remove('hidden');
        elements.formAiAddSong.classList.add('hidden');
      });
    }

    // AI推定で曲追加
    if (elements.formAiAddSong) {
      elements.formAiAddSong.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = elements.aiSongTitle.value.trim();
        const artist = elements.aiSongArtist.value.trim();
        const vocalType = elements.aiSongVocalType.value;
        if (!title || !artist) return;

        const estimatedSong = estimateSongVocalRange(title, artist, vocalType);
        addCustomSong(estimatedSong);

        elements.modalAddSong.classList.add('hidden');
        elements.modalAddSong.classList.remove('flex');
        elements.formAiAddSong.reset();

        populateArtistFilter();
        renderSongList();
        renderHomeRecommendations();
        showToast(`AIが音域を推定し「${title}」を追加しました！`);
      });
    }

    // 手動で曲追加
    if (elements.formManualAddSong) {
      elements.formManualAddSong.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = elements.manualSongTitle.value.trim();
        const artist = elements.manualSongArtist.value.trim();
        const low = elements.manualSongLow.value;
        const high = elements.manualSongHigh.value;
        const vocalType = elements.manualSongVocalType.value;
        const diff = parseInt(elements.manualSongDiff.value, 10) || 3;
        const tags = elements.manualSongTags.value ? elements.manualSongTags.value.split(/[,、]/).map(s => s.trim()) : ['マイ登録曲'];

        if (!title || !artist) return;

        addCustomSong({
          title,
          artist,
          lowest_note: low,
          highest_note: high,
          main_range: `${low}〜${high}`,
          difficulty: diff,
          vocal_type: vocalType,
          practice_tags: tags,
          practice_focus: 'ユーザー様自身によって登録された楽曲です。'
        });

        elements.modalAddSong.classList.add('hidden');
        elements.modalAddSong.classList.remove('flex');
        elements.formManualAddSong.reset();

        populateArtistFilter();
        renderSongList();
        renderHomeRecommendations();
        showToast(`「${title}」をライブラリに追加しました！`);
      });
    }

    if (elements.rangeProfileForm) {
      elements.rangeProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const updated = {
          ...getUserProfile(),
          name: elements.inputName.value.trim() || 'シンガー',
          gender: elements.selectGender.value,
          chest_low: elements.selectChestLow.value,
          chest_high: elements.selectChestHigh.value,
          falsetto_low: elements.selectFalsettoLow.value,
          falsetto_high: elements.selectFalsettoHigh.value,
          weak_points: elements.inputWeakness.value ? elements.inputWeakness.value.split(/[,、]/).map(s => s.trim()) : [],
          practice_goals: elements.inputGoal.value ? elements.inputGoal.value.split(/[,、]/).map(s => s.trim()) : []
        };
        saveUserProfile(updated);
        loadUserProfile();
        renderSongList();
        renderHomeRecommendations();
        showToast('音域プロフィールを保存しました！');
      });
    }

    // マイク測定モード切り替え（地声 vs 裏声）
    function switchMicMode(mode) {
      if (currentMicMode === mode) return;
      if (isMicRunning) {
        stopPitchDetection();
        isMicRunning = false;
        elements.btnToggleMic.innerHTML = `<i data-lucide="mic" class="w-4 h-4"></i><span>マイク測定を開始する</span>`;
        elements.btnToggleMic.classList.remove('bg-rose-600');
        elements.btnToggleMic.classList.add('bg-gradient-music');
      }
      currentMicMode = mode;
      detectedMinMidi = null;
      detectedMaxMidi = null;
      if (elements.micMinNote) elements.micMinNote.textContent = '--';
      if (elements.micMaxNote) elements.micMaxNote.textContent = '--';
      if (elements.micDetectedNote) elements.micDetectedNote.textContent = '--';
      if (elements.micKaraokeNote) elements.micKaraokeNote.textContent = 'マイクを開始して声を出してください';

      if (mode === 'chest') {
        if (elements.btnMicModeChest) {
          elements.btnMicModeChest.className = 'py-2 text-xs font-bold rounded-xl transition bg-purple-600 text-white flex items-center justify-center gap-1.5 shadow-md';
        }
        if (elements.btnMicModeFalsetto) {
          elements.btnMicModeFalsetto.className = 'py-2 text-xs font-semibold rounded-xl transition text-slate-400 hover:text-white flex items-center justify-center gap-1.5';
        }
        if (elements.micMinLabel) elements.micMinLabel.textContent = '地声の最低音';
        if (elements.micMaxLabel) {
          elements.micMaxLabel.textContent = '地声の最高音';
          if (elements.micMaxNote) elements.micMaxNote.className = 'font-bold text-purple-400 text-sm mt-0.5';
        }
        if (elements.micStatusMsg) elements.micStatusMsg.textContent = '※地声（普段の話し声の延長）で、無理のない「一番低い声」と「一番高い声」を「あー」と出してください';
      } else {
        if (elements.btnMicModeChest) {
          elements.btnMicModeChest.className = 'py-2 text-xs font-semibold rounded-xl transition text-slate-400 hover:text-white flex items-center justify-center gap-1.5';
        }
        if (elements.btnMicModeFalsetto) {
          elements.btnMicModeFalsetto.className = 'py-2 text-xs font-bold rounded-xl transition bg-cyan-600 text-white flex items-center justify-center gap-1.5 shadow-md';
        }
        if (elements.micMinLabel) elements.micMinLabel.textContent = '裏声の最低音';
        if (elements.micMaxLabel) {
          elements.micMaxLabel.textContent = '裏声の最高音';
          if (elements.micMaxNote) elements.micMaxNote.className = 'font-bold text-cyan-400 text-sm mt-0.5';
        }
        if (elements.micStatusMsg) elements.micStatusMsg.textContent = '※裏声（ファルセット）で、綺麗に出せる一番高い声などを「あー」と出してください';
      }
      if (window.lucide) window.lucide.createIcons();
    }

    if (elements.btnMicModeChest) {
      elements.btnMicModeChest.addEventListener('click', () => switchMicMode('chest'));
    }
    if (elements.btnMicModeFalsetto) {
      elements.btnMicModeFalsetto.addEventListener('click', () => switchMicMode('falsetto'));
    }

    if (elements.btnToggleMic) {
      elements.btnToggleMic.addEventListener('click', async () => {
        const isChest = (currentMicMode === 'chest');
        const modeLabel = isChest ? '地声' : '裏声';

        if (isMicRunning) {
          stopPitchDetection();
          isMicRunning = false;
          elements.btnToggleMic.innerHTML = `<i data-lucide="mic" class="w-4 h-4"></i><span>マイク測定を開始する</span>`;
          elements.btnToggleMic.classList.remove('bg-rose-600');
          elements.btnToggleMic.classList.add('bg-gradient-music');
          elements.micStatusMsg.textContent = `※${modeLabel}の測定を停止しました。`;

          if (detectedMinMidi && detectedMaxMidi) {
            const minNote = midiToNote(detectedMinMidi);
            const maxNote = midiToNote(detectedMaxMidi);
            const confirmMsg = `【${modeLabel}の測定完了！】\n最低音: ${formatFullNote(minNote)}\n最高音: ${formatFullNote(maxNote)}\n\nこれを「${modeLabel}の音域」としてプロフィールに保存しますか？`;

            if (confirm(confirmMsg)) {
              if (isChest) {
                elements.selectChestLow.value = minNote;
                elements.selectChestHigh.value = maxNote;
              } else {
                elements.selectFalsettoLow.value = minNote;
                elements.selectFalsettoHigh.value = maxNote;
              }
              elements.rangeProfileForm.dispatchEvent(new Event('submit'));
              showToast(`${modeLabel}の音域を保存しました！`);
            }
          }
        } else {
          detectedMinMidi = null;
          detectedMaxMidi = null;
          let pitchBuffer = [];
          elements.micMinNote.textContent = '--';
          elements.micMaxNote.textContent = '--';
          elements.micDetectedNote.textContent = '...';
          elements.micKaraokeNote.textContent = '声を出してください';
          elements.micStatusMsg.textContent = isChest
            ? '地声音声解析中... 「あー」と低音から高音まで声を出してください'
            : '裏声音声解析中... 「あー」ときれいに出せる裏声を出してください';

          const success = await startPitchDetection(
            (pitch) => {
              elements.micDetectedNote.textContent = pitch.karaokeName;
              elements.micKaraokeNote.textContent = `${pitch.noteName} ・ ${pitch.frequency} Hz`;

              // 安定性バッファ（直近5フレームの音を保持）
              pitchBuffer.push(pitch.midi);
              if (pitchBuffer.length > 5) pitchBuffer.shift();

              // 直近4回以上、同じ音程（±1半音のブレ以内）が維持された場合のみ「安定した歌声」として判定
              if (pitchBuffer.length >= 4) {
                const recent = pitchBuffer.slice(-4);
                const avg = recent.reduce((a, b) => a + b, 0) / recent.length;
                const isStable = recent.every(m => Math.abs(m - avg) <= 1.0);

                if (isStable) {
                  const stableMidi = Math.round(avg);
                  elements.micStatusMsg.innerHTML = `<span class="text-emerald-400 font-bold">● ${modeLabel}を安定検知中！ (${pitch.karaokeName})</span>`;

                  if (!detectedMinMidi || stableMidi < detectedMinMidi) {
                    detectedMinMidi = stableMidi;
                    const kNote = getKaraokeNoteName(stableMidi);
                    const sNote = midiToNote(stableMidi);
                    elements.micMinNote.textContent = `${kNote} (${sNote})`;
                  }
                  if (!detectedMaxMidi || stableMidi > detectedMaxMidi) {
                    detectedMaxMidi = stableMidi;
                    const kNote = getKaraokeNoteName(stableMidi);
                    const sNote = midiToNote(stableMidi);
                    elements.micMaxNote.textContent = `${kNote} (${sNote})`;
                  }
                }
              }
            },
            (errorMsg) => {
              alert(errorMsg);
              stopPitchDetection();
              isMicRunning = false;
              elements.btnToggleMic.innerHTML = `<i data-lucide="mic" class="w-4 h-4"></i><span>マイク測定を開始する</span>`;
              elements.btnToggleMic.classList.remove('bg-rose-600');
              elements.btnToggleMic.classList.add('bg-gradient-music');
            }
          );

          if (success) {
            isMicRunning = true;
            elements.btnToggleMic.innerHTML = `<i data-lucide="square" class="w-4 h-4"></i><span>${modeLabel}測定を終了して保存</span>`;
            elements.btnToggleMic.classList.remove('bg-gradient-music');
            elements.btnToggleMic.classList.add('bg-rose-600');
          }
        }
        if (window.lucide) window.lucide.createIcons();
      });
    }

    if (elements.btnCloseSongModal) {
      elements.btnCloseSongModal.addEventListener('click', () => {
        elements.modalSongDetail.classList.add('hidden');
        elements.modalSongDetail.classList.remove('flex');
      });
    }

    if (elements.btnOpenLogModal) elements.btnOpenLogModal.addEventListener('click', () => openPracticeLogModal());
    if (elements.btnCloseLogModal) {
      elements.btnCloseLogModal.addEventListener('click', () => {
        elements.modalPracticeLog.classList.add('hidden');
        elements.modalPracticeLog.classList.remove('flex');
      });
    }

    if (elements.btnOpenQrModal && elements.modalQr) {
      elements.btnOpenQrModal.addEventListener('click', () => {
        elements.modalQr.classList.remove('hidden');
        elements.modalQr.classList.add('flex');
      });
    }

    if (elements.btnCloseQrModal && elements.modalQr) {
      elements.btnCloseQrModal.addEventListener('click', () => {
        elements.modalQr.classList.add('hidden');
        elements.modalQr.classList.remove('flex');
      });
    }

    if (elements.btnCopyLiveUrl) {
      elements.btnCopyLiveUrl.addEventListener('click', () => {
        const liveUrl = 'https://kamagata0.github.io/vocal-range-app/';
        navigator.clipboard.writeText(liveUrl).then(() => {
          showToast('公開URLをコピーしました！');
        }).catch(() => {
          showToast(liveUrl);
        });
      });
    }

    if (elements.formAddPractice) {
      elements.formAddPractice.addEventListener('submit', (e) => {
        e.preventDefault();
        const song = elements.logInputSong.value.trim();
        const date = elements.logInputDate.value;
        const duration = parseInt(elements.logInputDuration.value, 10) || 30;
        const low = elements.logSelectLow.value;
        const high = elements.logSelectHigh.value;
        const hard = elements.logInputHard.value.trim();
        const memo = elements.logInputMemo.value.trim();
        const userProfile = getUserProfile();

        const advice = generatePracticeAdvice(song, hard, high, userProfile);

        addPracticeLog({
          song_title: song,
          date,
          duration,
          lowest_note: low,
          highest_note: high,
          hard_parts: hard,
          memo,
          ai_advice: advice
        });

        elements.modalPracticeLog.classList.add('hidden');
        elements.modalPracticeLog.classList.remove('flex');
        elements.formAddPractice.reset();
        elements.logInputDate.value = new Date().toISOString().split('T')[0];

        renderPracticeLogs();
        initGrowthChart();
        showToast('練習を記録しました！AIアドバイスが届いています');
      });
    }

    function sendAIMessage(queryText) {
      const text = queryText || (elements.aiInput ? elements.aiInput.value.trim() : '');
      if (!text || !elements.aiChatMessages) return;

      const userMsgHtml = `
        <div class="flex items-start justify-end gap-2.5">
          <div class="bg-purple-600 p-3 rounded-2xl rounded-tr-sm text-xs text-white max-w-[85%] leading-relaxed shadow-md">
            ${text}
          </div>
        </div>
      `;
      elements.aiChatMessages.insertAdjacentHTML('beforeend', userMsgHtml);
      if (elements.aiInput) elements.aiInput.value = '';
      elements.aiChatMessages.scrollTop = elements.aiChatMessages.scrollHeight;

      const loadingId = 'ai-loading-' + Date.now();
      const loadingHtml = `
        <div id="${loadingId}" class="flex items-start gap-2.5">
          <div class="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center shrink-0">
            <i data-lucide="bot" class="w-4 h-4 text-purple-300"></i>
          </div>
          <div class="glass-panel p-3 rounded-2xl rounded-tl-sm text-xs text-slate-400">
            AIが分析・回答を作成中...
          </div>
        </div>
      `;
      elements.aiChatMessages.insertAdjacentHTML('beforeend', loadingHtml);
      if (window.lucide) window.lucide.createIcons();
      elements.aiChatMessages.scrollTop = elements.aiChatMessages.scrollHeight;

      setTimeout(() => {
        const loader = document.getElementById(loadingId);
        if (loader) loader.remove();

        const userProfile = getUserProfile();
        const response = generateAIChatResponse(text, userProfile);

        const aiMsgHtml = `
          <div class="flex items-start gap-2.5">
            <div class="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center shrink-0">
              <i data-lucide="bot" class="w-4 h-4 text-purple-300"></i>
            </div>
            <div class="glass-panel p-3.5 rounded-2xl rounded-tl-sm text-xs text-slate-200 leading-relaxed max-w-[85%] border border-surface-border">
              ${response}
            </div>
          </div>
        `;
        elements.aiChatMessages.insertAdjacentHTML('beforeend', aiMsgHtml);
        if (window.lucide) window.lucide.createIcons();
        elements.aiChatMessages.scrollTop = elements.aiChatMessages.scrollHeight;
      }, 500);
    }

    if (elements.btnSendAi) elements.btnSendAi.addEventListener('click', () => sendAIMessage());
    if (elements.aiInput) {
      elements.aiInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendAIMessage();
      });
    }

    elements.presetAiBtns.forEach(btn => {
      btn.addEventListener('click', () => sendAIMessage(btn.textContent.trim()));
    });

    // ================= 1. キー変更シミュレーター =================
    function updateKeyShiftSimulator() {
      if (!currentModalSong) return;
      const userProfile = getUserProfile();
      const highestMidi = noteToMidi(currentModalSong.highest_note);
      if (!highestMidi) return;
      const shiftedMidi = highestMidi + currentKeyShift;
      const shiftedNote = midiToNote(shiftedMidi);
      const shiftedKaraoke = getKaraokeNoteName(shiftedMidi);

      if (elements.keyShiftCurrentLabel) {
        if (currentKeyShift === 0) {
          elements.keyShiftCurrentLabel.textContent = '原曲キー (±0)';
        } else if (currentKeyShift > 0) {
          elements.keyShiftCurrentLabel.textContent = `キー +${currentKeyShift}`;
        } else {
          elements.keyShiftCurrentLabel.textContent = `キー ${currentKeyShift}`;
        }
      }

      if (elements.keyShiftHighestNote) {
        elements.keyShiftHighestNote.textContent = `${shiftedKaraoke} (${shiftedNote})`;
      }

      if (elements.keyShiftButtons) {
        elements.keyShiftButtons.forEach(btn => {
          const shiftVal = parseInt(btn.dataset.shift, 10);
          if (shiftVal === currentKeyShift) {
            btn.className = 'btn-key-shift active py-1.5 rounded-lg text-xs font-extrabold bg-purple-600 text-white shadow transition';
          } else {
            btn.className = 'btn-key-shift py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 transition';
          }
        });
      }

      const userChestHighMidi = noteToMidi(userProfile.chest_high) || 67;
      if (elements.keyShiftStatusPill) {
        if (shiftedMidi <= userChestHighMidi) {
          elements.keyShiftStatusPill.className = 'text-[11px] font-semibold text-emerald-400 flex items-center gap-1';
          elements.keyShiftStatusPill.innerHTML = `<i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-400"></i><span>あなたの地声音域で歌えます！</span>`;
        } else if (shiftedMidi === userChestHighMidi + 1) {
          elements.keyShiftStatusPill.className = 'text-[11px] font-semibold text-amber-400 flex items-center gap-1';
          elements.keyShiftStatusPill.innerHTML = `<i data-lucide="zap" class="w-3.5 h-3.5 text-amber-400"></i><span>高音張り上げ練習にピッタリなキー！</span>`;
        } else {
          elements.keyShiftStatusPill.className = 'text-[11px] font-semibold text-rose-400 flex items-center gap-1';
          elements.keyShiftStatusPill.innerHTML = `<i data-lucide="alert-circle" class="w-3.5 h-3.5 text-rose-400"></i><span>地声では高め（さらに下げるか裏声活用）</span>`;
        }
        if (window.lucide) window.lucide.createIcons();
      }
    }

    function initKeyShiftSimulator() {
      if (elements.keyShiftButtons) {
        elements.keyShiftButtons.forEach(btn => {
          btn.addEventListener('click', () => {
            currentKeyShift = parseInt(btn.dataset.shift, 10);
            updateKeyShiftSimulator();
          });
        });
      }

      if (elements.btnPlayShiftedTone) {
        elements.btnPlayShiftedTone.addEventListener('click', () => {
          if (!currentModalSong) return;
          const highestMidi = noteToMidi(currentModalSong.highest_note);
          if (highestMidi) {
            playPitchTone(highestMidi + currentKeyShift, 1.2);
          }
        });
      }
    }

    // ================= 2. ピアノ基準音ガイド =================
    function initPianoKeys() {
      if (!elements.pianoKeysContainer) return;
      const pianoNotes = [
        { midi: 48, label: 'mid1C', sub: 'C3' },
        { midi: 50, label: 'mid1D', sub: 'D3' },
        { midi: 52, label: 'mid1E', sub: 'E3' },
        { midi: 53, label: 'mid1F', sub: 'F3' },
        { midi: 55, label: 'mid1G', sub: 'G3' },
        { midi: 56, label: 'mid1G#', sub: 'G#3', isBlack: true },
        { midi: 57, label: 'mid2A', sub: 'A3' },
        { midi: 59, label: 'mid2B', sub: 'B3' },
        { midi: 60, label: 'mid2C', sub: 'C4' },
        { midi: 62, label: 'mid2D', sub: 'D4' },
        { midi: 64, label: 'mid2E', sub: 'E4' },
        { midi: 65, label: 'mid2F', sub: 'F4' },
        { midi: 66, label: 'mid2F#', sub: 'F#4', isBlack: true },
        { midi: 67, label: 'mid2G', sub: 'G4' },
        { midi: 68, label: 'mid2G#', sub: 'G#4', isBlack: true },
        { midi: 69, label: 'hiA', sub: 'A4', isHighlight: true },
        { midi: 70, label: 'hiA#', sub: 'A#4', isBlack: true },
        { midi: 71, label: 'hiB', sub: 'B4' },
        { midi: 72, label: 'hiC', sub: 'C5', isHighlight: true },
        { midi: 74, label: 'hiD', sub: 'D5' }
      ];

      elements.pianoKeysContainer.innerHTML = pianoNotes.map(n => {
        const bgClass = n.isHighlight
          ? 'bg-gradient-to-b from-purple-900/60 to-purple-950 border-purple-500/50 text-purple-200 shadow-purple-900/30'
          : n.isBlack
            ? 'bg-slate-900 border-slate-700 text-purple-300'
            : 'bg-surface-card border-surface-border text-slate-200';
        return `
          <button type="button" class="piano-key-btn ${bgClass} border rounded-xl px-2.5 py-2 flex flex-col items-center justify-center min-w-[52px] shadow-sm hover:border-purple-400 active:scale-95 transition" data-midi="${n.midi}" data-label="${n.label}" data-sub="${n.sub}">
            <span class="text-xs font-extrabold">${n.label}</span>
            <span class="text-[9px] text-slate-400 font-medium">${n.sub}</span>
          </button>
        `;
      }).join('');

      elements.pianoKeysContainer.querySelectorAll('.piano-key-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const midi = parseInt(btn.dataset.midi, 10);
          const label = btn.dataset.label;
          const sub = btn.dataset.sub;
          btn.classList.add('playing');
          setTimeout(() => btn.classList.remove('playing'), 300);
          playPitchTone(midi, 1.2);
          if (elements.pianoPlayingNote) {
            elements.pianoPlayingNote.innerHTML = `🎵 <strong class="text-cyan-300 font-bold">${label} (${sub})</strong> を発音中！この高さに合わせて声を出してみよう`;
          }
        });
      });
    }

    // ================= 3. 最高音クイックフィルター =================
    function initHighestFilters() {
      if (!elements.highestFilterChips) return;
      elements.highestFilterChips.forEach(chip => {
        chip.addEventListener('click', () => {
          elements.highestFilterChips.forEach(c => {
            c.classList.remove('active', 'bg-purple-600', 'text-white', 'shadow-sm');
            c.classList.add('bg-surface-card', 'text-slate-300');
          });
          chip.classList.add('active', 'bg-purple-600', 'text-white', 'shadow-sm');
          chip.classList.remove('bg-surface-card', 'text-slate-300');

          selectedHighestFilter = chip.dataset.highest || 'all';
          if (elements.highestFilterLabel) {
            elements.highestFilterLabel.textContent = chip.textContent.trim();
          }
          renderSongList();
        });
      });
    }

    // ================= 4. 音域診断結果SNSシェアカード =================
    function drawShareCard(canvas, profile) {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = 800;
      const h = 960;
      canvas.width = w;
      canvas.height = h;

      // 1. 背景グラデーション
      const bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, '#090d16');
      bgGrad.addColorStop(0.5, '#130d2a');
      bgGrad.addColorStop(1, '#08111e');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // オーブグロー
      const glow1 = ctx.createRadialGradient(150, 150, 20, 150, 150, 300);
      glow1.addColorStop(0, 'rgba(124, 58, 237, 0.28)');
      glow1.addColorStop(1, 'rgba(124, 58, 237, 0)');
      ctx.fillStyle = glow1;
      ctx.fillRect(0, 0, 500, 500);

      const glow2 = ctx.createRadialGradient(650, 750, 20, 650, 750, 350);
      glow2.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
      glow2.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = glow2;
      ctx.fillRect(300, 400, 500, 560);

      // 外枠
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(30, 30, w - 60, h - 60, 28);
      ctx.stroke();

      // 2. ヘッダー
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('VocalAI', 60, 95);

      ctx.fillStyle = '#a78bfa';
      ctx.font = 'bold 16px "Noto Sans JP", sans-serif';
      ctx.fillText('AI歌唱・音域分析カルテ', 225, 93);

      const now = new Date();
      const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px "Noto Sans JP", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`診断日: ${dateStr}`, w - 60, 93);
      ctx.textAlign = 'left';

      // 区切り線
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.moveTo(60, 120);
      ctx.lineTo(w - 60, 120);
      ctx.stroke();

      // 3. ユーザー名
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 26px "Noto Sans JP", sans-serif';
      ctx.fillText(`${profile.name || 'あなた'} さんの音域診断結果`, 60, 175);

      // 4. 地声音域カード & 裏声音域カード
      const cardW = 325;
      const cardH = 150;
      const cardY = 210;

      // 地声
      ctx.fillStyle = 'rgba(24, 34, 52, 0.85)';
      ctx.beginPath();
      ctx.roundRect(60, cardY, cardW, cardH, 20);
      ctx.fill();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.45)';
      ctx.stroke();

      ctx.fillStyle = '#c084fc';
      ctx.font = 'bold 15px "Noto Sans JP", sans-serif';
      ctx.fillText('● 地声（チェストボイス）', 80, cardY + 38);

      const chestLowK = formatKaraokeNote(profile.chest_low);
      const chestHighK = formatKaraokeNote(profile.chest_high);
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 32px "Plus Jakarta Sans", "Noto Sans JP", sans-serif';
      ctx.fillText(`${chestLowK} 〜 ${chestHighK}`, 80, cardY + 86);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px "Noto Sans JP", sans-serif';
      ctx.fillText(`原音: ${profile.chest_low} 〜 ${profile.chest_high}`, 80, cardY + 120);

      // 裏声
      ctx.fillStyle = 'rgba(24, 34, 52, 0.85)';
      ctx.beginPath();
      ctx.roundRect(415, cardY, cardW, cardH, 20);
      ctx.fill();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.45)';
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 15px "Noto Sans JP", sans-serif';
      ctx.fillText('● 裏声（ファルセット）', 435, cardY + 38);

      const falsettoLowK = formatKaraokeNote(profile.falsetto_low);
      const falsettoHighK = formatKaraokeNote(profile.falsetto_high);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '900 32px "Plus Jakarta Sans", "Noto Sans JP", sans-serif';
      ctx.fillText(`${falsettoLowK} 〜 ${falsettoHighK}`, 435, cardY + 86);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px "Noto Sans JP", sans-serif';
      ctx.fillText(`原音: ${profile.falsetto_low} 〜 ${profile.falsetto_high}`, 435, cardY + 120);

      // 5. 音域バー
      const barY = 395;
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('lowC', 60, barY);
      ctx.fillText('mid1C', 205, barY);
      ctx.fillText('mid2C', 380, barY);
      ctx.fillText('hiC', 560, barY);
      ctx.fillText('hihiC', 700, barY);

      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.roundRect(60, barY + 10, w - 120, 16, 8);
      ctx.fill();

      const chestLowMidi = noteToMidi(profile.chest_low) || 48;
      const falsettoHighMidi = noteToMidi(profile.falsetto_high) || 72;
      const minM = 36;
      const maxM = 84;
      const startPct = Math.max(0, Math.min(1, (chestLowMidi - minM) / (maxM - minM)));
      const endPct = Math.max(0, Math.min(1, (falsettoHighMidi - minM) / (maxM - minM)));
      const fillX = 60 + startPct * (w - 120);
      const fillW = Math.max(20, (endPct - startPct) * (w - 120));

      const barGrad = ctx.createLinearGradient(fillX, 0, fillX + fillW, 0);
      barGrad.addColorStop(0, '#8b5cf6');
      barGrad.addColorStop(1, '#06b6d4');
      ctx.fillStyle = barGrad;
      ctx.beginPath();
      ctx.roundRect(fillX, barY + 10, fillW, 16, 8);
      ctx.fill();

      // 6. おすすめ楽曲
      const songSecY = 460;
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px "Noto Sans JP", sans-serif';
      ctx.fillText('🎯 あなたの声にぴったり歌いやすい曲', 60, songSecY);

      const allSongs = getAllSongs();
      const recSongs = allSongs.filter(s => {
        const c = calculateCompatibility(profile, s);
        return c.title === '歌いやすそう';
      }).slice(0, 3);

      const songListToDraw = recSongs.length >= 2 ? recSongs : allSongs.slice(0, 3);
      songListToDraw.forEach((song, idx) => {
        const sy = songSecY + 30 + idx * 95;
        ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
        ctx.beginPath();
        ctx.roundRect(60, sy, w - 120, 80, 16);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.stroke();

        ctx.fillStyle = '#8b5cf6';
        ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(`#${idx + 1}`, 85, sy + 48);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px "Noto Sans JP", sans-serif';
        ctx.fillText(song.title, 130, sy + 36);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px "Noto Sans JP", sans-serif';
        ctx.fillText(song.artist, 130, sy + 62);

        const highK = formatKaraokeNote(song.highest_note);
        ctx.fillStyle = 'rgba(168, 85, 247, 0.2)';
        ctx.beginPath();
        ctx.roundRect(w - 240, sy + 25, 160, 32, 10);
        ctx.fill();
        ctx.fillStyle = '#c084fc';
        ctx.font = 'bold 14px "Noto Sans JP", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`最高音: ${highK}`, w - 160, sy + 47);
        ctx.textAlign = 'left';
      });

      // 7. フッター
      const footY = 860;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.moveTo(60, footY);
      ctx.lineTo(w - 60, footY);
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('VocalAI - 無料カラオケ音域診断＆トレーナー', 60, footY + 36);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '13px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('https://kamagata0.github.io/vocal-range-app/', w - 60, footY + 36);
      ctx.textAlign = 'left';
    }

    function openShareCardModal() {
      if (!elements.modalShareCard || !elements.shareCardCanvas) return;
      const userProfile = getUserProfile();
      drawShareCard(elements.shareCardCanvas, userProfile);
      elements.modalShareCard.classList.remove('hidden');
      elements.modalShareCard.classList.add('flex');
    }

    function initShareCard() {
      if (elements.btnHomeShareCard) {
        elements.btnHomeShareCard.addEventListener('click', () => openShareCardModal());
      }
      if (elements.btnCloseShareModal && elements.modalShareCard) {
        elements.btnCloseShareModal.addEventListener('click', () => {
          elements.modalShareCard.classList.add('hidden');
          elements.modalShareCard.classList.remove('flex');
        });
      }

      if (elements.btnShareToX) {
        elements.btnShareToX.addEventListener('click', () => {
          const profile = getUserProfile();
          const chestLowK = formatKaraokeNote(profile.chest_low);
          const chestHighK = formatKaraokeNote(profile.chest_high);
          const falsettoLowK = formatKaraokeNote(profile.falsetto_low);
          const falsettoHighK = formatKaraokeNote(profile.falsetto_high);

          const allSongs = getAllSongs();
          const recSongs = allSongs.filter(s => calculateCompatibility(profile, s).title === '歌いやすそう').slice(0, 2);
          const songText = recSongs.map(s => `『${s.title}』`).join('や');

          const text = `【VocalAI】私の声の音域を診断しました！\n🎙️ 地声音域: ${chestLowK} 〜 ${chestHighK}\n✨ 裏声音域: ${falsettoLowK} 〜 ${falsettoHighK}\nぴったり歌える曲: ${songText || '最新ヒット曲'}\n\n自分の音域と相性曲を無料診断👇\nhttps://kamagata0.github.io/vocal-range-app/\n#VocalAI #音域診断 #カラオケ`;
          const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
          window.open(url, '_blank');
        });
      }

      if (elements.btnDownloadShareCard && elements.shareCardCanvas) {
        elements.btnDownloadShareCard.addEventListener('click', () => {
          const dataUrl = elements.shareCardCanvas.toDataURL('image/png');
          const a = document.createElement('a');
          a.download = `VocalAI_音域診断カルテ_${new Date().toISOString().split('T')[0]}.png`;
          a.href = dataUrl;
          a.click();
          showToast('診断カード画像を保存しました！');
        });
      }

      if (elements.btnNativeShareCard && elements.shareCardCanvas) {
        elements.btnNativeShareCard.addEventListener('click', async () => {
          const profile = getUserProfile();
          const shareText = `私の声の音域は【地声: ${formatKaraokeNote(profile.chest_low)}〜${formatKaraokeNote(profile.chest_high)}】でした！ #VocalAI`;
          try {
            if (navigator.share) {
              elements.shareCardCanvas.toBlob(async (blob) => {
                if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], 'vocal-ai.png', { type: 'image/png' })] })) {
                  const file = new File([blob], 'vocal-ai-range.png', { type: 'image/png' });
                  await navigator.share({
                    title: 'VocalAI 音域診断カード',
                    text: shareText,
                    files: [file]
                  });
                } else {
                  await navigator.share({
                    title: 'VocalAI 音域診断カード',
                    text: shareText,
                    url: 'https://kamagata0.github.io/vocal-range-app/'
                  });
                }
              });
            } else {
              elements.btnDownloadShareCard.click();
            }
          } catch (err) {
            console.log(err);
          }
        });
      }
    }

    // 起動時の初期レンダリング
    populateNoteSelectors();
    populateArtistFilter();
    loadUserProfile();
    renderSongList();
    renderHomeRecommendations();
    renderPracticeLogs();
    initGrowthChart();
    initPianoKeys();
    initHighestFilters();
    initKeyShiftSimulator();
    initShareCard();

    if (elements.logInputDate) {
      elements.logInputDate.value = new Date().toISOString().split('T')[0];
    }
    if (window.lucide) window.lucide.createIcons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
