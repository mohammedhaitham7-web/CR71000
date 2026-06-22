/* ============================================================
   CR7 — MEMBERS AUTH  (Supabase · email + password)
   ------------------------------------------------------------
   Powers the "Members Zone" login on the CR7 site.
   You only need to edit the TWO values in STEP 1 below.
   ============================================================ */
(function () {
  'use strict';

  /* ============================================================
     STEP 1 — PASTE YOUR SUPABASE PROJECT VALUES HERE
     Find them in Supabase  →  Project Settings  →  API Keys:
       • SUPABASE_URL      = the "Project URL"
       • SUPABASE_ANON_KEY = the "Publishable" key (sb_publishable_...) or legacy "anon" key
     The anon key is SAFE to keep in this file — it is designed
     to be public. NEVER paste the "service_role" key here.
     ============================================================ */
  const SUPABASE_URL      = 'https://bvlzbrtmgcfumjsmwuec.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_GP923q8qC8T0GNUWmnjkQw_LmDSYYTT';
  /* ---------------------------------------------------------- */

  // --- Grab the page elements (all live inside #members) ---
  const $ = (id) => document.getElementById(id);
  const gate      = $('memberGate');     // locked view (the forms)
  const unlocked  = $('memberUnlocked'); // unlocked view (member content)
  const emailEl   = $('authEmail');
  const passEl    = $('authPass');
  const msgEl     = $('authMsg');
  const userEl    = $('memberEmail');
  const btnLogin  = $('btnLogin');
  const btnSignup = $('btnSignup');
  const btnLogout = $('btnLogout');
  const authWrap  = $('authWrap');    // wrapper around the login form
  const memberSoon = $('memberSoon'); // the "launching soon" placeholder

  if (!gate) return; // Members section not on this page — nothing to do.

  // Inside the locked gate, show EITHER the real form OR the "coming soon" card.
  const showForm = () => { if (authWrap) authWrap.hidden = false; if (memberSoon) memberSoon.hidden = true; };
  const showSoon = () => { if (authWrap) authWrap.hidden = true;  if (memberSoon) memberSoon.hidden = false; };

  const setMsg = (text, type) => {        // type: 'ok' | 'err' | undefined
    msgEl.textContent = text || '';
    msgEl.className = 'auth-msg' + (type ? ' ' + type : '');
  };

  // --- Show the correct half depending on whether we have a session ---
  const render = (session) => {
    const inside = !!session;
    gate.hidden = inside;
    unlocked.hidden = !inside;
    if (inside && userEl) userEl.textContent = session.user.email;
  };

  // --- Not connected yet? Show the friendly "launching soon" card and stop. ---
  if (SUPABASE_URL.indexOf('PASTE_') === 0 || SUPABASE_ANON_KEY.indexOf('PASTE_') === 0) {
    showSoon();
    console.warn('[CR7 Auth] Add your Supabase URL + anon key in auth.js (STEP 1) to switch the placeholder to the real login.');
    return;
  }

  // --- Keys are set → reveal the real login form. ---
  showForm();

  // --- Make sure the Supabase library actually loaded. ---
  if (!window.supabase || !window.supabase.createClient) {
    setMsg('Could not load the login library. Please reload the page.', 'err');
    [btnLogin, btnSignup].forEach((b) => { if (b) b.disabled = true; });
    return;
  }

  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const busy  = (on) => { [btnLogin, btnSignup].forEach((b) => { if (b) b.disabled = on; }); };
  const creds = () => ({ email: (emailEl.value || '').trim(), password: passEl.value || '' });
  const valid = ({ email, password }) => {
    if (!email || email.indexOf('@') === -1) { setMsg('Enter a valid email address.', 'err'); return false; }
    if (password.length < 6) { setMsg('Password must be at least 6 characters.', 'err'); return false; }
    return true;
  };

  // --- CREATE ACCOUNT ---
  btnSignup.addEventListener('click', async () => {
    const c = creds();
    if (!valid(c)) return;
    busy(true); setMsg('Creating your account…');
    const { data, error } = await sb.auth.signUp(c);
    busy(false);
    if (error) return setMsg(error.message, 'err');
    if (data.session) setMsg('Account created — you are in!', 'ok');               // email confirmation OFF
    else setMsg('Account created. Check your email to confirm, then log in.', 'ok'); // email confirmation ON
  });

  // --- LOG IN ---
  const doLogin = async () => {
    const c = creds();
    if (!valid(c)) return;
    busy(true); setMsg('Signing in…');
    const { error } = await sb.auth.signInWithPassword(c);
    busy(false);
    if (error) return setMsg(error.message, 'err');
    setMsg(''); // success — onAuthStateChange will reveal the member content
  };
  btnLogin.addEventListener('click', doLogin);
  passEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') doLogin(); });

  // --- LOG OUT ---
  btnLogout.addEventListener('click', async () => {
    await sb.auth.signOut();
    setMsg('');
    emailEl.value = '';
    passEl.value = '';
  });

  // --- Keep the UI in sync with the login state ---
  sb.auth.onAuthStateChange((_event, session) => render(session)); // login / logout / token refresh
  sb.auth.getSession().then(({ data }) => render(data.session));   // initial paint on page load
})();
