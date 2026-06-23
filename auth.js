/* ============================================================
   CR7 — MEMBERS AUTH  (Supabase · sign up + sign in)
   ------------------------------------------------------------
   Powers the "Members Zone" on the CR7 site:
     • Sign Up  — name + email + password (name saved to the account)
     • Sign In  — email + password
     • Greets the member by name once logged in, unlocks content.
   To point this at a different Supabase project, edit STEP 1.
   ============================================================ */
(function () {
  'use strict';

  /* ============================================================
     STEP 1 — SUPABASE PROJECT VALUES
     From Supabase → Project Settings → API Keys:
       • SUPABASE_URL      = the "Project URL"
       • SUPABASE_ANON_KEY = the "Publishable" key (sb_publishable_...) or legacy "anon" key
     The publishable/anon key is SAFE to keep here — it is public by design.
     NEVER paste the "Secret" key (sb_secret_...) here.
     ============================================================ */
  const SUPABASE_URL      = 'https://bvlzbrtmgcfumjsmwuec.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_GP923q8qC8T0GNUWmnjkQw_LmDSYYTT';
  /* ---------------------------------------------------------- */

  const $ = (id) => document.getElementById(id);

  // Locked gate vs unlocked content
  const gate       = $('memberGate');
  const unlocked   = $('memberUnlocked');
  const authWrap   = $('authWrap');
  const memberSoon = $('memberSoon');

  // Tabs + forms
  const tabSignin  = $('tabSignin');
  const tabSignup  = $('tabSignup');
  const formSignin = $('formSignin');
  const formSignup = $('formSignup');

  // Sign-in fields
  const siEmail = $('siEmail');
  const siPass  = $('siPass');
  // Sign-up fields
  const suName  = $('suName');
  const suEmail = $('suEmail');
  const suPass  = $('suPass');

  const msgEl     = $('authMsg');
  const nameOut   = $('memberName');
  const btnLogout = $('btnLogout');

  if (!gate) return; // Members section not on this page.

  const setMsg = (text, type) => {
    msgEl.textContent = text || '';
    msgEl.className = 'auth-msg' + (type ? ' ' + type : '');
  };

  // Show login forms vs the "launching soon" placeholder.
  const showForm = () => { if (authWrap) authWrap.hidden = false; if (memberSoon) memberSoon.hidden = true; };
  const showSoon = () => { if (authWrap) authWrap.hidden = true;  if (memberSoon) memberSoon.hidden = false; };

  // Switch between the Sign In and Sign Up tabs.
  const showTab = (which) => {
    const signin = which === 'signin';
    if (formSignin) formSignin.hidden = !signin;
    if (formSignup) formSignup.hidden = signin;
    if (tabSignin) tabSignin.classList.toggle('active', signin);
    if (tabSignup) tabSignup.classList.toggle('active', !signin);
    setMsg('');
  };
  if (tabSignin) tabSignin.addEventListener('click', () => showTab('signin'));
  if (tabSignup) tabSignup.addEventListener('click', () => showTab('signup'));

  // Reflect the logged-in / logged-out state.
  const render = (session) => {
    const inside = !!session;
    gate.hidden = inside;
    unlocked.hidden = !inside;
    if (inside && nameOut) {
      const u = session.user;
      const name = (u.user_metadata && u.user_metadata.full_name) ? u.user_metadata.full_name : u.email;
      nameOut.textContent = name;
    }
  };

  // --- Not connected yet? Show the "launching soon" card and stop. ---
  if (SUPABASE_URL.indexOf('PASTE_') === 0 || SUPABASE_ANON_KEY.indexOf('PASTE_') === 0) {
    showSoon();
    console.warn('[CR7 Auth] Add your Supabase URL + key in auth.js (STEP 1).');
    return;
  }
  showForm();
  showTab('signin');

  // --- Make sure the Supabase library loaded. ---
  if (!window.supabase || !window.supabase.createClient) {
    setMsg('Could not load the login library. Please reload the page.', 'err');
    return;
  }

  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const validEmail = (e) => !!e && e.indexOf('@') > 0;

  // --- SIGN UP (name + email + password) ---
  if (formSignup) formSignup.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name  = (suName.value || '').trim();
    const email = (suEmail.value || '').trim();
    const pass  = suPass.value || '';
    if (!name) return setMsg('Please enter your name.', 'err');
    if (!validEmail(email)) return setMsg('Enter a valid email address.', 'err');
    if (pass.length < 6) return setMsg('Password must be at least 6 characters.', 'err');

    setMsg('Creating your account…');
    const { data, error } = await sb.auth.signUp({
      email: email,
      password: pass,
      options: {
        data: { full_name: name },               // name saved to the user's account
        emailRedirectTo: window.location.origin  // confirm link returns to THIS site
      }
    });
    if (error) return setMsg(error.message, 'err');
    if (data.session) setMsg('Welcome, ' + name + '! You are in.', 'ok');             // email confirmation OFF
    else setMsg('Account created. Check your email to confirm, then sign in.', 'ok');  // email confirmation ON
  });

  // --- SIGN IN (email + password) ---
  if (formSignin) formSignin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (siEmail.value || '').trim();
    const pass  = siPass.value || '';
    if (!validEmail(email)) return setMsg('Enter a valid email address.', 'err');
    if (!pass) return setMsg('Enter your password.', 'err');

    setMsg('Signing in…');
    const { error } = await sb.auth.signInWithPassword({ email: email, password: pass });
    if (error) return setMsg(error.message, 'err');
    setMsg(''); // onAuthStateChange reveals the member content
  });

  // --- LOG OUT ---
  if (btnLogout) btnLogout.addEventListener('click', async () => {
    await sb.auth.signOut();
    setMsg('');
    [siEmail, siPass, suName, suEmail, suPass].forEach((el) => { if (el) el.value = ''; });
    showTab('signin');
  });

  // --- Keep the UI in sync with the auth state ---
  sb.auth.onAuthStateChange((_event, session) => render(session)); // login / logout / refresh
  sb.auth.getSession().then(({ data }) => render(data.session));   // initial paint
})();
