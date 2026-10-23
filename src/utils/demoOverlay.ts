import { Page, test } from '@playwright/test';

/**
 * Injects a visual Live Demo HUD overlay and element spotlight into the browser page
 * so spectators can follow the active test case, current step, and interacted elements in real time.
 * Uses only <div> and <span> with pointer-events: none so it never interferes with application locators.
 */
export async function installDemoOverlay(page: Page, testTitle: string): Promise<void> {
  if (process.env.CI) return;

  await page.addInitScript(
    ({ initialTestTitle }) => {
      const mountHud = () => {
        if (document.getElementById('pw-live-demo-hud')) return;

        const style = document.createElement('style');
        style.id = 'pw-live-demo-style';
        style.textContent = `
          #pw-live-demo-hud {
            position: fixed;
            bottom: 16px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 2147483647;
            pointer-events: none;
            background: rgba(15, 23, 42, 0.92);
            color: #f8fafc;
            padding: 12px 20px;
            border-radius: 12px;
            border: 2px solid #38bdf8;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.45);
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            min-width: 540px;
            max-width: 88vw;
            backdrop-filter: blur(6px);
            transition: all 0.2s ease;
          }
          #pw-live-demo-hud .pw-hud-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #38bdf8;
            font-weight: 700;
            margin-bottom: 4px;
          }
          #pw-live-demo-hud .pw-hud-title {
            font-size: 15px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          #pw-live-demo-hud .pw-hud-step {
            font-size: 13.5px;
            color: #fde047;
            font-weight: 600;
            margin-bottom: 2px;
          }
          #pw-live-demo-hud .pw-hud-action {
            font-size: 12.5px;
            color: #cbd5e1;
          }
          .pw-demo-highlight {
            outline: 3px solid #f43f5e !important;
            outline-offset: 2px !important;
            box-shadow: 0 0 16px rgba(244, 63, 94, 0.75) !important;
            transition: outline 0.15s ease, box-shadow 0.15s ease !important;
          }
        `;
        document.head.appendChild(style);

        const hud = document.createElement('div');
        hud.id = 'pw-live-demo-hud';

        const savedStep = sessionStorage.getItem('pw_demo_step') || 'Inicializace testu...';
        const savedAction = sessionStorage.getItem('pw_demo_action') || 'Načítání stránky...';
        const savedTitle = sessionStorage.getItem('pw_demo_title') || initialTestTitle;

        hud.innerHTML = `
          <div class="pw-hud-header">
            <span>🎭 LIVE DEMO • POPULON AUTOMATED TESTING</span>
            <span>● REC / SLOW-MO</span>
          </div>
          <div class="pw-hud-title" id="pw-hud-title"></div>
          <div class="pw-hud-step" id="pw-hud-step"></div>
          <div class="pw-hud-action" id="pw-hud-action"></div>
        `;
        document.body.appendChild(hud);

        const titleEl = document.getElementById('pw-hud-title');
        const stepEl = document.getElementById('pw-hud-step');
        const actionEl = document.getElementById('pw-hud-action');
        if (titleEl) titleEl.textContent = savedTitle;
        if (stepEl) stepEl.textContent = '▶ ' + savedStep;
        if (actionEl) actionEl.textContent = '⚡ ' + savedAction;
      };

      const setAction = (text: string, target?: Element | null) => {
        sessionStorage.setItem('pw_demo_action', text);
        const actionEl = document.getElementById('pw-hud-action');
        if (actionEl) actionEl.textContent = '⚡ ' + text;

        document.querySelectorAll('.pw-demo-highlight').forEach((el) => el.classList.remove('pw-demo-highlight'));
        if (target && target instanceof HTMLElement && target.id !== 'pw-live-demo-hud') {
          target.classList.add('pw-demo-highlight');
        }
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mountHud);
      } else {
        mountHud();
      }

      document.addEventListener(
        'mousedown',
        (e) => {
          mountHud();
          const t = e.target as HTMLElement | null;
          if (!t) return;
          const label = (t.innerText || t.getAttribute('value') || t.getAttribute('name') || t.tagName).trim().slice(0, 60);
          setAction(`Kliknutí na prvek: "${label}"`, t);
        },
        true
      );

      document.addEventListener(
        'focusin',
        (e) => {
          mountHud();
          const t = e.target as HTMLElement | null;
          if (!t) return;
          const name = t.getAttribute('name') || t.getAttribute('placeholder') || t.tagName;
          setAction(`Aktivní pole: ${name}`, t);
        },
        true
      );

      document.addEventListener(
        'input',
        (e) => {
          mountHud();
          const t = e.target as HTMLInputElement | null;
          if (!t) return;
          const isPassword = t.getAttribute('type') === 'password';
          const val = isPassword ? '••••••••' : (t.value || '').slice(0, 50);
          const name = t.getAttribute('name') || 'pole';
          setAction(`Vyplňování [${name}]: "${val}"`, t);
        },
        true
      );
    },
    { initialTestTitle: testTitle }
  );
}

/**
 * Updates the visible step banner inside the browser and wraps Playwright's test.step.
 */
export async function demoStep<T>(page: Page, stepTitle: string, body: () => Promise<T>): Promise<T> {
  return await test.step(stepTitle, async () => {
    if (!process.env.CI) {
      await page
        .evaluate((s) => {
          sessionStorage.setItem('pw_demo_step', s);
          const el = document.getElementById('pw-hud-step');
          if (el) el.textContent = '▶ ' + s;
        }, stepTitle)
        .catch(() => {});
    }
    return await body();
  });
}
