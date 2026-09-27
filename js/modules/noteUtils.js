// 音名とMIDIノート番号の相互変換、音域計算、相性判定ロジック

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// カラオケ音域通称（日本のカラオケ愛好家に馴染み深い表記：mid1A, mid2G, hiA, hihiA など）
export function getKaraokeNoteName(midiNote) {
  if (!midiNote || midiNote < 36 || midiNote > 96) return '';
  const noteIndex = midiNote % 12;
  const octave = Math.floor(midiNote / 12) - 1;
  const noteName = NOTE_NAMES[noteIndex];

  if (octave === 1) return `lowlow${noteName}`;
  if (octave === 2) return `low${noteName}`;
  if (octave === 3) return `mid1${noteName}`;
  if (octave === 4) return `mid2${noteName}`;
  if (octave === 5) return `hi${noteName}`;
  if (octave === 6) return `hihi${noteName}`;
  return `${noteName}${octave}`;
}

// "C4" -> 60
export function noteToMidi(noteStr) {
  if (!noteStr || typeof noteStr !== 'string') return null;
  const match = noteStr.trim().toUpperCase().match(/^([A-G]#?)(-?\d+)$/);
  if (!match) return null;
  const note = match[1];
  const octave = parseInt(match[2], 10);
  const noteIndex = NOTE_NAMES.indexOf(note);
  if (noteIndex === -1) return null;
  return (octave + 1) * 12 + noteIndex;
}

// 60 -> "C4"
export function midiToNote(midi) {
  if (typeof midi !== 'number' || isNaN(midi)) return '';
  const noteIndex = ((midi % 12) + 12) % 12;
  const octave = Math.floor(midi / 12) - 1;
  return `${NOTE_NAMES[noteIndex]}${octave}`;
}

// 全音域リスト生成 (C2〜C6)
export function getAvailableNotes(minNote = 'C2', maxNote = 'C6') {
  const minMidi = noteToMidi(minNote) || 36;
  const maxMidi = noteToMidi(maxNote) || 84;
  const list = [];
  for (let m = minMidi; m <= maxMidi; m++) {
    const note = midiToNote(m);
    const karaoke = getKaraokeNoteName(m);
    list.push({
      midi: m,
      name: note,
      label: `${note} (${karaoke})`,
      karaoke
    });
  }
  return list;
}

/**
 * ユーザーの音域と楽曲の音域を比較し相性を判定
 * @param {Object} userProfile ユーザーの音域情報
 * @param {Object} song 楽曲データ
 */
export function calculateCompatibility(userProfile, song) {
  if (!userProfile || !userProfile.chest_high) {
    return {
      status: 'unknown',
      badgeClass: 'badge-neutral',
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
      badgeClass: 'badge-neutral',
      title: '判定不可',
      reason: '音域データが不足しています。',
      recommendedKey: 0
    };
  }

  const highDiff = songHigh - userChestHigh; // 曲最高音 - 地声最高音 (プラスなら曲のほうが高い)
  const lowDiff = songLow - userChestLow;   // 曲最低音 - 地声最低音 (マイナスなら曲のほうが低い)

  let title = '';
  let badgeClass = '';
  let reason = '';
  let recommendedKey = 0;

  // おすすめキー調整（地声最高音を基準に、曲最高音を収めるためのキー）
  if (highDiff > 0) {
    recommendedKey = -highDiff;
  } else if (highDiff < -4) {
    // 曲が低すぎる場合はキー上げ推奨
    recommendedKey = Math.min(4, Math.abs(highDiff) - 2);
  }

  // 判定ロジック
  if (highDiff <= 0 && lowDiff >= 0) {
    title = '歌いやすそう';
    badgeClass = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    reason = `曲の最高音(${song.highest_note})・最低音(${song.lowest_note})があなたの地声の範囲内に無理なく収まっています。原曲キーで気持ちよく歌えそうです！`;
  } else if (highDiff > 0 && songHigh <= userFalsettoHigh) {
    title = '裏声を活用すると歌いやすそう';
    badgeClass = 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    reason = `最高音(${song.highest_note})は地声最高音(${userProfile.chest_high})より${highDiff}半音高めですが、あなたの裏声音域(${userProfile.falsetto_high})ならカバーできます。サビのファルセット・ミックスボイス練習に最適です。`;
  } else if (highDiff >= 1 && highDiff <= 2) {
    title = 'やや高め';
    badgeClass = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    reason = `あなたの最高音(${userProfile.chest_high})より曲の最高音が${highDiff}半音高いため、サビの高音部分は少し張る必要があります。キーを${recommendedKey}にするか、少しの高音練習で歌える範囲です。`;
  } else if (highDiff >= 3 && highDiff <= 5) {
    title = '高音練習向け';
    badgeClass = 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
    reason = `あなたの最高音より${highDiff}音(半音)高く、現状では高音がきつく感じやすい曲です。キーを${recommendedKey}に下げるか、高音域を広げるステップアップ練習にぴったりです。`;
  } else if (highDiff > 5) {
    title = '難易度高め';
    badgeClass = 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    reason = `曲の最高音(${song.highest_note})が地声最高音より${highDiff}半音離れており、原曲キーの難易度はかなり高めです。キーを${recommendedKey}前後下げるか、ファルセットの強化が必要です。`;
  } else if (lowDiff < 0) {
    title = '低音練習向け';
    badgeClass = 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    reason = `曲の最低音(${song.lowest_note})があなたの最低音(${userProfile.chest_low})より${Math.abs(lowDiff)}半音低いです。低音の響きを意識した練習に活用できます。`;
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
    lowDiff,
    songHighMidi: songHigh,
    songLowMidi: songLow,
    userHighMidi: userChestHigh,
    userLowMidi: userChestLow
  };
}
