import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON with generous payload limit for base64 images
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Initialize Gemini SDK lazily / with fallback
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[Gemini] GEMINI_API_KEY is not set. Mock/smart fallback will be used if needed.');
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'KAORI API', timestamp: new Date().toISOString() });
});

// Photo verification endpoint using Gemini Multimodal
app.post('/api/verify-mission', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', missionId, missionName, targetKeyword } = req.body;

    if (!imageBase64) {
      return res.status(400).json({
        isMatch: false,
        detectedObject: '画像なし',
        confidence: 'low',
        comment: '写真データが選択されていないようです。もう一度撮影してみてね！',
      });
    }

    // Clean base64 string if data URL prefix exists
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+]+;base64,/, '');

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback graceful handler if API key is not yet configured in local test
      console.log('[Gemini Verification] Fallback evaluation (no API key configured). Accepting for trial.');
      return res.json({
        isMatch: true,
        detectedObject: missionName || 'お風呂グッズ',
        confidence: 'high',
        comment: `${missionName}を発見しました！気持ちよくお風呂に入れて素晴らしいです✨`,
        reasoning: 'Fallback mode verification.',
      });
    }

    const prompt = `あなたは「お風呂に入りたくなる育成ゲームアプリ KAORI」の優しいAI審判です。
ユーザーがお風呂に入った証明として写真を提出しました。

【今受けているミッション】
- 対象アイテム: 「${missionName}」 (${targetKeyword})
- ミッションID: ${missionId}

【判定基準】
1. 写真の中に、指定された「${missionName}」（またはそれに該当する一般的なお風呂・洗面用品、入浴剤・バスボム・バスソルトのパッケージや湯に入れた様子、湯船・お湯が張られた浴槽、お風呂用アヒルやおもちゃ・湯桶、シャンプー・ボディソープ・石鹸のボトルやチューブ、タオル、ドライヤーなど）が写っているかを判断してください。
2. 多少暗かったり、斜めであったり、詰め替え用や一部の画角、使用中の状態であっても、対象物と合理的に判断できれば寛容に isMatch = true としてください。特に「入浴剤」は個包装袋、箱、バスボム本体、バスソルト容器、または色づいた湯船などでもOKです。
3. 全く関係のないもの（例: パソコン画面、机の上の書類、ペット、外の風景、ペットボトルや文房具など明らかに該当しないもの）や、真っ暗・真っ白で何も判別不能な場合のみ isMatch = false としてください。
4. ユーザーを責めない温かく可愛いトーンで短い日本語のコメント（comment）を返してください。
5. 写真の中で見つかった主な物体名を「detectedObject」（例: 「炭酸入浴剤のパッケージ」「お湯が張られた湯船」「黄色いラバーダック」「シャンプーボトル」「固形石鹸と泡立てネット」「ヘアドライヤー」「ふんわりバスタオル」「洗顔フォーム」など）に記載してください。
6. なぜその判定に至ったかの具体的な理由（reason）を簡潔に記載してください（例: 「画像に入浴剤のパッケージを確認しました。いい香りで癒やされそうですね！」「画像にお湯が張られた湯船を確認できました」「画像に写っているのは筆記用具で、入浴剤は確認できませんでした」など）。

必ず指定されたJSONフォーマットのみで回答してください。`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isMatch: {
              type: Type.BOOLEAN,
              description: 'True if the target bath item is identified in the photo, false otherwise',
            },
            detectedObject: {
              type: Type.STRING,
              description: 'The primary object recognized in the picture (in Japanese)',
            },
            confidence: {
              type: Type.STRING,
              description: 'Confidence level: high, medium, or low',
            },
            reason: {
              type: Type.STRING,
              description: 'Specific reason for the judgment in Japanese',
            },
            comment: {
              type: Type.STRING,
              description: 'Encouraging and gentle comment in Japanese for the user',
            },
          },
          required: ['isMatch', 'detectedObject', 'confidence', 'comment', 'reason'],
        },
      },
    });

    const responseText = response.text ? response.text.trim() : '';
    let parsedResult;
    try {
      parsedResult = JSON.parse(responseText);
    } catch (parseErr) {
      console.error('Failed to parse Gemini response as JSON:', responseText, parseErr);
      // Fallback matching
      const isMatch = !responseText.toLowerCase().includes('false') && !responseText.includes('見つかりません');
      parsedResult = {
        isMatch: isMatch,
        detectedObject: isMatch ? `${missionName}` : '確認できませんでした',
        confidence: 'medium',
        comment: isMatch
          ? `${missionName}を確認できました！お風呂タイムお疲れ様でした！`
          : `${missionName}が見つからなかったみたい。もう一度撮ってみよう！`,
      };
    }

    return res.json(parsedResult);
  } catch (error: any) {
    console.error('Error during Gemini photo verification:', error);
    return res.status(500).json({
      isMatch: false,
      detectedObject: 'エラー',
      confidence: 'low',
      comment: '通信またはAI解析でエラーが発生しました。もう一度試してみてね！',
      error: error.message,
    });
  }
});

// Vite / static file serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌸 KAORI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
