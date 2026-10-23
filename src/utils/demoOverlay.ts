import { Page, test } from '@playwright/test';
import readline from 'readline';

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

/**
 * Pauses test execution interactively during a live presentation so spectators can inspect a discovered bug.
 * Resumes immediately when the presenter presses ENTER (in terminal OR browser window), or clicks the on-screen HUD button.
 */
export async function pauseForInspection(
  page: Page,
  bugTitle: string,
  bugExplanation: string
): Promise<void> {
  if (process.env.CI) return;

  console.log(`\n========================================================================`);
  console.log(`⏸️  POZASTAVENO PRO PROHLÍDKU: ${bugTitle}`);
  console.log(`ℹ️  ${bugExplanation}`);
  console.log(`👉 Pokračujte stisknutím klávesy [ENTER] (v terminálu či prohlížeči)`);
  console.log(`   nebo klikněte na zlaté tlačítko [▶ Pokračovat] v dolním panelu prohlížeče.`);
  console.log(`========================================================================\n`);

  // Update HUD in browser
  await page
    .evaluate(
      ({ title, desc }) => {
        const stepEl = document.getElementById('pw-hud-step');
        const actionEl = document.getElementById('pw-hud-action');
        if (stepEl) {
          stepEl.style.color = '#f59e0b';
          stepEl.textContent = '⏸️ POZASTAVENO PRO PROHLÍDKU: ' + title;
        }
        if (actionEl) {
          actionEl.style.color = '#ffffff';
          actionEl.textContent = '🔍 ' + desc;
        }
      },
      { title: bugTitle, desc: bugExplanation }
    )
    .catch(() => {});

  let terminalCleanup: (() => void) | null = null;

  // 1. Browser listener: Enter/Space key or button click on HUD
  const browserPromise = page.evaluate(() => {
    return new Promise<void>((resolve) => {
      const hud = document.getElementById('pw-live-demo-hud');
      let btn: HTMLButtonElement | null = null;

      if (hud) {
        btn = document.createElement('button');
        btn.id = 'pw-hud-resume-btn';
        btn.textContent = '▶ Pokračovat [Stiskni Enter]';
        btn.style.cssText = `
          display: inline-block;
          margin-top: 8px;
          background: #f59e0b;
          color: #0f172a;
          font-weight: 800;
          font-size: 13px;
          padding: 6px 16px;
          border: 2px solid #ffffff;
          border-radius: 6px;
          cursor: pointer;
          pointer-events: auto;
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.6);
        `;
        btn.onclick = () => {
          btn?.remove();
          resolve();
        };
        hud.appendChild(btn);
      }

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.code === 'Space') {
          window.removeEventListener('keydown', onKeyDown);
          btn?.remove();
          resolve();
        }
      };
      window.addEventListener('keydown', onKeyDown);
    });
  });

  // 2. Terminal listener: Enter key in PowerShell / Terminal
  const terminalPromise = new Promise<void>((resolve) => {
    try {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      terminalCleanup = () => {
        rl.close();
      };
      rl.question('', () => {
        rl.close();
        resolve();
      });
    } catch {
      // In non-interactive stdin, fallback gracefully to browser listener
    }
  });

  // Wait for either action
  await Promise.race([browserPromise, terminalPromise]);
  if (typeof terminalCleanup === 'function') {
    (terminalCleanup as () => void)();
  }

  // Reset HUD
  await page
    .evaluate(() => {
      const btn = document.getElementById('pw-hud-resume-btn');
      if (btn) btn.remove();
      const stepEl = document.getElementById('pw-hud-step');
      if (stepEl) stepEl.style.color = '#fde047';
    })
    .catch(() => {});
}

/**
 * Initial presentation pause when a test window opens, allowing the presenter
 * to position/maximize the browser on the correct projector or monitor before starting.
 */
export async function pauseForScreenPlacement(page: Page, testTitle: string): Promise<void> {
  if (process.env.CI) return;

  console.log(`\n========================================================================`);
  console.log(`🖥️  PŘÍPRAVA PROJEKCE: ${testTitle}`);
  console.log(`👉 Přemístěte okno prohlížeče na požadovanou obrazovku / projektor.`);
  console.log(`   Až budete připraveni zahájit test, stiskněte [ENTER] (v terminálu či v prohlížeči)`);
  console.log(`   nebo klikněte na zelené tlačítko [▶ Spustit scénář] na obrazovce.`);
  console.log(`========================================================================\n`);

  await page
    .evaluate(
      ({ title }) => {
        const stepEl = document.getElementById('pw-hud-step');
        const actionEl = document.getElementById('pw-hud-action');
        if (stepEl) {
          stepEl.style.color = '#38bdf8';
          stepEl.textContent = '🖥️ PŘÍPRAVA PROJEKCE: ' + title;
        }
        if (actionEl) {
          actionEl.style.color = '#ffffff';
          actionEl.textContent = 'Přemístěte okno na správnou obrazovku a stiskněte Enter pro spuštění.';
        }
      },
      { title: testTitle }
    )
    .catch(() => {});

  let terminalCleanup: (() => void) | null = null;

  const browserPromise = page.evaluate(() => {
    return new Promise<void>((resolve) => {
      const hud = document.getElementById('pw-live-demo-hud');
      let btn: HTMLButtonElement | null = null;

      if (hud) {
        btn = document.createElement('button');
        btn.id = 'pw-hud-start-btn';
        btn.textContent = '▶ Spustit scénář [Stiskni Enter]';
        btn.style.cssText = `
          display: inline-block;
          margin-top: 8px;
          background: #10b981;
          color: #ffffff;
          font-weight: 800;
          font-size: 13px;
          padding: 6px 18px;
          border: 2px solid #ffffff;
          border-radius: 6px;
          cursor: pointer;
          pointer-events: auto;
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.6);
        `;
        btn.onclick = () => {
          btn?.remove();
          resolve();
        };
        hud.appendChild(btn);
      }

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.code === 'Space') {
          window.removeEventListener('keydown', onKeyDown);
          btn?.remove();
          resolve();
        }
      };
      window.addEventListener('keydown', onKeyDown);
    });
  });

  const terminalPromise = new Promise<void>((resolve) => {
    try {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      terminalCleanup = () => {
        rl.close();
      };
      rl.question('', () => {
        rl.close();
        resolve();
      });
    } catch {
      // In non-interactive stdin, fallback gracefully
    }
  });

  await Promise.race([browserPromise, terminalPromise]);
  if (typeof terminalCleanup === 'function') {
    (terminalCleanup as () => void)();
  }

  await page
    .evaluate(() => {
      const btn = document.getElementById('pw-hud-start-btn');
      if (btn) btn.remove();
      const stepEl = document.getElementById('pw-hud-step');
      if (stepEl) stepEl.style.color = '#fde047';
    })
    .catch(() => {});
}
