// Web Audio APIを用いたリアルタイムピッチ（音高）検出モジュール
// 自己相関法 (Autocorrelation Algorithm) を採用

import { midiToNote, getKaraokeNoteName } from './noteUtils.js';

let audioContext = null;
let analyser = null;
let mediaStream = null;
let isListening = false;
let rafId = null;

// 周波数(Hz)からMIDIノート番号を計算
function frequencyToMidi(freq) {
  // A4 = 440Hz = MIDI 69
  return Math.round(69 + 12 * Math.log2(freq / 440));
}

// 自己相関法によるピッチ検出
function autoCorrelate(buf, sampleRate) {
  const SIZE = buf.length;
  let rms = 0;

  for (let i = 0; i < SIZE; i++) {
    const val = buf[i];
    rms += val * val;
  }
  rms = Math.sqrt(rms / SIZE);

  // ノイズゲート（静かな環境音は無視。十分な声量がある場合のみ検出）
  if (rms < 0.015) {
    return -1;
  }

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

  // 放物線補間（周波数の微調整）
  const x1 = c[T0 - 1];
  const x2 = c[T0];
  const x3 = c[T0 + 1];
  const a = (x1 + x3 - 2 * x2) / 2;
  const b = (x3 - x1) / 2;
  if (a) T0 = T0 - b / (2 * a);

  return sampleRate / T0;
}

export async function startPitchDetection(onPitchDetected, onError) {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      onError('このブラウザは音声解析に対応していません。');
      return false;
    }

    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
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

      // 人間の通常の発声周波数（約65Hz [C2] 〜 1100Hz [C6]）の範囲のみ採用
      if (freq !== -1 && freq >= 65 && freq <= 1100) {
        const midi = frequencyToMidi(freq);
        if (midi >= 36 && midi <= 84) {
          const noteName = midiToNote(midi);
          const karaokeName = getKaraokeNoteName(midi);
          onPitchDetected({
            frequency: Math.round(freq),
            midi,
            noteName,
            karaokeName
          });
        }
      }
      rafId = requestAnimationFrame(updatePitch);
    }

    updatePitch();
    return true;
  } catch (err) {
    console.error('Microphone access error:', err);
    onError('マイクへのアクセスが拒否されたか、マイクが見つかりませんでした。ブラウザの設定でマイクを許可してください。');
    return false;
  }
}

export function stopPitchDetection() {
  isListening = false;
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
  }
  if (audioContext && audioContext.state !== 'closed') {
    audioContext.close();
    audioContext = null;
  }
}
