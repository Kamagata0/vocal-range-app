// ローカルストレージ管理モジュール（ユーザー情報・練習履歴）

const STORAGE_KEYS = {
  USER_PROFILE: 'vocal_range_user_profile',
  PRACTICE_LOGS: 'vocal_range_practice_logs'
};

// デフォルトの初期プロフィール（未登録時の初期値）
const DEFAULT_PROFILE = {
  id: 'guest-user',
  name: 'シンガー',
  gender: 'male',
  chest_low: 'C3',
  chest_high: 'G4',
  falsetto_low: 'E4',
  falsetto_high: 'C5',
  favorite_genres: ['J-POP', 'ロック'],
  weak_points: ['高音になると喉が締まる', '地声と裏声のつながり'],
  practice_goals: ['ミックスボイスの習得', 'hiAを安定して出したい']
};

export function getUserProfile() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!data) return DEFAULT_PROFILE;
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to get user profile from localStorage', e);
    return DEFAULT_PROFILE;
  }
}

export function saveUserProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    return true;
  } catch (e) {
    console.error('Failed to save user profile to localStorage', e);
    return false;
  }
}

export function getPracticeLogs() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRACTICE_LOGS);
    if (!data) {
      // 初期のサンプル練習記録を1件用意
      const initialLogs = [
        {
          id: 'log-sample-1',
          song_id: 'song-2',
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
    console.error('Failed to get practice logs', e);
    return [];
  }
}

export function addPracticeLog(log) {
  try {
    const logs = getPracticeLogs();
    const newLog = {
      id: 'log-' + Date.now(),
      created_at: new Date().toISOString(),
      ...log
    };
    logs.unshift(newLog); // 最新を先頭に
    localStorage.setItem(STORAGE_KEYS.PRACTICE_LOGS, JSON.stringify(logs));
    return newLog;
  } catch (e) {
    console.error('Failed to add practice log', e);
    return null;
  }
}

export function deletePracticeLog(id) {
  try {
    const logs = getPracticeLogs().filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.PRACTICE_LOGS, JSON.stringify(logs));
    return true;
  } catch (e) {
    console.error('Failed to delete practice log', e);
    return false;
  }
}
