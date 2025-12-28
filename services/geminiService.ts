import { GoogleGenAI } from "@google/genai";
import { MOCK_AUDIT_LOGS, MOCK_INVENTORY, MOCK_SHIPMENTS } from "../constants";

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }
  return aiClient;
};

export const generateOperationalInsight = async (): Promise<string> => {
  try {
    const ai = getClient();
    
    // Prepare context data
    const context = {
      activeShipments: MOCK_SHIPMENTS.filter(s => s.status !== 'Concluído').length,
      quarantineItems: MOCK_INVENTORY.filter(i => i.status === 'Em Quarentena').length,
      recentLogs: MOCK_AUDIT_LOGS.slice(0, 5),
      divergences: MOCK_SHIPMENTS.filter(s => s.status === 'Com Divergência')
    };

    const prompt = `
      Você é um especialista em logística operacional e qualidade médica.
      Analise os seguintes dados operacionais do sistema Medflow e forneça um resumo executivo de 3 pontos em Markdown.
      Foque em riscos, gargalos e sugestões de ação.
      Seja conciso, técnico e profissional.

      Dados Atuais:
      ${JSON.stringify(context, null, 2)}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Não foi possível gerar a análise no momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao conectar com o módulo de inteligência. Verifique a chave de API.";
  }
};