import { describe, expect, it } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { applicationQuestions, faqItems, program } from './content.js';
import { validateApplication } from './validation.js';

describe('ブートキャンプLP', () => {
  it('確定した料金を表示するべき', () => {
    expect(program.priceLabel).toBe('2日間 / 1名 200,000円（税別）');
    expect(program.maxParticipants).toBe(6);
  });

  it('FAQを4件用意するべき', () => {
    expect(faqItems).toHaveLength(4);
  });

  it('申し込みは1問1答の質問を用意するべき', () => {
    expect(applicationQuestions.map((question) => question.key)).toEqual([
      'name',
      'company',
      'email',
      'participants',
      'teamProfile',
      'challenge',
      'schedule',
    ]);
  });

  it('必須項目が揃うと参加申し込みできるべき', () => {
    const result = validateApplication({
      agreement: 'agreed',
      challenge: '社内の営業提案プロセスを生成AIで試作したい',
      company: '株式会社サンプル',
      email: 'taro.yamada@example.co.jp',
      name: '山田 太郎',
      participants: '6',
      schedule: '2026年7月下旬',
      teamProfile: 'エンジニア3名、企画2名、DX推進1名',
    });

    expect(result.ok).toBe(true);
  });

  it('7名以上は応相談として参加申し込みできるべき', () => {
    const result = validateApplication({
      agreement: 'agreed',
      challenge: '事業アイデアを動くプロトタイプにしたい',
      company: '株式会社サンプル',
      email: 'taro.yamada@example.co.jp',
      name: '山田 太郎',
      participants: 'consult',
      schedule: '未定',
      teamProfile: '複数部署から参加予定',
    });

    expect(result.ok).toBe(true);
  });

  it('同意がない場合は参加申し込みできないべき', () => {
    const result = validateApplication({
      agreement: '',
      challenge: '社内の営業提案プロセスを生成AIで試作したい',
      company: '株式会社サンプル',
      email: 'taro.yamada@example.co.jp',
      name: '山田 太郎',
      participants: '6',
      schedule: '2026年7月下旬',
      teamProfile: 'エンジニア3名、企画2名、DX推進1名',
    });

    expect(result.ok).toBe(false);
    expect(result.errors.agreement).toBe(
      '個人情報の取り扱いへの同意が必要です。'
    );
  });

  it('HTMLに主要セクションを含むべき', async () => {
    const html = await readFile(
      new URL('../index.html', import.meta.url),
      'utf8'
    );

    expect(html).toContain('id="apply"');
    expect(html).toContain('data-application-flow');
    expect(html).toContain('data-faq-button');
    expect(html).toContain('2日間 / 1名 200,000円（税別）');
    expect(html).toContain('通常枠は6名まで。7名以上は応相談。');
    expect(html).not.toContain('Scale Inside');
  });
});
